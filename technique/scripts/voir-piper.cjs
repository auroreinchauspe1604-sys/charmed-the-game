'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3133,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('jour '+j.day+'/'+j.finalDay+' | phase '+j.phase);
  console.log('\n--- ressources phoebe ---');
  for(const x of j.resources.filter(x=>x.owner==='phoebe'))
   console.log('  '+x.id.padEnd(16)+(x.title||'').padEnd(34)+' dispo='+x.availability+' heldBy='+JSON.stringify(x.heldBy||null)+' consumed='+!!x.consumed);
  console.log('\n--- noeuds detenant des pieces ---');
  for(const n of j.nodes){
   if(!(n.pieces||[]).length&&!(n.defenders||[]).length)continue;
   console.log('  '+n.id.padEnd(6)+n.type.padEnd(8)+n.owner.padEnd(8)+n.status.padEnd(12)
    +'pieces='+JSON.stringify(n.pieces||[])
    +' maintainers='+JSON.stringify(n.maintainers||[])
    +' subgoalOf='+JSON.stringify(n.subgoalOf||null)
    +' target='+JSON.stringify(n.target||null));
  }
 });
}).on('error',e=>console.log('injoignable : '+e.message));
