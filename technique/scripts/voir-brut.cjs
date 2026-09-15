'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3133,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  for(const id of process.argv.slice(2)){
   const n=j.nodes.find(x=>x.id===id);
   console.log('\n=== '+id+' ===');
   console.log(JSON.stringify(n,null,1));
  }
  console.log('\n--- arbitrage complet ---');
  for(const m of (j.arbitration||[]))console.log('  [J'+m.day+'] '+(m.text||''));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
