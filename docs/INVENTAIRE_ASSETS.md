# Inventaire des assets Charmed

Extrait automatiquement des corpus du dépôt. Chaque ligne indique le niveau de formalisation réel.

## 0. Volumétrie

| Corpus | Fichier | Entrées | Champ de règle exploitable |
|---|---|---|---|
| Personnages | canon/personnages.json | 40 | prose (`cardVariants`, `avoid`) |
| Jalons de pouvoirs | canon/personnages.json → milestones | 15 | **structuré** (capability, episode, kind) |
| Imports exclus | canon/personnages.json → excludedImports | 2 | **structuré** |
| Règles magiques | canon/magie-demons.json → rules | 13 | semi (claim, application, notImplied) |
| Démons (socle) | canon/magie-demons.json → demons | 15 | semi (capabilities, limits, counter) |
| Êtres | canon/magie-demons.json → beings | 4 | semi |
| Lieux (socle) | canon/magie-demons.json → places | 1 | semi |
| Démons documentés | contributions-integrees/demons-documentes.json | 40 | prose + exactRecipe |
| Objets magiques | contributions-integrees/objets-magiques.json | 80 | prose |
| Lieux détaillés | contributions-integrees/lieux.json | 11 | prose |
| Objets détaillés | contributions-integrees/objets.json | 8 | prose |
| Potions | contributions-integrees/potions-types-usages.json | 7 | prose |
| Faits admissibles (socle) | canon/base.json → facts | 11 | **structuré** (season, episode, status) |
| Faits admissibles (ajouts) | canon/bibliotheque-verifiee.json → facts | 29 | **structuré** |
| Épisodes | canon/episodes-index.json | 178 | **structuré** (id SxxExx, saison, n°) |

## 1. Jalons de pouvoirs — le seul modèle mécanique de capacités

C'est la seule table que `canon.js` transforme en faits opposables, filtrés par période.

| Épisode | Personnage | Nature | Capacité / affirmation | Statut de preuve |
|---|---|---|---|---|
| S01E01 | prue | acquisition | telekinesis | secondary_supported |
| S02E09 | prue | acquisition | astral_projection | secondary_supported |
| S03E06 | prue | temporary_event | empathy | synopsis_supported |
| S04E01 | prue | death_confirmed | La mort de Prue est confirmée après l'attaque de Shax de fin de saison 3. | secondary_supported |
| S01E01 | piper | acquisition | immobilization | secondary_supported |
| S03E20 | piper | acquisition | combustion | corroborated |
| S01E01 | phoebe | acquisition | premonition | secondary_supported |
| S03E01 | phoebe | acquisition | levitation | secondary_supported |
| S06E01 | phoebe | acquisition | empathy | needs_corroboration |
| S06E19 | phoebe | loss | Phoebe est privée de ses pouvoirs à la suite du Tribunal. | needs_corroboration |
| S07E05 | phoebe | restoration | premonition | secondary_supported |
| S04E01 | paige | identity_revelation | Paige découvre sa parenté avec les Halliwell ; Patty et Sam sont ses parents biologiques. | secondary_supported |
| S04E02 | paige | acquisition | telekinetic_orbing | secondary_supported |
| S04E02 | paige | conditional_event | assisted_healing | secondary_supported |
| S08E12 | paige | acquisition | autonomous_healing | secondary_supported |

### Capacités exclues explicitement

| Personnage | Capacité | Motif |
|---|---|---|
| paige | orb_shield | La source le situe dans la continuation en comics ; cette fiche ne l'autorise pas dans la série télévisée. |
| piper | molecular_acceleration | Capacité distincte décrite dans les comics ; ne pas la confondre avec la combustion télévisée. |

## 2. Règles magiques transversales

