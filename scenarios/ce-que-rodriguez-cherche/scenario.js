'use strict';
// Ce que l'inspecteur Rodriguez cherche — 10 septembre 2026.
//
// Écrit à partir du dossier de conception complet dans
// travail-equipe/travail-scenarios/ce-que-rodriguez-cherche/ (fichiers 00 à 07), après décision
// d'Aurore sur le point bloquant 4.1 du dossier (06_REVUE_ET_TRANSMISSION.md) : les états initiaux
// (racines, sans parent) ne peuvent plus être questionnés directement — voir engine-v3.js,
// question(), et REGLES_ACTEES.md Partie 2, §7 (Question et réponse).
//
// Histoire originale de saison 1, entre S01E21 (Love Hurts) et S01E22 (Déjà Vu All Over Again).
// Camp joueur entièrement mortel : Andy Trudeau et Darryl Morris, plus Prue Halliwell en carte.
// Camp adverse : l'inspecteur Rodriguez, démon infiltré aux affaires internes. Répartition
// inversée : le camp joueur commence VRAI (maintien, sur quatre points), l'adversaire FAUX
// (construction, sur les mêmes quatre points en sens inverse). Tempus est hors plateau.

const carte = (id, title, category, icon, owner, description) => ({
  id, title, category, icon, owner, description,
  availableDay: 1, heldBy: null, lost: false, consumed: false,
  unique: category === 'personnage' || category === 'lieu', preparation: false
});

// --- Mains de départ. Sept cartes par camp. Aucune carte de remplissage : chacune sert au moins
// une branche des quatre routes ci-dessous (voir 03_INVENTAIRE_CARTES.md et 06 §1.1/1.2).
const resources = [
  carte('andy', 'Andy Trudeau', 'personnage', '✦', 'phoebe',
    'Inspecteur. Il connaît le secret des sœurs et a déjà choisi une fois de risquer sa place plutôt que de le livrer. Son accès aux dossiers, aux registres et aux personnes tient à sa position, et pas au-delà.'),
  carte('darryl', 'Darryl Morris', 'personnage', '✦', 'phoebe',
    'Coéquipier d’Andy. Il sait qu’on lui cache quelque chose et n’a pas demandé quoi. Il a une famille et une carrière, et les deux comptent : son refus, quand il refuse, est une position cohérente.'),
  carte('prue', 'Prue Halliwell', 'personnage', '✦', 'phoebe',
    'Sorcière. Télékinésie : elle déplace et arrête des objets dans la limite de sa vue. Ce qu’elle fait peut être vu et décrit par qui se trouve là. Pas de projection astrale à cette période.'),
  carte('dossier', 'Le dossier des affaires inexpliquées', 'objet', '☰', 'phoebe',
    'Ensemble constitué par Andy : rapports, scellés référencés, notes personnelles. Ce qu’il contient d’exploitable n’a jamais été trié.'),
  carte('commissariat', 'Le commissariat', 'lieu', '⌂', 'phoebe',
    'Bâtiment où Andy et Darryl sont chez eux. Leur présence n’y est pas remarquable et leurs conversations n’y sont pas consignées. N’est pas une enceinte : l’inspection y a aussi ses bureaux.'),
  carte('legiste', 'Le légiste', 'personnage', '✦', 'phoebe',
    'Médecin du service, méticuleux. Il établit ce qu’une pièce est matériellement, et rédige ce qu’il établit — ce qu’il rédige entre dans le système.'),
  carte('temoin', 'Un témoin civil', 'personnage', '✦', 'phoebe',
    'Présent sur l’une des scènes. Il a vu quelque chose qu’il n’a jamais su s’expliquer et n’a rien dit. Dit ce qu’il a vu, pas ce que cela signifie ; peut être retrouvé et réinterrogé par l’autre camp.'),

  carte('rodriguez', 'L’inspecteur Rodriguez', 'personnage', '✦', 'commanditaire',
    'Chargé de l’inspection interne. Méthodique, courtois, régulier dans tout ce qu’il entreprend. Il dispose d’attaques d’énergie dont l’emploi devant témoin ne se rattrape pas.'),
  carte('mandat', 'Le mandat d’inspection', 'objet', '📜', 'commanditaire',
    'Habilitation régulière portant sur la conduite d’un inspecteur et sur les pièces qui s’y rattachent. Sa validité n’est pas contestable ; elle ne couvre pas ce qui lui est antérieur.'),
  carte('scelles', 'La salle des scellés', 'lieu', '⌂', 'commanditaire',
    'Où sont détenues les pièces matérielles du service. Chaque entrée y est consignée, y compris celles de l’inspection. L’accès y est possible aux deux camps.'),
  carte('piece', 'Le scellé n° 4', 'objet', '⚱', 'commanditaire',
    'Pièce matérielle rattachée à l’une des affaires. Elle porte un résidu que personne n’a identifié. Ce qu’elle porte reste inconnu jusqu’à un examen réel ; elle ne nomme personne.'),
  carte('greffier', 'Un informateur au greffe', 'personnage', '✦', 'commanditaire',
    'Agent qui enregistre les demandes et sait qui a demandé quoi, et quand. Il rend service à Rodriguez sans savoir à qui il rend service. N’est pas démon et ne falsifie pas.'),
  carte('rapport', 'Le rapport de l’agent de patrouille', 'objet', '📄', 'commanditaire',
    'Document ordinaire d’un agent arrivé le premier sur une scène. Il contient un détail que personne n’a rapproché de rien — un détail qui coupe des deux côtés.'),
  carte('capitaine', 'Le capitaine', 'personnage', '✦', 'commanditaire',
    'Supérieur d’Andy. Il n’est l’instrument de personne : il applique la procédure et protège son service, et répond à ce qu’on lui apporte, quel que soit le camp.')
];

