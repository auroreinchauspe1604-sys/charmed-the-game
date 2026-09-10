// L'ancienne consigne adverse s'étendait sur plusieurs lignes ; le remplacement
// n'en avait pris qu'une et laissait le reste orphelin. On supprime ces lignes.
'use strict';
const fs=require('fs'),path=require('path');
const f=path.resolve(__dirname,'../serveur/charmed/intelligence-v3.js');
const brut=fs.readFileSync(f,'utf8');
const FIN=brut.includes('\r\n')?'\r\n':'\n';
const lignes=brut.split(/\r?\n/);
const i=lignes.findIndex(l=>l.startsWith(' opponent(s){'));
if(i<0){console.error('opponent introuvable');process.exit(1);}
let j=i+1;
while(j<lignes.length&&!/^\}\s*$/.test(lignes[j])&&!lignes[j].startsWith('module.exports=')) j++;
console.log('Lignes orphelines supprimées : '+(j-i-1));
console.log('Première : '+(lignes[i+1]||'').slice(0,80));
console.log('Dernière : '+(lignes[j-1]||'').slice(-80));
lignes.splice(i+1,j-i-1);
fs.writeFileSync(f,lignes.join(FIN));
