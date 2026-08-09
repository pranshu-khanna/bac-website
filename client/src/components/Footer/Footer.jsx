import { Link } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner constrain">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>Tournaments</h4>
            <a href="https://bayareachess.com/events/tournament-list/" target="_blank" rel="noreferrer">
              Calendar
            </a>
            <SectionLink section="results">Ratings & results</SectionLink>
            <a href="https://bayareachess.com/policy/" target="_blank" rel="noreferrer">
              BAC policies
            </a>
            <SectionLink section="leaderboard">BACoin leaderboard</SectionLink>
            <Link to="/resources">Resources</Link>
          </div>
          <div className="footer-col">
            <h4>Enrichment</h4>
            <SectionLink section="enrichment">Enrichment hub</SectionLink>
            <Link to="/enrichment/launch/weekend-clubs">Weekend clubs</Link>
            <Link to="/enrichment/launch/camps">Chess camps</Link>
            <Link to="/enrichment/launch/rising-stars">Rising Stars</Link>
          </div>
          <div className="footer-col">
            <h4>Organization</h4>
            <SectionLink section="about">About</SectionLink>
            <SectionLink section="contact">Contact us</SectionLink>
            <Link to="/request">Requests</Link>
            <Link to="/membership">Membership</Link>
            <a href="https://bayareachess.com/payhere" target="_blank" rel="noreferrer">
              Pay here
            </a>
          </div>
        </div>
        <div className="footer-copy">
          © 2006–2026 Bay Area Chess · <SectionLink section="contact">contact us</SectionLink>
        </div>
      </div>
    </footer>
  );
}
