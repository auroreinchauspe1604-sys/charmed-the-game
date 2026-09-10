# Validation — 8 septembre 2026

## Moteur

**44 tests Node réussis**, aucun échec. Ils couvrent notamment :

- budget serveur, refus gratuits et droits identiques aux deux camps ;
- une seule pièce éventuellement suffisante en voie principale, plusieurs contributions par sous-état ;
- nombre annoncé sans identité imposée, ressources nouvelles pertinentes et stabilité du nombre ;
- effets immédiats et différés ;
- engagement exclusif, rétention des sous-états, récupération variable, consommation et identité unique ;
- portée des verrous, maintien par un gardien ou effet durable sans auteur, absence de gel rétroactif ;
- question et réponse uniques, propagation des suspensions, retrait sans correction ;
- révélation différée des attaques, date fixe, échec obligatoire si incomplet, avantage défenseur obligatoire ;
- exception préservant un passage de réponse sans ajouter des moyens après l'échéance ;
- deux exemplaires automatiques du programme au matin J3 ;
- états prouvés, branches optionnelles, maintien rompu, menace encore réalisable et absence de victoire prématurée ;
- transaction atomique, révision, verrou d'écriture, rejeu et panne IA sans consommation de coup ;
- refus de références canoniques tardives/non vérifiées et d'une ressource utilisée sans engagement.

**Application historique : 113 tests Python exécutés, succès avec un test ignoré.**

## Intégration avec l'IA réelle

`node scripts/verify_charmed_live.js` : proposition de sous-état acceptée, vrai coup adverse accepté, Radio Halliwell puis retour au jour 2, relecture du journal après quatre transactions. Le test utilise une sauvegarde temporaire, pas la partie d'Aurore.

`node scripts/verify_charmed_key_live.js` : position de test avec accord d'Élise explicitement établi, puis véritables jugements de proposition, pose et résolution.

1. Élise posée : **2 ressources supplémentaires nécessaires**.
2. Phoebe ajoutée : **1 ressource encore nécessaire**, clé en préparation.
3. Invitation ajoutée : **0 ressource manquante**, clé réalisée.
4. Fait obtenu : Phoebe a lu l'invitation et reçu les explications d'Élise ; le sous-état est vrai, la racine reste fausse.

Une première exécution avait révélé l'usage implicite de l'invitation sans engagement de sa carte. La consigne de suffisance a été corrigée et un contrôle des ressources réellement utilisées a été ajouté. Le second essai a vérifié les trois engagements séparés.

Contrôle canonique avec l'IA réelle : la proposition donnant une télékinésie personnelle à Phoebe en saison 1 a été refusée gratuitement, avec attribution du pouvoir signalée comme incorrecte.

Ces tests réels valident des parcours précis ; ils ne démontrent pas toutes les décisions possibles d'un arbitre narratif.

## Application ouverte

API vérifiée : version 3, règles `charmed-actees-2026-09-08`, jour 1, passage joueur. Ancienne sauvegarde v2 au jour 2 conservée. Nouveau journal séparé, sans reprise silencieuse des anciennes règles.

Navigateur vérifié : deux onglets rechargés, jour 1, coup disponible, états initiaux faux face à face, trois emplacements joueur et deux adversaires, ouverture/fermeture de la proposition de sous-état. Aucune erreur JavaScript relevée pendant ce contrôle. Aucun coup joué sur la partie destinée au test humain.

## Travail restant explicitement distinct

- Premier retour de jeu humain et correction des arbitrages éventuellement contestés.
- Refonte artistique et présentation du plateau Charmed, après cet essai.
- Menu proposant trois nouveaux thèmes et génération complète de leur gameplay : le thème déjà choisi est utilisé pour cet essai.
- Enrichissement de la base canonique vers toute la série. La base actuelle est partielle et cette limite est documentée ; le système ne prétend pas posséder une connaissance parfaite des huit saisons.

## Bilan actualisé après validation de la première session

Le 8 septembre 2026 : 45 tests Node exécutés de nouveau, tous réussis. L’interface Grimoire a été intégrée puis validée par Aurore. Les mentions jour 1 et visuel provisoire ci-dessus décrivent les contrôles antérieurs, pas l’état actuel. Les parcours IA réels ci-dessus n’ont pas été relancés pendant ce bilan ; ils restent des validations ciblées antérieures. La génération autonome de nouvelles parties et la couverture canonique complète restent à réaliser.
