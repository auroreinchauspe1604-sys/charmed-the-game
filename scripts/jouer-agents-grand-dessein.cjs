// Fait jouer « Le Grand Dessein se défait » entre agents, sans humain.
// Une session joue les sœurs (camp phoebe) ; le MJ et l'adversaire sont les sessions
// ordinaires du jeu (jeu.py --appel). Toutes tournent sur le modèle CHARMED_MODEL.
// Partie propre dans etat/charmed/grand-dessein-agents ; journal lisible à côté.
'use strict';
const fs = require('fs'), path = require('path'), crypto = require('crypto');
process.env.CHARMED_SCENARIO = 'grand-dessein';
process.env.ANTHROPIC_MODEL = process.env.CHARMED_MODEL || 'claude-sonnet-5';
const dir = process.env.CHARMED_STATE_DIR || path.resolve(__dirname, '../etat/charmed/grand-dessein-agents');
fs.mkdirSync(dir, { recursive: true });

const { Store } = require('../serveur/charmed/store');
const { Jeu, invoke } = require('../serveur/charmed/jeu');
const S = require('../serveur/charmed/operations');
const { documents } = require('../serveur/charmed/agent-context');

const store = new Store(dir), jeu = new Jeu(store), E = store.E;
const MAX_STEPS = +process.env.MAX_STEPS || 300;
const logFile = path.join(dir, 'journal-agents.log');
const log = line => { const t = new Date().toISOString().slice(11, 19) + ' ' + line; fs.appendFileSync(logFile, t + '\n'); console.log(t); };

const text = { type: 'string' };
const action = { type: 'object', properties: { type: { type: 'string', enum: ['propose', 'place', 'question', 'answer', 'end'] }, kind: { type: 'string', enum: ['key', 'lock', 'attack', 'subgoal', 'resource'] }, target: text, resource: text, text }, required: ['type'], additionalProperties: false };
const schema = S.obj({ action, message: text });

const role = 'Tu joues le camp des sœurs Halliwell (camp « phoebe ») dans la campagne « Le Grand Dessein se défait ». Tu es la joueuse, pas le MJ. '
  + 'Lis les règles et le plateau, puis choisis UN coup du jour pour ton camp et renvoie-le dans « action » : '
  + 'propose (kind key|lock|attack|subgoal|resource, target = id visé, text = une phrase naturelle), place (target = id d’un nœud, resource = id d’une de tes cartes, text = justification), '
  + 'question (target = id adverse, text), answer (target = id de la question, text), ou end pour terminer ton passage. '
  + 'Objectif : garder les sœurs vivantes et libres, le Livre sous leur garde, le Nexus hors des mains des démons, et vaincre chaque menace pour faire avancer la campagne. '
  + 'Joue avec les pouvoirs de la période, sans rien inventer. Dans « message », écris en une ou deux phrases ton intention, comme une joueuse autour de la table.';

const view = () => E.publicView(store.load());
const playerDocs = s => { const d = documents(s); return { scenario: d.scenario, canon: d.canon, personnages: d.personnages, magie: d.magie }; };

const summary = s => `J${s.day} ${s.phase} rev${s.revision}` + (s.infinite ? ` palier ${s.infinite.index + 1}/${s.infinite.total} (${s.infinite.wave.name})` : '') + (s.result ? ` FIN: ${JSON.stringify(s.result)}` : '');

(async () => {
  log('=== Partie entre agents, modèle ' + process.env.ANTHROPIC_MODEL + ', état ' + store.file);
  let lastError = null, errors = 0, failures = 0, seen = store.load().arbitration.length;
  for (let step = 0; step < MAX_STEPS; step++) {
    const s = store.load();
    if (s.result) { log('Partie terminée : ' + JSON.stringify(s.result)); break; }
    log('--- ' + summary(s));
    try {
      let event;
      if (s.phase === 'player') {
        const reply = await invoke(store.seed + ':joueuse', { role, ...(lastError ? { refus_precedent: lastError } : {}) }, view, playerDocs(s), [], schema);
        let a = reply.action || { type: 'end' };
        if (errors >= 4) { a = { type: 'end' }; log('Quatre refus de suite : la joueuse termine son passage.'); }
        log('JOUEUSE ' + JSON.stringify(a) + (reply.message ? ' — ' + reply.message : ''));
        event = { camp: 'phoebe', action: a };
      } else event = { demande: 'Poursuivre la partie' };
      const after = await jeu.turn(s.revision, crypto.randomUUID(), event);
      for (const m of after.arbitration.slice(seen)) log('MJ J' + m.day + ' ' + m.text);
      seen = after.arbitration.length;
      if (after.radio?.length) { const r = after.radio.at(-1); if (r.day === after.day) log('RADIO ' + (r.text || '').slice(0, 1500)); }
      lastError = null; errors = 0; failures = 0;
    } catch (e) {
      const msg = String(e.message || e).slice(0, 1500);
      if (e instanceof E.RuleError || /409|Règle|refus/i.test(e.name || '')) { lastError = msg; errors++; log('REFUS ' + msg); }
      else { failures++; log('ERREUR ' + msg); if (failures >= 3) { log('Trois erreurs techniques de suite : arrêt.'); break; } }
    }
  }
  log('=== Arrêt : ' + summary(store.load()));
})().catch(e => { log('ERREUR FATALE ' + (e.stack || e)); process.exitCode = 1; });
