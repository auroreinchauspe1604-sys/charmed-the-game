# Démons de Charmed — proposition à examiner

Date : 8 septembre 2026. **Contribution documentaire proposée, non intégrée et non activée.**

## 1. Périmètre et livrables

La demande initiale sur Cole/Balthazar a été élargie par l'utilisateur : documenter le plus de démons possible, en commençant par les plus importants ou récurrents. Cette livraison rassemble **40 fiches**, incluant personnages individuels, incarnations, collectifs et espèces. Elle ne prétend ni compter 40 antagonistes récurrents distincts, ni couvrir tous les démons des 178 épisodes. L'ordre est une priorité éditoriale proposée, pas un classement acté de puissance.

Le dossier initial `balthazar-cole-allie` est conservé pour respecter le périmètre d'écriture autorisé. Aucun fichier actif, aucune sauvegarde et aucun autre dossier de contribution n'ont été modifiés par ce travail. Aucun serveur n'a été redémarré et aucune partie n'a été lancée.

- `PROPOSITION_A_INTEGRER.md` : présente synthèse, textes complets de 40 fiches et cartes, sources, arbitrages et modalités d'intégration.
- `demons.proposition.json` : même contenu sous forme structurée, avec identifiants, sources et épisodes ; format de contribution, **pas un remplacement directement chargeable** d'un fichier canonique.
- `FICHE_COLE_BALTHAZAR.md` : copie conservée du dossier initial complet, avec ses variantes de carte et ses recherches plus détaillées sur les états de Cole. Son périmètre initial reste historique ; la présente proposition décrit l'élargissement.
- `VERIFICATIONS.md` : contrôles documentaires, limites et cas de relecture.
- `preparer_documents.py` : génération locale des deux documents à partir du JSON ; ses écritures sont limitées à ce dossier. Aucun branchement au jeu.

### Fichiers existants et instructions consultés

Instructions AGENTS.md fournies et règles globales : `C:\Users\auror\Documents\Codex\2026-08-29\dis-moi-est-ce-que-tu\outputs\01_REGLES_GLOBALES_ACTEES.md`.

Lectures du projet :

- `Charmed/REGLES_ACTEES.md`, `Charmed/DECISIONS_ACTEES.md`, `Charmed/BIBLIOTHEQUE.md`, `Charmed/PREPARATION_DOCUMENTEE.md` : règles et décisions de référence.
- `Charmed/canon/REGLES_MAGIQUES_ET_DEMONS.md` et `magie-demons.json` : 15 fiches démoniaques existantes, propriétés et limites ; base à enrichir, pas à effacer.
- `Charmed/canon/personnages.json` : personnages et identifiants, en particulier `cole`.
- `Charmed/canon/bibliotheque-verifiee.json`, `construction.json`, passages pertinents de `CONSTRUCTION_DES_PARTIES.md` : formats, preuves et distinction des moyens ; recettes incomplètes non inventées.
- `Charmed/canon/episodes-index.json` : titres et numérotation TVmaze ; uniquement navigation, jamais preuve des événements.
- `Charmed/canon/EXPERTISE_DOSSIER.md` : historique et lacunes ; certaines indications techniques anciennes sont dépassées par les fichiers plus récents.
- `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` et `fiches.json`, ainsi que les fichiers correspondants de `2026-09-08-organisations-phenomenes-enquetes` : recherches ciblées sur les moyens et la Confrérie.
- `Charmed/contributions/personnages-expertise-s1-s8/PROPOSITION_A_INTEGRER.md`, `personnages.proposition.json`, `JOURNAL_RECHERCHE.md` : consultation ciblée des démons, des variantes et du statut de la contribution parallèle. Ces propositions ne deviennent pas des décisions actées du seul fait de leur présence.
- `serveur/charmed/bibliotheque.js` et passages/importations pertinents d'`expertise-runtime.js` : identification des consommateurs des données. Inspection ciblée, pas audit exhaustif du code ni observation d'une partie en cours.

## 2. Constats, propositions et contradictions

### Ce qui est acté et conservé

Les connaissances doivent informer l'Ange sans garantir une victoire. Disponibilité, période, cible, accès et concours effectif d'un allié doivent rester évaluables. Aucun coût, dé, compteur de corruption, durée de récupération, quota de jeu ou impossibilité nouvelle n'est instauré ici. Un manque de documentation reste une incertitude. Les cartes décrivent les propriétés propres de la ressource et ne donnent pas une solution stratégique.

### Enrichissements proposés

Les 15 entrées déjà présentes sont conservées sous leurs identifiants et reçoivent des précisions datées. Les 25 autres fiches sont candidates à l'ajout après dédoublonnage. Cole/Balthazar correspond au personnage `cole` et à la fiche démoniaque `belthazor` : ce lien ne doit pas créer deux alliés indépendants. Le JSON indique les rapprochements déjà identifiés, pas une autorisation de fusion automatique.

Séparer particulièrement : pouvoirs innés et pouvoirs acquis ; démon original et personne transformée ; corps et âme ; destruction corporelle et retour spirituel ; titre de Source et détenteur ; groupe et arsenal de chacun de ses membres.

### Contradictions ou décisions à arbitrer avant intégration

1. **Période des ressources.** Les 40 cartes ne peuvent pas être simultanément disponibles par défaut. Fixer leur version selon la partie, sans ressusciter silencieusement un personnage disparu. Le choix d'un scénario hors chronologie serait une décision de scénario, pas un fait de la série.
2. **Cole « moitié démoniaque réprimée ».** Maîtrise morale, influence magique levée et pouvoirs retirés sont distincts. Choisir la variante explicite ; voir l'annexe initiale. Le texte court ici vise sa phase alliée avec pouvoirs.
3. **Barbas.** La fenêtre de S1 n'est pas une loi de tous ses retours ; les capacités acquises en S5 ne sont pas toutes natives.
4. **Zankou.** Déguisement acquis, vols par potion et destruction avec le Nexus ont des conditions précises. La page Fandom mélange aussi des développements des comics : ils sont exclus.
5. **Triade.** Les résumés de S08E16 divergent sur l'attribution d'un projectile à un membre ; l'attribution nominative est suspendue. Le final gagne contre son retour, sans justifier ici une impossibilité absolue de toute résurrection.
6. **Nature démoniaque et émotions.** Des répliques liées à Vinceres simplifient cette relation ; Cole, Kyra et Drake empêchent de décréter que tout démon est dénué d'émotions, incapable de coopération ou automatiquement loyal au Mal.
7. **Taxonomie.** Les sorcières Billie et Christy, les warlocks comme Nicholas ou Eames, les Avatars et les Fondateurs ne sont pas ajoutés comme démons. Une catégorie générale de menaces serait un choix de bibliothèque distinct. Woogyman n'est pas le Nexus lui-même.
8. **Noms.** Balthazar/Belthazor, Seer/Prophétesse et les traductions proposées pour les espèces doivent être rapprochés des noms déjà retenus par le jeu ; ne pas créer des doublons à cause d'une traduction.
9. **Numérotation.** `Charmed Again` est regroupé sur la transcription S04E01 ; des scènes concernent les deux parties. Jeric est S05E10 dans l'index local mais S5E9 dans le synopsis Paramount trouvé. Le titre d'épisode prévaut pour retrouver la scène. Lazarus : S04E15 ; Gith : S06E06 ; Seekers : S03E16.
10. **Historique technique.** Certaines notes d'`EXPERTISE_DOSSIER.md` décrivent un état non raccordé plus ancien ; `BIBLIOTHEQUE.md`, la préparation et les importations actuelles décrivent un état ultérieur. Cette contribution ne rétablit pas l'ancien état ni ne certifie l'état d'un serveur ouvert.
11. **Contribution parallèle.** Les textes concernant les personnages déjà traités doivent être comparés assertion par assertion avec `personnages-expertise-s1-s8`. Aucun arbitrage de formulation ou de statut de preuve n'a été appliqué silencieusement au corpus actif.

## 3. Niveau réel des recherches

Recherches web effectuées sur la série originale S1–S8. **Aucun épisode n'a été visionné dans ce travail.** Les pages Springfield sont des transcriptions non officielles consultées, avec des attributions parfois absentes ; elles ne valent pas script de production. Les résultats Fandom retenus sont marqués comme extraits de recherche : même lorsqu'un résultat est long, il n'est pas promu en lecture intégrale de la page. Plusieurs pages Springfield ont été inaccessibles, notamment S02E08, S02E10, S02E18, S04E07, S04E12, S04E21, S05E04, S08E16 et S08E22 ; les extraits de remplacement restent d'un niveau inférieur.

Le synopsis Paramount sur Jeric est une source officielle pour son identité et son intention, pas pour ses mécanismes détaillés. L'étude sur le Démon de l'Illusion n'a été accessible que par extrait. Les wikis dérivés, fanfictions, comics, romans et reboot rencontrés dans les résultats ont été écartés comme preuves de la série. Les rubriques mixtes des pages Zankou et Tyler ont été filtrées pour exclure leurs prolongements en comics.

Chaque paragraphe important porte ses références. Les cartes sont des synthèses proposées des paragraphes sourcés de la même fiche ; elles n'ajoutent pas un statut « vérifié ». Les limites d'une fiche valent aussi pour sa carte. Les détails qui restent insuffisamment étayés sont explicitement laissés ouverts plutôt que complétés de mémoire.

## 4. Index des 40 fiches

| Ordre | Ressource | Type | Priorité proposée |
|---|---|---|---|

