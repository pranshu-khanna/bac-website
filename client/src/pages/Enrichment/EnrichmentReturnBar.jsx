import { Link } from "react-router-dom";
import SectionLink from "../../components/SectionLink/SectionLink";

export default function EnrichmentReturnBar() {
  return (
    <div className="enrichment-return-bar" role="navigation" aria-label="Return to main site">
      <Link to="/" className="enrichment-return-link enrichment-return-link--primary">
        ← Bay Area Chess home
      </Link>
      <SectionLink section="enrichment" className="enrichment-return-link">
        Enrichment hub
      </SectionLink>
    </div>
  );
}
