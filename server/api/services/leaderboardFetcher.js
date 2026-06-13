const fs = require("fs");
const path = require("path");
const siteData = require("../data/siteData");

const CACHE_PATH = path.join(__dirname, "../data/leaderboardCache.json");
const NAME_CACHE_PATH = path.join(__dirname, "../data/leaderboardNameCache.json");
const SHEET_ID = siteData.bacoinSheetId || "1c8yb-Jqe4QcgE537STJX90LAzStBIwtha7b31TfuTUs";
const SHEET_GID = siteData.bacoinSheetGid || "0";
const REFRESH_MS = siteData.leaderboardRefreshMs || 12 * 60 * 60 * 1000;
const DISPLAY_LIMIT = siteData.leaderboardListLimit || 25;
const USCF_API = "https://ratings-api.uschess.org/api/v1/members";
const REQUEST_DELAY_MS = 450;
const SAVE_EVERY = 25;

let memoryCache = null;
let refreshTimer = null;
let refreshPromise = null;
let lastParsedEntries = [];
let lastFetchedAt = null;
let nameResolvePromise = null;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') {
      inQuotes = true;
      continue;
    }
    if (ch === ",") {
      row.push(cell);
      cell = "";
      continue;
    }
    if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i += 1;
      row.push(cell);
      if (row.some((c) => c !== "")) rows.push(row);
      row = [];
      cell = "";
      continue;
    }
    cell += ch;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}

function parseLeaderboardRows(rows) {
  const headerIdx = rows.findIndex(
    (r) => r[1]?.trim() === "Current" && r[2]?.trim() === "Spent",
  );
  if (headerIdx === -1) return [];

  const entries = [];
  for (let i = headerIdx + 1; i < rows.length; i += 1) {
    const row = rows[i];
    const earned = row[0]?.trim() ?? "";
    const balance = row[1]?.trim() ?? "";
    if (!/^\d+$/.test(earned) || !/^\d+$/.test(balance)) continue;

    const spentRaw = row[2]?.trim() ?? "";
    const redeemed = spentRaw === "" ? 0 : Number.parseInt(spentRaw, 10);
    if (spentRaw !== "" && Number.isNaN(redeemed)) continue;

    const first = (row[3] ?? "").trim();
    const last = (row[4] ?? "").trim();
    const uscfId = (row[5] ?? "").trim();
    const sheetName = `${first} ${last}`.replace(/\s+/g, " ").trim();
    if (!sheetName) continue;

    entries.push({
      name: sheetName,
      earned: Number.parseInt(earned, 10),
      balance: Number.parseInt(balance, 10),
      redeemed,
      uscfId: /^\d+$/.test(uscfId) ? uscfId : null,
    });
  }

  return entries
    .sort((a, b) => b.earned - a.earned)
    .map((entry, idx) => ({ ...entry, rank: idx + 1 }));
}

