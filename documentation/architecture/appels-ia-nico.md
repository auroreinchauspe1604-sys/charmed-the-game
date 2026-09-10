# Entrée des tours IA

Chaque appel est construit dans `serveur/charmed/intelligence-v3.js` avec la même consigne :

> Joue ce tour selon les règles. Utilise les appels disponibles.

Le JSON transmis contient :

- `tour` : la demande en cours et ses données (camp, proposition, question, candidats à résoudre).
- `regles` : le contenu intégral de `Charmed/REGLES_ACTEES.md`.
- `plateau` : l'état actuel visible pour cet appel, sans les messages déjà transmis.
- `fil` : seulement les nouveaux messages d’arbitrage, de radio et du récit adverse.
- `pointeurs` : les documents consultables.
- `appels` : le catalogue des outils et leurs paramètres.

Aucun champ `role`, aucune personnalité spéciale, aucune surinstruction ajoutée selon une chaîne de caractères. Les références ne sont plus injectées intégralement dans le prompt.

## Appels

Les outils sont servis par un endpoint MCP local temporaire, connecté à `claude -p` pour la durée de l'appel.

| Appel | Résultat |
| --- | --- |
| `plateau()` | Le plateau actualisé. |
| `lire({pointeur, chemin?, debut?, limite?})` | Les champs d'un document, un fragment JSON ou une page de liste. |
| `chercher({pointeur, texte, limite?})` | Les valeurs correspondantes et leurs chemins JSON. |
| `jouer({type, kind?, target?, resource?, text?})` | Le résultat du geste et le plateau actualisé. `type: "end"` termine le passage. |

Tous les appels disposent du pointeur `arbitrage` pour relire ou rechercher les avis précédents. Les sessions Claude persistent. Leur UUID est dérivé de la seed de partie et du fil. Le premier appel utilise `--session-id`, les suivants `--continue` dans un dossier propre à cet UUID. Les compteurs des messages déjà transmis sont conservés ; seuls les nouveaux messages sont envoyés. Le fil complet reste consultable explicitement.

Le passage adverse dispose de `jouer` et du pointeur `connaissances`. Les demandes d'examen disposent des pointeurs `scenario`, `faits`, `canon`, `bibliotheque`, `personnages`, `magie` et `construction`. Cette disponibilité est définie par les fonctions appelantes ; elle ne dépend pas du texte du prompt. Les informations privées du joueur restent retirées de sa vue adverse.

L'agent peut consulter, jouer, lire le résultat puis choisir son prochain geste dans le même appel Claude. Il n'y a plus de liste de huit gestes planifiée à l'avance. Les examens utilisent la même entrée et renvoient un résultat conforme au schéma JSON attendu par le moteur.

Le moteur conserve les règles mécaniques et la validation des références. Le passage entier reste une transaction : il est enregistré après l'appel explicite de fin et la réussite de l'opération. Une interruption ou une erreur technique annule les modifications de cette transaction. Les anciens journaux ne sont pas réécrits.

## Fichiers

- `serveur/charmed/intelligence-v3.js` : entrée commune et demandes.
- `serveur/charmed/agent-context.js` : vues et pointeurs.
- `serveur/charmed/agent-tools.js` : consultation et action.
- `serveur/charmed/agent-mcp.js` : transport MCP local.
- `serveur/charmed/intelligence-transport.js` : lancement Claude avec outils et reprise de session.
- `serveur/charmed/agent-schemas.js` : formats des résultats.
- `serveur/charmed/service.js` : application des actions au moteur.

Validation : `node --test serveur/charmed/*.test.js`. Le contrôle `node scripts/verify_charmed_live.js` appelle réellement Claude sur un journal temporaire et utilise le quota IA.

La seed peut être fixée avec `CHARMED_PARTY_SEED`. À défaut, elle est dérivée du chemin absolu du journal. Les fils de l’arbitrage et du camp adverse ont chacun leur session : cela permet les appels imbriqués sans collision et évite de transmettre les consultations privées de l’arbitre au camp adverse. Il n’y a aucun prompt de rôle associé. Les dossiers de reprise sont dans `~/.charmed/sessions/<uuid>/`. `CHARMED_CLAUDE` permet de choisir le binaire Claude.
