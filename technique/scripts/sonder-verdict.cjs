// Capture le verdict brut de l'Ange sur une dictée, pour voir quel champ fait
// échouer le moteur.
'use strict';
process.env.CHARMED_SCENARIO='nexus-sous-tension';
const os=require('os'),path=require('path'),fs=require('fs');
process.env.CHARMED_STATE_DIR=fs.mkdtempSync(path.join(os.tmpdir(),'charmed-sonde-'));
const E=require('../serveur/charmed/engine');
const {Intelligence}=require('../serveur/charmed/intelligence-v3');
(async()=>{
 const ia=new Intelligence();
 const s=E.initial();
 const verdict=await ia.plan(s,'phoebe',{kind:'key',target:'root-phoebe',resource:'cristaux',
  text:"disposition des cristaux autour du livre et des souer qui sont protége par le bouclier energique des critaux et leur permetttent de conserver le livre. les demon de peuvent pas franchir le bouclier "});
 console.log(JSON.stringify(verdict,null,1));
 const ids=new Set([...s.nodes.map(n=>n.id),...s.resources.map(r=>r.id)]);
 for(const champ of ['dependsOn','locations'])
  for(const v of verdict[champ]||[]) if(!ids.has(v)) console.log('!! '+champ+' contient un id inconnu : '+v);
})();
