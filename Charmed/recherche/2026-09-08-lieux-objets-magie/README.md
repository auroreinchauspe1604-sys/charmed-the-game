# Enrichissement Charmed — lot du 8 septembre 2026

**24 fiches préparées : 9 lieux, 7 objets, 8 formules, potions ou dispositifs.** Ce lot approfondit aussi certains éléments déjà présents ; ce n’est pas une liste de 24 nouveautés toutes absentes du jeu.

Le dossier est séparé du corpus chargé par le serveur. La partie **Le manoir assiégé**, ses règles, ses moyens et ses événements ne sont pas modifiés par cet enrichissement. Aucun serveur n’a été redémarré pour le charger.

## Livrables

- `FICHES.md` : lecture des fiches, conditions, réserves, applications proposées et sources.
- `fiches.json` : mêmes connaissances sous forme structurée, avec des identifiants stables et un statut non actif.
- `verification.json` : contrôles de structure, références d’épisodes et empreintes du corpus actuellement chargé.
- `construire.cjs` : source éditable et générateur local ; il n’écrit que dans ce dossier.

## Niveau réel de vérification

Six fiches reposent sur des passages de transcriptions consultés, trois combinent transcription et extrait secondaire, quinze restent fondées sur des extraits indexés. Les transcriptions accessibles sont non officielles ; aucun épisode n’est déclaré visionné. Ce lot constitue une base documentée, pas une expertise exhaustive validée sur les huit saisons.

Les sources mêlant télévision et comics ont été filtrées. Les contenus du reboot, des romans et des wikis de fanfiction n’ont pas été retenus comme preuves. Les noms français sont des intitulés de travail lorsqu’une désignation du doublage n’a pas été vérifiée.

## Ce que les fiches doivent permettre

Construire une histoire inédite aussi bien qu’une partie issue d’un épisode, en respectant la période, les pouvoirs disponibles, la nature des lieux, les objets et les limites des moyens magiques. Une référence à un épisode ne signifie pas que son déroulement est obligatoire dans un nouveau scénario.

Les applications de jeu sont explicitement séparées du canon. Elles ne changent pas les coûts, l’engagement des ressources, les questions, les attaques ou les conditions de victoire déjà validés. Le joueur n’a pas à recevoir la recette ou l’identité des ressources manquantes simplement parce que le directeur dispose de cette connaissance.

Une incertitude de recherche ne doit jamais être transformée en « deux ressources manquantes » par l’Ange du destin : il faut d’abord établir le mécanisme. Les durées du jeu ne se déduisent pas arbitrairement d’une impression tirée de la série.

## Points à résoudre avant une intégration active

1. Vérifier les fiches fondées sur des extraits dans les épisodes pertinents, particulièrement les capacités de chaque bague de Cupidon et les recettes de potions.
2. Documenter plus précisément les accès à l’école de magie. La phrase existante dans `Charmed/canon/construction.json` sur des « portails soumis à autorisation » doit être revue : le lot ne la confirme pas comme règle générale. Elle n’a pas été modifiée pendant la partie.
3. Vérifier les exceptions de protection de l’école et du Livre. Ne pas transformer un cas observé en invulnérabilité permanente.
4. Résoudre les appellations et distinctions entre Nexus, Woogyman et Hollow à partir des épisodes, sans les fusionner ni importer les prolongements des comics.
5. Pour les recettes, ne publier que les composants et modalités réellement attestés ; conserver les quantités ou étapes inconnues comme inconnues.
6. Lors d’une future intégration, dédupliquer avec `construction.json` et `magie-demons.json`, fixer la disponibilité chronologique et choisir les faits admissibles. Les fiches narratives ne créent pas automatiquement des identifiants acceptés par `canon.verify`.
7. Vérifier que les connaissances du directeur ne révèlent pas à l’adversaire les secrets de la partie et tester le nouveau corpus sur une partie de contrôle séparée.

## Contrôles réalisés

Le JSON est lisible, les 24 identifiants sont uniques, chaque fiche possède une source et les identifiants d’épisodes renseignés existent dans l’index local. Cela vérifie la structure, pas l’exactitude de chaque détail narratif. Le module `serveur/charmed/expertise-runtime.js` charge des fichiers explicites du dossier `canon`, pas ce dossier de recherche.

