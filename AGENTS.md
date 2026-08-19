# Instructions locales

Ce fichier est ignoré par git. Il contient les règles de style pour ce blog.

## Règle critique — écriture des posts

**NE JAMAIS utiliser de majuscules quand tu écris du contenu dans les fichiers `content/*.json`.**

Ça s'applique à :
- `title` — tout en minuscules, même pour les noms propres et les débuts de phrase
- `body` — tout en minuscules, y compris après un point

Exemples :

```json
// ✗ MAUVAIS
{ "title": "Hello World", "body": "Today I shipped..." }

// ✓ BON
{ "title": "hello world", "body": "today i shipped..." }
```

Cette règle s'applique à **tous les fichiers** : `content/posts.json`, `content/tech.json`, `content/xly-log.json`, `content/thinking.json`.

Champ optionnel `url` — utilisé pour les posts qui pointent vers un tweet original. La casse de l'URL n'est pas concernée par la règle minuscules.

Seules exceptions tolérées dans le corps du texte : acronymes techniques établis (URL, API, HTTP, JS, CSS, etc.) et noms de marques (GitHub, Vercel). En cas de doute : minuscule.

## Ton — pas de takes extrêmes

Quand tu écris du contenu pour les posts, **ne prends jamais de positions tranchées ou superlatives à la place de l'auteur**. Pas de « one of the most X », « the most underrated », « genuinely revolutionary », « absolutely insane », etc. — ce sont des avis forts qui doivent venir de l'auteur lui-même, pas de toi.

Reste factuel, descriptif, légèrement personnel quand le contexte le demande, mais jamais enthousiaste à outrance ni dans le jugement définitif. Si un sujet est impressionnant, laisse les faits le montrer — pas les adjectifs.

## Autres conventions

- Pas de commentaires dans le code — identifiants explicites à la place
- Pas d'animations fantaisistes, CSS natif uniquement
- Thème light = pur noir/blanc ; thème dark = deux tons sombres qui s'accordent
- Mise en page : colonne principale à gauche, sidebar "Latest" à droite, padding minimal
- Pour ajouter une entrée : éditer le fichier JSON correspondant dans `content/`
