'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const B=require('./bibliotheque'),C=require('./canon'),R=require('./expertise-runtime');

test('les faits revus possèdent des sources et passent le contrôle après leur épisode',()=>{
 const library=B.read(),ids=new Set(library.sources.map(s=>s.id));
 assert(library.dossiers.flatMap(d=>d.fiches).length>=40);
 for(const f of library.facts){
  assert(f.sources.length&&f.sources.every(s=>ids.has(s)));
  // Un fait de la période est reconnu sans réserve ; hors période il n'est plus
  // opposable comme preuve, mais il ne refuse plus l'action : le verdict se prend
  // sur le plateau et l'incertitude est seulement signalée (règle du 10/09/2026).
  const dans=C.verify({accepted:true,canon:{status:'verified',facts:[f.id]}},{season:f.season,episode:f.episode,moment:'after'});
  assert.equal(dans.accepted,true);assert.equal(dans.canonNote,undefined);
  const hors=C.verify({accepted:true,canon:{status:'verified',facts:[f.id]}},{season:f.season,episode:f.episode,moment:'before'});
  assert.equal(hors.accepted,true);assert.match(hors.canonNote,/situation du plateau/);
 }
});
test('la bibliothèque complète est privée à l’Ange ; pas transmise au camp adverse',()=>{
 const s={canonPeriod:{season:7,episode:17,moment:'after'},campKnowledge:{commanditaire:['secret autorisé']}};
 assert(R.directorContext(s).library.dossiers.length>=2);
 assert.equal(R.opponentContext(s,'commanditaire').library,undefined);
});
test('seule une contradiction appuyée sur une source du corpus refuse',async()=>{
 const connu=C.context({season:1,episode:1,moment:'after'}).facts[0].id;
 const fonde=C.verify({accepted:true,canon:{status:'contradicted',facts:[connu],reason:'Le corpus établit l’inverse.'}},{season:1,episode:1,moment:'after'});
 assert.equal(fonde.accepted,false);
 const sansSource=C.verify({accepted:true,canon:{status:'contradicted',facts:[],reason:'Impression personnelle.'}},{season:1,episode:1,moment:'after'});
 assert.equal(sansSource.accepted,true);
 assert.match(sansSource.canonNote,/non retenue/);
});
test('le brouillon inventorie ressources, objectifs, événements et épisodes sans certifier la recherche',()=>{
 const r=B.preparationReview({resources:[{id:'cristaux',title:'Cristaux'}],goals:[{owner:'phoebe',title:'Livre protégé'}],calendar:[{publicText:'Éclipse'}]},{referencedEpisodes:['S07E17']});
 assert.equal(r.readyToStart,false);assert.equal(r.elements.length,4);assert(r.elements.some(e=>e.id==='episode:S07E17'));
});
