// Racine fonctionnelle du projet réorganisé. Tous les chemins actifs sont
// définis ici afin d'éviter de disperser la structure du dépôt dans le code.
const path = require("path");
const RACINE = process.env.LOGIC_MATCH_RACINE
  ? path.resolve(process.env.LOGIC_MATCH_RACINE) : path.resolve(__dirname, "..", "..");

const CHEMINS = Object.freeze({
  ecrans: path.join(RACINE, "technique", "ecrans"),
  scripts: path.join(RACINE, "technique", "scripts"),
  regles: path.join(RACINE, "regles", "REGLES_ACTEES.md"),
  bibliotheque: path.join(RACINE, "bibliotheque"),
  donneesBibliotheque: path.join(RACINE, "technique", "donnees-bibliotheque"),
  scenarios: path.join(RACINE, "scenarios"),
  etat: process.env.LOGIC_MATCH_ETAT_DIR
    ? path.resolve(process.env.LOGIC_MATCH_ETAT_DIR) : path.join(RACINE, "etat"),
  visuelsJeu: path.join(RACINE, "visuels", "jeu"),
});

module.exports = { RACINE, CHEMINS };
