# Nuxt 3 Template Project

Une template de démarrage pour les projets Nuxt 3, préconfigurée avec TypeScript, Tailwind CSS, et SCSS.

## Technologies

- [Nuxt 3](https://nuxt.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SCSS](https://sass-lang.com/)
- [ESLint](https://eslint.org/)

## Structure du projet

```
.
├── assets/
│   ├── css/
│   │   ├── normalize.css
│   │   └── main.scss
├── components/
├── composables/
├── layouts/
├── pages/
├── public/
├── .eslintrc
├── .gitignore
├── nuxt.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn ou pnpm

## Installation

1. Cloner le repository :
```bash
git clone [url-du-repo]
cd [nom-du-projet]
```

2. Installer les dépendances :
```bash
# Avec npm
npm install

# Avec yarn
yarn install

# Avec pnpm
pnpm install
```

3. Lancer le serveur de développement :
```bash
# Avec npm
npm run dev

# Avec yarn
yarn dev

# Avec pnpm
pnpm dev
```

## Fonctionnalités

- ⚡️ Configuration Nuxt 3 avec TypeScript
- 🎨 Intégration Tailwind CSS avec configuration personnalisée
- 💅 Support SCSS pour des styles avancés
- 🧹 ESLint configuré pour un code propre et cohérent
- 📱 Structure de dossiers optimisée pour une scalabilité facile
- 🔧 normalize.css pour une base cohérente entre les navigateurs

## Scripts disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Aperçu de la version de production
npm run preview

# Linting
npm run lint

# Fix les erreurs de linting
npm run lint:fix
```

## Personnalisation

### Tailwind CSS

La configuration de Tailwind se trouve dans `tailwind.config.js`. Elle inclut :
- Des couleurs personnalisées
- Des breakpoints responsive
- Des utilitaires d'espacement
- Des ombres et rayons de bordure personnalisés

### SCSS

Les styles globaux sont gérés via SCSS dans `assets/css/main.scss`. Vous pouvez :
- Ajouter vos mixins et variables
- Définir des styles globaux
- Importer d'autres fichiers SCSS

### ESLint

La configuration ESLint est définie dans `.eslintrc` et peut être personnalisée selon vos besoins.

## Bonnes pratiques

- Organisez vos composants de manière modulaire
- Utilisez les composables pour la logique réutilisable
- Suivez les conventions de nommage TypeScript
- Utilisez les classes utilitaires Tailwind quand possible
- Réservez SCSS pour les styles complexes
