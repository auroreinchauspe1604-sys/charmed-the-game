# Contribution objets magiques — inventaire élargi et provenance des informations

8 septembre 2026 — **Proposition à examiner. Ce nouveau catalogue n'est ni intégré ni activé.**

## 1. Demande et périmètre réellement traité

**Demande détaillée retenue :** rechercher sur le site Charmed Wiki les noms et les propriétés d'une large majorité d'objets magiques de la série originale, indiquer d'où provient chaque information et, lorsqu'une fiche existe déjà, d'où viennent les ajustements proposés.

Le présent document propose **80 fiches**, avec **81 descriptions de carte** (deux variantes pour Cupidon). **78 fiches** comportent des propriétés documentées au moins partiellement ; **deux** se limitent à l'identification d'un objet dont les pouvoirs ne sont pas établis (Rathmere, Kasimar). Les trois accessoires de Grams sont regroupés ; arbalète et projectiles restent une famille ; les configurations réellement différentes de cristaux sont distinguées. Le total n'est donc pas un décompte d'exemplaires physiques uniques.

Il s'agit d'un catalogue substantiellement élargi, couvrant les saisons 1 à 8. Aucun recensement scène par scène des 178 épisodes n'a été effectué : **un pourcentage de couverture de tous les objets de la série n'est pas mesuré**. La catégorie Artifacts inclut aussi des objets ordinaires et des médias dérivés ; ses 127 entrées annoncées ne constituent pas un dénominateur fiable pour cette demande. Reboot, comics et romans sont exclus des propriétés retenues. Les noms français non confirmés par un doublage sont des libellés descriptifs proposés ; le nom anglais de la page est conservé dans la source.

Les fiches détaillées ci-dessous sont destinées à l'Ange du destin. Les textes courts sont séparés et portent sur les propriétés des ressources. Ils ne constituent ni une recette de victoire ni une attribution automatique aux joueurs. Pour les huit familles déjà présentes, **le texte proposé est un complément à fusionner**, pas une suppression des faits et références déjà revus.

## 2. Instructions et fichiers consultés

Lecture des instructions AGENTS fournies et de la source globale canonique : `C:/Users/auror/Documents/Codex/2026-08-29/dis-moi-est-ce-que-tu/outputs/01_REGLES_GLOBALES_ACTEES.md`. Aucun AGENTS local supplémentaire trouvé lors de la recherche. Les quatre références demandées (`REGLES_ACTEES.md`, `DECISIONS_ACTEES.md`, `BIBLIOTHEQUE.md`, `PREPARATION_DOCUMENTEE.md`) ont été lues ; les sections pertinentes ont été rapprochées des données actuelles.

Fichiers consultés dans le projet (chemins relatifs à `C:/Users/auror/Videos/charmed/logic-match/`) :

- `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` et `construction.json` : notices objets et conditions ; cinq objets de construction.
- `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` et `fiches.json` : sept fiches objets, sources et schéma de données.
- `Charmed/canon/bibliotheque-verifiee.json` : trois faits cristaux et niveaux de sources.
- `Charmed/canon/base.json` et `magie-demons.json` : passages pertinents trouvés sur les cristaux, la localisation et les bagues ; pas une relecture de toute l'expertise de chaque personnage.
- `Charmed/canon/episodes-index.json` : correspondance identifiant/titre, utilisée comme navigation, pas comme preuve des scènes.
- `Charmed/contributions/objets/PROPOSITION_A_INTEGRER.md` : premier lot de huit familles, neuf cartes ; lecture pour éviter de refaire passer ses apports pour des nouveautés.
- `Charmed/canon/contributions-integrees/manifest.json` et `objets.json` : état actif relu en fin de recherche ; huit notices déjà issues du premier lot, identifiants `objets:1` à `objets:8`.
- `serveur/charmed/bibliotheque.js` : lecture du chargeur actuel, qui utilise les recherches et le manifeste des contributions intégrées. Aucun appel du serveur.

L'état du projet a évolué pendant ce travail. La dernière lecture montre déjà `minSeason: 3` pour les cristaux, `minSeason: 4` pour la localisation et la prise en compte des usages détournés des bagues. Les anciennes observations du premier lot sur ces champs sont donc **déjà traitées dans cet état**, et ne sont pas proposées une seconde fois comme corrections à appliquer. Le manifeste existant concerne le premier lot `objets`, pas le nouveau dossier `objets-magiques`.

## 3. Constats et mode de lecture des preuves

Le principal manque du premier lot était sa couverture limitée à huit familles. Ce catalogue ajoute 72 fiches de familles, variantes ou objets non présents comme fiches autonomes dans ce lot. Cela n'exclut pas des mentions dispersées ailleurs dans le projet. Deux de ces ajouts sont des identifications sans pouvoirs établis. Les rapprochements et fusions d'identifiants restent à la conversation principale.

Les pages de wiki mélangent fréquemment une scène, une explication éditoriale et des développements des comics. Les fiches gardent les repères télévisuels et cherchent des contre-exemples. Les ouvertures directes Fandom n'ont pas fourni de pages intégrales exploitables ; les résultats effectivement utilisés sont des **extraits indexés**, parfois longs. Une transcription indexée reste non officielle, même si elle présente des dialogues et didascalies. Les ouvertures de certaines autres transcriptions ont échoué ; elles ne sont pas comptées comme lues.

Niveaux conservés dans le registre : **IS** = extrait indexé secondaire ; **IT** = extrait indexé de transcription non officielle ; **T** = page de dialogues non officiels ouverte (S04E13). Aucun épisode visionné, aucune transcription authentifiée par la production. Les sources consultées par un lot antérieur conservent leur niveau historique dans ce lot : elles ne sont pas transformées en nouvelles consultations ici.

Chaque fiche donne les épisodes de repérage, le texte de connaissance proposé, les limites, une description courte, les pages précises et la provenance d'un éventuel ajustement. Un épisode mentionné ne prouve pas une première apparition ni une disponibilité continue. Une durée, un rayon, un stock ou un mode d'activation non documenté reste inconnu. Les objets détruits, désenchantés, emportés ou confiés à un gardien ne réapparaissent pas par la simple présence de leur fiche dans la bibliothèque.

## 4. Index des fiches

| Fiche | Nom proposé | Nature de la contribution |
|---|---|---|
| OM001 | Livre des Ombres | Complément / consolidation existant |
| OM002 | Grimoire de la Source | Complément / consolidation existant |
| OM003 | Cristaux de protection, d'alarme et de confinement | Complément / consolidation existant |
| OM004 | Cristal de localisation | Complément / consolidation existant |
| OM005 | Bagues de Cupidon — Cupidon S02 et Coop S08 | Complément / consolidation existant |
| OM006 | Boîte du Hollow | Complément / consolidation existant |
| OM007 | Anneau d'inspiration | Complément / consolidation existant |
| OM008 | Arbalète et projectiles d'Être des ténèbres | Complément / consolidation existant |
| OM009 | Bague protectrice de Victor | Ajout proposé |
| OM010 | Bague d'immunité de Nicholas | Ajout proposé |
| OM011 | Amulette protectrice d'Anton et de P. Russell | Ajout proposé |
| OM012 | Amulettes jumelles de Leeza et Janna | Ajout proposé |
| OM013 | Amulettes de chasse aux sorcières de Jackman | Ajout proposé |
| OM014 | Œil d'Aghbar | Ajout proposé |
| OM015 | Evil Eye — talisman de Nicolae | Ajout proposé |
| OM016 | Amulette de Sarpedon | Ajout proposé |
| OM017 | Pendentif de Valkyrie | Ajout proposé |
| OM018 | Totem des trois singes | Ajout proposé |
| OM019 | Talisman chinois contre les esprits | Ajout proposé |
| OM020 | Talismans de Ruth Cobb | Ajout proposé |
| OM021 | Talisman du sorcier-guérisseur | Ajout proposé |
| OM022 | Baguette de Tuatha | Ajout proposé |
| OM023 | Baguette de Gammill | Ajout proposé |
| OM024 | Baguette de Rathmere | Identification seulement |
| OM025 | Excalibur | Ajout proposé |
| OM026 | Lame du Dragon | Ajout proposé |
| OM027 | Épée de cristal de Gabriel | Ajout proposé |
| OM028 | Athamé absorbant les pouvoirs | Ajout proposé |
| OM029 | Athamé maudit des pirates | Ajout proposé |
| OM030 | Athamé enchanté de Gideon | Ajout proposé |
| OM031 | Cœur en étain de Melinda | Ajout proposé |
| OM032 | Urne égyptienne maudite | Ajout proposé |
| OM033 | Lanterne de collecte des pouvoirs | Ajout proposé |
| OM034 | Bouteilles de génie | Ajout proposé |
| OM035 | Boîte de Pandore | Ajout proposé |
| OM036 | Coffre des sept péchés capitaux | Ajout proposé |
| OM037 | Baguette de Lukas | Ajout proposé |
| OM038 | Cage de la Prophétesse | Ajout proposé |
| OM039 | Cage aquatique de la Crone | Ajout proposé |
| OM040 | Urne des pouvoirs divins | Ajout proposé |
| OM041 | Maison de poupées Halliwell | Ajout proposé |
| OM042 | Tableau maudit de Nell | Ajout proposé |
| OM043 | Roman Crossed, Double-Crossed | Ajout proposé |
| OM044 | Appareil photo de Vaklav | Ajout proposé |
| OM045 | Planchette spirite des Halliwell | Ajout proposé |
| OM046 | Alliance ensorcelée de Grams | Ajout proposé |
| OM047 | Vêtements de Grams renvoyant à leur propriétaire | Ajout proposé |
| OM048 | Bâton mystique de Bouddha | Ajout proposé |
| OM049 | Ceinture dorée de Gaïa | Ajout proposé |
| OM050 | Cristal de Kasimar | Identification seulement |
| OM051 | Cristaux Ronyx | Ajout proposé |
| OM052 | Cristal de paranoïa | Ajout proposé |
| OM053 | Cristal des rêves | Ajout proposé |
| OM054 | Cristaux de pyrite d'alarme | Ajout proposé |
| OM055 | Cristaux de dissimulation | Ajout proposé |
| OM056 | Dispositif de cristaux de Burke | Ajout proposé |
| OM057 | Boule de cristal de Gideon | Ajout proposé |
| OM058 | Lumière de l'amour éternel | Ajout proposé |
| OM059 | Sablier de Tempus | Ajout proposé |
| OM060 | Miroir entre les deux mondes | Ajout proposé |
| OM061 | Miroir de Kali | Ajout proposé |
| OM062 | Miroir magique des contes | Ajout proposé |
| OM063 | Livre magique des contes | Ajout proposé |
| OM064 | Pomme empoisonnée des contes | Ajout proposé |
| OM065 | Pantoufles de verre | Ajout proposé |
| OM066 | Cape rouge des contes | Ajout proposé |
| OM067 | Carrosse-citrouille | Ajout proposé |
| OM068 | Bâton de leprechaun — shillelagh | Ajout proposé |
| OM069 | Baguette de capture des phantasmes | Ajout proposé |
| OM070 | Poussière du marchand de sable | Ajout proposé |
| OM071 | Poussière de fée | Ajout proposé |
| OM072 | Fiole de capture d'âme | Ajout proposé |
| OM073 | Scarabées égyptiens de transfert | Ajout proposé |
| OM074 | Cercle de vérité du Tribunal | Ajout proposé |
| OM075 | Liste de la Mort | Ajout proposé |
| OM076 | Balai enchanté de Phoebe | Ajout proposé |
| OM077 | Grimoire de Tuatha | Ajout proposé |
| OM078 | Grimoire des Phoenix | Ajout proposé |
| OM079 | Camion du marchand de glaces | Ajout proposé |
| OM080 | Sceptre de moralité de l'Ordre | Ajout proposé |

## 5. Textes complets proposés pour l’Ange et les cartes

### OM001 — Livre des Ombres

**Repères :** S01E01 — Something Wicca This Way Comes ; S01E03 — Thank You for Not Morphing ; S03E13 — Bride and Gloom ; S05E08 — A Witch in Time ; S07E21 — Death Becomes Them.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Livre familial de connaissances, formules et recettes transmis depuis Melinda Warren. Ses défenses dépendent notamment de l'état des sœurs : la corruption de Bride and Gloom affecte le livre ; Bacarra contourne sa protection avec une potion masquant le Bien ; Zankou exploite leur déstabilisation. L'exception de S01E03 permet déjà de toucher et déplacer le livre jusqu'au seuil.

**Conditions, limites, contre-exemples et disponibilité.** La protection n'est donc ni une impossibilité absolue de vol ni un détecteur infaillible d'identité. Possession, lecture et exécution d'une formule restent distinctes. Aucune encyclopédie exhaustive ni indestructibilité universelle établie. Les pouvoirs ajoutés dans les comics sont écartés.

**Description courte proposée pour la carte.** « Livre familial de connaissances magiques, de formules et de recettes, doté de protections contre le mal dont l'efficacité dépend du contexte. »

