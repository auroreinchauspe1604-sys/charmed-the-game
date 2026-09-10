# Contribution lieux — proposition à examiner

Date : 8 septembre 2026. Nom court retenu : `lieux`.

**Statut : contribution documentaire proposée, ni intégrée ni activée.** Série télévisée originale Charmed, saisons 1 à 8 exclusivement. Aucun épisode visionné ; aucune transcription authentifiée comme script de production. La conversation principale devra revoir les propositions avant intégration.

## 1. Périmètre et documents consultés

Le sujet renseigné est « lieux de Charmed » ; le nom court et la demande détaillée étaient restés sous forme de modèle. Périmètre de travail retenu : consolider les onze lieux déjà représentés dans le corpus, sans prétendre inventorier tous les lieux de la série. Neuf fiches existantes sont reprises ; le P3 et le Bay Mirror, présents dans le socle de construction, reçoivent également une fiche. Le Nexus est traité dans la fiche du sous-sol, en distinguant espace et pouvoir. Ce choix de couverture constitue une proposition, pas une décision générale sur la bibliothèque.

Lecture des instructions fournies et de la source globale `C:\Users\auror\Documents\Codex\2026-08-29\dis-moi-est-ce-que-tu\outputs\01_REGLES_GLOBALES_ACTEES.md`. Aucun fichier AGENTS.md supplémentaire trouvé dans les emplacements parents vérifiés ni par l’inventaire du projet. Le bref rappel mémoriel des anciennes maquettes a été écarté comme référence de contenu : les documents actuels du projet priment.

Fichiers consultés dans le projet, chemins relatifs à `C:\Users\auror\Videos\charmed\logic-match` :

- `Charmed/REGLES_ACTEES.md`, `Charmed/DECISIONS_ACTEES.md`, `Charmed/BIBLIOTHEQUE.md`, `Charmed/PREPARATION_DOCUMENTEE.md` : instructions de jeu et gouvernance.
- `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` et entrées de lieux de `Charmed/canon/construction.json` : notices et format du socle.
- Section Nexus et passages pertinents de `Charmed/canon/REGLES_MAGIQUES_ET_DEMONS.md` ; structure de `Charmed/canon/bibliotheque-verifiee.json`.
- Section Lieux et passages voisins de `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` ; métadonnées, sources et neuf entrées de lieux de `fiches.json` du même dossier.
- Métadonnées de `Charmed/canon/episodes-index.json` : index de navigation, pas preuve d’étude des épisodes.
- `Charmed/parties/manoir-assiege/PARTIE.md` : période déclarée et distinction contrôle du sous-sol / absorption. Le document est une préparation enregistrée, pas un relevé du jour actuel.
- Lecture ciblée de `serveur/charmed/bibliotheque.js`, `serveur/charmed/expertise-runtime.js` et recherche des références aux corpus : identification des chemins de chargement uniquement, sans exécution.

## 2. Constats et problèmes identifiés

1. Les fiches existantes séparent déjà canon, limites et application proposée. Cependant, plusieurs lieux restent documentés par extraits indexés et ne disposent pas d’une description courte autonome pour la carte.
2. Il faut distinguer bâtiment, pièce, contenu, occupant et phénomène magique. Une carte de lieu ne doit pas attribuer implicitement le Livre, ses connaissances, un personnage ou le contrôle du Nexus.
3. Les étiquettes globales de vérification des fiches ne suffisent pas lorsqu’une affirmation repose sur un dialogue consulté et une autre sur un extrait. Les références ci-dessous sont donc rattachées aux affirmations.
4. Les lieux civils ont une utilité propre ; aucune propriété magique intrinsèque n’est établie pour Buckland, Quake, le P3 ou les bureaux du Bay Mirror par cette recherche. Cela ne prouve pas qu’aucun événement magique ne puisse y survenir.
5. Les références temporelles ne sont pas interchangeables : début d’un emploi, existence d’un bâtiment, découverte d’un espace, changement de direction et destruction d’un pouvoir sont des événements distincts.
6. Les connaissances futures de l’Ange doivent rester séparées des connaissances des camps. Une fiche peut mentionner S07E22 sans rendre ce dénouement connu des personnages d’une aventure placée auparavant.

