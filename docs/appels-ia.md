# Appels de jeu

`python jeu.py` lance le site sur http://localhost:3129.

Chaque message de la joueuse appelle une seule session MJ. Elle reçoit les règles, le plateau courant, les pointeurs documentaires, les appels disponibles et les nouveaux messages du fil. La consigne est : « Joue ce tour selon les règles. Utilise les appels disponibles. »

Le MJ effectue les opérations du moteur par outils : proposer, poser, questionner, répondre, juger une réponse, terminer un passage, résoudre, préparer et finir le matin, publier. Ces opérations ne font aucun appel IA. Il décide des appels et de leur ordre selon les règles.

L’outil `opponent` appelle une seconde session avec les règles, son plateau et ses connaissances. Elle consulte ses outils de lecture et renvoie son prochain coup au MJ. Le MJ en applique le jugement et les conséquences. Aucun arbitre intermédiaire.

`jeu.py --appel` exécute `claude -p` avec le message sur stdin. La première invocation utilise un UUID dérivé de la seed de partie et du fil ; les suivantes utilisent `--continue` dans le dossier propre à cette session. Les curseurs retirent les anciens messages du prompt. Le pointeur `arbitrage` permet une relecture explicite.

`serveur/charmed/jeu.js` expose les outils du moteur et l’appel à Python. `agent-mcp.js` transporte ces outils. `store.js` enregistre un état complet après réussite du tour ; une erreur annule la transaction. Aucun code serveur ou écran ne choisit les phases à enchaîner.

Les parties restent dans `etat/`. Les anciens chemins sous `technique/serveur` rejoignent le même serveur.

Vérification : `node --test serveur/charmed/*.test.js`, `python scripts/test_jeu.py`. `node scripts/verify_jeu_live.cjs` joue un passage réel avec Claude dans une partie temporaire.
