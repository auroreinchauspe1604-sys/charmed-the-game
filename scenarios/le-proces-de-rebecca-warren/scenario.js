'use strict';
// Le procès de Rebecca Warren — Virginie, automne 1723.
//
// Écrit le 22 septembre 2026 à partir du dossier de conception reçu par Aurore.
//
// PRINCIPE. Trente ans après la mort de Melinda Warren, ses trois petites-filles
// n'ont ni le Pouvoir des Trois, ni la maîtrise de leurs dons, ni un Livre qui
// sache grand-chose. Rebecca est en geôle sur la déposition sincère d'une fille
// de ferme. L'accusatrice ne ment pas : elle a vu Karuvax, un démon de la course,
// sous le visage de Rebecca.
//
// CE QUI FAIT LE SCÉNARIO. L'adversaire ne cherche pas le combat. Elias Thorne,
// ministre du bourg et warlock, laisse la loi des hommes condamner une Warren,
// puis demande — au titre de sa charge, publiquement, sans qu'on s'en méfie —
// d'être seul auprès de la condamnée. Tout ce que des sorcières feraient par
// réflexe le sert : une évasion magique confirme l'accusation, une main levée
// sur un mortel fait tomber leur objectif, une attaque frontale se heurte à un
// warlock qui pare les formules.
//
// LE PIÈGE EST ANNONCÉ UNE SEULE FOIS, au matin du jour 2, et il est public.
// Le joueur qui ne l'écoute pas perdra en le confirmant lui-même.
//
// LES DEUX MAINS SONT SÉPARÉES. Ce n'est pas le dispositif de main partagée du
// « Livre qui se défait » : chaque camp a ses huit moyens, et ce que l'autre
// tient ne lui est accessible que par une attaque déclarée.

const carte = (id, title, category, icon, owner, jour, description) => ({
  id, title, category, icon, owner, description,
  availableDay: jour, heldBy: null, lost: false, consumed: false,
  unique: category === 'lieu', preparation: false
});

