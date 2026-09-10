"use strict";
const path=require('path');const {Store}=require('./store');const {Jeu}=require('./jeu');const {createEngine,RuleError}=require('./engine');const scenarios=require('./scenarios');const {envoyer,fichierStatique,RACINE}=require('../http');
const fs=require('fs'),root=path.join(RACINE,'etat','charmed');
// Dossier d'état : CHARMED_STATE_DIR pour le scénario lancé ; sinon le fichier historique à la racine s'il existe,
// ou le sous-dossier au nom du scénario, comme les scripts jouer-*.cjs.
function stateDir(id){
 if(id===scenarios.defaultId&&process.env.CHARMED_STATE_DIR)return process.env.CHARMED_STATE_DIR;
 return fs.existsSync(path.join(root,id+'.v3.jsonl'))?root:path.join(root,id);
}
// Un monde par scénario : moteur, journal et MJ propres. Le scénario par défaut reste celui de CHARMED_SCENARIO.
const worlds=new Map();
function world(id=scenarios.defaultId){
 if(!scenarios.ids.includes(id))throw new RuleError('Scénario inconnu : '+id);
 if(!worlds.has(id)){const E=createEngine(scenarios.load(id));const store=new Store(stateDir(id),E);worlds.set(id,{E,store,jeu:new Jeu(store)});}
 return worlds.get(id);
}
function body(req){return new Promise((resolve,reject)=>{let b='';req.on('data',c=>{b+=c;if(b.length>64000){reject(new Error('Requête trop volumineuse.'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(b));}catch{reject(new Error('Requête illisible.'));}});req.on('error',reject);});}
function routes(req,res,url){
 if(url==='/charmed'&&req.method==='GET'){fichierStatique(res,'charmed.html','text/html; charset=utf-8');return true;}
 if(!url.startsWith('/api/charmed'))return false;
 (async()=>{try{
  const query=new URLSearchParams(req.url.split('?')[1]||'');
  if(req.method==='GET'&&url==='/api/charmed/rules')return envoyer(res,200,JSON.stringify({text:require('fs').readFileSync(path.join(RACINE,'Charmed/REGLES_ACTEES.md'),'utf8')}));
  if(req.method==='GET'&&url==='/api/charmed/scenarios')return envoyer(res,200,JSON.stringify({default:scenarios.defaultId,scenarios:scenarios.ids.map(id=>{const s=scenarios.load(id);return {id,title:s.title,period:s.period,endless:!Number.isFinite(s.finalDay)};})}));
  if(req.method==='GET'&&url==='/api/charmed/expertise'){
   const library=require('./bibliotheque').read();
   return envoyer(res,200,JSON.stringify({version:library.integrationVersion,characters:require('../../Charmed/canon/personnages.json').characters.length,integratedDossiers:library.dossiers.filter(d=>d.status==='integrated_documentary').map(d=>({id:d.id,count:d.fiches.length})),admissibleFacts:library.facts.length}));
  }
  const {E,store,jeu}=world(query.get('scenario')||undefined);
  if(req.method==='GET'&&url==='/api/charmed'){return envoyer(res,200,JSON.stringify({...E.publicView(store.load()),scenarioId:E.scenario.id,busy:store.busy}));}
  if(req.method!=='POST'||!['/api/charmed/action','/api/charmed/advance'].includes(url))return envoyer(res,404,'{}');
  // Same-origin browser writes only. This application is bound to loopback.
  if(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`)return envoyer(res,403,JSON.stringify({error:'Origine refusée.'}));
  const b=await body(req);E.requireRule(Number.isInteger(b.revision)&&typeof b.requestId==='string'&&/^[a-zA-Z0-9-]{8,80}$/.test(b.requestId),'Révision ou identifiant invalide.');
  const s=await jeu.turn(b.revision,b.requestId,url.endsWith('/advance')?{demande:'Poursuivre la partie'}:{camp:'phoebe',action:b.action});
  envoyer(res,200,JSON.stringify({...E.publicView(s),scenarioId:E.scenario.id}));
 }catch(e){envoyer(res,e instanceof RuleError?409:503,JSON.stringify({error:e.message}));}})();return true;
}
module.exports=routes;
