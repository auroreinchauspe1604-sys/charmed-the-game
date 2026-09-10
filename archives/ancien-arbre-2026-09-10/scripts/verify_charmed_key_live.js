// Real arbiter on a disposable, explicitly staged position; never writes the user's game.
const assert=require('assert/strict');
const E=require('../serveur/charmed/engine'),{Service}=require('../serveur/charmed/service'),{Intelligence}=require('../serveur/charmed/intelligence');
(async()=>{
 const s=E.initial(),service=new Service(null,new Intelligence());
 s.nodes.push({id:'test-sub',owner:'phoebe',type:'state',parent:'root-phoebe',status:'open',title:'Phoebe connaît les renseignements inscrits sur l’invitation d’Élise.',description:'Une information utile pour préparer la protection.'});
 s.facts.push('Élise accepte de montrer à Phoebe son invitation et de répondre à ses questions sur son contenu. Elles sont ensemble et l’invitation est dans le sac d’Élise.');
 let n=await service.execute(s,'phoebe',{type:'propose',kind:'key',target:'test-sub',resource:'elise',text:'Élise, présente et consentante, montre son invitation à Phoebe et lui explique les renseignements qui y sont écrits. Je pose Élise pour préparer cette lecture et cet échange, afin que Phoebe connaisse le contenu du document.'});
 assert(n,'La préparation doit être recevable.');assert.equal(n.missing,2,'Élise seule ne peut engager implicitement Phoebe et la carte Invitation.');console.log('Première ressource, nombre manquant annoncé :',n.missing);
 for(const resource of ['phoebe','dossier-reception']){
  if(n.status!=='preparing')break;
  s.day++;s.spent.phoebe=false;
  await service.execute(s,'phoebe',{type:'place',target:n.id,resource,text:resource==='phoebe'?'Phoebe est présente auprès d’Élise et reçoit ses explications en lisant les renseignements de son invitation.':'L’invitation matérielle d’Élise est sortie de son sac avec son accord, pour être lue par Phoebe pendant leur échange.'});
  console.log('Pose pertinente :',resource,'; état de la clé :',n.status,'; moyens manquants :',n.missing);
 }
 assert(n.pieces.includes('dossier-reception'),'L’invitation doit être engagée séparément.');
 assert(['ready','acquired'].includes(n.status),'Les trois moyens réunis doivent suffire à cet échange limité.');
 if(n.status==='ready'){s.day=n.dueDay;await service.resolveNow(s);}
 assert.equal(n.status,'acquired');assert(n.established);console.log('Fait réellement obtenu :',n.established);console.log('État du sous-état :',E.node(s,'test-sub').status);
 assert.equal(E.node(s,'root-phoebe').status,'open');console.log('Aucune victoire ni validation automatique de la racine : OK');
})().catch(e=>{console.error(e.message);process.exitCode=1;});
