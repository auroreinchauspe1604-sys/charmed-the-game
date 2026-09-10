'use strict';
// Explicit reviewed snapshots only. Never scan or mutate working contribution folders.
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const base=path.resolve(__dirname,'..'),folder=path.join(base,'Charmed/canon/contributions-integrees');
const manifest=JSON.parse(fs.readFileSync(path.join(folder,'manifest.json')));
const episodes=new Set(JSON.parse(fs.readFileSync(path.join(base,'Charmed/canon/episodes-index.json'))).episodes.map(e=>e.id));
for(const [id,source,field] of [
 ['objets-magiques','Charmed/contributions/objets-magiques/objets.proposition.json','fiches'],
 ['demons-documentes','Charmed/contributions/balthazar-cole-allie/demons.proposition.json','demons']
]){
 const raw=fs.readFileSync(path.join(base,source)),input=JSON.parse(raw);
 const sources=Array.isArray(input.sources)?Object.fromEntries(input.sources.map(s=>[s.id,s])):input.sources;
 const ids=new Set();
 const fiches=input[field].map(f=>{
  assert(!ids.has(f.id));ids.add(f.id);
  for(const ref of f.sources||f.sourceIds)assert(sources[ref],id+' missing source '+ref);
  for(const ref of f.episodesReperes||f.episodeRefs)assert(episodes.has(ref),id+' unknown episode '+ref);
  if(field==='fiches')return {id:f.id,titre:f.titre,canon:f.canon,sources:f.sources,episodesReperes:f.episodesReperes,
   limitesEtIncertitudes:f.limitesEtIncertitudes,descriptionCarteProposee:f.descriptionCarteProposee,
   provenanceAjustements:f.provenanceAjustements,verification:f.verification,status:'documented_partial'};
  return {id:'demons-documentes:'+f.id,titre:f.name,entityType:f.entityType,episodesReperes:f.episodeRefs,sources:f.sourceIds,
   canon:{role:f.role,powers:f.powers,conditions:f.conditions,counter:f.counter,psychology:f.psychology},
   limitesEtIncertitudes:f.uncertainties,descriptionCarteProposee:f.card,exactRecipe:f.exactRecipe,status:'documented_partial'};
 });
 const lot={id,status:'integrated_documentary',reviewedAt:'2026-09-08',origin:source,sources,fiches,
  review:'Structure, provenance, limites et correspondances revues. Sources secondaires et transcriptions non officielles conservées à leur niveau ; pas de validation audiovisuelle exhaustive ni de distribution automatique.'};
 const file=id+'.json';fs.writeFileSync(path.join(folder,file),JSON.stringify(lot,null,2)+'\n');
 manifest.dossiers=manifest.dossiers.filter(d=>d.id!==id);manifest.dossiers.push({id,file,fiches:fiches.length});
 manifest.inputs=manifest.inputs.filter(x=>x.path!==source);manifest.inputs.push({path:source,sha256:crypto.createHash('sha256').update(raw).digest('hex')});
 console.log(id,fiches.length,'fiches intégrées, sources résolues');
}
manifest.version='contributions-2026-09-08-v2';
fs.writeFileSync(path.join(folder,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
