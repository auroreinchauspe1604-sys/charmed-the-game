'use strict';
const http=require('http');
const get=p=>new Promise((res,rej)=>http.get({host:'127.0.0.1',port:3132,path:p},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res({code:r.statusCode,body:d}));}).on('error',rej));
(async()=>{
 const page=await get('/');console.log('page /            HTTP '+page.code+'  '+page.body.length+' o');
 const js=await get('/modules/charmed.js');console.log('module charmed.js HTTP '+js.code+'  '+js.body.length+' o');
 try{new (require('vm').Script)(js.body);console.log('  syntaxe servie   OK');}catch(e){console.log('  SYNTAXE SERVIE KO : '+e.message);}
 const css=await get('/modules/charmed.css');console.log('feuille de style  HTTP '+css.code);
 const api=await get('/api/charmed');console.log('api               HTTP '+api.code);
 const j=JSON.parse(api.body);
 console.log('\njour '+j.day+'/'+j.finalDay+' | phase '+j.phase+' | revision '+j.revision);
 console.log('busy='+j.busy+' | result='+JSON.stringify(j.result)+' | spent='+JSON.stringify(j.spent));
 console.log('coup jouable (phase+coup+echeance) : '+(j.phase==='player'&&!j.spent.phoebe&&j.day<j.finalDay));
 const libres=j.resources.filter(r=>r.owner==='phoebe'&&r.availability==='free');
 console.log('ressources libres : '+(libres.map(r=>r.id).join(', ')||'AUCUNE'));
 console.log('questions sans reponse a moi : '+j.questions.filter(q=>!q.resolved&&q.answer===null).map(q=>q.target).join(', '));
 for(const n of j.nodes)if(n.suspended)console.log('SUSPENDU : '+n.id);
})().catch(e=>console.log('injoignable : '+e.message));
