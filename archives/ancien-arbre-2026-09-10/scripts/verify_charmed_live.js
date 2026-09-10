// Integration probe on a disposable journal. Never advances the real game.
const fs=require('fs'),os=require('os'),path=require('path'),assert=require('assert/strict');
const {Store}=require('../serveur/charmed/store'),{Service}=require('../serveur/charmed/service'),{Intelligence}=require('../serveur/charmed/intelligence');
(async()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-live-'));try{
 const store=new Store(dir),service=new Service(store,new Intelligence());
 let s=await service.action(0,'live-proposal-0001',{type:'propose',kind:'subgoal',target:'root-phoebe',text:'Le lieu exact de la verrière vue par Phoebe est identifié. Je veux le retrouver en recoupant le carnet de la vision avec le dossier de la réception, afin de savoir où intervenir pour protéger Élise.'});
 assert.equal(s.spent.phoebe,true,'La proposition de sous-objectif doit être acceptée');console.log('Proposition narrative et enregistrement : OK');
 s=await service.action(s.revision,'live-end-0002',{type:'end'});assert.equal(s.phase,'ai');
 s=await service.advance(s.revision,'live-opponent-0003');assert.equal(s.phase,'morning');assert(s.nodes.some(n=>n.owner==='commanditaire'&&(n.parent||n.type!=='state')),'Le véritable adversaire doit jouer au moins une action acceptée');console.log('Passage du véritable adversaire IA, action acceptée : OK');
 s=await service.advance(s.revision,'live-morning-0004');assert.equal(s.day,2);assert.equal(s.phase,'player');console.log('Radio Halliwell et reprise au jour 2 : OK');
 assert.equal(store.load().revision,4);console.log('Relecture après quatre transactions : OK');
 }finally{for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));fs.rmdirSync(dir);}
})().catch(e=>{console.error(e.message);process.exitCode=1;});
