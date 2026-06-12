import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";
import "./Request.scss";

export default function Request() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/request").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="content-main constrain request-page">
      <h1>{data.title}</h1>
      <p className="muted">{data.intro}</p>
      <div className="panel">
        <p>
          Email <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a> or use our{" "}
          <Link to={data.contactPath}>contact form</Link>.
        </p>
      </div>
    </main>
  );
}
