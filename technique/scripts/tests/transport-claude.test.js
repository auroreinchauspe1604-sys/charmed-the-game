'use strict';
// Contrôle du transport Claude : validation du formulaire et extraction de la réponse.
const test = require('node:test'), assert = require('node:assert/strict');
const { valider, extraire } = require('../../serveur/charmed/intelligence-transport-claude');

const schema = { type: 'object', properties: { accepted: { type: 'boolean' }, reason: { type: 'string' }, n: { type: 'integer' }, tags: { type: 'array', items: { type: 'string' } }, statut: { type: 'string', enum: ['ordinary', 'verified'] } }, required: ['accepted', 'reason', 'n', 'tags', 'statut'], additionalProperties: false };

test('une réponse conforme ne produit aucun écart', () => {
  assert.deepEqual(valider({ accepted: true, reason: 'ok', n: 0, tags: [], statut: 'ordinary' }, schema), []);
});

test('les écarts au formulaire sont tous nommés', () => {
  const erreurs = valider({ accepted: 'oui', n: 1.5, tags: 'x', statut: 'inconnu', extra: 1 }, schema);
  assert(erreurs.some(e => /accepted doit être true ou false/.test(e)));
  assert(erreurs.some(e => /reason est absent/.test(e)));
  assert(erreurs.some(e => /n doit être un entier/.test(e)));
  assert(erreurs.some(e => /tags doit être une liste/.test(e)));
  assert(erreurs.some(e => /statut doit valoir/.test(e)));
  assert(erreurs.some(e => /extra n’est pas une propriété admise/.test(e)));
});

test('le JSON est extrait même entouré de texte ou d’un bloc de code', () => {
  const enrobe = JSON.stringify({ is_error: false, result: 'Voici :\n```json\n{"accepted":true,"reason":"ok","n":0}\n```\nvoilà.' });
  assert.deepEqual(extraire(enrobe), { accepted: true, reason: 'ok', n: 0 });
  const nu = JSON.stringify({ is_error: false, result: '{"accepted":false,"reason":"non","n":2}' });
  assert.deepEqual(extraire(nu), { accepted: false, reason: 'non', n: 2 });
});

test('une erreur du client est remontée telle quelle', () => {
  assert.throws(() => extraire(JSON.stringify({ is_error: true, result: 'Not logged in · Please run /login' })), /Not logged in/);
  assert.throws(() => extraire('pas du json'), /illisible/);
});
