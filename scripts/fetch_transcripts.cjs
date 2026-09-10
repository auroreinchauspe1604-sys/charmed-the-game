'use strict';
// Récupère les transcriptions de dialogue anglaises des épisodes listés dans
// Charmed/canon/episodes-index.json, une par fichier, avec un manifeste.
//
// Source : springfieldspringfield.co.uk (transcription de fans, déjà citée dans
// Charmed/canon/base.json pour S07E17). Dialogue seul, sans nom de locuteur.
// Usage : source de consultation locale pour le contrôle canonique. Le texte
// reste sous droit d'auteur ; il n'est ni redistribué ni publié par ce dépôt.
//
//   node scripts/fetch_transcripts.cjs [--limit N] [--force] [--delay MS]
//
// Reprise possible : un épisode déjà écrit n'est pas retéléchargé sans --force.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const RACINE = path.join(__dirname, '..');
const INDEX = path.join(RACINE, 'Charmed', 'canon', 'episodes-index.json');
const SORTIE = path.join(RACINE, 'Charmed', 'sources', 'transcriptions', 'en');
const BASE_URL = 'https://www.springfieldspringfield.co.uk/view_episode_scripts.php';
const ATTRIBUTION = 'springfieldspringfield.co.uk — transcription de fans, dialogue seul';

function options(argv) {
  const o = { limit: Infinity, force: false, delay: 1500 };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--limit') o.limit = Number(argv[i + 1]);
    else if (argv[i] === '--force') o.force = true;
    else if (argv[i] === '--delay') o.delay = Number(argv[i + 1]);
  }
  if (!Number.isFinite(o.delay) || o.delay < 500) o.delay = 1500;
  return o;
}

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

function decoder(s) {
  const nommees = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => (n.toLowerCase() in nommees ? nommees[n.toLowerCase()] : m));
}

// Le bloc de dialogue est un <div class="scrolling-script-container">.
function extraire(html) {
  // La classe apparaît aussi dans les règles CSS de la page : viser la balise.
  const BALISE = '<div class="scrolling-script-container">';
  const debut = html.indexOf(BALISE);
  if (debut === -1) return null;
  const ouvert = debut + BALISE.length - 1;
  const fin = html.indexOf('</div>', ouvert);
  if (fin === -1) return null;
  const texte = decoder(
    html
      .slice(ouvert + 1, fin)
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ''),
  )
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return texte.length ? texte : null;
}

async function telecharger(url, essais = 3) {
  for (let n = 1; n <= essais; n += 1) {
    try {
      const rep = await fetch(url, {
        headers: { 'user-agent': 'charmed-the-game/1.0 (corpus local de vérification canonique)' },
      });
      if (rep.status === 404) return { statut: 404, html: null };
      if (!rep.ok) throw new Error(`HTTP ${rep.status}`);
      return { statut: rep.status, html: await rep.text() };
    } catch (err) {
      if (n === essais) throw err;
      await pause(2000 * n);
    }
  }
  return { statut: 0, html: null };
}

