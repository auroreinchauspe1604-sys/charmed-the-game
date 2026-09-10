# Registre du projet

## 2026-09-08 — validation de la consolidation et construction

Aurore valide les règles consolidées et demande le dossier Charmed, leur implémentation et un premier test. La refonte artistique du plateau vient ensuite. Le corpus consolidé est conservé dans ses quatorze rubriques.

Dernières décisions remplaçant les anciens documents/code :

| Ancienne formulation | Règle applicable |
|---|---|
| Deux pièces minimum sur voie principale | Au moins une pièce initiale ; suffisance jugée de la même façon partout |
| Nombre de moyens caché | Nombre annoncé, identité des moyens à trouver |
| Toute réalisation au matin | Immédiate sans délai nécessaire, sinon à échéance |
| Récupération uniforme d'un jour | Selon ressource, utilisation et conséquence ; indication visuelle |
| Verrou uniquement sur dernière clé principale | Cible précise : état initial, sous-état ou clé adverse |
| Anciennes pièces automatiquement gelées par verrou | Seulement les effets dans la portée réelle du verrou |
| Réponse corrigeable / nouvelle question avec nouveau fait | Une question et une réponse soumise par carte |
| Programme seulement disponible sur demande | Distribution automatique d'un exemplaire à chacun le matin annoncé |
| Échec d'attaque sans contrepartie certaine | Conséquence concrète favorable au défenseur, proportionnée |
| Victoire au seul constat vrai | Constat complet et absence de menace adverse encore réalisable |

Les règles historiques restent consultables pour l'ancienne application ; elles ne doivent pas être réinjectées dans le moteur Charmed courant. L'expertise canonique est un objectif de construction : une base partielle ne doit jamais être présentée comme une connaissance parfaite.

## 2026-09-08 — fidélité de la formulation des états

Correction demandée pendant la partie : « Élise fait confiance à Phoebe et accepte que Phoebe la protège. » Le consentement à une protection ne doit pas être transformé en reconnaissance d'une protection déjà réalisée. L'arbitre peut corriger la grammaire, mais doit préserver les conditions, la temporalité et le sens souhaités. La carte et les textes dépendants ont été corrigés au jour 5, sans coup ni jour supplémentaire, avec sauvegarde préalable du journal.

## 2026-09-08 — aide de rédaction distincte

Validé puis intégré aux fenêtres : sous-état = « Quelle affirmation veux-tu rendre vraie ? » et « Pourquoi aiderait-elle ton état initial ? » ; pose de ressource = « Que veux-tu faire avec cette ressource ? » et « Comment, sur quelle cible et pour obtenir quel effet précis ? ». Les questions restent visibles pendant la saisie. La création d'un sous-état accepté est explicitement indiquée comme consommant le coup. Vérification dans le navigateur des deux parcours, sans soumission ni modification de la partie. L'effet mécanique des questions sur les sous-états reste à discuter avant implémentation.

## 8 septembre 2026 — Plateau Grimoire intégré

Aurore a choisi la proposition Grimoire (cuir vert, parchemin clair). Hiérarchie validée : objectif initial plus grand ; sous-états, clés et verrous de même taille moyenne ; ressources petites, de même taille en main et engagées. Les personnages portent leur nom sans portrait. Face : symbole ou illustration simple, titre et statut ; contenu intégral au verso, consultable au survol et par clic.

L’arbre conserve sa racine en bas à gauche et les sous-états au-dessus, avec contributions horizontales à droite. Radio et calendrier à gauche ; tour et arbitre à droite. Zone d’attaques dédiée par camp, précisant la cible. Question sur carte : ? en attente ; ? ✓ traitée ; clic pour lire la question, la réponse et la décision. La réponse traitée ne signifie pas nécessairement acceptée : la décision reste explicite.

Code couleur préservé : états bleus, clés jaunes, verrous rouges ; ressources disponibles bleues, engagées dans une clé jaunes, engagées dans un verrou rouges, indisponibles grisées, perdues barrées en rouge. Gel : transparence sans changement de famille de couleur.

Implémentation dans ecrans/charmed.html, ecrans/modules/charmed.js et charmed.css. Aucun changement du moteur, des coûts, de la sauvegarde ou du jour en cours. Vérification navigateur : deux racines, deux zones d’attaques, tailles 138 × 172 / 110 × 140 / 66 × 86 px ; ouverture d’une question et réponse existantes ; aucune erreur JavaScript observée. Les illustrations actuelles sont des pictogrammes vectoriels simples, pas les peintures de la maquette. Nouveau thème non lancé lors de cette modification visuelle.

### Ajustements du plateau et des attaques — 8 septembre 2026