| id | Titre | Affirmation | Ce qu'elle n'implique pas | Statut |
|---|---|---|---|---|
| `power-of-three` | Pouvoir des Trois | Pouvoir collectif des Charmed Ones ; le trio change après Prue. Une exception de transfert exige son contexte. | Trois ressources quelconques ne forment pas le Pouvoir des Trois. | documented_baseline |
| `sister-bond` | Lien entre les sœurs | Power Outage montre une rupture du lien accompagnée d'une perte de pouvoirs sous influence démoniaque. | Une dispute ne supprime pas automatiquement tous les pouvoirs. | documented_baseline |
| `personal-gain` | Bénéfice personnel | L'usage intéressé ou vengeur de la magie peut produire des conséquences ; Morality Bites en explore le danger. | Ne pas inventer une sanction systématique, identique et immédiate pour toute utilisation utile au personnage. | documented_baseline |
| `book-of-shadows` | Livre des Ombres | Livre familial enrichi de connaissances, formules et potions. Ses protections existent mais varient et peuvent être contournées. | Posséder le Livre ne donne ni toutes les réponses ni les moyens nécessaires. | documented_baseline |
| `specific-potions` | Potions et ingrédients spécifiques | Dans la préparation contre Belthazor, un fragment de sa chair est nécessaire. Black as Cole distingue retrait des pouvoirs et destruction. | Ni recette universelle ni substitution d'ingrédient déclarée canonique sans preuve. | documented_baseline |
| `spell-effect` | Formules et effets distincts | Une formule peut protéger, invoquer ou bannir selon son usage ; le Livre conserve des méthodes différentes. | Une phrase bien formulée par le joueur ne crée pas à elle seule un pouvoir illimité. | documented_baseline |
| `healing` | Guérison | La guérison connaît des limites et des cas particuliers ; une contribution avec Leo ne prouve pas l'autonomie du second intervenant. | Ne pas confondre guérison et résurrection libre ; ne pas généraliser les exceptions. | documented_baseline |
| `scrying` | Localisation au cristal | Scry Hard montre l'utilisation d'un cristal avec une carte pour localiser. | Localiser ne révèle pas automatiquement intentions, contenu d'un document ou moyen de vaincre la cible. | documented_baseline |
| `crystal-cage` | Cage de cristaux | Un dispositif de cristaux enchantés forme un piège ; sa disposition et son orientation comptent. | Avoir un cristal dans la main n'établit pas qu'une cage complète retient déjà l'ennemi. | documented_baseline |
| `time-travel` | Temps et futurs | Tempus provoque des répétitions temporelles dans son action avec Rodriguez. | Ni recommencement gratuit d'un tour ni capacité temporelle attribuée à tous. | documented_baseline |
| `possession-transfer` | Possession et transfert | La Source peut agir à travers des hôtes ; le Hollow absorbe la magie dans un contexte particulier. | La possession ou le vol observé ne donne pas toutes les capacités de toutes les versions d'un personnage. | documented_baseline |
| `vanquish-return` | Vaincre, bannir et revenir | Abraxas annule des destructions en lisant le Livre à rebours ; cette exception a un mécanisme précis. | Une disparition visuelle n'est pas une preuve universelle de mort définitive ; un retour exige aussi un moyen. | documented_baseline |
| `entity-types` | Nature de l'adversaire | La série distingue démons, warlocks et autres antagonistes ; Gideon, les Avatars et les sœurs Jenkins ne doivent pas être classés indistinctement comme démons. | Une potion contre un démon n'est pas démontrée efficace contre toute créature hostile. | documented_baseline |

## 3. Démons du socle — capacités, limites, contre-moyen

### Les Grimlocks

- **Nature** : Démons qui volent la vue, notamment celle des enfants, pour percevoir les auras des personnes bonnes.
- **Motivation** : Repérer et attaquer leurs victimes grâce à la vue dérobée.
- **Capacités** : Vol de la vue ; perception des auras conditionnée par ce vol.
- **Limites** : Ne pas leur attribuer cette perception sans la ressource sensorielle volée. / Ne pas transformer tous les cas de cécité en un même effet réversible automatiquement.
- **Contre-moyen** : partial_method_not_recipe — Une potion est employée contre les Grimlocks. La recette exacte et les conditions de restitution de la vue doivent être vérifiées pour la scène concernée.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S01E19
- **Inconnues** : Durée du vol, portée des attaques, recette complète et différences entre victimes.

### Javna

- **Nature** : Démon qui dérobe la force vitale et la jeunesse sous une identité humaine.
- **Motivation** : Se maintenir jeune aux dépens de ses victimes.
- **Capacités** : Prélèvement de force vitale ; couverture humaine de Stefan.
- **Limites** : Personnage distinct de l'Ange de la Mort. / Ne pas en faire un pouvoir universel de mort instantanée.
- **Contre-moyen** : partial_method_not_recipe — La Main de Fatima est le moyen de bannissement mentionné dans l'épisode. La formule et sa réalisation exacte restent à documenter avant utilisation automatique.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S01E02
- **Inconnues** : Périodicité, procédé complet de prélèvement et mise en œuvre exacte de la Main de Fatima.

### Inspecteur Rodriguez

- **Nature** : Démon infiltré sous une identité d'inspecteur enquêtant sur Andy.
- **Motivation** : Atteindre les Charmed Ones en utilisant l'enquête et Andy comme moyens de pression.
- **Capacités** : Manipulation sous couverture policière ; projection de boules d'énergie.
- **Limites** : Les recommencements temporels proviennent de Tempus, pas d'un pouvoir personnel de Rodriguez. / Ses informations et ses souvenirs doivent être situés dans la bonne tentative.
- **Contre-moyen** : partial_method_not_recipe — Après la fin de la boucle temporelle, Prue le détruit en lui renvoyant sa propre boule d'énergie. Le neutraliser pendant une tentative ne démontre pas la fin de la boucle.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S01E21, S01E22
- **Inconnues** : Portée complète des capacités et chronologie précise des informations acquises.

### Banshee

