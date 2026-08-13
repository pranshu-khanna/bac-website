import { useEffect, useId, useState } from "react";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import RichText from "../../components/RichText/RichText";
import "./Faq.scss";

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className={`faq-item${open ? " is-open" : ""}`}>
      <h2 className="faq-question-heading">
        <button
          type="button"
          className="faq-question"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="faq-question-text">
            <span className="faq-label">Q</span>
            {item.q}
          </span>
          <span className="faq-chevron" aria-hidden />
        </button>
      </h2>
      <div className="faq-answer-wrap" id={panelId} hidden={!open}>
        <div className="faq-answer">
          <span className="faq-label">A</span>
          <p>
            <RichText text={item.a} />
          </p>
        </div>
      </div>
    </article>
  );
}

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
          <FaqItem key={item.q} item={item} />
        ))}
      </div>
    </PageFrame>
  );
}
