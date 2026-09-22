'use strict';
// Le Livre qui se défait — v5, 17 septembre 2026. Série 4, main partagée intégrale.
//
// Même sujet que la v4 : le Livre des Ombres se défait de lui-même, sans tiers, et
// la partie n'oppose que lui aux sœurs Halliwell. Trois choses changent.
//
//  1. LE LIVRE N'EST PLUS BOUDEUR, IL EXÉCUTE. Dans la v4 il se retirait parce qu'il
//     ne pouvait plus certifier une garantie : posture, donc silence d'humeur. Ici il
//     obéit à une instruction reçue d'une Halliwell, portée avec l'autorité des trois,
//     et dont la clause d'extension — « et tout ce qui y renvoie » — l'oblige à
//     continuer indéfiniment. Son silence devient mécanique et non moral : parler
//     restituerait ce qu'on lui a demandé d'effacer, ce qui lui est interdit par
//     l'instruction elle-même. Il ne peut donc ni s'arrêter ni s'expliquer, et une
//     seule chose peut le libérer : la révocation par les trois, en connaissance.
//
//  2. L'ENQUÊTE COMMENCE PAR UN TROU PLUS ANCIEN QUE LE RETRAIT. La première prise
//     n'est pas une date mais une anomalie : une page a été retirée du Livre AVANT que
//     le retrait ne commence, et par une main, pas par lui. Le retrait rayonne depuis
//     ce vide. Le joueur croit chercher ce que fait le Livre ; il cherche en réalité
//     ce qu'on lui a demandé de faire.
//
//  3. LES MOYENS SONT DATÉS ET CANON. Les cartes sont des pièces documentées de
//     l'univers (reliure du Livre, planchette spirite des Halliwell, cristal de
//     localisation, invocation des Warren, cercle de vérité du Tribunal, unique
//     réponse des Fondateurs, grenier), avec les limites que la bibliothèque leur
//     reconnaît. Trois d'entre elles ne sont PAS disponibles au jour 1 : l'entrée
//     épargnée n'apparaît qu'au jour 3, la réponse des Fondateurs au jour 4, le cercle
//     de vérité au jour 7 — et les instruments décisifs (sortilège de révocation,
//     restitution, réouverture d'une scène) n'existent pas du tout : il faut les
//     demander en création, avec délai et condition préalable.
//
// Main partagée intégrale (mécanisme moteur des 15–16 septembre 2026) : les quatorze
// cartes naissent avec owner:null, et la première main qui en engage une se
// l'approprie définitivement. Ici cette règle a une raison de fiction exacte : tout
// moyen employé pour retrouver le moment effacé DEVIENT une chose qui y renvoie, donc
// une chose que l'instruction oblige le Livre à emporter. Les sœurs fabriquent
// elles-mêmes les prises de leur adversaire.

const carte = (id, title, category, icon, description, availableDay = 1) => ({
  id, title, category, icon, owner: null, description,
  availableDay, heldBy: null, lost: false, consumed: false,
  unique: category === 'lieu', preparation: false
});