- **Nature** : Créature dont le cri est lié à la souffrance de ses victimes ; Phoebe subit une transformation en Banshee.
- **Motivation** : Traquer des personnes en grande souffrance.
- **Capacités** : Cri aigu ; transformation observée chez Phoebe.
- **Limites** : Distinguer la Banshee qui attaque et Phoebe transformée. / La souffrance seule ne suffit pas à déclarer une transformation sans mécanisme. / Ne pas importer automatiquement les propriétés de la Banshee folklorique.
- **Contre-moyen** : partial_method_not_recipe — Pour sauver Phoebe, l'intervention de Cole et l'expression de sa propre souffrance participent à la levée de la transformation. Ce sauvetage n'est pas une méthode universelle de destruction de toutes les Banshees.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S03E21
- **Inconnues** : Portée du cri, conditions complètes de transformation, résistances et destruction de la créature d'origine.

### Les Furies

- **Nature** : Créatures vengeresses ; leur fumée peut transformer une sorcière dont la colère est refoulée.
- **Motivation** : S'en prendre aux personnes qu'elles punissent et exploiter la colère.
- **Capacités** : Fumée insufflée à Piper ; transformation liée à sa colère non exprimée.
- **Limites** : Une émotion n'est pas à elle seule une transformation magique. / Piper transformée reste une victime à sauver ; ne pas confondre son sauvetage avec la destruction d'une Furie.
- **Contre-moyen** : partial_method_not_recipe — Leo et Paige conduisent Piper à la tombe de Prue ; l'expression de sa colère et de son deuil permet son retour. Une simple injonction à se calmer ne prouve pas le même résultat.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S04E03
- **Inconnues** : Modalités complètes de punition, résistances et destruction des Furies non transformées depuis une sœur.

### La Source du Mal

- **Nature** : Autorité et essence démoniaque avec plusieurs incarnations.
- **Motivation** : Domination des Enfers et destruction des Charmed Ones.
- **Capacités** : Possession d'hôtes ; recours au Hollow pour absorber des pouvoirs dans un contexte particulier.
- **Limites** : Séparer l'incarnation rencontrée, la Source en Cole et les pouvoirs acquis temporairement.
- **Contre-moyen** : partial_method_not_recipe — Étudier séparément Charmed and Dangerous et la confrontation à Cole-Source ; la recette de l'un n'est pas transposable sans preuve.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S04E13, S04E20
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### Balthazar

- **Nature** : Identité démoniaque de Cole ; ne décrit pas toutes ses incarnations.
- **Motivation** : Mission contre les sœurs en conflit avec son attachement à Phoebe.
- **Capacités** : Pouvoirs démoniaques associés à sa forme ; inventaire détaillé à compléter.
- **Limites** : Cole humain et Cole investi de pouvoirs ultérieurs ne sont pas la même cible magique.
- **Contre-moyen** : partial_method_not_recipe — La potion préparée en S03E08 exige un fragment de sa chair. En S04E08, une autre potion retire les pouvoirs démoniaques ; elle ne tue pas Cole.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S03E08, S04E08
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### Barbas

- **Nature** : Démon récurrent.
- **Motivation** : Exploiter les peurs des victimes.
- **Capacités** : Perception et exploitation de leurs peurs.
- **Limites** : Les conditions de présence et les pouvoirs supplémentaires varient selon son retour.
- **Contre-moyen** : partial_method_not_recipe — Surmonter la peur intervient dans les confrontations ; une potion intervient aussi. Identifier l'apparition avant de fixer le moyen suffisant.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S01E13, S07E01
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### Shax

- **Nature** : Assassin démoniaque au service de la Source.
- **Motivation** : Éliminer les cibles désignées par la Source.
- **Capacités** : Attaque meurtrière de fin de saison 3 ; pouvoirs précis à recouper.
- **Limites** : L'attaque, le retour temporel et la destruction ultérieure sont des événements distincts.
- **Contre-moyen** : partial_method_not_recipe — Le trio reconstitué avec Paige parvient à le vaincre. Vérifier la formule spécifique et sa mise en œuvre ; elle n'est pas transcrite ici.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S03E22, S04E01, S04E02
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### Zankou

- **Nature** : Démon stratège.
- **Motivation** : S'emparer du pouvoir, du manoir et du Nexus.
- **Capacités** : Stratégies autour des liens entre les sœurs et le Nexus.
- **Limites** : Pouvoirs volés et accès au Nexus sont des acquisitions de scénario, pas des moyens disponibles à toute époque.
- **Contre-moyen** : partial_method_not_recipe — La confrontation implique le Nexus et un sort employé contre lui ; les étapes finales et l'état de Zankou doivent être recoupés avant d'en faire une méthode jouable.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S07E17, S07E22
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### La Triade

- **Nature** : Collectif démoniaque.
- **Motivation** : Combattre les Charmed Ones ; rôle dans l'intrigue de Billie et Christy.
- **Capacités** : Actions collectives ; attaques et retours selon les phases.
- **Limites** : Distinguer membres, corps et retours ; ne pas additionner toutes leurs incarnations.
- **Contre-moyen** : partial_method_not_recipe — Une confrontation emploie le renvoi d'une attaque contre un membre ; une autre des potions. Préciser la phase avant de décider qu'une destruction suffit.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S08E16, S08E22
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### La Prophétesse de la Source

