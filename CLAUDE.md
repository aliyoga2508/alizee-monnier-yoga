# Aliyoga — Contexte projet (lu automatiquement par Claude Code)

> Ce fichier sert à ce que Claude (sur PC **ou** Mac) connaisse instantanément le projet.
> Il remplace la mémoire locale `~/.claude/…` qui, elle, ne suit pas d'une machine à l'autre.

## Qui
- **Alizée Monnier** — professeure de yoga traditionnel à **Annecy**. Marque : **Aliyoga**.
- Yoga **traditionnel & accessible**, cours **en extérieur**, **prix libre (donation)**. Formation : **Sadhana Life Center**, lignée **T. Krishnamacharya**.
- **Titouan** (compte GitHub `letitsss`) = la personne technique qui a fait le setup initial. Alizée (compte GitHub `aliyoga2508`) reprend la maintenance depuis un **Mac** (VS Code + extension Claude Code).
- Langue de travail : **français**.

## Le site
- En ligne : **https://aliyoga.fr** (+ `aliyoga.ch` qui redirige). Hébergé sur **GitHub Pages**, dépôt **`aliyoga2508/alizee-monnier-yoga`**. Domaines chez **Infomaniak**.
- **Vitrine** : `Website/site-vitrine/index.html` (présentation, 4 pratiques, prix libre). Section témoignages **masquée** (à réactiver avec de vrais avis).
- **Réservation** : `reservation.html` = calendrier maison (Google Forms → Google Sheets → Apps Script → Notion ; base "Planning des séances", intégration "Form counter"). Notice : `Website/notice-seances-yoga.md`.
- **Charte** : crème `#ebe1d0` · bordeaux `#8f4333` · vert `#687257` · gris `#383837` · police **Fraunces**. Logo éléphant au cœur (`BRAND ASSETS/alizee_logo_2a.png` bordeaux, `_3a.png` vert).
- Contact : **aliyoga2508@gmail.com** · 07 67 95 76 68.

## Déploiement (workflow Git propre — fini le drag-and-drop)
- Le dépôt = source de vérité. Éditer → `commit` → `push` → mise en ligne automatique.
- ⚠️ Ne JAMAIS renommer/supprimer le dépôt `alizee-monnier-yoga` (le QR code des flyers et le domaine en dépendent).

## Règles de collaboration
- Claude ne se connecte jamais aux comptes (GitHub, Infomaniak, banque). Pour ces sites → guidage + captures d'écran.
- Photos téléphone : attention à l'**orientation EXIF** (re-encoder dans un bitmap neuf pour éviter l'effet "couché" en ligne).

## Reste à faire
- Ajouter de vrais témoignages (idéalement avis Google) → réactiver la section.
- Brancher le bouton « Contribuer » (lien Stripe) une fois la **micro-entreprise** créée (SIRET requis).
- Chantiers ouverts : micro-entreprise, Google Business Profile, lancement Instagram (guides dans `01_Reseaux-sociaux/`).

## Repères de fichiers
- `00_DEMARRER-ICI.md` — guide d'accueil d'Alizée
- `01_Reseaux-sociaux/` — stratégie, kit de contenu, guide Google Business
- `02_Site-web/` — guide mise en ligne & domaine (déjà réalisé)
- `Website/site-vitrine/` — code de la vitrine
- `BRAND ASSETS/` — logos + charte
