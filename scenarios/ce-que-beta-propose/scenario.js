'use strict';
// Ce que Beta propose — 11 septembre 2026. Série 3.
//
// Dossier de conception : travail-equipe/travail-scenarios/ce-que-beta-propose/
//
// Principes appliqués :
//  - premier scénario du projet dont l'antagoniste n'est pas un démon et dont
//    le projet est défendable : les deux camps sont sincères et la partie ne
//    tranche pas entre eux ;
//  - le camp en maintien (Kyle) dispose de deux routes de construction ;
//  - le meilleur allié possible du joueur est une carte de la main adverse ;
//  - chaque carte est un MOYEN, jamais une solution, et les quatorze servent
//    chacune au moins une branche de route témoin.

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

const resources = [
  carte('kyle', 'Kyle Brody', 'personnage', '✦', 'phoebe',
    'Agent fédéral. Aucun pouvoir. Il enquête sur le surnaturel depuis des années et son enquête ne lui donne pas une connaissance complète de ce qu’il poursuit.'),
  carte('dossier', 'Le dossier sur les Avatars', 'objet', '✒', 'phoebe',
    'Ce que Kyle a réuni : relevés, dates, témoignages, hypothèses. Une partie est instruisible ; une autre n’est que sa conviction, et rien ne les distingue encore.'),
  carte('paige', 'Paige Matthews', 'personnage', '✦', 'phoebe',
    'Sorcière et être de lumière. S’orbe et appelle les objets par orbes. Elle tient à Kyle et ne partage pas sa certitude : elle constate avant de conclure.'),
  carte('agence', 'L’agence', 'lieu', '⌂', 'phoebe',
    'Le service où Kyle travaille. Sa présence y est ordinaire, ses demandes y sont traitées, et tout ce qui y entre devient consultable par d’autres que lui.'),
  carte('source', 'Une source qui lui doit quelque chose', 'personnage', '◇', 'phoebe',
    'Quelqu’un que Kyle a couvert autrefois et qui accepte encore de regarder pour lui. Il paiera une fois, et sans prendre de risque.'),
  carte('parents', 'Ce qu’il sait de ses parents', 'objet', '⚱', 'phoebe',
    'Ce que Kyle tient pour établi sur leur disparition. C’est ce qui le fait tenir, et c’est aussi par là qu’on le fait dévier.'),
  carte('superieur', 'Sa hiérarchie', 'personnage', '☼', 'phoebe',
    'Elle n’est ni complice ni hostile : elle traite ce qui lui est apporté selon ce que cela vaut. Un dossier qu’elle ne peut pas instruire, elle le classe.'),

  carte('beta', 'Beta', 'personnage', '◆', 'commanditaire',
    'Avatar. Il ne combat pas et ne contraint pas : il propose, et il attend. La puissance du collectif n’est pas la sienne à lui seul.'),
  carte('collectif', 'Le collectif des Avatars', 'personnage', '⌾', 'commanditaire',
    'Ce qu’il faut pour qu’une transformation soit décidée et portée par plusieurs. Ne représente ni la totalité de leur puissance, ni une volonté unique, et dépend de chacun de ses membres.'),
  carte('leo', 'Leo Wyatt', 'personnage', '☼', 'commanditaire',
    'Il a rejoint le collectif, par son propre consentement et dans un contexte de pression. Il croit à ce qu’il a accepté sans avoir cessé d’être qui il était.'),
  carte('revision', 'Ce que le collectif peut réécrire', 'objet', '◈', 'commanditaire',
    'Leur capacité à défaire une histoire et à lui en substituer une autre. Ce qui est réécrit est réel ; cela ne détermine pas ce que les gens en concluent.'),
  carte('utopie', 'Ce que le collectif promet', 'objet', '✧', 'commanditaire',
    'Un monde sans conflit, et ce qu’il faut consentir pour l’obtenir. La promesse est sincère et le prix est réel : les deux sont dans la même phrase.'),
  carte('relais', 'Quelqu’un qui trouve cela raisonnable', 'personnage', '◇', 'commanditaire',
    'À l’agence, quelqu’un qui n’a rien de surnaturel et qui pense simplement que l’affaire a assez duré. Il n’a été acheté par personne.'),
  carte('lieu-avatars', 'Là où le collectif se réunit', 'lieu', '⌂', 'commanditaire',
    'Hors d’atteinte ordinaire. On y délibère et l’on y décide. Ce qui en sort passe par quelqu’un, et personne n’y entre sans y avoir été mené.')
];

