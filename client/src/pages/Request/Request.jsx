import { useEffect, useState } from "react";
import api from "../../axios";
import SectionLink from "../../components/SectionLink/SectionLink";
import "./Request.scss";

export default function Request() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/request").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  const contactSection = data.contactPath?.startsWith("/#")
    ? data.contactPath.slice(2)
    : "contact";

  return (
    <main className="content-main constrain request-page">
      <h1>{data.title}</h1>
      <p className="muted">{data.intro}</p>
      <div className="panel">
        <p>
          Email <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a> or use our{" "}
          <SectionLink section={contactSection}>contact form</SectionLink>.
        </p>
      </div>
    </main>
  );
}
