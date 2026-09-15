'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3133,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('jour '+j.day+'/'+j.finalDay+' | phase '+j.phase);
  for(const id of process.argv.slice(2)){
   const n=j.nodes.find(x=>x.id===id);
   if(!n){console.log('\n'+id+' introuvable');continue;}
   console.log('\n=== '+id+' ('+n.type+', '+n.owner+') ===');
   for(const k of ['status','target','createdDay','revealDay','requiredCount','missing','delay','readyDay','reactionThroughDay','dueDay','pieces','defenders','dependsOn','suspended','effect'])
    if(n[k]!==undefined)console.log('  '+k.padEnd(20)+JSON.stringify(n[k]).slice(0,260));
  }
 });
}).on('error',e=>console.log('injoignable : '+e.message));
