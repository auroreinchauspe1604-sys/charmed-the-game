'use strict';
// Real transport smoke check, private and without a Store: no saved game operations.
const fs=require('fs'),path=require('path');
process.env.CHARMED_SCENARIO='manoir-assiege';
const {Intelligence,answerSchema}=require('../serveur/charmed/intelligence-v3');
(async()=>{
 const result=await new Intelligence().judge({role:'arbitre de contrôle documentaire hors partie',instruction:'Contrôle documentaire privé, sans aucune opération de partie. Proposition : une fiole de potion brisée ne signifie pas nécessairement un contenu inutilisable ; Paige peut dans un précédent appliquer par télékinésie à orbes la potion répandue. Est-ce un précédent documenté avant S07E17 ? Ne demande pas de moyens de partie : ceci teste seulement la bibliothèque. accepted=true si ce précédent est documenté, sufficient=true, missing=0,delay=0,situationChanged=false,changeReason vide,dependsOn vide. Citer dans canon.facts un identifiant admissible pertinent ; reason explique le précédent et une limite. Ne pas inventer un pouvoir permanent.'},answerSchema);
 const pass=result.accepted&&result.canon?.status==='verified'&&result.canon.facts.includes('library:potion-repandue');
 fs.writeFileSync(path.join(__dirname,'../Charmed/canon/contributions-integrees/verification-ia.json'),JSON.stringify({date:new Date().toISOString(),pass,scope:'Un contrôle documentaire réel, pas une partie complète ; aucune sauvegarde utilisée.',result},null,2)+'\n');
 console.log(JSON.stringify({pass,canon:result.canon,reason:result.reason}));if(!pass)process.exitCode=1;
})().catch(e=>{console.error(e.message);process.exitCode=1;});
