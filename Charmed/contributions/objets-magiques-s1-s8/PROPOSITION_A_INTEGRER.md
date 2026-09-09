# Objets magiques de Charmed — approfondissements proposés

Date : 8 septembre 2026. **À examiner ; non intégré, non activé.**

## 1. Périmètre traité

La demande porte sur les objets magiques de la série originale, saisons 1 à 8. Le fragment du modèle concernant une « moitié démoniaque réprimée » n'est pas interprété comme une règle générale des objets. Il trouve un écho précis dans l'examen des amulettes de S03E20 et du cas Cole, dont les états sont distingués sans inventer de condition nouvelle.

Le nom court retenu est `objets-magiques-s1-s8`. Toutes les écritures de cette contribution sont limitées à `Charmed/contributions/objets-magiques-s1-s8/`. Aucun fichier actif, autre contribution, règle, sauvegarde ou bibliothèque principale n'a été modifié par cette tâche. Aucun serveur n'a été redémarré ; aucune partie n'a été créée ou jouée.

**18 fiches approfondies et 18 descriptions de carte** sont proposées. Il s'agit de compléments et de vérifications de précédents déjà recensés : le projet possède huit familles intégrées et un catalogue séparé de 80 fiches proposées. Cette livraison ne revendique donc pas 18 objets nouveaux, ni une couverture exhaustive de tous les accessoires de la série. Les objets sont retenus pour leur importance ou leurs propriétés utiles à l'action, la protection, le confinement, l'information et le transfert de pouvoirs, sans les enfermer dans une solution de combat.

Le JSON reprend les champs du catalogue local (`fiches`, `sources`, `canon`, `episodesReperes`, `descriptionCarteProposee`, etc.) et ajoute des rubriques d'approfondissement. Le champ `canon` est une convention de format, pas une certification. Ce fichier n'est pas un remplacement directement chargeable du fichier intégré : une adaptation et une revue restent nécessaires.

## 2. Instructions et fichiers existants consultés

- Instructions AGENTS.md fournies dans la conversation et source globale complète : `C:\Users\auror\Documents\Codex\2026-08-29\dis-moi-est-ce-que-tu\outputs\01_REGLES_GLOBALES_ACTEES.md`.
- `Charmed/REGLES_ACTEES.md`, `Charmed/DECISIONS_ACTEES.md`, `Charmed/BIBLIOTHEQUE.md`, `Charmed/PREPARATION_DOCUMENTEE.md` : références décisionnelles relues.
- `Charmed/canon/contributions-integrees/objets.json` : huit familles déjà revues, leurs variantes, sources et limites ; consultation des fiches pertinentes.
- `Charmed/canon/contributions-integrees/REVUE.md` : état documentaire de l'intégration et limites de la revue précédente.
- `Charmed/contributions/objets-magiques/objets.proposition.json` : structure, inventaire de 80 fiches et lecture des entrées correspondant aux objets approfondis ; leurs références ont servi de pistes puis ont été recherchées en ligne.
- `Charmed/canon/construction.json` : structure et références de base consultées de façon ciblée ; ne pas rétablir les anciennes formulations trop restrictives corrigées lors de l'intégration.
- `Charmed/canon/episodes-index.json` : contrôle des titres et numéros TVmaze, pas preuve des actions.
- `serveur/charmed/bibliotheque.js` : repérage du chargement par manifeste des contributions intégrées. Aucun audit exhaustif du moteur ni consultation de la sauvegarde active.

Le passage mémoire retrouvé concernait les anciennes maquettes d'interface ; il ne fournit aucun fait sur les objets. Les fichiers du projet relus font foi pour l'état actuel. Aucun AGENTS.md supplémentaire n'a été trouvé par la recherche dans le dépôt ; les instructions fournies restent applicables.

## 3. Statuts, constats et problèmes

### Décisions actées conservées

Une connaissance ne rend pas une ressource disponible. Exemplaire, détenteur, période, accès, concours des personnes, contenu et état matériel comptent. L'objet peut avoir plusieurs usages cohérents ; sa description ne doit pas fournir une recette de victoire. Aucun jet, coût, délai de recharge, taux de réussite, compteur de corruption ou règle d'invulnérabilité n'est créé ici. Un manque d'information ne devient pas une impossibilité.

### État documentaire plus récent

`BIBLIOTHEQUE.md` et `REVUE.md` indiquent une intégration de huit familles d'objets et un chargement vérifié à une étape récente. Leurs anciens paragraphes sur un redémarrage encore nécessaire sont historiques. Cette tâche ne les utilise pas pour demander ou effectuer un nouveau redémarrage, et ne certifie pas l'état actuel d'un serveur ouvert. La contribution de 80 fiches garde, elle, son statut de proposition : sa présence n'est pas une décision d'intégration.

### Points importants pour l'examen

1. **Objet, pouvoir et contenu.** L'athamé de Witch Wars absorbe et transmet des pouvoirs, contrairement à une lame ordinaire dont cette capacité n'est pas établie. La boîte du Hollow n'est pas l'entité ; l'urne ne produit pas une réserve infinie ; la maison de poupées ne miniaturise pas nécessairement seule.
2. **Interférences avec l'information.** Le pendule de S06E21 est influencé par Gideon dans une didascalie. Une localisation ou une projection n'authentifie ni sa cause ni la véracité de l'explication donnée par un personnage.
3. **Lame du Dragon : divergence précise.** La rubrique de pouvoirs de la page d'épisode simplifie le retour de l'âme de Piper vers « son corps ». La transcription décrit d'abord un retour dans le corps du Maître, toujours concerné par l'échange d'âmes. Cette divergence est signalée, pas résolue comme une certitude audiovisuelle.
4. **Amulettes de S03E20.** La restriction envers le Mal et la formule après réunion doivent figurer dans la connaissance. Le soupçon sur les intentions de Cole n'est pas un fait établi par l'accusation des sœurs.
5. **Urne divine.** La reprise des pouvoirs n'est pas décrite de manière identique pour les trois sœurs : le cas Piper ne doit pas être lissé dans une procédure commune.
6. **Corruption et psychologie.** Excalibur, l'athamé de Witch Wars et la ceinture ont des effets particuliers sur leurs utilisateurs. Ils ne justifient pas une loi selon laquelle tout objet démoniaque corrompt instantanément tout porteur.
7. **Rite du Hollow.** S4 exige un concours Bien/Mal ; le final S8 donne un autre précédent. L'articulation de ces cas demande une revue avant toute règle universelle.
8. **État matériel et état magique.** Baguette brisée, bague désenchantée, réserve transférée et cristal retiré ne signifient pas la même chose. Ne pas annoncer destruction, consommation ou réutilisation sans établir l'effet réellement intervenu.

