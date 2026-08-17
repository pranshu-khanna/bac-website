import { Link } from "react-router-dom";

export default function EnrichmentReturnBar() {
  return (
    <div className="enrichment-return-bar" role="navigation" aria-label="Return to main site">
      <Link to="/" className="enrichment-return-link enrichment-return-link--primary">
        ← Bay Area Chess home
      </Link>
      <Link to="/enrichment" className="enrichment-return-link">
        Enrichment home
      </Link>
    </div>
  );
}
