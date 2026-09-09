# Cole Turner / Balthazar — contribution à examiner

Date : 8 septembre 2026. Statut : **proposition documentaire non intégrée, non activée**.

## 1. Périmètre et interprétation de la demande

Le sujet « Balthar » et la phrase tronquée sont interprétés comme : **Cole/Balthazar aide les sœurs Halliwell à combattre les démons lorsqu’il maîtrise sa nature démoniaque**. Le champ de demande détaillée contient encore le texte du modèle. Cette interprétation est une hypothèse de contribution, pas une décision actée ni le choix d’une période de partie.

Nom de dossier retenu : `balthazar-cole-allie`. Série originale uniquement, saisons 1–8 ; recherche concentrée sur les transitions de S3–S4, avec garde-fous pour S5 et S7. Ni reboot, ni comics, ni romans, ni invention de partie importés comme canon. L’inventaire de toutes les manifestations de Cole n’est pas achevé.

### Instructions et fichiers consultés

- Instructions AGENTS.md fournies dans la conversation ; source globale `C:\Users\auror\Documents\Codex\2026-08-29\dis-moi-est-ce-que-tu\outputs\01_REGLES_GLOBALES_ACTEES.md`.
- `Charmed/REGLES_ACTEES.md`, `DECISIONS_ACTEES.md`, `BIBLIOTHEQUE.md`, `PREPARATION_DOCUMENTEE.md`.
- `Charmed/canon/personnages.json` : profil `cole`, structure des sources et des repères temporels.
- `Charmed/canon/magie-demons.json` : entrée `belthazor`, et sa vue `REGLES_MAGIQUES_ET_DEMONS.md`.
- `Charmed/canon/construction.json` : `belthazor-potion`, `power-stripping` ; sections correspondantes de `CONSTRUCTION_DES_PARTIES.md` repérées par recherche textuelle.
- `Charmed/canon/bibliotheque-verifiee.json` : format des sources, faits, épisodes et limites.
- `Charmed/canon/EXPERTISE_DOSSIER.md` : état historique et lacunes relatives à Cole ; `episodes-index.json` : métadonnées et repères des épisodes concernés.
- `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` : passages potion contre Belthazor, retrait des pouvoirs, invocation, désert démoniaque ; recherche ciblée dans `fiches.json`.
- `Charmed/recherche/2026-09-08-organisations-phenomenes-enquetes/FICHES.md` : Confrérie de l’Épine ; recherche ciblée dans `fiches.json`.
- `Charmed/contributions/personnages-expertise-s1-s8/JOURNAL_RECHERCHE.md` : contribution parallèle signalée, sans modification de son dossier. Son travail sur Cole devra être rapproché de celui-ci.
- `serveur/charmed/bibliotheque.js` et début de `expertise-runtime.js` : lecture des corpus et règles de période ; recherche des importations dans les autres modules.

Les consultations ciblées ne sont pas présentées comme une lecture intégrale de tous les fichiers de recherche ou du code. Aucun autre AGENTS.md n’a été trouvé dans la recherche du dépôt et les deux répertoires parents immédiats.

## 2. Constats et problèmes

1. Le profil `cole` demande déjà de séparer les incarnations : c’est cohérent avec cette contribution. En revanche, il ne comporte pas encore de chronologie propre ni de description utilisable de ses moyens.
2. « Pouvoirs démoniaques associés à sa forme » peut faire croire que toute magie exige l’apparence de Balthazar. Cette formule doit être précisée pouvoir par pouvoir ; elle ne constitue pas une interdiction canonique sous apparence humaine.
3. **Maîtrise de soi, contre-sort et retrait des pouvoirs sont trois états distincts.** Une carte disant seulement « moitié démoniaque réprimée » ne permet pas à l’Ange de savoir lesquels de ses moyens restent accessibles.
4. « Aide à vaincre les démons » doit décrire un rôle, pas garantir une élimination ou une fidélité inconditionnelle. Les règles actées imposent moyens, concours, cible et portée réels.
5. Le corpus contient des sources par extraits et des notes techniques historiques. `BIBLIOTHEQUE.md` et la préparation documentée décrivent un raccordement plus récent que certains paragraphes de `EXPERTISE_DOSSIER.md`. Aucun constat du serveur ouvert n’a été effectué ici.

