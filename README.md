# Charmed The Game

Lancer : `python jeu.py` puis ouvrir http://localhost:3129.

Une session MJ joue le tour avec les règles, le plateau et les outils. Elle appelle l’opponent au besoin. [Fonctionnement et fichiers](docs/appels-ia.md).

Changer de partie : le menu « Partie » de l’en-tête (ou `?scenario=<id>` dans l’adresse). Chaque partie garde son propre journal dans `etat/charmed/`.

Partie infinie : choisir « Infinite » dans ce menu, ou `node scripts/jouer-infinite.cjs` puis http://localhost:3131. Elle commence en saison 1 ; quand plus aucun personnage adverse n’est vivant au matin, la menace suivante du bestiaire apparaît ([scénario](scenarios/infinite/scenario.js)).

Tests : `node --test serveur/charmed/*.test.js` et `python scripts/test_jeu.py`.

Les règles, scénarios, bibliothèques, visuels et parties existantes sont conservés. Les points d’entrée serveur sous `technique/` utilisent le même jeu.
