import { Link } from "react-router-dom";
import "./NotFound.scss";

export default function NotFound() {
  return (
    <main className="content-main constrain not-found-page">
      <h1>Page not found</h1>
      <p className="muted">The page you requested does not exist.</p>
      <Link className="btn primary" to="/">
        Back to home
      </Link>
    </main>
  );
}
