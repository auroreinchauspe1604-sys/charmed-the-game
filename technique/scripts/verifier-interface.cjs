'use strict';
const fs=require('fs'),path=require('path'),vm=require('vm');
const f=path.resolve(__dirname,'../ecrans/modules/charmed.js');
try{new vm.Script(fs.readFileSync(f,'utf8'),{filename:f});console.log('Syntaxe interface OK');}
catch(e){console.log('ERREUR : '+e.message);console.log((e.stack||'').split('\n').slice(0,5).join('\n'));}
