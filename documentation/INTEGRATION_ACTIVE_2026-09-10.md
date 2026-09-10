# Intégration active de l’architecture — 10 septembre 2026

## Décision appliquée

La réorganisation validée a été intégrée dans le projet actif. L’intégration conserve le fonctionnement transitoire de la bibliothèque et n’active aucune nouvelle fiche experte.

## Sauvegarde préalable

La version complète du projet actif avant intégration est conservée dans :

`C:\Users\auror\Videos\charmed\travail-equipe\securisation-integrations\avant-architecture-2026-09-10_021021`

Les 408 fichiers sauvegardés ont été comparés avec succès à leur source. Le manifeste est `MANIFEST_AVANT_INTEGRATION.json`.

Le dossier privé des journaux d’arbitrage a été inclus dans le périmètre de sauvegarde. Il ne contenait aucun fichier au moment de l’opération.

## Préservation

- les 31 fichiers de `etat` sont restés dans le projet actif ;
- aucune sauvegarde de la copie du project manager ne les a remplacés ;
- leurs 31 empreintes SHA-256 sont inchangées après intégration et après lancement ;
- les cinq dossiers visuels récents absents de la copie du project manager ont été conservés ;
- le dossier `.git` du projet actif n’a pas été remplacé.

## Vérifications

- 369 fichiers hors état de la copie réorganisée : 369 correspondances exactes dans le projet actif ;
- tests Node : 101 réussis sur 101 ;
- tests Python : 113 réussis, 1 test explicitement ignoré ;
- syntaxe JavaScript et CommonJS : aucune erreur ;
- les trois scénarios répondent avec leurs chemins réorganisés ;
- page, règles, expertise et visuels : réponses HTTP réussies ;
- serveur de la partie `manoir-assiege-souple` lancé sur le port 3131 ;
- sauvegarde active chargée à la révision 26.

## Accès

`http://localhost:3131/?partie=manoir-assiege-souple`

Le joueur peut reprendre la partie à cette adresse.
