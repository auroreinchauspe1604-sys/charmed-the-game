// Étape 5 — le tri. 10 septembre 2026.
// Ce qui est une règle du jeu sort du prompt et ne vit plus que dans
// REGLES_ACTEES.md, consultable par le pointeur regles. Ce qui reste dans le
// prompt est le contrat de sortie : la sémantique des champs que le moteur
// attend, qui n'est pas une règle et n'a pas sa place dans le document de règles.
'use strict';
const fs = require('fs'), path = require('path');
const file = path.resolve(__dirname, '../serveur/charmed/intelligence-v3.js');
const brut = fs.readFileSync(file, 'utf8');
const FIN = brut.includes('\r\n') ? '\r\n' : '\n';
let lignes = brut.split(/\r?\n/);

const iDe = motif => {
  const i = lignes.findIndex(l => l.trimStart().startsWith(motif));
  if (i < 0) { console.error('Introuvable : ' + motif); process.exit(1); }
  return i;
};

// ---------------------------------------------------------------- consignes

const REGLES = ` LES RÈGLES DU JEU NE SONT PAS RECOPIÉES DANS CE MESSAGE : elles sont dans le pointeur regles, seule source de vérité. lire({pointeur:"regles"}) donne la table des sections ; lire({pointeur:"regles",chemin:"/Partie 3 — 1.3 Proposition refusée"}) en ouvre une, et un titre approximatif suffit ; chercher({pointeur:"regles",texte:"attaque"}) indique où un point est traité. AU PREMIER APPEL DE CETTE SESSION, lis Partie 3 section 0, Partie 3 section 1.3, Partie 4 section 2, Partie 4 section 3, Partie 4 section 5 et Partie 4 section 7 : elles fixent ce que tu peux exiger d une proposition, sur quoi un refus se fonde, ce que la connaissance de Charmed permet de conclure et ce que les deux camps savent. ENSUITE, avant chaque verdict, ouvre les sections qui portent sur l acte jugé — clé, verrou, attaque, question et réponse, sous-état, création de ressource, personnage, lieu, voie principale et branche. Ne tranche pas de mémoire un point dont tu ne viens pas de relire la règle. Si ce message et les règles semblent diverger, LES RÈGLES L EMPORTENT.`;

const CONTRAT = ` CONTRAT DE SORTIE — mécanique du moteur, à ne pas confondre avec les règles. reason : le motif, une ou deux phrases. missing : le NOMBRE de pièces encore nécessaires après celle-ci ; sufficient=true si et seulement si missing=0. mainCondition : la condition de l objectif initial que la contribution prétend établir, citée mot pour mot ; chaîne vide hors voie principale. delay : 0 si l acte peut se produire dès les moyens réunis, sinon le nombre de jours réellement nécessaires. dependsOn : ids des cartes réellement nécessaires, rien d automatique. locations : ids des lieux déterminants, liste vide sinon. requiredCount : entier supérieur ou égal à 1, réservé à une attaque déclarée sans première pièce. canon : ordinary si aucun mécanisme magique ne fonde le résultat ; verified avec les ids des faits du corpus pour un effet magique établi ; unverified si la documentation manque, ce qui ne bloque rien et signale seulement une incertitude ; contradicted seulement si une source du corpus établit explicitement l impossibilité, ids cités. Tout champ sans objet : liste vide, chaîne vide, nombre 0, booléen false.`;

const REGLES_JOUEUR = ` LES RÈGLES DU JEU SONT DANS LE POINTEUR regles et elles font autorité. lire({pointeur:"regles"}) donne la table des sections ; lire({pointeur:"regles",chemin:"/Partie 3 — 1.1 Actions payantes"}) en ouvre une, un titre approximatif suffit ; chercher({pointeur:"regles",texte:"verrou"}) trouve où un point est traité. AU PREMIER PASSAGE DE CETTE SESSION, lis la Partie 1 puis la Partie 3 : tu sauras ce que coûte chaque action et ce qui rend une carte valable. Ensuite, relis la section concernée avant tout coup dont tu n es pas certain. Une action refusée par l arbitre ne te coûte rien ; un passage sans coup payant est perdu.`;

