'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3132,path:process.argv[2]||'/api/etat'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  console.log('HTTP '+r.statusCode);
  try{const j=JSON.parse(d);
   console.log('jour '+j.day+' | phase '+j.phase+' | revision '+j.revision);
   console.log('objectifs : '+(j.nodes||[]).filter(n=>n.type==='state'&&!n.parent).map(n=>n.id+' ['+n.status+'] '+n.title).join(' // '));
   console.log('cartes : '+(j.nodes||[]).length+' | messages arbitrage : '+((j.arbitration||[]).length));
  }catch{console.log(d.slice(0,600));}
 });
}).on('error',e=>console.log('injoignable : '+e.message));
