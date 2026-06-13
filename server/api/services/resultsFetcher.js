const fs = require("fs");
const path = require("path");
const siteData = require("../data/siteData");

const CACHE_PATH = path.join(__dirname, "../data/resultsCache.json");
const REFRESH_MS = siteData.resultsRefreshMs || 12 * 60 * 60 * 1000;

let memoryCache = null;
let refreshTimer = null;

function unwrapGoogleRedirect(url) {
  if (!url) return null;
  const cleaned = url.replace(/&amp;/g, "&");
  if (!cleaned.includes("url?q=")) return cleaned;

  try {
    const target = new URL(cleaned).searchParams.get("q");
    return target ? decodeURIComponent(target) : cleaned;
  } catch {
    return cleaned;
  }
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }

  return rows;
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseHtmlLinks(html) {
  const rows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
  const linkMap = new Map();

  rows.forEach((rowHtml) => {
    const cells = rowHtml.match(/<td[^>]*>[\s\S]*?<\/td>/gi) || [];
    if (cells.length < 6) return;

    const texts = cells.map(stripHtml);
    const id = texts[1];
    if (!id || !id.startsWith("BAC")) return;

    const cellLinks = cells.map((cell) => {
      const match = cell.match(/href="([^"]+)"/i);
      return match ? unwrapGoogleRedirect(match[1]) : null;
    });

    linkMap.set(id, {
      ratingUrl: cellLinks[4] || null,
      resultUrl: cellLinks[5] || null,
    });
  });

  return linkMap;
}

function parseResultsRows(csvRows, linkMap) {
  const entries = [];

  csvRows.slice(4).forEach((row) => {
    const date = (row[0] || "").trim();
    const id = (row[1] || "").trim();
    const name = (row[2] || "").trim();
    const prizeType = (row[3] || "").replace(/\s+/g, " ").trim();

    if (!date || !id || !name || !id.startsWith("BAC")) return;

    const links = linkMap.get(id) || {};

    entries.push({
      date,
      id,
      name,
      prizeType,
      ratingUrl: links.ratingUrl || null,
      resultUrl: links.resultUrl || null,
    });
  });

  return entries;
}

async function fetchSheetData() {
  const csvUrl = `${siteData.googleSheetsBase}/pub?output=csv&gid=${siteData.resultsSheetGid}`;
  const htmlUrl = `${siteData.googleSheetsBase}/pubhtml/sheet?headers=false&gid=${siteData.resultsSheetGid}`;

  const [csvRes, htmlRes] = await Promise.all([fetch(csvUrl), fetch(htmlUrl)]);

  if (!csvRes.ok) {
    throw new Error(`Results CSV fetch failed (${csvRes.status})`);
  }
  if (!htmlRes.ok) {
    throw new Error(`Results HTML fetch failed (${htmlRes.status})`);
  }

  const csvText = await csvRes.text();
  const htmlText = await htmlRes.text();
  const csvRows = parseCsv(csvText);
  const linkMap = parseHtmlLinks(htmlText);
  const entries = parseResultsRows(csvRows, linkMap);

  return {
    fetchedAt: new Date().toISOString(),
    entries,
  };
}

function readCacheFile() {
  if (!fs.existsSync(CACHE_PATH)) return null;

  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return null;
  }
}

function writeCacheFile(cache) {
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

function getResultsCache() {
  if (memoryCache) return memoryCache;
  const fileCache = readCacheFile();
  if (fileCache) {
    memoryCache = fileCache;
    return fileCache;
  }

  return {
    fetchedAt: null,
    entries: [],
  };
}

async function refreshResultsCache({ force = false } = {}) {
  const current = getResultsCache();
  const lastFetch = current.fetchedAt ? new Date(current.fetchedAt).getTime() : 0;
  const stale = Date.now() - lastFetch >= REFRESH_MS;

  if (!force && current.entries.length && !stale) {
    return current;
  }

  const cache = await fetchSheetData();
  memoryCache = cache;
  writeCacheFile(cache);
  console.log(`Results cache refreshed (${cache.entries.length} tournaments)`);
  return cache;
}

function startResultsRefreshScheduler() {
  if (refreshTimer) return;

  refreshResultsCache().catch((error) => {
    console.error("Initial results cache refresh failed:", error.message);
  });

  refreshTimer = setInterval(() => {
    refreshResultsCache({ force: true }).catch((error) => {
      console.error("Scheduled results cache refresh failed:", error.message);
    });
  }, REFRESH_MS);
}

module.exports = {
  getResultsCache,
  refreshResultsCache,
  startResultsRefreshScheduler,
};
