"use strict";
const path=require('path');const {Store}=require('./store');const {Service}=require('./service');const {Intelligence}=require('./intelligence');const {ArbitrationJournal,arbitrationId}=require('./arbitration-journal');const E=require('./engine');const {envoyer,fichierStatique,RACINE,CHEMINS}=require('../http');
const store=new Store(process.env.CHARMED_STATE_DIR||path.join(CHEMINS.etat,'charmed'));
const journal=new ArbitrationJournal({root:process.env.CHARMED_ARBITRATION_LOG_DIR||path.join(path.dirname(RACINE),'travail-equipe','journaux-prives-arbitrages'),stateFile:store.file,scenarioId:process.env.CHARMED_SCENARIO||'avant-la-vision'});
const intelligence=new Intelligence(undefined,journal);const service=new Service(store,intelligence,journal);const view=s=>journal.decorate({...E.publicView(s),busy:store.busy});
function body(req){return new Promise((resolve,reject)=>{let b='';req.on('data',c=>{b+=c;if(b.length>64000){reject(new Error('Requête trop volumineuse.'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(b));}catch{reject(new Error('Requête illisible.'));}});req.on('error',reject);});}
function routes(req,res,url){
 if(url==='/charmed'&&req.method==='GET'){fichierStatique(res,'charmed.html','text/html; charset=utf-8');return true;}
 if(!url.startsWith('/api/charmed'))return false;
 (async()=>{try{
  if(req.method==='GET'&&url==='/api/charmed/rules')return envoyer(res,200,JSON.stringify({text:require('fs').readFileSync(CHEMINS.regles,'utf8')}));
  if(req.method==='GET'&&url==='/api/charmed/expertise'){
   const library=require('./bibliotheque').read();
   return envoyer(res,200,JSON.stringify({version:library.integrationVersion,characters:require('../../donnees-bibliotheque/canon/personnages.json').characters.length,integratedDossiers:library.dossiers.filter(d=>d.status==='integrated_documentary').map(d=>({id:d.id,count:d.fiches.length})),admissibleFacts:library.facts.length}));
  }
  if(req.method==='GET'&&url==='/api/charmed'){return envoyer(res,200,JSON.stringify(view(store.load())));}
  if(req.method!=='POST'||!['/api/charmed/action','/api/charmed/advance','/api/charmed/contest'].includes(url))return envoyer(res,404,'{}');
  // Same-origin browser writes only. This application is bound to loopback.
  if(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`)return envoyer(res,403,JSON.stringify({error:'Origine refusée.'}));
  const b=await body(req);E.requireRule(Number.isInteger(b.revision)&&typeof b.requestId==='string'&&/^[a-zA-Z0-9-]{8,80}$/.test(b.requestId),'Révision ou identifiant invalide.');
  if(url==='/api/charmed/contest'){const s=store.load();E.requireRule(s.revision===b.revision,'Le plateau a changé. Rechargez avant de contester.');E.requireRule(typeof b.arbitrationId==='string'&&typeof b.reason==='string'&&b.reason.trim().length>=8&&b.reason.length<=3000,'Précisez le verdict contesté et votre raison.');const index=s.arbitration.findIndex((entry,i)=>arbitrationId(entry,i)===b.arbitrationId);E.requireRule(index>=0,'Verdict introuvable.');const result=journal.contest({requestId:b.requestId,arbitrationId:b.arbitrationId,reason:b.reason.trim(),verdict:s.arbitration[index],state:s});return envoyer(res,200,JSON.stringify({ok:result.ok,duplicate:!!result.duplicate,traceIncomplete:!result.ok,message:result.ok?'Contestation enregistrée. La partie reste inchangée.':'La partie reste jouable, mais la contestation n’a pas pu être enregistrée : '+result.error}));}
  const s=url.endsWith('/advance')?await service.advance(b.revision,b.requestId):await service.action(b.revision,b.requestId,b.action);
  envoyer(res,200,JSON.stringify(view(s)));
 }catch(e){envoyer(res,e instanceof E.RuleError?409:503,JSON.stringify({error:e.message}));}})();return true;
}
module.exports=routes;