## 3. Texte complet proposé — fiche de l’Ange du destin

### Identité et rôle

**Cole Turner**, appelé **Balthazar** dans la nomenclature française déjà utilisée par le projet ; alias anglais **Belthazor**. Ce sont les identités d’un même personnage, pas deux ressources simultanément disponibles. Cole est un hybride humain/démon dont la mission contre les sœurs entre en conflit avec son amour pour Phoebe. [T08 ; PCO]

Dans sa période alliée, il apporte son expérience des démons, des renseignements et une capacité d’infiltration. S03E19 montre son aide contre la Confrérie et son intention de conserver ses pouvoirs pour cette opération, alors même qu’il avait demandé à en être débarrassé. L’appartenance passée ne vaut pas accès garanti : sa couverture peut être éprouvée. [T19]

### États à distinguer

| État documentaire | Repère et fait | Conséquence proposée pour la préparation |
|---|---|---|
| Hybride allié, pouvoirs conservés | S03E19, The Demon Who Came in from the Cold : engagement contre la Confrérie avec pouvoirs encore présents. [T19] | Préciser sa loyauté et ses moyens au moment choisi. |
| Altération et coercition | S03E20, Exit Strategy : Raynor exploite ses liens affectifs, l’âme de son père et une influence magique ; Cole tue Janna. La potion de retrait préparée n’est pas administrée. [T20 ; FX20] | Ne pas effacer cet épisode ni traiter toute conduite comme un choix libre identique. |
| Contre-sort tenté | S03E22, All Hell Breaks Loose : Phoebe annonce une nouvelle potion destinée à inverser le sort qui l’a fait basculer ; leur échange après son utilisation reprend sur un projet de départ commun. [T22] | Ne pas assimiler cette intervention au retrait de Belthazor ; recette, durée et éventuel renouvellement non établis ici. |
| Humain après retrait | Fin de S04E08, Black as Cole : la potion retire Belthazor et Cole reste vivant, humain, privé de ses pouvoirs démoniaques. [T48 ; P48] | Version humaine distincte ; absence de boules d’énergie et de déplacement démoniaque. |
| Acquisition ultérieure | S04E13, Charmed and Dangerous : le Hollow intervient, puis les pouvoirs de la Source occupent le vide laissé par sa moitié démoniaque. [T413] | Ce passage ne restaure pas simplement le Balthazar initial. |
| Variante de réalité | S05E12, Centennial Charmed : le changement de réalité le replace dans la condition de Belthazor, puissant mais destructible. [T512] | Ne pas transférer cette variante à toutes les parties. |
| Présence exceptionnelle tardive | S07E16, The Seven Year Witch : Cole se décrit comme retenu entre vie et mort. [T716] | Cette apparition ne démontre pas un retour permanent comme allié incarné. |

Le présent dossier ne fournit pas une chronologie exhaustive de la Source en Cole, du désert démoniaque ou des Avatars. Ces états exigent leurs propres fiches avant emploi. Une date à l’intérieur d’un épisode doit préciser la scène, pas seulement son numéro.

### Moyens, activation, portée et limites

