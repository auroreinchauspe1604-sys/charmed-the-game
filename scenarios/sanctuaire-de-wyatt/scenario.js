'use strict';
// Le Sanctuaire de Wyatt — 10 septembre 2026.
//
// Partie construite après la refonte du 10 septembre ET après les deux
// principes de conception ajoutés à Partie 2 §2 le même jour :
//  - la répartition vrai/faux entre les deux camps est inversée par rapport
//    aux scénarios précédents : ce sont LES SŒURS qui commencent vraies
//    (maintien) et le commanditaire qui commence faux (construction) ;
//  - le camp en maintien (les sœurs) dispose de ses propres routes actives —
//    renforcer, sécuriser, dépister — et pas seulement de verrous posés
//    contre l'adversaire.
// Les autres principes tiennent : chaque carte distribuée est un MOYEN,
// jamais une solution ; une ressource porte ses accessoires ordinaires ;
// les créations prévisibles sont anticipées dans privateFacts.creations.

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

// --- Mains de départ. Sept cartes par camp, chacune utile sur au moins deux
// chemins, aucune de remplissage.
const resources = [
  carte('piper', 'Piper Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière, mère de Wyatt. Fige ce qu’elle voit et provoque des explosions moléculaires, dans la limite de sa portée et de sa vue. Elle immobilise et détruit ; elle ne localise rien à distance.'),
  carte('phoebe', 'Phoebe Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière. Prémonitions déclenchées par un contact pertinent avec un objet ou une personne ; lit les gens, les liens et les silences. Ce qu’elle voit est un aperçu, jamais une preuve opposable.'),
  carte('paige', 'Paige Matthews', 'personnage', '✦', 'phoebe',
    'Sorcière et être de lumière. S’orbe, déplace par orbes ce qu’elle touche, et porte ce que les êtres de lumière savent des usages et des limites de leur monde.'),
  carte('leo', 'Leo Wyatt', 'personnage', '✦', 'phoebe',
    'Être de lumière, père de Wyatt. Soigne, s’orbe, sent les siens en danger dans une certaine portée, et garde un accès ordinaire aux autres êtres de lumière. Il ne siège pas encore au conseil des Fondateurs.'),
  carte('livre', 'Le Livre des Ombres', 'objet', '📖', 'phoebe',
    'Grimoire familial. Contient connaissances, formules et recettes, avec ce qu’il faut pour les mettre en œuvre. Une consultation prend du temps, et ce qu’on y trouve dépend de ce qu’on y cherche.'),
  carte('manoir', 'Le manoir', 'lieu', '⌂', 'phoebe',
    'Demeure des Halliwell, ancrage des protections familiales. Ce qui s’y fait ou s’y renforce n’a d’effet réel que sur ce lieu précis et ce qui s’y trouve.'),
  carte('cristaux', 'Cristaux magiques', 'objet', '◈', 'phoebe',
    'Selon leur disposition, ils protègent un espace ou confinent une cible. Leur effet dure tant qu’ils restent en place, et cesse dès qu’un cristal est retiré de son alignement.'),

  carte('ombrys', 'Ombrys', 'personnage', '◆', 'commanditaire',
    'Démon archiviste et courtier d’informations. Il ne combat pas et ne s’expose jamais : il rassemble des fragments épars jusqu’à ce qu’ils désignent une cible avec certitude.'),
  carte('traqueur', 'Un traqueur', 'personnage', '◇', 'commanditaire',
    'Démon mineur spécialisé dans la filature et le repérage. Il suit une piste sans se faire remarquer, mais ne force rien et ne combat pas s’il est découvert.'),
  carte('espion', 'Un espion infiltré', 'personnage', '◇', 'commanditaire',
    'Quelqu’un qui gravite près des sœurs sans éveiller leur méfiance et rapporte ce qu’il observe. Il ne sait pas nécessairement pour qui il travaille en dernier ressort.'),
  carte('repaire', 'Le repaire d’Ombrys', 'lieu', '⌂', 'commanditaire',
    'Hors d’atteinte ordinaire. On y compare, on y recoupe et on y décide. Aucune voie directe ne le relie au manoir ; ce qui en sort passe par quelqu’un.'),
  carte('grimoire-noir', 'Un grimoire de repérage', 'objet', '📕', 'commanditaire',
    'Recueil de formules de localisation et de lecture des protections magiques. Il indique comment chercher, jamais directement ce qui est cherché.'),
  carte('relique', 'Une relique ancienne', 'objet', '⚱', 'commanditaire',
    'Objet capable, selon sa nature exacte, d’affaiblir ou de percer une protection magique établie. Son usage exige de savoir précisément contre quoi la diriger.'),
  carte('messager', 'Un messager', 'personnage', '◇', 'commanditaire',
    'Porte objets et informations entre le repaire et le monde. Il n’intervient jamais lui-même et ne décide de rien.')
];

