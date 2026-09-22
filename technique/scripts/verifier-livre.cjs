// Contrôles de conception avant de lancer la partie — version « main partagée
// intégrale » : dans ce scénario AUCUNE carte n'appartient à un camp au
// départ, donc les contrôles par camp de verifier-christy.cjs (sept cartes
// par camp, ressources témoins appartenant au camp) n'ont plus de sens et
// sont remplacés par des contrôles de pool commun.
'use strict';
process.env.CHARMED_SCENARIO='le-livre-qui-refuse';
const s=require('../../scenarios/le-livre-qui-refuse/scenario');
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
const titres = s.resources.map(r => r.title);
dire(new Set(titres).size === titres.length, 'aucun titre de carte en double (resourceIdentity)');
dire(s.resources.length === 14, 'quatorze cartes déclarées (' + s.resources.length + ')');
dire(s.resources.every(r => r.owner === null), 'toutes les cartes naissent sans propriétaire (main partagée intégrale)');
dire(s.resources.every(r => ['objet','lieu','personnage'].includes(r.category)), 'toutes les catégories sont reconnues par le moteur');
dire(!s.resources.some(r => r.category === 'personnage'), 'aucun personnage dans le pool commun : les sœurs agissent, elles ne se possèdent pas');
dire(s.resources.every(r => !r.heldBy && !r.lost && !r.consumed), 'aucune carte n’est engagée, perdue ou consommée au départ');
const auJour1 = s.resources.filter(r => r.availableDay === 1).length;
dire(auJour1 >= 8 && auJour1 < s.resources.length, auJour1 + ' cartes disponibles au jour 1, ' + (s.resources.length - auJour1) + ' échelonnées ensuite (évite la course au ramassage du premier jour)');
dire(s.resources.every(r => Number.isInteger(r.availableDay) && r.availableDay >= 1 && r.availableDay < s.finalDay), 'toutes les cartes échelonnées arrivent avant l’échéance');

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
  }
}

console.log('\n-- contention réelle --');
const parCamp = camp => new Set(s.privateFacts.routes.filter(r => r.camp === camp).flatMap(c => c.branches).flatMap(b => b.resources));
const cotePhoebe = parCamp('phoebe'), coteLivre = parCamp('commanditaire');
const disputees = ids.filter(id => cotePhoebe.has(id) && coteLivre.has(id));
dire(disputees.length >= 5, disputees.length + ' cartes authentiquement disputées (présentes dans les chemins des deux camps) : ' + disputees.join(', '));
dire(cotePhoebe.size >= 8 && coteLivre.size >= 5, 'chaque camp vise assez de cartes pour avoir de vrais choix (sœurs ' + cotePhoebe.size + ', Livre ' + coteLivre.size + ')');

console.log('\n-- objectifs --');
for (const g of s.goals) {
  const conditions = g.title.split(/,| et /).filter(x => x.trim().length > 12).length;
  dire(conditions >= 4, g.id + ' : ' + conditions + ' conditions distinctes, départ ' + (g.initialValue ? 'VRAI (à maintenir)' : 'FAUX (à établir)'));
  dire(!!g.shortTitle && !!g.owner, g.id + ' : shortTitle et owner renseignés');
}
dire(s.goals.some(g => g.id === 'root-phoebe') && s.goals.some(g => g.id === 'root-commanditaire'), 'les deux racines attendues par le moteur sont présentes');
const vrais = s.goals.filter(g => g.initialValue).length;
console.log('  info   répartition initiale : ' + vrais + ' état(s) vrai(s), ' + (2 - vrais) + ' faux');

console.log('\n-- secret de partie --');
const publique = [s.opening, ...s.initialFacts, ...(s.campKnowledge.phoebe || [])].join(' ').toLowerCase();
for (const mot of ['instruction', 'révoqu', 'dispute', 'demandé au livre', 'clause'])
  dire(!publique.includes(mot), 'le mot « ' + mot + ' » n’apparaît pas dans ce que le joueur reçoit au départ');
const secret = (s.campKnowledge.commanditaire || []).join(' ').toLowerCase();
dire(secret.includes('les trois ensemble') && secret.includes('y renvoie') && secret.includes('prononcé la formule'),
  'la vérité complète est logée dans la connaissance privée du Livre : origine à trois, clause d’extension, fausse piste');
dire(!secret.includes('coupable et deux') || secret.includes('il n’y a pas une coupable'),
  'le scénario ne repose pas sur une sœur coupable');
dire(!s.doctrine.toLowerCase().includes('tribunal'), 'aucune juridiction extérieure n’intervient (règle « aucun tiers »)');

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
dire(etat.resources.every(r => r.owner === null), 'aucune carte n’appartient à un camp au démarrage');
dire(etat.resources.every(r => ['free','incoming','preparing'].includes(E.availability(etat, r))), 'aucune carte n’est bloquée au démarrage (libre ou à venir)');
dire(etat.resources.filter(r => E.availability(etat, r) === 'free').length === etat.resources.filter(r => r.availableDay === 1).length, 'les cartes du jour 1 sont toutes disponibles, les autres annoncées comme à venir');
for (const n of etat.nodes)
  dire(n.goalMode === (n.initialValue ? 'maintain' : 'achieve') && n.status === (n.initialValue ? 'true' : 'open'),
    n.id + ' : goalMode=' + n.goalMode + ', status=' + n.status);

console.log('\n' + (alerte ? alerte + ' ALERTE(S)' : 'Tout est conforme.'));
process.exit(alerte ? 1 : 0);
