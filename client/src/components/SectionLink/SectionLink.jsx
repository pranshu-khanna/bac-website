import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";

/** In-app link to a snap-page section (`/#tournaments`, `/enrichment#camps`, etc.). */
export default function SectionLink({ section, children, className, base = "/", ...rest }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const to = `${base}#${section}`;

  const onClick = (event) => {
    event.preventDefault();
    if (pathname !== base) {
      navigate(to);
      return;
    }
    navigate(to, { replace: true });
    scrollToSection(section);
  };

  return (
    <Link to={to} className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
