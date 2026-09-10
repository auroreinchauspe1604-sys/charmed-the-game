"use strict";
const fs=require('fs'),path=require('path'),crypto=require('crypto');
function compatible(state,scenario){
 if(state.version!==3)return false;
 if(state.scenarioId!==undefined)return state.scenarioId===scenario.id;
 // Old snapshots have no scenario id. Match immutable scenario content,
 // including resource descriptions which distinguish the two siege variants.
 return state.title===scenario.title&&scenario.goals.every(g=>state.nodes.some(n=>n.id===g.id&&n.title===g.title))&&scenario.resources.every(r=>state.resources.some(x=>x.id===r.id&&x.title===r.title&&x.category===r.category&&x.description===r.description));
}
class Store {
 constructor(dir,E=require('./engine')){const scenario=E.scenario;this.E=E;this.scenario=scenario;
  this.dir=dir;this.file=path.join(dir,scenario.id+'.v3.jsonl');this.busy=false;
  // Continue a compatible old soft-siege journal in place, preserving its
  // append-only history and the lock shared with older server instances.
  const legacy=path.join(dir,'avant-la-vision.v3.jsonl');
  if(scenario.id==='manoir-assiege-souple'&&!fs.existsSync(this.file)&&fs.existsSync(legacy)){
   const first=JSON.parse(fs.readFileSync(legacy,'utf8').split('\n')[0]);
   if(compatible(first.state,scenario))this.file=legacy;
  }
 }
 get seed(){return process.env.CHARMED_PARTY_SEED||crypto.createHash('sha256').update(path.resolve(this.file)).digest('hex');}
 load(){const E=this.E,scenario=this.scenario;if(!fs.existsSync(this.file))return E.initial();const lines=fs.readFileSync(this.file,'utf8').trim().split('\n');let expected=1,state;
  for(const line of lines){let row;try{row=JSON.parse(line);}catch{throw new Error('Journal incomplet : restauration nécessaire, aucune écriture effectuée.');}
   if(row.revision!==expected++||row.state.revision!==row.revision)throw new Error('Ordre du journal invalide.');
   if(crypto.createHash('sha256').update(JSON.stringify(row.state)).digest('hex')!==row.sha256)throw new Error('Journal altéré : contrôle de cohérence échoué.');
   if(!compatible(row.state,scenario))throw new Error('Journal incompatible avec le scénario ou les règles sélectionnés.');state=row.state;
  }return state;
 }
 async transact(revision,requestId,fn){const E=this.E,scenario=this.scenario;E.requireRule(!this.busy,'Une opération est déjà en cours.');this.busy=true;let fd;
  try{fs.mkdirSync(this.dir,{recursive:true});try{fd=fs.openSync(this.file+'.lock','wx');}catch(e){if(e.code==='EEXIST')throw new E.RuleError('Une autre instance écrit la partie. Si le serveur a été arrêté brutalement, vérifier le verrou avant de le retirer.');throw e;}
   const current=this.load();if(current.lastRequest===requestId)return current;
   E.requireRule(current.revision===revision,'Le plateau a changé. Rechargez avant de rejouer.');const s=E.clone(current);s.subgoalSlots=E.publicView(current).subgoalSlots;await fn(s);
   s.scenarioId=scenario.id;s.revision++;s.lastRequest=requestId;const row={revision:s.revision,at:new Date().toISOString(),sha256:crypto.createHash('sha256').update(JSON.stringify(s)).digest('hex'),state:s};
   const out=fs.openSync(this.file,'a');try{fs.writeFileSync(out,JSON.stringify(row)+'\n');fs.fsyncSync(out);}finally{fs.closeSync(out);}return s;
  }finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(this.file+'.lock');}this.busy=false;}
 }
}
module.exports={Store};
