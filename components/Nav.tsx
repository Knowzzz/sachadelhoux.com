"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const LINKS: Array<{ href: string; label: string; match: (p: string) => boolean }> = [
  { href: "/posts", label: "Posts", match: (p) => p === "/" || p === "/posts" || p.startsWith("/posts/") },
  { href: "/tech", label: "Tech", match: (p) => p === "/tech" || p.startsWith("/tech/") },
  { href: "/xly-log", label: "Xly log", match: (p) => p === "/xly-log" || p.startsWith("/xly-log/") },
  { href: "/thinking", label: "what i'm thinking about", match: (p) => p === "/thinking" || p.startsWith("/thinking/") }
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="top">
      <nav className="navbox" aria-label="Navigation">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={link.match(pathname) ? "active" : undefined}>
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
