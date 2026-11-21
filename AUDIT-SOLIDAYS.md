# Audit complet – solidays_app

**Date :** 21 novembre 2026.
**Dépôt :** `AwadAhmedDev/solidays_app` (privé, branche `master`, 127 commits).
**Projet :** site de festival réalisé en équipe de 3 chez Simplon.
- Front : React 19, Vite 7, React Router 7, CSS Modules.
- Back : Express 5, MySQL.

**Méthode :**
- lecture de tout le code ;
- build, ESLint et `npm audit` ;
- site lancé en local (sans base de données ni API : Docker n'est pas installé sur ce PC) ;
- captures d'écran sur ordinateur et mobile ;
- Lighthouse sur l'accueil.

**Légende :** 🔴 bloquant · 🟠 important · 🟢 amélioration

## Résumé

C'est un **bon projet de formation** :
- architecture en couches (router → controller → repository) ;
- requêtes SQL paramétrées ;
- vérification du vrai type des images envoyées ;
- modélisation Merise ;
- travail en équipe avec plus de 50 pull requests.

Mais **il n'est pas présentable en l'état comme projet de portfolio en ligne** :

| Domaine | Note | En bref |
|---|---|---|
| Marque et droits | 🔴 | Nom, logos, visuels et mentions légales du vrai festival Solidays |
| Sécurité | 🔴 | Back-office et API d'écriture **sans aucune connexion** |
| Build | 🔴 | `npm run build` échoue (7 erreurs TypeScript) |
| Mise en ligne | 🔴 | Rien n'est prévu pour la production (ni déploiement, ni service du front par l'API) |
| Fiabilité | 🟠 | Une seule connexion MySQL partagée, aucun état de chargement ou d'erreur |
| Design et UX | 🟠 | Incohérent, liens morts, textes en anglais, page vide sans API |
| Accessibilité | 🟠 | 94 : contrastes, images sans dimensions, pas de `<main>` |
| SEO | 🟠 | 83 : langue « en », pas de description, pas de robots.txt ni sitemap |
| Performance | 🔴 | 16,6 Mo par page d'accueil, images non optimisées (28 Mo dans `public/`) |
| Dépendances | 🔴 | 60 failles `npm audit`, dont 2 critiques et 23 élevées |

## 1. 🔴 Marque, droits et contenu copiés

C'est **le point à trancher avant toute rénovation du design**, car il en dépend.

- **Le nom « Solidays » et les logos** (Solidays, Solidarité Sida) appartiennent à l'association Solidarité Sida. Ce sont des marques déposées.
- **Les visuels sont repris du vrai site :** « Yes We Love », les visuels des pass, les photos du festival, les photos d'artistes et l'image du fondateur. Ils sont protégés par le droit d'auteur, et les photos de personnes par le droit à l'image.
- **Les mentions légales sont celles du vrai site.** Elles nomment de vraies personnes :
  - le directeur de la publication ;
  - l'équipe communication ;
  - l'agence web.

  Elles ne parlent pas de toi. Publiées sous ton nom, elles seraient **fausses**, car elles feraient croire que Solidarité Sida édite ce site.
- **Contenus datés et réels :** annonces « 11.12 », « 19.11 », « Pour Noël », prix des pass. Un visiteur peut croire à une vraie billetterie.

Le README précise bien « sans lien officiel », mais le site lui-même ne le dit nulle part.

**Recommandation : transformer le projet en festival fictif**, avec :
- un nom à toi ;
- un logo créé pour l'occasion ;
- des images libres de droits ou générées ;
- de faux artistes, ou des artistes sans photo officielle.

**Ce que cela apporte :**
- le site peut être mis en ligne sans risque ;
- **le design devient le tien**, ce qui vaut beaucoup plus en portfolio qu'une copie ;
- le code, l'architecture et le back-office restent identiques.

Autre option : garder Solidays, mais **seulement en local ou en privé**, comme exercice de reproduction d'interface, sans mise en ligne publique.

