'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  console.log('Jour '+j.day+' sur '+j.finalDay+' — phase '+j.phase+' — sous-états disponibles : '+JSON.stringify(j.subgoalSlots||{}));
  for(const camp of ['phoebe','commanditaire']){
   console.log('\n== '+camp+' ==');
   for(const r of j.resources.filter(x=>x.owner===camp))
    console.log('  '+r.id.padEnd(14)+r.title+(r.category?' ('+r.category+')':'')+(r.availableDay>j.day?' — disponible J'+r.availableDay:'')+'\n      '+(r.description||'').slice(0,220));
  }
  console.log('\n== calendrier ==');
  for(const e of j.calendar||[])console.log('  matin J'+e.morning+' : '+(e.text||e.title||JSON.stringify(e)).slice(0,180));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
