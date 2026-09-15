'use strict';
// Ce que Christy rapporte — 11 septembre 2026. Série 3.
//
// Dossier de conception : travail-equipe/travail-scenarios/ce-que-christy-rapporte/
//
// Principes appliqués :
//  - le siège 'phoebe' porte Billie Jenkins, qui dispose de pouvoirs réels :
//    la série 2 avait aligné trois camps démunis, ce tic est cassé ici ;
//  - la sœur de Billie est une carte de SA main, et c'est l'instrument de
//    l'adversaire — la carte la plus forte du camp est aussi son point faible ;
//  - chaque carte est un MOYEN, jamais une solution, et les quatorze servent
//    chacune au moins une branche de route témoin ;
//  - le camp en maintien (Dumain) dispose de deux routes de construction.

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

const resources = [
  carte('billie', 'Billie Jenkins', 'personnage', '✦', 'phoebe',
    'Jeune sorcière, apprentie des Halliwell. Télékinésie et projection. La projection n’exécute pas un souhait sans limite, et une parole chargée de colère peut produire ce qu’elle n’a pas voulu.'),
  carte('christy', 'Christy Jenkins', 'personnage', '✦', 'phoebe',
    'Sa sœur, revenue après des années. Sa concentration déclenche des incendies. Elle est la seule source de Billie sur son propre passé, et ce qu’elle rapporte est cohérent.'),
  carte('paige', 'Paige Matthews', 'personnage', '✦', 'phoebe',
    'Sorcière et être de lumière, mentore de Billie. S’orbe et appelle les objets par orbes. Elle vérifie avant de conclure, et ce qu’elle constate, elle le dit.'),
  carte('phoebe', 'Phoebe Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière. Ses prémonitions lui sont revenues ; elle lit les gens, les liens et les silences. Ce qu’elle perçoit est un aperçu, jamais une preuve opposable.'),
  carte('dossier', 'Ce que Billie a réuni', 'objet', '✒', 'phoebe',
    'Des années de recherches sur la disparition de sa sœur : coupures, dates, noms, lieux. Beaucoup de matière et aucune conclusion.'),
  carte('livre', 'Le Livre des Ombres', 'objet', '📖', 'phoebe',
    'Grimoire familial. Contient connaissances, formules et recettes, avec ce qu’il faut pour les mettre en œuvre. Ce qu’on y trouve dépend de ce qu’on y cherche.'),
  carte('manoir', 'Le manoir', 'lieu', '⌂', 'phoebe',
    'Demeure des Halliwell. On y prépare, on s’y parle, et l’on y est vu par celles qui y vivent. Rien de ce qui s’y dit n’engage quelqu’un qui n’était pas là.'),

  carte('dumain', 'Dumain', 'personnage', '◆', 'commanditaire',
    'Agent de la Triade, intermédiaire. Il se téléporte, entretient ce qu’on lui a confié d’entretenir, et n’intervient jamais de front. Ses voyages temporels dépendent d’un artefact qu’il n’a pas ici.'),
  carte('triade', 'La Triade', 'personnage', '⌾', 'commanditaire',
    'Ce qu’il faut pour qu’une décision soit prise et tenue du côté démoniaque. Ne représente ni la totalité de leur puissance ni leur présence, et n’agit jamais en personne dans cette partie.'),
  carte('recit', 'Le récit de la captivité', 'objet', '▣', 'commanditaire',
    'La version que Christy rapporte de ses années d’absence. Elle est cohérente et tient tant que rien de constatable ne la contredit.'),
  carte('garde', 'Un ancien gardien', 'personnage', '◇', 'commanditaire',
    'Il a réellement gardé Christy pendant cette période. Il sait ce qui s’est passé et ce qu’on lui a demandé d’en dire.'),
  carte('promesse', 'Ce que Christy croit devoir', 'objet', '⛓', 'commanditaire',
    'L’attachement construit pendant des années envers ceux qui la retenaient. Ce n’est ni un sort ni une contrainte : c’est ce qu’elle tient pour vrai.'),
  carte('precedent', 'Ce que les Halliwell ont coûté', 'objet', '✒', 'commanditaire',
    'Le relevé, exact et vérifiable, de ce que leurs affaires ont réellement coûté à d’autres. Rien n’y est faux ; tout y est choisi.'),
  carte('refuge', 'Là où la Triade tient conseil', 'lieu', '⌂', 'commanditaire',
    'Hors d’atteinte ordinaire. On y décide et l’on y rend compte. Aucune voie directe ne le relie au manoir ; ce qui en sort passe par quelqu’un.')
];

