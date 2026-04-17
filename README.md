# sachadelhoux.com

Site personnel — HTML, CSS et JavaScript vanilla. Aucune dépendance, aucun build step.

## Structure

```
.
├── index.html
├── css/
│   ├── reset.css        # Reset moderne
│   ├── variables.css    # Design tokens (couleurs, typo, spacing)
│   ├── base.css         # Styles élémentaires
│   ├── layout.css       # Structure et sections
│   └── components.css   # Boutons, cartes, etc.
├── js/
│   ├── theme.js         # Thème clair/sombre
│   └── main.js          # Logique de la page
├── assets/
│   └── favicon.svg
├── vercel.json          # Headers et cache
└── .gitignore
```

## Développement local

Aucun outil requis. Ouvrir `index.html` directement, ou servir le dossier :

```sh
python3 -m http.server 8000
# puis http://localhost:8000
```

## Déploiement

Site statique — se déploie tel quel sur [Vercel](https://vercel.com).

```sh
vercel
```

Vercel détecte automatiquement le projet comme statique ; aucune configuration
supplémentaire n'est nécessaire.