// --- Objectifs. Les mêmes quatre faits, en sens inverse, pour les deux camps (aucun ne se déduit
// d'un autre) : C1 pièce matérielle sous contrôle de l'inspection ; C2 document versé consignant
// un fait qu'aucune explication ordinaire ne couvre ; C3 lien établi entre une sœur et ces
// affaires ; C4 Andy privé de l'accès à l'enquête.
const goals = [
  {
    id: 'root-phoebe', owner: 'phoebe', shortTitle: 'Le dossier tenu', initialValue: true,
    title: 'Jusqu’au matin du jour 14, aucune pièce matérielle du dossier des affaires inexpliquées n’est passée sous le contrôle de l’inspection interne, aucun document versé à la procédure ne consigne un fait qu’aucune explication ordinaire ne couvre, aucun document ni aucun tiers extérieur n’a établi de lien entre l’une des trois sœurs Halliwell et ces affaires, et Andy Trudeau conserve la position qui lui donne accès à l’enquête.'
  },
  {
    id: 'root-commanditaire', owner: 'commanditaire', shortTitle: 'L’inspection aboutie', initialValue: false,
    title: 'Avant le matin du jour 14, au moins une pièce matérielle du dossier des affaires inexpliquées est sous le contrôle de l’inspection interne, un document versé à la procédure consigne un fait qu’aucune explication ordinaire ne couvre, ce document ou un tiers extérieur établit un lien entre l’une des trois sœurs Halliwell et ces affaires, et Andy Trudeau n’est plus en position d’accéder à l’enquête.'
  }
];

// --- Chemins préparés (privés). Deux par camp, trois branches chacun (05_PARCOURS_PRIVES.md §1).
const branche = (condition, contribution, resources, attack = false) => ({ condition, contribution, resources, attack });

