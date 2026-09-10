'use strict';

const base=require('../manoir-assiege-souple/scenario');

const event=(morning,title,effect,balance,grants)=>({
 id:'nexus-tension-j'+morning,
 morning,
 title,
 effect,
 public:true,
 balance,
 impacts:{phoebe:effect,commanditaire:effect},
 ...(grants?{grants}:{})
});

const accessResource={
 id:'acces-manoir',
 title:'Accès du manoir',
 category:'lieu',
 description:'Entrées et circulations stratégiques du manoir actuellement contrôlées par les agents de Zankou.',
 icon:'⌂',
 owner:'commanditaire',
 availableDay:1,
 heldBy:null,
 lost:false,
 consumed:false,
 unique:false,
 preparation:false
};

const resources=[...base.resources.map(resource=>({...resource})),accessResource];

const goals=[
 {
  id:'root-phoebe',
  owner:'phoebe',
  shortTitle:'Le manoir reconquis',
  initialValue:false,
  title:'Avant le matin du jour 14, les sœurs reprennent le contrôle effectif des accès et des circulations du manoir, peuvent de nouveau intervenir librement entre le grenier et le sous-sol, conservent le Livre des Ombres et empêchent Zankou d’établir une emprise sur le Nexus.'
 },
 {
  id:'root-commanditaire',
  owner:'commanditaire',
  shortTitle:'L’emprise maintenue',
  initialValue:true,
  title:'Jusqu’au matin du jour 14, Zankou maintient le contrôle des accès et des circulations stratégiques du manoir, empêche les sœurs d’y intervenir librement et conserve une voie effective vers le sous-sol sans que son contrôle du Nexus soit présumé.'
 }
];

const branch=(condition,contribution,resources)=>({condition,contribution,resources,attack:false});
const routes=[
 {camp:'phoebe',title:'Reconquête progressive',sufficiency:'Rétablir des possibilités réelles de déplacement et d’intervention, puis faire tomber l’emprise adverse sur les accès déterminants.',branches:[branch('Les sœurs peuvent quitter leur refuge sans être immédiatement bloquées.','Un moyen de déplacement ou de protection effectivement établi.',['paige','grenier']),branch('Un accès stratégique n’est plus tenu par les agents de Zankou.','Intervention située contre le moyen qui soutient ce contrôle.',['piper','cristaux']),branch('Le passage vers le sous-sol redevient praticable pour les sœurs.','Accès rétabli sans présumer le contrôle du Nexus.',['phoebe','sous-sol'])]},
 {camp:'phoebe',title:'Rupture de l’emprise',sufficiency:'Identifier ce qui rend le contrôle adverse effectif, neutraliser ou contourner ce soutien et préserver le Livre pendant la reconquête.',branches:[branch('Le dispositif qui soutient l’emprise de Zankou est identifié.','Enquête à partir des faits accessibles.',['phoebe']),branch('Les sœurs disposent d’une réponse coordonnée.','Moyens compatibles et réellement disponibles.',['piper','paige'])]},
 {camp:'commanditaire',title:'Maintien des accès',sufficiency:'Conserver une présence et des moyens effectifs sur les accès stratégiques ; la simple présence initiale ne garantit pas le maintien jusqu’au jour 14.',branches:[branch('Les déplacements des sœurs restent limités par un moyen concret.','Surveillance ou obstruction située.',['guetteur','acces-manoir']),branch('Une tentative de reconquête peut être contrée.','Moyen disponible et adapté à la tentative réelle.',['eclaireur','outils']),branch('La voie vers le sous-sol demeure exploitable par le camp adverse.','Présence et coordination encore effectives.',['zankou'])]},
 {camp:'commanditaire',title:'Pression intérieure',sufficiency:'Renforcer l’emprise sans présumer la capture du Livre, la neutralisation des sœurs ou le contrôle du Nexus.',branches:[branch('Un point stratégique du manoir reste occupé.','Occupation concrète et défendable.',['eclaireur','acces-manoir']),branch('Les sœurs ne peuvent pas coordonner librement leur intervention.','Obstacle établi dans la situation du plateau.',['zankou','message'])]}
];

