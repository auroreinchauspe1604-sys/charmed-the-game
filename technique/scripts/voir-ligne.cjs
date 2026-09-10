'use strict';
const fs=require('fs'),path=require('path');
const f=path.resolve(__dirname,'../serveur/charmed/intelligence-v3.js');
const l=fs.readFileSync(f,'utf8').split(/\r?\n/);
const prefixe=process.argv[2]||' opponent(s){';
l.forEach((x,i)=>{if(x.startsWith(prefixe)){
 console.log('ligne '+(i+1)+' — '+x.length+' caracteres');
 console.log('DEBUT: '+x.slice(0,260));
 console.log('FIN  : '+x.slice(-160));
}});
