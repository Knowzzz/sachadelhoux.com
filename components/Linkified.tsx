"use client";

import posthog from "posthog-js";
import { linkify } from "@/lib/content";

export default function Linkified({ text }: { text: string }) {
  const parts = linkify(text);
  return (
    <>
      {parts.map((p, i) =>
        p.type === "link" ? (
          <a key={i} href={p.value} target="_blank" rel="noopener" onClick={() => posthog.capture("body_link_clicked", { url: p.value })}>
            {p.value}
          </a>
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </>
  );
}