## 4. Tableau de correspondance et apports

Toutes les lignes sont des propositions de complément ; les textes complets suivent.

| Fiche | Objet | Catalogue de 80 | Entrée intégrée | Apport proposé |
|---|---|---|---|---|

| objets-s1-s8:001 | Livre des Ombres — protections et contournement | objets-magiques:001 | objets:1 | Renforce par consultation de dialogue le précédent S05E08 déjà signalé dans la fiche 001. Conserver les protections et autres exceptions de la base. |
| objets-s1-s8:002 | Cristaux — confinement et signal d'alarme | objets-magiques:003 | objets:3 | Recoupe le témoin et l'enchantement déjà présents dans le catalogue 003 ; complément envisageable à la base intégrée objets:3, dont les configurations multiples sont conservées. |
| objets-s1-s8:003 | Cristal de localisation — repère manipulable | objets-magiques:004 | objets:4 | Ajoute un précédent d'interférence volontaire S06E21 au signal provoqué déjà relevé pour S07E17. |
| objets-s1-s8:004 | Bague de Coop — voyage temporel | objets-magiques:005 | objets:5 | Consolide l'activation et le concours physique d'un accompagnant. Rapprocher de objets:5 sans créer une bague supplémentaire. |
| objets-s1-s8:005 | Boîte du Hollow — contenant et variantes de confinement | objets-magiques:006 | objets:6 | Traite la variante S8 laissée ouverte dans objets:6 ; signale l'arbitrage de portée, sans modifier les règles. |
| objets-s1-s8:006 | Athamé absorbant les pouvoirs — Witch Wars | objets-magiques:028 | Pas de fiche parmi les huit familles | Remplace un appui par extraits par une consultation de la transcription ; distingue intention de poignarder et confirmation ultérieure. |
| objets-s1-s8:007 | Excalibur — détenteur et destinataire | objets-magiques:025 | Pas de fiche parmi les huit familles | Précise le statut de Piper et sépare l'ambition de Mordaunt d'une capacité anti-bouclier démontrée. |
| objets-s1-s8:008 | Baguette de Tuatha | objets-magiques:022 | Pas de fiche parmi les huit familles | Ajoute les gestes d'entraînement et la fausse potion ; conserve distincts réplique sur la casse et précision secondaire sur l'ambre. |
| objets-s1-s8:009 | Lame du Dragon — âme capturée et corps d'accueil | objets-magiques:026 | Pas de fiche parmi les huit familles | Nuance importante du catalogue 026 : conserver l'âme et le corps corrects à chaque étape, sans fusionner extraction et échange final. |
| objets-s1-s8:010 | Épée de cristal de Gabriel | objets-magiques:027 | Pas de fiche parmi les huit familles | Renforce la lecture conditionnelle de la protection et le contre-exemple de l'arme elle-même, déjà signalés en 027. |
| objets-s1-s8:011 | Athamé enchanté de Gideon | objets-magiques:030 | Pas de fiche parmi les huit familles | Ajoute la bénédiction complémentaire envisagée et la distinction blessure/magie ; garde les capacités précises à leur période. |
| objets-s1-s8:012 | Amulettes jumelles de Leeza et Janna | objets-magiques:012 | Pas de fiche parmi les huit familles | Ajoute une restriction importante absente de la formulation courte 012 et relie explicitement l'objet au cas Cole sans valider les soupçons des sœurs. |
| objets-s1-s8:013 | Bague d'immunité de Nicholas | objets-magiques:010 | Pas de fiche parmi les huit familles | Précise les bénéficiaires/cibles et le retrait d'enchantement ; améliore le repérage du contre-moyen de la fiche 010. |
| objets-s1-s8:014 | Boîte de Pandore | objets-magiques:035 | Pas de fiche parmi les huit familles | Renforce la séparation détention/gardiennage et la causalité du reconfinement, à partir du dialogue consulté. |
| objets-s1-s8:015 | Urne des pouvoirs divins | objets-magiques:040 | Pas de fiche parmi les huit familles | Nuance le catalogue 040, trop global sur la reprise des pouvoirs par Leo : conserver le cas distinct de Piper. |
| objets-s1-s8:016 | Cristaux Ronyx | objets-magiques:051 | Pas de fiche parmi les huit familles | Relecture directe de la didascalie déjà mentionnée en 051 ; ne pas promouvoir la prétendue formule en recette prouvée. |
| objets-s1-s8:017 | Maison de poupées Halliwell | objets-magiques:041 | Pas de fiche parmi les huit familles | Sépare clairement deux usages et conserve l'exception de communication ; ne revendique pas une nouvelle identification. |
| objets-s1-s8:018 | Ceinture de Gaïa / d'Hippolyte | objets-magiques:049 | Pas de fiche parmi les huit familles | Ajoute manifestations et retrait ; précise les variantes de nom et évite de transformer la rhétorique de l'épisode en règle générale. |

## 5. Textes complets proposés

Les cinq rubriques de chaque fiche sont destinées à l'Ange du destin. Le bloc « Carte » est la description courte proposée. Les références du bloc documentaire soutiennent sa synthèse de carte ; les incertitudes s'appliquent aux deux. Les périodes citées désignent les précédents étudiés, pas une disponibilité automatique à toutes les dates intermédiaires.


### objets-s1-s8:001 — Livre des Ombres — protections et contournement

**Épisodes :** S05E08 — A Witch in Time.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Livre familial de connaissances magiques, déjà documenté dans le corpus intégré. Cette fiche approfondit le vol par Bacarra, sans remplacer les autres périodes.
- **Pouvoirs et fonctionnement :** Bacarra utilise une potion contenant le sang de Piper puis emporte le Livre. Le dialogue insiste sur l'association de deux versions temporelles de l'attaquant. ([T0508](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e08&tv-show=charmed))
- **Activation, moyens et portée :** La potion et l'accès concret appartiennent au dispositif : ce n'est pas une permission générale donnée à tout être maléfique. Posséder, lire et exécuter une formule restent distincts.
- **Contre-moyens, variantes et chronologie :** Le précédent contredit une protection absolue contre tout vol. Il ne démontre pas que du sang seul, sans préparation, neutralise les défenses. ([T0508](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e08&tv-show=charmed))
- **Limites et incertitudes :** Mécanisme moléculaire ou moral exact de la potion non établi ; passage dans une chronologie modifiée. Ne pas distribuer le Livre à deux camps ni en faire une réponse omnisciente.

