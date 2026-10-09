const FIELD_COVERED_BY_HIGHLIGHT = new Set([
  "Start Date",
  "End Date",
  "Start Time",
  "End Time",
  "Registration Fee",
  "School / Venue",
  "Room / Location",
  "Event Type",
]);

const SKIP_PARAGRAPH_PREFIXES = [
  /^register here\b/i,
  /^more info:?$/i,
  /^invite your friends\b/i,
  /^stay safe[!.,\s]*have fun/i,
  /^questions\?\s*check our\b/i,
  /^questions\?\s*more faq\b/i,
  /^bay area chess:\s*the largest\b/i,
  /^https?:\/\/(www\.)?enrichment\.bayareachess\.com\b/i,
  /^https?:\/\/(www\.)?bayareachess\.com\b/i,
  /^for all camps\b/i,
  /^all uscf events\b/i,
  /^support email:/i,
];

function isSiteBoilerplate(text) {
  const value = String(text || "").trim();
  if (!value) return true;
  const bare = value.replace(/^([•●*-]|\u2022)\s+/, "").trim();
  return (
    /enrichment\.bayareachess\.com\b.*\bis the bac enrichment site/i.test(bare) ||
    /(?:www\.)?bayareachess\.com\b.*\bis the bac tournament site/i.test(bare) ||
    SKIP_PARAGRAPH_PREFIXES.some((re) => re.test(bare))
  );
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[•●]/g, "")
    .replace(/[^a-z0-9:+./\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function softEqual(a, b) {
  const left = normalizeText(a);
  const right = normalizeText(b);
  if (!left || !right) return false;
  if (left === right) return true;
  // Containment only for near-duplicates — never treat short tokens like "online"
  // as matching a full paragraph that merely mentions them.
  const [short, long] = left.length <= right.length ? [left, right] : [right, left];
  if (short.length < 18) return false;
  if (short.length / long.length < 0.75) return false;
  return long.includes(short);
}

function cleanTitle(title, highlight = {}) {
  let next = String(title || "").trim();
  if (!next) return "Program details";

  next = next.replace(/^'+/, "").replace(/^26\s+/i, "");
  next = next.replace(/--+/g, " — ");
  next = next.replace(/\s+/g, " ").trim();

  if (highlight.when) {
    next = next
      .replace(/[-–—]?\s*(mon|tue|wed|thu|fri|sat|sun)[a-z]*s?\s*@\s*.+$/i, "")
      .replace(/\s*@\s*\d{1,2}:\d{2}\s*(am|pm)?(\s*[-–—]\s*\d{1,2}:\d{2}\s*(am|pm)?)?(\s*pst)?$/i, "")
      .replace(/\s*\([^)]*\d{1,2}\/\d{1,2}[^)]*\)\s*$/i, "")
      .replace(/\s*\(\d{1,2}\/\d{1,2}\s*[-–—]\s*\d{1,2}\/\d{1,2}[^)]*\)\s*$/i, "")
      .replace(/\s*[-–—]\s*$/g, "")
      .trim();
  }

  if (highlight.where && softEqual(next, highlight.where)) {
    next = String(title || "").trim();
  }

  // Light readable casing for shouty titles without destroying acronyms.
  if (next === next.toUpperCase() && next.length > 8) {
    next = next
      .toLowerCase()
      .replace(/\b([a-z])/g, (m) => m.toUpperCase())
      .replace(/\bBac\b/g, "BAC")
      .replace(/\bPst\b/g, "PST")
      .replace(/\bAm\b/g, "AM")
      .replace(/\bPm\b/g, "PM");
  }

  return next.replace(/\s+[-–—]\s*$/, "").trim() || String(title || "").trim();
}

function cleanIntro(intro, { title, highlight = {} }) {
  const value = String(intro || "").trim();
  if (!value) return "";
  if (softEqual(value, title)) return "";
  if (softEqual(value, highlight.where)) return "";
  if (/^online$/i.test(value)) return "";
  return value;
}

