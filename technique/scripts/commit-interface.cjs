'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.slice(0,2).join(' ')+'\n'+(r.stdout||'')+(r.stderr||''));};
git('add','-A');
git('commit','-m','Une carte qui ne recoit pas de pose dit pourquoi, et par ou passer\n\nCliquer un verrou adverse encore inactif n ouvrait aucun choix et ne disait\nrien. La carte affiche desormais le motif et les voies reelles : verrouiller\nla ressource que la carte engage, ou poser une question.\n\nAucune regle changee. 105 tests au vert.\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
git('push','origin','main');
