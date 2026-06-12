import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";
import "./Resources.scss";

export default function Resources() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/resources").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="content-main constrain resources-page">
      <h1>{data.title}</h1>
      <ul className="resources-list">
        {data.links.map((link) => (
          <li key={link.label}>
            {link.path ? (
              <Link to={link.path}>{link.label}</Link>
            ) : (
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