- **Nature** : Conseillère démoniaque de l'arc de la Source.
- **Motivation** : Manipuler la succession de la Source.
- **Capacités** : Anticipation et manipulation ; tonique administré à Phoebe.
- **Limites** : À distinguer de Kyra et de l'Oracle ; une vision ne prouve pas l'omniscience.
- **Contre-moyen** : partial_method_not_recipe — La destruction finale et ses conditions restent à recouper. Aucun contre universel n'est établi dans cette fiche.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S04E13, S04E21
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### Tempus

- **Nature** : Démon associé à la manipulation temporelle.
- **Motivation** : Aider Rodriguez à réussir son attaque contre les sœurs.
- **Capacités** : Répétition temporelle permettant de corriger les tentatives.
- **Limites** : Les bénéficiaires, souvenirs conservés et déclencheurs doivent être précisés.
- **Contre-moyen** : partial_method_not_recipe — Le moyen exact de rompre la boucle reste à recouper ; une attaque physique sur Rodriguez ne démontre pas à elle seule la fin du dispositif.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S01E22
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### Abraxas

- **Nature** : Démon voleur du Livre.
- **Motivation** : Défaire les accomplissements magiques des sœurs.
- **Capacités** : Lecture inversée du Livre annulant des destructions.
- **Limites** : Le procédé dépend de son accès au Livre ; ce n'est pas une résurrection générale sans support.
- **Contre-moyen** : partial_method_not_recipe — Reprendre le Livre et empêcher la progression du procédé sont des enjeux établis ; la mise à mort exacte reste à documenter.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S02E01
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

### Le Woogyman

- **Nature** : Entité d'ombre liée à l'intrigue du sous-sol du manoir.
- **Motivation** : Influencer et prendre le contrôle.
- **Capacités** : Influence sur Phoebe dans l'épisode d'origine ; détails dans la base initiale.
- **Limites** : Ne pas fusionner sans examen le Woogyman, le Nexus et tous les démons d'ombre.
- **Contre-moyen** : partial_method_not_recipe — Phoebe se souvient de la formule transmise par Penny ; l'effet de bannissement doit être distingué d'une destruction définitive.
- **Recette exacte** : **absente**
- **Disponibilité** : requires_scenario_review | **Statut** : research_baseline | **Épisodes** : S01E15, S02E01
- **Inconnues** : Chronologie complète des apparitions et retours, portée, immunités et méthode exacte à approfondir.

## 4. Démons documentés (contributions intégrées)

| # | Titre | Type | Épisodes repères | Recette exacte | Statut |
|---|---|---|---|---|---|
| 1 | La Source du Mal | titre_et_incarnations | S04E13, S04E21, S08E04 | **null** | documented_partial |
| 2 | Barbas | individu | S01E13, S05E07, S07E01 | **null** | documented_partial |
| 3 | Zankou | individu | S07E10, S07E22 | **null** | documented_partial |
| 4 | La Triade | collectif | S03E07, S08E16, S08E21, S08E22 | **null** | documented_partial |
| 5 | Cole Turner / Balthazar (Belthazor) | hybride_individuel | S03E08, S03E19, S03E20, S03E21, S04E08, S04E13, S05E12, S07E16 | **null** | documented_partial |
| 6 | La Prophétesse / Seer de la saison 4 | individu | S04E13, S04E15, S04E21 | **null** | documented_partial |
| 7 | Kyra | individu | S07E10 | **null** | documented_partial |
| 8 | Shax | individu | S03E22, S04E01, S04E02 | **null** | documented_partial |
| 9 | Tempus | individu | S01E22, S03E22 | **null** | documented_partial |
| 10 | Abraxas | individu | S02E01 | **null** | documented_partial |
| 11 | Woogyman / Woogy | entite_possessive | S01E15 | **null** | documented_partial |
| 12 | Inspecteur Rodriguez | individu | S01E22 | **null** | documented_partial |
| 13 | Dumain | individu | S08E21, S08E22 | **null** | documented_partial |
| 14 | Confrérie de l'Épine / Brotherhood of the Thorn | organisation | S03E19, S03E20 | **null** | documented_partial |
| 15 | Raynor | individu | S03E19, S03E20 | **null** | documented_partial |
| 16 | Vornac | individu | S03E19 | **null** | documented_partial |
| 17 | Klea | individu | S03E19 | **null** | documented_partial |
| 18 | Sykes | individu | S04E08 | **null** | documented_partial |
| 19 | Krell | individu | S03E08 | **null** | documented_partial |
| 20 | Andras | individu | S03E07 | **null** | documented_partial |
| 21 | Grimlocks | espece | S01E19 | **null** | documented_partial |
| 22 | Furies | espece_et_transformation | S04E03 | **null** | documented_partial |
| 23 | Banshee | espece_et_transformation | S03E21 | **null** | documented_partial |
| 24 | Démons Lazarus | espece | S04E15 | **null** | documented_partial |
| 25 | Vinceres | individu | S03E06 | **null** | documented_partial |
| 26 | Troxa | individu | S03E05 | **null** | documented_partial |
| 27 | Ludlow | individu | S04E12 | **null** | documented_partial |
| 28 | Masselin | individu | S02E04 | **null** | documented_partial |
| 29 | Démon de l'eau | individu | S02E08 | **null** | documented_partial |
| 30 | Démon de l'Illusion | individu | S02E18 | **null** | documented_partial |
| 31 | Imara | individu | S07E19 | **null** | documented_partial |
| 32 | Javna / Stefan | individu | S01E02 | **null** | documented_partial |
| 33 | Drazi | individu | S02E10 | **null** | documented_partial |
| 34 | La Sirène / The Siren | individu | S05E04 | **null** | documented_partial |
| 35 | Gith | individu | S06E06 | **null** | documented_partial |
| 36 | Drake | ancien_demon | S07E14, S07E16 | **null** | documented_partial |
| 37 | L'Oracle de la Source | individu | S04E07 | **null** | documented_partial |
| 38 | Seekers / démons chercheurs | espece | S03E16 | **null** | documented_partial |
| 39 | Jeric | individu | S05E10 | **null** | documented_partial |
| 40 | Zahn | individu | S06E07 | **null** | documented_partial |

