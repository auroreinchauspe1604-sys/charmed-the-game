# Vérification de la réorganisation — 10 septembre 2026

## Périmètre

Réorganisation effectuée uniquement dans :

`C:\Users\auror\Videos\charmed\travail-equipe\travail-project-manager`

Le projet actif `C:\Users\auror\Videos\charmed\logic-match` n’a pas été modifié pendant cette opération.

## Sauvegarde avant migration

Une copie complète et vérifiée a été créée ici :

`C:\Users\auror\Videos\charmed\travail-equipe\securisation-migrations\avant-reorganisation-pm-2026-09-10_013908`

- 390 fichiers sauvegardés ;
- 221 012 970 octets ;
- 390 empreintes SHA-256 comparées avec succès ;
- manifeste : `MANIFEST_SAUVEGARDE.json`.

## Résultat structurel

- 390 destinations prévues par l’inventaire technique sont présentes sur 390 ;
- aucune collision de destination ;
- les règles actées sont dans `regles/REGLES_ACTEES.md` ;
- les trois scénarios sont séparés dans `scenarios/` ;
- le code, les écrans et les scripts sont regroupés dans `technique/` ;
- les visuels utilisés et les ateliers sont séparés dans `visuels/jeu/` et `visuels/atelier/` ;
- les archives et la documentation historique restent séparées du fonctionnement courant.

## Huit catégories de la bibliothèque

Les huit catégories prévues existent :

1. personnages ;
2. pouvoirs et capacités ;
3. êtres et créatures ;
4. organisations et groupes ;
5. objets ;
6. sorts, rituels et potions ;
7. lieux et mondes ;
8. phénomènes et principes.

Le fichier `bibliotheque/catalogue.json` les déclare avec une activation en attente de validation et aucune fiche activée. Les nouvelles fiches de l’expert bibliothèque n’ont donc pas été incorporées au moteur.

Pendant la transition, le moteur lit encore les anciennes données compatibles conservées dans `technique/donnees-bibliotheque`. Ce maintien évite de casser le jeu avant la validation et la conversion progressive des nouvelles fiches.

## Chemins adaptés

Le serveur centralise maintenant les chemins vers :

- les règles ;
- les écrans ;
- les scripts ;
- les états ;
- les scénarios ;
- les visuels du jeu ;
- les données techniques de bibliothèque.

Les chargeurs des trois scénarios, les lanceurs, les tests et les scripts de production documentaire ont été adaptés à la nouvelle arborescence. La configuration de lancement locale pointe vers `technique/serveur/serveur.js`.

## Contrôles exécutés

- tests Node du moteur Charmed : 101 réussis sur 101 ;
- tests Python du greffier : 113 réussis, 1 test explicitement ignoré ;
- syntaxe de tous les fichiers JavaScript et CommonJS sous `technique/` : aucune erreur ;
- chargement direct des scénarios `avant-la-vision`, `manoir-assiege` et `manoir-assiege-souple` : réussi ;
- contrôle HTTP isolé des trois scénarios : page 200, règles accessibles, expertise accessible, visuel 200 ;
- 32 références de visuels utilisées par l’interface : 32 fichiers présents ;
- fichiers de sauvegarde et d’état : 31 empreintes inchangées sur 31.

Les contrôles HTTP ont utilisé des copies temporaires des états. Ils n’ont écrit dans aucune partie conservée.

## Points restant à traiter avant intégration active

1. La conversion et l’activation des fiches de la nouvelle bibliothèque restent volontairement en attente de la validation d’Aurore. Il faudra les intégrer catégorie par catégorie avec des identifiants stables et une vue technique générée.
2. Le script historique `technique/scripts/partie_ia.py` contient toujours un appel à `append_flux.py`, fichier absent déjà avant cette migration. Les fonctions actuelles du jeu et les tests ne l’utilisent pas. Il faudra décider s’il doit être réparé ou classé avec les archives avant de présenter toute la chaîne technique comme entièrement maintenue.
3. Les anciens dossiers racine déplacés peuvent subsister comme répertoires vides, ainsi que des caches Python. Ils ne contiennent plus les fichiers fonctionnels et ne seront pas suivis par Git. Leur nettoyage pourra être fait séparément après validation de l’arborescence.

## Conclusion de contrôle

La copie réorganisée est fonctionnelle pour le moteur et les trois scénarios testés. Elle est prête à être examinée avant toute intégration, sans activation anticipée de la nouvelle bibliothèque et sans modification des sauvegardes.
