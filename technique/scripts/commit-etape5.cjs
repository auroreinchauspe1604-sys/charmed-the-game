'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.slice(0,2).join(' ')+'\n'+(r.stdout||'')+(r.stderr||''));};
git('add','-A');
git('commit','-m','Le tri : une seule source de verite pour les regles\n\nLes consignes ne paraphrasent plus les regles. Elles sont lues dans\nREGLES_ACTEES.md par le pointeur regles, decoupe en 74 sections avec\nrecherche et tolerance de frappe sur les titres. Le prompt ne garde que le\ncontrat de sortie : semantique des champs attendus par le moteur.\n\nUn message d arbitrage passe de 767 Ko a environ 16 Ko. Modifier une regle\ndans le document suffit desormais a changer le comportement de l arbitre.\n\n105 tests au vert.\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
git('push','origin','main');
git('log','--oneline','-3');