## 2. 🔴 Sécurité

| Problème | Détail | Risque |
|---|---|---|
| **Aucune authentification** | `/admin` est accessible à tous et lien « Admin » dans le menu public. Les routes `POST`, `PUT` et `DELETE` de `/api/artist` sont ouvertes. La table `user` et le rôle existent, mais ne sont jamais utilisés. | N'importe qui peut ajouter, modifier ou supprimer des artistes et envoyer des fichiers sur le serveur |
| **Upload sans limites** | `multer.any()` sans limite de taille, de nombre ou de type. Un fichier non reconnu est enregistré en `xxx.undefined`. | Remplissage du disque, fichiers arbitraires dans `public/` |
| **Fichiers orphelins** | L'ancienne image n'est jamais supprimée lors d'une modification ou d'une suppression. Si l'insertion SQL échoue, l'image reste quand même. | Accumulation de fichiers |
| **Pas de validation côté serveur** | `req.body` est inséré directement. Le validateur côté front existe mais il est vide. | Données incohérentes ; une URL YouTube non contrôlée est affichée sur le site |
| **Mot de passe admin de démo** | Hash argon2 aux paramètres très faibles (`m=16,t=2`) dans le script SQL. Les identifiants MySQL sont `root` / `root`. | À remplacer avant toute mise en ligne |
| **En-têtes HTTP** | Pas de `helmet`, pas de limite de requêtes, aucun en-tête de sécurité. | — |

✅ Ce qui est bien fait :
- requêtes SQL **paramétrées**, donc pas d'injection SQL ;
- vérification du **vrai type** de fichier avec `file-type` ;
- CORS limité aux origines configurées ;
- messages d'erreur masqués en production ;
- fichiers `.env` exclus de Git.

## 3. 🔴 Build, code et fiabilité

**Le build de production échoue.** `npm run build` (`tsc -b`) renvoie 7 erreurs :
- variables inutilisées ;
- un fichier `admin_artist_form_content copy.tsx` oublié ;
- `import React` inutilisés.

ESLint renvoie 7 erreurs, dont un `setState` appelé dans un `useEffect`.

**Connexion MySQL** (`mysql_service.ts`) :
- `getConnection()` est appelé **une seule fois** pour toute l'application, et la connexion n'est jamais rendue au pool. Toutes les requêtes passent donc par la même connexion, ce qui empêche les requêtes simultanées.
- `beginTransaction()`, `commit()` et `rollback()` ne sont **pas attendus** (pas de `await`), et deux requêtes simultanées partagent la même transaction.
- Si MySQL redémarre, l'API reste cassée jusqu'au redémarrage du serveur.

**Erreurs non gérées :**
- `insert` plante si aucune image n'est envoyée ;
- côté front, aucun `fetch` ne gère les erreurs. Sans API, la console affiche « Unexpected token '<' » et la page Programmation reste **vide**, sans message.

**Code mort ou en double :**
- deux services API, dont `api_artist_service.ts`, qui appelle **`/api/product`**, une route qui n'existe pas ;
- deux dossiers admin (`pages/admin/artist` et `pages/admin/admin_artist`) ;
- une copie de composant ;
- une boucle vide dans `SelectAll` ;
- `react.svg` et `vite.svg` dans `public/`.

**HTML invalide :** la page Billetterie insère une balise `<body>` dans la page (React le signale en erreur).

**Liens cassés :**
- le pied de page pointe vers `/pages/mention_legale`, une route qui n'existe pas ;
- 12 liens renvoient simplement vers `/` (Concert, Talk, Don, Contact, réseaux sociaux…) ;
- le formulaire newsletter recharge la page sans rien faire.

**Pas de route 404 :** une adresse inconnue affiche une page vide.

**Images en chemins relatifs** (`../../../assets/img/...`). Elles fonctionnent sur l'accueil, mais pas sur les pages à plusieurs niveaux. L'une contient même un retour à la ligne dans son `src`.

