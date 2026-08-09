import { useEffect, useState } from "react";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import RichText from "../../components/RichText/RichText";
import "./Faq.scss";

export default function Faq({ embedded = false }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/faq").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <PageFrame embedded={embedded} className="content-main constrain">
        <p className="muted">Loading…</p>
      </PageFrame>
    );
  }

  return (
    <PageFrame embedded={embedded} className="content-main faq-page constrain">
      <header className="faq-hero">
        <p className="faq-kicker">{data.kicker}</p>
        <h1>{data.title}</h1>
        <p className="faq-intro">
          <RichText text={data.intro} />
        </p>
      </header>

      <div className="faq-list">
        {data.items.map((item) => (
          <article key={item.q} className="faq-item">
            <h2 className="faq-question">
              <span className="faq-label">Q</span>
              {item.q}
            </h2>
            <div className="faq-answer">
              <span className="faq-label">A</span>
              <p>
                <RichText text={item.a} />
              </p>
            </div>
          </article>
        ))}
      </div>
    </PageFrame>
  );
}
