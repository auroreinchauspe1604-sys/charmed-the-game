'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {createTools}=require('./agent-tools'),{serve}=require('./agent-mcp');
const E=require('./engine'),{Store}=require('./store'),{Service}=require('./service');
const fs=require('fs'),os=require('os'),path=require('path');

test('pointeurs : consultation, pagination, recherche et refus des chemins hors catalogue',()=>{
 const session=createTools({board:()=>({day:2}),documents:{connaissances:()=>[{id:'piper',power:'Explosion'},{id:'paige',power:'Orbes'}]}});
 const run=(name,args)=>session.tools.find(t=>t.name===name).run(args);
 assert.deepEqual(run('plateau',{}),{day:2});
 assert.equal(run('lire',{pointeur:'connaissances',limite:1}).elements.length,1);
 assert.equal(run('lire',{pointeur:'connaissances',chemin:'/1/power'}),'Orbes');
 assert.deepEqual(run('chercher',{pointeur:'connaissances',texte:'explosion'}),[{chemin:'/0/power',valeur:'Explosion'}]);
 assert.throws(()=>run('lire',{pointeur:'faits'}),/inconnu/);
 assert.throws(()=>run('lire',{pointeur:'connaissances',chemin:'/__proto__'}),/introuvable/);
 assert(!session.tools.some(t=>t.name==='jouer'));
});

test('MCP : appels réels, accès privé, erreurs lisibles et exécution séquentielle',async()=>{
 let value=0;const bridge=await serve([{name:'incrementer',description:'Test',inputSchema:{type:'object'},run:async()=>{const before=value;await new Promise(r=>setTimeout(r,10));value=before+1;return value;}}]);
 const rpc=async(method,params={})=>(await (await fetch(bridge.url,{method:'POST',headers:{Authorization:'Bearer '+bridge.token},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})})).json());
 try{
  assert.equal((await fetch(bridge.url,{method:'POST'})).status,401);
  assert((await rpc('initialize')).result.capabilities.tools);
  assert.equal((await rpc('tools/list')).result.tools[0].name,'incrementer');
  const calls=await Promise.all([rpc('tools/call',{name:'incrementer'}),rpc('tools/call',{name:'incrementer'})]);
  assert.equal(value,2);assert.deepEqual(calls.map(r=>JSON.parse(r.result.content[0].text)),[1,2]);
  assert.equal((await rpc('tools/call',{name:'absent'})).result.isError,true);
 }finally{await bridge.close();}
});

test('le passage utilise le résultat du premier appel avant de choisir le suivant',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-tools-test-'));
 try{
  const store=new Store(dir);
  const service=new Service(store,{
   opponent:async(s,play)=>{
    const refused=await play({type:'inconnu'});assert.match(refused.erreur,/inconnue/);assert.equal(refused.plateau.spent.commanditaire,false);
    const played=await play({type:'propose',kind:'subgoal',target:'root-commanditaire',text:'Le lieu est accessible au camp adverse.'});
    assert.equal(played.plateau.spent.commanditaire,true);assert.equal(played.plateau.nodes.at(-1).title,'Le lieu est accessible.');
    const ended=await play({type:'end'});assert.equal(ended.plateau.phase,'morning');
    await assert.rejects(play({type:'end'}),/terminé/);
   },plan:async()=>({accepted:true,reason:'Recevable.',title:'Le lieu est accessible.',effect:'Le lieu est accessible.'})
  });
  await service.action(0,'test-end-0001',{type:'end'});
  const result=await service.advance(1,'test-ai-0002');assert.equal(result.phase,'morning');assert.equal(store.load().nodes.length,3);
 }finally{for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));fs.rmdirSync(dir);}
});

test('un passage interrompu avant end ne publie pas ses modifications',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-tools-test-'));
 try{
  const store=new Store(dir),service=new Service(store,{opponent:async()=>({message:'Terminé sans appel'})});
  await service.action(0,'test-end-0001',{type:'end'});const before=fs.readFileSync(store.file,'utf8');
  await assert.rejects(service.advance(1,'test-ai-0002'),/n’a pas été terminé/);
  assert.equal(fs.readFileSync(store.file,'utf8'),before);
 }finally{for(const f of fs.readdirSync(dir))fs.unlinkSync(path.join(dir,f));fs.rmdirSync(dir);}
});
