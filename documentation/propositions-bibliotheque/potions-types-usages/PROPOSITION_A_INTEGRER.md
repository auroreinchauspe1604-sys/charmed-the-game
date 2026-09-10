# Contribution proposée — Potions : types, usages et limites

Date : 8 septembre 2026. Statut : **proposition à examiner ; aucune intégration ni activation**.

## 1. Périmètre et documents consultés

Interprétation provisoire du brief incomplet : « les potions, leurs types et usages ». Le champ de demande détaillée est resté vide ; le nom de dossier `potions-types-usages` est un choix de classement, pas un nom validé par Aurore. Une clarification a été demandée pendant la recherche. Ce lot traite sept entrées représentatives et leurs contre-exemples ; ce n'est pas un catalogue exhaustif des potions de huit saisons.

Univers retenu : série originale uniquement, saisons 1 à 8. Aucun fait importé du reboot, des comics ou des romans. Aucun épisode visionné : vérification documentaire de passages de transcriptions non officielles et de résultats indexés.

Instructions lues : consignes AGENTS fournies dans la conversation et fichier global `C:/Users/auror/Documents/Codex/2026-08-29/dis-moi-est-ce-que-tu/outputs/01_REGLES_GLOBALES_ACTEES.md`. Recherche de fichiers AGENTS locaux : aucun trouvé dans l'arborescence Charmed examinée.

Fichiers du projet consultés (chemins relatifs à la racine du projet) :

- `Charmed/REGLES_ACTEES.md`, `Charmed/DECISIONS_ACTEES.md`, `Charmed/BIBLIOTHEQUE.md`, `Charmed/PREPARATION_DOCUMENTEE.md` : lecture des références demandées.
- `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` : sections Belthazor, vérité, téléportation et retrait des pouvoirs ; autres occurrences repérées par recherche.
- `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` et `Charmed/canon/construction.json` : entrées `belthazor-potion` et `power-stripping`.
- `Charmed/canon/REGLES_MAGIQUES_ET_DEMONS.md` et `Charmed/canon/magie-demons.json` : passages relatifs aux potions et à leurs cibles.
- `Charmed/canon/bibliotheque-verifiee.json` : structure actuelle des sources et assertions.
- `Charmed/parties/manoir-assiege/PARTIE.md` : contexte de préparation, sans lecture du journal de partie.
- Repérage textuel des branchements dans `serveur/charmed/bibliotheque.js`, `serveur/charmed/expertise-runtime.js` et `scripts/render_charmed_magic_reference.cjs` ; pas d'audit complet du code.

## 2. Constats

Les ressources préparées, leur recette et le matériel de fabrication doivent rester distincts. Le matériel de potion présent dans Le manoir assiégé ne prouve pas la possession de toutes les fioles décrites ici.

Le socle actuel est prudent mais partiel : Belthazor est mieux documenté que la téléportation et le retrait des pouvoirs. Il manque notamment le contre-exemple S05E07, qui rend insuffisante une description du retrait comme simple suppression définitive.

Le nom d'une famille ne garantit ni l'effet sur une cible donnée ni un mode d'application unique. Certaines fioles provoquent une explosion, d'autres une exposition à une fumée ; une potion répandue peut encore être utilisée dans une scène attestée. Les connaissances du corpus ne créent aucune ressource disponible.

La période de la partie décrite dans `PARTIE.md` est la saison 7 après S07E17, avant sa fin. Les observations S08E18 et S08E20 ci-dessous sont postérieures : elles ne justifient pas, seules, une disponibilité en saison 7. Il s'agit d'une limite de preuve, pas de l'affirmation que ces préparations ne pouvaient pas exister auparavant.

## 3. Texte transversal proposé pour l'Ange du destin

