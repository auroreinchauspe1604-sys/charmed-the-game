# Expertise Charmed — dossier de construction et premier contrôle

Date : 8 septembre 2026. Statut actuel : corpus partiel raccordé à l'arbitrage et à la préparation de brouillons ; expertise complète non validée. Les sections suivantes retracent aussi les étapes antérieures, lorsqu'il n'était pas encore raccordé.

## Raccordement et construction — état le plus récent

Activation locale : les modifications ci-dessous sont présentes dans le code et testées, mais le redémarrage du serveur sur le port 3129 a été bloqué par le contrôle automatique d'exécution, sans motif détaillé. Le processus déjà ouvert n'a donc pas chargé ces changements. Après ce blocage, la partie est toujours au jour 6, révision 25, phase joueur ; le journal a conservé son empreinte SHA-256 B6EDFAD80757238C4E01124301D96562107C632451894870909C52CBE30A034F. Un redémarrage du serveur reste nécessaire pour l'activation dans l'interface.

L'étape 1 autorisée par Aurore ajoute `construction.json` et sa vue `CONSTRUCTION_DES_PARTIES.md` : 25 fiches (5 lieux, 5 objets, 5 méthodes, 3 événements, 3 altérations, 4 types d'informations). Les références antérieures sont réutilisées sans les compter comme sources indépendantes. Les éléments de gameplay sont identifiés comme tels. Les recettes restent partielles lorsque les preuves le sont.

`expertise-runtime.js` compose le contexte du directeur et celui d'un camp. `intelligence-v3.js` injecte le corpus dans les propositions, poses, réponses et résolutions. Le joueur adverse reçoit une liste explicite de connaissances du commanditaire, pas les faits complets du directeur ni le bestiaire des solutions. Le contexte documentaire n'est pas ajouté au plateau public.

`canon.js` filtre désormais par saison, épisode et moment, avec prudence lorsque l'insertion reste large. Il utilise les acquisitions et pertes documentées et empêche de réutiliser la fiche globale des pouvoirs initiaux pour contourner une perte ultérieure. La preuve sémantique et les interruptions non encore recensées restent contrôlées par le modèle : ce filtre n'est pas un démonstrateur logique de toutes les actions. Les sources secondaires restent identifiées dans les faits admissibles. Les références de fond ne sont pas acceptées automatiquement comme recettes.

La résolution exige aussi un audit canonique ; une référence invalide provoque le rejet de l'opération avant son enregistrement. `prepareBrief` fournit un brouillon de préparation avec documents fixes, connaissances séparées, deux chemins privés par camp et capacité de sous-états calculée. Ce n'est pas encore le parcours utilisateur des trois thèmes ni un démarrage de partie. Ses contrôles mécaniques sont testés avec transport simulé ; la génération réelle d'une nouvelle partie reste pour l'étape prévue après les visuels.

Validation : 70 tests automatisés passés (45 moteur, 16 documentaires, 9 raccordement). Les essais réels de l'IA sont consignés dans `validation-ia-expertise.json`. Ils travaillent uniquement sur un état initial en mémoire, sans Store et sans écriture dans le journal. Ils ne constituent pas une validation exhaustive de l'expertise.

## Ce que l’expertise doit permettre

Aurore veut un système qui connaît profondément Charmed et peut construire deux types de parties : aventures inédites compatibles avec l’univers, ou adaptations d’épisodes réels. L’expertise porte sur les modalités de la série, la psychologie, les relations, les termes, les pouvoirs et leurs limites. Elle ne se réduit pas aux résumés d’épisodes.

Les personnages ou intrigues inventés doivent être identifiés comme créations de la partie. Ils n’autorisent pas à réinventer les propriétés d’un élément canonique. Les actions doivent être jugées sur leurs moyens et sur la situation de jeu, sans imposer la solution d’un épisode.

Pour une adaptation : reprendre la situation de départ et ses contraintes. Proposition à discuter : garder une issue ouverte, en distinguant explicitement la continuité réelle de l’épisode et celle de la partie. Ce choix de conception n’est pas encore acté.

## Audit effectué sur le code actuel

- `base.json` contient huit fiches de faits : couverture trop faible pour revendiquer une expertise.
- `canon.js` filtre par saison, sans finesse à l’épisode ni intervalles d’acquisition/perte ; `verify` est fixé à la saison 1.
- Un identifiant de fait valide n’est pas une preuve suffisante : il faut vérifier que la proposition découle réellement de ce fait, pour cette personne, à cet instant, avec ces limites.
- Les faits historiques, les capacités actuellement disponibles et les connaissances accessibles au personnage ne sont pas séparés assez précisément.
- Les contraintes propres au scénario initial sont mêlées au contexte canonique ; elles ne doivent pas être étendues à toute partie.
- La base actuelle n’a pas de modèle de psychologie ni de relations datées.

