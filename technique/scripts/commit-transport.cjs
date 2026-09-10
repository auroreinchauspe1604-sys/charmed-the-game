'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.slice(0,2).join(' ')+'\n'+(r.stdout||'')+(r.stderr||''));};
git('add','-A');
git('commit','-m','Le transport Claude fonctionne, et une maladresse ne coute plus un coup\n\nTrois defauts corriges, decouverts en rejouant les six dictees reelles :\n- --setting-sources vide avalait l option suivante ; forme accolee ;\n- le .cmd passait par cmd.exe qui massacrait les guillemets du schema JSON ;\n  on vise desormais le binaire reel, sans shell ;\n- un id inexistant dans dependsOn faisait perdre le coup au joueur ; le\n  moteur ecarte l id au lieu d echouer, et le contrat de sortie dit\n  explicitement que dependsOn ne contient que des cartes du plateau.\n\nLes six dictees passent : clef reformulee fidelement, verrou accepte,\nattaque sur ressource engagee refusee, deux ressources accordees avec delai\nmotive, une demande de trois mots refusee gratuitement pour ambiguite.\n\n105 tests au vert.\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
git('push','origin','main');
git('log','--oneline','-2');