## 3. Textes complets proposés pour les onze fiches

Les blocs « Fiche pour l’Ange » sont destinés au corpus documentaire privé. Les blocs « Carte proposée » sont les seuls textes courts proposés pour la ressource. Les conditions de jeu sont des applications proposées des règles existantes : aucun coût, délai fixe, bonus, solution obligatoire ou nouvelle règle de possession n’est ajouté.

Les identifiants S01–S14 renvoient au registre des sources de la section 4. Un dialogue est une déclaration située : les paroles d’un adversaire ou une hypothèse ne deviennent pas automatiquement une loi universelle.

### 3.1 Manoir Halliwell — `lieu-manoir` / socle `manor`

**Fiche pour l’Ange.** Maison familiale et ensemble d’espaces distincts. S01E15 associe son emplacement à un Nexus spirituel susceptible de servir le Bien ou le Mal, en lien avec cinq éléments. L’épisode rapporte une reconstruction après le séisme de 1906 ; ce récit ne fournit pas un plan architectural exploitable au centimètre. [S01]

**Fonctionnement et exception.** Dans ce même épisode, la maison passe sous une influence hostile qui en interdit l’entrée aux sœurs. Il existe donc un précédent contraire à une protection inconditionnelle des propriétaires par leur demeure. L’effet appartient à cette situation magique, pas aux murs par défaut. [S01]

**Conditions proposées.** Décrire les espaces concernés, occupants, accès et protections effectivement établis. Contrôle juridique, présence physique et maîtrise magique doivent être constatés séparément. Une intrusion ne prouve pas l’acquisition de tout le bâtiment.

**Limites.** Aucun plan complet, temps de parcours fixe ni protection universelle contre la téléportation n’a été vérifié. La psychologie à considérer est celle des occupants et adversaires ; aucune volonté permanente du bâtiment n’est postulée.

**Carte proposée — Manoir Halliwell**

> Maison familiale des Halliwell, comprenant plusieurs pièces, un grenier et un sous-sol. Ses espaces, occupants et biens restent distincts.

### 3.2 Grenier du manoir — `lieu-grenier` / socle `attic`

**Fiche pour l’Ange.** Espace de rangement et de travail magique. Le début de S07E17 décrit son réaménagement par Leo, notamment le rangement des bouchons de fioles. S02E01 associe le grenier au Livre et à la manifestation de Penny. Ces scènes ne fixent pas un inventaire permanent. [S02, S05]

**Conditions proposées.** Accès réel à la pièce ; disponibilité séparée du matériel, des documents et des personnes. La consultation et la préparation peuvent y être envisagées, mais le lieu ne connaît ni n’exécute une formule.

**Variantes et limites.** Organisation matérielle modifiable ; présence du Livre à constater. Ne pas convertir un rangement en stock inépuisable, ni une manifestation de Penny en pouvoir d’invocation attaché au grenier. Aucun bonus propre à toute magie exécutée dans cette pièce n’a été établi.

**Carte proposée — Grenier du manoir**

> Pièce du manoir utilisée pour le rangement et le travail magique, où le Livre des Ombres est habituellement conservé. Son contenu dépend de la situation.

### 3.3 Sous-sol et site du Nexus — `lieu-cave`

**Fiche pour l’Ange.** Le sous-sol est un espace matériel ; le Nexus est un pouvoir lié au site. S01E15 situe la manifestation du Woogyman dans la cave. [S01]

**Mécanisme situé.** S07E17 distingue recherche du Nexus et libération de l’Ombre. L’occupation démoniaque ne suffit pas à la tentative tant que le Bien demeure présent. Leo, alors mortel, devient le réceptacle présenté comme neutre face à Zankou et au Pouvoir des Trois. C’est une exception documentée, pas une capacité générale conférée aux humains. [S02]

**Contre-moyens et chronologie.** S07E22 différencie l’expulsion répétée hors de Zankou et le recours final destiné à détruire le Nexus. La séquence finale et ses dialogues étayent la destruction ; les images de l’effet n’ont pas été vérifiées. Ne pas rétablir ce pouvoir après l’épisode comme si rien ne s’était produit. [S03]