**Carte proposée**

> Livre familial de connaissances, formules et recettes magiques, doté de protections susceptibles d'être contournées dans des circonstances particulières.

**Apport par rapport à l’existant :** Renforce par consultation de dialogue le précédent S05E08 déjà signalé dans la fiche 001. Conserver les protections et autres exceptions de la base.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:002 — Cristaux — confinement et signal d'alarme

**Épisodes :** S03E05 — Sight Unseen ; S04E13 — Charmed and Dangerous.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Famille de dispositifs préparés ; le cristal tenu en main n'est pas nécessairement la cage elle-même.
- **Pouvoirs et fonctionnement :** Prue décrit un réseau de sidérite enchantée ; un cristal témoin doit s'illuminer au déclenchement. S04E13 décrit une autre installation à cinq cristaux. ([FCRYSTAL](https://charmed.fandom.com/wiki/Sight_Unseen/Script), [FCRYSTAL-P](https://charmed.fandom.com/wiki/Sight_Unseen/Plot), [T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed))
- **Activation, moyens et portée :** Enchantement, disposition et complétude du réseau comptent. Cinq cristaux ne constituent pas un nombre universel. Le Livre utilisé comme appât n'est pas démontré nécessaire à toute cage.
- **Contre-moyens, variantes et chronologie :** La confrontation S04E13 comporte un retrait de cristal par la Source avec le pouvoir acquis de Paige, déjà documenté dans la base. La vision d'ouverture est distincte de cette confrontation. ([T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed))
- **Limites et incertitudes :** Décharges, alarme et confinement sont à différencier. Portée entre pièces, résistance à toute téléportation et sélectivité envers les humains non établies ici.

**Carte proposée**

> Cristaux préparés pour des dispositifs de confinement ou d'alarme ; certains réseaux comportent un cristal témoin signalant leur déclenchement.

**Apport par rapport à l’existant :** Recoupe le témoin et l'enchantement déjà présents dans le catalogue 003 ; complément envisageable à la base intégrée objets:3, dont les configurations multiples sont conservées.

**Niveau des sources :** extrait_indexe_secondaire, extrait_indexe_transcription_non_officielle, transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:003 — Cristal de localisation — repère manipulable

**Épisodes :** S06E21 — Witch Wars ; S07E17 — Scry Hard.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Pendule de recherche, distinct d'un cristal de confinement ou d'une caméra Ronyx.
- **Pouvoirs et fonctionnement :** Dans Witch Wars, une didascalie montre Gideon déplaçant discrètement le résultat du pendule. Dans Scry Hard, un repère vers le manoir est suivi d'une discussion sur un piège possible. ([FWITCH](https://charmed.fandom.com/wiki/Witch_Wars_(episode)/Script), [T0717](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e17&tv-show=charmed))
- **Activation, moyens et portée :** Un point indiqué n'authentifie pas l'auteur du signal, la sécurité du lieu ou l'absence d'interférence. Lien avec la cible, opérateur et contexte doivent rester identifiés.
- **Contre-moyens, variantes et chronologie :** Une manipulation surnaturelle du résultat est donc un contre-exemple à l'infaillibilité. Ce constat n'invalide pas toutes les recherches réalisées au pendule.
- **Limites et incertitudes :** La didascalie de fans exige un contrôle vidéo avant qualification de preuve directe. Ne pas tirer d'une réplique sur la recherche entre sorcières une interdiction absolue de toute autre cible.

**Carte proposée**

> Pendule employé dans les recherches magiques. Son indication dépend des conditions de recherche et peut subir une intervention extérieure.

**Apport par rapport à l’existant :** Ajoute un précédent d'interférence volontaire S06E21 au signal provoqué déjà relevé pour S07E17.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:004 — Bague de Coop — voyage temporel

