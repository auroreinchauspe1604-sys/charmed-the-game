'use strict';
const fs=require('fs'),path=require('path');
const file=path.resolve(__dirname,'../serveur/charmed/intelligence-v3.js');
const lignes=fs.readFileSync(file,'utf8').split(/\r?\n/);
lignes.forEach((l,i)=>{
 if(/privateFacts|const pointeurs=opponent|joueur adverse|input\.spec/.test(l))
  console.log((i+1)+': '+l.trim().slice(0,320));
});