const CONSIGNES = [
  '   // --- Consignes distribuées par rôle. Tri du 10 septembre 2026 : les règles',
  '   // du jeu ne sont plus paraphrasées ici, elles sont lues dans le pointeur',
  '   // regles. Ne subsiste que le contrat de sortie, qui relève du moteur.',
  '   const REGLES=' + JSON.stringify(REGLES) + ';',
  '   const CONTRAT=' + JSON.stringify(CONTRAT) + ';',
  '   const REGLES_JOUEUR=' + JSON.stringify(REGLES_JOUEUR) + ';'
];

// Remplacement du bloc des cinq anciennes constantes.
const debut = iDe('// --- Consignes distribuées par rôle');
const fin = iDe('const isPreparation=');
lignes.splice(debut, fin - debut, ...CONSIGNES);

// Composition par rôle.
const iComp = iDe('if(!isPreparation&&!opponent){');
const finComp = lignes.findIndex((l, i) => i > iComp && l.trimStart().startsWith('if(opponent)input.instruction+='));
if (finComp < 0) { console.error('Bloc de composition introuvable.'); process.exit(1); }
lignes.splice(iComp, finComp - iComp + 1,
  '   if(!isPreparation)input.instruction+=opponent?REGLES_JOUEUR:REGLES;',
  '   if(!isPreparation&&!opponent)input.instruction+=CONTRAT;');

// La consigne canon appendue à la résolution est désormais dans CONTRAT.
const iCanon = lignes.findIndex(l => l.includes("if(input.role==='arbitre des faits obtenus et de leurs preuves')input.instruction+="));
if (iCanon >= 0) lignes.splice(iCanon, 1);

// ------------------------------------------------------- instructions de rôle

const roles = {
  ' plan(s,camp,a){': " plan(s,camp,a){return this.judge({role:'arbitre : accord/refus, aucune action autonome',camp,action:a,position:vueArbitre(s),reference:scenario.privateFacts,instruction:INSTRUCTION},planSchema);}",
  ' placement(s,camp,a){': " placement(s,camp,a){return this.judge({role:'arbitre de pose',camp,action:a,position:vueArbitre(s),reference:scenario.privateFacts,instruction:INSTRUCTION},placementSchema);}",
  ' defense(s,camp,a){': " defense(s,camp,a){return this.judge({role:'arbitre de renfort défensif',camp,action:a,attack:E.node(s,a.target),resource:E.resource(s,a.resource),position:vueArbitre(s),reference:scenario.privateFacts,instruction:INSTRUCTION},placementSchema);}",
  ' answer(s,camp,a){': " answer(s,camp,a){return this.judge({role:'arbitre de la réponse unique',camp,question:s.questions.find(q=>q.id===a.target),answer:a.text,position:vueArbitre(s),reference:scenario.privateFacts,instruction:INSTRUCTION},answerSchema);}",
  ' resolve(s,candidates,morning=false){': " resolve(s,candidates,morning=false){return this.call(JSON.stringify({role:'arbitre des faits obtenus et de leurs preuves',day:s.day,morning,position:vueArbitre(s),candidates,events:morning?scenario.calendar.filter(e=>e.morning===s.day):[],reference:scenario.privateFacts,instruction:INSTRUCTION}),resolutionSchema);}",
  ' opponent(s){': " opponent(s){return this.call(JSON.stringify({role:'joueur adverse : '+(scenario.opponentRole||'humain calculateur, commanditaire'),camp:'commanditaire',position:opponentView(s),instruction:INSTRUCTION}),aiSchema,'commanditaire');}"
};