## 5. Objets magiques

| # | Titre | Épisodes repères | Vérification | Statut |
|---|---|---|---|---|
| 1 | Livre des Ombres | S01E01, S01E03, S03E13, S05E08, S07E21 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 2 | Grimoire de la Source | S04E19, S04E21 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 3 | Cristaux de protection, d'alarme et de confinement | S03E05, S04E13, S07E08 | mixte_extraits_indexes_et_dialogues_non_officiels_consultes | documented_partial |
| 4 | Cristal de localisation | S06E21, S07E17 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 5 | Bagues de Cupidon — Cupidon S02 et Coop S08 | S02E10, S08E17, S08E22 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 6 | Boîte du Hollow | S04E13, S08E21 | mixte_extraits_indexes_et_dialogues_non_officiels_consultes | documented_partial |
| 7 | Anneau d'inspiration | S04E09 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 8 | Arbalète et projectiles d'Être des ténèbres | S01E21, S03E11, S05E04 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 9 | Bague protectrice de Victor | S01E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 10 | Bague d'immunité de Nicholas | S01E17, S02E01 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 11 | Amulette protectrice d'Anton et de P. Russell | S02E14 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 12 | Amulettes jumelles de Leeza et Janna | S03E20 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 13 | Amulettes de chasse aux sorcières de Jackman | S04E22 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 14 | Œil d'Aghbar | S06E15 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 15 | Evil Eye — talisman de Nicolae | S05E06 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 16 | Amulette de Sarpedon | S07E07 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 17 | Pendentif de Valkyrie | S06E01, S06E02 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 18 | Totem des trois singes | S05E20 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 19 | Talisman chinois contre les esprits | S01E04 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 20 | Talismans de Ruth Cobb | S03E04 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 21 | Talisman du sorcier-guérisseur | S05E13 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 22 | Baguette de Tuatha | S02E06 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 23 | Baguette de Gammill | S04E05 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 24 | Baguette de Rathmere | S06E18 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 25 | Excalibur | S06E08, S06E23 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 26 | Lame du Dragon | S04E04, S06E10 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 27 | Épée de cristal de Gabriel | S01E16 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 28 | Athamé absorbant les pouvoirs | S06E21 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 29 | Athamé maudit des pirates | S07E04 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 30 | Athamé enchanté de Gideon | S06E23 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 31 | Cœur en étain de Melinda | S01E09 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 32 | Urne égyptienne maudite | S01E11 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 33 | Lanterne de collecte des pouvoirs | S01E10 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 34 | Bouteilles de génie | S02E22, S06E15 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 35 | Boîte de Pandore | S07E18 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 36 | Coffre des sept péchés capitaux | S03E18, S08E20 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 37 | Baguette de Lukas | S03E18 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 38 | Cage de la Prophétesse | S04E21 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 39 | Cage aquatique de la Crone | S05E20 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 40 | Urne des pouvoirs divins | S05E22, S05E23 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 41 | Maison de poupées Halliwell | S07E17, S08E13 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 42 | Tableau maudit de Nell | S02E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 43 | Roman Crossed, Double-Crossed | S07E08 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 44 | Appareil photo de Vaklav | S08E07 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 45 | Planchette spirite des Halliwell | S01E01, S02E21, S08E13 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 46 | Alliance ensorcelée de Grams | S04E12, S08E20 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 47 | Vêtements de Grams renvoyant à leur propriétaire | S06E11 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 48 | Bâton mystique de Bouddha | S08E14 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 49 | Ceinture dorée de Gaïa | S08E08 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 50 | Cristal de Kasimar | S08E08 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 51 | Cristaux Ronyx | S06E21 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 52 | Cristal de paranoïa | S07E12 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 53 | Cristal des rêves | S08E19 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 54 | Cristaux de pyrite d'alarme | S06E11 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 55 | Cristaux de dissimulation | S06E17, S08E17 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 56 | Dispositif de cristaux de Burke | S08E10 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 57 | Boule de cristal de Gideon | S06E21 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 58 | Lumière de l'amour éternel | S03E16 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 59 | Sablier de Tempus | S01E22 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 60 | Miroir entre les deux mondes | S06E22, S06E23 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 61 | Miroir de Kali | S01E07 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 62 | Miroir magique des contes | S05E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 63 | Livre magique des contes | S05E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 64 | Pomme empoisonnée des contes | S05E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 65 | Pantoufles de verre | S05E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 66 | Cape rouge des contes | S05E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 67 | Carrosse-citrouille | S05E03 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 68 | Bâton de leprechaun — shillelagh | S05E17, S06E18, S08E20 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 69 | Baguette de capture des phantasmes | S06E19 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 70 | Poussière du marchand de sable | S05E14 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 71 | Poussière de fée | S03E03, S05E22, S05E23 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 72 | Fiole de capture d'âme | S06E01, S06E02 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 73 | Scarabées égyptiens de transfert | S05E10 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 74 | Cercle de vérité du Tribunal | S06E19 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 75 | Liste de la Mort | S07E05 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 76 | Balai enchanté de Phoebe | S03E04 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 77 | Grimoire de Tuatha | S02E06 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 78 | Grimoire des Phoenix | S06E10 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 79 | Camion du marchand de glaces | S03E10 | extraits_indexes_non_validation_exhaustive | documented_partial |
| 80 | Sceptre de moralité de l'Ordre | S06E12 | extraits_indexes_non_validation_exhaustive | documented_partial |

