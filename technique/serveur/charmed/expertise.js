'use strict';

// Recherche documentaire seule : ne remplace pas l'arbitrage de canon.js.
const corpus = require('../../donnees-bibliotheque/canon/personnages.json');
const magic = require('../../donnees-bibliotheque/canon/magie-demons.json');
const index = require('../../donnees-bibliotheque/canon/episodes-index.json');
const episodes = new Map(index.episodes.map((e, i) => [e.id, { ...e, position: i }]));

function context({ character, episode, universe = corpus.universe, moment } = {}) {
  const period = episodes.get(episode);
  if (universe !== corpus.universe) throw new Error('Continuité non couverte.');
  if (!period) throw new Error('Épisode inconnu : fournir un identifiant SxxExx.');
  if (!['before', 'during', 'after'].includes(moment)) throw new Error('Préciser before, during ou after pour les événements de cet épisode.');
  const profile = corpus.characters.find(c => c.id === character);
  if (!profile) throw new Error('Personnage non documenté.');
  const enriched = corpus.milestones.filter(m => m.character === character).map(m => ({
    ...m, episodeTitle: episodes.get(m.episode).title
  }));
  const historical = enriched.filter(m => episodes.get(m.episode).position < period.position || (m.episode === episode && moment === 'after'));
  const inEpisode = moment === 'during' ? enriched.filter(m => m.episode === episode) : [];
  const pending = enriched.filter(m => episodes.get(m.episode).position > period.position || (m.episode === episode && moment === 'before'));
  const exclusions = corpus.excludedImports.filter(e => e.character === character);
  const sourceIds = new Set([...profile.sources, ...historical.flatMap(m => m.sources), ...inEpisode.flatMap(m => m.sources), ...pending.flatMap(m => m.sources), ...exclusions.flatMap(e => e.sources)]);
  return {
    universe, episode, episodeTitle: period.title, moment, profile,
    historical, inEpisode, pending, exclusions,
    sources: corpus.sources.filter(s => sourceIds.has(s.id)),
    coverage: corpus.coverage,
    actionAuthorization: 'not_evaluated',
    interpretation: corpus.interpretation,
    warning: 'Contexte encyclopédique réservé au système. Les événements futurs et secrets ne sont pas des informations accessibles aux personnages. Les interruptions temporaires ne sont pas exhaustives.'
  };
}

function checkCorpus() {
  const errors = [];
  const sources = new Set(corpus.sources.map(s => s.id));
  const characters = new Set(corpus.characters.map(c => c.id));
  const seen = new Set();
  for (const entry of corpus.milestones) {
    if (seen.has(entry.id)) errors.push('Identifiant répété : ' + entry.id);
    seen.add(entry.id);
    if (!episodes.has(entry.episode)) errors.push('Épisode absent : ' + entry.id);
    if (!characters.has(entry.character)) errors.push('Personnage absent : ' + entry.id);
  }
  for (const entry of [...corpus.milestones, ...corpus.characters, ...corpus.excludedImports]) {
    if (!entry.sources?.length || entry.sources.some(s => !sources.has(s))) errors.push('Source absente : ' + (entry.id || entry.capability));
  }
  return errors;
}

// Retour documentaire complet : aucune projection de ces faits dans le journal de jeu.
function reference({ kind, id, universe = magic.universe } = {}) {
  if (universe !== magic.universe) throw new Error('Continuité non couverte.');
  if (!['rule', 'demon', 'place', 'being'].includes(kind)) throw new Error('Type attendu : rule, demon, place ou being.');
  const collection = {rule:magic.rules,demon:magic.demons,place:magic.places,being:magic.beings}[kind];
  const entry = collection.find(e => e.id === id);
  if (!entry) throw new Error('Fiche non documentée.');
  return structuredClone({
    universe, kind, entry,
    episodes: entry.episodeRefs.map(id => episodes.get(id)),
    sources: magic.sources.filter(s => entry.sources.includes(s.id)),
    policy: magic.policy,
    coverage: magic.coverage,
    actionAuthorization: 'not_evaluated'
  });
}

function checkMagicCorpus() {
  const errors = [];
  const sourceIds = new Set();
  for (const s of magic.sources) {
    if (sourceIds.has(s.id)) errors.push('Source répétée : ' + s.id);
    sourceIds.add(s.id);
    if (!URL.canParse(s.url) || !s.level || !s.scope) errors.push('Source incomplète : ' + s.id);
  }
  for (const collection of [magic.rules, magic.demons, magic.places, magic.beings]) {
    const ids = new Set();
    for (const e of collection) {
      if (ids.has(e.id)) errors.push('Fiche répétée : ' + e.id);
      ids.add(e.id);
      if (!e.sources.length || e.sources.some(s => !sourceIds.has(s))) errors.push('Source absente : ' + e.id);
      if (e.episodeRefs.some(id => !episodes.has(id))) errors.push('Épisode absent : ' + e.id);
      if (!e.status || !e.unknowns.length) errors.push('Statut ou limites absents : ' + e.id);
    }
  }
  return errors;
}

module.exports = { context, checkCorpus, reference, checkMagicCorpus };
