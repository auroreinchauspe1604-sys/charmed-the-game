# Passation — design de l'interface de Charmed The Game

**Date :** 23 septembre 2026
**Pour :** une nouvelle conversation consacrée uniquement au design (plateau, cartes, disposition de l'écran).

---

## 1. Ce qu'on attend de la nouvelle conversation

Aurore veut des **propositions d'interface sous forme d'images**. Rien ne doit être modifié dans le jeu lui-même.

Sa dernière demande, restée sans réponse : **« Ose quelque chose de différent !!! »**. Les dispositions A à J restent trop proches d'un plateau de jeu de cartes classique. Il faut des propositions franchement audacieuses, qui font ressentir l'univers Charmed à fond, sans perdre la lisibilité ni les règles.

## 2. Façon de travailler avec Aurore

- **Images seulement.** Ne jamais modifier les fichiers du jeu ni l'interface réelle.
- **Dictée vocale.** Ses messages contiennent des erreurs de transcription : les interpréter selon le contexte.
- **Questions en prose.** Jamais de choix multiples ni de boutons.
- **Aller au bout.** Livrer des images finies, sans laisser de travail à moitié fait.
- **Pas de divulgation.** Ne rien révéler de ses scénarios. Utiliser un exemple fictif, et le dire sur l'image.
- **Livraison.** Envoyer les images dans la conversation, puis les enregistrer dans :
  `C:\Users\auror\Videos\charmed\logic-match\visuels\atelier\propositions-interface-2026-09-23\v2\`

## 3. Ce qu'Aurore a validé

### Cartes : validées

- **Photo pleine carte** dans le cadre de la famille, avec un filet doré et un léger vignettage.
- **Le nom sur un ruban** aux couleurs de la famille.
- **La même police partout**, que la carte ait une photo ou non.
- **Cartes sans photo pour l'instant :** on ne les change pas. Elles gardent leur cadre et leur titre, sans gravure ni ruban.
- **Personnages ET objets et lieux en photo**, à partir de son dossier `visuels\atelier\Assets\`.

### Couleurs des ressources (point corrigé par Aurore)

- Dans la main, une ressource est **toujours bleue**.
- Jouée dans une clé, elle **quitte la main** et se range en éventail contre la clé, en **doré**.
- Jouée dans un verrou, elle se range contre le verrou, en **rouge**.
- Une fois libérée, elle **revient bleue** dans la main.
- **Gris :** gelée (visée par une attaque), en route ou en récupération, avec sa date.
- **Barre rouge :** détruite, consommée ou perdue.
- **Le rouge est réservé aux verrous.** Aucun camp n'a donc de couleur propre. La proposition B de la première série, avec des cartes adverses pourpres, est abandonnée pour cette raison.

### Autres demandes d'Aurore

- Garder le **design Charmed** : cuir vert, parchemin, dorures vieillies, titres enluminés (Les Fondateurs, Calendrier, Le tour, L'Ange du destin), logo doré, arabesque, coins dorés, grenier fondu dans le plateau.
- Garder le **panneau des Fondateurs**.
- **Voir tout le jeu en permanence**, pour savoir où agir.
- Les **tiroirs** sont validés. Les **petits panneaux** ne montrent que l'essentiel.
- Pouvoir **répondre à l'Ange du destin** avec « Contester ce verdict » (voir §5).
- **Se baser sur les règles**, pas sur la partie en cours.
- On peut **changer la disposition globale** de l'écran.

## 4. Règles à respecter

Référence : `logic-match\regles\REGLES_ACTEES_consolide_150926.md`. Il est identique octet pour octet à `REGLES_ACTEES.md`.

### Partie 5 — Interface

- **§1.** L'adversaire est en haut, le joueur en bas. Colonne de gauche : calendrier et informations du scénario. Colonne de droite : le tour et l'Ange. La zone d'attaque a un liseré rouge, un intitulé et un emplacement en pointillés quand elle est vide.
  Aurore autorise à changer la disposition. Si elle retient une autre disposition, ce paragraphe sera à mettre à jour.
- **§2.** Familles de cartes :
  - vert avec le logo Charmed = état initial ;
  - vert avec la triquetra = sous-état ;
  - bleu = ressource libre ;
  - doré = clé ;
  - rouge = verrou ;
  - gris = indisponible ;
  - barre rouge = perdue.
- **§3.** Une petite carte affiche un symbole, un titre court, le statut vrai/faux (pour un état ou un sous-état) et ses marqueurs. Le texte complet s'ouvre au clic, dans une fenêtre en forme de livre (§4).
- **§6.** L'Ange du destin a « Lire le message », avec les Faits établis en dessous. La triquetra est centrée dans son propre espace.
- **§9.** L'interface doit toujours permettre de distinguer :
  - ce qui est cliquable ;
  - les états libre, engagé, suspendu et perdu ;
  - une proposition et un fait acquis ;
  - les phases de la journée ;
  - la voie principale, les branches et la zone d'attaque.

### Mécanique à montrer juste

- **Voie principale** = les clés posées directement sur l'état initial. **Branches** = les sous-états et leurs clés.
- **Un verrou** est posé par le défenseur contre un élément adverse : une clé, un sous-état, une attaque ou une ressource engagée. Il n'est jamais posé sur l'état initial.
- **Une attaque** vise uniquement une ressource **libre** dans la main adverse, qui devient alors gelée.
- **Une contre-clé** fait tomber un verrou si elle est recevable. Un verrou qui tombe « n'a pas eu lieu » : ses ressources reviennent.
- **Une question** se pose sur un sous-état, une clé ou un verrou, jamais sur l'état initial.
- **États d'une clé :** en préparation, prête (avec son jour d'examen J+2), suspendue, acquise, retirée.
- **Phases de la journée :** début de journée, passage du premier camp, passage du second camp, examen du soir.

## 5. Contester un verdict (Partie 6 §5, fonctionnalité prévue)

Le bouton « Contester ce verdict » ouvre un tiroir à droite, et le plateau reste visible.

1. Aurore écrit son désaccord librement.
2. Elle clique sur « Enregistrer ».
3. **Ensuite**, elle choisit entre : continuer à jouer, demander une vérification immédiate, ou garder pour analyse.

Garanties à rappeler : la contestation est gratuite, elle ne change jamais la partie toute seule, le verdict d'origine n'est jamais effacé et l'adversaire n'y a pas accès.

## 6. Ce qui a déjà été proposé

Toutes les images sont dans `...propositions-interface-2026-09-23\v2\`. L'exemple fictif est le même partout : les sœurs Halliwell contre Barbas au manoir, au jour 4 sur 12.

| Fichier | Idée |
|---|---|
| `V2-4-cartes-portraits.jpg` | Ta carte Balthazar déclinée dans chaque famille |
| `V3-3-cartes-photo-design-r2.jpg` | **Design des cartes validé** |
| `V3-2-contester-cartes-photo-r3.jpg` | Tiroir de l'Ange avec « Contester ce verdict » |
| `Plateau-A-face-a-face.jpg` | Deux bandes horizontales, une par camp |
| `Plateau-B-ligne-de-front.jpg` | Tout ce qui vise l'autre camp sur une bande centrale, avec des flèches |
| `Plateau-C-couloirs.jpg` | Quatre colonnes communes aux deux camps |
| `Plateau-D-cercle-de-cristaux.jpg` | Le plateau dans un cercle de cristaux, avec une faille rouge au centre |
| `Plateau-E-livre-ouvert.jpg` | Le Livre des Ombres ouvert à l'italienne |
| `Plateau-F-arbre-des-faits.jpg` | Des arbres avec des lianes dorées et une clairière centrale |
| `Disposition-G-la-frise.jpg` | Le calendrier en frise de lunes, un rail à droite |
| `Disposition-H-le-lutrin.jpg` | Les camps à gauche et à droite, le lutrin de l'Ange au centre |
| `Disposition-J-table-de-seance.jpg` | Une table ovale, les douze jours en horloge, l'Ange au centre |

Les flèches entre une carte et sa cible, et la main séparée des cartes jouées, ont été bien reçues. Il manque encore **l'audace**.

**Pistes pas encore explorées :**
- une vraie scène du grenier en perspective ;
- le plateau vu à travers le vitrail triquetra du grenier ;
- la marelle ou le chemin de la partie ;
- une carte de San Francisco et des lieux ;
- des pages qui se tournent jour après jour ;
- un effet de miroir magique pour le camp adverse ;
- une interface « séance de spiritisme » ;
- un plateau à tiroirs entièrement escamotables autour d'un grand plan.

## 7. Ressources et fabrication

### Visuels

- **Visuels du jeu :** `logic-match\visuels\jeu\`
  - `leather-v2`, `parchment-v2`, `gold-corner-v2`, `arabesque-haut-alpha-v3`, `logo-dore-fourni`, `grenier`, `triquetra`, `headings-v3-alpha` ;
  - cartes : `carte-cle-formee`, `carte-verrou-forme`, `recto-*`, `livre-ouvert-vierge`.
- **Photos :** `logic-match\visuels\atelier\Assets\` (plus le manoir et la Prophétesse envoyés dans la conversation). Contenu :
  - personnages : Piper, Phoebe, Paige, Prue, Cole, Balthazar, Barbas, Tempus, la Triade, Wyatt ;
  - lieux et objets : le Livre des Ombres, le manoir, le grenier, la cuisine, le salon, la véranda, le symbole du Pouvoir des Trois.
- `Shax.png` semble montrer la Banshee, pas Shax. À vérifier avec Aurore.
- **Encore sans photo :** les cristaux, la formule d'appel, le sbire, la potion.
- **Pas de dessin des personnages connus de la série.** On utilise uniquement les photos fournies par Aurore.

### Méthode de la session précédente (espace de travail temporaire, à recréer si besoin)

1. Des pages HTML composées avec les ressources ci-dessus.
2. Un rendu en PNG par Playwright, avec Chromium situé dans `/opt/pw-browsers/chromium`. Taille : viewport 1536×860, facteur d'échelle 2, puis conversion en JPG qualité 90.
3. Polices : EB Garamond pour le texte, Cormorant Garamond pour les titres.
4. Titres des panneaux : les images enluminées découpées dans `headings-v3-alpha`.
5. Les flèches entre une carte et sa cible sont tracées en JavaScript à partir des attributs `data-to` et `id`.
6. Chaque image commence par une barre de légende de 60 px : étiquette, titre, une phrase d'explication.

## 8. Questions ouvertes à trancher avec Aurore

1. Quelle couleur pour une ressource engagée dans une **attaque** ? Les règles ne le disent pas. Pour l'instant, elle reste bleue.
2. Quelle couleur pour l'état **en route** ? Pour l'instant, gris.
3. L'en-tête du fichier consolidé dit encore « document de travail… ne remplace pas `REGLES_ACTEES.md` ». Lequel des deux est la référence ?
4. Faut-il mettre à jour la Partie 5 §1 si une disposition non conforme est retenue ?
