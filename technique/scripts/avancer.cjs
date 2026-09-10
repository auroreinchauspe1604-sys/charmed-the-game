// Relance la phase automatique en cours (soir ou matin) et rapporte l'erreur
// exacte si le serveur refuse. Ne joue aucun coup à la place du joueur.
'use strict';
const http=require('http');
const get=()=>new Promise((res,rej)=>http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(JSON.parse(d)));}).on('error',rej));
const post=(chemin,corps)=>new Promise((res,rej)=>{
 const data=JSON.stringify(corps);
 const q=http.request({host:'127.0.0.1',port:3132,path:chemin,method:'POST',headers:{'Content-Type':'application/json','Content-Length':Buffer.byteLength(data)}},r=>{
  let d='';r.on('data',c=>d+=c);r.on('end',()=>res({code:r.statusCode,body:d}));});
 q.on('error',rej);q.end(data);});
(async()=>{
 const etat=await get();
 console.log('avant : jour '+etat.day+' | phase '+etat.phase+' | revision '+etat.revision);
 if(etat.phase==='player'){console.log('Rien à avancer : c’est votre passage.');return;}
 const r=await post('/api/charmed/advance',{revision:etat.revision,requestId:'relance-'+Date.now()});
 console.log('HTTP '+r.code);
 if(r.code!==200){console.log('ERREUR : '+r.body.slice(0,900));return;}
 const j=JSON.parse(r.body);
 console.log('après : jour '+j.day+' | phase '+j.phase+' | revision '+j.revision);
 for(const m of (j.arbitration||[]).slice(-3))console.log('  Ange J'+m.day+' : '+m.text.slice(0,300));
})().catch(e=>console.log('injoignable : '+e.message));
