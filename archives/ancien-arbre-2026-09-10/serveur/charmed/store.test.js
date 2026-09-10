'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('fs'),os=require('os'),path=require('path'),crypto=require('crypto');
const {execFileSync}=require('child_process');
const modulePath=path.join(__dirname,'store.js');
function run(dir,scenario,write=false){
 const script=`const {Store}=require(${JSON.stringify(modulePath)});(async()=>{const store=new Store(process.env.CHARMED_STATE_DIR);let s=store.load();if(${write})s=await store.transact(s.revision,'request-'+s.revision,()=>{});console.log(JSON.stringify({file:store.file,state:s}));})().catch(e=>{console.log(JSON.stringify({error:e.message}));});`;
 return JSON.parse(execFileSync(process.execPath,['-e',script],{env:{...process.env,CHARMED_SCENARIO:scenario,CHARMED_STATE_DIR:dir},encoding:'utf8',windowsHide:true}));
}
function temporary(fn){return()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-store-audit-'));try{fn(dir);}finally{for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));fs.rmdirSync(dir);}};}
test('scénarios séparés dans un même dossier et mauvais scénario refusé',temporary(dir=>{
 const a=run(dir,'avant-la-vision',true),b=run(dir,'manoir-assiege-souple',true),c=run(dir,'manoir-assiege',true);
 assert.equal(new Set([a.file,b.file,c.file]).size,3);
 for(const r of [a,b,c])assert.equal(r.state.revision,1);
 assert.equal(b.state.scenarioId,'manoir-assiege-souple');
 fs.copyFileSync(a.file,b.file);
 assert.match(run(dir,'manoir-assiege-souple').error,/incompatible/);
}));
test('ancien journal souple repris en place, sans réécriture de son historique',temporary(dir=>{
 const current=run(dir,'manoir-assiege-souple',true);
 const row=JSON.parse(fs.readFileSync(current.file,'utf8'));delete row.state.scenarioId;
 row.sha256=crypto.createHash('sha256').update(JSON.stringify(row.state)).digest('hex');
 const old=JSON.stringify(row)+'\n',legacy=path.join(dir,'avant-la-vision.v3.jsonl');
 fs.writeFileSync(legacy,old);fs.unlinkSync(current.file);
 const resumed=run(dir,'manoir-assiege-souple',true);
 assert.equal(resumed.file,legacy);assert.equal(resumed.state.revision,2);
 assert.equal(resumed.state.scenarioId,'manoir-assiege-souple');
 assert(fs.readFileSync(legacy,'utf8').startsWith(old));
 assert.match(run(dir,'avant-la-vision').error,/incompatible/);
}));
