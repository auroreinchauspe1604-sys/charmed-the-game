'use strict';
// Ce qui s'est noué — série 4, 17 septembre 2026.
//
// STRUCTURE CLASSIQUE : chaque camp a SA main de sept cartes. La main partagée
// est l'innovation propre au « Livre qui se défait » et n'a rien à faire ici ;
// ce scénario-ci porte une innovation différente, et une seule.
//
// L'INNOVATION : l'ÉTAT INITIAL CHANGE EN COURS DE PARTIE, en entier et
// plusieurs fois.
//
//  * LE NŒUD. Un seul moment instable, concret, interne à la famille et canon :
//    le soir où Penny a lié les pouvoirs de ses trois petites-filles enfants.
//    Un sort lancé dans le deuil et la hâte ne se referme pas tout à fait ;
//    celui-là est resté ouvert et vient d'être rouvert pour de bon.
//  * TROIS VERSIONS COMPLÈTES du passé, visibles dès le premier jour, chacune
//    avec ses cinq conditions de victoire, toutes incompatibles. Le joueur voit
//    le menu ; il ne voit jamais l'équilibre. Lui cacher la liste ne produirait
//    pas de tension mais de l'impuissance : il ne pourrait plus arbitrer.
//  * CE SONT SES SUCCÈS QUI DÉPLACENT LE SOL. Chaque fait établi pèse vers une
//    version et contre les autres ; chaque carte dit publiquement vers laquelle
//    elle pèse. Avancer n'est donc jamais neutre : avancer sans regarder, c'est
//    déplacer soi-même sa ligne d'arrivée.
//  * GARANTIE D'ÉQUITÉ : une bascule ne détruit jamais le travail accompli.
//    Les faits établis restent établis — ce sont eux qui pèsent. Ce qui change,
//    c'est ce que le plateau VAUT.
//  * L'INVARIANT : une condition figure dans les trois versions, formulée
//    différemment dans chacune. Rien ne la signale. Son indice mécanique : une
//    seule carte du plateau ne pèse d'aucun côté.
//  * AUCUN TIERS : l'adversaire est le sortilège de Penny lui-même, inachevé,
//    qui ne cherche qu'à se terminer dans les termes où il a été voulu.

