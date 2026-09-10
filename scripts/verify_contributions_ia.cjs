'use strict';
// Real transport smoke check, private and without a Store: no saved game operations.
const fs=require('fs'),path=require('path');
process.env.CHARMED_SCENARIO='manoir-assiege';
const {Intelligence,answerSchema}=require('../serveur/charmed/intelligence-v3');
(async()=>{
 const result=await new Intelligence().judge({demande:'Vérifier le précédent documentaire',proposition:'Paige applique par télékinésie à orbes une potion répandue après la casse de sa fiole.',periode:'Avant S07E17'},answerSchema);
 const pass=result.accepted&&result.canon?.status==='verified'&&result.canon.facts.includes('library:potion-repandue');
 fs.writeFileSync(path.join(__dirname,'../Charmed/canon/contributions-integrees/verification-ia.json'),JSON.stringify({date:new Date().toISOString(),pass,scope:'Un contrôle documentaire réel, pas une partie complète ; aucune sauvegarde utilisée.',result},null,2)+'\n');
 console.log(JSON.stringify({pass,canon:result.canon,reason:result.reason}));if(!pass)process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
