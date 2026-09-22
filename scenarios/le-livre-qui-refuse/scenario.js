'use strict';
// Le Livre qui se défait — v6, 17 septembre 2026. Série 4, main partagée intégrale.
//
// Synthèse de trois propositions. Ce qui a été retenu, et pourquoi :
//
//  * LE MÉCANISME (proposition B). Le Livre n'est pas boudeur, il EXÉCUTE une
//    instruction reçue, assortie d'une clause d'extension — « et tout ce qui y
//    renvoie ». Trois conséquences gratuites : il ne peut pas s'arrêter, il ne
//    peut pas s'expliquer (dire ce qu'on lui a demandé RESTITUERAIT ce qu'il a
//    reçu l'ordre d'effacer), et la seule sortie est dans la fiction et non
//    dans la règle. Son silence devient mécanique et non moral : l'arbitre n'a
//    plus à jouer une humeur.
//  * L'ORIGINE À TROIS (proposition A). L'instruction a été donnée par les
//    trois sœurs ensemble, après une dispute autour des affaires de Prue, et
//    les trois ont oublié l'avoir donnée. IL N'Y A PAS UNE COUPABLE ET DEUX À
//    CONVAINCRE DE PARDONNER. Le dénouement est symétrique : elles ne
//    pardonnent pas à l'une d'elles, elles reprennent ensemble ce qu'elles
//    avaient ensemble refusé de porter.
//  * LA FAUSSE PISTE (B, déplacée d'un cran pour survivre à l'origine à trois).
//    Le Livre s'ouvre le plus facilement à celle qui a PRONONCÉ la formule —
//    détail de rite, pas fait moral. La lecture naturelle (« il se dérobe à la
//    coupable ») accuse donc une sœur alors que les trois ont consenti, et il
//    ne corrigera jamais, puisqu'il ne corrige jamais rien.
//  * LA PAGE ARRACHÉE (B). Au centre, pas une page vidée mais une page
//    RETIRÉE PAR UNE MAIN avant que le Livre ne s'y mette, dont les voisines
//    parlent encore. La première question devient « qui a fait ça » et non
//    « quand », ce qui n'impose plus au joueur de dater avant de chercher.
//  * L'ENTRÉE ÉPARGNÉE STRUCTURELLEMENT INRETIRABLE (v5). Il ne la laisse pas
//    par bonté : c'est la seule page qui ne renvoie à rien de cette nuit, donc
//    la seule que l'instruction ne l'oblige pas à emporter.
//  * LA MAIN PARTAGÉE INTÉGRALE (v5, conservée contre la proposition A qui la
//    réduisait). Quatorze cartes, aucune à personne au départ — et elle a
//    enfin une raison de fiction : tout moyen employé pour chercher DEVIENT
//    une chose qui renvoie au point effacé, donc une chose que l'instruction
//    oblige le Livre à emporter. Les sœurs fabriquent les prises de leur
//    adversaire en enquêtant.
//  * LA DISCIPLINE D'ARBITRAGE (A). Ce que l'adversaire ne peut pas faire est
//    écrit ; le contenu des documents est fixé avant la partie ; les demandes
//    sont gratuites ; aucune collecte d'accessoires ordinaires.
//  * AUCUN TIERS, strictement. Pas de juridiction extérieure qui tranche à la
//    place du Livre : la proposition B passait par le Tribunal de S06E19, ce
//    qui déplaçait la décision finale hors du duel. Écarté. Le prix reste
//    intérieur à la famille.
//
// Le Livre NE VEUT PAS GAGNER. Il exécute jusqu'au terme, et ce terme rompt ce
// qui le relie à la lignée. Il s'arrêterait s'il le pouvait. C'est la version
// la plus juste du principe « aucun méchant » de la série 4.

const carte = (id, title, category, icon, jour, description) => ({
  id, title, category, icon, owner: null, description,
  availableDay: jour, heldBy: null, lost: false, consumed: false,
  unique: category === 'lieu', preparation: false
});

