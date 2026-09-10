'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.slice(0,2).join(' ')+'\n'+(r.stdout||'')+(r.stderr||''));};
git('add','-A');
git('commit','-m','Deux regles manquantes ecrites dans REGLES_ACTEES\n\nPartie 3 SS0 : un acte compose n est pas une ambiguite. Etait dans les\nconsignes d arbitrage, donc nulle part dans les regles.\n\nPartie 4 SS5 : ce qui est visible sur le plateau est connu des deux camps.\nRegle nouvelle, issue de la contestation du verdict c4.\n\nHistorique et changelog date mis a jour. 105 tests au vert.\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
git('log','--oneline','-2');
