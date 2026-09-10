# Revue du refactor de Nico — 10 septembre 2026

Commits `b9566fb` puis `f4f6e21`, sur l'arbre `serveur/charmed/`.
Revue de `agent-context.js`, `agent-tools.js`, `agent-mcp.js`, `agent-schemas.js`,
`agent-session.js`, `intelligence-transport.js`, `intelligence-v3.js`, `service.js`,
`store.js` et des tests associés. Aucun code modifié.

---

## Ce qu'il a construit

L'arbitrage ne reçoit plus un gros prompt : il reçoit **une consigne d'une ligne et des outils**.

> « Joue ce tour selon les règles. Utilise les appels disponibles. »

Quatre appels servis par un serveur MCP local éphémère : `plateau()`, `lire()`, `chercher()`,
et `jouer()` pour le camp adverse. L'IA consulte ce dont elle a besoin, agit, lit le résultat,
décide de la suite — dans le même appel.

---

## Ce qui est meilleur que ce que j'ai fait

**1. `--json-schema` existe, et je l'avais raté.**
J'ai passé la matinée à expliquer que le CLI Claude Code n'avait pas d'équivalent à
`--output-schema` de Codex, et j'ai écrit un validateur maison avec relance. C'était faux :
le flag `--json-schema` existe, et la réponse revient dans `result.structured_output`.
Son transport l'utilise. **Mon `intelligence-transport-claude.js` est à jeter** — il résout
par du code un problème que le CLI règle nativement.

**2. L'accès aux données est déterminé par construction, pas par le prompt.**

```js
// agent-tools.js
// Each invocation receives an explicit set of pointers and calls. No prompt
// text or character name determines its access to game data.
function createTools({board, documents = {}, play}) {
```

La fonction appelante décide quels pointeurs existent pour cet appel. Le camp adverse reçoit
`connaissances` ; l'arbitre reçoit `scenario`, `faits`, `canon`, `bibliotheque`, `personnages`,
`magie`, `construction`. C'est structurellement plus solide que ma méthode — je supprimais des
champs du JSON (`delete input.reference`), ce qui reste une protection de prompt.

**3. Le contexte n'enfle plus, et pas par filtrage.**
`agent-session.js` tient un curseur par fil (`arbitration`, `radio`, `opponent`) avec un hash de
contrôle, retire ces fils du plateau et n'envoie que **les nouveaux messages**. Là où j'ai
compressé 782 Ko en 154 Ko par filtrage, il fait en sorte que la question ne se pose plus :
la session Claude persiste et ne reçoit que le delta. Mon `recit.js` devient chez lui un
`plateau()` que l'IA appelle quand elle en a besoin.

**4. Deux sessions distinctes, arbitre et adversaire.**
UUID dérivé de la seed de partie et du fil. Les consultations privées de l'arbitre ne peuvent
pas se retrouver dans le contexte du camp adverse. Le problème n'est pas traité par une
consigne : il ne peut pas se produire.

**5. L'adversaire joue vraiment, au lieu de planifier à l'aveugle.**
Avant : une liste d'au plus huit gestes décidés d'un coup, sans voir les résultats.
Maintenant : `jouer()` renvoie le résultat **et** le plateau actualisé, et si le moteur refuse
un geste, l'erreur revient au modèle sous forme `{erreur, plateau}` avec rollback de l'état.
Il apprend de son refus dans le même passage. C'est une vraie amélioration de qualité de jeu.

**6. Le passage adverse doit se terminer explicitement.**

```js
E.requireRule(s.phase!=='ai', 'Le passage IA n’a pas été terminé avec jouer(type=end). Opération non enregistrée.');
```

Plus de passage qui se termine par accident.

**7. `store.compatible()` — un garde-fou qu'on n'avait pas.**
Le journal refuse de se charger s'il ne correspond pas au scénario en place, en comparant
titres, objectifs et descriptions de ressources. C'est exactement le contrôle qui aurait signalé
la divergence des deux arbres.

**8. Le serveur MCP est soigné.**
Jeton bearer tiré au hasard par appel, écoute sur loopback uniquement, file d'attente qui
sérialise les appels même si le modèle les envoie en parallèle, fermeture en fin de tour,
plafond de 1 Mo sur le corps. Rien à redire.

---

## Ce qui pose problème

### 1. L'IA a accès au disque et au web — et ça vide de son sens le reste

```js
'--permission-mode','dontAsk',
'--allowedTools','mcp__charmed__*','Read','Glob','Grep','WebFetch','WebSearch'
```

C'est le point le plus grave, et il annule le bénéfice du point 2 ci-dessus. Tout le travail de
cloisonnement par pointeurs suppose que l'IA ne peut lire **que** ce qu'on lui donne. Avec
`Read`, `Glob` et `Grep` autorisés sans confirmation, elle peut ouvrir n'importe quel fichier
en chemin absolu : `scenarios/*/scenario.js` et ses `privateFacts` — les chemins préparés des
deux camps —, le journal d'arbitrage, les sauvegardes. Le camp adverse pourrait littéralement
lire la solution du scénario.

