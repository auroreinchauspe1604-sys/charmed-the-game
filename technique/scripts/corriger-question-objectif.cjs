// Correction ciblée de la partie « Le Nexus sous tension » — 10 septembre 2026.
// Retire la question posée par le camp adverse sur l'état initial du joueur.
// Motif : elle reposait sur une lecture erronée de la nature d'un état — un état
// initial n'est pas une affirmation de fait mais une situation à établir — et elle
// enchaînait quatre demandes distinctes. Le droit de question et la réponse unique
// du joueur restent intacts. Décision validée par Aurore avant application.
'use strict';
process.env.CHARMED_SCENARIO = 'nexus-sous-tension';
const path = require('path');
process.env.CHARMED_STATE_DIR = process.env.CHARMED_STATE_DIR
  || path.resolve(__dirname, '../../etat/charmed/nexus-sous-tension');

const { Store } = require('../serveur/charmed/store');
const E = require('../serveur/charmed/engine');

const CIBLE = process.argv[2] || 'root-phoebe';

(async () => {
  const store = new Store(process.env.CHARMED_STATE_DIR);
  const avant = store.load();
  const question = (avant.questions || []).find(q => q.target === CIBLE);
  if (!question) { console.log('Aucune question sur ' + CIBLE + '. Rien modifié.'); return; }
  console.log('Question retirée : « ' + question.text.slice(0, 120) + '… »');
  console.log('État de ' + CIBLE + ' avant : suspendu = ' + E.publicView(avant).nodes.find(n => n.id === CIBLE).suspended);

  const apres = await store.transact(avant.revision, 'correction-question-' + CIBLE, s => {
    s.questions = s.questions.filter(q => q.id !== question.id);
    s.arbitration.push({ day: s.day, text: 'Correction d’arbitrage : la question posée sur ' + CIBLE
      + ' est retirée. Elle traitait l’énoncé d’un état comme une affirmation de fait, alors qu’un état initial ou un sous-état décrit une situation à établir et commence faux ; elle enchaînait de plus plusieurs demandes distinctes en une seule question. Le droit de question du camp adverse sur cette carte reste ouvert, et la réponse unique du joueur n’est pas consommée.' });
  });

  const vue = E.publicView(apres).nodes.find(n => n.id === CIBLE);
  console.log('État de ' + CIBLE + ' après : suspendu = ' + vue.suspended + ' | révision ' + apres.revision);
  console.log('Questions restantes : ' + (apres.questions || []).map(q => q.target).join(', ') || 'aucune');
})();
