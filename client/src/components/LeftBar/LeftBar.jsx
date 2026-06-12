import { Link } from "react-router-dom";

export default function LeftBar({ title, links = [] }) {
  if (!links.length) return null;

  return (
    <aside className="left-bar" aria-label={title || "Sidebar"}>
      {title && <h2 className="left-bar-title">{title}</h2>}
      <nav className="left-bar-links">
        {links.map((link) =>
          link.path ? (
            <Link key={link.label} to={link.path}>
              {link.label}
            </Link>
          ) : (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ),
        )}
      </nav>
    </aside>
  );
}