- **Boules d’énergie.** Moyen offensif documenté pour Cole dans Black as Cole ; les extraits du résumé et de la fiche d’épisode décrivent une élimination du démon nécrophage, mais une attaque inefficace contre Sykes. Ce contre-exemple interdit « une boule tue tout démon ». Distance maximale, cadence et dépense ne sont pas quantifiées par cette recherche. [P48 ; E48]
- **Déplacement démoniaque, “shimmer”.** S03E08 montre une incapacité liée à sa blessure, puis une récupération encore limitée. Krell reconnaît que cette incapacité n’annulait pas nécessairement ses autres pouvoirs. Ne pas rendre tous les moyens indisponibles ensemble par simple déduction. [T08]
- **Formes humaine et démoniaque.** S04E08 distingue l’apparence ordinaire et Belthazor. Cole craint de ne plus revenir à lui-même s’il embrasse pleinement sa nature pour affronter Sykes. Il s’agit d’un risque formulé dans cette situation, pas d’un seuil numérique universel. [T48]
- **Combat et savoirs.** Les sources décrivent un combat à l’athamé contre Sykes et une connaissance des pratiques de la Confrérie. Une arme doit être effectivement disponible ; elle ne découle pas gratuitement du nom du personnage. Ses renseignements peuvent être incomplets ou périmés. [E48 ; T19]
- **Télékinésie et autres capacités.** La page générale consultée par extrait mentionne la télékinésie sans dater suffisamment son état d’acquisition dans le passage reçu. Elle n’est donc pas ajoutée au noyau documenté de cette carte. Cela signifie « à documenter », pas « Cole ne la possède pas ». Même réserve pour télépathie, perception surnaturelle et toutes capacités tardives non étudiées. [PCO]

### Psychologie et contre-moyens

Son attachement à Phoebe motive des actes en faveur des sœurs, mais ne constitue ni un enchantement d’obéissance ni une garantie absolue. S03E20 montre précisément l’exploitation de cette relation par Raynor. Distinguer pression affective, chantage et influence magique ; ne pas convertir leurs effets en règle de corruption automatique. [T20]

S04E08 met en scène sa culpabilité envers ses anciennes victimes, puis sa difficulté à se définir après la perte de ses pouvoirs. La carte humaine ne devient pas une autre personne sans passé. [T48]

S03E08 fournit des limites concrètes : blessure invalidante, guérison seulement partielle par Leo, et préparation offensive nécessitant sa chair. Le dossier ne certifie pas une recette complète. Krell décrit une traque dépendant de sa forme ; ne pas universaliser cette détection à tous les démons. [T08]

S03E21, Look Who’s Barking, apporte un contre-exemple essentiel : une intervention alchimique sur son sang est associée à une protection contre la potion des sœurs, dont l’échec est constaté dans l’épisode. Cette protection ne signifie pas immunité à toutes les potions. Son attachement à Phoebe subsiste malgré sa volonté de rupture. [T21]

Le retrait de S04E08 exige l’application effective d’une potion ; sa simple possession n’altère pas Cole. Ne pas identifier automatiquement cette potion à celle qui vise sa destruction ou au contre-sort de S03E22. [P48 ; T22]

### Consignes d’emploi proposées pour l’Ange

Ces consignes appliquent les principes du projet ; elles ne créent pas de coûts ou de nouvelles règles :

1. Choisir la période, l’état de Cole et ses informations réellement connues avant de juger une action.
2. Séparer capacité conservée, capacité volontairement évitée, incapacité temporaire et pouvoir retiré.
3. Juger chaque usage selon cible, présence, obstacle, moyens, consentement et causalité. Un risque psychologique documenté n’autorise pas une trahison arbitraire.
4. Ne pas accorder par défaut transport collectif, franchissement de toute protection, portée infinie, recette universelle ou connaissance de tout démon : ces propriétés ne sont pas établies ici.
5. En cas de lacune pertinente, demander la vérification prévue par le projet ; ne pas sanctionner le joueur pour l’incomplétude de cette fiche.

## 4. Texte complet proposé — carte courte

### Proposition principale : période alliée avec pouvoirs

**Nom : Cole Turner — Balthazar**

**Description :** Demi-démon allié des sœurs Halliwell, connaisseur des démons et de leurs pratiques. Il dispose de boules d’énergie, du déplacement démoniaque et d’une forme démoniaque. Son attachement à Phoebe soutient sa volonté de faire le bien, mais la maîtrise de sa nature reste fragile.

