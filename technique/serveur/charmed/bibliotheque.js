'use strict';
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../../donnees-bibliotheque');
// Read on every request: documented additions do not depend on require's cache.
function read(){
 const research=path.join(root,'recherche');
 const dossiers=fs.readdirSync(research,{withFileTypes:true}).filter(d=>d.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(d=>{
  const file=path.join(research,d.name,'fiches.json');
  if(!fs.existsSync(file))return [];
  const lot=JSON.parse(fs.readFileSync(file,'utf8'));
  return [{id:d.name,preuve:lot.preuve,sources:lot.sources||{},fiches:lot.fiches}];
 });
 const integrated=path.join(root,'canon/contributions-integrees');
 const manifest=JSON.parse(fs.readFileSync(path.join(integrated,'manifest.json'),'utf8'));
 for(const entry of manifest.dossiers){
  if(path.basename(entry.file)!==entry.file)throw new Error('Chemin de contribution invalide.');
  const lot=JSON.parse(fs.readFileSync(path.join(integrated,entry.file),'utf8'));
  dossiers.push({...lot,preuve:'Revue documentaire effectuée ; niveaux de preuve des sources conservés. Les variantes ne sont pas des règles universelles.'});
 }
 const verified=JSON.parse(fs.readFileSync(path.join(root,'canon/bibliotheque-verifiee.json'),'utf8'));
 return {dossiers,...verified,integrationVersion:manifest.version};
}
function preparationReview(draft,spec){
 // This is a coverage checklist, not a claim that an LLM performed web research.
 const elements=[...draft.resources.map(r=>({id:'resource:'+r.id,title:r.title})),
  ...draft.goals.map(g=>({id:'goal:'+g.owner,title:g.title})),
  ...draft.calendar.map((e,i)=>({id:'event:'+i,title:e.publicText})),
  ...(spec.referencedEpisodes||[]).map(e=>({id:'episode:'+e,title:e}))];
 return {status:'research_required',readyToStart:false,elements,
  additionalInventoryRequired:['Personnages et psychologie','Pouvoirs et interactions','Lieux et protections','Objets, formules et potions','Épisodes de référence et chronologie'],
  requiredPerElement:['Sources effectivement consultées','Fonctionnement et effets','Activation et moyens','Portée et cibles','Variantes et contre-exemples','Limites établies et incertitudes','Fiches persistantes mises à jour'],
  workflow:'Recherche effectuée par l’assistant après le choix du thème. Revue du dossier et mise à jour de la bibliothèque avant lancement. Le transport de jeu ne navigue pas sur Internet.'};
}
module.exports={read,preparationReview};
