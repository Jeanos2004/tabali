# Workflow GitHub pour Tabali

Ce document décrit le workflow GitHub pour le développement collaboratif du projet Tabali.

## 1. Initialisation du dépôt GitHub

### Création du repo principal
- **Nom du repo**: `tabali`
- **URL**: https://github.com/Jeanos2004/tabali.git
- **Branche principale de développement**: `dev`
- **Description**: Plateforme de mise en relation entre clients et prestataires de services en Guinée
- **.gitignore**: Configuration pour Next.js/React (node_modules/, .env, .next/, etc.)
- **Licence**: MIT

### Clonage en local
```bash
git clone https://github.com/Jeanos2004/tabali.git
cd tabali
```

## 2. Structure des branches

### Branches principales
- **main**: Code stable déployé en production (protégée, merges via PR uniquement)
- **staging**: Environnement de pré-production (tests finaux avant merge vers main)
- **dev**: Intégration des features (branche de base pour les développeurs)

### Branches de travail (features/fixes)
Convention de nommage: `tabali-[type]-[nom]-[description]`

Exemples:
- `tabali-feat-jean-navbar` → Feature navbar par @jean
- `tabali-fix-ali-auth-bug` → Correctif auth par @ali
- `tabali-refac-joel-optimize-api-calls` → Refactoring par @joel

Types de branches:
- **feat-***: Nouvelle fonctionnalité
- **fix-***: Correction de bug
- **refac-***: Refactoring sans changement fonctionnel
- **docs-***: Documentation
- **test-***: Tests unitaires/E2E
- **style-***: Modifications de style/UI sans changement fonctionnel

## 3. Workflow de développement

### Créer une branche depuis dev
```bash
git checkout dev
git pull origin dev  # S'assurer d'être à jour
git checkout -b tabali-feat-votreNom-fonctionnalite
```

### Travailler sur la branche
- Commits atomiques avec messages clairs suivant la convention:
  - `feat(component): description` - Nouvelle fonctionnalité
  - `fix(component): description` - Correction de bug
  - `docs(component): description` - Documentation
  - `style(component): description` - Changements de style
  - `refactor(component): description` - Refactoring
  - `test(component): description` - Tests

- Pousser régulièrement sur le dépôt distant:
```bash
git push -u origin tabali-feat-votreNom-fonctionnalite
```

## 4. Revue & Merge (Pull Request)

### Ouvrir une PR
- Depuis votre branche vers `dev` (ou `staging` si prêt pour les tests)
- Description:
  - Résumé des changements
  - Screenshots/GIFs si UI/UX
  - Numéro d'issue/ticket (ex: "Closes #12")

### Processus de revue
- Au moins 1 approbation d'un collègue avant merge
- Résoudre les commentaires (nouveaux commits si besoin)
- Tests automatisés passants (CI)

### Après merge
- Supprimer la branche distante (option GitHub)
- Mettre à jour votre local:
```bash
git checkout dev
git pull origin dev
```

## 5. Bonnes pratiques

### Protection des branches
- Activer les règles sur `main` et `dev`:
  - Status checks obligatoires
  - Approbations requises (minimum 1)
  - Interdiction de push direct sur `main`

### Rebase vs Merge
- Préférer `git rebase` pour garder l'historique propre (avant PR)
- Utiliser `git merge --no-ff` pour les merges de PR (préserve le contexte)

### Outils complémentaires
- **Templates**: PR/ISSUE templates dans `.github/`
- **CI/CD**: GitHub Actions pour:
  - Linting (ESLint)
  - Tests (Jest)
  - Build de vérification
  - Déploiement automatique vers staging/production

### Project Board
- Kanban GitHub pour le suivi des tâches:
  - Backlog
  - À faire
  - En cours
  - Revue
  - Terminé

## 6. Déploiement

### Environnements
- **Development**: Déploiement automatique depuis la branche `dev`
- **Staging**: Déploiement automatique depuis la branche `staging`
- **Production**: Déploiement manuel ou automatique depuis `main` avec approbation

### Versioning
- Utilisation de tags sémantiques (SemVer) pour les releases:
  - `v1.0.0` - Version majeure
  - `v1.1.0` - Version mineure
  - `v1.1.1` - Patch

## 7. Structure du projet

```
tabali/
├── .github/                    # Configuration GitHub (workflows, templates)
├── public/                     # Assets statiques
├── src/
│   ├── app/                    # Routes Next.js
│   │   ├── (routes)/           # Routes principales
│   │   │   ├── dashboard/      # Dashboard utilisateur/admin
│   │   │   ├── profile/        # Profils prestataires
│   │   │   ├── search/         # Recherche de prestataires
│   │   │   └── ...
│   │   ├── api/                # Routes API
│   │   └── layout.tsx          # Layout principal
│   ├── components/             # Composants React
│   │   ├── layout/             # Composants de layout (Navbar, Footer)
│   │   └── ui/                 # Composants UI réutilisables
│   ├── lib/                    # Utilitaires et constantes
│   ├── styles/                 # Styles globaux et thèmes
│   └── types/                  # Types TypeScript
├── .eslintrc.js                # Configuration ESLint
├── .gitignore                  # Fichiers ignorés par Git
├── next.config.js              # Configuration Next.js
├── package.json                # Dépendances et scripts
├── postcss.config.js           # Configuration PostCSS
├── tailwind.config.js          # Configuration Tailwind CSS
└── tsconfig.json               # Configuration TypeScript
```

## 8. Exemple visuel de la structure des branches

```
main
└── staging
    └── dev
        ├── tabali-feat-jean-navbar
        ├── tabali-fix-ali-auth-bug
        └── tabali-refac-joel-optimize-api-calls
```

Ce modèle assure une traçabilité, une collaboration fluide et une maintenabilité du code tout au long du développement du projet Tabali.
