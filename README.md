# Charmed The Game — copie de travail du project manager

Cette copie applique l’architecture préparée le 10 septembre 2026. Le projet actif n’est pas modifié par cette réorganisation.

## Points d’entrée

- Règles actées : `regles/REGLES_ACTEES.md`
- Historique des décisions : `regles/historique/DECISIONS_ACTEES.md`
- Bibliothèque éditoriale : `bibliotheque/`
- Scénarios : `scenarios/`
- Serveur et écrans : `technique/serveur/` et `technique/ecrans/`
- Scripts et tests : `technique/scripts/`
- Données historiques encore lues par le moteur : `technique/donnees-bibliotheque/`
- Visuels utilisés par le jeu : `visuels/jeu/`
- Ateliers et maquettes : `visuels/atelier/`
- Parties et états : `etat/`

## Bibliothèque

La nouvelle bibliothèque comporte huit catégories fixes. Sa structure est prête, mais aucune nouvelle fiche experte n’est activée tant qu’Aurore n’a pas validé son intégration. Le moteur continue donc temporairement à lire les données compatibles conservées dans `technique/donnees-bibliotheque/`.

## Lancer les scénarios depuis cette copie

```powershell
node technique/scripts/jouer-manoir-assiege.cjs
node technique/scripts/jouer-manoir-souple.cjs
```

Le scénario par défaut se lance avec :

```powershell
node technique/serveur/serveur.js
```

## Vérifications

```powershell
node --test technique/serveur/charmed/*.test.js
python -m pytest technique/scripts/tests -q
```

Les procédures de sauvegarde, de migration et de retour arrière restent dans la documentation technique de l’équipe. Les parties du dossier `etat/` doivent toujours être sauvegardées et comparées avant une intégration.
