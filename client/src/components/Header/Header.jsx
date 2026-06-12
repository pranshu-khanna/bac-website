import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const { toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="header-inner constrain">
        <Link to="/" className="logo-link">
          <Logo />
        </Link>
        <Nav />
        <div className="header-actions">
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            Theme
          </button>
          <Link className="nav-cta" to="/login">
            Login / Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