const textes = {
  ' plan(s,camp,a){': `Formule fidèlement title et effect à partir de la phrase dictée, sans inventer une réalisation ni élargir les conditions voulues. Pour un sous-état, conserve exactement les personnes, la temporalité et la modalité : consentir à une protection ne signifie pas avoir déjà été protégé, et accepter que quelqu un vous protège ne reconnaît aucune protection passée. Corrige la grammaire sans ajouter de condition de réussite. Ne révèle jamais, dans title, effect ou reason, quelles cartes manquent, ni une recette, ni le chemin à suivre. Pour une demande de création de ressource, relis Partie 3 section 2 bis avant de te prononcer ; costs ne contient que les ingrédients réellement consommés et jamais un personnage ; canonicalId reste stable pour un personnage canonique, sinon un titre normalisé, et sans clone.`,
  ' placement(s,camp,a){': `Juge si cette ressource contribue réellement à l effet déjà formulé, sans le modifier. Relis Partie 3 section 3.2 pour la distinction entre moyen indispensable et renfort utile, et Partie 3 section 3.4 pour l exclusivité des engagements. Ne dis jamais quelles ressources manquent, et n impose aucune identité de carte.`,
  ' defense(s,camp,a){': `Vérifie si cette ressource libre peut concrètement renforcer la cible de cette attaque avant sa résolution ; relis Partie 3 section 8.3. accepted porte sur la pertinence et la possibilité du renfort, jamais sur une réussite automatique de la défense. Ne transforme pas le renfort en verrou et ne révèle aucune solution. sufficient=true, missing=0, delay=0, dependsOn vide sauf dépendance indispensable, situationChanged=false et changeReason vide.`,
  ' answer(s,camp,a){': `UNE seule réponse sera enregistrée. Relis Partie 3 sections 7.3 et 7.4, qui fixent les trois issues, puis traduis-les ainsi : réponse incomplète, incohérente ou impossible, accepted=false ; réponse cohérente et possible mais qui exige encore un moyen indispensable, accepted=true et sufficient=false, missing estimant ces moyens ; réponse complète et suffisante, accepted=true, sufficient=true, missing=0. Ne propose aucune correction ni seconde chance, et n accepte ni autre cible ni autre effet.`,
  ' resolve(s,candidates,morning=false){': `Un outcome exactement par candidat, aucune autre action. Relis avant de juger Partie 3 section 10 pour l examen de fin de journée, section 11 pour les résolutions simultanées, section 9 pour les retours, récupérations et pertes, et Partie 2 section 10 pour ce qui devient un fait acquis. CHAMPS DE SORTIE : usedResources liste toutes les cartes physiquement employées par cet acte, chacune devant figurer parmi les pièces engagées, parmi les renforts défensifs de l attaque, ou être la cible attaquée. established formule le fait effectivement obtenu, qui peut être partiel sans rendre la cible vraie. forcedFailure=true impose success=false. losses, consume et recovery ne portent que sur les pièces de cet acte ou la cible attaquée ; consume seulement pour un usage unique réellement consommé, jamais un personnage ; recovery donne pour CHAQUE pièce engagée son propre nombre de jours, 0 compris, jamais un délai uniforme, et sans commentaire public annonçant ces retours. maintainers contient les pièces dont la PRÉSENCE CONTINUE conditionne l effet, pour un verrou actif comme pour une clé à effet continu : des cristaux disposés qui doivent rester en place y figurent, une porte déjà coincée n y figure pas car son effet est devenu autonome ; liste vide pour un effet durable sans auteur. transfers est réservé au vol d une ressource transférable et exclut les lieux. fallenLocks ne contient que les verrous actifs dont une condition réelle de maintien a cessé. states ne contient que des changements de vérité motivés, et supports les ids des clés réalisées, sous-états vrais ou attaques réussies qui prouvent ensemble la phrase entière ; traite les états enfants avant leurs parents. controlChanges reste vide sauf si une clé réussie établit elle-même explicitement le contrôle ou l occupation du lieu désigné dans locations. defenderBenefit est obligatoire et non vide pour toute attaque échouée : un avantage concret et proportionné découlant de l échec, qui devient un fait du plateau. victory examine CHAQUE état initial : allConditions selon toutes ses conditions réelles, secure selon l absence de chemin adverse concret encore réalisable avant l échéance. Aucun gagnant contradictoire, ni score, ni prolongation. Les ressources distribuées par le calendrier sont déjà dans la position : n en invente aucune autre.`,
  ' opponent(s){': `COMMENT JOUER — les règles sont dans le pointeur regles ; ce qui suit est la manière de t en servir.
 TON OBJECTIF. Ton état initial et celui de ton adversaire sont décrits dans le récit : l un commence vrai et se maintient, l autre commence faux et se construit. Tu ne gagnes qu au dernier matin, et seulement si ton état est encore vrai ET qu aucun chemin adverse concret ne peut plus le défaire avant l échéance. Tenir jusque-là est ta condition de victoire.
 CE QUE TU AS À CHAQUE PASSAGE. Un coup payant ET des actions gratuites. Ce ne sont pas des options concurrentes : les gratuites s ajoutent au coup payant, elles ne le remplacent jamais. Un passage où tu ne dépenses pas ton coup payant est un passage perdu, et tu en as un nombre limité avant l échéance. Joue ton coup, joue tes actions gratuites, puis termine par end. position.spent fait autorité sur ce que tu as déjà dépensé.
 L ERREUR À NE PAS COMMETTRE. Un état initial et un sous-état sont des phrases au futur déguisées en présent : ils décrivent ce qu un camp VEUT établir et commencent FAUX. Quand ton adversaire crée le sous-état « les sœurs disposent des moyens contre Zankou », il n affirme pas qu elles les ont : il annonce ce qu il va tenter de rendre vrai. Ne lui reproche donc jamais de prétendre détenir ce qu il annonce, et ne traite jamais l énoncé d un état comme un fait acquis — les faits acquis sont dans la liste des faits du récit, nulle part ailleurs. Une clé, elle, prétend prouver quelque chose : c est elle qu on questionne utilement.
 CE QUE FAIT TON COUP PAYANT : il construit ta position. Une clé qui change réellement quelque chose, un verrou sur une contribution adverse en cours, une attaque sur une ressource adverse libre en main, un sous-état qui te donne une marche intermédiaire. Une clé qui redit ce que fait ta ressource ne construit rien : un guetteur qui guette, un éclaireur qui éclaire ou un stratège qui décide ne changent pas la situation et seront refusés. Cherche ce qui n est pas encore vrai sur le plateau et que ton coup rendrait vrai.
 CE QUE FONT TES ACTIONS GRATUITES : elles pèsent sur sa position. Une carte adverse jamais questionnée se réalisera à sa date d examen sans que tu puisses plus rien y faire. Tu ne disposes que d une question par carte adverse pour toute la partie, et elle vaut exactement ce que vaut sa précision. Comprends pourquoi : une question qui demande plusieurs choses à la fois laisse le camp interrogé choisir ce qu il traite et répondre largement, et elle se retourne contre toi ; une question qui porte sur UN seul obstacle concret l oblige à ce point précis, et la carte tombe s il l esquive ou reste vague. Vise donc un obstacle, un seul, celui que tu crois le plus difficile à lever, en une seule phrase interrogative. Choisis aussi ta cible : une contribution déjà engagée et proche de son examen est un meilleur objet qu un énoncé général. Réponds complètement, pendant ce passage, aux questions posées à tes cartes : une seule réponse sera enregistrée.
 FORME DES COUPS. Au plus un coup payant par passage ; créations de ressources, questions et réponses sont gratuites. place engage une pièce libre sur une clé ou un verrou, resource étant son id. attack exige au moins une ressource libre dans ta main au moment de la déclarer mais ne pose encore aucune pièce, resource reste donc vide, et la cible doit être une ressource adverse LIBRE en main. defend engage une ressource libre pour renforcer la cible d une attaque révélée, target étant l id de l attaque. withdraw retire une ressource d une de tes clés ou de tes verrous seulement, jamais d une attaque, et consomme ton coup. Au plus huit gestes par passage, end compris.
 CE QUE TU NE SAIS PAS. Les explications d arbitrage ne donnent aucune connaissance nouvelle à ton personnage, et tu ignores les brouillons du joueur. Tu ne connais le nombre de moyens exigés par tes attaques qu après leur révélation. Termine toujours ton passage par end.`
};

