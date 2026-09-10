# Revue et intégration des contributions — 8 septembre 2026

## Verdict

Contributions suffisamment structurées et documentées pour enrichir le jeu à ce stade. Pas de certification d’expertise exhaustive : les lacunes et niveaux réels de preuve restent visibles. La recherche des contributeurs a été examinée ; un contrôle web ciblé a recoupé les cristaux à trois, le contexte de Scry Hard, les pouvoirs retirés de Cole et la potion répandue. Ce n’est pas une nouvelle vérification indépendante de chacune des 150 observations.

## Contenu retenu

| Contribution | Intégration |
| --- | --- |
| Personnages | 40 profils et 150 observations datées dans personnages.json ; vues lisibles dans PERSONNAGES_DETAILLES.md ; anciennes étapes de capacités conservées, aucune observation transformée automatiquement en acquisition. |
| Lieux | 11 fiches et leurs sources ; sous-sol/Nexus séparés, chronologie de l’École et des lieux professionnels préservée. |
| Objets | 8 familles avec variantes, notamment cristaux et bagues de Cupidon. |
| Potions | 7 fiches ; préparation, application, retrait, transfert et destruction distingués. |
| Cole/Balthazar | Complément de 7 sections sur états, moyens, psychologie et cartes proposées ; pas un personnage supplémentaire distribué. |

Les quatre dossiers spécialisés sont convertis en données revues dans ce dossier. Le chargeur n’exécute pas les instructions des propositions et ne lit pas automatiquement tout nouveau dossier de contribution. Un manifeste explicite identifie les copies intégrées et les empreintes des documents d’origine.

Le socle de construction corrige les formulations trop restrictives : cristaux limités au confinement, accès « autorisé » comme condition universelle de l’École, utilisateur « autorisé » de la bague, repères tardifs de localisation et retrait supposé définitif. Les anciennes sources restent accessibles ; les compléments fournissent leurs contre-exemples.

26 observations revues supplémentaires possèdent des identifiants canoniques admissibles. Un tel identifiant représente un précédent documenté et conserve son niveau de preuve ; il ne certifie ni visionnage ni capacité permanente. Les autres observations et les cartes proposées restent des références contextuelles.

## Vérifications techniques

82 tests automatisés passent : intégrité des sources, périodes, chargement des contributions, absence de biographies dans le contexte adverse et régression du moteur existant. Ce contrôle de séparation ne résout pas encore le problème discuté de transmission des justifications publiques à l’adversaire.

Le serveur sur 3130 était arrêté. Il a été relancé avec le même scénario et le même dossier de sauvegarde. L’API `/api/charmed/expertise` confirme `contributions-2026-09-08-v1`, 40 profils et les quatre dossiers spécialisés. La partie reste Le manoir assiégé, jour 2, révision 10, phase joueur au contrôle. Les empreintes des cinq journaux sont inchangées.

Un essai documentaire réel de l’IA, sans Store ni sauvegarde, a réussi et est enregistré dans `verification-ia.json` : l’Ange retrouve le précédent de la potion répandue de S05E07, cite `library:potion-repandue` et conserve ses limites. Cet essai ne simule pas une partie entière.

## Limites restantes

Les contributions ne couvrent pas tous les objets, potions, personnages et lieux de tous les épisodes. Les fiches courtes de plusieurs personnages restent à approfondir. Les gestes, recettes ou interactions encore incertains nécessitent une vérification ciblée quand ils deviennent déterminants.

Aucun changement des budgets, des questions, de leur suspension ou du verdict de fin de journée n’est inclus dans cette intégration documentaire. Les discussions récentes sur ces mécanismes restent un chantier distinct. Aucun acte passé, carte retirée ou réponse de la sauvegarde n’a été réécrit.
