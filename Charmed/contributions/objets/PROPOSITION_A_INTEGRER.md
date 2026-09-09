# Contribution objets — propriétés, variantes et limites

8 septembre 2026 — **Proposition documentaire à examiner. Ni intégrée, ni activée.**

## 1. Périmètre et consultation du projet

Sujet retenu : les objets déjà documentés, soit huit familles : Livre des Ombres, Grimoire de la Source, cristaux de protection/confinement, cristal de localisation, bagues de Cupidon, boîte du Hollow, anneau d’inspiration, arbalète d’Être des ténèbres. Neuf descriptions de cartes sont proposées, car les bagues du Cupidon de S02 et de Coop en S08 sont séparées. Le nom de dossier `objets` est un choix de classement pour cette contribution. Ce lot n’est pas un inventaire exhaustif des artefacts des huit saisons.

Univers : série originale 1998, saisons 1–8. Aucun épisode visionné dans cette contribution. Les recherches sont documentaires : passages de transcriptions non officielles consultées et extraits indexés. Les didascalies de fans ne sont pas des scripts de production authentifiés. Reboot, comics, romans, fanfiction et mécanismes inventés pour le jeu sont exclus des faits retenus.

Instructions lues : AGENTS fourni dans la conversation et intégralité de `C:/Users/auror/Documents/Codex/2026-08-29/dis-moi-est-ce-que-tu/outputs/01_REGLES_GLOBALES_ACTEES.md`. Aucun AGENTS local supplémentaire trouvé dans la recherche effectuée.

Fichiers consultés, relativement à `C:/Users/auror/Videos/charmed/logic-match/` :

- `Charmed/REGLES_ACTEES.md`, `DECISIONS_ACTEES.md`, `BIBLIOTHEQUE.md`, `PREPARATION_DOCUMENTEE.md` : lecture complète des quatre références.
- `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` : section objets et repérage des autres rubriques.
- `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` : section objets, passages sur les cristaux et registre des sources.
- `Charmed/canon/construction.json` : structure et cinq entrées de type `object`.
- `Charmed/canon/bibliotheque-verifiee.json` : sources et trois assertions relatives aux cristaux.
- `serveur/charmed/bibliotheque.js` : chargeur des dossiers `fiches.json` et des faits revus.
- `serveur/charmed/expertise-runtime.js` : début du fichier, contexte directeur et règles de séparation des connaissances ; pas d’audit exhaustif.
- `Charmed/contributions/potions-types-usages/PROPOSITION_A_INTEGRER.md` : introduction et périmètre seulement, afin d’éviter de dupliquer ce travail. Son contenu reste une proposition d’une autre conversation.

Les sauvegardes et journaux de partie n’ont pas été ouverts. Aucune écriture n’est effectuée hors de ce dossier de contribution.

## 2. Constats et problèmes

1. Plusieurs fiches objets ne disposent encore que d’un extrait générique et d’un épisode à compléter. Le présent lot fournit des repères plus précis sans promouvoir automatiquement leurs sources en preuves validées.
2. « Protection », « confinement » et « alarme » ne sont pas interchangeables. Une propriété observée avec une disposition de cristaux n’établit pas toutes celles des autres dispositifs.
3. La bague de Cupidon n’est pas seulement un détecteur de liens : S02E10 comporte aussi un usage par Drazi. Une exigence d’utilisateur « autorisé » serait ambiguë si elle signifiait que le vol empêche magiquement l’usage.
4. Les valeurs `minSeason: 4` pour les cristaux et `minSeason: 7` pour le cristal de localisation sont accompagnées d’une réserve explicite dans le JSON. Des précédents documentaires antérieurs existent néanmoins. Ne pas transformer ces repères en dates d’invention ou en interdictions pour les premières saisons.
5. La phrase historique sur le Livre qui « ne doit pas être détruit » doit conserver son sens : une consultation ou une convention d’interface ne le détruit pas. Elle ne suffit pas à acter une indestructibilité canonique absolue.
6. Les connaissances détaillées appartiennent au contexte de l’Ange. Leur lecture par l’Ange ne rend disponibles ni l’objet, ni son contenu, ni ses secrets au camp adverse.

## 3. Textes complets proposés

Chaque bloc « Fiche Ange » est une proposition de contenu de fond. Les références S01–S17 renvoient au registre ci-dessous. Les consignes d’évaluation sont des applications proposées des règles déjà actées, pas de nouvelles lois de la série. Les repères d’épisode prouvent un précédent documentaire, pas une disponibilité continue. Aucune portée métrique, durée fixe, recharge ou quantité de stock n’est inventée.

