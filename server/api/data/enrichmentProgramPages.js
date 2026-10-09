/**
 * Builds local /enrichment/* pages for calendar destinations that currently
 * live on enrichment.bayareachess.com (schools, camps, online events).
 * Registration CTAs still point at the live enrichment site when needed.
 */
const schoolMap = require("./enrichmentSchools");
const data = require("./enrichmentData");

const EXT = "https://enrichment.bayareachess.com";

function isIgnoredExternal(href) {
  if (!href) return false;
  const h = String(href).toLowerCase();
  return h.includes("docs.google.com") || h.includes("homeroom.com");
}

function isEnrichmentHost(href) {
  return typeof href === "string" && href.includes("enrichment.bayareachess.com");
}

function enrichmentPathToLocal(href) {
  if (!isEnrichmentHost(href) || isIgnoredExternal(href)) return null;
  try {
    const u = new URL(href);
    const path = u.pathname.replace(/\/+$/, "");
    if (!path || path === "/") return null;
    // /camp/foo → /enrichment/camp/foo ; /event/foo → /enrichment/event/foo ; /Slug → /enrichment/Slug
    return `/enrichment${path}`;
  } catch {
    return null;
  }
}

function schoolPrograms() {
  if (Array.isArray(schoolMap.programs) && schoolMap.programs.length) {
    return schoolMap.programs;
  }
  const out = [];
  for (const campus of schoolMap.campuses || []) {
    for (const program of campus.programs || []) {
      out.push({
        ...program,
        name: campus.name,
        school: campus.school || campus.name,
        city: campus.city,
        address: campus.address,
      });
    }
  }
  return out;
}

const schoolBySlug = new Map(schoolPrograms().map((p) => [p.slug || p.id, p]));

function buildSchoolPage(program) {
  const slug = program.slug || program.id;
  const points = [];
  if (program.days?.length) points.push(`Day: ${program.days.join(", ")}`);
  if (program.scheduleLine) points.push(program.scheduleLine);
  else if (program.startTime || program.endTime) {
    points.push(`Time: ${[program.startTime, program.endTime].filter(Boolean).join(" – ")}`);
  }
  if (program.term) points.push(`Term: ${program.term}`);
  else if (program.startDate || program.endDate) {
    points.push(`Dates: ${[program.startDate, program.endDate].filter(Boolean).join(" – ")}`);
  }
  if (program.noClassDates?.length) points.push(`No class: ${program.noClassDates.join("; ")}`);
  if (program.grades?.length) points.push(`Grades: ${program.grades.join(", ")}`);
  if (program.coaches?.length) points.push(`Coach: ${program.coaches.join(", ")}`);
  if (program.room) points.push(`Room: ${program.room}`);
  if (program.fee) points.push(`Fee: ${program.fee}`);

  const registerHref = program.registerHref || program.sourceUrl || `${EXT}/${slug}`;
  const links = [
    { label: "All after-school programs", href: "/enrichment#afterschool" },
    { label: "After-school FAQ", href: "/enrichment/afterschool-info" },
  ];
  if (program.flyerHref) links.unshift({ label: "Download flyer (PDF)", href: program.flyerHref });

  return {
    slug,
    kicker: program.eventType || "After-school",
    title: program.title || program.name || slug,
    intro: [program.school || program.name, program.city].filter(Boolean).join(" · "),
    notice: program.scheduleNote || null,
    highlight: {
      when: program.term || program.scheduleLine || "",
      where: [program.address, program.city].filter(Boolean).join(", ") || program.school || "",
      cost: program.fee || "",
      detail: program.scheduleLine || "",
    },
    points,
    paragraphs: program.blurb ? [program.blurb] : [],
    ctaLabel: registerHref ? "Register" : null,
    ctaHref: registerHref ? "/login" : null,
    links,
  };
}

