'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3133,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('jour '+j.day+'/'+j.finalDay+' | phase '+j.phase+' | spent='+JSON.stringify(j.spent));
  console.log('\n--- etats ---');
  for(const n of j.nodes.filter(n=>n.type==='state'))
   console.log('  '+n.id.padEnd(6)+n.owner.padEnd(16)+n.status.padEnd(10)+'parent='+(n.parent||'-')+' | '+(n.effect||'').slice(0,90));
  console.log('\n--- tous les noeuds non-etat ---');
  for(const n of j.nodes.filter(n=>n.type!=='state'))
   console.log('  '+n.id.padEnd(6)+n.type.padEnd(8)+n.owner.padEnd(16)+n.status.padEnd(12)+'-> '+(n.target||'-')+(n.voidReason?' | VOID: '+n.voidReason:''));
  console.log('\n--- faits ---');
  for(const f of j.facts||[])console.log('  * '+f);
  console.log('\n--- arbitrage (12 derniers) ---');
  for(const m of (j.arbitration||[]).slice(-12))console.log('  [J'+m.day+'] '+(m.text||'').slice(0,700));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
