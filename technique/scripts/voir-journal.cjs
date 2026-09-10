'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  const refus=/ne peut pas|contourner|contournerait|refus|ne prouve|impossible|Accorder|n.est pas|échec/i;
  (j.arbitration||[]).forEach((m,i)=>{
   const t=m.text.replace(/\s+/g,' ');
   const marque=refus.test(t)&&!/^Proposition enregistrée/.test(t)?'REFUS ':'      ';
   console.log(marque+'['+String(i).padStart(2)+'] J'+m.day+' : '+t.slice(0,190));
  });
 });
}).on('error',e=>console.log('injoignable : '+e.message));
