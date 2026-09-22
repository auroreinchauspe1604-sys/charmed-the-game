// Contrôles de conception de « Ce qui s'est noué ». Deux familles de contrôles
// propres à ce scénario : la main partagée intégrale, et le dispositif des
// trois versions (présence des trois, invariant présent dans les trois,
// carte-témoin qui ne pèse d'aucun côté, calendrier des tassements).
'use strict';
process.env.CHARMED_SCENARIO='ce-qui-sest-noue';
const s=require('../../scenarios/ce-qui-sest-noue/scenario');
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

console.log('\n-- cartes (pool commun) --');
const ids = s.resources.map(r => r.id);
dire(new Set(ids).size === ids.length, 'aucun identifiant de carte en double');
dire(new Set(s.resources.map(r => r.title)).size === s.resources.length, 'aucun titre de carte en double');
dire(s.resources.length === 14, 'quatorze cartes déclarées (' + s.resources.length + ')');
for (const camp of ['phoebe', 'commanditaire']) {
  const main = s.resources.filter(r => r.owner === camp);
  dire(main.length === 7, camp + ' : sept cartes en main propre (' + main.length + ')');
}
dire(!s.resources.some(r => r.owner === null), 'aucune carte commune : ce scénario n’utilise pas la main partagée');
dire(s.resources.every(r => ['objet','lieu'].includes(r.category)), 'aucun personnage dans le pool : les sœurs agissent, elles ne se possèdent pas');
dire(s.resources.every(r => !r.heldBy && !r.lost && !r.consumed), 'aucune carte engagée, perdue ou consommée au départ');
const auJour1 = s.resources.filter(r => r.availableDay === 1).length;
dire(auJour1 === s.resources.length, auJour1 + ' cartes disponibles dès le jour 1');
dire(s.resources.every(r => r.availableDay >= 1 && r.availableDay < s.finalDay), 'toutes les cartes arrivent avant l’échéance');

console.log('\n-- dispositif des trois versions --');
const faits = s.initialFacts.join(' ');
for (const v of ['VERSION I', 'VERSION II', 'VERSION III'])
  dire(faits.includes(v), v + ' est donnée en clair au joueur dès le premier jour');
const versions = s.initialFacts.filter(f => /^VERSION (I|II|III) —/.test(f));
dire(versions.length === 3, 'trois versions complètes (' + versions.length + ')');
for (const v of versions) {
  const conditions = v.split(';').length;
  dire(conditions >= 5, v.slice(0, 40) + '… : ' + conditions + ' conditions');
}
const invariant = [/celle qui n’était pas là/, /celle qui n’a pas grandi avec vous/, /la quatrième, qui n’a jamais été liée/];
dire(versions.every((v, i) => invariant[i].test(v)), 'l’invariant figure dans les trois versions, formulé différemment dans chacune');
dire(!faits.toLowerCase().includes('invariant'), 'le mot « invariant » n’est jamais donné au joueur');

console.log('\n-- la carte qui ne pèse pas --');
const pesantes = s.resources.filter(r => /Pèse/.test(r.description));
const neutres = s.resources.filter(r => !/Pèse/.test(r.description) && /Ne pèse d’aucun côté/.test(r.description));
dire(neutres.length === 1, 'une seule carte ne pèse d’aucun côté : ' + neutres.map(r => r.title).join(', '));
dire(pesantes.length + neutres.length === s.resources.length, 'toutes les autres cartes disent publiquement vers quelle version elles pèsent');
const secret = (s.campKnowledge.commanditaire || []).join(' ');
dire(secret.includes('ne pèse d’aucun côté'), 'l’adversaire sait que cette carte est l’indice mécanique de l’invariant');
dire(!(s.campKnowledge.phoebe || []).join(' ').includes('ne pèse d’aucun côté'), 'le joueur ne reçoit pas l’indice tout cuit');
dire(s.resources.find(r => /Ne pèse d’aucun côté/.test(r.description)).owner === 'phoebe', 'la carte qui porte l’invariant est dans la main des sœurs');

console.log('\n-- chemins --');
const toutes = s.privateFacts.routes.flatMap(c => c.branches);
for (const r of s.resources)
  dire(toutes.filter(b => b.resources.includes(r.id)).length >= 1, r.id + ' : employée dans ' + toutes.filter(b => b.resources.includes(r.id)).length + ' branche(s)');
