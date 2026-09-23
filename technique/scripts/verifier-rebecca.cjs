'use strict';
process.env.CHARMED_SCENARIO='le-proces-de-rebecca-warren';
const s=require('../serveur/charmed/scenario');
const E=require('../serveur/charmed/engine');
let alerte=0;
const dire=(ok,t)=>{console.log((ok?'  ok     ':'  ALERTE ')+t);if(!ok)alerte++;};

console.log('« '+s.title+' » — '+s.period+' — echeance J'+s.finalDay+' | sous-etats '+JSON.stringify(s.subgoalSlots)+'\n');

console.log('-- contrat de module --');
for(const c of ['id','title','period','canonPeriod','finalDay','resources','subgoalSlots','camps','opponentRole','goals','initialFacts','opening','calendar','campKnowledge','privateFacts','doctrine'])
  dire(s[c]!==undefined,'champ present : '+c);
dire(typeof s.doctrine==='string'&&s.doctrine.length>400,'doctrine ('+s.doctrine.length+' car.)');
dire(s.camps.length===2&&s.camps.every(c=>c.id&&c.name&&c.icon),'deux camps nommes avec icone');
dire(!s.camps.some(c=>/^phoebe$|^commanditaire$/.test(c.name)),'aucun camp affiche sous son identifiant technique');

console.log('\n-- cartes --');
const ids=s.resources.map(r=>r.id);
dire(new Set(ids).size===ids.length,'aucun identifiant en double');
dire(new Set(s.resources.map(r=>r.title)).size===s.resources.length,'aucun titre en double');
for(const camp of ['phoebe','commanditaire']){
  const m=s.resources.filter(r=>r.owner===camp);
  dire(m.length===8,camp+' : huit cartes en main propre ('+m.length+')');
}
dire(!s.resources.some(r=>r.owner===null),'aucune carte commune : deux mains separees');
dire(s.resources.every(r=>!r.heldBy&&!r.lost&&!r.consumed),'aucune carte engagee ou perdue au depart');
dire(s.resources.every(r=>r.availableDay>=1&&r.availableDay<s.finalDay),'toutes les cartes arrivent avant l echeance');
for(const [id,j] of [['deposition-hannah',3],['carnet-du-geolier',7]])
  dire(s.resources.find(r=>r.id===id)?.availableDay===j,id+' disponible au jour '+j);

console.log('\n-- chemins --');
const toutes=s.privateFacts.routes.flatMap(c=>c.branches);
for(const r of s.resources)
  dire(toutes.filter(b=>b.resources.includes(r.id)).length>=1,r.id+' : employee dans '+toutes.filter(b=>b.resources.includes(r.id)).length+' branche(s)');
for(const camp of ['phoebe','commanditaire']){
  const ch=s.privateFacts.routes.filter(r=>r.camp===camp);
  dire(ch.length>=2,camp+' : '+ch.length+' chemins');
  for(const c of ch){
    dire(!!c.sufficiency&&c.branches.length>=2,c.title+' : suffisance et au moins deux branches');
    dire(c.branches.every(b=>b.resources.length>=2),c.title+' : chaque branche croise au moins deux moyens');
    dire(c.branches.every(b=>new Set(b.resources).size===b.resources.length),c.title+' : aucune ressource repetee dans une branche');
    dire(c.branches.every(b=>b.resources.every(id=>ids.includes(id))),c.title+' : toutes les ressources existent');
    dire(c.branches.every(b=>!!b.condition&&!!b.contribution),c.title+' : condition et contribution partout');
    const cout=c.branches.reduce((n,b)=>n+b.resources.length+1+(b.attack?1:0),1);
    dire(cout<=s.finalDay,c.title+' : tient dans le calendrier ('+cout+' <= '+s.finalDay+')');
  }
}
dire(s.privateFacts.routes.every(c=>c.branches.every(b=>b.resources.every(id=>s.resources.some(r=>r.id===id&&r.owner===c.camp)))),
  'chaque camp ne s appuie que sur ses propres cartes');

console.log('\n-- objectifs et calendrier --');
dire(s.goals.every(g=>g.initialValue===false),'les deux camps partent FAUX');
dire(s.goals.every(g=>!!g.shortTitle&&!!g.owner),'shortTitle et owner renseignes');
dire(s.calendar.every(e=>e.morning>=1&&e.morning<=s.finalDay),'evenements entre J1 et J'+s.finalDay);
dire(new Set(s.calendar.map(e=>e.id)).size===s.calendar.length,'aucun identifiant d evenement en double');
for(const j of [2,3,5,7,8,10,12]) dire(s.calendar.some(e=>e.morning===j),'evenement au matin du jour '+j);
dire(s.calendar.some(e=>e.morning===s.finalDay),'un constat au matin de l echeance');

console.log('\n-- etancheite du secret --');
const joueur=[s.opening,...s.initialFacts,...(s.campKnowledge.phoebe||[]),...s.resources.map(r=>r.description)].join(' ').toLowerCase();
for(const mot of ['karuvax','warlock','thorne est','demon de la course','athame'])
  dire(!joueur.includes(mot),'le mot « '+mot+' » n apparait pas dans ce que le joueur lit au depart');
const secret=(s.campKnowledge.commanditaire||[]).join(' ').toLowerCase();
for(const mot of ['karuvax','warlock','athame','hannah'])
  dire(secret.includes(mot),'le secret de l adversaire contient « '+mot+' »');

console.log('\n-- demarrage moteur --');
const etat=E.initial();
dire(etat.nodes.length===2&&etat.day===1&&etat.phase==='player','plateau initial coherent');
dire(etat.resources.length===16,'seize cartes chargees ('+etat.resources.length+')');
dire(etat.resources.filter(r=>r.owner==='phoebe').length===8&&etat.resources.filter(r=>r.owner==='commanditaire').length===8,'huit cartes par camp');
for(const n of etat.nodes) dire(n.goalMode==='achieve'&&n.status==='open',n.id+' : goalMode='+n.goalMode+', status='+n.status);

console.log('\n'+(alerte?alerte+' ALERTE(S)':'Tout est conforme.'));
process.exit(alerte?1:0);