function loadNameCache() {
  try {
    return JSON.parse(fs.readFileSync(NAME_CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveNameCache(cache) {
  fs.writeFileSync(NAME_CACHE_PATH, JSON.stringify(cache, null, 2));
}

function cleanSheetName(name) {
  return name.replace(/\.+$/, "").trim();
}

function toPublicEntry(entry) {
  return {
    rank: entry.rank,
    name: entry.name,
    earned: entry.earned,
    balance: entry.balance,
    redeemed: entry.redeemed,
  };
}

function applyCachedNames(entries, nameCache) {
  return entries.map((entry) => {
    if (entry.uscfId && nameCache[entry.uscfId]) {
      return { ...entry, name: nameCache[entry.uscfId] };
    }
    return { ...entry, name: cleanSheetName(entry.name) };
  });
}

async function fetchUscfName(memberId) {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const res = await fetch(`${USCF_API}/${memberId}`, {
      headers: { Accept: "application/json" },
    });

    if (res.status === 429) {
      await sleep(Math.min(30000, 2000 * (attempt + 1)));
      continue;
    }

    if (!res.ok) return null;

    const data = await res.json();
    const name = `${data.firstName || ""} ${data.lastName || ""}`.trim();
    return name || null;
  }

  return null;
}

function writeCache(entries, fetchedAt) {
  const cache = {
    entries: entries.map(toPublicEntry),
    totalPlayers: entries.length,
    displayLimit: DISPLAY_LIMIT,
    fetchedAt,
  };
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  memoryCache = cache;
  return cache;
}

function publishEntries(entries) {
  if (!lastFetchedAt) return;
  writeCache(entries, lastFetchedAt);
}

async function resolveMissingNames() {
  if (!lastParsedEntries.length) return;

  const cache = loadNameCache();
  const missingIds = [
    ...new Set(
      lastParsedEntries
        .filter((entry) => entry.uscfId && !cache[entry.uscfId])
        .map((entry) => entry.uscfId),
    ),
  ];

  if (!missingIds.length) {
    publishEntries(applyCachedNames(lastParsedEntries, cache));
    return;
  }

  console.log(`Resolving ${missingIds.length} USCF names…`);
  let resolved = 0;

  for (const uscfId of missingIds) {
    try {
      const fullName = await fetchUscfName(uscfId);
      if (fullName) {
        cache[uscfId] = fullName;
        resolved += 1;
      }
    } catch {
      // Skip failed lookups; sheet name remains as fallback.
    }

    if (resolved > 0 && resolved % SAVE_EVERY === 0) {
      saveNameCache(cache);
      publishEntries(applyCachedNames(lastParsedEntries, cache));
    }

    await sleep(REQUEST_DELAY_MS);
  }

  saveNameCache(cache);
  publishEntries(applyCachedNames(lastParsedEntries, cache));
  console.log(`USCF name resolution finished (${Object.keys(cache).length} cached names)`);
}

function queueNameResolution() {
  if (nameResolvePromise) return nameResolvePromise;

  nameResolvePromise = resolveMissingNames()
    .catch((err) => {
      console.error("USCF name resolution failed:", err.message);
    })
    .finally(() => {
      nameResolvePromise = null;
    });

  return nameResolvePromise;
}

async function fetchSheetCsv() {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet fetch failed (${res.status})`);
  return res.text();
}

async function refreshLeaderboardCache({ force = false } = {}) {
  if (refreshPromise && !force) return refreshPromise;

  refreshPromise = (async () => {
    const csv = await fetchSheetCsv();
    lastParsedEntries = parseLeaderboardRows(parseCsv(csv));
    lastFetchedAt = new Date().toISOString();

    const nameCache = loadNameCache();
    const withNames = applyCachedNames(lastParsedEntries, nameCache);
    const cache = writeCache(withNames, lastFetchedAt);

    console.log(
      `Leaderboard cache refreshed (${lastParsedEntries.length} players, ${Object.keys(nameCache).length} names cached)`,
    );

    queueNameResolution();
    return cache;
  })();

  try {
    return await refreshPromise;
  } finally {
    refreshPromise = null;
  }
}

function loadCacheFromDisk() {
  try {
    const cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
    memoryCache = cache;
    return cache;
  } catch {
    return null;
  }
}

function getLeaderboardCache() {
  const disk = loadCacheFromDisk();
  if (disk) return disk;
  if (memoryCache) return memoryCache;
  return { entries: [], totalPlayers: 0, displayLimit: DISPLAY_LIMIT, fetchedAt: null };
}

function startLeaderboardRefreshScheduler() {
  refreshLeaderboardCache({ force: true }).catch((err) => {
    console.error("Initial leaderboard refresh failed:", err.message);
    loadCacheFromDisk();
    queueNameResolution();
  });

  if (refreshTimer) clearInterval(refreshTimer);
  refreshTimer = setInterval(() => {
    refreshLeaderboardCache({ force: true }).catch((err) => {
      console.error("Leaderboard refresh failed:", err.message);
    });
  }, REFRESH_MS);
}

module.exports = {
  refreshLeaderboardCache,
  getLeaderboardCache,
  startLeaderboardRefreshScheduler,
  queueNameResolution,
};
