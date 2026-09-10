// Archive la partie en cours et repart à zéro sur le scénario demandé.
// Rien n'est supprimé : le journal précédent est déplacé dans un dossier daté.
'use strict';
const fs=require('fs'),path=require('path');
const scenario=process.argv[2]||'nexus-sous-tension';
const etat=path.resolve(__dirname,'../../etat/charmed',scenario);
const horodatage=new Date().toISOString().replace(/[-:T]/g,'').slice(0,14);
if(fs.existsSync(etat)){
 const archive=path.join(etat,'archive-partie-'+horodatage);
 const journaux=fs.readdirSync(etat).filter(f=>f.endsWith('.jsonl')||f.endsWith('.jsonl.lock'));
 if(journaux.length){
  fs.mkdirSync(archive,{recursive:true});
  for(const f of journaux)fs.renameSync(path.join(etat,f),path.join(archive,f));
  console.log('Partie précédente archivée dans '+path.basename(archive)+' ('+journaux.length+' fichier(s)).');
 } else console.log('Aucun journal à archiver.');
} else console.log('Aucun état antérieur pour ce scénario.');
// Les sessions Claude sont liées au dossier d'état : une nouvelle partie doit
// repartir avec un fil de raisonnement neuf, sinon l'arbitre garde en mémoire
// les verdicts de la partie précédente.
const sessions=path.join(etat,'sessions');
if(fs.existsSync(sessions)){
 fs.renameSync(sessions,path.join(etat,'sessions-'+horodatage));
 console.log('Fils de session Claude remis à neuf.');
}
console.log('Prêt. Scénario : '+scenario);