### O01 — Livre des Ombres

**Fiche Ange.** Livre familial contenant notamment des connaissances magiques, formules et recettes ; la série le présente dès S01E01. Ses défenses contre le mal ne sont pas absolues. En S07E21, Zankou échoue sous l’apparence de Piper puis exploite l’affaiblissement émotionnel des sœurs ; le début de S07E22 établit qu’il détient le Livre. Ce précédent interdit de déduire « impossible à voler » de sa protection habituelle. [S01, S02, S03]

Évaluer séparément présence du livre, accès effectif, entrée recherchée, compréhension et exécution. Le savoir inscrit n’exécute pas automatiquement le sort. Une page absente de la recherche n’est pas une preuve que le Livre ne peut contenir cette information. Pour un usage opposant sa protection à un adversaire, vérifier l’état du Livre et des sœurs à cet instant. Le vol de fin S07 ne devient pas une faiblesse activable par une simple phrase de déstabilisation.

**Limites et vérification.** Extraits secondaires indexés ; mécanisme complet des protections, premières exceptions et réactions à chaque catégorie d’utilisateur non revus. Ne pas attribuer d’emblée au Livre une réponse à toute question ou une inviolabilité. Ne pas confondre vulnérabilité émotionnelle observée et seuil chiffré de jeu.

**Carte proposée — Livre des Ombres.** « Livre familial de connaissances magiques, de formules et de recettes. Il possède des protections contre le mal, dont l’efficacité dépend du contexte. »

### O02 — Grimoire de la Source

**Fiche Ange.** Artefact particulier, distinct des autres grimoires. En S04E19, il intervient dans le serment de couronnement : la Source doit y poser la main pendant le serment. Il se protège du Bien ; les sœurs prévoient un sac enchanté et Paige l’y transporte. Une potion de Piper échoue à le détruire. Ce constat n’établit pas son indestructibilité contre tout moyen possible. [S04]

Identifier l’exemplaire, son accès, le rite ou passage utile et l’utilisateur. La possession seule ne confère pas les pouvoirs de la Source. La protection contre le Bien n’interdit pas toute manipulation indirecte. Le statut de livre maléfique n’assimile pas automatiquement tout autre grimoire à cet artefact.

**Limites et vérification.** Extrait indexé d’une transcription non officielle. Les limites de résistance, la chronologie après cet épisode et le détail des autres formules restent à rechercher selon l’usage. Pas de formule latine reproduite : les transcriptions disponibles ne constituent pas une base suffisante pour en figer l’orthographe.

**Carte proposée — Grimoire de la Source.** « Livre de magie maléfique lié aux rites de la Source. Il se protège du Bien et résiste aux moyens de destruction essayés par Piper. »

### O03 — Cristaux de protection et de confinement

**Fiche Ange.** Distinguer au moins quatre contextes : en S03E05, Prue retire puis replace un cristal et interrompt puis rétablit les décharges sur Troxa [S05] ; S04E13 mentionne cinq cristaux magiques orientés est–ouest pour un dispositif précis [S06] ; en S07E08, trois cristaux entourent Miss Donovan [S07] ; S06E12 décrit une installation d’alarme démoniaque au manoir [S08].

Dans S06E12, l’extrait décrit des cristaux dans plusieurs espaces, dont près de la porte, dans un couloir et à la fenêtre de Wyatt. Un démon sous l’apparence de Darryl pénètre néanmoins dans la maison. Cela ne prouve ni le mécanisme exact de contournement, ni une immunité générale des métamorphes. Cela empêche de qualifier sans réserve cette installation de barrière interdisant toute entrée démoniaque. [S08]

S07E17 comporte un dialogue où Leo reproche à Piper d’avoir caché des cristaux pour le protéger. Le dialogue corrobore l’intention protectrice ; il ne fournit ni plan complet ni résistance mesurée. [S09]

Pour l’Ange : vérifier cristaux réellement présents, installation, cible et propriété demandée. L’achèvement et le maintien du dispositif sont distincts du simple transport des cristaux. Un retrait nécessaire peut interrompre un effet ; ne pas généraliser le comportement de Troxa à tout adversaire. Le corpus actif documente déjà le retrait d’un cristal par la Source avec le pouvoir volé à Paige : conserver cette référence avec ses limites, sans l’attribuer à tout démon.

