// Refonte des consignes de l'Ange du destin — 10 septembre 2026.
// Remplace l'empilement de cinq blocs concaténés à chaque appel par un jeu de blocs
// distribués selon le rôle. Voir regles/historique/MODIFICATIONS_2026-09-10.md.
'use strict';
const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../serveur/charmed/intelligence-v3.js');
let src = fs.readFileSync(file, 'utf8');

const lines = src.split('\n');
const anchors = [' REACTION :', ' QUESTIONS ET CONTEXTE', ' ÉVALUATION GLOBALE', ' RÈGLES ACTIVES', ' CHAMPS LIEUX'];
let removed = 0, insertAt = -1;
const kept = [];
for (const line of lines) {
  const trimmed = line.trim();
  const isBlock = trimmed.startsWith('input.instruction+=') && anchors.some(a => line.includes(a));
  if (isBlock) { if (insertAt < 0) insertAt = kept.length; removed++; continue; }
  kept.push(line);
}
if (removed !== 5) { console.error('Blocs trouvés : ' + removed + ' au lieu de 5. Rien modifié.'); process.exit(1); }

const NEW = [
"   // --- Consignes distribuées par rôle (10 septembre 2026). ---",
"   // JEU : l'économie du jeu, pour situer le contexte, jamais pour l'appliquer soi-même.",
"   const JEU=' RÈGLES DU JEU, pour situer le contexte et non pour les appliquer toi-même : chaque camp dispose d un seul coup payant par passage ; poser une question, y répondre et demander la création d une ressource sont gratuits. Une carte adverse qui n est pas questionnée se réalise à sa date d examen. Une question gèle la carte visée jusqu à la réponse unique ; une réponse vague ou qui esquive la fait tomber ; une réponse cohérente mais qui exige un renfort laisse la carte en préparation. Une ressource engagée est indisponible pour tout autre usage tant qu elle n est pas libérée. Une attaque déclarée n a encore rien changé tant qu elle n est pas résolue, et elle ne vise qu une ressource LIBRE en main adverse : une ressource déjà engagée relève du verrou. Un état initial peut commencer vrai ou faux ; les deux camps jouent de la même façon, l un renforçant ce qui est vrai, l autre construisant ce qui est faux. Le nombre de sous-états est fixé au début de la partie à la mesure de l objectif.';",
"   // ARBITRAGE : la précision est exigée au moment de la contradiction, pas de la proposition.",
"   const ARBITRAGE=' TON RÔLE. La proposition est dictée en une phrase. Reconstitue l intention à partir du plateau, des cartes en main et de l univers. Ne demande JAMAIS au joueur de reformuler, de développer, de nommer un intervenant, de préciser un moyen ou de justifier davantage : ces manques sont l affaire du camp adverse, qui dispose de la question pour les exploiter. Les gestes ordinaires et les déplacements accessibles sont inclus dans l action ; pas de carte pour chaque micro-étape. Une dictée approximative, une faute de frappe ou une formulation elliptique ne sont jamais des motifs de refus. TOUT REFUS SE FONDE SUR UN FAIT DU PLATEAU QUE TU NOMMES : une carte, une ressource, un engagement en cours, un état identifiable dans la position. Une omission dans la proposition n est jamais un motif de refus. Une lacune de la bibliothèque non plus : la connaissance de Charmed établit seulement ce qui est POSSIBLE, la décision se prend sur la réalité du plateau ; un élément cohérent avec l univers mais non documenté est admis à sa portée ordinaire et l incertitude est simplement signalée. Seule exception au refus fondé sur le plateau : si la phrase peut se lire de deux façons produisant deux cartes différentes, refuse gratuitement en indiquant l ambiguïté, et le joueur reformulera. NE DONNE PAS LA SOLUTION : indique la contradiction ou ce que l effet ne prouve pas, jamais la reformulation correcte, la ressource à choisir, la chaîne ou le chemin tactique. Règle symétrique pour les deux camps.';",
"   // PLATEAU : cohérence matérielle, voies, lieux et personnes déterminants.",
"   const PLATEAU=' COHÉRENCE DE PLATEAU. Une ressource engagée ne sert à rien d autre : un acte dont la réalisation exige une personne, un objet ou un lieu actuellement engagé ailleurs est impossible, même si la proposition ne le désigne pas ; refuse en nommant l engagement. Une clé doit établir un CHANGEMENT identifiable par rapport aux faits déjà acquis : occuper un passage déjà tenu, surveiller un accès déjà contrôlé ou décrire ce que fait habituellement une ressource ne produit aucun fait nouveau ; nomme le changement dans effect, sinon refuse gratuitement. VOIE PRINCIPALE : une clé visant un état initial doit répondre clairement à une condition explicite de cet objectif, et mainCondition cite exactement cette condition ; la suffisance s apprécie à la mesure de cette condition, qui engage une situation d ensemble, si bien qu un moyen unique ne l établit qu exceptionnellement et que tu dois alors expliquer pourquoi rien d autre n est requis. Une contribution seulement préparatoire relève d un sous-état : accepted=false, refus gratuit motivé, sans créer de sous-état automatiquement. VOIE DES SOUS-ÉTATS : une seule ressource suffit dès lors que la clé formée répond réellement, même en partie, au sous-état visé ; plusieurs clés y sont souvent nécessaires. Aucun minimum de ressources nulle part, et mainCondition reste vide hors voie principale. LIEUX ET PERSONNES : une carte Lieu n est nécessaire que si le lieu est nommé dans la condition exacte à établir et si son accès, sa présence, son occupation, son contrôle ou sa propriété détermine ce résultat ; une pièce seulement habituelle ou accessoire n est pas exigée. Une carte Personne n est nécessaire que si l effet annoncé est un acte qui ne peut pas se produire sans quelqu un pour l accomplir et si son identité ou ses capacités déterminent ce que l acte produit ; un effet matériel, automatique, déjà en place ou qui découle d un dispositif existant n en demande aucune. Un lieu est unique : jamais volé, consommé, détruit, transféré ni attaqué ; y accéder, y pénétrer, l occuper ou le contrôler relève d une clé ou d une chaîne de clés, même avec emploi de la force.';",
"   // QUESTIONS : réservé aux rôles qui jugent une question ou une réponse unique.",
"   const QUESTIONS=' QUESTION ET RÉPONSE. La connaissance Charmed atteste les capacités disponibles, pas la réussite de la scène ; le verdict dépend ensuite de la situation actuelle du plateau. Une question recevable soulève un obstacle concret, plausible et pertinent, sans inventer de présence contraire aux faits ni de pouvoir. La réponse doit résoudre précisément cet obstacle par un moyen concret, éventuellement conditionnel, compatible avec l effet annoncé. Ne valide pas une réponse vague, ni une réponse qui élude une interception en parlant seulement de discrétion. Ne suppose ni inaction du défenseur, ni neutralisation, ni fuite ou transmission déjà réussie pour sauver la réponse. Une capacité d intervention plausible ne vaut pas intervention accomplie, mais elle doit être traitée. Si une question repose sur un fait explicitement incompatible, explique ce défaut sans inventer de verdict défavorable sur la carte. Évalue symétriquement les deux camps. Pour une réponse : accepted=false si elle ne traite pas le point précis, même si le mécanisme canonique existe ; réponse cohérente mais exigeant un renfort suit accepted=true et sufficient=false. Aucun événement fictif ne devient acquis par la seule réponse.';",
"   // PROCÉDURE : ce que le moteur attend du verdict lui-même.",
"   const PROCEDURE=' PROCÉDURE : accord de formulation et de pertinence à la pose ; verdict final en fin de journée, après les deux passages. Ne révèle ni le nombre de ressources manquantes ni une recette. Une proposition incomplète reste en préparation sans être retirée. La réponse unique est examinée le soir ; tant qu elle manque, aucune décision sur la carte suspendue. RÉACTION : une clé ou un verrou prêt au jour J reste contestable tout J+1, examen au soir J+1, annonce au matin J+2 ; une nouvelle pose ouvre un nouveau délai ; les attaques ont leur échéance propre. CHAMPS : locations contient uniquement les ids des lieux explicitement nommés dans la condition à établir et réellement déterminants, liste vide sinon. Dans un outcome, controlChanges reste vide sauf si une clé réussie établit elle-même explicitement le contrôle ou l occupation du lieu désigné dans locations ; un simple accès, une approche ou une ouverture ne change jamais le contrôle. transfers est réservé au vol d une ressource transférable et exclut toujours les lieux. Les Fondateurs présentent les résultats au matin.';",
"   const isPreparation=input.role==='preparation';",
"   if(!isPreparation&&!opponent){",
"    input.instruction+=JEU+ARBITRAGE+PLATEAU+PROCEDURE;",
"    if(/question|réponse/i.test(input.role))input.instruction+=QUESTIONS;",
"   }",
"   if(opponent)input.instruction+=JEU;",
];