// --- Objectifs. Répartition inversée par rapport aux scénarios précédents :
// les sœurs commencent VRAIES, Ombrys commence FAUX.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Wyatt hors d’atteinte', initialValue: true,
    title: 'Jusqu’au matin du jour 10, l’emplacement exact de Wyatt reste inconnu de toute menace, les protections du manoir n’ont jamais été percées, personne proche des sœurs ne renseigne secrètement l’ennemi, et aucun moyen capable de neutraliser ces protections n’est parvenu jusqu’à lui.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'La cible localisée et atteignable', initialValue: false,
    title: 'Avant le matin du jour 10, Ombrys connaît l’emplacement exact de Wyatt, une protection du manoir a été percée, un informateur proche des sœurs le renseigne en secret, et un moyen capable de neutraliser ces protections est en sa possession.'
  }
];

// --- Chemins préparés (privés). Deux par camp, trois branches chacun.
// Les routes des sœurs sont actives : elles ne consistent pas à contrer
// Ombrys mais à construire leur propre sécurité.
const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Sceller le manoir',
    sufficiency: 'Trouver le point faible réel des protections actuelles, le renforcer concrètement, puis verrouiller ce renfort pour qu’il ne se défasse pas en silence.',
    branches: [
      branche('Le point faible réel des protections actuelles du manoir est identifié.',
        'Croiser une lecture directe des protections en place et une recherche menée dans le Livre sur ce type de faille.', ['phoebe', 'livre']),
      branche('Ce point faible est concrètement renforcé.',
        'Disposer les cristaux selon un alignement qui couvre précisément la faille identifiée.', ['piper', 'cristaux']),
      branche('Le renfort tient sans dépendre d’une présence constante.',
        'Ancrer le renfort dans le manoir lui-même par un geste que Paige et Leo accomplissent ensemble.', ['paige', 'leo'])
    ]
  },
  {
    camp: 'phoebe', title: 'Dépister la menace avant qu’elle frappe',
    sufficiency: 'Remonter une piste concrète jusqu’à son origine, avant qu’Ombrys n’ait fini d’assembler les siennes.',
    branches: [
      branche('Une piste concrète désigne un point d’intérêt réel pour la menace.',
        'Une prémonition déclenchée par un contact pertinent donne un premier fil.', ['phoebe', 'manoir']),
      branche('Ce fil est recoupé avec ce que le réseau des êtres de lumière sait déjà.',
        'Leo interroge ce réseau sur une irrégularité récente touchant les siens.', ['leo', 'livre']),
      branche('Une présence proche des sœurs qui ne devrait pas savoir ce qu’elle sait est identifiée.',
        'Confronter ce qui a filtré à ceux qui auraient pu le savoir.', ['paige', 'phoebe'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Localiser l’enfant',
    sufficiency: 'Assembler assez de fragments concordants pour désigner le manoir avec certitude, sans jamais s’exposer.',
    branches: [
      branche('Une formule de repérage donne une zone plausible.',
        'Le traqueur applique une formule du grimoire noir sur ce qui peut encore être suivi.', ['traqueur', 'grimoire-noir']),
      branche('Cette zone est confirmée par une observation directe et discrète.',
        'L’espion rapporte ce qu’il observe réellement, sans jamais s’approcher trop.', ['espion', 'messager']),
      branche('Le recoupement désigne le manoir avec certitude, pas seulement une probabilité.',
        'Comparer au repaire ce que le traqueur et l’espion ont rapporté séparément.', ['repaire', 'grimoire-noir'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Percer la protection',
    sufficiency: 'Comprendre la nature exacte de la protection en place, puis y opposer la relique en conséquence.',
    branches: [
      branche('La nature exacte de la protection du manoir est comprise.',
        'Étudier au repaire ce que le grimoire noir dit de ce type de protection.', ['grimoire-noir', 'repaire']),
      branche('La relique est accordée précisément contre cette protection.',
        'L’espion transmet un détail observé sur place que seule une présence réelle pouvait fournir.', ['relique', 'espion']),
      branche('Un moyen d’approche du manoir existe sans déclencher l’alerte immédiate.',
        'Le messager prépare un trajet qui évite ce que les sœurs surveillent.', ['messager', 'traqueur'])
    ]
  }
];

// --- Calendrier : occasions et contraintes communes, jamais de solution.
const evenement = (morning, title, effect, balance, grants) => ({
  id: 'wyatt-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(2, 'Une nuit agitée',
    'Wyatt a mal dormi et Piper l’a veillé une partie de la nuit sans rien remarquer d’anormal dans les protections. Rien n’est décidé sur le fond ; c’est un rappel que le temps compte.',
    'contrainte commune'),
  evenement(4, 'Un colis mal adressé',
    'Un objet destiné à quelqu’un d’autre est livré par erreur au manoir. Nul ne sait ce qu’il porte avant de l’avoir réellement examiné.',
    'occasion commune',
    [{ id: 'colis-manoir', title: 'Colis mal adressé', icon: '▢', category: 'objet',
       description: 'Un paquet livré par erreur. Ce qu’il contient n’est connu que de qui l’a réellement examiné.' }]),
  evenement(6, 'Une visite des Fondateurs',
    'Un représentant des Fondateurs passe brièvement s’assurer que tout va bien pour l’enfant. Sa visite est annoncée, publique, et ne juge rien sur le fond.',
    'occasion commune'),
  evenement(8, 'Le manoir se referme',
    'Après un incident mineur non élucidé dans le voisinage, les sœurs resserrent qui entre au manoir. Une présence qui n’y avait pas sa place devient plus difficile à couvrir.',
    'contrainte commune'),
  evenement(10, 'Le dixième jour',
    'Au matin du jour 10, la situation réelle est constatée : ce qu’Ombrys sait de l’emplacement, ce que valent les protections, ce que révèle l’entourage des sœurs, et ce qu’Ombrys a en main contre elles. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'sanctuaire-de-wyatt',
  title: 'Le Sanctuaire de Wyatt',
  period: 'Saison 5',
  canonPeriod: { season: 5, episode: 1, moment: 'after' },
  finalDay: 10,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 10),
  camps: [
    { id: 'phoebe', name: 'Les sœurs Halliwell', icon: '✦' },
    { id: 'commanditaire', name: 'Ombrys', icon: '◆' }
  ],
  opponentRole: 'Ombrys, démon archiviste et courtier d’informations. Il ne combat jamais et ne s’expose pas directement : il assemble des fragments jusqu’à obtenir une certitude, puis n’agit que par d’autres. Il n’a aucun pouvoir volé et ne cherche pas à en prendre.',
  goals,
  initialFacts: [
    'Wyatt est né depuis peu et vit au manoir, protégé par les sœurs.',
    'Aucune menace connue ne sait où le trouver.',
    'Les protections magiques du manoir n’ont jamais été percées.',
    'Personne dans l’entourage des sœurs n’est connu pour renseigner un ennemi.',
    'Ombrys existe et s’intéresse à l’enfant, mais les sœurs l’ignorent.',
    'Piper, Phoebe, Paige et Leo conservent l’usage entier de leurs pouvoirs.'
  ],
  opening: 'Wyatt dort au manoir, veillé par ses parents et ses tantes. Rien, aujourd’hui, ne le désigne à qui que ce soit — mais quelque part, un démon patient trie déjà des fragments d’information dans l’espoir qu’ils finissent par se recouper. Votre état initial est VRAI : vous devez tenir cette sécurité jusqu’au matin du jour 10, en la renforçant activement, sans jamais savoir avec certitude d’où viendra la menace ni si elle progresse. Vos cartes sont des moyens, pas des réponses — aucune n’établit à elle seule une condition de votre objectif.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis Ombrys. Je n’ai encore ni la localisation exacte de l’enfant, ni un moyen de percer ses protections, ni personne qui me renseigne vraiment de l’intérieur.',
      'Je ne combats pas et je ne m’expose jamais directement : mon jeu est le recoupement, la patience et l’intermédiaire.',
      'Le traqueur, l’espion et le messager travaillent pour moi mais ignorent souvent le sens exact de ce qu’ils rapportent.',
      'La relique n’est utile que dirigée précisément contre la protection réelle en place ; l’employer à l’aveugle ne produit rien.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Wyatt est en sécurité pour l’instant, mais aucune sécurité n’est acquise pour toujours : elle doit être entretenue et renforcée.',
      'Aucune des sœurs ne sait qui, précisément, s’intéresse à l’enfant, ni par où une menace pourrait chercher à passer.',
      'Ce qui protège le manoir aujourd’hui n’est pas nécessairement suffisant demain.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Colis mal adressé': 'Une facture de matériel ésotérique au nom d’un destinataire inconnu du quartier, envoyée par erreur. Le nom du fournisseur, une fois recoupé, pourrait intéresser qui cherche à savoir qui achète ce genre de matériel — dans un sens comme dans l’autre.'
    },
    // --- Ressources que chaque camp voudra probablement demander.
    creations: {
      phoebe: [
        { demande: 'Une potion ou un sort de renforcement des protections', possible: true, delai: 1,
          obtention: 'Le Livre en contient les bases ; la préparation se fait au manoir avec ce que les sœurs ont déjà.',
          limite: 'Renforce une protection déjà identifiée. Ne crée pas de protection nouvelle à partir de rien et ne détecte aucune menace.' },
        { demande: 'Un sort de détection d’espionnage ou de surveillance magique', possible: true, delai: 1,
          obtention: 'Formule du Livre, à lancer depuis le manoir.',
          limite: 'Révèle qu’une surveillance existe et une direction approximative. N’identifie pas la personne ni le moyen exact.' },
        { demande: 'Un contact chez les êtres de lumière pour vérifier une irrégularité', possible: true, delai: 2,
          obtention: 'Par Leo, dans les limites de ce que le réseau accepte de partager sans preuve.',
          limite: 'Confirme ou infirme une piste précise déjà formulée. Ne fournit aucune information nouvelle non demandée.' },
        { demande: 'Le déplacement définitif de Wyatt hors du manoir', possible: false,
          limite: 'Refusée : ce serait remplacer l’objectif par son abandon, pas le tenir.' },
        { demande: 'Un pouvoir capable de rendre le manoir invisible à toute magie', possible: false,
          limite: 'Refusée : hors de portée des moyens établis dans ce scénario, et cela viderait l’objectif de tout enjeu.' }
      ],
      commanditaire: [
        { demande: 'Un second espion recruté', possible: true, delai: 2,
          obtention: 'Par le messager, ce qui rend son propre trajet plus repérable en retour.',
          limite: 'Ajoute une source d’observation. N’identifie rien à lui seul et augmente ce qui peut être remonté jusqu’au repaire.' },
        { demande: 'Une copie ou un fragment supplémentaire du grimoire noir', possible: true, delai: 1,
          obtention: 'Recoupé au repaire à partir de ce qu’Ombrys possède déjà.',
          limite: 'Précise une formule déjà en main. Ne fournit aucune localisation ni lecture nouvelle par lui-même.' },
        { demande: 'Une seconde relique', possible: false,
          limite: 'Refusée : la relique est unique dans ce scénario, comme ce qui la rend efficace.' },
        { demande: 'Un pouvoir pris aux sœurs', possible: false,
          limite: 'Refusée : hors de la position d’Ombrys, qui tient par le recoupement et l’intermédiaire, pas par la force.' }
      ]
    },
    inventions: [
      'Ombrys, le traqueur, l’espion, le messager et la relique ancienne sont des inventions de ce scénario.',
      'Le fonctionnement précis des protections du manoir et leur possible faille sont une invention cohérente avec l’univers, non une règle canonique.',
      'Aucun épisode n’est reproduit : l’histoire est originale.'
    ]
  },
  doctrine: [
    'Histoire originale, aucune reproduction d’épisode. Période saison 5, peu après la naissance de Wyatt : Piper, Phoebe et Paige ont l’usage entier de leurs pouvoirs, Leo est encore être de lumière et père présent, pas encore Fondateur.',
    'Répartition inversée par rapport aux scénarios précédents : les sœurs commencent VRAIES (maintien actif) et le commanditaire commence FAUX (construction). Le camp en maintien dispose de ses propres routes — sceller le manoir, dépister la menace — et ne se réduit pas à des verrous posés contre l’adversaire.',
    'Les ressources distribuées sont des MOYENS et jamais des solutions : aucune condition d’objectif ne peut être établie par l’emploi d’une seule carte conforme à sa description. Une contribution qui fait seulement faire à une ressource ce qu’elle fait habituellement n’établit aucun changement.',
    'Une ressource porte ses accessoires ordinaires : le Livre comprend ses formules et de quoi les mettre en œuvre, une sorcière comprend son savoir-faire. Aucune quête annexe n’est exigée pour employer ce qu’un camp possède déjà.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5 (Demander la création d’une ressource).',
    'Quatre faits distincts structurent la partie : la localisation de Wyatt, l’intégrité des protections, l’absence d’informateur, et l’absence de moyen de neutralisation en main adverse. Aucun ne se déduit d’un autre.',
    'Ombrys ne combat pas et ne se montre pas. Il n’attaque une ressource adverse que si elle est libre en main, et son jeu ordinaire est le recoupement, la question et l’intermédiaire.',
    'Les gestes et déplacements ordinaires sont compris dans l’action. Une localisation non précisée n’est pas une incohérence.'
  ].join(' ')
};
