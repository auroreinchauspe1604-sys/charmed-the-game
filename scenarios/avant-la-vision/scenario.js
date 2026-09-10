"use strict";
const preparation = require('./avant-la-vision-mecanique.json');
const resources = [
  ['phoebe','Phoebe Halliwell','🔮','personnage','Prémonitions liées à Phoebe, enquête et dialogue. Saison 1 : pas de lévitation, empathie, télékinésie ou pouvoir offensif inventé. Une vision n’est pas une réponse garantie à volonté.'],
  ['nina','Nina','👩','personnage','Amie d’Élise : témoigner, avertir, accompagner. Ne connaît pas le commanditaire.'],
  ['jules','Jules','🚕','personnage','Chauffeur : conduire à une destination connue et accessible.'],
  ['carnet','Carnet de la vision','📓','objet','Notes de la vision initiale, pas un pouvoir autonome.'],
  ['dossier-reception','Invitation d’Élise','✉️','objet','Invitation matérielle dans le sac d’Élise, destinée à la réception annoncée. Consultable avec son accord. Son contenu n’a pas encore été lu par Phoebe ; ce document ne contient ni la solution de l’enquête ni des renseignements inventés.'],
  ['refuge','Chambre chez Nina','🏠','lieu','Refuge matériel ; Élise doit accepter d’y aller. Aucun bouclier magique.'],
  ['commanditaire','Le commanditaire','🎭','personnage','Humain original, sans pouvoir magique. Cherche la mort d’Élise.'],
  ['intermediaire','Intermédiaire','🧥','personnage','Transmet une convocation et cherche des renseignements par des moyens ordinaires.'],
  ['gardien','Gardien','👁️','personnage','Surveille un accès précis de la galerie. Ne surveille pas toute la ville.'],
  ['convocation','Convocation','📨','objet','Moyen de rendez-vous ; n’oblige pas Élise à se déplacer.'],
  ['acces-galerie','Accès à la galerie','🗝️','objet','Accès matériel détenu par le camp adverse.'],
].map(([id,title,icon,category,description],i)=>({id,title,icon,category,description,owner:i<6?'phoebe':'commanditaire',availableDay:1,preparation:false,heldBy:null,lost:false,consumed:false}));
module.exports = {
 canonPeriod:{season:1,episode:null,moment:null},
 campKnowledge:{commanditaire:[
  'Je suis le commanditaire humain du complot contre Élise Moreau, assistante ayant conservé une copie compromettante.',
  'Je connais la Galerie des Arcades et mes moyens : intermédiaire, gardien, convocation et accès à la galerie.',
  'Je cherche la mort d’Élise ; détruire la copie ne suffit pas à mon objectif.',
  'Mes complices et moi n’avons pas de pouvoirs magiques. Une convocation n’oblige pas Élise à venir.'
 ]},
 id:preparation.id,title:preparation.title,period:preparation.period,finalDay:12,subgoalSlots:require('../../technique/serveur/charmed/gameplay').evaluate(require('./avant-la-vision-gameplay.json'),resources,12),
 camps:[{id:'phoebe',name:'Phoebe Halliwell',icon:'🔮'},{id:'commanditaire',name:'Le commanditaire',icon:'🎭'}],
 resources:[...resources,{id:'elise',title:'Élise Moreau',icon:'🧣',category:'personnage',owner:'phoebe',description:'Innocente à protéger. Elle peut être visée, mais ne peut pas être engagée comme un moyen sans une action établissant son accord.',availableDay:1,preparation:false,heldBy:null,lost:false,consumed:false,subject:true}],
 opening:'En ramassant le foulard d’Élise Moreau, Phoebe voit une verrière étoilée, un rideau rouge et une enveloppe ouverte. « Tu n’aurais pas dû garder la copie. » Puis le bruit du verre. Élise a dans son sac une invitation à une réception prévue dans onze jours ; Phoebe ne l’a pas encore consultée. La vision cesse : Élise est devant toi, vivante. Tu ignores le lieu exact et qui lui veut du mal.',
 goals:[{id:'root-phoebe',owner:'phoebe',title:'Élise est vivante et la tentative de meurtre annoncée est empêchée au plus tard au matin du jour 12.'},{id:'root-commanditaire',owner:'commanditaire',title:'Élise est morte au plus tard au matin du jour 12.'}],
 calendar:preparation.events.filter(e=>e.morning>1&&e.public).map(e=>({...e,id:'event-'+e.morning,title:({3:'Programme de la réception',5:'Liste des prestataires',8:'Convocation éventuelle d’Élise',12:'Échéance de la vision'})[e.morning],balance:({3:'occasion commune',5:'occasion commune',8:'avantage adverse conditionnel',12:'contrainte commune'})[e.morning],impacts:({3:{phoebe:'Recouper les indices avec le programme public.',commanditaire:'Adapter ses préparatifs aux horaires annoncés.'},5:{phoebe:'Trouver des interlocuteurs et vérifier une piste.',commanditaire:'Repérer les intervenants autour de son accès.'},8:{phoebe:'Un rendez-vous peut exposer Élise ; les protections déjà acquises gardent leur effet.',commanditaire:'Un moyen de rendez-vous peut devenir opérant si sa convocation a été préparée.'},12:{phoebe:'La survie et l’empêchement doivent être effectivement établis.',commanditaire:'L’objectif doit être obtenu avant la clôture ; la vision ne tue personne automatiquement.'}})[e.morning]})),
 privateFacts:preparation.world_facts_for_director,
 doctrine:'Aventure originale saison 1. Les nouveaux personnages sont humains. Canon vérifié partiellement par les synopsis Peacock/Prime saison 1 ; ne pas inventer un sort ou un pouvoir manquant. Toute capacité non établie doit être refusée en indiquant la vérification nécessaire. Pas de solution unique imposée. Sous-objectifs à inventer dans le nombre fixe d’emplacements annoncé par la partie. Les préparations ne produisent aucun résultat rétroactif. Les outils usuels ne sont pas des pièces artificielles. Une ressource identique peut être recréée si les moyens existent, jamais un personnage dupliqué.',
};

// Public distribution is deterministic, separate from a key or a factual proof.
const programme=module.exports.calendar.find(e=>e.morning===3);
programme.effect='Le programme public est publié : un exemplaire distinct rejoint automatiquement chaque main. Son existence ne révèle pas les renseignements du document à un personnage.';
programme.grants=[{id:'programme',title:'Programme public de la réception',category:'objet',icon:'📄',description:'Exemplaire du programme publié. Il contient les horaires publics de la réception ; il ne révèle pas le lieu privé ni l’identité du meurtrier. Son contenu doit être exploité par une contribution pertinente.'}];