Disposition fixe : ressources petites avant la clé, horizontalement. Sous-états affichés dans l’ordre inverse de leur création : emplacement 2 au-dessus du 1, nouveaux emplacements au-dessus des existants. Retrait des statuts Libre et Engagée sur la face des ressources. Les ressources retenues par une clé acquise d’un sous-état encore faux sont présentées dans la main grisée, sans libération mécanique avant le constat du sous-état (règle de rétention conservée).

La cible d’une attaque en cours est déplacée visuellement de sa position habituelle à la zone d’attaque ; aucun changement automatique de propriétaire ni gel mécanique n’est induit par ce déplacement. Fin de l’attaque : retour à la position dictée par son état réel. Une seule représentation de la cible si plusieurs attaques la visent.

Nouvelle condition de déclaration : chaque camp doit posséder au moins une ressource libre au moment de déclarer une attaque. Cette condition ne l’engage pas automatiquement et ne révèle pas les moyens nécessaires avant le lendemain. Contrôle identique dans le moteur et avant appel à l’arbitre.

Panneau Questions en cours supprimé à la demande d’Aurore. Consultation uniquement par les badges des cartes. Vérification : 45 tests moteur, contrôle navigateur sans mutation de la partie.

### Interface sur un seul écran — 8 septembre 2026

Les deux camps restent visibles simultanément : adversaire en haut, joueur en bas. L’interface occupe la hauteur disponible sans défilement de page ni des colonnes latérales. Seules les zones intérieures de jeu défilent. Les mains, noms et commandes restent fixes ; les mains nombreuses se consultent par pages. Le plateau est initialement cadré sur l’objectif racine ; sa position de défilement est conservée lors des mises à jour.

Radio Halliwell : panneau vert sombre, bulletin du matin et historique paginé. Calendrier : panneau parchemin distinct, dates et événements, navigation par pages. Les messages complets se lisent dans une fenêtre paginée. Aucun changement de règle ou de sauvegarde.

Contrôle navigateur aux formats 1366 × 768, 1536 × 1024 et 1920 × 1080 : les deux territoires sont intégralement dans l’écran, absence de défilement de page et des panneaux latéraux ; défilement disponible dans chaque plateau. Capture : visuels/propositions-template/jeu-deux-camps-ecran.png.

### Proportions précisées — 8 septembre 2026

Panneaux Radio, Calendrier, Tour et Arbitre fixes en place et en taille ; deux camps de hauteur égale. Bandeaux et mains compactés pour réserver plus de hauteur aux zones états + contributions + attaques, seules zones défilantes. Ressources : 60 × 70 px dans la main et engagées ; sous-états/clés/verrous : 110 × 116 px ; racine : 132 × 142 px. La disposition et le code couleur sont conservés. Contrôle sur trois formats d’écran : absence de défilement global ou latéral, deux camps visibles.

### Calendrier global — 8 septembre 2026

Vue de tous les jours de la partie en grille. Un point indique les jours avec événements annoncés, un cadre distingue le jour actuel. Sélection d’un jour : liste des événements de ce jour (pagination si plusieurs) ou Aucun événement annoncé. Les détails restent consultables par clic. Le jour actuel est sélectionné au rendu de la nouvelle journée. Les conséquences surprises ne sont pas révélées ; les attaques ne sont inscrites qu’à partir de leur jour de révélation. Radio Halliwell inchangée.

### Cartes et mains compactes — 8 septembre 2026

Sur demande d’Aurore, réduction supplémentaire pour maximiser les cartes visibles : ressources 48 × 60 px (main et plateau), états secondaires/clés/verrous 88 × 94 px, racine 108 × 116 px. Main de 80 px de haut. Espacements réduits ; détails conservés au verso et par clic. Hiérarchie, code couleur et défilement limité aux espaces de jeu inchangés.

### Commandes regroupées avec le tour — 8 septembre 2026

Le budget du coup, l’aide de ciblage et les boutons Terminer mon passage / Reprendre la séquence sont déplacés dans le panneau fixe À vous de jouer. Suppression de leur bandeau sous le plateau, sans changement des actions ou de leurs identifiants. Contrôle visuel et contrôle des deux camps sur trois formats : pas de défilement global ; hauteur gagnée pour chaque espace de jeu.

### Réduction des cartes centrales — 8 septembre 2026

À la demande d’Aurore : sous-états, clés et verrous réduits de 88 × 94 à 72 × 78 px ; objectif initial de 108 × 116 à 88 × 96 px. Ressources et mains inchangées (48 × 60 px). Espacements des lignes resserrés ; hiérarchie, code couleur et accès aux détails conservés. Vérification des trois formats d’écran : les deux camps restent visibles sans défilement global.

### Contenu des cartes compactes — 8 septembre 2026

Symboles et titres réduits pour correspondre aux cartes : symboles 16 px, 22 px pour la racine et 15 px pour les ressources ; titres 8 px, 9 px pour la racine et les personnages. Dimensions des cartes et texte détaillé au verso inchangés.