| 1 | La Source du Mal | titre_et_incarnations | Majeur / récurrent |
| 2 | Barbas | individu | Majeur / récurrent |
| 3 | Zankou | individu | Majeur / récurrent |
| 4 | La Triade | collectif | Majeur / récurrent |
| 5 | Cole Turner / Balthazar (Belthazor) | hybride_individuel | Majeur / récurrent |
| 6 | La Prophétesse / Seer de la saison 4 | individu | Majeur / récurrent |
| 7 | Kyra | individu | Majeur / récurrent |
| 8 | Shax | individu | Majeur / récurrent |
| 9 | Tempus | individu | Majeur / récurrent |
| 10 | Abraxas | individu | Complément spécialisé |
| 11 | Woogyman / Woogy | entite_possessive | Complément spécialisé |
| 12 | Inspecteur Rodriguez | individu | Complément spécialisé |
| 13 | Dumain | individu | Majeur / récurrent |
| 14 | Confrérie de l'Épine / Brotherhood of the Thorn | organisation | Complément spécialisé |
| 15 | Raynor | individu | Complément spécialisé |
| 16 | Vornac | individu | Complément spécialisé |
| 17 | Klea | individu | Complément spécialisé |
| 18 | Sykes | individu | Complément spécialisé |
| 19 | Krell | individu | Complément spécialisé |
| 20 | Andras | individu | Complément spécialisé |
| 21 | Grimlocks | espece | Complément spécialisé |
| 22 | Furies | espece_et_transformation | Complément spécialisé |
| 23 | Banshee | espece_et_transformation | Complément spécialisé |
| 24 | Démons Lazarus | espece | Complément spécialisé |
| 25 | Vinceres | individu | Complément spécialisé |
| 26 | Troxa | individu | Complément spécialisé |
| 27 | Ludlow | individu | Complément spécialisé |
| 28 | Masselin | individu | Complément spécialisé |
| 29 | Démon de l'eau | individu | Complément spécialisé |
| 30 | Démon de l'Illusion | individu | Complément spécialisé |
| 31 | Imara | individu | Complément spécialisé |
| 32 | Javna / Stefan | individu | Complément spécialisé |
| 33 | Drazi | individu | Complément spécialisé |
| 34 | La Sirène / The Siren | individu | Complément spécialisé |
| 35 | Gith | individu | Complément spécialisé |
| 36 | Drake | ancien_demon | Complément spécialisé |
| 37 | L'Oracle de la Source | individu | Complément spécialisé |
| 38 | Seekers / démons chercheurs | espece | Complément spécialisé |
| 39 | Jeric | individu | Complément spécialisé |
| 40 | Zahn | individu | Complément spécialisé |

## 5. Textes complets proposés

Les blocs « Ange du destin » sont documentaires. Le bloc « Carte » est le texte court proposé, sans procédure de victoire.


### 01. La Source du Mal

Identifiant proposé : `source`. Type : `titre_et_incarnations`. Statut : proposition.

