'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3133,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('Jour '+j.day+'/'+j.finalDay+' | phase '+j.phase+' | revision '+j.revision+' | coup '+JSON.stringify(j.spent));
  console.log('\n-- cartes --');
  for(const n of j.nodes)console.log('  '+n.id.padEnd(20)+n.type.padEnd(7)+n.owner.padEnd(14)+n.status.padEnd(11)+'pieces['+(n.pieces||[]).join(',')+'] | '+(n.title||'').slice(0,60));
  console.log('\n-- ressources adverses --');
  for(const x of j.resources.filter(x=>x.owner!=='phoebe'))
   console.log('  '+x.id.padEnd(15)+(x.category||'').padEnd(12)+'dispo='+String(x.availability).padEnd(10)+'heldBy='+(x.heldBy||'-'));
  console.log('\n-- faits --');
  for(const f of j.facts)console.log('  · '+String(f).slice(0,130));
  console.log('\n-- derniers arbitrages --');
  for(const m of (j.arbitration||[]).slice(-3))console.log('  J'+m.day+' : '+m.text.replace(/\s+/g,' ').slice(0,300));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
