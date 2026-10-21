const fs = require("node:fs");
const path = require("node:path");

const ROOT = __dirname;
const SITE_URL = "https://www.tmtsolutions.de";
const SOURCE = path.join(ROOT, "source", "de");
const ENGLISH = path.join(ROOT, "en");
const translations = JSON.parse(fs.readFileSync(path.join(ROOT, "i18n.json"), "utf8"));

const pages = [
  { id: "home", file: "index.html", title: "TMT Solutions | Microsoft Dynamics 365 Business Central", description: "Business Central, das zu Ihrem Betrieb passt: TMT Solutions begleitet mittelständische Unternehmen von der ERP-Beratung bis zum Support." },
  { id: "business-central", file: "Microsoft Dynamics 365.html", title: "Microsoft Dynamics 365 Business Central | TMT Solutions", description: "Business Central für kleine und mittlere Unternehmen: Funktionen, Bereitstellung und Einführung mit TMT Solutions." },
  { id: "leistungen", file: "Leistungen.html", title: "Leistungen | TMT Solutions", description: "Beratung, Einführung, AL-Erweiterungen, Migration und Support für Microsoft Dynamics 365 Business Central." },
  { id: "warum-tmt", file: "Warum-TMT.html", title: "Warum TMT Solutions? | TMT Solutions", description: "Lernen Sie TMT Solutions kennen: Ihr Microsoft-Partner für Dynamics 365 Business Central in Lindau am Bodensee." },
  { id: "support", file: "Support.html", title: "Support | TMT Solutions", description: "Support für Microsoft Dynamics 365 Business Central: Kontakt zum Team und zum TMT Helpdesk." },
  { id: "karriere", file: "Karriere.html", title: "Karriere | TMT Solutions", description: "Karriere und Ausbildung bei TMT Solutions in Lindau: Einstiegsmöglichkeiten rund um Business Central und Softwareentwicklung." },
  { id: "kontakt", file: "Kontakt.html", title: "Kontakt | TMT Solutions", description: "Kontaktieren Sie TMT Solutions in Lindau für Beratung zu Microsoft Dynamics 365 Business Central." },
  { id: "wissen", file: "Wissen.html", title: "Wissen | TMT Solutions", description: "Praxisnahe Artikel zu Business Central, Dynamics NAV-Migration und Erweiterungen – verständlich erklärt von TMT Solutions." },
  { id: "wissen-business-central", file: "wissen-business-central.html", title: "Business Central einführen | TMT Solutions", description: "Wie Sie eine Business-Central-Einführung vorbereiten: Ziele, Prozesse, Daten, Zuständigkeiten und ein realistischer Projektumfang.", enTitle: "Business Central implementation guide | TMT Solutions", enDescription: "A practical guide to preparing a Business Central implementation: goals, processes, data, responsibilities and a realistic project scope.", articleTitle: "Business Central einführen: So starten Sie strukturiert", articleDescription: "Ein praxisnaher Leitfaden für die Vorbereitung einer Business-Central-Einführung.", enArticleTitle: "A structured start to Microsoft Dynamics 365 Business Central", enArticleDescription: "A practical guide to preparing for a Business Central implementation." },
  { id: "wissen-nav-migration", file: "wissen-nav-migration.html", title: "Dynamics NAV Migration | TMT Solutions", description: "Was bei einem Wechsel von Dynamics NAV zu Business Central zu prüfen ist – von Anpassungen und Daten bis zu Tests und Go-live.", enTitle: "Dynamics NAV migration guide | TMT Solutions", enDescription: "What to assess when moving from Dynamics NAV to Business Central, from customizations and data to testing and go-live.", articleTitle: "Von Dynamics NAV zu Business Central: Migration planbar machen", articleDescription: "Die wichtigsten Prüfpunkte für eine gut vorbereitete NAV-zu-Business-Central-Migration.", enArticleTitle: "Moving from Dynamics NAV to Business Central: make your migration manageable", enArticleDescription: "Key checkpoints for preparing a Dynamics NAV to Business Central migration." },
  { id: "wissen-erweiterungen", file: "wissen-erweiterungen.html", title: "Business Central Erweiterungen | TMT Solutions", description: "Wann der Standard genügt und wie Sie AL-Erweiterungen und Schnittstellen für Business Central nachvollziehbar planen.", enTitle: "Business Central extensions | TMT Solutions", enDescription: "When standard functionality is enough and how to plan Business Central AL extensions and integrations carefully.", articleTitle: "Business Central erweitern: AL und Schnittstellen mit klarem Zweck", articleDescription: "Wie Sie Lücken im Standard bewerten und Erweiterungen sowie Schnittstellen sinnvoll planen.", enArticleTitle: "Extending Business Central: give AL customizations and integrations a clear purpose", enArticleDescription: "How to assess gaps in standard functionality and plan extensions and integrations." },
  { id: "impressum", file: "impressum.html", title: "Impressum | TMT Solutions", description: "Impressum der TMT Solutions GmbH." },
  { id: "datenschutz", file: "datenschutz.html", title: "Datenschutz | TMT Solutions", description: "Datenschutzhinweise der TMT Solutions GmbH." },
  { id: "not-found", file: "404.html", title: "Seite nicht gefunden | TMT Solutions", description: "Die angeforderte Seite wurde nicht gefunden." },
];