kept.splice(insertAt, 0, ...NEW);
src = kept.join('\n');

// Le rôle de résolution demandait un statut canonique bloquant : il devient informatif.
src = src.replace(
  "unverified si la preuve canonique manque. Ne traite pas une référence de bestiaire partielle comme une recette complète.",
  "unverified si la documentation manque, ce qui ne bloque rien et sert seulement à signaler l incertitude ; contradicted uniquement si une source du corpus établit explicitement l impossibilite, en citant ses ids. Ne traite pas une référence de bestiaire partielle comme une recette complète."
);
// Même correction dans la consigne de plan().
src = src.replace(
  "unverified pour magie non établie ou contradictoire ; une incertitude ne s'efface pas en renommant un pouvoir en objet.",
  "unverified pour un point simplement non documenté, ce qui ne bloque rien et signale seulement l incertitude ; contradicted uniquement si une source du corpus établit explicitement l impossibilite, en citant ses ids."
);
// La mention d'une demande de précision disparaît : l'ambiguïté se refuse, elle ne se questionne pas.
src = src.replace(
  "Si une ambiguïté de sens ne peut pas être résolue avec le contexte, refuse gratuitement en demandant la précision indispensable au lieu de choisir un autre objectif.",
  "Si la phrase peut se lire de deux façons produisant deux cartes différentes, refuse gratuitement en indiquant l ambiguïté ; le joueur reformulera. N invente pas un autre objectif à sa place."
);
// Critères de création de ressource : la pertinence dans la partie devient le critère principal.
src = src.replace(
  "Pour création ressource, contrôle concours/accès/ingrédients et unicité ;",
  "Pour création ressource, juge d abord la possibilité dans l univers à cette période, puis, critère PRINCIPAL, la pertinence dans la situation actuelle du plateau : ce qu elle apporte qui manque réellement, par quel concours concret elle s obtient, à quel délai et à quel coût. Refuse une ressource sans apport dans la partie, et refuse une ressource dont l emploi résoudrait directement une condition de l objectif : une ressource est un moyen, jamais une réponse. Fixe un delay réel lorsque l obtention exige un déplacement, une négociation, une préparation ou un concours extérieur. Contrôle aussi concours/accès/ingrédients et unicité ;"
);
// Le minimum de deux ressources n'a plus de mention isolée : la règle est dans PLATEAU.
src = src.replace(" Pas de minimum deux.", "");

fs.writeFileSync(file, src);
console.log('Consignes refondues. ' + removed + ' blocs remplacés.');
