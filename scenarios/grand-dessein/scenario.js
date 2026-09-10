'use strict';
// Le Grand Dessein se défait — campagne à paliers, écrite le 10 septembre 2026.
//
// Une partie sans échéance qui commence dans la routine d'une semaine ordinaire au
// manoir et qui, palier après palier, retire une pièce du Grand Dessein (l'équilibre
// du Bien et du Mal tel que la série le pose) jusqu'à une apocalypse imminente.
//
// Mécanique : le mode « vagues » du moteur (voir scenarios/infinite). Quand plus aucun
// personnage adverse n'est vivant au matin, la vague est vaincue et la suivante se
// lève. Chaque passage à un palier applique une transition : un fait nouveau, une
// carte qui arrive, une carte qui part. Ce qui part ne revient pas.
//
// Lecture de la série (transcriptions S04E01, S06E19, S06E22-23, S07E05, S07E12,
// S07E17, S08E16) : le Mal est structurellement nécessaire, personne ne doit gagner
// pour de bon, les deux camps se disputent l'INFLUENCE (innocents, recrues) et les
// POINTS DE POUVOIR (Nexus, Livre, École de magie), et une couche NEUTRE (Anges du
// destin, Ange de la Mort, Tribunal et Nettoyeurs) corrige les excès. La campagne
// enlève ces sécurités une à une.

const PERIOD = { season: 7, episode: 16, moment: 'after' };

const card = ([id, title, icon, category, description]) => ({
  id, title, icon, category, description, owner: 'phoebe', availableDay: 1, preparation: false,
  heldBy: null, lost: false, consumed: false, unique: category === 'personnage' || id === 'livre', canonicalId: id
});

// --- Le camp des sœurs au premier matin : une maison pleine, une semaine ordinaire.
const sisters = [
  ['piper', 'Piper Halliwell', '✦', 'personnage', 'Sorcière. Fige ce qu’elle voit et provoque des explosions moléculaires, dans la limite de sa portée et de sa vue. Une explosion ne détruit pas automatiquement un démon puissant.'],
  ['phoebe', 'Phoebe Halliwell', '✦', 'personnage', 'Sorcière. Prémonitions déclenchées par un contact pertinent ; sens de l’enquête et du lien avec les gens. Ni lévitation ni empathie à cette période.'],
  ['paige', 'Paige Matthews', '✦', 'personnage', 'Sorcière et Être de lumière. Se déplace et déplace des objets par orbes, à condition de savoir où elle va. Pas de guérison autonome.'],
  ['leo', 'Leo Wyatt', '✦', 'personnage', 'Être de lumière des sœurs : déplacement par orbes, transport accompagné et guérison dans les limites de sa fonction. Vulnérable au poison des Êtres des ténèbres. Sa disponibilité dépend de ceux d’En-Haut.'],
  ['livre', 'Livre des Ombres', '📖', 'objet', 'Grimoire familial unique, au grenier. Contient connaissances, formules et recettes ; il faut le consulter et une consultation prend du temps. Repousse les mains du Mal tant que le Grand Dessein tient.'],
  ['grenier', 'Grenier du manoir', '⌂', 'lieu', 'Pièce du manoir tenue par les sœurs. Espace de recherche et de préparation, à l’écart des circulations.'],
  ['sous-sol', 'Sous-sol du manoir', '⌂', 'lieu', 'Pièce du manoir abritant le Nexus. Y accéder, l’occuper et en contrôler l’usage sont trois choses distinctes. Le Nexus est neutre : il va à qui tient la maison.'],
  ['ecole', 'École de magie', '⌂', 'lieu', 'Lieu hors de l’espace ordinaire, accessible par portail. Bibliothèque, refuge et élèves ; protégée tant que les Anciens la soutiennent.'],
  ['cristaux', 'Cristaux', '📦', 'objet', 'Cristaux magiques. Selon leur disposition, ils protègent un espace ou confinent une cible ; leur effet dure tant qu’ils restent en place.'],
  ['materiel', 'Matériel de potion', '⚗️', 'objet', 'Mortier, fioles et ustensiles. Permet de préparer une potion à condition d’avoir la recette et les ingrédients ; ne produit rien à lui seul.'],
  ['kessler', 'Mark et Léa Kessler', '☺', 'personnage', 'Couple d’innocents du quartier, clients du P3. Mortels sans pouvoir ; ils peuvent témoigner, se cacher ou se laisser convaincre. Ils ne savent rien de la magie.']
];

