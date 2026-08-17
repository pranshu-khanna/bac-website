import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { useTheme } from "../../context/ThemeContext";
import "./Header.scss";

export default function Header() {
  const { toggleTheme, isDark } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const enrichment = pathname === "/enrichment" || pathname.startsWith("/enrichment/");
  const homePath = enrichment ? "/enrichment" : "/";

  const goHomeTop = (event) => {
    if (pathname !== homePath) return;
    event.preventDefault();
    navigate(homePath);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-inner constrain">
          {enrichment ? (
            <Link className="header-top-link" to="/">
              Tournament site
            </Link>
          ) : null}
          <button
            type="button"
            className="header-top-btn theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
          {enrichment ? (
            <a
              className="header-top-link"
              href="https://enrichment.bayareachess.com/user/login"
              target="_blank"
              rel="noreferrer"
            >
              Login / Sign up
            </a>
          ) : (
            <Link className="header-top-link" to="/login">
              Login / Sign up
            </Link>
          )}
        </div>
      </div>

      <div className="header-main constrain">
        <Link to={homePath} className="logo-link" onClick={goHomeTop}>
          <Logo variant={enrichment ? "enrichment" : "main"} />
        </Link>
        <Nav />
      </div>
    </header>
  );
}
