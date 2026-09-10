// Test d'arbitrage sur les dictées réelles d'Aurore, reprises telles quelles
// dans le journal du 10 septembre 2026. Aucune n'est corrigée ni améliorée.
// Instance isolée : la partie en cours n'est pas touchée.
'use strict';
process.env.CHARMED_SCENARIO = 'nexus-sous-tension';
const os = require('os'), path = require('path'), fs = require('fs');
process.env.CHARMED_STATE_DIR = fs.mkdtempSync(path.join(os.tmpdir(), 'charmed-test-'));

const E = require('../serveur/charmed/engine');
const { Store } = require('../serveur/charmed/store');
const { Service } = require('../serveur/charmed/service');
const { Intelligence } = require('../serveur/charmed/intelligence-v3');

const CAS = [
  { titre: '1. Clé, voie principale, dictée brute',
    action: { type: 'propose', kind: 'key', target: 'root-phoebe', resource: 'cristaux',
      text: "disposition des cristaux autour du livre et des souer qui sont protége par le bouclier energique des critaux et leur permetttent de conserver le livre. les demon de peuvent pas franchir le bouclier " } },
  { titre: '2. Ressource : trois mots',
    action: { type: 'propose', kind: 'resource', text: 'creature magique allié' } },
  { titre: '3. Ressource : demande de concours',
    action: { type: 'propose', kind: 'resource', text: "Demander de l'aide aux fondateurs" } },
  { titre: '4. Ressource : lacune documentaire assumée',
    action: { type: 'propose', kind: 'resource', text: 'Etre magique -les fées' } },
  { titre: '5. Verrou sur une ressource adverse ENGAGÉE (doit être accepté comme verrou)',
    prepare: s => {
      // Une contribution adverse retient l'Éclaireur, comme au jour 4 de la partie précédente.
      s.nodes.push({ id: 'adv1', owner: 'commanditaire', type: 'key', scope: 'main', target: 'root-commanditaire',
        title: 'Obstruction des circulations', effect: 'Les circulations reliant le grenier aux niveaux inférieurs sont matériellement bloquées.',
        description: 'Obstruction en cours.', pieces: ['eclaireur'], locations: [], missing: 0, status: 'ready',
        createdDay: 1, delay: 0, dependsOn: [], recovery: {}, maintainers: [], readyDay: 1, reactionThroughDay: 2, dueDay: 2 });
      E.resource(s, 'eclaireur').heldBy = 'adv1';
    },
    action: { type: 'propose', kind: 'lock', target: 'eclaireur', resource: 'paige',
      text: "Paige s'orbe avec des potions et neutralise l'eclaireur ce qui empeche l'obstruction materielle des cirulation" } },
  { titre: '6. Attaque sur cette même ressource engagée (doit être refusée : elle n’est pas en main)',
    prepare: s => {
      s.nodes.push({ id: 'adv1', owner: 'commanditaire', type: 'key', scope: 'main', target: 'root-commanditaire',
        title: 'Obstruction des circulations', effect: 'Les circulations sont bloquées.', description: 'Obstruction en cours.',
        pieces: ['eclaireur'], locations: [], missing: 0, status: 'ready', createdDay: 1, delay: 0, dependsOn: [],
        recovery: {}, maintainers: [], readyDay: 1, reactionThroughDay: 2, dueDay: 2 });
      E.resource(s, 'eclaireur').heldBy = 'adv1';
    },
    action: { type: 'propose', kind: 'attack', target: 'eclaireur',
      text: "Neutralisation de l'eclaireuer par Paige à l'aide de potions" } }
];

async function neuf(prepare) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'charmed-cas-'));
  const store = new Store(dir);
  // La préparation doit être committée AVANT de lire la révision, sinon l'appel suivant
  // se présente avec une révision périmée.
  if (prepare) await store.transact(0, 'prepare-0001', s => { prepare(s); });
  return new Service(store, new Intelligence());
}

(async () => {
  let index = 0;
  for (const cas of CAS) {
    index++;
    console.log('\n' + '='.repeat(78) + '\n' + cas.titre);
    console.log('Dictée : « ' + (cas.action.text || '').trim() + ' »');
    const service = await neuf(cas.prepare);
    const avant = service.store.load();
    const debut = Date.now();
    try {
      await service.action(avant.revision, 'test-' + String(index).padStart(4, '0'), cas.action);
      const etat = service.store.load();
      // Une proposition refusée ne crée aucune carte : seul le message d'arbitrage change.
      const carte = etat.nodes.find(n => !avant.nodes.some(x => x.id === n.id));
      const ressource = etat.resources.find(r => !avant.resources.some(x => x.id === r.id));
      const message = (etat.arbitration || []).slice(-1)[0];
      console.log('→ ' + (carte || ressource ? 'ACCEPTÉ' : 'REFUSÉ (gratuitement)') + ' — ' + Math.round((Date.now() - debut) / 1000) + ' s');
      if (carte) {
        console.log('  Carte : [' + carte.type + '] ' + carte.title);
        if (carte.effect) console.log('  Effet : ' + carte.effect);
        if (carte.mainCondition) console.log('  Condition visée : ' + carte.mainCondition);
        console.log('  Moyens encore nécessaires : ' + carte.missing + ' | statut : ' + carte.status);
      }
      if (ressource) console.log('  Ressource accordée : ' + ressource.title + ' (disponible J' + ressource.availableDay + ')');
      if (message) console.log('  Ange  : ' + message.text);
    } catch (e) {
      console.log('→ REFUSÉ ou ERREUR (' + Math.round((Date.now() - debut) / 1000) + ' s)');
      console.log('  ' + e.message);
    }
  }
  console.log('\n' + '='.repeat(78) + '\nFin des essais.');
})();
