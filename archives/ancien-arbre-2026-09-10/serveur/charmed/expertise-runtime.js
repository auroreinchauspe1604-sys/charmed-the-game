'use strict';
const people = require('../../Charmed/canon/personnages.json');
const magic = require('../../Charmed/canon/magie-demons.json');
const construction = require('../../Charmed/canon/construction.json');
const episodes = require('../../Charmed/canon/episodes-index.json').episodes;

function periodOf(scenario) {
  const p = scenario.canonPeriod;
  if (!p || !Number.isInteger(p.season) || p.season < 1 || p.season > 8) throw new Error('Période canonique absente ou invalide.');
  if (p.episode != null && !episodes.some(e => e.season === p.season && e.episode === p.episode)) throw new Error('Épisode canonique invalide.');
  if (p.episode != null && !['before','during','after'].includes(p.moment)) throw new Error('Moment de l’épisode à préciser.');
  return structuredClone(p);
}

function directorContext(scenario) {
  const period = periodOf(scenario);
  return {
    audience:'director_only', period, universe:construction.universe,
    coverage:'Corpus partiel documenté. Les fiches de fond ne constituent pas à elles seules des preuves suffisantes de réalisation.',
    library:require('./bibliotheque').read(),
    characters:people.characters,
    chronology:people.milestones,
    exclusions:people.excludedImports,
    rules:magic.rules, demons:magic.demons, beings:magic.beings, places:magic.places,
    construction:construction.entries,
    sources:{characters:people.sources,magic:magic.sources,construction:construction.sources}
  };
}

function opponentContext(scenario, camp) {
  const period = periodOf(scenario);
  // Explicit allowlist. No fallback to director secrets or complete encyclopedia.
  return { audience:'camp_only',period,universe:construction.universe,
    knowledge:structuredClone(scenario.campKnowledge?.[camp] || [])};
}

function preparationContext(spec) {
  return {...directorContext(spec), outputStatus:'draft_not_started'};
}

function validateConstruction() {
  const errors=[]; const ids=new Set();
  const localSources=new Set(construction.sources.map(s=>s.id));
  const magicSources=new Set(magic.sources.map(s=>'magic:'+s.id));
  for (const e of construction.entries) {
    if(ids.has(e.kind+':'+e.id))errors.push('Fiche répétée : '+e.id);
    ids.add(e.kind+':'+e.id);
    if(e.sources.some(s=>!localSources.has(s)&&!magicSources.has(s)))errors.push('Source inconnue : '+e.id);
    if(e.status!=='game_rule'&&!e.sources.length)errors.push('Source manquante : '+e.id);
    if(!e.requirements.length||!e.limit)errors.push('Conditions absentes : '+e.id);
  }
  return errors;
}
module.exports={periodOf,directorContext,opponentContext,preparationContext,validateConstruction};