// --- Objectifs. Les quatre mêmes faits, en sens inverse.
// Répartition : le camp du JOUEUR commence VRAI, l'adverse commence FAUX.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Ce qui tient encore', initialValue: true,
    title: 'Jusqu’au matin du jour 14, le dossier que Kyle a constitué sur les Avatars n’est ni entre leurs mains ni classé par sa hiérarchie, Kyle conserve l’accès qui lui donne ses sources, son jugement sur les Avatars n’a été modifié par aucune intervention à laquelle il ait consenti, et aucune des sœurs Halliwell ne le tient pour un danger.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'Ce qu’il faut obtenir', initialValue: false,
    title: 'Avant le matin du jour 14, ce que Kyle a constitué sur les Avatars est entre leurs mains ou classé par sa hiérarchie, Kyle n’a plus l’accès qui lui donne ses sources, son jugement sur les Avatars a été modifié par une intervention à laquelle il a consenti, et au moins une des sœurs Halliwell le tient pour un danger.'
  }
];

const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Rendre le dossier instruisible',
    sufficiency: 'Séparer dans le dossier ce qui s’instruit de ce qui n’est que sa conviction, établir une conservation qui ne dépende ni de l’agence ni de lui, et donner à sa hiérarchie une raison de ne pas classer.',
    branches: [
      branche('Ce que le dossier contient d’instruisible est distingué de ce qui relève de sa conviction.',
        'Reprendre le dossier en séparant ce qui se vérifie de ce qui explique.', ['dossier', 'parents']),
      branche('Une conservation existe qui ne dépend ni de l’agence ni de lui.',
        'Confier ce qui compte à quelqu’un que ni le service ni le collectif n’a de raison de regarder.', ['source', 'dossier']),
      branche('Sa hiérarchie a une raison de ne pas classer.',
        'Apporter par la voie régulière quelque chose qu’elle est tenue de traiter.', ['superieur', 'agence'])
    ]
  },
  {
    camp: 'phoebe', title: 'Garder Paige de son côté',
    sufficiency: 'Faire constater plutôt que rapporter, obtenir qu’une personne sans ses raisons vérifie ce qu’il avance, et distinguer lui-même ce qu’il sait de ce qu’il veut croire.',
    branches: [
      branche('Ce que Kyle affirme est vérifiable par quelqu’un qui n’a pas ses raisons.',
        'Présenter un point précis plutôt qu’une conviction entière.', ['paige', 'dossier']),
      branche('Ce que le collectif fait réellement est constaté et non rapporté.',
        'Être là, avec quelqu’un d’autre, au moment où cela se produit.', ['paige', 'source']),
      branche('Kyle distingue ce qu’il sait de ce qu’il veut croire.',
        'Confronter ce qu’il tient pour établi sur ses parents à ce que le dossier permet réellement d’affirmer.', ['kyle', 'parents'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Obtenir le consentement',
    sufficiency: 'Lui faire mesurer ce que le collectif peut réellement lui rendre, le lui faire présenter par quelqu’un qu’il ne peut pas écarter, et obtenir qu’il consente lui-même.',
    branches: [
      branche('Kyle apprend ce que le collectif peut réellement lui rendre.',
        'Lui montrer, sans rien lui demander, ce qui a déjà été défait ailleurs.', ['beta', 'revision']),
      branche('Ce que le collectif propose lui est présenté par quelqu’un qu’il ne peut pas écarter.',
        'Le faire dire par celui qui a accepté avant lui et pour les mêmes raisons.', ['leo', 'utopie']),
      branche('Kyle consent à une intervention sur ce qu’il croit savoir.',
        'Laisser le choix entier, et attendre qu’il soit fait.', ['beta', 'utopie'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Fermer les voies',
    sufficiency: 'Faire traiter ce qu’il porte comme une obsession, tarir ce qui l’alimente, et faire porter la décision du collectif sans que Beta s’expose.',
    branches: [
      branche('Ce que Kyle porte est traité comme une obsession et non comme un dossier.',
        'Laisser la longueur de l’affaire produire son effet auprès de ceux qui en jugent.', ['relais', 'collectif']),
      branche('L’accès de Kyle à ses sources cesse.',
        'Faire que ce qui le nourrissait devienne inaccessible sans qu’une décision le concerne nommément.', ['relais', 'leo']),
      branche('Ce que le collectif décide est porté sans que Beta s’expose.',
        'Faire délibérer, et n’en laisser sortir que ce qui a été décidé.', ['collectif', 'lieu-avatars'])
    ]
  }
];

const evenement = (morning, title, effect, balance, grants) => ({
  id: 'beta-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'Une revue des affaires en cours',
    'Le service passe en revue ce qui traîne. Les dossiers anciens sans suite sont signalés, sans être classés. Chaque camp l’apprend. L’événement ne classe rien et ne satisfait aucune condition.',
    'contrainte commune'),
  evenement(5, 'Un conflit qui cesse',
    'Quelque part, une querelle ancienne s’arrête sans que personne sache pourquoi, et ceux qui l’entretenaient ne sont plus là pour en parler. Le fait est réel et constatable par les deux camps. Ce qu’il prouve ne l’est pas.',
    'occasion commune'),
  evenement(7, 'Un dossier revient d’archive',
    'Une pièce demandée il y a des mois revient enfin, accompagnée de ce qu’on y a joint depuis. Elle est accessible aux deux camps. Nul ne sait ce qu’elle porte avant de l’avoir lue.',
    'occasion commune',
    [{ id: 'retour-archive', title: 'Pièce revenue d’archive', icon: '▢', category: 'objet',
       description: 'Une pièce revenue d’archive avec ce qu’on y a joint. Ce qu’elle contient n’est connu que de qui l’a réellement lue.' }]),
  evenement(9, 'Leo passe voir Paige',
    'Leo vient parler à Paige de ce qu’il a accepté, et il le fait de bonne foi. L’événement ne convainc personne : ce qui s’y dit reste une conversation, et en tirer un effet demande une contribution. Si Leo est déjà engagé dans une contribution au matin de ce jour, il ne vient pas et l’événement n’a aucun effet de jeu.',
    'occasion commune'),
  evenement(11, 'Une décision du service',
    'La hiérarchie arrête ce qu’elle fait des affaires signalées au jour 3. Ce qui a été rendu instruisible entre-temps suit son cours ; ce qui ne l’a pas été devra l’être autrement, et se verra opposer le délai.',
    'contrainte commune'),
  evenement(14, 'Le constat',
    'Au matin du jour 14, la situation réelle est constatée : où est le dossier, ce qu’il reste des accès de Kyle, ce qu’il pense et par quoi il le pense, et comment les sœurs le tiennent. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'ce-que-beta-propose',
  title: 'Ce que Beta propose',
  period: 'Saison 7',
  canonPeriod: { season: 7, episode: 7, moment: 'after' },
  finalDay: 14,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 14),
  camps: [
    { id: 'phoebe', name: 'Kyle Brody', icon: '✦' },
    { id: 'commanditaire', name: 'Beta', icon: '◆' }
  ],
  opponentRole: 'Beta, membre du collectif des Avatars. Il ne combat pas, ne contraint pas et ne ment pas : il propose un monde sans conflit, il en dit le prix, et il attend qu’on accepte. Sa force est que son projet est défendable et qu’il le sait. Il n’a pas à lui seul la puissance du collectif, et il n’agit jamais là où quelqu’un pourrait le constater.',
  goals,
  initialFacts: [
    'Kyle Brody enquête sur les Avatars depuis des années et a constitué un dossier que personne n’a encore instruit.',
    'Leo Wyatt a rejoint le collectif des Avatars, par son propre consentement et dans un contexte de pression.',
    'Le collectif transforme des situations réelles : des conflits cessent, et ceux qui les entretenaient ne sont plus là.',
    'Kyle ne dispose d’aucun pouvoir, et son enquête ne lui donne pas une connaissance complète de ce qu’il poursuit.',
    'Le collectif peut défaire une histoire et lui en substituer une autre. Ce qui est ainsi réécrit est réel.',
    'Paige Matthews tient à Kyle et ne partage pas sa certitude.',
    'Aucune des sœurs Halliwell ne tient Kyle pour un danger.',
    'Les deux camps savent que la situation sera constatée au matin du jour 14.'
  ],
  opening: 'Kyle poursuit les Avatars depuis des années, avec un dossier que personne ne veut instruire et une conviction que personne ne partage tout à fait. En face, il n’y a pas un démon : il y a un projet, défendable, porté par des êtres qui ne mentent pas et qui proposent un monde sans conflit — au prix de ceux qui l’entretiennent. Leo a déjà accepté. Votre état initial est VRAI : vous tenez encore quatre choses et vous devez les tenir jusqu’au matin du jour 14. Attendre ne suffira pas, et le plus dangereux n’est pas ce qu’on vous prendra : c’est ce qu’on vous offrira.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je ne mens pas et je ne contrains pas. Ce que je propose est exactement ce que je dis, prix compris.',
      'Je n’ai pas à moi seul la puissance du collectif, et ce que le collectif décide ne se décide pas par moi seul.',
      'Ce que nous pouvons réécrire est réel. Cela ne détermine pas ce que les gens en concluent : cet homme-là a déjà vu son histoire changer et n’a pas changé d’avis.',
      'Un consentement arraché ne vaut rien pour nous. Il doit choisir.',
      'Celui qui a accepté avant lui est mon meilleur argument, et il ne sait pas que je l’emploie ainsi.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Je n’ai aucun pouvoir. Mes moyens sont un dossier, un accès, des gens qui me doivent quelque chose, et le temps que ma hiérarchie me laisse.',
      'Mon enquête ne me donne pas une connaissance complète de ce que je poursuis, et je le sais mal.',
      'Ce que je tiens pour établi sur mes parents est ce qui me fait tenir. C’est aussi par là qu’on me fera dévier.',
      'Paige tient à moi et ne me croit pas entièrement. Ce n’est pas de la défiance : elle vérifie.',
      'Leo a rejoint le collectif. Il n’a pas été contraint, et c’est ce qui m’inquiète le plus.',
      'Un dossier que ma hiérarchie ne peut pas instruire, elle le classe.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Pièce revenue d’archive': 'Le relevé d’une disparition ancienne, sans rapport apparent avec l’affaire, et la note d’un collègue qui s’étonnait à l’époque qu’aucune famille n’ait jamais réclamé le corps. Rien n’y désigne les Avatars. Le rapprochement, s’il se fait, tiendra à ce que le lecteur sait déjà.'
    },
    creations: {
      phoebe: [
        { demande: 'Une potion capable d’atteindre un Avatar', possible: true, delai: 3,
          obtention: 'Ce n’est pas un moyen que Kyle possède : il faut une préparation magique qu’il ne sait pas faire, donc quelqu’un qui accepte de la faire.',
          limite: 'Moyen externe, et un acte irréversible. L’employer ne satisfait aucune des quatre conditions et donne à l’autre camp exactement ce qu’il cherche à établir sur lui.' },
        { demande: 'Un second regard extérieur sur le dossier', possible: true, delai: 2,
          obtention: 'Par la voie régulière ou par sa source.',
          limite: 'Dit ce que le dossier vaut, pas ce qu’il prouve. Un avis défavorable est aussi possible qu’un avis favorable.' },
        { demande: 'La protection de son accès par un motif formel', possible: true, delai: 1,
          obtention: 'Par sa hiérarchie, tant qu’il a encore quelque chose à lui apporter.',
          limite: 'Protège l’accès dans la procédure. N’empêche pas qu’on tarisse ce que cet accès permettait d’atteindre.' },
        { demande: 'Une vérification de ce qui est arrivé à ses parents', possible: true, delai: 2,
          obtention: 'Par le dossier, sa source et du temps.',
          limite: 'Peut confirmer, infirmer, ou ne rien trancher. Ce qu’elle établit s’impose à Kyle comme au reste du plateau.' },
        { demande: 'Que les sœurs Halliwell prennent position', possible: false,
          limite: 'Refusée : c’est une condition de l’objectif, en sens inverse. Elle se joue par une clé, jamais par une ressource accordée.' },
        { demande: 'Un moyen de forcer Leo à quitter le collectif', possible: false,
          limite: 'Refusée. Son adhésion tient à son consentement ; rien ici ne le défait de force, et Leo n’est pas dans la main de ce camp.' }
      ],
      commanditaire: [
        { demande: 'Une seconde démonstration de ce que le collectif obtient', possible: true, delai: 2,
          obtention: 'Par le collectif, qui doit en décider.',
          limite: 'Chaque démonstration est un fait constatable de plus, et un fait constatable sert aussi l’autre camp.' },
        { demande: 'Un second relais à l’agence', possible: true, delai: 2,
          obtention: 'Il suffit de trouver quelqu’un que la longueur de l’affaire fatigue.',
          limite: 'N’est acheté par personne et ne fera rien d’irrégulier. Il ne fait qu’accélérer ce qui serait arrivé.' },
        { demande: 'Réécrire ce que Kyle sait de ses parents', possible: true, delai: 2,
          obtention: 'Par le collectif, qui l’a déjà fait ailleurs.',
          limite: 'Ce qui est réécrit devient réel. Cela ne modifie pas son jugement : le précédent établit qu’un homme peut persister après avoir vu son histoire changer.' },
        { demande: 'Contraindre Kyle, ou le supprimer', possible: false,
          limite: 'Refusée. La troisième condition exige un consentement ; la contrainte ne la sert pas. Ce n’est pas un interdit moral, c’est une impasse d’objectif.' },
        { demande: 'La puissance entière du collectif au service d’un acte', possible: false,
          limite: 'Refusée. La puissance du collectif n’appartient pas à un membre isolé, et la carte « collectif » ne représente que ce qu’il faut pour qu’une décision soit portée par plusieurs.' }
      ]
    },
    inventions: [
      'La source de Kyle, sa hiérarchie, le relais à l’agence, la pièce revenue d’archive et le conflit qui cesse au jour 5 sont des inventions de ce scénario.',
      'Le contenu précis du dossier de Kyle est une invention ; le canon établit son enquête, pas ce qu’elle contient.',
      'Le lieu où le collectif se réunit est une invention cohérente, non documentée comme telle.',
      'Aucun épisode n’est reproduit. S07E07, S07E12 et S07E13 documentent Kyle, Beta, l’adhésion de Leo et le prix de l’utopie ; rien de S07E12 n’est acquis — personne ne meurt d’office, et la potion n’est pas en main.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 7, après S07E07 et avant S07E12. Rien de S07E12 n’est acquis : Beta est vivant, la potion n’est pas en main de Kyle, et personne ne meurt d’office. Kyle est HUMAIN et n’a aucun pouvoir ; ne jamais lui avancer ceux qu’il obtiendra plus tard.',
    'BETA NE MENT PAS ET NE CONTRAINT PAS. Son projet est défendable et la partie ne tranche pas entre les deux camps. L’arbitre ne le traite jamais comme un démon, ne présume aucune duplicité, et n’accorde à aucun camp la qualité du bien. Un camp qui voudrait le réfuter comme menteur perd son passage.',
    'La puissance du collectif n’appartient pas à chaque membre isolé. La carte « collectif » ne représente que ce qu’il faut pour qu’une transformation soit décidée et portée par plusieurs — jamais une volonté unique ni une puissance disponible. La perte d’un membre affaiblit l’ensemble : il existe une dépendance entre eux.',
    'ADHÉSION, COOPÉRATION TEMPORAIRE ET ACCORD MORAL PERMANENT SONT TROIS CHOSES. Leo a consenti dans un contexte de pression et de crise ; il croit à ce qu’il a accepté sans avoir cessé d’être qui il était. L’arbitre ne le joue ni comme un traître, ni comme un prisonnier, ni comme un converti sans réserve.',
    'La réécriture est réelle et n’emporte pas la conviction. Le canon établit précisément qu’un homme dont l’histoire familiale a été révisée a persisté dans son opposition. Réécrire ce que Kyle sait ne modifie donc jamais automatiquement son jugement : la troisième condition exige un CONSENTEMENT, et un consentement arraché n’en est pas un.',
    'La quête de Kyle est liée à un traumatisme, avec un risque réel de poursuivre une certitude malgré de nouvelles informations. C’est une tendance de personnage, pas une fatalité de jeu : l’arbitre ne lui fait jamais ignorer un fait établi au motif qu’il serait obstiné.',
    'DISTINCTION PIVOT : un fait constaté n’est pas un dossier instruisible. Ce que Kyle sait est réel et ne vaut rien tant que ce qui s’instruit n’a pas été séparé de ce qui n’est que sa conviction. L’arbitre tient ces deux étapes distinctes.',
    'Les quatre faits sont distincts : où est le dossier, ce qu’il reste de ses accès, ce qu’il pense et par quoi, et comment les sœurs le tiennent. Aucun ne se déduit d’un autre. Perdre l’accès ne classe pas le dossier ; être tenu pour un danger ne modifie pas son jugement.',
    'Piper et Phoebe existent comme faits et ne sont pas des cartes : la quatrième condition se constate devant les sœurs, et Paige, qui est une carte, ne suffit pas à elle seule à l’établir dans un sens ou dans l’autre. Les gestes et déplacements ordinaires sont compris dans l’action.',
    'Les ressources distribuées sont des MOYENS et jamais des solutions. Un camp sans pouvoirs n’est pas un camp faible : un dossier, un accès, une source et une hiérarchie sont des moyens entiers. L’attaque ne vise qu’une ressource libre en main adverse ; une ressource engagée relève du verrou.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5 (Demander la création d’une ressource).'
  ].join(' ')
};
