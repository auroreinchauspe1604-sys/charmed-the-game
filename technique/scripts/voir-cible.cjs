'use strict';
const http=require('http');
http.get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>{
 let d='';r.on('data',c=>d+=c);r.on('end',()=>{
  const j=JSON.parse(d);
  const own=n=>n.owner==='phoebe';
  const modes=n=>{const a=[];
   if((n.type==='state'&&own(n))||(n.type==='lock'&&!own(n)&&n.status==='active'))a.push('key');
   if(!own(n)&&((['state','key','attack'].includes(n.type)&&!['failed','removed','resolved'].includes(n.status))||(n.availability&&n.heldBy&&n.availability!=='lost')))a.push('lock');
   return a;};
  console.log('-- ce que l interface accepte comme cible --');
  for(const n of j.nodes)console.log('  carte '+n.id.padEnd(20)+n.type.padEnd(7)+n.status.padEnd(11)+' modes: ['+modes(n)+']');
  for(const x of j.resources.filter(x=>x.owner!=='phoebe'))
   console.log('  ress. '+x.id.padEnd(20)+'availability='+String(x.availability).padEnd(10)+'heldBy='+String(x.heldBy||'-').padEnd(6)+' modes: ['+modes(x)+']');
  const c6=j.nodes.find(n=>n.id==='c6');
  if(c6)console.log('\nc6 : cible='+c6.target+' | statut='+c6.status+' | dueDay='+c6.dueDay+' | pieces='+(c6.pieces||[]).join(','));
 });
}).on('error',e=>console.log('injoignable : '+e.message));
