# Mon Budget 
Application de gestion de budget personnel développée en Vanilla TypeScript et SCSS avec Vite.

## Fonctionnalités
* **CRUD complet** : Ajout, affichage et suppression de transactions (revenus/dépenses).
* **Formulaire dynamique** : Adaptation intelligente du champ catégorie selon le type de transaction (désactivé/vidé pour les revenus, actif pour les dépenses).
* **Calculs en temps réel** : Mise à jour automatique du solde, des revenus et des dépenses.
* **Filtrage et tri** : Filtrage multicritère (type/catégorie) et tri dynamique (date, montant, titre) via un module dédié.
* **Persistance des données** : Sauvegarde et chargement automatique via le `localStorage` (clean slate au premier lancement, sans données de test hardcodées).

## Technologies
* TypeScript (Mode strict)
* SCSS / Sass
* Vite

## Architecture du projet
```text
src/
├── main.ts         # Point d'entrée, gestion des formulaires et des actions CRUD
├── dom.ts          # Rendu du DOM et calculs des totaux
├── stockage.ts     # Gestion de la persistance (localStorage)
├── filtres.ts      # Logique modulaire de filtrage et de tri
├── types.ts        # Définitions des interfaces TypeScript
└── scss/           # Styles SCSS
```

## Installation et lancement

1. Cloner le projet :
```bash
git clone https://github.com/BrunoMBG/gestion-budget-ts.git
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer le serveur de développement :
```bash
npm run dev
```

4. Compiler le projet pour la production :
```bash
npm run build
```