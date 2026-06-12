const fs = require("fs");
const path = require("path");
const bacoinInfo = require("../data/bacoinInfo");

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

function parseLeaderboard(csvText) {
  const rows = parseCsv(csvText);
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
    const name = `${first} ${last}`.trim();
    if (!name) continue;

    entries.push({
      name,
      earned: Number.parseInt(earned, 10),
      balance: Number.parseInt(balance, 10),
      redeemed,
    });
  }

  return entries
    .sort((a, b) => b.earned - a.earned)
    .map((entry, idx) => ({ ...entry, rank: idx + 1 }));
}

exports.getLeaderboard = (_req, res) => {
  try {
    const csvPath = path.join(__dirname, "../data/bacoin-leaderboard.csv");
    const csv = fs.readFileSync(csvPath, "utf8");
    const entries = parseLeaderboard(csv);
    res.json({
      entries,
      totalPlayers: entries.length,
      updatedNote: "Data loaded from BACoin leaderboard CSV",
      bacoinInfo,
    });
  } catch (err) {
    res.status(500).json({ error: "Could not load leaderboard data." });
  }
};
