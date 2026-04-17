(() => {
  const ROUTES = {
    posts: "Posts",
    tech: "Tech",
    "xly-log": "Xly log"
  };
  const DEFAULT_ROUTE = "posts";

  const main = document.getElementById("main");
  const latest = document.getElementById("latest");
  const navLinks = document.querySelectorAll("[data-route]");
  const yearEl = document.querySelector("[data-year]");
  const themeBtn = document.querySelector("[data-theme-toggle]");

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

  const sortByDate = (a, b) => (a.date < b.date ? 1 : -1);

  const getEntries = (route) =>
    [...(window.CONTENT[route] || [])].sort(sortByDate);

  const renderRoute = (route) => {
    const entries = getEntries(route);
    const title = ROUTES[route];
    const html = [`<h1>${escape(title)}</h1>`];
    if (!entries.length) {
      html.push(`<p>Nothing here yet.</p>`);
    } else {
      for (const e of entries) {
        html.push(`
          <article class="entry">
            <div class="entry__meta">${escape(e.date)}</div>
            <h2 class="entry__title">${escape(e.title)}</h2>
            <div class="entry__body">${linkify(e.body)}</div>
          </article>
        `);
      }
    }
    main.innerHTML = html.join("");
    document.title = `${title} — Sacha Delhoux`;
    for (const a of navLinks) {
      a.classList.toggle("active", a.dataset.route === route);
    }
    window.scrollTo(0, 0);
  };

  const renderLatest = () => {
    const all = Object.keys(ROUTES).flatMap((r) =>
      getEntries(r).map((e) => ({ ...e, route: r }))
    );
    all.sort(sortByDate);
    latest.innerHTML = all
      .slice(0, 6)
      .map(
        (e) => `
          <li>
            <a href="#/${e.route}">${escape(e.title)}</a>
            <span>${escape(e.date)} · ${escape(ROUTES[e.route])}</span>
          </li>
        `
      )
      .join("");
  };

  const routeFromHash = () => {
    const key = (location.hash || "").replace(/^#\//, "");
    return ROUTES[key] ? key : DEFAULT_ROUTE;
  };

  const handleRoute = () => renderRoute(routeFromHash());

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
  renderLatest();
  handleRoute();
})();