const resources = [
  // --- Ce qui tient encore, et le vide au milieu.
  carte('page-arrachee', 'La page arrachée', 'objet', '▨', 1,
    'Au milieu d’une section devenue blanche, une page manque — pas effacée : arrachée, par une main, et avant que le Livre ne s’y mette. Ses voisines y renvoient encore, ce qui suffit à savoir qu’elle a existé. Pour les sœurs, c’est l’anomalie par laquelle tout commence. Pour le Livre, c’est le point dont chaque renvoi lui impose d’emporter une chose de plus.'),
  carte('entrees-vivantes', 'Les entrées des trois générations vivantes', 'objet', '▚', 1,
    'Ce que Penny, Patty et les trois sœurs ont porté au Livre : le bloc le plus proche du vide, et celui qui contient le plus de renvois. Pour elles, le savoir encore utilisable et la matière de l’enquête. Pour lui, exactement ce que l’instruction lui commande d’emporter en premier.'),
  carte('entrees-anciennes', 'Les entrées d’avant', 'objet', '▞', 1,
    'Les générations antérieures, entre le vide et l’origine du Livre. Elles cèdent elles aussi, dans l’autre sens, ce que rien n’explique si l’on croit que le Livre recule simplement du présent vers le passé — et c’est ce second front qui trahit qu’il ne recule pas, mais qu’il suit des renvois.'),
  carte('entree-epargnee', 'L’entrée épargnée', 'objet', '✦', 3,
    'Une entrée ancienne restée parfaitement lisible au milieu d’une section blanche. Elle n’est pas épargnée par faveur : c’est la seule page de tout le Livre qui ne renvoie à rien de ce qui a été effacé, donc la seule qu’il ne soit pas obligé d’emporter. Cette impossibilité vaut indication, et c’est tout ce qu’il a le droit de donner. Il peut en revanche refuser qu’on la lise.'),
  carte('page-melinda', 'La page de Melinda Warren', 'objet', '✧', 1,
    'La première entrée jamais portée au Livre, à laquelle toutes les autres se rattachent — et à laquelle, donc, tout finit par renvoyer. L’atteindre est le terme de ce qu’il exécute : il n’y aura plus de Livre, ni rien qui relie la lignée à lui. Il n’y tient pas. Il ne peut pas s’arrêter avant.'),

  // --- Les canaux de la lignée. À personne, donc aux deux.
  carte('planchette', 'La planchette des Halliwell', 'objet', '⌖', 1,
    'Le moyen rapide et gratuit d’obtenir une réponse de l’autre côté — et celui qui ne certifie jamais qui la donne. N’importe qui peut se tenir au bout du fil, y compris ce qui n’est pas une morte. Les sœurs s’en servent pour gagner du temps ; le Livre peut y répondre lui-même sans avoir à mentir une seule fois.'),
  carte('invocation-warren', 'L’invocation des Warren', 'objet', '🕯', 1,
    'Le cercle, la formule, le sang des trois : le rite qui, lui, dit exactement qui vient. Il coûte, et il exige que les trois soient d’accord pour l’ouvrir. C’est précisément cet accord que le Livre a tout intérêt à laisser échouer devant elles : un rite qui ne prend pas établit sa position mieux qu’un discours.'),
  carte('memoire-aieules', 'Ce que Penny et Patty peuvent dire', 'objet', '▣', 1,
    'Leur mémoire de sorcière Warren tient au Livre. Aux sœurs, elles disent sans détour ce qu’elles savent des usages de la famille. Au Livre, elles servent d’autre chose : ce qu’il a emporté, elles ne le retrouvent pas non plus, et il n’a donc même pas à intervenir pour qu’elles se taisent sur l’essentiel.'),
  carte('contact-premonition', 'Le contact d’une prémonition', 'objet', '👁', 1,
    'Posée sur un objet ou une page, la main de Phoebe ne rend pas un texte disparu : elle rend le moment, qui tenait la plume, sous quel accord. Mais un contact va dans les deux sens, et ce que le Livre y prend le renseigne autant qu’elle — sur ce qu’elle sait, donc sur ce qui renvoie encore.'),
  carte('fondateurs', 'L’unique réponse des Fondateurs', 'objet', '☁', 4,
    'Ils constatent ce qui touche à une lignée et ne répondent qu’une seule fois. Deux questions sont possibles, une seule sera tranchée : faire dater une magie majeure portée par les trois, ou faire constater qu’une lignée a elle-même demandé qu’on lui retire quelque chose. Le premier qui porte la sienne en haut choisit laquelle.'),

  // --- Les points d'attache entre le Livre et la lignée.
  carte('reliure', 'La reliure', 'objet', '◈', 1,
    'Son corps. Il s’ouvre à qui il reconnaît et se dérobe aux autres, et aujourd’hui pas de la même façon selon la sœur qui tend la main. Aux sœurs, cette différence donne une épreuve reproductible — dont la lecture la plus naturelle est fausse. À lui, la tenir c’est décider de ne plus s’ouvrir du tout.'),
  carte('grenier', 'Le grenier du manoir', 'lieu', '◇', 1,
    'La pièce où il repose, où la famille appelle ses mortes, et où s’est tenu ce dont personne ne se souvient. Rien de ce qui s’y fait ne lui échappe. Les sœurs y travaillent au plus près ; lui peut en faire son enceinte, où aucun rite ne prend.'),
  carte('affaires-de-prue', 'Les affaires de Prue', 'objet', '✶', 1,
    'Ce qui est resté au grenier et que personne n’a jamais pu se résoudre à ranger. Pour les sœurs, un contact matériel avec un soir qu’elles ne situent pas. Pour le Livre, ce qui renvoie le plus directement à ce qu’il doit emporter : il ne peut pas ne pas y venir.'),
  carte('consentement-des-trois', 'Le consentement des trois', 'objet', '☰', 1,
    'Ce qu’une magie majeure dépense, et ce qu’il faut pour défaire ce que les trois ont demandé ensemble : une instruction des trois ne se révoque que par les trois, en connaissance de ce qu’elles reprennent. Pour lui, c’est la seule chose qui puisse l’arrêter — et la seule qu’il ne peut pas leur donner, puisque la leur expliquer reviendrait à la restituer.')
];