const labels = {
  de: { home: "Startseite", homeHint: "Zur Startseite", product: "Business Central", services: "Leistungen", why: "Warum TMT?", support: "Support", careers: "Karriere", knowledge: "Wissen", contact: "Kontakt", menu: "Hauptmenü", menuButton: "Menü öffnen", legal: "Rechtliches", imprint: "Impressum", privacy: "Datenschutz", social: "Social Media", tagline: "Sie finden uns hier", address: "Besuchen Sie uns", phone: "Rufen Sie uns an", email: "Schreiben Sie uns", helpdesk: "Helpdesk", terms: "AGB" },
  en: { home: "Home", homeHint: "Back to home", product: "Business Central", services: "Services", why: "Why TMT?", support: "Support", careers: "Careers", knowledge: "Insights", contact: "Contact", menu: "Main menu", menuButton: "Open menu", legal: "Legal", imprint: "Imprint", privacy: "Privacy", social: "Social media", tagline: "Find us here", address: "Visit us", phone: "Call us", email: "Email us", helpdesk: "Helpdesk", terms: "Terms and conditions" },
};

function route(file, language) {
  return file === "index.html" ? "index.html" : file;
}

function header(page, language) {
  const t = labels[language];
  const languageHref = language === "de" ? `en/${page.file}` : `../${page.file}`;
  const languageLabel = language === "de" ? "English" : "Deutsch";
  const languageTag = language === "de" ? "en" : "de";
  const links = [
    ["business-central", "Microsoft Dynamics 365.html", t.product],
    ["leistungen", "Leistungen.html", t.services],
    ["warum-tmt", "Warum-TMT.html", t.why],
    ["support", "Support.html", t.support],
    ["karriere", "Karriere.html", t.careers],
    ["wissen", "Wissen.html", t.knowledge],
  ];
  const nav = links.map(([id, file, label]) => `<a class="nav-link"${page.id === id || (id === "wissen" && page.id.startsWith("wissen-")) ? ' aria-current="page"' : ""} href="${route(file, language)}">${label}</a>`).join("");
  const homeHref = `${route("index.html", language)}#main-content`;
  const contactCta = `<a class="button header-cta"${page.id === "kontakt" ? ' aria-current="page"' : ""} href="${route("Kontakt.html", language)}">${t.contact}</a>`;
  const flag = languageTag === "en"
    ? '<svg class="flag flag--en" viewBox="0 0 60 40" aria-hidden="true" focusable="false"><rect width="60" height="40" fill="#012169"/><path d="M0 0 60 40M60 0 0 40" stroke="#fff" stroke-width="8"/><path d="M0 0 60 40M60 0 0 40" stroke="#c8102e" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/><path d="M30 0v40M0 20h60" stroke="#c8102e" stroke-width="7"/></svg>'
    : '<span class="flag flag--de" aria-hidden="true"></span>';
  return `<header class="site-header"><div class="wrap header-row"><a class="logo" href="${homeHref}" aria-label="TMT Solutions, ${t.home}" title="${t.homeHint}" data-home-hint="${t.homeHint}"><span class="logo__mark"><span>T</span><span class="logo__m">M</span><span>T</span></span><span class="logo__sub">Solutions</span></a><nav class="nav" id="nav" aria-label="${t.menu}">${nav}</nav>${contactCta}<a class="language-link" href="${languageHref}" lang="${languageTag}" hreflang="${languageTag}" aria-label="${languageLabel}" title="${languageLabel}">${flag}<span class="visually-hidden">${languageLabel}</span></a><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav" aria-label="${t.menuButton}"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>${language === "de" ? "Menü" : "Menu"}</span></button></div></header>`;
}

