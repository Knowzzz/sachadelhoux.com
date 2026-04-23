"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import posthog from "posthog-js";
import { getEntries, getEntry, slugOf, ROUTES } from "@/lib/content";
import type { Route } from "@/lib/content";
import Linkified from "./Linkified";

export default function ArticleView({ route, slug }: { route: Route; slug: string }) {
  const entry = getEntry(route, slug);
  if (!entry) notFound();

  const more = getEntries(route).filter((e) => slugOf(e) !== slug);

  return (
    <>
      <p className="breadcrumb">
        <Link href={`/${route}`}>← {ROUTES[route]}</Link>
      </p>
      <article className="entry entry--full">
        <div className="entry__meta">{entry.date}</div>
        <h1 className="entry__title">
          {entry.url ? (
            <a
              className="entry__link"
              href={entry.url}
              target="_blank"
              rel="noopener"
              onClick={() => posthog.capture("article_external_link_clicked", { title: entry.title, url: entry.url, section: route, slug })}
            >
              {entry.title} <span className="entry__ext">↗</span>
            </a>
          ) : (
            entry.title
          )}
        </h1>
        <div className="entry__body">
          <Linkified text={entry.body} />
        </div>
      </article>

      {more.length ? (
        <section className="more">
          <h2>More in {ROUTES[route]}</h2>
          <ul>
            {more.map((e) => {
              const s = slugOf(e);
              return (
                <li key={s}>
                  <Link href={`/${route}/${encodeURIComponent(s)}`}>{e.title}</Link>
                  <span>{e.date}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </>
  );
}