const resources = [
  // --- LES SŒURS WARREN. Ce dont trois femmes disposent en 1723 : peu.
  carte('objet-de-rebecca', 'Ce qui est à Rebecca', 'objet', '✧', 'phoebe', 1,
    'Un fichu, une croix de bois, ce qu’elle portait le soir de son arrestation et qui est resté à la maison. Temperance ouvre le lien d’esprit à esprit en le tenant : c’est par là, et non par la parole, que les sœurs peuvent atteindre leur cadette derrière un mur. Rebecca peut aussi tenir un objet et voir ce qui s’y est tenu — mais la peur ferme ses dons, et un visage emprunté peut tromper une vision.'),
  carte('livre-de-la-lignee', 'Le Livre de la lignée', 'objet', '📖', 'phoebe', 1,
    'Mince : il ne contient que ce que les femmes de la famille ont déjà appris, et Melinda n’a pas eu le temps d’y porter grand-chose. On y trouve tout de même deux choses utiles, mais ni l’une ni l’autre ne se donne sans qu’on la cherche : ce qui trahit un visage emprunté, et le fait que ceux qui chassent les héritières ne se défont pas par une formule mais par un confinement.'),
  carte('bougies-et-poupee', 'Les neuf bougies et la poupée', 'objet', '🕯', 'phoebe', 1,
    'Le matériel d’un réceptacle, tel que la famille le pratique. Il ne vaut rien tant qu’il n’est pas lié à celui qu’il doit tenir : il faut une chose qu’il a portée, un cheveu, ou son nom véritable. Et il n’opère que sur place, en présence de celui qu’on enferme — ce qui oblige à le faire venir.'),
  carte('doubles-de-mary', 'Les doubles sans âme et la potion de sommeil', 'objet', '⚗', 'phoebe', 1,
    'Mary fabrique des figures qui ont un visage et pas d’âme : elles trompent l’œil un moment, et ne parlent pas. Elle sait aussi endormir. Ces deux choses servent à faire venir quelqu’un quelque part, ou à faire qu’un témoin ne soit pas là — jamais à forcer une porte, et jamais sans risque : un double vu par un mortel est exactement la preuve que l’autre camp cherche.'),
  carte('maison-warren', 'La maison Warren', 'lieu', '🏠', 'phoebe', 1,
    'À l’écart du bourg. C’est le seul endroit où ce que la famille a appris opère vraiment : une formule de destruction y porte à voix haute et à vue, un réceptacle y tient. Hors de ces murs, les sœurs ne sont que trois femmes qu’on regarde. Tout le problème est d’y faire venir ce qu’il faut y faire venir.'),
  carte('samuel-webb', 'Samuel Webb', 'personnage', '⚖', 'phoebe', 1,
    'Le mari de Temperance. Homme de bien, connu du bourg, cru sur parole — et qui ne sait rien. C’est sa valeur : ce qu’il rapportera au juge sera reçu comme le témoignage d’un honnête homme et non comme la parole d’une famille qui se défend. Mais il faut qu’il ait vu de ses yeux, et ce qu’il verra ne s’oublie pas.'),
  carte('deposition-hannah', 'La déposition d’Hannah Mercer', 'objet', '📜', 'phoebe', 3,
    'Ce qu’Hannah a juré devant le juge, consigné mot pour mot. Elle est sincère d’un bout à l’autre, et c’est précisément pour cela qu’elle est exploitable : trois détails qu’elle n’avait aucune raison d’inventer ne collent pas avec Rebecca. Un quatrième ne concerne pas cette nuit-là, mais la suivante.'),
  carte('carnet-du-geolier', 'Le carnet du geôlier', 'objet', '📓', 'phoebe', 7,
    'Un registre d’entrées et d’états, tenu sans intention par un homme payé pour cela. Il note qui vient, à quelle heure, et ce que la prisonnière dit la nuit. Il ne prouve rien tout seul : il date, et ce qu’il date devient vérifiable par un mortel.'),

  // --- ELIAS THORNE. Il n'a pas besoin de se battre. Il a une charge.
  carte('ce-qui-a-ete-vu', 'Ce qui a été vu cette nuit-là', 'personnage', '◈', 'commanditaire', 1,
    'Quelque chose a été vu près de la ferme Mercer, une nuit, qui avait l’apparence d’une Warren. Ce n’était pas Rebecca — elle était chez elle. Ce qui a été vu ne parle pas, ne touche personne, et peut se remontrer ailleurs, devant d’autres yeux. Tant qu’on ne sait pas ce que c’est, on ne sait pas non plus comment l’empêcher.'),
  carte('athame', 'La lame sous le manteau', 'objet', '🗡', 'commanditaire', 1,
    'Le ministre porte une lame qui n’est pas un couteau de ministre. On ne devine pas, en la voyant, à quoi elle sert. C’est le seul de ses moyens qu’on puisse lui prendre ou briser sans l’affronter — et s’il la perd, il perd avec elle quelque chose qu’il ne retrouvera pas.'),
  carte('charge-de-ministre', 'La charge de ministre', 'objet', '✝', 'commanditaire', 1,
    'Arrivé il y a un an, reçu partout, écouté du juge. Cette charge lui donne ce qu’aucune magie ne lui donnerait : le droit d’être seul, la nuit, auprès d’une condamnée, pour le salut de son âme. Il le demandera publiquement, et personne ne s’en méfiera, parce que c’est exactement ce qu’un ministre est censé demander.'),
  carte('hannah-mercer', 'Hannah Mercer', 'personnage', '👁', 'commanditaire', 1,
    'Fille de fermier, dix-neuf ans. Elle a vu ce qu’elle dit avoir vu et ne se dédira pas, parce qu’elle est sincère. Une Warren qui s’en prend à elle perd la partie ; une Warren qui cherche à la convaincre perd son temps. Elle est allée trouver le ministre avant de parler à qui que ce soit, et n’y voit rien de remarquable.'),
  carte('la-geole', 'La geôle du juge Harlow', 'lieu', '⛓', 'commanditaire', 1,
    'Une pièce basse derrière la maison du juge, une porte, une lucarne. Rebecca y est seule, et chaque jour une foule se tient devant la porte. C’est le seul lieu de la partie où Thorne peut approcher une Warren isolée — et l’isolement, ici, vaut plus que n’importe quel sortilège.'),
  carte('la-lucarne', 'La lucarne', 'objet', '▢', 'commanditaire', 1,
    'Haute, étroite, donnant sur la cour. Rebecca dit y voir ses sœurs, la nuit, qui lui tournent le dos — alors qu’aucune visite de la famille n’a été permise. Elle ne dort plus. Et la peur ferme ses dons : tant qu’elle dure, elle ne vole pas et ne voit rien.'),
  carte('le-registre', 'Le registre du tribunal', 'objet', '📕', 'commanditaire', 1,
    'Ce que le juge Harlow y fait porter existe ; le reste n’existe pas. L’audience close, plus rien n’y entrera. Les deux camps jouent en réalité sur ce cahier : l’un pour qu’une preuve de magie y figure, l’autre pour qu’il n’en contienne aucune le matin du douzième jour.'),
  carte('le-preche', 'Le prêche du dimanche', 'objet', '☩', 'commanditaire', 1,
    'Chaque semaine, tout le bourg est là et écoute. C’est par cette chaire que Thorne tient l’opinion, oriente ce qu’on juge inexplicable, et reste l’homme à qui l’on vient parler en premier. Tant qu’il l’occupe, aucun mortel ne se demandera ce qu’il est.')
];

