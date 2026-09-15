'use strict';
// Le crédit de Cole Turner — 10 septembre 2026.
//
// Dossier de conception complet : travail-equipe/travail-scenarios/le-credit-de-cole-turner/
//
// Principes appliqués :
//  - le siège technique 'phoebe' porte ici Cole Turner, humain et sans pouvoirs.
//    Aucune Halliwell n'est une ressource : Phoebe est un fait du plateau ;
//  - LES DEUX états commencent FAUX. Les deux camps construisent, aucun ne tient
//    de position acquise, et une partie sans vainqueur est une issue normale ;
//  - chaque camp détient son meilleur moyen sous condition de ne pas trop s'en
//    servir : le gage découvre Klea, la potion expose Cole ;
//  - les quatorze cartes servent chacune au moins une branche de route témoin.

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

// --- Mains de départ. Sept cartes par camp.
const resources = [
  carte('cole', 'Cole Turner', 'personnage', '✦', 'phoebe',
    'Ancien demi-démon devenu humain. Il conserve son expérience des démons et de leurs pratiques, mais ne dispose plus des pouvoirs de Balthazar. Sa parole n’éteint rien par elle-même.'),
  carte('savoir', 'Ce que Cole sait de la Confrérie', 'objet', '✒', 'phoebe',
    'Ses usages, ses hiérarchies, ce qui s’y paie et comment. Périmé par endroits : il en est sorti. Ne dit pas où sont les gens aujourd’hui, ni qui détient quoi.'),
  carte('barreau', 'Son titre d’avocat', 'objet', '⚖', 'phoebe',
    'Il n’a pas été radié. Un acte qu’il rédige et signe engage dans le monde des vivants. N’a aucune valeur dans le monde souterrain, qui ne connaît pas ces formes.'),
  carte('oblige', 'Un démon qui lui doit quelque chose', 'personnage', '◇', 'phoebe',
    'De bas rang, prudent, encore débiteur d’une ancienne créance. Il paiera une fois, et une seule. Il ne se bat pas et peut être racheté par plus offrant.'),
  carte('alchimiste', 'L’Alchimiste', 'personnage', '⚗', 'phoebe',
    'Il a travaillé sur le sang de Cole autrefois. Il vend son art à qui paie et ne prend aucun parti. Ce qu’il vend à l’un, il peut le vendre à l’autre.'),
  carte('appartement', 'L’appartement de Cole', 'lieu', '⌂', 'phoebe',
    'Le seul endroit qui soit à lui. Phoebe y vient. Ce qui s’y dit n’a pas d’autre témoin que ceux qui sont là. N’est protégé par rien.'),
  carte('potion', 'Ce qui reste de la potion', 'objet', '⚱', 'phoebe',
    'Le fond de ce qui a retiré Belthazar. Sur Cole, le retrait n’a pas tué : il restait un homme derrière. Mais la potion porte le sang de Cole, et par le serment de la Confrérie, quiconque y est lié par le sang y est vulnérable comme à une potion de destruction (S03E19) : sur un membre de la Confrérie, elle ne retire pas, elle détruit. De quoi une application, une seule.'),

  carte('klea', 'Klea', 'personnage', '◆', 'commanditaire',
    'Démon de la Confrérie de l’Épine. Elle observe à distance et se téléporte. Elle vérifiait autrefois les récits qu’on portait devant la Confrérie. Observer ne lui dit ni les pensées, ni la vérité derrière une mise en scène.'),
  carte('gage', 'Le gage', 'objet', '⛓', 'commanditaire',
    'Ce que Raynor tenait du père de Cole. Il n’a pas disparu avec lui : il a été cédé. La Confrérie n’a jamais validé cette cession.'),
  carte('courtier', 'Un courtier de dettes', 'personnage', '◇', 'commanditaire',
    'Son métier est de constater ce qui se doit, ce qui s’éteint et contre quoi. Le monde souterrain reconnaît ses constats. Il n’appartient à personne et travaille pour les deux camps.'),
  carte('emissaire', 'Un émissaire', 'personnage', '◇', 'commanditaire',
    'Quelqu’un qui n’est pas un démon et que les sœurs Halliwell écouteraient. Il n’obéit pas au-delà de ce qu’il a accepté et ne peut pas être envoyé deux fois de la même façon.'),
  carte('preuve', 'Ce qu’il reste de l’affaire Janna', 'objet', '▣', 'commanditaire',
    'Ce qui établit ce que Cole a fait cette nuit-là. Établit dans la même phrase qu’il a agi sous influence : on ne peut pas en extraire l’accusation seule.'),
  carte('refuge', 'Là où la Confrérie se réunit encore', 'lieu', '⌂', 'commanditaire',
    'Ce qu’il en reste après l’opération manquée. On y dépose un rapport, on y constate une obligation. Cole peut y venir ; il n’y a plus de place.'),
  carte('autorite', 'Une autorité de la Confrérie', 'personnage', '☼', 'commanditaire',
    'Assez haut pour valider un rapport, assez prudent pour ne recevoir que ce qui est étayé. Ne protège pas Klea, et sanctionnerait une cession irrégulière s’il l’apprenait.')
];

