import { useEffect, useState } from "react";
import api from "../../axios";
import RichText from "../../components/RichText/RichText";
import "./Results.scss";

function formatFetchedAt(value) {
  if (!value) return null;
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function Results() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/results").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <main className="content-main constrain">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  const updatedLabel = formatFetchedAt(data.fetchedAt);

  return (
    <main className="content-main results-page constrain">
      <header className="results-hero">
        <h1>{data.title}</h1>
        <p className="results-sheet-title">{data.sheetTitle}</p>
        {updatedLabel && <p className="results-updated">Last updated {updatedLabel}</p>}
      </header>

      <div className="results-tabs" aria-label="Results archives">
        {data.tabs.map((tab) =>
          tab.active ? (
            <span key={tab.label} className="results-tab results-tab--active">
              {tab.label}
            </span>
          ) : (
            <a
              key={tab.label}
              className="results-tab results-tab--link"
              href={tab.href}
              target="_blank"
              rel="noreferrer"
            >
              {tab.label}
            </a>
          ),
        )}
      </div>

      <div className="results-legends">
        {data.legends.map((legend) => (
          <p key={legend} className="results-legend">
            <RichText text={legend} />
          </p>
        ))}
      </div>

      <div className="results-table-wrap">
        <table className="results-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>ID</th>
              <th>Tournament</th>
              <th>Prize</th>
              <th>Links</th>
            </tr>
          </thead>
          <tbody>
            {data.entries.map((entry) => (
              <tr key={`${entry.id}-${entry.date}-${entry.name}`}>
                <td className="results-date">{entry.date}</td>
                <td className="results-id">{entry.id}</td>
                <td className="results-name">{entry.name}</td>
                <td className="results-prize">
                  <span className="results-prize-badge" title="Prize type">
                    {entry.prizeType}
                  </span>
                </td>
                <td className="results-links">
                  {entry.ratingUrl && (
                    <a
                      className="results-link-btn"
                      href={entry.ratingUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Rating
                    </a>
                  )}
                  {entry.resultUrl && (
                    <a
                      className="results-link-btn results-link-btn--secondary"
                      href={entry.resultUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Result
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