**Limites et vérification.** Transcriptions indexées, plus dialogues S04E13 et S07E17 consultés directement. Ni cinq cristaux universels, ni immunité à toutes les téléportations, ni protection automatique du grenier au sous-sol ne sont établis. La scène initiale de S04E13 est une vision : ne pas présenter son résultat comme celui de la confrontation finale.

**Carte proposée — Cristaux magiques.** « Cristaux destinés à des dispositifs de confinement, de protection ou d’alarme. L’effet dépend de leur préparation et de leur disposition ; certaines configurations produisent des décharges. »

### O04 — Cristal de localisation

**Fiche Ange.** Pendule employé avec une carte géographique dans une recherche magique. La fin de S04E19 décrit déjà Paige recherchant Phoebe et le cristal désignant un point : S07E17 n’est donc pas son premier usage établi dans ce lot. [S04]

S07E17 associe une recherche infructueuse puis un cristal qui se soulève et pointe le manoir ; les sœurs s’interrogent sur un piège. La fiche d’épisode attribue ce signal à l’intervention de Piper. Distinguer résultat de recherche spontanée et signal provoqué : le cristal n’est pas une preuve universelle de sécurité du lieu. [S10, S11]

Évaluer pratiquant, cible, lien utilisé, support cartographique et protections pertinentes. Un repère n’établit ni accès, ni consentement, ni absence d’ennemi. Ne pas exiger systématiquement du sang : la nécessité du lien et sa forme doivent correspondre au cas étudié.

**Limites et vérification.** Extraits de transcription et résumé d’épisode indexés. La page générale de scrying mélange règles générales, procédés de tournage et comics : elle n’est pas retenue comme preuve d’une interdiction absolue visant mortels, Enfers ou autres plans. Ces limites doivent être vérifiées par scènes et contre-exemples avant arbitrage.

**Carte proposée — Cristal de localisation.** « Pendule utilisé avec une carte géographique pour une recherche magique. La cible, le lien employé et les conditions de recherche déterminent la pertinence du repère obtenu. »

### O05 — Bagues de Cupidon : deux descriptions selon la période

**Fiche Ange, précédent S02E10.** La bague du Cupidon rencontré dans Heartbreak City intervient dans la reconnaissance de liens et l’influence sur les pensées des personnes concernées. Drazi la vole et l’utilise ; la synthèse de l’épisode lui attribue aussi une protection contre la potion essayée, perdue lorsqu’il est privé de la bague. L’extrait de transcription d’ouverture montre un ralentissement du temps et l’intervention du Cupidon auprès du couple. [S12, S13]

Ne pas imposer « seul un Cupidon autorisé peut l’utiliser ». À l’inverse, ce précédent ne prouve pas que tout porteur obtient toutes les capacités de tous les Cupidons. L’influence observée n’équivaut pas à un consentement garanti ni à l’obtention certaine d’une relation.

**Carte proposée — Bague du Cupidon, S02.** « Bague magique permettant au Cupidon d’identifier des liens amoureux et d’intervenir auprès des personnes concernées. Elle peut être volée et détournée. »

**Fiche Ange, précédent S08E22.** Coop prête sa bague à Piper. Le voyage suit un lien d’amour : penser à la personne et à l’amour ressenti sert d’activation. Leo accompagne Piper en la tenant par la main. La première arrivée ne correspond pas à la date recherchée. Plus tard, Dumain vole la bague et l’emploie avec Christy. L’usage n’est donc pas exclusivement personnel à Coop ; l’objet n’est pas pour autant une commande précise de date et de destination. [S14]

**Carte proposée — Bague de Coop, S08.** « Bague permettant notamment de voyager dans le temps en suivant un lien d’amour. Elle peut être prêtée ; la destination obtenue ne correspond pas nécessairement à la date souhaitée. »

**Limites et vérification communes.** Extraits indexés de transcription et synthèse secondaire. Ne pas rétroprojeter le voyage S08 sur la bague S02. Portée globale, nombre maximal de voyageurs, toutes les fonctions et conditions d’usage par un voleur non établis. Aucun de ces objets n’est attribué automatiquement à une partie.

### O06 — Boîte du Hollow

**Fiche Ange.** Contenant associé au confinement du Hollow, distinct de l’entité absorbant la magie du Bien comme du Mal. Dans S04E13, des gardiens des deux camps protègent ce danger commun. Le dialogue indique que des magies du Bien et du Mal doivent coopérer pour lire l’inscription de la boîte et rétablir le confinement. La Source libère le Hollow malgré le risque commun. [S06]

