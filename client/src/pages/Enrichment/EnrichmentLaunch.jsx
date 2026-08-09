import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../axios";
import SectionLink from "../../components/SectionLink/SectionLink";
import EnrichmentReturnBar from "./EnrichmentReturnBar";
import "./Enrichment.scss";

export default function EnrichmentLaunch() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    api.get("/enrichment").then((res) => setData(res.data));
  }, []);

  const program = useMemo(
    () => data?.programs?.find((item) => item.slug === slug),
    [data, slug],
  );

  const openExternal = (sameTab = false) => {
    if (!program?.href) return;

    if (sameTab) {
      window.location.assign(program.href);
      return;
    }

    const popup = window.open(program.href, "_blank", "noopener,noreferrer");
    if (popup) {
      popup.opener = null;
      setOpened(true);
    }
  };

  if (!data) {
    return (
      <main className="enrichment-page">
        <EnrichmentReturnBar />
        <div className="content-main constrain">
          <p className="muted">Loading…</p>
        </div>
      </main>
    );
  }

  if (!program) {
    return (
      <main className="enrichment-page">
        <EnrichmentReturnBar />
        <div className="content-main constrain enrichment-launch">
          <h1>Program not found</h1>
          <p className="muted">That enrichment link is not available.</p>
          <SectionLink section="enrichment" className="btn primary">
            Back to enrichment hub
          </SectionLink>
        </div>
      </main>
    );
  }

  return (
    <main className="enrichment-page">
      <EnrichmentReturnBar />
      <div className="content-main constrain enrichment-launch">
        <p className="enrichment-launch-eyebrow">External enrichment site</p>
        <h1>{program.title}</h1>
        <p className="enrichment-launch-lead">{program.description}</p>

        <div className="enrichment-launch-panel">
          <p>
            You are about to visit{" "}
            <a href={program.href} target="_blank" rel="noreferrer">
              enrichment.bayareachess.com
            </a>
            . We recommend opening it in a new tab so this page stays here as your way back to the
            main website.
          </p>

          <div className="enrichment-launch-actions">
            <button type="button" className="btn primary" onClick={() => openExternal(false)}>
              Open in new tab ↗
            </button>
            <button type="button" className="btn secondary" onClick={() => openExternal(true)}>
              Open in this tab
            </button>
          </div>

          {opened && (
            <p className="enrichment-launch-opened" role="status">
              Enrichment site opened in a new tab. Use the return bar above whenever you want to
              come back to Bay Area Chess.
            </p>
          )}
        </div>

        <SectionLink section="enrichment" className="enrichment-launch-back">
          ← Back to enrichment hub
        </SectionLink>
      </div>
    </main>
  );
}
