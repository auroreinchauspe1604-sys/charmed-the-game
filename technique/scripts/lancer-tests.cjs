'use strict';
const {spawnSync}=require('child_process'),fs=require('fs'),path=require('path');
const racine=path.resolve(__dirname,'..');
const fichiers=[];
(function parcours(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){
 const p=path.join(d,e.name);
 if(e.isDirectory())parcours(p);else if(/\.test\.(c?js|mjs)$/.test(e.name))fichiers.push(p);
}})(racine);
console.log('Fichiers de test : '+fichiers.length);
const r=spawnSync(process.execPath,['--test',...fichiers],{encoding:'utf8',maxBuffer:1<<26});
const sortie=(r.stdout||'')+(r.stderr||'');
const lignes=sortie.split(/\r?\n/);
console.log(lignes.filter(l=>/^# (tests|pass|fail|cancelled) /.test(l)).join('\n'));
const echecs=lignes.filter(l=>/^not ok /.test(l));
if(echecs.length){console.log('\nECHECS :');echecs.forEach(l=>console.log('  '+l));}
fs.writeFileSync(path.join(racine,'rapports','tests.txt'),sortie);