Vérifier état du contenant, accès, inscription et intervenants. Détenir la boîte ne confère pas le contrôle de l’entité ; absorber des pouvoirs relève du Hollow, pas d’une fonction passive de la boîte vide.

**Limites et vérification.** Dialogues non officiels consultés. Ce mécanisme de S04E13 doit rester contextualisé : la fin S08 comporte une autre résolution à examiner avant d’en déduire une nécessité universelle de coopération Bien/Mal. Ne pas confondre boîte du Hollow, boîte de Pandore et Nexus. Aucune immunité du porteur, portée ou possibilité de copie établie.

**Carte proposée — Boîte du Hollow.** « Contenant lié au confinement du Hollow, entité qui absorbe la magie. Son inscription intervient dans le rituel de confinement ; posséder la boîte ne suffit pas à maîtriser son contenu. »

### O07 — Anneau d’inspiration

**Fiche Ange.** Dans S04E09, l’anneau permet à son porteur de voir et capturer les Muses. Créé par une magie bénéfique pour canaliser l’inspiration en période de besoin, il est détourné par Devlin. Paige récupère l’anneau par son pouvoir et les Muses sont libérées, mais Devlin le reprend et recommence à capturer : une libération ne détruit donc pas automatiquement l’artefact ni sa capacité de capture. [S15]

Identifier porteur, Muses réellement enfermées et accès. L’inspiration ne constitue ni omniscience, ni acquisition automatique du pouvoir d’une Muse, ni réussite certaine d’un projet. La récupération par Paige dépend de son pouvoir disponible : ce n’est pas une propriété d’auto-retour de l’anneau.

**Limites et vérification.** Passages de transcription non officielle consultés directement. Le geste complet d’activation, une capacité maximale, une durée de captivité et les résistances exactes ne sont pas établis dans ce lot. Ne pas attribuer au transfert de l’anneau une protection définitive des Muses.

**Carte proposée — Anneau d’inspiration.** « Anneau permettant de voir et de capturer des Muses afin de canaliser leur inspiration. Créé par une magie bénéfique, il peut être détourné ; les Muses enfermées peuvent être libérées. »

### O08 — Arbalète et projectiles d’Être des ténèbres

**Fiche Ange.** En S03E11, Eames s’empare d’une arbalète d’Être des ténèbres. Les projectiles portent un poison létal pour les Êtres de lumière. Natalie est blessée avec une flèche utilisée directement ; Leo précise que le poison ne tue pas immédiatement. La menace ne se réduit donc pas au tir de l’arbalète, et son désarmement ne guérit pas une blessure déjà infligée. [S16]

Les pouvoirs permettant à Eames de changer d’apparence ou de voler des capacités ne sont pas ceux de l’arme. S05E04 évoque expressément le danger pour Paige en raison de son ascendance d’Être de lumière. [S17]

Évaluer arme, projectile, poison, contact ou trajectoire et nature actuelle de la cible. Un projectile peut être esquivé ou intercepté si un moyen pertinent existe. Ne pas fixer une mort au tour suivant ou une guérison automatique ; rechercher le cas clinique magique précis selon la scène. L’absence de vulnérabilité démontrée au poison ne signifie pas invulnérabilité à une blessure physique.

**Limites et vérification.** Extraits de transcriptions non officielles indexés. Quantité de poison, délai exact, approvisionnement et ensemble des remèdes non revus. Le cas de Paige ne suffit pas à établir toutes les vulnérabilités de chaque hybride ou enfant à toute période.

**Carte proposée — Arbalète d’Être des ténèbres.** « Arbalète tirant des projectiles empoisonnés, particulièrement dangereux pour les Êtres de lumière. Le poison peut agir progressivement ; une flèche peut également blesser par contact direct. »

## 4. Sources et niveaux réels de vérification

Recherches du 8 septembre 2026. **T** : passages lus sur une page de transcription non officielle ouverte ; **IT** : extrait de transcription non officielle obtenu par moteur de recherche, accès direct non acquis ; **IS** : extrait secondaire indexé. Aucun de ces niveaux ne signifie visionnage ou validation d’un script officiel. Les scènes, et non un minutage inventé, servent de repère.

