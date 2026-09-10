"use strict";
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const E=require('./engine');
class Store {
 constructor(dir){this.dir=dir;this.file=path.join(dir,process.env.CHARMED_SCENARIO==='manoir-assiege'?'manoir-assiege.v3.jsonl':'avant-la-vision.v3.jsonl');this.busy=false;}
 load(){if(!fs.existsSync(this.file))return E.initial();const lines=fs.readFileSync(this.file,'utf8').trim().split('\n');let expected=1,state;
  for(const line of lines){let row;try{row=JSON.parse(line);}catch{throw new Error('Journal incomplet : restauration nécessaire, aucune écriture effectuée.');}
   if(row.revision!==expected++||row.state.revision!==row.revision)throw new Error('Ordre du journal invalide.');
   if(crypto.createHash('sha256').update(JSON.stringify(row.state)).digest('hex')!==row.sha256)throw new Error('Journal altéré : contrôle de cohérence échoué.');state=row.state;
  }return state;
 }
 async transact(revision,requestId,fn){E.requireRule(!this.busy,'Une opération est déjà en cours.');this.busy=true;let fd;
  try{fs.mkdirSync(this.dir,{recursive:true});try{fd=fs.openSync(this.file+'.lock','wx');}catch(e){if(e.code==='EEXIST')throw new E.RuleError('Une autre instance écrit la partie. Si le serveur a été arrêté brutalement, vérifier le verrou avant de le retirer.');throw e;}
   const current=this.load();if(current.lastRequest===requestId)return current;
   E.requireRule(current.revision===revision,'Le plateau a changé. Rechargez avant de rejouer.');const s=E.clone(current);s.subgoalSlots=E.publicView(current).subgoalSlots;await fn(s);
   s.revision++;s.lastRequest=requestId;const row={revision:s.revision,at:new Date().toISOString(),sha256:crypto.createHash('sha256').update(JSON.stringify(s)).digest('hex'),state:s};
   const out=fs.openSync(this.file,'a');try{fs.writeFileSync(out,JSON.stringify(row)+'\n');fs.fsyncSync(out);}finally{fs.closeSync(out);}return s;
  }finally{if(fd!==undefined){fs.closeSync(fd);fs.unlinkSync(this.file+'.lock');}this.busy=false;}
 }
}
module.exports={Store};
