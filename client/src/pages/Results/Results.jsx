import { useEffect, useState } from "react";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import "./Results.scss";

export default function Results({ embedded = false }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/results").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <PageFrame embedded={embedded} className="content-main constrain">
        <p className="muted">Loading…</p>
      </PageFrame>
    );
  }

  return (
    <PageFrame embedded={embedded} className="content-main results-page constrain">
      <header className="results-hero">
        <h1>{data.title}</h1>
        {data.intro && <p className="results-sheet-title">{data.intro}</p>}
      </header>

      <div className="results-tabs" aria-label="Results archives">
        {data.tabs.map((tab) => (
          <a
            key={tab.label}
            className="results-tab results-tab--link"
            href={tab.href}
            target="_blank"
            rel="noreferrer"
          >
            {tab.label}
          </a>
        ))}
      </div>
    </PageFrame>
  );
}
