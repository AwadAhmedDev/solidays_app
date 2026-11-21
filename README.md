# Solidays App — clone du site du festival (projet de formation en équipe)

Application web full stack réalisée en **équipe de 3 développeurs** pendant la formation Développeur web et web mobile chez **Simplon.co**. Le sujet, donné par les formateurs : **reproduire le site [solidays.org](https://www.solidays.org)** du festival Solidays, avec programmation, fiches artistes, billetterie et back-office.

> Projet pédagogique : reproduction non officielle, sans lien avec le festival Solidays ni avec l'association Solidarité Sida. Les marques, visuels et textes repris appartiennent à leurs auteurs. Le site affiche un bandeau « projet de formation » et n'est pas indexé par les moteurs de recherche.

## Fonctionnalités

- **Accueil** fidèle au site d'origine :
  - hero ;
  - manifeste « Yes We Love » ;
  - bannière d'artistes interactive (la photo change au survol) ;
  - choix des pass, « À la une » et rubriques du festival.
- **Programmation** : artistes chargés depuis l'API, filtrés par jour (vendredi, samedi, dimanche).
- **Fiches artistes** : description, jour du concert, lien YouTube.
- **Billetterie** (liens vers les vendeurs officiels) et page **Festival**.
- **Back-office sécurisé** :
  - connexion administrateur ;
  - ajout, modification et suppression d'artistes, avec upload d'image et aperçu ;
  - confirmation avant suppression.
- **Mentions légales**, page 404, version mobile complète.

## Stack technique

| Couche | Technologies |
|---|---|
| Front-end | React 19, TypeScript, Vite 7, React Router 7, CSS Modules, React Hook Form, Zod |
| Back-end | Node.js, Express 5, TypeScript (tsx) |
| Base de données | MySQL (tables `role`, `user`, `artist`) |
| Sécurité | Session admin par cookie httpOnly signé, mots de passe argon2id, Helmet (CSP), validation serveur Zod, limite de tentatives de connexion |
| Fichiers | Upload Multer (5 Mo max), vérification du type réel avec `file-type` (JPG, PNG, WebP, AVIF) |
| Qualité | ESLint, TypeScript strict, Biome |
| Environnement | Docker Compose (MySQL 8.4 + Node 22) |

## Architecture

```
code/
├── server/
│   ├── core/          # configuration Express (sécurité, compression, service du site en production)
│   ├── router/        # routes REST (/api/artist, /api/auth)
│   ├── controller/    # traitement des requêtes
│   ├── repository/    # accès aux données MySQL
│   ├── service/       # pool MySQL, fichiers, sessions
│   └── validator/     # validation des données reçues
├── src/
│   ├── pages/         # accueil, programmation, artiste, billetterie, festival, admin
│   ├── components/    # navbar, hero, bannières, onglets de programmation, footer…
│   ├── services/      # appels à l'API
│   └── validators/    # validation des formulaires
├── merise/            # MCD, MLD, MPD
└── mysql/             # scripts de création et de données de démonstration
```

### Modélisation des données (Merise)

| MCD | MLD | MPD |
|---|---|---|
| ![MCD](code/merise/MCD.drawio.svg) | ![MLD](code/merise/MLD.drawio.svg) | ![MPD](code/merise/MPD.drawio.svg) |

## Travail en équipe

- Développement à trois sur un même dépôt, avec **branches et pull requests** (plus de 50 fusions).
- Répartition des pages et composants entre les membres.

## Lancer le projet en local

Prérequis : Docker et Docker Compose.

```bash
# 0. Créer le fichier d'environnement à partir du modèle
#    (remplir SESSION_SECRET : node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
cp code/.env.development.example code/.env.development

# 1. Démarrer MySQL et le conteneur Node
docker compose -f docker-compose.dev.yaml up -d

# 2. Créer la base et insérer les données
docker compose -f docker-compose.dev.yaml exec mysql sh -c "mysql -uroot -proot < solidays.dev.sql && mysql -uroot -proot < fichiers.dev.sql"

# 3. Lancer l'API
docker compose -f docker-compose.dev.yaml exec node sh -c "npm install && npm run server"

# 4. Dans un autre terminal, lancer le front (Vite relaie /api vers Express)
docker compose -f docker-compose.dev.yaml exec node sh -c "npm run dev -- --host"
```

Le mot de passe du compte admin de démonstration (`admin@admin.fr`) n'est pas dans le dépôt. Pour en créer un, générez un hash argon2id et mettez à jour la table `user`.

## Production

```bash
cd code
npm ci
npm run build            # construit le site dans dist/
NODE_ENV=production npm start   # Express sert le site et l'API sur le même port
```

Variables à définir chez l'hébergeur : voir `code/.env.production.example`.

## Auteur

**Awad Ahmed** — Développeur Full Stack · [LinkedIn](https://www.linkedin.com/in/awad-dev) · [GitHub](https://github.com/AwadRoubahAhmed)
Projet réalisé avec deux camarades de promotion.
