#!/usr/bin/env node
// logic-match — le serveur, réduit à la partie.
//
//   node serveur/serveur.js [port]        (défaut : 3129)
//
// Routes : `/` la page du plateau, `/modules/*` ses fichiers, `/partie`,
// `/partie/geste`, `/partie/jour`, `/table`, `/ruban`, `/coach` (routes/partie.js).
// Le calcul vit chez le greffier Python (scripts/partie.py) ; ici on ne fait que
// choisir la partie, appeler Python et servir des fichiers.
const http = require("http");
const path = require("path");
const { envoyer, fichierStatique } = require("./http");
const partie = require("./routes/partie");
const charmed = require("./charmed/routes");

const TYPES = { ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
                ".html": "text/html; charset=utf-8", ".svg": "image/svg+xml", ".json": "application/json" };

const serveur = http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  if (url === "/" || url === "/index.html") return fichierStatique(res, "charmed.html", TYPES[".html"]);
  if (url === "/ancien") return fichierStatique(res, "index.html", TYPES[".html"]);
  if (charmed(req,res,url)) return;
  if (url.startsWith("/modules/") || url === "/base.css") {
    const relatif = url.replace(/^\//, "");
    if (relatif.includes("..")) return envoyer(res, 400, "{}");
    return fichierStatique(res, relatif, TYPES[path.extname(relatif)] || "application/octet-stream");
  }
  if (partie(req, res, url) !== false) return;
  return envoyer(res, 404, JSON.stringify({ erreur: url }));
});

const port = parseInt(process.argv[2] || process.env.PORT || "3129", 10);
serveur.listen(port, "127.0.0.1", () => console.log("Charmed sur http://localhost:" + port + "/"));