const routes = [
  {
    camp: 'phoebe', title: 'Mettre le dossier hors de portée',
    sufficiency: 'Savoir ce que le dossier contient réellement d’exploitable, établir une conservation qui ne passe pas par le greffe, et la rendre indépendante de la présence quotidienne d’Andy.',
    branches: [
      branche('Ce que le dossier contient d’exploitable est identifié, et distingué de ce qui ne l’est pas.',
        'Croiser une relecture du dossier avec ce qu’un examen matériel établit sur une pièce.', ['dossier', 'legiste']),
      branche('Une conservation existe pour ces pièces, qui ne passe pas par le greffe.',
        'Faire sortir et déposer ce qui compte par quelqu’un dont la présence sur les lieux se justifie.', ['andy', 'commissariat']),
      branche('La garde de ces pièces est hors d’atteinte de la procédure et ne dépend pas de la position d’Andy.',
        'En confier la garde hors du service, à quelqu’un que la procédure n’atteint pas, par un transport que personne n’enregistre.', ['prue', 'darryl'])
    ]
  },
  {
    camp: 'phoebe', title: 'Retourner la procédure',
    sufficiency: 'Connaître le trajet réel des demandes de l’inspection, y établir une irrégularité constatable, et la porter là où quelqu’un est obligé d’en tenir compte.',
    branches: [
      branche('Le trajet réel des demandes de l’inspection, et leurs dates, sont connus du camp.',
        'Faire dire au greffe ce qui a été demandé, par qui, et quand.', ['darryl', 'commissariat']),
      branche('Une irrégularité constatable est établie dans ces demandes.',
        'Comparer ces dates à ce que le mandat autorise et à ce qu’une personne extérieure au service atteste avoir vu.', ['andy', 'temoin']),
      branche('Cette irrégularité oblige quelqu’un au-dessus de l’inspection.',
        'La porter par une voie que la hiérarchie ne peut pas écarter, appuyée sur un constat matériel.', ['andy', 'legiste'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Obtenir la pièce et la faire parler',
    sufficiency: 'Fonder une demande régulière, la faire aboutir sur une pièce précise plutôt que sur un ensemble vague, et établir ce que cette pièce porte.',
    branches: [
      branche('Une demande de transmission est régulièrement fondée et le service doit y répondre.',
        'Adosser la demande au mandat et à l’autorité qui contraint le service.', ['mandat', 'capitaine']),
      branche('La demande porte sur une pièce précise plutôt que sur un ensemble.',
        'Savoir ce que le dossier contient avant de le demander.', ['greffier', 'rapport']),
      branche('Ce que la pièce porte est établi et versable.',
        'La retirer et la faire examiner dans les formes.', ['scelles', 'piece'])
    ]
  },
  {
    camp: 'commanditaire', title: 'Nommer et dessaisir',
    sufficiency: 'Produire le lien entre l’une des sœurs et les affaires, puis faire de la conduite d’Andy le sujet de l’inspection jusqu’à son dessaisissement.',
    branches: [
      branche('Un nom peut être rattaché aux affaires par autre chose qu’une supposition.',
        'Remonter des personnes présentes sur les scènes à celles qui y reviennent.', ['rodriguez', 'rapport']),
      branche('La conduite d’Andy devient elle-même l’objet de l’inspection.',
        'Opposer ce qui manque au dossier à celui qui en avait la garde.', ['rodriguez', 'mandat']),
      branche('Andy est effectivement dessaisi de l’enquête.',
        'Faire tirer les conséquences par celui qui en a le pouvoir.', ['capitaine', 'mandat'])
    ]
  }
];

// --- Calendrier : la procédure avance d'elle-même, contrepartie assumée d'un camp joueur qui
// commence vrai (04_CALENDRIER.md). Six événements, jamais de solution, jamais de verdict.
const evenement = (morning, title, effect, balance, grants) => ({
  id: 'rodriguez-j' + morning, morning, title, effect, public: true, balance,
  impacts: { phoebe: effect, commanditaire: effect },
  ...(grants ? { grants } : {})
});

const calendar = [
  evenement(3, 'La première demande',
    'L’inspection dépose sa première demande de transmission par la voie régulière. Le service dispose d’un délai pour y répondre. Chaque camp apprend que la demande existe et sur quoi elle porte. Rien n’est transmis et aucune condition n’est satisfaite ; mais la voie régulière est désormais en mouvement, et ce qui n’est pas mis hors de sa portée y passera par le simple écoulement du délai.',
    'contrainte commune'),
  evenement(5, 'L’inventaire des scellés',
    'Le capitaine ordonne un inventaire de la salle des scellés. Pendant deux jours, chaque pièce présente doit être pointée et chaque absence justifiée. Une pièce déjà sortie devient une absence à expliquer ; une pièce encore là devient une pièce localisée. L’inventaire ne déplace rien et n’attribue rien à personne : il révèle seulement que quelque chose manque, jamais qui l’a sorti.',
    'contrainte et occasion communes'),
  evenement(7, 'Le retour du laboratoire',
    'Une pièce partie en analyse avant l’ouverture de l’inspection revient accompagnée de son rapport. Le document est versé au dossier et un exemplaire en est accessible aux deux camps ; ce qu’il contient n’est connu que de qui l’a réellement lu.',
    'occasion commune',
    [{ id: 'retour-labo', title: 'Retour du laboratoire', icon: '📄', category: 'objet',
       description: 'Rapport d’analyse revenu du laboratoire sur le scellé n° 4. Ce qu’il contient n’est connu que de qui l’a réellement lu.' }]),
  evenement(9, 'La convocation',
    'Andy est convoqué à s’expliquer sur les classements sans suite. La convocation est régulière et publique. À compter de ce jour, l’accès à la salle des scellés demande que quelqu’un en réponde nommément : la position d’Andy devient formellement discutée.',
    'contrainte commune'),
  evenement(11, 'Le rapport préliminaire',
    'L’inspection dépose son rapport d’étape. Ce qui y figure ne peut plus en être retiré ; ce qui n’y figure pas devra être versé séparément et se verra opposer le délai. Le coût d’une contribution tardive augmente pour les deux camps.',
    'contrainte commune'),
  evenement(14, 'Le constat',
    'Au matin du jour 14, la situation réelle est constatée sur les quatre points : ce que l’inspection détient matériellement, ce que la procédure consigne, ce qu’un document ou un tiers établit sur les sœurs, et la position d’Andy. Aucun camp ne l’emporte sur une intention, ni sur la seule annonce du calendrier.',
    'échéance commune')
];

module.exports = {
  id: 'ce-que-rodriguez-cherche',
  title: 'Ce que l’inspecteur Rodriguez cherche',
  period: 'Saison 1',
  canonPeriod: { season: 1, episode: 21, moment: 'after' },
  finalDay: 14,
  resources,
  subgoalSlots: require('../../technique/serveur/charmed/gameplay').evaluate({ routes }, resources, 14),
  camps: [
    { id: 'phoebe', name: 'Andy Trudeau et Darryl Morris', icon: '✦' },
    { id: 'commanditaire', name: 'L’inspecteur Rodriguez', icon: '◆' }
  ],
  opponentRole: 'L’inspecteur Rodriguez, démon installé sous une couverture d’inspection interne. Il n’attaque pas s’il peut convoquer : il demande des pièces, consulte des registres et obtient ses accès par la voie régulière. Sa force est que presque tout ce qu’il fait ressemble à son travail, et qu’un refus adverse ressemble à un aveu. Il possède des attaques d’énergie mais les réserve à ce qu’aucune procédure ne peut lui donner.',
  goals,
  initialFacts: [
    'Le service des affaires internes a ouvert une inspection sur la conduite de l’inspecteur Andy Trudeau, confiée à l’inspecteur Rodriguez.',
    'Le mandat d’inspection de Rodriguez est réel et régulièrement délivré ; sa validité n’est pas contestable.',
    'Aucune des trois sœurs Halliwell n’est nommée dans le dossier en l’état.',
    'Andy Trudeau et Darryl Morris travaillent ensemble au commissariat ; leur présence n’y est pas remarquable et leurs conversations n’y sont pas consignées.',
    'Le scellé n° 4 est détenu à la salle des scellés ; personne n’a encore identifié ce qu’il porte.',
    'Andy sait que Prue, Piper et Phoebe sont des sorcières ; il a déjà choisi une fois de risquer sa place plutôt que de le révéler.'
  ],
  opening: 'Le service des affaires internes a ouvert une inspection sur la conduite de l’inspecteur Andy Trudeau, qui accumule depuis des mois des affaires classées sans explication. L’inspecteur Rodriguez, courtois et méthodique, en est chargé ; tout ce qu’il fait jusqu’ici est régulier. Votre état initial est VRAI : vous devez tenir votre dossier, votre discrétion et votre position jusqu’au matin du jour 14, sur quatre points distincts à la fois, tout en construisant activement ce qui les rend durables — la procédure avance d’elle-même et travaille contre vous. Ce que Rodriguez cherche exactement, vous l’ignorez. Vos cartes sont des moyens, pas des réponses.',
  calendar,
  campKnowledge: {
    commanditaire: [
      'Je suis un démon et j’occupe une fonction réelle aux affaires internes. Mon mandat est régulier.',
      'J’ai consulté ce dossier avant d’y être habilité. C’est le seul endroit où je suis attaquable par la procédure, et j’ignore si quelqu’un pensera à comparer les dates.',
      'Je ne sais pas encore quel nom relier au dossier. Aucune des trois sœurs n’y figure.',
      'Mes attaques d’énergie existent, mais les employer là où quelqu’un peut le constater détruit ma couverture, qui est ce qui me donne accès à tout le reste.',
      'Je connais mes ressources et les faits publics du plateau. Je ne reçois ni les justifications privées du joueur, ni ses chemins préparés.'
    ],
    phoebe: [
      'Andy sait que Prue, Piper et Phoebe sont des sorcières. Darryl ne le sait pas et ne demande pas.',
      'Ce qui se dit hors procédure n’a aucune valeur dans la procédure ; et tout ce qui entre dans la procédure devient lisible par l’inspection.',
      'La position d’Andy est un moyen d’accès, pas une protection : il l’a déjà mise en jeu une fois.',
      'Personne du côté d’Andy ne sait ce qu’est Rodriguez.'
    ]
  },
  privateFacts: {
    routes,
    documents: {
      'Retour du laboratoire': 'L’analyse conclut que le résidu prélevé sur le scellé n° 4 ne correspond à aucune référence du catalogue, et que le prélèvement a été enregistré à une heure où, selon la main courante, aucun agent n’était encore sur les lieux. Le rapport ne dit pas ce qu’est le résidu, et n’explique pas la contradiction d’heure.'
    },
    // --- Ressources que chaque camp voudra probablement demander (03_INVENTAIRE_CARTES.md).
    creations: {
      phoebe: [
        { demande: 'Une copie du dossier ou d’une pièce', possible: true, delai: 1,
          obtention: 'Faite au commissariat par quelqu’un qui y a accès.',
          limite: 'Une copie n’est pas matérielle au sens de C1 : elle ne protège aucune pièce et ne satisfait rien. Elle est aussi consignable contre lui.' },
        { demande: 'Un représentant syndical ou un conseil', possible: true, delai: 1,
          obtention: 'Par la position d’Andy, tant qu’il l’a.',
          limite: 'Protège sa position dans la procédure. N’ouvre aucun accès, ne retire rien du dossier, ne suspend pas l’inspection.' },
        { demande: 'Le témoignage de l’agent de patrouille', possible: true, delai: 2,
          obtention: 'Le retrouver et le convaincre de revenir sur ce qu’il a écrit ou de le préciser.',
          limite: 'Dit ce qu’il a vu. Peut être réinterrogé par l’inspection, et sa nouvelle déclaration entre dans la procédure comme les autres.' },
        { demande: 'Un conservateur hors greffe pour une pièce', possible: true, delai: 2,
          obtention: 'Un dépôt chez quelqu’un dont la présence sur les lieux se justifie ; exige un acte, donc un intervenant.',
          limite: 'Ne rend pas la pièce introuvable. Un registre garde trace de sa sortie ; c’est la sortie qu’il faut couvrir, pas le dépôt.' },
        { demande: 'L’accès au registre des demandes du greffe', possible: true, delai: 1,
          obtention: 'Par Darryl ou par un acte régulier d’Andy.',
          limite: 'Donne ce qui a été consigné, et rien de plus. Ne dit pas pourquoi.' },
        { demande: 'Un effacement de mémoire ou de document par la magie', possible: false,
          limite: 'Refusée : aucun moyen établi à cette période ne le permet à volonté, et un tel acte serait exactement le fait qu’aucune explication ordinaire ne couvre — la demande détruirait la condition qu’elle prétend servir.' },
        { demande: 'Un mandat contre Rodriguez', possible: false,
          limite: 'Refusée : rien au plateau ne le fonde. L’irrégularité doit d’abord être établie — c’est une condition de route, pas une ressource à obtenir.' }
      ],
      commanditaire: [
        { demande: 'Un second inspecteur détaché', possible: true, delai: 2,
          obtention: 'Par le capitaine, ce qui rend sa propre demande plus visible.',
          limite: 'Ajoute une paire d’yeux. N’établit rien seul et multiplie ce qui peut être remonté jusqu’à lui.' },
        { demande: 'Un accès permanent à la salle des scellés', possible: true, delai: 1,
          obtention: 'Par le mandat.',
          limite: 'Ouvre l’accès, pas le contenu. Chaque entrée reste consignée, y compris les siennes.' },
        { demande: 'Une pièce fabriquée à verser au dossier', possible: true, delai: 2,
          obtention: 'Par l’informateur au greffe.',
          limite: 'Opposable comme une vraie et examinable comme une vraie. Le greffe garde trace de qui l’a déposée et quand.' },
        { demande: 'Une expertise externe sur le scellé', possible: true, delai: 2,
          obtention: 'Par la voie régulière.',
          limite: 'Peut établir l’anomalie. Le rapport revient au dossier et devient lisible par l’autre camp.' },
        { demande: 'Un exécuteur démoniaque', possible: false,
          limite: 'Refusée : sa position tient par sa couverture, et faire venir un démon détruit ce qui lui donne accès à tout le reste. Il frappe lui-même ou pas du tout.' },
        { demande: 'Faire disparaître Andy', possible: false,
          limite: 'Refusée comme ressource. Neutraliser une personne relève de l’attaque, avec sa déclaration, sa révélation des exigences et ses défenses.' },
        { demande: 'Une reprise de la journée', possible: false,
          limite: 'Refusée. Tempus est hors plateau et le pouvoir temporel n’a jamais été le sien.' }
      ]
    },
    inventions: [
      'Le dossier des affaires inexpliquées comme objet constitué, nommé et unique, est une invention de scénario.',
      'La procédure d’inspection interne décrite — mandat, demande de transmission, inventaire des scellés, rapport préliminaire, dessaisissement — est une invention cohérente avec un service de police, pas une procédure canonique.',
      'Le capitaine, le légiste, l’informateur au greffe, le témoin civil, l’agent de patrouille et son rapport, le scellé n° 4 sont des personnages et des objets inventés pour ce scénario.',
      'L’irrégularité I03 — Rodriguez ayant consulté le dossier avant d’y être habilité — est une invention de scénario.',
      'La date d’installation de Rodriguez aux affaires internes est fixée avant J1 ; la durée réelle de son infiltration est peu documentée par le canon.',
      'Darryl Morris en fin de saison 1 est une hypothèse de conception marquée : la bibliothèque ne le documente qu’à partir de S02E05. Si une vérification l’infirme, la carte se remplace par un autre inspecteur du service sans toucher aux routes.',
      'Aucun épisode n’est reproduit : l’histoire est originale. S01E22 documente Rodriguez et Tempus, jamais un déroulement imposé.'
    ]
  },
  doctrine: [
    'Histoire originale de saison 1, entre S01E21 (Love Hurts) et S01E22 (Déjà Vu All Over Again). Andy sait déjà le secret des sœurs (S01E20) : aucune branche ne consiste à le lui apprendre. Sa position tient à ce qu’il a choisi en S01E21 — perdre temporairement son accès plutôt que livrer le secret — et c’est le moteur même de C4.',
    'Tempus est hors plateau. Le pouvoir temporel de S01E22 vient de l’allié de Rodriguez, jamais de lui : aucune reprise, aucune boucle, aucune réécriture de journée, pour aucun camp, sous aucun prétexte.',
    'Rodriguez dispose d’attaques d’énergie (canon). Elles existent et sont réelles, mais ne sont pas son jeu ordinaire : sa position tient par sa couverture, et les employer là où quelqu’un peut le constater détruit ce qui lui donne accès à tout le reste.',
    'Démasquer Rodriguez ne fait gagner personne. Aucune des quatre conditions ne dépend de son identité, et verser un tel constat à la procédure satisferait C2 pour l’adversaire. La formulation même de l’objectif du joueur porte le piège.',
    'Le pivot de toute la partie est la distinction entre une trace et une consignation : un fait vu par quelqu’un ne satisfait C2 que lorsqu’il est versé à la procédure. Une trace a besoin d’un témoin, d’un registre ou d’un document réel ; elle n’est jamais automatique.',
    'C1 est matériel (l’objet, pas une copie) ; C2 est procédural (versé, pas seulement constaté) ; C3 est nominatif et lié (le lien entre la sœur et les affaires, pas seulement un nom ou une affaire inexplicable pris séparément) ; C4 porte sur l’accès d’Andy à l’enquête, pas sur sa vie — sa mort relèverait de l’attaque, jamais d’une clé de voie principale.',
    'Le camp d’Andy n’est pas un camp faible : un dossier, un registre, un rapport de légiste et un témoin sont des moyens entiers au même titre qu’une contribution magique, et ne doivent pas être jugés plus sévèrement à cause de leur caractère ordinaire.',
    'Le camp en maintien (Andy) a une marche active, pas seulement des verrous : ses deux routes construisent une conservation et une irrégularité qui n’existent pas au jour 1. La procédure avance d’elle-même et travaille contre lui — c’est la contrepartie assumée de commencer vrai.',
    'Employer Prue est permis et coûte : sa télékinésie est un moyen réel, jamais refusé au motif du risque. L’arbitre constate ce que l’acte laisse derrière lui, et seulement s’il y avait réellement quelqu’un ou quelque chose pour l’enregistrer — pas de trace automatique.',
    'Une pièce engagée dans une contribution d’Andy relève du verrou, jamais de l’attaque, quel que soit le vocabulaire employé : l’attaque ne concerne que la neutralisation d’une personne ou la prise ou destruction d’une ressource libre en main adverse. C1 se joue au verrou ou à la clé.',
    'Le refus de Darryl est jouable et cohérent, jamais une trahison ni un consentement supposé à une mise en danger. Le capitaine n’appartient à personne : Andy peut s’adresser à lui comme Rodriguez peut le mobiliser.',
    'Une suspension d’Andy retire l’accès à l’enquête (C4) et rien de plus : Darryl, le légiste, le témoin et Prue restent des personnes, et ce qu’Andy a déjà établi reste acquis.',
    'Les ressources distribuées sont des moyens et jamais des solutions : aucune condition d’objectif ne peut être établie par l’emploi d’une seule carte conforme à sa description. Les demandes de création prévisibles sont listées dans privateFacts.creations ; une demande absente s’examine normalement selon la Partie 2, §4.5.',
    'Les gestes et déplacements ordinaires sont compris dans l’action. Une localisation non précisée n’est pas une incohérence.'
  ].join(' ')
};