// --- Objectifs. Les quatre mêmes faits, en sens inverse.
// Répartition : le camp du joueur commence FAUX, l'adverse commence VRAI.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Ce qu’il faut vérifier', initialValue: false,
    title: 'Avant le matin du jour 16, ce que Christy rapporte de sa captivité est contredit par un fait que Billie a vérifié elle-même, le lien qui dirige Christy est établi devant quelqu’un qui n’est pas de sa famille, au moins une des Halliwell soutient Billie sur cette question, et Billie dispose d’une autre source que Christy sur son propre passé.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'Ce que le récit tient', initialValue: true,
    title: 'Jusqu’au matin du jour 16, ce que Christy rapporte de sa captivité n’a été contredit par aucun fait vérifié, le lien qui la dirige demeure invisible de tous, aucune des Halliwell ne soutient Billie sur cette question, et Christy reste la seule source de Billie sur son propre passé.'
  }
];

const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Vérifier sans accuser',
    sufficiency: 'Trouver dans le récit un point qui se vérifie ailleurs que dans la bouche de Christy, obtenir une seconde source sur cette période, et confronter les deux sans détruire ce qui reste entre les deux sœurs.',
    branches: [
      branche('Un fait de la captivité de Christy est vérifiable indépendamment de ce qu’elle en dit.',
        'Reprendre des années de recherches avec ce que le récit vient d’y ajouter.', ['dossier', 'billie']),
      branche('Une autre source que Christy existe sur cette période.',
        'Faire chercher, par quelqu’un qui n’a rien à prouver, ce que Billie ne peut pas chercher sans se trahir.', ['paige', 'dossier']),
      branche('Ce fait est confronté à ce que Christy rapporte.',
        'Poser la question devant quelqu’un qui verra ce que Billie ne verra pas.', ['christy', 'phoebe'])
    ]
  },
  {
    camp: 'phoebe', title: 'Garder les siennes',
    sufficiency: 'Comprendre d’où vient ce qui la pousse à douter des Halliwell, obtenir d’au moins une d’entre elles un soutien explicite, et se donner un moyen de vérifier une affirmation sans dépendre de qui la porte.',
    branches: [
      branche('Ce qui pousse Billie à douter des Halliwell est identifié comme venant d’ailleurs.',
        'Faire lire ce qu’on lui met sous les yeux par quelqu’un qui sait d’où viennent ces choses.', ['phoebe', 'manoir']),
      branche('Au moins une des Halliwell soutient Billie sur cette question.',
        'Apporter ce qu’elle a vérifié plutôt que ce qu’elle ressent.', ['paige', 'manoir']),
      branche('Billie dispose d’un moyen de vérifier une affirmation sans dépendre de qui la porte.',
        'Chercher dans le Livre ce qui permet d’éprouver une parole autrement qu’en la croyant.', ['livre', 'billie'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Tenir le récit',
    sufficiency: 'Garder la version cohérente avec tout ce qui peut être vérifié, entretenir ce que Christy croit devoir, et faire que rien du trajet ne remonte jusqu’à ceux qui décident.',
    branches: [
      branche('Le récit de Christy reste cohérent avec tout ce qui peut être vérifié.',
        'Ajuster ce qu’elle sait avant qu’on ne le lui demande, par celui qui était là.', ['recit', 'garde']),
      branche('Ce que Christy croit devoir à ceux qui l’ont gardée continue de la tenir.',
        'Entretenir l’attachement sans jamais formuler une demande.', ['promesse', 'dumain']),
      branche('Rien du trajet ne remonte jusqu’à ceux qui décident.',
        'Interrompre le lien matériel dès qu’il devient suivable.', ['triade', 'refuge'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Défaire le lien',
    sufficiency: 'Mettre sous les yeux de Billie ce que les Halliwell ont réellement coûté à d’autres, faire qu’elle cesse de leur porter ses doutes, et qu’aucune ne prenne position pour elle.',
    branches: [
      branche('Ce que les Halliwell ont réellement coûté à d’autres est mis sous les yeux de Billie.',
        'Faire porter par quelqu’un de crédible un relevé dont rien n’est faux.', ['precedent', 'garde']),
      branche('Billie cesse de porter ses doutes aux Halliwell.',
        'Laisser la conclusion se former seule, sans jamais la formuler à sa place.', ['precedent', 'dumain']),
      branche('Aucune des Halliwell ne prend position pour Billie sur cette question.',
        'Faire que ce qu’elle apporte arrive toujours au mauvais moment.', ['refuge', 'promesse'])
    ]
  }
];

const evenement = (morning, title, effect, balance, grants) => ({
  id: 'christy-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'Une date qui ne colle pas',
    'En reparlant de ces années, une date est prononcée qui ne s’accorde pas avec une autre, dite plus tôt. Les deux camps l’entendent. Une incohérence de récit n’est pas un mensonge établi, et personne n’en tire rien sans construire une contribution.',
    'occasion commune'),
  evenement(5, 'Une affaire ancienne refait surface',
    'Une famille que les sœurs ont croisée autrefois revient dans la conversation, et ce qu’il lui en a coûté est réel. Rien n’y est faux. L’événement n’accuse personne et ne conclut rien.',
    'contrainte et occasion communes'),
  evenement(8, 'Un objet des années perdues',
    'Christy rapporte du grenier un objet qu’elle dit avoir gardé pendant sa captivité. Il est mis sur la table et chacun peut l’examiner. Nul ne sait ce qu’il porte avant de l’avoir réellement regardé.',
    'occasion commune',
    [{ id: 'objet-captivite', title: 'Objet des années perdues', icon: '▢', category: 'objet',
       description: 'Un objet que Christy dit avoir gardé pendant sa captivité. Ce qu’il porte n’est connu que de qui l’a réellement examiné.' }]),
  evenement(10, 'Une des sœurs demande',
    'L’une des Halliwell pose une question directe à Billie sur ce qu’elle croit. Elle n’accuse personne ; elle demande. Répondre reste une contribution, avec son passage payant et son examen, et se taire est permis. Si une position a déjà été prise dans un sens ou dans l’autre, la question porte sur autre chose et ne produit aucun effet de jeu.',
    'contrainte commune'),
  evenement(13, 'Le silence du gardien',
    'Quelqu’un qui aurait pu parler de cette période devient introuvable. Son absence est constatable par les deux camps ; ce qu’elle signifie ne l’est pas. Ce qui a déjà été obtenu de lui reste acquis.',
    'contrainte commune'),
  evenement(16, 'Le constat',
    'Au matin du jour 16, la situation réelle est constatée : ce que le récit a subi, ce qui est établi du lien, qui soutient Billie, et de qui elle tient ce qu’elle sait de son passé. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'ce-que-christy-rapporte',
  title: 'Ce que Christy rapporte',
  period: 'Saison 8',
  canonPeriod: { season: 8, episode: 16, moment: 'after' },
  finalDay: 16,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 16),
  camps: [
    { id: 'phoebe', name: 'Billie Jenkins', icon: '✦' },
    { id: 'commanditaire', name: 'Dumain', icon: '◆' }
  ],
  opponentRole: 'Dumain, agent de la Triade et intermédiaire. Il ne combat pas et n’intervient jamais de front : il entretient un récit qu’il n’a pas écrit, met sous les yeux de sa cible des faits exacts et choisis, et laisse les conclusions se former seules. Sa force est que rien de ce qu’il fournit n’est faux. Il se téléporte ; il n’a ici aucun moyen temporel.',
  goals,
  initialFacts: [
    'Christy Jenkins est revenue après des années d’absence et vit auprès de sa sœur.',
    'Ce qu’elle rapporte de sa captivité est cohérent et n’a été contredit par rien.',
    'Christy travaille en secret avec la Triade, et Billie l’ignore.',
    'Billie est apprentie des Halliwell et leur porte encore ce qu’elle découvre.',
    'Billie dispose de la télékinésie et de la projection ; la projection n’exécute pas un souhait sans limite.',
    'Christy déclenche des incendies par la concentration. L’étendue de ce qu’elle perçoit d’autrui n’est pas établie.',
    'Billie n’a aucune autre source que sa sœur sur ce qui lui est arrivé pendant ces années.',
    'Les deux camps savent que la situation sera constatée au matin du jour 16.'
  ],
  opening: 'Christy est revenue, et Billie a enfin la seule chose qu’elle cherchait depuis des années : sa sœur, et le récit de ce qui lui est arrivé. Ce récit est cohérent. Il tient. Il explique tout — y compris pourquoi il ne faudrait peut-être pas faire confiance à ceux qui l’ont recueillie. Votre état initial est FAUX : quatre choses doivent devenir vraies avant le matin du jour 16. Vos cartes sont des moyens, pas des réponses, et la plus précieuse de votre main est celle par laquelle on vous atteint.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis Dumain. J’entretiens le récit de Christy et je ne l’ai pas écrit : elle y croit, c’est ce qui le rend solide.',
      'Tout ce que je fournis est exact. Je ne fabrique rien ; je choisis ce qui est vu et quand.',
      'Christy n’est pas mon instrument au sens où elle m’obéirait. Elle tient pour vrai ce qu’on lui a appris à tenir pour vrai, et cela vaut mieux.',
      'Ce qui me perdrait, c’est qu’on remonte le trajet matériel entre le refuge et ce que Billie voit.',
      'Je ne combats pas et je n’interviens pas de front. Je me téléporte ; je n’ai ici aucun moyen temporel.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Ma sœur est revenue. Ce qu’elle raconte se tient, et je n’ai rien d’autre pour savoir ce qui lui est arrivé.',
      'Je sais projeter et déplacer les choses. La projection ne fait pas ce que je souhaite : elle fait ce que je dis, et la colère parle à ma place.',
      'Les Halliwell m’ont formée. Elles ont aussi laissé des dégâts derrière elles, et je commence à l’entendre dire.',
      'Ce que je crois sur mon propre passé ne vient que d’une bouche.',
      'Je ne sais pas qui dirige quoi que ce soit. Je ne sais même pas qu’il y a quelqu’un à diriger.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Objet des années perdues': 'Un objet ordinaire, réellement usé par le temps. Il porte une marque d’atelier qui ne correspond à aucun des lieux que Christy nomme dans son récit, et une usure trop récente pour les années qu’elle décrit. Il ne dit ni où elle était, ni avec qui.'
    },
    creations: {
      phoebe: [
        { demande: 'Un sort permettant d’éprouver une parole', possible: true, delai: 1,
          obtention: 'Le Livre en contient les bases ; la préparation se fait au manoir.',
          limite: 'Empêche de soutenir un mensonge sur le moment. N’établit rien sur ce que la personne croit être vrai, et Christy croit ce qu’elle dit.' },
        { demande: 'Retrouver quelqu’un qui a connu Christy pendant ces années', possible: true, delai: 3,
          obtention: 'Par le dossier et un travail de recoupement ; personne n’a de raison de se manifester.',
          limite: 'Dira ce qu’il a vu, pas ce que cela signifie, et peut être atteint par l’autre camp avant d’être entendu.' },
        { demande: 'Une localisation de l’endroit où Christy était retenue', possible: true, delai: 2,
          obtention: 'Formule du Livre, appuyée sur un objet réellement lié au lieu.',
          limite: 'Donne une direction ou un trajet, jamais une identité ni une preuve opposable.' },
        { demande: 'Le soutien explicite d’une des sœurs', possible: false,
          limite: 'Refusée : c’est une condition de l’objectif. Elle s’obtient par une clé, jamais par une ressource accordée.' },
        { demande: 'Employer la projection pour obtenir la vérité de Christy', possible: false,
          limite: 'Refusée comme ressource. C’est un acte, donc une contribution — et la fiche est formelle : la projection n’exécute pas un souhait sans limite, et ce qu’on obtient ainsi n’établit rien.' }
      ],
      commanditaire: [
        { demande: 'Un second élément à mettre sous les yeux de Billie', possible: true, delai: 2,
          obtention: 'Par le refuge et ce qu’on y conserve ; tout doit être exact.',
          limite: 'Rien n’y est faux, donc rien n’y est contestable comme faux. Chaque pièce ajoute au trajet qui peut être remonté.' },
        { demande: 'Faire disparaître l’ancien gardien', possible: true, delai: 1,
          obtention: 'Il suffit de le faire partir ; personne ne le cherche.',
          limite: 'Ferme une source. Ce qui a déjà été obtenu de lui reste acquis, et une absence soudaine est elle-même constatable.' },
        { demande: 'Renforcer ce que Christy croit devoir', possible: true, delai: 1,
          obtention: 'Par une visite, un rappel, rien de formulé.',
          limite: 'Entretient l’attachement. Ne lui fait pas dire ce qu’elle ne croit pas, et ne la fait pas mentir sciemment.' },
        { demande: 'Faire agir Christy contre les Halliwell', possible: false,
          limite: 'Refusée comme ressource. Christy n’est pas dans la main de ce camp : elle est une carte adverse, et l’atteindre relève du verrou ou de l’attaque selon son état.' },
        { demande: 'L’intervention personnelle de la Triade', possible: false,
          limite: 'Refusée. La carte « La Triade » représente ce qu’il faut pour qu’une décision soit prise, jamais une présence agissante. Elle n’intervient pas en personne dans cette partie.' }
      ]
    },
    inventions: [
      'L’ancien gardien, le relevé de ce que les Halliwell ont coûté, l’objet du jour 7 et le refuge où la Triade tient conseil sont des inventions de ce scénario.',
      'Le contenu précis du récit de Christy sur sa captivité est une invention : le canon établit l’enlèvement et l’endoctrinement, pas la version qu’elle en donne.',
      'La présence active de Dumain à cette date est une hypothèse de conception marquée : la bibliothèque ne le documente qu’à partir de S08E21, tout en décrivant son rôle d’intermédiaire de la manipulation comme couvrant l’arc.',
      'Aucun épisode n’est reproduit. S08E15 et S08E16 documentent Christy et sa position ; rien de S08E21 ni de S08E22 n’est acquis, et personne ne meurt d’office.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 8, après S08E16 et avant S08E21. Rien du dénouement de la saison n’est acquis : ni le Hollow, ni l’affrontement final, ni la mort de personne. Le voyage temporel du dénouement passe par un artefact que Dumain n’a pas ici.',
    'Billie dispose de la télékinésie et de la projection. PROJECTION NE SIGNIFIE PAS EXÉCUTION SANS LIMITE D’UN SOUHAIT : elle produit ce qui est dit, et une parole chargée de colère peut produire ce qui n’était pas voulu. Annuler une altération ainsi produite exige davantage qu’une volonté maîtrisée au premier essai.',
    'Christy déclenche des incendies par la concentration. Aucune immunité absolue au feu ne lui est accordée. L’étendue, les cibles et les conditions de ce qu’elle perçoit d’autrui NE SONT PAS ÉTABLIES : ne jamais employer cela comme un détecteur universel, et ne rien inventer à partir d’une allusion.',
    'Christy n’est pas une démone et sa période hostile n’est pas une nature. Elle croit ce qu’elle dit : un sort de vérité n’établit donc rien contre elle, et l’arbitre ne la traite jamais comme une menteuse consciente. Sa position ne se réduit pas non plus à celle d’une victime passive.',
    'CHRISTY EST UNE CARTE DU CAMP DE BILLIE. C’est son meilleur accès et le point par lequel on l’atteint. Le camp adverse ne la joue pas : pour agir sur elle, il emploie le verrou si elle est engagée, l’attaque si elle est libre en main, et jamais autre chose.',
    'Dumain ne fabrique rien. Tout ce qu’il fournit est exact et choisi : le relevé de ce que les Halliwell ont coûté est vrai, et c’est ce qui le rend redoutable. Un camp qui chercherait à le réfuter comme faux perd son passage ; ce qui se conteste, c’est le trajet par lequel il arrive.',
    'DISTINCTION PIVOT : une incohérence de récit n’est pas un mensonge établi. Ce que Billie remarque est réel et ne vaut rien tant qu’un fait vérifié ailleurs ne le contredit pas. L’arbitre tient ces deux étapes distinctes.',
    'Les quatre faits sont distincts et aucun ne se déduit d’un autre : ce que le récit a subi, ce qui est établi du lien, qui soutient Billie, et de qui elle tient son passé. Contredire le récit ne révèle pas qui le dirige ; établir le lien ne rend personne solidaire de Billie.',
    'Piper reste hors carte et existe comme fait ; la troisième condition se constate devant les sœurs et peut être servie par Paige ou Phoebe, qui sont des cartes. Les gestes et déplacements ordinaires sont compris dans l’action.',
    'Les ressources distribuées sont des MOYENS et jamais des solutions. L’attaque ne vise qu’une ressource libre en main adverse ; une ressource engagée relève du verrou, quel que soit le vocabulaire employé.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5 (Demander la création d’une ressource).'
  ].join(' ')
};