> Pour une potion, distinguer la préparation identifiée, l'effet recherché, les composants effectivement disponibles, la fabrication accomplie et l'application possible. Vérifier la cible et son état à la période du scénario. Une appellation générale ne suffit pas à établir une efficacité universelle, une recette complète, une portée ou une durée. Distinguer résultat attendu, résultat observé et information inconnue. Une explosion n'établit pas à elle seule une destruction définitive ; un retrait de pouvoirs ne prouve pas leur disparition du monde. Examiner séparément le liquide, la fiole et l'effet déjà produit : la rupture du contenant n'établit pas toujours la neutralisation de son contenu. Appliquer les règles actées de consommation, de récupération et de suffisance sans ajouter de coût ou délai uniforme. Si un mécanisme décisif reste inconnu, demander une recherche ciblée selon le dispositif acté ; ne pas pénaliser une proposition uniquement parce que le corpus est incomplet.

Ce paragraphe est une proposition de consolidation du raisonnement, pas une nouvelle règle de jeu validée. Les observations qui le motivent sont détaillées ci-dessous.

## 4. Fiches détaillées et descriptions courtes proposées

Les noms français sont des libellés éditoriaux proposés, sans certification de leur formulation dans le doublage français. Les ingrédients évoqués relèvent de la fiction ; aucune recette complète n'est reconstituée.

### P01 — Potion contre Belthazor

**Fiche Ange du destin.** Dans S03E08, *Sleuthing with the Enemy*, la préparation inclut de la chair de Belthazor. Les dialogues mentionnent aussi coquilles, pieds de porc, mandragore et une incantation, sans fournir une recette quantitative complète. Une réaction accompagne l'ajout du fragment. Les sœurs disent pouvoir agir sans le Pouvoir des Trois pour cette opération ; cela ne supprime pas rétroactivement les étapes de préparation. [S1, début de l'épisode, lignes web 15–56 et 100–106]

**Portée et limites.** Préparation dirigée contre Belthazor, sans efficacité universelle établie. Ne pas confondre la conviction des personnages sur son efficacité et une destruction finale directement vérifiée dans ce dossier. Quantités, conservation, rendement et délai reproductible inconnus. Le prélèvement doit correspondre à la cible ; aucune substitution inventée.

**Description courte proposée.** « Préparation destinée à vaincre Belthazor, dont la fabrication exige notamment un fragment de sa chair. »

### P02 — Potion de retrait des pouvoirs démoniaques de Cole

**Fiche Ange du destin.** En S04E08, *Black as Cole*, Phoebe identifie après la confrontation la potion comme celle préparée pour libérer Cole de ses pouvoirs. Cole subsiste comme humain. Il faut donc distinguer la disparition de Belthazor dans cette scène de la mort de Cole. [S2, dénouement, lignes 521–540]

**Activation et portée.** Les dialogues évoquent un lancer, mais la transcription sans didascalies ne suffit pas à attribuer avec assurance tous les gestes. La fiche ne certifie ni ingestion obligatoire ni recette intégrale. Le précédent concerne Cole dans cet état, pas tout être magique.

**Variante décisive.** S05E07 fait l'objet d'une fiche séparée : ne pas fusionner des formulations adaptées à des pouvoirs différents.

**Description courte proposée.** « Potion destinée à retirer les pouvoirs démoniaques de Cole tout en laissant subsister sa personne humaine. »

### P03 — Retrait adapté aux pouvoirs acquis par Cole

**Fiche Ange du destin.** En S05E07, *Sympathy for the Demon*, Paige dit avoir ajusté la préparation aux pouvoirs supplémentaires de Cole. Le retrait réussit, mais Barbas récupère ces pouvoirs. Les personnages envisagent ensuite leur retour à Cole. Ce précédent exclut une promesse générale de disparition définitive des pouvoirs retirés. [S3, lignes 202–238 et 374–383]

**Application et exception matérielle.** Le dénouement décrit une fiole brisée : Paige téléporte la potion répandue sur Barbas, puis les pouvoirs rejoignent Cole. Ce passage est accessible dans une transcription indexée, non par ouverture directe. La potion peut donc rester exploitable après rupture du contenant dans ce contexte précis. [S4, confrontation finale]

**Limites.** Ajustements de recette non établis ; ne pas transformer ce cas en transfert automatique vers n'importe quel destinataire. L'orbing dépend de Paige et de ses capacités, pas de la potion seule. Aucun délai général ni nombre de doses établi.

