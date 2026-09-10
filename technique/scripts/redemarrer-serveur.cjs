'use strict';
const {spawnSync,spawn}=require('child_process'),path=require('path'),fs=require('fs');
const racine=path.resolve(__dirname,'..');
const net=spawnSync('powershell',['-NoProfile','-Command','(Get-NetTCPConnection -LocalPort 3132 -State Listen -ErrorAction SilentlyContinue).OwningProcess'],{encoding:'utf8'});
const pid=(net.stdout||'').trim().split(/\s+/)[0];
if(pid){spawnSync('taskkill',['/PID',pid,'/F'],{encoding:'utf8'});console.log('Ancien serveur arrêté (PID '+pid+').');}
const log=fs.openSync(path.join(racine,'rapports','serveur.log'),'a');
const enfant=spawn(process.execPath,[path.join(racine,'scripts','jouer-nexus-sous-tension.cjs')],
 {detached:true,stdio:['ignore',log,log],cwd:path.resolve(racine,'..')});
enfant.unref();
setTimeout(()=>{
 require('http').get({host:'127.0.0.1',port:3132,path:'/api/charmed'},r=>console.log('Serveur relancé — HTTP '+r.statusCode))
  .on('error',e=>console.log('pas encore joignable : '+e.message));
},3000);
