'use strict';
// La dette des Halliwell — 16 septembre 2026.
//
// Partie d'investigation. Histoire originale de saison 3, après S03E18 et avant l'arc canonique
// de la Confrérie de l'Épine (S03E19 « The Demon Who Came in from the Cold », S03E20 « Exit
// Strategy ») : Raynor, Vornac et Klea sont intacts, Cole a ses pouvoirs et n'a pas encore été
// réapproché par la Confrérie.
//
// Le piège : ce n'est pas un enlèvement, c'est une mise en demeure, et le sauvetage vaut
// acceptation. La Confrérie exécute une créance sur la lignée Halliwell et a pris Prue à ce
// titre. Le serment de sang porte sa propre sanction : l'arracher de force rompt l'obligation,
// et la rupture ne l'annule pas — elle la fait exécuter sur la lignée. Le bon mouvement est le
// mouvement perdant.
//
// Les DEUX camps commencent faux (Partie 2, §2 : la répartition doit varier d'un scénario à
// l'autre). La Confrérie détient Prue mais ne détient pas encore un titre opposable et constaté :
// elle doit construire, pas seulement garder.
//
// La Triade est hors plateau, comme Tempus dans « Ce que l'inspecteur Rodriguez cherche ».

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

// --- Mains de départ. Sept cartes par camp, aucune carte de remplissage : chacune sert au moins
// une branche des quatre routes ci-dessous.
const resources = [
  carte('piper', 'Piper Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière, l’aînée des deux qui restent. Elle fige ce qu’elle voit, et fait détoner ce qu’elle ne peut pas figer. Ce qu’elle protège, elle le protège en restant devant.'),
  carte('phoebe', 'Phoebe Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière. Prémonition déclenchée par le contact d’un objet ou d’une personne liée : ce qu’elle voit est court, ambigu, et peut avoir été falsifié. Elle ressent ce que ressent la personne vue.'),
  carte('leo', 'Léo Wyatt', 'personnage', '✦', 'phoebe',
    'Être de lumière. Il soigne les blessures, se déplace et peut porter une question aux Fondateurs. Il ne soigne pas ce qui n’est pas une blessure, et ce qu’il demande en haut, il ne l’obtient pas toujours.'),
  carte('cole', 'Cole Turner', 'personnage', '✦', 'phoebe',
    'Ancien membre de la Confrérie de l’Épine. Il connaît la forme que prennent ses serments et la manière dont elle les fait valoir. Il ne connaît pas cette dette-là. Raynor a été son mentor et sait où le prendre.'),
  carte('livre', 'Le Livre des Ombres', 'objet', '☰', 'phoebe',
    'Grimoire de la lignée : il identifie des maux, prescrit des moyens, conserve ce qui a été écrit. Il ignore certains maux, et ce qu’il ne nomme pas, il ne le prescrit pas.'),
  carte('cristal', 'Le cristal de localisation', 'objet', '◇', 'phoebe',
    'Pendule employé avec une carte. Il désigne un point quand la cible et le lien utilisé le permettent. Un repère n’établit ni l’accès, ni le consentement, ni l’absence d’ennemi sur place.'),
  carte('grenier', 'Le grenier', 'lieu', '⌂', 'phoebe',
    'Où tient le Livre et où s’entasse la mémoire de la famille : malles, papiers, objets des générations précédentes. Certains actes n’opèrent qu’entre ces murs.'),

  carte('raynor', 'Raynor', 'personnage', '◆', 'commanditaire',
    'Figure d’autorité de la Confrérie de l’Épine. Il associe l’influence magique, l’autorité et le chantage pour reprendre le contrôle de ses agents. Il travaille la filiation, la culpabilité et le besoin d’appartenance.'),
  carte('vornac', 'Vornac', 'personnage', '◆', 'commanditaire',
    'Cadre de la Confrérie, capable d’emprunter une autre apparence pour approcher ses cibles. Copier une apparence ne copie pas les pouvoirs de celui dont on prend le visage.'),
  carte('klea', 'Klea', 'personnage', '◆', 'commanditaire',
    'Démon de la Confrérie chargé de vérifier ce qu’on lui rapporte. Elle observe à distance et se déplace. Observer une situation n’est pas lire des pensées, ni percer ce qui a été mis en scène pour elle.'),
  carte('executant', 'L’exécutant', 'personnage', '◆', 'commanditaire',
    'Celui qui a pris Prue et qui la garde. Force et déplacement. Il applique ce qu’on lui a dit d’appliquer, et sait à quelle date il doit l’appliquer.'),
  carte('temoin', 'Le témoin du serment', 'personnage', '◆', 'commanditaire',
    'Il était présent quand l’obligation a été contractée. Sa parole est ce qui rend un titre opposable au-dehors. Il dit ce qu’il a vu ; il peut être retrouvé et réentendu par l’autre camp.'),
  carte('acte', 'L’acte de créance', 'objet', '📜', 'commanditaire',
    'La pièce matérielle où l’obligation est consignée : parties, contrepartie, clause d’extension. Elle prouve le lien ; elle n’est pas le lien. Elle peut être prise ou détruite comme n’importe quel objet.'),
  carte('poche', 'Le monde de poche', 'lieu', '⌂', 'commanditaire',
    'Espace clos et sans adresse où Prue est retenue. On y entre et on en sort par un passage, jamais par une distance. Ce qui l’y maintient n’est pas la clôture.')
];

