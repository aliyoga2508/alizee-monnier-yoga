# Notice — Créer une nouvelle séance avec comptage automatique
## Yoga en plein air · Connexion Google Forms → Notion

---

## Vue d'ensemble du système

```
Participante remplit Google Form
        ↓
Google Sheets reçoit la réponse (automatique)
        ↓
Google Apps Script compte les réponses
        ↓
Notion met à jour "Nombre inscrits"
        ↓
Formule Notion calcule le statut (Ouvert / Dernières places / Complet)
        ↓
Lien d'inscription disparaît si complet
```

---

## PARTIE 1 — Dans Notion
### Ajouter une nouvelle ligne dans ta base "Planning des séances"

1. Ouvre ta base **"Planning des séances"** dans Notion
2. Clique **"+ Nouvelle page"** en bas du tableau
3. Remplis les colonnes :

| Colonne | Ce que tu saisis |
|---|---|
| Nom séance | Ex. "Yoga doux – Parc de la Tête d'Or" |
| Date | Date et heure de la séance |
| Lieu | Adresse ou nom du lieu |
| Nombre de places max | Ex. 10, 12, 15 |
| Nombre inscrits | Laisser vide (mis à jour automatiquement) |
| Lien d'inscription | Laisser vide pour l'instant (ajouté à l'étape 3) |
| Type | Gratuite ou Donation |

4. Ouvre cette nouvelle ligne en pleine page (clique sur son titre)
5. **Copie son URL** — elle ressemble à :
   `notion.so/Yoga-doux-abc123.../...?p=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
6. **Extrait le PAGE_ID** : ce sont les 32 caractères après `p=` dans l'URL
   → Ex. : `33ab5351913580cd9db2caef0c4c0afe`
7. **Note ce PAGE_ID** — tu en auras besoin à l'étape 3

---

## PARTIE 2 — Dans Google Forms
### Créer le formulaire d'inscription pour cette séance

1. Va sur **forms.google.com** → clique **"+"** pour créer un nouveau formulaire
2. Donne-lui un titre : ex. *"Inscription – Yoga doux Tête d'Or – 12 avril"*
3. Ajoute ces 4 questions (toutes obligatoires, type "Réponse courte") :
   - Prénom
   - Nom
   - Email
   - Téléphone
4. Clique **"Envoyer"** (en haut à droite) → onglet **lien** → copie le lien du formulaire
5. **Colle ce lien** dans la colonne **"Lien d'inscription"** de ta ligne Notion
6. Dans Google Forms → onglet **"Réponses"** → clique l'icône **Google Sheets verte**
   → Sélectionne **"Créer une feuille de calcul"** → un Google Sheets est créé automatiquement

---

## PARTIE 3 — Dans Google Apps Script
### Connecter Google Sheets à Notion

1. Depuis ton Google Sheets → menu **Extensions** → **Apps Script**
2. Supprime tout le code existant dans l'éditeur
3. Colle le script suivant :

```javascript
// ============================================================
//  CONFIG — modifie ces 3 valeurs pour chaque nouvelle séance
// ============================================================

const NOTION_TOKEN   = "secret_XXXXXXXXXXXXXXXXXXXX";   // ← ton token (ne change jamais)
const PAGE_ID        = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"; // ← PAGE_ID de la nouvelle ligne Notion
const PROPERTY_NAME  = "Nombre inscrits";                // ← ne change jamais

// ============================================================
//  FONCTION PRINCIPALE — déclenchée à chaque réponse
// ============================================================

function onFormSubmit(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const count = sheet.getLastRow() - 1;
  updateNotion(count);
}

// ============================================================
//  MISE À JOUR NOTION
// ============================================================

function updateNotion(count) {
  const url     = "https://api.notion.com/v1/pages/" + PAGE_ID;
  const payload = {
    properties: {
      [PROPERTY_NAME]: {
        number: count
      }
    }
  };

  const options = {
    method      : "PATCH",
    contentType : "application/json",
    headers     : {
      "Authorization"  : "Bearer " + NOTION_TOKEN,
      "Notion-Version" : "2022-06-28"
    },
    payload     : JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const code     = response.getResponseCode();

  if (code === 200) {
    Logger.log("✓ Notion mis à jour — " + count + " inscrits");
  } else {
    Logger.log("✗ Erreur " + code + " : " + response.getContentText());
  }
}

// ============================================================
//  TEST MANUEL
// ============================================================

function testerManuellement() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const count = sheet.getLastRow() - 1;
  Logger.log("Nombre de réponses détectées : " + count);
  updateNotion(count);
}
```

4. **Modifie les 2 valeurs** dans la section CONFIG :
   - `NOTION_TOKEN` : ton token Notion (le même pour toutes tes séances — ne change jamais)
   - `PAGE_ID` : le PAGE_ID de la nouvelle ligne noté à l'étape 1

> **Où trouver ton NOTION_TOKEN ?**
> notion.so/my-integrations → clique sur ton intégration "Form counter" → copie le token

5. Clique **Enregistrer** (icône disquette ou Ctrl+S)

---

## PARTIE 4 — Tester avant d'activer

1. Dans Apps Script, sélectionne la fonction **`testerManuellement`** dans le menu déroulant
2. Clique **"Exécuter"**
3. Dans les logs en bas → tu dois voir :
   ```
   Nombre de réponses détectées : 0
   ✓ Notion mis à jour — 0 inscrits
   ```
4. Va dans Notion → ta ligne séance → "Nombre inscrits" doit afficher **0**
5. Si tu vois une erreur : vérifie que ton intégration Notion a bien accès à la page
   (dans Notion → ouvre la ligne → `...` en haut à droite → Connexions → vérifie que "Form counter" est présent)

---

## PARTIE 5 — Activer le déclencheur automatique

1. Dans Apps Script → menu gauche → icône **horloge "Déclencheurs"**
2. Clique **"+ Ajouter un déclencheur"** (en bas à droite)
3. Configure exactement comme ça :

| Paramètre | Valeur |
|---|---|
| Fonction à exécuter | `onFormSubmit` |
| Déploiement | `Head` |
| Source de l'événement | `Depuis le formulaire` |
| Type d'événement | `À l'envoi du formulaire` |

4. Clique **Enregistrer** → autorise l'accès avec ton compte Google si demandé

---

## PARTIE 6 — Vérification finale

1. Soumets une **réponse test** dans ton Google Form
2. Attends **10-15 secondes**
3. Va dans Notion → "Nombre inscrits" doit afficher **1**
4. La colonne **"Status"** doit afficher **"Ouvert"**
5. Le **"Lien d'inscription"** (formule) doit afficher le lien

Le système est opérationnel. Chaque nouvelle inscription mettra à jour Notion automatiquement.

---

## Rappel des formules Notion (déjà en place, ne pas retoucher)

**Colonne "Status" (type Formule) :**
```
if(prop("Nombre inscrits") >= prop("Nombre de places max"); "Complet"; if(prop("Nombre de places max") - prop("Nombre inscrits") <= 3; "Dernières places"; "Ouvert"))
```

**Colonne "Inscription" (type Formule — lien affiché aux clients) :**
```
if(prop("Nombre inscrits") >= prop("Nombre de places max"); ""; prop("Lien d'inscription"))
```

---

## Checklist rapide pour chaque nouvelle séance

- [ ] Nouvelle ligne dans Notion avec toutes les infos
- [ ] PAGE_ID noté (paramètre `p=` dans l'URL de la ligne)
- [ ] Nouveau Google Form créé avec les 4 questions
- [ ] Lien du formulaire collé dans Notion (colonne "Lien d'inscription")
- [ ] Google Sheets créé depuis l'onglet Réponses du Form
- [ ] Script collé dans Apps Script avec le bon PAGE_ID
- [ ] Test manuel réussi (✓ dans les logs + chiffre dans Notion)
- [ ] Déclencheur "À l'envoi du formulaire" activé
- [ ] Réponse test soumise → Notion mis à jour ✓

---

## Ce qui ne change jamais d'une séance à l'autre

- Ton `NOTION_TOKEN` → identique dans tous les scripts
- Le nom `PROPERTY_NAME = "Nombre inscrits"` → identique dans tous les scripts
- Les formules Notion → déjà en place, elles s'appliquent à toutes les lignes
- Ton intégration Notion "Form counter" → déjà autorisée

## Ce qui change à chaque séance

- Le `PAGE_ID` → propre à chaque ligne Notion
- Le Google Form → un nouveau par séance
- Le Google Sheets → créé automatiquement avec le Form
- Le script Apps Script → collé dans chaque nouveau Sheets

---

*Notice créée le 7 avril 2026*