**Conditions proposées.** Constater séparément accès au sous-sol, accès au site et opération magique. Pour un effet nouveau : vérifier identité de l’entité, procédé et situation. Ne pas transformer la seule occupation d’une pièce en absorption automatique.

**Limites.** La terminologie Nexus/Ombre/Woogyman varie ; conserver les termes de chaque épisode. Le Hollow reste un autre objet d’étude. Aucun modèle exhaustif de choix du réceptacle ni recette transposable à toute circonstance n’est certifié.

**Carte proposée — Sous-sol du manoir**

> Espace inférieur du manoir abritant le site du Nexus. L’accès à cette pièce et la maîtrise du pouvoir qui lui est lié sont distincts.

**Condition éditoriale.** Cette carte convient à une période où le Nexus existe encore. Après S07E22, remplacer sa seconde phrase par : « Le pouvoir du Nexus qui lui était lié a été détruit. » [S03] Ce remplacement concerne la période du scénario, pas une modification de la partie en cours.

### 3.4 Buckland — `lieu-buckland`

**Fiche pour l’Ange.** Maison de ventes liée à l’activité professionnelle de Prue. S01E12 décrit expertise, lots et enchères autour d’un bracelet ; S01E13 nomme Buckland. La démission de Prue en S02E12 est confirmée par le synopsis Apple TV consulté. [S10, S13, S11]

**Fonction et portée.** Un objet peut y être examiné ou vendu. L’intrigue du bracelet associe son examen à des recherches complémentaires : la provenance n’est pas automatiquement connue par la possession du lieu. [S10]

**Conditions proposées.** Identifier le lot, le dossier ou le spécialiste concerné et l’accès possible à la période retenue. Après la démission, ne plus attribuer à Prue un accès d’employée par défaut ; son ancienne expertise reste une question distincte.

**Limites.** La date de fermeture éventuelle du lieu n’est pas établie. La fin d’un emploi ne détruit pas l’entreprise. Aucun catalogue illimité d’artefacts magiques ni pouvoir d’authentification surnaturelle propre au bâtiment n’est documenté.

**Carte proposée — Buckland**

> Maison de ventes aux enchères, avec activité d’expertise et de présentation des lots. Les objets proposés et les dossiers disponibles dépendent de la période.

### 3.5 Quake — `lieu-quake`

**Fiche pour l’Ange.** Restaurant où Piper exerce une fonction de responsable dans S01E12 : elle se présente comme manager lors d’une inspection, qui porte notamment sur la cuisine. Le contrôle illustre les contraintes civiles auxquelles le lieu reste soumis. [S10]

**Chronologie.** S02E01 présente Piper sans emploi et cherchant à acheter un club. Ce repère ne suffit pas à établir la date exacte de sa démission de Quake, ni la disparition du restaurant. [S05]

**Conditions proposées.** Distinguer accueil de la clientèle, cuisine et accès du personnel ; fixer horaires, personnes présentes et matériel dans la préparation du scénario. Une invitation n’assure pas le concours de tous les employés.

**Limites.** Ni sanctuaire ni stock illimité d’ingrédients de potion. Aucun pouvoir intrinsèque du restaurant établi. Une inspection canonique ne crée pas automatiquement un événement identique dans une aventure originale.

**Carte proposée — Quake**

> Restaurant comportant une salle et une cuisine professionnelle. La fréquentation, le personnel et l’accès aux espaces de travail dépendent de la situation.

### 3.6 P3 — nouvel identifiant proposé `lieu-p3` / socle `p3`

**Fiche pour l’Ange.** Club dirigé par Piper. S02E01 documente son projet d’achat avec un soutien financier de ses sœurs ; S02E04 confirme le nom P3, l’association des trois sœurs et l’accueil de concerts. Ne pas confondre le projet d’achat avec une date d’ouverture précise. [S05, S12]

**Fonction et exception.** Public, artistes et organisation professionnelle peuvent coexister avec une menace surnaturelle : S02E04 place l’affaire Masselin dans le contexte d’un concert. Le P3 n’est donc pas un lieu garanti sans danger du fait de Piper. [S12]

