import { useEffect, useState } from "react";
import api from "../../axios";
import "./Events.scss";

export default function Events() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/events").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="content-main">
      <section className="home-events" aria-labelledby="events-heading">
        <div className="constrain">
          <h1 id="events-heading" className="home-events-title">
            {data.title}
          </h1>
          <p className="home-events-notice">{data.notice}</p>
          <p className="home-events-sub">
            <a href={data.embedUrl} target="_blank" rel="noreferrer">
              Open full page view
            </a>
          </p>
        </div>
        <div className="chessroster-embed-wrap constrain">
          <iframe
            className="chessroster-embed"
            src={data.embedUrl}
            title="Bay Area Chess upcoming events"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
