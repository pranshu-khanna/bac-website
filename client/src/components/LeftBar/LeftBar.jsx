import { Link } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";

export default function LeftBar({ title, links = [], children }) {
  if (!links.length && !children) return null;

  return (
    <aside className="left-bar" aria-label={title || "Sidebar"}>
      {title && <h2 className="left-bar-title">{title}</h2>}
      {links.length ? (
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
            const isMail = link.href?.startsWith("mailto:");
            return (
              <a
                key={link.label}
                href={link.href}
                {...(isMail ? {} : { target: "_blank", rel: "noreferrer" })}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      ) : null}
      {children}
    </aside>
  );
}