**Conditions proposées.** Horaires, accès du public et zones de service définis par le scénario. Le concours de Piper, d’un artiste ou d’un employé doit être établi séparément. Ne pas attribuer au lieu une influence automatique sur son public.

**Limites.** Aucun calendrier universel ni capacité d’accueil chiffrée vérifiés. Les variantes ultérieures de gestion et d’enseigne restent à compléter avant une adaptation qui en dépend.

**Carte proposée — P3**

> Club de Piper accueillant du public et des concerts. Il comprend des espaces de rencontre et de travail liés à son activité.

### 3.7 Bay Mirror — nouvel identifiant proposé `lieu-bay-mirror` / socle `bay-mirror`

**Fiche pour l’Ange.** Journal auquel est associée la chronique de conseils de Phoebe. Le nom du journal et cette association sont corroborés ici par un extrait secondaire ; le texte de S04E16 consulté décrit le journal et Elise sans employer « Bay Mirror ». Ne pas lui attribuer une vérification nominale qu’il ne fournit pas. [S14, S06]

**Chronologie et fonctionnement.** Dans S04E16, Phoebe remplace Karen pour sa chronique ; la fin de l’épisode introduit la possibilité de son recrutement. Lettres reçues, rédaction et délai de publication sont des éléments professionnels concrets. [S06]

**Conditions proposées.** Pour une carte de lieu, viser les bureaux, pas la totalité du réseau médiatique. L’accès à un bureau ne donne pas accès à toutes les archives ; lire une lettre et publier sont deux actes différents. La coopération de la rédaction n’est pas automatique.

**Limites.** Liste des propriétaires et changements de poste non reconstitués. La description de carte ne doit pas ériger Phoebe en rédactrice en chef permanente. Elise du journal ne doit pas être confondue avec une innocente inventée dans un scénario antérieur.

**Carte proposée — Bureaux du Bay Mirror**

> Locaux de la rédaction du Bay Mirror, journal publiant la chronique de conseils de Phoebe. Documents de travail et courrier y sont liés aux activités de la rédaction.

**Condition éditoriale.** Texte prévu pour une période où cette chronique existe ; vérifier l’emploi et l’identité utilisée par Phoebe si le scénario se déroule au début de la saison 8.

### 3.8 École de magie — `lieu-ecole` / socle `magic-school`

**Fiche pour l’Ange.** Institution dirigée par Gideon dans S06E14, avec enseignants, élèves et accès par une porte magique. L’épisode présente des protections qui empêchent les décapitations du Cavalier d’être mortelles à l’intérieur, contrairement à l’extérieur. Ce précédent ne démontre pas une invulnérabilité contre toute cause de mort. [S04]

**Chronologie et variantes.** S07E17 organise le passage de direction de Paige à Leo. S07E22 montre que la protection d’accès est finalement franchie par Zankou après ses acquisitions de pouvoirs. Pour S08E02, l’occupation démoniaque n’a été vérifiée ici que par extraits de transcription et résumé : ne pas la présenter comme une scène directement consultée. [S02, S03, S09]

**Conditions proposées.** Vérifier direction, occupants, protections et voie d’entrée à la date exacte. L’autorisation institutionnelle et la possibilité magique d’entrer sont distinctes ; ne pas imposer une permission administrative comme seule voie canonique possible.

**Limites.** Aucun catalogue exhaustif des accès, bibliothèque complète, immunité universelle ou temps fixe d’apprentissage établi. Les détails de fermeture, reconquête et fonctionnement final en saison 8 restent à documenter.

**Carte proposée — École de magie**

> Établissement d’enseignement magique accessible par une entrée surnaturelle. Ses enseignants, ses ressources et ses protections dépendent de la période.

### 3.9 Monde souterrain — `lieu-enfers`

**Fiche pour l’Ange.** Domaine des forces démoniaques, avec pouvoirs et intérêts rivaux. S04E20 décrit l’autorité de Cole après son couronnement et la possibilité d’une révolte. La scène ne décrit donc pas une population automatiquement unanime. [S07]