## 6. Lieux

| # | Titre | Autorité de preuve | Statut |
|---|---|---|---|
| 1 | 3.1 Manoir Halliwell — `lieu-manoir` / socle `manor` | background_with_sources | reviewed_documentary |
| 2 | 3.2 Grenier du manoir — `lieu-grenier` / socle `attic` | background_with_sources | reviewed_documentary |
| 3 | 3.3 Sous-sol et site du Nexus — `lieu-cave` | background_with_sources | reviewed_documentary |
| 4 | 3.4 Buckland — `lieu-buckland` | background_with_sources | reviewed_documentary |
| 5 | 3.5 Quake — `lieu-quake` | background_with_sources | reviewed_documentary |
| 6 | 3.6 P3 — nouvel identifiant proposé `lieu-p3` / socle `p3` | background_with_sources | reviewed_documentary |
| 7 | 3.7 Bay Mirror — nouvel identifiant proposé `lieu-bay-mirror` / socle `bay-mirror` | background_with_sources | reviewed_documentary |
| 8 | 3.8 École de magie — `lieu-ecole` / socle `magic-school` | background_with_sources | reviewed_documentary |
| 9 | 3.9 Monde souterrain — `lieu-enfers` | background_with_sources | reviewed_documentary |
| 10 | 3.10 Régions supérieures — `lieu-regions-superieures` | background_with_sources | reviewed_documentary |
| 11 | 3.11 Décharge démoniaque — `lieu-decharge` | background_with_sources | reviewed_documentary |

## 7. Objets (socle détaillé)

| # | Titre | Autorité de preuve | Statut |
|---|---|---|---|
| 1 | O01 — Livre des Ombres | background_with_sources | reviewed_documentary |
| 2 | O02 — Grimoire de la Source | background_with_sources | reviewed_documentary |
| 3 | O03 — Cristaux de protection et de confinement | background_with_sources | reviewed_documentary |
| 4 | O04 — Cristal de localisation | background_with_sources | reviewed_documentary |
| 5 | O05 — Bagues de Cupidon : deux descriptions selon la période | background_with_sources | reviewed_documentary |
| 6 | O06 — Boîte du Hollow | background_with_sources | reviewed_documentary |
| 7 | O07 — Anneau d’inspiration | background_with_sources | reviewed_documentary |
| 8 | O08 — Arbalète et projectiles d’Être des ténèbres | background_with_sources | reviewed_documentary |

## 8. Potions

| # | Titre | Autorité de preuve | Statut |
|---|---|---|---|
| 1 | P01 — Potion contre Belthazor | background_with_sources | reviewed_documentary |
| 2 | P02 — Potion de retrait des pouvoirs démoniaques de Cole | background_with_sources | reviewed_documentary |
| 3 | P03 — Retrait adapté aux pouvoirs acquis par Cole | background_with_sources | reviewed_documentary |
| 4 | P04 — Potion explosive de Piper | background_with_sources | reviewed_documentary |
| 5 | P05 — Potion de sommeil | background_with_sources | reviewed_documentary |
| 6 | P06 — Potion de téléportation, cas Billie et Christy | background_with_sources | reviewed_documentary |
| 7 | P07 — Potion de vérité | background_with_sources | reviewed_documentary |

