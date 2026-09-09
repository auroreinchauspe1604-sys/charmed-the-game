'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { context, checkCorpus } = require('./expertise');
const { reference, checkMagicCorpus } = require('./expertise');
const query = (character, episode, moment = 'after') => context({ character, episode, moment });

test('les fiches renvoient à des personnages, sources et épisodes existants', () => assert.deepEqual(checkCorpus(), []));
test('combustion de Piper : distinguer avant, pendant et après Exit Strategy', () => {
  assert(query('piper', 'S03E20', 'before').pending.some(m => m.id === 'piper-combustion'));
  assert(query('piper', 'S03E20', 'during').inEpisode.some(m => m.id === 'piper-combustion'));
  assert(query('piper', 'S03E20').historical.some(m => m.id === 'piper-combustion'));
  assert(!query('piper', 'S01E20').historical.some(m => m.id === 'piper-combustion'));
});
test('la saison seule ne suffit pas à dater une capacité', () => assert.throws(() => query('piper', 'S03'), /Épisode inconnu/));
test('une scène non située dans son épisode exige une précision', () => assert.throws(() => context({character:'piper',episode:'S03E20'}), /Préciser/));
test('Prue : expérience empathique temporaire distincte de sa projection astrale', () => {
  const c = query('prue', 'S03E07');
  assert.equal(c.historical.find(m => m.id === 'prue-empathy-temporary').kind, 'temporary_event');
  assert.equal(c.historical.find(m => m.id === 'prue-astral').kind, 'acquisition');
});
test('la mort de Prue reste visible même lorsque ses acquisitions sont historiques', () => {
  const c = query('prue', 'S04E02');
  assert(c.historical.some(m => m.kind === 'death_confirmed'));
  assert.equal(c.actionAuthorization, 'not_evaluated');
});
test('Phoebe : la restauration des visions ne restaure pas automatiquement les autres pouvoirs', () => {
  const c = query('phoebe', 'S07E06');
  const restoration = c.historical.filter(m => m.kind === 'restoration');
  assert.deepEqual(restoration.map(m => m.capability), ['premonition']);
  assert(c.historical.some(m => m.kind === 'loss'));
});
test('Paige : guérison avec Leo et guérison autonome restent distinctes', () => {
  const c = query('paige', 'S04E03');
  assert(c.historical.some(m => m.capability === 'assisted_healing'));
  assert(!c.historical.some(m => m.capability === 'autonomous_healing'));
  assert(c.pending.some(m => m.capability === 'autonomous_healing'));
});
test('les comics et le reboot ne sont pas assimilés à la télévision originale', () => {
  assert.throws(() => context({character:'paige',episode:'S08E22',moment:'after',universe:'charmed-2018'}), /Continuité/);
  assert(query('paige','S08E22').exclusions.some(e => e.capability === 'orb_shield'));
});
test('la preuve incomplète reste visible et un personnage inconnu ne reçoit aucun profil inventé', () => {
  assert(query('phoebe','S06E20').historical.some(m => m.status === 'needs_corroboration'));
  assert.throws(() => query('elise-moreau','S01E01'), /non documenté/);
});

test('le bestiaire et les règles possèdent des références documentaires résolubles', () => {
  assert.deepEqual(checkMagicCorpus(), []);
  const data = require('../../Charmed/canon/magie-demons.json');
  for (const [kind, entries] of [['rule',data.rules],['demon',data.demons],['place',data.places],['being',data.beings]]) {
    for (const entry of entries) {
      const r = reference({kind,id:entry.id});
      assert.equal(r.sources.length,entry.sources.length);
      assert(r.episodes.every(e => e.title));
    }
  }
});

test('le Nexus se consulte comme lieu de pouvoir, jamais comme démon', () => {
  assert.equal(reference({kind:'place',id:'nexus'}).entry.entityType,'place_of_power');
  assert.throws(() => reference({kind:'demon',id:'nexus'}), /non documentée/);
});

test('Javna et les anges sont des entrées distinctes de natures différentes', () => {
  assert.equal(reference({kind:'demon',id:'javna'}).entry.name,'Javna');
  assert.equal(reference({kind:'being',id:'angel-of-death'}).entry.entityType,'neutral_angel');
  assert.equal(reference({kind:'being',id:'angel-of-destiny'}).entry.entityType,'destiny_angel');
  assert.throws(() => reference({kind:'demon',id:'angel-of-death'}), /non documentée/);
});
test('un contre-moyen partiel ne devient ni recette inventée ni autorisation de coup', () => {
  const r = reference({kind:'demon',id:'belthazor'});
  assert.equal(r.entry.counter.exactRecipe,null);
  assert.equal(r.actionAuthorization,'not_evaluated');
  assert.equal(r.entry.availability,'requires_scenario_review');
});
test('une source par extrait conserve sa limite dans le contexte transmis', () => {
  const r = reference({kind:'demon',id:'abraxas'});
  assert(r.sources.some(s => s.level === 'broadcaster_search_excerpt'));
  assert(r.sources.some(s => s.level === 'secondary_search_excerpt'));
});
test('la consultation ne modifie pas le corpus partagé et refuse les fausses références', () => {
  const r = reference({kind:'demon',id:'tempus'});
  r.entry.counter.exactRecipe = 'invention';
  assert.equal(reference({kind:'demon',id:'tempus'}).entry.counter.exactRecipe,null);
  assert.throws(() => reference({kind:'demon',id:'gideon'}), /non documentée/);
  assert.throws(() => reference({kind:'demon',id:'source',universe:'charmed-2018'}), /Continuité/);
});
