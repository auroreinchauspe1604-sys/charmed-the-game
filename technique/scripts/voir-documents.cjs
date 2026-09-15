'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3133,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('Cartes portant un document consultable :');
  const docs=j.resources.filter(x=>x.document);
  if(!docs.length)console.log('  AUCUNE — le drapeau document n’est pas posé.');
  for(const x of docs)console.log('  '+x.id+' | '+x.title+' | owner='+x.owner+' | dispo='+x.availability+' | consultedBy='+JSON.stringify(x.consultedBy||[]));
  console.log('\nToutes les ressources de phoebe :');
  for(const x of j.resources.filter(x=>x.owner==='phoebe'))
   console.log('  '+x.id.padEnd(34)+' document='+String(!!x.document).padEnd(6)+' dispo='+x.availability+' | '+x.title);
 });
}).on('error',e=>console.log('injoignable : '+e.message));