**D’où provient l’information :** [S001 — Book of Shadows](https://charmed.fandom.com/wiki/Book_of_Shadows) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:1` ; recherche `objet-livre` ; construction `book`.

**D’où viennent les ajustements :** Ajout proposé : autres exceptions aux protections (S01E03, S03E13, S05E08), d'après Book of Shadows. Le cas Zankou et la séparation lecture/exécution sont déjà présents : les conserver, sans les revendiquer comme nouveaux.

### OM002 — Grimoire de la Source

**Repères :** S04E19 — We're Off to See the Wizard ; S04E21 — Womb Raider.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Livre maléfique associé aux rites de couronnement et de transfert de la Source. Il se défend contre le Bien et résiste à la potion essayée par Piper. Le transfert envisagé avec le Sorcier dépend d'un rite, du sang et d'une incantation, pas de la seule possession. Après les événements de Womb Raider, Leo emporte le livre pour le cacher dans les Andes occidentales.

**Conditions, limites, contre-exemples et disponibilité.** La résistance constatée ne prouve pas une invulnérabilité à tout moyen. Le rite de transfert n'est pas accompli comme prévu : ne pas le déclarer réussi. Sa dissimulation affecte sa disponibilité ultérieure. Exclure les développements avec Rennek issus des comics.

**Description courte proposée pour la carte.** « Livre de magie maléfique lié aux rites de la Source. Il se protège du Bien et résiste aux moyens de destruction essayés contre lui. »

**D’où provient l’information :** [S002 — The Grimoire](https://charmed.fandom.com/wiki/The_Grimoire) (IS) ; [S003 — Womb Raider/Script](https://charmed.fandom.com/wiki/Womb_Raider/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:2` ; recherche `objet-grimoire`.

**D’où viennent les ajustements :** Ajout proposé : rite de transfert et devenir du livre après S04E21, d'après The Grimoire et Womb Raider/Script. La manipulation indirecte par sac enchanté et la résistance à la potion figurent déjà dans objets:2 : les conserver lors d'une fusion.

### OM003 — Cristaux de protection, d'alarme et de confinement

**Repères :** S03E05 — Sight Unseen ; S04E13 — Charmed and Dangerous ; S07E08 — Charmed Noir.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Prue décrit des cristaux de sidérite enchantés formant un réseau : l'entrée d'une cible déclenche des décharges et fait luire un cristal témoin. Le corpus local documente aussi trois cristaux protecteurs autour de Miss Donovan en S07E08, et l'activation puis le retrait d'un cristal en S04E13. Ces configurations doivent rester distinctes.

**Conditions, limites, contre-exemples et disponibilité.** Cinq cristaux ne constituent pas un nombre universel. Le dialogue S03E05 soulève le risque pour un humain ou Kit sans établir leur immunité. Ne pas confondre alarme, barrière et cage. La disposition, l'enchantement et le maintien du dispositif comptent ; pas de rayon global inventé.

**Description courte proposée pour la carte.** « Cristaux enchantés pour former des dispositifs d'alarme, de protection ou de confinement. Leur préparation et leur disposition déterminent l'effet produit. »

**D’où provient l’information :** [S004 — Crystal Cage](https://charmed.fandom.com/wiki/Crystal_Cage) (IS) ; [S005 — Sight Unseen/Script](https://charmed.fandom.com/wiki/Sight_Unseen/Script) (IT) ; [S096 — Charmed and Dangerous — dialogues](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed) (T). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Références locales complémentaires :** `Charmed/canon/bibliotheque-verifiee.json#library:crystals-three`, `Charmed/canon/bibliotheque-verifiee.json#library:crystals-activation-electricity`, `Charmed/canon/bibliotheque-verifiee.json#library:crystals-removal`, `Charmed/canon/contributions-integrees/objets.json#objets:3`. Leur vérification est celle enregistrée dans le corpus existant.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:3` ; recherche `objet-cristaux` ; construction `crystals`.

**D’où viennent les ajustements :** Ajout proposé : préparation en sidérite, cristal témoin et réserve explicite sur les humains/Kit, tirés de Sight Unseen/Script. Les trois cristaux de Miss Donovan, la vision de S04E13 et l'infiltration S06E12 sont déjà documentés ; cette fiche ne les remplace pas. Les autres variantes de cristaux du catalogue sont des fiches séparées à rapprocher sans les fusionner magiquement.

### OM004 — Cristal de localisation

**Repères :** S06E21 — Witch Wars ; S07E17 — Scry Hard.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Pendule employé sur une carte pour une recherche magique. Dans Witch Wars, une bague de la grand-mère de Tali sert de lien pour rechercher son amulette. Dans Scry Hard, la recherche des parents miniaturisés échoue, puis Piper déplace le cristal pour désigner le manoir.

**Conditions, limites, contre-exemples et disponibilité.** Un signal peut être provoqué par une personne : il ne garantit ni la sécurité du lieu ni la réussite spontanée du procédé. Le lien pertinent dépend de la recherche ; le sang n'est pas une condition universelle. Ces épisodes sont des précédents, pas des dates d'invention.

**Description courte proposée pour la carte.** « Pendule utilisé avec une carte géographique et un lien pertinent pour mener une recherche magique. »

**D’où provient l’information :** [S006 — Scry Hard](https://charmed.fandom.com/wiki/Scry_Hard) (IS) ; [S007 — Witch Wars (episode)](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:4` ; construction `scrying-crystal`.

**D’où viennent les ajustements :** Ajout proposé : exemple précis de lien entre la bague familiale et l'amulette de Tali en S06E21, tiré de Witch Wars. Le précédent S04E19, la manipulation du pendule par Piper et les réserves sur la localisation sont déjà présents ; à conserver.

### OM005 — Bagues de Cupidon — Cupidon S02 et Coop S08

**Repères :** S02E10 — Heartbreak City ; S08E17 — Generation Hex ; S08E22 — Forever Charmed.

**Fiche détaillée pour l’Ange du destin — texte proposé.** La bague du Cupidon de Heartbreak City intervient dans la perception et l'action sur les liens amoureux ; Drazi la vole et détourne son usage. Celle de Coop permet des voyages liés à l'amour, notamment avec Piper et Leo dans Forever Charmed. La destination suit le lien affectif et ne se comporte pas comme une sélection précise de date.

**Conditions, limites, contre-exemples et disponibilité.** Conserver deux variantes chronologiques : le voyage temporel S08 ne prouve pas cette fonction dès S02. Prêt et vol sont possibles ; ne pas réserver l'usage à un propriétaire autorisé. Exclure les propriétés décrites seulement dans les comics. Le nombre maximal de voyageurs n'est pas établi.

**Carte proposée — Bague du Cupidon — S02.** « Bague permettant de percevoir et d'influencer des liens amoureux, susceptible d'être détournée. »

**Carte proposée — Bague de Coop — S08.** « Bague permettant notamment de voyager dans le temps en suivant un lien d'amour, avec une destination parfois imprécise. »

**D’où provient l’information :** [S008 — Cupid Ring](https://charmed.fandom.com/wiki/Cupid_Ring) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:5` ; recherche `objet-bague-cupidon` ; construction `cupid-ring`.

**D’où viennent les ajustements :** Consolidation : garder les deux variantes S02/S08 et leurs sources d'épisodes existantes. Cupid Ring sert à élargir la navigation et à repérer les passages de comics à exclure ; il ne remplace pas les précédents documentaires sur Drazi et Dumain. Aucune nouvelle capacité universelle proposée.

### OM006 — Boîte du Hollow

**Repères :** S04E13 — Charmed and Dangerous ; S08E21 — Kill Billie: Vol. 2.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Contenant du Hollow, entité qui absorbe la magie du Bien comme du Mal. En S04E13, son inscription participe au confinement par une coopération du Bien et du Mal. En S08E21, une invocation atteint le Hollow sans transport préalable de la boîte : contenu, contenant et mode d'appel ne sont pas identiques.

**Conditions, limites, contre-exemples et disponibilité.** La transcription S04E13 consultée directement soutient la coopération et l'inscription. Elle ne justifie pas une maîtrise automatique par le porteur. Distinguer renvoi du Hollow et devenir des pouvoirs absorbés ; le cas de Cole appelle une lecture contextualisée. Ne pas généraliser la méthode S04 à toute résolution S08.

**Description courte proposée pour la carte.** « Contenant lié au confinement du Hollow, une entité absorbant la magie. Son inscription intervient dans un rituel de confinement ; sa possession ne donne pas le contrôle de l'entité. »

**D’où provient l’information :** [S009 — Hollow Box](https://charmed.fandom.com/wiki/Hollow_Box) (IS) ; [S096 — Charmed and Dangerous — dialogues](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed) (T). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:6` ; recherche `objet-boite-hollow`.

**D’où viennent les ajustements :** Ajout proposé : distinction entre appel du Hollow en S08E21 et transport de son contenant, d'après Hollow Box. Le rituel S04E13 est corroboré par les dialogues ouverts. Le dénouement S08E22 et la restitution des pouvoirs restent à approfondir ; aucun nouveau confinement universel acté.

### OM007 — Anneau d'inspiration

**Repères :** S04E09 — Muse to My Ears.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Anneau créé par une magie bénéfique pour voir et capturer des Muses et canaliser leur inspiration. Devlin le détourne. Les Muses enfermées peuvent être libérées ; la récupération de l'objet n'est pas en elle-même une destruction de ses capacités.

**Conditions, limites, contre-exemples et disponibilité.** L'inspiration n'est ni une connaissance exacte de tous les événements ni une garantie de création réussie. Capacité maximale, durée de captivité et résistance exhaustive non établies. Distinguer les Muses effectivement capturées des Muses simplement présentes.

**Description courte proposée pour la carte.** « Anneau permettant de voir et d'enfermer des Muses pour canaliser leur inspiration. Les Muses captives peuvent être libérées. »

**D’où provient l’information :** [S010 — Ring of Inspiration](https://charmed.fandom.com/wiki/Ring_of_Inspiration) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:7` ; recherche `objet-bague-inspiration`.

**D’où viennent les ajustements :** Consolidation et confirmation secondaire par Ring of Inspiration. La capture, la libération puis la reprise par Devlin sont déjà documentées : préserver les dialogues cités dans la fiche existante, de niveau plus direct que cet extrait. Pas de nouveau plafond ou de résistance inventée.

### OM008 — Arbalète et projectiles d'Être des ténèbres

**Repères :** S01E21 — Love Hurts ; S03E11 — Blinded by the Whitelighter ; S05E04 — Siren Song.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Arbalète associée à des projectiles empoisonnés menaçant les Êtres de lumière. Eames s'empare de l'arme ; Natalie est blessée par contact direct avec une flèche. Le poison n'agit pas nécessairement immédiatement. Le dialogue de Siren Song relève le risque pour Paige lié à son ascendance d'Être de lumière.

**Conditions, limites, contre-exemples et disponibilité.** Arme, projectile, poison, blessure et effet doivent être suivis séparément. Un vol n'empêche pas tout usage par un autre être. Ne pas attribuer les pouvoirs d'Eames à l'arbalète. Aucun délai de mort, stock infini ou remède universel établi ici.

**Description courte proposée pour la carte.** « Arbalète utilisant des projectiles empoisonnés particulièrement dangereux pour les Êtres de lumière. Une flèche peut aussi blesser par contact direct. »

**D’où provient l’information :** [S011 — Darklighter Crossbow](https://charmed.fandom.com/wiki/Darklighter_Crossbow) (IS) ; [S012 — Blinded by the Whitelighter/Script](https://charmed.fandom.com/wiki/Blinded_by_the_Whitelighter/Script) (IT) ; [S013 — Siren Song/Script](https://charmed.fandom.com/wiki/Siren_Song/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Fiche déjà présente :** `Charmed/canon/contributions-integrees/objets.json#objets:8` ; recherche `objet-arbalete` ; construction `darklighter-crossbow`.

**D’où viennent les ajustements :** Complément de navigation : précédent S01E21 associé à Darklighter Crossbow. Eames, la blessure directe de Natalie, le poison progressif et la vulnérabilité de Paige sont déjà documentés ; les transcriptions indexées les confortent sans être une nouvelle validation indépendante.

### OM009 — Bague protectrice de Victor

**Repères :** S01E03 — Thank You for Not Morphing.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Bague à pierres de chrysolite portée par Victor dans Thank You for Not Morphing. Elle le protège contre les conséquences mortelles de la formule de sécurité employée par ses filles, sans empêcher toute douleur.

**Conditions, limites, contre-exemples et disponibilité.** Ce précédent ne vaut pas immunité à toute magie ou toute blessure. La provenance complète, les modalités d'enchantement et la disponibilité après l'épisode restent à préciser.

**Description courte proposée pour la carte.** « Bague protectrice portée par Victor, capable de le préserver de la formule de sécurité des sœurs sans supprimer toute douleur. »

**D’où provient l’information :** [S014 — Protection Ring](https://charmed.fandom.com/wiki/Protection_Ring) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM010 — Bague d'immunité de Nicholas

**Repères :** S01E17 — That '70s Episode ; S02E01 — Witch Trial.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Nicholas obtient sous la contrainte la bénédiction de Patty sur une bague qui doit le protéger des pouvoirs de ses filles. Le voyage en 1975 permet de défaire cette bénédiction ; la bague ne le protège plus au présent. Son retour en Witch Trial ne démontre pas une protection restaurée.

**Conditions, limites, contre-exemples et disponibilité.** L'immunité dépend de cet enchantement particulier et de sa chronologie. Ne pas la transformer en protection contre tous les êtres ou tous les dommages. La variante enchantée et la variante privée de bénédiction ont des propriétés différentes.

**Description courte proposée pour la carte.** « Bague dont la bénédiction de Patty protège Nicholas des pouvoirs de ses filles. Cette protection peut être annulée en agissant sur l'enchantement. »

**D’où provient l’information :** [S015 — Ring of Immunity](https://charmed.fandom.com/wiki/Ring_of_Immunity) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM011 — Amulette protectrice d'Anton et de P. Russell

**Repères :** S02E14 — Pardon My Past.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Amulette liée à Anton et P. Russell, puis à l'histoire de Phoebe dans Pardon My Past. Elle protège contre une magie de sorcières, notamment la malédiction concernée par l'épisode. Le retrait de l'amulette modifie l'efficacité de cette protection lors des échanges entre passé et présent.

**Conditions, limites, contre-exemples et disponibilité.** Le récit de 1924 et les corps concernés sont essentiels. Ne pas inférer un rayon protecteur collectif ou une résistance à toute magie démoniaque. Les transferts de corps relèvent aussi de formules distinctes.

**Description courte proposée pour la carte.** « Amulette protégeant son porteur contre la magie de sorcières, notamment la malédiction rencontrée dans Pardon My Past. »

**D’où provient l’information :** [S016 — Protection Amulet](https://charmed.fandom.com/wiki/Protection_Amulet) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM012 — Amulettes jumelles de Leeza et Janna

**Repères :** S03E20 — Exit Strategy.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Deux amulettes complémentaires confiées à des sorcières. Chacune procure une protection et gêne la localisation. Leur réunion avec une formule est présentée comme donnant une protection supérieure. Belthazor parvient à franchir la défense d'une amulette isolée.

**Conditions, limites, contre-exemples et disponibilité.** L'invincibilité annoncée pour l'ensemble n'est pas une démonstration face à toutes les attaques. Ne pas confondre moitié, paire et rite accompli. Le devenir matériel final n'est pas suffisamment établi pour affirmer leur destruction.

**Description courte proposée pour la carte.** « Deux amulettes complémentaires de protection. Leur efficacité dépend de leur réunion et du rituel associé ; une amulette isolée possède déjà une défense limitée. »

**D’où provient l’information :** [S017 — Magical Amulets](https://charmed.fandom.com/wiki/Magical_Amulets) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM013 — Amulettes de chasse aux sorcières de Jackman

**Repères :** S04E22 — Witch Way Now?.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Jackman utilise des amulettes contre la magie des sorcières, sur lui puis disposées autour du manoir. Elles entravent les sœurs mais pas l'intervention démoniaque de Cole. Leur retrait du périmètre permet de mettre fin à l'entrave.

**Conditions, limites, contre-exemples et disponibilité.** La protection contre les sorcières n'est pas une annulation de toute magie. Les commentaires du wiki sur ce que l'orbing de Paige aurait dû permettre sont des interprétations, pas une correction de la scène.

**Description courte proposée pour la carte.** « Amulettes capables d'entraver la magie des sorcières, portées ou disposées autour d'un périmètre. Leur effet ne couvre pas toute magie démoniaque. »

**D’où provient l’information :** [S018 — Witch Hunter Amulets](https://charmed.fandom.com/wiki/Witch_Hunter_Amulets) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM014 — Œil d'Aghbar

**Repères :** S06E15 — I Dream of Phoebe.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Amulette protectrice portée par Bosk. Elle le préserve de la magie et des potions essayées par les sorcières. La boule de feu de Jinny détruit Bosk et l'amulette.

**Conditions, limites, contre-exemples et disponibilité.** Le contre-exemple démoniaque interdit une immunité universelle. Après la destruction de l'exemplaire montré, sa présence dans un scénario ultérieur exigerait une provenance explicite.

**Description courte proposée pour la carte.** « Amulette protectrice contre la magie des sorcières et leurs potions. Cette protection ne résiste pas à la boule de feu démoniaque montrée dans I Dream of Phoebe. »

**D’où provient l’information :** [S019 — Eye of Aghbar](https://charmed.fandom.com/wiki/Eye_of_Aghbar) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM015 — Evil Eye — talisman de Nicolae

**Repères :** S05E06 — The Eyes Have It.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Talisman qui amplifie et canalise les pouvoirs de son utilisateur. L'histoire de Nicolae et Lydia comporte un usage offensif ; Phoebe développe une expérience de prémonition astrale en lien avec le talisman et le déblocage de ses prémonitions. Ava en devient gardienne.

**Conditions, limites, contre-exemples et disponibilité.** Distinguer l'amplification des capacités du porteur d'une liste de pouvoirs automatiquement attribués à tous. Ne pas confondre cet objet avec le pouvoir de Javna nommé Evil Eye. Le contexte culturel est celui de la fiction.

**Description courte proposée pour la carte.** « Talisman amplifiant et canalisant les capacités magiques de son utilisateur. Son effet dépend des pouvoirs qu'il peut mobiliser. »

**D’où provient l’information :** [S020 — The Evil Eye](https://charmed.fandom.com/wiki/The_Evil_Eye) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM016 — Amulette de Sarpedon

**Repères :** S07E07 — Someone to Witch Over Me.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Sarpedon capture des anges gardiens dans une amulette afin de profiter de leur guidance et de leur protection. Phoebe s'empare de l'objet, le privant de cet avantage ; les gardiens peuvent être libérés.

**Conditions, limites, contre-exemples et disponibilité.** Ces anges gardiens ne sont pas assimilables aux Êtres de lumière. Ne pas attribuer une invulnérabilité absolue ni une capacité infinie. Le devenir final de l'amulette reste moins documenté que celui de ses captifs.

**Description courte proposée pour la carte.** « Amulette capable de retenir des anges gardiens et de canaliser leur guidance protectrice. Les gardiens enfermés peuvent être libérés. »

**D’où provient l’information :** [S021 — Sarpedon's Amulet](https://charmed.fandom.com/wiki/Sarpedon%27s_Amulet) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM017 — Pendentif de Valkyrie

**Repères :** S06E01 — Valhalley of the Dolls, Part 1 ; S06E02 — Valhalley of the Dolls, Part 2.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Pendentif utilisé pour accéder à Valhalla et prendre l'apparence ou l'état de Valkyrie. L'expérience de Piper s'accompagne d'un effacement affectif et d'une perte d'attaches, dans le contexte de sa souffrance. Ses capacités antérieures ne disparaissent pas toutes.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas transposer toute la psychologie de Piper à chaque porteuse. Accès au lieu, transformation et capacités propres restent distincts. Ni un effacement universel immédiat des émotions ni une suppression totale des pouvoirs n'est établi.

**Description courte proposée pour la carte.** « Pendentif lié aux Valkyries, permettant l'accès à Valhalla et une transformation de sa porteuse. »

**D’où provient l’information :** [S022 — Valkyrie Pendant](https://charmed.fandom.com/wiki/Valkyrie_Pendant) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM018 — Totem des trois singes

**Repères :** S05E20 — Sense and Sense Ability.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Totem de Kheel détourné par la Crone. Un singe s'anime pour voler la vue de Piper, l'ouïe de Phoebe et la voix de Paige ; les pertes se manifestent lorsqu'elles en ont besoin. La Crone exploite les sens dérobés avec sa propre magie. La destruction finale accompagne leur restitution.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas confondre voix et totalité de la communication. L'utilisation des sens par la Crone ne confère pas automatiquement ses perceptions à tout détenteur du totem. La séquence d'activation requiert davantage qu'une simple proximité.

**Description courte proposée pour la carte.** « Totem capable de dérober la vue, l'ouïe et la voix par l'intermédiaire d'un singe animé. »

**D’où provient l’information :** [S023 — Monkey Totem](https://charmed.fandom.com/wiki/Monkey_Totem) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM019 — Talisman chinois contre les esprits

**Repères :** S01E04 — Dead Man Dating.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Talisman posé à une entrée pour écarter les esprits. Mark, pourtant allié, ne peut franchir la protection chez Tony tant que Piper ne retire pas le talisman.

**Conditions, limites, contre-exemples et disponibilité.** La protection n'est pas limitée aux esprits hostiles. Ce précédent n'établit pas une barrière contre les démons, les êtres vivants ou toutes les entités surnaturelles.

**Description courte proposée pour la carte.** « Talisman placé à une entrée pour empêcher le passage des esprits, y compris d'un esprit bienveillant. »

**D’où provient l’information :** [S024 — Chinese Talisman](https://charmed.fandom.com/wiki/Chinese_Talisman) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM020 — Talismans de Ruth Cobb

**Repères :** S03E04 — All Halliwell's Eve.

**Fiche détaillée pour l’Ange du destin — texte proposé.** En 1670, Ruth Cobb utilise des talismans qui détectent ou repoussent les sorcières. Phoebe mobilise un balai enchanté pour faire tomber ces protections.

**Conditions, limites, contre-exemples et disponibilité.** Le contexte de Samhain et l'enchantement du balai doivent être conservés. Ne pas attribuer ce contournement à n'importe quel balai ni étendre les talismans à toutes les espèces magiques.

**Description courte proposée pour la carte.** « Talismans employés par Ruth Cobb pour détecter ou repousser les sorcières. »

**D’où provient l’information :** [S025 — All Halliwell's Eve](https://charmed.fandom.com/wiki/All_Halliwell%27s_Eve) (IS) ; [S026 — Broomstick](https://charmed.fandom.com/wiki/Broomstick) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM021 — Talisman du sorcier-guérisseur

**Repères :** S05E13 — House Call.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Objet utilisé par le Witch Doctor de House Call pour retirer et recueillir les résidus maléfiques accumulés au manoir après les attaques.

**Conditions, limites, contre-exemples et disponibilité.** Le sort qui amplifie les obsessions des sœurs est une autre action du personnage. Posséder ce talisman ne suffit pas à disposer de ce sort. Capacité de stockage et catégories exactes d'entités capturables non établies.

**Description courte proposée pour la carte.** « Talisman utilisé pour retirer et recueillir les résidus maléfiques d'un lieu. »

**D’où provient l’information :** [S027 — Witch Doctor's Talisman](https://charmed.fandom.com/wiki/Witch_Doctor%27s_Talisman) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM022 — Baguette de Tuatha

**Repères :** S02E06 — That Old Black Magic.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Baguette liée à Tuatha et à Kyle, l'Élu capable de la vaincre. Elle canalise l'intention ; la confiance de Kyle compte dans son utilisation. L'ambre de la baguette se brise à l'issue de la confrontation et l'objet perd sa magie.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas en faire une machine réalisant tout souhait pour tout porteur. L'objet intact et sa version privée de magie ne sont pas interchangeables. La prétendue potion de courage ne constitue pas une propriété de la baguette.

**Description courte proposée pour la carte.** « Baguette canalisant l'intention, liée à Tuatha et à l'Élu. Sa magie dépend notamment de l'intégrité de son ambre. »

**D’où provient l’information :** [S028 — Tuatha's Wand](https://charmed.fandom.com/wiki/Tuatha%27s_Wand) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM023 — Baguette de Gammill

**Repères :** S04E05 — Size Matters.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Gammill emploie une baguette alimentée par l'électricité pour miniaturiser ses victimes et réduire leur puissance. Une attaque de Piper peut fournir l'énergie nécessaire. Les sœurs utilisent ensuite le dispositif contre Gammill ; sa destruction accompagne leur retour à la taille normale.

**Conditions, limites, contre-exemples et disponibilité.** La réduction des pouvoirs n'est pas une suppression absolue. Ne pas supposer un rayon inverse universel ni attribuer la croissance spontanée à toute manipulation de la baguette. L'espèce exacte de Gammill n'est pas établie ici.

**Description courte proposée pour la carte.** « Baguette activée par une énergie électrique, capable de miniaturiser une cible et d'affaiblir ses pouvoirs. »

**D’où provient l’information :** [S029 — Gammill](https://charmed.fandom.com/wiki/Gammill) (IS) ; [S030 — Size Matters/Plot](https://charmed.fandom.com/wiki/Size_Matters/Plot) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM024 — Baguette de Rathmere

**Repères :** S06E18 — Spin City.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Baguette conservée à l'École de magie et liée à Rathmere. Une tentative de retrouver son propriétaire par son intermédiaire échoue ; Rathmere est mort.

**Conditions, limites, contre-exemples et disponibilité.** L'objet est nommé et rattaché à un détenteur, mais ses effets propres ne sont pas décrits avec assez de précision. Ne pas lui attribuer tous les sorts de Rathmere ou une capacité offensive inventée. Fiche d'identification, pas ressource à pouvoirs établis.

**Description courte proposée pour la carte.** « Baguette ayant appartenu à Rathmere et conservée à l'École de magie. Ses propriétés propres restent à documenter. »

**D’où provient l’information :** [S031 — Rathmere's Wand](https://charmed.fandom.com/wiki/Rathmere%27s_Wand) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM025 — Excalibur

**Repères :** S06E08 — Sword and the City ; S06E23 — It's a Bad, Bad, Bad, Bad World, Part 2.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Épée dont Wyatt est présenté comme le détenteur légitime. Piper la retire temporairement du rocher ; un détenteur illégitime risque d'être corrompu. Piper décide de la remettre dans la pierre jusqu'à ce que Wyatt soit prêt.

**Conditions, limites, contre-exemples et disponibilité.** Cette décision maternelle n'est pas une interdiction magique universelle avant la majorité. L'image de Wyatt liée à la peur en fin S06 n'établit pas à elle seule une histoire réelle de l'épée. Exclure l'Empyreal Sword et les développements des comics.

**Description courte proposée pour la carte.** « Épée liée au destin de Wyatt, son détenteur légitime. Sa puissance et les risques de corruption dépendent de celui qui la manie. »

**D’où provient l’information :** [S032 — Excalibur](https://charmed.fandom.com/wiki/Excalibur) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM026 — Lame du Dragon

**Repères :** S04E04 — Enter the Demon ; S06E10 — Chris-Crossed.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Arme employée dans Enter the Demon pour retirer et retenir une âme. Paige récupère l'âme de Piper par télékinésie orbitale. Yen Lo est capturé ; le Maître emporte l'arme vers le passage de réincarnation.

**Conditions, limites, contre-exemples et disponibilité.** Le pouvoir de récupération de Paige n'appartient pas à l'arme. Une pièce exposée dans le futur de Chris-Crossed pourrait être un exemplaire apparent ou une réplique : continuité matérielle incertaine. Ne pas déclarer l'arme détruite faute de retour montré.

**Description courte proposée pour la carte.** « Lame capable de retirer et de retenir une âme, distincte du corps de sa victime. »

**D’où provient l’information :** [S033 — Dragon Blade](https://charmed.fandom.com/wiki/Dragon_Blade) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM027 — Épée de cristal de Gabriel

**Repères :** S01E16 — Which Prue Is It, Anyway?.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Arme de Gabriel Statler, Seigneur de la guerre, associée à l'absorption d'âmes et de leurs qualités. Gabriel peut l'appeler ; la protection décrite contre les armes humaines dépend de son usage. Sa propre épée finit par le tuer et disparaît avec lui.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas attribuer automatiquement l'ensemble de la nature de Gabriel à tout porteur. Le précédent de Brianna, qui l'en avait séparé, montre l'importance de distinguer être armé et être désarmé.

**Description courte proposée pour la carte.** « Épée de cristal liée à Gabriel, capable d'absorber des âmes et de renforcer son détenteur dans les conditions décrites pour lui. »

**D’où provient l’information :** [S034 — Crystal Sword](https://charmed.fandom.com/wiki/Crystal_Sword) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM028 — Athamé absorbant les pouvoirs

**Repères :** S06E21 — Witch Wars.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Les participants de Witch Wars utilisent un athamé qui absorbe des pouvoirs et peut les transmettre à son porteur. Phoebe reçoit ainsi des pouvoirs démoniaques, qui affectent son comportement. Paige les retire en la poignardant avec l'athamé, Leo étant prêt à la soigner.

**Conditions, limites, contre-exemples et disponibilité.** Une description centrée sur les victimes tuées ne prouve pas que leur mort est toujours nécessaire : Phoebe survit. Ne pas conclure non plus que chaque simple contact extrait tous les pouvoirs. Cet athamé est distinct d'une lame rituelle ordinaire.

**Description courte proposée pour la carte.** « Athamé capable d'absorber des pouvoirs et de les transmettre à son porteur. Des pouvoirs démoniaques absorbés peuvent altérer son comportement. »

**D’où provient l’information :** [S035 — Power-Sucking Athame](https://charmed.fandom.com/wiki/Power-Sucking_Athame) (IS) ; [S036 — Witch Wars (episode)/Plot](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29/Plot) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM029 — Athamé maudit des pirates

**Repères :** S07E04 — Charrrmed!.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Lame de Black Jack dont une blessure entraîne un vieillissement accéléré. Brenda succombe ; Paige et les pirates sont concernés par la malédiction. L'eau de la Fontaine de Jouvence intervient dans son renversement.

**Conditions, limites, contre-exemples et disponibilité.** Distinguer vieillissement, durée de vie et immortalité des pirates. L'exemple d'un remède ne prouve ni que toute eau agit ni que tout autre moyen serait impossible. Ne pas confondre avec l'athamé de Witch Wars.

**Description courte proposée pour la carte.** « Lame maudite dont les blessures provoquent un vieillissement accéléré. »

**D’où provient l’information :** [S037 — Cursed Athame](https://charmed.fandom.com/wiki/Cursed_Athame) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM030 — Athamé enchanté de Gideon

**Repères :** S06E23 — It's a Bad, Bad, Bad, Bad World, Part 2.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Gideon prépare une lame pour franchir la protection de Wyatt. Dans la confrontation, elle blesse mortellement Chris.

**Conditions, limites, contre-exemples et disponibilité.** La fonction vise la défense de Wyatt dans cette intrigue : ne pas généraliser à toutes les barrières. Aucun pouvoir de vieillissement ou de collecte des pouvoirs n'est établi pour cette lame. L'Ancient Athame des comics est un autre objet.

**Description courte proposée pour la carte.** « Lame enchantée par Gideon pour pénétrer la protection de Wyatt. »

**D’où provient l’information :** [S038 — Athame](https://charmed.fandom.com/wiki/Athame) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM031 — Cœur en étain de Melinda

**Repères :** S01E09 — The Witch Is Back.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Médaillon-prison dans lequel Melinda enferme Matthew. Prue, descendante de Melinda, le libère en ouvrant le cœur. Le nouvel enfermement nécessite les moyens magiques de Melinda ; le cœur repart avec elle.

**Conditions, limites, contre-exemples et disponibilité.** La fermeture matérielle seule ne suffit pas à établir un pouvoir de capture générique. Distinguer l'ouverture par la lignée concernée de toute ouverture par n'importe qui. Disponibilité après l'épisode à justifier.

**Description courte proposée pour la carte.** « Cœur en étain ayant servi de prison magique à Matthew, lié à Melinda Warren et à sa descendance. »

**D’où provient l’information :** [S039 — Pewter Heart](https://charmed.fandom.com/wiki/Pewter_Heart) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM032 — Urne égyptienne maudite

**Repères :** S01E11 — Feats of Clay.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Urne volée associée à une malédiction et à sa gardienne. Les voleurs sont poursuivis ; le geste désintéressé de Clay protégeant Phoebe change son sort. L'urne est destinée à être rendue au musée du Caire.

**Conditions, limites, contre-exemples et disponibilité.** La propriété concerne la malédiction du vol et la cupidité, pas un pouvoir librement accordé au porteur. Ne pas confondre avec l'urne de pouvoirs divins de S05.

**Description courte proposée pour la carte.** « Urne égyptienne protégée par une malédiction liée au vol et à la cupidité, avec une gardienne surnaturelle. »

**D’où provient l’information :** [S040 — Egyptian Urn](https://charmed.fandom.com/wiki/Egyptian_Urn) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM033 — Lanterne de collecte des pouvoirs

**Repères :** S01E10 — Wicca Envy.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Lanterne utilisée pour recueillir les pouvoirs abandonnés par les sœurs dans Wicca Envy. La cession dépend d'une formule ; le rétablissement du Livre avec l'aide de Leo participe à leur retour.

**Conditions, limites, contre-exemples et disponibilité.** La présence de la lanterne ne prouve pas une absorption passive à distance. Réutilisation, capacité maximale et procédure exacte de transfert à un autre porteur restent à vérifier.

**Description courte proposée pour la carte.** « Lanterne servant de réceptacle à des pouvoirs cédés par une formule. »

**D’où provient l’information :** [S041 — Magical Lantern](https://charmed.fandom.com/wiki/Magical_Lantern) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM034 — Bouteilles de génie

**Repères :** S02E22 — Be Careful What You Witch For ; S06E15 — I Dream of Phoebe.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Deux intrigues présentent des bouteilles associées à un génie et à trois vœux. Le génie peut exploiter la formulation du souhait. En S06, libérer Jinny piège Phoebe à sa place ; la fin de S02 présente une liberté devenue vie mortelle sans ce même remplacement final.

**Conditions, limites, contre-exemples et disponibilité.** Conserver les variantes plutôt qu'une règle unique de succession. Possession du contenant, statut du génie et vœux encore disponibles doivent être établis. Aucun souhait formulé par le joueur ne garantit sa réalisation littérale.

**Description courte proposée pour la carte.** « Bouteille liée à un génie qui exauce un nombre limité de vœux. Les conditions de liberté et les conséquences des souhaits dépendent du génie et de son enchantement. »

**D’où provient l’information :** [S042 — Genie Bottle](https://charmed.fandom.com/wiki/Genie_Bottle) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM035 — Boîte de Pandore

**Repères :** S07E18 — Little Box of Horrors.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Boîte contenant les maux que Nina, puis Hope, doivent garder. La charge passe à Hope après la mort de Nina ; l'objet tente sa gardienne et son ouverture libère les maux. La gardienne intervient aussi dans leur rappel.

**Conditions, limites, contre-exemples et disponibilité.** L'affirmation d'indestructibilité par Katya reste une affirmation de personnage, pas une épreuve de tous les moyens. Ne pas confondre avec le Hollow ou le coffre des péchés. Un détenteur quelconque n'acquiert pas automatiquement les fonctions de la gardienne.

**Description courte proposée pour la carte.** « Boîte contenant des maux surnaturels et confiée à une gardienne. Elle exerce une tentation sur celle qui doit la garder fermée. »

**D’où provient l’information :** [S043 — Pandora's Box](https://charmed.fandom.com/wiki/Pandora%27s_Box) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM036 — Coffre des sept péchés capitaux

**Repères :** S03E18 — Sin Francisco ; S08E20 — Gone with the Witches.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Coffre associé à des sphères qui contaminent leurs victimes par les péchés capitaux. L'influence amplifie une disposition jusqu'à des comportements dangereux. Dans Sin Francisco, le désintéressement intervient dans la libération ; l'orgueil de Prue constitue une exception importante.

**Conditions, limites, contre-exemples et disponibilité.** Distinguer le contenant, les sphères et l'action de Lukas. Une recette uniforme fondée sur un seul geste altruiste ferait disparaître l'exception de l'orgueil. La réutilisation en S08 ne dispense pas d'établir le contenu disponible.

**Description courte proposée pour la carte.** « Coffre contenant des manifestations des sept péchés capitaux, capables d'amplifier dangereusement les dispositions des personnes qu'elles contaminent. »

**D’où provient l’information :** [S044 — Seven Deadly Sins](https://charmed.fandom.com/wiki/Seven_Deadly_Sins) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM037 — Baguette de Lukas

**Repères :** S03E18 — Sin Francisco.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Lukas utilise une baguette pour ouvrir un passage vers un lieu de tourment. Prue peut s'en servir pour refermer le passage.

**Conditions, limites, contre-exemples et disponibilité.** Le contre-usage montre qu'elle n'est pas exclusivement manipulable par Lukas. Il ne démontre pas un choix libre de n'importe quelle dimension, époque ou destination. La corruption par les péchés est distincte de cette fonction de passage.

**Description courte proposée pour la carte.** « Baguette employée par Lukas pour ouvrir un passage vers un lieu de tourment et susceptible de le refermer. »

**D’où provient l’information :** [S045 — Sin Francisco](https://charmed.fandom.com/wiki/Sin_Francisco) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM038 — Cage de la Prophétesse

**Repères :** S04E21 — Womb Raider.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Prison permettant une action magique vers l'intérieur tout en empêchant une attaque de sortir. Les sœurs peuvent y employer une protection : ce n'est pas un espace sans aucune magie. Après la confrontation explosive, Piper peut en sortir en forçant la cage.

**Conditions, limites, contre-exemples et disponibilité.** L'indestructibilité annoncée doit être rapprochée de cette sortie après neutralisation. Les résumés ne départagent pas avec certitude le rôle de l'explosion et celui de la mort de la Prophétesse. Ne pas acter que toute mort du propriétaire détruit automatiquement sa cage.

**Description courte proposée pour la carte.** « Cage enchantée qui laisse entrer la magie tout en empêchant des attaques magiques de sortir. Son confinement dépend du maintien de son enchantement. »

**D’où provient l’information :** [S046 — The Seer's Cage](https://charmed.fandom.com/wiki/The_Seer%27s_Cage) (IS) ; [S003 — Womb Raider/Script](https://charmed.fandom.com/wiki/Womb_Raider/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM039 — Cage aquatique de la Crone

**Repères :** S05E20 — Sense and Sense Ability.

**Fiche détaillée pour l’Ange du destin — texte proposé.** La Crone enferme Leo dans un récipient rempli d'eau pour l'empêcher d'avertir les sœurs. Piper brise le contenant et permet sa libération.

**Conditions, limites, contre-exemples et disponibilité.** Cette cage ne partage pas automatiquement les propriétés de celle de la Prophétesse. Le précédent établit la captivité de Leo dans ce dispositif, pas une capture universelle de toute entité par toute eau.

**Description courte proposée pour la carte.** « Prison aquatique utilisée par la Crone pour retenir Leo ; son contenant peut être brisé. »

**D’où provient l’information :** [S047 — Sense and Sense Ability](https://charmed.fandom.com/wiki/Sense_and_Sense_Ability) (IS) ; [S048 — Sense and Sense Ability/Script](https://charmed.fandom.com/wiki/Sense_and_Sense_Ability/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM040 — Urne des pouvoirs divins

**Repères :** S05E22 — Oh My Goddess (1) ; S05E23 — Oh My Goddess (2).

**Fiche détaillée pour l’Ange du destin — texte proposé.** Réceptacle de puissances divines que Leo mobilise pour transformer temporairement les sœurs en déesses lors de la menace des Titans. Il reprend ensuite ces pouvoirs.

**Conditions, limites, contre-exemples et disponibilité.** L'urne conserve des puissances disponibles ; elle n'en fabrique pas à l'infini. Détention du récipient, invocation et choix des bénéficiaires restent distincts. Les effets psychologiques des transformations doivent être suivis selon chaque sœur.

**Description courte proposée pour la carte.** « Urne contenant des puissances divines susceptibles d'être conférées temporairement à des bénéficiaires par un intermédiaire capable de les mobiliser. »

**D’où provient l’information :** [S049 — Urn of Divine Powers](https://charmed.fandom.com/wiki/Urn_of_Divine_Powers) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM041 — Maison de poupées Halliwell

**Repères :** S07E17 — Scry Hard ; S08E13 — Repo Manor.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Réplique du manoir utilisée comme espace de captivité miniature. En S07, Wyatt réduit ses parents et les protège ; en S08, des démons exploitent un dispositif de miniaturisation et des doubles pour détourner les pouvoirs des sœurs. Une communication extérieure est possible via la planchette spirite.

**Conditions, limites, contre-exemples et disponibilité.** La réduction, la protection et le vol de pouvoirs dépendent d'intervenants et de dispositifs précis : la maquette ne les produit pas tous spontanément. Sa destruction et la libération doivent rester liées à l'intrigue concernée, sans fusionner les deux épisodes.

**Description courte proposée pour la carte.** « Réplique miniature du manoir pouvant servir d'espace de confinement lorsqu'elle est associée à une magie de miniaturisation. »

**D’où provient l’information :** [S050 — Doll House](https://charmed.fandom.com/wiki/Doll_House) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM042 — Tableau maudit de Nell

**Repères :** S02E03 — The Painted World.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Tableau contenant une prison pour Malcolm. Une inscription cachée sous la peinture attire à l'intérieur celui qui la lit ; une autre formule permet la sortie. Brûler le tableau menace ceux qui s'y trouvent.

**Conditions, limites, contre-exemples et disponibilité.** Le seul regard porté sur l'image n'est pas établi comme déclencheur. Les captifs et les textes d'entrée et de sortie comptent. Sa destruction finale interdit de supposer l'exemplaire intact après l'épisode sans justification.

**Description courte proposée pour la carte.** « Tableau-prison dont une inscription provoque l'entrée. Sa matière reste liée au sort des personnes enfermées. »

**D’où provient l’information :** [S051 — Cursed Painting](https://charmed.fandom.com/wiki/Cursed_Painting) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM043 — Roman Crossed, Double-Crossed

**Repères :** S07E08 — Charmed Noir.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Roman enchanté de Mullen qui attire des lecteurs dans son intrigue noire. Les pouvoirs actifs y sont neutralisés. Depuis l'extérieur, des personnages peuvent écrire des rebondissements, mais les protagonistes doivent accomplir l'histoire ; un mort n'en ressort pas vivant.

**Conditions, limites, contre-exemples et disponibilité.** Écrire une fin arbitraire ne garantit pas de libérer les captifs. L'achèvement de l'histoire et sa neutralisation affectent la réutilisation du livre. Ce fonctionnement fictionnel n'est pas une règle générale à imposer au jeu.

**Description courte proposée pour la carte.** « Roman enchanté capable d'enfermer des lecteurs dans son histoire, où leurs pouvoirs actifs sont neutralisés. Le récit peut être influencé depuis l'extérieur. »

**D’où provient l’information :** [S052 — Crossed, Double-Crossed](https://charmed.fandom.com/wiki/Crossed%2C_Double-Crossed) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM044 — Appareil photo de Vaklav

**Repères :** S08E07 — The Lost Picture Show.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Appareil qui emprisonne les personnes photographiées dans des images assemblées par Vaklav. Paige peut l'utiliser contre son propriétaire. Le résumé détaillé et la transcription indexée placent la libération de Sam, puis des autres captifs, lorsque Paige l'appelle « Dad », avant la photographie qui piège Vaklav.

**Conditions, limites, contre-exemples et disponibilité.** La formulation de la page de l'objet doit être nuancée par cette chronologie : photographier Vaklav n'est pas la cause de la libération collective décrite. Le lien entre Paige et Sam est invoqué dans le dialogue ; sa généralisation à tout captif n'est pas établie. Aucun visionnage effectué.

**Description courte proposée pour la carte.** « Appareil photo capable de piéger des personnes dans ses images, y compris lorsqu'il est retourné contre son propriétaire. »

**D’où provient l’information :** [S053 — Vaklav's Camera](https://charmed.fandom.com/wiki/Vaklav%27s_Camera) (IS) ; [S054 — The Lost Picture Show/Plot](https://charmed.fandom.com/wiki/The_Lost_Picture_Show/Plot) (IS) ; [S055 — The Lost Picture Show/Script](https://charmed.fandom.com/wiki/The_Lost_Picture_Show/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM045 — Planchette spirite des Halliwell

**Repères :** S01E01 — Something Wicca This Way Comes ; S02E21 — Apocalypse Not ; S08E13 — Repo Manor.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Support de communication surnaturelle qui guide Phoebe vers le grenier au début de la série. Dans Repo Manor, les sœurs miniaturisées peuvent communiquer avec Billie par son intermédiaire : les correspondants ne sont donc pas nécessairement des morts. La planchette peut être endommagée.

**Conditions, limites, contre-exemples et disponibilité.** La réponse reçue ne certifie pas à elle seule l'identité, l'exhaustivité ou l'honnêteté de l'interlocuteur. La disponibilité du support et l'existence d'un interlocuteur doivent être distinguées.

**Description courte proposée pour la carte.** « Planche et curseur permettant une communication surnaturelle, y compris avec des personnes vivantes dans certaines situations magiques. »

**D’où provient l’information :** [S056 — Spirit Board](https://charmed.fandom.com/wiki/Spirit_Board) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM046 — Alliance ensorcelée de Grams

**Repères :** S04E12 — Lost and Bound ; S08E20 — Gone with the Witches.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Bague qui impose à Phoebe un idéal de femme au foyer et modifie son apparence jusque dans une représentation en noir et blanc. Son influence entrave aussi sa volonté de s'en séparer ; le retrait met fin à la transformation.

**Conditions, limites, contre-exemples et disponibilité.** Ce n'est pas la bague à fleur utilisée dans Witchstock. L'effet provient d'un enchantement et du modèle de comportement qu'il véhicule, pas d'une propriété générale de toute alliance familiale.

**Description courte proposée pour la carte.** « Alliance ensorcelée qui pousse sa porteuse à incarner un idéal de femme au foyer et peut transformer son apparence. »

**D’où provient l’information :** [S057 — Grams's Ring](https://charmed.fandom.com/wiki/Grams%27s_Ring) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM047 — Vêtements de Grams renvoyant à leur propriétaire

**Repères :** S06E11 — Witchstock.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Les bottes de Grams portent un enchantement de retour à leur propriétaire : Paige est renvoyée en 1967. Piper utilise les boucles d'oreilles et Phoebe une bague à fleur dans la même intrigue. Penny retire les objets pour permettre leur retour.

**Conditions, limites, contre-exemples et disponibilité.** Trois accessoires nommés, un mécanisme familial regroupé ici : bottes, boucles d'oreilles, bague à fleur. Aucun choix libre d'époque n'est démontré. Ne pas confondre la bague à fleur avec l'alliance de Lost and Bound.

**Description courte proposée pour la carte.** « Accessoires de Grams portant un enchantement de retour à leur propriétaire, capable de ramener leur porteuse à une époque antérieure. »

**D’où provient l’information :** [S058 — Grams's Go-Go Boots](https://charmed.fandom.com/wiki/Grams%27s_Go-Go_Boots) (IS) ; [S059 — Witchstock](https://charmed.fandom.com/wiki/Witchstock) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM048 — Bâton mystique de Bouddha

**Repères :** S08E14 — 12 Angry Zen.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Objet transmis entre gardiens du zodiaque au nouvel an. Il peut projeter la volonté et l'état intérieur de son détenteur, avec des effets même involontaires. Son passage à minuit constitue un moment de vulnérabilité exploité dans l'intrigue.

**Conditions, limites, contre-exemples et disponibilité.** L'effet dépend du porteur et de ses intentions ; ne pas en faire un contrôle parfaitement précis. La garde et la transmission font partie de sa disponibilité. Le nom et la mythologie sont ceux de la fiction, pas une affirmation sur le bouddhisme réel.

**Description courte proposée pour la carte.** « Bâton mystique capable de projeter la volonté de son détenteur, avec des effets qui peuvent dépasser ses intentions conscientes. »

**D’où provient l’information :** [S060 — Buddha's Mystical Staff](https://charmed.fandom.com/wiki/Buddha%27s_Mystical_Staff) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM049 — Ceinture dorée de Gaïa

**Repères :** S08E08 — Battle of the Hexes.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Ceinture associée à Hippolyta. Elle amplifie notamment force, vitesse et capacités offensives de Billie, mais sa puissance menace sa santé et son équilibre mental. Zira, maléfique, est détruite lorsqu'elle essaie de la porter. Un sort intervient pour en débarrasser Billie.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas traiter tous les porteurs comme compatibles ni cet équipement comme sans coût. Les capacités propres de Billie, notamment la projection, ne doivent pas toutes être attribuées à la ceinture.

**Description courte proposée pour la carte.** « Ceinture amplifiant fortement les capacités de sa porteuse, au risque d'épuiser sa vie et sa raison. Elle n'est pas compatible avec tout être. »

**D’où provient l’information :** [S061 — Golden Belt of Gaea](https://charmed.fandom.com/wiki/Golden_Belt_of_Gaea) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM050 — Cristal de Kasimar

**Repères :** S08E08 — Battle of the Hexes.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Sollal évoque un cristal dont les pouvoirs seraient dormants en cherchant l'origine d'une émission magique. Il comprend ensuite qu'il s'agit de la ceinture de Gaïa. Le nom apparaît aussi avec la graphie Kazimar dans une transcription.

**Conditions, limites, contre-exemples et disponibilité.** Mention d'existence, sans démonstration d'un effet du cristal. Ne pas lui attribuer les pouvoirs de la ceinture. Réveil, activation et capacités ne sont pas établis ; conserver comme objet à documenter plutôt que comme ressource fonctionnelle.

**Description courte proposée pour la carte.** « Cristal mentionné comme porteur de pouvoirs dormants. Sa fonction et son activation restent inconnues dans les éléments relevés. »

**D’où provient l’information :** [S062 — Crystal of Kasimar](https://charmed.fandom.com/wiki/Crystal_of_Kasimar) (IS) ; [S063 — Battle of the Hexes/Script](https://charmed.fandom.com/wiki/Battle_of_the_Hexes/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM051 — Cristaux Ronyx

**Repères :** S06E21 — Witch Wars.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Dispositifs de surveillance de Witch Wars : cristaux noirs pour observer, rouges pour projeter les images. Gideon fabrique une page explicative ; pendant que Phoebe lit la prétendue formule, il fait discrètement un geste qui active la projection.

**Conditions, limites, contre-exemples et disponibilité.** L'efficacité de la formule n'est pas démontrée indépendamment de Gideon. Sa présentation d'une origine très ancienne est aussi intéressée : ne pas la valider comme histoire certaine. Portée, enregistrement et accès à des lieux protégés restent à contextualiser.

**Description courte proposée pour la carte.** « Cristaux de surveillance et de projection d'images, employés en réseau dans Witch Wars. »

**D’où provient l’information :** [S064 — Ronyx Crystal](https://charmed.fandom.com/wiki/Ronyx_Crystal) (IS) ; [S065 — Witch Wars (episode)/Script](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29/Script) (IT) ; [S036 — Witch Wars (episode)/Plot](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29/Plot) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM052 — Cristal de paranoïa

**Repères :** S07E12 — Extreme Makeover: World Edition.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Cristal transmis à Kyle par Zankou pour susciter la paranoïa. Le contact permet une contamination qui peut ensuite passer entre les sorcières. La destruction de l'objet met fin à cette influence dans l'épisode.

**Conditions, limites, contre-exemples et disponibilité.** Les récits historiques racontés par Zankou ne sont pas des événements montrés. Ne pas assimiler suspicion ordinaire et contamination, ni fixer un rayon de diffusion. La propagation requiert les contacts et circonstances du précédent.

**Description courte proposée pour la carte.** « Cristal capable d'induire une paranoïa contagieuse par contact dans les conditions décrites pour son usage. »

**D’où provient l’information :** [S066 — Paranoia Crystal](https://charmed.fandom.com/wiki/Paranoia_Crystal) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM053 — Cristal des rêves

**Repères :** S08E19 — The Jung and the Restless.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Billie utilise un cristal pour entrer dans les rêves des sœurs et en ressortir. Plusieurs dormeuses proches peuvent être concernées. L'endormissement profond résulte d'un autre moyen ; le cristal sert au déplacement dans les rêves.

**Conditions, limites, contre-exemples et disponibilité.** La page Dream Leaping annonce un maximum de trois, tandis que Dream Crystal parle de plusieurs personnes proches. Trois cas dans une scène ne prouvent pas un plafond : garder ce point incertain. Aucun contrôle intégral du contenu des rêves établi.

**Description courte proposée pour la carte.** « Cristal permettant d'entrer dans les rêves de dormeurs proches et d'en ressortir. »

**D’où provient l’information :** [S067 — Dream Crystal](https://charmed.fandom.com/wiki/Dream_Crystal) (IS) ; [S068 — Dream Leaping](https://charmed.fandom.com/wiki/Dream_Leaping) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM054 — Cristaux de pyrite d'alarme

**Repères :** S06E11 — Witchstock.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Des cristaux de pyrite sont employés pour signaler une présence maléfique par un effet sonore ou harmonique dans Witchstock.

**Conditions, limites, contre-exemples et disponibilité.** Détection ne signifie pas blocage physique de l'entrée. Préparation et emplacement sont à conserver selon l'épisode ; aucun rayon universel ou identification nominative de l'intrus établi.

**Description courte proposée pour la carte.** « Cristaux employés dans un dispositif d'alarme signalant une présence maléfique. »

**D’où provient l’information :** [S069 — Crystal](https://charmed.fandom.com/wiki/Crystal) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM055 — Cristaux de dissimulation

**Repères :** S06E17 — Hyde School Reunion ; S08E17 — Generation Hex.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Des configurations de cristaux servent à masquer une présence aux recherches magiques. Le retrait d'un élément peut rompre le dispositif.

**Conditions, limites, contre-exemples et disponibilité.** Dissimuler à une recherche ne signifie pas empêcher une entrée, rendre invisible à l'œil ou annuler une attaque. Ces effets dépendent de la configuration et ne sont pas ceux de tout cristal isolé.

**Description courte proposée pour la carte.** « Cristaux disposés pour dissimuler une présence à certaines recherches magiques. »

**D’où provient l’information :** [S070 — Cloaking](https://charmed.fandom.com/wiki/Cloaking) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM056 — Dispositif de cristaux de Burke

**Repères :** S08E10 — Vaya Con Leos.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Burke utilise des cristaux insérés et manipulés dans un dispositif pour immobiliser puis conserver ses victimes comme trophées ; Leo est placé dans cet état. Le dialogue distingue la capacité de torturer de celle de réaliser cette congélation.

**Conditions, limites, contre-exemples et disponibilité.** Les gestes, l'installation et le savoir de Burke comptent. Un cristal transporté seul ne vaut pas machine complète. L'intervention ultérieure de l'Ange du destin sur Leo n'est pas une propriété du dispositif.

**Description courte proposée pour la carte.** « Dispositif à cristaux employé par Burke pour immobiliser et conserver des victimes dans un état de congélation magique. »

**D’où provient l’information :** [S071 — Vaya Con Leos/Script](https://charmed.fandom.com/wiki/Vaya_Con_Leos/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM057 — Boule de cristal de Gideon

**Repères :** S06E21 — Witch Wars.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Gideon observe les sœurs, Leo et Chris dans une boule de cristal à l'École de magie ; un geste met fin à la vision.

**Conditions, limites, contre-exemples et disponibilité.** Cette boule ne se confond pas avec les cristaux Ronyx de la même intrigue. L'usage montré ne prouve pas l'observation de toute personne, de tout lieu ou de toute époque, ni la connaissance des pensées.

**Description courte proposée pour la carte.** « Boule de cristal employée par Gideon pour observer à distance des personnes dans le contexte de l'École de magie. »

**D’où provient l’information :** [S065 — Witch Wars (episode)/Script](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM058 — Lumière de l'amour éternel

**Repères :** S03E16 — Death Takes a Halliwell.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Objet lumineux associé au mariage de Piper et Leo et au symbole de leur amour éternel. Il se brise au cours de l'épisode.

**Conditions, limites, contre-exemples et disponibilité.** Un symbole magique de l'amour ne crée pas nécessairement l'amour et n'en garantit pas le devenir. Aucun pouvoir de contrainte affective établi. L'état brisé doit être pris en compte après ce précédent.

**Description courte proposée pour la carte.** « Lumière magique liée symboliquement à l'amour éternel de Piper et Leo. »

**D’où provient l’information :** [S072 — The Light of Eternal Love](https://charmed.fandom.com/wiki/The_Light_of_Eternal_Love) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM059 — Sablier de Tempus

**Repères :** S01E22 — Déjà Vu All Over Again.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Sablier associé aux reprises temporelles orchestrées par Tempus lors des échecs de Rodriguez. Le déclenchement relève de leur dispositif et de l'action du démon.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas attribuer au seul sablier un nombre illimité de retours utilisables par n'importe quel porteur. Déclencheur, souvenirs conservés et durée du cycle doivent rester ceux de l'intrigue étudiée.

**Description courte proposée pour la carte.** « Sablier associé à la magie de Tempus et à ses cycles de retour dans le temps. »

**D’où provient l’information :** [S073 — Hourglass](https://charmed.fandom.com/wiki/Hourglass) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM060 — Miroir entre les deux mondes

**Repères :** S06E22 — It's a Bad, Bad, Bad, Bad World, Part 1 ; S06E23 — It's a Bad, Bad, Bad, Bad World, Part 2.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Miroir permettant des échanges entre les versions de Gideon et de son monde opposé. Les interactions dépassent l'image seule, notamment dans les échanges observés. Les Leo détruisent le lien des miroirs.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas assimiler automatiquement ce miroir à tous les portails de voyage des épisodes. Il relie cette paire de mondes ; aucun sélecteur universel de dimension établi. Sa destruction affecte sa disponibilité.

**Description courte proposée pour la carte.** « Miroir mettant en relation deux mondes opposés et permettant des échanges entre leurs correspondants. »

**D’où provient l’information :** [S074 — Mirror Between Worlds](https://charmed.fandom.com/wiki/Mirror_Between_Worlds) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM061 — Miroir de Kali

**Repères :** S01E07 — The Fourth Sister.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Kali apparaît par un miroir et agit sur Aviva, jusqu'à la possession. Briser le miroir intervient dans son bannissement.

**Conditions, limites, contre-exemples et disponibilité.** Les pouvoirs de Kali ne deviennent pas tous des fonctions du miroir. Ne pas confondre cet objet avec le miroir de conte ou celui des mondes opposés. Un miroir ordinaire peut interagir avec la magie sans être cet artefact.

**Description courte proposée pour la carte.** « Miroir servant de point de contact à Kali pour apparaître et agir sur une personne. »

**D’où provient l’information :** [S075 — Mirror](https://charmed.fandom.com/wiki/Mirror) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM062 — Miroir magique des contes

**Repères :** S05E03 — Happily Ever After.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Miroir-prison de la sorcière des contes. Sa destruction permet sa libération ; elle le rétablit et y enferme l'apprenti. Dans cette configuration, il sert de moyen d'interrogation et de vision. La mort de la sorcière libère l'apprenti.

**Conditions, limites, contre-exemples et disponibilité.** Les fonctions dépendent de l'enchantement et de la personne enfermée. Ne pas en faire une réponse omnisciente et autonome à toute question. La libération par bris peut aussi libérer un danger.

**Description courte proposée pour la carte.** « Miroir enchanté pouvant emprisonner un être et servir de moyen de vision ou d'interrogation dans la magie des contes. »

**D’où provient l’information :** [S076 — Magic Mirror](https://charmed.fandom.com/wiki/Magic_Mirror) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM063 — Livre magique des contes

**Repères :** S05E03 — Happily Ever After.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Livre original gardé avec les objets des contes, qui permet d'en mobiliser des personnages. Une copie ordinaire des Halliwell intervient aussi comme support de passage en combinaison avec la cape rouge et une magie appropriée.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas assimiler l'original magique à tout exemplaire imprimé des mêmes histoires. Les pouvoirs des personnages appelés ne sont pas ceux du papier seul. Distinguer appel et contrôle durable du personnage.

**Description courte proposée pour la carte.** « Livre magique lié aux personnages des contes et à leur manifestation. Il se distingue des copies ordinaires de ces histoires. »

**D’où provient l’information :** [S077 — Fairy Tale Book](https://charmed.fandom.com/wiki/Fairy_Tale_Book) (IS) ; [S078 — Happily Ever After](https://charmed.fandom.com/wiki/Happily_Ever_After) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM064 — Pomme empoisonnée des contes

**Repères :** S05E03 — Happily Ever After.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Pomme d'apparence attirante qui place Paige dans un état évoquant la mort de Blanche-Neige après une bouchée. La guérison ordinaire tentée ne suffit pas ; la fin de l'enchantement de la sorcière la libère.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas annoncer le baiser comme seule solution : le récit emploie une autre résolution. Une résistance au soin essayé n'établit pas une impossibilité de tout soin magique. L'effet relève de cette pomme ensorcelée.

**Description courte proposée pour la carte.** « Pomme ensorcelée dont une bouchée peut plonger sa victime dans un état de mort apparente résistant aux soins essayés dans l'épisode. »

**D’où provient l’information :** [S079 — Poisoned Apple](https://charmed.fandom.com/wiki/Poisoned_Apple) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM065 — Pantoufles de verre

**Repères :** S05E03 — Happily Ever After.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Les pantoufles transforment Phoebe en figure de Cendrillon et entraînent ses pas vers le bal. La disparition de la dernière chaussure dépend de la résolution affective de son histoire avec Cole.

**Conditions, limites, contre-exemples et disponibilité.** La contrainte sur les pas ne signifie pas une suppression de toute conscience. Ne pas imposer une relation amoureuse comme condition universelle de délivrance : le pardon et le contexte comptent.

**Description courte proposée pour la carte.** « Pantoufles enchantées qui transforment leur porteuse en Cendrillon et orientent ses pas selon la magie du conte. »

**D’où provient l’information :** [S080 — Glass Slippers](https://charmed.fandom.com/wiki/Glass_Slippers) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM066 — Cape rouge des contes

**Repères :** S05E03 — Happily Ever After.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Cape liée au Petit Chaperon rouge. Elle peut servir avec le livre de contes à un passage vers l'espace magique de l'intrigue. Des cheveux associés au dispositif permettent aussi un leurre pour une recherche magique.

**Conditions, limites, contre-exemples et disponibilité.** Les effets proviennent de la combinaison des éléments et de la magie employée ; la cape seule n'est pas un portail autonome établi. Un lien de localisation peut conduire vers un leurre.

**Description courte proposée pour la carte.** « Cape enchantée liée au Petit Chaperon rouge, utilisable avec le livre de contes dans une magie de passage. »

**D’où provient l’information :** [S081 — Red Cloak](https://charmed.fandom.com/wiki/Red_Cloak) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM067 — Carrosse-citrouille

**Repères :** S05E03 — Happily Ever After.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Phoebe est enfermée dans un carrosse qui redevient citrouille à minuit dans l'intrigue de Cendrillon.

**Conditions, limites, contre-exemples et disponibilité.** Cette transformation programmée appartient au conte activé. Ne pas attribuer une téléportation ou un transport entre dimensions au véhicule sans scène supplémentaire. Il ne s'agit pas de n'importe quelle citrouille.

**Description courte proposée pour la carte.** « Carrosse enchanté du conte de Cendrillon, qui reprend sa forme de citrouille à minuit. »

**D’où provient l’information :** [S082 — Phoebe Halliwell/Magical Transformations](https://charmed.fandom.com/wiki/Phoebe_Halliwell/Magical_Transformations) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM068 — Bâton de leprechaun — shillelagh

**Repères :** S05E17 — Lucky Charmed ; S06E18 — Spin City ; S08E20 — Gone with the Witches.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Bâton employé par les leprechauns dans leur magie de chance et de déplacement par arc-en-ciel. Paige reçoit celui de Seamus ; ce lien permet d'appeler Riley. Les leprechauns peuvent reprendre les objets qu'ils ont confiés.

**Conditions, limites, contre-exemples et disponibilité.** Le don, la révocation et les capacités du détenteur comptent. Ne pas transformer une influence sur la chance en certitude de résultat. Exclure les développements des comics liés à d'autres armes.

**Description courte proposée pour la carte.** « Bâton de leprechaun lié à la magie de chance et aux déplacements par arc-en-ciel ; un exemplaire confié peut aussi servir de lien d'appel. »

**D’où provient l’information :** [S083 — Shillelagh](https://charmed.fandom.com/wiki/Shillelagh) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM069 — Baguette de capture des phantasmes

**Repères :** S06E19 — Crimes and Witch-Demeanors.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Paige et Chris utilisent une baguette pour capturer un phantasme après son expulsion par une potion.

**Conditions, limites, contre-exemples et disponibilité.** Séparer l'expulsion de l'être possédé et la capture de l'entité libérée. La baguette n'est pas démontrée comme exorcisme autonome ni comme prison de toute espèce d'esprit.

**Description courte proposée pour la carte.** « Baguette utilisée pour capturer un phantasme déjà expulsé de son hôte. »

**D’où provient l’information :** [S084 — Crimes and Witch-Demeanors](https://charmed.fandom.com/wiki/Crimes_and_Witch-Demeanors) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM070 — Poussière du marchand de sable

**Repères :** S05E14 — Sand Francisco Dreamin'.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Poudre employée auprès des dormeurs pour leur activité onirique. Un excès de poussière provoque la manifestation de figures issues des rêves dans Sand Francisco Dreamin'.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas assimiler production de rêves, endormissement et maîtrise de leur contenu. Le surdosage n'est pas une recette sûre de création d'un être choisi. Quantités exactes non établies.

**Description courte proposée pour la carte.** « Poussière liée aux rêves des dormeurs, dont un excès peut faire apparaître des figures oniriques. »

**D’où provient l’information :** [S085 — Dream Dust](https://charmed.fandom.com/wiki/Dream_Dust) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM071 — Poussière de fée

**Repères :** S03E03 — Once Upon a Time ; S05E22 — Oh My Goddess (1) ; S05E23 — Oh My Goddess (2).

**Fiche détaillée pour l’Ange du destin — texte proposé.** La poussière de fée intervient dans l'accès à une perception enfantine, dans une combinaison destinée à renverser une pétrification et dans la dissimulation d'Êtres de lumière supérieurs lors de la menace des Titans.

**Conditions, limites, contre-exemples et disponibilité.** Les usages reposent sur des contextes et parfois des ingrédients associés. Ne pas attribuer à la poudre seule toutes les propriétés de la formule contre la pétrification. Les quantités, la réserve et le renouvellement restent à définir selon la provenance.

**Description courte proposée pour la carte.** « Poussière féerique employée dans plusieurs magies de perception, de dissimulation ou de transformation, selon sa préparation et les éléments associés. »

**D’où provient l’information :** [S086 — Fairy](https://charmed.fandom.com/wiki/Fairy) (IS) ; [S070 — Cloaking](https://charmed.fandom.com/wiki/Cloaking) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM072 — Fiole de capture d'âme

**Repères :** S06E01 — Valhalley of the Dolls, Part 1 ; S06E02 — Valhalley of the Dolls, Part 2.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Une fiole retient l'âme de Darryl séparée de son corps pendant l'opération liée à Valhalla. La séparation dépend d'une potion et le corps reste vivant.

**Conditions, limites, contre-exemples et disponibilité.** Distinguer induction de l'état, séparation de l'âme, conservation dans la fiole et réunification avec le corps. Une fiole vide ne provoque pas à elle seule une séparation d'âme. Aucun délai universel de conservation établi.

**Description courte proposée pour la carte.** « Fiole employée pour conserver une âme préalablement séparée d'un corps vivant. »

**D’où provient l’information :** [S087 — Coma Induction Potion](https://charmed.fandom.com/wiki/Coma_Induction_Potion) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM073 — Scarabées égyptiens de transfert

**Repères :** S05E10 — Y Tu Mummy También.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Scarabées placés sur les corps dans le rite de Jeric destiné au transfert d'Isis. Les objets fonctionnent au sein d'une procédure de transfert, avec une formule.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas confondre conservation corporelle, momification et transfert d'identité. Les deux corps, l'identité transférée et le rite sont nécessaires à l'analyse ; les scarabées seuls ne confèrent pas l'immortalité.

**Description courte proposée pour la carte.** « Scarabées rituels utilisés par Jeric sur les corps impliqués dans un transfert d'identité. »

**D’où provient l’information :** [S088 — Egyptian Scarabs](https://charmed.fandom.com/wiki/Egyptian_Scarabs) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM074 — Cercle de vérité du Tribunal

**Repères :** S06E19 — Crimes and Witch-Demeanors.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Dispositif du Tribunal servant à projeter des souvenirs ou événements examinés durant le procès des sœurs.

**Conditions, limites, contre-exemples et disponibilité.** Un dispositif judiciaire ancré dans son lieu n'est pas automatiquement une carte transportable. La restitution d'un souvenir ne prouve pas la connaissance de tout événement absent de celui-ci. Activation et personnes impliquées à conserver.

**Description courte proposée pour la carte.** « Dispositif du Tribunal permettant de présenter des souvenirs sous forme de projections lors d'un examen. »

**D’où provient l’information :** [S089 — The Circle of Truth](https://charmed.fandom.com/wiki/The_Circle_of_Truth) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM075 — Liste de la Mort

**Repères :** S07E05 — Styx Feet Under.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Liste des personnes que l'Ange de la Mort doit recueillir ; Piper y accède pendant son rôle temporaire. Son contenu et ses priorités évoluent avec la situation.

**Conditions, limites, contre-exemples et disponibilité.** Ne pas inverser la causalité : écrire un nom ne constitue pas ici un pouvoir de tuer et l'effacer ne démontre pas une résurrection. Accès au document et fonction d'Ange de la Mort restent distincts.

**Description courte proposée pour la carte.** « Liste évolutive liée aux personnes que l'Ange de la Mort doit recueillir. »

**D’où provient l’information :** [S090 — Death's List](https://charmed.fandom.com/wiki/Death%27s_List) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM076 — Balai enchanté de Phoebe

**Repères :** S03E04 — All Halliwell's Eve.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Dans le contexte de 1670 et de Samhain, Phoebe enchante un balai et l'emploie notamment contre des protections ; l'épisode comporte aussi son usage comme moyen de vol.

**Conditions, limites, contre-exemples et disponibilité.** Le support ordinaire devient magique par cette préparation. Ne pas déduire que tous les balais du manoir volent ou neutralisent toute barrière. Le contexte historique et rituel doit être documenté pour une réutilisation.

**Description courte proposée pour la carte.** « Balai enchanté pouvant servir de support de déplacement et d'action magique dans le contexte de Samhain. »

**D’où provient l’information :** [S026 — Broomstick](https://charmed.fandom.com/wiki/Broomstick) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM077 — Grimoire de Tuatha

**Repères :** S02E06 — That Old Black Magic.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Livre de magie de Tuatha contenant des formules, dont une action relative à la suppression des pouvoirs.

**Conditions, limites, contre-exemples et disponibilité.** Le contenu consultable ne s'exécute pas automatiquement. Aucune défense autonome analogue au Grimoire de la Source n'est établie. Le devenir de l'exemplaire après l'épisode reste à préciser.

**Description courte proposée pour la carte.** « Grimoire de Tuatha contenant des formules magiques, notamment liées aux pouvoirs. »

**D’où provient l’information :** [S091 — Tuatha's Grimoire](https://charmed.fandom.com/wiki/Tuatha%27s_Grimoire) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM078 — Grimoire des Phoenix

**Repères :** S06E10 — Chris-Crossed.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Livre lié aux sorcières Phoenix, dissimulé puis appelé dans l'intrigue de Bianca et de sa mère. Une formule d'inhibition des pouvoirs intervient dans son contenu.

**Conditions, limites, contre-exemples et disponibilité.** L'objet de tournage réutilisé depuis le grimoire de Tuatha ne prouve pas qu'il s'agit du même livre dans l'histoire. Possession du livre et aptitude à réaliser sa formule sont distinctes.

**Description courte proposée pour la carte.** « Grimoire des sorcières Phoenix, contenant notamment une formule liée à l'inhibition des pouvoirs. »

**D’où provient l’information :** [S092 — Phoenix Grimoire](https://charmed.fandom.com/wiki/Phoenix_Grimoire) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM079 — Camion du marchand de glaces

**Repères :** S03E10 — We All Scream for Ice Cream.

**Fiche détaillée pour l’Ange du destin — texte proposé.** Véhicule dont la mélodie attire les enfants démoniaques vers un espace intérieur où le Néant les poursuit. Prue et Phoebe y sont aussi entraînées. Leurs pouvoirs actifs ne fonctionnent pas, mais Phoebe a une prémonition. Victor peut ouvrir un accès qui résiste à Prue.

**Conditions, limites, contre-exemples et disponibilité.** Le Néant ne distingue pas le Bien du Mal. Ne pas dire que tous les pouvoirs, y compris passifs, sont annulés. Le camion, son composant musical, son opérateur et l'espace intérieur sont distincts ; ce n'est pas un véhicule de téléportation libre.

**Description courte proposée pour la carte.** « Camion magique attirant des enfants démoniaques vers un espace de captivité dangereux, susceptible d'engloutir aussi d'autres personnes. »

**D’où provient l’information :** [S093 — We All Scream for Ice Cream/Plot](https://charmed.fandom.com/wiki/We_All_Scream_for_Ice_Cream/Plot) (IS) ; [S094 — We All Scream for Ice Cream/Script](https://charmed.fandom.com/wiki/We_All_Scream_for_Ice_Cream/Script) (IT). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

### OM080 — Sceptre de moralité de l'Ordre

**Repères :** S06E12 — Prince Charmed.

**Fiche détaillée pour l’Ange du destin — texte proposé.** L'Ordre emploie un sceptre pour faire basculer Wyatt vers le Mal ; plusieurs tentatives précèdent le résultat. Piper l'utilise ensuite pour rétablir son orientation bénéfique.

**Conditions, limites, contre-exemples et disponibilité.** Ce changement ne prouve pas un contrôle détaillé de toutes les pensées ou de toutes les décisions. Le nombre de tentatives observé n'est pas un coût fixe applicable à toute cible. La résistance et les conditions d'usage contre d'autres êtres restent à établir.

**Description courte proposée pour la carte.** « Sceptre capable de modifier l'orientation morale d'un être vers le Bien ou le Mal, avec un effet réversible dans le cas montré. »

**D’où provient l’information :** [S095 — Morality Scepter](https://charmed.fandom.com/wiki/Morality_Scepter) (IS). Repères exploités : les scènes et propriétés résumées ci-dessus, sans minutage vérifié.

**Provenance de l’ajout :** Proposition d'ajout issue des sources web citées. Pas de fiche autonome correspondante dans le lot intégré objets:1–8 ni dans les sept fiches objets du premier dossier de recherche ; ce constat ne prétend pas exclure toute mention ailleurs dans le projet.

## 6. Registre des sources et exclusions

Recherches effectuées le 8 septembre 2026. Les liens ci-dessous identifient les pages dont les extraits ont été exploités ; ils ne promettent pas que leur ouverture intégrale sera possible. Les identifiants des fiches forment la correspondance source → affirmations. Les formulations sont des synthèses originales, pas des copies intégrales du wiki.

| ID | Page précise | Niveau | Fiches concernées |
|---|---|---|---|
| S001 | [Book of Shadows](https://charmed.fandom.com/wiki/Book_of_Shadows) | extrait_indexe_secondaire | OM001 |
| S002 | [The Grimoire](https://charmed.fandom.com/wiki/The_Grimoire) | extrait_indexe_secondaire | OM002 |
| S003 | [Womb Raider/Script](https://charmed.fandom.com/wiki/Womb_Raider/Script) | extrait_indexe_transcription_non_officielle | OM002, OM038 |
| S004 | [Crystal Cage](https://charmed.fandom.com/wiki/Crystal_Cage) | extrait_indexe_secondaire | OM003 |
| S005 | [Sight Unseen/Script](https://charmed.fandom.com/wiki/Sight_Unseen/Script) | extrait_indexe_transcription_non_officielle | OM003 |
| S006 | [Scry Hard](https://charmed.fandom.com/wiki/Scry_Hard) | extrait_indexe_secondaire | OM004 |
| S007 | [Witch Wars (episode)](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29) | extrait_indexe_secondaire | OM004 |
| S008 | [Cupid Ring](https://charmed.fandom.com/wiki/Cupid_Ring) | extrait_indexe_secondaire | OM005 |
| S009 | [Hollow Box](https://charmed.fandom.com/wiki/Hollow_Box) | extrait_indexe_secondaire | OM006 |
| S010 | [Ring of Inspiration](https://charmed.fandom.com/wiki/Ring_of_Inspiration) | extrait_indexe_secondaire | OM007 |
| S011 | [Darklighter Crossbow](https://charmed.fandom.com/wiki/Darklighter_Crossbow) | extrait_indexe_secondaire | OM008 |
| S012 | [Blinded by the Whitelighter/Script](https://charmed.fandom.com/wiki/Blinded_by_the_Whitelighter/Script) | extrait_indexe_transcription_non_officielle | OM008 |
| S013 | [Siren Song/Script](https://charmed.fandom.com/wiki/Siren_Song/Script) | extrait_indexe_transcription_non_officielle | OM008 |
| S014 | [Protection Ring](https://charmed.fandom.com/wiki/Protection_Ring) | extrait_indexe_secondaire | OM009 |
| S015 | [Ring of Immunity](https://charmed.fandom.com/wiki/Ring_of_Immunity) | extrait_indexe_secondaire | OM010 |
| S016 | [Protection Amulet](https://charmed.fandom.com/wiki/Protection_Amulet) | extrait_indexe_secondaire | OM011 |
| S017 | [Magical Amulets](https://charmed.fandom.com/wiki/Magical_Amulets) | extrait_indexe_secondaire | OM012 |
| S018 | [Witch Hunter Amulets](https://charmed.fandom.com/wiki/Witch_Hunter_Amulets) | extrait_indexe_secondaire | OM013 |
| S019 | [Eye of Aghbar](https://charmed.fandom.com/wiki/Eye_of_Aghbar) | extrait_indexe_secondaire | OM014 |
| S020 | [The Evil Eye](https://charmed.fandom.com/wiki/The_Evil_Eye) | extrait_indexe_secondaire | OM015 |
| S021 | [Sarpedon's Amulet](https://charmed.fandom.com/wiki/Sarpedon%27s_Amulet) | extrait_indexe_secondaire | OM016 |
| S022 | [Valkyrie Pendant](https://charmed.fandom.com/wiki/Valkyrie_Pendant) | extrait_indexe_secondaire | OM017 |
| S023 | [Monkey Totem](https://charmed.fandom.com/wiki/Monkey_Totem) | extrait_indexe_secondaire | OM018 |
| S024 | [Chinese Talisman](https://charmed.fandom.com/wiki/Chinese_Talisman) | extrait_indexe_secondaire | OM019 |
| S025 | [All Halliwell's Eve](https://charmed.fandom.com/wiki/All_Halliwell%27s_Eve) | extrait_indexe_secondaire | OM020 |
| S026 | [Broomstick](https://charmed.fandom.com/wiki/Broomstick) | extrait_indexe_secondaire | OM020, OM076 |
| S027 | [Witch Doctor's Talisman](https://charmed.fandom.com/wiki/Witch_Doctor%27s_Talisman) | extrait_indexe_secondaire | OM021 |
| S028 | [Tuatha's Wand](https://charmed.fandom.com/wiki/Tuatha%27s_Wand) | extrait_indexe_secondaire | OM022 |
| S029 | [Gammill](https://charmed.fandom.com/wiki/Gammill) | extrait_indexe_secondaire | OM023 |
| S030 | [Size Matters/Plot](https://charmed.fandom.com/wiki/Size_Matters/Plot) | extrait_indexe_secondaire | OM023 |
| S031 | [Rathmere's Wand](https://charmed.fandom.com/wiki/Rathmere%27s_Wand) | extrait_indexe_secondaire | OM024 |
| S032 | [Excalibur](https://charmed.fandom.com/wiki/Excalibur) | extrait_indexe_secondaire | OM025 |
| S033 | [Dragon Blade](https://charmed.fandom.com/wiki/Dragon_Blade) | extrait_indexe_secondaire | OM026 |
| S034 | [Crystal Sword](https://charmed.fandom.com/wiki/Crystal_Sword) | extrait_indexe_secondaire | OM027 |
| S035 | [Power-Sucking Athame](https://charmed.fandom.com/wiki/Power-Sucking_Athame) | extrait_indexe_secondaire | OM028 |
| S036 | [Witch Wars (episode)/Plot](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29/Plot) | extrait_indexe_secondaire | OM028, OM051 |
| S037 | [Cursed Athame](https://charmed.fandom.com/wiki/Cursed_Athame) | extrait_indexe_secondaire | OM029 |
| S038 | [Athame](https://charmed.fandom.com/wiki/Athame) | extrait_indexe_secondaire | OM030 |
| S039 | [Pewter Heart](https://charmed.fandom.com/wiki/Pewter_Heart) | extrait_indexe_secondaire | OM031 |
| S040 | [Egyptian Urn](https://charmed.fandom.com/wiki/Egyptian_Urn) | extrait_indexe_secondaire | OM032 |
| S041 | [Magical Lantern](https://charmed.fandom.com/wiki/Magical_Lantern) | extrait_indexe_secondaire | OM033 |
| S042 | [Genie Bottle](https://charmed.fandom.com/wiki/Genie_Bottle) | extrait_indexe_secondaire | OM034 |
| S043 | [Pandora's Box](https://charmed.fandom.com/wiki/Pandora%27s_Box) | extrait_indexe_secondaire | OM035 |
| S044 | [Seven Deadly Sins](https://charmed.fandom.com/wiki/Seven_Deadly_Sins) | extrait_indexe_secondaire | OM036 |
| S045 | [Sin Francisco](https://charmed.fandom.com/wiki/Sin_Francisco) | extrait_indexe_secondaire | OM037 |
| S046 | [The Seer's Cage](https://charmed.fandom.com/wiki/The_Seer%27s_Cage) | extrait_indexe_secondaire | OM038 |
| S047 | [Sense and Sense Ability](https://charmed.fandom.com/wiki/Sense_and_Sense_Ability) | extrait_indexe_secondaire | OM039 |
| S048 | [Sense and Sense Ability/Script](https://charmed.fandom.com/wiki/Sense_and_Sense_Ability/Script) | extrait_indexe_transcription_non_officielle | OM039 |
| S049 | [Urn of Divine Powers](https://charmed.fandom.com/wiki/Urn_of_Divine_Powers) | extrait_indexe_secondaire | OM040 |
| S050 | [Doll House](https://charmed.fandom.com/wiki/Doll_House) | extrait_indexe_secondaire | OM041 |
| S051 | [Cursed Painting](https://charmed.fandom.com/wiki/Cursed_Painting) | extrait_indexe_secondaire | OM042 |
| S052 | [Crossed, Double-Crossed](https://charmed.fandom.com/wiki/Crossed%2C_Double-Crossed) | extrait_indexe_secondaire | OM043 |
| S053 | [Vaklav's Camera](https://charmed.fandom.com/wiki/Vaklav%27s_Camera) | extrait_indexe_secondaire | OM044 |
| S054 | [The Lost Picture Show/Plot](https://charmed.fandom.com/wiki/The_Lost_Picture_Show/Plot) | extrait_indexe_secondaire | OM044 |
| S055 | [The Lost Picture Show/Script](https://charmed.fandom.com/wiki/The_Lost_Picture_Show/Script) | extrait_indexe_transcription_non_officielle | OM044 |
| S056 | [Spirit Board](https://charmed.fandom.com/wiki/Spirit_Board) | extrait_indexe_secondaire | OM045 |
| S057 | [Grams's Ring](https://charmed.fandom.com/wiki/Grams%27s_Ring) | extrait_indexe_secondaire | OM046 |
| S058 | [Grams's Go-Go Boots](https://charmed.fandom.com/wiki/Grams%27s_Go-Go_Boots) | extrait_indexe_secondaire | OM047 |
| S059 | [Witchstock](https://charmed.fandom.com/wiki/Witchstock) | extrait_indexe_secondaire | OM047 |
| S060 | [Buddha's Mystical Staff](https://charmed.fandom.com/wiki/Buddha%27s_Mystical_Staff) | extrait_indexe_secondaire | OM048 |
| S061 | [Golden Belt of Gaea](https://charmed.fandom.com/wiki/Golden_Belt_of_Gaea) | extrait_indexe_secondaire | OM049 |
| S062 | [Crystal of Kasimar](https://charmed.fandom.com/wiki/Crystal_of_Kasimar) | extrait_indexe_secondaire | OM050 |
| S063 | [Battle of the Hexes/Script](https://charmed.fandom.com/wiki/Battle_of_the_Hexes/Script) | extrait_indexe_transcription_non_officielle | OM050 |
| S064 | [Ronyx Crystal](https://charmed.fandom.com/wiki/Ronyx_Crystal) | extrait_indexe_secondaire | OM051 |
| S065 | [Witch Wars (episode)/Script](https://charmed.fandom.com/wiki/Witch_Wars_%28episode%29/Script) | extrait_indexe_transcription_non_officielle | OM051, OM057 |
| S066 | [Paranoia Crystal](https://charmed.fandom.com/wiki/Paranoia_Crystal) | extrait_indexe_secondaire | OM052 |
| S067 | [Dream Crystal](https://charmed.fandom.com/wiki/Dream_Crystal) | extrait_indexe_secondaire | OM053 |
| S068 | [Dream Leaping](https://charmed.fandom.com/wiki/Dream_Leaping) | extrait_indexe_secondaire | OM053 |
| S069 | [Crystal](https://charmed.fandom.com/wiki/Crystal) | extrait_indexe_secondaire | OM054 |
| S070 | [Cloaking](https://charmed.fandom.com/wiki/Cloaking) | extrait_indexe_secondaire | OM055, OM071 |
| S071 | [Vaya Con Leos/Script](https://charmed.fandom.com/wiki/Vaya_Con_Leos/Script) | extrait_indexe_transcription_non_officielle | OM056 |
| S072 | [The Light of Eternal Love](https://charmed.fandom.com/wiki/The_Light_of_Eternal_Love) | extrait_indexe_secondaire | OM058 |
| S073 | [Hourglass](https://charmed.fandom.com/wiki/Hourglass) | extrait_indexe_secondaire | OM059 |
| S074 | [Mirror Between Worlds](https://charmed.fandom.com/wiki/Mirror_Between_Worlds) | extrait_indexe_secondaire | OM060 |
| S075 | [Mirror](https://charmed.fandom.com/wiki/Mirror) | extrait_indexe_secondaire | OM061 |
| S076 | [Magic Mirror](https://charmed.fandom.com/wiki/Magic_Mirror) | extrait_indexe_secondaire | OM062 |
| S077 | [Fairy Tale Book](https://charmed.fandom.com/wiki/Fairy_Tale_Book) | extrait_indexe_secondaire | OM063 |
| S078 | [Happily Ever After](https://charmed.fandom.com/wiki/Happily_Ever_After) | extrait_indexe_secondaire | OM063 |
| S079 | [Poisoned Apple](https://charmed.fandom.com/wiki/Poisoned_Apple) | extrait_indexe_secondaire | OM064 |
| S080 | [Glass Slippers](https://charmed.fandom.com/wiki/Glass_Slippers) | extrait_indexe_secondaire | OM065 |
| S081 | [Red Cloak](https://charmed.fandom.com/wiki/Red_Cloak) | extrait_indexe_secondaire | OM066 |
| S082 | [Phoebe Halliwell/Magical Transformations](https://charmed.fandom.com/wiki/Phoebe_Halliwell/Magical_Transformations) | extrait_indexe_secondaire | OM067 |
| S083 | [Shillelagh](https://charmed.fandom.com/wiki/Shillelagh) | extrait_indexe_secondaire | OM068 |
| S084 | [Crimes and Witch-Demeanors](https://charmed.fandom.com/wiki/Crimes_and_Witch-Demeanors) | extrait_indexe_secondaire | OM069 |
| S085 | [Dream Dust](https://charmed.fandom.com/wiki/Dream_Dust) | extrait_indexe_secondaire | OM070 |
| S086 | [Fairy](https://charmed.fandom.com/wiki/Fairy) | extrait_indexe_secondaire | OM071 |
| S087 | [Coma Induction Potion](https://charmed.fandom.com/wiki/Coma_Induction_Potion) | extrait_indexe_secondaire | OM072 |
| S088 | [Egyptian Scarabs](https://charmed.fandom.com/wiki/Egyptian_Scarabs) | extrait_indexe_secondaire | OM073 |
| S089 | [The Circle of Truth](https://charmed.fandom.com/wiki/The_Circle_of_Truth) | extrait_indexe_secondaire | OM074 |
| S090 | [Death's List](https://charmed.fandom.com/wiki/Death%27s_List) | extrait_indexe_secondaire | OM075 |
| S091 | [Tuatha's Grimoire](https://charmed.fandom.com/wiki/Tuatha%27s_Grimoire) | extrait_indexe_secondaire | OM077 |
| S092 | [Phoenix Grimoire](https://charmed.fandom.com/wiki/Phoenix_Grimoire) | extrait_indexe_secondaire | OM078 |
| S093 | [We All Scream for Ice Cream/Plot](https://charmed.fandom.com/wiki/We_All_Scream_for_Ice_Cream/Plot) | extrait_indexe_secondaire | OM079 |
| S094 | [We All Scream for Ice Cream/Script](https://charmed.fandom.com/wiki/We_All_Scream_for_Ice_Cream/Script) | extrait_indexe_transcription_non_officielle | OM079 |
| S095 | [Morality Scepter](https://charmed.fandom.com/wiki/Morality_Scepter) | extrait_indexe_secondaire | OM080 |
| S096 | [Charmed and Dangerous — dialogues](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed) | transcription_non_officielle_page_consultee | OM003, OM006 |

Sources de repérage : [Artifacts](https://charmed.fandom.com/wiki/Category%3AArtifacts) et [Books](https://charmed.fandom.com/wiki/Category%3ABooks), extraits indexés. Elles servent à trouver des candidats, pas à établir leurs pouvoirs. L'[index TVmaze](https://api.tvmaze.com/shows/506/episodes), déjà conservé localement, sert uniquement à la numérotation et aux titres.

### Objets repérés mais sans fiche fonctionnelle retenue ici

| Nom ou famille repéré | Traitement et raison | Source de repérage, extrait indexé |
|---|---|---|
| Ruby Slippers, hache du bûcheron, rouet des contes | Accessoires repérés dans l'univers de S05E03 ; ne pas importer leurs pouvoirs depuis Le Magicien d'Oz ou un autre conte sans scène Charmed. À préciser par la séquence de la forteresse. | [Fairy Tales](https://charmed.fandom.com/wiki/Fairy_Tales) |
| Chaudron ordinaire et outils d'autel | Supports de préparation ; aucune magie intrinsèque générale établie. Ils peuvent rester des ressources matérielles cohérentes sans être des artefacts autonomes. | [Cauldron](https://charmed.fandom.com/wiki/Cauldron) |
| Miroir à main contre Javna | Interaction réfléchissante en S01E02, pas preuve que le miroir soit enchanté. Garder l'usage contextuel séparé d'un pouvoir intrinsèque. | [Mirror](https://charmed.fandom.com/wiki/Mirror) |
| Akashic Records, Alchemist's Tools, Auger Shell | Noms rencontrés lors du repérage ; qualification télévisuelle et propriétés non établies dans cette contribution. Pas de classement arbitraire comme impossibles ou comme romans. | [Artifacts](https://charmed.fandom.com/wiki/Category%3AArtifacts) |
| Phosphorus Cauldron | Développement identifié dans Unnatural Resources, comic ; exclu du canon télévisuel retenu. | [Phosphorus Cauldron](https://charmed.fandom.com/wiki/Phosphorus_Cauldron), [Unnatural Resources](https://charmed.fandom.com/wiki/Unnatural_Resources) |
| Sphaera of Light and Dark | Références de comics, notamment Last Witch Effort ; exclue des propriétés S01–S08. | [Sphaera](https://charmed.fandom.com/wiki/The_Sphaera_of_Light_and_Dark) |
| Jewel of Orthon | Développement associé à Rennek dans les comics ; non retenu comme objet établi par la série originale. | [Mind Manipulation](https://charmed.fandom.com/wiki/Mind_Manipulation) |
| Ancient Athame, Empyreal Sword | Développements des comics présents dans des pages générales qui parlent aussi d'objets télévisuels ; exclus de la fusion. | [Athame](https://charmed.fandom.com/wiki/Athame), [Excalibur](https://charmed.fandom.com/wiki/Excalibur) |
| Bloodstone Amulets, Black Amber, Unity Bowl des résultats reboot | Domaine et continuité du reboot exclus ; aucune propriété importée. | Résultats du domaine charmed-reboot.fandom.com écartés dès le tri. |

Cette liste de pistes ne prétend pas clore le recensement. Les potions en tant que recettes, pouvoirs immatériels et êtres surnaturels ne sont pas artificiellement comptés comme objets. Les poussières sont conservées comme matériaux magiques ; leurs recettes relèvent aussi du lot potions.

## 7. Contradictions, nuances et décisions à réserver

| Point | État de la preuve et traitement proposé |
|---|---|
| Anciennes valeurs `minSeason` et utilisateur « autorisé » | Déjà révisées dans le `construction.json` relu. Ne pas réappliquer une correction obsolète. Garder les identifiants existants. |
| Cristaux universellement au nombre de cinq | Le corpus actif reconnaît le cas de trois en S07E08. Conserver les configurations et ne pas créer une règle unique. |
| Formule Ronyx | La transcription montre le geste caché de Gideon et le résumé sa page forgée. La formule n'est pas validée comme activation autonome. Son histoire de l'objet n'est pas une autorité neutre. |
| Athamé absorbant : mort nécessaire | Certaines définitions résument l'arme par le meurtre ; Phoebe survit à l'extraction. Décrire l'absorption sans rendre la mort systématiquement nécessaire. |
| Cristal des rêves : maximum de trois | Deux pages divergent entre « plusieurs proches » et « au plus trois ». Le nombre observé ne suffit pas à acter le plafond. Revoir le dialogue avant toute limite de cible. |
| Appareil de Vaklav : libération des victimes | Le Plot et la transcription indexée placent la libération après l'appel affectif à Sam, avant la capture photographique de Vaklav. Ne pas attribuer cette libération à la photographie ni généraliser ce lien particulier à tout captif. |
| Cage de la Prophétesse indestructible | Déclaration/description à contextualiser avec la sortie après neutralisation. La cause exacte entre explosion et perte de l'enchantement reste à vérifier. |
| Livre ou Grimoire indestructible | Non-consommation du Livre à la consultation = règle/convention du jeu ; résistance à certains effets = précédent. Aucun de ces points n'établit une invulnérabilité absolue. |
| Protection universelle des talismans | Les exceptions de Cole et Jinny distinguent magie de sorcières et magie démoniaque. Ne pas homogénéiser toutes les amulettes. |
| Bague Cupidon toutes saisons | Garder les deux variantes et les usages prêtés/volés ; ne pas rétroprojeter Coop en S02. La représentation technique en une ou deux ressources reste à décider. |
| Hollow : contenant et restitution | Confinement, invocation de l'entité et restitution des pouvoirs ne sont pas une seule fonction. La fin S08 reste à étudier avant une règle universelle. |
| Objet de tournage réutilisé | Ressemblance entre deux grimoires ne prouve pas identité narrative. Maintenir Tuatha et Phoenix séparés. |
| Cristaux, poussières, maisons, véhicules, dispositif du Tribunal | Déterminer au moment de la préparation si l'on représente une pièce, un ensemble, un matériau, un lieu équipé ou un véhicule. Ne pas créer plusieurs exemplaires d'un même objet par multiplication de cartes. |
| Deux identifications sans pouvoirs | Rathmere/Kasimar peuvent entrer dans un inventaire de connaissances. Leur présence ne valide pas une carte dotée d'effets inventés. |

Les propositions ne changent aucun coût, délai, état initial ou règle de victoire. L'existence canonique d'une propriété ne préjuge pas du résultat d'une action particulière. Les arbitrages demandés concernent la fusion documentaire, la nomenclature et les assertions suffisamment vérifiées pour l'usage envisagé.

## 8. Fichiers qui seraient concernés par une intégration

| Destination active à examiner | Travail proposé à la conversation principale |
|---|---|
| `Charmed/canon/contributions-integrees/objets.json` | Fusionner les compléments OM001–OM008 avec `objets:1` à `objets:8`, en conservant leurs références et niveaux historiques. Ne pas remplacer les paragraphes existants par un résumé plus pauvre. |
| `Charmed/canon/contributions-integrees/manifest.json` et un éventuel nouveau lot dans ce même dossier actif | Enregistrer les ajouts retenus selon le mécanisme déjà présent, avec leurs niveaux réels. La création du lot actif appartient à l'intégration, pas à cette contribution. |
| `Charmed/canon/CONSTRUCTION_DES_PARTIES.md` et `construction.json` | Compléter les notices de construction si elles sont utiles ; préserver les identifiants et conditions actés. Les `minSeason` déjà corrigés restent en place ; aucune date de première apparition inventée. |
| `Charmed/recherche/2026-09-08-lieux-objets-magie/FICHES.md` et `fiches.json` | Mettre en cohérence les sept notices si l'intégration choisit cette destination. Éviter le double chargement d'une même nouvelle fiche dans recherches et contributions intégrées. |
| `Charmed/canon/bibliotheque-verifiee.json` | Ajouter uniquement les assertions effectivement revues au niveau requis. Ne pas convertir les 80 fiches en faits `verified` par simple import. Conserver les trois faits cristaux déjà présents. |
| `Charmed/BIBLIOTHEQUE.md` | Référencer le lot accepté, sa portée et les réserves ; ne pas annoncer une expertise exhaustive. |

Le JSON de contribution reprend les champs usuels du dossier de recherche (`version`, `sources`, `fiches`, `canon`, `episodesReperes`, `conditionsPourLeJeu`, `limitesEtIncertitudes`, `activation`) et ajoute la provenance et les cartes. Il est **structuré pour une revue**, sans promesse de compatibilité d'import aveugle. Aucun patch du moteur n'est nécessaire à cette proposition ; le chargeur actuel et le schéma final devront être contrôlés après une éventuelle fusion par la conversation principale.

## 9. Vérifications effectuées et travail restant

Vérifications documentaires : recherche web réelle, sources d'objets et d'épisodes rapprochées, distinction IS/IT/T, provenance des huit fiches existantes, lecture du lot intégré actuel, séparation des connaissances et des descriptions de carte, retrait des développements identifiés comme comics/reboot, nuances d'activation et de chronologie conservées.

Vérifications structurelles : 80 identifiants distincts, 80 fiches renseignées, 81 descriptions avec la variante de Cupidon, 78 fiches de propriétés et deux identifications, références de sources résolues, identifiants d'épisodes présents dans l'index local, JSON lisible et fichiers produits limités au dossier `objets-magiques`. Les titres d'épisodes proviennent de l'index local : ce contrôle ne vérifie pas visuellement les scènes. Détails dans `VERIFICATIONS.json`.

Les écritures de cette contribution ont été limitées à son dossier. Aucun serveur redémarré, aucune partie lancée, aucune sauvegarde ouverte ou modifiée. Les empreintes des fichiers lus servent à situer l'état documentaire, pas à affirmer qu'aucune autre conversation ne les a modifiés.

Travail restant pour une expertise exhaustive : terminer les candidats non qualifiés, parcourir les accessoires des épisodes non couverts, vérifier les traductions françaises dans les versions pertinentes, visionner/recouper les scènes décisives avant un usage de gameplay incertain. Priorités de revue : sortie des photographies, neutralisation de la cage, éventuel plafond du cristal des rêves, activation Ronyx, dénouement du Hollow S08. Les limites manquantes sur Rathmere et Kasimar restent explicitement inconnues.

Travail restant pour l'intégration : choisir les ajouts et textes retenus, fusionner sans perdre les références déjà revues, résoudre les variantes et doublons, valider le chargement dans l'environnement choisi par la conversation principale. Aucun test de jeu n'a été exécuté pour ce travail documentaire.

Livrables du dossier : `PROPOSITION_A_INTEGRER.md` (texte complet et sources), `objets.proposition.json` (données structurées), `catalogue-source.tsv` (table éditable), `construire_catalogue.py` (générateur local) et `VERIFICATIONS.json` (contrôles et empreintes documentaires).
