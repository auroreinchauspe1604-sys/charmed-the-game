> **Charmed — version actée du 8 septembre 2026** : voir [le dossier de construction](Charmed/README.md), [les règles](Charmed/REGLES_ACTEES.md) et [la validation](Charmed/VALIDATION.md). Le serveur sur le port 3129 utilise le moteur v3 et un journal séparé. Les sections v2 ci-dessous sont historiques.

# logic-match

## Charmed — règles et plateau version 2

La page `/` ouvre désormais **Avant que la vision s'accomplisse**, au jour 1.
L'ancien plateau reste accessible à `/ancien` et ses journaux ne sont pas migrés.

```powershell
node serveur/serveur.js
# http://localhost:3129/
node --test serveur/charmed/engine.test.js
python -m unittest discover -s scripts/tests -q
```

Le moteur v2 (`serveur/charmed/engine.js`) impose les règles mécaniques ; deux
contextes IA distincts valident la narration et jouent le camp adverse. Ils
utilisent le client **Codex connecté**, installé sur la machine. `CHARMED_CODEX`
permet de préciser son chemin absolu si `codex` n'est pas dans PATH. Aucun secret
n'est placé dans le navigateur ; ces appels utilisent le quota du compte connecté.
Une connexion IA indisponible n'accepte pas de coup fictif : le message explique
le problème et la séquence peut être reprise. La phase du camp adverse et le
matin sont enregistrés séparément. Pas d'installation ni d'abonnement additionnel.

Le journal v2 est `etat/charmed/avant-la-vision.v2.jsonl` (instantanés versionnés,
append-only, contrôle SHA-256, révision attendue et verrou d'écriture exclusif).
Une version de règles n'est pas réappliquée rétroactivement aux anciens journaux.
`CHARMED_STATE_DIR` permet un dossier isolé pour les tests. Un verrou `.lock`
restant après un arrêt brutal doit être examiné avant suppression ; le programme
ne le retire pas automatiquement au risque d'écraser un processus actif.

Le serveur écoute uniquement sur `127.0.0.1`. Il est prévu pour une joueuse locale,
pas pour un hébergement public ou un multijoueur authentifié.

`node scripts/verify_charmed_live.js` exerce une vraie proposition, un passage IA
et un matin **dans un journal temporaire**. Ce contrôle utilise le quota IA et
n'avance pas la partie réelle. Les tests ordinaires n'appellent aucun modèle.

Voir [les règles intégrées et limites](docs/parties/charmed-v2-integration.md).


Interaction Charmed : cliquer ou glisser une ressource sur une cible ouvre sa
justification. Les clés et verrous résultent de cette pose. Les attaques et
questions se choisissent sur la carte ciblée. Les emplacements pointillés créent
les sous-objectifs ; « Créer une ressource » se trouve dans la main.
Le calendrier expose les événements publics, leurs conditions et leurs impacts
possibles. Les limites de sous-objectifs sont évaluées à la préparation du
gameplay, puis fixées dans la sauvegarde ; les chemins témoins restent privés.

## Version d'origine

Transfert autonome du « conseil de guerre en cartes » du dépôt `le-conseil2` : un jeu
de position à N camps, joué en coups datés dans un journal append-only
(`etat/parties/<id>.jsonl`), avec un greffier Python qui vérifie et écrit, un
serveur Node qui l'appelle, et un plateau HTML qui se joue au glissé.

Rien ici ne touche au monde du jeu d'origine (état, sièges, flux) : seul le
journal de la partie s'écrit, plus un marque-page « déjà vu » par siège sous
`etat/joueurs/<siege>/`.

## Lancer

```bash
node serveur/serveur.js            # http://localhost:3129/
```

- `/` — le plateau (`ecrans/index.html` + `modules/partie.js`, `partie-grille.js`, `partie.css`)
- `/?id=<partie>&camp=<camp>` — quelle partie, quel camp ; à défaut `etat/parties/_courante.json`
- `/table` — la même vue, tout le texte visible · `/ruban` — la partie dans le temps · `/coach`
- `/partie` (GET, JSON), `/partie/geste` (POST), `/partie/jour` (POST)
- `?siege=<id>` ou cookie `siege` nomme le siège (marque-page) ; sinon `joueur`.

Python 3 et Node suffisent ; aucune dépendance à installer. `PYTHON=...` choisit l'interpréteur.

## Au terminal

```bash
python scripts/partie.py <partie> --etat                 # la position, en clair
python scripts/partie.py <partie> --plateau --camp <c>   # le plateau ASCII vu d'un camp
python scripts/partie.py <partie> --jouer '{"camp":"noir","coup":"viser",...}'
python scripts/partie.py <partie> --ruban docs/ruban.html
python -m pytest scripts/tests -q
```

`scripts/partie_ia.py` fait jouer un camp par `claude -p` sans outils ; sa
publication au fil (`append_flux.py`) n'existe pas ici et échoue proprement.

## Où sont les choses

| | |
|---|---|
| `scripts/noyau/partie_greffe.py` | les règles, le repli, l'écriture du jsonl |
| `scripts/noyau/partie_*.py` | lecture, cartes, grille, gestes, tour, validité, marques, signes, journal, ruban, ascii |
| `serveur/domaine/partie.js`, `serveur/routes/partie.js` | choisir la partie, appeler le greffier, servir |
| `serveur/http.js`, `serveur/contexte.js` | la colle minimale (transport, racine, siège) |
| `docs/regles-partie.md` | les règles · `docs/partie.md` la conception de l'écran · `docs/parties.md` le format · `docs/mj-partie.md` le manuel de l'arbitre |
| `etat/parties/` | les parties d'exemple ; `<id>.json` porte les réglages propres à une partie |

## Provenance

Extrait de `le-conseil2` le 7 septembre 2026. Les commentaires des fichiers
copiés citent parfois des chemins ou des dates de ce dépôt-là.

Révision états/preuves : les sous-états sont des faits souhaités, pas des actions.
Les clés se complètent par réflexion, sans recette ni nombre manquant révélé.
Plusieurs clés peuvent être nécessaires pour un seul sous-état. Les ressources
libérées récupèrent un jour ; les acquis restent visibles comme preuves.
