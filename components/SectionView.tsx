"use client";

import Link from "next/link";
import { getEntries, slugOf, truncate, ROUTES, PREVIEW_CAP, SNIPPET_CAP } from "@/lib/content";
import type { Route, Entry } from "@/lib/content";
import Linkified from "./Linkified";

function EntryTitle({ entry }: { entry: Entry }) {
  if (entry.url) {
    return (
      <a className="entry__link" href={entry.url} target="_blank" rel="noopener">
        {entry.title} <span className="entry__ext">↗</span>
      </a>
    );
  }
  return <>{entry.title}</>;
}

export default function SectionView({ route, heading }: { route: Route; heading: string }) {
  const all = getEntries(route);
  const titleClass = heading !== ROUTES[route] ? "home-title" : "";

  if (!all.length) {
    return (
      <>
        <h1 className={titleClass}>{heading}</h1>
        <p className="empty">Nothing here yet.</p>
      </>
    );
  }

  const [featured, ...rest] = all;
  const slug = slugOf(featured);
  const truncated = featured.body.length > PREVIEW_CAP;
  const shown = truncated
    ? featured.body.slice(0, PREVIEW_CAP).replace(/\s+\S*$/, "")
    : featured.body;

  return (
    <>
      <h1 className={titleClass}>{heading}</h1>

      <article className="entry entry--featured">
        <div className="entry__meta">{featured.date}</div>
        <h2 className="entry__title">
          <EntryTitle entry={featured} />
        </h2>
        <div className={truncated ? "preview preview--fade" : "preview"}>
          <div className="preview__text">
            <Linkified text={shown} />
          </div>
        </div>
        <Link className="preview__bar" href={`/${route}/${encodeURIComponent(slug)}`}>
          Show more
        </Link>
      </article>

      {rest.length ? (
        <section className="archive">
          <h2 className="archive__title">Archive</h2>
          <ul>
            {rest.map((e) => {
              const s = slugOf(e);
              return (
                <li key={s} className="archive__item">
                  <Link className="archive__link" href={`/${route}/${encodeURIComponent(s)}`}>
                    <span className="archive__date">{e.date}</span>
                    <span className="archive__name">{e.title}</span>
                  </Link>
                  <p className="archive__desc">
                    <Linkified text={truncate(e.body, SNIPPET_CAP)} />
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </>
  );
}
