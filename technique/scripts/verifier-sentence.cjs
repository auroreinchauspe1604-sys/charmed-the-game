// Contrôles de conception avant de lancer la partie : pas de carte inutile,
// pas de chemin satisfait par une seule carte, calendrier tenable.
'use strict';
process.env.CHARMED_SCENARIO='sentence-des-fondateurs';
const s=require('../../scenarios/sentence-des-fondateurs/scenario');
const E=require('../serveur/charmed/engine');
let alerte=0;
const dire=(ok,texte)=>{console.log((ok?'  ok   ':'  ALERTE ')+texte);if(!ok)alerte++;};

console.log('« '+s.title+' » — échéance J'+s.finalDay+' | sous-états '+JSON.stringify(s.subgoalSlots)+'\n');

for(const camp of ['phoebe','commanditaire']){
 const mains=s.resources.filter(r=>r.owner===camp);
 const chemins=s.privateFacts.routes.filter(r=>r.camp===camp);
 console.log('-- '+camp+' : '+mains.length+' cartes, '+chemins.length+' chemins --');
 for(const r of mains){
  const usages=chemins.flatMap(c=>c.branches).filter(b=>b.resources.includes(r.id)).length;
  dire(usages>=1,r.id+' : employée dans '+usages+' branche(s)');
 }
 for(const c of chemins){
  dire(c.branches.every(b=>b.resources.length>=2),c.title+' : chaque branche croise au moins deux moyens');
  const cout=c.branches.reduce((n,b)=>n+b.resources.length+1+(b.attack?1:0),1);
  dire(cout<=s.finalDay,c.title+' : tient dans le calendrier ('+cout+' ≤ '+s.finalDay+')');
 }
}

console.log('\n-- objectifs --');
for(const g of s.goals){
 const conditions=g.title.split(/,| et /).filter(x=>x.trim().length>12).length;
 dire(conditions>=4,g.id+' : '+conditions+' conditions distinctes, départ '+(g.initialValue?'VRAI (à maintenir)':'FAUX (à établir)'));
}
dire(s.goals.filter(g=>g.initialValue).length===1,'un objectif commence vrai, l’autre faux');

console.log('\n-- créations anticipées --');
for(const camp of ['phoebe','commanditaire']){
 const liste=s.privateFacts.creations[camp]||[];
 dire(liste.length>=4,camp+' : '+liste.length+' demandes prévues');
 dire(liste.some(c=>c.possible===false),camp+' : au moins un refus anticipé et motivé');
 dire(liste.filter(c=>c.possible).every(c=>c.obtention&&c.limite&&Number.isInteger(c.delai)),camp+' : chaque possibilité a obtention, délai et limite');
}

console.log('\n-- démarrage moteur --');
const etat=E.initial();
dire(etat.nodes.length===2&&etat.day===1&&etat.phase==='player','plateau initial cohérent : '+etat.nodes.length+' objectifs, jour '+etat.day);
dire(etat.resources.every(r=>E.availability(etat,r)==='free'),'toutes les cartes de départ sont disponibles');
console.log('\n'+(alerte?alerte+' ALERTE(S)':'Tout est conforme.'));