**Repères :** S04E13 — Charmed and Dangerous ; S04E21 — Womb Raider ; S08E04 — Desperate Housewitches.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Autorité démoniaque ; distinguer le détenteur initial, Cole possédé et les successions de S4. ([T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed), [F-SEER](https://charmed.fandom.com/wiki/Womb_Raider/Plot))
- **Pouvoirs et fonctionnement :** En S04E13, elle exploite le Néant pour absorber de la magie : ce moyen externe ne constitue pas son équipement inné. ([T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed))
- **Conditions, portée et variantes :** La destruction d'un détenteur ne démontre pas la disparition de toute possibilité de succession. Le retour de S08E04 dépend d'une conjuration particulière. ([T0804](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e04&tv-show=charmed))
- **Contre-moyens et limites :** Le lien avec la conjuratrice permet de supprimer ce retour en S8. Ce cas ne prouve pas que tuer un invocateur détruit toute créature invoquée. ([T0804](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e04&tv-show=charmed))
- **Psychologie et comportement :** Domination et conservation du pouvoir ; la Seer peut poursuivre son propre projet sous couvert de servir la Source. ([F-SEER](https://charmed.fandom.com/wiki/Womb_Raider/Plot))
- **Incertitudes :** Inventaire inné non exhaustif ; liens entre essence, titre et héritage à relire scène par scène. Aucune règle automatique de succession proposée.

**Description courte proposée pour la carte**

> La Source du Mal — souverain démoniaque. Ses moyens dépendent de son incarnation et des forces qu'elle a effectivement acquises.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 02. Barbas

Identifiant proposé : `barbas`. Type : `individu`. Statut : proposition.

**Repères :** S01E13 — From Fear to Eternity ; S05E07 — Sympathy for the Demon ; S07E01 — A Call to Arms.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon de la peur, antagoniste récurrent. ([T0113](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e13&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Exploite les peurs de ses victimes. En S5, obtient les pouvoirs retirés à Cole ; leur maîtrise n'est pas instantanée. ([T0113](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e13&tv-show=charmed), [T0507](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e07&tv-show=charmed))
- **Conditions, portée et variantes :** Le premier épisode impose une fenêtre et un quota spécifiques (vendredi 13, 24 heures, treize sorcières non mariées selon l'extrait). Ne pas imposer ces conditions à chacun de ses retours. ([F-BARBAS](https://charmed.fandom.com/wiki/Barbas))
- **Contre-moyens et limites :** Surmonter la peur est décisif en S1 ; le retrait des pouvoirs acquis structure S05E07. Une même réponse ne règle donc pas toutes ses versions. ([T0113](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e13&tv-show=charmed), [T0507](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e07&tv-show=charmed))
- **Psychologie et comportement :** Manipulateur : transforme les vulnérabilités personnelles en pièges et pousse les proches à se méfier les uns des autres. ([T0507](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e07&tv-show=charmed))
- **Incertitudes :** Retours intermédiaires et dénouement de S07E01 à compléter ; ni calendrier universel ni immunité générale déduits.

**Description courte proposée pour la carte**

> Barbas — démon de la peur. Il exploite les terreurs personnelles et manipule les perceptions ; ses pouvoirs supplémentaires dépendent de son retour.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 03. Zankou

Identifiant proposé : `zankou`. Type : `individu`. Statut : proposition.

**Repères :** S07E10 — Witchness Protection ; S07E22 — Something Wicca This Way Goes.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Rival de la Source emprisonné puis libéré face à la menace des Avatars. ([T0710](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e10&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Absorbe les moyens d'un métamorphe et utilise l'apparence d'autrui. Prémonition de Phoebe et pouvoirs de Piper sont acquis plus tard par potion. ([F-ZANKOU](https://charmed.fandom.com/wiki/Zankou), [T0722](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e22&tv-show=charmed))
- **Conditions, portée et variantes :** Le déguisement n'est pas à rétroattribuer avant son acquisition. L'accès au Livre est lié à l'affaiblissement des sœurs et à sa progression dans l'épisode. ([F-ZANKOU](https://charmed.fandom.com/wiki/Zankou), [T0722](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e22&tv-show=charmed))
- **Contre-moyens et limites :** Sa fin de S7 intervient lorsqu'il contient le Nexus et que celui-ci est détruit : contexte destructeur exceptionnel, pas vulnérabilité à n'importe quelle formule. ([T0722](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e22&tv-show=charmed))
- **Psychologie et comportement :** Patient, calculateur ; comprend les vulnérabilités humaines. Sa coopération contre les Avatars ne vaut pas loyauté durable. ([F-ZANKOU](https://charmed.fandom.com/wiki/Zankou))
- **Incertitudes :** Ne pas importer les portails ou la résurrection via Tyler des comics. Catalogue des attaques natives à compléter par scènes.

**Description courte proposée pour la carte**

> Zankou — stratège démoniaque puissant. Il absorbe certaines capacités et emploie des apparences acquises pour infiltrer et manipuler.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 04. La Triade

Identifiant proposé : `triad`. Type : `collectif`. Statut : proposition.

**Repères :** S03E07 — Power Outage ; S08E16 — Engaged and Confused ; S08E21 — Kill Billie: Vol. 2 ; S08E22 — Forever Charmed.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Commanditaires démoniaques de Cole en S3, adversaires organisant le conflit final en S8. ([T0307](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e07&tv-show=charmed), [T0821](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e21&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Collectif dont la force et la persistance ne se réduisent pas aux corps présents : retour sous forme d'esprits puis reconstitution évoqués explicitement. ([T0821](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e21&tv-show=charmed))
- **Conditions, portée et variantes :** La perte d'un membre affaiblit le combat collectif de S08E16. Les circonstances du retour importent ; aucun délai fixe ajouté. ([F-TRIADE](https://charmed.fandom.com/wiki/Engaged_and_Confused/Plot), [T0821](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e21&tv-show=charmed))
- **Contre-moyens et limites :** Les potions de S08E22 ciblent leur retour spirituel. La documentation consultée ne suffit pas à transformer la victoire finale en impossibilité métaphysique de tout retour. ([F-FINAL](https://charmed.fandom.com/wiki/Forever_Charmed/Script))
- **Psychologie et comportement :** Agit à travers agents et manipulation prolongée, notamment Dumain et Christy. ([F-DUMAIN](https://charmed.fandom.com/wiki/Dumain))
- **Incertitudes :** Extraits Plot/Script divergent sur le nom du lanceur de feu de S08E16 ; ne pas figer cette attribution. Scripts Springfield S08E16 et S08E22 inaccessibles.

**Description courte proposée pour la carte**

> La Triade — conseil de trois démons. Sa puissance collective et sa faculté de revenir sous forme spirituelle en font une autorité persistante.

Niveau des appuis : `extrait_recherche_secondaire`, `extrait_recherche_transcription_non_officielle`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 05. Cole Turner / Balthazar (Belthazor)

Identifiant proposé : `belthazor`. Type : `hybride_individuel`. Statut : proposition.

**Repères :** S03E08 — Sleuthing with the Enemy ; S03E19 — The Demon Who Came in from the Cold ; S03E20 — Exit Strategy ; S03E21 — Look Who's Barking ; S04E08 — Black as Cole ; S04E13 — Charmed and Dangerous ; S05E12 — Centennial Charmed ; S07E16 — The Seven Year Witch.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Ancien assassin de la Triade et membre de la Confrérie, parfois allié des Halliwell ; même personne que l'identifiant personnage cole. ([T0308](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed), [T0319](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e19&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Téléportation démoniaque, attaques énergétiques et transformation ; leur disponibilité dépend de l'état. Maîtriser sa conduite ne signifie pas perdre toute magie. ([T0308](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed), [T0408](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed))
- **Conditions, portée et variantes :** S04E08 : retrait des pouvoirs, Cole humain. S04E13 : possession par la Source, à ne pas fusionner avec Balthazar. S5 : pouvoirs ultérieurs distincts. ([T0408](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed), [T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed))
- **Contre-moyens et limites :** Potion liée à Balthazar et potion retirant les pouvoirs sont distinctes ; modification du sang par un alchimiste en S03E21 change la pertinence du contre-moyen antérieur. ([T0321](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed))
- **Psychologie et comportement :** L'amour pour Phoebe peut soutenir ses choix ; manipulation, chantage et actes ultérieurs empêchent d'en faire une garantie morale. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Incertitudes :** Voir FICHE_COLE_BALTHAZAR.md pour les textes détaillés et variantes. La carte ci-dessus concerne seulement la phase alliée avec pouvoirs.

**Description courte proposée pour la carte**

> Cole Turner / Balthazar — ancien assassin démoniaque, allié possible des Halliwell. Dans sa phase démoniaque maîtrisée, il conserve des pouvoirs et une connaissance des démons.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 06. La Prophétesse / Seer de la saison 4

Identifiant proposé : `seer`. Type : `individu`. Statut : proposition.

**Repères :** S04E13 — Charmed and Dangerous ; S04E15 — Marry-Go-Round ; S04E21 — Womb Raider.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Conseillère démoniaque de la Source ; distincte de Kyra et de l'Oracle. ([T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Visions et manipulation de projets futurs ; orchestre l'emploi du Néant puis intervient dans le mariage de Cole. ([T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed), [T0415](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e15&tv-show=charmed))
- **Conditions, portée et variantes :** Ses visions orientent ses actes, sans lui assurer un succès inévitable. Le transfert du fœtus de Phoebe en fin de S4 lui donne une puissance spécifique, non permanente. ([F-SEER](https://charmed.fandom.com/wiki/Womb_Raider/Plot))
- **Contre-moyens et limites :** L'affrontement après transfert tourne contre elle face aux trois sœurs. Ne pas transformer cet événement en recette générique contre toutes les voyantes. ([F-SEER](https://charmed.fandom.com/wiki/Womb_Raider/Plot))
- **Psychologie et comportement :** Ambitieuse ; instrumentalise le service de la Source au profit de son accession au pouvoir. ([F-SEER](https://charmed.fandom.com/wiki/Womb_Raider/Plot))
- **Incertitudes :** Nature exacte du fœtus et portée des affirmations de la Seer demandent une lecture critique ; les propos du personnage ne sont pas une vérité biologique neutre.

**Description courte proposée pour la carte**

> La Prophétesse — conseillère démoniaque douée de visions. Elle manipule alliances et événements pour orienter l'avenir à son avantage.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 07. Kyra

Identifiant proposé : `kyra`. Type : `individu`. Statut : proposition.

**Repères :** S07E10 — Witchness Protection.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Voyante démoniaque négociant avec les Halliwell pour devenir humaine. ([T0710](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e10&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Prémonitions et partage de vision avec Phoebe ; la téléportation est évoquée dans leur échange. ([T0710](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e10&tv-show=charmed))
- **Conditions, portée et variantes :** La vision révèle un avenir possible et nourrit une négociation. Elle ne permet pas de tout savoir ou d'imposer le futur. ([T0710](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e10&tv-show=charmed))
- **Contre-moyens et limites :** Zankou l'approche sous une fausse apparence et la tue : percevoir l'avenir ne donne pas une protection automatique contre la tromperie. ([T0710](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e10&tv-show=charmed), [F-ZANKOU](https://charmed.fandom.com/wiki/Zankou))
- **Psychologie et comportement :** Désire l'expérience humaine ; l'étiquette démon n'efface pas cette motivation ni son aptitude à coopérer. ([T0710](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e10&tv-show=charmed))
- **Incertitudes :** Résurrection et développements des comics exclus. La transformation souhaitée n'est pas considérée accomplie.

**Description courte proposée pour la carte**

> Kyra — voyante démoniaque. Elle peut partager ses visions et aspire à devenir humaine.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 08. Shax

Identifiant proposé : `shax`. Type : `individu`. Statut : proposition.

**Repères :** S03E22 — All Hell Breaks Loose ; S04E01 — Charmed Again, Part 1 ; S04E02 — Charmed Again, Part 2.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Assassin envoyé par la Source, au centre de la transition entre Prue et Paige. ([T0322](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed), [T0401](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e01&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Se déplace sous forme de vent et porte des attaques projetant violemment ses cibles. ([T0322](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed))
- **Conditions, portée et variantes :** Les attaques de S3 et le retour en début de S4 doivent être distingués ; une dispersion apparente ne suffit pas à confirmer sa destruction. ([T0322](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed), [T0401](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e01&tv-show=charmed))
- **Contre-moyens et limites :** Les tentatives partielles repoussent Shax ; le Pouvoir des Trois reconstitué intervient dans sa défaite. ([T0401](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e01&tv-show=charmed))
- **Psychologie et comportement :** Exécuteur poursuivant ses cibles et les témoins gênants ; aucun projet politique personnel établi dans ce relevé. ([T0322](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed))
- **Incertitudes :** La page Springfield S04E01 regroupe Charmed Again en deux parties : conserver S04E01–E02 sans prétendre attribuer chaque réplique à une partie.

**Description courte proposée pour la carte**

> Shax — assassin démoniaque de la Source. Il se déplace dans le vent et frappe par de violentes projections d'air.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 09. Tempus

Identifiant proposé : `tempus`. Type : `individu`. Statut : proposition.

**Repères :** S01E22 — Déjà Vu All Over Again ; S03E22 — All Hell Breaks Loose.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon du temps qui appuie Rodriguez, puis intervient à la demande de la Source. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed), [T0322](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Recommence la séquence de S01E22 après les échecs de l'assassin ; avantage de mémoire pour celui-ci. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Conditions, portée et variantes :** Phoebe perçoit des répétitions. En S3, la Source annonce qu'un nouveau retour temporel épuisera mortellement Tempus déjà affaibli ; ne pas généraliser un coût chiffré. ([T0322](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed))
- **Contre-moyens et limites :** Le sort avançant le temps casse la boucle de S1 ; cet arrêt ne prouve pas la mort de Tempus à cette date. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Psychologie et comportement :** Met sa capacité au service de la hiérarchie démoniaque ; autonomie de ses motivations peu documentée. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Incertitudes :** Amplitude et répétitions maximales non établies. Éviter toute durée ou coût inventé.

**Description courte proposée pour la carte**

> Tempus — démon du temps. Il peut recommencer une séquence temporelle au service d'un plan démoniaque.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 10. Abraxas

Identifiant proposé : `abraxas`. Type : `individu`. Statut : proposition.

**Repères :** S02E01 — Witch Trial.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon qui dérobe le Livre des Ombres. ([T0201](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e01&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Lit ses textes à rebours, défait des effets antérieurs et fait revenir des adversaires déjà vaincus. ([T0201](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e01&tv-show=charmed))
- **Conditions, portée et variantes :** L'opération dépend du Livre dérobé ; ne pas transformer cette procédure en résurrection innée de n'importe qui. ([T0201](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e01&tv-show=charmed))
- **Contre-moyens et limites :** La récupération du Livre et l'interruption de la lecture sont au centre de la résolution ; détails du rituel et de son accès à revérifier avant prescription. ([T0201](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e01&tv-show=charmed))
- **Psychologie et comportement :** Attaque la continuité de la magie des Halliwell en remontant leur histoire plutôt qu'en visant seulement leurs corps. ([T0201](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e01&tv-show=charmed))
- **Incertitudes :** Portée hors de cet artefact, dimensions accessibles et conditions calendaires non complètement auditées.

**Description courte proposée pour la carte**

> Abraxas — démon capable d'inverser les effets de textes magiques en les lisant à rebours dans le Livre des Ombres.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 11. Woogyman / Woogy

Identifiant proposé : `woogyman`. Type : `entite_possessive`. Statut : proposition.

**Repères :** S01E15 — Is There a Woogy in the House?.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Entité maléfique enfermée sous le manoir puis libérée lors d'une secousse ; distincte du Nexus neutre. ([T0115](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e15&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Possède des personnes et se sert de Phoebe pour agir ; manifestations et création d'objet observées ne deviennent pas les pouvoirs naturels de Phoebe. ([T0115](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e15&tv-show=charmed))
- **Conditions, portée et variantes :** La présence de l'entité et son influence sur un hôte sont des états à identifier. Ne pas assimiler une possession à un choix volontaire. ([T0115](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e15&tv-show=charmed))
- **Contre-moyens et limites :** Une formule transmise par Penny permet le renvoi ; expulsion de l'entité et destruction du Nexus ne sont pas la même opération. ([T0115](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e15&tv-show=charmed), [T0722](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e22&tv-show=charmed))
- **Psychologie et comportement :** Cherche à étendre son emprise à travers ses hôtes. La part d'action autonome de ceux-ci doit rester distinguée. ([T0115](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e15&tv-show=charmed))
- **Incertitudes :** Rapprochement terminologique Woogy/Shadow/Suxen à conserver explicite ; aucune corruption permanente automatiquement attribuée à un hôte.

**Description courte proposée pour la carte**

> Woogyman — entité maléfique capable de posséder des humains et d'agir à travers eux.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 12. Inspecteur Rodriguez

Identifiant proposé : `rodriguez`. Type : `individu`. Statut : proposition.

**Repères :** S01E22 — Déjà Vu All Over Again.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Assassin démoniaque sous couverture policière, collaborant avec Tempus. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Attaques énergétiques ; bénéficie du recommencement temporel organisé par son allié. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Conditions, portée et variantes :** Sa connaissance des tentatives précédentes ne constitue pas un pouvoir temporel personnel. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Contre-moyens et limites :** La sortie de la boucle permet un affrontement décisif ; l'énergie renvoyée se retourne contre lui. La protection de Tempus est une condition séparée. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Psychologie et comportement :** Exploite son autorité policière et répète ses tentatives meurtrières. ([T0122](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed))
- **Incertitudes :** Fiche liée à S01E22 ; ne pas réattribuer son dispositif temporel à un Rodriguez isolé.

**Description courte proposée pour la carte**

> Rodriguez — assassin démoniaque infiltré dans la police, doté d'attaques énergétiques et soutenu par Tempus dans sa mission.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 13. Dumain

Identifiant proposé : `dumain`. Type : `individu`. Statut : proposition.

**Repères :** S08E21 — Kill Billie: Vol. 2 ; S08E22 — Forever Charmed.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Agent démoniaque de la Triade, intermédiaire de la manipulation de Christy et Billie. ([F-DUMAIN](https://charmed.fandom.com/wiki/Dumain))
- **Pouvoirs et fonctionnement :** Téléportation démoniaque ; le voyage temporel du dénouement passe par la bague de Coop. ([F-DUMAIN](https://charmed.fandom.com/wiki/Dumain))
- **Conditions, portée et variantes :** Le soutien aux esprits de la Triade et les interventions dans le passé sont des opérations distinctes, dépendantes du contexte. ([T0821](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e21&tv-show=charmed), [F-DUMAIN](https://charmed.fandom.com/wiki/Dumain))
- **Contre-moyens et limites :** La confrontation finale implique ses versions présente et passée ; ne pas en déduire qu'il faut toujours tuer deux exemplaires d'un voyageur temporel. ([F-DUMAIN](https://charmed.fandom.com/wiki/Dumain))
- **Psychologie et comportement :** Entretenait le récit destiné à dresser les deux sorcières contre les Halliwell ; leur nature de sorcières n'en fait pas des démons. ([F-DUMAIN](https://charmed.fandom.com/wiki/Dumain))
- **Incertitudes :** Mécanisme exact de soutien à la reconstitution à approfondir. L'usage temporel de la bague n'est pas un pouvoir inné.

**Description courte proposée pour la carte**

> Dumain — agent de la Triade. Il entretient ses manipulations et peut se téléporter ; ses voyages temporels dépendent d'un artefact.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 14. Confrérie de l'Épine / Brotherhood of the Thorn

Identifiant proposé : `brotherhood-thorn`. Type : `organisation`. Statut : proposition.

**Repères :** S03E19 — The Demon Who Came in from the Cold ; S03E20 — Exit Strategy.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Organisation de démons supérieurs liée à la Source ; Cole en a été membre. ([F-BROTHER](https://charmed.fandom.com/wiki/Brotherhood_of_the_Thorn))
- **Pouvoirs et fonctionnement :** Infiltration, substitution d'identité et opérations contre des entreprises ; les compétences appartiennent à des membres précis. ([F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot))
- **Conditions, portée et variantes :** Être membre ne donne pas automatiquement les pouvoirs de tous les autres. La réintégration de Cole est surveillée. ([F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot))
- **Contre-moyens et limites :** Une opération peut être déjouée et ses chefs tués sans que cela prouve l'extinction de toute l'organisation. ([F-BROTHER](https://charmed.fandom.com/wiki/Brotherhood_of_the_Thorn))
- **Psychologie et comportement :** Loyauté contrôlée et instrumentalisation de liens personnels. ([F-BROTHER](https://charmed.fandom.com/wiki/Brotherhood_of_the_Thorn))
- **Incertitudes :** Hiérarchie complète et sort de tous les membres non établis ; pas de ressource cumulant leur arsenal.

**Description courte proposée pour la carte**

> Confrérie de l'Épine — organisation de démons supérieurs spécialisée dans l'infiltration et la prise d'influence.

Niveau des appuis : `extrait_recherche_secondaire`. Aucun visionnage direct.


### 15. Raynor

Identifiant proposé : `raynor`. Type : `individu`. Statut : proposition.

**Repères :** S03E19 — The Demon Who Came in from the Cold ; S03E20 — Exit Strategy.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Figure d'autorité de la Confrérie et ancien mentor de Cole. ([F-BROTHER](https://charmed.fandom.com/wiki/Brotherhood_of_the_Thorn))
- **Pouvoirs et fonctionnement :** Intervient magiquement sur Cole tout en le travaillant psychologiquement. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Conditions, portée et variantes :** Le chantage porte notamment sur l'âme du père de Cole ; il ne se réduit pas à une malédiction de corruption mesurable. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Contre-moyens et limites :** Cole se retourne contre lui après la manipulation. Aucun pouvoir de contrôle universel et irrésistible n'est établi. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Psychologie et comportement :** Exploite filiation, culpabilité et besoin d'appartenance. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Incertitudes :** Télépathie et portée exacte de l'influence non suffisamment vérifiées ici ; ne pas ajouter une lecture de toutes les pensées.

**Description courte proposée pour la carte**

> Raynor — mentor démoniaque de la Confrérie. Il associe influence magique, autorité et chantage pour reprendre le contrôle de ses agents.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 16. Vornac

Identifiant proposé : `vornac`. Type : `individu`. Statut : proposition.

**Repères :** S03E19 — The Demon Who Came in from the Cold.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Cadre de la Confrérie impliqué dans une opération d'infiltration économique. ([F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot))
- **Pouvoirs et fonctionnement :** Prend une autre apparence dans l'opération ; le jeu des identités brouille la responsabilité des attaques. ([T0319](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e19&tv-show=charmed))
- **Conditions, portée et variantes :** La substitution doit être attribuée à son auteur, sans déduire que copier une apparence copie les pouvoirs. ([T0319](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e19&tv-show=charmed))
- **Contre-moyens et limites :** Son imposture est déjouée dans l'épisode ; aucune méthode universelle de détection des déguisements établie. ([T0319](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e19&tv-show=charmed))
- **Psychologie et comportement :** Soupçonne Cole et exige des preuves de sa fidélité. ([F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot))
- **Incertitudes :** Ne pas remplacer Raynor par Vornac comme unique chef de toute la Confrérie sans préciser fonction et période.

**Description courte proposée pour la carte**

> Vornac — démon de la Confrérie capable d'emprunter une autre apparence pour infiltrer ses cibles.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 17. Klea

Identifiant proposé : `klea`. Type : `individu`. Statut : proposition.

**Repères :** S03E19 — The Demon Who Came in from the Cold.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Membre de la Confrérie chargée de vérifier le récit de Cole. ([F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot))
- **Pouvoirs et fonctionnement :** Observation à distance, désignée comme voyeurism dans la source secondaire, et téléportation. ([F-KLEA](https://charmed.fandom.com/wiki/Klea))
- **Conditions, portée et variantes :** Observer une situation ne signifie pas lire les pensées ni connaître automatiquement la vérité derrière une mise en scène. ([F-KLEA](https://charmed.fandom.com/wiki/Klea), [F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot))
- **Contre-moyens et limites :** Le dossier ne vérifie pas un contre-sort propre à Klea : laisser la recette et la portée de son observation ouvertes. ([F-KLEA](https://charmed.fandom.com/wiki/Klea))
- **Psychologie et comportement :** Surveillance au service de la défiance collective envers Cole. ([F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot))
- **Incertitudes :** Pouvoir encore soutenu principalement par extrait de fiche secondaire ; distance, obstacle et condition d'accroche inconnus.

**Description courte proposée pour la carte**

> Klea — démon de la Confrérie capable d'observer à distance et de se téléporter.

Niveau des appuis : `extrait_recherche_secondaire`. Aucun visionnage direct.


### 18. Sykes

Identifiant proposé : `sykes`. Type : `individu`. Statut : proposition.

**Repères :** S04E08 — Black as Cole.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon meurtrier qui réactive chez Cole le conflit avec son ancienne identité. ([T0408](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Résiste à une attaque énergétique de Cole ; le duel conduit Cole à reprendre sa forme démoniaque. ([F-SYKES](https://charmed.fandom.com/wiki/Black_as_Cole/Plot))
- **Conditions, portée et variantes :** Une résistance observée ne signifie ni invulnérabilité ni immunité à toutes les attaques du même type. ([F-SYKES](https://charmed.fandom.com/wiki/Black_as_Cole/Plot))
- **Contre-moyens et limites :** Sa confrontation avec Balthazar doit être distinguée de la potion qui retire ensuite les pouvoirs de Cole. ([T0408](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed))
- **Psychologie et comportement :** Cruauté et opposition à Cole ; aucun mécanisme de rédemption ou d'alliance établi pour lui ici. ([T0408](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed))
- **Incertitudes :** Arsenal exhaustif et arme exacte du coup final à contrôler visuellement avant spécification mécanique.

**Description courte proposée pour la carte**

> Sykes — démon meurtrier résistant aux attaques, adversaire de Cole dans sa lutte contre son ancienne nature.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 19. Krell

Identifiant proposé : `krell`. Type : `individu`. Statut : proposition.

**Repères :** S03E08 — Sleuthing with the Enemy.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Chasseur démoniaque envoyé sur la piste de Balthazar. ([T0308](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Suit la trace démoniaque et tire parti du sang de sa cible ; l'apparence humaine complique le pistage. ([T0308](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed))
- **Conditions, portée et variantes :** Cole blessé ne peut plus se téléporter mais conserve d'autres moyens : ni la blessure ni le camouflage ne le rendent simplement humain. ([T0308](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed))
- **Contre-moyens et limites :** Le pistage a des limites contextuelles. Ne pas faire de Krell un localisateur infaillible à travers toute protection ou tout plan. ([T0308](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed))
- **Psychologie et comportement :** Traqueur déterminé ; peut communiquer des informations sur sa cible sans devenir un allié fiable. ([T0308](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed))
- **Incertitudes :** Nom d'espèce, distance de détection et brouillage par cimetière à recouper ; aucune immunité ou portée ajoutée.

**Description courte proposée pour la carte**

> Krell — chasseur de démons spécialisé dans les traces démoniaques et le pistage de Balthazar.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 20. Andras

Identifiant proposé : `andras`. Type : `individu`. Statut : proposition.

**Repères :** S03E07 — Power Outage.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Esprit de rage recruté dans le plan de Cole contre les sœurs. ([T0307](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e07&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Amplifie une colère préexistante et peut prendre possession d'un hôte. ([T0307](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e07&tv-show=charmed))
- **Conditions, portée et variantes :** Il ne crée pas n'importe quelle émotion à partir de rien ; les tensions déjà présentes donnent prise à son influence. ([T0307](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e07&tv-show=charmed))
- **Contre-moyens et limites :** La confrontation vise à dissocier l'influence et le conflit familial. Une disparition du symptôme ne prouve pas à elle seule la destruction du démon. ([T0307](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e07&tv-show=charmed))
- **Psychologie et comportement :** Se nourrit narrativement de la discorde et pousse les adversaires à s'entre-détruire. ([T0307](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e07&tv-show=charmed))
- **Incertitudes :** Moyen précis de destruction non prescrit ; aucun compteur obligatoire de colère ni contagion illimitée.

**Description courte proposée pour la carte**

> Andras — esprit démoniaque de la rage. Il amplifie une colère déjà présente et peut posséder un hôte.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 21. Grimlocks

Identifiant proposé : `grimlocks`. Type : `espece`. Statut : proposition.

**Repères :** S01E19 — Out of Sight.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démons prédateurs qui volent la vue d'enfants pour percevoir leurs cibles. ([T0119](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e19&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Repèrent les auras du bien et s'en servent pour étrangler leurs victimes. ([T0119](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e19&tv-show=charmed))
- **Conditions, portée et variantes :** La vue volée dure 24 heures et exige que les enfants restent vivants dans l'explication du Livre. Ce sont des conditions de ce pouvoir, pas un quota de jeu. ([T0119](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e19&tv-show=charmed))
- **Contre-moyens et limites :** Une préparation à base de racine de schisandra intervient contre eux ; la recette complète et ses quantités ne sont pas auditées. ([T0119](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e19&tv-show=charmed))
- **Psychologie et comportement :** Prédation organisée : maintiennent en vie les enfants dont dépend leur vision. ([T0119](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e19&tv-show=charmed))
- **Incertitudes :** Variations dans les retours ultérieurs et restauration de la vue à compléter ; ne pas confondre vue naturelle et vision d'auras.

**Description courte proposée pour la carte**

> Grimlocks — démons qui utilisent la vue volée à des enfants pour distinguer les auras du bien et attaquer leurs porteurs.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 22. Furies

Identifiant proposé : `furies`. Type : `espece_et_transformation`. Statut : proposition.

**Repères :** S04E03 — Hell Hath No Fury.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Entités punitives poursuivant ceux qu'elles jugent coupables ; Piper subit une transformation dans l'épisode. ([T0403](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e03&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Fumée, voix accusatrices et influence transformante sur une personne vulnérable. Les pouvoirs de Piper échouent contre elles dans la scène observée. ([T0403](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e03&tv-show=charmed))
- **Conditions, portée et variantes :** Le chagrin et la colère de Piper après Prue sont essentiels à son cas ; ils ne prouvent pas que toute personne endeuillée devient une Furie. ([T0403](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e03&tv-show=charmed))
- **Contre-moyens et limites :** Le retour de Piper passe par l'expression de sa douleur et l'aide de ses proches. Ce n'est pas une formule garantissant la destruction de toute Furie. ([T0403](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e03&tv-show=charmed))
- **Psychologie et comportement :** Punition disproportionnée ; distinguer cet impératif de la psychologie de l'hôte transformé. ([T0403](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e03&tv-show=charmed))
- **Incertitudes :** Seuils d'immunité et portée de la fumée non chiffrés ; garder séparés démons d'origine et Piper transformée.

**Description courte proposée pour la carte**

> Furies — entités démoniaques punitives. Leur fumée et les voix de leurs victimes peuvent tourmenter et transformer une cible vulnérable.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 23. Banshee

Identifiant proposé : `banshee`. Type : `espece_et_transformation`. Statut : proposition.

**Repères :** S03E21 — Look Who's Barking.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Banshees décrites par Leo comme d'anciennes sorcières ; Phoebe subit cette transformation en S03E21. ([T0321](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Cri surnaturel et perception de la douleur ; une sorcière peut être transformée au lieu de suivre le sort d'une victime ordinaire. ([T0321](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed))
- **Conditions, portée et variantes :** Le cri tue les victimes ordinaires mais transforme les sorcières selon Leo. Il annonce qu'un premier meurtre fixerait l'état de Phoebe : ne pas omettre cette condition avant de proposer son retour. ([T0321](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed))
- **Contre-moyens et limites :** Soulager la douleur liée à Cole permet le retour de Phoebe avant un meurtre. Cela ne prouve pas une guérison verbale universelle. ([T0321](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed))
- **Psychologie et comportement :** La douleur de l'hôte nourrit la prédation ; ne pas confondre cette conduite avec son intention humaine habituelle. ([T0321](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed))
- **Incertitudes :** Le caractère permanent après meurtre est rapporté comme l'avertissement de Leo, pas testé ici sur toutes les exceptions. Contre-moyens contre d'autres Banshees à approfondir.

**Description courte proposée pour la carte**

> Banshee — ancienne sorcière transformée en créature prédatrice, sensible à la souffrance et dotée d'un cri surnaturel.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 24. Démons Lazarus

Identifiant proposé : `lazarus`. Type : `espece`. Statut : proposition.

**Repères :** S04E15 — Marry-Go-Round.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon utilisé par la Seer pour détourner le mariage de Phoebe et Cole. ([T0415](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e15&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Se reconstitue après destruction ; se renforce à mesure qu'il reste hors de la terre d'un cimetière. ([T0415](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e15&tv-show=charmed))
- **Conditions, portée et variantes :** L'ensevelissement dans cette terre empêche le retour. Le retour par déterrement est donc une condition réelle de disponibilité. ([T0415](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e15&tv-show=charmed))
- **Contre-moyens et limites :** Il faut considérer les restes et leur mise en terre, et non compter toute explosion comme définitive. Aucun temps de résurrection exact ajouté. ([T0415](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e15&tv-show=charmed))
- **Psychologie et comportement :** Violent et peu fiable : l'agent met en danger la personne que son commanditaire veut préserver. ([T0415](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e15&tv-show=charmed))
- **Incertitudes :** S04E15, pas S04E14. L'expression 'éternellement impossible à tuer' dépasserait ce qui est établi.

**Description courte proposée pour la carte**

> Démon Lazarus — démon capable de se reconstituer, dont la persistance est liée à son éloignement de la terre des cimetières.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 25. Vinceres

Identifiant proposé : `vinceres`. Type : `individu`. Statut : proposition.

**Repères :** S03E06 — Primrose Empath.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Assassin démoniaque neutralisé par une empathie imposée. ([T0306](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e06&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Puissance physique et forte résistance ; l'afflux d'émotions provenant de l'empathie l'immobilise avant sa libération. ([T0306](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e06&tv-show=charmed))
- **Conditions, portée et variantes :** L'empathie est transférée dans une rencontre précise ; ce n'est pas son pouvoir naturel. L'allégation 'les démons n'ont pas d'émotions' ne doit pas être universalisée face à Cole ou Kyra. ([T0306](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e06&tv-show=charmed))
- **Contre-moyens et limites :** Prue transforme l'empathie en moyen décisif dans cet épisode. Ne pas conclure que toute empathie tue instantanément tous les démons. ([T0306](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e06&tv-show=charmed))
- **Psychologie et comportement :** Orientation meurtrière ; la souffrance empathique ne signifie pas une conversion morale. ([T0306](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e06&tv-show=charmed))
- **Incertitudes :** Geste final et rôle précis de la projection astrale à revoir sur vidéo avant de proposer une procédure exacte.

**Description courte proposée pour la carte**

> Vinceres — assassin démoniaque très résistant, dont l'état peut être profondément perturbé par une empathie imposée.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 26. Troxa

Identifiant proposé : `troxa`. Type : `individu`. Statut : proposition.

**Repères :** S03E05 — Sight Unseen.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Assassin invisible envoyé contre les Halliwell. ([T0305](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e05&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Invisibilité utilisée pour approcher ses cibles. ([T0305](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e05&tv-show=charmed))
- **Conditions, portée et variantes :** Le froid compromet son camouflage et le rend perceptible dans l'épisode ; aucune température seuil vérifiée. ([T0305](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e05&tv-show=charmed))
- **Contre-moyens et limites :** Rendre Troxa visible permet de le viser, mais ne constitue pas en soi sa destruction. ([T0305](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e05&tv-show=charmed))
- **Psychologie et comportement :** Prédateur discret ; Cole peut exploiter sa faiblesse dans une rivalité entre agents. ([T0305](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e05&tv-show=charmed))
- **Incertitudes :** Ne pas en déduire que tout froid est létal ou que toute invisibilité de la série fonctionne de cette façon.

**Description courte proposée pour la carte**

> Troxa — assassin démoniaque invisible, dont le camouflage est sensible au froid.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 27. Ludlow

Identifiant proposé : `ludlow`. Type : `individu`. Statut : proposition.

**Repères :** S04E12 — Lost and Bound.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Dirige une école démoniaque pour recruter et exploiter des êtres capables de produire du feu. ([F-LUDLOW](https://charmed.fandom.com/wiki/Ludlow))
- **Pouvoirs et fonctionnement :** Résiste au feu de Tyler ; sa position de force dépasse ce qu'un simple incendie permet de résoudre. ([F-LUDLOW](https://charmed.fandom.com/wiki/Ludlow), [F-TYLER](https://charmed.fandom.com/wiki/Tyler_Michaels))
- **Conditions, portée et variantes :** La formation masque une entreprise de récupération des pouvoirs ; ne pas assimiler les enfants recrutés à des démons consentants. ([F-LUDLOW](https://charmed.fandom.com/wiki/Ludlow))
- **Contre-moyens et limites :** Un sort collectif des sœurs le détruit ; le caractère non rimé du texte n'empêche pas sa fonction. Recette non transcrite ici. ([F-TYLER](https://charmed.fandom.com/wiki/Tyler_Michaels))
- **Psychologie et comportement :** Exploite la vulnérabilité et le besoin d'apprentissage des jeunes recrues. ([F-LUDLOW](https://charmed.fandom.com/wiki/Ludlow))
- **Incertitudes :** Sources secondaires par extraits seulement ; page Springfield S04E12 inaccessible. Les développements comics de Tyler sont exclus.

**Description courte proposée pour la carte**

> Ludlow — directeur d'une école démoniaque, résistant au feu et spécialisé dans l'exploitation de jeunes détenteurs de pouvoirs.

Niveau des appuis : `extrait_recherche_secondaire`. Aucun visionnage direct.


### 28. Masselin

Identifiant proposé : `masselin`. Type : `individu`. Statut : proposition.

**Repères :** S02E04 — The Devil's Music.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon associé par pacte à l'agent musical Carlton. ([T0204](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e04&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Engloutit des victimes et les conserve prisonnières en lui ; leur souffrance participe à son fonctionnement. ([T0204](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e04&tv-show=charmed))
- **Conditions, portée et variantes :** Les personnes absorbées ne sont pas simplement considérées mortes : l'intérieur du démon est un état de captivité. ([T0204](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e04&tv-show=charmed))
- **Contre-moyens et limites :** Le contre-moyen est introduit dans sa bouche. Son accès interne compte ; le dossier ne prescrit ni quantités ni réussite d'une potion jetée sur la peau. ([T0204](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e04&tv-show=charmed))
- **Psychologie et comportement :** Prédation liée à un intermédiaire humain, qui utilise l'attrait du spectacle pour lui livrer des victimes. ([T0204](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e04&tv-show=charmed))
- **Incertitudes :** Aucune contenance maximale ni survie illimitée des prisonniers établie ; pacte ne signifie pas pouvoir universel sur toute musique.

**Description courte proposée pour la carte**

> Masselin — démon qui engloutit des humains et les maintient captifs à l'intérieur de son corps.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 29. Démon de l'eau

Identifiant proposé : `water-demon`. Type : `individu`. Statut : proposition.

**Repères :** S02E08 — P3 H2O.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Entité aquatique impliquée dans la mort de Patty. ([F-WATER-PLOT](https://charmed.fandom.com/wiki/P3_H2O/Plot))
- **Pouvoirs et fonctionnement :** Agit à travers l'eau et peut noyer ses victimes ; le gel de Patty/Piper est décrit comme inefficace contre lui. ([F-WATER](https://charmed.fandom.com/wiki/P3_H2O/Script), [F-WATER-PLOT](https://charmed.fandom.com/wiki/P3_H2O/Plot))
- **Conditions, portée et variantes :** Cette résistance appartient au cas présenté. Ne pas attribuer l'immunité au gel à toute créature liée à l'eau. ([F-WATER](https://charmed.fandom.com/wiki/P3_H2O/Script))
- **Contre-moyens et limites :** L'électricité intervient dans le dénouement. La formulation pseudo-scientifique du dialogue n'est pas un fait réel de chimie ; pas de procédure électrique réelle proposée. ([F-WATER](https://charmed.fandom.com/wiki/P3_H2O/Script))
- **Psychologie et comportement :** Prédation ; la culpabilité de Sam relève de son histoire avec Patty, pas d'un pouvoir mental du démon démontré ici. ([F-WATER-PLOT](https://charmed.fandom.com/wiki/P3_H2O/Plot))
- **Incertitudes :** Sources par extraits. Portée hors de l'eau et limites géographiques inconnues ; ne pas inventer une impossibilité d'en sortir.

**Description courte proposée pour la carte**

> Démon de l'eau — entité prédatrice qui agit dans l'eau et résiste au pouvoir de gel observé chez les Halliwell.

Niveau des appuis : `extrait_recherche_secondaire`, `extrait_recherche_transcription_non_officielle`. Aucun visionnage direct.


### 30. Démon de l'Illusion

Identifiant proposé : `illusion-demon`. Type : `individu`. Statut : proposition.

**Repères :** S02E18 — Chick Flick.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Fait communiquer des films et le monde des personnages de la série. ([F-ILLUSION](https://charmed.fandom.com/wiki/Demon_of_Illusion))
- **Pouvoirs et fonctionnement :** Entre dans les projections et en fait sortir des figures meurtrières. Une disparition vers l'écran peut simuler une élimination. ([F-ILLUSION](https://charmed.fandom.com/wiki/Demon_of_Illusion))
- **Conditions, portée et variantes :** Les figures issues du film suivent une logique différente d'un humain ordinaire. Cela ne rend pas le démon tout-puissant sur toute fiction. ([F-CHICK](https://charmed.fandom.com/wiki/Chick_Flick/Script))
- **Contre-moyens et limites :** La destruction de la pellicule dans le projecteur intervient dans sa défaite ; support et accès importent. ([ACA-ILLUSION](https://gloria-withalm.uni-ak.ac.at/withalm/wit-pdfs/Withalm2018_13IASS-Kaunas_all.pdf))
- **Psychologie et comportement :** Transforme le divertissement horrifique en violence réelle dans l'univers de la série. ([F-ILLUSION](https://charmed.fandom.com/wiki/Demon_of_Illusion))
- **Incertitudes :** Étendue à la télévision, aux fichiers numériques ou à un autre support non vérifiée ; ne pas l'inventer.

**Description courte proposée pour la carte**

> Démon de l'Illusion — démon capable de traverser l'écran et de faire sortir des personnages de films.

Niveau des appuis : `extrait_recherche_etude_secondaire`, `extrait_recherche_secondaire`, `extrait_recherche_transcription_non_officielle`. Aucun visionnage direct.


### 31. Imara

Identifiant proposé : `imara`. Type : `individu`. Statut : proposition.

**Repères :** S07E19 — Freaky Phoebe.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon qui prend le corps de Phoebe par échange d'âmes. ([T0719](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e19&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Rituel d'échange utilisant des cheveux fraîchement prélevés ; un simple cheveu ancien sur une brosse ne remplit pas la condition citée. ([T0719](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e19&tv-show=charmed))
- **Conditions, portée et variantes :** Identité de l'âme et corps occupé doivent être suivis séparément. L'apparence de Phoebe ne garantit donc ni son identité ni son consentement. ([T0719](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e19&tv-show=charmed))
- **Contre-moyens et limites :** Le renversement de l'échange exige de reconstituer correctement la situation. Détruire sans examen le corps démoniaque peut atteindre Phoebe. ([T0719](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e19&tv-show=charmed), [F-IMARA](https://charmed.fandom.com/wiki/Freaky_Phoebe/Plot))
- **Psychologie et comportement :** Recherche la puissance et l'avantage d'une apparence de confiance. ([F-IMARA](https://charmed.fandom.com/wiki/Freaky_Phoebe/Plot))
- **Incertitudes :** Ne pas présumer que tous les pouvoirs suivent l'âme plutôt que le corps ; inventaire après échange à vérifier capacité par capacité.

**Description courte proposée pour la carte**

> Imara — démon capable d'échanger son âme avec celle d'une cible par un rituel nécessitant des cheveux fraîchement prélevés.

Niveau des appuis : `extrait_recherche_secondaire`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 32. Javna / Stefan

Identifiant proposé : `javna`. Type : `individu`. Statut : proposition.

**Repères :** S01E02 — I've Got You Under My Skin.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon prédateur qui prend une apparence séduisante. ([T0102](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e02&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Vole la force vitale pour conserver sa jeunesse ; l'Œil maléfique intervient dans l'attaque. ([T0102](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e02&tv-show=charmed))
- **Conditions, portée et variantes :** Le Livre décrit une période d'activité d'une semaine par an. Ce calendrier n'est pas celui des autres démons. ([T0102](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e02&tv-show=charmed))
- **Contre-moyens et limites :** La Main de Fatima est employée par les trois sœurs. Le texte exact n'est pas reproduit et aucune équivalence universelle n'est inventée. ([T0102](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e02&tv-show=charmed))
- **Psychologie et comportement :** Séduction et exploitation de victimes attirées par une promesse photographique. ([T0102](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e02&tv-show=charmed))
- **Incertitudes :** Les références religieuses appartiennent à la fiction ; ne pas les présenter comme des propriétés historiques réelles.

**Description courte proposée pour la carte**

> Javna — démon voleur de force vitale, utilisant une apparence séduisante pour préserver sa jeunesse.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 33. Drazi

Identifiant proposé : `drazi`. Type : `individu`. Statut : proposition.

**Repères :** S02E10 — Heartbreak City.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon de la haine qui vole la bague de Cupidon. ([F-DRAZI](https://charmed.fandom.com/wiki/Heartbreak_City/Plot))
- **Pouvoirs et fonctionnement :** S'en prend aux liens amoureux ; une partie de ses moyens et de sa protection vient de la bague dérobée. ([F-DRAZI](https://charmed.fandom.com/wiki/Heartbreak_City/Plot), [F-DRAZI-SCRIPT](https://charmed.fandom.com/wiki/Heartbreak_City/Script))
- **Conditions, portée et variantes :** La bague est un objet externe. Son emploi ne donne pas à Drazi l'identité ou tous les attributs naturels d'un Cupidon. ([F-DRAZI](https://charmed.fandom.com/wiki/Heartbreak_City/Plot))
- **Contre-moyens et limites :** La reprise de l'objet fait tomber une protection essentielle. Le dossier ne généralise pas 'retirer toute bague rend tout démon mortel'. ([F-DRAZI-SCRIPT](https://charmed.fandom.com/wiki/Heartbreak_City/Script))
- **Psychologie et comportement :** Vengeance alimentée par une relation contrariée ; transforme ce ressentiment en attaque contre les couples. ([F-DRAZI](https://charmed.fandom.com/wiki/Heartbreak_City/Plot))
- **Incertitudes :** Version avec bague à distinguer de la version sans bague ; arsenal natif et dénouement visuel à compléter.

**Description courte proposée pour la carte**

> Drazi — démon de la haine qui attaque les liens amoureux et peut exploiter les capacités d'une bague de Cupidon volée.

Niveau des appuis : `extrait_recherche_secondaire`, `extrait_recherche_transcription_non_officielle`. Aucun visionnage direct.


### 34. La Sirène / The Siren

Identifiant proposé : `siren`. Type : `individu`. Statut : proposition.

**Repères :** S05E04 — Siren Song.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon lié à une histoire de relation adultère et de vengeance, distinct d'une sirène aquatique. ([F-SIREN](https://charmed.fandom.com/wiki/Siren_Song))
- **Pouvoirs et fonctionnement :** Chant de séduction surnaturelle, baiser meurtrier et feu ; ses attaques atteignent aussi Cole dans l'épisode. ([F-SIREN](https://charmed.fandom.com/wiki/Siren_Song), [F-SIREN-SCRIPT](https://charmed.fandom.com/wiki/Siren_Song/Script))
- **Conditions, portée et variantes :** Le statut démoniaque de Cole ne prouve pas une immunité au chant. Les pouvoirs de Piper et Leo sont échangés à cette période. ([F-SIREN](https://charmed.fandom.com/wiki/Siren_Song))
- **Contre-moyens et limites :** Une potion est préparée et un sort envisagé ; leur mention ne vaut pas vérification d'une recette complète ni preuve que le sort a été lancé. ([F-SIREN-SCRIPT](https://charmed.fandom.com/wiki/Siren_Song/Script))
- **Psychologie et comportement :** Reproduit sa vengeance à travers les couples qu'elle cible. ([F-SIREN](https://charmed.fandom.com/wiki/Siren_Song))
- **Incertitudes :** Dénouement exact à revoir avant d'attribuer une élimination à un pouvoir personnel de Leo ; ne pas importer la mythologie antique comme mécanisme.

**Description courte proposée pour la carte**

> La Sirène — démon au chant ensorcelant, capable d'un baiser meurtrier et de manipuler le feu.

Niveau des appuis : `extrait_recherche_secondaire`, `extrait_recherche_transcription_non_officielle`. Aucun visionnage direct.


### 35. Gith

Identifiant proposé : `gith`. Type : `individu`. Statut : proposition.

**Repères :** S06E06 — My Three Witches.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon qui enferme les sœurs dans des réalités adaptées à leurs désirs. ([T0606](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e06&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Crée des mondes de poche et se nourrit de l'énergie liée aux désirs. ([T0606](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e06&tv-show=charmed))
- **Conditions, portée et variantes :** Les scénarios sont centrés sur les personnes piégées ; cela ne démontre pas un pouvoir illimité de réécrire tout l'univers. ([T0606](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e06&tv-show=charmed))
- **Contre-moyens et limites :** La compréhension des désirs et la reconnexion entre les sœurs participent à la sortie du piège. Déroulé final à contrôler avant toute recette de résolution. ([T0606](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e06&tv-show=charmed))
- **Psychologie et comportement :** Exploite ce que ses victimes pensent vouloir ; le souhait accompli peut devenir une prison. ([T0606](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e06&tv-show=charmed))
- **Incertitudes :** S06E06 My Three Witches, pas S06E03. L'information fournie par Chris dans ce cas n'est pas une condition universelle prouvée.

**Description courte proposée pour la carte**

> Gith — démon créateur de mondes de poche façonnés par les désirs de ses victimes, dont il tire sa puissance.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 36. Drake

Identifiant proposé : `drake`. Type : `ancien_demon`. Statut : proposition.

**Repères :** S07E14 — Carpe Demon ; S07E16 — The Seven Year Witch.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Ancien démon devenu humain par contrat pour un an, ensuite enseignant et proche de Phoebe. ([T0714](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e14&tv-show=charmed), [T0716](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e16&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Conserve des pouvoirs dans cette transformation : humanité et absence de magie ne sont donc pas synonymes dans ce cas. ([T0714](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e14&tv-show=charmed))
- **Conditions, portée et variantes :** Le contrat encadre leur emploi ; l'usage offensif au sens de l'accord permet au sorcier d'en profiter. Ce n'est pas un coût magique universel. ([T0714](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e14&tv-show=charmed))
- **Contre-moyens et limites :** La résolution du conflit contractuel ne suffit pas à effacer toute limite de durée. Ne pas transformer le contrat en antidote à toute mortalité. ([T0714](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e14&tv-show=charmed))
- **Psychologie et comportement :** Attachement aux livres et désir d'expérimenter la vie ; son aide à Phoebe s'inscrit aussi dans l'intervention de Cole. ([T0714](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e14&tv-show=charmed), [T0716](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e16&tv-show=charmed))
- **Incertitudes :** Liste complète des pouvoirs conservés non auditée. Ne pas fusionner ce contrat avec la potion retirant les pouvoirs de Cole.

**Description courte proposée pour la carte**

> Drake — ancien démon devenu humain pour une durée limitée, lettré et encore doté de pouvoirs encadrés par un contrat.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 37. L'Oracle de la Source

Identifiant proposé : `oracle-source`. Type : `individu`. Statut : proposition.

**Repères :** S04E07 — Brain Drain.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Conseillère démoniaque de la Source ; distincte de la Seer de S4 et de Kyra. ([F-ORACLE](https://charmed.fandom.com/wiki/Brain_Drain/Plot))
- **Pouvoirs et fonctionnement :** Participe au dispositif de l'illusion hospitalière imposée à Piper ; le pouvoir structurant du piège est attribué à la Source. ([F-ORACLE](https://charmed.fandom.com/wiki/Brain_Drain/Plot))
- **Conditions, portée et variantes :** Le dossier ne lui attribue pas par défaut la création autonome de mondes mentaux. Sa fonction de conseil n'établit pas une omniscience. ([F-ORACLE](https://charmed.fandom.com/wiki/Brain_Drain/Plot))
- **Contre-moyens et limites :** Elle intercepte l'attaque de Cole destinée à la Source et en meurt selon le résumé ; protection du maître n'est pas immunité. ([F-ORACLE](https://charmed.fandom.com/wiki/Brain_Drain/Plot))
- **Psychologie et comportement :** Loyauté sacrificielle dans cet épisode. ([F-ORACLE](https://charmed.fandom.com/wiki/Brain_Drain/Plot))
- **Incertitudes :** Fiche préliminaire : pouvoirs divinatoires détaillés et autres apparitions à documenter ; aucun pouvoir actif spécifique ajouté à la carte.

**Description courte proposée pour la carte**

> L'Oracle — conseillère démoniaque au service de la Source, impliquée dans ses manipulations et sa protection.

Niveau des appuis : `extrait_recherche_secondaire`. Aucun visionnage direct.


### 38. Seekers / démons chercheurs

Identifiant proposé : `seekers`. Type : `espece`. Statut : proposition.

**Repères :** S03E16 — Death Takes a Halliwell.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Traqueurs qui cherchent Cole et interrogent mortellement des humains. ([T0316](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e16&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Détectent des traces démoniaques et extraient des informations en s'attaquant au cerveau de leurs victimes. ([T0316](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e16&tv-show=charmed))
- **Conditions, portée et variantes :** Une formule de dialogue les décrit comme détecteurs de mensonges ; ne pas traduire ce propos en connaissance universelle sans contact ni trace. ([T0316](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e16&tv-show=charmed))
- **Contre-moyens et limites :** Le Livre contient un sort du Pouvoir des Trois contre eux. La formule complète n'est pas auditée ici ; Cole dit ignorer comment les détruire, ce qui limite son expertise dans cette scène. ([T0316](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e16&tv-show=charmed))
- **Psychologie et comportement :** Interrogateurs prédateurs ; leurs actes sont distincts de la fonction neutre de l'Ange de la Mort présent dans l'épisode. ([T0316](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e16&tv-show=charmed))
- **Incertitudes :** Ne pas les confondre avec les Collectors, ni avec l'Ange de la Mort. Portée, exigences de contact et autres cibles à compléter.

**Description courte proposée pour la carte**

> Seekers — traqueurs démoniaques capables de repérer des traces de démons et d'extraire mortellement les connaissances d'une victime.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 39. Jeric

Identifiant proposé : `jeric`. Type : `individu`. Statut : proposition.

**Repères :** S05E10 — Y Tu Mummy También.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon cherchant à préserver et réincarner Isis dans un corps d'accueil. ([OFF-JERIC](https://www.intl.paramountplus.com/fr/shows/video/8galC93ngmySfhek0SDdqQw4acRJ9Y6z/), [F-JERIC](https://charmed.fandom.com/wiki/Y_Tu_Mummy_Tambi%C3%A9n))
- **Pouvoirs et fonctionnement :** Momification et emprisonnement de l'esprit ; participe à une opération de possession. ([T0510](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e10&tv-show=charmed))
- **Conditions, portée et variantes :** Deux âmes dans un même hôte posent un problème de cohabitation et de durée. Isis intervient dans la réanimation ; ne pas tout attribuer à Jeric seul. ([T0510](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e10&tv-show=charmed))
- **Contre-moyens et limites :** L'extraction de l'âme et la sauvegarde de l'hôte doivent être distinguées de la mort du démon. Jeric est détruit après le sauvetage de Phoebe selon le résumé. ([F-JERIC](https://charmed.fandom.com/wiki/Y_Tu_Mummy_Tambi%C3%A9n))
- **Psychologie et comportement :** Attachement possessif à Isis et instrumentalisation des corps d'autrui. ([T0510](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e10&tv-show=charmed))
- **Incertitudes :** S05E10 selon TVmaze, S5E9 sur le synopsis Paramount consulté. Statut précis d'Isis et durée de survie de chaque hôte à vérifier.

**Description courte proposée pour la carte**

> Jeric — démon capable de momifier et de retenir un esprit, engagé dans la recherche d'un corps d'accueil pour Isis.

Niveau des appuis : `extrait_recherche_secondaire`, `extrait_recherche_synopsis_officiel`, `transcription_non_officielle_consultee`. Aucun visionnage direct.


### 40. Zahn

Identifiant proposé : `zahn`. Type : `individu`. Statut : proposition.

**Repères :** S06E07 — Soul Survivor.

**Fiche destinée à l’Ange du destin**

- **Identité et fonction :** Démon marchand d'âmes qui accumule des pouvoirs par ses transactions. ([T0607](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e07&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Son arsenal a progressé depuis une ancienne description du Livre ; les pouvoirs acquis ne doivent pas être traités comme innés et constants. ([T0607](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e07&tv-show=charmed))
- **Conditions, portée et variantes :** Les contrats structurent son emprise. Zahn affirme qu'une clause condamne les âmes détenues si lui-même est détruit : sa mort seule n'est donc pas un sauvetage. ([T0607](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e07&tv-show=charmed))
- **Contre-moyens et limites :** Piper détruit le coffre des contrats avant l'élimination de Zahn ; Larry est ensuite dit sauvé. Ce résultat dépend des contrats de cet épisode, pas d'une loi générale sur tout pacte. ([T0607](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e07&tv-show=charmed))
- **Psychologie et comportement :** Cupidité et négociation : monnaye les âmes plutôt que de rechercher uniquement le meurtre immédiat. ([T0607](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e07&tv-show=charmed))
- **Incertitudes :** S06E07 Soul Survivor. Inventaire daté des acquisitions et applicabilité des clauses à d'autres pactes laissés ouverts.

**Description courte proposée pour la carte**

> Zahn — marchand démoniaque d'âmes, dont les transactions lui permettent d'acquérir de nouveaux pouvoirs.

Niveau des appuis : `transcription_non_officielle_consultee`. Aucun visionnage direct.


## 6. Registre des sources

Consultation/recherche : 8 septembre 2026. Les codes T désignent une transcription non officielle consultée, pas une source audiovisuelle directement auditée. Les liens précis ci-dessous et les repères par fiche permettent de reprendre chaque recherche. Les sources du dossier Cole antérieur restent également détaillées dans l'annexe.

- **T0102** — [S01E02](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e02&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0113** — [S01E13](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e13&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0115** — [S01E15](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e15&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0119** — [S01E19](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e19&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0122** — [S01E22](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e22&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0201** — [S02E01](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e01&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0204** — [S02E04](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e04&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0305** — [S03E05](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e05&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0306** — [S03E06](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e06&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0307** — [S03E07](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e07&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0308** — [S03E08](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0316** — [S03E16](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e16&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0319** — [S03E19](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e19&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0320** — [S03E20](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0321** — [S03E21](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0322** — [S03E22](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0401** — [S04E01](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e01&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0403** — [S04E03](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e03&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0408** — [S04E08](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0413** — [S04E13](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0415** — [S04E15](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e15&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0507** — [S05E07](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e07&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0510** — [S05E10](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e10&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0512** — [S05E12](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e12&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0606** — [S06E06](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e06&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0607** — [S06E07](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e07&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0701** — [S07E01](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e01&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0710** — [S07E10](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e10&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0714** — [S07E14](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e14&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0716** — [S07E16](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e16&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0719** — [S07E19](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e19&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0722** — [S07E22](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e22&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0804** — [S08E04](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e04&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **T0821** — [S08E21](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e21&tv-show=charmed) ; `transcription_non_officielle_consultee`. Passages utiles consultés ; ni vidéo visionnée ni transcription officielle. Attribution des répliques parfois absente.
- **F-TRIADE** — [F-TRIADE](https://charmed.fandom.com/wiki/Engaged_and_Confused/Plot) ; `extrait_recherche_secondaire`. S08E16 : combat et affaiblissement du collectif ; attribution du lanceur de feu divergente entre résultats Plot et Script.
- **F-FINAL** — [F-FINAL](https://charmed.fandom.com/wiki/Forever_Charmed/Script) ; `extrait_recherche_transcription_non_officielle`. S08E22 : potions contre la Triade ; extrait de transcription non officielle, page intégrale non consultée.
- **F-DUMAIN** — [F-DUMAIN](https://charmed.fandom.com/wiki/Dumain) ; `extrait_recherche_secondaire`. S8 : manipulation, bague de Coop, deux versions temporelles ; exclure toute extension hors télévision.
- **F-SEER** — [F-SEER](https://charmed.fandom.com/wiki/Womb_Raider/Plot) ; `extrait_recherche_secondaire`. S04E21 : transfert du fœtus et affrontement ; page Springfield inaccessible.
- **F-ZANKOU** — [F-ZANKOU](https://charmed.fandom.com/wiki/Zankou) ; `extrait_recherche_secondaire`. Sections télévision : absorption du métamorphe et pouvoirs volés en S7. Sections comics, résurrection par Tyler et portails exclus.
- **F-BARBAS** — [F-BARBAS](https://charmed.fandom.com/wiki/Barbas) ; `extrait_recherche_secondaire`. Condition du premier retour S01E13 ; ne pas l'étendre aux autres saisons.
- **F-BROTHER** — [F-BROTHER](https://charmed.fandom.com/wiki/Brotherhood_of_the_Thorn) ; `extrait_recherche_secondaire`. Confrérie, rôle de Raynor et opérations ; ne pas déduire extinction de tout membre de la chute des chefs.
- **F-VORNAC** — [F-VORNAC](https://charmed.fandom.com/wiki/The_Demon_Who_Came_in_from_the_Cold/Plot) ; `extrait_recherche_secondaire`. S03E19 : infiltration, défiance et Klea.
- **F-KLEA** — [F-KLEA](https://charmed.fandom.com/wiki/Klea) ; `extrait_recherche_secondaire`. Observation à distance (voyeurism), shimmering ; aucune télépathie ajoutée.
- **F-SYKES** — [F-SYKES](https://charmed.fandom.com/wiki/Black_as_Cole/Plot) ; `extrait_recherche_secondaire`. S04E08 : résistance à l'attaque de Cole, duel démoniaque, retrait des pouvoirs de Cole.
- **F-LUDLOW** — [F-LUDLOW](https://charmed.fandom.com/wiki/Ludlow) ; `extrait_recherche_secondaire`. S04E12 uniquement : école des firestarters, récupération des pouvoirs et résistance au feu.
- **F-TYLER** — [F-TYLER](https://charmed.fandom.com/wiki/Tyler_Michaels) ; `extrait_recherche_secondaire`. Uniquement résumé télévisé de Lost and Bound : Ludlow résiste, sort collectif. Tout contenu comics/Archai/portail exclu.
- **F-WATER** — [F-WATER](https://charmed.fandom.com/wiki/P3_H2O/Script) ; `extrait_recherche_transcription_non_officielle`. S02E08 : gel inefficace et électricité dans le récit ; extrait non officiel.
- **F-WATER-PLOT** — [F-WATER-PLOT](https://charmed.fandom.com/wiki/P3_H2O/Plot) ; `extrait_recherche_secondaire`. S02E08 : mort de Patty et affrontement avec Sam.
- **F-ILLUSION** — [F-ILLUSION](https://charmed.fandom.com/wiki/Demon_of_Illusion) ; `extrait_recherche_secondaire`. S02E18 : passage entre écran et monde réel, fausse élimination.
- **F-CHICK** — [F-CHICK](https://charmed.fandom.com/wiki/Chick_Flick/Script) ; `extrait_recherche_transcription_non_officielle`. S02E18 : extrait de transcription ; vérifier audiovisuellement le dénouement.
- **F-DRAZI** — [F-DRAZI](https://charmed.fandom.com/wiki/Heartbreak_City/Plot) ; `extrait_recherche_secondaire`. S02E10 : démon de haine, bague volée à Cupidon.
- **F-DRAZI-SCRIPT** — [F-DRAZI-SCRIPT](https://charmed.fandom.com/wiki/Heartbreak_City/Script) ; `extrait_recherche_transcription_non_officielle`. S02E10 : perte de protection après reprise de la bague.
- **F-SIREN** — [F-SIREN](https://charmed.fandom.com/wiki/Siren_Song) ; `extrait_recherche_secondaire`. S05E04 : chant, baiser, feu, pouvoirs échangés entre Piper et Leo.
- **F-SIREN-SCRIPT** — [F-SIREN-SCRIPT](https://charmed.fandom.com/wiki/Siren_Song/Script) ; `extrait_recherche_transcription_non_officielle`. S05E04 : chant atteignant Cole, potion et sort envisagés ; recette non auditée.
- **F-ORACLE** — [F-ORACLE](https://charmed.fandom.com/wiki/Brain_Drain/Plot) ; `extrait_recherche_secondaire`. S04E07 : illusion hospitalière de la Source, Oracle interceptant l'attaque de Cole.
- **F-JERIC** — [F-JERIC](https://charmed.fandom.com/wiki/Y_Tu_Mummy_Tambi%C3%A9n) ; `extrait_recherche_secondaire`. S05E10 selon index local ; Jeric, Isis, momification et mort de Jeric.
- **F-IMARA** — [F-IMARA](https://charmed.fandom.com/wiki/Freaky_Phoebe/Plot) ; `extrait_recherche_secondaire`. S07E19 : échange de corps et renversement.
- **OFF-JERIC** — [OFF-JERIC](https://www.intl.paramountplus.com/fr/shows/video/8galC93ngmySfhek0SDdqQw4acRJ9Y6z/) ; `extrait_recherche_synopsis_officiel`. Identité de Jeric et amour pour Isis uniquement. Plateforme indique S5E9 ; index TVmaze S05E10.
- **ACA-ILLUSION** — [ACA-ILLUSION](https://gloria-withalm.uni-ak.ac.at/withalm/wit-pdfs/Withalm2018_13IASS-Kaunas_all.pdf) ; `extrait_recherche_etude_secondaire`. Chick Flick : dénouement lié à la pellicule et au projecteur. PDF non lu intégralement.

## 7. Fichiers actifs concernés si la contribution est retenue

| Fichier | Modification à préparer dans la conversation principale |
|---|---|
| `Charmed/canon/magie-demons.json` | Enrichir les 15 identifiants existants ; évaluer 25 ajouts ; conserver types, variantes, limites et provenance. Adapter le schéma, ne pas remplacer le fichier par le JSON de contribution. |
| `Charmed/canon/REGLES_MAGIQUES_ET_DEMONS.md` | Reporter les fiches retenues et leurs incertitudes, en cohérence avec le JSON. |
| `Charmed/canon/personnages.json` | Rapprocher les démons individuels déjà présents et leurs périodes, dont `cole` ; éviter les ressources dupliquées. |
| `Charmed/canon/bibliotheque-verifiee.json` | Ajouter seulement les assertions après examen selon son schéma. Ne pas donner automatiquement le statut vérifié à nos extraits ou transcriptions. |
| `Charmed/canon/construction.json` et `CONSTRUCTION_DES_PARTIES.md` | Uniquement si des moyens précis sont retenus ; conserver les recettes non auditées à null et les conditions. |
| `Charmed/recherche/.../fiches.json` et documentation associée | Éventuelle normalisation du corpus de recherche dans le format existant, à décider par l'intégrateur. Le chargeur ne lit pas directement ce dossier de contribution. |
| `Charmed/BIBLIOTHEQUE.md` | Mettre à jour l'index après intégration effective, pas sur la seule existence de cette proposition. |

Les règles, décisions et sauvegardes ne sont pas des cibles de modification par défaut. Une nouvelle règle de scénario exige un arbitrage explicite. Aucun patch de code n'est nécessaire pour examiner les textes ; aucun patch actif n'a été appliqué.

## 8. Vérifications et travail restant

Les contrôles de `VERIFICATIONS.md` portent sur la cohérence documentaire : 40 identifiants uniques, références résolues, épisodes présents dans l'index local, textes de carte présents, absence d'activation et de recette inventée. Ils ne démontrent pas la vérité audiovisuelle des affirmations ni un comportement du moteur.

Travail restant : reprendre prioritairement les passages de la Source, Barbas, Zankou et de la Triade sur vidéo ; préciser les inventaires datés et les contre-moyens encore ouverts ; rapprocher la contribution parallèle ; choisir les variantes et noms ; adapter les assertions au schéma canonique puis vérifier leur consommation par l'Ange dans un cadre autorisé, sans intervenir sur une partie en cours.

L'élargissement à d'autres démons reste possible, mais ce dossier n'annonce pas une couverture exhaustive de la série. Il fournit un ensemble relisible maintenant, avec ses lacunes visibles. La conversation principale reste responsable de la vérification et de l'intégration.
