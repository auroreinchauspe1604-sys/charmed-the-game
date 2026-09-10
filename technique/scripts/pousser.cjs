'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.join(' ')+'\n'+(r.stdout||'')+(r.stderr||''));};
git('push','origin','main');
git('status','--short','-b');
