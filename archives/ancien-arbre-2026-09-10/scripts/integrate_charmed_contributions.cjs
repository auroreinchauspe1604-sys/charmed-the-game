'use strict';
// Reviewed, bounded import. No game journals, server process or card distribution touched.
const fs=require('fs'),path=require('path'),assert=require('assert/strict'),crypto=require('crypto');
const root=path.resolve(__dirname,'..'),at=p=>path.join(root,p);
const read=p=>JSON.parse(fs.readFileSync(at(p),'utf8'));
const write=(p,v)=>fs.writeFileSync(at(p),JSON.stringify(v,null,2)+'\n');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const folder='Charmed/canon/contributions-integrees';fs.mkdirSync(at(folder),{recursive:true});
const inputs=[],dossiers=[];
for(const name of ['lieux','objets','potions-types-usages','balthazar-cole-allie']){
 const source='Charmed/contributions/'+name+'/PROPOSITION_A_INTEGRER.md';
 const raw=fs.readFileSync(at(source),'utf8');inputs.push({path:source,sha256:sha(raw)});
 const start=raw.indexOf('\n## 3.'),end=raw.indexOf('\n## 6.');assert(start>=0&&end>start);
 // Only content and source sections enter the knowledge context. Contributor task instructions do not.
 const body=raw.slice(start,end);const sources={};
 for(const line of raw.split('\n')){
  const match=line.match(/^\|\s*([A-Z]+\d+[a-z]?|PCO)\s*\|/);
  if(!match)continue;
  const urls=[...line.matchAll(/\]\((https?:\/\/[^\s]+?)\)/g)].map(m=>m[1]);
  if(urls.length)sources[match[1]]={urls,evidence:line.trim()};
 }
 assert(Object.keys(sources).length>0,name+' sources');
 const sections=body.split(/(?=^### )/m).filter(s=>s.startsWith('### '));
 const count={lieux:11,objets:8,'potions-types-usages':7,'balthazar-cole-allie':6}[name];
 const ficheSections=name==='balthazar-cole-allie'?sections:sections.filter(s=>/^### (?:3\.\d+|O\d+|P\d+)/.test(s));
 assert(ficheSections.length>0,name);
 const fiches=ficheSections.map((section,i)=>({id:name+':'+(i+1),titre:section.split('\n')[0].replace(/^### /,''),
  // Strip any subsequent level-2 section (sources/integration discussion) from the last entry.
  canon:section.split(/\n## /)[0].trim(),
  status:'reviewed_documentary',proofAuthority:'background_with_sources',
  limites:'Référence contextuelle ; distinguer observation, interprétation et proposition de carte. Les détails non établis ne sont pas des impossibilités.'}));
 if(name!=='balthazar-cole-allie')assert.equal(fiches.length,count);
 const lot={id:name,reviewedAt:'2026-09-08',status:'integrated_documentary',origin:source,sources,fiches};
 write(folder+'/'+name+'.json',lot);dossiers.push({id:name,file:name+'.json',fiches:fiches.length});
}
const source='Charmed/contributions/personnages-expertise-s1-s8/personnages.proposition.json';
const proposed=read(source),people=read('Charmed/canon/personnages.json');inputs.push({path:source,sha256:sha(fs.readFileSync(at(source)))});
assert.equal(proposed.characters.length,40);
const sourceIds=new Set(proposed.sources.map(s=>s.id));const episodes=new Set(read('Charmed/canon/episodes-index.json').episodes.map(e=>e.id));
const prefix=s=>'contribution-personnages:'+s;
for(const c of proposed.characters){
 assert(c.documentedFacts.every(f=>episodes.has(f.episode)&&f.sources.every(s=>sourceIds.has(s))),c.id);
 const old=people.characters.find(x=>x.id===c.id);
 const addition={...c,status:'documented_partial',sources:c.sources.map(prefix),
  documentedFacts:c.documentedFacts.map(f=>({...f,sources:f.sources.map(prefix)})),
  integrationNote:'Contenu revu comme référence documentaire. Variantes de cartes non distribuées automatiquement ; identités adulte/enfant et branches temporelles restent distinctes.'};
 if(old){Object.assign(old,addition,{avoid:[...new Set([...(old.avoid||[]),...c.avoid])],aliases:[...new Set([...(old.aliases||[]),...(c.aliases||[])])]});}
 else people.characters.push(addition);
}
for(const s of proposed.sources){const mapped={...s,id:prefix(s.id)};const index=people.sources.findIndex(x=>x.id===mapped.id);if(index<0)people.sources.push(mapped);else people.sources[index]=mapped;}
people.checkedAt='2026-09-08';
// Keep the existing capability lifecycle milestones intact: observations are not acquisitions.
write('Charmed/canon/personnages.json',people);
const selected=['piper:3','piper:4','phoebe:5','phoebe:6','paige:4','paige:5','leo:5','cole:2','cole:3','cole:4','cole:8','cole:9','cole:10','darryl:2','darryl:3','darryl:4','elders:3','natalie:1','rodriguez:1','tempus:1'];
const verified=read('Charmed/canon/bibliotheque-verifiee.json');
for(const key of selected){
 const owner=people.characters.find(c=>c.documentedFacts?.some(f=>f.id==='contrib:'+key));
 const f=owner.documentedFacts.find(f=>f.id==='contrib:'+key);const d=f.episode.match(/^S(\d+)E(\d+)$/);
 const fact={id:'library:'+f.id,season:+d[1],episode:+d[2],status:'verified',kind:'historical_observation',entities:[owner.id,owner.name],claim:f.claim,sources:f.sources,
  evidenceLevel:'documentary_review_not_audiovisual',limits:['Observation située dans cet épisode ; ne pas en déduire une capacité permanente, une recette exhaustive ni une disponibilité matérielle.',...owner.toVerify]};
 const i=verified.facts.findIndex(x=>x.id===fact.id);if(i<0)verified.facts.push(fact);else verified.facts[i]=fact;
}
for(const s of people.sources.filter(s=>s.id.startsWith('contribution-personnages:'))){const i=verified.sources.findIndex(x=>x.id===s.id);if(i<0)verified.sources.push(s);else verified.sources[i]=s;}
const objectFacts=[
 ['potions-types-usages','S4','potion-repandue',5,7,'Paige applique par télékinésie à orbes la potion répandue sur Barbas ; les pouvoirs de Cole lui reviennent. Briser une fiole ne neutralise donc pas nécessairement son contenu.','Précédent spécifique ; ni transfert libre vers tout destinataire ni effet garanti de toute potion.'],
 ['potions-types-usages','S2','cole-humain-potion',4,8,'La potion utilisée dans Black as Cole retire les pouvoirs démoniaques de Cole et laisse subsister Cole humain.','Ne pas confondre retrait des pouvoirs et destruction de la personne.'],
 ['objets','S05','cristaux-retrait-troxa',3,5,'Prue retire puis replace un cristal, interrompant puis rétablissant les décharges autour de Troxa.','Dispositif situé ; aucune immunité universelle ni nombre universel de cristaux.'],
 ['objets','S08','cristaux-alarme-manoir',6,12,'Une installation de cristaux d’alarme est disposée dans plusieurs espaces du manoir ; un démon sous l’apparence de Darryl entre néanmoins.','Ne prouve ni barrière interdisant toute entrée ni mécanisme universel de contournement par métamorphose.'],
 ['lieux','S02','ecole-direction-leo',7,17,'À la fin de Scry Hard, la direction de l’École de magie passe de Paige à Leo.','Contexte institutionnel ; accès et protections à vérifier séparément.'],
 ['lieux','S02','nexus-occupation-insuffisante',7,17,'Dans Scry Hard, l’occupation démoniaque du sous-sol ne suffit pas à maîtriser l’Ombre : la présence du Bien dans le manoir contrarie la tentative de Zankou.','Observer cette confrontation sans transformer une déclaration de Zankou en règle universelle de contrôle du Nexus.']
];
for(const [dossier,sourceId,id,season,episode,claim,limit]of objectFacts){
 const lot=read(folder+'/'+dossier+'.json'),source=lot.sources[sourceId];assert(source?.urls.length,id);
 const sid='integrated:'+dossier+':'+sourceId;
 const s={id:sid,url:source.urls[0],evidenceLevel:source.evidence,consultedAt:'2026-09-08'};
 const si=verified.sources.findIndex(x=>x.id===sid);if(si<0)verified.sources.push(s);else verified.sources[si]=s;
 const fact={id:'library:'+id,season,episode,claim,sources:[sid],status:'verified',kind:'historical_observation',entities:[dossier],evidenceLevel:'documentary_review_not_audiovisual',limits:[limit]};
 const fi=verified.facts.findIndex(x=>x.id===fact.id);if(fi<0)verified.facts.push(fact);else verified.facts[fi]=fact;
}
write('Charmed/canon/bibliotheque-verifiee.json',verified);
const construction=read('Charmed/canon/construction.json');
for(const e of construction.entries){
 if(e.id==='magic-school')e.requirements[0]='Voie d’accès effective et protections compatibles avec la situation';
 if(e.id==='cupid-ring')e.requirements[1]='Utilisateur et mécanisme compatibles avec le précédent étudié, y compris un détournement attesté';
 if(e.id==='crystals'){e.title='Cristaux magiques';e.claim='Cristaux employés dans des dispositifs de confinement, de protection ou d’alarme, selon leur préparation et leur disposition.';e.minSeason=3;e.requirements=['Cristaux disponibles','Dispositif adapté à l’effet proposé','Cible ou espace concerné'];e.limit='Plusieurs configurations sont documentées ; ne pas imposer cinq cristaux à tout dispositif. La localisation est un usage à étudier séparément, pas une impossibilité universelle des cristaux.';}
 if(e.id==='scrying-crystal'){e.minSeason=4;e.limit='S04E19 fournit un précédent antérieur à S07E17 ; aucun de ces repères ne désigne ici une première apparition absolue.';}
 if(e.id==='power-stripping')e.limit='Distinguer le retrait de S04E08 et sa variante S05E07 : des pouvoirs retirés peuvent être récupérés. Ni destruction ni suppression universelle de toute magie.';
}
write('Charmed/canon/construction.json',construction);
const manifest={version:'contributions-2026-09-08-v1',reviewedAt:'2026-09-08',characters:40,observations:150,additionalAdmissibleFacts:selected.length+objectFacts.length,dossiers,inputs,
 limitations:['Revue documentaire et contrôles ciblés, pas visionnage des épisodes ni certification exhaustive.','Propositions de cartes non injectées dans la sauvegarde.','Aucun coût, règle de question ou calendrier changé par cette intégration.']};
write(folder+'/manifest.json',manifest);
const lines=['# Personnages — bibliothèque détaillée intégrée','','40 profils ; observations documentées et variantes de cartes. Les niveaux de preuve restent conservés.'];
for(const c of people.characters){lines.push('','## '+c.name,'',c.role,'',...c.documentedFacts.map(f=>'- **'+f.episode+'** — '+f.claim),'','**Tendances :** '+c.tendencies.join(' '),'','**À compléter :** '+c.toVerify.join(' '),'','**Variantes proposées pour les cartes :**',...c.cardVariants.map(v=>'- '+v.period+' : '+v.text),'','**Sources :**',...c.sources.map(id=>{const s=people.sources.find(s=>s.id===id);return '- ['+id+']('+s.url+') — '+s.level;}));}
fs.writeFileSync(at('Charmed/canon/PERSONNAGES_DETAILLES.md'),lines.join('\n')+'\n');
console.log(JSON.stringify(manifest,null,2));