for (const camp of ['phoebe', 'commanditaire']) {
  const chemins = s.privateFacts.routes.filter(r => r.camp === camp);
  console.log('-- ' + camp + ' : ' + chemins.length + ' chemins --');
  dire(chemins.length >= 2, camp + ' : au moins deux chemins');
  for (const c of chemins) {
    dire(!!c.sufficiency && c.branches.length >= 2, c.title + ' : suffisance et au moins deux branches');
    dire(c.branches.every(b => b.resources.length >= 2), c.title + ' : chaque branche croise au moins deux moyens');
    dire(c.branches.every(b => new Set(b.resources).size === b.resources.length), c.title + ' : aucune ressource répétée dans une branche');
    dire(c.branches.every(b => b.resources.every(id => ids.includes(id))), c.title + ' : toutes les ressources existent dans le pool');
    dire(c.branches.every(b => !!b.condition && !!b.contribution), c.title + ' : chaque branche dit sa condition et sa contribution');
    const cout = c.branches.reduce((n, b) => n + b.resources.length + 1 + (b.attack ? 1 : 0), 1);
    dire(cout <= s.finalDay, c.title + ' : tient dans le calendrier (' + cout + ' ≤ ' + s.finalDay + ')');
  }
}
dire(s.privateFacts.routes.every(c => c.branches.every(b => b.resources.every(id => s.resources.some(r => r.id === id && r.owner === c.camp)))),
  'chaque camp ne s’appuie que sur ses propres cartes');

console.log('\n-- objectifs --');
for (const g of s.goals) {
  const conditions = g.title.split(/,| et /).filter(x => x.trim().length > 12).length;
  dire(conditions >= 4, g.id + ' : ' + conditions + ' conditions, départ ' + (g.initialValue ? 'VRAI' : 'FAUX'));
  dire(!!g.shortTitle && !!g.owner, g.id + ' : shortTitle et owner renseignés');
}
dire(s.goals.every(g => g.initialValue === false), 'les deux camps partent FAUX : personne ne défend un acquis');

console.log('\n-- calendrier --');
dire(s.calendar.every(e => e.morning >= 1 && e.morning <= s.finalDay), 'tous les événements entre J1 et J' + s.finalDay);
dire(s.calendar.some(e => e.morning === s.finalDay), 'un constat au matin de l’échéance');
dire(new Set(s.calendar.map(e => e.id)).size === s.calendar.length, 'aucun identifiant d’événement en double');
dire(s.calendar.every(e => e.impacts && e.impacts.phoebe && e.impacts.commanditaire), 'chaque événement porte ses impacts pour les deux camps');
for (const j of [4, 8, 11]) dire(s.calendar.some(e => e.morning === j && /tassement/i.test(e.title)), 'tassement au matin du jour ' + j);
dire(s.calendar.some(e => e.morning <= 2), 'une bascule précoce fait apprendre la règle en la subissant');

console.log('\n-- créations anticipées --');
for (const camp of ['phoebe', 'commanditaire']) {
  const liste = s.privateFacts.creations[camp] || [];
  dire(liste.length >= 4, camp + ' : ' + liste.length + ' demandes prévues');
  dire(liste.some(c => c.possible === false), camp + ' : au moins un refus motivé');
  dire(liste.every(c => !!c.limite), camp + ' : chaque demande dit ce qu’elle ne fait pas');
  dire(liste.filter(c => c.possible).every(c => c.obtention && Number.isInteger(c.delai)), camp + ' : chaque possibilité a obtention et délai entier');
}

console.log('\n-- démarrage moteur --');
const etat = E.initial();
dire(etat.nodes.length === 2 && etat.day === 1 && etat.phase === 'player', 'plateau initial cohérent');
dire(etat.resources.length === 14, 'quatorze cartes chargées');
dire(etat.resources.filter(r => r.owner === 'phoebe').length === 7 && etat.resources.filter(r => r.owner === 'commanditaire').length === 7, 'sept cartes par camp au démarrage');
dire(etat.resources.every(r => E.availability(etat, r) === 'free'), 'toutes les cartes sont disponibles au démarrage');
for (const n of etat.nodes)
  dire(n.goalMode === 'achieve' && n.status === 'open', n.id + ' : goalMode=' + n.goalMode + ', status=' + n.status);

console.log('\n' + (alerte ? alerte + ' ALERTE(S)' : 'Tout est conforme.'));
process.exit(alerte ? 1 : 0);
