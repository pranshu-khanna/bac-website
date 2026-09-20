import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";

const TOURNAMENT_LINKS = [
  { id: "tournaments", label: "Register" },
  { id: "leaderboard", label: "BA€OINS" },
  { id: "results", label: "Results" },
  { id: "faq", label: "FAQ" },
  { id: "about", label: "About us" },
  { id: "contact", label: "Contact", cta: true },
];

const ENRICHMENT_LINKS = [
  { id: "classes", label: "Classes" },
  { id: "camps", label: "Camps" },
  { id: "afterschool", label: "Afterschool" },
  { id: "clubs", label: "Clubs" },
  { id: "teams", label: "Teams" },
  { id: "rising-star", label: "Rising Star" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact", cta: true },
];

function navClass(active, cta, extra) {
  const parts = ["nav-link"];
  if (extra) parts.push(extra);
  if (cta) parts.push("nav-cta-link");
  if (active) parts.push("active");
  return parts.join(" ");
}

export default function Nav() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const enrichment = pathname === "/enrichment" || pathname.startsWith("/enrichment/");
  const current = (hash || "").replace(/^#/, "");
  const links = enrichment ? ENRICHMENT_LINKS : TOURNAMENT_LINKS;
  const sectionBase = enrichment ? "/enrichment" : "/";

  const goTournaments = (event) => {
    event.preventDefault();
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const goEnrichment = (event) => {
    event.preventDefault();
    if (pathname === "/enrichment") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate("/enrichment");
  };

  return (
    <nav className="nav nav--two-level" aria-label="Primary">
      <div className="nav-primary">
        <Link
          to="/"
          className={navClass(!enrichment, false, "nav-mode-link")}
          aria-current={!enrichment ? "page" : undefined}
          onClick={goTournaments}
        >
          Tournaments
        </Link>
        <Link
          to="/enrichment"
          className={navClass(enrichment, false, "nav-mode-link")}
          aria-current={enrichment ? "page" : undefined}
          onClick={goEnrichment}
        >
          Learn Chess
        </Link>
      </div>

      <div
        className="nav-secondary"
        aria-label={enrichment ? "Learn Chess sections" : "Tournament sections"}
      >
        {links.map((link) => {
          if (link.to) {
            const active = pathname === link.to || pathname.startsWith(`${link.to}/`);
            return (
              <Link key={link.to} to={link.to} className={navClass(active, link.cta)}>
                {link.label}
              </Link>
            );
          }

          const active = pathname === sectionBase && current === link.id;
          return (
            <SectionLink
              key={link.id}
              section={link.id}
              base={sectionBase}
              className={navClass(active, link.cta)}
            >
              {link.label}
            </SectionLink>
          );
        })}
      </div>
    </nav>
  );
}