function footer(language) {
  const t = labels[language];
  const root = language === "en" ? "../" : "";
  const socialLinks = [
    ["Facebook", "https://www.facebook.com/tmtsolutions/", '<path fill="currentColor" d="M13.5 21v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.8v8z"/>'],
    ["Instagram", "https://www.instagram.com/tmtsolutions.de/?hl=de", '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.7" cy="6.5" r="1.1" fill="currentColor"/>'],
    ["XING", "https://www.xing.com/pages/tmtsolutionsgmbh", '<path fill="currentColor" d="M4.2 7.2h4.1l2.1 3.7-3.2 5.4H3.1l3.2-5.4zM14.2 3h4.3l-5.6 9.5 3.6 6.3h-4.3l-3.6-6.3z"/>'],
    ["LinkedIn", "https://www.linkedin.com/company/tmt-solutions-gmbh/", '<path fill="currentColor" d="M5.2 8.7a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8M3.6 10h3.2v10H3.6zm5.2 0h3.1v1.4h.1a3.4 3.4 0 0 1 3.1-1.7c3.3 0 3.9 2.2 3.9 5.1V20h-3.2v-4.6c0-1.1 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5V20H8.8z"/>'],
    ["WhatsApp", "https://wa.me/4916097919830", '<path d="M20 11.7a8 8 0 0 1-11.8 7L4 20l1.3-4A8 8 0 1 1 20 11.7Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M9 8.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.9 1.2 1.5 2.1 2 .2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5-.1.6-.3 1.1-.8 1.4-.5.4-1.1.5-1.7.3-1.2-.3-2.5-1.1-3.6-2.1-1-.9-1.8-2.1-2.1-3.2-.2-.7.1-1.5.5-2Z" fill="currentColor"/>'],
  ].map(([name, href, icon]) => `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${name}" title="${name}"><svg class="footer-icon" viewBox="0 0 24 24" aria-hidden="true">${icon}</svg></a>`).join("");
  return `<footer class="site-footer"><div class="wrap footer-shell"><div class="footer-brand"><a class="footer-logo" href="${root}index.html#main-content" aria-label="TMT Solutions, ${t.home}"><span class="logo__mark"><span>T</span><span class="logo__m">M</span><span>T</span></span><span class="logo__sub">Solutions</span></a><p>${t.tagline}</p><nav class="footer-social" aria-label="${t.social}">${socialLinks}</nav></div><div class="footer-contact"><h2>${t.address}</h2><address>TMT Solutions GmbH<br>Ludwig-Kick-Str. 12<br>88131 Lindau (Bodensee)</address><a href="https://www.openstreetmap.org/search?query=Ludwig-Kick-Str.%2012%2C%2088131%20Lindau" target="_blank" rel="noopener noreferrer">${language === "en" ? "Directions" : "Route planen"}</a></div><div class="footer-contact"><h2>${t.phone}</h2><a href="tel:+4983822792560">+49&nbsp;8382&nbsp;279256&nbsp;0</a><h2>${t.email}</h2><a href="mailto:info@tmtsolutions.de">info@tmtsolutions.de</a><h2>${t.helpdesk}</h2><a href="https://support.tmtsolutions.de/" target="_blank" rel="noopener noreferrer">${language === "en" ? "Open support portal" : "Support-Portal öffnen"}</a></div></div><div class="wrap footer-bottom"><span class="footer-copyright">© ${new Date().getFullYear()} TMT Solutions GmbH</span><nav class="footer-legal" aria-label="${t.legal}"><a href="${root}impressum.html">${t.imprint}</a><a href="${root}datenschutz.html">${t.privacy}</a><a href="https://www.tmtsolutions.de/docs/AGB.pdf" target="_blank" rel="noopener noreferrer">${t.terms}</a></nav></div><div id="consent-banner-slot" hidden aria-hidden="true"></div></footer>`;
}

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function decodeEntities(value) {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: "\u00a0", ndash: "\u2013", mdash: "\u2014", rsquo: "\u2019", lsquo: "\u2018", rdquo: "\u201d", ldquo: "\u201c", hellip: "\u2026", trade: "\u2122" };
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (all, token) => {
    if (token[0] === "#") return String.fromCodePoint(token[1].toLowerCase() === "x" ? parseInt(token.slice(2), 16) : parseInt(token.slice(1), 10));
    return named[token] || all;
  });
}

