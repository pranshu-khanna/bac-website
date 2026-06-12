import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";
import "./Leaderboard.scss";

function PodiumSlot({ entry, variant }) {
  return (
    <div className={`lb-podium-slot lb-podium--${variant}`}>
      <div className="lb-podium-rank">#{entry.rank}</div>
      <div className="lb-podium-name">{entry.name}</div>
      <div className="lb-podium-stat">
        <span className="lb-podium-label">Earned</span>
        <span className="lb-podium-value">{entry.earned}</span>
      </div>
      <div className="lb-podium-stat">
        <span className="lb-podium-label">Balance</span>
        <span className="lb-podium-value">{entry.balance}</span>
      </div>
      <div className="lb-podium-stat lb-podium-stat--accent">
        <span className="lb-podium-label">Redeemed</span>
        <span className="lb-podium-value">{entry.redeemed}</span>
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api
      .get("/leaderboard")
      .then((res) => setData(res.data))
      .catch(() => setError("Could not load leaderboard data."));
  }, []);

  const filtered = useMemo(() => {
    if (!data?.entries) return [];
    const q = query.trim().toLowerCase();
    if (!q) return data.entries;
    return data.entries.filter((e) => e.name.toLowerCase().includes(q));
  }, [data, query]);

  const top3 = filtered.slice(0, 3);
  const variants = ["gold", "silver", "bronze"];

  if (error) {
    return (
      <main className="leaderboard-page">
        <div className="constrain lb-body">
          <p className="lb-alert">{error}</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="leaderboard-page">
        <div className="constrain lb-body">
          <p className="lb-loading">Loading leaderboard…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="leaderboard-page">
      <section className="lb-hero">
        <div className="constrain lb-hero-grid">
          <div>
            <p className="lb-eyebrow">BACoin rewards</p>
            <h1 className="lb-title">Tournament leaderboard</h1>
            <p className="lb-lead">
              Track BACoins earned at camps, clubs, and rated tournaments. {data.updatedNote}
            </p>
            <div className="lb-hero-actions">
              <Link className="lb-btn lb-btn--primary" to="/membership">
                Membership info
              </Link>
              <Link className="lb-btn btn secondary" to="/">
                Back to home
              </Link>
            </div>
          </div>
          <div className="lb-hero-panel">
            <div className="lb-coin-stack" aria-hidden>
              <span className="lb-coin lb-coin--a">B</span>
              <span className="lb-coin lb-coin--b">A</span>
              <span className="lb-coin lb-coin--c">C</span>
            </div>
            <p className="lb-panel-tag">BACoins</p>
          </div>
        </div>
      </section>

      <div className="constrain lb-body">
        <div className="lb-stats">
          <div className="lb-stat-card">
            <span className="lb-stat-label">Players</span>
            <span className="lb-stat-value">{data.totalPlayers}</span>
          </div>
          <div className="lb-stat-card lb-stat-card--meta">
            <span className="lb-stat-label">Showing</span>
            <span className="lb-stat-value lb-stat-value--sm">{filtered.length} results</span>
          </div>
        </div>

        {top3.length > 0 && (
          <section className="lb-podium-section">
            <h2 className="lb-section-title">Top players</h2>
            <div className="lb-podium">
              {top3.map((entry, idx) => (
                <PodiumSlot key={entry.rank} entry={entry} variant={variants[idx]} />
              ))}
            </div>
          </section>
        )}

        <section className="lb-table-section">
          <div className="lb-table-head">
            <h2 className="lb-section-title">Full leaderboard</h2>
            <input
              className="lb-search-input"
              type="search"
              placeholder="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search leaderboard"
            />
          </div>
          <p className="lb-table-hint">Sorted by total BACoins earned.</p>
          <div className="lb-table-wrap">
            <table className="lb-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Earned</th>
                  <th>Balance</th>
                  <th>Redeemed</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 100).map((entry) => (
                  <tr key={entry.rank} className={entry.rank <= 5 ? "lb-row--elite" : ""}>
                    <td className="lb-rank-cell">
                      <span className="lb-rank-badge">{entry.rank}</span>
                    </td>
                    <td className="lb-name-cell">{entry.name}</td>
                    <td className="lb-num">{entry.earned}</td>
                    <td className="lb-num">{entry.balance}</td>
                    <td className="lb-num">{entry.redeemed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 100 && (
            <p className="lb-more-hint">Showing top 100 matches. Refine your search to find others.</p>
          )}
        </section>
      </div>
    </main>
  );
}
