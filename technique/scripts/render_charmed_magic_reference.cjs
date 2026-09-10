'use strict';
// Vue lisible du corpus documentaire ; aucune écriture dans la partie.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const corpus = require(path.join(root, 'technique/donnees-bibliotheque/canon/magie-demons.json'));
const construction = require(path.join(root, 'technique/donnees-bibliotheque/canon/construction.json'));
const sources = new Map(corpus.sources.map(s => [s.id,s]));
function refs(ids) { return ids.map(id => { const s = sources.get(id); return `[${id}](${s.url}) (${s.level})`; }).join(' ; '); }
const lines = [
  '# Charmed — règles magiques et principaux démons', '',
  'Version de travail du ' + corpus.checkedAt + '. ' + corpus.coverage, '',
  '## Périmètre', '', ...Object.values(corpus.policy).map(v => '- ' + v), '',
  '## Règles magiques', ''
];
for (const r of corpus.rules) {
  lines.push('### ' + r.title, '', r.claim, '',
    '**Application proposée au raisonnement du jeu :** ' + r.application.text, '',
    '**Ne pas en déduire :** ' + r.notImplied, '',
    '**Repères :** ' + (r.episodeRefs.join(', ') || 'Transversal ; chronologie à préciser') + '.', '',
    '**Preuves :** ' + refs(r.sources), '');
}
lines.push('## Lieux de pouvoir', '');
for (const p of corpus.places) {
  lines.push('### ' + p.name, '', p.nature, '',
    '**Effets :** ' + p.effects.join(' '), '',
    '**Limites :** ' + p.limits.join(' '), '',
    '**Application proposée :** ' + p.application.text, '',
    '**À vérifier :** ' + p.unknowns.join(' '), '',
    '**Repères :** ' + p.episodeRefs.join(', ') + '.', '',
    '**Preuves :** ' + refs(p.sources), '');
}
lines.push('## Autres êtres surnaturels', '');
for (const b of corpus.beings) {
  lines.push('### ' + b.name, '', b.nature, '',
    '**Effets :** ' + b.effects.join(' '), '',
    '**Limites :** ' + b.limits.join(' '), '',
    '**Interaction :** ' + b.interaction, '',
    '**À vérifier :** ' + b.unknowns.join(' '), '',
    '**Repères :** ' + b.episodeRefs.join(', ') + '.', '',
    '**Preuves :** ' + refs(b.sources), '');
}
lines.push('## Bestiaire principal', '');
for (const d of corpus.demons) {
  lines.push('### ' + d.name, '', d.nature + ' ' + d.motivation, '',
    '**Moyens documentés :** ' + d.capabilities.join(' '), '',
    '**Limites de la fiche :** ' + d.limits.join(' '), '',
    '**Contre-moyens :** ' + d.counter.text, '',
    '**Repères :** ' + d.episodeRefs.join(', ') + '.', '',
    '**Preuves :** ' + refs(d.sources), '');
}
lines.push('## Contrôle et intégration', '',
  'Les identifiants, sources et épisodes sont contrôlés par checkMagicCorpus(). reference({kind: "rule", "demon", "place" ou "being", id}) restitue la fiche, ses preuves et ses limites. Les tests documentaires ne certifient pas la vérité de toutes les sources ; voir EXPERTISE_DOSSIER.md pour les résultats.', '',
  'Le corpus est raccordé aux propositions, réponses et résolutions de l’arbitre comme contexte documentaire. Les faits admissibles passent en plus par le filtre temporel de canon.js. Les biographies et recettes partielles ne constituent pas une preuve automatique de réussite. Les règles de jeu et le journal sont conservés. Le joueur adverse reçoit uniquement les connaissances explicites de son camp et le plateau public.', '',
  'Les recettes exactes, les immunités exhaustives et les chronologies de retours restent à approfondir. La préparation produit un brouillon à examiner, sans démarrer une nouvelle partie.', '');
const output = path.join(root,'technique/donnees-bibliotheque/canon/REGLES_MAGIQUES_ET_DEMONS.md');
fs.writeFileSync(output, lines.join('\n'), 'utf8');
console.log(output);
const constructionSources=new Map(construction.sources.map(s=>[s.id,s]));
function constructionRefs(ids){return ids.map(id=>{const s=id.startsWith('magic:')?sources.get(id.slice(6)):constructionSources.get(id);return `[${id}](${s.url}) (${s.level})`;}).join(' ; ');}
const readable=['# Charmed — lieux, objets et construction des parties','','Base de travail partielle ; les conditions proposées pour le gameplay sont distinguées des propriétés documentées de la série. Aucun contenu manquant ne doit être inventé comme fait canonique.',''];
for(const [kind,title] of [['place','Lieux et accès'],['object','Objets'],['method','Méthodes magiques'],['event','Événements'],['alteration','Altérations'],['information','Informations et preuves']]){
 readable.push('## '+title,'');
 for(const e of construction.entries.filter(e=>e.kind===kind))readable.push('### '+e.title,'',e.claim,'','Conditions à examiner : '+e.requirements.join(' ; ')+'.','','Limite : '+e.limit,'','Statut : '+e.status+'. '+e.dateMeaning,'',e.sources.length?'Sources : '+constructionRefs(e.sources):'Référence : règles de jeu et scénario initial actés ; ce n’est pas une propriété encyclopédique de la série.','');
}
readable.push('## Préparation', '', ...Object.values(construction.preparationPolicy).map(v=>'- '+v),'',
 'Le code prepareBrief produit objectifs, ressources, contenus des documents, calendrier, connaissances par camp et chemins privés. Il contrôle les références matérielles et la faisabilité minimale du calendrier ; il ne prouve pas l’équilibrage ni la validité de chaque proposition narrative. Le résultat reste draft_not_started et requiresReview. Aucun démarrage ni sauvegarde de nouvelle partie n’est déclenché.', '');
fs.writeFileSync(path.join(root,'technique/donnees-bibliotheque/canon/CONSTRUCTION_DES_PARTIES.md'),readable.join('\n'),'utf8');