**Fonction et portée.** La fiche décrit un domaine général, pas un lieu tenu unique. Les dimensions, distances et accès entre repaires ne sont pas établis par les dialogues consultés. L’affirmation architecturale de l’ancienne fiche sur les cavernes n’est pas renforcée ici par des images : conserver son ancien niveau de preuve si elle est maintenue.

**Conditions proposées.** Pour une ressource jouable, définir un repaire précis et un moyen d’accès cohérent. Déterminer occupants, allégeances, surveillance et portion réellement tenue. Aucune alliance de tous les démons ne découle de l’adresse.

**Limites.** Pas de carte géographique exhaustive, de portail universel ni de règle imposant que chaque démon y réside. Ne pas assimiler ce domaine à la Décharge démoniaque.

**Carte proposée — Repaire du monde souterrain**

> Repaire situé dans le domaine démoniaque. Ses occupants, ses accès et les espaces effectivement disponibles sont précisés pour cette ressource.

**Arbitrage de forme.** Ce titre particularise la carte générique existante ; le repaire doit être défini dans la préparation avant toute distribution. À défaut, garder « Monde souterrain » comme connaissance de contexte seulement.

### 3.10 Régions supérieures — `lieu-regions-superieures`

**Fiche pour l’Ange.** Domaine associé aux Fondateurs. S03E01 rapporte le séjour de Piper avec Leo : pour elle, environ une journée, contre un mois écoulé pour ses sœurs ; ses souvenirs deviennent flous après le retour. L’épisode mentionne leur départ par éclipse. Il s’agit d’un précédent vécu, pas d’un coefficient temporel permanent. [S08]

**Fonction et limites.** Piper évoque les décisions des Fondateurs concernant sa relation. Elle exprime une impression sur l’effacement des souvenirs ; le dossier ne certifie pas un mécanisme automatique d’amnésie. Aucun droit universel d’audience ou de transport autonome n’est établi.

**Conditions proposées.** Vérifier le voyageur, son accompagnateur, le moyen de transport et la situation des Fondateurs. Le décalage temporel d’un voyage doit être examiné avant de lui attribuer des conséquences de calendrier ; aucun ratio arbitraire n’est ajouté.

**Carte proposée — Régions supérieures**

> Domaine des Fondateurs, accessible dans des circonstances particulières. Le séjour peut différer de l’expérience ordinaire du temps.

**Arbitrage de forme.** Une connaissance du domaine ne donne pas son contrôle à un camp. N’en faire une ressource que si l’accès ou l’espace utilisable est effectivement défini. Le bulletin des Fondateurs reste une convention du jeu distincte.

### 3.11 Décharge démoniaque — `lieu-decharge`

**Fiche pour l’Ange.** S04E22 présente un espace où aboutit l’essence des démons vaincus, dévorée par une créature. Cole explique son maintien exceptionnel par son âme ; Phoebe l’atteint par un sort et doit être rappelée alors qu’elle est en danger. Le même épisode lui fait ensuite attribuer sa présence auprès d’elle à de nouveaux pouvoirs. [S10b]

**Variante et contre-moyen.** Le rappel de Phoebe est un précédent de retrait du danger, pas une garantie pour tout visiteur. La proposition de résurrection faite par Cole n’est pas une recette exécutée et validée dans cette scène. [S10b]

**Conditions proposées.** Établir le mécanisme de visite ou de contact, sa portée et une éventuelle possibilité de retour. La carte ne distribue ni pouvoirs récupérés ni résurrection.

**Limites.** La transcription sans indications visuelles ne suffit pas à détailler le geste exact de collecte des pouvoirs, leur liste, ni la nature physique ou astrale de chaque apparition. Première apparition exacte et autres épisodes à recouper si nécessaires. Ne pas généraliser le cas de Cole à tous les morts.

**Carte proposée — Décharge démoniaque**

> Espace où une créature dévore l’essence des démons vaincus. Un lieu dangereux, dont l’accès et le retour demandent des moyens particuliers.

**Arbitrage de forme.** À conserver comme lieu de contexte tant qu’un accès jouable précis n’a pas été établi.

## 4. Registre des sources et niveau réel de vérification

