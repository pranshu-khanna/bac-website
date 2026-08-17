import { Link, useLocation } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";

const HOME_LINKS = [
  { id: "tournaments", label: "Tournaments" },
  { id: "leaderboard", label: "BA€OINS" },
  { to: "/enrichment", label: "Enrichment" },
  { id: "results", label: "Results" },
  { id: "faq", label: "FAQ" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact", cta: true },
];

const ENRICHMENT_LINKS = [
  { id: "classes", label: "Classes" },
  { id: "camps", label: "Camps" },
  { id: "afterschool", label: "Afterschool" },
  { id: "clubs", label: "Clubs" },
  { id: "teams", label: "Teams" },
  { id: "rising-star", label: "Rising Star" },
  { id: "contact", label: "Contact", cta: true },
];

function navClass(active, cta) {
  const parts = ["nav-link"];
  if (cta) parts.push("nav-cta-link");
  if (active) parts.push("active");
  return parts.join(" ");
}

export default function Nav() {
  const { pathname, hash } = useLocation();
  const enrichment = pathname === "/enrichment" || pathname.startsWith("/enrichment/");
  const current = (hash || "").replace(/^#/, "");
  const links = enrichment ? ENRICHMENT_LINKS : HOME_LINKS;
  const sectionBase = enrichment ? "/enrichment" : "/";

  return (
    <nav className="nav" aria-label="Primary">
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
    </nav>
  );
}
