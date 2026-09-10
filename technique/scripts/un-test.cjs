'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const f=path.resolve(__dirname,'../serveur/charmed',process.argv[2]||'engine.test.js');
const r=spawnSync(process.execPath,['--test','--test-name-pattern',process.argv[3]||'',f],{encoding:'utf8',maxBuffer:1<<26});
console.log(((r.stdout||'')+(r.stderr||'')).split(/\r?\n/).filter(l=>!/^ok |^# (Sub)?|duration_ms|^  \.\.\.$|^  ---$|type: 'test'/.test(l)).join('\n').slice(0,4000));