### Lecture au clic et titres courts — 8 septembre 2026

Retournement au survol supprimé. Un clic ouvre le détail complet et les actions (la sélection d’une ressource conserve le ciblage contextuel existant). Ressources : symbole au-dessus du titre ; personnages nommés. Cartes centrales : libellé court d’affichage, distinct de l’énoncé complet conservé sans modification. Exemples : Confiance et protection, Accord de Nina, Rencontre avec Phoebe. Ajustement typographique pour éviter le débordement dans les petites ressources. Vérifications navigateur : aucune rotation au survol, ouverture du détail au clic avec énoncé intégral, titres contrôlés.

### Faces sans symbole — 8 septembre 2026

Sur demande d’Aurore, suppression des symboles illustratifs dans les cartes, y compris ceux des états. Les titres, statuts logiques, couleurs et badges de question sont conservés. Suppression de la mention Retenue sur les ressources gelées ; leur indisponibilité reste représentée visuellement et détaillée au clic. Aucun changement mécanique.

### Première version jouable validée — 8 septembre 2026

Aurore valide la première session complète de conception et l’interface obtenue. Cette validation ne constitue pas un constat de fin de la partie en cours et ne déclenche pas une nouvelle partie.

Bilan technique revérifié : 45 tests moteur réussis. La version est jouable pour le scénario actuel, avec sauvegarde persistante et arbitrage IA. Restent à construire : gestion autonome des nouvelles parties avec proposition de trois thèmes, scénarios et sauvegardes indépendants ; enrichissement de la connaissance canonique de toute la série. La validation visuelle ne vaut pas validation exhaustive de tous les arbitrages possibles.

### Priorité expertise de Charmed — 8 septembre 2026

Aurore demande de construire et valider l’expertise de la série avant les nouvelles parties. L’expertise doit permettre aussi bien les aventures inédites compatibles que les adaptations d’épisodes réels, en respectant modalités, psychologie, relations, pouvoirs, vocabulaire et temporalité de la série. Première préparation : canon/EXPERTISE_DOSSIER.md et index de 178 épisodes dans canon/episodes-index.json. La couverture exhaustive n’est pas acquise et aucune validation de l’expertise n’est revendiquée.

## Ordre de réalisation validé — expertise, décor, nouvelle partie

Aurore valide cet ordre : (1) compléter les lieux, objets, méthodes, événements, altérations et informations, puis raccorder l'expertise à l'arbitre et à la préparation ; (2) adapter uniquement le décor avec les visuels Charmed fournis, en conservant disposition, proportions et couleurs validées ; (3) proposer trois thèmes et préparer la nouvelle partie après son choix. « Go commence avec 1 » autorise la première étape. Le raccordement technique du corpus partiel ne constitue pas une validation de connaissance parfaite de toute la série. Le devenir des issues alternatives des adaptations reste à préciser avant de le figer.

## Habillage B intégré à l’interface — 8 septembre 2026

Aurore valide l’application directe de la version B : cuir vert sombre, parchemins, titres à lettrines, grenier fondu derrière les deux zones de jeu. Les états et sous-états sont verts ; les clés restent dorées, les verrous rouges et les ressources disponibles bleues. La disposition des cartes et les règles ne changent pas.

Le titre de partie est placé à gauche, le logo Charmed doré et réduit à droite, avec un espace au-dessus du panneau du tour. Les mentions redondantes du jour et du tour, les liens Anciennes parties et Les règles sont retirés de cet écran. Le calendrier, l’arbitre et le cadre inférieur du joueur sont alignés. L’arbitre dispose d’une zone prolongée vers le bas et d’un espace distinct pour la triquetra dorée en bas à droite. Les Fondateurs restent la présentation du bulletin matinal validé.

Implémentation : ecrans/modules/charmed-skin.css, éléments réutilisables dans ecrans/modules/charmed-assets. Vérification de l’interface réelle sur 1366×768, 1536×960 et 1920×1080 : absence de défilement global et de chevauchement des panneaux ; ouverture des cartes, questions et bulletins contrôlée. La partie existante reste au jour 6, révision 25. La prochaine partie sera préparée séparément.

## Correction de l’intégration B — 8 septembre 2026

La première intégration est rejetée par Aurore pour sa fidélité graphique insuffisante. La mention précédente « habillage B intégré » décrit une livraison technique, pas une validation esthétique de ce rendu. Aurore accepte la reprise des matières depuis la maquette, des titres lisibles, des bordures fines et un espace centré réservé au symbole. L’Arbitre est renommé L’Ange du destin dans les libellés interactifs, sans modification de la mécanique.

