"use client";

import { linkify } from "@/lib/content";

export default function Linkified({ text }: { text: string }) {
  const parts = linkify(text);
  return (
    <>
      {parts.map((p, i) =>
        p.type === "link" ? (
          <a key={i} href={p.value} target="_blank" rel="noopener">
            {p.value}
          </a>
        ) : (
          <span key={i}>{p.value}</span>
        )
      )}
    </>
  );
}
