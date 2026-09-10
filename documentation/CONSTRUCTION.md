# Construction et premier essai

## Périmètre de cette étape

Le premier essai reprend le thème déjà choisi, **Avant que la vision s'accomplisse**, dans une nouvelle sauvegarde au jour 1. La sauvegarde v2 reste intacte. Le plateau existant reçoit uniquement les adaptations fonctionnelles nécessaires aux nouvelles règles ; l'identité artistique Charmed sera discutée après l'essai.

## Architecture active

- `serveur/charmed/engine-v3.js` : budget, engagements, états des cartes, dépendances, questions uniques, calendrier, échéances, garde-fous de résolution et de victoire.
- `serveur/charmed/intelligence-v3.js` : jugements structurés sur la pertinence, le nombre de moyens, la portée, les faits réellement produits et les menaces encore réalisables. Le programme conserve la décision et les preuves ; l'IA ne modifie pas directement les fichiers.
- `serveur/charmed/intelligence-transport.js` : appel du client Codex, schéma de réponse et lecture intégrale des règles du dossier Charmed. Un échec d'appel annule la transaction ; aucun coup n'est consommé silencieusement.
- `serveur/charmed/canon.js` et `Charmed/canon/base.json` : injection des connaissances de la période et vérification des références citées dans les jugements de création, pose et réponse.
- `serveur/charmed/store.js` : journal append-only, révisions, empreinte SHA-256 et verrou d'écriture. `etat/charmed/avant-la-vision.v3.jsonl` est séparé du journal précédent.
- `serveur/charmed/scenario.js` : premier scénario, ressources et événements publics ; références privées séparées de la vue du joueur.
- `ecrans/modules/charmed.js` : commandes contextuelles, moyens manquants chiffrés, fait obtenu sur la clé jaune et pièces retenues séparément pour les sous-états.

## Préparation d'une partie

Avant le départ, définir une période canonique, les camps, des affirmations initiales exigeantes et compatibles avec un seul monde, la date finale et les ressources initiales. Un objectif vrai porte le mode maintien ; sa rupture est enregistrée.

Construire plusieurs chemins témoins plausibles pour évaluer le nombre d'emplacements et le calendrier, sans imposer leurs noms ni leurs solutions. La préparation existante `docs/parties/avant-la-vision-gameplay.json` fournit ces témoins au premier scénario. Leur vérification structurelle n'est pas une preuve d'équilibrage contre toutes les stratégies adverses.

Le menu générant trois thèmes et une préparation entièrement nouvelle est prévu dans les règles ; il n'est pas encore exposé dans l'application. Le premier test utilise le thème précédemment sélectionné. L'expertise exhaustive des huit saisons n'est pas revendiquée : voir le plan de couverture canonique.

## Test local

Depuis la racine du dépôt :

```powershell
node --test serveur/charmed/engine.test.js
python -m unittest discover -s scripts/tests -q
node scripts/verify_charmed_live.js
node serveur/serveur.js 3129
```

Le test `verify_charmed_live.js` appelle réellement l'IA et utilise un journal temporaire ; il ne joue pas dans la sauvegarde d'Aurore. Le client `codex` doit être accessible, ou son chemin fourni par `CHARMED_CODEX`.

Pour le premier essai humain : créer un sous-état factuel, poser une ressource en expliquant son effet, observer le nombre manquant, compléter lors d'un passage ultérieur et vérifier la différence entre clé réalisée et état vrai. Au matin J3, les deux exemplaires du programme doivent apparaître automatiquement. Les scénarios artificiels des tests vérifient les échéances et échecs sans devoir les provoquer dans la partie humaine.

## Limites à suivre pendant l'essai

Le moteur impose les contraintes mécaniques. La pertinence narrative, la conséquence précise d'un échec et l'absence de menace adverse sont jugées par l'IA : les schémas et contrôles limitent les erreurs, mais ne prouvent pas mathématiquement la justesse de chaque arbitrage. Les cas contestés doivent pouvoir être reproduits depuis le journal.

L'arbre peut comporter des branches optionnelles. La réutilisation de l'emplacement d'un sous-état devenu définitivement impossible n'a pas été tranchée : cette version ne propose pas de suppression/remplacement volontaire de sous-état.