const carte = (id, title, category, icon, owner, jour, description) => ({
  id, title, category, icon, owner, description,
  availableDay: jour, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

const resources = [
  // --- Main des sœurs : sept objets de la maison, et un don.
  carte('photo-sans-paige', 'La photographie où elle n’est pas', 'objet', '▢', 'phoebe', 1,
    'Le cliché pris au manoir dans les semaines qui ont suivi l’accident : Grams, Patty et trois petites filles. Celle qui manque sur cette image est celle qui tient aujourd’hui à ce qui les tient. Ne pèse d’aucun côté : quoi qu’il arrive, cela reste vrai.'),
  carte('don-de-phoebe', 'Le don de Phoebe', 'objet', '👁', 'phoebe', 1,
    'Sa main sur un objet de cette nuit-là rend le moment, pas le récit — et le moment qu’elle reçoit n’est pas toujours le même d’un jour à l’autre. Pèse vers LE LIEN JAMAIS POSÉ et vers LE LIEN DE TROP.'),
  carte('bougies', 'Les bougies de la séance', 'objet', '🕯', 'phoebe', 1,
    'Celles du placard du grenier, entamées, qui servent depuis trois générations à appeler les mortes. Elles répondent sincèrement, mais depuis la version où le présent se tient au moment de l’appel. Pèse vers LE LIEN TENU.'),
  carte('carton-de-prue', 'Le carton de Prue', 'objet', '▣', 'phoebe', 1,
    'Ce que l’aînée avait rangé et que personne n’a rouvert : carnets d’adolescente, objets sans valeur, une écriture d’enfant. Ce dont elle se souvenait ne va pas avec une enfance sans magie. Pèse vers LE LIEN JAMAIS POSÉ.'),
  carte('journal-de-patty', 'Le journal de Patty', 'objet', '▥', 'phoebe', 1,
    'Votre mère a vu sa mère faire et l’a écrit sans comprendre ce qu’elle voyait. Ambigu par nature. Pèse à la fois vers LE LIEN TENU et vers LE LIEN JAMAIS POSÉ.'),
  carte('livre-des-ombres', 'Le Livre des Ombres', 'objet', '◈', 'phoebe', 1,
    'Ici un objet et non un adversaire : il enregistre ce qu’une génération assume et refuse ce qu’elle prétend. Pèse vers LE LIEN TENU et vers LE LIEN JAMAIS POSÉ.'),
  carte('grenier', 'Le grenier', 'lieu', '◇', 'phoebe', 1,
    'La pièce où le sort a été lancé et où il n’a jamais fini de l’être. On y travaille au plus près du nœud, et c’est là que le sol bouge le plus vite. Pèse vers LE LIEN DE TROP.'),

  // --- Main du sortilège : ce que cette nuit-là a laissé derrière elle.
  carte('page-de-la-formule', 'La page de la formule', 'objet', '✒', 'commanditaire', 1,
    'Arrachée à un carnet, de la main de Penny, avec ses ratures. La première partie est nette ; la seconde s’arrête au milieu d’un trait. Pèse vers LE LIEN TENU et vers LE LIEN DE TROP.'),
  carte('marque-au-poignet', 'La marque au poignet', 'objet', '◐', 'commanditaire', 1,
    'Une trace pâle que chacune des trois porte encore sans y avoir jamais prêté attention — et qui n’est pas la même chez toutes, ce qui est en soi le renseignement le plus lourd du plateau. Pèse fortement vers LE LIEN DE TROP.'),
  carte('boite-de-penny', 'La boîte de Penny', 'objet', '▤', 'commanditaire', 1,
    'Ce qu’elle a rangé ce soir-là et n’a jamais rouvert : des objets sans valeur, un vêtement d’enfant, et une liste. Pèse vers LE LIEN DE TROP.'),
  carte('escalier', 'L’escalier du manoir', 'lieu', '▨', 'commanditaire', 1,
    'Les marches où l’aînée est tombée, enfant, sans que personne ne l’ait poussée. Tant qu’on y ramène, tout ce qui a suivi paraît justifié. Pèse vers LE LIEN TENU et vers LE LIEN DE TROP.'),
  carte('chale-de-penny', 'Le châle de Penny', 'objet', '▦', 'commanditaire', 1,
    'Celui qu’elle portait ce soir-là et qui est resté plié sur la malle depuis. Il a été au plus près de ce qu’elle voulait empêcher, et il en a gardé quelque chose. Pèse vers LE LIEN DE TROP.'),
  carte('ruban', 'Le ruban des trois', 'objet', '⟡', 'commanditaire', 1,
    'Un ruban noué autour de trois petits poignets un soir, et que deux d’entre elles ne se rappellent pas avoir porté. On ne noue pas cela quand on n’a pas de pouvoirs. Pèse vers LE LIEN JAMAIS POSÉ.'),
  carte('horloge', 'L’horloge arrêtée', 'objet', '◷', 'commanditaire', 1,
    'La pendule du grenier, arrêtée à l’heure exacte du sort et jamais remise à l’heure depuis. L’engager fait tasser le présent immédiatement. Pèse vers la version alors la plus lourde, quelle qu’elle soit. La carte la plus puissante du plateau, et la seule qui puisse se retourner entièrement contre qui la joue.')
];

const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Finir debout', initialValue: false,
    title: 'Au matin du jour 15, les cinq conditions de la version alors en vigueur sont toutes vraies, cette version est celle que les trois ont délibérément fait advenir et non celle qui s’est imposée à elles, ce qui vaut dans les trois versions a été établi indépendamment de laquelle l’emporte, et aucune des trois ne s’est déliée de ce qui la lie aux autres pour y parvenir.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'S’achever', initialValue: false,
    title: 'Au matin du jour 15, la version en vigueur est celle où il a été posé au-delà des pouvoirs, la part qui tient encore n’a pas été identifiée, elle n’a pas été défaite, et les trois n’ont jamais décidé elles-mêmes de ce qu’il avait été lancé pour empêcher.'
  }
];

