'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const library=require('./bibliotheque'),runtime=require('./expertise-runtime'),canon=require('./canon');
const engine=require('./engine');
test('les quatre dossiers spécialisés sont effectivement injectés avec leurs sources',()=>{
 const d=runtime.directorContext({canonPeriod:{season:7,episode:17,moment:'after'}});
 assert.equal(d.characters.length,40);
 for(const id of ['lieux','objets','potions-types-usages','balthazar-cole-allie']){
  const lot=d.library.dossiers.find(x=>x.id===id);assert(lot?.fiches.length>0);assert(Object.keys(lot.sources).length>0);
  assert(lot.fiches.every(f=>!f.canon.includes('## 6.')));
 }
 const cole=d.characters.find(c=>c.id==='cole');assert(cole.documentedFacts.some(f=>f.episode==='S05E07'));
});
test('les nouvelles observations ne rendent pas les pouvoirs futurs disponibles avant leur épisode',()=>{
 const period={season:7,episode:17,moment:'after'},ids=new Set(canon.context(period).facts.map(f=>f.id));
 assert(ids.has('library:potion-repandue'));assert(ids.has('library:nexus-occupation-insuffisante'));
 assert(!ids.has('library:contrib:paige:5'));
 const p=require('../../Charmed/canon/personnages.json');
 assert(!p.milestones.some(m=>m.id.startsWith('contrib:')));
});
test('sources et identifiants des nouveaux faits restent uniques et résolubles',()=>{
 const b=library.read(),sourceIds=new Set(b.sources.map(s=>s.id));assert.equal(sourceIds.size,b.sources.length);
 assert.equal(new Set(b.facts.map(f=>f.id)).size,b.facts.length);
 for(const f of b.facts)assert(f.sources.every(s=>sourceIds.has(s)),f.id);
});

test('lots terminés objets et démons accessibles uniquement à la direction',()=>{const d=runtime.directorContext({canonPeriod:{season:7,episode:17,moment:'after'}});for(const [id,count] of [['objets-magiques',80],['demons-documentes',40]]){const lot=d.library.dossiers.find(x=>x.id===id);assert.equal(lot.fiches.length,count);for(const f of lot.fiches){assert(f.sources.every(ref=>lot.sources[ref]));assert(f.limitesEtIncertitudes);}}assert.equal(runtime.opponentContext({canonPeriod:{season:7,episode:17,moment:'after'}},'commanditaire').library,undefined);});