Base : T19, T48, P48, E48. La période exacte et les éventuelles altérations doivent être fixées dans la préparation privée. Cette carte présente un noyau documenté, pas l’inventaire exhaustif de ses pouvoirs.

### Variante à utiliser seulement si la demande vise Cole devenu humain

**Nom : Cole Turner**

**Description :** Ancien demi-démon devenu humain, allié des sœurs Halliwell. Il conserve son expérience des démons et de leurs pratiques, mais ne dispose plus des pouvoirs de Balthazar.

Base : T48, P48 et continuité de connaissances proposée à partir de T19. Ne pas distribuer les deux cartes comme deux personnages. Aucune localisation, recette d’élimination ou solution stratégique ne figure dans ces descriptions.

## 5. Sources et niveau réel de vérification

Consultation : 8 septembre 2026. Aucun épisode visionné ; aucune piste doublée française contrôlée. Les transcriptions Springfield sont **non officielles**, parfois sans noms de locuteurs ou didascalies : une réplique ne certifie pas à elle seule une loi magique. Les repères ci-dessous identifient les scènes, sans inventer de minutages.

| ID | Source précise | Niveau et passage utilisé |
|---|---|---|
| T08 | [S03E08 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e08&tv-show=charmed) | Page consultée, transcription non officielle : poursuite de Krell, discussion sur le shimmer, guérison par Leo, préparation contre Belthazor. |
| T19 | [S03E19 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e19&tv-show=charmed) | Page consultée, transcription non officielle : demande de retrait au début, infiltration et bilan de l’opération. |
| T20 | [S03E20 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed) | Page consultée, transcription non officielle : stratégie de Raynor, préparation de potion, mort de Janna et confrontation finale. |
| T21 | [S03E21 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e21&tv-show=charmed) | Page consultée, transcription non officielle : échange avec l’Alchimiste et confrontation avec Piper/Leo. |
| T22 | [S03E22 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e22&tv-show=charmed) | Page consultée, transcription non officielle : annonce du contre-sort et échange de Phoebe avec Cole dans les Enfers. L’absence de didascalies détaillées limite la vérification du geste. |
| T48 | [S04E08 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e08&tv-show=charmed) | Page consultée, transcription non officielle : crainte de Cole avant Sykes, identification de la potion puis épilogue humain. |
| T413 | [S04E13 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed) | Page consultée, transcription non officielle : proposition de la Prophétesse et destination des pouvoirs de la Source. |
| T512 | [S05E12 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e12&tv-show=charmed) | Page consultée, transcription non officielle : avertissement sur son identité dans la réalité modifiée. |
| T716 | [S07E16 — Springfield](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e16&tv-show=charmed) | Page consultée, transcription non officielle : dialogue avec Piper sur l’entre-deux. |
| P48 | [Black as Cole — Plot](https://charmed.fandom.com/wiki/Black_as_Cole/Plot) | Extraits de recherche seulement, résumé secondaire : boule inefficace sur Sykes ; potion lancée par Emma et mortalité de Cole. |
| E48 | [Black as Cole — fiche d’épisode](https://charmed.fandom.com/wiki/Black_as_Cole) | Extraits de recherche seulement : boule d’énergie contre le nécrophage, athamé contre Sykes. |
| FX20 | [Exit Strategy — Script](https://charmed.fandom.com/wiki/Exit_Strategy/Script) | Extrait indexé d’une transcription non officielle : potion jetée au sol, pas administrée. |
| PCO | [Cole Turner — profil](https://charmed.fandom.com/wiki/Cole_Turner) | Extraits seulement : identité hybride, alliance, potion, liste de pouvoirs non reprise en bloc. Mélange potentiel de périodes. |
| ITV48 | [ITVX — S4E8](https://www.itv.com/watch/charmed/10a3379/10a3379a0074) | Extrait de synopsis du diffuseur uniquement : confirme le thème de la confrontation à sa nature démoniaque ; ne démontre pas les mécanismes. |

L’ouverture directe de [Black as Cole — Script sur Fandom](https://charmed.fandom.com/wiki/Black_as_Cole/Script) a échoué. Aucun passage de cette page n’est présenté comme directement consulté. Les résultats Reddit apparus dans les recherches ne sont pas employés comme preuves. Les répétitions entre sites de fans ne garantissent pas des témoignages indépendants.

## 6. Intégration proposée et arbitrages

**Fichiers actifs concernés, à modifier uniquement par la conversation principale après revue :**

- `Charmed/canon/personnages.json` : enrichir `cole`, ajouter l’alias français et les repères d’états ; conserver l’identité existante.
- `Charmed/canon/magie-demons.json` et `REGLES_MAGIQUES_ET_DEMONS.md` : remplacer la formule vague des pouvoirs par les moyens et réserves de la section 3.
- `Charmed/canon/construction.json` et `CONSTRUCTION_DES_PARTIES.md` : distinguer contre-sort, retrait et destruction ; conserver les recettes inconnues.
- `Charmed/canon/bibliotheque-verifiee.json` : sélectionner seulement les affirmations effectivement revues ; ne pas importer tout ce texte sous statut `verified`.
- Un dossier `Charmed/recherche/…` et `BIBLIOTHEQUE.md` pourraient accueillir et référencer la fiche détaillée. Le lecteur actuel parcourt les dossiers de recherche comportant `fiches.json` ; le présent dossier de contribution n’est pas chargé par ce parcours.

Aucun patch de moteur ni de sauvegarde n’est nécessaire à cette proposition de contenu. Les cartes ne sont pas ajoutées à la partie en cours. L’intégration doit rapprocher ce dossier de la contribution `personnages-expertise-s1-s8` afin d’éviter deux versions divergentes de Cole.

**Arbitrages non tranchés :**

1. Confirmer que la demande concerne Cole allié avec pouvoirs, plutôt que Cole humain ou un état précis après S03E22. La proposition principale privilégie le premier sens sans l’acter.
2. Fixer l’épisode et le moment de disponibilité. Aucune ressource Cole ne doit être injectée dans un scénario tardif sur la seule foi de cette fiche.
3. Valider la formulation du nom à l’affichage. « Balthazar » est repris du projet ; l’exactitude du doublage français n’a pas été vérifiée.
4. « Tant que sa moitié démoniaque est réprimée » n’est pas une règle binaire démontrée. Un compteur, une durée de répression ou une bascule automatique seraient des inventions de gameplay nécessitant une décision explicite.
5. Signaler sans modifier les divergences historiques hors sujet : couleurs des états et présentation de l’arbitre ont évolué dans `DECISIONS_ACTEES.md` ; les anciens passages de règles et d’expertise ne doivent pas être réinjectés tels quels.

## 7. Vérifications et travail restant

- Recherche web réelle, neuf pages de transcriptions consultées avec recherches de passages pertinents ; extraits secondaires et accès échoué identifiés séparément.
- Distinction contrôlée entre fiche de l’Ange et cartes courtes ; aucune recette de victoire dans les cartes.
- Les périodes, les pertes et les variantes ne sont pas réunies en un profil de pouvoirs permanent.
- Références d’épisodes contrôlées contre l’index local ; ce contrôle ne vaut pas visionnage.
- Livrable écrit exclusivement dans `Charmed/contributions/balthazar-cole-allie/`. Aucun fichier actif, règle, bibliothèque, sauvegarde ou autre contribution modifié par cette intervention. Aucun serveur redémarré ; aucune partie lancée ; aucun test du jeu exécuté.

Restent : revue humaine de l’interprétation et des textes ; vérification audiovisuelle des gestes et du doublage ; inventaire daté des pouvoirs secondaires, notamment télékinésie ; précision des modalités de la potion S03E22 si son usage devient central ; sélection et structuration des faits validés ; contrôle de leur chargement et de leur filtrage temporel lors d’une intégration ultérieure. **Prêt à examiner ne signifie ni expertise exhaustive, ni contribution intégrée.**
