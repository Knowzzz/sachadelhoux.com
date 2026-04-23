<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of your project. PostHog event tracking was added to four client components, capturing the key user interactions on sachadelhoux.com: reading articles, clicking external links, clicking links in post bodies, and toggling the theme. Environment variables were written to `.env.local`. The existing `PostHogProvider` initialization was left intact.

| Event | Description | File |
|---|---|---|
| `article_opened` | user clicks "show more" on the featured article or an archive entry link | `components/SectionView.tsx` |
| `external_link_clicked` | user clicks an external title link (entry with a `url`) from the section list | `components/SectionView.tsx` |
| `article_external_link_clicked` | user clicks the external title link from within a full article view | `components/ArticleView.tsx` |
| `body_link_clicked` | user clicks a URL link inside post body text | `components/Linkified.tsx` |
| `theme_toggled` | user switches between light and dark theme | `components/ThemeToggle.tsx` |

## Next steps

we've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **dashboard**: [analytics basics](https://eu.posthog.com/project/164737/dashboard/638335)
- **article opens over time**: [insight](https://eu.posthog.com/project/164737/insights/LwUOhsdt)
- **top articles by opens**: [insight](https://eu.posthog.com/project/164737/insights/VeQXrv96)
- **article opens by section**: [insight](https://eu.posthog.com/project/164737/insights/LsqsUpbZ)
- **external link clicks over time**: [insight](https://eu.posthog.com/project/164737/insights/WnpoWXHd)
- **theme preference (light vs dark)**: [insight](https://eu.posthog.com/project/164737/insights/c9sRX62W)

### Agent skill

we've left an agent skill folder in your project. you can use this context for further agent development when using claude code. this will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
