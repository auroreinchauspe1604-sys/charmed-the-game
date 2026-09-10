'use strict';
// Reconstruction de la partie — 10 septembre 2026.
//
// L'Ange du destin et le joueur adverse ne recevaient qu'une photographie de
// l'instant : ni chronologie, ni verdicts antérieurs. Ce module reconstitue la
// partie en texte lisible, placé en tête du contexte, pour que les décisions se
// prennent sur la réalité du plateau. Voir regles/historique/MODIFICATIONS_2026-09-10.md.
const scenario = require('./scenario');

const NOM = { key: 'clé', lock: 'verrou', attack: 'attaque', state: 'état' };
const ETAT = {
  preparing: 'en préparation', ready: 'prête, encore contestable', declared: 'déclarée',
  acquired: 'acquise', resolved: 'résolue', failed: 'échouée', removed: 'retirée',
  active: 'actif', open: 'ouvert', true: 'vrai', false: 'faux'
};

function campName(id) {
  const c = (scenario.camps || []).find(c => c.id === id);
  return c ? c.name : id;
}
function libelle(n) {
  const type = n.type === 'state' ? (n.parent ? 'sous-état' : 'état initial') : NOM[n.type] || n.type;
  return `${n.id} (${type} de ${campName(n.owner)})`;
}

// --- Chronologie ------------------------------------------------------------
// Reconstruite depuis les dates déjà portées par les cartes, les questions et
// le journal d'arbitrage. Aucune donnée nouvelle n'est inventée.
function chronologie(s) {
  const evts = [];
  const add = (day, texte) => { if (Number.isInteger(day)) evts.push({ day, texte }); };

  for (const e of scenario.calendar || []) if (e.morning <= s.day) add(e.morning, `Événement du calendrier : ${e.title || e.publicText}`);

  for (const n of s.nodes) {
    if (n.type === 'state' && !n.parent) continue;
    add(n.createdDay, `${libelle(n)} proposée : ${n.title}`);
    for (const p of n.placements || []) add(p.day, `${n.id} : ${campName(n.owner)} engage ${p.resource}`);
    for (const p of n.defensePlacements || []) add(p.day, `${n.id} : renfort défensif ${p.resource}`);
    if (n.type === 'attack' && Number.isInteger(n.revealDay) && n.revealDay <= s.day) add(n.revealDay, `${n.id} : exigences révélées, échéance au jour ${n.dueDay}`);
    if (n.status === 'acquired') add(n.acquiredDay, `${n.id} : ACQUISE — ${n.established || n.title}`);
    if (n.status === 'failed') add(n.resolvedDay ?? n.dueDay, `${n.id} : ÉCHOUÉE`);
    if (n.status === 'removed') add(n.removedDay ?? n.createdDay, `${n.id} : retirée`);
  }

  for (const q of s.questions || []) {
    add(q.day, `Question de ${campName(q.owner)} sur ${q.target} : « ${q.text} » — la carte est gelée jusqu'à la réponse`);
    if (q.answer !== null) add(q.submittedDay, `Réponse soumise sur ${q.target} : « ${q.answer} »`);
    if (q.resolved) add(q.reviewedDay, `Réponse examinée sur ${q.target} : ${q.reason}`);
  }

  evts.sort((a, b) => a.day - b.day);
  if (!evts.length) return 'Aucun événement enregistré : la partie commence.';
  return evts.map(e => `  J${e.day} — ${e.texte}`).join('\n');
}

// --- Ressources -------------------------------------------------------------
// L'indisponibilité doit être lisible en toutes lettres : c'est elle qui rend
// impossible un acte qui exigerait une ressource déjà engagée ailleurs.
function ressources(s, engine) {
  const lignes = [];
  for (const r of s.resources) {
    const etats = [];
    if (r.heldBy) {
      const n = s.nodes.find(n => n.id === r.heldBy);
      etats.push(`ENGAGÉE dans ${r.heldBy}${n ? ` (${NOM[n.type] || n.type} : ${n.title})` : ''} — indisponible pour tout autre usage`);
    }
    if (r.lost) etats.push('PERDUE');
    if (r.consumed) etats.push('CONSOMMÉE');
    if (r.availableDay > s.day) etats.push(`pas encore arrivée, disponible au jour ${r.availableDay}`);
    if (r.recoveryUntil > s.day) etats.push(`en récupération jusqu'au jour ${r.recoveryUntil}`);
    const attaque = s.nodes.find(n => n.type === 'attack' && n.target === r.id && !['resolved', 'failed', 'removed'].includes(n.status) && s.day >= (n.revealDay ?? Infinity));
    if (attaque) etats.push(`ciblée par l'attaque ${attaque.id}, échéance jour ${attaque.dueDay} — RIEN N'A ENCORE CHANGÉ pour cette ressource tant que l'attaque n'est pas résolue`);
    if (!etats.length) etats.push('LIBRE en main de ' + campName(r.owner));
    lignes.push(`  ${r.id} — ${r.title} (${r.category}, ${campName(r.owner)}) : ${etats.join(' ; ')}`);
  }
  return lignes.join('\n');
}