function translateHtml(html, page) {
  const map = { ...translations.shared, ...(translations.pages[page.id] || {}) };
  html = html.replace(/>([^<>]+)</g, (all, raw) => {
    const decoded = decodeEntities(raw);
    const trimmed = decoded.trim();
    if (!trimmed || map[trimmed] === undefined) return all;
    const leading = decoded.match(/^\s*/)[0];
    const trailing = decoded.match(/\s*$/)[0];
    const replacement = leading + map[trimmed] + trailing;
    return `>${escapeAttribute(replacement)}<`;
  });
  html = html.replace(/\b(aria-label|title|placeholder|alt)="([^"]*)"/g, (all, attr, raw) => {
    const value = decodeEntities(raw);
    const translation = map[`${attr}:${value}`] ?? map[value];
    return translation === undefined ? all : `${attr}="${escapeAttribute(translation)}"`;
  });
  return html;
}

function seo(page, language) {
  const englishTitles = {
    home: "TMT Solutions | Microsoft Dynamics 365 Business Central",
    "business-central": "Microsoft Dynamics 365 Business Central | TMT Solutions",
    leistungen: "Services | TMT Solutions",
    "warum-tmt": "Why TMT Solutions? | TMT Solutions",
    support: "Support | TMT Solutions",
    karriere: "Careers | TMT Solutions",
    kontakt: "Contact | TMT Solutions",
    wissen: "Insights | TMT Solutions",
    impressum: "Imprint | TMT Solutions",
    datenschutz: "Privacy | TMT Solutions",
    "not-found": "Page not found | TMT Solutions",
  };
  const englishDescriptions = {
    home: "Business Central that fits the way you work: TMT Solutions supports small and midsize businesses from ERP consulting through ongoing support.",
    "business-central": "Business Central for small and midsize businesses: features, deployment and implementation with TMT Solutions.",
    leistungen: "Consulting, implementation, AL extensions, migration and support for Microsoft Dynamics 365 Business Central.",
    "warum-tmt": "Get to know TMT Solutions, your Microsoft partner for Dynamics 365 Business Central in Lindau, Germany.",
    support: "Support for Microsoft Dynamics 365 Business Central: contact our team and TMT Helpdesk.",
    karriere: "Careers and vocational training at TMT Solutions in Lindau.",
    kontakt: "Contact TMT Solutions in Lindau about Microsoft Dynamics 365 Business Central.",
    wissen: "Articles and insights about Microsoft Dynamics 365 Business Central.",
    impressum: "Legal notice of TMT Solutions GmbH.",
    datenschutz: "Privacy information from TMT Solutions GmbH.",
    "not-found": "The page you requested could not be found.",
  };
  const title = language === "en" ? (page.enTitle || englishTitles[page.id] || page.title) : page.title;
  const description = language === "en" ? (page.enDescription || englishDescriptions[page.id] || page.description) : page.description;
  const canonicalPath = language === "en" ? `/en/${encodeURI(page.file)}` : page.file === "index.html" ? "/" : `/${encodeURI(page.file)}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const german = page.file === "index.html" ? `${SITE_URL}/` : `${SITE_URL}/${encodeURI(page.file)}`;
  const english = `${SITE_URL}/en/${encodeURI(page.file)}`;
  const descriptionTag = `<meta name="description" content="${escapeAttribute(description)}">`;
  const stylesheet = page.id === "home" ? "index" : fs.existsSync(path.join(ROOT, "assets", "css", `${page.id}.css`)) ? page.id : "content";
  const stylesheetTag = `<link rel="stylesheet" href="${language === "en" ? "../" : ""}assets/css/${stylesheet}.css">`;
  const headTags = `${descriptionTag}
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="de" href="${german}">
  <link rel="alternate" hreflang="en" href="${english}">
  <link rel="alternate" hreflang="x-default" href="${german}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="TMT Solutions">
  <meta property="og:title" content="${escapeAttribute(title)}">
  <meta property="og:description" content="${escapeAttribute(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:locale" content="${language === "en" ? "en_GB" : "de_DE"}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeAttribute(title)}">
  <meta name="twitter:description" content="${escapeAttribute(description)}">
  <link rel="icon" href="${language === "en" ? "../" : ""}favicon.svg" type="image/svg+xml">
  <link rel="icon" href="${language === "en" ? "../" : ""}favicon.ico" sizes="any">
  <link rel="icon" href="${language === "en" ? "../" : ""}favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="${language === "en" ? "../" : ""}apple-touch-icon.png">
  <link rel="stylesheet" href="${language === "en" ? "../" : ""}styles.css">`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "TMT Solutions GmbH", url: SITE_URL, email: "info@tmtsolutions.de", telephone: "+49 8382 279256 0", address: { "@type": "PostalAddress", streetAddress: "Ludwig-Kick-Str. 12", postalCode: "88131", addressLocality: "Lindau", addressCountry: "DE" } },
      { "@type": "LocalBusiness", "@id": `${SITE_URL}/#localbusiness`, name: "TMT Solutions GmbH", url: SITE_URL, email: "info@tmtsolutions.de", telephone: "+49 8382 279256 0", address: { "@type": "PostalAddress", streetAddress: "Ludwig-Kick-Str. 12", postalCode: "88131", addressLocality: "Lindau", addressCountry: "DE" } },
    ],
  };
  if (page.articleTitle) {
    jsonLd["@graph"].push({
      "@type": "Article",
      headline: language === "en" ? page.enArticleTitle : page.articleTitle,
      description: language === "en" ? page.enArticleDescription : page.articleDescription,
      datePublished: "2026-10-20",
      dateModified: "2026-10-20",
      inLanguage: language === "en" ? "en" : "de",
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: canonical,
    });
  }
  if (page.id === "home") {
    const faqs = language === "en" ? [
      ["What is Business Central?", "Business Central is Microsoft ERP software that supports core financial and operational processes."],
      ["Which businesses is Business Central for?", "Business Central is designed especially for small and midsize businesses."],
      ["Can Business Central be customized?", "Yes. In addition to standard features, extensions and integrations are available."],
      ["How is Business Central deployed?", "Depending on requirements, Business Central can run in the Microsoft Cloud or on-premises."],
    ] : [
      ["Was ist Business Central?", "Business Central ist ein ERP-System von Microsoft, das zentrale kaufmännische und operative Abläufe unterstützt."],
      ["Für welche Unternehmen eignet sich Business Central?", "Business Central richtet sich insbesondere an kleine und mittelständische Unternehmen."],
      ["Kann Business Central angepasst werden?", "Ja. Neben den Standardfunktionen sind Erweiterungen und Integrationen möglich."],
      ["Wie wird Business Central bereitgestellt?", "Je nach Anforderungen kann Business Central in der Microsoft Cloud oder lokal betrieben werden."],
    ];
    jsonLd["@graph"].push({ "@type": "FAQPage", mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) });
  }
  if (page.id === "not-found") jsonLd["@graph"] = [];
  return { title, tags: `${headTags}\n  ${stylesheetTag}`, jsonLd: `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` };
}

