import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { useTheme } from "../../context/ThemeContext";
import "./Header.scss";

export default function Header() {
  const { toggleTheme, isDark } = useTheme();

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
          <Link className="header-top-link" to="/login">
            Login / Sign up
          </Link>
        </div>
      </div>

      <div className="header-main constrain">
        <Link to="/" className="logo-link">
          <Logo />
        </Link>
        <Nav />
      </div>
    </header>
  );
}