**Description courte proposée.** « Préparation de retrait adaptée aux pouvoirs supplémentaires de Cole ; les pouvoirs libérés peuvent être récupérés dans le contexte documenté. »

### P04 — Potion explosive de Piper

**Fiche Ange du destin.** Dans S04E13, *Charmed and Dangerous*, Piper, privée de ses pouvoirs par le Hollow, annonce une potion reproduisant son effet d'explosion. La transcription avec didascalies décrit ensuite Phoebe lançant une potion contre l'Être des ténèbres, qui explose ; le Hollow demeure et s'éloigne. [S5, lignes 177–184 ; S6, attaque contre Leo et Paige]

**Portée.** L'existence de cette préparation ne donne pas au détenteur tous les pouvoirs de Piper. Le succès contre cet attaquant n'établit ni destruction du Hollow ni efficacité contre tous les êtres puissants. La recette et le rayon d'effet ne sont pas établis ici. Une explosion pendant la fabrication ne prouve pas que le produit est prêt.

**Description courte proposée.** « Préparation conçue par Piper pour produire un effet explosif comparable à celui de son pouvoir de combustion. »

### P05 — Potion de sommeil

**Fiche Ange du destin.** S02E06, *That Old Black Magic*, nomme une préparation de sommeil de Phoebe. Les dialogues opposent cette tentative à celle de Tuatha. Le résumé indexé précise que la première échoue contre Tuatha, tandis que sa propre potion endort Phoebe et Leo. [S7, lignes 450–478 ; S8, confrontation finale]

**Limites.** Le résultat ne démontre pas la cause de l'échec : ne pas déclarer Tuatha absolument immunisée ni déduire une hiérarchie chiffrée entre préparatrices. Durée, dose, rayon et réveil non établis. La description doit identifier la variante disponible plutôt que promettre l'endormissement de toute cible.

**Description courte proposée.** « Préparation destinée à provoquer le sommeil ; son efficacité dépend de la préparation et de la cible. »

**Faux amis à conserver dans la fiche d'expertise.** Dans ce même épisode, la fiole présentée pour éteindre le feu est de l'eau et la “potion de courage” est une ruse. Ne pas créer sur ce fondement deux potions magiques attestées. Cela n'établit pas une impossibilité universelle d'agir magiquement sur le courage. [S7, lignes 450–457 et 481–505]

### P06 — Potion de téléportation, cas Billie et Christy

**Fiche Ange du destin.** S08E18, *The Torn Identity*, associe leur déplacement vers Pator à une potion. La transcription indexée situe le lancer pendant que Christy capte les sœurs ; elle décrit aussi une disparition des deux femmes après que Billie lâche une fiole. [S9, rubrique potions ; S10, canalisation puis confrontation avec Pator]

**Conditions et limites.** Conserver ce contexte de repérage au lieu d'inventer une destination libre ou automatiquement connue. Le dossier ne démontre pas que la canalisation est nécessaire à toutes les potions de transport. Recette, portée maximale, nombre maximal de voyageurs et franchissement de barrières magiques restent inconnus. Les deux passages ne suffisent pas à certifier la composition identique de toutes les fioles concernées.

**Chronologie.** Observation S08E18 ; pas de disponibilité automatique avant cet épisode sur cette seule preuve.

**Description courte proposée.** « Préparation de transport magique utilisée par Billie et Christy ; la destination et les personnes transportées doivent être déterminées. »

### P07 — Potion de vérité

**Fiche Ange du destin.** S08E20, *Gone with the Witches*, évoque explicitement l'usage d'une potion de vérité pour obtenir un nom. La transcription indexée décrit Phoebe brisant une fiole aux pieds de Creo et de son compagnon ; une fumée est inhalée. Creo lutte contre l'effet et interrompt l'autre démon. [S11, lignes 281–284 ; S12, scène près de la benne]