function buildFacts(page) {
  const facts = [];
  const highlight = page.highlight || {};
  const fields = page.fields || [];
  const used = new Set();

  const push = (label, value, href) => {
    const text = String(value || "").trim();
    if (!text) return;
    const key = normalizeText(`${label}:${text}`);
    if (used.has(key)) return;
    used.add(key);
    facts.push({ label, value: text, href: href || null });
  };

  if (highlight.when) push("Schedule", highlight.when);
  if (highlight.where) push("Location", highlight.where);
  if (highlight.cost) push("Fee", highlight.cost);
  if (highlight.detail) push("Notes", highlight.detail);

  const keepDespiteHighlight = new Set(["Flyer", "Dates without Classes", "Grades", "Lead Coach", "Second Coach"]);

  for (const field of fields) {
    if (!field?.label || !field?.value) continue;
    if (field.label === "Event Type" && page.kicker) continue;
    if (field.label === "School / Venue" && softEqual(field.value, highlight.where)) continue;
    if (field.label === "Room / Location" && softEqual(field.value, highlight.where)) continue;
    if (field.label === "Registration Fee" && softEqual(field.value, highlight.cost)) continue;
    if (
      highlight.when &&
      (field.label === "Start Date" ||
        field.label === "End Date" ||
        field.label === "Start Time" ||
        field.label === "End Time" ||
        field.label === "Day(s) of Week")
    ) {
      continue;
    }
    if (
      FIELD_COVERED_BY_HIGHLIGHT.has(field.label) &&
      (highlight.when || highlight.where || highlight.cost) &&
      !keepDespiteHighlight.has(field.label)
    ) {
      continue;
    }
    push(field.label, field.value, field.href);
  }

  return facts;
}

function isBulletLine(text) {
  return /^([•●*-]|\u2022)\s+/.test(text) || /^-\s+\S/.test(text);
}

function stripBullet(text) {
  return text.replace(/^([•●*-]|\u2022)\s+/, "").trim();
}

