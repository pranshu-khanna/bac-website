import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import "./Header.scss";

export default function Header() {
  const { toggleTheme, isDark } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const fullName = user?.name?.trim() || "";
  const firstName = fullName.split(/\s+/)[0] || user?.email?.split("@")[0] || "Account";
  const accountLabel = firstName;

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
          <Link
            className={`header-top-link header-account-link${isAuthenticated ? " is-signed-in" : ""}`}
            to="/login"
            aria-label={isAuthenticated ? accountLabel : "Account"}
          >
            {isAuthenticated ? (
              <span className="header-account-name">{accountLabel}</span>
            ) : (
              <svg className="header-account-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
                <path
                  d="M5.5 19.25c1.6-3.1 3.95-4.5 6.5-4.5s4.9 1.4 6.5 4.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </Link>
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
