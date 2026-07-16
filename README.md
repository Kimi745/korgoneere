# Korgoneere

Site e-commerce pour la vente de sacs artisanaux (totebags, sacs perlés, sacs bandoulière) au Sénégal et au Burkina Faso.

**Stack technique — zéro coût :**
- Frontend : HTML / CSS / JS statique, sans framework, sans build
- Backend : Google Sheets (base de données) + Google Apps Script (API gratuite)
- Communication client : WhatsApp

Aucun serveur à payer, aucune base de données à héberger.

---

## Arborescence

```
korgoneere/
├── index.html        → Catalogue (grille des modèles de sacs)
├── produit.html       → Fiche produit (designs, description, prix)
├── commande.html       → Formulaire de commande (acompte, WhatsApp)
├── politique.html       → Politique boutique (acompte, livraison, retours)
├── style.css              → Styles partagés (mobile + desktop)
├── script.js               → Données produits + logique des 3 pages
└── images/                  → Photos réelles des produits (voir README.txt dedans)
```

## Parcours client

```
index.html (catalogue)
   │  clic sur un produit
   ▼
produit.html?code=B015 (fiche produit)
   │  choix du design + clic "Commander maintenant"
   ▼
commande.html?code=B015&design=d1 (formulaire)
   │  validation du formulaire
   ▼
Confirmation + redirection vers WhatsApp (acompte + livraison)
```

## Ajouter un nouveau produit ou design

Tout se passe dans `script.js`, objet `PRODUCTS` en haut du fichier. Exemple pour ajouter un design à B015 :

```js
{ id: "d7", label: "Nouveau motif", image: "images/b015-d7.jpg", grad: ["#COULEUR1", "#COULEUR2"] }
```

`grad` sert de couleur de secours tant que la vraie photo n'est pas encore ajoutée dans `/images`.

## Photos produits

Voir `images/README.txt` pour la convention de nommage exacte des fichiers (ex. `b015-d1.jpg`). Dès qu'un fichier existe avec le bon nom, il remplace automatiquement le bloc de couleur — aucune autre modification nécessaire.

## À configurer avant mise en ligne

Dans `script.js` :
- `WHATSAPP_NUMBER` — numéro WhatsApp Business réel (format international, sans le `+`)
- `PAYMENT_INFO` — vrais numéros Wave et Orange Money par pays
- `APPS_SCRIPT_URL` — URL du Google Apps Script une fois déployé (voir section suivante)

## Backend Google Sheets / Apps Script

Le dossier `google-apps-script/` (ou le fichier `Code.gs` fourni séparément) contient le script à coller dans l'éditeur Apps Script de la Google Sheet. Voir les instructions de déploiement fournies avec ce fichier.

## Politique de la boutique

Un acompte de 30% est obligatoire pour valider toute commande (limite les commandes non sérieuses / livraisons à vide). Détails complets sur `politique.html` — à ajuster selon tes conditions réelles.

## Hébergement gratuit

Le site est 100% statique : il peut être hébergé gratuitement sur **GitHub Pages**, Netlify ou Vercel, sans configuration serveur.

---

## Suivi du projet

Historique des évolutions et décisions du projet, dans l'ordre :
1. Structure du site (catalogue, fiche produit, commande) séparée en fichiers HTML/CSS/JS
2. Adaptation mobile + desktop
3. Système de designs par sac (grille cliquable façon catalogue fournisseur)
4. Acompte obligatoire Wave/Orange Money pour sécuriser les commandes
5. Bouton WhatsApp flottant + page politique boutique
6. Site hébergé gratuitement sur GitHub Pages
7. Connexion du formulaire à Google Sheets via Google Apps Script — fonctionnel
8. Feuille Google Sheets complète : COMMANDES, STOCKS (calcul auto), COMPTABILITÉ (dépenses/recettes/bénéfice, global + par produit), RETOURS & INCIDENTS
9. *(à faire)* Ajouter les vraies photos des produits dans /images
10. *(à faire)* Remplacer les numéros Wave/Orange Money et WhatsApp de test par les définitifs si besoin
11. *(à faire)* Partager l'onglet COMMANDES en lecture seule avec le·s livreur·s