**Portée et limites.** Il existe un précédent d'exposition par fumée, pas une obligation universelle de boire. Une réponse complète immédiate n'est pas garantie. Ne pas importer les 24 heures, la réciprocité ou l'amnésie du sort de vérité de S01E08, ni les propriétés du sérum du reboot. Durée, dosage et résistance complète non établis. Une information inconnue de la cible n'est pas rendue connue par la seule propriété déclarée de vérité : c'est une limite de raisonnement, pas une capacité canonique supplémentaire.

**Description courte proposée.** « Préparation dont les vapeurs poussent les personnes exposées à dire la vérité ; une résistance à l'effet est documentée. »

## 5. Sources et niveau réel de vérification

Consultation effectuée le 8 septembre 2026. Les repères de lignes concernent la représentation web au moment de la recherche, pas des minutages. Aucun accès audiovisuel, script officiel ou certification des traductions. “Page consultée” signifie ouverture réussie et examen des passages pertinents, pas visionnage ni contrôle exhaustif de l'épisode.

| ID | Source précise | Repère et niveau |
|---|---|---|
| S1 | [Springfield — S03E08](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed) | Page consultée ; transcription non officielle sans attribution systématique des répliques ; passages de préparation examinés. |
| S2 | [Springfield — S04E08](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed) | Page consultée ; transcription non officielle ; préparation et dénouement examinés. |
| S3 | [Springfield — S05E07](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e07&tv-show=charmed) | Page consultée ; transcription non officielle ; adaptation, transfert et dénouement examinés. |
| S4 | [Fandom — Sympathy for the Demon/Script](https://charmed.fandom.com/wiki/Sympathy_for_the_Demon/Script) | Passage de transcription non officielle obtenu par recherche indexée ; pas d'ouverture directe réussie ; didascalies de la flaque et du retour des pouvoirs. |
| S5 | [Springfield — S04E13](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed) | Page consultée ; transcription non officielle ; annonce de Piper examinée. |
| S6 | [Fandom — Charmed and Dangerous/Script](https://charmed.fandom.com/wiki/Charmed_and_Dangerous/Script) | Passage de transcription non officielle obtenu par recherche indexée ; accès direct signalé bloqué ; confrontation avec l'Être des ténèbres. |
| S7 | [Springfield — S02E06](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e06&tv-show=charmed) | Page consultée ; transcription non officielle ; préparation, confrontation et explication du courage. |
| S8 | [Fandom — That Old Black Magic/Plot](https://charmed.fandom.com/wiki/That_Old_Black_Magic/Plot) | Résumé secondaire indexé ; passage de confrontation examiné, page non ouverte directement. |
| S9 | [Fandom — The Torn Identity](https://charmed.fandom.com/wiki/The_Torn_Identity) | Extrait secondaire indexé ; identification de la potion de téléportation. |
| S10 | [Fandom — The Torn Identity/Script](https://charmed.fandom.com/wiki/The_Torn_Identity/Script) | Plusieurs passages indexés d'une transcription non officielle ; ouverture directe en erreur/blocage. |
| S11 | [Springfield — S08E20](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e20&tv-show=charmed) | Page consultée ; transcription non officielle ; objectif de la potion de vérité. |
| S12 | [Fandom — Gone with the Witches/Script](https://charmed.fandom.com/wiki/Gone_with_the_Witches/Script) | Passage de transcription non officielle obtenu par recherche indexée ; accès direct signalé bloqué ; application et résistance. |

Échecs supplémentaires : ouverture Springfield S08E18 en erreur ; ouvertures directes Fandom `Truth_Potion` et `Explosive_Potion` en erreur. Les assertions n'ont pas été certifiées sur ces pages indisponibles. Les résultats relatifs au reboot repérés pendant la recherche ont été exclus.

## 6. Intégration proposée et fichiers actifs concernés

1. Réviser les sections potions de `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` avec les fiches ci-dessus, en conservant leurs niveaux de preuve. Les autres sections n'ont pas à changer.
2. Enrichir `Charmed/canon/construction.json` et sa vue `CONSTRUCTION_DES_PARTIES.md`, notamment `belthazor-potion` et `power-stripping`. Conserver les identifiants existants. P03 doit rester une variante datée, pas remplacer indistinctement P02.
3. Compléter `specific-potions` et les références utiles dans `Charmed/canon/magie-demons.json` puis sa vue `REGLES_MAGIQUES_ET_DEMONS.md`.
4. Après revue par la conversation principale seulement, sélectionner des assertions pour `Charmed/canon/bibliotheque-verifiee.json`. Chaque assertion doit conserver épisode, source et limite. Ce dossier ne fournit pas de statut `verified` prêt à injecter : une transcription indexée ne devient pas une preuve audiovisuelle par changement de champ.
5. Actualiser `Charmed/BIBLIOTHEQUE.md` et, si nécessaire, l'index de recherche pour rendre les fiches accessibles. Le chargement du futur emplacement devra être vérifié dans `serveur/charmed/bibliotheque.js` et `expertise-runtime.js` ; aucun changement de code proposé sans cette vérification.

Les descriptions courtes sont des textes de ressources proposés, pas des cartes accordées à un camp. Aucun patch appliqué, aucun changement de sauvegarde ou de serveur. Aucun fichier actif ne doit être modifié automatiquement à la lecture de ce dossier.

## 7. Contradictions et arbitrages

| Point | Diagnostic et traitement proposé |
|---|---|
| Brief incomplet | Périmètre général retenu provisoirement ; une cible précise ou un catalogue exhaustif nécessiterait un complément. |
| Retrait “définitif de toute magie” | Généralisation non soutenue ; S05E07 documente récupération et adaptation. Le corpus actuel est déjà plus prudent que certaines notices web. |
| Fiole cassée = potion neutralisée | Contredit comme règle universelle par S05E07. Examiner contenu restant et possibilité réelle d'application ; ne pas modifier silencieusement une règle de consommation. |
| Cartes par famille ou par variante | Proposition : famille pour le classement, variante précise pour la ressource disponible. Nombre de cartes et doses à arbitrer selon la partie. |
| Anciennes récupérations uniformes | Explicitement remplacées dans `DECISIONS_ACTEES.md` ; ne pas imposer un jour de récupération ou de fabrication à toutes les potions. |
| Bleu des états dans REGLES_ACTEES §14 / vert dans décision d'habillage plus récente | Contradiction de présentation repérée, hors sujet de la contribution ; aucune correction effectuée. |
| Graphie Balthazar / Belthazor | Les fichiers utilisent les deux graphies. Proposition éditoriale : conserver l'identifiant stable et traiter l'autre graphie comme alias, après harmonisation par la conversation principale. |
| Saison 8 et partie saison 7 | Aucune rétroactivité automatique ; rechercher un précédent plus ancien si l'usage est demandé. |

## 8. Vérifications et travail restant

Effectué : lecture des quatre références demandées ; comparaison ciblée des fiches existantes ; recherche web réelle ; examen de six pages de transcriptions Springfield et de passages indexés complémentaires ; séparation des observations, intentions des personnages et propositions de jeu ; séparation des sept fiches détaillées et de leurs textes courts ; consignation des accès bloqués et des limites. Seul ce dossier de contribution a reçu une écriture de notre part. Aucun serveur lancé ou redémarré, aucune partie ouverte ou créée, aucun journal modifié.

Contrôle du livrable : sept identifiants P01–P07, sept descriptions courtes, douze références S1–S12, sections d'intégration et d'arbitrage présentes. Pas de test moteur : aucun code changé et aucun test ne certifierait ces faits narratifs.

Restant avant une intégration : revue des assertions et de la formulation des cartes par la conversation principale ; confirmation du périmètre souhaité ; contrôle audiovisuel des gestes décisifs lorsque nécessaire ; vérification de toute recette, quantité, conservation, portée ou résistance qui deviendrait déterminante dans une partie ; revue du filtrage temporel et du chargement effectif du corpus. Les recettes non établies restent non établies, sans devenir des impossibilités.

Restant pour une bibliothèque exhaustive : inventaire épisode par épisode des autres potions (notamment soins, altérations, antidotes, protections et variantes de destruction), dédoublonnage et étude des interactions. Aucun résultat exhaustif n'est revendiqué par cette contribution.