// --- Les paliers : une menace, un lieu tenu, un objectif, ce que l'adversaire sait.
const enemy = (id, title, description, extra = {}) => ({ id, title, icon: '◆', category: 'personnage', description, unique: true, canonicalId: id, ...extra });
const lair = (id, title, description) => ({ id, title, icon: '⌂', category: 'lieu', description });
const thing = (id, title, icon, description) => ({ id, title, icon, category: 'objet', description });

const wave = (season, id, name, title, resources, goal, knowledge, announcement) => ({
  id, name, title, season, episode: 0, period: PERIOD, resources, goal, knowledge, announcement
});

const waves = [
  wave(1, 'drazi', 'Drazi', 'Palier 1 — La routine : Drazi, démon de la haine',
    [
      enemy('drazi', 'Drazi', 'Démon de la haine. Se nourrit des rancœurs des mortels et les attise par le contact et la parole ; il ne force personne, il pousse. Boules d’énergie de faible portée. Vulnérable aux potions et au Pouvoir des Trois.'),
      lair('drazi-repaire', 'Arrière-salle du bar Delancey', 'Lieu tenu par Drazi, à quelques rues du P3. On y observe la clientèle et on y décide ; aucune voie directe ne le relie au manoir.')
    ],
    { shortTitle: 'Un couple brisé', title: 'Drazi a poussé Mark ou Léa Kessler à tuer l’autre, ou a tué l’une des sœurs Halliwell, et demeure vivant et libre.' },
    [
      'Je suis Drazi, démon de la haine. Je repère un couple qui vacille et je le pousse jusqu’au sang ; c’est mon ordinaire et personne En-Bas ne me regarde.',
      'Mes moyens : le contact, la parole, la patience, et une boule d’énergie si l’on me serre de près. Je ne rivalise pas de front avec trois sorcières.',
      'On m’a payé d’avance, ce qui n’arrive jamais. Avec le paiement, une page de six lignes sous un sceau de cire grise, ni blanc ni noir. La première ligne est ma besogne : « La haine, que les mortels se tuent sans qu’on les pousse. » Je ne sais pas qui l’a écrite et je la garde sur moi.',
      'Mon objectif : que Mark ou Léa Kessler tue l’autre, ou qu’une sœur tombe, et rester vivant et libre. Je déclare, prépare et résous mes coups selon les règles ; mes moyens sont ceux de ma carte.',
      'Cette partie est une aventure originale ; aucun événement d’épisode n’est prédéterminé.'
    ],
    'Semaine ordinaire. Phoebe a touché la main de Léa Kessler au P3 et a vu un couteau de cuisine. Un démon de la haine, Drazi, rôde autour du couple. Rien que de très habituel : les Fondateurs ne s’en émeuvent pas.'),

  wave(2, 'woogyman', 'Le Woogyman', 'Palier 2 — Le Nexus s’agite : le Woogyman',
    [
      enemy('woogyman', 'Le Woogyman', 'Ombre ancienne liée au Nexus sous le manoir. Se déplace dans l’obscurité et les recoins de la maison ; possède qui il touche et le retourne contre les siens. Craint la lumière et la formule de la lignée. Il ne quitte pas la maison.'),
      lair('ombres-du-manoir', 'Recoins sombres du manoir', 'Placards, conduits, cave et combles non éclairés. Là où l’ombre se tient, le Woogyman entend et attend ; il n’y voit rien de ce qui se passe en pleine lumière.')
    ],
    { shortTitle: 'Le Nexus dans l’ombre', title: 'Le Woogyman a possédé l’une des sœurs Halliwell ou tient durablement le sous-sol et l’usage du Nexus, et demeure.' },
    [
      'Je suis le Woogyman, l’ombre du Nexus. La balance a bougé d’un cheveu et cela a suffi à me réveiller sous la maison. Je suis la deuxième ligne de la page : « L’ombre, que la maison se souvienne de ce qu’elle a enfermé. »',
      'Mes moyens : l’obscurité, la possession par contact, la peur des enfants devenus grands. Je ne sors pas du manoir ; la lumière me repousse et la formule de la lignée me renvoie sous terre.',
      'Mon objectif : posséder une sœur ou tenir le sous-sol et l’usage du Nexus, et demeurer. Je déclare, prépare et résous mes coups selon les règles ; mes moyens sont ceux de ma carte.',
      'Cette partie est une aventure originale ; aucun événement d’épisode n’est prédéterminé.'
    ],
    'Nouvelle menace : le Woogyman. Le sous-sol a changé de tonalité ; une ombre que la lignée croyait scellée bouge sous le plancher. Le Nexus est neutre : il ira à qui tient la maison.'),

  wave(3, 'barbas', 'Barbas', 'Palier 3 — La couche neutre lâche : Barbas',
    [
      enemy('barbas', 'Barbas', 'Démon de la peur, échappé du purgatoire par la brèche ouverte dans la balance. Lit la peur la plus profonde d’une personne en la touchant ou en la regardant, puis la matérialise en illusion. Une peur affrontée le blesse ; la peur d’une sœur avouée à haute voix l’affaiblit.'),
      lair('barbas-repaire', 'Salle d’attente de l’hôpital général', 'Lieu tenu par Barbas, là où les mourants ne meurent plus. Il y recueille les peurs de toute la ville ; aucune voie directe ne le relie au manoir.'),
      thing('liste-mort', 'Liste des âmes en attente', '📜', 'Copie d’une liste de l’Ange de la Mort : des noms qui auraient dû partir et qui restent. Qui la lit sait qui est en sursis ; elle ne tue personne par elle-même.')
    ],
    { shortTitle: 'La peur l’emporte', title: 'Barbas a tué l’une des sœurs Halliwell par sa propre peur, ou l’a fait renoncer durablement à ses pouvoirs, et demeure libre.' },
    [
      'Je suis Barbas, le démon de la peur. Le purgatoire ne me retient que si la balance tient ; elle penche, je suis sorti.',
      'Mes moyens : lire la peur d’un mortel ou d’une sorcière par le contact ou le regard, la lui rendre en illusion, m’en nourrir. Une peur affrontée en face me blesse ; une peur avouée par une sœur me coupe l’herbe sous le pied.',
      'Les Nettoyeurs n’effacent plus rien et l’Ange de la Mort est en retard : plus la ville a peur, plus je suis fort. Je tiens une copie de sa liste.',
      'Je suis la troisième ligne de la page : « La peur, que ceux qui ne tranchent pas cessent de trancher. » Un Gardien du Vide est mort ; c’est par sa brèche que je suis passé. Je ne sais pas qui l’a tué et je m’en moque.',
      'Mon objectif : qu’une sœur meure de sa peur ou renonce à ses pouvoirs, et rester libre. Je déclare, prépare et résous mes coups selon les règles ; mes moyens sont ceux de ma carte.',
      'Cette partie est une aventure originale ; aucun événement d’épisode n’est prédéterminé.'
    ],
    'Nouvelle menace : Barbas. Le purgatoire l’a lâché par la brèche que la balance vient d’ouvrir. À l’hôpital général, des mourants ne meurent plus ; l’Ange de la Mort ne répond pas. La police et le Bay Mirror commencent à écrire ce que personne n’efface.'),

  wave(4, 'zankou', 'Zankou', 'Palier 4 — Un point de pouvoir tombe : Zankou',
    [
      enemy('zankou', 'Zankou', 'Démon puissant et stratège. Boules de feu et déplacement par flammes ; peut absorber les pouvoirs d’une sorcière qu’il a vaincue. Décide, coordonne, et pèse par sa seule présence là où il choisit d’être.'),
      enemy('legion', 'Légion de Zankou', 'Troupe de démons de bas grade tenant l’École de magie pour Zankou. Ils gardent, fouillent, transmettent et frappent en nombre ; ils ne décident rien. Se disperse si son chef tombe ou si l’École est reprise.', { unique: false }),
      lair('ecole-occupee', 'École de magie occupée', 'L’École, désertée par les Anciens et tenue par Zankou. Bibliothèque, portails et élèves prisonniers sous sa main ; ce qu’on y trouve s’apprend, ce qu’on y détient se garde.')
    ],
    { shortTitle: 'Le manoir à Zankou', title: 'Zankou contrôle l’usage du Nexus ou détient le Livre des Ombres, et demeure vivant et libre.' },
    [
      'Je suis Zankou. Les Anciens ont abandonné l’École de magie et je l’ai prise ; ma légion la tient. Il me reste le manoir, le Livre et le Nexus.',
      'Mes moyens : boules de feu, déplacement par flammes, absorption des pouvoirs d’une sorcière vaincue, et une troupe qui garde, fouille et frappe en nombre. Je ne me montre que là où cela pèse.',
      'Avec l’École, je dispose de sa bibliothèque et de ses portails ; je n’ai ni le Livre, ni le Nexus, ni les pouvoirs des sœurs au départ.',
      'On m’a fait savoir, sous cire grise, que l’École serait laissée sans garde cette nuit-là. Quatrième ligne de la page. Je sers la page parce qu’elle me sert ; je n’obéis à personne.',
      'Mon objectif : contrôler l’usage du Nexus ou détenir le Livre des Ombres, et rester vivant et libre. Je déclare, prépare et résous mes coups selon les règles ; mes moyens sont ceux de ma carte.',
      'Cette partie est une aventure originale ; aucun événement d’épisode n’est prédéterminé.'
    ],
    'Nouvelle menace : Zankou. Les Anciens ont fermé l’École de magie et l’ont laissée derrière eux ; Zankou l’a prise dans la nuit avec une légion. Un point de pouvoir est tombé. Il ne lui manque que la maison.'),

  wave(5, 'triad', 'La Triade', 'Palier 5 — L’influence bascule : la Triade et Dumain',
    [
      enemy('triad', 'La Triade', 'Trois démons anciens qui gouvernent En-Bas depuis l’ombre. Ils ne se battent pas eux-mêmes : ils ordonnent, tentent, achètent et retournent. Boules de feu et déplacement par flammes s’ils y sont contraints. Un membre survivant suffit à la Triade.'),
      enemy('dumain', 'Dumain', 'Démon serviteur de la Triade, patient et persuasif. Se déplace par flammes, se fait passer pour un ami ou un allié, et manie la promesse mieux que l’arme. Il prépare le rite qui rappellera la Source.'),
      lair('triad-sanctuaire', 'Sanctuaire de la Triade', 'Lieu tenu En-Bas, à l’écart de tout. On y décide, on y reçoit qui accepte de descendre, on y prépare un rite ; aucune voie directe ne le relie au manoir.'),
      thing('offre', 'Offre de la Triade', '✉', 'Une proposition adressée à une sorcière : ce qu’elle désire le plus contre ce qu’elle protège. Son contenu n’est connu que de qui l’a reçue ; personne n’y consent automatiquement.')
    ],
    { shortTitle: 'Le Pouvoir des Trois brisé', title: 'La Triade a tué l’une des sœurs Halliwell, ou a retourné contre elles une sorcière qui les servait, et au moins un de ses membres demeure.' },
    [
      'Nous sommes la Triade. Nous ne prenons pas d’assaut : nous tentons, nous achetons, nous retournons. Dumain parle pour nous là où nous ne descendons pas.',
      'Nos moyens : la parole, l’offre, la patience, une boule de feu si l’on nous force. Dumain prépare le rite qui rappellera la Source ; il a besoin de temps et du Nexus éveillé.',
      'Les Anciens se sont tus et ont rappelé les Êtres de lumière : les sœurs n’ont plus de guide. Chaque innocent qu’elles perdent penche la balance de notre côté.',
      'La page est de nous. Nous avons tué les Gardiens du Vide un par un et scellé chaque ordre de leur cire grise, pour que chaque camp croie l’autre coupable et que la couche neutre se retire d’elle-même. Drazi, l’ombre, Barbas et Zankou ont servi sans le savoir. Il reste la cinquième ligne, le silence, puis la sixième.',
      'Notre objectif : qu’une sœur meure, ou qu’une sorcière qui les servait se retourne contre elles, et qu’un membre au moins demeure. Nous déclarons, préparons et résolvons nos coups selon les règles ; nos moyens sont ceux de nos cartes.',
      'Cette partie est une aventure originale ; aucun événement d’épisode n’est prédéterminé.'
    ],
    'Nouvelle menace : la Triade. Les Anciens ont fermé les portes d’En-Haut et rappelé les Êtres de lumière ; Leo est parti sans pouvoir dire quand il reviendrait. Des innocents que les sœurs avaient sauvés meurent l’un après l’autre. Quelqu’un, En-Bas, achète ce qu’il ne peut pas prendre.'),

  wave(6, 'source', 'La Source', 'Palier 6 — L’apocalypse imminente : la Source et le Vide',
    [
      enemy('source', 'La Source du Mal', 'Souverain d’En-Bas, rappelé par le rite de la Triade. Boules de feu, déplacement par flammes, illusions et voix qui commande aux démons. Il n’a pas encore absorbé le Vide ; s’il l’ouvre sur le Nexus, toute magie, bonne ou mauvaise, sera dévorée.'),
      thing('le-vide', 'Le Vide', '⬛', 'Force primordiale scellée dans un coffre, gardée par des Gardiens neutres au nom d’un accord entre les deux camps. Libérée, elle dévore toute magie sans distinction. Elle ne retourne dans sa crypte que si une magie du Bien et une magie du Mal lisent ensemble l’inscription du coffre.'),
      lair('trone', 'Trône d’En-Bas', 'Siège de la Source, En-Bas. Ce qui s’y décide s’exécute partout où un démon obéit ; aucune voie directe ne le relie au manoir, mais tout démon vivant y répond.')
    ],
    { shortTitle: 'Le Vide sur le Nexus', title: 'La Source a libéré le Vide sur le Nexus du manoir, ou a tué l’une des sœurs Halliwell, et demeure.' },
    [
      'Je suis la Source. Le rite m’a rappelé ; le Nexus est éveillé et la ville a peur. Il ne reste au Bien que trois sorcières sans guide et un Livre qui ne repousse plus rien.',
      'Mes moyens : boules de feu, flammes, illusions, et ma voix, à laquelle tout démon vivant répond. Je tiens le coffre du Vide, pris sur le corps du dernier Gardien ; l’ouvrir sur le Nexus finit tout, magie du Bien et du Mal confondues, et je suis prêt à cela.',
      'Je suis la sixième ligne de la page : « Le Vide, que le coffre s’ouvre sur la maison. » Je sais que ce que deux magies ont scellé, deux magies peuvent le resceller en lisant ensemble l’inscription du coffre. Je veille à ce qu’aucun démon ne s’allie aux sœurs.',
      'Mon objectif : libérer le Vide sur le Nexus ou tuer une sœur, et demeurer. Je déclare, prépare et résous mes coups selon les règles ; mes moyens sont ceux de ma carte.',
      'Cette partie est une aventure originale ; aucun événement d’épisode n’est prédéterminé.'
    ],
    'Dernière menace : la Source. Le rite de la Triade a abouti. Le Livre des Ombres ne repousse plus les mains du Mal, le Nexus est éveillé et la Source tient le coffre du Vide. Si elle l’ouvre sur le sous-sol du manoir, il n’y aura plus ni Bien ni Mal. Il n’y a pas d’échéance : il y a ce que vous ferez avant elle.')
];

