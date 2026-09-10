'use strict';
// Le Nexus sous tension — réécriture du 10 septembre 2026.
//
// Règles appliquées : une ressource distribuée est un moyen, jamais une solution ;
// aucun chemin préparé ne peut être satisfait par l'emploi d'une seule ressource
// conforme à sa propre description ; chaque condition d'objectif exige une
// combinaison. Voir regles/historique/MODIFICATIONS_2026-09-10.md.

const base = require('../manoir-assiege-souple/scenario');

// --- Ressources : ce qu'elles SONT et ce qu'elles PERMETTENT, jamais l'usage qui résout.
const descriptions = {
  phoebe: 'Sorcière. Prémonitions déclenchées par un contact pertinent ; sens de l’enquête et du lien avec les gens.',
  piper: 'Sorcière. Fige ce qu’elle voit et provoque des explosions moléculaires, dans la limite de sa portée et de sa vue.',
  paige: 'Sorcière et être de lumière. Se déplace et déplace des objets par orbes, à condition de savoir où elle va.',
  livre: 'Grimoire familial. Contient des connaissances, des formules et des recettes ; il faut le consulter, et une consultation prend du temps.',
  grenier: 'Pièce du manoir tenue par les sœurs. Espace de recherche et de préparation, à l’écart des circulations.',
  'sous-sol': 'Pièce du manoir abritant le Nexus. Y accéder, l’occuper et en contrôler l’usage sont trois choses distinctes.',
  cristaux: 'Cristaux magiques. Selon leur disposition, ils protègent un espace ou confinent une cible ; leur effet dure tant qu’ils restent en place.',
  materiel: 'Mortier, fioles et ustensiles. Permet de préparer une potion à condition d’avoir la recette et les ingrédients ; ne produit rien à lui seul.',
  zankou: 'Démon puissant et stratège. Décide, coordonne, et pèse par sa seule présence là où il choisit d’être.',
  guetteur: 'Démon de bas grade. Observe depuis un poste et transmet ce qu’il voit ; il n’intervient pas.',
  eclaireur: 'Démon de bas grade. Se déplace, reconnaît un terrain et travaille de ses mains sur place.',
  repaire: 'Lieu tenu par Zankou, hors du manoir. On y prépare et on y décide ; aucune voie directe ne le relie au manoir.',
  message: 'Papier et enveloppe. Peut porter un texte ; son contenu et son acheminement restent entièrement à construire.',
  outils: 'Outils matériels. Permettent de forcer, de bloquer ou d’aménager un accès physique ; ils ne franchissent aucune protection magique.',
  'acces-manoir': 'Entrées et circulations intérieures du manoir. Ce qui les rend tenues, ce sont les moyens réellement postés dessus.'
};

const titres = { materiel: 'Matériel de potion' };

const accesManoir = {
  id: 'acces-manoir', title: 'Accès du manoir', category: 'lieu',
  description: descriptions['acces-manoir'], icon: '⌂', owner: 'commanditaire',
  availableDay: 1, heldBy: null, lost: false, consumed: false, unique: false, preparation: false
};

const resources = [
  ...base.resources.map(r => ({ ...r, title: titres[r.id] || r.title, description: descriptions[r.id] || r.description })),
  accesManoir
];

// --- Objectifs : quatre conditions distinctes de chaque côté, aucune atteignable d'une carte.
const goals = [
  {
    id: 'root-phoebe',
    owner: 'phoebe',
    shortTitle: 'Le manoir repris',
    initialValue: false,
    title: 'Avant le matin du jour 14, les sœurs circulent de nouveau librement entre le grenier et le sous-sol, le Livre des Ombres reste hors d’atteinte du camp de Zankou, le soutien concret qui rend l’emprise de Zankou effective a cessé de produire son effet, et aucun démon ne contrôle l’usage du Nexus.'
  },
  {
    id: 'root-commanditaire',
    owner: 'commanditaire',
    shortTitle: 'L’emprise tenue',
    initialValue: true,
    title: 'Jusqu’au matin du jour 14, le camp de Zankou garde les circulations intérieures du manoir sous un contrôle effectivement soutenu, empêche les sœurs de se déplacer librement entre les étages, conserve une voie praticable vers le sous-sol et tient le Livre des Ombres hors d’un usage libre par les sœurs.'
  }
];

// --- Chemins préparés (privés).
// Chaque branche croise au moins deux moyens de natures différentes, et aucune
// contribution n'est la paraphrase de la ressource qui la sert.
const branch = (condition, contribution, resources) => ({ condition, contribution, resources, attack: false });

