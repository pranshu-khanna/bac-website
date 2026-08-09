import { useLocation } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";

const LINKS = [
  { id: "tournaments", label: "Tournaments" },
  { id: "leaderboard", label: "Leaderboard" },
  { id: "enrichment", label: "Enrichment" },
  { id: "results", label: "Results" },
  { id: "faq", label: "FAQ" },
  { id: "about", label: "About" },
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
  const current = (hash || "").replace(/^#/, "");

  return (
    <nav className="nav" aria-label="Primary">
      {LINKS.map((link) => {
        const active = pathname === "/" && current === link.id;
        return (
          <SectionLink key={link.id} section={link.id} className={navClass(active, link.cta)}>
            {link.label}
          </SectionLink>
        );
      })}
    </nav>
  );
}