function campSlugFromHref(href) {
  if (!href) return null;
  const m = String(href).match(/\/(?:enrichment\/)?camp\/([^/?#]+)/i);
  if (m) return m[1];
  if (String(href).startsWith("/enrichment/camp/")) {
    return String(href).slice("/enrichment/camp/".length).split(/[?#]/)[0];
  }
  return null;
}

function eventSlugFromHref(href) {
  if (!href) return null;
  const m = String(href).match(/\/(?:enrichment\/)?event\/([^/?#]+)/i);
  if (m) return m[1];
  return null;
}

function findCamp(slug) {
  for (const loc of data.camps?.locations || []) {
    for (const session of loc.sessions || []) {
      for (const slot of session.slots || []) {
        const slotSlug = campSlugFromHref(slot.href);
        if (slotSlug === slug) {
          return { loc, session, slot, slug };
        }
      }
    }
  }
  return null;
}

function findOnlineEvent(slug) {
  const sessions = [...(data.classes?.currentSessions || []), ...(data.classes?.upcomingSessions || [])];
  for (const session of sessions) {
    const s = eventSlugFromHref(session.href);
    if (s === slug) return { session, slug };
  }
  // Also accept slugs that still point at the live site in page session lists
  for (const session of sessions) {
    if (String(session.href || "").includes(slug)) return { session, slug };
  }
  return null;
}

function buildCampPage({ loc, session, slot, slug }) {
  const type = session.type || "Chess";
  const registerHref = `${EXT}/camp/${slug}`;
  return {
    slug: `camp/${slug}`,
    kicker: `${type} camp`,
    title: `${type} Camp · ${loc.name}`,
    intro: `${slot.label} · ${session.when}`,
    notice: "Registration is completed on the Bay Area Chess enrichment site.",
    highlight: {
      when: session.when,
      where: [loc.venue, loc.address || loc.name].filter(Boolean).join(" · "),
      cost: "",
      detail: `${type} · ${slot.label}`,
    },
    points: [
      `Location: ${loc.name}`,
      loc.venue ? `Venue: ${loc.venue}` : null,
      loc.address ? `Address: ${loc.address}` : null,
      `Session: ${session.when}`,
      `Hours: ${slot.label}`,
      type === "Master"
        ? "Master camps are typically for ages 7–17 (about USCF 800+ / online 1400+)."
        : null,
      type === "Strategy Games"
        ? "Strategy-Games camps focus on logic and board games — not chess."
        : null,
      "10% discount when booking 2+ camps in one transaction.",
    ].filter(Boolean),
    paragraphs: [
      data.camps?.intro ||
        "Seasonal chess and strategy camps on school breaks across the Bay Area.",
    ],
    ctaLabel: "Register",
    ctaHref: "/login",
    links: [
      { label: "All camps", href: "/enrichment#camps" },
      { label: "Camp guide", href: "/enrichment/camps-all" },
    ],
  };
}

function buildOnlineEventPage({ session, slug }) {
  return {
    slug: `event/${slug}`,
    kicker: "Online class",
    title: session.label || "Online chess class",
    intro:
      "60-minute live session via Zoom and ChessKid — lessons and gameplay in one class.",
    notice: "Sign in to register for this class.",
    highlight: {
      when: session.label,
      where: "Zoom + ChessKid · Pacific Time",
      cost: "",
      detail: "",
    },
    points: [
      "Track A terms include a championship on the final class",
      "New online students receive a ChessKid Gold membership (if not already in the BAC club)",
      "Orientations / Zoom links go out ~24 hours before the first session",
      "Target coach ratio 10:1 or better",
      "10% off extra items when registering for multiple classes in one checkout",
    ],
    paragraphs: [
      "Students should be logged into their BAC ChessKid account each session. Make-up options and homework expectations are covered in the course orientation email.",
    ],
    ctaLabel: "Register",
    ctaHref: "/login",
    links: [
      { label: "All online classes", href: "/enrichment#classes" },
      { label: "Online FAQ", href: "/enrichment/faq-online" },
      { label: "Skill levels", href: "/enrichment/skill-levels" },
    ],
  };
}

function resolveProgramPage(pagePath) {
  const raw = String(pagePath || "")
    .replace(/^\/+/, "")
    .replace(/^enrichment\//, "");
  if (!raw) return null;

  if (raw.startsWith("camp/")) {
    const slug = raw.slice("camp/".length);
    const found = findCamp(slug);
    return found ? buildCampPage(found) : buildCampPageFallback(slug);
  }

  if (raw.startsWith("event/")) {
    const slug = raw.slice("event/".length);
    const found = findOnlineEvent(slug);
    return found ? buildOnlineEventPage(found) : buildOnlineEventFallback(slug);
  }

  // Plain school / program slug (e.g. ChallengerShawnee26Fall)
  if (raw.includes("/")) return null;
  const program = schoolBySlug.get(raw);
  if (!program) return null;
  // Skip building local pages whose only registration path is Google Docs / Homeroom
  // when the calendar already links there — still allow page if source was enrichment.
  return buildSchoolPage(program);
}

function buildCampPageFallback(slug) {
  const pretty = slug.replace(/-/g, " ");
  return {
    slug: `camp/${slug}`,
    kicker: "Camp",
    title: pretty.replace(/\b\w/g, (c) => c.toUpperCase()),
    intro: "Seasonal Bay Area Chess enrichment camp.",
    notice: "Registration is completed on the Bay Area Chess enrichment site.",
    points: ["See the camps section for the full seasonal schedule."],
    ctaLabel: "Register",
    ctaHref: "/login",
    links: [
      { label: "All camps", href: "/enrichment#camps" },
      { label: "Camp guide", href: "/enrichment/camps-all" },
    ],
  };
}

function buildOnlineEventFallback(slug) {
  return {
    slug: `event/${slug}`,
    kicker: "Online class",
    title: "Online chess class",
    intro: "Live Zoom + ChessKid class from Bay Area Chess Enrichment.",
    notice: "Sign in to register for this class.",
    points: ["See the online classes page for the current term schedule."],
    ctaLabel: "Register",
    ctaHref: "/login",
    links: [
      { label: "All online classes", href: "/enrichment#classes" },
      { label: "Online FAQ", href: "/enrichment/faq-online" },
    ],
  };
}

function localHrefForCalendar(href) {
  if (!href || isIgnoredExternal(href)) return href || "";
  return enrichmentPathToLocal(href) || href;
}

function listProgramPageMeta() {
  const meta = [];
  for (const program of schoolPrograms()) {
    const slug = program.slug || program.id;
    if (!slug) continue;
    // Only expose pages for enrichment-hosted programs (skip pure Homeroom/Docs destinations)
    if (isIgnoredExternal(program.registerHref) && !isEnrichmentHost(program.sourceUrl)) continue;
    if (!isEnrichmentHost(program.sourceUrl) && !isEnrichmentHost(program.registerHref)) continue;
    meta.push({
      slug,
      title: program.title || program.name || slug,
      blurb: [program.school || program.name, program.city, program.scheduleLine].filter(Boolean).join(" · "),
      href: `/enrichment/${slug}`,
    });
  }
  for (const loc of data.camps?.locations || []) {
    for (const session of loc.sessions || []) {
      for (const slot of session.slots || []) {
        const slug = campSlugFromHref(slot.href);
        if (!slug) continue;
        meta.push({
          slug: `camp/${slug}`,
          title: `${session.type || "Chess"} Camp · ${loc.name} · ${slot.label}`,
          blurb: session.when,
          href: `/enrichment/camp/${slug}`,
        });
      }
    }
  }
  const sessions = [...(data.classes?.currentSessions || []), ...(data.classes?.upcomingSessions || [])];
  for (const session of sessions) {
    const slug = eventSlugFromHref(session.href);
    if (!slug) continue;
    meta.push({
      slug: `event/${slug}`,
      title: session.label,
      blurb: "Online Zoom + ChessKid class",
      href: `/enrichment/event/${slug}`,
    });
  }
  return meta;
}

module.exports = {
  resolveProgramPage,
  localHrefForCalendar,
  enrichmentPathToLocal,
  isIgnoredExternal,
  isEnrichmentHost,
  listProgramPageMeta,
  campSlugFromHref,
  eventSlugFromHref,
};
