import { useEffect, useMemo, useState } from "react";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
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

function BacoinInfoPanel({ info }) {
  if (!info) return null;

  return (
    <section className="lb-bacoin-info" aria-labelledby="bacoin-info-heading">
      <div className="lb-bacoin-info-head">
        <h2 id="bacoin-info-heading" className="lb-bacoin-title">
          {info.title}
        </h2>
        {info.intro && <p className="lb-bacoin-intro">{info.intro}</p>}
      </div>

      <div className="lb-bacoin-grid">
        {info.sections?.map((section) => (
          <article key={section.id} className="lb-bacoin-card">
            <h3>{section.heading}</h3>
            <p>{section.body}</p>
          </article>
        ))}

        <article className="lb-bacoin-card lb-bacoin-card--rates">
          <h3>BACoin current exchange rates</h3>
          <ul className="lb-rate-list">
            {info.exchangeRates?.map((rate) => (
              <li key={rate.coins}>
                <span className="lb-rate-coins">{rate.coins} BA€</span>
                <span className="lb-rate-eq">=</span>
                <span className="lb-rate-prize">{rate.prize}</span>
              </li>
            ))}
          </ul>
        </article>

        {info.redeem && (
          <article className="lb-bacoin-card lb-bacoin-card--redeem">
            <h3>{info.redeem.heading}</h3>
            <p>{info.redeem.body}</p>
            <a
              className="lb-btn lb-btn--primary"
              href={info.redeem.formUrl}
              target="_blank"
              rel="noreferrer"
            >
              {info.redeem.formLabel}
            </a>
          </article>
        )}
      </div>

      {info.balanceNote && <p className="lb-bacoin-balance-note">{info.balanceNote}</p>}
    </section>
  );
}

export default function Leaderboard({ embedded = false }) {
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

  const displayLimit = data?.displayLimit ?? 25;
  const isSearching = query.trim().length > 0;

  const visible = useMemo(() => {
    if (isSearching) return filtered;
    return filtered.slice(0, displayLimit);
  }, [filtered, isSearching, displayLimit]);

  const top3 = useMemo(() => {
    if (!data?.entries || isSearching) return [];
    return data.entries.slice(0, 3);
  }, [data, isSearching]);
  const variants = ["gold", "silver", "bronze"];

  if (error) {
    return (
      <PageFrame embedded={embedded} className="leaderboard-page">
        <div className="constrain lb-body">
          <p className="lb-alert">{error}</p>
        </div>
      </PageFrame>
    );
  }

  if (!data) {
    return (
      <PageFrame embedded={embedded} className="leaderboard-page">
        <div className="constrain lb-body">
          <p className="lb-loading">Loading leaderboard…</p>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame embedded={embedded} className="leaderboard-page">
      <section className="lb-hero">
        <div className="constrain lb-hero-grid">
          <div>
            <p className="lb-eyebrow">BACoin rewards</p>
            <h1 className="lb-title">BACoin leaderboard</h1>
            <p className="lb-lead">
              Track BACoins earned at camps, clubs, and rated tournaments.
            </p>
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
        <BacoinInfoPanel info={data.bacoinInfo} />

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
            <h2 className="lb-section-title">Top 25 leaderboard</h2>
            <input
              className="lb-search-input"
              type="search"
              placeholder="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search leaderboard"
            />
          </div>
          <p className="lb-table-hint">
            {isSearching
              ? `Showing ${visible.length} match${visible.length === 1 ? "" : "es"} across ${data.totalPlayers} players.`
              : `Showing top ${displayLimit} of ${data.totalPlayers} players. Search to find anyone.`}
          </p>
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
                {visible.map((entry) => (
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
        </section>
      </div>
    </PageFrame>
  );
}
