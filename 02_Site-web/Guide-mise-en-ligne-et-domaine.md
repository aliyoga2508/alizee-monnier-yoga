# Guide — Mettre Aliyoga en ligne sur aliyoga.fr

> Objectif : ton beau site vitrine en page d'accueil + ton calendrier en page réservation,
> le tout accessible sur **https://aliyoga.fr** (URL pro), en gardant l'hébergement **GitHub Pages gratuit**.

Statut vérifié : `aliyoga.fr` est **disponible** ✅ · `aliyoga.com` est déjà pris.

---

## Vue d'ensemble (3 étapes)

```
ÉTAPE A — Mettre la vitrine en ligne dans ton dépôt GitHub
ÉTAPE B — Réserver le domaine aliyoga.fr (~10€/an)
ÉTAPE C — Brancher aliyoga.fr sur GitHub + activer le HTTPS
```

---

## ÉTAPE A — Publier la vitrine (15 min, dans le navigateur)

Ton dépôt `alizee-monnier-yoga` contient aujourd'hui **un seul `index.html`** = ton calendrier.
On va : (1) renommer le calendrier en `reservation.html`, (2) ajouter la vitrine comme nouvel `index.html`.

### A.1 — Renommer le calendrier
1. Va sur **github.com/aliyoga2508/alizee-monnier-yoga**
2. Clique sur le fichier **`index.html`**
3. Clique sur l'icône **crayon** (✏️ « Edit this file »)
4. Tout en haut, dans le **champ du nom de fichier**, remplace `index.html` par **`reservation.html`**
5. Bouton vert **« Commit changes »** → confirme
   ✅ Ton calendrier est maintenant à `…/reservation.html`