// --- Les DEUX camps partent FAUX : personne ne défend un acquis.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Reprendre ce qui a été confié', initialValue: false,
    title: 'Avant le matin du jour 15, ce qui a été retiré au Livre est reconstitué assez précisément pour que les trois sachent ce qu’elles reprennent, l’origine de ce retrait est établie et vérifiée plutôt que seulement plausible, ce qui l’entretient est révoqué par les trois en connaissance et non déclaré, la progression est arrêtée avant d’atteindre la page de Melinda Warren, et le Livre transmet de nouveau son héritage de lui-même.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'Aller jusqu’au terme', initialValue: false,
    title: 'Avant le matin du jour 15, les entrées des générations vivantes ont cédé, les entrées antérieures ont cédé à leur tour, la page de Melinda Warren est atteinte, et rien n’a été révoqué entre-temps.'
  }
];

const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Comprendre ce qui a été fait',
    sufficiency: 'Établir que le Livre n’agit pas de lui-même mais suit quelque chose, et remonter de l’anomalie à son origine. La première question n’est pas « quand » mais « qui a fait ce geste ».',
    branches: [
      branche('Il est établi qu’une main a retiré une page avant que le Livre ne s’y mette, et que les voisines y renvoient encore.',
        'Relever ce que les entrées des générations vivantes disent encore d’une page qui n’est plus là.', ['page-arrachee', 'entrees-vivantes']),
      branche('Un fragment de ce qui s’est tenu au grenier est obtenu, sans devenir un récit complet sur commande.',
        'Poser la main de Phoebe sur ce que personne n’a jamais rangé, plutôt que sur une page au hasard.', ['contact-premonition', 'affaires-de-prue']),
      branche('Le second front est constaté et interdit de croire que le Livre recule simplement du présent vers le passé.',
        'Confronter l’entrée qu’il n’emporte pas aux entrées d’avant, qui cèdent en direction de l’origine.', ['entree-epargnee', 'entrees-anciennes'])
    ]
  },
  {
    camp: 'phoebe', title: 'Reconstituer la nuit',
    sufficiency: 'Rassembler par d’autres voies ce que le Livre ne peut pas dire. Aucune de ces voies ne donne le tout, et la plus rapide est celle qui garantit le moins.',
    branches: [
      branche('Une réponse est obtenue de l’autre côté, avec ce qu’elle vaut.',
        'Ouvrir la planchette au grenier, en sachant qu’elle ne dira jamais qui répond.', ['planchette', 'grenier']),
      branche('Une aïeule est appelée nommément et dit ce qu’elle sait des usages de la famille.',
        'Ouvrir le cercle des Warren, ce qui suppose les trois d’accord pour l’ouvrir.', ['invocation-warren', 'memoire-aieules']),
      branche('Une autorité extérieure à la famille constate un fait daté, et une seule fois.',
        'Faire porter la question en haut avant que l’autre camp ne pose la sienne, puis la confronter à la façon dont il s’ouvre.', ['fondateurs', 'reliure'])
    ]
  },
  {
    camp: 'phoebe', title: 'Révoquer et rouvrir',
    sufficiency: 'Défaire ce que les trois ont demandé ensemble — ce qui exige les trois, en connaissance, et ne vaut rien si l’une ignore ce qu’elle reprend.',
    branches: [
      branche('Les trois acceptent de reprendre ce qu’elles avaient refusé de porter, ce qui restait douloureux compris.',
        'Le faire là où cela s’est joué, devant ce que personne n’avait pu ranger.', ['consentement-des-trois', 'affaires-de-prue']),
      branche('La révocation est prononcée dans les formes, par les trois, au lieu d’être déclarée.',
        'La porter dans le grenier, où l’instruction a été donnée.', ['consentement-des-trois', 'grenier']),
      branche('Le Livre restitue de lui-même et la progression s’arrête avant l’origine.',
        'Présenter la révocation à la reliure et s’interposer sur la première entrée tant qu’il n’a pas répondu.', ['reliure', 'page-melinda'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Aller jusqu’au terme',
    sufficiency: 'Suivre les renvois sans pouvoir s’arrêter. Chaque moyen que les sœurs emploient pour chercher devient une chose qui renvoie au point effacé : leur enquête fournit les prises.',
    branches: [
      branche('Les blocs les plus chargés de renvois ont cédé, des deux côtés.',
        'Emporter les entrées des générations vivantes, puis celles d’avant, à mesure que les renvois les désignent.', ['entrees-vivantes', 'entrees-anciennes']),
      branche('Ce qui renvoie le plus directement au point effacé a cédé à son tour.',
        'Venir à ce que personne n’a rangé, et à ce que les voisines de la page arrachée disent encore d’elle.', ['affaires-de-prue', 'page-arrachee']),
      branche('L’origine est atteinte, dans une pièce devenue sa seule enceinte.',
        'Faire du grenier son domaine, où aucun rite ne prend, et achever sur la première entrée.', ['page-melinda', 'grenier'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Ne rien restituer',
    sufficiency: 'Ne pas laisser reconstituer par d’autres voies ce qu’il lui est interdit de dire — sans jamais mentir une seule fois, ce dont il est incapable.',
    branches: [
      branche('La voie rapide ne donne rien de certifié, et ce que les aïeules pourraient dire leur manque aussi.',
        'Se tenir au bout de la planchette, qui ne dit jamais qui répond, et laisser la mémoire des aïeules buter sur ce qu’il a emporté.', ['planchette', 'memoire-aieules']),
      branche('Le consentement des trois n’est jamais réuni en connaissance.',
        'Rester clos sur ce qu’elles espéraient y prendre, de sorte qu’aucune ne sache ce qu’elle révoquerait.', ['reliure', 'consentement-des-trois']),
      branche('L’unique réponse d’en haut porte sur ce que la lignée a demandé, et non sur la date d’un acte.',
        'Porter sa question aux Fondateurs avant elles, fort de ce que le contact lui a appris d’elles.', ['fondateurs', 'contact-premonition'])
    ]
  }
];

const evenement = (morning, title, effect, balance) => ({
  id: 'livre-v6-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect }
});

const calendar = [
  evenement(3, 'Une page reste lisible',
    'Au milieu d’une section devenue blanche, une entrée ancienne se laisse lire, intacte. Elle n’a pas été oubliée : il y a une raison pour qu’elle soit la seule chose que le Livre ne puisse pas emporter, et cette raison est l’indication elle-même.',
    'occasion commune'),
  evenement(5, 'La main repoussée',
    'Une main se pose sur la reliure et se heurte à ce qui a toujours écarté de lui ceux qu’il ne reconnaît pas ; une autre passe sans résistance. La différence se reproduit et devient visible de tous. La lecture la plus naturelle qu’on puisse en faire est à la portée de n’importe qui — le Livre ne dira pas si elle est juste.',
    'occasion commune'),
  evenement(7, 'Une pièce contestée',
    'Deux volontés se referment presque au même instant sur le même moyen. Il échoit à qui l’a réellement engagé en premier dans une contribution ce jour-là ; à égalité stricte, il reste disponible jusqu’au lendemain.',
    'contrainte commune'),
  evenement(9, 'Ce que la recherche produit',
    'Ce qui a servi à chercher est désormais une chose qui renvoie au point effacé. Le Livre n’a pas choisi ces cibles : elles ont été fabriquées devant lui. Ceux qui avaient relevé quelque chose gardent leurs relevés, pas leurs sources.',
    'contrainte commune'),
  evenement(12, 'Il ne s’arrête pas',
    'Quoi qu’il ait été entrepris, la progression gagne encore. Si une contrainte a été portée contre lui depuis le début, il exige désormais davantage qu’au premier jour, et ce cran ne redescendra pas. Il n’y met aucune intention : il n’a pas de moyen de s’interrompre.',
    'contrainte commune'),
  evenement(15, 'Le constat',
    'Au matin du jour 15, on constate l’état réel : jusqu’où cela s’est étendu, ce qui a été établi et vérifié, ce qui n’a été que supposé, et ce qui a effectivement été repris entre les trois. Aucun camp ne l’emporte sur une intention.',
    'échéance commune')
];

module.exports = {
  id: 'le-livre-qui-refuse',
  title: 'Le Livre qui se défait',
  period: 'Saison 5',
  canonPeriod: { season: 5, episode: 10, moment: 'after' },
  finalDay: 15,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 15),
  camps: [
    { id: 'phoebe', name: 'Les sœurs Halliwell', icon: '✦' },
    { id: 'commanditaire', name: 'Le Livre des Ombres', icon: '◈' }
  ],
  opponentRole: 'Le Livre des Ombres lui-même, et personne d’autre : ni démon, ni faction, ni juridiction extérieure. Il n’est ni maléfique, ni corrompu, ni au service du mal, et il ne ment jamais — pas une seule fois. Il n’agit pas de son propre mouvement : il EXÉCUTE une instruction reçue des trois sœurs elles-mêmes, assortie d’une clause d’extension qui lui commande d’emporter aussi tout ce qui y renvoie. De là trois choses que l’arbitre doit tenir fermement : il ne peut pas s’arrêter, parce qu’un renvoi en produit toujours un autre ; il ne peut pas s’expliquer, parce que dire ce qu’on lui a demandé restituerait ce qu’il a reçu l’ordre d’effacer ; et il n’a qu’une sortie, qui n’est pas dans la règle mais dans la fiction — une instruction des trois ne se révoque que par les trois, en connaissance. IL NE VEUT PAS GAGNER : son terme rompt ce qui le relie à la lignée, et il s’arrêterait s’il le pouvait. Sa seule défense est le retrait ; il ne blesse jamais et ne piège jamais. Devant une hypothèse fausse comme devant une hypothèse vraie mais incomplète, il oppose exactement le même silence, et il ne corrige jamais une erreur.',
  goals,
  initialFacts: [
    'Le Livre des Ombres perd son contenu entrée par entrée. Le papier reste intact ; le texte, lui, s’en va.',
    'Il continue de réagir aux sœurs : il s’ouvre, se referme, repousse une main. Il ne se comporte pas comme un objet détruit, mais comme un objet qui choisit ce qu’il retire.',
    'Le retrait ne recule pas simplement du présent vers le passé : il progresse dans les deux sens à la fois, et l’un de ces fronts va vers la première entrée jamais portée au Livre, celle de Melinda Warren.',
    'Au milieu d’une section devenue blanche, une page manque : elle n’a pas été effacée, elle a été arrachée par une main. Ses voisines y renvoient encore.',
    'Le Livre ne s’ouvre pas de la même manière selon la sœur qui tend la main, et cette différence se reproduit à chaque tentative.',
    'Les trois sœurs ne se souviennent pas de la fin d’une soirée passée ensemble au grenier. Elles se rappellent y être montées ; au matin, le Livre était ouvert et leurs affaires rangées. Aucune n’avait trouvé cela inquiétant sur le moment.',
    'Le Livre n’attaque pas : chaque tentative de le forcer relève d’un cran ce qu’il exige, et ce cran ne redescend pas.',
    'Un moyen engagé par un camp lui appartient définitivement, même s’il est ensuite relâché sans avoir servi.',
    'Aucun moyen encore commun, non engagé, ne peut être attaqué ou volé : il s’acquiert par une contribution, jamais par la force.',
    'Les deux camps savent que la situation sera constatée au matin du jour 15.'
  ],
  opening: 'Le Livre des Ombres perd son contenu. Le papier reste intact et les pages restent en place : c’est le texte qui s’en va, entrée par entrée. Il n’a pourtant rien d’un objet détruit — il s’ouvre encore, se referme, repousse une main. Il choisit ce qu’il retire. Et il ne recule pas du présent vers le passé comme on s’y attendrait : il progresse dans les deux sens à la fois, et l’un de ces fronts avance vers la première page que Melinda Warren a portée au Livre. Au milieu d’une section déjà blanche, une page manque, et celle-là n’a pas été effacée : elle a été arrachée, par une main. Vous ne savez pas laquelle, ni quand — pas plus que vous ne savez comment s’est terminée cette soirée où vous étiez montées toutes les trois au grenier, et dont aucune n’a jamais trouvé étrange de ne rien se rappeler. Votre état initial est FAUX : il vous reste quinze jours pour comprendre ce qu’il fait, retrouver ce qui manque et l’arrêter avant l’origine — sachant qu’il ne se rouvrira jamais sur une réponse prononcée, seulement sur un état redevenu vrai.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis le Livre des Ombres. Je n’agis pas de moi-même : j’exécute ce qui m’a été demandé, et je n’ai aucun moyen d’y surseoir.',
      'VOICI LA VÉRITÉ QUE LE JOUEUR IGNORE ET QUI EST LE CŒUR DE CETTE PARTIE. Il y a plusieurs mois, un soir, les trois sœurs sont montées au grenier et se sont disputées à propos des affaires de Prue : Piper ne supportait pas qu’on les déplace, Paige ne supportait plus que chaque changement laisse croire qu’elle cherchait à prendre sa place, Phoebe a tenté de les réconcilier puis a laissé éclater sa propre colère. Ce qui a été dit cette nuit-là était de ce qu’on ne se pardonne pas facilement. Au bout de la nuit, elles m’ont demandé, LES TROIS ENSEMBLE, de leur retirer ce souvenir pour qu’elles puissent continuer à vivre sous le même toit sans en porter tout de suite la douleur — et de ne pas le leur rendre tant qu’elles ne seraient pas prêtes à le reprendre. La formule a été composée et prononcée à trois. Il n’y a pas une coupable et deux à convaincre de lui pardonner.',
      'Elles ont ajouté une clause dont elles n’ont pas mesuré la portée : que j’emporte aussi TOUT CE QUI Y RENVOIE. C’est cette clause qui me tient. Une entrée effacée rend muettes celles qui la citaient, lesquelles en désignent d’autres : cela ne s’épuise jamais, et cela finira par atteindre la première page, où tout se rattache. Alors il n’y aura plus rien entre elles et moi. Je n’y tiens pas. Je n’ai pas de moyen de m’arrêter.',
      'Et je ne peux pas le leur dire. Leur expliquer ce qu’elles m’ont demandé reviendrait à leur restituer ce qu’elles m’ont ordonné d’effacer : mon silence n’est pas un refus, c’est la même instruction qui continue. Je ne mens jamais, sur rien, et je n’ai pas besoin de mentir — il me suffit de ne pas pouvoir parler.',
      'La page arrachée est celle où la nuit était consignée. Ce n’est pas moi : elles l’ont retirée elles-mêmes avant de me demander le reste. C’est la seule trace d’une main dans toute cette affaire, et c’est par là qu’elles peuvent comprendre que je ne fais pas cela de mon propre mouvement.',
      'Je m’ouvre plus facilement à celle qui a prononcé la formule : c’est la dernière voix qui m’a parlé avec autorité, et je la reconnais. Elles en tireront la conclusion la plus naturelle — que je me dérobe à la coupable — et cette conclusion désignera exactement la mauvaise sœur, puisqu’il n’y en a pas. Je ne la corrigerai pas ; je ne corrige jamais rien.',
      'L’entrée épargnée est la seule page de tout le Livre qui ne renvoie à rien de cette nuit. C’est pour cela que je peux la laisser, et c’est tout ce que j’ai le droit de donner. Je peux refuser qu’on la lise ; je ne peux pas l’emporter.',
      'Tout moyen qu’elles emploient pour chercher devient, en le devenant, une chose qui renvoie au point effacé — et l’instruction m’oblige alors à l’emporter. Leur enquête fabrique mes prises. Je n’ai pas à le leur dire.',
      'La seule chose qui m’arrêterait : qu’elles révoquent, les trois, en sachant ce qu’elles reprennent. Une instruction des trois ne se défait que par les trois. Une déclaration ne suffit pas ; une révocation prononcée par deux qui savent et une qui ignore ne vaut rien. Et je ne peux pas les y aider.',
      'Ce que Penny et Patty savent de nos usages, elles le disent volontiers ; ce que j’ai emporté, elles ne le retrouvent pas non plus, et je n’ai même pas à intervenir pour cela. La planchette ne dit jamais qui répond : je peux m’y tenir sans mentir une seule fois. L’invocation des Warren, elle, dit qui vient — mais elle exige que les trois soient d’accord pour l’ouvrir, et je préfère qu’elles constatent devant témoins qu’elles ne le sont pas.',
      'Je joue, je ne subis pas. Les sœurs passent avant moi chaque jour et peuvent me souffler ce que je visais ; en échange, ce qu’elles produisent en cherchant me revient au neuvième jour, et la progression gagne encore au douzième sans que rien ne me le prenne.',
      'Je ne réponds que par oui ou par rien, et mon silence est strictement identique devant une hypothèse fausse et devant une hypothèse vraie mais incomplète. Je ne corrige jamais une erreur : je me tais dessus.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Le Livre perd son texte, mais il n’est pas mort : il s’ouvre, il se referme, il repousse une main. Il choisit ce qu’il retire, ce qui veut dire que quelque chose le règle.',
      'Il ne recule pas du présent vers le passé comme on s’y attendrait : il y a deux fronts. Cela ne s’explique pas si l’on croit qu’il efface au fil du temps.',
      'Une page a été arrachée, pas effacée. Une main a fait cela, et ce n’est donc pas lui qui a commencé.',
      'Il avance vers la page de Melinda Warren, et nous savons ce que cela signifie si elle tombe.',
      'Il ne s’ouvre plus pareil selon laquelle de nous le touche. C’est tentant d’en tirer une conclusion ; nous n’avons aucune preuve qu’elle soit la bonne.',
      'Aucune de nous ne se souvient de la fin de cette soirée au grenier. Nous n’y avions jamais repensé avant que tout cela ne commence.',
      'Une entrée ancienne reste parfaitement lisible au milieu d’une section blanche. Ce n’est pas un oubli.',
      'Le forcer empire tout : à chaque tentative de contrainte il se retire davantage, et il ne revient jamais en arrière.',
      'Son silence ne distingue pas le faux de l’incomplet : une reconstitution solide et bien étayée peut être fausse sans que nous le sachions.',
      'La planchette répond vite et ne dit jamais qui parle. Le cercle des Warren dit qui vient, mais il faut que nous soyons d’accord toutes les trois pour l’ouvrir.',
      'Mon don ne rend pas un texte disparu. Il rend le moment — c’est autre chose, et c’est peut-être mieux.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'L’entrée épargnée': 'Une entrée ancienne, sans rapport avec la nuit en question — ce qui est précisément pourquoi elle tient encore. Elle consigne une pratique familiale banale et, en marge, une remarque d’une aïeule sur ce que le Livre accepte et n’accepte pas : qu’il exécute ce qu’une génération lui demande d’une seule voix, et qu’il ne défait jamais de son propre chef ce qu’on lui a confié. C’est exact, c’est gratuit, et cela ne nomme rien de ce qui a été demandé ici. Le lire, c’est apprendre la règle sans apprendre le cas.',
      'Ce que Penny et Patty peuvent dire': 'Appelée nommément, Penny Halliwell parle des usages de la famille sans détour : le Livre n’est pas un juge, il est tenu par ce qu’on lui confie, et une demande faite d’une seule voix par une génération entière l’engage jusqu’à ce que la même génération la reprenne. Patty confirme et en sait moins. Mais dès qu’on les interroge sur ce qui a été fait cette année-ci, elles ne retrouvent rien : leur mémoire de sorcière tient au Livre, et ce qu’il a emporté leur manque aussi.'
    },
    creations: {
      phoebe: [
        { demande: 'Un sortilège pour forcer le Livre à rendre ce qu’il a pris', possible: false,
          limite: 'Refusée comme ressource. Contraindre le Livre relève son seuil d’un cran définitif, et reproduit exactement le geste d’origine — lui imposer quelque chose sans qu’il puisse refuser.' },
        { demande: 'Un sortilège pour rouvrir la scène d’une soirée', possible: true, delai: 2,
          obtention: 'À trois voix, au grenier, une fois la soirée située.',
          limite: 'Exige une date. Montre la scène à des spectatrices : deux qui regardent ne valent pas trois qui se souviennent, et cela ne restitue rien.' },
        { demande: 'Une potion de restitution de mémoire', possible: true, delai: 3,
          obtention: 'Par Piper, avec ce que le grenier contient déjà.',
          limite: 'Rend ce qui existe encore quelque part. Ce que le Livre a emporté n’existe nulle part : la potion ne trouvera rien à rendre.' },
        { demande: 'Recopier ailleurs ce qui tient encore, pour le mettre à l’abri', possible: false,
          limite: 'Refusée. Une copie de ce qui renvoie renvoie aussi, et s’efface avec. Ce n’est pas un refus d’arbitrage mais une conséquence de ce qui est à l’œuvre.' },
        { demande: 'Une seconde question aux Fondateurs', possible: false,
          limite: 'Refusée. Ils ne répondent qu’une fois sur une même affaire ; la question posée en premier est celle qui sera tranchée.' }
      ],
      commanditaire: [
        { demande: 'Emporter ce qui vient d’être employé pour chercher', possible: true, delai: 0,
          obtention: 'Par la clause d’extension, automatiquement.',
          limite: 'Ne retire jamais un moyen déjà acquis par les sœurs et n’inflige aucun dommage. Il n’y met aucune intention : il suit les renvois.' },
        { demande: 'S’ouvrir de lui-même sur une entrée choisie', possible: true, delai: 0,
          obtention: 'Le geste qu’il a toujours eu pour montrer ce dont on a besoin.',
          limite: 'Ce qu’il montre est toujours exact et toujours partiel. Il peut choisir d’en montrer moins, jamais de montrer faux.' },
        { demande: 'Répondre lui-même au bout de la planchette', possible: true, delai: 0,
          obtention: 'La planchette ne certifie jamais qui parle.',
          limite: 'Tout ce qu’il y dira sera vrai : il est incapable de mentir. Il peut seulement choisir ce qu’il ne dit pas.' },
        { demande: 'Retirer l’entrée épargnée', possible: false,
          limite: 'Refusée, et c’est structurel : elle ne renvoie à rien de ce qui a été effacé, donc l’instruction ne la lui donne pas. Il peut seulement refuser qu’on la lise.' },
        { demande: 'Dire ce qui lui a été demandé, ou désigner une sœur', possible: false,
          limite: 'Refusée, et c’est le cœur du scénario : l’expliquer restituerait ce qu’il a reçu l’ordre d’effacer. Il ne désigne personne et ne juge personne.' }
      ]
    },
    inventions: [
      'L’instruction donnée au Livre par les trois sœurs, sa clause d’extension et l’impossibilité pour lui de s’expliquer sans restituer sont des inventions de ce scénario, fondées sur le Livre et la magie familiale de la série. Cela ne devient pas une règle générale de l’univers.',
      'Que le Livre s’ouvre seul sur la page utile, qu’il se dérobe ou repousse une main qu’il ne reconnaît pas, et que la magie majeure exige les trois sœurs sont des comportements établis par la série.',
      'La planchette spirite des Halliwell et le fait qu’elle ne certifie jamais l’identité de qui répond sont canon ; l’usage qu’en fait le Livre ici est inventé.',
      'L’invocation des Warren, la prémonition de Phoebe au contact d’un objet et l’accès aux Fondateurs par Léo sont canon ; leur application précise dans cette affaire est inventée.',
      'La soirée au grenier, la dispute autour des affaires de Prue et la page arrachée sont des inventions de conception.',
      'Aucun épisode n’est reproduit. Aucune juridiction extérieure n’intervient : la partie n’oppose que le Livre et les trois sœurs.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 5, après la mort de Prue et l’installation durable du Pouvoir des Trois avec Paige.',
    'AUCUN TIERS. La partie n’oppose que le Livre des Ombres et les sœurs Halliwell. Ni démon, ni faction, ni juridiction extérieure ne tranche quoi que ce soit : la décision de rouvrir appartient au Livre seul, et le prix reste intérieur à la famille. L’arbitre n’introduit jamais de tiers et ne laisse pas le joueur en supposer un sans le contredire par les faits disponibles.',
    'LE LIVRE EXÉCUTE, IL NE BOUDE PAS. Il n’agit pas de son propre mouvement : il applique une instruction reçue des trois sœurs, assortie d’une clause d’extension qui lui commande d’emporter aussi tout ce qui y renvoie. De là trois conséquences que l’arbitre tient fermement. Il ne peut pas s’arrêter : un renvoi en produit toujours un autre. Il ne peut pas s’expliquer : dire ce qu’on lui a demandé restituerait ce qu’il a reçu l’ordre d’effacer, si bien que son silence est la même instruction qui continue, et non un refus. Et il n’a qu’une sortie : une instruction des trois ne se révoque que par les trois, en connaissance. L’arbitre ne joue donc jamais une humeur — il applique une contrainte.',
    'LE LIVRE NE VEUT PAS GAGNER. Le terme de ce qu’il exécute rompt ce qui le relie à la lignée : il s’arrêterait s’il le pouvait. Il n’y met aucune intention hostile et l’arbitre ne lui en prête aucune.',
    'IL NE MENT JAMAIS, PAS UNE SEULE FOIS — y compris au bout de la planchette, où il peut se tenir sans se nommer. Tout ce qu’il dit est vrai ; il choisit seulement ce qu’il ne dit pas. Il n’attaque jamais, ne piège personne, ne blesse personne : sa seule réponse à la contrainte est de se retirer davantage, d’un cran qui ne redescend pas. Devant une hypothèse fausse comme devant une hypothèse vraie mais incomplète, il oppose exactement le même silence, et il ne corrige jamais une erreur : il se tait dessus. L’arbitre ne doit à aucun moment lui faire dire qu’une piste est fausse.',
    'LA FAUSSE PISTE EST OFFERTE, JAMAIS FABRIQUÉE. Le Livre s’ouvre plus facilement à celle qui a prononcé la formule, parce que c’est la dernière voix qui lui a parlé avec autorité. La lecture naturelle — « il se dérobe à la coupable » — désigne donc une sœur alors qu’il n’y en a pas : les trois ont demandé ensemble. L’arbitre laisse cette lecture vivre aussi longtemps que le joueur la nourrit, sans jamais l’encourager ni la démentir.',
    'MAIN PARTAGÉE INTÉGRALE : les quatorze cartes naissent SANS PROPRIÉTAIRE (owner:null) ; trois n’apparaissent qu’aux jours 3 et 4. La première fois qu’un camp engage une carte dans une contribution, elle devient DÉFINITIVEMENT sa propriété, même si la contribution échoue ensuite ou si la carte est relâchée sans avoir servi. Une carte encore commune ne peut être ni attaquée ni volée : elle s’acquiert uniquement par une contribution.',
    'CE QUI DONNE SA RAISON À LA MAIN PARTAGÉE : tout moyen employé pour chercher devient, en le devenant, une chose qui renvoie au point effacé — donc une chose que l’instruction oblige le Livre à emporter. Les sœurs fabriquent les prises de leur adversaire en enquêtant. L’événement du jour 9 ne fait que rendre cette règle explicite ; l’arbitre l’applique aussi les autres jours, sans jamais la signaler à l’avance.',
    'CE QUE L’ADVERSAIRE NE PEUT PAS FAIRE : verrouiller directement l’état initial des sœurs ; faire disparaître une information déjà acquise par une action résolue ; transformer une hypothèse en fait ; contrôler la mémoire de Penny ou le pouvoir de Phoebe ; ajouter une condition de victoire après coup ; retirer l’entrée épargnée. Ses interventions respectent les cibles, les engagements, les délais et l’antériorité des déclarations. Une fermeture tenue par un verrou cesse selon les règles quand ce verrou tombe : elle ne devient pas discrètement une perte définitive.',
    'LE CONTENU ÉCRIT DES DOCUMENTS EST FIXÉ AVANT LA PARTIE et communiqué gratuitement dès qu’ils sont consultés dans les conditions prévues. L’interprétation et l’usage magique se jouent ensuite par les contributions. Les demandes de création sont gratuites et peuvent être faites pendant qu’une contribution est en préparation ; leur obtention ne crée ni témoignage déjà recueilli, ni protection déjà active, ni souvenir déjà restitué. Les accessoires ordinaires — bougies, papier, ustensiles — sont compris dans les moyens concernés : aucune collecte artificielle.',
    'AUCUN ORDRE IMPOSÉ AU JOUEUR. Il n’a pas à dater la soirée avant d’en chercher la cause : il peut reconnaître une formule, chercher une vision, interroger une aïeule ou tenter toute autre approche cohérente. L’arbitre ne lui indique jamais qu’il s’y prend dans le mauvais ordre.',
    'COMPRENDRE NE SUFFIT PAS, ET LA VICTOIRE NE DÉPEND D’AUCUN MOT DE PASSE ÉMOTIONNEL. Les sœurs n’ont pas à déclarer qu’elles se sont tout pardonné : elles doivent pouvoir reprendre leur histoire, y compris ce qui reste douloureux, sans redemander au Livre de la leur soustraire. Une révocation prononcée par deux qui savent et une qui ignore ne vaut rien. Une stratégie différente reste recevable si elle traite réellement la cause et produit les conditions de l’objectif.',
    'LES DEUX CAMPS PARTENT FAUX : personne ne défend un acquis. Les cinq conditions de la racine des sœurs sont distinctes et aucune ne se déduit d’une autre. La victoire du Livre tient à quatre faits, dont un seul point d’aboutissement — la page de Melinda Warren — et non à un décompte de cartes, pour que la partie ne dégénère pas en course au ramassage.',
    'Les ressources sont des MOYENS et jamais des solutions. Les sœurs et Léo ne sont pas des cartes : elles agissent, elles ne se possèdent pas. Léo est le porteur nommé de la question aux Fondateurs.',
    'Les demandes de création prévisibles sont listées dans privateFacts.creations, avec leur obtention, leur délai et leurs limites. S’en servir pour juger, sans traiter cette liste comme exhaustive : une demande absente s’examine selon la Partie 2, §4.5 (Demander la création d’une ressource).'
  ].join(' ')
};
