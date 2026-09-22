// Contrôles de conception avant de lancer la partie, sur le modèle de
// verifier-sentence.cjs, étendus au contrat de module et au cas des deux états faux.
'use strict';
process.env.CHARMED_SCENARIO='la-dette-des-halliwell';
const s=require('../../scenarios/la-dette-des-halliwell/scenario');
const E=require('../serveur/charmed/engine');

let alerte = 0;
const dire = (ok, texte) => { console.log((ok ? '  ok    ' : '  ALERTE ') + texte); if (!ok) alerte++; };

console.log('« ' + s.title +' » — ' + s.period + ' — échéance J' + s.finalDay
  + ' | sous-états ' + JSON.stringify(s.subgoalSlots) + '\n');

console.log('-- contrat de module --');
for (const champ of ['id','title','period','canonPeriod','finalDay','resources','subgoalSlots','camps','opponentRole','goals','initialFacts','opening','calendar','campKnowledge','privateFacts','doctrine'])
  dire(s[champ] !== undefined, 'champ présent : ' + champ);
dire(typeof s.doctrine === 'string' && s.doctrine.length > 400, 'doctrine sous forme de chaîne (' + s.doctrine.length + ' car.)');
dire(s.camps.length === 2 && s.camps.every(c => c.id && c.name && c.icon), 'deux camps nommés avec icône');
dire(!s.camps.some(c => /^phoebe$|^commanditaire$/.test(c.name)), 'aucun camp affiché sous son identifiant technique');
for (const p of ['routes','documents','creations','inventions'])
  dire(s.privateFacts[p] !== undefined, 'privateFacts.' + p + ' présent');

console.log('\n-- cartes --');
const ids = s.resources.map(r => r.id);
dire(new Set(ids).size === ids.length, 'aucun identifiant de carte en double');
const titres = s.resources.map(r => r.title);
dire(new Set(titres).size === titres.length, 'aucun titre de carte en double (resourceIdentity)');
for (const camp of ['phoebe', 'commanditaire']) {
  const mains = s.resources.filter(r => r.owner === camp);
  const chemins = s.privateFacts.routes.filter(r => r.camp === camp);
  console.log('-- ' + camp + ' : ' + mains.length + ' cartes, ' + chemins.length + ' chemins --');
  dire(mains.length === 7, camp + ' : sept cartes');
  dire(chemins.length >= 2, camp + ' : au moins deux chemins');
  for (const r of mains) {
    const usages = chemins.flatMap(c => c.branches).filter(b => b.resources.includes(r.id)).length;
    dire(usages >= 1, r.id + ' : employée dans ' + usages + ' branche(s)');
  }
  for (const c of chemins) {
    dire(c.branches.every(b => b.resources.length >= 2), c.title + ' : chaque branche croise au moins deux moyens');
    dire(c.branches.every(b => new Set(b.resources).size === b.resources.length), c.title + ' : aucune ressource répétée dans une même branche');
    dire(c.branches.every(b => b.resources.every(id => mains.some(m => m.id === id))), c.title + ' : toutes les ressources témoins appartiennent au camp');
    const cout = c.branches.reduce((n, b) => n + b.resources.length + 1 + (b.attack ? 1 : 0), 1);
    dire(cout <= s.finalDay, c.title + ' : tient dans le calendrier (' + cout + ' ≤ ' + s.finalDay + ')');
  }
}

console.log('\n-- objectifs --');
for (const g of s.goals) {
  const conditions = g.title.split(/,| et /).filter(x => x.trim().length > 12).length;
  dire(conditions >= 4, g.id + ' : ' + conditions + ' conditions distinctes, départ ' + (g.initialValue ? 'VRAI (à maintenir)' : 'FAUX (à établir)'));
  dire(!!g.shortTitle && !!g.owner, g.id + ' : shortTitle et owner renseignés');
}
dire(s.goals.some(g => g.id === 'root-phoebe') && s.goals.some(g => g.id === 'root-commanditaire'), 'les deux racines attendues par le moteur sont présentes');
const vrais = s.goals.filter(g => g.initialValue).length;
console.log('  info   répartition initiale : ' + vrais + ' état(s) vrai(s), ' + (2 - vrais) + ' faux');

console.log('\n-- calendrier --');
dire(s.calendar.every(e => e.morning >= 1 && e.morning <= s.finalDay), 'tous les événements tombent entre J1 et J' + s.finalDay);
dire(s.calendar.some(e => e.morning === s.finalDay), 'un événement de constat au matin de l’échéance');
dire(new Set(s.calendar.map(e => e.id)).size === s.calendar.length, 'aucun identifiant d’événement en double');
dire(s.calendar.every(e => e.impacts && e.impacts.phoebe && e.impacts.commanditaire), 'chaque événement porte ses impacts pour les deux camps');
for (const e of s.calendar.filter(e => e.grants))
  for (const g of e.grants)
    dire(Object.hasOwn(s.privateFacts.documents, g.title),
      'J' + e.morning + ' : la carte « ' + g.title + ' » a un contenu fixe dans privateFacts.documents');

console.log('\n-- créations anticipées --');
for (const camp of ['phoebe', 'commanditaire']) {
  const liste = s.privateFacts.creations[camp] || [];
  dire(liste.length >= 4, camp + ' : ' + liste.length + ' demandes prévues');
  dire(liste.some(c => c.possible === false), camp + ' : au moins un refus anticipé et motivé');
  dire(liste.every(c => !!c.limite), camp + ' : chaque demande dit ce qu’elle ne fait pas');
  dire(liste.filter(c => c.possible).every(c => c.obtention && Number.isInteger(c.delai)), camp + ' : chaque possibilité a obtention et délai entier');
}

console.log('\n-- démarrage moteur --');
const etat = E.initial();
dire(etat.nodes.length === 2 && etat.day === 1 && etat.phase === 'player',
  'plateau initial cohérent : ' + etat.nodes.length + ' objectifs, jour ' + etat.day + ', phase ' + etat.phase);
dire(etat.resources.length === 14, 'quatorze cartes chargées');
dire(etat.resources.every(r => E.availability(etat, r) === 'free'), 'toutes les cartes de départ sont disponibles');
for (const n of etat.nodes)
  dire(n.goalMode === (n.initialValue ? 'maintain' : 'achieve') && n.status === (n.initialValue ? 'true' : 'open'),
    n.id + ' : goalMode=' + n.goalMode + ', status=' + n.status);

console.log('\n' + (alerte ? alerte + ' ALERTE(S)' : 'Tout est conforme.'));
process.exit(alerte ? 1 : 0);
