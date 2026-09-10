"use strict";
// Transport Claude — refonte du 10 septembre 2026, seconde version.
//
// Reprend de la refonte de Nico ce qui est meilleur que la première version :
//   - `--json-schema` : le CLI impose lui-même le formulaire de réponse. Le
//     validateur maison et sa relance disparaissent.
//   - sessions Claude persistantes par fil (arbitrage / adversaire) : l'arbitre
//     poursuit son raisonnement au lieu de repartir de zéro à chaque appel.
//   - curseurs : les messages déjà transmis ne sont pas renvoyés.
//   - outils servis par un serveur MCP local éphémère.
//
// Ce qui n'est PAS repris : les outils d'écriture. La journée reste pilotée par
// le serveur (service.advance) ; l'IA répond à des questions, elle ne décide pas
// où en est la partie. Et seuls les outils du jeu sont autorisés : pas de Read,
// Grep ni WebSearch, qui contourneraient le cloisonnement des pointeurs.
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path');
const { serve } = require('./agent-mcp');
const sessions = require('./agent-session');

// On vise le binaire réel et jamais le .cmd : passer par le shell Windows fait
// massacrer les guillemets du schéma JSON par cmd.exe.
function executable() {
  if (process.env.CHARMED_CLAUDE) return process.env.CHARMED_CLAUDE;
  const npm = path.join(process.env.APPDATA || '', 'npm');
  for (const candidat of [
    path.join(npm, 'node_modules', '@anthropic-ai', 'claude-code', 'bin', 'claude.exe'),
    path.join(npm, 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js'),
    path.join(npm, 'claude.cmd')
  ]) if (fs.existsSync(candidat)) return candidat;
  return 'claude';
}

async function call(prompt, schema, { tools = [], timeoutMs = 300000, seed } = {}) {
  if (!seed) throw new Error('Fil de session requis pour l’appel Claude.');
  const session = sessions.location(seed);
  fs.mkdirSync(session.dir, { recursive: true });
  const lock = path.join(session.dir, 'session.lock');
  let descriptor;
  try { descriptor = fs.openSync(lock, 'wx'); }
  catch (e) {
    if (e.code !== 'EEXIST') throw e;
    // Un verrou peut survivre à un arrêt brutal : on le reprend s'il est ancien.
    const age = Date.now() - fs.statSync(lock).mtimeMs;
    if (age < timeoutMs) throw new Error('Cette session Claude est déjà en cours.');
    fs.unlinkSync(lock); descriptor = fs.openSync(lock, 'wx');
  }

  let bridge;
  const configFile = path.join(session.dir, 'mcp.json');
  try {
    const previous = sessions.read(session.file);
    const input = sessions.prepare(prompt, previous);
    bridge = await serve(tools);
    fs.writeFileSync(configFile, JSON.stringify({
      mcpServers: { charmed: { type: 'http', url: bridge.url, headers: { Authorization: 'Bearer ' + bridge.token } } }
    }));

    const args = ['-p',
      ...(previous.started ? ['--continue'] : ['--session-id', session.id]),
      '--output-format', 'stream-json', '--verbose',
      '--json-schema', JSON.stringify(schema),
      // Forme accolée : passé en deux arguments, la valeur vide fait avaler
      // l'option suivante par l'analyseur du CLI.
      '--mcp-config', configFile, '--strict-mcp-config', '--setting-sources=',
      '--permission-mode', 'dontAsk',
      // Uniquement les appels du jeu : aucun accès au disque ni au web.
      '--allowedTools', 'mcp__charmed__*'];

    return await new Promise((resolve, reject) => {
      const bin = executable();
      const commande = bin.endsWith('.js') ? process.execPath : bin;
      const arguments_ = bin.endsWith('.js') ? [bin, ...args] : args;
      const child = spawn(commande, arguments_, { cwd: session.dir, windowsHide: true, shell: bin.endsWith('.cmd'), stdio: ['pipe', 'pipe', 'pipe'] });
      let flux = '', resultat, erreur, stderr = '', expire = false;
      const timer = setTimeout(() => { expire = true; child.kill(); }, timeoutMs);
      child.stdout.on('data', chunk => {
        flux += chunk;
        let index;
        while ((index = flux.indexOf('\n')) >= 0) {
          const ligne = flux.slice(0, index); flux = flux.slice(index + 1);
          let event; try { event = JSON.parse(ligne); } catch { continue; }
          if (event.session_id && event.session_id !== session.id) {
            erreur = new Error('Claude a repris une autre session. Aucun coup enregistré.'); child.kill(); continue;
          }
          if (event.type === 'system' && event.subtype === 'init')
            fs.writeFileSync(session.file, JSON.stringify({ ...previous, id: session.id, started: true }));
          if (event.type === 'result') resultat = event;
        }
      });
      child.stderr.on('data', c => { stderr = (stderr + c).slice(-2000); });
      child.on('error', e => { clearTimeout(timer); reject(new Error(e.code === 'ENOENT' ? 'Client Claude introuvable. Installez Claude Code ou définissez CHARMED_CLAUDE.' : e.message)); });
      child.on('close', code => {
        clearTimeout(timer);
        if (erreur) return reject(erreur);
        if (expire) return reject(new Error('L’IA n’a pas répondu à temps. Aucun coup de cette opération n’a été enregistré.'));
        if (code !== 0 || !resultat || resultat.is_error)
          return reject(new Error('Appel Claude échoué : ' + (resultat?.result || stderr || 'aucun résultat') + ' Aucun coup enregistré.'));
        try {
          const valeur = resultat.structured_output ?? JSON.parse(resultat.result);
          fs.writeFileSync(session.file, JSON.stringify({ id: session.id, started: true, cursors: input.cursors }));
          resolve(valeur);
        } catch { reject(new Error('Réponse Claude invalide. Aucun changement enregistré.')); }
      });
      child.stdin.on('error', () => {});
      child.stdin.end(input.prompt);
    });
  } finally {
    if (bridge) await bridge.close();
    try { fs.unlinkSync(configFile); } catch {}
    fs.closeSync(descriptor); try { fs.unlinkSync(lock); } catch {}
  }
}

module.exports = { call };