function labeledSplit(text) {
  const match = text.match(/^([A-Z][A-Za-z0-9 /&'+.-]{1,48}):\s*(.*)$/);
  if (!match) return null;
  const label = match[1].trim();
  const rest = match[2].trim();
  // Avoid treating times like "3:30" or URLs as labels.
  if (/^\d+$/.test(label)) return null;
  if (label.length < 3) return null;
  return { label, rest };
}

function isScheduleEcho(text, highlight = {}) {
  const n = normalizeText(text);
  if (!n) return true;
  if (highlight.when && softEqual(text, highlight.when)) return true;
  if (highlight.where && softEqual(text, highlight.where)) return true;
  if (highlight.cost && softEqual(text, highlight.cost)) return true;

  // Compact schedule lines already shown in the facts card.
  if (
    highlight.when &&
    /\b\d{1,2}:\d{2}\s*(am|pm)\b/i.test(text) &&
    (/\b(mon|tue|wed|thu|fri|sat|sun)/i.test(text) || /\d{1,2}\/\d{1,2}/.test(text)) &&
    text.length < 90
  ) {
    return true;
  }

  if (/^program term:/i.test(text) && highlight.when) return true;
  if (/^grades?\b/i.test(text) && text.length < 40) return true;
  if (/^mondays?\s*@/i.test(text) && highlight.when) return true;
  if (/^fridays?\s*\d/i.test(text) && highlight.when) return true;
  if (/^thursdays?\s*\d/i.test(text) && highlight.when) return true;
  if (/^off:\s*/i.test(text)) return false; // keep; often useful even if fields exist
  return false;
}

function shouldSkipParagraph(text, ctx) {
  const value = String(text || "").trim();
  if (!value) return true;
  if (softEqual(value, ctx.title)) return true;
  if (softEqual(value, ctx.intro)) return true;
  if (isScheduleEcho(value, ctx.highlight)) return true;
  if (SKIP_PARAGRAPH_PREFIXES.some((re) => re.test(value))) return true;
  if (/^this course is designed for\s*:/i.test(value) && value.length < 80) return true;
  if (/\bonline track\b/i.test(value) && value.length < 48) return true;
  // Short level echo already implied by title.
  if (/^levels?\b/i.test(value) && value.length < 80) {
    const titleN = normalizeText(ctx.title).replace(/\blevels?\b/g, "level");
    const levelN = normalizeText(value).replace(/\blevels?\b/g, "level");
    if (titleN && levelN && (titleN.includes(levelN) || levelN.includes(titleN))) return true;
  }
  return false;
}

function organizeParagraphs(paragraphs, ctx) {
  const notices = [];
  const overview = [];
  const sections = [];
  let current = null;

  const ensureSection = (title) => {
    if (current && current.title === title) return current;
    current = { title, blocks: [], bullets: [] };
    sections.push(current);
    return current;
  };

  const flushLooseBullets = (items) => {
    if (!items.length) return;
    ensureSection("Highlights").bullets.push(...items);
  };

  let pendingBullets = [];

  for (const raw of paragraphs || []) {
    const text = String(raw || "").trim();
    if (!text) continue;

    if (isBulletLine(text)) {
      const item = stripBullet(text);
      if (!item || isSiteBoilerplate(item) || shouldSkipParagraph(item, ctx)) continue;
      if (current) current.bullets.push(item);
      else pendingBullets.push(item);
      continue;
    }

    if (pendingBullets.length && !current) {
      flushLooseBullets(pendingBullets);
      pendingBullets = [];
    }

    if (/^(note:|>>)/i.test(text) || /^important\b/i.test(text) || /^online track\b/i.test(text)) {
      notices.push(text.replace(/^>>\s*/, "").replace(/^note:\s*/i, "").trim());
      current = null;
      continue;
    }

    if (isSiteBoilerplate(text) || shouldSkipParagraph(text, ctx)) {
      current = null;
      continue;
    }

    const labeled = labeledSplit(text);
    if (labeled) {
      const section = ensureSection(labeled.label);
      if (labeled.rest) section.blocks.push(labeled.rest);
      continue;
    }

    // Short ALL-CAPS / title-like lines become section headers when followed by content.
    if (text.length < 64 && /:$/.test(text)) {
      ensureSection(text.replace(/:$/, "").trim());
      continue;
    }

    if (current) {
      current.blocks.push(text);
    } else {
      overview.push(text);
    }
  }

  if (pendingBullets.length) flushLooseBullets(pendingBullets);

  const cleanedSections = sections
    .map((section) => ({
      ...section,
      bullets: section.bullets.filter((item) => !isSiteBoilerplate(item)),
      blocks: section.blocks.filter((block) => !isSiteBoilerplate(block)),
    }))
    .filter((section) => section.blocks.length || section.bullets.length)
    // Drop leftover "Highlights" buckets that only held site boilerplate.
    .filter((section) => !(section.title === "Highlights" && !section.blocks.length && !section.bullets.length));

  return {
    notices,
    overview: overview.filter((p) => !isSiteBoilerplate(p)),
    sections: cleanedSections,
  };
}

export function formatProgramPage(page) {
  if (!page) return null;

  const highlight = page.highlight || {};
  const title = cleanTitle(page.title, highlight);
  const intro = cleanIntro(page.intro, { title, highlight });
  const facts = buildFacts(page);
  const body = organizeParagraphs(page.paragraphs || [], {
    title,
    intro,
    highlight,
  });

  // Prefer field "Dates without Classes" over an "Off:" overview line duplication.
  const offFact = facts.find((f) => f.label === "Dates without Classes");
  const overview = body.overview.filter((p) => {
    if (offFact && /^off:\s*/i.test(p)) return false;
    // Drop ultra-short camp subtitle echoes already covered by title/facts.
    if (p.length < 36 && softEqual(p, title)) return false;
    if (p.length < 28 && /camp\b/i.test(p) && softEqual(title, p)) return false;
    return true;
  });

  return {
    ...page,
    title,
    intro,
    facts,
    notices: body.notices,
    overview,
    sections: body.sections,
  };
}
