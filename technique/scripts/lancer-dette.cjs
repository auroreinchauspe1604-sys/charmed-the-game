'use strict';
const {spawnSync,spawn}=require('child_process'),path=require('path'),fs=require('fs');
const racine=path.resolve(__dirname,'..');
const net=spawnSync('powershell',['-NoProfile','-Command','(Get-NetTCPConnection -LocalPort 3140 -State Listen -ErrorAction SilentlyContinue).OwningProcess'],{encoding:'utf8'});
const pid=(net.stdout||'').trim().split(/\s+/)[0];
if(pid){spawnSync('taskkill',['/PID',pid,'/F'],{encoding:'utf8'});console.log('Ancien serveur arrêté.');}
const log=fs.openSync(path.join(racine,'rapports','serveur-dette.log'),'a');
const enfant=spawn(process.execPath,[path.join(racine,'scripts','jouer-la-dette-des-halliwell.cjs')],
 {detached:true,stdio:['ignore',log,log],cwd:path.resolve(racine,'..')});
enfant.unref();
setTimeout(()=>{
 require('http').get({host:'127.0.0.1',port:3140,path:'/api/charmed'},r=>{
  let d='';r.on('data',c=>d+=c);r.on('end',()=>{const j=JSON.parse(d);
   console.log('HTTP '+r.statusCode+' — « '+j.title+' » jour '+j.day+'/'+j.finalDay+' | phase '+j.phase);
   console.log('http://localhost:3140/');});
 }).on('error',e=>console.log('pas encore joignable : '+e.message));
},3500);