// --- Objectifs. LES DEUX commencent faux. Trois faits partagés et opposés,
// plus une quatrième condition propre à chaque camp, sans miroir.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Ce qui me reste', initialValue: false,
    title: 'Avant le matin du jour 16, l’obligation que la Confrérie fait valoir sur Cole est éteinte par un fait que le monde souterrain peut constater, Phoebe tient de Cole lui-même ce qu’il a fait sous l’influence de Raynor, aucun acte de Cole postérieur au retrait de ses pouvoirs ne peut être présenté comme un service rendu à la Confrérie, et Cole dispose d’une place dans le monde des vivants que personne ne tient à sa place.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'Le rapport corrigé', initialValue: false,
    title: 'Avant le matin du jour 16, la Confrérie tient sur Cole une obligation qu’il a lui-même consentie, les sœurs Halliwell ont appris d’une autre bouche que la sienne ce qu’il a fait sous l’influence de Raynor, un acte de Cole postérieur au retrait de ses pouvoirs est constatable comme un service rendu à la Confrérie, et le rapport de Klea a été reçu par une autorité de la Confrérie qui peut le valider.'
  }
];

// --- Chemins préparés (privés). Deux par camp, trois branches, deux moyens par
// branche. Ce ne sont pas les seuls chemins et ils ne sont jamais imposés.
const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Éteindre l’obligation',
    sufficiency: 'Établir ce que la Confrérie tient réellement et par quelle main, produire une contrepartie que le monde souterrain accepte, et faire constater l’extinction par quelqu’un qu’il ne peut pas récuser.',
    branches: [
      branche('Ce que la Confrérie tient sur Cole, et par quelle main, est établi.',
        'Croiser ce que Cole sait des usages de la Confrérie avec ce qu’un ancien débiteur peut encore apprendre.', ['savoir', 'oblige']),
      branche('Une contrepartie existe, que le monde souterrain accepte à la place de Cole.',
        'Faire produire une valeur d’échange réelle par quelqu’un dont le métier est d’altérer ce qui se paie.', ['alchimiste', 'potion']),
      branche('L’extinction est constatée par quelqu’un que la Confrérie ne peut pas récuser.',
        'Porter l’échange dans les formes du monde souterrain, en personne.', ['cole', 'oblige'])
    ]
  },
  {
    camp: 'phoebe', title: 'Parler le premier',
    sufficiency: 'Établir ce qui s’est réellement passé sous l’influence de Raynor autrement que par sa propre mémoire, se donner une assise qui ne dépende de personne, et le dire à Phoebe lui-même.',
    branches: [
      branche('Ce qui s’est passé sous l’influence de Raynor est établi autrement que par la mémoire de Cole.',
        'Faire dire à quelqu’un qui a travaillé sur lui à cette période ce qu’il a constaté.', ['alchimiste', 'savoir']),
      branche('Cole dispose d’une place dans le monde des vivants que personne ne tient à sa place.',
        'Rétablir un titre et un domicile qui ne dépendent d’aucune obligation démoniaque.', ['barreau', 'appartement']),
      branche('Phoebe tient de Cole lui-même ce qu’il a fait.',
        'Le lui dire, dans un lieu qui est le sien, sans intermédiaire.', ['cole', 'appartement'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Faire consentir',
    sufficiency: 'Faire découvrir à Cole que le gage a survécu à Raynor, lui présenter le seul canal par lequel cela se dénoue, et obtenir qu’il y consente lui-même.',
    branches: [
      branche('Cole apprend que le gage n’a pas disparu avec Raynor, et par quelle main il est passé.',
        'Le lui faire découvrir sans le lui dire, par ce qu’il trouve lui-même.', ['klea', 'gage']),
      branche('Le seul canal par lequel une obligation se dénoue est présenté à Cole.',
        'Faire venir à lui celui dont le métier est de constater ce qui se doit.', ['courtier', 'refuge']),
      branche('Cole a consenti lui-même à une contrepartie.',
        'Obtenir de lui un acte constatable comme un service, plutôt qu’une parole.', ['courtier', 'gage'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Faire porter le rapport',
    sufficiency: 'Faire précéder son rapport d’une nouvelle qui atteint les sœurs, l’adosser à un constat plutôt qu’à une allégation, et le faire recevoir par qui peut le valider.',
    branches: [
      branche('Les sœurs apprennent d’une autre bouche ce que Cole a fait sous l’influence de Raynor.',
        'Faire porter par quelqu’un qu’elles écoutent ce qu’il reste de cette affaire.', ['emissaire', 'preuve']),
      branche('Le rapport est appuyé sur un constat et non sur une allégation.',
        'Adosser ce qui est rapporté à ce qui a été réellement observé.', ['klea', 'preuve']),
      branche('Le rapport est reçu par une autorité qui peut le valider.',
        'Le porter là où la Confrérie se réunit encore, par quelqu’un qu’elle doit entendre.', ['autorite', 'refuge'])
    ]
  }
];

// --- Calendrier : occasions et contraintes communes, jamais de solution.
const evenement = (morning, title, effect, balance, grants) => ({
  id: 'credit-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'Un nom qui revient',
    'Un nom lié à l’ancienne opération de la Confrérie recircule : quelqu’un cherche à savoir ce que sont devenus ceux qui en étaient. Les deux camps l’apprennent, et chacun comprend que l’autre l’a appris aussi. L’événement ne dit pas qui cherche, ni pour qui, et n’accorde aucun contact.',
    'occasion commune'),
  evenement(5, 'Ce que Raynor a laissé',
    'Ce que Raynor détenait est en cours de liquidation selon les usages : ce qui n’est pas réclamé dans les formes finit par changer de main sans que le débiteur en soit averti. L’événement ne nomme aucun détenteur, ne cède rien à personne, et n’éteint ni ne crée aucune obligation.',
    'contrainte et occasion communes'),
  evenement(7, 'Une enveloppe à l’appartement',
    'Une enveloppe sans expéditeur est déposée à l’appartement de Cole. Son existence est publique ; son contenu ne l’est pas. Nul ne sait ce qu’elle porte avant de l’avoir ouverte.',
    'occasion commune',
    [{ id: 'enveloppe', title: 'Enveloppe déposée sans expéditeur', icon: '✉', category: 'objet',
       description: 'Une enveloppe déposée sans expéditeur. Ce qu’elle contient n’est connu que de qui l’a réellement ouverte.' }]),
  evenement(10, 'Phoebe demande',
    'Phoebe pose à Cole une question directe sur cette période. Elle ne l’accuse de rien ; elle demande. L’événement ne fait parler personne : répondre reste une contribution, avec son passage payant et son examen, et se taire est permis. Si la question de la bouche est déjà tranchée dans un sens ou dans l’autre au matin de ce jour, elle porte sur autre chose et ne produit aucun effet de jeu.',
    'contrainte commune'),
  evenement(13, 'La Confrérie se réunit',
    'Ce qu’il reste de la Confrérie tient une réunion. Ce qui y est porté est reçu ; ce qui arrive après devra attendre la suivante, qui est au-delà de l’échéance. Rien n’y est validé d’office et personne n’y est invité : y être reçu est une chose, y être cru en est une autre.',
    'contrainte commune'),
  evenement(16, 'Le constat',
    'Au matin du jour 16, la situation réelle est constatée sur les sept faits en jeu : les trois faits partagés et la quatrième condition de chaque camp. Les deux états ayant commencé faux, il est possible qu’aucun ne soit vrai : la partie se termine alors sans vainqueur, et c’est une issue normale.',
    'échéance commune')
];

module.exports = {
  id: 'le-credit-de-cole-turner',
  title: 'Le crédit de Cole Turner',
  period: 'Saison 4',
  canonPeriod: { season: 4, episode: 8, moment: 'after' },
  finalDay: 16,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 16),
  camps: [
    { id: 'phoebe', name: 'Cole Turner', icon: '✦' },
    { id: 'commanditaire', name: 'Klea', icon: '◆' }
  ],
  opponentRole: 'Klea, démon de la Confrérie de l’Épine. Elle observe à distance et se téléporte ; elle ne combat pas et ne force rien. Elle était chargée de vérifier le récit de Cole devant la Confrérie, elle l’a validé, et l’opération a échoué avec son rapport dessus. Elle ne veut ni tuer Cole ni le contraindre : elle veut qu’il consente, parce qu’un homme ramené de force ne prouve rien et qu’un homme qui accepte une contrepartie prouve qu’il n’a jamais cessé d’être des leurs.',
  goals,
  initialFacts: [
    'La potion a retiré Belthazar. Cole Turner est vivant, humain, et privé de ses pouvoirs démoniaques.',
    'Raynor est mort. Ce qu’il tenait du père de Cole n’a pas disparu avec lui.',
    'Une obligation démoniaque ne s’éteint ni par la mort du créancier ni par la parole du débiteur : il faut un constat par un tiers dont c’est le métier, et une contrepartie que ce tiers accepte.',
    'La Confrérie de l’Épine subsiste, diminuée par l’opération manquée.',
    'Klea a personnellement porté le rapport favorable qui a validé Cole devant la Confrérie avant cette opération.',
    'Phoebe sait qu’il y a eu Raynor. Elle n’a jamais demandé le détail de ce que Cole a fait sous son influence.',
    'Aucune des deux positions n’est acquise au jour 1 : les deux camps partent d’un état faux.',
    'Les deux camps savent que la situation sera constatée au matin du jour 16.'
  ],
  opening: 'La potion a fonctionné : Belthazar a été retiré, et Cole est vivant, humain, sans un seul de ses pouvoirs. Ce qu’il a perdu n’était pas qu’une puissance — c’était une position, des créances, et des gens à qui il devait quelque chose. Raynor est mort, mais Raynor le tenait par un gage, et un gage ne disparaît pas avec celui qui le détenait : il change de main. Votre état initial est FAUX, et celui de votre adversaire aussi : vous construisez tous les deux, vous voulez la même chose, et il n’y en a que pour un. Vos cartes sont des moyens, pas des réponses, et la plus forte d’entre elles est celle dont l’emploi vous coûte le plus cher.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je détiens le gage, mais la Confrérie n’a jamais validé la cession. Le brandir contre Cole révélerait que j’ai agi pour mon compte : c’est mon point faible et il vaut le sien.',
      'Je ne veux pas Cole mort ni contraint. Un homme ramené de force ne prouve rien : il doit consentir lui-même.',
      'J’observe à distance et je me téléporte. Observer ne me dit pas ce que les gens pensent, ni la vérité derrière une mise en scène.',
      'Ce qu’il reste de l’affaire Janna accuse Cole et l’excuse dans la même phrase. Je ne peux pas en tirer l’accusation seule : je peux seulement choisir qui le dira, et quand.',
      'Ma quatrième condition ne peut être validée qu’à la réunion de la Confrérie, et il n’y en a pas d’autre avant l’échéance.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Je suis humain. Aucun pouvoir : je ne compte que sur ce que je sais, ce que je possède et ce que des gens me doivent encore.',
      'Une obligation démoniaque ne s’éteint ni par la mort du créancier ni par ma parole. Il faut un constat et une contrepartie.',
      'Raynor est mort. Ce qu’il tenait de mon père, je ne sais pas où c’est passé.',
      'Klea a porté le rapport qui m’a validé devant la Confrérie. Ce rapport lui a coûté sa position autant qu’à moi la mienne.',
      'Il me reste de quoi appliquer la potion une fois. La détenir ne fait rien à personne.',
      'Phoebe sait qu’il y a eu Raynor. Elle n’a jamais demandé le détail, et elle finira par l’apprendre.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Enveloppe déposée sans expéditeur': 'Un reçu de cession établi selon les usages. Il atteste qu’un gage a changé de main à une date postérieure à la mort de Raynor, contre une contrepartie qui n’est pas nommée. Le nom du cessionnaire est effacé. Le canal par lequel la cession a été constatée, lui, est parfaitement lisible.'
    },
    creations: {
      phoebe: [
        { demande: 'Un second obligé, une autre créance à faire valoir', possible: true, delai: 2,
          obtention: 'Par ce que Cole sait ; il faut retrouver la personne et qu’elle accepte.',
          limite: 'Paie une fois. Chaque créance appelée est un contact repris avec le monde souterrain, donc un acte descriptible.' },
        { demande: 'De l’argent, une valeur d’échange humaine', possible: true, delai: 1,
          obtention: 'Par son titre et ce qu’il possède.',
          limite: 'N’a aucune valeur pour un constat démoniaque. Le monde souterrain ne prend pas cette monnaie.' },
        { demande: 'Une reproduction de la potion', possible: true, delai: 3,
          obtention: 'Par l’Alchimiste, contre un prix qu’il fixe et des composants que Cole n’a pas nécessairement.',
          limite: 'Une reproduction ne fait rien de plus qu’une application. La recette complète n’est pas établie par le corpus.' },
        { demande: 'Un rendez-vous avec l’autorité de la Confrérie', possible: true, delai: 2,
          obtention: 'Par le courtier ou par un obligé.',
          limite: 'Obtient d’être reçu, jamais d’être cru. Se présenter devant elle est en soi un acte à double lecture.' },
        { demande: 'Un domicile et un statut opposables', possible: true, delai: 1,
          obtention: 'Par le barreau et ce qu’il rédige lui-même.',
          limite: 'Établit sa place dans le monde des vivants. Ne touche à aucune obligation démoniaque.' },
        { demande: 'L’aide de Phoebe, de Piper ou de Paige', possible: false,
          limite: 'Refusée comme ressource. Elles existent comme faits ; elles ne sont la main de personne. Ce que Cole leur dit est une contribution, pas une carte à obtenir.' },
        { demande: 'Le retour de ses pouvoirs', possible: false,
          limite: 'Refusée. S04E13 est hors fenêtre : ni le Hollow, ni les pouvoirs de la Source, ni aucune restitution de sa moitié démoniaque n’existent dans cette partie.' },
        { demande: 'Une preuve que la dette n’a jamais existé', possible: false,
          limite: 'Refusée : c’est une condition de l’objectif. Elle s’établit par une clé, jamais par une ressource accordée.' }
      ],
      commanditaire: [
        { demande: 'Un second émissaire vers les sœurs', possible: true, delai: 2,
          obtention: 'Il faut trouver quelqu’un qu’elles écoutent et le convaincre.',
          limite: 'Le premier a déjà été employé : le second est plus visible et plus cher. N’établit rien seul.' },
        { demande: 'Le concours du courtier sur mesure', possible: true, delai: 1,
          obtention: 'Contre paiement, comme pour l’autre camp.',
          limite: 'Il constate ce qui lui est présenté. Il ne fabrique pas un consentement qui n’existe pas.' },
        { demande: 'Une validation de la cession du gage', possible: true, delai: 3,
          obtention: 'En la portant devant l’autorité — c’est-à-dire en avouant.',
          limite: 'Régularise la cession et expose Klea. Le prix est exactement ce qu’elle cherche à cacher.' },
        { demande: 'Ce que l’Alchimiste sait de Cole', possible: true, delai: 2,
          obtention: 'Contre paiement.',
          limite: 'Il vend ce qu’il a constaté. Il vend aussi à l’autre camp, et il le dira si on le lui demande.' },
        { demande: 'Un moyen de contraindre Cole', possible: false,
          limite: 'Refusée. Sa condition exige un consentement ; la contrainte ne la sert pas. Ce n’est pas un interdit moral, c’est une impasse d’objectif.' },
        { demande: 'Rendre à Cole sa moitié démoniaque', possible: false,
          limite: 'Refusée. Hors fenêtre, et cela lui rendrait des moyens que la partie est construite pour ne pas avoir à affronter.' }
      ]
    },
    inventions: [
      'Le mécanisme d’obligation démoniaque — constat par un tiers dont c’est le métier, contrepartie acceptée, cession, extinction — est une invention de ce scénario. Ce n’est pas une règle canonique de l’univers et elle ne doit pas être réemployée comme telle ailleurs.',
      'Que le gage tenu par Raynor ait survécu à sa mort et ait été cédé est une invention. Le canon établit le chantage sur l’âme du père de Cole (S03E20), pas ce qu’il en advient ensuite.',
      'Le courtier de dettes, l’obligé, l’émissaire, l’autorité de la Confrérie et ce qu’il reste de l’affaire Janna sont des personnages et des objets inventés.',
      'La survie de Klea après S03E19 est une hypothèse de conception marquée, autorisée par la fiche qui déclare le sort des membres de la Confrérie non établi. Même statut pour l’Alchimiste après S03E21.',
      'La quantité restante de potion — de quoi une application, une seule — est une invention de gameplay : le canon n’établit aucun stock.',
      'Aucun épisode n’est reproduit. S03E19, S03E20, S03E21 et S04E08 documentent les personnages et leurs états ; ils n’imposent aucun déroulement.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 4, après S04E08 et avant S04E13. Cole est HUMAIN : ni boules d’énergie, ni déplacement démoniaque, ni seconde forme. Il conserve son expérience des démons et de leurs pratiques. La carte humaine ne devient pas une autre personne sans passé : il garde ses créances, ses dettes, ses ennemis et sa culpabilité.',
    'S04E13 EST HORS FENÊTRE. Ni le Hollow, ni les pouvoirs de la Source, ni la Prophétesse n’existent dans cette partie, et rien n’y restitue une moitié démoniaque. Toute proposition qui les mobilise est refusée sur ce fait de cadrage.',
    'Distinguer quatre choses que rien n’autorise à confondre : la maîtrise de soi, le contre-sort de S03E22, le retrait de S04E08, et la destruction. C’est le retrait qui s’applique ici. La potion n’agit que par application effective : sa simple possession n’altère personne. Des pouvoirs retirés peuvent être récupérés (variante S05E07) : le retrait n’est pas définitif par nature, ce qui interdit à l’arbitre d’opposer une impossibilité de principe sans juger les moyens engagés.',
    'LES DEUX ÉTATS COMMENCENT FAUX. Aucun camp ne tient de position acquise et les deux construisent. Une partie où aucun des deux objectifs n’est vrai à l’échéance est une issue normale prévue par les règles, pas un échec de conception, et l’arbitre ne cherche pas à départager.',
    'Klea observe à distance et se téléporte. Observer une situation ne signifie pas lire les pensées ni connaître automatiquement la vérité derrière une mise en scène. Aucune portée n’est chiffrée : l’arbitre juge sur la situation du plateau. Être membre de la Confrérie ne donne pas les pouvoirs des autres membres.',
    'La condition de Klea exige un consentement de Cole. Une proposition qui reviendrait à le contraindre, le capturer ou le faire chanter sous menace directe n’est pas interdite : elle est sans effet sur son objectif. L’arbitre le constate sans lui donner la solution.',
    'CHAQUE CAMP DÉTIENT SON MEILLEUR MOYEN SOUS CONDITION. Le gage est le levier le plus fort de Klea et chacun de ses emplois rend établissable que la cession était irrégulière. La potion est le moyen le plus fort de Cole et son emploi est un acte qu’on peut décrire comme un retour aux méthodes d’avant. Ni l’un ni l’autre n’est interdit ; l’arbitre en tire les conséquences quand un camp les cherche, jamais automatiquement.',
    'La pièce sur l’affaire Janna établit ce que Cole a fait ET qu’il l’a fait sous influence, dans la même phrase, quel que soit le camp qui l’emploie. On ne peut pas en extraire l’accusation seule. C’est le fait canon de S03E20 et ce n’est pas négociable.',
    'LA QUESTION DE LA BOUCHE SE FERME UNE SEULE FOIS. Dès qu’une bouche a dit aux sœurs ce que Cole a fait, la condition correspondante de l’autre camp est morte définitivement et ne peut plus être rouverte. L’arbitre CONSTATE cette fermeture explicitement au moment où elle se produit, et ne la laisse jamais implicite.',
    'La condition négative de Cole — aucun acte présentable comme un service — se juge sur toute la période et rétroactivement. Elle ne tombe pas au seul motif que Cole agit dans le monde souterrain : sa première condition l’exige précisément. Il faut un acte qu’un tiers puisse réellement présenter sous ce jour.',
    'Aucune Halliwell n’est une ressource : Phoebe, Piper et Paige existent comme faits, n’accordent aucune action ni présence automatique, et ne sont la main de personne. Parler à Phoebe est une contribution entière, pas une action gratuite. Consulter un document que l’on détient reste gratuit.',
    'Les ressources distribuées sont des MOYENS et jamais des solutions. Un camp sans pouvoirs n’est pas un camp faible : un savoir, un titre, une créance et une parole sont des moyens entiers. L’attaque ne vise qu’une ressource libre en main adverse ; une ressource engagée relève du verrou. Aucune attaque ne satisfait de condition : elle prive l’autre d’un moyen, elle ne construit rien.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5 (Demander la création d’une ressource).'
  ].join(' ')
};