## Première matière préparée

`episodes-index.json` indexe 178 épisodes : 22, 22, 22, 22, 23, 23, 22, 22 par saison. Source : [TVmaze, Charmed original](https://www.tvmaze.com/shows/506/charmed), données sous CC BY-SA suivant [la documentation API](https://www.tvmaze.com/api#licensing). Seuls identifiants, titres, dates et liens sont conservés. Chaque entrée reste `not_reviewed` : indexer un épisode ne signifie pas l’avoir analysé ou visionné.

## Contenu requis pour chaque fiche

1. Identité canonique et alias français/anglais, série originale ou autre continuité.
2. Source effectivement consultée et épisode identifié par titre + saison/numéro ; précision sur la profondeur de la preuve.
3. Affirmation atomique : une capacité, une limite, une relation ou un événement précis.
4. Début, fin et conditions de validité ; distinction état habituel, exception temporaire, futur possible ou souvenir.
5. Pour un pouvoir : porteur, effet, déclenchement, cible, portée connue, restrictions, contres et exceptions observées. Une portée inconnue reste inconnue.
6. Pour un sort ou une potion : effet constaté, moyens vérifiés, conditions, consommation et réversibilité. Ne pas fabriquer une recette pour compléter une fiche.
7. Pour un personnage : motivations observées, attachements, conflits, priorités et réactions contextualisées. Une tendance n’est pas une action obligatoire et ne donne pas accès aux secrets des autres.
8. Connaissances : qui sait quoi à la date choisie, et par quel accès. La connaissance encyclopédique de l’arbitre ne rend pas les personnages omniscients.
9. Statut : établi par preuve directe ; étayé par source secondaire ; à vérifier ; contradictoire ; création du scénario. Pas de fusion entre ces statuts.
10. Conséquence d’arbitrage : ce que le fait autorise, ce qu’il ne démontre pas, et les preuves encore nécessaires.

## Sources et premiers problèmes détectés

Priorité aux épisodes et documents officiels pour les mécanismes précis ; les synopsis de diffuseurs servent aux repères, les sources secondaires servent à orienter et recouper. Pas de texte intégral d’épisode copié dans le projet.

- [Paramount, guide saison 1](https://www.intl.paramountplus.com/it/shows/charmed/episodes/1/) : accès effectif après redirection de la page française vers l’italien. L’ordre des épisodes 4 à 6 diffère de l’index TVmaze/Peacock : ne jamais fusionner seulement sur le numéro.
- [Peacock, saison 8](https://www.peacocktv.com/watch-online/tv/charmed/6319188864539161112) : synopsis accessibles via recherche ; ne démontrent pas les détails d’une recette.
- Peacock saisons 2, 3 et 6 : ouverture redirigée vers une restriction géographique ; accès non validé.
- Fiches Fandom de Phoebe, Prue et Paige : ouverture impossible lors de cet audit ; extraits de recherche seulement, non assimilés à une lecture complète.
- [Prue Halliwell](https://en.wikipedia.org/wiki/Prue_Halliwell) : sections télévision et littérature mélangées dans la même page. Les éléments de la continuation en bande dessinée doivent être séparés.
- [Paige Matthews](https://en.wikipedia.org/wiki/Paige_Matthews) : le bouclier d’orbes y figure dans la section comics. Il ne peut pas devenir un pouvoir télévisuel par simple lecture de l’infobox.

## Échantillon de connaissance utile, à recouper avant validation exhaustive

| Sujet | Ce que la première recherche établit via une source secondaire | Ce que le jeu ne doit pas en déduire |
| --- | --- | --- |
| Prue | Télékinésie et développement ultérieur de la projection astrale ; épisode repère Ms. Hellfire, S02E09. [Fiche](https://en.wikipedia.org/wiki/Prue_Halliwell) | Projection astrale disponible dès le début de la saison 1. |
| Mort de Prue | L’attaque de Shax clôt la saison 3 ; sa mort est confirmée au début de la saison 4. [Fiche](https://en.wikipedia.org/wiki/Prue_Halliwell) | Une Prue vivante normalement disponible dans toute partie située après cette transition. |
| Piper | La combustion apparaît dans Exit Strategy, S03E20. [Fiche](https://en.wikipedia.org/wiki/Piper_Halliwell) | La combustion personnelle en saison 1 ou une victoire garantie contre toute cible. |
| Paige | Fille de Patty et Sam, elle rejoint ses sœurs dans Charmed Again ; sa magie de déplacement d’objets est liée aux orbes. [Fiche](https://en.wikipedia.org/wiki/Paige_Matthews) | Une identité et un contrôle des pouvoirs connus de tous avant leur découverte. |
| Guérison de Paige | Distinguer l’aide/canalisation de Leo au début et la guérison autonome décrite dans Payback’s a Witch, S08E12. [Fiche](https://en.wikipedia.org/wiki/Paige_Matthews) | Un simple oui/non « Paige guérit » valable uniformément sur cinq saisons. |
| Bouclier de Paige | La fiche rattache son bouclier d’orbes à la continuation en comics. [Fiche](https://en.wikipedia.org/wiki/Paige_Matthews) | Importation automatique dans les huit saisons télévisées. |

Ces lignes illustrent la granularité requise. Elles ne sont pas présentées comme une revue exhaustive des personnages ni des épisodes.

## Épreuve de validation proposée

L’épreuve doit contenir des actions autorisées et interdites, des cas ambigus et des situations nouvelles. Pour chaque réponse : verdict, raison, période, preuve, limite, et éventuel besoin de vérification.

- Attribution : ne pas confondre les pouvoirs des quatre sœurs.
- Chronologie : tester un pouvoir juste avant et après son acquisition, puis après une perte éventuelle.
- Exception : ne pas transformer un transfert ou un changement temporaire en aptitude permanente.
- Portée : une capacité réelle ne donne pas une portée infinie ou une réussite automatique.
- Source : ne pas accepter une référence vraie mais sans rapport avec l’action.
- Continuité : ne pas mélanger télévision, comics, reboot et fanfiction.
- Psychologie : proposer plusieurs réactions plausibles selon les relations et les faits connus, sans caricature ni omniscience.
- Création : inventer une intrigue compatible avec le canon sans recopier le déroulé d’un épisode.
- Adaptation : identifier les faits authentiques et les événements propres à la partie.
- Incertitude : suspendre le seul point non démontré et chercher la preuve, sans inventer ni interdire arbitrairement toute créativité.

L'épreuve complète de raisonnement narratif et d'arbitrage reste à réaliser. Les 45 tests du moteur de jeu ne sont pas des tests de cette expertise.

## Premier lot construit et contrôlé — 8 septembre 2026

- `personnages.json` : six profils (Prue, Piper, Phoebe, Paige, Leo, Cole), quinze repères chronologiques et dix références. Les qualités de preuve sont conservées, y compris les extraits de recherche et les points à recouper. Les profils de Leo et Cole restent courts et leur chronologie détaillée manque encore.
- `../../serveur/charmed/expertise.js` : recherche documentaire selon le personnage, l'épisode et le moment avant/pendant/après l'épisode. Elle distingue antécédents, événements de l'épisode et repères futurs. Elle conserve les pertes, exceptions, restrictions de continuité et lacunes. Elle ne calcule pas une autorisation d'action.
- `../../serveur/charmed/expertise.test.js` : **10 tests passés** avec `node --test serveur/charmed/expertise.test.js`. Ils contrôlent le référencement et la sélection temporelle, les pertes/restaurations de Phoebe, la guérison assistée/autonome de Paige et l'absence d'autorisation automatique. Ce sont des tests documentaires et techniques, pas une mesure d'expertise encyclopédique ni une épreuve de créativité.
- Ce nouveau module n'est pas encore branché à l'arbitre de la partie active. La base de huit faits reste celle utilisée par le jeu. La partie et son journal n'ont pas été modifiés par ce lot.

Nouvelle source utile : [ITVX, Exit Strategy](https://www.itv.com/watch/charmed/10a3379/10a3379a0064) confirme explicitement le développement explosif du pouvoir de Piper. Les synopsis officiels restent insuffisants pour établir les immunités, portées et recettes. Le [programme M6](https://pro.m6.fr/6ter/grille/2025-48.pdf), accessible par extrait de recherche, situe la privation des pouvoirs de Phoebe ; l'étendue exacte de cette privation reste signalée à recouper dans le corpus.

### Priorités restantes

Ajout demandé par Aurore : Andy Trudeau, Darryl Morris, Chris adulte, Wyatt adulte, Penny Halliwell, Patty Halliwell et Victor Bennett, puis les Fondateurs. Le corpus contient désormais treize profils individuels et une fiche collective, avec seize références puis une référence supplémentaire sur les Fondateurs (dix-sept au total). Les sept nouveaux profils disposent de premières identités, relations, précautions temporelles et points à vérifier ; aucune chronologie complète ni liste exhaustive de pouvoirs n'est revendiquée. Les variantes adultes de Chris/Wyatt et les formes de présence de Penny/Patty sont distinguées explicitement. La fiche des Fondateurs sépare l'autorité collective, les initiatives individuelles et l'arbitre du jeu.

Contrôle après ajout : les dix tests documentaires existants passent ; les quatorze fiches sont accessibles par le module de contexte. Ces ajouts ne modifient pas la partie active.

1. Recouper les acquisitions/pertes encore étayées seulement par sources secondaires, puis enregistrer les interruptions temporaires.
2. Détailler les périodes de Leo et Cole, les relations datées et les secrets connus de chacun. Les tendances psychologiques actuelles ne constituent pas une fiche complète.
3. Construire les règles magiques, lieux, objets, entités, vulnérabilités et contre-moyens avec preuves spécifiques ; garder les recettes inconnues comme telles.
4. Soumettre des propositions de clés, verrous et attaques inédites à une épreuve de raisonnement sourcé. Tester aussi une adaptation d'épisode sans confondre faits de la série et événements de partie.
5. Intégrer le contexte temporel à l'arbitre après ces contrôles, sans faire passer une référence pertinente pour la preuve suffisante de toute une action.

## Prochaine construction dans ce dossier

Dernière extension demandée : Grimlocks, Javna, Ange de la Mort, Ange du Destin, Cupidon et Êtres des ténèbres. Le corpus contient maintenant 13 règles, 15 fiches de menaces démoniaques, 4 autres êtres surnaturels et 1 lieu, avec 43 références. Les anges et Cupidons disposent d'une consultation `kind:'being'`, distincte des démons. Javna et l'Ange de la Mort ne sont pas fusionnés. La fiche Cupidon distingue celui de saison 2 et Coop ; la fiche des Êtres des ténèbres conserve l'exception de guérison de Leo par Piper après échange de pouvoirs. Les ajouts sont des premières fiches sourcées par extraits, avec limites explicites. **16 tests documentaires passent** ; la version lisible est régénérée et l'arbitre actif reste inchangé.

### Lot magie et démons construit — 8 septembre 2026

`magie-demons.json` ajoute 13 règles magiques et 10 fiches de menaces : Source, Balthazar/Belthazor, Barbas, Shax, Zankou, Triade, Prophétesse de la Source, Tempus, Abraxas et Woogyman. Les 26 références distinguent page consultée, extraits secondaires et synopsis de diffuseur. Plusieurs ouvertures Fandom ont échoué ; leurs extraits ne sont pas présentés comme des lectures intégrales. Les solutions connues restent contextuelles et les recettes incomplètes ne sont pas complétées artificiellement.

La lecture humaine est consolidée dans `REGLES_MAGIQUES_ET_DEMONS.md`, générée depuis le JSON par `scripts/render_charmed_magic_reference.cjs`. `expertise.reference` permet de consulter ces fiches avec sources, repères et limites. `checkMagicCorpus` contrôle leur intégrité. Résultat : **14 tests documentaires passés** avec `node --test serveur/charmed/expertise.test.js`. La vérification porte sur le fonctionnement documentaire, pas sur une expertise complète de la série.

Ce lot est une base documentaire de travail autorisée, pas une modification des règles de jeu actées. L'injection dans l'arbitre actif et les tests de raisonnement narratif restent à effectuer. Les priorités non résolues ci-dessus restent ouvertes.

Extension demandée : Nexus, inspecteur Rodriguez, Banshee et Furies. Le corpus compte désormais 13 règles, 13 fiches de menaces et 1 lieu de pouvoir, avec 33 références. Le Nexus est consultable par `reference({kind:'place',id:'nexus'})` ; il n'est pas classé parmi les démons. Rodriguez est distingué de Tempus, qui fournit le mécanisme temporel. Les fiches Banshee/Furies séparent destruction d'une créature et sauvetage d'une sœur transformée. Les sources supplémentaires sont des extraits secondaires ; les détails non établis restent marqués à vérifier. **15 tests documentaires passent** après cette extension. La vue Markdown a été régénérée depuis le corpus ; aucune partie n'a été modifiée.

D’abord fiches des personnages et chronologie des pouvoirs, relations et informations ; ensuite règles magiques, objets/lieux, démons et moyens de les contrer ; enfin cas d’arbitrage et capacité à proposer les deux types de parties. Chaque bloc doit présenter sa couverture réelle et ses lacunes. L’expertise sera validée sur ses réponses sourcées, pas sur une déclaration « expert Charmed ».
