'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.join(' ')+'\n'+((r.stdout||'')+(r.stderr||'')).trim()+'\n');return (r.stdout||'').trim();};
const enAttente=git('status','--short');
if(enAttente){
 git('add','-A');
 git('commit','-m','Partie en cours et outillage de session\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
} else console.log('(rien de nouveau a commiter)\n');
git('push','origin','main');
git('push','origin','avant-fusion-2026-09-10');
git('push','origin','nico-refonte-2026-09-10');
git('status','--short','-b');
git('log','--oneline','-6');