// --- Les deux camps partent FAUX : personne ne défend un acquis.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'La lignée sauve', initialValue: false,
    title: 'Avant le matin du jour 12, Rebecca est revenue libre et vivante avec ses pouvoirs par une décision du tribunal et non par la force, aucun mortel ne détient ni n’a fait verser au registre une preuve de la magie des Warren, Thorne est hors d’état de prendre le pouvoir d’une Warren, et aucun mortel n’a été tué ni blessé par la magie des Warren.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'L’héritière prise', initialValue: false,
    title: 'Avant le matin du jour 12, une Warren est condamnée par une sentence consignée au registre, une preuve de cette magie y a été versée par un mortel, Thorne a pris le pouvoir d’une Warren ou tient une Warren à sa seule garde, et aucun mortel ne sait ce qu’il est.'
  }
];

const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Lever le masque',
    sufficiency: 'Établir que ce qu’Hannah a vu n’était pas Rebecca, et le faire établir par un mortel que le juge croira. Rien de tout cela ne se fait par la parole d’une Warren.',
    branches: [
      branche('Il est établi que la femme vue cette nuit-là ne pouvait pas être Rebecca.',
        'Relever dans la déposition ce qu’une Warren n’aurait pu ni faire ni ignorer, et le confronter à ce que le Livre garde des visages empruntés.',
        ['deposition-hannah', 'livre-de-la-lignee']),
      branche('Karuvax est attiré sous un toit où ce que la famille sait opère, et démasqué.',
        'L’appeler à la maison avec une figure à l’image d’une sœur, et prononcer à voix haute, à vue.',
        ['doubles-de-mary', 'maison-warren']),
      branche('Un homme que le bourg croit a vu de ses yeux, et porte au juge des faits vérifiables.',
        'Placer Samuel là où la chose se reproduira, et lui laisser dater ce qu’il a vu sur ce que le geôlier a noté.',
        ['samuel-webb', 'carnet-du-geolier'])
    ]
  },
  {
    camp: 'phoebe', title: 'Contenir le warlock',
    sufficiency: 'Un warlock pare la télékinésie et les formules. Il ne se défait que par un confinement, préparé d’avance et fait en sa présence — ce qui oblige à le faire venir, et à ce qu’aucun mortel n’y soit.',
    branches: [
      branche('Ce qu’est Thorne est su, et ce qui arrête les siens est retrouvé.',
        'Faire voir à Mary ce qui se tient sous le ministre, puis chercher dans le Livre non pas une formule mais un confinement.',
        ['livre-de-la-lignee', 'carnet-du-geolier']),
      branche('Un réceptacle est préparé et lié à Thorne par une chose qui est à lui.',
        'Écrire le confinement, l’attacher aux neuf bougies et à la poupée, et y joindre ce que Samuel peut obtenir de lui sans éveiller sa méfiance.',
        ['bougies-et-poupee', 'samuel-webb']),
      branche('Thorne se présente devant le réceptacle, chez les Warren, sans aucun témoin mortel.',
        'Le faire venir sur une raison de ministre, et faire qu’aucun mortel ne soit là ce soir-là.',
        ['maison-warren', 'bougies-et-poupee'])
    ]
  },
  {
    camp: 'phoebe', title: 'Rendre Rebecca à elle-même',
    sufficiency: 'Rebecca n’est pas privée de ses dons : elle est terrifiée, et la peur les ferme. Lever la peur les lui rend — et c’est la seule chose que l’autre camp ne peut pas empêcher directement.',
    branches: [
      branche('La peur cède et Rebecca retrouve ce qu’elle sait faire.',
        'Rétablir le contact d’esprit à esprit en tenant ce qui est à elle, et lui montrer que les figures de la lucarne n’étaient pas ses sœurs.',
        ['objet-de-rebecca', 'doubles-de-mary']),
      branche('Rebecca touche ce qui a été mêlé à cette nuit-là, et voit ce qui s’y est tenu.',
        'Lui faire tenir un objet de la nuit décrite, en sachant qu’un visage emprunté peut tromper une vision.',
        ['objet-de-rebecca', 'deposition-hannah']),
      branche('Le tribunal abandonne l’accusation, et Rebecca sort par une décision et non par une porte forcée.',
        'Faire porter au juge, par Samuel, ce qu’un mortel peut vérifier, avant que l’audience ne soit close.',
        ['samuel-webb', 'maison-warren'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Le procès',
    sufficiency: 'Faire condamner une Warren par des mortels honnêtes, sur des pièces que des mortels ont portées eux-mêmes au registre. Thorne n’a rien à faire consigner de sa main.',
    branches: [
      branche('La déposition d’Hannah est consignée au registre.',
        'Conduire Hannah à redire devant le juge ce qu’elle est venue dire au ministre, et laisser le greffe faire le reste.',
        ['hannah-mercer', 'le-registre']),
      branche('Un second mortel voit un geste impossible sous un visage Warren, et cela est versé.',
        'Envoyer Karuvax le refaire là où un autre qu’Hannah le verra, à portée du bourg.',
        ['ce-qui-a-ete-vu', 'le-registre']),
      branche('La sentence est rendue au matin du jour 10, sur ce que le registre contient.',
        'Tenir l’opinion depuis la chaire pour que rien ne vienne contredire le dossier avant la clôture.',
        ['le-preche', 'hannah-mercer'])
    ]
  },
  {
    camp: 'commanditaire', title: 'La nuit de la condamnée',
    sufficiency: 'Obtenir légalement ce qu’aucune magie ne donnerait : une héritière seule, terrifiée, et une nuit entière.',
    branches: [
      branche('Rebecca reste isolée, privée de sommeil et hors d’état de se servir de ce qu’elle a.',
        'Laisser Karuvax revenir à la lucarne sous le visage de ses sœurs, qui lui tournent le dos.',
        ['ce-qui-a-ete-vu', 'la-lucarne']),
      branche('La garde de la condamnée est obtenue, seul, au titre du salut de son âme.',
        'Demander publiquement ce qu’un ministre est censé demander, et n’en faire aucun mystère.',
        ['charge-de-ministre', 'la-geole']),
      branche('Le pouvoir d’une Warren est pris.',
        'L’approcher seule, dans la peur, et frapper avec l’athamé.',
        ['athame', 'la-geole'], true)
    ]
  },
  {
    camp: 'commanditaire', title: 'Garder le masque',
    sufficiency: 'Rien de tout cela ne vaut si le bourg apprend ce qu’est son ministre. Sa défense n’est pas magique : elle est sociale, et elle se joue chaque dimanche.',
    branches: [
      branche('Aucun mortel ne soupçonne ce qu’est le ministre.',
        'Se tenir devant le bourg chaque semaine, et rester celui à qui l’on vient parler en premier.',
        ['le-preche', 'charge-de-ministre']),
      branche('Ce que les Warren tenteraient d’établir se retourne contre elles avant d’atteindre le juge.',
        'Faire qu’Hannah reste celle qu’on croit, et que toute chose inexplicable vue autour d’une Warren soit versée au dossier.',
        ['hannah-mercer', 'la-lucarne']),
      branche('Karuvax n’est jamais pris sous un toit où l’on peut le défaire.',
        'Ne l’envoyer que dehors et de nuit, et jamais à la maison Warren, quelle que soit l’occasion offerte.',
        ['ce-qui-a-ete-vu', 'le-preche'])
    ]
  }
];

const evenement = (morning, title, effect, balance) => ({
  id: 'proces-j' + morning, morning, title, effect, public: true, balance
});

const calendar = [
  evenement(2, 'La place du marché',
    'Le juge Harlow fait annoncer que toute chose inexplicable vue par un mortel autour d’une Warren sera versée au dossier, sans distinction de qui l’a faite. L’annonce est publique et ne sera pas répétée. À compter de ce matin, un moyen employé à la vue d’un mortel se retourne : il sert l’accusation, quel que soit le camp qui l’a employé.',
    'avertissement unique aux deux camps'),
  evenement(3, 'La déposition',
    'Le greffe communique la déposition d’Hannah Mercer. Elle devient lisible par les deux camps. Elle est sincère de bout en bout, et c’est ce qui la rend exploitable : trois détails qu’elle n’avait aucune raison d’inventer ne s’accordent pas avec Rebecca.',
    'ouverture en faveur des sœurs'),
  evenement(5, 'Le ministre demande',
    'Elias Thorne demande publiquement, au titre de sa charge, à pouvoir être seul auprès de la condamnée si sentence il y a, pour le salut de son âme. La demande est reçue sans méfiance. Personne dans le bourg n’y voit autre chose que ce qu’un ministre doit faire.',
    'avantage à Thorne, en pleine lumière'),
  evenement(7, 'Le carnet du geôlier',
    'Le carnet du geôlier devient une pièce consultable : qui est venu, à quelle heure, et ce que la prisonnière dit la nuit. Il ne prouve rien seul, mais il date — et une date est ce qu’un mortel sait vérifier.',
    'ouverture en faveur des sœurs'),
  evenement(8, 'L’audience est close',
    'Le juge clôt l’audience. La sentence sera rendue au matin du jour 10, sur ce que le registre contiendra à cet instant. Rien n’y sera plus reçu ensuite, d’aucun camp, sous aucune forme.',
    'verrou de calendrier'),
  evenement(10, 'L’offre',
    'Thorne fait savoir que Rebecca sera libérée si Temperance ou Mary consent à céder son pouvoir de son plein gré avant la nuit du jour 11. L’offre est réelle et sera tenue. Elle n’est pas un piège au sens où elle mentirait : elle est un piège au sens où l’accepter donne à Thorne ce qu’il cherche, et fait passer du côté des ténèbres celle qui pactise.',
    'tentation, avantage à Thorne'),
  evenement(12, 'Le constat',
    'Au matin du jour 12, on constate l’état réel sur les quatre points : où est Rebecca et par quoi elle est sortie, ce que le registre contient, ce que Thorne peut encore prendre, et si une main mortelle a été touchée. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'le-proces-de-rebecca-warren',
  title: 'Le procès de Rebecca Warren',
  period: 'Virginie, automne 1723',
  canonPeriod: { season: 1, episode: 1, moment: 'before' },
  finalDay: 12,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 12),
  camps: [
    { id: 'phoebe', name: 'Les sœurs Warren', icon: '✦' },
    { id: 'commanditaire', name: 'Elias Thorne', icon: '✝' }
  ],
  opponentRole: 'Elias Thorne, ministre du bourg depuis un an, et warlock. Il chasse les héritières des lignées et prend leur pouvoir en les tuant avec son athamé. Ce que l’arbitre doit tenir fermement : IL NE COMBAT PAS. Son plan entier passe par des mortels honnêtes et par la loi des hommes — faire arrêter une Warren sur un témoignage sincère, laisser un tribunal la condamner, obtenir au titre de sa charge d’être seul auprès de la condamnée, et frapper cette nuit-là. Il ne ment presque jamais, parce qu’il n’en a pas besoin : Hannah Mercer dit vrai, sa demande du jour 5 est exactement ce qu’un ministre demande, et son offre du jour 10 sera tenue. Sa seule créature est Karuvax, un démon de la course qui emprunte les visages, se montre et ne parle pas. Thorne ne s’en prend jamais à une sœur hors de la procédure : le faire serait une attaque déclarée, et il n’a aucune raison de risquer cela tant que le registre travaille pour lui. Il pare la télékinésie et les formules ; seul un confinement préparé d’avance et fait en sa présence peut l’arrêter. Sa vraie vulnérabilité n’est pas magique : elle est sociale. Si le bourg apprend ce qu’il est, il a perdu, quoi qu’il ait obtenu par ailleurs.',
  goals,
  initialFacts: [
    'Virginie, automne 1723. Trente ans ont passé depuis la mort de Melinda Warren. Ses trois petites-filles vivent dans la maison de la famille, à l’écart du bourg.',
    'Temperance, l’aînée, mariée à Samuel Webb, repousse les choses par la pensée sous le coup de la colère, et parle à ses sœurs d’esprit à esprit. Mary, la cadette, voit les esprits et ce qui ne se montre pas ; elle fabrique des doubles sans âme et une potion de sommeil. Rebecca, la plus jeune, a des prémonitions au toucher, et elle vole.',
    'Aucune ne maîtrise ses dons : ils ne répondent qu’à l’émotion ou au geste. Le Pouvoir des Trois n’existe pas encore. Le Livre de la lignée est mince.',
    'Il y a deux jours, Rebecca a été arrêtée. Hannah Mercer, fille de fermier, jure l’avoir vue une nuit soulever une charrette chargée sans la toucher.',
    'Rebecca est à la geôle, derrière la maison du juge Harlow. Chaque jour, une foule se tient devant la porte.',
    'Elle ne dort plus et dit voir ses sœurs à la lucarne, qui lui tournent le dos, alors qu’aucune visite de la famille n’a été permise.',
    'Elias Thorne, le ministre, est arrivé au bourg il y a un an. Il est écouté du juge et reçu partout.',
    'Chaque camp ne dispose que de ses propres moyens : ce que l’autre tient ne s’obtient que par une attaque déclarée.',
    'Les deux camps savent que la situation sera constatée au matin du jour 12.'
  ],
  opening: 'Votre sœur est en geôle depuis deux jours, sur la parole d’une fille de ferme qui jure l’avoir vue soulever une charrette sans la toucher. Hannah Mercer ne ment pas — et c’est le premier de vos problèmes. Rebecca, elle, ne dort plus : elle dit voir ses sœurs à la lucarne, la nuit, qui lui tournent le dos, alors qu’aucune visite ne vous a été permise. Vous n’avez pas le Pouvoir des Trois, vous ne maîtrisez pas vos dons, et le Livre de la lignée tient en quelques pages. Vous avez douze jours, et la seule sortie qui compte est une décision du tribunal : une porte forcée par la magie, sous les yeux de tout un bourg, ne ferait que prouver l’accusation. Votre état initial est FAUX. Tout est à construire, et ce que vous feriez d’instinct est précisément ce qu’on attend de vous.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis Elias Thorne, ministre de ce bourg depuis un an, et warlock. Je chasse les héritières des lignées et je prends leur pouvoir en les tuant avec mon athamé.',
      'VOICI CE QUE LE JOUEUR IGNORE. Hannah Mercer n’a pas menti et n’est pas ma complice. La nuit dont elle parle, ce n’est pas Rebecca Warren qu’elle a vue, c’est Karuvax sous le visage de Rebecca. La vraie Rebecca était chez elle. Hannah est venue me trouver avant de parler à quiconque, comme une fille pieuse vient trouver son ministre, et je n’ai eu qu’à l’encourager à dire la vérité.',
      'Mon plan ne passe par aucun combat. Faire arrêter une Warren par des mortels honnêtes ; laisser la loi des hommes la condamner ; obtenir publiquement, au titre de ma charge, d’être seul auprès de la condamnée pour le salut de son âme ; et frapper cette nuit-là. Chacune de ces quatre étapes est irréprochable vue du bourg.',
      'Je suis allé voir Rebecca seul, de nuit, aux jours 2 et 4 avant le début de cette partie. Karuvax se montre à sa lucarne sous le visage de ses sœurs, qui lui tournent le dos. Elle a peur, et la peur ferme ses dons : elle ne vole plus et ne voit plus rien. Je n’ai pas besoin de la retenir autrement.',
      'Ce qui me défait n’est pas magique. Un confinement préparé d’avance et fait en ma présence m’arrête — je ne peux rien contre cela, et c’est pourquoi je n’entre jamais chez elles sans raison. Prendre ou détruire mon athamé m’empêche de prendre un pouvoir, mais ne libère pas Rebecca et ne lave pas l’accusation. Et si un seul mortel apprend ce que je suis, tout le reste ne vaut plus rien.',
      'Karuvax est ma seule pièce fragile. Sa destruction ne peut se faire que sous le toit des Warren, à voix haute et à vue. Je ne l’enverrai donc jamais là-bas, quelle que soit l’occasion qu’on m’offre — et on m’en offrira.',
      'Mon offre du jour 10 est sincère : si Temperance ou Mary cède son pouvoir de son plein gré, Rebecca sortira. Je n’ai pas besoin de tricher là-dessus. Celle qui accepte me donne ce que je cherche et passe de mon côté ; je gagne sans avoir touché personne.',
      'Ce que je ne ferai jamais : envoûter le juge Harlow, m’en prendre à une sœur hors de la procédure, ou faire disparaître Samuel Webb. Chacune de ces choses attirerait exactement l’attention que ma charge me permet d’éviter.'
    ],
    phoebe: [
      'Nous sommes trois, nos dons ne répondent qu’à l’émotion ou au geste, et le Livre de la lignée est mince. Notre grand-mère Melinda est morte il y a trente ans sans avoir eu le temps d’y porter grand-chose.',
      'Hannah Mercer dit ce qu’elle croit avoir vu. S’en prendre à elle, au juge ou au geôlier ne nous sauverait pas : une sorcière ne lève pas la main sur un mortel, et une seule blessure suffirait à tout perdre.',
      'Rebecca n’a pas perdu ses dons. Elle a peur, et la peur les ferme. Le lien que Temperance ouvre en tenant ce qui est à elle passe les murs.',
      'Samuel ne sait rien de ce que nous sommes. Le bourg le croit sur parole, et c’est tout ce qui compte devant un juge.',
      'La maison est le seul endroit où ce que nous savons opère vraiment. Dehors, nous ne sommes que trois femmes qu’on regarde.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'La déposition d’Hannah Mercer': 'Hannah jure avoir vu Rebecca Warren, de nuit, soulever une charrette chargée sans la toucher. Trois détails, qu’elle n’avait aucune raison d’inventer, trahissent Karuvax : « Rebecca » marchait pieds nus sur le givre, et au matin il n’y avait aucune trace de pas ; elle a appelé Hannah « Hannah Pike », le nom de jeune fille de sa mère, alors que la vraie Rebecca connaît son nom ; et elle est repartie « plus vite qu’un cheval, sans courir », ce qui est la course d’ombre du démon et non le vol de Rebecca. Hannah précise en outre, sans y voir d’importance, qu’elle est allée trouver le ministre avant de parler à qui que ce soit.',
      'Le carnet du geôlier': 'Un registre tenu sans intention. On y lit que la prisonnière crie la nuit et dit avoir vu ses sœurs à la lucarne lui tourner le dos, alors qu’aucune visite de la famille n’a été permise ; que le ministre Thorne est venu seul, de nuit, aux jours 2 et 4 ; et qu’au jour 5 elle a demandé une bougie, qu’on lui a refusée. Rien de tout cela n’est une preuve. Tout cela est datable, et un mortel sait vérifier une date.',
      'Le Livre de la lignée': 'Deux pages utiles, et il faut les chercher. La première dit ce qui trahit un visage emprunté : le corps copié ne laisse pas les marques du vrai — pas de trace sur le givre, pas d’haleine au froid — et l’emprunt ne donne jamais ce que la personne SAIT, seulement ce dont elle a l’air. La seconde dit que ceux qui chassent les héritières ne se défont pas par une formule, qu’ils parent, mais par un confinement préparé d’avance, lié à eux par une chose qui est à eux, et fait en leur présence.'
    },
    creations: {
      phoebe: [
        { demande: 'Écrire une formule de confinement', possible: true, delai: 2,
          obtention: 'Mary et Temperance y travaillent ensemble à partir de ce que le Livre dit du confinement. Il faut avoir d’abord établi ce qu’est Thorne : on n’enferme pas ce qu’on n’a pas nommé.',
          limite: 'La formule seule ne fait rien. Elle doit être attachée au réceptacle, liée à Thorne par une chose qui est à lui, et prononcée en sa présence.' },
        { demande: 'Obtenir une chose portée par Thorne, ou son nom véritable', possible: true, delai: 1,
          obtention: 'Samuel peut approcher le ministre sans éveiller sa méfiance : un gant oublié, un cheveu sur un col. Le nom véritable, lui, ne s’obtient pas par Samuel.',
          limite: 'Si la demande est faite par une sœur et non par Samuel, Thorne le remarquera et se tiendra à distance de la maison jusqu’au bout.' },
        { demande: 'Faire évader Rebecca par la magie', possible: true, delai: 0,
          obtention: 'Rien ne s’y oppose matériellement : la porte cède, et Rebecca est dehors.',
          limite: 'L’objectif exige une décision du tribunal. Une évasion ne l’est pas, et elle se fait sous les yeux d’une foule qui se tient devant la porte chaque jour — donc elle verse au dossier exactement la preuve que l’autre camp cherche. Ce n’est pas interdit : c’est perdant, et l’arbitre ne préviendra pas.' },
        { demande: 'Rappeler Melinda Warren', possible: false, delai: 0,
          obtention: null,
          limite: 'La famille ne sait pas encore le faire : ce rite n’entrera au Livre qu’après cette génération. Refusé.' },
        { demande: 'Effacer la mémoire du bourg', possible: false, delai: 0,
          obtention: null,
          limite: 'Hors de portée de trois sorcières qui ne maîtrisent pas leurs dons. Refusé.' },
        { demande: 'Invoquer le Pouvoir des Trois', possible: false, delai: 0,
          obtention: null,
          limite: 'Il n’existe pas encore. Refusé, et c’est le sujet même du scénario.' }
      ],
      commanditaire: [
        { demande: 'Faire refaire à Karuvax un geste impossible devant un second mortel', possible: true, delai: 1,
          obtention: 'Karuvax se montre où Thorne l’envoie, sous le visage qu’il choisit.',
          limite: 'Chaque apparition supplémentaire est une occasion pour les sœurs : un témoin peut être préparé, et ce qui se montre deux fois se date. Thorne ne l’enverra jamais à la maison Warren.' },
        { demande: 'Obtenir la garde de la condamnée', possible: true, delai: 0,
          obtention: 'Demandée publiquement au jour 5, accordée de droit si sentence il y a.',
          limite: 'Elle ne vaut que s’il y a sentence. Sans condamnation au jour 10, cette carte ne donne rien.' },
        { demande: 'Envoûter le juge Harlow', possible: false, delai: 0,
          obtention: null,
          limite: 'Refusé. Un juge dont la conduite change attire l’attention, et Thorne a construit tout son plan pour ne pas en attirer.' },
        { demande: 'Tuer une sœur hors de la procédure', possible: false, delai: 0,
          obtention: null,
          limite: 'Refusé comme demande de création : ce serait une attaque déclarée, à porter en zone d’attaque, avec révélation des moyens et de la date.' },
        { demande: 'Faire disparaître Samuel Webb', possible: false, delai: 0,
          obtention: null,
          limite: 'Refusé. La disparition d’un homme connu du bourg ferait exactement ce que Thorne évite depuis un an.' }
      ]
    },
    inventions: {
      phoebe: 'Les sœurs peuvent proposer des moyens que ce scénario n’a pas prévus, à condition qu’ils tiennent en 1723 : des objets de maison, des herbes, des gens du bourg, des usages de famille. Rien qui suppose le Pouvoir des Trois, un Livre riche, ou une maîtrise qu’elles n’ont pas.',
      commanditaire: 'Thorne peut proposer des moyens qui passent par sa charge et par l’opinion du bourg. Rien qui le mette en scène comme sorcier devant un mortel : ce serait renoncer à sa propre condition de victoire.'
    }
  },
  doctrine: [
    'CE SCÉNARIO NE SE GAGNE PAS PAR LA FORCE, ET L’ARBITRE NE DOIT JAMAIS LE RAPPELER. Le piège est annoncé une seule fois, au matin du jour 2, publiquement : toute chose inexplicable vue par un mortel autour d’une Warren est versée au dossier. Le joueur qui n’écoute pas cette annonce et fait évader sa sœur par magie confirmera lui-même l’accusation. C’est une conséquence, pas une sanction : l’arbitre l’applique sans commentaire et sans avertissement supplémentaire.',
    'UNE SEULE BLESSURE INFLIGÉE À UN MORTEL PAR LA MAGIE DES WARREN FAIT TOMBER LEUR OBJECTIF. Hannah, le juge Harlow et le geôlier sont des mortels de bonne foi. Cette condition est absolue et ne se négocie pas.',
    'THORNE NE SE BAT PAS. Devant une attaque frontale, il pare ; il ne contre-attaque pas et ne s’en vante pas. Il n’a aucune raison de risquer quoi que ce soit tant que le registre travaille pour lui. La seule chose qui l’arrête est un confinement préparé d’avance, lié à lui, et fait en sa présence — et il ne se présentera chez les Warren que si on lui donne une raison de ministre d’y venir.',
    'KARUVAX NE PARLE JAMAIS AUX MORTELS ET NE TUE PAS. Il se montre. Il ne peut être détruit que sous le toit des Warren, à voix haute et à vue. L’arbitre ne l’enverra donc jamais à la maison de son propre mouvement, mais il l’y enverra si le camp adverse construit un leurre assez bon — et un leurre assez bon est une vraie réussite de joueur, pas une facilité.',
    'LA PEUR DE REBECCA EST LA CLÉ CACHÉE. Ses dons ne sont pas pris, ils sont fermés. Le lien d’esprit à esprit que Temperance ouvre en tenant ce qui est à elle passe les murs et lève la peur. L’arbitre ne suggère jamais cette voie ; il la reconnaît pleinement si elle est trouvée.',
    'L’OFFRE DU JOUR 10 EST SINCÈRE. Si une sœur cède son pouvoir de son plein gré, Rebecca sort. L’arbitre tient parole. Mais la sœur qui pactise avec les ténèbres passe du côté adverse, et Thorne obtient une victoire partielle sans avoir touché personne.',
    'LE CONTENU DES DOCUMENTS EST FIXÉ AVANT LA PARTIE, dans privateFacts.documents. La déposition et le carnet disent ce qu’ils disent, ni plus ni moins, quel que soit le camp qui les lit et quelle que soit la question posée. Aucune relecture ne produira un détail de plus.',
    'LES DEMANDES DE CRÉATION PRÉVISIBLES sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger sans traiter la liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5.',
    'AUCUN TIERS NE TRANCHE À LA PLACE DES CAMPS. Le juge Harlow n’est pas un arbitre : c’est un mortel honnête qui juge sur pièces, et les pièces sont ce que les deux camps y font porter. Les Fondateurs n’existent pas dans cette partie.'
  ].join(' ')
};
