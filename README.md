# sachadelhoux.com

Blog personnel — HTML, CSS, JS vanilla. Aucun build, aucune dépendance.

## Structure

```
.
├── index.html
├── css/style.css
├── js/app.js           # Routing + rendu + thème
├── content/
│   ├── posts.json      # Tweets / posts courts
│   ├── tech.json       # Articles techniques
│   ├── xly-log.json    # Logs
│   └── thinking.json   # Notes ouvertes
├── assets/favicon.svg
└── vercel.json
```

## Ajouter une entrée

Ouvrir le fichier JSON correspondant et ajouter un objet :

```json
{
  "date": "2026-04-18",
  "title": "titre",
  "body": "contenu libre. les URLs deviennent cliquables.",
  "url": "https://x.com/.../status/..."
}
```

Le champ `url` est optionnel — quand présent, le titre devient un lien vers le tweet original.

## Local

Nécessite un serveur HTTP (les `fetch` vers les JSON ne marchent pas en `file://`) :

```sh
python3 -m http.server 8000
```

## Déploiement

Static — se déploie tel quel sur Vercel.
