'use strict';
const fs=require('fs'),path=require('path');
const f=path.resolve(__dirname,'../../regles/REGLES_ACTEES.md');
const l=fs.readFileSync(f,'utf8').split(/\r?\n/);
l.forEach((x,i)=>{if(/^#{1,4} /.test(x))console.log((i+1)+'  '+x);});