// --- Contributions ----------------------------------------------------------
function contributions(s) {
  const vivantes = s.nodes.filter(n => !(n.type === 'state' && !n.parent) && !['removed', 'failed'].includes(n.status));
  if (!vivantes.length) return '  Aucune contribution en cours.';
  return vivantes.map(n => {
    const parts = [`  ${libelle(n)} — ${ETAT[n.status] || n.status}`];
    parts.push(`    Affirme : ${n.effect || n.title}`);
    if (n.pieces?.length) parts.push(`    Engage : ${n.pieces.join(', ')}`);
    if (n.defenders?.length) parts.push(`    Renforts défensifs : ${n.defenders.join(', ')}`);
    if (Number.isInteger(n.dueDay)) parts.push(`    Examinable au jour ${n.dueDay}`);
    if (n.suspended) parts.push('    SUSPENDUE par une question sans réponse examinée');
    if (n.blockedBy?.length) parts.push(`    Bloquée par : ${n.blockedBy.join(', ')}`);
    if (n.type === 'state' && n.parent) parts.push(`    Sous-état de ${n.parent}, actuellement ${n.status === 'true' ? 'VRAI' : 'FAUX'}`);
    return parts.join('\n');
  }).join('\n');
}

function objectifs(s) {
  return s.nodes.filter(n => n.type === 'state' && !n.parent).map(n => {
    const mode = n.goalMode === 'maintain' ? 'commence VRAI, à maintenir jusqu\'au dernier matin' : 'commence FAUX, à établir';
    return `  ${n.id} (${campName(n.owner)}) — ${mode}, actuellement ${n.status === 'true' ? 'VRAI' : 'FAUX'}\n    ${n.title}`;
  }).join('\n');
}

function verdicts(s) {
  const list = (s.arbitration || []).filter(a => a.text && a.text.trim());
  if (!list.length) return '  Aucun verdict antérieur.';
  // Les plus récents d'abord, bornés pour rester lisibles.
  return list.slice(-25).map(a => `  J${a.day} — ${a.text}`).join('\n');
}

function entete(s) {
  const restant = (scenario.finalDay ?? 0) - s.day;
  return [
    `PARTIE : ${scenario.title || ''}`,
    `Jour ${s.day} sur ${scenario.finalDay}${restant > 0 ? ` — il reste ${restant} jour(s) avant l'échéance` : ' — dernier jour'}`,
    `Phase : ${s.phase}`,
    `Coup payant déjà consommé aujourd'hui — ${Object.entries(s.spent || {}).map(([c, v]) => `${campName(c)} : ${v ? 'oui' : 'non'}`).join(', ')}`,
    `Emplacements de sous-états — ${Object.entries(s.subgoalSlots || {}).map(([c, v]) => `${campName(c)} : ${v}`).join(', ')}`
  ].join('\n');
}

function faits(s) {
  if (!s.facts?.length) return '  Aucun fait acquis.';
  return s.facts.map(f => `  • ${f}`).join('\n');
}

// Récit complet, pour l'Ange du destin.
function arbitre(s) {
  return [
    '=== LA PARTIE JUSQU\'ICI ===',
    entete(s),
    '',
    '— OBJECTIFS —', objectifs(s),
    '',
    '— CHRONOLOGIE —', chronologie(s),
    '',
    '— SITUATION DE CHAQUE RESSOURCE —', ressources(s),
    '',
    '— CONTRIBUTIONS EN COURS —', contributions(s),
    '',
    '— FAITS ACQUIS —', faits(s),
    '',
    '— TES VERDICTS ANTÉRIEURS (reste cohérent avec eux) —', verdicts(s),
    '=== FIN DU RÉCIT ==='
  ].join('\n');
}

// Récit filtré pour un camp : pas de verdicts privés ni de justifications adverses.
function camp(s, id) {
  return [
    '=== LA PARTIE JUSQU\'ICI ===',
    entete(s),
    '',
    '— OBJECTIFS —', objectifs(s),
    '',
    '— CHRONOLOGIE —', chronologie(s),
    '',
    '— SITUATION DE CHAQUE RESSOURCE —', ressources(s),
    '',
    '— CONTRIBUTIONS EN COURS —', contributions(s),
    '',
    '— FAITS ACQUIS (publics, opposables aux deux camps) —', faits(s),
    '=== FIN DU RÉCIT ==='
  ].join('\n');
}

module.exports = { arbitre, camp };
