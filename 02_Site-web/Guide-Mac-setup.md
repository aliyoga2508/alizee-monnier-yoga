# Guide — Installer le projet Aliyoga sur le Mac (édition + publication)

> Objectif : qu'Alizée puisse, depuis son Mac, **éditer le site et publier** (commit + push),
> avec l'assistance de Claude Code dans VS Code. Plus de drag-and-drop sur github.com.

---

## 1. Installer les outils (une seule fois)

1. **Git** : ouvre l'app **Terminal** (Cmd+Espace → « Terminal ») et tape :
   ```
   git --version
   ```
   Si Git n'est pas là, macOS proposera d'installer les « outils de développement » → accepte.

2. **VS Code** : télécharge sur https://code.visualstudio.com → glisse dans Applications.

3. **Extension Claude Code** : dans VS Code → icône Extensions (carrés) → cherche **« Claude Code »** → Install. Puis connecte-toi (même compte que sur le PC).

4. **GitHub CLI** (pour s'identifier simplement) :
   - Installe Homebrew si besoin (https://brew.sh), puis :
   ```
   brew install gh
   ```

---

## 2. Se connecter à GitHub (compte aliyoga2508)

Dans le Terminal :
```
gh auth login
```
- Choisis **GitHub.com** → **HTTPS** → **Login with a web browser** → connecte-toi au compte **aliyoga2508**.
Puis configure Git pour utiliser cette identité :
```
gh auth setup-git
```

---

## 3. Récupérer le projet (cloner)

Dans le Terminal, place-toi où tu veux ranger le projet (ex. le Bureau) puis clone :
```
cd ~/Desktop
git clone https://github.com/aliyoga2508/alizee-monnier-yoga.git "ALI YOGA"
cd "ALI YOGA"
```
Tu as maintenant **tout le workspace** sur le Mac (site + guides + brand assets + contexte).

Ouvre-le dans VS Code :
```
code .
```
> 💡 Claude Code lira automatiquement le fichier **`CLAUDE.md`** → il connaîtra tout le projet dès le départ.

---

## 4. Le workflow au quotidien (éditer → publier)

À chaque fois que tu veux mettre à jour le site :

**Option simple (tout faire dire à Claude Code)** : demande-lui « publie mes changements », il fera les commandes ci-dessous.

**Option manuelle (Terminal, dans le dossier du projet)** :
```
git pull            # 1. récupérer les dernières versions (à faire avant d'éditer)
# ... tu édites tes fichiers (index.html, etc.) ...
git add -A          # 2. préparer les modifs
git commit -m "Description de ce que j'ai changé"   # 3. enregistrer
git push            # 4. publier -> aliyoga.fr se met à jour tout seul (1-2 min)
```

Le site est à la **racine du dossier** :
- `index.html` = la page d'accueil (présentation)
- `reservation.html` = le calendrier de réservation (⚠️ système Notion, à ne pas casser)
- `alizee.jpg`, `logo-bordeaux.png`, `logo-vert.png` = images
- `CNAME` = le domaine (ne pas toucher)

---

## 5. Règles d'or 🔒
- **Toujours `git pull` avant d'éditer** (surtout si plusieurs personnes/machines).
- Ne **jamais renommer ni supprimer** le dépôt (le domaine + le QR code en dépendent).
- Pour les photos de téléphone : attention à l'**orientation** (Claude sait la corriger).
- Tu ne donnes **jamais** tes mots de passe à Claude — pour GitHub/Infomaniak, il te guide.

---

## 6. En cas de souci
Demande simplement à Claude Code dans VS Code (« j'ai cette erreur… », capture d'écran à l'appui).
Le contexte complet est dans `CLAUDE.md` et les guides du dossier `02_Site-web/` et `01_Reseaux-sociaux/`.
