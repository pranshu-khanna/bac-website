import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";
import NavSearch from "./NavSearch";

const TOURNAMENT_LINKS = [
  { id: "tournaments", label: "Register" },
  { id: "leaderboard", label: "BA€OINS" },
  { id: "faq", label: "FAQ" },
  { id: "about", label: "About us" },
  { id: "contact", label: "Contact", cta: true },
];

const ENRICHMENT_LINKS = [
  { id: "calendar", label: "Calendar" },
  { id: "classes", label: "Classes" },
  { id: "camps", label: "Camps" },
  { id: "afterschool", label: "Afterschool" },
  { id: "clubs", label: "Clubs" },
  { id: "teams", label: "Teams" },
  { id: "rising-star", label: "Rising Star" },
  { id: "resources", label: "Resources" },
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

function NavMenu({
  menuKey,
  label,
  to,
  active,
  open,
  setOpen,
  onNavigate,
  links,
  sectionBase,
  current,
  pathname,
}) {
  const isOpen = open === menuKey;

  return (
    <div
      className={`nav-item${isOpen ? " is-open" : ""}`}
      onMouseEnter={() => setOpen(menuKey)}
      onMouseLeave={() => setOpen(null)}
    >
      <Link
        to={to}
        className={navClass(active, false, "nav-mode-link")}
        aria-current={active ? "page" : undefined}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(event) => {
          if (!isOpen) {
            event.preventDefault();
            setOpen(menuKey);
            return;
          }
          setOpen(null);
          onNavigate(event);
        }}
      >
        {label}
        <span className="nav-caret" aria-hidden>
          ▾
        </span>
      </Link>

      <div
        className="nav-dropdown"
        role="menu"
        aria-label={`${label} sections`}
        hidden={!isOpen}
      >
        {links.map((link) => {
          if (link.to) {
            const linkActive = pathname === link.to || pathname.startsWith(`${link.to}/`);
            return (
              <Link
                key={link.to}
                to={link.to}
                role="menuitem"
                className={navClass(linkActive, link.cta)}
              >
                {link.label}
              </Link>
            );
          }

          const linkActive = pathname === sectionBase && current === link.id;
          return (
            <SectionLink
              key={link.id}
              section={link.id}
              base={sectionBase}
              role="menuitem"
              className={navClass(linkActive, link.cta)}
            >
              {link.label}
            </SectionLink>
          );
        })}
      </div>
    </div>
  );
}

export default function Nav() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [open, setOpen] = useState(null);
  const enrichment = pathname === "/enrichment" || pathname.startsWith("/enrichment/");
  const current = (hash || "").replace(/^#/, "");

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

  useEffect(() => {
    setOpen(null);
  }, [pathname, hash]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!navRef.current?.contains(event.target)) setOpen(null);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <nav className="nav nav--dropdown" aria-label="Primary" ref={navRef}>
      <NavMenu
        menuKey="tournaments"
        label="Tournaments"
        to="/"
        active={!enrichment}
        open={open}
        setOpen={setOpen}
        onNavigate={goTournaments}
        links={TOURNAMENT_LINKS}
        sectionBase="/"
        current={current}
        pathname={pathname}
      />
      <NavMenu
        menuKey="enrichment"
        label="Enrichment"
        to="/enrichment"
        active={enrichment}
        open={open}
        setOpen={setOpen}
        onNavigate={goEnrichment}
        links={ENRICHMENT_LINKS}
        sectionBase="/enrichment"
        current={current}
        pathname={pathname}
      />
      <NavSearch
        onOpenChange={(isOpen) => {
          if (isOpen) setOpen(null);
        }}
      />
    </nav>
  );
}