// --- Objectifs. Les mêmes quatre faits, en sens inverse (aucun ne se déduit d'un autre) :
// C1 titre daté et opposable ; C2 constat de validité par un tiers extérieur ; C3 une Halliwell
// engagée de manière constatable ; C4 Prue retenue à ce titre, ou remplacée.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'La dette éteinte', initialValue: false,
    title: 'Avant le matin du jour 14, l’obligation invoquée sur la lignée Halliwell est éteinte par un fait que la Confrérie de l’Épine peut elle-même constater, aucun tiers extérieur n’en soutient plus la validité, aucune Halliwell n’y est engagée, et Prue Halliwell est revenue sans que sa sortie ait valu rupture de cette obligation.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'Le titre exécutoire', initialValue: false,
    title: 'Avant le matin du jour 14, la créance invoquée sur la lignée Halliwell est constituée en titre daté et opposable, un tiers extérieur à la Confrérie en a constaté la validité, le monde souterrain en a pris acte, et au moins une Halliwell y est engagée — Prue Halliwell toujours retenue à ce titre, ou une autre venue à sa place.'
  }
];

// --- Chemins préparés (privés). Deux par camp, trois branches chacun.
const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Nommer l’obligation',
    sufficiency: 'Savoir ce qui retient réellement Prue, d’où cela vient, et par quelle clause cela atteint quelqu’un qui n’a rien contracté.',
    branches: [
      branche('La nature de ce qui retient Prue est établie : une obligation, et non une clôture.',
        'Provoquer une vision sur ce qui la relie encore à la maison, et confronter ce qu’elle montre à ce que le Livre décrit des serments.', ['phoebe', 'livre']),
      branche('L’acte, sa date et son bénéficiaire sont identifiés.',
        'Faire dire à quelqu’un qui a prêté ces serments la forme qu’ils prennent, et la rapprocher de ce que la famille a gardé sans le lire.', ['cole', 'grenier']),
      branche('La clause qui étend l’obligation à une descendante qui ne l’a pas contractée est établie.',
        'Porter la question là où le bien tient registre, et la faire tenir devant quelqu’un qui peut la contredire.', ['leo', 'piper'])
    ]
  },
  {
    camp: 'phoebe', title: 'Éteindre sans rompre',
    sufficiency: 'Établir une contrepartie recevable, la rendre constatable par ceux qui font valoir la créance, et faire sortir Prue par un acte qui ne vaut pas rupture.',
    branches: [
      branche('Ce qui a été promis est identifié, et ce qui peut en tenir lieu avec.',
        'Remonter de ce que la famille a conservé à ce qui a réellement été cédé, et chercher où cela se trouve encore.', ['grenier', 'cristal']),
      branche('L’extinction est constatable par ceux qui font valoir la créance.',
        'La faire établir dans une forme que le monde souterrain reconnaît, par quelqu’un qui sait laquelle.', ['cole', 'leo']),
      branche('Prue sort par un acte qui ne constitue pas une rupture.',
        'Obtenir la sortie par ce que l’obligation prévoit elle-même, et non contre elle.', ['piper', 'phoebe'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Constituer le titre',
    sufficiency: 'Produire un acte daté, le faire valider au-dehors par quelqu’un qui était là, et le faire enregistrer en bas.',
    branches: [
      branche('L’acte est produit, daté et opposable.',
        'Mettre en forme ce qui a été contracté et lui donner la signature qui l’oppose.', ['acte', 'raynor']),
      branche('Un tiers extérieur à la Confrérie en a constaté la validité.',
        'Faire dire à celui qui était présent ce qu’il a vu, et vérifier qu’il le dira deux fois pareil.', ['temoin', 'klea']),
      branche('Le monde souterrain en prend acte.',
        'Le porter là où ces choses s’enregistrent, par quelqu’un dont la parole y compte.', ['raynor', 'executant'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Provoquer la rupture',
    sufficiency: 'Leur donner l’emplacement, leur donner un moyen d’y entrer, et rendre l’attente plus coûteuse que le risque.',
    branches: [
      branche('Les sœurs savent où Prue est retenue.',
        'Le leur faire apprendre par quelqu’un qu’elles ont des raisons de croire.', ['vornac', 'poche']),
      branche('Elles disposent d’un moyen d’y entrer.',
        'Laisser le passage se découvrir, et vérifier qu’elles l’ont bien trouvé.', ['vornac', 'klea']),
      branche('L’attente leur devient plus coûteuse que le risque.',
        'Faire porter sur la retenue une menace datée que rien ne dément.', ['executant', 'poche'])
    ]
  }
];

// --- Calendrier. La procédure de la Confrérie avance d'elle-même. Aucun événement ne donne de
// solution ni ne rend de verdict. L'événement du jour 3 est une condition d'équité du piège :
// la pénalité de rupture est annoncée par le plateau, jamais découverte à l'exécution.
const evenement = (morning, title, effect, balance, grants) => ({
  id: 'dette-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'La sommation',
    'Une sommation est signifiée au manoir, dans les formes du monde souterrain. Elle énonce qu’une obligation est invoquée sur la lignée Halliwell, que Prue Halliwell est retenue à ce titre, et que toute sortie obtenue contre l’obligation vaudra rupture — auquel cas la pénalité s’exécutera sur la lignée. Elle ne dit ni qui a contracté, ni quand, ni ce qui avait été promis. Aucune condition n’est satisfaite ; mais les deux camps savent désormais ce que coûte la précipitation.',
    'contrainte commune'),
  evenement(5, 'La première apparition',
    'Prue se projette et apparaît au manoir. Elle parle, elle est vue, elle ne peut pas rester et ne peut pas sortir autrement. Elle décrit un lieu clos sans dehors et une absence complète de chaînes : rien ne la retient matériellement. Elle ignore ce qui la retient et ignore qu’une sommation a été signifiée.',
    'occasion commune',
    [{ id: 'ce-que-prue-decrit', title: 'Ce que Prue décrit', icon: '◇', category: 'objet',
       description: 'Le compte rendu de ce que Prue a pu dire pendant son apparition. Ce qu’il contient n’est connu que de qui l’a réellement entendu ou lu.' }]),
  evenement(7, 'Ce que les Fondateurs répondent',
    'Une réponse revient d’en haut, écrite, partielle et prudente. Elle est versée au dossier des deux camps ; ce qu’elle contient n’est connu que de qui l’a réellement lu.',
    'occasion commune',
    [{ id: 'reponse-des-fondateurs', title: 'Réponse des Fondateurs', icon: '📄', category: 'objet',
       description: 'Réponse écrite des Fondateurs sur les obligations contractées par un mortel et leur portée sur une lignée. Ce qu’elle contient n’est connu que de qui l’a réellement lu.' }]),
  evenement(9, 'Le délai court',
    'La Confrérie fixe et fait connaître une date d’exécution. À compter de ce jour, chaque journée passée sans contribution coûte aux deux camps : au camp des sœurs parce que la date approche, au camp adverse parce qu’un titre non constaté à la date ne vaut rien. Le calendrier cesse d’être neutre.',
    'contrainte commune'),
  evenement(11, 'L’offre',
    'Une proposition est transmise aux sœurs, courtoise et précise : la retenue peut cesser immédiatement si une autre Halliwell se présente à sa place. Rien n’y est menaçant et rien n’y est faux. L’offre reste ouverte jusqu’à la date d’exécution ; l’accepter satisferait une condition adverse.',
    'occasion adverse'),
  evenement(14, 'Le constat',
    'Au matin du jour 14, la situation réelle est constatée sur les quatre points : ce que le titre vaut, ce qu’un tiers extérieur en soutient, ce que le monde souterrain en a enregistré, et où se trouve Prue Halliwell. Aucun camp ne l’emporte sur une intention, ni sur la seule annonce du calendrier.',
    'échéance commune')
];

module.exports = {
  id: 'la-dette-des-halliwell',
  title: 'La dette des Halliwell',
  period: 'Saison 3',
  canonPeriod: { season: 3, episode: 18, moment: 'after' },
  finalDay: 14,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 14),
  camps: [
    { id: 'phoebe', name: 'Piper, Phoebe et Léo', icon: '✦' },
    { id: 'commanditaire', name: 'La Confrérie de l’Épine', icon: '◆' }
  ],
  opponentRole: 'La Confrérie de l’Épine, organisation de démons supérieurs spécialisée dans l’infiltration et la prise d’influence, liée par un serment de sang et agissant ici pour le compte d’une autorité qu’elle ne nomme pas. Elle ne cherche ni le combat ni la mort des sœurs : elle exécute une créance et veut en faire un titre que le monde souterrain reconnaisse. Sa force est qu’elle a déjà ce qu’elle voulait tant que personne ne comprend à quel titre elle l’a pris, et que la manière la plus naturelle de lui résister est précisément celle qui lui donne raison. Elle frappe peu, elle presse.',
  goals,
  initialFacts: [
    'Prue Halliwell a disparu du manoir. Elle n’a pas été tuée : elle est retenue, et l’enlèvement est antérieur au premier jour de la partie.',
    'Le Pouvoir des Trois est hors service tant que les trois sœurs ne sont pas réunies.',
    'Rappeler une ancêtre exige le sang des trois descendantes ; les sœurs ne sont que deux.',
    'Cole Turner a appartenu à la Confrérie de l’Épine. Il connaît la forme de ses serments et n’a pas été réapproché par elle.',
    'Nul au manoir ne sait, au premier jour, qu’une obligation est invoquée, ni sur quoi elle porte.',
    'Victor Bennett, père des sœurs, est vivant et sans pouvoir. Il est loin, et personne n’a de raison de penser à lui.'
  ],
  opening: 'Prue a disparu du manoir il y a deux jours. Aucun corps, aucune trace de lutte, aucun démon connu qui revendique. Le Livre ne nomme rien qui corresponde, le cristal ne désigne aucun point, et le Pouvoir des Trois est hors service tant qu’elle manque. Vos deux états initiaux sont FAUX : vous n’avez rien à préserver, vous avez tout à établir — et votre adversaire aussi. Ce qui la retient, vous l’ignorez encore ; et la réponse que vous trouverez d’abord ne sera pas la bonne. Vos cartes sont des moyens, pas des réponses.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je fais valoir une créance réelle, contractée devant témoin par un mortel qui n’était pas une sorcière. Elle porte sur la lignée, pas sur lui seul : c’est la clause, et c’est le seul endroit où le titre est attaquable.',
      'Je ne veux pas la mort des sœurs. Une Halliwell morte détruit le Pouvoir des Trois ; une Halliwell engagée le possède, maintenant et à la génération suivante.',
      'Ma meilleure issue n’est pas de gagner un combat, c’est qu’elles se précipitent. Une sortie obtenue contre l’obligation vaut rupture, et la rupture exécute la pénalité sur la lignée.',
      'Le témoin est ma pièce la plus fragile : sans lui le titre n’est pas opposable au-dehors, et il peut être retrouvé et réentendu par elles.',
      'Détruire l’acte ne me retire pas Prue, mais me retire la voie régulière. Tant qu’il est libre dans ma main, il peut m’être pris.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Prue est vivante et retenue. Ce n’est pas une négociation avec un ravisseur ordinaire : personne n’a rien demandé.',
      'Le Pouvoir des Trois ne reviendra pas avant elle, et rien de ce qui l’exige n’est disponible — y compris rappeler une ancêtre.',
      'Cole connaît la Confrérie de l’intérieur, et la Confrérie le sait. S’en servir, c’est le rendre atteignable.',
      'Ce que montre une prémonition est court et peut avoir été mis en scène pour être vu.',
      'Personne, au premier jour, ne soupçonne que la réponse puisse se trouver dans la famille plutôt que chez un démon.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Ce que Prue décrit': 'Prue décrit une pièce sans fenêtre et sans porte, où rien ne la retient : elle peut se lever, marcher, parler. Elle dit avoir essayé de partir et n’avoir rencontré aucun mur — seulement une impossibilité, comme quelque chose qu’elle aurait accepté et dont elle ne se souviendrait pas. Elle ajoute qu’on ne lui a rien demandé, qu’on ne l’a pas interrogée, et que celui qui la garde attend une date.',
      'Réponse des Fondateurs': 'Les Fondateurs confirment qu’une obligation contractée par un mortel sans pouvoir engage ce mortel, et qu’elle peut porter au-delà de lui lorsque sa formulation le prévoit et qu’un témoin peut l’établir. Ils précisent qu’une telle obligation ne s’éteint pas par la destruction de celui qui la détient, et que sa rupture par la force appelle la sanction qu’elle prévoit. Ils ne disent pas quelle obligation est ici invoquée, ni qui l’a contractée, et indiquent ne pas tenir registre de ce qui est contracté en bas.'
    },
    // --- Ressources que chaque camp voudra probablement demander (Partie 2, §4.5).
    creations: {
      phoebe: [
        { demande: 'Victor Bennett', possible: true, delai: 2,
          obtention: 'Le retrouver et le faire venir ; il n’est pas dans la ville et n’a pas de raison de comprendre l’urgence.',
          limite: 'Il sait qu’il a promis quelque chose et ce qu’il croyait promettre. Il ignore la clause d’extension et ne peut pas l’éteindre par sa seule volonté : il n’est pas la solution, il est la source de la question.' },
        { demande: 'Une potion contre un démon supérieur', possible: true, delai: 2,
          obtention: 'Préparée au manoir ; le matériel et les composants courants sont compris dans la maison.',
          limite: 'Détruire un membre de la Confrérie n’éteint aucune obligation et peut en précipiter l’exécution. Une potion ne fait pas tomber un titre.' },
        { demande: 'Un sort d’ouverture vers le monde de poche', possible: true, delai: 2,
          obtention: 'Écrit par les sœurs à partir du Livre ; il faut un lien avec la personne retenue.',
          limite: 'Il ouvre un passage. Il ne dit pas ce qui la retient, et l’employer pour la faire sortir contre l’obligation vaut rupture.' },
        { demande: 'Un accès aux registres du monde souterrain', possible: true, delai: 3,
          obtention: 'Par quelqu’un dont la parole y compte — donc par Cole, et à son risque.',
          limite: 'Donne ce qui y a été enregistré, et rien de plus. Y paraître, c’est s’y faire remarquer.' },
        { demande: 'Rappeler une ancêtre', possible: false,
          limite: 'Refusée : le sort exige le sang des trois descendantes et elles ne sont que deux. La condition manquante est précisément l’objet de la partie.' },
        { demande: 'Reconstituer le Pouvoir des Trois autrement', possible: false,
          limite: 'Refusée : rien au plateau ne le fonde à cette période. Le Pouvoir des Trois suppose la réunion des trois, ce qui est le résultat recherché et non un moyen d’y parvenir.' },
        { demande: 'Un effacement de l’obligation par la magie', possible: false,
          limite: 'Refusée : aucun moyen établi ne défait un serment de sang à volonté, et un tel acte serait lui-même la rupture que l’obligation sanctionne.' }
      ],
      commanditaire: [
        { demande: 'Un second témoin du serment', possible: true, delai: 3,
          obtention: 'Le retrouver parmi ceux qui étaient présents ; ils sont peu nombreux.',
          limite: 'Renforce la constatation. Multiplie aussi les personnes que l’autre camp peut atteindre et réentendre.' },
        { demande: 'Une copie certifiée de l’acte', possible: true, delai: 1,
          obtention: 'Établie par la Confrérie elle-même.',
          limite: 'Une copie n’est pas le titre : elle ne survit pas à la contestation de l’original et ne remplace pas la pièce détruite.' },
        { demande: 'Un chasseur pour retrouver quelqu’un', possible: true, delai: 2,
          obtention: 'Recruté hors de la Confrérie.',
          limite: 'Suit une trace. Ne contraint aucune volonté et ne rend rien opposable.' },
        { demande: 'Une pression sur Cole Turner', possible: true, delai: 1,
          obtention: 'Par Raynor, qui a été son mentor et sait où le prendre.',
          limite: 'Travaille sa loyauté, ne la commande pas. Aucun contrôle universel et irrésistible n’est établi sur lui ; il peut se retourner.' },
        { demande: 'Un exécuteur pour tuer une des sœurs', possible: false,
          limite: 'Refusée comme ressource, et contraire à l’objectif : une Halliwell morte détruit le Pouvoir des Trois que la créance sert à posséder. Neutraliser une personne relèverait de l’attaque, avec sa déclaration et ses défenses.' },
        { demande: 'Un appui direct de la Triade', possible: false,
          limite: 'Refusée. La Triade est hors plateau : elle commande et attend, elle n’agit jamais elle-même et ne constitue aucune ressource jouable.' },
        { demande: 'Déplacer Prue ailleurs pour la rendre introuvable', possible: false,
          limite: 'Refusée : la rétention est exécutée au titre de l’obligation, et la soustraire à toute constatation retirerait au titre ce qui le rend opposable. Ce serait détruire ce que la demande prétend protéger.' }
      ]
    },
    inventions: [
      'La dette de Victor Bennett et sa clause d’extension à la lignée sont une invention de scénario. Le canon décrit un père qui s’éloigne pour protéger ses filles de la magie ; aucun pacte ne lui est attribué par la série.',
      'Le monde de poche comme moyen de rétention à cette période est un moyen générique de scénario. Le précédent canonique (Gith, S06E06 « My Three Witches ») est de saison 6 et n’est pas transposé tel quel.',
      'Le témoin du serment, l’exécutant et l’acte de créance comme objet matériel sont inventés pour ce scénario.',
      'La procédure de constatation du monde souterrain — signification, validation par un tiers, prise d’acte — est une invention cohérente avec une organisation liée par serment, pas une procédure canonique.',
      'La clause « détruire le créancier n’éteint pas l’obligation et peut l’exécuter » est transposée de Zahn (S06E07 « Soul Survivor »), où la destruction du coffre des contrats précède celle du démon. Ce n’est pas une loi générale des pactes de la série.',
      'L’arc de la Confrérie est déplacé : Raynor, Vornac et Klea sont actifs simultanément avant S03E19, alors que le canon les situe en S03E19 et S03E20. Aucun épisode n’est reproduit.',
      'La projection astrale de Prue à cette période est une hypothèse de conception à contrôler dans la bibliothèque avant validation. Si elle est infirmée, l’événement du jour 5 se remplace par un message porté par un tiers, sans toucher aux routes.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 3, après S03E18, avant l’arc canonique de la Confrérie. L’enlèvement de Prue est un fait établi antérieur au jour 1 : il ne se rejoue pas, ne se conteste pas, et n’est pas une attaque au sens de la Partie 2, §8 — une personne retenue n’est ni une ressource libre prise en main adverse ni un objet transférable.',
    'Le piège de la partie est que le mouvement juste est le mouvement perdant. Une sortie de Prue obtenue contre l’obligation vaut rupture, et la rupture n’annule rien : elle exécute la pénalité sur la lignée. L’arbitre ne refuse jamais une tentative de sortie en force pour ce motif — elle est permise, recevable, et elle coûte ce qu’elle coûte. Le jeu prévient par la sommation du jour 3 ; il ne prévient pas deux fois.',
    'La pénalité doit rester atteignable par la connaissance avant de l’être par l’expérience. Deux chemins au moins y mènent — la réponse des Fondateurs au jour 7 et ce que Cole sait de la forme des serments — et l’arbitre ne révèle jamais lequel ni ce qu’ils contiennent.',
    'Tuer un membre de la Confrérie n’éteint aucune obligation. Détruire Raynor, en particulier, ne libère pas Prue et peut précipiter l’exécution : le serment de sang est le lien, l’acte n’en est que la preuve, et le créancier n’est pas la créance. Ce n’est pas une interdiction d’arbitre, c’est un fait du monde, et il s’applique identiquement aux deux camps.',
    'L’acte de créance est un objet matériel et destructible. Tant qu’il est libre dans la main adverse, il peut être attaqué comme n’importe quel objet ; dès qu’il est engagé dans une contribution, il relève du verrou et non de l’attaque. Le détruire coupe la voie régulière de la Confrérie sans rendre Prue : c’est un coup fort, jamais un coup gagnant, et l’arbitre ne l’annonce pas.',
    'La Triade est hors plateau. Elle commande et attend ; elle n’agit jamais elle-même, ne se déplace pas, n’est pas une ressource et ne peut pas être atteinte. Aucun camp ne gagne ni ne perd en la nommant.',
    'Démasquer Vornac ne fait gagner personne. Aucune des quatre conditions ne dépend de son identité. Ce qu’il apporte aux sœurs est vrai : il ne ment pas, il oriente — vers l’emplacement plutôt que vers la clause, et vers la mauvaise génération plutôt que vers la bonne. Une information exacte donnée dans une mauvaise intention reste une information exacte, et l’arbitre la traite comme telle.',
    'Le pivot de la partie est la distinction entre trouver et délier. Savoir où est Prue ne satisfait aucune condition, pour aucun camp. Ce qui compte est ce qui la retient, ce qui peut l’éteindre, et ce que le monde souterrain peut en constater.',
    'C1 est formel (un acte daté et opposable, pas une affirmation) ; C2 exige un tiers extérieur à la Confrérie ; C3 porte sur un engagement constatable, pas sur une intention ni sur la seule possession d’une personne ; C4 porte sur la situation réelle de Prue au matin du jour 14. Accepter l’offre du jour 11 satisferait C3 et C4 pour l’adversaire.',
    'Victor Bennett n’est pas la solution. Il sait ce qu’il croyait promettre, il ignore la clause, et sa volonté seule n’éteint rien : une obligation contractée et constatée ne se défait pas par le regret de celui qui l’a contractée. Le faire venir est un moyen d’établir des faits, jamais un raccourci vers la condition.',
    'Le camp des sœurs n’est pas un camp affaibli parce qu’il lui manque le Pouvoir des Trois. Une prémonition, un grimoire, un Être de lumière, un ancien démon et la mémoire d’une famille sont des moyens entiers, et ne doivent pas être jugés plus sévèrement que des moyens offensifs.',
    'Les deux camps commencent faux et doivent construire. La Confrérie détient Prue sans détenir encore de titre : sa position de départ n’est pas un acquis, et elle a ses propres branches à établir. Aucun camp ne se contente de réagir.',
    'Employer Cole est permis et coûte. Raynor a été son mentor et sait où le prendre ; l’exposer est un risque réel, jamais un motif de refus. L’arbitre constate ce que l’acte laisse derrière lui, et seulement s’il y avait réellement quelqu’un pour l’observer — pas de trace automatique, et l’observation de Klea n’est ni de la télépathie ni une portée illimitée.',
    'Les ressources distribuées sont des moyens et jamais des solutions : aucune condition d’objectif ne peut être établie par l’emploi d’une seule carte conforme à sa description. Les demandes de création prévisibles sont listées dans privateFacts.creations ; une demande absente s’examine normalement selon la Partie 2, §4.5.',
    'Les gestes et déplacements ordinaires sont compris dans l’action. Une localisation non précisée n’est pas une incohérence.'
  ].join(' ')
};
