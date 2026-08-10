import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";

/** In-app link to a home page section (`/#tournaments`, etc.). */
export default function SectionLink({ section, children, className, ...rest }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const to = `/#${section}`;

  const onClick = (event) => {
    event.preventDefault();
    if (pathname !== "/") {
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