const routes = [
  {
    camp: 'phoebe', title: 'Comprendre avant d’agir',
    sufficiency: 'Identifier ce qui rend l’emprise effective, se doter d’un moyen adapté à ce soutien précis, puis le faire cesser.',
    branches: [
      branch('Les sœurs savent ce qui soutient concrètement l’emprise, et pas seulement qu’elle existe.', 'Croiser ce qui a été perçu sur le terrain avec une recherche menée à l’écart.', ['phoebe', 'livre']),
      branch('Un moyen réellement adapté à ce soutien est entre leurs mains.', 'Préparer ce moyen à partir d’une recette aboutie et de ce qu’il faut pour la réaliser ; le matériel seul ne produit rien.', ['materiel', 'livre']),
      branch('Le soutien identifié ne produit plus son effet.', 'Employer ce moyen contre ce soutien, par quelqu’un capable de l’atteindre là où il se trouve.', ['piper', 'materiel'])
    ]
  },
  {
    camp: 'phoebe', title: 'Rouvrir le manoir',
    sufficiency: 'Rendre le déplacement possible sans dépendre des circulations tenues, puis reprendre celles qui comptent en protégeant ce qui ne doit pas être perdu.',
    branches: [
      branch('Les sœurs atteignent un étage sans emprunter une circulation tenue.', 'Un déplacement qui ne dépend d’aucune porte, appuyé sur une pièce sûre d’où partir.', ['paige', 'grenier']),
      branch('Une circulation cesse d’être effectivement tenue par le camp adverse.', 'Une intervention située, décidée à partir de ce que les sœurs ont appris de ses appuis.', ['piper', 'paige']),
      branch('Le Livre reste hors d’atteinte pendant toute la reconquête.', 'Un dispositif dont l’effet dure tant qu’il reste en place, et quelqu’un pour l’établir.', ['cristaux', 'paige'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Tenir sans se montrer',
    sufficiency: 'Empêcher les sœurs de comprendre ce qui soutient l’emprise, et anticiper leurs tentatives avant qu’elles n’aboutissent.',
    branches: [
      branch('Les sœurs se trompent sur ce qui rend l’emprise effective.', 'Faire parvenir une information incomplète par un canal qu’elles jugeront crédible.', ['message', 'guetteur']),
      branch('Une tentative de reconquête est connue avant d’aboutir.', 'Croiser une reconnaissance de terrain avec une décision prise à l’abri.', ['eclaireur', 'repaire']),
      branch('Le Livre reste inutilisable pour ce que les sœurs voudraient en tirer.', 'Agir sur les conditions d’une consultation aboutie plutôt que sur le livre lui-même.', ['guetteur', 'outils'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Rendre le mouvement coûteux',
    sufficiency: 'Faire payer chaque déplacement des sœurs, et concentrer l’appui personnel là où l’emprise est réellement fragile.',
    branches: [
      branch('Franchir une circulation demande un effort que les sœurs ne peuvent pas fournir sans se découvrir.', 'Un aménagement matériel des accès, réalisé sur place par quelqu’un qui sait où intervenir.', ['outils', 'eclaireur']),
      branch('L’emprise conserve un appui personnel là où elle est le plus menacée.', 'Une présence décidée en fonction de ce qui est réellement en jeu, et non une garde permanente.', ['zankou', 'acces-manoir']),
      branch('Une voie vers le sous-sol reste praticable pour le seul camp de Zankou.', 'Entretenir un passage réservé, ce qui suppose de savoir en permanence qui s’en approche.', ['eclaireur', 'acces-manoir'])
    ]
  }
];

// --- Calendrier : des occasions et des contraintes, jamais des solutions.
const event = (morning, title, effect, balance, grants) => ({
  id: 'nexus-tension-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  event(3, 'Coupure d’eau dans le quartier', 'Une canalisation cède dans la rue. Des ouvriers travaillent devant la maison toute la journée : les allées et venues extérieures sont visibles de tous. Aucun accès intérieur n’est modifié.', 'contrainte commune'),
  event(5, 'Orage sur San Francisco', 'Un orage violent réduit la visibilité et perturbe l’électricité par intermittence. Aucun pouvoir magique n’est supprimé et aucun passage n’est ouvert.', 'contrainte commune'),
  event(7, 'Une lettre au courrier', 'Le facteur dépose une enveloppe adressée au manoir. Chaque camp apprend son existence ; nul ne connaît son contenu sans l’avoir lue.', 'occasion commune', [{ id: 'lettre-manoir', title: 'Enveloppe adressée au manoir', icon: '✉', category: 'objet', description: 'Une enveloppe déposée au manoir. Son contenu n’est connu que de qui l’a réellement ouverte et lue.' }]),
  event(9, 'Retour au calme', 'La visibilité et l’alimentation électrique redeviennent normales. Ce qui a été acquis reste acquis ; rien d’endommagé ne se répare tout seul.', 'occasion commune'),
  event(11, 'Nuit sans lune', 'L’obscurité est totale dehors comme aux étages non éclairés. Elle gêne l’observation autant qu’elle couvre le déplacement, pour les deux camps.', 'occasion commune'),
  event(14, 'Fin de l’épreuve', 'L’Ange du destin examine l’état réel des circulations, du Livre des Ombres, du soutien de l’emprise et du Nexus. Aucun camp ne gagne sur une simple intention.', 'échéance commune')
];

module.exports = {
  ...base,
  id: 'nexus-sous-tension',
  title: 'Le Nexus sous tension',
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 14),
  goals,
  initialFacts: [
    'Les agents de Zankou tiennent les entrées et les circulations intérieures du manoir.',
    'Piper, Phoebe et Paige sont vivantes et libres, retranchées au grenier avec le Livre des Ombres.',
    'Les sœurs ne peuvent pas circuler librement entre le grenier, le rez-de-chaussée et le sous-sol.',
    'Une voie vers le sous-sol reste praticable pour le camp de Zankou ; aucun contrôle du Nexus n’est acquis.',
    'Le Livre des Ombres est intact et sous la garde des sœurs.',
    'Zankou ne détient aucun pouvoir volé aux sœurs.',
    'Le contrôle des circulations repose sur des moyens concrets présents sur place ; les sœurs ignorent lesquels.'
  ],
  opening: 'Pendant la nuit, les agents de Zankou ont pris les entrées et les circulations du manoir. Piper, Phoebe et Paige se sont regroupées au grenier avec le Livre des Ombres. Elles sont vivantes et libres, mais elles ne peuvent plus descendre normalement. Zankou tient le manoir au sens stratégique ; il ne possède ni le Livre, ni le Nexus, ni leurs pouvoirs. Ce contrôle repose sur des moyens réels, présents quelque part dans la maison — vous ne savez pas encore lesquels, et c’est la première chose à découvrir. Votre état initial est FAUX : vous devez reprendre le manoir avant le matin du jour 14. Vos cartes sont des moyens, pas des solutions : aucune ne résout à elle seule une condition de votre objectif.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis Zankou et mes agents tiennent les entrées et les circulations intérieures du manoir.',
      'Ce contrôle repose sur des moyens concrets présents sur place : s’ils cessent d’agir, il cesse avec eux.',
      'Les trois sœurs sont au grenier avec le Livre des Ombres ; elles sont libres et capables d’organiser une reprise.',
      'Je ne possède ni le Livre des Ombres, ni le Nexus, ni les pouvoirs des sœurs.',
      'Mon contrôle initial ne rend pas impossible toute intervention des sœurs : il la rend coûteuse.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni la solution de ses actions futures.'
    ]
  },
  privateFacts: {
    ...base.privateFacts,
    routes,
    documents: {
      ...base.privateFacts.documents,
      'Enveloppe adressée au manoir': 'Une facture de plomberie ordinaire, adressée aux propriétaires. Rien d’occulte, rien d’utile en soi : c’est un objet du quotidien que chaque camp peut employer comme il l’entend.'
    },
    inventions: [
      'Prise nocturne des accès du manoir et calendrier civil fictifs.',
      'Le contrôle initial de Zankou porte sur les accès et les circulations ; il ne vaut ni possession du Livre, ni contrôle du Nexus.',
      'Le soutien concret de ce contrôle n’est pas fixé d’avance : il se construit par les coups réellement joués.',
      'Léo et les enfants sont à l’abri hors du manoir ; ils ne sont ni captifs ni ressources initiales.'
    ]
  },
  doctrine: base.doctrine
    + ' Cette partie est un nouveau départ indépendant : aucune action, question, réponse, connaissance tactique ou conséquence d’une partie antérieure ne doit être reprise.'
    + ' Les ressources distribuées sont des MOYENS et jamais des solutions : aucune condition d’objectif ne peut être établie par l’emploi d’une seule carte conforme à sa propre description. Une contribution qui se contente de faire faire à une ressource ce qu’elle fait habituellement — un guetteur qui guette, un éclaireur qui éclaire, un stratège qui décide — n’établit aucun changement et doit être refusée.'
    + ' Le matériel de potion ne produit aucune potion sans recette aboutie et sans ce qu’il faut pour la réaliser : la convention game:potions ne s’applique pas à cette partie, où aucune potion prête n’est distribuée.'
    + ' Le contrôle d’un accès, la présence dans une pièce, le contrôle du sous-sol et l’emprise sur le Nexus restent quatre faits distincts. Les deux camps construisent leurs propres chaînes à partir du plateau.'
};