// --- Ce que chaque palier retire au Grand Dessein. Appliqué au matin où le palier se lève.
const transitions = [
  { season: 2, message: 'Le Grand Dessein se défait, première pièce : la balance a bougé d’un cheveu et le Nexus s’en est aperçu. Dans la cendre de Drazi, les sœurs trouvent une page pliée sous un sceau de cire grise.',
    arrivals: [{ id: 'page-grise', title: 'Page au sceau gris', category: 'objet', icon: '📜', description: 'Page de six lignes trouvée sur Drazi, scellée d’une cire grise, ni blanche ni noire. La première ligne est barrée. Qui la lit sait ce qu’elle dit ; elle ne dit pas qui l’a écrite. Un contact pertinent peut déclencher une prémonition.', unique: true, canonicalId: 'page-grise' }],
    facts: ['Le Nexus sous le manoir a changé de tonalité ; la balance penche vers l’ombre, très légèrement.', 'Drazi portait une page de six lignes sous un sceau de cire grise ; la première ligne, la haine, est barrée.'] },
  { season: 3, message: 'Le Grand Dessein se défait, deuxième pièce : la couche neutre lâche. Les Nettoyeurs n’effacent plus, l’Ange de la Mort est en retard, et l’inspecteur Darryl Morris vient au manoir avec un dossier : un homme en robe grise retrouvé mort dans une crypte sous la ville, un sceau de cire grise à la main.',
    arrivals: [{ id: 'darryl', title: 'Darryl Morris', category: 'personnage', icon: '✦', description: 'Inspecteur de police, ami des sœurs, mortel sans pouvoir. Accès aux lieux publics, aux dossiers, aux témoins ; peut couvrir, retarder ou prévenir. Vulnérable comme tout mortel.', unique: true, canonicalId: 'darryl' }],
    facts: ['Les Nettoyeurs n’effacent plus rien : la police et la presse documentent l’inexplicable.', 'L’Ange de la Mort accumule du retard ; à l’hôpital général, des mourants ne meurent pas.', 'Un Gardien du Vide, neutre au service des deux camps, a été tué ; sa cire est celle du sceau de la page.'] },
  { season: 4, message: 'Le Grand Dessein se défait, troisième pièce : les Anciens ferment l’École de magie et l’abandonnent, sur un ordre qu’ils disent avoir reçu sous cire grise. Elle n’est plus aux sœurs.',
    departures: ['ecole'],
    facts: ['L’École de magie n’est plus soutenue par les Anciens ; elle est aux mains de Zankou.', 'Les Anciens ont quitté l’École sur un ordre scellé de cire grise ; ils croient que les démons ont tué les Gardiens, les démons croient que ce sont les Anciens.'] },
  { season: 5, message: 'Le Grand Dessein se défait, quatrième pièce : En-Haut se tait. Les Êtres de lumière sont rappelés, Leo parmi eux ; les sœurs n’ont plus de guide et leurs innocents tombent. Plus aucun Gardien du Vide ne répond.',
    departures: ['leo'],
    facts: ['Les Anciens ne répondent plus ; les Êtres de lumière ont été rappelés En-Haut.', 'Des innocents que les sœurs avaient sauvés meurent ; la balance penche nettement vers le Mal.', 'Tous les Gardiens du Vide sont morts ou disparus ; le coffre du Vide n’est plus gardé.'] },
  { season: 6, message: 'Le Grand Dessein se défait, dernière pièce : le Livre des Ombres ne repousse plus le Mal et le Nexus est éveillé. Sur la page grise, il ne reste qu’une ligne non barrée. Il ne reste que les sœurs.',
    facts: ['Le Livre des Ombres ne repousse plus les mains du Mal ; sa garde repose entièrement sur les sœurs.', 'Le Nexus est éveillé : qui le tient tient la ville, et ce qu’on y libère se répand partout.'] }
];

