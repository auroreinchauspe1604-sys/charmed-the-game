'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {createTools}=require('./agent-tools'),{serve}=require('./agent-mcp');
const E=require('./engine'),{Store}=require('./store');
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
