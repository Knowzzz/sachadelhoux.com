# sachadelhoux.com

Blog personnel — HTML, CSS, JS vanilla. Aucun build, aucune dépendance.

## Structure

```
.
├── index.html
├── css/style.css
├── js/
│   ├── content.js   # Toutes les entrées du blog (posts, tech, xly-log)
│   └── app.js       # Routing + rendu + thème
├── assets/favicon.svg
└── vercel.json
```

## Ajouter une entrée

Ouvrir `js/content.js` et ajouter un objet dans la section voulue :

```js
{
  date: "2026-04-18",
  title: "Titre",
  body: "Contenu libre. Les URLs deviennent cliquables."
}
```

Sauvegarder, recharger la page. C'est tout.

## Local

```sh
python3 -m http.server 8000
```

## Déploiement

Static — se déploie tel quel sur Vercel.
