'use strict';
const {spawnSync}=require('child_process'),fs=require('fs'),path=require('path');
const net=spawnSync('powershell',['-NoProfile','-Command','(Get-NetTCPConnection -LocalPort 3132 -State Listen -ErrorAction SilentlyContinue).OwningProcess'],{encoding:'utf8'});
const pid=(net.stdout||'').trim().split(/\s+/)[0];
if(pid){spawnSync('taskkill',['/PID',pid,'/F'],{encoding:'utf8'});console.log('Serveur arrêté (PID '+pid+').');}
else console.log('Aucun serveur en écoute.');
const etat=path.resolve(__dirname,'../../etat/charmed/nexus-sous-tension');
const journal=path.join(etat,'avant-la-vision.v3.jsonl');
const verrou=journal+'.lock';
if(fs.existsSync(verrou)){fs.unlinkSync(verrou);console.log('Verrou résiduel retiré.');}
const copie=path.join(etat,'avant-correction-jour7-'+new Date().toISOString().replace(/[-:T]/g,'').slice(0,14)+'.jsonl');
fs.copyFileSync(journal,copie);
console.log('Trace de l’état antérieur : '+path.basename(copie));
