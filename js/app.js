(() => {
  const ROUTES = {
    posts: "Posts",
    tech: "Tech",
    "xly-log": "Xly log",
    thinking: "what i'm thinking about"
  };
  const DEFAULT_ROUTE = "posts";
  const PREVIEW_CAP = 500;
  const SNIPPET_CAP = 140;

  const main = document.getElementById("main");
  const side = document.getElementById("side");
  const navLinks = document.querySelectorAll("[data-route]");
  const yearEl = document.querySelector("[data-year]");
  const themeBtn = document.querySelector("[data-theme-toggle]");

  const store = {};

  const escape = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[c]);

  const linkify = (s) =>
    escape(s).replace(
      /(https?:\/\/[^\s<]+)/g,
      '<a href="$1" target="_blank" rel="noopener">$1</a>'
    );

  const slugify = (s) =>
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const slugOf = (e) => e.slug || slugify(e.title);

  const truncate = (s, n) =>
    s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s;

  const sortByDate = (a, b) => (a.date < b.date ? 1 : -1);

  const entriesFor = (route) => [...(store[route] || [])].sort(sortByDate);

  const findEntry = (route, slug) =>
    entriesFor(route).find((e) => slugOf(e) === slug);

  const titleLink = (entry) =>
    entry.url
      ? `<a class="entry__link" href="${escape(entry.url)}" target="_blank" rel="noopener">${escape(entry.title)} <span class="entry__ext">↗</span></a>`
      : escape(entry.title);

  const renderSectionSidebar = (route, activeSlug) => {
    const all = entriesFor(route);
    const items = all
      .map((e) => {
        const s = slugOf(e);
        const active = s === activeSlug ? " aria-current=\"page\"" : "";
        return `
          <li>
            <a href="#/${route}/${encodeURIComponent(s)}"${active}>${escape(e.title)}</a>
            <span>${escape(e.date)}</span>
          </li>
        `;
      })
      .join("");
    return `
      <h2>More in ${escape(ROUTES[route])}</h2>
      <ul>${items}</ul>
    `;
  };

  const renderLatestSidebar = () => {
    const all = Object.keys(ROUTES).flatMap((r) =>
      entriesFor(r).map((e) => ({ ...e, route: r }))
    );
    all.sort(sortByDate);
    const items = all
      .slice(0, 6)
      .map(
        (e) => `
          <li>
            <a href="#/${e.route}/${encodeURIComponent(slugOf(e))}">${escape(e.title)}</a>
            <span>${escape(e.date)} · ${escape(ROUTES[e.route])}</span>
          </li>
        `
      )
      .join("");
    return `
      <h2>Latest</h2>
      <ul>${items}</ul>
    `;
  };

  const renderSection = (route) => {
    const all = entriesFor(route);
    const title = ROUTES[route];

    if (!all.length) {
      main.innerHTML = `<h1>${escape(title)}</h1><p class="empty">Nothing here yet.</p>`;
      side.innerHTML = renderLatestSidebar();
      finalize(route);
      return;
    }

    const [featured, ...rest] = all;
    const slug = slugOf(featured);
    const truncated = featured.body.length > PREVIEW_CAP;
    const shown = truncated
      ? featured.body.slice(0, PREVIEW_CAP).replace(/\s+\S*$/, "")
      : featured.body;

    const featuredHtml = `
      <article class="entry entry--featured">
        <div class="entry__meta">${escape(featured.date)}</div>
        <h2 class="entry__title">${titleLink(featured)}</h2>
        <div class="preview${truncated ? " preview--fade" : ""}">
          <div class="preview__text">${linkify(shown)}</div>
        </div>
        <a class="preview__bar" href="#/${route}/${encodeURIComponent(slug)}">Show more</a>
      </article>
    `;

    let archiveHtml = "";
    if (rest.length) {
      archiveHtml = `
        <section class="archive">
          <h2 class="archive__title">Archive</h2>
          <ul>
            ${rest
              .map((e) => {
                const s = slugOf(e);
                return `
                  <li class="archive__item">
                    <a class="archive__link" href="#/${route}/${encodeURIComponent(s)}">
                      <span class="archive__date">${escape(e.date)}</span>
                      <span class="archive__name">${escape(e.title)}</span>
                    </a>
                    <p class="archive__desc">${linkify(truncate(e.body, SNIPPET_CAP))}</p>
                  </li>
                `;
              })
              .join("")}
          </ul>
        </section>
      `;
    }

    main.innerHTML = `<h1>${escape(title)}</h1>${featuredHtml}${archiveHtml}`;
    side.innerHTML = renderLatestSidebar();
    finalize(route);
  };

  const renderArticle = (route, slug) => {
    const entry = findEntry(route, slug);
    if (!entry) {
      main.innerHTML = `
        <h1>Not found</h1>
        <p><a href="#/${route}">← back to ${escape(ROUTES[route])}</a></p>
      `;
      side.innerHTML = renderSectionSidebar(route);
      finalize(route);
      return;
    }
    main.innerHTML = `
      <p class="breadcrumb"><a href="#/${route}">← ${escape(ROUTES[route])}</a></p>
      <article class="entry entry--full">
        <div class="entry__meta">${escape(entry.date)}</div>
        <h1 class="entry__title">${titleLink(entry)}</h1>
        <div class="entry__body">${linkify(entry.body)}</div>
      </article>
    `;
    side.innerHTML = renderSectionSidebar(route, slug);
    document.title = `${entry.title} — Sacha Delhoux`;
    setActiveNav(route);
    window.scrollTo(0, 0);
  };

  const finalize = (route) => {
    document.title = `${ROUTES[route]} — Sacha Delhoux`;
    setActiveNav(route);
    window.scrollTo(0, 0);
  };

  const setActiveNav = (route) => {
    for (const a of navLinks) {
      a.classList.toggle("active", a.dataset.route === route);
    }
  };

  const parseRoute = () => {
    const raw = (location.hash || "").replace(/^#\//, "");
    if (!raw) return { route: DEFAULT_ROUTE };
    const [section, rawSlug] = raw.split("/");
    if (!ROUTES[section]) return { route: DEFAULT_ROUTE };
    return rawSlug
      ? { route: section, slug: decodeURIComponent(rawSlug) }
      : { route: section };
  };

  const handleRoute = () => {
    const { route, slug } = parseRoute();
    slug ? renderArticle(route, slug) : renderSection(route);
  };

  const loadContent = async () => {
    const routes = Object.keys(ROUTES);
    await Promise.all(
      routes.map(async (r) => {
        try {
          const res = await fetch(`content/${r}.json`, { cache: "no-cache" });
          store[r] = res.ok ? await res.json() : [];
        } catch {
          store[r] = [];
        }
      })
    );
  };

  const applyTheme = (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("theme", t);
  };

  const initTheme = () => {
    const saved = localStorage.getItem("theme");
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
  };

  themeBtn.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });

  window.addEventListener("hashchange", handleRoute);

  initTheme();
  yearEl.textContent = new Date().getFullYear();

  loadContent().then(handleRoute);
})();
