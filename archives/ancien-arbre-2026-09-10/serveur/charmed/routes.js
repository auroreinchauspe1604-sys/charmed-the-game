"use strict";
const path=require('path');const {Store}=require('./store');const {Service}=require('./service');const {Intelligence}=require('./intelligence');const E=require('./engine');const {envoyer,fichierStatique,RACINE}=require('../http');
const store=new Store(process.env.CHARMED_STATE_DIR||path.join(RACINE,'etat','charmed'));const service=new Service(store,new Intelligence());
function body(req){return new Promise((resolve,reject)=>{let b='';req.on('data',c=>{b+=c;if(b.length>64000){reject(new Error('Requête trop volumineuse.'));req.destroy();}});req.on('end',()=>{try{resolve(JSON.parse(b));}catch{reject(new Error('Requête illisible.'));}});req.on('error',reject);});}
function routes(req,res,url){
 if(url==='/charmed'&&req.method==='GET'){fichierStatique(res,'charmed.html','text/html; charset=utf-8');return true;}
 if(!url.startsWith('/api/charmed'))return false;
 (async()=>{try{
  if(req.method==='GET'&&url==='/api/charmed/rules')return envoyer(res,200,JSON.stringify({text:require('fs').readFileSync(path.join(RACINE,'regles/REGLES_ACTEES.md'),'utf8')}));
  if(req.method==='GET'&&url==='/api/charmed/expertise'){
   const library=require('./bibliotheque').read();
   return envoyer(res,200,JSON.stringify({version:library.integrationVersion,characters:require('../../Charmed/canon/personnages.json').characters.length,integratedDossiers:library.dossiers.filter(d=>d.status==='integrated_documentary').map(d=>({id:d.id,count:d.fiches.length})),admissibleFacts:library.facts.length}));
  }
  if(req.method==='GET'&&url==='/api/charmed'){return envoyer(res,200,JSON.stringify({...E.publicView(store.load()),busy:store.busy}));}
  if(req.method!=='POST'||!['/api/charmed/action','/api/charmed/advance'].includes(url))return envoyer(res,404,'{}');
  // Same-origin browser writes only. This application is bound to loopback.
  if(req.headers.origin&&req.headers.origin!==`http://${req.headers.host}`)return envoyer(res,403,JSON.stringify({error:'Origine refusée.'}));
  const b=await body(req);E.requireRule(Number.isInteger(b.revision)&&typeof b.requestId==='string'&&/^[a-zA-Z0-9-]{8,80}$/.test(b.requestId),'Révision ou identifiant invalide.');
  const s=url.endsWith('/advance')?await service.advance(b.revision,b.requestId):await service.action(b.revision,b.requestId,b.action);
  envoyer(res,200,JSON.stringify(E.publicView(s)));
 }catch(e){envoyer(res,e instanceof E.RuleError?409:503,JSON.stringify({error:e.message}));}})();return true;
}
module.exports=routes;
