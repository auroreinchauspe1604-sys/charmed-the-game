'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  for(const q of j.questions||[])
   console.log('cible '+q.target+' | posee par '+(q.asker||q.owner||'?')+' | resolue='+!!q.resolved+'\n   Q: '+(q.text||'').slice(0,200)+'\n   R: '+String(q.answer||'(sans reponse)').slice(0,200)+'\n');
  console.log('cartes deja questionnees : '+(j.questions||[]).map(q=>q.target).join(', '));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
