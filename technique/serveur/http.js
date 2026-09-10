// Le transport, réduit à ce dont les routes de la partie ont besoin : écrire
// une réponse, servir un fichier d'écran, connaître la racine — et `qui`, le
// siège qui joue. Dans le dépôt d'origine, `qui` lisait un jeton de cookie
// contre un roster de joueurs ; ici il n'y a pas de roster, et le siège est
// nommé par `?siege=<id>` (ou le cookie `siege`), à défaut « joueur ». Il ne
// sert qu'au marque-page « déjà vu » de chaque siège (etat/joueurs/<siege>/).
const fs = require("fs");
const path = require("path");
const { RACINE, CHEMINS } = require("./contexte");

function envoyer(res, code, corps, type, entetes) {
  res.writeHead(code, Object.assign({
    "Content-Type": type || "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  }, entetes || {}));
  res.end(corps);
}

function fichierDepuis(res, base, relatif, type) {
  try {
    const racine = path.resolve(base);
    const cible = path.resolve(racine, relatif);
    if (cible !== racine && !cible.startsWith(racine + path.sep)) {
      return envoyer(res, 400, JSON.stringify({ erreur: "chemin refusé" }));
    }
    const corps = fs.readFileSync(cible);
    return envoyer(res, 200, corps, type);
  } catch (e) {
    return envoyer(res, 404, JSON.stringify({ erreur: relatif }));
  }
}

function fichierStatique(res, relatif, type) {
  return fichierDepuis(res, CHEMINS.ecrans, relatif, type);
}

function qui(req) {
  const q = (req.url.split("?")[1] || "").match(/(?:^|&)siege=([^&]*)/);
  const c = (req.headers.cookie || "").match(/(?:^|;\s*)siege=([^;]*)/);
  const id = decodeURIComponent((q && q[1]) || (c && c[1]) || "").replace(/[^A-Za-z0-9_-]/g, "");
  return { personnage_id: id || "joueur" };
}

module.exports = { envoyer, fichierStatique, fichierDepuis, qui, RACINE, CHEMINS };