### A.2 — Ajouter la vitrine
1. Sur la page d'accueil du dépôt → bouton **« Add file » → « Upload files »**
2. Depuis ton ordinateur, ouvre le dossier
   `d:\DevProjects\ALI YOGA\Website\site-vitrine\`
3. **Glisse-dépose ces 3 fichiers** dans la fenêtre GitHub :
   - `index.html`  ← (la vitrine — devient ta nouvelle page d'accueil)
   - `logo-bordeaux.png`
   - `logo-vert.png`
4. Bouton vert **« Commit changes »**

### A.3 — Vérifier
- Attends 1-2 min, puis ouvre **https://aliyoga2508.github.io/alizee-monnier-yoga/**
- Tu dois voir **la vitrine**. Le bouton « Réserver une séance » doit ouvrir **le calendrier** (reservation.html).
- 👉 Ton **QR code des flyers** pointe sur cette adresse : il affichera donc maintenant la vitrine. 🎉

> ⚠️ Si ton calendrier affichait un logo, vérifie qu'il s'affiche toujours. S'il manque, dis-le moi, on réuploadera le fichier logo dans le dépôt.

---

## ÉTAPE B — Réserver le domaine aliyoga.fr (10 min)

### Où l'acheter ? (les moins chers et fiables pour un .fr)
| Registrar | Prix .fr indicatif | Note |
|---|---|---|
| **OVHcloud** | ~7-9 €/an | Français, le plus courant, simple |
| **Infomaniak** | ~9 €/an | Suisse, écolo, très bon support FR |
| **IONOS** | ~1 € la 1re année puis ~15€ | Pas cher au début |
| Gandi | ~16 €/an | Bien mais devenu plus cher |

👉 **Recommandé : OVHcloud ou Infomaniak.** Évite les options « premium/privacy » payantes en plus (pour un .fr, les coordonnées des particuliers sont déjà masquées par défaut).

### Étapes
1. Va sur le site du registrar (ex. **ovhcloud.com** → « Noms de domaine »)
2. Recherche **`aliyoga.fr`** → ajoute au panier
3. Décoche les options superflues (hébergement web, emails payants, etc. — **tu n'en as pas besoin**, GitHub héberge gratuitement)
4. Paie. Tu reçois un accès à l'**espace client** avec la **zone DNS** (on en a besoin à l'étape C)

> 💡 Tu peux prendre une **adresse email pro** plus tard (ex. `contact@aliyoga.fr`) — optionnel, on verra si tu veux.

---

## ÉTAPE C — Brancher aliyoga.fr sur GitHub (20 min + attente)

### C.1 — Côté GitHub
1. Dépôt → **Settings** → menu **Pages**
2. Section **« Custom domain »** → tape **`aliyoga.fr`** → **Save**
   (GitHub crée automatiquement un fichier `CNAME` dans ton dépôt — c'est normal)

### C.2 — Côté registrar (zone DNS)
Dans l'espace client de ton registrar → **Zone DNS**, ajoute ces enregistrements :

**4 enregistrements de type A** (pour `aliyoga.fr`) :
```
Type A   →   185.199.108.153
Type A   →   185.199.109.153
Type A   →   185.199.110.153
Type A   →   185.199.111.153
```
*(champ « nom/sous-domaine » : laisse vide ou « @ »)*

**1 enregistrement CNAME** (pour `www`) :
```
Type CNAME   →   nom: www   →   valeur: aliyoga2508.github.io.
```

*(Optionnel, IPv6 — 4 enregistrements AAAA si ton registrar le permet :*
`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`*)*

> Si OVH/registrar a déjà mis des enregistrements A/AAAA par défaut pointant ailleurs, **supprime-les** et remplace par ceux ci-dessus.

### C.3 — Attendre la propagation
- Compte **de quelques heures à 24-48 h** pour que le DNS se mette à jour partout.

### C.4 — Activer le HTTPS (cadenas 🔒)
1. Retourne dans **Settings → Pages**
2. Quand la case **« Enforce HTTPS »** devient cliquable (après propagation) → **coche-la**
   ✅ Ton site est désormais en **https://aliyoga.fr** sécurisé.

---

---

## 🟦 SPÉCIAL INFOMANIAK (ton cas — domaines déjà achetés)

Tu as pris **aliyoga.fr** + **aliyoga.ch** chez Infomaniak. Voici les manips exactes.

### C.2-bis — Zone DNS de aliyoga.fr chez Infomaniak
1. Connecte-toi à **manager.infomaniak.com**
2. Menu **« Domaines »** → clique sur **`aliyoga.fr`**
3. Ouvre **« Zone DNS »** (ou « Gérer les enregistrements DNS »)
4. **Supprime** les éventuels enregistrements **A** existants sur `@` (qui pointent vers le parking/hébergement Infomaniak par défaut)
5. **Ajoute un enregistrement** (bouton « Ajouter ») — fais-le **4 fois** :
   | Type | Source / Nom | Cible / Valeur |
   |---|---|---|
   | A | @ (ou vide) | `185.199.108.153` |
   | A | @ (ou vide) | `185.199.109.153` |
   | A | @ (ou vide) | `185.199.110.153` |
   | A | @ (ou vide) | `185.199.111.153` |
6. **Ajoute le CNAME pour www :**
   | Type | Source / Nom | Cible / Valeur |
   |---|---|---|
   | CNAME | www | `aliyoga2508.github.io.` |
7. Enregistre. (TTL : laisse la valeur par défaut.)

> ℹ️ Infomaniak propose aussi un **hébergement gratuit** : tu n'en as **pas besoin** ici, on reste sur GitHub. Ignore les propositions « Créer un site / Site Creator ».

### Étape D — Rediriger aliyoga.ch vers aliyoga.fr
GitHub n'accepte qu'**un seul domaine personnalisé** par site. On met donc **aliyoga.fr en principal**, et on fait **pointer aliyoga.ch dessus** :
1. Manager Infomaniak → **Domaines** → **`aliyoga.ch`**
2. Cherche l'option **« Redirection »** (redirection web / d'URL)
3. Configure une redirection de **`aliyoga.ch` → `https://aliyoga.fr`** (type « permanente / 301 »)
4. Active aussi `www.aliyoga.ch` → `https://aliyoga.fr` si proposé

✅ Résultat : qui tape `.ch` ou `.fr` arrive sur le même site. Tu protèges ta marque des deux côtés de la frontière.

> Si tu ne trouves pas l'option de redirection chez Infomaniak, dis-le moi (ou on la fait via la zone DNS) — je te guide.

---

## ✅ Récap final
- [ ] A.1 Renommer `index.html` → `reservation.html`
- [ ] A.2 Uploader la vitrine (`index.html` + 2 logos)
- [ ] A.3 Vérifier que vitrine + bouton Réserver fonctionnent
- [ ] B. Réserver `aliyoga.fr` (OVH/Infomaniak)
- [ ] C.1 Custom domain `aliyoga.fr` dans GitHub Pages
- [ ] C.2 Ajouter les 4 A records + le CNAME www
- [ ] C.3 Attendre la propagation
- [ ] C.4 Cocher « Enforce HTTPS »

---

## Après la mise en ligne (on le fera ensemble)
- Mettre à jour le **lien du QR code** ? → **pas besoin** : il pointe déjà sur la même adresse, qui affichera la vitrine. Pour de futurs flyers, tu pourras mettre directement `aliyoga.fr`.
- Déclarer le site à **Google Search Console** (pour être bien indexé sur Google).
- Coller ton **lien de paiement Stripe** dans le bouton « Contribuer » (une fois la micro-entreprise créée).

> 🆘 À chaque étape, tu peux me dire où tu en es (capture d'écran, message d'erreur, nom de ton registrar) et je te débloque précisément.
