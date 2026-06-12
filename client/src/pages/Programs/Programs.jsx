import { useEffect, useState } from "react";
import api from "../../axios";
import "./Programs.scss";

export default function Programs() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/programs").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="content-main constrain programs-page">
      <h1>{data.title}</h1>
      <p className="muted programs-intro">{data.intro}</p>
      <div className="home-pillar-grid">
        {data.programs.map((program) => (
          <a
            key={program.title}
            className="home-pillar"
            href={program.href}
            target="_blank"
            rel="noreferrer"
          >
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <span className="home-pillar-link">Learn more</span>
          </a>
        ))}
      </div>
    </main>
  );
}
