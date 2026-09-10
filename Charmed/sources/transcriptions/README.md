# Transcriptions d'épisodes — source de consultation

Corpus local de dialogue, aligné sur les 178 entrées de
[episodes-index.json](../../canon/episodes-index.json). Il sert à vérifier une
affirmation avant de l'écrire dans le canon. Il n'est pas lu par le serveur et
n'entre pas dans le moteur.

```powershell
node scripts/fetch_transcripts.cjs            # tout ce qui manque, reprise possible
node scripts/fetch_transcripts.cjs --limit 5  # un lot d'essai
node scripts/fetch_transcripts.cjs --force    # retélécharger
```

## Ce que la source est, et ce qu'elle n'est pas

| Langue | Dossier | Source | Nature |
| --- | --- | --- | --- |
| Anglais | `en/` | springfieldspringfield.co.uk | transcription de fans, dialogue seul |

- **Dialogue seul.** Pas de nom de locuteur, pas de didascalie, pas de découpage
  en scènes. Qui prononce une réplique se déduit du contexte, il ne se lit pas.
- **Transcription de fans, pas relevé officiel.** Coquilles, omissions et
  passages manquants sont possibles. C'est le même niveau de preuve que la
  source `scry-hard-transcript` déjà citée dans
  [base.json](../../canon/base.json) : une transcription **appuie** une
  vérification, elle ne la remplace pas.
- **Trois relevés couvrent deux épisodes chacun.** La source publie certains
  doubles épisodes sur une page unique : `S04E01`/`S04E02`, `S05E01`/`S05E02` et
  `S05E22`/`S05E23` portent le même texte, de longueur double. La numérotation
  n'est pas décalée pour autant — les titres du reste de chaque saison
  correspondent — mais un fait situé « dans la partie 2 » ne peut pas être
  distingué ici. Le manifeste les signale par `relevePartageAvec` et
  `relevesPartages`.
- **Pas un visionnage.** Un épisode dont la transcription est ici reste
  `canonReview: not_reviewed` dans l'index. Ce que la caméra montre sans que
  personne le dise n'est pas dans ce corpus.

## Statut de preuve attendu

Un fait établi sur cette base se déclare comme appuyé par une transcription, pas
comme `verified`. La distinction entre sources secondaires, transcriptions et
preuves canoniques admissibles, posée dans [BIBLIOTHEQUE.md](../../BIBLIOTHEQUE.md),
reste la règle : importer ce corpus n'augmente pas mécaniquement le nombre de
faits admissibles.

## Droits

Les dialogues restent sous droit d'auteur. Ce corpus est une copie de travail
locale. Les fichiers `.txt` sont exclus du dépôt par `.gitignore` ; seul le
manifeste, qui ne contient que des métadonnées (URL, date, nombre de mots,
empreinte SHA-256), est suivi. Ne pas republier ces textes, ni les recopier
intégralement dans les fiches du canon : une citation courte et située suffit à
justifier un fait.
