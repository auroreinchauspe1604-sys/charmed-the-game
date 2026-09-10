const fs=require('fs');
const html='ecrans/charmed.html',js='ecrans/modules/charmed.js';
for(const file of [html,js]){
 let s=fs.readFileSync(file,'utf8');
 s=s.replaceAll('L’arbitre','L’Ange du destin').replaceAll('l’arbitre','l’Ange du destin').replace('’Arbitre</h2>','’Ange<br><span class="subtitle">du destin</span></h2>').replaceAll('selection-b-1','selection-b-2');
 fs.writeFileSync(file,s);
}