function renderPage(page, language) {
  const localizedSource = language === "en" ? path.join(ROOT, "source", "en", page.file) : "";
  const sourcePath = localizedSource && fs.existsSync(localizedSource) ? localizedSource : path.join(SOURCE, page.file);
  const source = fs.readFileSync(sourcePath, "utf8");
  const meta = seo(page, language);
  let html = source
    .replace(/\s+id="main-content"\s+id="top"/, ' id="main-content"')
    .replace(/<html\b[^>]*>/i, `<html lang="${language}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${meta.title}</title>`)
    .replace(/<meta\s+name="description"[^>]*>/i, "")
    .replace(/<link\b[^>]*rel="stylesheet"[^>]*>/gi, "")
    .replace(/<script\b[^>]*src="[^"]*script\.js"[^>]*><\/script>/gi, "")
    .replace("<!-- SITE_HEADER -->", header(page, language))
    .replace("<!-- SITE_FOOTER -->", footer(language));
  const prefix = language === "en" ? "../" : "";
  const noindex = page.id === "not-found" ? '<meta name="robots" content="noindex,follow">' : "";
  const structuredData = page.id === "not-found" ? "" : meta.jsonLd;
  const loaderLabel = language === "en" ? "Loading TMT Solutions" : "TMT Solutions wird geladen";
  const extra = `${meta.tags}\n  <meta name="theme-color" content="#f6f9f6">\n  ${noindex}\n  ${structuredData}\n  <script>document.documentElement.classList.add("page-loading");</script>\n  <script src="${prefix}script.js" defer></script>`;
  html = html.replace("</head>", `${extra}\n</head>`);
  html = html.replace(/<body\b[^>]*>/i, (body) => `${body}\n  <div class="page-loader" data-page-loader aria-hidden="true"><div class="page-loader__brand"><span class="logo__mark"><span>T</span><span class="logo__m">M</span><span>T</span></span><span class="logo__sub">Solutions</span></div><span class="visually-hidden">${loaderLabel}</span></div>`);
  if (language === "en" && sourcePath === path.join(SOURCE, page.file)) html = translateHtml(html, page);
  if (language === "en") html = html.replace(/\b(src|href)="assets\//g, '$1="../assets/');
  html = html.replace(/TMT%20Solutions%20Professional%20-%20Tech%20redesign\.html/g, language === "en" ? "index.html" : "index.html");
  html = html.replace(/[ \t]+$/gm, "");
  return html;
}

function build() {
  fs.mkdirSync(ENGLISH, { recursive: true });
  for (const page of pages) {
    const deSource = path.join(SOURCE, page.file);
    if (!fs.existsSync(deSource)) continue;
    fs.writeFileSync(path.join(ROOT, page.file), renderPage(page, "de"), "utf8");
    fs.writeFileSync(path.join(ENGLISH, page.file), renderPage(page, "en"), "utf8");
  }
  const urls = pages.filter((page) => page.id !== "not-found").flatMap((page) => [
    page.file === "index.html" ? `${SITE_URL}/` : `${SITE_URL}/${encodeURI(page.file)}`,
    `${SITE_URL}/en/${encodeURI(page.file)}`,
  ]);
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`, "utf8");
  fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`, "utf8");
  fs.rmSync(path.join(ROOT, "TMT Solutions Professional - Tech redesign.html"), { force: true });
}

build();
console.log(`Built ${pages.length} German and English static pages.`);