**Dépendances mal rangées :**
- `npm` et `i` sont installés comme dépendances par erreur ;
- `tsx` et les `@types/*` sont dans `dependencies` au lieu de `devDependencies`.

**Fichiers `.DS_Store` versionnés :** 6 fichiers macOS dans le dépôt.

## 4. 🔴 Mise en ligne

Rien n'est prévu pour la production :
- pas de script `start` ;
- le front n'est pas servi par Express ;
- `VITE_API_URL` pointe vers `127.0.0.1` ;
- les images envoyées sont stockées dans `public/`, que Vite ne sert qu'en développement ;
- pas de fichier `.env.production.example`.

L'environnement Docker utilise `node:25` et `mysql:9.5`, des versions non LTS : mieux vaut Node 22 LTS et MySQL 8.4 LTS.

## 5. 🟠 Design et expérience utilisateur

Constats faits sur les captures, ordinateur et mobile :

- **Pas d'identité cohérente :**
  - bleu électrique (hero), bleu nuit (manifeste), violet (pass), rose (pied de page), sans logique d'ensemble ;
  - la police « Source Sans Pro » est demandée mais **jamais chargée** : c'est la police système qui s'affiche.
- **Hero :**
  - « POUR NOEL » sans accent ;
  - bouton « Get Started » en anglais ;
  - texte « SOLIDAYS Solidays c'est le festival. » répété ;
  - grande image de 1,7 Mo.
- **Menu :**
  - l'icône hamburger s'affiche aussi sur ordinateur, à côté des liens ;
  - « Admin » est visible par tous ;
  - le menu ne reste pas en haut de l'écran au défilement sur mobile.
- **Textes en anglais :** « Get Started », « & MANY MORE ».
- **Pied de page :** il est très haut (520 px) et répète les réseaux sociaux deux fois, d'abord en abrégé (IG, TT, YT, FB) puis en icônes.
- **Contrastes faibles :** jaune ou bleu sur violet, texte bleu sur bleu nuit.
- **Pages qui dépendent de l'API** (Programmation, fiche artiste, admin) : rien n'est prévu pour le chargement ou l'erreur. La page est vide en cas de problème.
- **Mobile :**
  - la mise en page tient, mais les titres géants (« YES WE LOVE », le manifeste) occupent plusieurs écrans ;
  - le texte est centré sur de longues lignes.
- **Back-office :** un titre et un bouton gris « Ajouter », avec un style par défaut, sans tableau ni retour visuel.

## 6. 🟠 Accessibilité, SEO et performance

Lighthouse sur l'accueil, en mode développement. La performance réelle sera un peu meilleure une fois le site construit, mais le poids des images reste le même.

| Catégorie | Note |
|---|---|
| Performance | 39 |
| Accessibilité | 94 |
| Bonnes pratiques | 88 |
| SEO | 83 |

