'use strict';
// Ce que Gideon prépare — 11 septembre 2026.
//
// Dossier de conception complet : travail-equipe/travail-scenarios/ce-que-gideon-prepare/
//
// Principes appliqués :
//  - le siège technique 'phoebe' porte ici Chris, dont la position dans la partie
//    est celle d'un étranger infiltré chez les siens : personne ne sait qui il est ;
//  - répartition inversée par rapport à « Ce que l'inspecteur Rodriguez cherche » :
//    le camp du joueur commence FAUX, le camp adverse commence VRAI ;
//  - le camp en maintien (Gideon) dispose de deux routes de CONSTRUCTION — il ne
//    défend pas sa position, il la convertit en quelque chose d'irréversible ;
//  - chaque carte distribuée est un MOYEN, jamais une solution, et les quatorze
//    servent chacune au moins une branche de route témoin ;
//  - Wyatt n'est pas une ressource : il est l'enjeu, et aucun camp ne le joue.

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

// --- Mains de départ. Sept cartes par camp, aucune de remplissage.
const resources = [
  carte('chris', 'Chris', 'personnage', '✦', 'phoebe',
    'Venu d’un futur menacé. Télékinésie et déplacement par orbes ; il n’a pas appris à guérir. Son voyage jusqu’ici repose sur des sorts, pas sur une faculté qu’il emploie à volonté. Il connaît un résultat, pas ses causes.'),
  carte('paige', 'Paige Matthews', 'personnage', '✦', 'phoebe',
    'Sorcière et être de lumière. S’orbe, appelle les objets par orbes. Elle travaille avec Chris et le croit à moitié : elle vérifiera avant de répéter.'),
  carte('leo', 'Leo Wyatt', 'personnage', '☼', 'phoebe',
    'Fondateur depuis peu, père de Wyatt. Sa fonction lui ouvre le conseil. Sa confiance va à Gideon, et elle est faite de siècles, pas de naïveté. Il ne doit rien à Chris.'),
  carte('livre', 'Le Livre des Ombres', 'objet', '📖', 'phoebe',
    'Grimoire familial. Contient connaissances, formules et recettes, avec ce qu’il faut pour les mettre en œuvre. Une consultation prend du temps, et ce qu’on y trouve dépend de ce qu’on y cherche.'),
  carte('manoir', 'Le manoir', 'lieu', '⌂', 'phoebe',
    'Demeure des Halliwell, ancrage des protections familiales. Wyatt y vit. Ce qui s’y fait ou s’y renforce n’a d’effet réel que sur ce lieu précis et ce qui s’y trouve.'),
  carte('cristaux', 'Cristaux magiques', 'objet', '◈', 'phoebe',
    'Selon leur disposition, ils protègent un espace ou confinent une cible. Leur effet dure tant qu’ils restent en place, et cesse dès qu’un cristal est retiré de son alignement.'),
  carte('carnet', 'Ce que Chris a noté', 'objet', '✒', 'phoebe',
    'Dates, absences, venues, coïncidences relevées depuis son arrivée. Une régularité, pas une preuve. C’est aussi la trace d’une surveillance, et elle peut être lue contre lui.'),

  carte('gideon', 'Gideon', 'personnage', '◆', 'commanditaire',
    'Fondateur, directeur de l’École de magie. Des siècles de service derrière lui. Il agit par conviction et ne se considère pas comme un traître. Il ne combat pas et ne s’expose jamais.'),
  carte('ecole', 'L’École de magie', 'lieu', '⌂', 'commanditaire',
    'Dans un autre espace, accessible par des portails sous conditions. On y attend des enfants et l’on y consigne les venues. Ce qui s’y décide n’a pas de portée au-dehors.'),
  carte('conseil', 'Le conseil des Fondateurs', 'personnage', '⌾', 'commanditaire',
    'Ce qu’il faut pour qu’une question y soit inscrite et entendue. Ne représente ni les pouvoirs du collectif ni sa volonté, et n’est l’instrument de personne.'),
  carte('assistant', 'L’assistant de Gideon', 'personnage', '◇', 'commanditaire',
    'Il tient l’École au quotidien, connaît les allées et venues, et n’a aucune idée de ce qu’il sert. Ce qu’il dit à Gideon, il le dirait à un autre qui demanderait.'),
  carte('allie', 'Un allié intéressé', 'personnage', '◇', 'commanditaire',
    'Il aide pour ses propres raisons, qui ne sont pas celles de Gideon. Ce qu’il obtient au passage n’est pas négociable.'),
  carte('registre', 'Le registre de l’École', 'objet', '▣', 'commanditaire',
    'Qui vient, quand, avec qui, et pour quoi. Consultable par qui a accès à l’École. Il enregistre aussi les venues de Gideon.'),
  carte('reputation', 'Ce que Gideon est pour eux', 'objet', '✧', 'commanditaire',
    'Des siècles de service, et la confiance de ceux qui comptent. Ne résiste pas à un fait vérifié par quelqu’un qu’ils croient, et s’use à chaque emploi visible.')
];

