'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const B=require('./bibliotheque'),C=require('./canon'),R=require('./expertise-runtime');
const {Intelligence}=require('./intelligence-v3');
test('les faits revus possèdent des sources et passent le contrôle après leur épisode',()=>{
 const library=B.read(),ids=new Set(library.sources.map(s=>s.id));
 assert(library.dossiers.flatMap(d=>d.fiches).length>=40);
 for(const f of library.facts){
  assert(f.sources.length&&f.sources.every(s=>ids.has(s)));
  assert.equal(C.verify({accepted:true,canon:{status:'verified',facts:[f.id]}},{season:f.season,episode:f.episode,moment:'after'}).accepted,true);
  assert.equal(C.verify({accepted:true,canon:{status:'verified',facts:[f.id]}},{season:f.season,episode:f.episode,moment:'before'}).accepted,false);
 }
});
test('la bibliothèque complète est privée à l’Ange ; pas transmise au camp adverse',()=>{
 const s={canonPeriod:{season:7,episode:17,moment:'after'},campKnowledge:{commanditaire:['secret autorisé']}};
 assert(R.directorContext(s).library.dossiers.length>=2);
 assert.equal(R.opponentContext(s,'commanditaire').library,undefined);
});
test('une lacune même accompagnée d’un refus ne devient pas une sanction',async()=>{
 const ia=new Intelligence(async()=>({accepted:false,canon:{status:'unverified',facts:[],reason:'Capacité absente du corpus'}}));
 await assert.rejects(ia.judge({demande:'Examiner la réponse'},{}),e=>e.code==='CHARMED_MANUAL_REVIEW');
});
test('un refus motivé sans lacune conserve la règle de réponse unique',async()=>{
 const result={accepted:false,reason:'Moyen sans rapport',canon:{status:'ordinary',facts:[],reason:'Situation ordinaire'}};
 const ia=new Intelligence(async()=>result);assert.deepEqual(await ia.judge({demande:'Examiner la proposition'},{}),result);
});
test('le brouillon inventorie ressources, objectifs, événements et épisodes sans certifier la recherche',()=>{
 const r=B.preparationReview({resources:[{id:'cristaux',title:'Cristaux'}],goals:[{owner:'phoebe',title:'Livre protégé'}],calendar:[{publicText:'Éclipse'}]},{referencedEpisodes:['S07E17']});
 assert.equal(r.readyToStart,false);assert.equal(r.elements.length,4);assert(r.elements.some(e=>e.id==='episode:S07E17'));
});