**Épisodes :** S08E22 — Forever Charmed.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Variante S8 de la famille des bagues de Cupidon ; ne pas la confondre avec l'exemplaire de S02E10.
- **Pouvoirs et fonctionnement :** Coop prête la bague à Piper. Il lui demande de penser à la personne et à son amour ; Leo accompagne Piper en lui tenant la main. L'arrivée ne correspond pas à la date souhaitée. ([FCUPID](https://charmed.fandom.com/wiki/Forever_Charmed/Script))
- **Activation, moyens et portée :** Lien affectif et activation ne constituent pas un choix numérique de date. Le prêt permet un usage par une non-Cupidon, sans prouver que tout porteur dispose de toutes les fonctions.
- **Contre-moyens, variantes et chronologie :** La destination peut être imprécise. Le vol ultérieur par Dumain montre que la possession de l'objet est vulnérable ; pas d'auto-retour au propriétaire établi. ([FCUPID](https://charmed.fandom.com/wiki/Forever_Charmed/Script))
- **Limites et incertitudes :** Extrait de transcription uniquement ; nombre maximal de voyageurs et fonctionnement sans lien affectif non déterminés. Ne pas ajouter des voyages temporels à la bague de S2 par analogie.

**Carte proposée**

> Bague de Coop permettant notamment de voyager dans le temps en suivant un lien d'amour ; la destination peut différer de celle recherchée.

**Apport par rapport à l’existant :** Consolide l'activation et le concours physique d'un accompagnant. Rapprocher de objets:5 sans créer une bague supplémentaire.

**Niveau des sources :** extrait_indexe_transcription_non_officielle. Aucun visionnage.


### objets-s1-s8:005 — Boîte du Hollow — contenant et variantes de confinement

**Épisodes :** S04E13 — Charmed and Dangerous ; S08E22 — Forever Charmed.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Contenant du Hollow, entité qui absorbe la magie ; distinct de Pandore et du Nexus.
- **Pouvoirs et fonctionnement :** En S4, la lecture de son inscription avec le concours du Bien et du Mal permet le reconfinement. L'absorption relève de l'entité, pas de la boîte vide. ([T0413](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed))
- **Activation, moyens et portée :** Boîte accessible, inscription et intervenants constituent des moyens distincts. La posséder ne signifie ni maîtriser le Hollow ni acquérir personnellement tous les pouvoirs absorbés.
- **Contre-moyens, variantes et chronologie :** En S8, Piper, Patty et Penny chassent le Hollow par une formule. Ce précédent impose de contextualiser l'exigence Bien/Mal de S4 au lieu de l'universaliser. ([FFINAL](https://charmed.fandom.com/wiki/Forever_Charmed/Plot))
- **Limites et incertitudes :** La variante finale reste soutenue par extrait secondaire ; articulation exacte des deux rites à contrôler. Ne pas inventer une réparation de continuité ni un rituel synthétique.

**Carte proposée**

> Contenant associé au confinement du Hollow et à son inscription rituelle ; sa possession ne suffit pas à maîtriser l'entité absorbant la magie.

**Apport par rapport à l’existant :** Traite la variante S8 laissée ouverte dans objets:6 ; signale l'arbitrage de portée, sans modifier les règles.

**Niveau des sources :** extrait_indexe_secondaire, transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:006 — Athamé absorbant les pouvoirs — Witch Wars

**Épisodes :** S06E21 — Witch Wars.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Lame particulière de Witch Wars, à distinguer d'un athamé rituel ordinaire.
- **Pouvoirs et fonctionnement :** Leo tue Clea avec la lame ; Phoebe la prend et reçoit des pouvoirs démoniaques. Son comportement devient agressif. ([FWITCH](https://charmed.fandom.com/wiki/Witch_Wars_(episode)/Script))
- **Activation, moyens et portée :** L'acquisition implique cette lame et son contenu ; sa seule silhouette ne suffit pas à identifier sa fonction. L'arme ne rend pas son porteur invulnérable.
- **Contre-moyens, variantes et chronologie :** Paige poignarde Phoebe pour retirer ces pouvoirs, Leo prêt à guérir ; la conversation suivante confirme la blessure et la survie. Mort du donneur et extraction ne sont donc pas synonymes. ([FWITCH](https://charmed.fandom.com/wiki/Witch_Wars_(episode)/Script))
- **Limites et incertitudes :** Pas de recette de fabrication, capacité de stockage ou extraction par simple effleurement établies. La guérison dépend de Leo, pas de la lame. Exclure l'Ancient Athame des comics.

**Carte proposée**

> Athamé particulier capable d'absorber et de transmettre des pouvoirs ; des capacités démoniaques transférées peuvent altérer le comportement du porteur.

**Apport par rapport à l’existant :** Remplace un appui par extraits par une consultation de la transcription ; distingue intention de poignarder et confirmation ultérieure.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:007 — Excalibur — détenteur et destinataire

**Épisodes :** S06E08 — Sword and the City.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Épée liée au destin de Wyatt ; Piper n'en est qu'une dépositaire temporaire malgré son retrait du rocher. ([T0608](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e08&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Sa puissance consume Piper et altère ses choix. Mordaunt cherche à devenir assez puissant pour la manier en prenant les pouvoirs de ses chevaliers. ([T0608](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e08&tv-show=charmed))
- **Activation, moyens et portée :** Pouvoir retirer, transporter et manier durablement sont trois questions différentes. Le titre de roi revendiqué par un personnage n'est pas une preuve de légitimité.
- **Contre-moyens, variantes et chronologie :** La séparation de Piper et de l'épée fait partie de sa sauvegarde. Le projet de Mordaunt contre le bouclier de Wyatt reste un projet à distinguer d'une démonstration réussie. ([T0608](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e08&tv-show=charmed))
- **Limites et incertitudes :** Pas de seuil chiffré de corruption ni d'âge minimum magique inventé. Ne pas confondre la vision liée à Barbas en fin de S6 avec une histoire matérielle certaine de l'épée.

**Carte proposée**

> Excalibur — épée liée au destin de Wyatt. Un autre détenteur peut la déplacer, mais sa puissance peut consumer celui qui ne peut la maîtriser.

**Apport par rapport à l’existant :** Précise le statut de Piper et sépare l'ambition de Mordaunt d'une capacité anti-bouclier démontrée.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:008 — Baguette de Tuatha

**Épisodes :** S02E06 — That Old Black Magic.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Baguette liée à Tuatha et à Kyle Gwydion, l'Élu ; Tuatha est une sorcière maléfique, pas une espèce de démon. ([T0206](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e06&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Kyle la fait agir par sa volonté. L'apprentissage implique confiance et, pour l'affrontement, prise à deux mains selon Leo. ([T0206](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e06&tv-show=charmed))
- **Activation, moyens et portée :** La volonté n'est pas un permis de réaliser tout souhait avec tout utilisateur. La prétendue potion de courage n'existe pas : les sœurs l'ont inventée pour l'encourager. ([T0206](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e06&tv-show=charmed))
- **Contre-moyens, variantes et chronologie :** Après la victoire, la baguette est brisée ; la fiche secondaire précise l'ambre cassé et la perte de magie. Un objet encore matériellement présent n'est donc pas nécessairement fonctionnel. ([T0206](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e06&tv-show=charmed), [FTUATHA](https://charmed.fandom.com/wiki/Tuatha%27s_Wand))
- **Limites et incertitudes :** La nécessité des deux mains hors combat n'est pas universelle : Kyle l'avait fait tourner autrement. Réparation et recharge non établies.

**Carte proposée**

> Baguette canalisant la volonté, liée à Tuatha et à l'Élu. Sa version brisée ne possède plus la magie de l'objet intact.

**Apport par rapport à l’existant :** Ajoute les gestes d'entraînement et la fausse potion ; conserve distincts réplique sur la casse et précision secondaire sur l'ambre.

**Niveau des sources :** extrait_indexe_secondaire, transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:009 — Lame du Dragon — âme capturée et corps d'accueil

**Épisodes :** S04E04 — Enter the Demon.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Lame capable de capturer une âme ; l'effet ne se réduit pas à la blessure corporelle. ([FDRAGON](https://charmed.fandom.com/wiki/Enter_the_Demon/Script))
- **Pouvoirs et fonctionnement :** Yen-Lo capture l'âme de Piper alors qu'elle occupe le corps du Maître. Paige extrait cette âme et la replace d'abord dans le corps du Maître ; l'échange précédent doit rester suivi. ([FDRAGON](https://charmed.fandom.com/wiki/Enter_the_Demon/Script))
- **Activation, moyens et portée :** Corps, âme et arme sont trois éléments distincts. La télékinésie orbitale appartient à Paige ; Phoebe utilise ensuite la lame contre Yen-Lo. ([FDRAGON](https://charmed.fandom.com/wiki/Enter_the_Demon/Script))
- **Contre-moyens, variantes et chronologie :** L'âme retenue peut être récupérée dans la scène ; sa capture n'est pas une destruction irréversible établie. Aucun effacement d'âme comparable à l'Ancient Athame ajouté.
- **Limites et incertitudes :** CORRECTION proposée : le résumé de pouvoirs de la page d'épisode dit 'dans le corps de Piper', alors que les didascalies décrivent le corps du Maître à ce moment. Vérification vidéo prioritaire. ([FDRAGON](https://charmed.fandom.com/wiki/Enter_the_Demon/Script), [FDRAGON-E](https://charmed.fandom.com/wiki/Enter_the_Demon))

**Carte proposée**

> Lame magique capable de retirer et de retenir une âme, indépendamment du corps qu'elle occupait.

**Apport par rapport à l’existant :** Nuance importante du catalogue 026 : conserver l'âme et le corps corrects à chaque étape, sans fusionner extraction et échange final.

**Niveau des sources :** extrait_indexe_secondaire, extrait_indexe_transcription_non_officielle. Aucun visionnage.


### objets-s1-s8:010 — Épée de cristal de Gabriel

**Épisodes :** S01E16 — Which Prue Is It, Anyway?.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Arme du Seigneur de la guerre Gabriel Statler ; les propriétés de son lien à l'épée ne deviennent pas celles de tout épéiste. ([T0116](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e16&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Le Livre décrit son immunité aux armes humaines tant qu'il dispose de son épée. Celle-ci peut absorber une âme. ([T0116](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e16&tv-show=charmed))
- **Activation, moyens et portée :** La condition 'tant qu'il a son épée' est essentielle ; l'exploit passé de Brianna établit une séparation possible, sans en fournir un mode d'emploi universel.
- **Contre-moyens, variantes et chronologie :** Sa propre lame peut le blesser, contrairement aux armes humaines évoquées. L'invulnérabilité annoncée est donc limitée par la catégorie d'arme. ([T0116](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e16&tv-show=charmed))
- **Limites et incertitudes :** La capacité d'appeler l'épée, les limites du lien à un autre porteur et le sort détaillé des âmes réclament une revue complémentaire. Ni arme anti-tout ni protection transmissible garantie.

**Carte proposée**

> Épée de cristal liée à Gabriel, capable d'absorber des âmes et associée à sa protection contre les armes humaines.

**Apport par rapport à l’existant :** Renforce la lecture conditionnelle de la protection et le contre-exemple de l'arme elle-même, déjà signalés en 027.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:011 — Athamé enchanté de Gideon

**Épisodes :** S06E23 — It's a Bad, Bad, Bad, Bad World, Part 2.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Lame liée à la tentative de Gideon contre Wyatt, distincte de celle de Witch Wars.
- **Pouvoirs et fonctionnement :** Le dialogue indique le bouclier de Wyatt déjà percé. Gideon propose encore que Barbas bénisse l'athamé ; le moyen peut donc être renforcé au cours de l'intrigue. ([T0623](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e23&tv-show=charmed))
- **Activation, moyens et portée :** Ne pas confondre percée d'une protection donnée et pénétration de toute barrière. Une bénédiction proposée n'est pas, par elle-même, une propriété permanente démontrée.
- **Contre-moyens, variantes et chronologie :** Chris explique que la magie de Gideon cause sa blessure et que Gideon seul peut l'arrêter dans cette scène : ne pas garantir une guérison ordinaire immédiate. ([T0623](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e23&tv-show=charmed))
- **Limites et incertitudes :** Procédure de préparation et cause complète de l'effet sur Chris non auditées. Ne pas attribuer collecte de pouvoirs ou effacement des âmes à cette lame.

**Carte proposée**

> Lame enchantée liée au plan de Gideon contre la protection de Wyatt ; ses blessures peuvent comporter un effet magique particulier.

**Apport par rapport à l’existant :** Ajoute la bénédiction complémentaire envisagée et la distinction blessure/magie ; garde les capacités précises à leur période.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:012 — Amulettes jumelles de Leeza et Janna

**Épisodes :** S03E20 — Exit Strategy.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Deux moitiés d'un charme protecteur, confiées séparément à des sorcières. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Une moitié protège déjà mais Balthazar la prend à Leeza. Leo annonce une protection supérieure pour la réunion ; une formule est encore nécessaire à l'activation de l'ensemble. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Activation, moyens et portée :** Leo précise que le charme ne protège pas un être maléfique. Détenir une moitié, réunir les deux et accomplir le rite ne sont pas des états équivalents. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Contre-moyens, variantes et chronologie :** L'invincibilité annoncée n'est pas vérifiée contre tous les moyens. Le soupçon selon lequel Cole voudrait devenir humain pour s'en servir reste une accusation, pas la preuve de son intention. ([T0320](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed))
- **Limites et incertitudes :** Ne pas traduire 'maîtriser sa moitié démoniaque' par éligibilité certaine. Condition morale énoncée, retrait de pouvoirs et nature hybride demandent une appréciation séparée.

**Carte proposée**

> Deux amulettes complémentaires de protection, renforcées lorsqu'elles sont réunies et activées ; le charme est décrit comme ne protégeant pas le Mal.

**Apport par rapport à l’existant :** Ajoute une restriction importante absente de la formulation courte 012 et relie explicitement l'objet au cas Cole sans valider les soupçons des sœurs.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:013 — Bague d'immunité de Nicholas

**Épisodes :** S01E17 — That '70s Episode.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Anneau enchanté sous la contrainte par Patty, destiné à protéger Nicholas contre les pouvoirs des sœurs. ([T0117](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e17&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Nicholas revendique l'immunité procurée par cette bénédiction. Le pouvoir vient de l'enchantement de cet anneau, pas de toutes les bagues portées par un warlock. ([T0117](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e17&tv-show=charmed))
- **Activation, moyens et portée :** La cible de l'immunité est déterminée par le pacte de l'épisode ; ne pas élargir à toute magie et à toute arme.
- **Contre-moyens, variantes et chronologie :** Patty retire la bénédiction dans le passé. Au retour, les sœurs peuvent affronter Nicholas sans cette protection. Il s'agit d'un changement d'état magique, pas simplement d'une bague détruite. ([T0117](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e17&tv-show=charmed))
- **Limites et incertitudes :** Gestes exacts de retrait non établis ; on ne déduit pas que n'importe qui peut désenchanter n'importe quel objet. Le voyage temporel vient d'un autre moyen.

**Carte proposée**

> Bague enchantée pour protéger Nicholas contre les pouvoirs des Halliwell ; cette protection dépend de la bénédiction qui lui a été donnée.

**Apport par rapport à l’existant :** Précise les bénéficiaires/cibles et le retrait d'enchantement ; améliore le repérage du contre-moyen de la fiche 010.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:014 — Boîte de Pandore

**Épisodes :** S07E18 — Little Box of Horrors.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Contient des maux surnaturels et passe de Nina à Hope après la mort de la gardienne précédente. ([T0718](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e18&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Katya doit contraindre Hope à l'ouvrir ; elle veut ensuite supprimer celle qui peut rappeler son contenu. Le détenteur matériel ne possède donc pas nécessairement les prérogatives de la gardienne. ([T0718](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e18&tv-show=charmed))
- **Activation, moyens et portée :** Le retour des maux dépend de Hope dans ce récit. Les affirmations de Katya sur l'absence d'une prochaine gardienne sont des propos intéressés, pas une règle démographique universelle.
- **Contre-moyens, variantes et chronologie :** Hope réussit à rappeler les maux après avoir été encouragée à croire en elle. La mort de Katya seule ne referme pas causalement tout le problème. ([T0718](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e18&tv-show=charmed))
- **Limites et incertitudes :** Aucun rythme de diffusion, rayon d'effet ou indestructibilité absolue vérifiés. La mythologie adaptée dans Charmed n'est pas une source de mécanismes supplémentaires.

**Carte proposée**

> Boîte contenant des maux surnaturels, confiée à une gardienne dont le rôle comprend leur confinement et leur rappel.

**Apport par rapport à l’existant :** Renforce la séparation détention/gardiennage et la causalité du reconfinement, à partir du dialogue consulté.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:015 — Urne des pouvoirs divins

**Épisodes :** S05E22 — Oh My Goddess (1) ; S05E23 — Oh My Goddess (2).

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Réceptacle de puissances divines mobilisées lors de la menace des Titans. ([FURN](https://charmed.fandom.com/wiki/Urn_of_Divine_Powers))
- **Pouvoirs et fonctionnement :** Leo libère la puissance pour transformer les sœurs ; il récupère ensuite celle de Phoebe et Paige. Piper connaît une sortie différente, liée à sa douleur. ([FURN](https://charmed.fandom.com/wiki/Urn_of_Divine_Powers), [T0522](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e22&tv-show=charmed))
- **Activation, moyens et portée :** La réserve, l'intermédiaire et les bénéficiaires sont distincts. Rien n'établit une production infinie ou un transfert garanti par simple contact avec la céramique.
- **Contre-moyens, variantes et chronologie :** La perte d'humanité est un risque explicite de ces transformations. Le retour de Piper ne doit pas être raconté comme une application identique à celle de ses deux sœurs. ([T0522](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e22&tv-show=charmed), [FURN](https://charmed.fandom.com/wiki/Urn_of_Divine_Powers))
- **Limites et incertitudes :** Les gestes exacts ne sont pas reconstruits ; la transcription S05E22 regroupe les deux parties. La fiche de l'urne est encore un extrait secondaire, pas une observation vidéo.

**Carte proposée**

> Urne contenant des puissances divines qui peuvent être transférées et reprises dans un rituel ; leurs effets dépassent la seule puissance offensive.

**Apport par rapport à l’existant :** Nuance le catalogue 040, trop global sur la reprise des pouvoirs par Leo : conserver le cas distinct de Piper.

**Niveau des sources :** extrait_indexe_secondaire, transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:016 — Cristaux Ronyx

**Épisodes :** S06E21 — Witch Wars.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Dispositifs d'observation et de projection exploités par l'émission démoniaque Witch Wars.
- **Pouvoirs et fonctionnement :** La source distingue les cristaux noirs d'observation des rouges de projection. Gideon accompagne secrètement la récitation de Phoebe d'un geste d'activation. ([FRONYX](https://charmed.fandom.com/wiki/Ronyx_Crystal), [FWITCH](https://charmed.fandom.com/wiki/Witch_Wars_(episode)/Script))
- **Activation, moyens et portée :** Réseau, dispositif observateur et récepteur doivent être identifiés. La scène ne prouve pas que la formule seule fonctionne.
- **Contre-moyens, variantes et chronologie :** Le récit d'ancienneté vient de Gideon, acteur de la tromperie. Le reprendre comme histoire certaine effacerait cette réserve. ([FRONYX](https://charmed.fandom.com/wiki/Ronyx_Crystal))
- **Limites et incertitudes :** Enregistrement mentionné par la fiche secondaire, mais capacités de stockage, lecture différée, portée et franchissement des protections non audités. Pas de surveillance omnisciente du monde.

**Carte proposée**

> Cristaux employés pour observer et projeter des images, notamment dans un réseau de surveillance magique.

**Apport par rapport à l’existant :** Relecture directe de la didascalie déjà mentionnée en 051 ; ne pas promouvoir la prétendue formule en recette prouvée.

**Niveau des sources :** extrait_indexe_secondaire, transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:017 — Maison de poupées Halliwell

**Épisodes :** S07E17 — Scry Hard ; S08E13 — Repo Manor.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Réplique du manoir servant de support à des situations de miniaturisation différentes.
- **Pouvoirs et fonctionnement :** S7 : Wyatt réduit ses parents ; ils interprètent son geste comme une protection. S8 : un démon enferme les sœurs dans la réplique. ([T0717](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e17&tv-show=charmed), [FREPO-E](https://charmed.fandom.com/wiki/Repo_Manor))
- **Activation, moyens et portée :** Le support n'accomplit pas seul toutes les opérations. Utilisateur, réduction, confinement et éventuel détournement des pouvoirs doivent être identifiés séparément.
- **Contre-moyens, variantes et chronologie :** La communication extérieure reste possible en S8 : Billie reçoit un message sur la planchette. Captivité n'implique donc pas absence de tout canal. ([FREPO](https://charmed.fandom.com/wiki/Repo_Manor/Script))
- **Limites et incertitudes :** Pas de capacité native universelle de réduction ni d'interdiction absolue de sortie déduite. La destruction finale et le transfert de pouvoirs en S8 doivent être revus avant prescription d'un contre-moyen.

**Carte proposée**

> Réplique du manoir pouvant servir d'espace miniature de protection ou de captivité lorsqu'une magie appropriée y est appliquée.

**Apport par rapport à l’existant :** Sépare clairement deux usages et conserve l'exception de communication ; ne revendique pas une nouvelle identification.

**Niveau des sources :** extrait_indexe_secondaire, extrait_indexe_transcription_non_officielle, transcription_non_officielle_consultee. Aucun visionnage.


### objets-s1-s8:018 — Ceinture de Gaïa / d'Hippolyte

**Épisodes :** S08E08 — Battle of the Hexes.

**Fiche pour l’Ange du destin**

- **Identité et fonction :** Ceinture dorée de Gaïa, donnée à Hippolyte selon le dialogue. Les deux noms renvoient ici au même objet. ([T0808](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e08&tv-show=charmed))
- **Pouvoirs et fonctionnement :** Elle transforme Billie, lui permet de rendre Leo invisible puis visible et influence son comportement ainsi que son entourage. ([T0808](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e08&tv-show=charmed))
- **Activation, moyens et portée :** Son port ne garantit pas la maîtrise. Sollal avertit Zira qu'elle serait détruite en la portant parce qu'elle est maléfique ; manipuler la porteuse est une autre opération. ([T0808](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e08&tv-show=charmed))
- **Contre-moyens, variantes et chronologie :** Le retrait combine l'intervention de Leo, une formule et l'action de Paige. Ce concours ne devient pas une méthode universelle de désenchantement. ([T0808](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e08&tv-show=charmed))
- **Limites et incertitudes :** Pas d'invincibilité absolue ou de portée chiffrée extrapolées. Le catalogue 049 rapporte aussi la destruction de Zira : le geste final mérite une revue vidéo. Les propos sur hommes/femmes restent fictionnels.

**Carte proposée**

> Ceinture conférant une grande puissance et une influence croissante sur sa porteuse ; elle est décrite comme dangereuse à porter pour un être maléfique.

**Apport par rapport à l’existant :** Ajoute manifestations et retrait ; précise les variantes de nom et évite de transformer la rhétorique de l'épisode en règle générale.

**Niveau des sources :** transcription_non_officielle_consultee. Aucun visionnage.


## 6. Sources et niveau réel de vérification

Recherches web effectuées le 8 septembre 2026. Aucun épisode visionné. Les pages Springfield sont des transcriptions non officielles ; elles omettent souvent les noms des locuteurs et certains gestes. La page de Witch Wars sur Fandom a été ouverte et ses passages/didascalies consultés. Les autres résultats Fandom ci-dessous restent des extraits indexés, même lorsqu'ils sont longs. Leur ouverture complète n'est pas revendiquée.

Les essais d'ouverture infructueux incluent Springfield S04E04, S04E19, S06E21, S07E07, S06E17, S08E13 et S08E22, ainsi que des pages Fandom Enter the Demon, Repo Manor et Forever Charmed. Les recherches ciblées ont fourni des extraits de remplacement. Sarpedon et le bâton de Bouddha ne sont pas ajoutés à ce lot après ces recherches incomplètes ; les fiches du catalogue existant restent disponibles pour une revue future. Aucun échec d'accès n'est décrit comme une preuve d'absence d'une propriété.

La page S05E22 combine les deux parties d'Oh My Goddess! ; le repère S05E22–E23 est donc conservé. Les mots exacts des formules, dosages et recettes ne sont pas reproduits. Aucun script de production officiel, aucune vidéo et aucun minutage audiovisuel vérifié ne sont revendiqués. Comics, reboot, romans et fanfictions rencontrés dans les résultats ont été exclus ; en particulier l'Ancient Athame et l'Empyreal Sword ne sont pas ajoutés à la série S1–S8.

- **T0206** — [S02E06](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s02e06&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Présentation de Kyle ; entraînement (volonté, deux mains) ; fin : objet brisé et fausse potion de courage. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0608** — [S06E08](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e08&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Leo explique le rôle de transmission de Piper ; Mordaunt vole la puissance des chevaliers et vise Wyatt. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0116** — [S01E16](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e16&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Livre : protection liée à l'épée, souvenir de Brianna ; fin : armes humaines distinguées de l'épée de cristal. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0623** — [S06E23](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s06e23&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Barbas/Gideon : bouclier déjà percé, proposition de bénédiction complémentaire ; blessure de Chris et magie de Gideon. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0522** — [S05E22](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e22&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Page combinant Oh My Goddess! parties 1 et 2 : origine des dieux dans le récit, pouvoirs rendus par les sœurs. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0718** — [S07E18](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e18&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Transmission Nina/Hope ; Katya force l'ouverture, menace la gardienne ; Hope rappelle les maux. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0808** — [S08E08](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s08e08&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Billie met la ceinture ; Leo invisible ; dégradation comportementale ; intervention de Leo, formule et retrait. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0117** — [S01E17](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s01e17&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Nicholas explique la bénédiction de Patty ; Patty retire l'enchantement dans le passé ; confrontation au retour. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0508** — [S05E08](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s05e08&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Bacarra boit une potion contenant le sang de Piper puis emporte le Livre ; répliques après le vol. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0717** — [S07E17](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e17&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Piper et Leo miniaturisés par Wyatt ; leur hypothèse de protection ; résultat de localisation vers le manoir. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0320** — [S03E20](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s03e20&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Amulette retirée à Leeza ; Leo explique les moitiés et la restriction envers le Mal ; formule nécessaire ; soupçon concernant Cole devenu humain. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **T0413** — [S04E13](https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s04e13&tv-show=charmed). Niveau : `transcription_non_officielle_consultee`. Repère : Vision initiale ; cinq cristaux orientés ; confrontation avec pouvoir pris à Paige ; inscription du contenant du Hollow et concours Bien/Mal. Passages consultés, sans visionnage ; attributions et gestes parfois omis.
- **FWITCH** — [Witch_Wars_(episode)/Script](https://charmed.fandom.com/wiki/Witch_Wars_(episode)/Script). Niveau : `transcription_non_officielle_consultee`. Repère : S06E21 : sections avec le pendule déplacé par Gideon, activation des Ronyx, transfert via l'athamé et discussion après la blessure de Phoebe. Page ouverte et passages/didascalies consultés. Transcription de fans, sans certification d'authenticité ni vidéo.
- **FTUATHA** — [Tuatha%27s_Wand](https://charmed.fandom.com/wiki/Tuatha%27s_Wand). Niveau : `extrait_indexe_secondaire`. Repère : S02E06 : ambre brisé et perte de magie ; ne pas étendre l'inventaire de pouvoirs à tous les porteurs. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FDRAGON** — [Enter_the_Demon/Script](https://charmed.fandom.com/wiki/Enter_the_Demon/Script). Niveau : `extrait_indexe_transcription_non_officielle`. Repère : S04E04 : âme de Piper capturée, retour dans le corps du Maître, capture de Yen-Lo. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FDRAGON-E** — [Enter_the_Demon](https://charmed.fandom.com/wiki/Enter_the_Demon). Niveau : `extrait_indexe_secondaire`. Repère : S04E04 : attribution des actions à Paige et à la lame ; le résumé de pouvoirs simplifie le corps receveur. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FURN** — [Urn_of_Divine_Powers](https://charmed.fandom.com/wiki/Urn_of_Divine_Powers). Niveau : `extrait_indexe_secondaire`. Repère : S05E22–E23 : réserve, transfert par Leo, retour de Phoebe/Paige et cas différent de Piper. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FCUPID** — [Forever_Charmed/Script](https://charmed.fandom.com/wiki/Forever_Charmed/Script). Niveau : `extrait_indexe_transcription_non_officielle`. Repère : S08E22 : prêt de Coop, pensée et amour, Leo tient la main de Piper, arrivée imprécise ; Dumain réclame la bague. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FFINAL** — [Forever_Charmed/Plot](https://charmed.fandom.com/wiki/Forever_Charmed/Plot). Niveau : `extrait_indexe_secondaire`. Repère : S08E22 : Piper, Patty et Penny chassent le Hollow des cinq femmes. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FRONYX** — [Ronyx_Crystal](https://charmed.fandom.com/wiki/Ronyx_Crystal). Niveau : `extrait_indexe_secondaire`. Repère : S06E21 : noirs pour observation, rouges pour projection ; déclaration d'ancienneté venant de Gideon. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FREPO** — [Repo_Manor/Script](https://charmed.fandom.com/wiki/Repo_Manor/Script). Niveau : `extrait_indexe_transcription_non_officielle`. Repère : S08E13 : Billie reçoit dollhouse sur la planchette ; imposteurs évitent le sujet. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FREPO-E** — [Repo_Manor](https://charmed.fandom.com/wiki/Repo_Manor). Niveau : `extrait_indexe_secondaire`. Repère : S08E13 : démon miniaturisant et enfermant les sœurs dans la réplique. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FCRYSTAL** — [Sight_Unseen/Script](https://charmed.fandom.com/wiki/Sight_Unseen/Script). Niveau : `extrait_indexe_transcription_non_officielle`. Repère : S03E05 : Prue décrit l'enchantement de cristaux de sidérite et son réseau. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.
- **FCRYSTAL-P** — [Sight_Unseen/Plot](https://charmed.fandom.com/wiki/Sight_Unseen/Plot). Niveau : `extrait_indexe_secondaire`. Repère : S03E05 : cristal témoin porté par Prue, qui doit briller au déclenchement du piège. Extrait de recherche consulté ; ne vaut pas lecture intégrale de la page ni visionnage.

## 7. Intégration éventuelle : fichiers concernés et arbitrages

| Fichier actif | Intervention envisageable après revue |
|---|---|
| `Charmed/canon/contributions-integrees/objets.json` | Enrichir les cinq familles déjà correspondantes ; préparer les autres fiches après dédoublonnage. Conserver les versions et les sources existantes. |
| `Charmed/canon/contributions-integrees/manifest.json` | Enregistrer uniquement la version effectivement retenue et ses empreintes, selon le mécanisme existant. Cette contribution n'y est pas inscrite. |
| `Charmed/canon/contributions-integrees/REVUE.md` | Documenter les assertions revues, celles corrigées et celles toujours incertaines. |
| `Charmed/canon/bibliotheque-verifiee.json` | Éventuelles observations atomiques avec épisode, source et limites après examen. Pas de promotion automatique du mot `canon` ou d'un extrait au statut de fait vérifié. |
| `Charmed/canon/construction.json` et `CONSTRUCTION_DES_PARTIES.md` | Ajuster les propriétés de ressources retenues, sans importer des recettes ou conditions non démontrées. |
| `Charmed/BIBLIOTHEQUE.md` | Mettre à jour l'index après intégration effective, en séparant contenu intégré et proposition restante. |

Le catalogue `Charmed/contributions/objets-magiques/objets.proposition.json` est un point de comparaison, pas une cible de modification de cette tâche. La conversation principale devra décider où consolider les textes retenus, sans charger deux fiches identiques comme deux objets distincts.

Arbitrages explicites : confirmer les corps/âmes dans Enter the Demon sur vidéo ; déterminer la formulation de portée des rites du Hollow ; conserver ou préciser les variantes de nom Gaïa/Hippolyte ; choisir les versions temporelles des ressources. Ne pas inventer de disponibilité après destruction ou désenchantement. Aucun arbitrage de règle n'a été appliqué silencieusement.

## 8. Vérifications et travail restant

Contrôles exécutés : 18 fiches uniques, 18 cartes, références résolues, 18 correspondances avec le catalogue existant, épisodes présents dans l'index local, statut non actif et recettes exactes nulles. Le rapport `VERIFICATIONS.json` conserve les résultats et les empreintes de cette livraison. Ces contrôles ne vérifient pas la vérité des scènes et ne testent pas le moteur du jeu.

Relecture documentaire : cartes séparées des contre-moyens ; distinction des niveaux de source ; maintien des contradictions et des états temporels ; absence de propriétés des comics. Le générateur `preparer_documents.py` ne produit que le document principal et le rapport dans son propre dossier.

Travail restant : visionnage ciblé des scènes déterminantes, surtout Lame du Dragon et deux rites du Hollow ; vérification des gestes absents des transcriptions ; appréciation des limites de chaque protection ; consolidation avec les huit familles et les 80 propositions ; adaptation au schéma intégré et contrôle de consommation par l'Ange dans un contexte autorisé. Aucun lancement de partie ne découle de ce dossier.

### Cas de relecture proposés — non exécutés dans le jeu

- Un joueur propose de toucher un démon avec n'importe quel athamé pour obtenir tous ses pouvoirs : demander l'identité et les propriétés établies de la lame.
- Piper retire Excalibur du rocher : ne pas confondre ce geste avec la maîtrise durable de l'épée.
- Un camp pose les deux amulettes sans formule : distinguer réunion et activation ; examiner aussi le bénéficiaire.
- La Lame du Dragon contient l'âme de Piper : déterminer le corps qu'elle occupait et le corps de destination avant de conclure à son sauvetage.
- Un cristal pointe une adresse : ne pas convertir ce seul signal en preuve d'authenticité ou de sécurité.
- Un camp détient la boîte vide du Hollow : ne pas lui attribuer le pouvoir d'absorption de l'entité.
- Une action vise à tuer Katya : ne pas en conclure automatiquement que les maux sont rentrés dans la boîte.
- Une baguette a perdu sa magie mais existe encore : ne pas la traiter comme son exemplaire intact.
- L'urne rend Phoebe et Paige humaines : ne pas présumer que le même geste suffit à résoudre l'état de Piper.