`WebFetch` et `WebSearch` ajoutent de la non-reproductibilité et de la consommation, pour un
jeu dont tout le corpus est déjà local.

**Correction : `--allowedTools 'mcp__charmed__*'` et rien d'autre.** Une ligne.

### 2. Le verrou canonique bloquant est de retour

```js
if(verdict?.canon?.status==='unverified'){
  const error=new Error('Connaissance Charmed non établie : ...');
  error.code='CHARMED_MANUAL_REVIEW'; throw error;
}
```

Normal : il a branché avant notre décision d'aujourd'hui. Mais c'est exactement le mécanisme
qui a fait perdre trois coups le 10/09 sur des verdicts qui constataient eux-mêmes qu'aucune
impossibilité canonique n'existait. À supprimer au moment de la fusion, avec le statut
`contradicted` qui le remplace.

### 3. `mainCondition` a disparu du schéma

`agent-schemas.js` ne contient plus `mainCondition`. La règle de la voie principale — une clé
sur l'objectif initial doit répondre à une condition explicite, et l'arbitre la nomme — perd
son support technique. À rétablir.

### 4. La consigne d'une ligne a emporté le contrat de sortie avec elle

C'est le point de conception à discuter, pas un bug.

Supprimer les surinstructions est juste : elles reparaphrasaient les règles et créaient une
seconde source de vérité. Mais il reste des informations qui **ne sont pas des règles du jeu**
et qui ne peuvent pas vivre dans `REGLES_ACTEES.md` : ce que compte exactement `missing`,
ce que `maintainers` désigne, quand `locations` doit être rempli, ce que `requiredCount`
signifie pour une attaque, la différence entre les trois valeurs de `canon`. Ce sont des
spécifications de champ. Aujourd'hui elles ne sont écrites nulle part : le modèle doit deviner
la sémantique à partir des seuls types JSON.

Le tri à faire a donc deux piles, pas une :

| ce qui est une règle du jeu | ce qui est un contrat de sortie |
|---|---|
| va dans `REGLES_ACTEES.md`, disparaît du prompt | reste dans le prompt, réduit à sa mécanique |
| « une clé doit établir un changement » | « `missing` = nombre de pièces encore nécessaires après celle-ci » |
| « l'attaque ne vise qu'une ressource libre » | « `maintainers` = pièces dont la présence continue conditionne l'effet » |
| « la précision est exigée à la contradiction » | « `locations` = ids des lieux déterminants, liste vide sinon » |

### 5. Points mineurs

- `service.js` conserve « Justifiez le rôle de cette ressource dans la préparation. » — le
  message qui invite au dossier de justification.
- Le passage adverse a un délai de 600 s **à l'intérieur** de `store.transact`, qui tient un
  verrou fichier. Un tour bloqué gèle la partie dix minutes avec un `.lock` sur le disque.
- `session.lock` reste en place après un arrêt brutal, même classe de problème que le
  `.jsonl.lock` déjà rencontré.
- La seed retombe sur `crypto.randomUUID()` si `store.seed` n'est pas transmis — la persistance
  de session est alors perdue silencieusement. `Service` fait bien `bindParty(store.seed)`,
  mais tout autre appelant doit y penser.

---

## Ce qui manque, et qui est de notre côté

Rien de ce qui a été décidé le 10 septembre n'existe dans son arbre :

- le déblocage canonique et le statut `contradicted` ;
- l'attaque réservée aux ressources libres en main, le verrou pour les ressources engagées,
  et le contrôle moteur correspondant ;
- l'acte composé qui n'est pas une ambiguïté ;
- la ressource qui est un moyen et jamais une solution, à la distribution comme à la création ;
- la clé qui doit produire un changement identifiable ;
- le maintien des effets continus étendu aux clés ;
- l'affichage de la cible attaquée ;
- le scénario Nexus réécrit ;
- et la réorganisation en `technique/` elle-même.

---

## Recommandation

**Garder son architecture, y porter nos règles.** Sa structure est meilleure que la mienne sur
tous les points qui comptent : le cloisonnement, la croissance du contexte, la qualité de jeu
de l'adversaire, la persistance. Mes contributions de valeur sont les décisions de règles, le
scénario, et les correctifs moteur — qui sont indépendants du transport.

Ordre proposé :

1. **Tout de suite, avant toute partie** : `--allowedTools 'mcp__charmed__*'` seul.
2. Choisir un seul arbre et supprimer l'autre du dépôt. Vous ne pouvez pas continuer à deux
   sur deux copies qui divergent.
3. Porter les règles du 10/09 et les correctifs moteur dans l'arbre retenu.
4. Faire le tri règles / contrat de sortie, et écrire les deux au bon endroit.
5. Rétablir `mainCondition`, retirer le verrou canonique, corriger le message de pose.