Correction réalisée : textures raster de cuir sombre et parchemin issues de la référence, suppression de la police Parchment illisible, initiales sobres lisibles, panneau de résolution réduit au-dessus d’une zone distincte de 110 à 175 px pour la triquetra centrée. Le jugement esthétique final appartient à Aurore. Partie conservée au jour 6, révision 25.

### Ajustements complémentaires demandés et intégrés

Titres sous forme d’images à lettrines ; L’Ange du destin avec une seule lettrine L. Les titres sont désormais issus d’un PNG avec canal alpha vérifié, sans fond simulé. Logo doré fourni par Aurore (codex-clipboard-81910a92-29d2-415e-98e8-d22439afbfe1.png) conservé dans ses proportions, teinte rapprochée du symbole par traitement CSS. Ornements aux quatre coins et arabesque au centre supérieur uniquement, agrandie ; aucun ornement au centre inférieur. Faits établis est placé immédiatement sous Lire le message dans le panneau de l’Ange du destin. Le symbole dispose d’une zone distincte centrée sous la navigation. Les textures sont des reconstructions depuis la référence, pas une extraction exacte de la maquette.

## Nouvelle partie — Le manoir assiégé

Aurore choisit le thème 2, défense du manoir avec les trois sœurs. Préparation effectuée au jour 1 face à Zankou, dans une sauvegarde indépendante sur localhost:3130. Objectif joueur en maintien, objectif adverse à établir, trois places par camp et échéance au matin J14. Détails et limites dans parties/manoir-assiege/PARTIE.md. La partie précédente demeure intacte.


## Révision active — verdicts du soir et ressources ouvertes (8 septembre 2026)
La dernière demande d’Aurore autorise l’application de ces règles : accord de formulation à la pose, verdict final après les deux passages, réponses mises en attente du soir, questions sur états/sous-états/clés/verrous, aucun quota affiché pour les clés/verrous, renforts pertinents possibles, lieux seulement si déterminants, séparation des connaissances adverses et des justifications d’arbitrage. Les paragraphes historiques contraires sont remplacés par REGLES_ACTEES.md. Le calendrier distingue événement, information et résolution. L’échéance et la révélation propres aux attaques sont conservées. Aucune réécriture des coups anciens.


### Souplesse d’interprétation
Aurore demande que les connaissances soient mobilisées sans lecture mot à mot. Juger le sens, les variantes et la cohérence ; ne pas imposer les exemples comme recettes ni sanctionner une formulation approximative. Les contradictions concrètes et les pouvoirs réellement indisponibles restent déterminants.


## Même siège, nouvelle sauvegarde et cartes courtes
Aurore demande de recommencer le même scénario avec interprétation globale, cartes courtes et convention Potions contre tout démon de bas grade ; potion nommée seulement contre sa cible. Le scénario manoir-assiege-souple conserve objectifs, durée, événements et nombre de ressources ; Matériel de potion devient explicitement Potions prêtes. La sauvegarde précédente est conservée.

## Questions précises et arbitrage contextuel — 8 septembre 2026
Appliquer la bibliothèque pour vérifier les capacités, puis juger la situation du plateau. Contrôle gratuit de recevabilité des questions sans verdict anticipé : obstacle concret plausible, même non anticipé, sans présence ou pouvoir inventé. La réponse unique doit traiter exactement cet obstacle ; aucune inaction du défenseur ni réussite passée inventée pour éluder une interception. Examen de la réponse le soir. Périmètre questionnable conservé (état initial, sous-état, clé, verrou ; pas ressource isolée), la dernière demande hésitant sur ce point. Ne pas réécrire rétroactivement la sauvegarde. Le passage de réaction et le routage des clés évoqués dans l’audit précédent restent des corrections distinctes à traiter.

## Fenêtre de réaction et voie principale — validation du 8 septembre 2026
Clés/verrous prêts jour J : réaction pendant J+1, examen soir J+1 au plus tôt, annonce matin J+2. Nouvelle pose : fenêtre renouvelée. Voie principale réservée aux preuves directes des conditions de l’objectif final ; préparation dans une branche. Application aux nouvelles contributions, historique acquis conservé.

## Lieux, contrôle et absence de solution révélée — validation du 8 septembre 2026
Une carte Lieu n’est exigée que lorsque le lieu est nommé dans la condition exacte à établir et que son accès, sa présence, son occupation, son contrôle ou sa propriété détermine réellement le résultat. Une pièce seulement habituelle reste accessoire : protéger le Livre avec les cristaux n’exige pas le Grenier. Un lieu est unique et ne peut être volé, consommé, détruit ou transféré comme un objet. Accéder, pénétrer, occuper ou contrôler un lieu relève de clés, même si la force est employée. L’Ange vérifie la formulation exacte mais, lors d’un refus, ne révèle ni la bonne formulation, ni les ressources, ni la chaîne, ni le chemin tactique. Le camp doit découvrir sa solution lui-même.
