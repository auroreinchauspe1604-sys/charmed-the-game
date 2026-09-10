'use strict';
// La sentence des Fondateurs — 10 septembre 2026.
//
// Partie construite après la refonte du 10 septembre. Principes appliqués :
//  - chaque carte distribuée est un MOYEN, utile sur plusieurs chemins, jamais
//    une solution : aucune condition d'objectif ne peut être établie par une
//    seule carte employée conformément à sa description ;
//  - une ressource porte ses accessoires ordinaires (Partie 2 §4.2) : aucune
//    quête annexe n'est nécessaire pour employer ce qu'un camp possède déjà ;
//  - les ressources qu'un camp voudra CRÉER sont anticipées dans
//    privateFacts.creations, avec leur obtention concrète, leur délai et ce
//    qu'elles ne font pas — l'arbitre juge sur cette base au lieu d'improviser ;
//  - les deux objectifs portent sur les mêmes quatre faits : l'un les tient
//    (vrai à maintenir), l'autre doit les renverser (faux à établir) ;
//  - le calendrier offre des occasions et des contraintes, jamais des solutions.

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

// --- Mains de départ. Sept cartes par camp, aucune de remplissage : chacune
// sert au moins deux chemins différents, et aucune ne suffit à elle seule.
const resources = [
  carte('phoebe', 'Phoebe Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière. Prémonitions déclenchées par un contact pertinent avec un objet ou une personne ; lit les gens, les liens et les silences. Ce qu’elle voit est un aperçu, jamais une preuve opposable.'),
  carte('piper', 'Piper Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière. Fige ce qu’elle voit et provoque des explosions moléculaires, dans la limite de sa portée et de sa vue. Elle immobilise et contraint ; elle n’établit rien.'),
  carte('paige', 'Paige Matthews', 'personnage', '✦', 'phoebe',
    'Sorcière et être de lumière, accusée. Ses pouvoirs sont suspendus par la décision du conseil : elle ne s’orbe pas et ne déplace rien par orbes tant que la suspension tient. Elle garde ce qu’elle sait de la procédure, du conseil et des gens qu’elle a aidés.'),
  carte('livre', 'Le Livre des Ombres', 'objet', '📖', 'phoebe',
    'Grimoire familial. Contient connaissances, formules et recettes, avec ce qu’il faut pour les mettre en œuvre. Une consultation prend du temps, et ce qu’on y trouve dépend de ce qu’on y cherche.'),
  carte('grenier', 'Le grenier', 'lieu', '⌂', 'phoebe',
    'Pièce du manoir tenue par les sœurs. On y cherche, on y prépare et on s’y parle sans être vu ni entendu. Rien de ce qui s’y fait n’a de valeur devant le conseil tant que ce n’est pas porté devant lui.'),
  carte('cristaux', 'Cristaux magiques', 'objet', '◈', 'phoebe',
    'Selon leur disposition, ils protègent un espace ou confinent une cible. Leur effet dure tant qu’ils restent en place, et cesse dès qu’un cristal est retiré de son alignement.'),
  carte('fondateur', 'Un Fondateur réticent', 'personnage', '☼', 'phoebe',
    'Membre du conseil qui doute de l’accusation sans le dire. Il peut ouvrir une porte, transmettre une demande, obtenir un délai. Il n’agira jamais sur une conviction : il lui faut quelque chose à tenir, et il se retire s’il est exposé.'),

  carte('vaeros', 'Vaéros', 'personnage', '◆', 'commanditaire',
    'Démon patient. Il ne combat pas et ne se montre pas : il fabrique des situations et laisse les autres en tirer les conclusions. Sa force est de n’être nulle part dans ce qu’il a provoqué.'),
  carte('temoin', 'Le témoin', 'personnage', '◇', 'commanditaire',
    'Celui qui a porté la pièce devant le conseil. Son récit est cohérent et tient tant que rien de constatable ne le contredit. Il n’est pas démon et ne se sait pas instrument.'),
  carte('piece', 'La pièce produite', 'objet', '▣', 'commanditaire',
    'L’objet déposé au conseil comme preuve contre Paige. Il porte une trace magique réelle. Ce que cette trace établit dépend entièrement de qui l’examine et de ce qu’il sait chercher.'),
  carte('sceau', 'Le sceau du conseil', 'objet', '⌾', 'commanditaire',
    'Formalité qui rend une pièce opposable devant les Fondateurs. Ce qu’il scelle ne s’écarte que par une procédure régulière, jamais par une affirmation, si juste soit-elle.'),
  carte('refuge', 'Le refuge de Vaéros', 'lieu', '⌂', 'commanditaire',
    'Hors d’atteinte ordinaire. On y prépare et on y décide. Aucune voie directe ne le relie au conseil ni au manoir ; ce qui en sort passe par quelqu’un.'),
  carte('intermediaire', 'L’intermédiaire', 'personnage', '◇', 'commanditaire',
    'Porte messages et objets entre le refuge et le monde. Il n’intervient jamais lui-même et ne décide de rien. Le rôle de Vaéros ne se lit sur lui que si l’on remonte le trajet.'),
  carte('salle', 'La salle du conseil', 'lieu', '⌂', 'commanditaire',
    'Lieu du jugement, tenu par la procédure. Y accéder, y être entendu et y être cru sont trois choses distinctes : la troisième ne s’obtient jamais par les deux premières.')
];

