import { useEffect, useState } from "react";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import "./Tournaments.scss";

export default function Tournaments({ embedded = false }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/tournaments").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <PageFrame embedded={embedded} className="content-main constrain">
        <p className="muted">Loading…</p>
      </PageFrame>
    );
  }

  return (
    <PageFrame embedded={embedded} className="tournaments-page">
      <section className="home-events" aria-labelledby="tournaments-heading">
        <div className="constrain">
          <h1 id="tournaments-heading" className="home-events-title">
            {data.title}
          </h1>
          <p className="home-events-sub">
            <a href={data.openUrl || data.embedUrl} target="_blank" rel="noreferrer">
              {data.openLabel || "Click here to open directly in ChessRoster"}
            </a>
          </p>
        </div>
        <div className="chessroster-embed-wrap constrain">
          <iframe
            className="chessroster-embed"
            src={data.embedUrl}
            title="Bay Area Chess upcoming tournaments on ChessRoster"
            loading="lazy"
          />
        </div>
      </section>
    </PageFrame>
  );
}