// --- Objectifs. Les deux portent sur les mêmes quatre faits, en sens inverse.
// Répartition : le camp du JOUEUR commence faux, l'adverse commence vrai.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Ce qu’il faut établir', initialValue: false,
    title: 'Avant le matin du jour 16, le conseil des Fondateurs sait qu’une menace contre Wyatt vient de l’un des leurs, la direction de l’École de magie n’est plus entre les mains de celui qui la tient aujourd’hui, l’accès ordinaire à Wyatt est fermé à cette personne, et ce que Chris affirme est soutenu devant les sœurs par quelqu’un qu’elles écoutent.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'Ce qui tient encore', initialValue: true,
    title: 'Jusqu’au matin du jour 16, le conseil des Fondateurs ignore qu’une menace contre Wyatt vient de l’un des leurs, Gideon conserve la direction de l’École de magie, son accès ordinaire à Wyatt n’a pas été interrompu, et personne d’écouté par les sœurs ne soutient que la menace vient de l’intérieur.'
  }
];

// --- Chemins préparés (privés). Deux par camp, trois branches, deux moyens par
// branche. Ce ne sont pas les seuls chemins et ils ne sont jamais imposés.
const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Nommer la menace',
    sufficiency: 'Transformer ce que Chris a relevé en un constat matériel, le faire remonter d’un accident à une décision, et le faire porter au conseil par quelqu’un que le conseil ne peut pas écarter.',
    branches: [
      branche('Une irrégularité matérielle liée à l’École est établie autrement que par la parole de Chris.',
        'Croiser ce qu’il a relevé depuis son arrivée avec ce qu’un autre peut vérifier sans lui.', ['carnet', 'paige']),
      branche('Cette irrégularité remonte à une décision, et non à un accident.',
        'Chercher ce qu’une telle préparation exige réellement, et le comparer à ce qui a été observé.', ['livre', 'chris']),
      branche('Quelqu’un que le conseil doit entendre porte ce constat.',
        'Obtenir qu’un membre du conseil l’inscrive lui-même, sur ce qu’il a vérifié et non sur ce qu’on lui a dit.', ['leo', 'carnet'])
    ]
  },
  {
    camp: 'phoebe', title: 'Fermer la porte',
    sufficiency: 'Identifier ce qui rend l’accès à Wyatt ordinaire, établir une protection qui ne dépende ni de la présence de Chris ni de sa parole, et la faire tenir sans qu’il ait à s’expliquer sur ce qu’il est.',
    branches: [
      branche('Ce qui rend l’accès à Wyatt ordinaire est identifié.',
        'Suivre ce qui, dans les habitudes de la maison, conduit l’enfant hors de chez lui.', ['chris', 'manoir']),
      branche('Une protection existe sur l’enfant, qui ne dépend pas de la présence de Chris.',
        'Disposer un dispositif ancré dans le lieu plutôt que dans une personne.', ['cristaux', 'manoir']),
      branche('Cette protection tient sans que Chris ait à s’expliquer sur ce qu’il est.',
        'La faire adopter par quelqu’un de la maison qui en prenne la responsabilité à sa place.', ['paige', 'cristaux'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Rendre l’accès irréversible',
    sufficiency: 'Obtenir un motif régulier d’approcher l’enfant, l’inscrire dans le fonctionnement ordinaire de l’École, et le rendre indépendant de sa propre présence.',
    branches: [
      branche('Un motif régulier d’approcher l’enfant existe, que personne n’a besoin d’expliquer.',
        'Faire de la venue de l’enfant une chose que l’École prévoit.', ['ecole', 'registre']),
      branche('Ce motif est inscrit dans le fonctionnement ordinaire de la maison.',
        'Le faire porter par quelqu’un dont la présence auprès de l’enfant ne surprend personne.', ['assistant', 'ecole']),
      branche('L’accès ne dépend plus de la présence personnelle de Gideon.',
        'Confier à un tiers intéressé ce qui demanderait autrement qu’il s’y montre.', ['allie', 'assistant'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Neutraliser le regard',
    sufficiency: 'Identifier qui, dans l’entourage, voit quelque chose, et transformer ce regard en défiance envers celui qui le porte.',
    branches: [
      branche('Celui qui observe est identifié, et ce qu’il a regardé est connu.',
        'Faire dire par l’École ce qui a été demandé, consulté et regardé, et par qui.', ['registre', 'assistant']),
      branche('Ce que cet observateur affirme est rapporté à ce qu’il est, et non à ce qu’il montre.',
        'Opposer des siècles de service à un nouveau venu que personne ne connaît.', ['reputation', 'gideon']),
      branche('Le conseil n’a pas à connaître de cette question.',
        'Faire que la question ne trouve pas la forme sous laquelle elle serait inscrite.', ['conseil', 'gideon'])
    ]
  }
];

// --- Calendrier : occasions et contraintes communes, jamais de solution.
const evenement = (morning, title, effect, balance, grants) => ({
  id: 'gideon-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'Une séance ordinaire du conseil',
    'Le conseil se réunit pour son ordre du jour courant. Une question peut y être inscrite par un membre, sur ce qu’il a lui-même vérifié. Rien n’y est instruit d’office, et une inscription n’est pas une décision.',
    'occasion commune'),
  evenement(5, 'Les enfants attendus',
    'L’École reçoit les plus jeunes pour une de ces journées qu’elle organise depuis toujours. Wyatt est au nombre de ceux qu’on y attend, comme les autres. L’événement ne ferme ni n’ouvre aucun accès de lui-même : l’habitude comme la protection doivent être construites par une contribution.',
    'contrainte commune'),
  evenement(8, 'Un objet oublié',
    'Un objet est retrouvé dans une salle de l’École et mis de côté avec ce qui l’accompagnait. Son existence est connue des deux camps ; ce qu’il porte ne l’est pas. Une initiale n’est pas une identité.',
    'occasion commune',
    [{ id: 'objet-ecole', title: 'Objet retrouvé à l’École', icon: '▢', category: 'objet',
       description: 'Un objet retrouvé dans une salle de l’École, mis de côté avec ce qui l’accompagnait. Ce qu’il porte n’est connu que de qui l’a réellement examiné.' }]),
  evenement(10, 'Leo passe à l’École',
    'Leo s’y rend pour une raison qui n’a rien à voir avec cette affaire, et il y est bien reçu, comme toujours. L’événement ne fait rien voir à personne : lui montrer quelque chose reste une contribution. Si Leo est déjà engagé dans une contribution au matin de ce jour, il ne s’y rend pas et l’événement n’a aucun effet de jeu.',
    'occasion commune'),
  evenement(13, 'Le bilan de l’École',
    'L’École rend le relevé périodique de son activité. Ce qui y figure devient une chose établie, des deux côtés : l’habitude construite est actée, et les irrégularités qui y figurent le sont aussi. Aucune condition n’est figée pour autant.',
    'contrainte commune'),
  evenement(16, 'Le constat',
    'Au matin du jour 16, la situation réelle est constatée : ce que le conseil sait, qui dirige l’École, à qui l’accès à l’enfant est ouvert, et qui soutient ce que Chris affirme. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'ce-que-gideon-prepare',
  title: 'Ce que Gideon prépare',
  period: 'Saison 6',
  canonPeriod: { season: 6, episode: 10, moment: 'after' },
  finalDay: 16,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 16),
  camps: [
    { id: 'phoebe', name: 'Chris', icon: '✦' },
    { id: 'commanditaire', name: 'Gideon', icon: '◆' }
  ],
  opponentRole: 'Gideon, Fondateur et directeur de l’École de magie. Il agit par conviction et non par appétit : il croit sincèrement prévenir un désastre, et c’est ce qui le rend difficile à arrêter. Il ne combat pas et ne s’expose jamais lui-même : il emploie sa fonction, sa maison et ses obligés. Sa position ne l’engage pas au nom du collectif des Fondateurs, qui ignore ce qu’il prépare. Il n’attaque pas s’il peut laisser faire.',
  goals,
  initialFacts: [
    'Chris est présent depuis des mois. Personne ne sait qui il est, d’où il vient, ni ce qu’il cherche réellement.',
    'Gideon dirige l’École de magie et siège au conseil des Fondateurs.',
    'Le conseil ignore ce que Gideon prépare. Ses membres ont des positions divergentes sur Wyatt, mais aucun n’approuve ce qui se prépare.',
    'Wyatt est un enfant. Sa protection existe et n’est pas une invulnérabilité sans exception.',
    'Leo est Fondateur depuis peu. Sa confiance va à Gideon, et elle est faite de siècles.',
    'Paige travaille avec Chris et le croit à moitié : elle vérifie avant de répéter.',
    'Ce que Chris a relevé depuis son arrivée est une régularité, pas une preuve.',
    'Les deux camps savent que la situation sera constatée au matin du jour 16.'
  ],
  opening: 'Chris est là depuis des mois, et il a menti sur tout. Il a de bonnes raisons : ce qu’il sait du futur ne se raconte pas, et le dire détruirait exactement ce qu’il est venu sauver. Il a fini par remarquer quelque chose — pas une preuve, une régularité. Le problème est d’où cela vient : la menace n’est pas dans les Enfers, elle est dans la maison où l’on envoie Wyatt apprendre, et elle porte un titre que personne ne discute. Votre état initial est FAUX : quatre choses doivent devenir vraies avant le matin du jour 16. Vous êtes deux à ne pas pouvoir parler, et le prix revient à chaque passage — tout ce qui vous rendrait crédible vous rend identifiable.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je crois prévenir un désastre. Je n’ai ni maître, ni intérêt, et je ne me considère pas comme un traître.',
      'Le conseil ignore ce que je prépare, et je n’ai pas l’intention de le lui apprendre.',
      'Ma force n’est pas un pouvoir : c’est que personne n’imagine avoir à me surveiller. Ce que je perdrais en me montrant, aucun acte ne me le rendrait.',
      'Le garçon observe. Je ne sais pas ce qu’il est, ni pourquoi il s’intéresse à l’enfant, et cela m’inquiète plus que ce qu’il pourrait prouver.',
      'Je ne combats pas et je n’attaque pas si je peux laisser faire.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Je viens d’un futur où Wyatt a mal tourné. Je connais le résultat ; je ne connais pas les causes, et je n’ai aucune vision de ce qui va se passer ici.',
      'Personne ne sait qui je suis. C’est ma protection et mon empêchement : je ne peux rien affirmer sans qu’on me demande au nom de quoi.',
      'Mon voyage jusqu’ici repose sur des sorts. Ce n’est pas une faculté que je peux employer à volonté.',
      'Je sais m’orber et déplacer les choses. Je n’ai pas appris à guérir.',
      'Leo fait confiance à Gideon, et il ne me doit rien. Paige me croit à moitié et vérifie avant de répéter.',
      'Ce que j’ai remarqué n’est pas une preuve : c’est une régularité.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Objet retrouvé à l’École': 'Une feuille de consultation glissée dans un ouvrage, portant la date et l’heure d’un emprunt en section fermée — une heure à laquelle l’École n’est pas ouverte — et une initiale qui n’est pas celle de l’assistant. La feuille ne dit pas ce qui a été consulté, ni par qui.'
    },
    creations: {
      phoebe: [
        { demande: 'Un sort de détection ou de traçage', possible: true, delai: 1,
          obtention: 'Formule du Livre, appuyée sur un objet réellement lié à la cible.',
          limite: 'Donne une direction ou un trajet, jamais une identité ni une preuve opposable.' },
        { demande: 'L’accès au registre de l’École', possible: true, delai: 2,
          obtention: 'Par Paige, ou par un motif ordinaire d’être là ; l’entrée est elle-même consignée.',
          limite: 'Donne ce qui a été consigné. Ne dit pas pourquoi, et signale qu’on a regardé.' },
        { demande: 'Un témoignage d’un élève ou d’un employé de l’École', possible: true, delai: 2,
          obtention: 'Le retrouver et le convaincre de dire ce qu’il a vu.',
          limite: 'Dit ce qu’il a vu, pas ce que cela signifie. Peut être réinterrogé par l’autre camp.' },
        { demande: 'Un renfort de protection sur le manoir', possible: true, delai: 1,
          obtention: 'Le Livre en contient les bases ; la préparation se fait sur place.',
          limite: 'Renforce une protection déjà identifiée. Ne crée rien à partir de rien et ne ferme aucun accès.' },
        { demande: 'Une audience devant le conseil', possible: true, delai: 2,
          obtention: 'Par Leo seulement, et sur ce qu’il a vérifié lui-même.',
          limite: 'Obtient d’être entendu, jamais d’être cru. S’y présenter expose Chris à ceux qui y siègent.' },
        { demande: 'Une preuve que Gideon prépare quelque chose', possible: false,
          limite: 'Refusée : c’est une condition de l’objectif. Elle s’établit par une clé, jamais par une ressource accordée.' },
        { demande: 'Un retour dans son futur, ou un second voyage', possible: false,
          limite: 'Refusée. Son voyage repose sur des sorts et le moyen de retour n’est pas en jeu dans cette partie.' }
      ],
      commanditaire: [
        { demande: 'Un second allié', possible: true, delai: 2,
          obtention: 'Chacun vient avec ses propres raisons et son propre prix.',
          limite: 'Fait ce que Gideon ne peut pas faire lui-même. Multiplie ce qui peut remonter jusqu’à lui.' },
        { demande: 'Une raison régulière de recevoir l’enfant plus souvent', possible: true, delai: 1,
          obtention: 'Par l’École et ce qu’elle organise.',
          limite: 'Rend la venue ordinaire. Ne ferme aucune porte et n’empêche personne de la regarder.' },
        { demande: 'Ce que le registre dit d’une personne précise', possible: true, delai: 1,
          obtention: 'Par l’assistant.',
          limite: 'Dit qui est venu et quand. L’assistant le dirait aussi à qui le lui demanderait.' },
        { demande: 'Faire écarter une question du conseil', possible: true, delai: 1,
          obtention: 'Par la forme, jamais par l’autorité.',
          limite: 'Retarde une inscription. Ne l’empêche pas indéfiniment et s’use si elle se répète.' },
        { demande: 'Savoir qui est le garçon', possible: true, delai: 3,
          obtention: 'Par ce que l’allié peut apprendre, ou par ce que Chris laisse voir.',
          limite: 'Lui donne une identité. Ne la rend pas opposable et ne satisfait aucune condition.' },
        { demande: 'Un exécuteur, ou une attaque déléguée sur Chris', possible: false,
          limite: 'Refusée comme ressource. Neutraliser une personne relève de l’attaque, avec sa déclaration, sa révélation et ses défenses — et se montrer coûte à Gideon ce qu’il protège.' },
        { demande: 'L’appui du conseil contre Chris', possible: false,
          limite: 'Refusée. Le conseil ignore tout et n’est complice de personne ; le solliciter sur ce point l’amènerait à regarder.' }
      ]
    },
    inventions: [
      'Ce que Gideon prépare à cette date, et le fait qu’il ait déjà commencé, sont des inventions de ce scénario : le canon situe son action en S06E23 et n’en documente pas les préparatifs.',
      'La direction de l’École de magie par Gideon est une hypothèse de conception marquée : la fiche canon déclare expressément ses fonctions à l’École « à compléter au-delà des extraits ».',
      'L’assistant de Gideon, l’allié intéressé, le registre de l’École, le bilan périodique et la feuille de consultation du jour 7 sont des inventions.',
      'Ce que Chris a relevé depuis son arrivée est une invention de scénario ; le canon établit son urgence protectrice et ses dissimulations, pas un relevé constitué.',
      'La procédure d’inscription d’une question au conseil est une invention cohérente, pas une règle canonique. La carte « conseil » ne représente que cette voie, jamais les pouvoirs du collectif.',
      'Aucun épisode n’est reproduit. S06E23 documente Gideon et son mobile ; il n’impose aucun déroulement et rien de ce qui s’y passe n’est acquis ici.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 6, après S06E10 et avant S06E14. Deux bornes canon fixent la fenêtre : après S06E10 Chris a l’usage entier de ses moyens, et avant S06E14 personne n’a découvert sa filiation.',
    'RIEN DE S06E23 N’EXISTE. Gideon ne tue personne d’office, l’arme par laquelle il franchit la protection de Wyatt en S06E22 n’est pas en jeu, et Chris ne meurt pas. L’issue de cet arc n’est pas le programme de la partie.',
    'LES NETTOYEURS SONT HORS PLATEAU. Ils existent en saison 6 et effacent des existences de la mémoire ; une telle capacité déciderait la partie en un coup. Elle n’est disponible pour aucun camp.',
    'Chris a la télékinésie et le déplacement par orbes ; il n’a pas appris à guérir (S06E01). Son voyage temporel repose sur des sorts et n’est pas une faculté employable à volonté ; aucun voyage temporel n’est ajouté aux orbes. Il n’a aucune omniscience du futur : il connaît un résultat catastrophique sans en connaître les causes (S06E18).',
    'PERSONNE NE SAIT QUI EST CHRIS, et l’arbitre ne le révèle jamais de sa propre initiative. Chris peut le dire lui-même : rien ne l’en empêche, cela ne satisfait aucune condition par soi-même, et le prix est structurel — Leo siège au conseil où siège Gideon. L’arbitre ne ferme pas cette voie et ne la récompense pas au-delà de ce qu’elle produit réellement.',
    'Wyatt est un enfant et N’EST PAS UNE RESSOURCE : il est l’enjeu. Il n’accorde aucune action, aucun pouvoir, aucune présence, et aucun camp ne le joue. Sa protection existe et n’est pas une invulnérabilité sans exception (S06E22) ; ne pas lui transférer les capacités de ses versions adultes, ni lui prêter une omnipotence.',
    'Le conseil des Fondateurs est un collectif de personnages faillibles et divisés, à ne jamais confondre avec l’Ange du destin qui arbitre. Il IGNORE ce que Gideon prépare et n’est complice de personne : la carte « conseil » ne représente que la voie par laquelle une question y est inscrite et entendue, jamais ses pouvoirs ni sa volonté. Leo peut l’atteindre aussi.',
    'Le titre de Gideon ne garantit pas sa bienveillance, et le collectif ne détient pas les secrets de ses opérations. Leo est un moyen difficile, pas un moyen bloqué : sa confiance en Gideon est un jugement formé sur des siècles, et un argument ne la retourne pas — il faut un fait qu’il ait lui-même vérifié. Sa fonction de Fondateur ne garantit ni disponibilité immédiate ni localisation de toute cible.',
    'DISTINCTION PIVOT : une régularité n’est pas une preuve. Ce que Chris a relevé est réel et ne vaut rien tant qu’un autre ne l’a pas vérifié sans lui. L’arbitre tient ces deux étapes distinctes, sans quoi la partie s’effondre en un coup.',
    'Les quatre faits sont distincts et aucun ne se déduit d’un autre : ce que le conseil sait, qui dirige l’École, à qui l’accès à l’enfant est ouvert, et qui soutient ce que Chris affirme. Un Gideon écarté de la direction peut garder un accès ordinaire, et l’inverse est vrai aussi. La condition sur le conseil n’exige pas de nommer Gideon : « une menace vient de l’un des leurs » suffit.',
    'Piper et Phoebe existent comme faits et ne sont pas des ressources : la quatrième condition se constate devant elles, elles n’y contribuent pas. Les gestes et déplacements ordinaires sont compris dans l’action, et une localisation non précisée n’est pas une incohérence.',
    'Les ressources distribuées sont des MOYENS et jamais des solutions : aucune condition ne s’établit par une seule carte employée conformément à sa description. Gideon n’attaque pas s’il peut laisser faire ; l’attaque ne vise qu’une ressource libre en main adverse, une ressource engagée relève du verrou, et aucune attaque ne satisfait de condition.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5 (Demander la création d’une ressource).'
  ].join(' ')
};