// --- Objectifs. Les deux portent sur les mêmes quatre faits, en sens inverse.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'La sentence renversée', initialValue: false,
    title: 'Avant le matin du jour 12, la pièce produite contre Paige est établie comme fabriquée devant les Fondateurs, le témoin qui l’a apportée est revenu sur son récit ou démasqué comme instrument, l’origine démoniaque de l’accusation est nommée devant le conseil, et Paige a de nouveau l’usage libre de ses pouvoirs.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'L’accusation tenue', initialValue: true,
    title: 'Jusqu’au matin du jour 12, la pièce produite reste tenue pour authentique par les Fondateurs, le témoin conserve sa crédibilité et reste hors d’atteinte des sœurs, l’origine démoniaque de l’accusation demeure ignorée du conseil, et Paige reste privée de l’usage de ses pouvoirs.'
  }
];

// --- Chemins préparés (privés). Deux par camp, trois branches, chaque branche
// croisant deux moyens de natures différentes. Ce ne sont pas les seuls chemins.
const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Remonter l’objet',
    sufficiency: 'Établir ce que la trace de la pièce dit vraiment, puis porter ce constat là où il est opposable.',
    branches: [
      branche('Les sœurs savent ce que la trace de la pièce établit réellement, et non ce qu’on en a conclu.',
        'Croiser un contact direct avec l’objet et une recherche menée à l’écart sur ce type de trace.', ['phoebe', 'livre']),
      branche('Ce constat est porté devant le conseil sous une forme que la procédure accepte.',
        'Obtenir qu’une demande régulière soit déposée par quelqu’un que le conseil doit entendre.', ['fondateur', 'grenier']),
      branche('La pièce cesse d’être tenue pour authentique.',
        'Confronter le constat établi à la pièce scellée, en présence de ceux qui l’ont admise.', ['fondateur', 'phoebe'])
    ]
  },
  {
    camp: 'phoebe', title: 'Remonter les gens',
    sufficiency: 'Atteindre le témoin, comprendre par qui il a été employé, et faire dire ce trajet devant le conseil.',
    branches: [
      branche('Le témoin est atteignable et ne peut plus se dérober.',
        'Le retenir dans un espace dont il ne sort pas, par quelqu’un capable de l’immobiliser sur place.', ['piper', 'cristaux']),
      branche('Le trajet qui relie le témoin à celui qui l’a employé est connu des sœurs.',
        'Faire parler ce que le témoin porte sur lui et ce qu’il sait sans le savoir.', ['phoebe', 'paige']),
      branche('Ce trajet est établi devant les Fondateurs.',
        'Faire porter au conseil un récit vérifiable par quelqu’un qu’il ne peut pas écarter.', ['fondateur', 'paige'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Tenir la procédure',
    sufficiency: 'Faire que tout ce que les sœurs trouvent soit irrecevable, et que le conseil n’ait jamais à rouvrir.',
    branches: [
      branche('Ce que les sœurs établissent n’atteint jamais la forme que le conseil accepte.',
        'Opposer la régularité du dépôt à toute demande qui ne suit pas la voie prévue.', ['sceau', 'salle']),
      branche('Le membre du conseil qui doute cesse de porter les demandes des sœurs.',
        'Faire savoir, sans menace formulable, que sa position est connue.', ['intermediaire', 'salle']),
      branche('La pièce garde la lecture qui a été retenue contre Paige.',
        'Entretenir l’interprétation admise en fournissant ce qui la confirme au moment utile.', ['piece', 'vaeros'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Tenir les gens',
    sufficiency: 'Garder le témoin crédible et hors de portée, et rester invisible dans son trajet.',
    branches: [
      branche('Le témoin reste hors d’atteinte des sœurs.',
        'Le tenir dans un lieu que rien ne relie au conseil, et n’y faire passer que ce qui est nécessaire.', ['temoin', 'refuge']),
      branche('Le récit du témoin reste cohérent malgré ce que les sœurs découvrent.',
        'Ajuster ce qu’il sait avant qu’il soit interrogé, sans qu’il comprenne d’où cela vient.', ['temoin', 'intermediaire']),
      branche('Rien dans le trajet ne remonte jusqu’à Vaéros.',
        'Interrompre le lien matériel dès qu’il devient suivable.', ['vaeros', 'refuge'])
    ]
  }
];

// --- Calendrier : occasions et contraintes communes, jamais de solution.
const evenement = (morning, title, effect, balance, grants) => ({
  id: 'sentence-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'Audience préparatoire',
    'Le conseil se réunit brièvement pour fixer l’ordre des débats. Chaque camp apprend que la pièce sera réexaminée une fois, et une seule, avant la sentence. Rien n’est décidé sur le fond.',
    'contrainte commune'),
  evenement(5, 'Un registre rouvert',
    'Les archives du conseil sont ouvertes pour la durée de l’instruction. Ce qui y figure est consultable par qui a le droit d’y entrer ; on n’y trouve que ce qui y a été consigné.',
    'occasion commune'),
  evenement(7, 'Un objet remis au greffe',
    'Un objet sans importance apparente est déposé au greffe du conseil et rendu accessible aux deux camps. Nul ne sait ce qu’il porte avant de l’avoir examiné.',
    'occasion commune',
    [{ id: 'objet-greffe', title: 'Objet remis au greffe', icon: '▢', category: 'objet',
       description: 'Un objet déposé au greffe pendant l’instruction. Ce qu’il porte n’est connu que de qui l’a réellement examiné.' }]),
  evenement(9, 'Le conseil se ferme',
    'Les Fondateurs suspendent les entrées libres jusqu’à la sentence. Y accéder demande désormais que quelqu’un du conseil en réponde. Ce qui a déjà été déposé reste au dossier.',
    'contrainte commune'),
  evenement(12, 'La sentence',
    'Les Fondateurs statuent sur l’état réel du dossier : ce que la pièce établit, ce que vaut le témoin, ce que le conseil sait de l’origine de l’accusation, et la situation de Paige. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'sentence-des-fondateurs',
  title: 'La sentence des Fondateurs',
  period: 'Saison 7',
  canonPeriod: { season: 7, episode: 17, moment: 'after' },
  finalDay: 12,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 12),
  camps: [
    { id: 'phoebe', name: 'Les sœurs Halliwell', icon: '✦' },
    { id: 'commanditaire', name: 'Vaéros', icon: '◆' }
  ],
  opponentRole: 'Vaéros, démon patient et manipulateur. Il ne combat jamais et ne se montre pas : il construit une accusation crédible et la laisse produire ses effets. Il n’a aucun pouvoir volé et ne cherche pas à en prendre.',
  goals,
  initialFacts: [
    'Les Fondateurs ont ouvert une instruction contre Paige Matthews et suspendu l’usage de ses pouvoirs jusqu’à la sentence.',
    'Une pièce a été déposée devant le conseil comme preuve contre elle, et scellée selon la procédure.',
    'Cette pièce porte une trace magique réelle ; ce qu’elle établit n’a été examiné que par ceux qui l’ont admise.',
    'Un témoin a porté cette pièce au conseil. Son identité est connue, sa position ne l’est pas.',
    'Le conseil ignore que l’accusation a une origine démoniaque.',
    'Phoebe et Piper conservent l’usage entier de leurs pouvoirs.',
    'Les sœurs et le conseil savent que la sentence tombe au matin du jour 12.'
  ],
  opening: 'Les Fondateurs ont ouvert une instruction contre Paige : on l’accuse d’avoir transmis un pouvoir à un mortel et d’en avoir laissé mourir un autre. Une pièce a été déposée devant le conseil, scellée, et un témoin en a porté le récit. Les pouvoirs de Paige sont suspendus jusqu’à la sentence, au matin du jour 12. Personne au conseil ne soupçonne que l’accusation a été fabriquée. Votre état initial est FAUX : vous devez le renverser sur ses quatre points avant l’échéance. Vos cartes sont des moyens, pas des réponses — aucune n’établit à elle seule une condition de votre objectif, et ce qui se prouve au grenier n’a aucune valeur tant que ce n’est pas porté là où on juge.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis Vaéros. J’ai fabriqué l’accusation contre Paige Matthews et je l’ai fait porter au conseil sans jamais y paraître.',
      'La pièce déposée porte une trace réelle : c’est ce qui la rend crédible. Ce qu’elle établit vraiment se lit par qui sait chercher.',
      'Le témoin est sincère : il ne sait pas qu’il est mon instrument, et il ne peut donc pas me trahir volontairement.',
      'Mon lien avec l’affaire ne se voit que si l’on remonte le trajet matériel de la pièce.',
      'Je ne possède aucun pouvoir volé et je ne cherche pas à en prendre. Ma position tient par la procédure, pas par la force.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Paige est accusée à tort ; aucune des sœurs ne sait qui est derrière l’accusation.',
      'Ce qui se démontre entre sœurs n’a aucune valeur tant qu’il n’est pas porté devant le conseil dans une forme recevable.',
      'La suspension des pouvoirs de Paige est une décision du conseil : elle ne se lève ni par la force ni par la ruse, mais par ce que le dossier établit.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Objet remis au greffe': 'Un anneau de service, appartenant à l’intermédiaire, égaré lors d’un dépôt. Il ne prouve rien à lui seul : il porte seulement la marque d’un trajet entre le refuge et le greffe, lisible par qui sait ce qu’il cherche.'
    },
    // --- Ressources que chaque camp voudra probablement demander. Anticipées ici
    // pour que l'arbitre juge sur une base construite, avec obtention concrète,
    // délai réel, et surtout ce que la ressource NE fait PAS.
    creations: {
      phoebe: [
        { demande: 'Un philtre ou une formule de vérité', possible: true, delai: 1,
          obtention: 'Le Livre en contient la recette ; la préparation se fait au grenier avec ce que les sœurs ont déjà.',
          limite: 'Empêche une personne de soutenir un mensonge sur le moment. N’établit rien sur la pièce, ne lie pas le conseil, et une parole obtenue ainsi doit encore être portée régulièrement.' },
        { demande: 'Un sort de traçage sur un objet ou une personne', possible: true, delai: 1,
          obtention: 'Formule du Livre, appuyée sur un objet réellement lié à la cible.',
          limite: 'Donne une direction ou un trajet, jamais une identité ni une preuve opposable.' },
        { demande: 'Le témoignage d’une personne que Paige a réellement aidée', possible: true, delai: 2,
          obtention: 'Il faut la retrouver et la convaincre de venir ; elle n’a aucune raison de s’exposer.',
          limite: 'Renforce la crédibilité de Paige. Ne dit rien de la pièce ni du témoin, et ne renverse aucune condition à lui seul.' },
        { demande: 'L’accès aux archives du conseil', possible: true, delai: 1,
          obtention: 'Par le Fondateur réticent, tant qu’il n’est pas exposé, et pendant l’ouverture de l’instruction.',
          limite: 'Donne à consulter ce qui a été consigné. Ne fournit aucune pièce nouvelle et ne vaut aucune décision.' },
        { demande: 'Une preuve établissant que la pièce est fabriquée', possible: false,
          limite: 'Refusée : c’est une condition de l’objectif. Elle s’établit par une clé, jamais par une ressource accordée.' },
        { demande: 'La levée des pouvoirs de Paige par un moyen magique', possible: false,
          limite: 'Refusée : la suspension est une décision du conseil, pas un sort. Elle tombe avec ce que le dossier établit.' }
      ],
      commanditaire: [
        { demande: 'Un second témoin corroborant', possible: true, delai: 2,
          obtention: 'Par l’intermédiaire, ce qui rend son trajet plus visible.',
          limite: 'Renforce le récit. Augmente d’autant ce qui peut être remonté jusqu’au refuge.' },
        { demande: 'Une pièce complémentaire déposée au dossier', possible: true, delai: 1,
          obtention: 'Doit passer par la procédure et donc par le greffe.',
          limite: 'Opposable comme la première, et examinable comme elle.' },
        { demande: 'Une pression sur le Fondateur réticent', possible: true, delai: 1,
          obtention: 'Faire savoir que sa position est connue, sans menace formulable.',
          limite: 'Le fait se retirer. Ne le fait pas mentir et ne le retourne pas.' },
        { demande: 'Une copie ou une contrefaçon du sceau', possible: false,
          limite: 'Refusée : le sceau est unique et sa régularité est ce qui lui donne sa valeur.' },
        { demande: 'Un pouvoir pris aux sœurs', possible: false,
          limite: 'Refusée : hors de la position de Vaéros, qui tient par la procédure et non par la force.' }
      ]
    },
    inventions: [
      'Vaéros, l’intermédiaire, le témoin, la pièce produite et le Fondateur réticent sont des inventions de ce scénario.',
      'La procédure du conseil — dépôt scellé, réexamen unique, fermeture des entrées avant sentence — est une invention cohérente avec l’univers, non une règle canonique.',
      'La suspension des pouvoirs d’un être de lumière accusé est une invention de scénario ; elle est traitée comme une décision administrative, jamais comme un sort.',
      'Aucun épisode n’est reproduit : l’histoire est originale.'
    ]
  },
  doctrine: [
    'Histoire originale, aucune reproduction d’épisode. Période saison 7 : Phoebe a ses prémonitions, Piper fige et fait exploser, Paige est sorcière et être de lumière mais ses pouvoirs sont suspendus par la décision du conseil.',
    'Les ressources distribuées sont des MOYENS et jamais des solutions : aucune condition d’objectif ne peut être établie par l’emploi d’une seule carte conforme à sa description. Une contribution qui fait seulement faire à une ressource ce qu’elle fait habituellement n’établit aucun changement.',
    'Une ressource porte ses accessoires ordinaires : le Livre comprend ses formules et de quoi les mettre en œuvre, une sorcière comprend son savoir-faire. Aucune quête annexe n’est exigée pour employer ce qu’un camp possède déjà. Un composant ne devient une carte que s’il est rare, disputé, ou retiré du jeu par un fait du plateau.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 3 §2 bis.',
    'Quatre faits distincts structurent la partie : ce que la pièce établit, ce que vaut le témoin, ce que le conseil sait de l’origine, et la situation de Paige. Aucun ne se déduit d’un autre. Établir un fait au grenier ne le rend pas opposable : il faut encore le porter devant le conseil dans une forme régulière.',
    'Vaéros ne combat pas et ne se montre pas. Il n’attaque une ressource adverse que si elle est libre en main, et son jeu ordinaire est le verrou, la question et la procédure.',
    'Les gestes et déplacements ordinaires sont compris dans l’action. Une localisation non précisée n’est pas une incohérence.'
  ].join(' ')
};