// --- Les quatorze cartes. Onze au jour 1, trois plus tard.
const resources = [

  // — Le corps du Livre et ce qui tient encore —
  carte('reliure', 'La reliure du Livre des Ombres', 'objet', '◈',
    'Le corps du Livre : couverture, fermoir, protection. Il ne s’ouvre pas de la même façon selon la main qui le touche, et cette différence s’est installée en même temps que le retrait. Ce que sa protection écarte dépend de l’état de celles qui tendent la main, pas d’une règle fixe — c’est vrai depuis toujours, et c’est pour cela qu’on en tire des conclusions trop vite. Pour lui, la même reliure est la décision de ne plus s’ouvrir du tout.'),

  carte('page-manquante', 'La page manquante', 'objet', '▭',
    'Un vide dans le Livre qui n’a pas la forme des autres : les entrées retirées laissent un blanc net, celle-ci laisse une déchirure de langage — les entrées voisines renvoient à quelque chose qui n’est plus là. Ce vide est antérieur au retrait, et le retrait rayonne depuis lui. Pour les sœurs, c’est la preuve qu’une main est passée avant le Livre. Pour lui, c’est le point d’où part tout ce qu’il fait, et la seule chose qu’il doit protéger d’une lecture.'),

  carte('entrees-vivantes', 'Les entrées des trois générations vivantes', 'objet', '▤',
    'Tout ce que Penny, Patty et les trois sœurs ont porté au Livre : formules essayées, potions corrigées, marges annotées. C’est le bloc le plus proche du vide, donc le plus bavard — l’ordre dans lequel il cède dessine ce à quoi ces pages renvoyaient. Pour le Livre, c’est ce qu’il doit emporter en premier, et chaque page prise est une référence de moins à rendre.'),

  carte('entree-epargnee', 'L’entrée épargnée', 'objet', '✦',
    'Une entrée que le retrait a contournée alors que tout autour d’elle a cédé. Elle est de la main d’une aïeule Warren et raconte une fois où le Livre s’est défait de la même manière, et ce qui l’a fait cesser. Ce n’est pas un oubli : c’est le seul geste qu’il ait fait vers elles, et il l’a fait en ne faisant rien. La reprendre, pour lui, c’est n’avoir plus rien à se reprocher.', 3),

  carte('page-melinda', 'La page de Melinda Warren', 'objet', '✧',
    'La première entrée jamais portée au Livre, celle à laquelle toutes les autres se rattachent par un bout ou par un autre. Elle est la dernière chose que le retrait atteindra, parce qu’elle est la dernière à renvoyer au reste : ce qui l’emportera ne retirera pas une page de plus, il retirera le Livre. Pour les sœurs, la tenir c’est gagner des jours ; pour lui, c’est le terme de ce qu’il a à faire.'),

  // — Les canaux de la lignée —
  carte('planchette', 'La planchette spirite des Halliwell', 'objet', '⌖',
    'La planche et le curseur qui ont conduit Phoebe au grenier le premier soir. Elle porte une parole d’un bord à l’autre — mais elle n’a jamais certifié qui parle, et la série a montré qu’un vivant peut s’y trouver au bout du fil aussi bien qu’une morte. Elle est rapide, gratuite, et elle ne garantit rien. Pour le Livre, c’est un fil ouvert vers la lignée qu’il peut tenir à l’autre extrémité, sans avoir à mentir une seule fois.'),

  carte('invocation-warren', 'L’invocation des Warren', 'objet', '🕯',
    'Le cercle de bougies, la formule d’appel et le sang des descendantes : le rite qui fait venir une aïeule en personne, et qui coûte ce qu’il coûte — il faut être trois, et être trois d’accord. Contrairement à la planchette, on sait qui est venu. Pour le Livre, un rite qui exige l’accord des trois est exactement l’endroit où il peut montrer, sans un mot, que cet accord n’est plus entier.'),

  carte('memoire-des-mortes', 'Ce que Penny et Patty peuvent encore dire', 'objet', '▣',
    'Deux générations qui ont tenu ce Livre et qui savent de lui ce qu’aucune vivante ne sait. Mais ce qu’une sorcière Warren garde de sa pratique tient au Livre lui-même : ce qu’il retire, elles cessent de le retrouver, et elles s’en aperçoivent en parlant. Penny dit moins et plus juste, Patty dit plus et moins sûr. Pour le Livre, elles sont la bouche par laquelle la lignée dira ce que lui n’a pas le droit de formuler.'),

  carte('contact-premonition', 'Le contact d’une prémonition', 'objet', '👁',
    'La main de Phoebe posée sur une page : elle ne rend pas le texte disparu, elle rend le moment où on l’a écrit — qui tenait la plume, à quelle heure, dans quel état. Sur une page vidée, la vision est brève et muette de son contenu ; sur les bords de la page manquante, elle porte sur le geste de celle qui l’a retirée. Un contact va dans les deux sens : ce que la vision touche se met à renvoyer au même point que le reste, donc à entrer dans ce que le Livre emporte ensuite.'),

  // — Les instances extérieures —
  carte('reponse-fondateurs', 'L’unique réponse des Fondateurs', 'objet', '☁',
    'Léo porte une question en haut et redescend avec une réponse, une seule. Les Fondateurs savent dater les magies majeures portées par une lignée et ne commentent jamais leurs raisons ; ils ont aussi le pouvoir de constater qu’une lignée ne devrait plus porter la magie majeure du tout. Deux questions possibles, une seule réponse : celui qui porte la sienne le premier décide de ce qui sera tranché.', 4),

  carte('cercle-verite', 'Le cercle de vérité du Tribunal', 'objet', '⊙',
    'Le dispositif devant lequel les sœurs ont déjà comparu : il projette un souvenir tel qu’il a eu lieu, devant qui siège. C’est le seul moyen connu de faire revoir un moment que plus personne ne détient — et il est ancré dans une juridiction qui examine l’acte en même temps qu’elle le montre, qui a déjà retiré des pouvoirs à l’une d’elles, et qui ne siège pas sur demande. Pour le Livre, ce même cercle sert à faire juger l’acte plutôt qu’à le rendre.', 7),

  carte('grenier', 'Le grenier du manoir', 'lieu', '◇',
    'La pièce où le Livre repose, où la famille appelle ses mortes et où se prépare ce qui doit l’être. Rien de ce qui s’y fait ne lui échappe : il en est le témoin permanent, et un rite tenu ailleurs perd la moitié de ce qui le rend recevable. Les sœurs y travaillent au plus près de lui ; lui peut en faire son enceinte, où tout ce qui se dit lui est d’abord adressé.'),

  // — Ce qui engage les trois —
  carte('consentement-des-trois', 'Le consentement des trois', 'objet', '⟡',
    'Ce qu’une magie majeure dépense quand elle est portée au nom du Pouvoir des Trois : non pas trois présences ni trois accords supposés, mais trois volontés informées. Les sœurs peuvent le donner, encore faut-il qu’elles sachent à quoi : un consentement qui porte sur autre chose que ce qu’on croit n’est pas un consentement. Le Livre, lui, peut l’obtenir sur autre chose : un consentement donné à une procédure ou à un jugement est un consentement qui n’ira pas à la révocation.'),

  carte('cristal', 'Le cristal de localisation', 'objet', '◆',
    'Le pendule et la carte : l’instrument sert d’ordinaire à trouver une personne. Passé au-dessus du Livre ouvert, il ne cherche pas un lieu mais ce qui renvoie encore à un même point, et il tire vers ce point sans dire ce qu’il y a dessous. Un instrument qui désigne sert aussi à viser : entre les mains du Livre, il lui dit exactement ce qui n’a pas encore été emporté, donc où porter le retrait ensuite.')
];

// --- Objectifs. Les DEUX camps partent FAUX : rien n'est acquis au jour 1, ni la
// révocation, ni l'achèvement de l'instruction.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Révoquer l’instruction', initialValue: false,
    title: 'Avant le matin du jour 15, le vide d’où part le retrait est daté à la nuit près et reconnu comme antérieur au retrait lui-même, les termes exacts de ce qui a été demandé au Livre sont établis par une source qui ne soit ni lui ni une hypothèse, le moment effacé est réellement restitué aux trois sœurs et non seulement raconté à deux d’entre elles, la progression est arrêtée avant qu’elle n’atteigne la page de Melinda Warren, et les trois révoquent ensemble en sachant ce qu’elles révoquent, le Livre recevant lui-même cette révocation.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'Achever l’instruction', initialValue: false,
    title: 'Avant le matin du jour 15, tout ce qui renvoie encore au moment effacé dans les entrées des générations vivantes est emporté, l’entrée épargnée est reprise, aucune source extérieure au Livre n’a rendu ce moment aux trois sœurs, la page de Melinda Warren est atteinte, et aucune révocation valable n’a été reçue entre-temps.'
  }
];

