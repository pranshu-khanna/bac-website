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

  const goHomeTop = (event) => {
    event.preventDefault();
    navigate("/");
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-inner constrain">
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
        <Link to="/" className="logo-link" onClick={goHomeTop}>
          <Logo />
        </Link>
        <Nav />
      </div>
    </header>
  );
}
