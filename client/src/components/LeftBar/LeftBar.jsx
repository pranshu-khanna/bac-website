import { Link } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";

export default function LeftBar({ title, links = [] }) {
  if (!links.length) return null;

  return (
    <aside className="left-bar" aria-label={title || "Sidebar"}>
      {title && <h2 className="left-bar-title">{title}</h2>}
      <nav className="left-bar-links">
        {links.map((link) => {
          if (link.path?.startsWith("/#")) {
            return (
              <SectionLink key={link.label} section={link.path.slice(2)}>
                {link.label}
              </SectionLink>
            );
          }
          if (link.path) {
            return (
              <Link key={link.label} to={link.path}>
                {link.label}
              </Link>
            );
          }
          return (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
