import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";

/** In-app link to a home page section (`/#tournaments`, etc.). */
export default function SectionLink({ section, children, className, ...rest }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const to = `/#${section}`;

  const onClick = (event) => {
    if (pathname !== "/") return;
    event.preventDefault();
    navigate(to);
    // Wait a tick so the section is in the DOM / layout is stable.
    requestAnimationFrame(() => scrollToSection(section));
  };

  return (
    <Link to={to} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