Consultation effectuée le 8 septembre 2026. Les repères décrivent des passages textuels recherchés et lus ; aucun minutage audiovisuel n’est fourni. « Page consultée » signifie que du contenu exploitable a été obtenu, pas que toute la page ou tout l’épisode a fait l’objet d’une analyse exhaustive.

| ID | Source précise | Épisode et passage pertinent | Vérification réelle |
|---|---|---|---|
| S01 | [Springfield — S01E15](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e15&tv-show=charmed) | *Is There a Woogy in the House?* : fuite suspectée, cave ; échanges Whittlesey/Josh ; étude des cinq éléments ; exclusion des sœurs | Page de transcription non officielle consultée ; dialogues, sans validation des images |
| S02 | [Springfield — S07E17](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e17&tv-show=charmed) | *Scry Hard* : rangement initial ; instructions à Craven ; tentative sur le Nexus ; explication de Leo après l’Ombre ; offre de direction finale | Passages de transcription non officielle consultés ; ne pas transformer les affirmations de Zankou en règles universelles |
| S03 | [Springfield — S07E22](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e22&tv-show=charmed) | *Something Wicca This Way Goes...?* : expulsions ; discussion du Suxen ; entrée à l’école ; sort final et constat de dégâts | Passages de transcription non officielle consultés ; mécanisme visuel final non visionné |
| S04 | [Springfield — S06E14](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e14&tv-show=charmed) | *The Legend of Sleepy Halliwell* : arrivée ; Gideon ; sortie du Cavalier par la porte et distinction intérieur/extérieur | Passages de transcription non officielle consultés |
| S05 | [Springfield — S02E01](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e01&tv-show=charmed) | *Witch Trial* : achat du club ; financement final ; Penny au grenier | Passages de transcription non officielle consultés ; pas date d’ouverture exacte |
| S06 | [Springfield — S04E16](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e16&tv-show=charmed) | *The Fifth Halliwheel* : lettres de Karen, Elise, délai de rédaction ; échange final sur l’emploi | Passages de transcription non officielle consultés ; recherche du nom « Mirror » sans résultat dans ce texte |
| S07 | [Springfield — S04E20](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e20&tv-show=charmed) | *Long Live the Queen* : travail de Cole après couronnement ; risque de révolte | Passages de transcription non officielle consultés ; insuffisant pour la topographie |
| S08 | [Springfield — S03E01](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e01&tv-show=charmed) | *The Honeymoon’s Over* : absence de Piper ; comparaison un jour/un mois ; souvenirs après retour | Passages de transcription non officielle consultés ; décalage rapporté, pas chronométré |
| S09 | [Fandom — S08E02, transcription](https://charmed.fandom.com/wiki/Malice_in_Wonderland/Script) et [notice](https://charmed.fandom.com/wiki/Malice_in_Wonderland) | *Malice in Wonderland* : Black Heart évoque la prise de l’école ; notice sur les pouvoirs démoniaques | Extraits indexés seulement ; accès direct à la transcription en erreur. La scène complète n’a pas été consultée |
| S10 | [Springfield — S01E12](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e12&tv-show=charmed) | *The Wendigo* : inspection de Quake ; bracelet, expertise et vente aux enchères | Passages de transcription non officielle consultés |
| S10b | [Springfield — S04E22](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e22&tv-show=charmed) | *Witch Way Now?* : explications de Cole sur la Décharge ; rappel de Phoebe ; apparition de Cole et nouveaux pouvoirs | Passages de transcription non officielle consultés ; collecte non reconstituée visuellement |
| S11 | [Apple TV — Awakened](https://tv.apple.com/us/episode/awakened/umc.cmc.7kjooszp8iy9801ltwaqubxu?showId=umc.cmc.40n1r7702nhwxpw1muur9c23v) | S02E12 : démission de Prue explicitement mentionnée dans le synopsis | Page de distributeur consultée ; confirme ce fait, pas les dialogues ni les conditions détaillées de départ |
| S12 | [Springfield — S02E04](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e04&tv-show=charmed) | *The Devil’s Music* : nom P3, concert de Dishwalla, explications de Leo sur Masselin | Passages de transcription non officielle consultés |
| S13 | [Fandom — S01E13, transcription](https://charmed.fandom.com/wiki/From_Fear_to_Eternity/Script) | *From Fear to Eternity* : appel à Prue lorsqu’elle arrive à Buckland | Extrait indexé de transcription ; la page Springfield correspondante a également été ouverte, sans analyse complète |
| S14 | [Fandom — Ask Phoebe](https://charmed.fandom.com/wiki/Ask_Phoebe_%28Column%29) | Identification de la chronique avec le Bay Mirror ; pas d’épisode précis fourni par l’extrait | Extrait secondaire indexé seulement, utilisé pour le nom et la fonction |

Accès directs également tentés mais en erreur : pages Fandom `Magic_School`, `P3`, `Buckland%27s_Auction_House`, `The_Bay_Mirror`, `The_Wendigo/Script` ; pages Springfield S02E12 et S08E02. Ces erreurs ne prouvent pas que les pages n’existent pas. Repli vers transcriptions accessibles, synopsis de distributeur et extraits explicitement identifiés. Aucun de ces accès en échec n’est compté comme lecture du contenu.

Des résultats renvoyaient à des wikis de comics, de suites inventées ou à des PDF mélangeant plusieurs univers ; ils ont été exclus. Les discussions Reddit n’ont pas été retenues comme preuves. Les textes ci-dessus sont des synthèses courtes originales, sans reproduction de scène ou de formule complète.

## 5. Contradictions, indications anciennes et arbitrages

| Point | Nature du problème | Traitement proposé, sans modification active |
|---|---|---|
| Ancienne recherche indiquant « Aucun import runtime » | `fiches.json` du premier lot porte cette mention ; `bibliotheque.js` lit maintenant les sous-dossiers de recherche, et BIBLIOTHEQUE décrit leur raccordement | Mention historique devenue contradictoire avec le code sur disque. Corriger lors de la consolidation principale ; cela ne prouve pas la version chargée par un processus déjà lancé |
| Bleu des états dans REGLES §14 / vert dans les décisions d’habillage plus récentes | Décision visuelle ultérieure, sans lien avec les propriétés des lieux | Signaler la divergence ; aucun changement visuel proposé dans cette contribution |
| Emploi de « contrôle du manoir » dans S07E17 | Formulation narrative qui ne définit pas à elle seule la mécanique d’engagement d’une carte | Préserver les règles actées ; examiner les faits de la scène, sans seuil automatique « pièce tenue = Nexus maîtrisé » |
| Sous-sol et Nexus dans Manoir assiégé | La séparation est déjà explicite dans PARTIE.md : ce n’est pas une contradiction à corriger | Conserver cette distinction ; aucune retouche de l’objectif ni des moyens de départ |
| « Accès autorisé » à l’École dans le socle | Peut être lu à tort comme une condition administrative universelle et suffisante | Proposer « voie d’accès effective, protections et situation de l’institution à la période retenue ». À revoir avant remplacement du socle |
| Cartes Manoir, grenier et sous-sol | Chevauchement spatial ; les règles ne détaillent pas toutes les interactions d’engagement entre lieu parent et pièce | Ne pas inventer un verrouillage automatique de toutes les pièces. Faire préciser l’étendue représentée et la disponibilité avant distribution simultanée ; arbitrage principal nécessaire si le cas affecte un coup |
| Monde souterrain, Régions supérieures, Décharge | Domaines trop vastes ou difficiles d’accès pour signifier par eux-mêmes « lieu tenu » | Proposer une fiche de contexte ; ne distribuer une carte qu’avec portion ou accès défini. Aucun nouveau type mécanique de carte imposé |
| Destruction du Nexus en S07E22 / aventure originale située avant | Un futur canonique n’est pas automatiquement un événement obligatoire d’un scénario alternatif | Conserver la borne canonique comme référence ; portée des issues alternatives à arbitrer selon les décisions du projet, sans imposer le dénouement télévisé à la partie |

## 6. Fichiers susceptibles d’être concernés par une intégration

Toutes les écritures de cette contribution restent dans `Charmed/contributions/lieux/`. Le document ne doit pas être copié tel quel dans un dossier chargé par le serveur.

| Fichier actif potentiel | Travail proposé à la conversation principale |
|---|---|
| `Charmed/recherche/2026-09-08-lieux-objets-magie/fiches.json` | Fusionner les neuf fiches par identifiant existant, ajouter les deux lieux civils ; conserver les autres objets et méthodes. Rattacher chaque affirmation à son niveau de preuve |
| `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` | Produire la vue de lecture consolidée après examen des contenus ; distinguer explicitement les descriptions de cartes |
| `Charmed/canon/construction.json` et `CONSTRUCTION_DES_PARTIES.md` | Harmoniser `manor`, `attic`, `p3`, `bay-mirror`, `magic-school` avec les propositions retenues ; conserver la distinction contexte/preuve et les exigences temporelles |
| `Charmed/canon/magie-demons.json` et `REGLES_MAGIQUES_ET_DEMONS.md` | Revoir conjointement la notice Nexus/Ombre, sans dupliquer une seconde règle concurrente. Le JSON n’a pas été audité intégralement dans ce travail |
| `Charmed/canon/bibliotheque-verifiee.json` | Seulement après revue : promouvoir des affirmations atomiques, avec épisode, sources et limites. Aucun nouveau fait marqué `verified` n’est livré automatiquement |
| `Charmed/BIBLIOTHEQUE.md` | Actualiser couverture et lien vers le lot approuvé ; corriger les mentions historiques incompatibles avec le chargement réel |
| `serveur/charmed/bibliotheque.js`, `expertise-runtime.js` et préparation des ressources | Vérifier le transport des textes courts et la séparation Ange/camps si le format est enrichi. Ces fichiers sont des points de contrôle, pas des modifications requises d’emblée |

Le format de recherche existant comprend `id`, `categorie`, `titre`, `canon`, `sources`, `episodesReperes`, `conditionsPourLeJeu`, `limitesEtIncertitudes`, `applicationProposee`, `verification`, `activation`. Il n’a pas de champ de carte courte dans les entrées examinées. L’ajout éventuel d’un champ dédié doit être explicite ; ne pas remplacer `canon` par le texte public au risque d’appauvrir le contexte de l’Ange. Aucun patch d’activation n’est fourni.

## 7. Vérifications et travail restant

**Effectué :** lecture des références de projet ; comparaison avec les onze entrées existantes ; recherches web et consultation de passages ; examen de contre-exemples pour le manoir, l’École et les déplacements ; onze couples fiche/carte ; correspondance des identifiants et des destinations d’intégration. Contrôle documentaire final : sections attendues présentes, onze fiches et onze descriptions, sources explicites, aucune formule complète ni recette de victoire dans les cartes.

**Limites de cette vérification :** pas de visionnage, de minutage, d’audit intégral des 178 épisodes ni d’essai du moteur. Aucun contrôle de la sauvegarde en cours ou de la version du serveur chargé ; aucun serveur redémarré et aucune partie lancée. Les instructions de relance présentes dans PARTIE.md n’ont pas été exécutées.

**Reste à la revue principale :**

1. Examiner les formulations, les arbitrages spatiaux et la représentation des grands domaines ; décider des fiches à retenir.
2. Pour tout usage effectif dépendant d’un mécanisme encore incomplet, vérifier les scènes concernées : accès et changements des protections de l’École en saison 8 ; gestes et effets précis du Nexus ; mode de visite et récupération des pouvoirs à la Décharge. Une incertitude ne vaut pas impossibilité.
3. Compléter les périodes professionnelles si un scénario en dépend, notamment début exact de la chronique et identités de saison 8 ; ne pas appliquer une situation professionnelle à toute la série.
4. Après approbation, fusionner les contenus et vérifier leur chargement, leurs références temporelles et l’absence de diffusion d’informations futures aux camps. Toute action sur une sauvegarde demeure hors de cette contribution.

**Hors couverture de ce lot :** Valhalla, Avalon, tribunal magique, plans astraux, mondes parallèles ou de livres, hôpitaux, commissariats, cimetières et autres lieux ponctuels. Leur absence ici ne signifie ni inutilité ni inexistence ; ce travail consolide les lieux déjà présents, il ne remplace pas un inventaire exhaustif des saisons 1 à 8.
