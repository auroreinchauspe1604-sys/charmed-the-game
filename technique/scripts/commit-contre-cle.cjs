'use strict';
const {spawnSync}=require('child_process'),path=require('path');
const racine=path.resolve(__dirname,'../..');
const git=(...a)=>{const r=spawnSync('git',a,{cwd:racine,encoding:'utf8'});console.log('> git '+a.slice(0,2).join(' ')+'\n'+((r.stdout||'')+(r.stderr||'')).trim()+'\n');};
git('add','-A');
git('commit','-m','Contre-cle sur verrou pret, et correction ciblee de l examen du jour 7\n\nRegle : un verrou pret est contestable pendant son delai de reaction, comme\nune attaque revelee se defend avant sa resolution. La contre-cle se forme\nsans attendre l activation, ne produit aucun effet avant elle, et tombe sans\nobjet en rendant ses ressources si le verrou n est pas etabli.\n\nCorrection ciblee (Partie 6 SS3) : c4 et c7 avaient la meme echeance et ont\nete departagees sans fait etablissant l ordre causal, contre la Partie 3\nSS11. La reponse acceptee sur c4 etablissait que Phoebe etait a l interieur\ndu bouclier. c7 echoue et doit son avantage au defenseur ; c4 revient a l\nexamen. Journal conserve, aucun autre coup touche.\n\n106 tests au vert.\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01YMxs9E5zhcqDBETf4yCFnX');
git('push','origin','main');