| ID | Source précise | Niveau et repère exploité |
|---|---|---|
| S01 | [Book of Shadows (Charmed)](https://en.wikipedia.org/wiki/Book_of_Shadows_%28Charmed%29) | IS ; livre, première apparition S01E01, défense contre le mal. |
| S02 | [Death Becomes Them — Plot](https://charmed.fandom.com/wiki/Death_Becomes_Them/Plot) et [Fight for the Nexus](https://charmed.fandom.com/wiki/Fight_for_the_Nexus) | IS ; S07E21, usurpation de Piper puis déstabilisation et vol. |
| S03 | [Something Wicca This Way Goes — Plot](https://charmed.fandom.com/wiki/Something_Wicca_This_Way_Goes...%3F/Plot) | IS ; S07E22, Livre détenu par Zankou et réaction à Phoebe. |
| S04 | [We're Off to See the Wizard — Script](https://charmed.fandom.com/wiki/We%27re_Off_to_See_the_Wizard/Script) | IT ; S04E19, couronnement, plan du sac enchanté, résistance à la potion ; dernière recherche de Phoebe sur carte. |
| S05 | [Sight Unseen — Script](https://charmed.fandom.com/wiki/Sight_Unseen/Script) | IT ; S03E05, Prue retire et replace un cristal face à Troxa. |
| S06 | [Charmed and Dangerous — dialogues](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed) | T ; S04E13, gardiens du Hollow, explication du confinement et préparation des cinq cristaux. Dialogue lu dans le contexte des séquences ; pas de visionnage. |
| S07 | [Charmed Noir — Script](https://charmed.fandom.com/wiki/Charmed_Noir/Script) | IT ; S07E08, trois cristaux autour de Miss Donovan. |
| S08 | [Prince Charmed — Script](https://charmed.fandom.com/wiki/Prince_Charmed/Script) | IT ; S06E12, installation d’alarme, infiltration sous apparence de Darryl, véritable Darryl déplaçant un cristal. |
| S09 | [Scry Hard — dialogues](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e17&tv-show=charmed) | T ; S07E17, dispute Piper/Leo sur les cristaux cachés, avant la miniaturisation. La recherche automatique de « crystal » a d’abord renvoyé zéro ; le passage a ensuite été retrouvé via « protect ». Ne pas confondre recherche de mot infructueuse et absence du dialogue. |
| S10 | [Scry Hard — Script](https://charmed.fandom.com/wiki/Scry_Hard/Script) | IT ; S07E17, cristal désignant le manoir, hésitation sur un piège. |
| S11 | [Scry Hard — épisode](https://charmed.fandom.com/wiki/Scry_Hard) | IS ; rubrique artefacts, intervention de Piper sur le cristal. |
| S12 | [Heartbreak City — épisode](https://charmed.fandom.com/wiki/Heartbreak_City) | IS ; S02E10, bague volée, pensées, protection contre la potion. |
| S13 | [Heartbreak City — Script](https://charmed.fandom.com/wiki/Heartbreak_City/Script) | IT ; S02E10, ouverture avec Cindy et Max, ralentissement et intervention de Cupidon. |
| S14 | [Forever Charmed — Script](https://charmed.fandom.com/wiki/Forever_Charmed/Script) | IT ; S08E22, prêt à Piper, consignes de Coop, première arrivée erronée, vol par Dumain ; la fin contient aussi une résolution du Hollow à approfondir. |
| S15 | [Muse to My Ears — dialogues](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e09&tv-show=charmed) | T ; S04E09, explication de la Muse, récupération par Paige, libération suivie d’une nouvelle capture. |
| S16 | [Blinded by the Whitelighter — Script](https://charmed.fandom.com/wiki/Blinded_by_the_Whitelighter/Script) | IT ; S03E11, poison, blessure de Natalie, délai non immédiat. |
| S17 | [Siren Song — Script](https://charmed.fandom.com/wiki/Siren_Song/Script) | IT ; S05E04, avertissement concernant les gènes d’Être de lumière de Paige. |

Accès non acquis : ouvertures directes de The Grimoire et Hollow Box (erreur 402), Cupid Ring, Ring of Inspiration et Crystal Cage (URL restreinte). Les tentatives Springfield S02E10, S04E19, S07E21 et S08E22 ont échoué. Ces pages ne sont pas comptées comme consultées ; les alternatives indexées gardent leur niveau IT/IS.

Résultats écartés : Charmed Reborn Wiki, discussions Reddit, pages mélangeant les comics et la télévision sur l’invincibilité de Prue ; page générale Scrying non retenue pour ses interdictions universelles. Aucun fait tiré de ces résultats n’est promu dans les fiches.

## 5. Intégration proposée, sans application

| Fichier actif concerné | Modification proposée à examiner |
|---|---|
| `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` | Remplacer/enrichir les cinq notices objets existantes avec les fiches ci-dessus ; ajouter Grimoire, boîte et anneau, avec niveau de vérification. |
| `Charmed/canon/construction.json` | Préserver les identifiants `book`, `crystals`, `scrying-crystal`, `cupid-ring`, `darklighter-crossbow`. Revoir leurs assertions, exigences et limites ; décider comment représenter la variante Coop sans casser les références existantes. Maintenir `proofAuthority: background_only` tant que la revue n’a pas eu lieu. |
| `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` et `fiches.json` associé | Consolider les notices correspondantes et les références ; le chargeur utilise le JSON, donc une modification Markdown seule ne suffit pas. Le schéma de `fiches.json` reste à vérifier avant conversion. |
| `Charmed/canon/bibliotheque-verifiee.json` | Après revue seulement, ajouter les assertions suffisamment étayées ; conserver les trois faits cristaux déjà présents et leurs limites. Ne pas dupliquer leurs identifiants. |
| `Charmed/BIBLIOTHEQUE.md` | Référencer le lot retenu et son caractère partiel après décision d’intégration. |

Aucun changement des règles actées, des coûts, des délais ou des sauvegardes n’est proposé. Le code de chargement a été consulté pour repérer les destinations ; cette contribution Markdown n’est pas chargée automatiquement par le jeu. Aucun patch n’est fourni : la revue doit d’abord décider des formulations et de leur promotion dans les formats actifs.

## 6. Contradictions, ambiguïtés et arbitrages

| Point | Statut et proposition |
|---|---|
| Cinq cristaux pour toute protection | Généralisation incompatible avec le précédent de S07E08 ; la bibliothèque active le reconnaît déjà. Conserver cette décision documentaire, sans revalidation de la règle du nombre universel. |
| Cristaux = barrière infranchissable | Non démontré. S06E12 décrit une alarme et une infiltration. Proposer de préciser les usages, sans inventer pourquoi l’infiltration réussit. |
| `minSeason` cristaux/localisation | Repères actuels plus tardifs que les précédents S03E05/S04E19. Proposer une révision documentée, sans qualifier ces épisodes de premières apparitions absolues ; vérifier les consommateurs du champ avant modification. |
| Bague utilisable par utilisateur « autorisé » | Le vol et l’usage par Drazi nuancent ce terme. Proposer « utilisateur et mécanisme compatibles avec le précédent » ; le prêt de Coop est un autre cas. |
| Livre jamais détruit | Conserver la non-consommation à la lecture, actée pour le jeu. Ne pas en tirer une règle canonique d’indestructibilité. |
| Bien + Mal indispensables pour tout confinement du Hollow | S04E13 soutient cette méthode ; S08E22 impose d’étudier une autre configuration avant d’en faire une nécessité universelle. Aucun arbitrage silencieux. |
| Propriétés des huit familles accessibles à tout moment | Refus de cette fusion : chaque référence reste liée à la période, à l’objet et aux moyens présents. La carte précise choisie dépendra de la future préparation. |

Décisions restant à la conversation principale : adopter les descriptions proposées, séparer ou non les deux variantes de bague dans le schéma, choisir les assertions à promouvoir après revue, et compléter les limites qui influenceraient effectivement une partie. Aucun seuil de résistance ni effet automatique n’est acté ici.

## 7. Vérifications et travail restant

Effectué : lecture des références de projet, comparaison des notices existantes, recherche web réelle, consultation de passages contextuels, distinction des sources indexées et ouvertes, recherche de variantes et contre-exemples ; huit familles et neuf descriptions présentes. Toutes les descriptions portent sur la ressource et n’exposent pas de recette de victoire. Les connaissances détaillées restent séparées du texte de carte. Vérification documentaire et structurelle du fichier final, sans lancement du moteur ni test de partie.

Restant : visionner ou recouper les scènes dont les didascalies déterminent le fonctionnement, en priorité les cristaux S03E05/S06E12/S07E08 ; compléter le Hollow S08 et les protections du Livre sur plusieurs saisons ; revoir les limites de localisation au cas par cas ; étudier activation et résistance précises de l’anneau ; convertir uniquement les propositions retenues dans les JSON actifs et vérifier alors leur chargement et leur filtrage chronologique dans un environnement choisi par la conversation principale. Aucune expertise exhaustive S01–S08 ni validation de gameplay n’est revendiquée.
