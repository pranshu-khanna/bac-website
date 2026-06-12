import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";
import EnrichmentReturnBar from "./EnrichmentReturnBar";
import "./Enrichment.scss";

export default function Enrichment() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/enrichment").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <main className="content-main constrain enrichment-page">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  return (
    <main className="enrichment-page">
      <EnrichmentReturnBar />
      <div className="content-main constrain">
        <h1>{data.title}</h1>
        <p className="enrichment-intro">{data.intro}</p>

        <div className="enrichment-notice">
          <strong>Returning here:</strong> program links open{" "}
          <code>enrichment.bayareachess.com</code> in a new tab. Keep this tab open, or use the
          bar above to get back to the main website.
        </div>

        <div className="home-pillar-grid">
          {data.programs.map((program) => (
            <Link
              key={program.slug}
              className="home-pillar"
              to={`/enrichment/launch/${program.slug}`}
            >
              <h3>{program.title}</h3>
              <p>{program.description}</p>
              <span className="home-pillar-link">Open program ↗</span>
            </Link>
          ))}
        </div>

        <p className="enrichment-external-note">
          Or visit{" "}
          <Link to="/enrichment/launch/home">the full enrichment site</Link> directly.
        </p>
      </div>
    </main>
  );
}