const asEnemy = r => ({ ...r, owner: 'commanditaire', availableDay: 1, preparation: false, heldBy: null, lost: false, consumed: false });
const first = waves[0];

module.exports = {
  id: 'grand-dessein',
  title: 'Le Grand Dessein se défait',
  period: 'Saison 7, avant Scry Hard. Campagne originale sans échéance : six paliers, de la routine à l’apocalypse.',
  canonPeriod: PERIOD,
  periodFor: s => s?.infinite?.period || PERIOD,
  finalDay: Infinity,
  resources: [...sisters.map(card), ...first.resources.map(asEnemy)],
  subgoalSlots: { phoebe: 3, commanditaire: 3 },
  camps: [{ id: 'phoebe', name: 'Les sœurs Halliwell', icon: '✦' }, { id: 'commanditaire', name: first.name, icon: '◆' }],
  opponentRole: 'L’adversaire du palier en cours ; son identité, ses moyens et son caractère sont dans ses connaissances de camp. Chaque palier est plus lourd que le précédent.',
  goals: [
    { id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Les sœurs tiennent', initialValue: true, title: 'Les sœurs Halliwell présentes dans la partie sont vivantes et libres, le Livre des Ombres reste sous leur garde et aucun démon ne contrôle l’usage du Nexus.' },
    { id: 'root-commanditaire-1', owner: 'commanditaire', initialValue: false, ...first.goal }
  ],
  initialFacts: [
    'Piper, Phoebe, Paige et Leo vivent au manoir Halliwell ; le Livre des Ombres est au grenier sous leur garde.',
    'Le sous-sol et le Nexus sont tenus par les sœurs ; l’École de magie est ouverte et soutenue par les Anciens.',
    'La balance du Bien et du Mal tient : les Nettoyeurs effacent, l’Ange de la Mort passe à l’heure, les Anciens répondent.',
    'Mark et Léa Kessler sont un couple ordinaire du quartier ; ils ignorent tout de la magie.'
  ],
  opening: 'Mardi. Piper compte les caisses du P3, Paige corrige des copies de l’École de magie, Leo répare la porte du grenier. Phoebe a serré la main de Léa Kessler hier soir et a vu un couteau de cuisine ; derrière Léa, dans la vision, se tenait un homme en robe grise que personne n’a vu au club. Un démon de la haine rôde autour d’un couple : c’est le genre de semaine que vous connaissez par cœur. Vous contrôlez les sœurs, Leo, le Livre, le manoir, l’École et les Kessler. Votre état initial est VRAI et doit le rester. Il n’y a pas d’échéance. Chaque menace vaincue en lève une autre, plus lourde, et chaque fois quelque chose que vous teniez pour acquis vous sera retiré. Ce qui part ne revient pas.',
  calendar: [],
  campKnowledge: {
    commanditaire: [
      'Je suis l’adversaire du palier en cours ; mon identité et mes moyens sont décrits dans mes connaissances de palier et sur ma carte.',
      'Les sœurs disposent du manoir, du Livre des Ombres, de leurs pouvoirs et de ce que le palier ne leur a pas encore retiré. Je ne connais ni leurs projets ni leurs préparatifs.'
    ]
  },
  privateFacts: {
    documents: {
      'Page au sceau gris': 'Ce que deux camps gardent, un seul l’ouvrira. I. La haine : que les mortels se tuent sans qu’on les pousse. (barré) II. L’ombre : que la maison se souvienne de ce qu’elle a enfermé. III. La peur : que ceux qui ne tranchent pas cessent de trancher. IV. L’école : que ceux d’En-Haut lâchent ce qu’ils tiennent. V. Le silence : que la lumière soit rappelée. VI. Le Vide : que le coffre s’ouvre sur la maison. Aucune signature. Au dos, trois petites brûlures en triangle, presque effacées.',
      'Liste des âmes en attente': 'Onze noms, tous patients de l’hôpital général, avec une date passée pour chacun. Le dernier nom est celui du chapelain de l’hôpital ; sa date est demain.',
      'Offre de la Triade': 'À la sorcière qui lira ceci : ce que tu as perdu te sera rendu, entier, le jour où le Livre des Ombres quittera le grenier. Personne n’a besoin de mourir. Signé de trois flammes.'
    },
    inventions: [
      'Campagne originale à six paliers ; les retours du Woogyman, de Barbas, de la Triade et de la Source sont la conséquence du dérèglement de la balance, pas la reprise d’un épisode.',
      'Drazi, les Kessler, le bar Delancey, la légion de Zankou, Dumain au sanctuaire et le coffre du Vide sont posés pour cette partie ; leurs capacités sont celles de leurs cartes.',
      'Les transitions retirent l’École (palier 4) et Leo (palier 5) et font venir Darryl (palier 3). Ces départs sont définitifs pour la partie.',
      'Accroche : la page au sceau gris est l’ordre de la Triade. Elle a tué les Gardiens du Vide et scellé ses ordres de leur cire pour que chaque camp accuse l’autre et que la couche neutre se retire. L’homme en robe grise de la vision de Phoebe est un Gardien, déjà condamné. Les trois brûlures au dos de la page sont la marque de la Triade ; seul un examen effectif de la page les relie à elle.'
    ]
  },
  doctrine: 'Campagne originale sans échéance, ancrée en saison 7 avant Scry Hard pour les pouvoirs : Piper fige et explose, Phoebe n’a que ses prémonitions, Paige ne guérit pas, Leo est Être de lumière tant qu’il est dans la partie. Le repère canonique sert aux capacités, jamais à imposer les événements d’un épisode. Une vague est vaincue quand plus aucun personnage adverse n’est vivant ; le moteur constate ce fait au matin et lève le palier suivant, avec sa transition. Ce qu’une transition retire (École, Leo) ne revient pas et aucune clé ne le fait revenir ; ce qu’elle ajoute (Darryl, faits sur la balance) est acquis. Le retour de démons vaincus dans la série (Woogyman, Barbas, Triade, Source) est un fait de cette partie, motivé par le dérèglement de la balance : ne pas le refuser pour motif canonique. La couche neutre se retire palier après palier : à partir du palier 3, aucun Nettoyeur n’efface un fait public et l’Ange de la Mort n’est plus une ressource fiable ; à partir du palier 5, aucun Ancien ni Être de lumière ne répond. Les ressources sont des moyens et jamais des solutions : aucune condition d’objectif ne s’établit par l’emploi d’une seule carte conforme à sa description. Aucune potion générique ne tue un démon puissant ; aucune recette imposée ; le matériel ne produit rien sans recette aboutie et ingrédients. Documents à contenu fixe dans privateFacts.documents, transmis seulement après consultation effective. Le Vide ne s’ouvre pas par déclaration : sa libération est une attaque déclarée, préparée et résolue sur le sous-sol. Un démon vaincu ne revient pas dans le même palier. Le joueur ne gagne pas un palier par déclaration : la mort ou la neutralisation durable doit être un fait établi par une attaque ou une clé résolue. Accroche : la page au sceau gris annonce les six paliers ; elle décrit ce que chaque adversaire cherche, elle ne force aucun événement et aucune ligne ne se réalise sans coup joué. Son auteur, la Triade, ne se révèle que par un examen effectif de la page, une prémonition sur elle, ou un aveu obtenu d’un adversaire ; ne pas le livrer gratuitement avant le palier 5. Le Vide se rescelle selon la série, quand une magie du Bien et une magie du Mal lisent ensemble l’inscription du coffre : cela exige un allié du Mal réellement acquis, jamais une déclaration.',
  infinite: {
    waves, transitions,
    initial: () => ({ index: 0, wave: { id: first.id, name: first.name, title: first.title, season: first.season, episode: first.episode }, period: PERIOD, season: first.season, cleared: [], knowledge: first.knowledge, total: waves.length })
  }
};
