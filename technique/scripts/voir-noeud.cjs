'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  for(const id of process.argv.slice(2)){
   const n=j.nodes.find(x=>x.id===id);
   if(!n){console.log(id+' introuvable');continue;}
   console.log('\n=== '+id+' ===');
   for(const k of ['type','owner','status','target','createdDay','delay','readyDay','reactionThroughDay','dueDay','revealDay','requiredCount','missing','pieces','defenders','maintainers','suspended','established','effect'])
    if(n[k]!==undefined)console.log('  '+k.padEnd(20)+JSON.stringify(n[k]).slice(0,300));
  }
  console.log('\n=== faits ===');
  for(const f of (j.facts||[]).slice(-8))console.log('  '+(typeof f==='string'?f:JSON.stringify(f)).slice(0,220));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