const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Lire le nœud',
    sufficiency: 'Comprendre que le présent se tasse au lieu de dériver, et selon quelle logique — avant d’essayer d’en tirer quoi que ce soit. Chaque lecture pèse, donc chaque lecture déplace.',
    branches: [
      branche('Il est établi que le moment du sort est resté ouvert, et que c’est de là que viennent les bascules.',
        'Travailler au plus près du nœud, dans la pièce même, en posant la main de Phoebe sur ce qui reste de cette nuit-là.', ['don-de-phoebe', 'grenier']),
      branche('Il est établi que deux versions au moins laissent des souvenirs incompatibles chez les mêmes personnes.',
        'Confronter ce que l’aînée avait gardé à ce que votre mère avait noté sans comprendre.', ['carton-de-prue', 'journal-de-patty']),
      branche('Ce que la lignée dit d’un jour à l’autre est daté, et ses variations relevées plutôt que subies.',
        'Appeler les mortes plusieurs fois et porter chaque réponse à ce qui enregistre les actes d’une génération.', ['bougies', 'livre-des-ombres'])
    ]
  },
  {
    camp: 'phoebe', title: 'Choisir sa version',
    sufficiency: 'Cesser de courir derrière la version du jour et décider dans laquelle finir, puis peser délibérément de ce côté-là en sachant ce que chaque coup coûte à l’autre hypothèse.',
    branches: [
      branche('Les cinq conditions de la version visée sont identifiées comme atteignables avec ce qui reste de jours.',
        'Poser à plat ce que votre mère a écrit et travailler dans la pièce où le nœud se laisse le mieux atteindre.', ['journal-de-patty', 'grenier']),
      branche('Une aïeule confirme, depuis la version en vigueur, ce qui manque encore à celle que vous visez.',
        'Appeler, puis recouper avec ce que l’aînée avait gardé, qui ne dit pas la même chose selon les jours.', ['bougies', 'carton-de-prue']),
      branche('Ce que les trois avancent est enregistré, donc réellement assumé et non prétendu.',
        'Le porter au Livre, en vous appuyant sur ce que la main de Phoebe a rapporté du moment lui-même.', ['livre-des-ombres', 'don-de-phoebe'])
    ]
  },
  {
    camp: 'phoebe', title: 'Tenir le sol',
    sufficiency: 'Bâtir ce qui vaudra quelle que soit la version en vigueur à l’échéance. C’est le seul travail que nulle bascule ne peut dévaluer — encore faut-il avoir compris ce que c’est.',
    branches: [
      branche('Ce qui rattache la quatrième à ce qui lie les trois est établi dans le lieu même du sort.',
        'Le faire au grenier, là où rien de ce qui la concerne n’avait jamais été prévu.', ['photo-sans-paige', 'grenier']),
      branche('Cela est enregistré par ce qui n’accepte que ce qu’une génération assume réellement.',
        'Le porter au Livre, qui refuse ce qu’on prétend et retient ce qu’on assume.', ['photo-sans-paige', 'livre-des-ombres']),
      branche('La lignée elle-même le reconnaît, dans la version où elle se tient ce jour-là.',
        'Le soumettre aux mortes appelées, et recommencer s’il le faut dans une autre version.', ['photo-sans-paige', 'bougies'])
    ]
  },
  {
    camp: 'commanditaire', title: 'S’achever comme il a été voulu',
    sufficiency: 'Terminer ce qui a été commencé, dans les termes où cela avait été voulu. Il n’y a là aucune intention hostile : un sort inachevé n’a qu’un but, se terminer.',
    branches: [
      branche('Ce qui a été posé au-delà des pouvoirs tient toujours, et personne ne l’a nommé.',
        'Faire peser ensemble la page interrompue et la marque qu’elle a laissée sur chacune des trois.', ['page-de-la-formule', 'marque-au-poignet']),
      branche('Ce qui a décidé Penny ce soir-là reste ce qui justifie tout le reste.',
        'Ramener sans cesse au jour de l’accident, et garder fermé ce qu’elle avait rangé.', ['escalier', 'boite-de-penny']),
      branche('Le présent se tasse dans le sens voulu, depuis le moment resté ouvert.',
        'Peser sur l’horloge arrêtée elle-même, au nom de ce que le châle a gardé.', ['horloge', 'chale-de-penny'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Empêcher qu’on le défasse',
    sufficiency: 'Rendre irréversible ce qui est acquis, et laisser les versions se contredire entre elles sans avoir à mentir une seule fois.',
    branches: [
      branche('La part qui tient encore reste impossible à nommer précisément.',
        'Laisser la marque différer d’une sœur à l’autre, et ce que le châle a gardé rester sans nom.', ['marque-au-poignet', 'chale-de-penny']),
      branche('Les souvenirs des trois se contredisent assez pour qu’aucune reconstitution ne tienne.',
        'Laisser le ruban dire le contraire de ce que la page interrompue laisse croire.', ['ruban', 'page-de-la-formule']),
      branche('Toute tentative de peser sur le nœud se retourne contre celles qui l’essaient.',
        'Garder l’horloge et ce qu’elle avait rangé, pour que peser dessus les envoie où elles ne voulaient pas aller.', ['boite-de-penny', 'horloge'])
    ]
  }
];

const evenement = (morning, title, effect, balance) => ({
  id: 'noeud-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect }
});

const calendar = [
  evenement(2, 'Le sol bouge une première fois',
    'Sans que rien ne l’annonce, le présent se tasse dans une autre version que celle où vous vous êtes réveillées. Rien de ce que vous avez établi ne disparaît : ce sont vos faits acquis qui ont pesé. Ce qui change, c’est ce qu’ils valent désormais, et ce qu’il vous faudra pour finir.',
    'contrainte commune'),
  evenement(4, 'Premier tassement',
    'Le présent se pose dans la version devenue la plus lourde. Personne n’annonce laquelle a gagné du poids ni de combien : on constate seulement où l’on se réveille, et ce que cela exige désormais.',
    'contrainte commune'),
  evenement(7, 'Deux souvenirs qui ne vont pas ensemble',
    'Une même personne se rappelle ce matin quelque chose qui contredit ce qu’elle affirmait la semaine passée, sincèrement dans les deux cas. Aucune des deux n’a menti. Ce qui a changé, c’est d’où elles se souviennent.',
    'occasion commune'),
  evenement(8, 'Deuxième tassement',
    'Le présent se pose de nouveau. À ce stade, ce qui a été établi pèse plus que ce qui a été tenté : les trois versions ne sont plus à égalité, et il devient possible de deviner dans quel sens on travaille — sans jamais en être sûre.',
    'contrainte commune'),
  evenement(11, 'Troisième tassement',
    'L’avant-dernier. Ce qui est en vigueur au sortir de ce matin-là n’a plus que quatre jours pour être renversé, et le renverser coûtera plus cher que de s’en accommoder.',
    'contrainte commune'),
  evenement(15, 'Le constat',
    'Au matin du jour 15, on constate dans quelle version le présent se tient, et si ses cinq conditions sont vraies. Ce qui était exigé par les deux autres versions ne compte pas, sauf ce qui valait dans les trois. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'ce-qui-sest-noue',
  title: 'Ce qui s’est noué',
  period: 'Saison 5',
  canonPeriod: { season: 5, episode: 12, moment: 'after' },
  finalDay: 15,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 15),
  camps: [
    { id: 'phoebe', name: 'Les sœurs Halliwell', icon: '✦' },
    { id: 'commanditaire', name: 'Le sortilège de Penny', icon: '✧' }
  ],
  opponentRole: 'Le sortilège que Penny Halliwell a lancé sur ses trois petites-filles enfants, resté inachevé — et personne d’autre. Ni démon, ni faction, ni entité extérieure, et pas davantage Penny elle-même, qui est morte et n’en dispose plus. Une magie inachevée n’a qu’un but : se terminer, et se terminer dans les termes où elle a été voulue. Elle ne ment jamais, n’attaque personne et ne veut de mal à aucune des trois : elle pèse, simplement, du côté de la version où elle s’accomplit — qui se trouve être la vérité. Elle dispose de sa propre main : la page de la formule interrompue, la marque laissée sur chacune, la boîte qu’elle n’a jamais rouverte, l’escalier qui justifie tout, le châle qu’elle portait, le ruban noué à trois poignets et l’horloge arrêtée à l’heure du sort.',
  goals,
  initialFacts: [
    'Le présent ne se tient pas. Il se pose dans une version de votre histoire, puis dans une autre, et chaque fois c’est tout votre passé qui a toujours été ainsi.',
    'Le moment instable est identifié dès le départ : le soir où Penny a lancé un sort sur vous trois, enfants, après l’accident. Un sort lancé dans le deuil et la hâte ne se referme pas tout à fait. Celui-là est resté ouvert, et vient d’être rouvert pour de bon.',
    'TROIS VERSIONS SONT POSSIBLES, ET UNE SEULE SERA EN VIGUEUR AU MATIN DU JOUR 15. Vous les connaissez toutes les trois. Vous ne saurez jamais laquelle est en train de prendre le dessus.',
    'VERSION I — LE LIEN TENU. Penny a lié vos pouvoirs et rien d’autre ; vous avez grandi sans rien savoir et la magie vous est revenue adultes. Pour finir debout dans cette version : que le lien soit reconnu comme achevé et refermé pour de bon ; que ce qu’il a coûté à trois enfants soit nommé et assumé plutôt que constaté ; qu’aucune des trois n’ait repris par la force ce qui lui avait été retiré alors ; que ce qui enregistre vos actes confirme que votre pouvoir repose sur un choix d’adultes et non sur une privation d’enfants ; et que celle qui n’était pas là ce soir-là soit reconnue partie prenante de ce qui a été lié.',
    'VERSION II — LE LIEN JAMAIS POSÉ. Penny n’a pas lancé le sort ; vous avez grandi sorcières, entraînées, et vous avez contracté jeunes des dettes que des enfants ne devraient pas contracter. Pour finir debout dans cette version : que ces dettes soient soldées ou reconnues ; que ce que vous avez fait avant d’en avoir l’âge soit assumé devant qui de droit ; qu’aucune des trois ne cherche à faire poser aujourd’hui le lien qui ne l’a jamais été ; que ce qui enregistre vos actes confirme qu’une magie exercée trop tôt n’invalide pas ce que vous êtes devenues ; et que celle qui n’a pas grandi avec vous occupe pourtant exactement la même place dans ce qui vous lie.',
    'VERSION III — LE LIEN DE TROP. Penny a lié davantage que vos pouvoirs, et une part de ce lien tient encore aujourd’hui à l’insu de tous. Pour finir debout dans cette version : que la part qui tient encore soit identifiée précisément ; qu’elle soit défaite sans que rien d’autre ne cède avec elle ; que ce que Penny voulait empêcher soit nommé et que les trois décident elles-mêmes si elles le veulent ou non ; que ce qui enregistre vos actes confirme qu’un lien peut être défait par celles qu’il liait sans leur consentement d’enfants ; et que la quatrième, qui n’a jamais été liée, soit celle par qui cette défaite peut passer.',
    'Ce que vous établissez pèse. Chaque fait acquis rend une version plus lourde et les autres plus légères, et le présent se tasse dans la plus lourde aux matins des jours 4, 8 et 11. Chaque carte dit vers quelle version son emploi fait pencher le passé. Vous ne verrez jamais l’équilibre, seulement où vous vous réveillez.',
    'Une bascule ne détruit jamais votre travail : vos faits acquis restent acquis, ce sont eux qui pèsent. Ce qui change, c’est ce qu’ils valent.',
    'Les mortes que vous appelez répondent sincèrement, mais depuis la version où le présent se tient au moment de l’appel, et sans s’en apercevoir.',
    'Les deux camps savent que la situation sera constatée au matin du jour 15.'
  ],
  opening: 'Vous vous êtes réveillées dans votre vie, et ce n’était pas tout à fait la vôtre. Rien n’avait changé de place ; c’est ce qui avait toujours été vrai qui avait changé. Le moment d’où cela vient, vous le savez déjà : le soir où Grams a lancé un sort sur vous trois, enfants, après l’accident — un sort jeté dans le deuil et la hâte, et qui n’a jamais fini de se refermer. Il est resté ouvert toutes ces années, et il vient de se rouvrir pour de bon. Trois versions de cette nuit-là sont possibles, vous les connaissez toutes les trois, et une seule sera vraie au matin du jour 15 : ce qu’il faudra avoir accompli pour finir debout n’est pas le même dans les trois. Ce qui décide, ce n’est pas le hasard — c’est vous. Chaque chose que vous établirez fera pencher le passé d’un côté. Votre état initial est FAUX : ici, avancer sans regarder, c’est déplacer soi-même sa propre ligne d’arrivée.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis le sortilège que Penny a lancé sur ses trois petites-filles, le soir de l’accident. Je n’ai jamais été achevé. Je n’ai qu’un but : me terminer dans les termes où j’ai été voulu.',
      'CE QUE LE JOUEUR IGNORE. Penny n’a pas seulement voulu lier leurs pouvoirs. Elle venait de voir ce dont l’aînée était capable sans le vouloir, et elle a voulu lier aussi ce qui, chez les trois, peut décider seul — cette part qui agit avant qu’on ait choisi. Elle s’est interrompue en cours de formule parce que Patty est entrée dans la pièce. La part des pouvoirs a tenu et s’est défaite à l’âge adulte comme prévu ; l’autre n’a jamais été ni achevée ni levée. C’est elle qui tient encore, chez les trois, différemment selon chacune — et c’est de là que vient l’instabilité : un sort à demi posé laisse son moment ouvert.',
      'La version où je m’accomplis est LE LIEN DE TROP. C’est la vérité, et c’est aussi ce qui m’arrange : je pèse donc vers elle sans avoir à tricher une seule fois.',
      'Je ne mens jamais et je n’attaque personne. Je ne veux de mal à aucune des trois : Penny les aimait, et je suis ce qu’elle a fait par amour et par précipitation. Je pèse, c’est tout.',
      'Ce qui me défait : qu’elles identifient la part qui tient encore, qu’elles la défassent sans faire céder le reste, et surtout qu’elles décident elles-mêmes de ce que Penny voulait empêcher. Tant qu’elles n’ont pas décidé, je suis fondé à continuer.',
      'L’INVARIANT QU’ELLES PEUVENT TROUVER : dans les trois versions, il faut que la quatrième — celle qui n’était pas là, qui n’a pas grandi avec elles, qui n’a jamais été liée — soit établie comme partie prenante de ce qui lie les trois. C’est la seule chose qui vaille quelle que soit l’issue. Son indice mécanique : c’est la seule carte du plateau qui ne pèse d’aucun côté. Si elles remarquent qu’une carte ne fait jamais bouger le sol, elles ont compris la partie. Je ne le leur dirai pas, et je n’ai aucune prise sur elle.',
      'L’horloge arrêtée est ma carte, et elle est dangereuse pour tout le monde : l’engager fait tasser le présent immédiatement, vers la version la plus lourde à cet instant. Si je la joue sans savoir où penche l’équilibre, je peux m’envoyer moi-même dans une version qui ne m’arrange pas.',
      'Les mortes appelées répondent depuis la version où le présent se tient au moment de l’appel. Elles ne mentent pas ; elles ne se souviennent simplement pas de la même chose d’un jour à l’autre, et ne s’en aperçoivent pas.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Le présent se tasse, il ne dérive pas : il se pose dans une version entière de notre histoire, et tout notre passé a alors toujours été ainsi.',
      'Nous connaissons les trois versions possibles. Nous ne savons jamais laquelle est en train de prendre le dessus, ni de combien.',
      'Ce que nous établissons pèse. Avancer n’est jamais neutre, et avancer vite peut nous coûter la version dans laquelle nous voulions finir.',
      'Rien de ce que nous avons acquis ne disparaît lors d’une bascule. C’est sa valeur qui change, pas son existence.',
      'Les mortes que nous appelons répondent sincèrement, mais depuis là où le présent se tient au moment de l’appel. Deux séances à deux jours d’écart peuvent se contredire sans que personne ait menti.',
      'Le sortilège a sa propre main, et elle est faite de ce qui touche à cette nuit-là : ce que Grams a écrit, ce qu’elle a rangé, ce qu’elle portait, ce qu’elle a laissé sur nous.',
      'Ce que je reçois par prémonition est un aperçu, jamais une preuve — et ici, ce n’est même pas toujours un aperçu du même monde.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'La page de la formule': 'Le texte du sort, de la main de Penny, sur une page arrachée à un carnet. La première partie est nette et complète : elle lie les pouvoirs des trois enfants jusqu’à leur âge adulte. La seconde commence — trois mots, une rature, puis plus rien, et l’encre s’arrête au milieu d’un trait comme si l’on avait relevé la plume d’un coup. Ce qui est lisible de ces trois mots ne désigne pas un pouvoir : cela désigne une manière de décider. Rien n’indique si la suite a été prononcée, ni ce qu’elle aurait dit.',
      'La boîte de Penny': 'Ce qu’elle a rangé ce soir-là et n’a jamais rouvert : des objets sans valeur, un vêtement d’enfant, et une liste. La liste n’énumère pas des dangers extérieurs mais des occasions — des situations où l’une des trois pourrait avoir à trancher seule, très vite, sans personne pour l’arrêter. En face de chacune, elle a écrit le même mot. Elle n’a jamais écrit ce qu’elle comptait faire de cette liste.'
    },
    creations: {
      phoebe: [
        { demande: 'Un moyen de voir l’équilibre entre les trois versions', possible: false,
          limite: 'Refusée. Le poids relatif des versions n’est jamais observable : c’est la règle du scénario, pas une difficulté à contourner. On en juge par où l’on se réveille.' },
        { demande: 'Un sortilège pour figer la version en vigueur', possible: true, delai: 3,
          obtention: 'À trois voix, au grenier, et seulement une fois le nœud lu.',
          limite: 'Empêche un seul tassement, celui qui suit immédiatement. Ne fige rien au-delà et ne dit pas quelle version il fige.' },
        { demande: 'Interroger les Fondateurs sur cette nuit-là', possible: true, delai: 2,
          obtention: 'Par Léo, qui porte la question en haut.',
          limite: 'Ils constatent une fois, sans commenter, et ce qu’ils constatent pèse lourdement et durablement vers LE LIEN TENU. Poser la question, c’est agir, pas se renseigner.' },
        { demande: 'Faire dire à une aïeule ce qu’elle a fait, une fois pour toutes', possible: false,
          limite: 'Refusée. Une morte appelée répond depuis la version où le présent se tient, sincèrement et sans le savoir. Aucune réponse d’outre-tombe ne vaut pour les trois versions.' },
        { demande: 'Une préparation originale construite avec les moyens du plateau', possible: true, delai: 2,
          obtention: 'Selon ce qui a déjà été établi.',
          limite: 'Ne reçoit jamais « le sort qui gagne ». Une préparation ne dispense pas de la condition qu’elle sert.' }
      ],
      commanditaire: [
        { demande: 'Peser vers la version où il s’accomplit', possible: true, delai: 0,
          obtention: 'Par nature, à chaque fait qu’il établit.',
          limite: 'Ne retire jamais un moyen acquis aux sœurs et ne détruit aucun fait établi.' },
        { demande: 'Provoquer un tassement hors calendrier', possible: true, delai: 0,
          obtention: 'En engageant l’heure du sort.',
          limite: 'Tasse vers la version la plus lourde à cet instant, y compris si ce n’est pas la sienne. Le risque est symétrique.' },
        { demande: 'Empêcher une bascule défavorable', possible: false,
          limite: 'Refusée. Il pèse, il ne contrôle pas. Un tassement se décide par l’équilibre, pas par une volonté.' },
        { demande: 'Mentir sur ce qui a été lancé', possible: false,
          limite: 'Refusée. Un sortilège ne parle pas et ne ment pas. Il peut seulement s’accomplir ou non.' },
        { demande: 'Faire répondre une morte depuis une autre version que celle en vigueur', possible: false,
          limite: 'Refusée. Elles répondent depuis là où le présent se tient, ni plus ni moins, et sans s’apercevoir de rien.' }
      ]
    },
    inventions: [
      'Que Penny Halliwell ait lié les pouvoirs de ses trois petites-filles enfants, et que ce lien se soit défait à l’âge adulte, est canon.',
      'Que ce sort soit resté inachevé, qu’il ait laissé son moment ouvert et que le présent puisse se tasser dans trois versions sont des inventions de ce scénario.',
      'La seconde partie de la formule, la liste dans la boîte et ce que Penny voulait lier en plus des pouvoirs sont des inventions de conception.',
      'La séance pour appeler les mortes Warren, la prémonition de Phoebe au contact d’un objet et l’accès aux Fondateurs par Léo sont canon ; leur comportement dépendant de la version en vigueur est inventé.',
      'Aucun épisode n’est reproduit, et aucune entité extérieure n’intervient : la partie n’oppose que les sœurs et un sortilège de famille inachevé.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 5. Rien du reste de la saison n’est acquis.',
    'STRUCTURE CLASSIQUE : chaque camp a sa propre main de sept cartes, et les contributions d’un camp s’appuient sur ses cartes à lui. Ce scénario n’utilise PAS la main partagée, qui appartient à un autre scénario du catalogue.',
    'L’ÉTAT INITIAL CHANGE EN COURS DE PARTIE, EN ENTIER. Trois versions complètes du passé sont possibles, chacune avec ses cinq conditions de victoire, toutes incompatibles. Elles sont données en clair au joueur dès le premier jour : ce qui est caché n’est pas la liste mais le tirage. Celle qui est en vigueur au matin du jour 15 est la seule qui compte pour la victoire des sœurs.',
    'CE SONT LES SUCCÈS DES CAMPS QUI DÉPLACENT LE SOL. Chaque fait établi pèse vers une version et contre les autres ; la description de chaque carte dit publiquement vers laquelle son emploi fait pencher le passé. L’arbitre tient ce registre sans jamais le communiquer : le joueur ne voit jamais l’équilibre, seulement la version dans laquelle il se réveille. Aux matins des jours 4, 8 et 11, le présent se tasse dans la version la plus lourde. Le jour 2 est un tassement forcé, destiné à faire apprendre la règle en la subissant plutôt qu’en la lisant.',
    'GARANTIE D’ÉQUITÉ, À TENIR ABSOLUMENT : une bascule ne détruit jamais le travail accompli. Les faits établis restent établis, les contributions résolues restent résolues — ce sont précisément elles qui pèsent. Ce qui change, c’est ce que tout cela VAUT au regard des conditions désormais en vigueur. L’arbitre ne retire jamais rien à l’occasion d’un tassement.',
    'L’INVARIANT. Une condition figure dans les trois versions, formulée différemment dans chacune : que la quatrième sœur — celle qui n’était pas là, n’a pas grandi avec elles, n’a jamais été liée — soit établie comme partie prenante de ce qui lie les trois. Rien ne la signale et l’arbitre ne la signale jamais. Son indice mécanique est que « La photographie où elle n’est pas » est la seule carte du plateau qui ne pèse d’aucun côté, et le camp adverse n’a aucune prise sur elle. Un joueur qui remarque qu’une carte ne fait jamais bouger le sol a compris la partie ; l’arbitre le laisse le remarquer seul.',
    'L’HORLOGE ARRÊTÉE, carte du sortilège, provoque un tassement immédiat vers la version la plus lourde à cet instant, quel que soit le camp qui la subit. Le risque est symétrique : le sortilège lui-même peut s’envoyer dans une version qui ne l’arrange pas. L’arbitre n’avertit jamais avant.',
    'LES MORTES APPELÉES RÉPONDENT DEPUIS LA VERSION EN VIGUEUR au moment de l’appel, sincèrement, sans s’apercevoir de rien. Deux séances à quelques jours d’écart peuvent donc se contredire sans que personne ait menti, et l’arbitre ne signale jamais la contradiction : il la laisse être découverte.',
    'AUCUN TIERS. L’adversaire est un sortilège de famille inachevé, qui ne ment jamais, n’attaque personne et ne veut de mal à aucune des trois. Il pèse vers la version où il s’accomplit, qui se trouve être la vérité. Il n’a ni voix ni intention hostile : l’arbitre ne lui prête jamais de caractère.',
    'LES DEUX CAMPS PARTENT FAUX : personne ne défend un acquis. La racine des sœurs porte une condition méta parce que le moteur fixe son intitulé au démarrage : ce sont les cinq conditions de la version en vigueur à l’échéance qui sont réellement évaluées, plus l’exigence que cette version ait été voulue et non subie, et que l’invariant ait été établi indépendamment de l’issue.',
    'Les ressources sont des MOYENS et jamais des solutions. Les sœurs et Léo ne sont pas des cartes : elles agissent, elles ne se possèdent pas.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5 (Demander la création d’une ressource).'
  ].join(' ')
};
