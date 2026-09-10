'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const R=require('./expertise-runtime'),C=require('./canon'),E=require('./engine');
const scenario=require('./scenario');const {Intelligence}=require('./intelligence-v3');
const has=(p,id)=>C.context(p).facts.some(f=>f.id===id);
test('les 25 fiches de construction ont des sources et des conditions résolubles',()=>assert.deepEqual(R.validateConstruction(),[]));
test('Piper : combustion avant et après acquisition, sans anticipation en saison large',()=>{
 assert(!has({season:3,episode:19,moment:'after'},'character:piper-combustion'));
 assert(!has({season:3,episode:null},'character:piper-combustion'));
 assert(has({season:3,episode:20,moment:'after'},'character:piper-combustion'));
});
test('Phoebe : la privation reste bloquante et seule la prémonition est rétablie',()=>{
 const p={season:7,episode:6,moment:'after'};
 assert(!has(p,'character:phoebe-visions'));assert(!has(p,'character:phoebe-levitation'));
 assert(has(p,'character:phoebe-vision-return'));
 assert(!has(p,'initial-powers'));
});
test('une référence biographique ne permet plus Prue vivante après la transition',()=>{
 assert(!has({season:4,episode:2,moment:'after'},'character:prue-tk'));
});
// Depuis le 10/09/2026 les références ne sont plus injectées dans le message :
// l'accès est déterminé par la fonction appelante, sous forme de pointeurs.
// Ce qui ne figure pas dans la liste des pointeurs n'existe pas pour cet appel.
test('le camp adverse ne dispose que du pointeur de ses connaissances',async()=>{
 let seen;const ia=new Intelligence(async(p)=>{seen=JSON.parse(p);return {moves:[]};});
 const before=JSON.stringify(E.initial());await ia.opponent(E.initial());
 assert.deepEqual(seen.pointeurs.filter(p=>!['regles','plateau','arbitrage'].includes(p)),['connaissances']);
 for(const interdit of ['faits','scenario','bibliotheque','canon'])assert(!seen.pointeurs.includes(interdit),'pointeur interdit : '+interdit);
 assert.equal(seen.reference,undefined);assert.equal(seen.canonReference,undefined);
 assert.equal(seen.knowledge,undefined);assert.equal(seen.expertiseContext,undefined);
 assert(!JSON.stringify(seen).includes('Futur évitable'));
 assert.equal(JSON.stringify(E.initial()),before);
});
test('les connaissances de camp restent bornées au camp',()=>{
 const outils=require('./agent-tools');
 const vu=outils.campDocuments(scenario,'commanditaire').connaissances();
 assert.deepEqual(vu,scenario.campKnowledge.commanditaire);
 assert(!JSON.stringify(vu).includes('Futur évitable'));
});
test('l’arbitre dispose des pointeurs de référence, sans injection ni fuite dans le plateau',async()=>{
 let seen;const ia=new Intelligence(async(p)=>{seen=JSON.parse(p);return {accepted:true,canon:{status:'ordinary',facts:[]}};});
 const s=E.initial();await ia.plan(s,'phoebe',{kind:'resource',text:'Lampe torche'});
 for(const attendu of ['regles','plateau','scenario','faits','canon','bibliotheque','construction'])assert(seen.pointeurs.includes(attendu),'pointeur manquant : '+attendu);
 assert.equal(seen.expertiseContext,undefined);assert.equal(seen.canonReference,undefined);
 assert(seen.appels.some(a=>a.name==='lire'));
 const construction=require('./agent-tools').documents(scenario).construction();
 assert(JSON.stringify(construction).includes('summon-spirit'));
 assert(!JSON.stringify(E.publicView(s)).includes('director_only'));
});
test('résolution : une référence canonique inventée n’interrompt plus la journée',async()=>{
 // Règle du 10/09/2026 : la résolution établit les faits sur la situation du plateau.
 // Une référence imprécise ne fait plus perdre le résultat de la journée.
 const attendu={outcomes:[],states:[],facts:[],fallenLocks:[],victory:[],canon:{status:'verified',facts:['invented']}};
 const ia=new Intelligence(async()=>attendu);
 assert.deepEqual(await ia.resolve(E.initial(),[]),attendu);
});
test('résolution ordinaire garde un audit et reste recevable',async()=>{
 const expected={outcomes:[],states:[],facts:[],fallenLocks:[],victory:[],canon:{status:'ordinary',facts:[],reason:'Aucune magie.'}};
 const ia=new Intelligence(async()=>expected);assert.deepEqual(await ia.resolve(E.initial(),[]),expected);
});
test('préparation : un brouillon ne démarre pas de partie et conserve les incertitudes',async()=>{
 const resources=[{id:'p',owner:'phoebe',title:'P',description:'Moyen'},{id:'c',owner:'commanditaire',title:'C',description:'Moyen'}];
 const routes=['phoebe','commanditaire'].flatMap(c=>[1,2].map(i=>({camp:c,title:'Chemin '+i,sufficiency:'Preuve',branches:[{condition:'Fait acquis',contribution:'Preuve',resources:[c==='phoebe'?'p':'c'],attack:false}]})));
 const draft={title:'Test interne',mode:'original',period:'S1',finalDay:8,goals:[{owner:'phoebe',title:'A est protégé',initialValue:false},{owner:'commanditaire',title:'A est atteint',initialValue:false}],resources,routes,calendar:[],documents:[],campKnowledge:[],canonReferences:[],inventions:[],unresolved:['À recouper']};
 let prompt;const ia=new Intelligence(async(p)=>{prompt=JSON.parse(p);return structuredClone(draft);});
 const result=await ia.prepareBrief({canonPeriod:{season:1,episode:2,moment:'after'}});
 assert.equal(result.status,'draft_not_started');assert.equal(result.requiresReview,true);
 assert.deepEqual(result.unresolved,['À recouper']);
 // La préparation consulte sa propre spécification, jamais les faits d'une partie en cours.
 assert(prompt.pointeurs.includes('specification'));
 assert(!prompt.pointeurs.includes('faits'));
 assert.equal(prompt.spec.canonPeriod.episode,2);
 draft.finalDay=2;await assert.rejects(ia.prepareBrief({canonPeriod:{season:1}}),/calendrier/);
});