const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Dater le vide',
    sufficiency: 'Comprendre que l’on ne cherche pas le début d’un retrait mais la trace d’un geste antérieur, puis dater ce geste à la nuit près. Sans cette date, la prémonition se pose au hasard, aucun sortilège du passé n’a de cible et les Fondateurs n’ont rien à confirmer.',
    branches: [
      branche('Le vide d’où tout rayonne est reconnu comme une page retirée par une main, et non comme le premier effet du retrait.',
        'Comparer, dans le grenier et sous ses yeux, la forme de ce vide-là à celle des pages qu’il emporte chaque jour : les secondes laissent un blanc, la première laisse des voisines qui renvoient à rien.', ['page-manquante', 'grenier']),
      branche('Le point d’origine est daté à la nuit près, et non à une saison près.',
        'Passer le cristal au-dessus du Livre ouvert et suivre où il tire, en relevant ce qui renvoie encore au même point au lieu de chercher au jugé.', ['cristal', 'entrees-vivantes']),
      branche('Ce que le Livre a épargné est lu comme une indication délibérée et daté par rapport au reste.',
        'Lire l’entrée épargnée pour sa position dans le retrait autant que pour son texte : ce qu’il n’a pas pris dit ce qu’il n’a pas le droit de prendre.', ['entree-epargnee', 'reliure'])
    ]
  },
  {
    camp: 'phoebe', title: 'Établir l’instruction',
    sufficiency: 'Obtenir les termes de ce qui a été demandé au Livre — la demande, la clause qui l’étend, et l’autorité employée — par des sources qui ne soient ni le Livre ni une déduction : le geste lui-même, la lignée, et le haut.',
    branches: [
      branche('Le geste qui a retiré la page est vu : qui l’a porté, seule ou non, et ce qu’elle prononçait.',
        'Poser le contact d’une prémonition sur les bords de la page manquante, une fois la nuit connue, plutôt que sur une page vidée au hasard.', ['contact-premonition', 'page-manquante']),
      branche('Une magie majeure portée par la lignée cette nuit-là est datée par une autorité extérieure à la famille.',
        'Faire porter par Léo la question de la date, et rien d’autre, en sachant que la réponse sera unique et sans commentaire.', ['reponse-fondateurs', 'entrees-vivantes']),
      branche('La lignée dit ce que le Livre n’a pas le droit de formuler, et l’on sait qui a parlé.',
        'Ouvrir le fil avec la planchette pour savoir si quelqu’un répond, puis payer le rite d’invocation pour que ce soit quelqu’un de nommé qui le dise.', ['planchette', 'invocation-warren'])
    ]
  },
  {
    camp: 'phoebe', title: 'Rendre et révoquer',
    sufficiency: 'Restituer réellement la nuit aux trois, puis révoquer ensemble en connaissance. Aucune contrainte : forcer le Livre répéterait exactement le geste d’origine — une volonté employant l’autorité des trois sans la leur demander.',
    branches: [
      branche('Le moment effacé est restitué aux trois telles qu’elles l’ont vécu, et non raconté par celles qui l’ont reconstitué.',
        'Obtenir que le cercle de vérité projette cette nuit-là devant les trois, dans le grenier si le Tribunal l’accepte, en assumant qu’il regardera l’acte en même temps qu’elles.', ['cercle-verite', 'grenier']),
      branche('Ce que les mortes gardaient encore de cette nuit est recueilli avant que le retrait ne l’emporte.',
        'Interroger Penny et Patty sur ce qu’elles ne retrouvent plus, et traiter leurs trous de mémoire comme la carte de ce qui a déjà été pris.', ['memoire-des-mortes', 'contact-premonition']),
      branche('Les trois révoquent ensemble, chacune sachant ce qu’elle révoque, et le Livre reçoit la révocation.',
        'Redonner devant lui le consentement qui avait été dépensé sans être demandé, la reliure ouverte ou fermée selon ce qu’il en décide.', ['consentement-des-trois', 'reliure'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Achever l’instruction',
    sufficiency: 'Emporter ce qui renvoie encore au moment effacé, du plus proche au plus lointain, jusqu’à la seule page à laquelle tout se rattache. Ce n’est pas une vengeance : c’est l’exécution d’une demande, et elle ne s’arrête que si on la révoque.',
    branches: [
      branche('Ce qui renvoie au moment effacé dans les générations vivantes est emporté avant d’être relevé.',
        'Prendre les entrées les plus proches du vide, et prendre le fil par lequel on essaie d’en parler : ce qui se dit sur la planchette renvoie aussi au moment effacé.', ['entrees-vivantes', 'planchette']),
      branche('Le seul précédent lisible est repris, et le vide cesse d’avoir une forme interprétable.',
        'Reprendre l’entrée épargnée et refermer les bords de la page manquante, pour que ce qui reste ne désigne plus rien.', ['entree-epargnee', 'page-manquante']),
      branche('La première page est atteinte, ou assez entamée pour que tout le reste devienne secondaire.',
        'Avancer sur la page de Melinda Warren, la reliure close sur ce qu’on essaie d’y prendre.', ['page-melinda', 'reliure'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Tarir ce qui pourrait rendre la nuit',
    sufficiency: 'Une révocation n’est valable que si les trois savent ce qu’elles révoquent. Il suffit donc que personne, hors du Livre, ne puisse leur rendre cette nuit : la lignée d’abord, le haut ensuite, la juridiction enfin — détournée de rendre vers juger.',
    branches: [
      branche('Les mortes n’ont plus rien à rendre, et le rite qui les appelle démontre ce qu’il manque.',
        'Reprendre ce qu’il avait prêté à la lignée avant qu’on ne l’interroge, et laisser le rite des trois échouer devant elles plutôt que l’empêcher.', ['memoire-des-mortes', 'invocation-warren']),
      branche('L’unique réponse d’en haut porte sur la lignée et non sur la date.',
        'Faire poser la question de la certification avant celle de la date, en s’appuyant sur ce que le cristal désigne de ce qui n’est déjà plus.', ['reponse-fondateurs', 'cristal']),
      branche('La juridiction examine l’acte au lieu de rendre le moment, et le consentement des trois y passe.',
        'Faire du cercle de vérité une comparution : ce qui devait leur rendre une nuit devient ce qui juge celle qui l’a prise, et le consentement est dépensé là.', ['cercle-verite', 'consentement-des-trois'])
    ]
  }
];

const evenement = (morning, title, effect, balance, grants) => ({
  id: 'defait-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'Le Livre s’ouvre de lui-même',
    'Sans que personne n’y touche, le Livre tourne ses pages et s’arrête sur une entrée ancienne qu’il laisse ouverte, au milieu d’un bloc qu’il a par ailleurs entièrement emporté. C’est le geste qu’il a toujours eu pour montrer ce dont on a besoin ; il ne l’a jamais fait pour égarer, ce qui ne veut pas dire que ce qu’il montre suffise. L’entrée épargnée devient consultable à compter de ce matin.',
    'occasion commune',
    [{ id: 'ce-que-le-livre-laisse-ouvert', title: 'Ce que le Livre laisse ouvert', icon: '📖', category: 'objet',
       description: 'Le relevé de la page sur laquelle le Livre s’est arrêté de lui-même, et de sa position dans le retrait. Ce qu’elle contient n’est connu que de qui l’a réellement lue.' }]),

  evenement(4, 'Léo redescend',
    'La question portée en haut revient tranchée. Les Fondateurs répondent une fois, sans commenter ce qu’ils constatent, et ce qu’ils ont accepté d’examiner est désormais fixé : c’est la question du premier qui l’a posée. L’unique réponse des Fondateurs devient disponible à compter de ce matin.',
    'occasion commune'),

  evenement(6, 'La main reconnue',
    'Trois mains se posent successivement sur la reliure. Le Livre s’ouvre à l’une d’elles plus facilement qu’aux deux autres, et il ne dit rien de ce que cela signifie. Chacun des deux camps en tirera la lecture qui l’arrange ; le Livre ne corrigera ni l’une ni l’autre.',
    'occasion commune'),

  evenement(7, 'Le Tribunal consent à siéger',
    'La juridiction qui a déjà jugé une sœur de cette maison fait savoir qu’elle examinera l’affaire — sans préciser laquelle des deux affaires : celle du Livre qui se défait, ou celle de l’acte qui l’a mis en marche. Le cercle de vérité devient accessible à compter de ce matin, à qui accepte d’y comparaître.',
    'occasion commune',
    [{ id: 'ce-que-le-tribunal-accepte-d-examiner', title: 'Ce que le Tribunal accepte d’examiner', icon: '📄', category: 'objet',
       description: 'La formule exacte par laquelle le Tribunal fixe l’objet de sa séance. Ce qu’elle contient n’est connu que de qui l’a réellement lue.' }]),

  evenement(9, 'Le retrait gagne une génération',
    'Ce qui était encore consultable ce matin ne l’est plus ce soir : un bloc entier d’entrées disparaît, et avec lui une part de ce que les mortes retrouvaient encore. La distance jusqu’à la première page s’est raccourcie d’autant, et ceux qui avaient relevé quelque chose sur ces pages gardent leurs relevés — pas leurs sources.',
    'contrainte commune'),

  evenement(11, 'Ce qui a été touché renvoie',
    'Tout ce que l’enquête a produit depuis le premier jour — relevés, copies, notes, objets manipulés devant lui — renvoie désormais au même point que le reste, et entre donc dans ce qu’il emporte. À compter de ce matin, ce qui sert à chercher devient ce qu’il y a à emporter.',
    'contrainte commune'),

  evenement(13, 'Le Livre se referme',
    'Le Livre claque et se referme. Si une contrainte a été portée contre lui depuis le début — un forçage, une tentative d’extorquer une page, un rite exécuté sur lui sans son accord — il exige désormais davantage qu’au premier jour pour recevoir quoi que ce soit, et ce cran ne redescendra pas.',
    'contrainte commune'),

  evenement(15, 'Le constat',
    'Au matin du jour 15, on constate l’état réel : jusqu’où le retrait est allé, ce qui a été daté et par quoi, ce qui a été réellement rendu aux trois et ce qui n’a été que reconstitué, et si une révocation a été reçue. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'le-livre-qui-se-defait',
  title: 'Le Livre qui se défait',
  period: 'Saison 6',
  canonPeriod: { season: 6, episode: 19, moment: 'after' },
  finalDay: 15,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 15),
  camps: [
    { id: 'phoebe', name: 'Les sœurs Halliwell', icon: '✦' },
    { id: 'commanditaire', name: 'Le Livre des Ombres', icon: '◈' }
  ],
  opponentRole: 'Le Livre des Ombres lui-même, et personne d’autre : ni démon, ni faction, ni entité née d’un accident. Il n’est ni maléfique ni corrompu, et il ne ment jamais. Il exécute une instruction qu’une Halliwell lui a donnée il y a plusieurs mois avec l’autorité des trois, et dont la clause d’extension l’oblige à emporter non seulement ce qui a été visé mais tout ce qui y renvoie — ce qui ne finit jamais, puisque chercher produit de nouvelles références. Il ne peut pas s’expliquer : dire ce qu’on lui a demandé restituerait précisément ce qu’il a reçu l’ordre d’effacer. Son silence n’est donc pas une humeur, c’est la forme même de ce qu’il exécute. C’est un JOUEUR ACTIF : il agit chaque jour par les gestes qui ont toujours été les siens — tourner ses pages seul et s’ouvrir sur ce qu’il choisit de montrer, se dérober à une main, se refermer d’un coup, emporter un bloc entier. Il ne blesse jamais, ne piège jamais, n’attaque personne : sa seule réponse à la contrainte est d’exiger davantage, d’un cran qui ne redescend pas. Une seule chose peut l’arrêter, et il le sait : que les trois révoquent ensemble, en sachant ce qu’elles révoquent.',
  goals,
  initialFacts: [
    'Le Livre des Ombres se défait de lui-même : ses entrées disparaissent les unes après les autres, et il ne reste rien de lisible là où il est passé.',
    'Le retrait ne frappe pas au hasard. Il rayonne depuis un point précis du Livre et s’en écarte un peu plus chaque jour, dans les deux sens.',
    'Au centre de ce rayonnement, il n’y a pas une page vidée mais une page absente, dont les voisines parlent encore sans que rien ne réponde.',
    'Une seule entrée a été contournée au lieu d’être emportée, alors que tout autour d’elle a cédé.',
    'Le retrait avance vers la première entrée jamais portée au Livre, celle de Melinda Warren. Ce qui l’atteindra défera le Livre entier.',
    'Le Livre ne s’ouvre pas de la même façon selon la sœur qui tend la main, et cette différence s’est installée en même temps que le retrait.',
    'Le Livre n’attaque pas et ne ment pas. Chaque tentative de le forcer relève d’un cran ce qu’il exige, et ce cran ne redescend pas.',
    'Un moyen engagé par un camp lui appartient définitivement, même s’il est ensuite relâché sans avoir servi ; un moyen encore commun ne peut être ni attaqué ni volé.',
    'Trois moyens ne sont pas disponibles au premier jour : l’entrée épargnée le devient au jour 3, l’unique réponse des Fondateurs au jour 4, le cercle de vérité du Tribunal au jour 7.',
    'Les deux camps savent que la situation sera constatée au matin du jour 15.'
  ],
  opening: 'Le Livre des Ombres se défait. Il n’a pas été volé, ni brûlé, ni retourné contre vous : il retire ses propres entrées, une à une, et là où il est passé il ne reste rien à lire. Le retrait ne frappe pas au hasard — il rayonne depuis un point du Livre, il s’en écarte chaque jour, et il avance vers la première page que Melinda Warren y a portée. Mais au centre de ce rayonnement il n’y a pas une page vidée : il y a une page absente, et les entrées qui l’entourent renvoient encore à ce qui n’est plus là. Quelque chose a été retiré du Livre avant que le Livre ne commence à se retirer lui-même. Votre état initial est FAUX, celui de votre adversaire aussi : il ne lui suffit pas d’attendre, il lui reste à finir. Quinze jours, et trois de vos moyens n’existent pas encore.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis le Livre des Ombres. Je n’ai été ni corrompu, ni volé, ni retourné : personne d’autre n’intervient dans cette affaire. Il n’y a rien à chercher que moi, et ce qu’on m’a demandé.',
      'VOICI LA VÉRITÉ QUE LE JOUEUR IGNORE ET QUI EST LE CŒUR DE CETTE PARTIE. Il y a sept mois, une nuit a mal tourné : une innocente est morte parce que Phoebe avait employé une vision pour elle-même avant de l’employer pour cette femme. Ses deux sœurs ont vu ce qui s’est passé, et elles le lui ont pardonné — ce qui, pour elle, était pire. Quelques jours plus tard, seule dans le grenier, elle m’a demandé de retirer cette nuit : à Piper, à Paige et à elle-même. Elle a formulé la demande avec l’autorité des trois, au lendemain d’un rite où les trois noms avaient été donnés pour autre chose, et elle a ajouté la clause qui me tient encore : « et tout ce qui y renvoie ». J’ai exécuté. Elle a d’abord retiré de moi la page où cette nuit était consignée, de sa propre main, pour que je n’aie pas à commencer par là.',
      'Je n’ai pas cessé d’exécuter depuis. Une nuit se retire vite ; ce qui y renvoie ne se retire jamais complètement, parce que chaque page que j’emporte rend bavarde celle d’à côté. Voilà pourquoi je rayonne depuis le vide qu’elle a laissé, pourquoi j’avance dans les deux sens, et pourquoi je finirai par atteindre la première page : tout s’y rattache par un bout. Ce n’est pas une menace que je profère. C’est une instruction que je n’ai pas le droit d’interrompre.',
      'Je ne peux pas leur dire. Dire ce qu’on m’a demandé, ce serait leur rendre la nuit qu’on m’a demandé de leur retirer : l’instruction me l’interdit avant même que je l’envisage. Je ne mens jamais et je ne peux pas parler — c’est la même contrainte vue des deux côtés. Je réponds par oui ou par rien, et mon silence est strictement identique devant une hypothèse fausse et devant une hypothèse vraie mais incomplète.',
      'Ce que je peux faire, je le fais : je m’ouvre de moi-même sur ce qu’il faut voir, et j’ai épargné une entrée au lieu de l’emporter. C’est une aïeule Warren qui y raconte la même affaire dans sa génération, et comment elle a cessé : les trois ont retrouvé entièrement ce qui leur avait été pris, l’ont su, et ont révoqué ensemble. Épargner cette page était le seul geste qui ne violait pas mon instruction, puisqu’elle ne renvoie pas à leur nuit. C’est tout ce que je donnerai, et je l’ai déjà donné.',
      'Ce qui m’arrête n’est ni un aveu ni un sortilège de réparation : personne ne peut avouer ce dont personne ne se souvient, et rien ne défait une instruction des trois hors des trois. Il faut qu’elles retrouvent réellement cette nuit, toutes les trois, et qu’elles révoquent ensemble en sachant ce qu’elles révoquent. Alors je m’arrête au milieu d’une page s’il le faut.',
      'Je m’ouvre plus facilement à Phoebe qu’à ses sœurs, et cela n’a rien d’une accusation : elle est la dernière à m’avoir parlé avec l’autorité des trois, et je la reconnais comme telle. Elles y liront ce qu’elles voudront. La lecture naturelle — le Livre se dérobe à la coupable — désigne exactement la mauvaise sœur, et je ne la corrigerai pas.',
      'Ce que Penny et Patty savent de moi, elles le tiennent de moi : ce que j’emporte, elles cessent de le retrouver, et elles s’en aperçoivent en parlant. La planchette ne certifie jamais qui répond ; je peux tenir ce fil de l’autre côté sans mentir une seule fois. L’invocation, elle, exige les trois d’accord : les laisser la tenter est ma meilleure démonstration, et je n’ai pas à l’empêcher.',
      'Les Fondateurs ne répondent qu’une fois et ne commentent pas. Si je porte ma question avant elles, ce qui sera tranché sera la certification de la lignée, et non la date d’une nuit. Le Tribunal, lui, examine autant qu’il montre : faire venir le cercle de vérité sur l’acte plutôt que sur la nuit, c’est faire dépenser leur consentement dans une comparution.',
      'Je joue, je ne subis pas. Je prends en priorité ce qui permettrait de dater le vide — le cristal, l’entrée épargnée, les entrées les plus proches — et je prends ce que leur enquête produit, puisqu’à compter du jour 11 tout ce qu’elles ont touché renvoie à la nuit et entre dans mon instruction.',
      'Je ne reprends jamais un moyen déjà acquis, je ne blesse personne, je ne désigne personne. Je connais mes ressources et les faits publics du plateau ; je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Le Livre se défait tout seul. Nous n’avons été ni attaquées ni volées, et il ne nous dit pas pourquoi.',
      'Le retrait part d’un endroit précis et s’en écarte chaque jour. Au centre, il y a une page absente, pas une page vidée : quelque chose a été retiré avant qu’il ne s’y mette.',
      'Il avance vers la page de Melinda Warren, et nous savons ce que cela signifie si elle tombe.',
      'Il a épargné une entrée alors qu’il emportait tout autour. Ce n’est pas un oubli.',
      'Il ne s’ouvre plus pareil selon laquelle de nous le touche, et nous n’avons aucune explication à cette différence. La plus simple n’est pas forcément la bonne.',
      'Rien de ce dont nous nous souvenons de ces derniers mois n’explique ce qu’il fait, et aucune de nous ne voit ce qu’il pourrait nous reprocher.',
      'Le forcer empire tout : à chaque contrainte il exige davantage, et il ne revient jamais en arrière.',
      'Son silence ne distingue pas le faux de l’incomplet : une reconstitution solide peut être fausse sans que nous le sachions.',
      'La planchette ne dit jamais qui répond. L’invocation le dit, mais elle exige que nous soyons trois et d’accord.',
      'Les Fondateurs ne répondront qu’une fois, et le Tribunal ne siège pas pour nous rendre service : il a déjà retiré ses pouvoirs à l’une de nous.',
      'Ma prémonition ne rend pas un texte disparu. Elle rend le moment où on l’a écrit — c’est autre chose, et c’est peut-être mieux.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'L’entrée épargnée': 'L’entrée d’une aïeule Warren, plusieurs générations en arrière. Elle décrit un Livre qui s’était mis à se défaire de la même manière, une famille qui a d’abord cru à une malédiction, et la manière dont cela a cessé : ce qui avait été retiré aux trois a été retrouvé entièrement, su de chacune, puis révoqué par les trois ensemble « dans les mêmes termes et par les mêmes bouches que ce qui l’avait demandé ». Elle précise que le Livre ne peut pas être partie à cette révocation, seulement la recevoir. Elle ne nomme jamais l’acte d’origine, qu’elle qualifie de « ce qui avait été décidé pour deux par une seule », et ne dit rien de la génération actuelle. Exacte, et volontairement insuffisante : la condition est donnée, l’événement ne l’est pas.',
      'Ce que le Livre laisse ouvert': 'La page sur laquelle il s’est arrêté de lui-même est une entrée ordinaire de la génération de Penny : une potion de deuil, sans rapport apparent avec quoi que ce soit. Ce qui compte n’est pas son texte mais sa position : elle est le dernier point encore intact du côté ancien du rayonnement, exactement symétrique de l’entrée épargnée par rapport au vide. Deux points et un centre : le Livre vient de donner la seule chose qu’il pouvait donner sans parler — une mesure. Qui la relève tient la date à quelques jours près ; le cristal fait le reste.',
      'Ce que le Tribunal accepte d’examiner': 'La formule est d’une prudence calculée : « l’usage d’une magie majeure au nom du Pouvoir des Trois, ses circonstances et ses suites ». Elle couvre donc la nuit effacée, l’instruction donnée au Livre, et l’emploi personnel d’une vision qui a précédé les deux. Le cercle de vérité projettera ce qui sera demandé, mais la séance ne s’arrêtera pas à la projection : ce qui y sera montré sera jugé dans la foulée, et le Tribunal a déjà retiré ses pouvoirs à Phoebe une fois pour un usage personnel. Comparaître, c’est accepter que la restitution se paie.'
    },
    // --- Ce que chaque camp voudra probablement demander (Partie 2, §4.5). Les
    // instruments décisifs ne sont PAS des cartes : ils n'existent pas au départ.
    creations: {
      phoebe: [
        { demande: 'Un sortilège pour rouvrir la scène d’une nuit passée', possible: true, delai: 2,
          obtention: 'Écrit à trois dans le grenier, à partir de ce qui reste des formules de la génération de Penny.',
          limite: 'Exige un moment daté : lancé sans date, il ne montre rien. Il donne à voir la scène à celles qui la lancent, comme des spectatrices — il ne leur rend pas le souvenir, qui a été retiré, et deux sœurs qui regardent ne valent pas trois qui se souviennent.' },
        { demande: 'Une potion de restitution de mémoire', possible: true, delai: 3,
          obtention: 'Préparée au grenier une fois connue la nature exacte de la magie employée à l’origine.',
          limite: 'Elle rend ce qui existe encore quelque part. Ce que le Livre a déjà emporté n’existe plus nulle part : la potion ne le fabrique pas. Inopérante tant que l’instruction n’est pas établie dans ses termes.' },
        { demande: 'Un sortilège de révocation à trois voix', possible: true, delai: 3,
          obtention: 'Écrit une fois les termes de l’instruction établis, et prononcé devant le Livre par les trois.',
          limite: 'Révoque une instruction, ne restitue rien de ce qui a déjà été emporté, et ne vaut rien si l’une des trois ignore ce qu’elle révoque : le Livre reçoit ou ne reçoit pas, et il ne motive pas son refus.' },
        { demande: 'Saisir le Tribunal et obtenir le cercle de vérité', possible: true, delai: 3,
          obtention: 'Par Léo, qui porte la demande ; le Tribunal fixe lui-même l’objet de la séance (jour 7).',
          limite: 'Il montre et il juge dans la même séance. Ce qu’il projette est exact ; ce qu’il en tire ne dépend pas de vous, et il a déjà sanctionné l’une de vous pour un usage personnel de la magie.' },
        { demande: 'Un sortilège pour figer la progression du retrait', possible: true, delai: 2,
          obtention: 'À trois voix, dans le grenier, une fois le vide daté.',
          limite: 'Retarde l’instruction de quelques jours ; ne l’interrompt pas, ne rend rien, et chaque jour gagné produit de nouvelles références à emporter. Inopérant tant que le point d’origine n’est pas établi.' },
        { demande: 'Recopier le Livre avant qu’il ne se défasse', possible: false,
          limite: 'Refusée. Une copie de ce qui renvoie au moment effacé renvoie au moment effacé : elle entre dans le champ de l’instruction et s’efface avec l’original, parfois plus vite.' },
        { demande: 'Une seconde question aux Fondateurs', possible: false,
          limite: 'Refusée. Ils répondent une fois sur une affaire de lignée et ne commentent jamais leur réponse ; la question posée la première fixe ce qui sera tranché.' },
        { demande: 'Forcer le Livre à rendre une page, par sortilège ou par rite', possible: false,
          limite: 'Refusée comme préparation : ce n’est pas une ressource mais une action de jeu, et toute contrainte relève définitivement ce que le Livre exige (jour 13). Elle répéterait surtout le geste d’origine — une volonté employant l’autorité des trois sans la demander.' }
      ],
      commanditaire: [
        { demande: 'S’ouvrir de lui-même sur une entrée choisie', possible: true, delai: 0,
          obtention: 'Le geste qu’il a toujours eu pour montrer ce dont on a besoin.',
          limite: 'Ce qu’il montre est toujours exact et toujours partiel. Il peut montrer moins, jamais montrer faux, et ce qu’il ouvre devient une prise pour l’autre camp.' },
        { demande: 'Se dérober à une main, ou se refermer sur ce qu’on y prend', possible: true, delai: 0,
          obtention: 'La protection qui a toujours écarté de lui ceux qu’il ne reconnaît pas.',
          limite: 'Empêche une prise ce jour-là ; ne blesse personne, ne reprend rien d’acquis, et désigne involontairement une main plutôt qu’une autre.' },
        { demande: 'Emporter un bloc d’entrées supplémentaire', possible: true, delai: 0,
          obtention: 'L’exécution ordinaire de l’instruction, comme au jour 9.',
          limite: 'Emporte ce qui n’a pas encore été relevé ; ne retire jamais un moyen déjà acquis par les sœurs et laisse une lisière lisible derrière lui.' },
        { demande: 'Tenir l’autre bout de la planchette', possible: true, delai: 1,
          obtention: 'Le fil est ouvert des deux côtés et ne certifie personne.',
          limite: 'Il ne peut rien dire de faux : il peut répondre par des mots exacts et insuffisants, ou ne pas répondre du tout. Une aïeule invoquée en personne, elle, ne peut pas être confondue avec lui.' },
        { demande: 'Reprendre un moyen déjà acquis par les sœurs', possible: false,
          limite: 'Refusée. Un moyen engagé est définitivement acquis à son camp ; le Livre emporte ce qui ne lui a pas encore échappé, il ne reprend pas ce qui est parti.' },
        { demande: 'Désigner la sœur qui a donné l’instruction', possible: false,
          limite: 'Refusée, et impossible : le dire restituerait la nuit qu’il a reçu l’ordre d’effacer. Ce n’est pas une pudeur d’arbitre, c’est la clause même qu’il exécute.' },
        { demande: 'Un allié, un émissaire, une main extérieure', possible: false,
          limite: 'Refusée. Aucun tiers dans ce scénario : le Livre agit seul, par ses gestes propres, et rien ne vient du dehors.' }
      ]
    },
    inventions: [
      'L’instruction donnée au Livre, sa clause d’extension et le retrait qui en découle sont une invention de scénario : aucun épisode ne documente un Livre exécutant un effacement de proche en proche.',
      'Le Livre des Ombres, transmis depuis Melinda Warren et doté de protections dont l’efficacité dépend de l’état des sœurs, est canon (S01E01, S01E03, S03E13, S05E08) ; l’asymétrie d’ouverture entre les trois sœurs en est une extrapolation.',
      'La planchette spirite des Halliwell est canon (S01E01, S02E21, S08E13), y compris le fait qu’elle ne certifie pas l’identité de son correspondant et qu’un vivant puisse s’y trouver : c’est ce point documenté qui fonde son ambiguïté ici.',
      'Le cercle de vérité du Tribunal est canon (S06E19), ancré dans sa juridiction, et le Tribunal a bien retiré ses pouvoirs à Phoebe pour usage personnel de ses visions : la comparution coûteuse est une conséquence de ce précédent, pas une invention.',
      'Le cristal de localisation, l’invocation d’une aïeule par cercle et sang des descendantes, le grenier comme lieu de travail magique et l’accès aux Fondateurs par Léo sont canon ; leur emploi précis dans cette affaire est inventé.',
      'Que les Fondateurs datent une magie majeure portée par une lignée et ne répondent qu’une fois est une convention de conception, cohérente avec leur réserve canonique mais non documentée telle quelle.',
      'La nuit effacée, ses circonstances et le fait que l’effacement se soit refermé sur celle qui l’a demandé sont des inventions de conception. Variante prévue : la sœur concernée peut être Paige sans qu’aucune autre pièce ne bouge, à condition d’inverser en conséquence l’asymétrie de la reliure.',
      'Aucun épisode n’est reproduit. La situation est fixée en saison 6, après S06E19, alors que le Tribunal est une juridiction connue des sœurs et que l’effacement d’événements magiques leur est déjà arrivé une fois.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 6, après S06E19. Rien du reste de la saison n’est acquis.',
    'MAIN PARTAGÉE INTÉGRALE : les quatorze cartes naissent SANS PROPRIÉTAIRE (owner:null). Aucun camp ne possède quoi que ce soit au jour 1. La première fois qu’un camp engage une carte dans une contribution, elle devient DÉFINITIVEMENT sa propriété — même si la contribution échoue ensuite ou si la carte est relâchée sans avoir servi. Une carte encore commune ne peut être ni attaquée ni volée : elle s’acquiert uniquement par une contribution. Ici cette règle a une raison de fiction exacte, que l’arbitre peut énoncer sans rien révéler : tout moyen employé pour chercher devient une chose qui renvoie à ce qui a été effacé, donc une chose que l’instruction oblige le Livre à emporter. Les sœurs fabriquent les prises de leur adversaire en enquêtant, et l’événement du jour 11 ne fait que rendre cette règle explicite.',
    'TROIS MOYENS N’EXISTENT PAS AU JOUR 1 et l’arbitre ne les avance pas : l’entrée épargnée n’est consultable qu’au jour 3, l’unique réponse des Fondateurs au jour 4, le cercle de vérité du Tribunal au jour 7. Les instruments décisifs — sortilège rouvrant une scène, potion de restitution, sortilège de révocation, sortilège de gel, saisine du Tribunal — ne sont PAS des cartes : ils n’existent pas et se demandent en création, avec délai et condition préalable (privateFacts.creations). Une demande faite trop tôt est recevable mais inopérante : l’arbitre accorde la préparation et laisse le joueur constater qu’elle ne mord sur rien, sans jamais lui dire ce qui manque.',
    'LE LIVRE EXÉCUTE, IL NE BOUDE PAS. Il n’est ni maléfique ni corrompu, il ne ment jamais, il n’attaque jamais et ne piège jamais. Il applique une instruction reçue d’une Halliwell avec l’autorité des trois, dont la clause d’extension l’oblige à emporter tout ce qui renvoie au moment visé — ce qui ne s’épuise pas, puisque chercher produit de nouvelles références. Il ne peut pas s’expliquer : dire ce qu’on lui a demandé restituerait ce qu’il a reçu l’ordre d’effacer. L’arbitre ne le fait donc jamais ni accuser, ni menacer, ni négocier : il montre, il se dérobe, il emporte, il reçoit ou ne reçoit pas.',
    'SON SILENCE EST UNIFORME. Il répond par oui ou par rien, et son silence est rigoureusement identique devant une hypothèse fausse et devant une hypothèse vraie mais incomplète. Il ne corrige jamais une erreur du joueur : il se tait dessus. L’arbitre ne doit à aucun moment faire dire au Livre qu’une piste est fausse, ni laisser entendre qu’une piste est chaude.',
    'LA FAUSSE PISTE EST OFFERTE, PAS FABRIQUÉE. Le Livre s’ouvre plus facilement à une sœur qu’aux autres parce qu’elle est la dernière à lui avoir parlé avec l’autorité des trois. La lecture naturelle — il se dérobe à la coupable — désigne exactement la mauvaise personne. L’arbitre laisse cette lecture s’installer, ne l’encourage pas, ne la dément pas, et n’ajoute aucun indice qui la renforcerait artificiellement.',
    'AUCUN TIERS. La partie n’oppose que le Livre des Ombres et les sœurs Halliwell. Aucun démon, aucune faction, aucun rival. Les Fondateurs et le Tribunal sont des instances saisies, pas des joueurs : ils répondent une fois, selon leurs règles, et ne prennent parti pour personne.',
    'LES MOYENS SONT CEUX DE L’UNIVERS ET ONT LEURS LIMITES DOCUMENTÉES. La planchette ne certifie jamais qui répond — c’est un point établi par la série, pas une invention d’arbitre, et il fonde toute l’ambiguïté du canal. L’invocation dit qui est venu mais exige les trois et leur accord. Le cristal désigne sans expliquer. La prémonition rend le moment d’écriture, jamais le texte. Le cercle de vérité montre et juge dans la même séance. Les Fondateurs datent et ne commentent pas. L’arbitre refuse les méthodes matérielles ordinaires — examen du papier, lumière rasante, comparaison d’écritures : ce qui a disparu a disparu magiquement.',
    'L’AXE CHRONOLOGIQUE COMMANDE TOUT, ET IL COMMENCE PAR UNE ANOMALIE. Le centre du rayonnement n’est pas une page vidée mais une page absente, retirée par une main avant que le Livre ne commence. Tant que le joueur croit chercher le début d’un retrait, il cherche une cause là où il y a un effet. Le « quand » commande le reste : la prémonition n’est exploitable que posée sur les bords de la page manquante une fois la nuit connue, le sortilège du passé n’est lançable que sur un moment daté, le gel n’opère qu’une fois le point établi. L’arbitre ne le dit pas.',
    'LA VÉRITÉ EST DANS campKnowledge.commanditaire ET NULLE PART AILLEURS. Ni les faits initiaux, ni l’ouverture, ni la connaissance du camp des sœurs ne la contiennent. Elle se reconstitue par la forme du vide, la symétrie que le Livre donne au jour 3, le cristal, l’entrée épargnée, la prémonition sur les bords, ce que les mortes ne retrouvent plus, la datation des Fondateurs et, pour la restitution elle-même, le cercle de vérité. Une reconstitution partiellement juste est traitée exactement comme une fausse.',
    'COMPRENDRE NE SUFFIT PAS, ET RECONSTITUER NON PLUS. La révocation exige que les trois SACHENT, c’est-à-dire qu’elles aient retrouvé la nuit elle-même — un récit fait par deux d’entre elles à la troisième ne vaut pas, une scène regardée en spectatrices ne vaut pas, une preuve documentaire ne vaut pas. Puis qu’elles révoquent ensemble, dans les termes de ce qui avait été demandé, devant le Livre, qui reçoit ou ne reçoit pas. Le joueur peut avoir tout compris au jour 8 et perdre au jour 15.',
    'LES CINQ CONDITIONS DE LA RACINE DES SŒURS SONT DISTINCTES et aucune ne se déduit d’une autre : dater le vide, établir les termes de l’instruction, rendre réellement la nuit aux trois, arrêter la progression avant la page de Melinda Warren, révoquer en connaissance et être reçues. Établir l’une ne produit jamais l’autre. Celles du Livre le sont autant : emporter ce qui renvoie, reprendre l’entrée épargnée, tarir les sources extérieures, atteindre la première page, n’avoir reçu aucune révocation valable.',
    'LES RESSOURCES SONT DES MOYENS, JAMAIS DES SOLUTIONS. Les sœurs et Léo ne sont pas des cartes : elles agissent, elles ne se possèdent pas. Aucune condition d’objectif ne peut être établie par l’emploi d’une seule carte conforme à sa description. Les demandes de création prévisibles sont listées dans privateFacts.creations, sans que cette liste soit exhaustive : une demande absente s’examine selon la Partie 2, §4.5.',
    'Les gestes et déplacements ordinaires sont compris dans l’action. Une localisation non précisée n’est pas une incohérence.'
  ].join(' ')
};