## 9. Faits canoniques opposables

Seuls ces faits peuvent être cités par l'arbitre pour valider une capacité. Filtrés par période.

| id | Saison/Épisode | Affirmation | Statut |
|---|---|---|---|
| `initial-powers` | S1E1 | Au début de la série, Prue déplace les objets par télékinésie, Piper fige, Phoebe reçoit des prémonitions. | verified |
| `book-awakening` | S1E1 | Phoebe trouve le Livre des Ombres dans le grenier et lit l'incantation qui éveille les pouvoirs des sœurs. | verified |
| `vision-investigation` | S1E8 | Une prémonition de Phoebe conduit les sœurs à tenter d'arrêter un meurtrier. | verified |
| `woogy` | S1E15 | Un séisme libère un démon d'ombre qui retourne Phoebe contre sa famille. | verified |
| `time-travel` | S1E17 | Les sœurs voyagent dans les années 1970, lorsque leur mère est encore vivante. Cet épisode n'accorde pas un voyage temporel libre à volonté. | verified |
| `cole-altered-reality` | S5E12 | Cole modifie la réalité pour détruire le Pouvoir des Trois ; Phoebe cherche à le vaincre. Ne pas attribuer cette capacité à Cole à toute époque. | verified |
| `piper-birth` | S5E15 | Piper entre en travail pendant que des forces maléfiques complotent pour emporter son bébé. | verified |
| `zankou-premonition` | S7E22 | Zankou vole la prémonition de Phoebe et l'utilise pour anticiper les attaques des sœurs. C'est un événement situé dans le temps, pas un pouvoir dispon | verified |
| `scry-hard-siege` | S7E17 | Zankou organise une diversion avec des guerriers pour éloigner les sœurs et faire localiser le Nexus dans le manoir ; la localisation ne vaut pas enco | verified |
| `scry-hard-crystals` | S7E17 | Piper indique avoir disposé des cristaux pour protéger Léo au manoir. Cela établit un usage protecteur situé, pas une invulnérabilité universelle ni u | verified |
| `scry-hard-leo-mortal` | S7E17 | Léo est mortel, ne peut plus s’éclipser ni se guérir après avoir renoncé à ses pouvoirs. | verified |
| `library:crystals-three` | S7E8 | Dans Charmed Noir, Paige déplace trois cristaux autour de Miss Donovan pour former un bouclier. Cinq cristaux et un pentagramme ne sont donc pas des c | verified |
| `library:crystals-activation-electricity` | S4E13 | Dans Charmed and Dangerous, Phoebe et Paige disposent les cristaux autour de la Source ; la pose du dernier cristal par Paige fait apparaître des déch | verified |
| `library:crystals-removal` | S4E13 | Lors de cette confrontation, la Source utilise le pouvoir dérobé à Paige pour attirer un cristal dans sa main ; le piège disparaît. Retirer un cristal | verified |
| `library:contrib:piper:3` | S3E8 | Elle libère la tête de Krell en laissant le reste immobilisé : précédent de défigement partiel. | verified |
| `library:contrib:piper:4` | S3E20 | Leo explique son figement par le ralentissement des molécules et les explosions nouvelles par leur accélération. Piper explose d'abord alors qu'elle v | verified |
| `library:contrib:phoebe:5` | S6E19 | Le Tribunal lui retire explicitement empathie, prémonitions et lévitation pour l'usage personnel de ses visions ; une restitution peut être méritée. L | verified |
| `library:contrib:phoebe:6` | S7E5 | Une prémonition revient et elle reconnaît avoir retrouvé au moins un pouvoir. La scène ne rétablit pas les deux autres ; la vision porte sur des circo | verified |
| `library:contrib:paige:4` | S6E4 | Après le vol des pouvoirs de sorcières, ses orbes corporelles persistent ; un sort anti-orbes bloque ensuite sa tentative. Ascendances distinctes et p | verified |
| `library:contrib:paige:5` | S8E12 | Elle guérit Henry blessé par balle ; la conversation confirme qu'elle a agi seule et propose l'amour comme déclencheur. Cela ne limite pas ses soins à | verified |
| `library:contrib:leo:5` | S7E16 | Les Fondateurs lui retirent pouvoirs et souvenirs pour une épreuve. Son retour vers Piper aboutit à une vie mortelle ; ses connaissances et aptitudes  | verified |
| `library:contrib:cole:2` | S3E8 | Son père est mortel ; la forme humaine n'est pas qu'un déguisement. Blessé, il se téléporte difficilement et Leo ne soigne que sa moitié humaine. La b | verified |
| `library:contrib:cole:3` | S4E8 | La potion retire ses pouvoirs démoniaques ; sa tentative de téléportation échoue ensuite. Il conserve son expérience mais exprime une crise d'identité | verified |
| `library:contrib:cole:4` | S4E13 | La Prophétesse le fait absorber le Hollow pour recevoir les pouvoirs de la Source ; ceux-ci restent après le renfermement du Hollow. Ce n'est pas le s | verified |
| `library:contrib:cole:8` | S5E7 | Barbas reçoit ses pouvoirs après leur retrait ; Cole les reprend pour secourir les sœurs. Cette privation temporaire ne rétablit pas leur confiance ni | verified |
| `library:contrib:cole:9` | S5E12 | Devenu Avatar pour retrouver Phoebe, il change la réalité. Dans la réalité Belthazor, il est vulnérable à une préparation adaptée à cette forme ; son  | verified |
| `library:contrib:cole:10` | S7E16 | Il se présente entre vie et mort et aide indirectement Piper puis Phoebe par Drake. Cette apparition ne prouve pas un retour corporel libre ni la récu | verified |
| `library:contrib:darryl:2` | S2E9 | Les sœurs lui déclarent explicitement être des sorcières ; il les aide dans cette affaire. La relation évolue donc par étapes. | verified |
| `library:contrib:darryl:3` | S6E19 | Les manipulations des Nettoyeurs le conduisent à une condamnation à mort ; cela ne prouve pas qu'il a réellement commis le crime. | verified |
| `library:contrib:darryl:4` | S6E20 | Marqué par cette épreuve, il refuse de continuer à couvrir les sœurs afin de protéger sa famille. Chris se trompe en comptant encore sur son aide habi | verified |
| `library:contrib:elders:3` | S7E16 | L'épreuve de Leo révèle des désaccords, notamment autour de l'intervention d'Odin. Le collectif ne possède pas une volonté parfaitement uniforme. | verified |
| `library:contrib:natalie:1` | S3E11 | Elle impose des protocoles stricts face à Eames. Piper peut la figer : les Êtres de lumière ne sont pas automatiquement protégés de cet effet. | verified |
| `library:contrib:rodriguez:1` | S1E22 | Il exploite sa position policière pour atteindre les Halliwell, lance des attaques d'énergie et bénéficie des reprises de Tempus. Le pouvoir temporel  | verified |
| `library:contrib:tempus:1` | S1E22 | Il recommence la journée au bénéfice de Rodriguez. Phoebe perçoit les répétitions ; les sœurs interrompent le mécanisme en faisant avancer le temps, s | verified |
| `library:potion-repandue` | S5E7 | Paige applique par télékinésie à orbes la potion répandue sur Barbas ; les pouvoirs de Cole lui reviennent. Briser une fiole ne neutralise donc pas né | verified |
| `library:cole-humain-potion` | S4E8 | La potion utilisée dans Black as Cole retire les pouvoirs démoniaques de Cole et laisse subsister Cole humain. | verified |
| `library:cristaux-retrait-troxa` | S3E5 | Prue retire puis replace un cristal, interrompant puis rétablissant les décharges autour de Troxa. | verified |
| `library:cristaux-alarme-manoir` | S6E12 | Une installation de cristaux d’alarme est disposée dans plusieurs espaces du manoir ; un démon sous l’apparence de Darryl entre néanmoins. | verified |
| `library:ecole-direction-leo` | S7E17 | À la fin de Scry Hard, la direction de l’École de magie passe de Paige à Leo. | verified |
| `library:nexus-occupation-insuffisante` | S7E17 | Dans Scry Hard, l’occupation démoniaque du sous-sol ne suffit pas à maîtriser l’Ombre : la présence du Bien dans le manoir contrarie la tentative de Z | verified |

## 10. Contraintes de scénario et zones non vérifiées (socle)

### scenarioConstraints
- Premier test : saison 1 ; seul le pouvoir initial de prémonition est établi pour Phoebe.
- Pas de lévitation, empathie, télékinésie ou attaque magique attribuée à Phoebe dans ce premier test.
- Prue et Piper existent ; leur aide exige une présence et un concours plausibles, jamais une interdiction de principe.
- Élise Moreau, Nina, Jules, la Galerie des Arcades et le commanditaire sont des créations du scénario, pas des personnages ou lieux de la série.
- Une vision ne garantit ni réponse exhaustive, ni déclenchement à volonté, ni réussite future.
- Les pouvoirs restent liés aux personnages ; une exception canonique exige sa preuve et son contexte temporel.

### unverified
- Catalogue complet des démons, immunités et méthodes de destruction
- Formules et ingrédients exacts de toutes les potions
- Chronologie épisode par épisode des gains et pertes de pouvoirs
- Toutes les relations et connaissances des personnages à chaque épisode
- Saisons 2, 3, 6 et 8 : plusieurs pages Peacock ont renvoyé une restriction géographique lors de cette vérification
