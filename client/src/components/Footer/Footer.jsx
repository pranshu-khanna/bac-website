import { Link } from "react-router-dom";

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
            <a href="https://bayareachess.com/results/" target="_blank" rel="noreferrer">
              Ratings & results
            </a>
            <a href="https://bayareachess.com/policy/" target="_blank" rel="noreferrer">
              BAC policies
            </a>
            <Link to="/leaderboard">BACoin leaderboard</Link>
            <Link to="/resources">Resources</Link>
          </div>
          <div className="footer-col">
            <h4>Enrichment</h4>
            <a href="https://enrichment.bayareachess.com/weekend-clubs" target="_blank" rel="noreferrer">
              Weekend clubs
            </a>
            <a href="https://enrichment.bayareachess.com/All" target="_blank" rel="noreferrer">
              Chess camps
            </a>
            <a href="https://enrichment.bayareachess.com/RisingStars" target="_blank" rel="noreferrer">
              Rising Stars
            </a>
            <Link to="/programs">Programs</Link>
          </div>
          <div className="footer-col">
            <h4>Organization</h4>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact us</Link>
            <Link to="/request">Requests</Link>
            <Link to="/membership">Membership</Link>
            <a href="https://bayareachess.com/payhere" target="_blank" rel="noreferrer">
              Pay here
            </a>
          </div>
        </div>
        <div className="footer-copy">
          © 2006–2026 Bay Area Chess ·{" "}
          <Link to="/contact">contact us</Link>
        </div>
      </div>
    </footer>
  );
}
