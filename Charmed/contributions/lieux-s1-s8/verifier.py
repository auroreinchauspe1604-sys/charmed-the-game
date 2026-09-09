"""Contrôles documentaires locaux ; aucune modification du corpus actif."""
import json
import hashlib
from pathlib import Path

HERE = Path(__file__).resolve().parent
CHARMED = HERE.parents[1]
data_path = HERE / "lieux.proposition.json"
md_path = HERE / "PROPOSITION_A_INTEGRER.md"
data = json.loads(data_path.read_text(encoding="utf-8"))
md = md_path.read_text(encoding="utf-8")
index = json.loads((CHARMED / "canon/episodes-index.json").read_text(encoding="utf-8-sig"))
known_episodes = {e["id"] for e in index["episodes"]}
active = json.loads((CHARMED / "canon/contributions-integrees/lieux.json").read_text(encoding="utf-8-sig"))
active_ids = {f["id"] for f in active["fiches"]}
fiches = data["fiches"]
checks = {}
checks["json_lisible"] = True
checks["19_fiches"] = len(fiches) == 19
checks["22_sources"] = len(data["sources"]) == 22
checks["identifiants_uniques"] = len({f["id"] for f in fiches}) == len(fiches)
checks["propositions_non_integrees"] = all(f["statut"] == "proposition_documentaire_non_integree" for f in fiches)
checks["references_sources_resolues"] = all(s in data["sources"] for f in fiches for s in f["sources"])
checks["episodes_fiches_dans_index"] = all(e in known_episodes for f in fiches for e in f["episodes"])
checks["episodes_sources_dans_index"] = all(s["episode"] == "LOCAL" or s["episode"] in known_episodes for s in data["sources"].values())
reprises = [f for f in fiches if f["rapprochement"].startswith("lieux:")]
checks["11_reprises_du_corpus"] = len(reprises) == 11 and {f["rapprochement"].split(" / ")[0] for f in reprises} == active_ids
checks["8_fiches_supplementaires"] = len(fiches) - len(reprises) == 8
checks["textes_ange_et_cartes_dans_markdown"] = all(
    all(t in md for t in f["ange"].values())
    and f["carte"]["description"] in md
    and f["applicationProposee"] in md
    for f in fiches
)
checks["variante_nexus_dans_markdown"] = all(f["carte"].get("varianteApresS07E22", "") in md for f in fiches)
checks["aucun_caractere_de_remplacement"] = all("\ufffd" not in x.read_text(encoding="utf-8") for x in [data_path, md_path])
checks["aucun_visionnage_revendique"] = all(s["visionnage"] is False for s in data["sources"].values())
report = {
    "date": "2026-09-08",
    "status": "passed" if all(checks.values()) else "failed",
    "checks": checks,
    "fiches": len(fiches),
    "sources": len(data["sources"]),
    "cardWordCounts": {f["nom"]: len(f["carte"]["description"].split()) for f in fiches},
    "sha256": {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in [data_path, md_path]},
    "limites": [
        "Contrôles structurels et cohérence documentaire interne seulement.",
        "Aucun visionnage, test de partie, appel du serveur ou validation canonique automatique.",
        "Ce script lit deux fichiers de référence actifs et n'écrit que VERIFICATIONS.json dans son propre dossier.",
        "Aucune comparaison globale de l'état du projet : d'autres conversations peuvent y écrire."
    ]
}
(HERE / "VERIFICATIONS.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({"status": report["status"], "checks": checks}, ensure_ascii=False, indent=2))
raise SystemExit(0 if all(checks.values()) else 1)

