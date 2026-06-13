import { NavLink } from "react-router-dom";

function navClass({ isActive }) {
  return isActive ? "nav-link active" : "nav-link";
}

export default function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <NavLink to="/tournaments" className={navClass}>
        Tournaments
      </NavLink>
      <NavLink to="/leaderboard" className={navClass}>
        Leaderboard
      </NavLink>
      <NavLink to="/enrichment" className={navClass}>
        Enrichment
      </NavLink>
      <NavLink to="/results" className={navClass}>
        Results
      </NavLink>
      <NavLink to="/faq" className={navClass}>
        FAQ
      </NavLink>
      <NavLink to="/about" className={navClass}>
        About
      </NavLink>
      <NavLink to="/contact" className={navClass}>
        Contact
      </NavLink>
    </nav>
  );
}
