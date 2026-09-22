// Contrôles de conception de « Le Livre qui se défait » (v5) avant de lancer la
// partie. Reprend les contrôles de pool commun de verifier-livre.cjs et y ajoute
// trois familles propres à cette version : l'échelonnement des disponibilités,
// l'existence d'instruments qui n'existent PAS au départ et se demandent en
// création, et l'ancrage canon des cartes.
'use strict';
process.env.CHARMED_SCENARIO = 'le-livre-qui-se-defait';
const s = require('../../scenarios/le-livre-qui-se-defait/scenario');
const E = require('../serveur/charmed/engine');

let alerte = 0;
const dire = (ok, texte) => { console.log((ok ? '  ok    ' : '  ALERTE ') + texte); if (!ok) alerte++; };

console.log('« ' + s.title + ' » — ' + s.period + ' — échéance J' + s.finalDay
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
dire(new Set(s.resources.map(r => r.title)).size === s.resources.length, 'aucun titre de carte en double (resourceIdentity)');
dire(s.resources.length === 14, 'quatorze cartes déclarées (' + s.resources.length + ')');
dire(s.resources.every(r => r.owner === null), 'toutes les cartes naissent sans propriétaire (main partagée intégrale)');
dire(s.resources.every(r => ['objet','lieu','personnage'].includes(r.category)), 'toutes les catégories sont reconnues par le moteur');
dire(!s.resources.some(r => r.category === 'personnage'), 'aucun personnage dans le pool : les sœurs agissent, elles ne se possèdent pas');
dire(s.resources.every(r => !r.heldBy && !r.lost && !r.consumed), 'aucune carte ne part engagée, perdue ou consommée');
dire(s.resources.every(r => r.description && r.description.length > 200), 'chaque carte dit ce qu’elle fait pour les deux camps');

console.log('\n-- échelonnement (rien n’est entièrement disponible au jour 1) --');
const tardives = s.resources.filter(r => r.availableDay > 1);
dire(tardives.length >= 3, tardives.length + ' cartes arrivent après le jour 1 : ' + tardives.map(r => r.id + ' (J' + r.availableDay + ')').join(', '));
dire(tardives.every(r => r.availableDay <= s.finalDay - 4), 'chaque carte tardive laisse au moins quatre jours pour servir');
for (const r of tardives) {
  const annonce = [s.opening, ...s.initialFacts].join(' ') + ' ' + s.calendar.map(e => e.effect).join(' ');
  dire(annonce.includes(String(r.availableDay)), r.id + ' : sa date d’arrivée est annoncée au joueur (faits initiaux ou calendrier)');
}

console.log('\n-- chemins --');
const toutesBranches = s.privateFacts.routes.flatMap(c => c.branches);
for (const r of s.resources) {
  const usages = toutesBranches.filter(b => b.resources.includes(r.id)).length;
  dire(usages >= 1, r.id + ' : employée dans ' + usages + ' branche(s)');
}
for (const camp of ['phoebe', 'commanditaire']) {
  const chemins = s.privateFacts.routes.filter(r => r.camp === camp);
  console.log('-- ' + camp + ' : ' + chemins.length + ' chemins --');
  dire(chemins.length >= 2, camp + ' : au moins deux chemins');
  for (const c of chemins) {
    dire(!!c.sufficiency, c.title + ' : critère de suffisance renseigné');
    dire(c.branches.length >= 2, c.title + ' : au moins deux branches');
    dire(c.branches.every(b => b.resources.length >= 2), c.title + ' : chaque branche croise au moins deux moyens');
    dire(c.branches.every(b => new Set(b.resources).size === b.resources.length), c.title + ' : aucune ressource répétée dans une même branche');
    dire(c.branches.every(b => b.resources.every(id => ids.includes(id))), c.title + ' : toutes les ressources témoins existent dans le pool');
    dire(c.branches.every(b => !!b.condition && !!b.contribution), c.title + ' : chaque branche dit sa condition et sa contribution');
    const cout = c.branches.reduce((n, b) => n + b.resources.length + 1 + (b.attack ? 1 : 0), 1);
    dire(cout <= s.finalDay, c.title + ' : tient dans le calendrier (' + cout + ' ≤ ' + s.finalDay + ')');
    const tard = c.branches.flatMap(b => b.resources).map(id => s.resources.find(r => r.id === id).availableDay);
    dire(Math.max(...tard) + c.branches.length <= s.finalDay, c.title + ' : reste faisable compte tenu des arrivées tardives');
  }
}

console.log('\n-- contention réelle --');
const parCamp = camp => new Set(s.privateFacts.routes.filter(r => r.camp === camp).flatMap(c => c.branches).flatMap(b => b.resources));
const cotePhoebe = parCamp('phoebe'), coteLivre = parCamp('commanditaire');
const disputees = ids.filter(id => cotePhoebe.has(id) && coteLivre.has(id));
dire(disputees.length >= 8, disputees.length + ' cartes authentiquement disputées : ' + disputees.join(', '));
dire(cotePhoebe.size >= 8 && coteLivre.size >= 8, 'chaque camp vise assez de cartes pour avoir de vrais choix (sœurs ' + cotePhoebe.size + ', Livre ' + coteLivre.size + ')');

console.log('\n-- objectifs --');
for (const g of s.goals) {
  const conditions = g.title.split(/,| et /).filter(x => x.trim().length > 12).length;
  dire(conditions >= 4, g.id + ' : ' + conditions + ' conditions distinctes, départ ' + (g.initialValue ? 'VRAI (à maintenir)' : 'FAUX (à établir)'));
  dire(!!g.shortTitle && !!g.owner, g.id + ' : shortTitle et owner renseignés');
}
dire(s.goals.some(g => g.id === 'root-phoebe') && s.goals.some(g => g.id === 'root-commanditaire'), 'les deux racines attendues par le moteur sont présentes');
dire(s.goals.every(g => g.initialValue === false), 'les deux camps partent FAUX : personne ne défend un acquis');

console.log('\n-- secret de partie --');
const publique = [s.opening, ...s.initialFacts, ...(s.campKnowledge.phoebe || []), ...s.resources.map(r => r.description), ...s.calendar.map(e => e.effect)].join(' ').toLowerCase();
for (const mot of ['instruction', 'nuit effacée', 'innocente', 'a demandé au livre', 'sans leur accord', 'coupable'])
  dire(!publique.includes(mot), 'le mot ou groupe « ' + mot + ' » n’apparaît pas dans ce que le joueur reçoit');
const secret = (s.campKnowledge.commanditaire || []).join(' ').toLowerCase();
for (const mot of ['instruction', 'phoebe', 'et tout ce qui y renvoie', 'révoquent ensemble'])
  dire(secret.includes(mot), 'la connaissance privée du Livre contient « ' + mot + ' »');

console.log('\n-- ancrage canon --');
const canon = ['planchette', 'cercle-verite', 'cristal', 'reliure', 'grenier', 'page-melinda', 'reponse-fondateurs', 'invocation-warren'];
for (const id of canon) dire(ids.includes(id), 'carte ancrée dans l’univers présente : ' + id);
const inv = s.privateFacts.inventions.join(' ').toLowerCase();
for (const mot of ['planchette', 's06e19', 'melinda warren'])
  dire(inv.includes(mot), 'les inventions déclarent la part canon de « ' + mot + ' »');
dire(s.privateFacts.inventions.length >= 6, s.privateFacts.inventions.length + ' inventions déclarées');

console.log('\n-- calendrier --');
dire(s.calendar.every(e => e.morning >= 1 && e.morning <= s.finalDay), 'tous les événements tombent entre J1 et J' + s.finalDay);
dire(s.calendar.some(e => e.morning === s.finalDay), 'un événement de constat au matin de l’échéance');
dire(new Set(s.calendar.map(e => e.id)).size === s.calendar.length, 'aucun identifiant d’événement en double');
dire(s.calendar.every(e => e.impacts && e.impacts.phoebe && e.impacts.commanditaire), 'chaque événement porte ses impacts pour les deux camps');
dire(s.calendar.length >= 6, s.calendar.length + ' événements');
for (const e of s.calendar.filter(e => e.grants))
  for (const g of e.grants)
    dire(Object.hasOwn(s.privateFacts.documents, g.title),
      'J' + e.morning + ' : la carte « ' + g.title + ' » a un contenu fixe dans privateFacts.documents');

console.log('\n-- créations anticipées --');
for (const camp of ['phoebe', 'commanditaire']) {
  const liste = s.privateFacts.creations[camp] || [];
  dire(liste.length >= 5, camp + ' : ' + liste.length + ' demandes prévues');
  dire(liste.filter(c => c.possible === false).length >= 2, camp + ' : au moins deux refus anticipés et motivés');
  dire(liste.every(c => !!c.limite), camp + ' : chaque demande dit ce qu’elle ne fait pas');
  dire(liste.filter(c => c.possible).every(c => c.obtention && Number.isInteger(c.delai)), camp + ' : chaque possibilité a obtention et délai entier');
}
const instruments = s.privateFacts.creations.phoebe.filter(c => c.possible && c.delai >= 2);
dire(instruments.length >= 4, instruments.length + ' instruments décisifs n’existent pas au départ et se demandent en création (délai ≥ 2)');
dire(instruments.some(c => /inopérant|inopérante/i.test(c.limite)), 'au moins un instrument est explicitement inopérant tant qu’un préalable n’est pas établi');

console.log('\n-- démarrage moteur --');
const etat = E.initial();
dire(etat.nodes.length === 2 && etat.day === 1 && etat.phase === 'player',
  'plateau initial cohérent : ' + etat.nodes.length + ' objectifs, jour ' + etat.day + ', phase ' + etat.phase);
dire(etat.resources.length === 14, 'quatorze cartes chargées');
dire(etat.resources.every(r => r.owner === null), 'aucune carte n’appartient à un camp au démarrage');
const libres = etat.resources.filter(r => E.availability(etat, r) === 'free').length;
const attendues = etat.resources.filter(r => E.availability(etat, r) === 'incoming').length;
dire(libres === 11 && attendues === 3, 'au jour 1 : ' + libres + ' cartes disponibles, ' + attendues + ' encore à venir');
for (const n of etat.nodes)
  dire(n.goalMode === (n.initialValue ? 'maintain' : 'achieve') && n.status === (n.initialValue ? 'true' : 'open'),
    n.id + ' : goalMode=' + n.goalMode + ', status=' + n.status);

console.log('\n' + (alerte ? alerte + ' ALERTE(S)' : 'Tout est conforme.'));
process.exit(alerte ? 1 : 0);
