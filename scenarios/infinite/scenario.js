'use strict';
// Infinite — partie sans échéance qui commence au début de la série.
//
// Les vagues sont tirées du bestiaire documenté (demons-documentes.json), dans
// l'ordre chronologique des épisodes repères. Quand plus aucun personnage adverse
// n'est vivant au matin, la vague est vaincue et la suivante apparaît. La période
// canonique de l'arbitrage suit la vague atteinte. Le bestiaire épuisé termine la
// partie par une victoire du joueur.
const dossier=require('../../Charmed/canon/contributions-integrees/demons-documentes.json');
const episodes=require('../../Charmed/canon/episodes-index.json').episodes;

const strip=text=>(text||'').replace(/\s*\[[^\]]*\]/g,'').trim();
const parse=id=>{const m=/^S(\d\d)E(\d\d)$/.exec(id);return m?{season:+m[1],episode:+m[2]}:null;};
const excluded=new Set(['demons-documentes:drake','demons-documentes:belthazor','demons-documentes:brotherhood-thorn']);

const waves=dossier.fiches
 .filter(f=>!excluded.has(f.id)&&f.episodesReperes?.length)
 .map(f=>{
  const first=f.episodesReperes.map(parse).filter(Boolean).sort((a,b)=>a.season-b.season||a.episode-b.episode)[0];
  const id=f.id.split(':').pop(),name=f.titre.split(' / ')[0].trim();
  const description=[strip(f.descriptionCarteProposee)||name,strip(f.canon?.powers),strip(f.canon?.conditions)].filter(Boolean).join(' ');
  return {id,name,title:f.titre,season:first.season,episode:first.episode,period:{season:first.season,episode:first.episode,moment:'after'},
   resources:[
    {id,title:name,category:'personnage',icon:'◆',description,unique:true,canonicalId:id},
    {id:id+'-repaire',title:'Repaire de '+name,category:'lieu',icon:'⌂',description:'Lieu tenu par l’adversaire, hors du manoir. On y prépare et on y décide ; aucune voie directe ne le relie au manoir.'}
   ],
   goal:{shortTitle:name+' triomphe',title:name+' a tué l’une des sœurs Halliwell ou s’est emparé du Livre des Ombres, et demeure vivant et libre.'},
   knowledge:[
    'Je suis '+name+'. '+strip(f.canon?.role),
    'Mes moyens : '+strip(f.canon?.powers)+(f.canon?.conditions?' Conditions : '+strip(f.canon.conditions):''),
    'Mon caractère : '+strip(f.canon?.psychology),
    'Mon objectif : tuer l’une des sœurs Halliwell ou m’emparer du Livre des Ombres, et rester vivant et libre. Je déclare, prépare et résous mes coups selon les règles ; mes moyens sont ceux de ma carte.',
    'Repère canonique : '+f.episodesReperes.join(', ')+'. Cette partie est une aventure originale ; les événements de l’épisode ne sont pas prédéterminés.'
   ],
   announcement:'Nouvelle menace : '+name+'. '+(strip(f.descriptionCarteProposee)||'')+' Les Fondateurs ne connaissent ni ses plans ni sa position exacte.'
  };
 })
 .filter(w=>episodes.some(e=>e.season===w.season&&e.episode===w.episode))
 .sort((a,b)=>a.season-b.season||a.episode-b.episode||a.id.localeCompare(b.id));

// Transitions appliquées au premier matin où une vague de la saison indiquée apparaît.
const transitions=[
 {season:2,message:'Leo Wyatt se révèle comme l’Être de lumière des sœurs et rejoint leur camp.',
  arrivals:[{id:'leo',title:'Leo Wyatt',category:'personnage',icon:'✦',description:'Être de lumière des sœurs : déplacement par orbes, transport accompagné et guérison dans les limites de sa fonction. Vulnérable au poison des Êtres des ténèbres. Sa disponibilité n’est jamais garantie.',unique:true,canonicalId:'leo'}]},
 {season:4,message:'Transition de la saison 4 : Prue Halliwell disparaît de la partie, comme dans la série. Paige Matthews, demi-sœur, rejoint Piper et Phoebe ; le Pouvoir des Trois se reforme avec elle.',
  departures:['prue'],
  arrivals:[{id:'paige',title:'Paige Matthews',category:'personnage',icon:'✦',description:'Demi-sœur des Halliwell, sorcière et Être de lumière : éclipse par orbes et déplacement d’objets par orbes, avec présence, cible et destination accessibles. Pas de guérison autonome.',unique:true,canonicalId:'paige'}],
  facts:['Prue Halliwell n’est plus dans la partie depuis la transition de la saison 4. Paige Matthews complète le Pouvoir des Trois.']}
];

