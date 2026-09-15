'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3134,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('jour '+j.day+'/'+j.finalDay+' | phase '+j.phase);
  console.log('\n--- noeuds ---');
  for(const n of j.nodes)console.log('  '+n.id.padEnd(20)+n.type.padEnd(8)+n.owner.padEnd(16)+n.status.padEnd(12)+(n.effect||'').slice(0,120));
  console.log('\n--- arbitrage ---');
  for(const m of (j.arbitration||[]))console.log('  [J'+m.day+'] '+(m.text||''));
  console.log('\n--- adversaire ---');
  for(const m of (j.opponent||[]))console.log('  [J'+m.day+'] '+(m.text||''));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
