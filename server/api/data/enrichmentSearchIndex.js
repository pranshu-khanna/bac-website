const home = require("./enrichmentData");
const { pages } = require("./enrichmentPages");
const { listProgramPageMeta } = require("./enrichmentProgramPages");

function pushText(parts, value) {
  if (!value) return;
  if (Array.isArray(value)) {
    value.forEach((item) => pushText(parts, item));
    return;
  }
  if (typeof value === "object") {
    Object.values(value).forEach((item) => pushText(parts, item));
    return;
  }
  if (typeof value === "string") parts.push(value);
}

function makeEntry({ id, title, blurb, href, type, keywords = [] }) {
  const haystack = [title, blurb, ...keywords]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

  return { id, title, blurb, href, type, haystack };
}

function buildIndex() {
  const entries = [];

  entries.push(
    makeEntry({
      id: "home",
      title: "Enrichment home",
      blurb: home.hero?.description || "Camps, clubs, classes, and teams",
      href: "/enrichment",
      type: "section",
      keywords: ["enrichment", "home", "programs", ...(home.stats || []).map((s) => s.label)],
    }),
  );

  const sectionMeta = [
    { key: "classes", href: "/enrichment#classes" },
    { key: "camps", href: "/enrichment#camps" },
    { key: "afterschool", href: "/enrichment#afterschool" },
    { key: "clubs", href: "/enrichment#clubs" },
    { key: "teams", href: "/enrichment#teams" },
    { key: "risingStar", href: "/enrichment#rising-star", id: "rising-star" },
    { key: "resources", href: "/enrichment#resources" },
    { key: "faq", href: "/enrichment#faq" },
  ];

  entries.push(
    makeEntry({
      id: "calendar",
      title: "Enrichment calendar",
      blurb: "All enrichment programs in one calendar — filter by rating, month, and time of day.",
      href: "/enrichment#calendar",
      type: "section",
      keywords: ["calendar", "schedule", "dates", "filter", "when"],
    }),
  );

  for (const meta of sectionMeta) {
    const section = home[meta.key];
    if (!section) continue;
    const keywords = [];
    pushText(keywords, section.points);
    pushText(keywords, section.notice);
    pushText(keywords, section.kicker);
    if (section.faqs) section.faqs.forEach((f) => pushText(keywords, [f.q, f.a]));
    if (section.table?.rows) pushText(keywords, section.table.rows.flat());
    if (section.locations) {
      section.locations.forEach((loc) => {
        pushText(keywords, [loc.name, loc.venue, loc.label]);
      });
    }
    if (section.schools?.campuses) {
      section.schools.campuses.forEach((s) => pushText(keywords, [s.name, s.city, s.school]));
    }
    if (section.sampleSchools) {
      section.sampleSchools.forEach((s) => pushText(keywords, [s.name, s.city]));
    }
    if (home.featured) {
      home.featured.forEach((item) => {
        if (item.section === (meta.id || meta.key)) {
          pushText(keywords, [item.title, item.detail, item.tag]);
        }
      });
    }

    entries.push(
      makeEntry({
        id: meta.id || meta.key,
        title: section.title || meta.key,
        blurb: section.intro || section.kicker || "",
        href: meta.href,
        type: "section",
        keywords,
      }),
    );
  }

  entries.push(
    makeEntry({
      id: "contact",
      title: "Contact enrichment",
      blurb: home.contact?.email || "enrich@bayareachess.com",
      href: "/enrichment#contact",
      type: "section",
      keywords: ["email", "support", "enrich", ...(home.contact?.notes || [])],
    }),
  );

  if (home.featured?.length) {
    home.featured.forEach((item, index) => {
      entries.push(
        makeEntry({
          id: `featured-${index}`,
          title: item.title,
          blurb: [item.detail, item.when, item.cost].filter(Boolean).join(" · "),
          href: item.section ? `/enrichment#${item.section}` : "/enrichment",
          type: "event",
          keywords: [item.tag, item.detail, item.when],
        }),
      );
    });
  }

  Object.values(pages).forEach((page) => {
    const keywords = [];
    pushText(keywords, page.kicker);
    pushText(keywords, page.intro);
    pushText(keywords, page.notice);
    pushText(keywords, page.points);
    pushText(keywords, page.paragraphs);
    if (page.highlight) pushText(keywords, Object.values(page.highlight));
    if (page.faqs) page.faqs.forEach((f) => pushText(keywords, [f.q, f.a]));
    if (page.levels) page.levels.forEach((l) => pushText(keywords, [l.name, l.detail]));
    if (page.schools) page.schools.forEach((s) => pushText(keywords, [s.name, s.city]));
    if (page.people) page.people.forEach((p) => pushText(keywords, p.name));
    if (page.quotes) page.quotes.forEach((q) => pushText(keywords, [q.text, q.by]));
    if (page.table?.rows) pushText(keywords, page.table.rows.flat());
    if (page.sessions) page.sessions.forEach((s) => pushText(keywords, s.label));
    if (page.links) page.links.forEach((l) => pushText(keywords, l.label));

    entries.push(
      makeEntry({
        id: `page-${page.slug}`,
        title: page.title,
        blurb: page.intro || page.kicker || "",
        href: `/enrichment/${page.slug}`,
        type: "page",
        keywords,
      }),
    );
  });

  listProgramPageMeta().forEach((meta) => {
    entries.push(
      makeEntry({
        id: `program-${meta.slug}`,
        title: meta.title,
        blurb: meta.blurb || "",
        href: meta.href,
        type: "program",
        keywords: [meta.slug, meta.blurb],
      }),
    );
  });

  return entries;
}

const INDEX = buildIndex();

function scoreEntry(entry, tokens) {
  let score = 0;
  const title = entry.title.toLowerCase();
  const blurb = (entry.blurb || "").toLowerCase();

  for (const token of tokens) {
    if (title === token) score += 12;
    else if (title.startsWith(token)) score += 8;
    else if (title.includes(token)) score += 5;

    if (blurb.includes(token)) score += 2;
    if (entry.haystack.includes(token)) score += 1;
  }

  if (tokens.length > 1 && tokens.every((t) => entry.haystack.includes(t))) {
    score += 4;
  }

  return score;
}

function searchEnrichment(query, limit = 12) {
  const raw = String(query || "").trim().toLowerCase();
  if (raw.length < 2) return [];

  const tokens = raw
    .split(/[^a-z0-9+]+/i)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);

  if (!tokens.length) return [];

  return INDEX.map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
    .slice(0, limit)
    .map(({ entry, score }) => ({
      id: entry.id,
      title: entry.title,
      blurb: entry.blurb,
      href: entry.href,
      type: entry.type,
      score,
    }));
}

module.exports = {
  searchEnrichment,
  getSearchIndex: () => INDEX,
};
