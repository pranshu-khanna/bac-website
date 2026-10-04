/**
 * Builds a unified enrichment calendar from camps, clubs, after-school,
 * online classes, tournament team, and Rising Star data.
 */
const data = require("./enrichmentData");

const DAY_INDEX = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const MONTH_INDEX = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function fromDateKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

function addDays(date, n) {
  const next = new Date(date);
  next.setDate(next.getDate() + n);
  return next;
}

function parseLooseDate(text, fallbackYear = 2026) {
  if (!text) return null;
  const cleaned = String(text).replace(/\./g, "").trim();

  let m = cleaned.match(
    /(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\w*,?\s+([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i,
  );
  if (m) {
    const month = MONTH_INDEX[m[1].toLowerCase()];
    if (month != null) return new Date(Number(m[3]), month, Number(m[2]), 12, 0, 0, 0);
  }

  m = cleaned.match(/([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})/i);
  if (m) {
    const month = MONTH_INDEX[m[1].toLowerCase()];
    if (month != null) return new Date(Number(m[3]), month, Number(m[2]), 12, 0, 0, 0);
  }

  m = cleaned.match(/(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\w*,?\s+([A-Za-z]+)\s+(\d{1,2})\b/i);
  if (m) {
    const month = MONTH_INDEX[m[1].toLowerCase()];
    if (month != null) return new Date(fallbackYear, month, Number(m[2]), 12, 0, 0, 0);
  }

  m = cleaned.match(/([A-Za-z]+)\s+(\d{1,2})\b(?!\s*\d{4})/);
  if (m && MONTH_INDEX[m[1].toLowerCase()] != null) {
    return new Date(fallbackYear, MONTH_INDEX[m[1].toLowerCase()], Number(m[2]), 12, 0, 0, 0);
  }

  m = cleaned.match(/(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?/);
  if (m) {
    let year = m[3] ? Number(m[3]) : fallbackYear;
    if (year < 100) year += 2000;
    return new Date(year, Number(m[1]) - 1, Number(m[2]), 12, 0, 0, 0);
  }

  return null;
}

function parseTimeToMinutes(text) {
  if (!text) return null;
  const m = String(text)
    .toLowerCase()
    .replace(/\./g, "")
    .match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
  if (!m) return null;
  let hour = Number(m[1]);
  const minute = Number(m[2] || 0);
  const ampm = m[3];
  if (ampm === "pm" && hour < 12) hour += 12;
  if (ampm === "am" && hour === 12) hour = 0;
  if (!ampm && hour <= 7) hour += 12; // bare "5:15" in enrichment usually PM
  return hour * 60 + minute;
}

function parseTimeRange(text) {
  if (!text) return { startMinutes: null, endMinutes: null, timeLabel: "" };
  const parts = String(text).split(/[–—-]/);
  const startMinutes = parseTimeToMinutes(parts[0]);
  const endMinutes = parts[1] ? parseTimeToMinutes(parts[1]) : null;
  return {
    startMinutes,
    endMinutes,
    timeLabel: String(text).replace(/\s+/g, " ").trim(),
  };
}

function timeOfDayFromMinutes(minutes) {
  if (minutes == null) return "afternoon";
  const hour = Math.floor(minutes / 60);
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}

function normalizeRating(raw) {
  const text = String(raw || "").toLowerCase();
  if (!text || text.includes("all level") || text.includes("all levels")) return "All levels";
  if (text.includes("unrated") || text.includes("new player") || text.includes("absolute beginner")) {
    return "Unrated / New";
  }
  if (text.includes("master") || text.includes("800+") || text.includes("1400+")) return "Master";
  if (
    text.includes("uscf") ||
    text.includes("600") ||
    text.includes("500") ||
    text.includes("rated") ||
    /\d{3,4}\s*[-–]/.test(text)
  ) {
    return "Rated (USCF)";
  }
  if (text.includes("int") || text.includes("intermediate") || text.includes("u1100") || text.includes("u1250")) {
    return "Intermediate";
  }
  if (text.includes("beg") || text.includes("beginner")) return "Beginner";
  if (text.includes("new")) return "Unrated / New";
  return "All levels";
}

function eachWeekdayBetween(start, end, weekday, offKeys = new Set()) {
  if (!start || !end || weekday == null) return [];
  const dates = [];
  let cursor = new Date(start);
  while (cursor.getDay() !== weekday) cursor = addDays(cursor, 1);
  while (cursor <= end) {
    const key = toDateKey(cursor);
    if (!offKeys.has(key)) dates.push(new Date(cursor));
    cursor = addDays(cursor, 7);
  }
  return dates;
}

function parseOffDates(text, yearHint = 2026) {
  const keys = new Set();
  if (!text) return keys;
  const matches = String(text).match(/\d{1,2}\/\d{1,2}(?:\/\d{2,4})?/g) || [];
  for (const token of matches) {
    const d = parseLooseDate(token, yearHint);
    if (d) keys.add(toDateKey(d));
  }
  return keys;
}

function expandDateSpan(when, yearHint = 2026) {
  // "Nov 23–25 · Thanksgiving", "Sep 7 (Labor Day)", "Dec 28–31 · Winter"
  const m = String(when).match(
    /([A-Za-z]+)\s+(\d{1,2})(?:\s*[–—-]\s*(\d{1,2}))?(?:[^\d]|$)/,
  );
  if (!m) {
    const single = parseLooseDate(when, yearHint);
    return single ? [single] : [];
  }
  const month = MONTH_INDEX[m[1].toLowerCase()];
  if (month == null) return [];
  const startDay = Number(m[2]);
  const endDay = m[3] ? Number(m[3]) : startDay;
  const dates = [];
  for (let day = startDay; day <= endDay; day += 1) {
    dates.push(new Date(yearHint, month, day, 12, 0, 0, 0));
  }
  return dates;
}

function makeEvent(partial) {
  const startMinutes = partial.startMinutes ?? null;
  return {
    id: partial.id,
    date: partial.date,
    title: partial.title,
    category: partial.category,
    location: partial.location || "",
    timeLabel: partial.timeLabel || "",
    startMinutes,
    timeOfDay: timeOfDayFromMinutes(startMinutes),
    rating: partial.rating || "All levels",
    href: partial.href || "",
    detail: partial.detail || "",
  };
}

function eventsFromSchools() {
  const events = [];
  const campuses = data.afterschool?.schools?.campuses || [];
  for (const campus of campuses) {
    for (const program of campus.programs || []) {
      const start = parseLooseDate(program.startDate);
      const end = parseLooseDate(program.endDate);
      if (!start || !end) continue;
      // Skip archived historical school terms from the active calendar.
      if (end.getFullYear() < 2026) continue;
      const weekdayName = (program.days?.[0] || "").toLowerCase();
      const weekday = DAY_INDEX[weekdayName];
      if (weekday == null) continue;
      const offKeys = new Set(
        (program.noClassDates || []).map((d) => {
          const parsed = parseLooseDate(d);
          return parsed ? toDateKey(parsed) : null;
        }).filter(Boolean),
      );
      const { startMinutes, timeLabel } = parseTimeRange(
        `${program.startTime || ""}-${program.endTime || ""}`.replace(/^-|-$/g, "") ||
          program.scheduleLine,
      );
      const dates = eachWeekdayBetween(start, end, weekday, offKeys);
      for (const date of dates) {
        events.push(
          makeEvent({
            id: `school-${program.id}-${toDateKey(date)}`,
            date: toDateKey(date),
            title: campus.name,
            category: "Afterschool",
            location: campus.city || "",
            timeLabel: timeLabel || program.scheduleLine || "",
            startMinutes,
            rating: "All levels",
            href: program.registerHref || `/enrichment#afterschool`,
            detail: program.scheduleLine || program.term || "",
          }),
        );
      }
    }
  }
  return events;
}

function eventsFromClubs() {
  const events = [];
  const rows = data.clubs?.table?.rows || [];
  const seasonStart = new Date(2026, 8, 1, 12); // Sep 1 2026
  const seasonEnd = new Date(2026, 11, 31, 12); // Dec 31 2026
  const locationHref = Object.fromEntries(
    (data.clubs?.locations || []).map((loc) => {
      const key = loc.label.toLowerCase();
      return [key, loc.href];
    }),
  );

  for (const row of rows) {
    const [dayName, location, time, levels, fee, off] = row;
    const weekday = DAY_INDEX[String(dayName).toLowerCase()];
    if (weekday == null) continue;
    const offKeys = parseOffDates(off, 2026);
    const { startMinutes, timeLabel } = parseTimeRange(time);
    const href =
      Object.entries(locationHref).find(([label]) =>
        label.includes(String(location).toLowerCase().replace(/\s*\(new\)\s*/i, "").trim().split(" ")[0]),
      )?.[1] || data.clubs.ctaHref;

    for (const date of eachWeekdayBetween(seasonStart, seasonEnd, weekday, offKeys)) {
      events.push(
        makeEvent({
          id: `club-${location}-${toDateKey(date)}`.replace(/\s+/g, "-"),
          date: toDateKey(date),
          title: `${location} Club`,
          category: "Club",
          location: String(location).replace(/\s*\(NEW\)/i, "").trim(),
          timeLabel,
          startMinutes,
          rating: normalizeRating(levels),
          href,
          detail: `${levels}${fee ? ` · ${fee}` : ""}`,
        }),
      );
    }
  }

  const special = data.clubs?.specialEvent;
  if (special?.when) {
    const date = parseLooseDate(special.when, 2026);
    if (date) {
      const { startMinutes, timeLabel } = parseTimeRange(
        special.when.match(/(\d{1,2}:\d{2}\s*[–—-]\s*\d{1,2}:\d{2}\s*[AP]M)/i)?.[1] ||
          "5:30–8:30 PM",
      );
      events.push(
        makeEvent({
          id: `club-special-${toDateKey(date)}`,
          date: toDateKey(date),
          title: special.title,
          category: "Special",
          location: special.where || "",
          timeLabel,
          startMinutes,
          rating: "All levels",
          href: special.href,
          detail: special.cost || special.detail || "",
        }),
      );
    }
  }

  return events;
}

function eventsFromCamps() {
  const events = [];
  for (const loc of data.camps?.locations || []) {
    for (const session of loc.sessions || []) {
      const dates = expandDateSpan(session.when, 2026);
      for (const slot of session.slots || []) {
        const { startMinutes, timeLabel } = parseTimeRange(slot.label);
        const type = session.type || "Chess";
        for (const date of dates) {
          events.push(
            makeEvent({
              id: `camp-${loc.id}-${type}-${slot.label}-${toDateKey(date)}`.replace(/\s+/g, "-"),
              date: toDateKey(date),
              title: `${type} Camp · ${loc.name}`,
              category: "Camp",
              location: `${loc.name}${loc.venue ? ` · ${loc.venue}` : ""}`,
              timeLabel,
              startMinutes,
              rating: normalizeRating(type),
              href: slot.href,
              detail: session.when,
            }),
          );
        }
      }
    }
  }
  return events;
}

function eventsFromTeam() {
  const events = [];
  const point = (data.teams?.points || []).find((p) => p.toLowerCase().includes("meeting dates"));
  const datesText = point || "";
  const dateTokens = datesText.match(/\d{1,2}\/\d{1,2}/g) || [];
  const { startMinutes, timeLabel } = parseTimeRange("12:00–2:00 PM");
  for (const token of dateTokens) {
    const date = parseLooseDate(token, 2026);
    if (!date) continue;
    events.push(
      makeEvent({
        id: `team-${toDateKey(date)}`,
        date: toDateKey(date),
        title: "BAC Tournament Team",
        category: "Team",
        location: "Palo Alto · UUCPA",
        timeLabel,
        startMinutes,
        rating: "Rated (USCF)",
        href: data.teams.ctaHref,
        detail: data.teams.highlight?.where || "USCF 600–1600",
      }),
    );
  }
  return events;
}

function eventsFromRisingStar() {
  const when = data.risingStar?.highlight?.when;
  const date = parseLooseDate(when, 2026);
  if (!date) return [];
  const { startMinutes, timeLabel } = parseTimeRange(
    when.match(/(\d{1,2}:\d{2}\s*[–—-]\s*\d{1,2}:\d{2}\s*[AP]M)/i)?.[1] || "4:45–6:15 PM",
  );
  return [
    makeEvent({
      id: `rising-${toDateKey(date)}`,
      date: toDateKey(date),
      title: "Rising Star",
      category: "Rising Star",
      location: data.risingStar.highlight?.where || "Palo Alto",
      timeLabel,
      startMinutes,
      rating: "Unrated / New",
      href: data.risingStar.ctaHref,
      detail: data.risingStar.highlight?.cost || "",
    }),
  ];
}

function parseSessionLabel(label) {
  // "Wednesdays — Beginner to Advanced I · 5:15–6:15 PM (10/28–12/16)"
  const dayMatch = label.match(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)/i);
  const weekday = dayMatch ? DAY_INDEX[dayMatch[1].toLowerCase()] : null;
  const timeMatch = label.match(/(\d{1,2}:\d{2}\s*[–—-]\s*\d{1,2}:\d{2}\s*[AP]M)/i);
  const rangeMatch = label.match(/\((\d{1,2}\/\d{1,2})\s*[–—-]\s*(\d{1,2}\/\d{1,2})\)/);
  const levelPart = label.split("·")[0]?.split("—")[1]?.trim() || label;
  return {
    weekday,
    ...parseTimeRange(timeMatch?.[1] || "5:15–6:15 PM"),
    start: rangeMatch ? parseLooseDate(rangeMatch[1], 2026) : null,
    end: rangeMatch ? parseLooseDate(rangeMatch[2], 2026) : null,
    rating: normalizeRating(levelPart),
    levelLabel: levelPart,
  };
}

function eventsFromClasses() {
  const events = [];
  const sessions = [
    ...(data.classes?.currentSessions || []),
    ...(data.classes?.upcomingSessions || []),
  ];
  for (const session of sessions) {
    const parsed = parseSessionLabel(session.label);
    if (parsed.weekday == null || !parsed.start || !parsed.end) continue;
    for (const date of eachWeekdayBetween(parsed.start, parsed.end, parsed.weekday)) {
      events.push(
        makeEvent({
          id: `class-${parsed.levelLabel}-${toDateKey(date)}`.replace(/\s+/g, "-"),
          date: toDateKey(date),
          title: `Online · ${parsed.levelLabel}`,
          category: "Online",
          location: "Zoom + ChessKid",
          timeLabel: parsed.timeLabel,
          startMinutes: parsed.startMinutes,
          rating: parsed.rating,
          href: session.href,
          detail: session.label,
        }),
      );
    }
  }
  return events;
}

function buildEnrichmentCalendar() {
  const events = [
    ...eventsFromSchools(),
    ...eventsFromClubs(),
    ...eventsFromCamps(),
    ...eventsFromTeam(),
    ...eventsFromRisingStar(),
    ...eventsFromClasses(),
  ]
    .filter((event) => {
      const year = Number(event.date.slice(0, 4));
      return year === 2026 || year === 2027;
    })
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return (a.startMinutes ?? 0) - (b.startMinutes ?? 0);
    });

  const ratings = [...new Set(events.map((e) => e.rating))].sort();
  const months = [
    ...new Set(
      events.map((e) => {
        const d = fromDateKey(e.date);
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
      }),
    ),
  ].sort();
  const categories = [...new Set(events.map((e) => e.category))].sort();

  return {
    generatedAt: new Date().toISOString(),
    filters: {
      ratings,
      months,
      timesOfDay: ["morning", "afternoon", "evening"],
      categories,
    },
    events,
  };
}

module.exports = { buildEnrichmentCalendar };
