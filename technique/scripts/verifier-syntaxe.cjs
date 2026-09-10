'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const f=path.resolve(__dirname,'../serveur/charmed/intelligence-v3.js');
const src=fs.readFileSync(f,'utf8');
try{new vm.Script(src,{filename:f});console.log('Syntaxe OK');}
catch(e){
 console.log(e.message);
 const m=/:(\d+)$/.exec((e.stack||'').split('\n')[0])||/intelligence-v3\.js:(\d+)/.exec(e.stack||'');
 console.log((e.stack||'').split('\n').slice(0,6).join('\n'));
}
