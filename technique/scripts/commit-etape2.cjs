'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.slice(0,2).join(' ')+'\n'+(r.stdout||'')+(r.stderr||''));return r.status;};
git('add','-A');
git('commit','-m','Etape 2 : pointeurs et sessions continues, sans fuite des faits prives\n\nL adversaire ne recoit plus scenario.privateFacts : ses connaissances passent\npar le pointeur connaissances, et rien d autre. La preparation consulte sa\npropre specification au lieu du scenario en cours. Six tests reecrits contre\nle contrat de pointeurs. 105 tests au vert.\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
git('log','--oneline','-3');