async function principal() {
  const opt = options(process.argv.slice(2));
  const index = JSON.parse(fs.readFileSync(INDEX, 'utf8'));
  fs.mkdirSync(SORTIE, { recursive: true });

  const cheminManifeste = path.join(SORTIE, 'manifeste.json');
  const manifeste = fs.existsSync(cheminManifeste)
    ? JSON.parse(fs.readFileSync(cheminManifeste, 'utf8'))
    : {
        universe: index.universe,
        source: BASE_URL,
        attribution: ATTRIBUTION,
        langue: 'en',
        nature: 'transcription de dialogue par des fans, sans nom de locuteur ni didascalie fiable',
        use:
          "Consultation locale pour le contrôle canonique. Une réplique citée reste une source de fans : elle appuie une vérification, elle ne vaut pas relevé officiel. Texte non redistribué par ce dépôt.",
        recupereLe: null,
        episodes: {},
      };

  const aFaire = index.episodes.filter((ep) => {
    const fichier = path.join(SORTIE, `${ep.id}.txt`);
    return opt.force || !fs.existsSync(fichier);
  });
  const lot = aFaire.slice(0, opt.limit);

  console.log(`${index.episodes.length} épisodes indexés, ${aFaire.length} à récupérer, ${lot.length} dans ce lot.`);
  let ok = 0;
  const absents = [];

  for (const [i, ep] of lot.entries()) {
    const cle = `s${String(ep.season).padStart(2, '0')}e${String(ep.episode).padStart(2, '0')}`;
    const url = `${BASE_URL}?tv-show=charmed&episode=${cle}`;
    let res;
    try {
      res = await telecharger(url);
    } catch (err) {
      console.log(`  ${ep.id} échec réseau : ${err.message}`);
      absents.push({ id: ep.id, raison: `réseau : ${err.message}` });
      await pause(opt.delay);
      continue;
    }
    const texte = res.html ? extraire(res.html) : null;
    const mots = texte ? texte.split(/\s+/).filter(Boolean).length : 0;
    if (texte && mots < 800) {
      // Bloc trop court pour un épisode : mise en page changée ou page vide.
      console.log(`  ${ep.id} bloc suspect (${mots} mots), non écrit`);
      absents.push({ id: ep.id, raison: `bloc suspect de ${mots} mots` });
      manifeste.episodes[ep.id] = { url, statut: 'absent', titre: ep.title, raison: 'bloc trop court' };
      if (i < lot.length - 1) await pause(opt.delay);
      continue;
    }
    if (!texte) {
      console.log(`  ${ep.id} absent de la source (http ${res.statut})`);
      absents.push({ id: ep.id, raison: res.statut === 404 ? 'page absente' : 'aucun bloc de dialogue' });
      manifeste.episodes[ep.id] = { url, statut: 'absent', titre: ep.title };
    } else {
      fs.writeFileSync(path.join(SORTIE, `${ep.id}.txt`), `${texte}\n`, 'utf8');
      manifeste.episodes[ep.id] = {
        url,
        statut: 'recupere',
        titre: ep.title,
        mots,
        caracteres: texte.length,
        sha256: crypto.createHash('sha256').update(texte, 'utf8').digest('hex'),
        recupereLe: new Date().toISOString().slice(0, 10),
      };
      ok += 1;
      console.log(`  ${ep.id} ${String(mots).padStart(5)} mots — ${ep.title}`);
    }
    if (i < lot.length - 1) await pause(opt.delay);
  }

  // La source publie un épisode en deux parties sur une seule page : les deux
  // identifiants reçoivent alors le même relevé, de longueur double. Ce n'est
  // pas un décalage de numérotation, mais une granularité différente : à noter,
  // parce qu'un fait situé dans « la partie 2 » ne peut pas être distingué ici.
  const parEmpreinte = new Map();
  for (const [id, e] of Object.entries(manifeste.episodes)) {
    if (!e.sha256) continue;
    if (!parEmpreinte.has(e.sha256)) parEmpreinte.set(e.sha256, []);
    parEmpreinte.get(e.sha256).push(id);
  }
  const partages = [];
  for (const [, ids] of parEmpreinte) {
    if (ids.length < 2) continue;
    partages.push(ids.sort());
    for (const id of ids) {
      manifeste.episodes[id].relevePartageAvec = ids.filter((autre) => autre !== id);
    }
  }
  manifeste.relevesPartages = partages.sort((a, b) => a[0].localeCompare(b[0]));

  manifeste.recupereLe = new Date().toISOString().slice(0, 10);
  const recuperes = Object.values(manifeste.episodes).filter((e) => e.statut === 'recupere').length;
  manifeste.couverture = `${recuperes}/${index.episodes.length} épisodes de l'index`;
  manifeste.absents = Object.entries(manifeste.episodes)
    .filter(([, e]) => e.statut === 'absent')
    .map(([id]) => id);
  fs.writeFileSync(cheminManifeste, `${JSON.stringify(manifeste, null, 2)}\n`, 'utf8');

  console.log(`\n${ok} récupérés dans ce lot, ${absents.length} absents. Couverture : ${manifeste.couverture}.`);
  console.log(`Fichiers : ${path.relative(RACINE, SORTIE)}`);
}

principal().catch((err) => {
  console.error(err);
  process.exit(1);
});
