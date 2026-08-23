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
            <SectionLink section="leaderboard">BA€OINS</SectionLink>
            <Link to="/resources">Resources</Link>
          </div>
          <div className="footer-col">
            <h4>Enrichment</h4>
            <Link to="/enrichment">Enrichment home</Link>
            <Link to="/enrichment#clubs">Weekend clubs</Link>
            <Link to="/enrichment#camps">Chess camps</Link>
            <Link to="/enrichment#rising-star">Rising Stars</Link>
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
          © 2006–2026 Bay Area Chess · Designed by{" "}
          <a href="https://studiva.org" target="_blank" rel="noreferrer">
            Studiva
          </a>
        </div>
      </div>
    </footer>
  );
}
