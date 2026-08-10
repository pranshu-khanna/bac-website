import { useEffect, useMemo, useState } from "react";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import "./Leaderboard.scss";

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
          <h3>BA€OINS current exchange rates</h3>
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
      .catch(() => setError("Could not load BA€OINS data."));
  }, []);

  const q = query.trim().toLowerCase();
  const isSearching = q.length > 0;

  const matches = useMemo(() => {
    if (!data?.entries || !isSearching) return [];
    return data.entries.filter((e) => e.name.toLowerCase().includes(q));
  }, [data, isSearching, q]);

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
          <p className="lb-loading">Loading BA€OINS…</p>
        </div>
      </PageFrame>
    );
  }

  return (
    <PageFrame embedded={embedded} className="leaderboard-page">
      <section className="lb-hero">
        <div className="constrain lb-hero-grid">
          <div>
            <h1 className="lb-title">BA€OINS</h1>
            <p className="lb-lead">
              Earn BA€ at camps, clubs, and rated tournaments — then redeem for trophies and medals.
            </p>
          </div>
          <div className="lb-hero-panel">
            <div className="lb-coin-stack" aria-hidden>
              <span className="lb-coin lb-coin--a">B</span>
              <span className="lb-coin lb-coin--b">A</span>
              <span className="lb-coin lb-coin--c">C</span>
            </div>
            <p className="lb-panel-tag">BA€</p>
          </div>
        </div>
      </section>

      <div className="constrain lb-body">
        <BacoinInfoPanel info={data.bacoinInfo} />

        <section className="lb-table-section lb-search-section">
          <div className="lb-table-head">
            <h2 className="lb-section-title">Find your balance</h2>
            <input
              className="lb-search-input"
              type="search"
              placeholder="Type your name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search BACoin balance by name"
            />
          </div>

          {!isSearching && (
            <p className="lb-table-hint">Start typing a name to see rank and BA€ totals.</p>
          )}

          {isSearching && (
            <>
              <p className="lb-table-hint">
                {matches.length === 0
                  ? `No matches for “${query.trim()}”.`
                  : `Showing ${matches.length} match${matches.length === 1 ? "" : "es"}.`}
              </p>
              {matches.length > 0 && (
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
                      {matches.map((entry) => (
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
              )}
            </>
          )}
        </section>
      </div>
    </PageFrame>
  );
}
