"""python jeu.py lance le site ; --appel exécute une session Claude."""
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import uuid


def packed(value):
    return json.dumps(value, ensure_ascii=False, separators=(",", ":"))


def session_id(seed):
    return str(uuid.UUID(bytes=hashlib.sha256(("charmed:" + seed).encode()).digest()[:16], version=5))


def prepare(message, previous):
    message = json.loads(packed(message))
    board = message.get("plateau") or {}
    cursors, thread = {}, {}
    for key in ("arbitration", "radio", "opponent"):
        entries = board.pop(key, [])
        cursor = previous.get("cursors", {}).get(key, {})
        count = cursor.get("count", 0)
        digest = lambda items: hashlib.sha256(packed(items).encode()).hexdigest()
        if count > len(entries) or digest(entries[:count]) != cursor.get("hash"):
            count = 0
        thread[key] = entries[count:]
        cursors[key] = {"count": len(entries), "hash": digest(entries)}
    message["fil"] = thread
    return message, cursors


def appel(request):
    identity = session_id(request["seed"])
    directory = Path.home() / ".charmed" / "sessions" / identity
    directory.mkdir(parents=True, exist_ok=True)
    lock = directory / "session.lock"
    # Exclusive across MJ/opponent invocations, including other server processes.
    descriptor = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    state_file, config = directory / "session.json", directory / "mcp.json"
    try:
        previous = json.loads(state_file.read_text(encoding="utf-8")) if state_file.exists() else {}
        prompt, cursors = prepare(request["prompt"], previous)
        config.write_text(packed({"mcpServers": {"charmed": request["mcp"]}}), encoding="utf-8")
        args = [shutil.which(os.environ.get("CHARMED_CLAUDE", "claude")) or "claude", "-p"]
        args += ["--continue"] if previous.get("started") else ["--session-id", identity]
        args += ["--output-format", "stream-json", "--verbose", "--json-schema", packed(request["schema"]),
                 "--mcp-config", str(config), "--strict-mcp-config", "--setting-sources", "",
                 "--permission-mode", "dontAsk", "--allowedTools", "mcp__charmed__*", "Read", "Glob", "Grep", "WebFetch", "WebSearch"]
        process = subprocess.Popen(args, cwd=directory, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE, text=True, encoding="utf-8",
                                   creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0)
        try:
            output, error = process.communicate(packed(prompt), timeout=600)
        except BaseException:
            process.kill()
            process.communicate()
            raise
        result = None
        for line in output.splitlines():
            try:
                event = json.loads(line)
            except ValueError:
                continue
            if event.get("session_id") and event["session_id"] != identity:
                raise RuntimeError("Claude a repris une autre session.")
            if event.get("type") == "system" and event.get("subtype") == "init":
                state_file.write_text(packed({**previous, "started": True}), encoding="utf-8")
            if event.get("type") == "result":
                result = event
        if process.returncode or not result or result.get("is_error"):
            raise RuntimeError("Appel Claude échoué : " + str(result or error[-2000:]))
        value = result.get("structured_output")
        if value is None:
            value = json.loads(result["result"])
        state_file.write_text(packed({"id": identity, "started": True, "cursors": cursors}), encoding="utf-8")
        return value
    finally:
        config.unlink(missing_ok=True)
        os.close(descriptor)
        lock.unlink()


if __name__ == "__main__":
    if "--appel" in sys.argv:
        try:
            sys.stdin.reconfigure(encoding="utf-8")
            sys.stdout.reconfigure(encoding="utf-8")
            print(packed(appel(json.load(sys.stdin))))
        except Exception as error:
            print(str(error), file=sys.stderr)
            sys.exit(1)
    else:
        sys.exit(subprocess.call(["node", str(Path(__file__).parent / "serveur" / "serveur.js"), *sys.argv[1:]]))
