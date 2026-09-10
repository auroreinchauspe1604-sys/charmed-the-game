'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('Jour '+j.day+' | phase '+j.phase+' | revision '+j.revision+' | coup depense : '+JSON.stringify(j.spent));
  console.log('\n-- cartes --');
  for(const n of j.nodes)console.log('  '+n.id.padEnd(18)+n.type.padEnd(8)+n.owner.padEnd(14)+n.status.padEnd(11)+'pieces['+(n.pieces||[]).join(',')+'] manque '+n.missing+' | '+(n.title||'').slice(0,70));
  console.log('\n-- ressources --');
  for(const x of j.resources)console.log('  '+x.id.padEnd(14)+x.owner.padEnd(14)+'heldBy='+(x.heldBy||'-')+' lost='+!!x.lost+' consumed='+!!x.consumed+' dispo J'+(x.availableDay||1)+' recup='+(x.recoveringUntil||'-'));
  console.log('\n-- derniers messages arbitrage --');
  for(const m of (j.arbitration||[]).slice(-4))console.log('  J'+m.day+' : '+m.text.slice(0,400));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
