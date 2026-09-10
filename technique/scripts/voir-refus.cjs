'use strict';
const http=require('http');
const motif=new RegExp(process.argv[2]||'aige','i');
http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  const msgs=(j.arbitration||[]).map((m,i)=>({i,...m})).filter(m=>motif.test(m.text));
  console.log('messages retenus : '+msgs.length+' sur '+(j.arbitration||[]).length+'\n');
  for(const m of msgs)console.log('['+m.i+'] J'+m.day+' : '+m.text.replace(/\s+/g,' ').slice(0,520)+'\n');
 });
}).on('error',e=>console.log('injoignable : '+e.message));
