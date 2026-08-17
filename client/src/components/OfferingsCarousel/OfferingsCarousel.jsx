import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionLink from "../SectionLink/SectionLink";

function OfferCard({ pillar, linkBase = "/" }) {
  return (
    <div className="landing-offer-card">
      <h3 className="landing-offer-title">{pillar.title}</h3>
      <p className="landing-offer-desc">{pillar.description}</p>
      {pillar.section ? (
        <SectionLink className="landing-offer-link" section={pillar.section} base={linkBase}>
          {pillar.linkLabel}
        </SectionLink>
      ) : pillar.path?.startsWith("/#") ? (
        <SectionLink className="landing-offer-link" section={pillar.path.slice(2)}>
          {pillar.linkLabel}
        </SectionLink>
      ) : pillar.path ? (
        <Link className="landing-offer-link" to={pillar.path}>
          {pillar.linkLabel}
        </Link>
      ) : (
        <a className="landing-offer-link" href={pillar.href} target="_blank" rel="noreferrer">
          {pillar.linkLabel}
        </a>
      )}
    </div>
  );
}

export default function OfferingsCarousel({ pillars, linkBase = "/" }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const count = pillars.length;

  const go = (dir) => {
    setIndex((current) => (current + dir + count) % count);
  };

  return (
    <div className="landing-offerings">
      <div className="landing-offerings-row">
        <button
          type="button"
          className="landing-offerings-arrow landing-offerings-arrow--prev"
          aria-label="Previous offering"
          onClick={() => go(-1)}
        >
          <span aria-hidden>‹</span>
        </button>

        <div
          className="landing-offerings-viewport"
          onTouchStart={(event) => {
            touchX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchX.current == null) return;
            const dx = (event.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
            if (dx <= -40) go(1);
            if (dx >= 40) go(-1);
            touchX.current = null;
          }}
        >
          <div className="landing-offerings-grid" style={{ "--offer-index": index }}>
            {pillars.map((pillar) => (
              <OfferCard key={pillar.title} pillar={pillar} linkBase={linkBase} />
            ))}
          </div>
        </div>

        <button
          type="button"
          className="landing-offerings-arrow landing-offerings-arrow--next"
          aria-label="Next offering"
          onClick={() => go(1)}
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div className="landing-offerings-dots" role="tablist" aria-label="Offerings">
        {pillars.map((pillar, i) => (
          <button
            key={pillar.title}
            type="button"
            role="tab"
            aria-label={pillar.title}
            aria-selected={i === index}
            className={`landing-offerings-dot${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
