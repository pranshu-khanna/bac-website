import { useEffect, useState } from "react";
import api from "../../axios";
import "./Tournaments.scss";

export default function Tournaments() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/tournaments").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="tournaments-page">
      <section className="home-events" aria-labelledby="tournaments-heading">
        <div className="constrain">
          <h1 id="tournaments-heading" className="home-events-title">
            {data.title}
          </h1>
          <p className="home-events-sub">
            <a href={data.embedUrl} target="_blank" rel="noreferrer">
              {data.fullPageLabel}
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
    </main>
  );
}
