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
test('les connaissances adverses ne reçoivent ni le complot complet ni les fiches de solutions',async()=>{
 let seen,tools;const ia=new Intelligence(async(p,s,o)=>{seen=JSON.parse(p);tools=o.tools;return {message:''};});
 const before=JSON.stringify(E.initial());await ia.opponent(E.initial());
 assert.deepEqual(seen.pointeurs,['regles','plateau','arbitrage','connaissances']);
 assert.equal(seen.reference,undefined);assert.equal(seen.canonReference,undefined);
 assert.deepEqual(tools.find(t=>t.name==='lire').run({pointeur:'connaissances'}).elements,scenario.campKnowledge.commanditaire);
 assert(!JSON.stringify(seen).includes('Futur évitable'));
 assert.equal(JSON.stringify(E.initial()),before);
});
test('l’arbitre reçoit les références sans publier le contexte dans le plateau',async()=>{
 let seen,tools;const ia=new Intelligence(async(p,s,o)=>{seen=JSON.parse(p);tools=o.tools;return {accepted:true,canon:{status:'ordinary',facts:[]}};});
 const s=E.initial();await ia.plan(s,'phoebe',{kind:'resource',text:'Lampe torche'});
 assert(seen.pointeurs.includes('construction'));assert.equal(seen.expertiseContext,undefined);
 assert(tools.find(t=>t.name==='chercher').run({pointeur:'construction',texte:'summon-spirit'}).length);
 assert(!JSON.stringify(E.publicView(s)).includes('director_only'));
});
test('résolution : référence canonique inventée rejetée avant tout résultat',async()=>{
 const ia=new Intelligence(async()=>({canon:{status:'verified',facts:['invented']}}));
 await assert.rejects(ia.resolve(E.initial(),[]),/référence canonique/);
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
 assert.deepEqual(result.unresolved,['À recouper']);assert.equal(prompt.tour.spec.canonPeriod.episode,2);
 draft.finalDay=2;await assert.rejects(ia.prepareBrief({canonPeriod:{season:1}}),/calendrier/);
});