**Accessibilité :**
- 4 contrastes insuffisants ;
- 8 images sans dimensions (la mise en page saute au chargement) ;
- 4 textes de lien qui ne correspondent pas à leur nom accessible ;
- pas de zone `<main>` ;
- textes alternatifs en double ou vides (« Logo » ×3, « concert image » ×2, `alt=""` sur la photo d'Orelsan).

**SEO :**
- `lang="en"` sur un site français ;
- un seul titre « Solidays » pour toutes les pages ;
- aucune `meta description` ni image de partage ;
- favicon Vite par défaut ;
- pas de `robots.txt` ni de `sitemap.xml` ;
- site rendu côté navigateur uniquement.

**Performance :**
- **16,6 Mo** téléchargés pour l'accueil ;
- 28 Mo d'images dans `public/`, dont des PNG de 1,7 à 2,4 Mo (`heroSection.png`, `footerSolidays.png`, `weekend.png`) ;
- environ 5,3 Mo d'économies possibles en WebP ou AVIF aux bonnes dimensions ;
- un fichier JavaScript de 548 Ko.

## 7. 🔴 Dépendances

`npm audit` : **60 failles** (2 critiques, 23 élevées, 33 modérées, 2 faibles).
- Les deux critiques, `proxy-addr` et `tar`, viennent d'Express et du paquet `npm` installé par erreur.
- Paquets directs concernés : `multer`, `mysql2`, `react-router`, `vite`, `npm`.

La plupart se corrigent avec `npm audit fix` et en retirant `npm` et `i`.

## 8. Ce qui est réutilisable tel quel

- La structure du back (router, controller, repository, service) et les modèles TypeScript partagés.
- Le schéma SQL et la modélisation Merise.
- Le principe de vérification des fichiers envoyés.
- La découpe en composants et en CSS Modules.

## 9. Plan de rénovation proposé

| Étape | Contenu | Priorité |
|---|---|---|
| **0. Décision de marque** | Festival fictif (recommandé), ou Solidays gardé en privé | 🔴 à trancher d'abord |
| 1. Remise à niveau technique | Build qui passe, `npm audit fix`, nettoyage des doublons et des dépendances, pool MySQL correct, gestion des erreurs, Node 22 LTS | 🔴 |
| 2. Sécurité | Connexion admin (table `user` + argon2 + session ou JWT en cookie httpOnly), routes protégées, limites d'upload, validation serveur, `helmet`, limite de requêtes | 🔴 |
| 3. Design system | Charte (couleurs, typographie chargée, espacements), composants communs (boutons, cartes, titres), menu adaptatif, pied de page simplifié | 🟠 |
| 4. Pages | Accueil, programmation (filtres par jour, fiches), billetterie (pass clairs, sans faux paiement), page festival, 404, états de chargement et d'erreur | 🟠 |
| 5. Back-office | Liste en tableau, formulaire validé, aperçu d'image, confirmation de suppression, messages de succès et d'erreur | 🟠 |
| 6. Contenu et SEO | Textes en français, mentions légales **à ton nom** (projet pédagogique), titres par page, description, favicon, image de partage, robots.txt et sitemap | 🟠 |
| 7. Performance et accessibilité | Images WebP/AVIF redimensionnées, chargement différé, dimensions fixées, contrastes, `<main>`, textes alternatifs | 🟠 |
| 8. Mise en ligne | Express sert le build du front et l'API, variables de production, MySQL Hostinger, déploiement automatique depuis GitHub (comme Ematériel) | 🟢 |

**Non vérifié :** l'API et la base de données n'ont pas pu être lancées, faute de Docker sur ce PC. Le back-office, les fiches artistes et la programmation n'ont donc été examinés que dans le code, pas en fonctionnement.

## 10. Rénovation du 21 novembre 2026 (branche `renovation`)

**Décision :** le projet reste un **clone fidèle de solidays.org**, comme demandé par la formation. Pour pouvoir le présenter en ligne, on ajoute :
- un **bandeau « projet de formation »** visible sur toutes les pages ;
- des **mentions légales véridiques** au nom d'Awad (et non plus celles du vrai site) ;
- **`noindex`**, pour que le site n'apparaisse pas sur Google.

L'architecture de l'équipe est conservée : router, controller, repository, service, CSS Modules.

| Point de l'audit | Fait |
|---|---|
| Build cassé | ✅ `npm run build` et ESLint passent (0 erreur) |
| Back-office ouvert à tous | ✅ Connexion admin (table `user`, argon2id, cookie httpOnly signé, 10 essais / 15 min), routes d'écriture protégées, page de connexion, garde côté front, déconnexion |
| Upload sans limite | ✅ 5 Mo, une seule image, type réel vérifié (JPG/PNG/WebP/AVIF), fichiers refusés supprimés, ancienne image supprimée |
| Pas de validation serveur | ✅ Zod côté serveur (mêmes règles que le formulaire), messages en français |
| Connexion MySQL partagée | ✅ Pool de connexions, transactions inutiles retirées, `MYSQL_PORT` |
| Base en latin1 | ✅ Le script crée la base en `utf8mb4` (accents et emojis) |
| Erreurs non gérées | ✅ Toutes les pages ont un état chargement, erreur ou introuvable ; 404 de l'API et du site |
| Code mort et doublons | ✅ 15 fichiers inutilisés et le service `/api/product` supprimés, `npm` et `i` retirés, `zod` déclaré |
| 60 failles npm | ✅ 0 faille |
| Design incohérent | ✅ Charte de solidays.org (Lato, Unbounded, Plus Jakarta Sans, violet, bleu nuit, vert citron, magenta), polices hébergées avec le site, toutes les pages refaites |
| Navigation | ✅ Menu collant, burger seulement sur mobile (fermeture automatique, touche Échap), lien Admin retiré du menu public |
| Liens morts, newsletter | ✅ Pied de page simplifié, tous les liens fonctionnent, crédits de l'équipe |
| Images (28 Mo) | ✅ WebP redimensionnées : 17,3 Mo → 1,2 Mo ; 11 doublons et 12 images inutilisées supprimés ; dimensions indiquées |
| Accessibilité 94 | ✅ 100 sur toutes les pages testées (contrastes, `<main>`, textes alternatifs, focus visible) |
| SEO | ✅ `lang="fr"`, titre et description par page, favicon. `noindex` volontaire pour ce clone |
| Mise en ligne impossible | ✅ Express sert le site et l'API en production, compression gzip, cache, en-têtes de sécurité, `npm start`, `.env.production.example` |
| Docker non LTS | ✅ Node 22 et MySQL 8.4 |

**Lighthouse** (version de production, sur ce PC) — Performance / Accessibilité / Bonnes pratiques / SEO :
- ordinateur : accueil **99 / 100 / 100 / 66**, programmation **99 / 100 / 100 / 66** ;
- mobile : accueil 74 à 84, programmation 90, fiche artiste 92, festival 91. Accessibilité et bonnes pratiques à 100 partout.

SEO = 66 uniquement à cause du `noindex` voulu.

**Testé :**
- API : lecture, refus sans connexion, connexion, validation, fausse image, ajout, modification avec accents, suppression ;
- parcours complet du back-office dans le navigateur ;
- 7 pages sur mobile, sans débordement ;
- menu mobile ;
- mode production (pages, 404, en-têtes, compression).

## 11. Mise en ligne (21 novembre 2026)

**Démo :** https://tasteful-lightcoral-yak-94.hostingersite.com (adresse temporaire Hostinger, offre Business u707298094).

**Configuration :**
- Node 22, type express, dossier `code`, point d'entrée `app.js`, script `build` ;
- base MySQL `u707298094_solidays`, créée par Hostinger ;
- **déploiement automatique** à chaque push sur `master` (environ 25 s) ;
- variables : `NODE_ENV`, `DB_AUTO_INIT`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `SESSION_SECRET`, `PUBLIC_DIR`, `ORIGINS` et `DB_*`. Les valeurs sont dans `code/.env.hostinger`, fichier local ignoré par Git.

**Vérifié en ligne :**
- 8 pages en 200, vraie 404 (site et API) ;
- les 11 artistes chargés depuis MySQL ;
- écriture refusée sans connexion (401), connexion admin OK (cookie httpOnly + Secure) ;
- compression Brotli, en-têtes de sécurité ;
- aucune erreur dans la console.

**Lighthouse en ligne** (Performance / Accessibilité / Bonnes pratiques / SEO) :

| Page | Mobile | Ordinateur |
|---|---|---|
| Accueil | 97 / 100 / 100 / 66 | 100 / 100 / 100 / 66 |
| Programmation | 90 / 100 / 100 / 66 | 100 / 100 / 100 / 66 |

SEO = 66 à cause du `noindex` volontaire.

**À savoir :** les images envoyées depuis l'admin sont stockées sur le serveur (`storage/`). Comme pour Ematériel, elles peuvent être perdues lors d'un redéploiement. Les artistes d'origine, eux, font partie du site et ne disparaissent pas.
