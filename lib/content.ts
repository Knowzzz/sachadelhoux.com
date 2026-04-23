import postsJson from "@/content/posts.json";
import techJson from "@/content/tech.json";
import xlyJson from "@/content/xly-log.json";
import thinkingJson from "@/content/thinking.json";

export type Entry = {
  date: string;
  title: string;
  body: string;
  url?: string;
  slug?: string;
};

export type Route = "posts" | "tech" | "xly-log" | "thinking";

export const ROUTES: Record<Route, string> = {
  posts: "Posts",
  tech: "Tech",
  "xly-log": "Xly log",
  thinking: "what i'm thinking about"
};

export const HOME_ROUTE: Route = "posts";
export const HOME_TITLE = "sacha delhoux's website";
export const PREVIEW_CAP = 500;
export const SNIPPET_CAP = 140;

export const slugify = (s: string) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const slugOf = (e: Entry) => e.slug || slugify(e.title);

const sortByDate = (a: Entry, b: Entry) => (a.date < b.date ? 1 : -1);

const RAW: Record<Route, Entry[]> = {
  posts: postsJson as Entry[],
  tech: techJson as Entry[],
  "xly-log": xlyJson as Entry[],
  thinking: thinkingJson as Entry[]
};

const SORTED: Record<Route, Entry[]> = {
  posts: [...RAW.posts].sort(sortByDate),
  tech: [...RAW.tech].sort(sortByDate),
  "xly-log": [...RAW["xly-log"]].sort(sortByDate),
  thinking: [...RAW.thinking].sort(sortByDate)
};

export function getEntries(route: Route): Entry[] {
  return SORTED[route];
}

export function getEntry(route: Route, slug: string): Entry | null {
  return SORTED[route].find((e) => slugOf(e) === slug) || null;
}

export function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s;
}

export function linkify(text: string): Array<{ type: "text" | "link"; value: string }> {
  const parts: Array<{ type: "text" | "link"; value: string }> = [];
  const regex = /(https?:\/\/[^\s<]+)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) parts.push({ type: "text", value: text.slice(last, m.index) });
    parts.push({ type: "link", value: m[1] });
    last = m.index + m[1].length;
  }
  if (last < text.length) parts.push({ type: "text", value: text.slice(last) });
  return parts;
}
