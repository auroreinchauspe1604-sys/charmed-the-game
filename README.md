# Charmed The Game

Lancer : `python jeu.py` puis ouvrir http://localhost:3129.

Une session MJ joue le tour avec les règles, le plateau et les outils. Elle appelle l’opponent au besoin. [Fonctionnement et fichiers](docs/appels-ia.md).

Tests : `node --test serveur/charmed/*.test.js` et `python scripts/test_jeu.py`.

Les règles, scénarios, bibliothèques, visuels et parties existantes sont conservés. Les points d’entrée serveur sous `technique/` utilisent le même jeu.
