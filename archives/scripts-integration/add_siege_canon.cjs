const fs=require('fs');const p='Charmed/canon/base.json',b=JSON.parse(fs.readFileSync(p,'utf8'));
if(!b.sources.some(s=>s.id==='scry-hard-transcript'))b.sources.push({id:'scry-hard-transcript',url:'https://www.springfieldspringfield.co.uk/view_episode_scripts.php?episode=s07e17&tv-show=charmed',type:'transcription du dialogue, consultée le 8 septembre 2026',scope:'Siège, Léo mortel et cristaux ; pas recette exhaustive'});
const facts=[
{id:'scry-hard-siege',entities:['Zankou','Nexus','manoir'],claim:'Zankou organise une diversion avec des guerriers pour éloigner les sœurs et faire localiser le Nexus dans le manoir ; la localisation ne vaut pas encore maîtrise de son pouvoir.'},
{id:'scry-hard-crystals',entities:['Piper','cristaux','Léo'],claim:'Piper indique avoir disposé des cristaux pour protéger Léo au manoir. Cela établit un usage protecteur situé, pas une invulnérabilité universelle ni une recette complète.'},
{id:'scry-hard-leo-mortal',entities:['Léo'],claim:'Léo est mortel, ne peut plus s’éclipser ni se guérir après avoir renoncé à ses pouvoirs.'}];
for(const f of facts)if(!b.facts.some(x=>x.id===f.id))b.facts.push({...f,season:7,episode:17,sources:['scry-hard-transcript'],status:'verified',evidenceLevel:'episode_dialogue_transcript',limits:['Transcription du dialogue, pas visionnage ni démonstration exhaustive de portée.']});
fs.writeFileSync(p,JSON.stringify(b,null,2)+'\n');
