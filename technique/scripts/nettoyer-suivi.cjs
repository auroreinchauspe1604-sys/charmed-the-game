'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.join(' ')+'\n'+((r.stdout||'')+(r.stderr||'')).trim()+'\n');};
// Le verrou de journal et les logs du serveur sont de l'etat d'execution :
// ils ne doivent pas etre suivis. Le fichier reste sur le disque.
git('rm','--cached','-r','--ignore-unmatch','etat/charmed/nexus-sous-tension/avant-la-vision.v3.jsonl.lock','technique/rapports/serveur.log','technique/rapports/serveur-err.log');
git('add','-A');
git('commit','-m','Ne plus suivre les verrous et les logs du serveur\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
git('push','origin','main');
git('status','--short','-b');