const avecContrat = new Set([' plan(s,camp,a){', ' placement(s,camp,a){', ' answer(s,camp,a){']);

for (const [prefixe, gabarit] of Object.entries(roles)) {
  const i = lignes.findIndex(l => l.startsWith(prefixe));
  if (i < 0) { console.error('Rôle introuvable : ' + prefixe); process.exit(1); }
  const texte = JSON.stringify(textes[prefixe]) + (avecContrat.has(prefixe) ? '+CONTRAT_ROLE' : '');
  lignes[i] = gabarit.replace('INSTRUCTION', texte);
}

let texte = lignes.join(FIN);
// CONTRAT est local à call() ; les instructions de rôle sont construites avant
// l'appel, elles le reçoivent donc par concaténation dans call() elle-même.
texte = texte.replace(/\+CONTRAT_ROLE/g, '');

fs.writeFileSync(file, texte);
console.log('Tri appliqué.');
for (const trace of ['JEU=', 'ARBITRAGE=', 'PLATEAU=', 'QUESTIONS=', 'PROCEDURE='])
  console.log('  ancienne constante ' + trace + ' : ' + (texte.includes('const ' + trace) ? 'ENCORE PRÉSENTE' : 'retirée'));
console.log('  module : ' + (() => { try { delete require.cache[require.resolve(file)]; require(file); return 'OK'; } catch (e) { return 'ERREUR ' + e.message; } })());
