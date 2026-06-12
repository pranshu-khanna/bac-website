import { useEffect, useState } from "react";
import api from "../../axios";
import "./Membership.scss";

export default function Membership() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/membership").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="content-main constrain membership-page">
      <h1>{data.title}</h1>
      <p className="muted">{data.intro}</p>
      <div className="panel membership-panel">
        <h2>Benefits</h2>
        <ul className="membership-perks">
          {data.perks.map((perk) => (
            <li key={perk}>
              <span className="perk-check">✓</span>
              {perk}
            </li>
          ))}
        </ul>
        <div className="membership-actions">
          <a className="btn primary" href={data.cta.href} target="_blank" rel="noreferrer">
            {data.cta.label}
          </a>
          <a className="btn secondary" href={data.payLink.href} target="_blank" rel="noreferrer">
            {data.payLink.label}
          </a>
        </div>
      </div>
    </main>
  );
}