const calendar=[
 event(3,'Plan de circulation du quartier','La mairie publie un plan temporaire de circulation. Chaque camp en reçoit un exemplaire. Il décrit uniquement les rues et accès publics du quartier.','occasion commune',[{id:'plan-quartier',title:'Plan du quartier',icon:'📄',category:'information',description:'Plan public des rues et passages extérieurs du quartier. Il ne révèle aucun accès intérieur du manoir.'}]),
 event(5,'Orage sur San Francisco','Un orage violent réduit la visibilité extérieure et perturbe momentanément l’électricité. Il ne supprime aucun pouvoir magique et n’ouvre aucun passage dans le manoir.','contrainte commune'),
 event(7,'Retour au calme','La visibilité et l’alimentation électrique redeviennent normales. Les conséquences déjà acquises restent en place.','occasion commune'),
 event(9,'Inspection de voirie','Des agents municipaux examinent les installations publiques devant le pâté de maisons. Ils n’entrent dans aucune propriété privée et n’accordent aucun accès automatique au manoir.','contrainte commune'),
 event(11,'Rue dégagée','Les installations municipales sont retirées et les déplacements extérieurs redeviennent ordinaires. Aucun dispositif endommagé ne se répare automatiquement.','occasion commune'),
 event(14,'Fin de l’épreuve','L’Ange du destin examine l’état réel du manoir, du sous-sol, du Livre des Ombres et du Nexus. Aucun camp ne gagne sur une simple intention.','échéance commune')
];

module.exports={
 ...base,
 id:'nexus-sous-tension',
 title:'Le Nexus sous tension',
 resources,
 subgoalSlots:require('../../technique/serveur/charmed/gameplay').evaluate({routes},resources,14),
 goals,
 initialFacts:[
  'Zankou contrôle les entrées et les circulations stratégiques du manoir grâce à des agents présents sur place.',
  'Piper, Phoebe et Paige sont vivantes et libres, mais retranchées dans le grenier avec le Livre des Ombres.',
  'Les sœurs ne peuvent pas circuler librement entre le grenier, le rez-de-chaussée et le sous-sol au début de la partie.',
  'Le passage vers le sous-sol est sous la surveillance du camp de Zankou, mais aucun contrôle du Nexus n’est acquis.',
  'Le Livre des Ombres est intact et reste sous la garde des sœurs.',
  'Zankou ne détient aucun pouvoir volé aux sœurs.'
 ],
 opening:'Pendant la nuit, les agents de Zankou prennent les entrées et les circulations stratégiques du manoir. Piper, Phoebe et Paige ont réussi à se regrouper dans le grenier avec le Livre des Ombres. Elles sont vivantes et libres, mais elles ne peuvent plus circuler normalement vers le rez-de-chaussée ou le sous-sol. Zankou contrôle le manoir au sens stratégique : il tient les accès et limite leurs interventions. Il ne possède ni le Livre, ni le Nexus, ni les pouvoirs des sœurs. Votre état initial est FAUX : vous devez reconquérir le manoir avant le matin du jour 14. Trois emplacements de sous-états sont disponibles ; aucune solution ne vous est imposée.',
 calendar,
 campKnowledge:{commanditaire:['Je suis Zankou et mes agents contrôlent au départ les accès et les circulations stratégiques du manoir.','Les trois sœurs sont retranchées dans le grenier avec le Livre des Ombres ; elles sont libres et peuvent organiser une reconquête.','Je ne possède ni le Livre des Ombres, ni le Nexus, ni les pouvoirs des sœurs.','Mon contrôle initial doit être soutenu par des moyens concrets sur le plateau ; il ne rend pas automatiquement toute intervention des sœurs impossible.','Je connais mes ressources et les faits publics du plateau, sans recevoir les justifications privées du joueur ni une solution à ses futures actions.']},
 privateFacts:{
  ...base.privateFacts,
  routes,
  documents:{
   ...base.privateFacts.documents,
   'Plan du quartier':'Plan public des rues, trottoirs et passages extérieurs du quartier. Il ne décrit ni l’intérieur du manoir, ni ses protections, ni le sous-sol.'
  },
  inventions:[
   'Prise nocturne des accès du manoir et nouveau calendrier civil fictifs.',
   'Le contrôle initial de Zankou concerne les accès et les circulations stratégiques ; il ne vaut ni possession du Livre, ni contrôle du Nexus.',
   'Léo et les enfants sont à l’abri hors du manoir dans cette ouverture ; ils ne sont ni captifs ni ressources initiales.'
  ]
 },
 doctrine:base.doctrine+' Cette partie est un nouveau départ indépendant : aucune action, question, réponse, connaissance tactique ou conséquence de la partie manoir-assiege-souple ne doit être reprise. Zankou contrôle initialement les accès et circulations stratégiques du manoir, mais il ne possède ni le Livre des Ombres ni le Nexus. Les sœurs sont retranchées dans le grenier, vivantes, libres et capables d’agir. Le contrôle d’un accès, la présence dans une pièce, le contrôle du sous-sol et l’emprise sur le Nexus restent quatre faits distincts. Les deux camps doivent établir leurs propres chaînes à partir du plateau actuel.'
};
