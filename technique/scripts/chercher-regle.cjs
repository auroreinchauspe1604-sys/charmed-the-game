'use strict';
const outils=require('../serveur/charmed/agent-tools');
const sections=outils.rulesSections();
const motif=new RegExp('coule de source|va de soi|accessoire|ordinaire|implicite|habituel|mot pour mot','i');
for(const [titre,texte] of Object.entries(sections)){
 for(const ligne of texte.split(/\n/)) if(motif.test(ligne))
  console.log('['+titre+']\n  '+ligne.trim().slice(0,400)+'\n');
}
