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
    scenarioPolicy:scenario.doctrine||null,
    audience:'director_only', period, universe:construction.universe,
    coverage:'Corpus partiel documenté. Les fiches de fond ne constituent pas à elles seules des preuves suffisantes de réalisation.',
    instructions:[
      "Interprétation souple : juge le sens et la faisabilité, jamais une correspondance mot pour mot avec une fiche. Comprends synonymes, dictée approximative et formulations personnelles. Les exemples documentés illustrent des possibilités, ils ne sont pas des recettes obligatoires. Un usage nouveau cohérent avec les propriétés connues est recevable ; il n’a pas besoin de reproduire une scène. Ne confonds pas détail absent, renfort facultatif et contradiction explicite. Un refus exige un obstacle concret et déterminant, expliqué simplement. Si l’incertitude change réellement l’effet, demande uniquement la précision indispensable sans inventer une impossibilité.",
      'REGLES_ACTEES.md et le moteur priment pour les coûts, délais et états des cartes.',
      'Ces connaissances encyclopédiques peuvent contenir des événements futurs. Ne pas les rendre disponibles aux personnages avant leur accès effectif.',
      'Vérifier période, identité, cible, portée, accès, moyens et conditions de chaque référence. Un épisode cité ne signifie pas disponibilité continue.',
      'Les sources par extrait et recettes partielles gardent leurs limites. Ne pas inventer les ingrédients manquants ; distinguer mécanisme inconnu et moyens matériels manquants.',
      'Préserver exactement les affirmations et intentions proposées. Une alternative cohérente peut être étudiée sans imposer la solution d’un épisode.',
      'Ne jamais divulguer une recette ou l’identité des ressources manquantes dans le retour public. Un nombre de moyens ne doit pas masquer une incertitude canonique.',
      'Document lu : contenu sur la clé selon les règles ; ne pas détruire physiquement un artefact canonique par simple convention d’interface.',
      'Consulter toute la bibliothèque, pas seulement les faits du scénario. Les références documentées admises portent leurs identifiants dans canonReference.facts. Les dossiers de recherche conservent leur niveau de preuve et ne sont pas tous validés.',
      'Les contributions intégrées complètent les anciennes notices : consulter leurs variantes et contre-exemples. Une observation datée prouve un précédent, pas une acquisition permanente ; contrôler pertes, transformations et branches temporelles. Les variantes de cartes restent des propositions privées, pas des ressources distribuées.',
      'Absence de renseignement ne signifie pas impossibilité canonique. Une contradiction établie exige une référence pertinente. Si une propriété nouvelle reste inconnue, canon.status=unverified : le joueur la fait vérifier par l’assistant, sans sanction automatique ni réponse unique consommée.'
    ],
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
    knowledge:structuredClone(scenario.campKnowledge?.[camp] || []),
    instructions:[
      'Utilise seulement tes connaissances explicites et les informations réellement publiées sur le plateau.',
      'Une carte-document non consultée ne donne pas son contenu. Les descriptions déclarées sont des affirmations, pas toutes des preuves.',
      'Ne déduis pas les secrets du scénario ou les plans non joués du joueur. Les capacités personnelles restent liées aux ressources.',
      'Une action proposée doit être examinée par l’arbitre ; le joueur adverse ne décide pas de son succès.'
    ]};
}

function preparationContext(spec) {
  return {...directorContext(spec), preparationPolicy:construction.preparationPolicy,
    mandatoryReview:['Période exacte ou limites assumées','Propriétés canoniques et sources','Inventions explicitement séparées','Contenus documentaires fixes','Connaissances par camp','Deux chemins réalisables par camp','Calendrier et capacité des sous-états','Aucune solution révélée avec le thème'],
    outputStatus:'draft_not_started'};
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
