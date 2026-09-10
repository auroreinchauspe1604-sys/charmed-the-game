'use strict';
// Outils de consultation servis à l'arbitre et au camp adverse — 10 septembre 2026.
// Repris de la refonte de Nico, adapté aux chemins de l'arbre technique/.
//
// Principe conservé tel quel, et c'est le meilleur de son travail : l'accès aux
// données est déterminé par la fonction appelante, jamais par le texte du prompt.
// Chaque appel reçoit un jeu explicite de pointeurs ; ce qui n'y figure pas
// n'existe pas pour lui.
//
// Ces outils sont en LECTURE SEULE. Les opérations d'écriture de Nino ne sont pas
// reprises : la journée reste pilotée par le serveur, l'IA répond à des questions.
const fs = require('fs'), path = require('path');
const { CHEMINS } = require('../contexte');

const rules = () => fs.readFileSync(CHEMINS.regles, 'utf8');

// Les règles sont servies découpées par section : la lecture sans chemin renvoie
// la table des sections, et un chemin ouvre une section seule. Un arbitre peut
// donc consulter le point qui le concerne sans recevoir 80 Ko de document.
let cacheSections = null, cacheEmpreinte = '';
function rulesSections() {
  const brut = rules();
  if (cacheSections && cacheEmpreinte === String(brut.length)) return cacheSections;
  const sections = {};
  let partie = '', titre = 'Préambule', tampon = [];
  const vider = () => {
    const texte = tampon.join('\n').trim();
    if (texte) sections[(partie ? partie + ' — ' : '') + titre] = texte;
    tampon = [];
  };
  for (const ligne of brut.split(/\r?\n/)) {
    const h = /^(#{1,4})\s+(.*)$/.exec(ligne);
    if (!h) { tampon.push(ligne); continue; }
    vider();
    const intitule = h[2].replace(/\//g, ' ').trim();
    if (h[1].length === 1) { partie = intitule.split('—')[0].trim(); titre = intitule; }
    else titre = intitule;
  }
  vider();
  cacheSections = sections; cacheEmpreinte = String(brut.length);
  return sections;
}

// Tolérance de frappe sur les titres de section : accents, ponctuation et casse
// ne doivent pas faire échouer une consultation légitime.
const aplatir = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLocaleLowerCase('fr').replace(/[^a-z0-9]+/g, ' ').trim();
const object = properties => ({ type: 'object', properties, additionalProperties: false });
const string = { type: 'string' };

// Les fils de messages sont transmis en delta par la session ; on ne les répète
// pas dans le plateau consulté à la demande.
function position(board) {
  if (!board) return board;
  const { arbitration, radio, opponent, ...state } = board;
  return state;
}

function documents(scenario) {
  return {
    scenario: () => ({ id: scenario.id, title: scenario.title, period: scenario.canonPeriod, goals: scenario.goals, calendar: scenario.calendar }),
    faits: () => scenario.privateFacts || {},
    canon: () => require('./canon').context(scenario.canonPeriod),
    bibliotheque: () => require('./bibliotheque').read(),
    personnages: () => require('../../donnees-bibliotheque/canon/personnages.json'),
    magie: () => require('../../donnees-bibliotheque/canon/magie-demons.json'),
    construction: () => require('../../donnees-bibliotheque/canon/construction.json')
  };
}

// La préparation ne consulte aucun scénario en cours : elle en écrit un.
// Elle a besoin du corpus et de la bibliothèque, pas des faits privés d'une partie.
function preparationDocuments(spec) {
  const periode = spec?.period || spec?.canonPeriod;
  return {
    specification: () => spec || {},
    canon: () => require('./canon').context(periode),
    bibliotheque: () => require('./bibliotheque').read(),
    personnages: () => require('../../donnees-bibliotheque/canon/personnages.json'),
    magie: () => require('../../donnees-bibliotheque/canon/magie-demons.json'),
    construction: () => require('../../donnees-bibliotheque/canon/construction.json')
  };
}

function campDocuments(scenario, camp) {
  return { connaissances: () => scenario.campKnowledge?.[camp] || [] };
}

function createTools({ board, documents = {} }) {
  const sources = { regles: rulesSections, plateau: () => position(board()), arbitrage: () => board()?.arbitration || [], ...documents };
  const read = (pointer, fragment = '') => {
    if (!Object.hasOwn(sources, pointer)) throw Error('Pointeur inconnu.');
    let value = sources[pointer]();
    for (const key of fragment.split('/').filter(Boolean).map(s => s.replace(/~1/g, '/').replace(/~0/g, '~'))) {
      if (value === null || typeof value !== 'object') throw Error('Chemin introuvable.');
      let clef = key;
      if (!Object.hasOwn(value, clef)) {
        // Titre approché : accents, ponctuation et casse ne font pas échouer.
        const vise = aplatir(clef);
        clef = Object.keys(value).find(k => aplatir(k) === vise)
          || Object.keys(value).find(k => aplatir(k).includes(vise) && vise.length >= 4);
        if (!clef) throw Error('Chemin introuvable. Sections disponibles : ' + Object.keys(value).slice(0, 40).join(' | '));
      }
      value = value[clef];
    }
    return value;
  };
  const tools = [
    { name: 'plateau', description: 'Lire le plateau actuel.', inputSchema: object({}), run: () => position(board()) },
    {
      name: 'lire', description: 'Consulter un pointeur. chemin est un chemin JSON (/characters/0). Les listes sont paginées.',
      inputSchema: { ...object({ pointeur: string, chemin: string, debut: { type: 'integer', minimum: 0 }, limite: { type: 'integer', minimum: 1, maximum: 100 } }), required: ['pointeur'] },
      run: ({ pointeur, chemin = '', debut = 0, limite = 20 }) => {
        const value = read(pointeur, chemin);
        if (Array.isArray(value)) return { total: value.length, debut, elements: value.slice(debut, debut + limite) };
        if (value && typeof value === 'object') {
          if (chemin && JSON.stringify(value).length <= 24000) return value;
          return { champs: Object.entries(value).map(([cle, v]) => ({ cle, type: Array.isArray(v) ? 'liste' : typeof v, ...(Array.isArray(v) ? { total: v.length } : {}) })), chemin };
        }
        return value;
      }
    },
    {
      name: 'chercher', description: 'Chercher du texte dans un pointeur ; renvoie les chemins JSON des valeurs correspondantes.',
      inputSchema: { ...object({ pointeur: string, texte: string, limite: { type: 'integer', minimum: 1, maximum: 100 } }), required: ['pointeur', 'texte'] },
      run: ({ pointeur, texte, limite = 20 }) => {
        if (!texte?.trim()) throw Error('Texte de recherche requis.');
        const found = [], query = texte.toLocaleLowerCase('fr');
        (function walk(v, p) {
          if (found.length >= limite) return;
          if (v && typeof v === 'object') { for (const [k, x] of Object.entries(v)) walk(x, p + '/' + k.replace(/~/g, '~0').replace(/\//g, '~1')); }
          else if (String(v).toLocaleLowerCase('fr').includes(query)) found.push({ chemin: p, valeur: v });
        })(read(pointeur), '');
        return found;
      }
    }
  ];
  return { pointers: Object.keys(sources), tools };
}

module.exports = { createTools, rules, rulesSections, position, documents, campDocuments, preparationDocuments };