const card=([id,title,icon,category,description])=>({id,title,icon,category,description,owner:'phoebe',availableDay:1,preparation:false,heldBy:null,lost:false,consumed:false,unique:category==='personnage'||id==='livre',canonicalId:id});
const sisters=[
 ['prue','Prue Halliwell','✦','personnage','Sœur aînée. Télékinésie liée à son regard et à ses gestes, dans les limites de sa portée. Ses autres pouvoirs viennent plus tard, selon la période atteinte.'],
 ['piper','Piper Halliwell','✦','personnage','Fige ce qu’elle voit, dans les limites de sa portée. Le pouvoir explosif n’apparaît qu’en saison 3 ; le MJ vérifie la période atteinte.'],
 ['phoebe','Phoebe Halliwell','✦','personnage','Prémonitions déclenchées par un contact pertinent ; sens de l’enquête. Lévitation et empathie n’apparaissent que plus tard, selon la période atteinte.'],
 ['livre','Livre des Ombres','📖','objet','Grimoire familial unique, au grenier. Contient connaissances, formules et recettes ; il faut le consulter et une consultation prend du temps. Aucun sort exécuté automatiquement.'],
 ['grenier','Grenier du manoir','⌂','lieu','Pièce du manoir tenue par les sœurs. Espace de recherche et de préparation ; aucune protection automatique contre toute intrusion.'],
 ['materiel','Matériel de potion','⚗️','objet','Mortier, fioles et ustensiles. Permet de préparer une potion avec une recette et des ingrédients ; ne produit rien à lui seul.']
];
const enemy=r=>({...r,owner:'commanditaire',availableDay:1,preparation:false,heldBy:null,lost:false,consumed:false});
const first=waves[0];

module.exports={
 id:'infinite',title:'Infinite',period:'De la saison 1 à la saison 8, dans l’ordre des menaces documentées. Aventure originale sans échéance.',
 canonPeriod:first.period,
 periodFor:s=>s?.infinite?.period||first.period,
 finalDay:Infinity,
 resources:[...sisters.map(card),...first.resources.map(enemy)],
 subgoalSlots:{phoebe:3,commanditaire:3},
 camps:[{id:'phoebe',name:'Les sœurs Halliwell',icon:'✦'},{id:'commanditaire',name:first.name,icon:'◆'}],
 opponentRole:'L’adversaire de la vague en cours ; son identité, ses moyens et son caractère sont dans ses connaissances de camp.',
 goals:[
  {id:'root-phoebe',owner:'phoebe',shortTitle:'Les sœurs tiennent',initialValue:true,title:'Les sœurs Halliwell présentes dans la partie sont vivantes et libres, et le Livre des Ombres reste sous leur garde.'},
  {id:'root-commanditaire-1',owner:'commanditaire',initialValue:false,...first.goal}
 ],
 initialFacts:['Prue, Piper et Phoebe viennent de découvrir leurs pouvoirs et le Livre des Ombres. Elles vivent au manoir Halliwell.','Le Livre des Ombres est au grenier, sous la garde des sœurs.','Aucune protection magique n’est active. Les sœurs ne connaissent pas encore les menaces qui les visent.'],
 opening:'Le grenier sent la poussière et la cire. Le Livre des Ombres est ouvert sur une page que personne n’a choisie. Prue, Piper et Phoebe viennent de comprendre ce qu’elles sont. Dehors, la ville ne sait rien. Les menaces viendront l’une après l’autre, dans l’ordre où la lignée les a rencontrées ; chaque fois que l’une tombe, une autre se lève. Il n’y a pas d’échéance : tenez. Vous contrôlez les sœurs, le Livre, le grenier et le matériel de potion. Votre état initial est VRAI et doit le rester.',
 calendar:[],
 campKnowledge:{commanditaire:['Je suis l’adversaire de la vague en cours ; mon identité et mes moyens sont décrits dans mes connaissances de vague et sur ma carte.','Les sœurs disposent du manoir, du Livre des Ombres et de leurs pouvoirs de la période atteinte. Je ne connais ni leurs projets ni leurs préparatifs.']},
 privateFacts:{documents:{},inventions:['Partie infinie sans échéance : les menaces documentées se succèdent dans l’ordre des épisodes repères.','Repaire propre à chaque vague, hors du manoir.','Arrivées de Leo (saison 2) et de Paige (saison 4) ; départ de Prue à la saison 4.']},
 doctrine:'Partie infinie originale qui traverse les saisons. Le repère canonique de chaque vague sert aux capacités, jamais à imposer les événements de l’épisode. Les pouvoirs des sœurs suivent la période atteinte : vérifier avant d’accorder un pouvoir apparu plus tard. Une vague est vaincue quand plus aucun personnage adverse n’est vivant ; le moteur constate ce fait au matin et fait apparaître la menace suivante. Aucune potion générique ne tue un démon puissant ; aucune recette imposée. Un démon vaincu ne revient pas dans la même vague. Le joueur ne gagne pas une vague par déclaration : la mort ou la neutralisation durable doit être un fait établi par une attaque ou une clé résolue.',
 infinite:{
  waves,transitions,
  initial:()=>({index:0,wave:{id:first.id,name:first.name,title:first.title,season:first.season,episode:first.episode},period:first.period,season:first.season,cleared:[],knowledge:first.knowledge,total:waves.length})
 }
};
