const fs=require('fs');let p='ecrans/modules/charmed.js',s=fs.readFileSync(p,'utf8');
const statement="$('facts').replaceChildren(button('Faits établis',()=>readPages('Faits établis',state.facts.join('\\n\\n'))));";
s=s.replace(statement,'');
s=s.replace('container.append(d);if(entries.length>1)',"if(container.id==='arbitration'){const f=el('div','facts');f.id='facts';f.append(button('Faits établis',()=>readPages('Faits établis',state.facts.join('\\n\\n'))));d.append(f);}container.append(d);if(entries.length>1)");fs.writeFileSync(p,s);
p='ecrans/charmed.html';s=fs.readFileSync(p,'utf8').replace('<section class="facts" id="facts" aria-label="Faits établis"></section>','').replaceAll('selection-b-2','selection-b-4');fs.writeFileSync(p,s);
