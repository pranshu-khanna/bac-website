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
        <div className="constrain tournaments-cta-panel">
          <h1 id="tournaments-heading" className="home-events-title">
            {data.title}
          </h1>
          <a
            className="tournaments-cta"
            href={data.registerUrl}
            target="_blank"
            rel="noreferrer"
          >
            {data.ctaLabel}
          </a>
        </div>
      </section>
    </PageFrame>
  );
}
