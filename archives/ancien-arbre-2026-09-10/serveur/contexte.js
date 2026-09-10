// La racine du dépôt : tout chemin de fichier part d'ici. `LOGIC_MATCH_RACINE`
// permet de servir un autre dossier d'état sans toucher au code.
const path = require("path");
const RACINE = process.env.LOGIC_MATCH_RACINE
  ? path.resolve(process.env.LOGIC_MATCH_RACINE) : path.join(__dirname, "..");
module.exports = { RACINE };
