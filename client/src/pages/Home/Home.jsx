import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../axios";
import Footer from "../../components/Footer/Footer";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import SectionLink from "../../components/SectionLink/SectionLink";
import About from "../About/About";
import Contact from "../Contact/Contact";
import Enrichment from "../Enrichment/Enrichment";
import Faq from "../Faq/Faq";
import Leaderboard from "../Leaderboard/Leaderboard";
import Results from "../Results/Results";
import Tournaments from "../Tournaments/Tournaments";
import { HOME_SECTIONS, scrollToSection } from "../../utils/scrollToSection";
import { useHomeScroll } from "./useHomeScroll";
import "./Home.scss";

const SECTION_COMPONENTS = [
  { id: "tournaments", Component: Tournaments },
  { id: "leaderboard", Component: Leaderboard },
  { id: "enrichment", Component: Enrichment },
  { id: "results", Component: Results },
  { id: "faq", Component: Faq },
  { id: "about", Component: About },
  { id: "contact", Component: Contact },
];

function OfferCard({ pillar }) {
  return (
    <div className="landing-offer-card">
      <h3 className="landing-offer-title">{pillar.title}</h3>
      <p className="landing-offer-desc">{pillar.description}</p>
      {pillar.path?.startsWith("/#") ? (
        <SectionLink className="landing-offer-link" section={pillar.path.slice(2)}>
          {pillar.linkLabel}
        </SectionLink>
      ) : pillar.path ? (
        <a className="landing-offer-link" href={pillar.path}>
          {pillar.linkLabel}
        </a>
      ) : (
        <a className="landing-offer-link" href={pillar.href} target="_blank" rel="noreferrer">
          {pillar.linkLabel}
        </a>
      )}
    </div>
  );
}

function OfferingsCarousel({ pillars }) {
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
          <div
            className="landing-offerings-grid"
            style={{ "--offer-index": index }}
          >
            {pillars.map((pillar) => (
              <OfferCard key={pillar.title} pillar={pillar} />
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

export default function Home() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    api.get("/home").then((res) => setData(res.data)).catch(() => setData(null));
  }, []);

  useHomeScroll(Boolean(data));

  useEffect(() => {
    if (!data) return undefined;

    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash || !HOME_SECTIONS.includes(hash)) return undefined;

    // Initial load / hard navigation to a hash — menu clicks scroll themselves.
    const run = () => scrollToSection(hash, { behavior: "smooth" });
    const t = window.setTimeout(run, 50);
    return () => window.clearTimeout(t);
  }, [data, location.hash]);

  if (!data) {
    return (
      <main className="content-main constrain">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  return (
    <main className="landing-home">
      <section id="top" className="landing-hero home-panel home-panel--snap" data-entered="1">
        <div className="landing-hero-media" aria-hidden>
          <HeroVideo fullBleed />
          <div className="landing-hero-scrim" />
        </div>

        <div className="constrain landing-hero-content">
          <div className="landing-hero-copy-block">
            <div className="landing-hero-award">USCF Chess Club of the Year 2018</div>
            <h1 className="landing-hero-title">
              {data.hero.title} <em>{data.hero.titleEm}</em>
            </h1>
            <p className="landing-hero-copy">{data.hero.description}</p>
          </div>
        </div>
      </section>

      <section id="offerings" className="landing-section landing-section--pale home-panel home-panel--snap home-rest">
        <div className="home-panel-scroll">
          <div className="constrain home-panel-inner">
            <div className="landing-stats landing-stats--inline">
              <div className="landing-stats-grid">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="landing-stat-item">
                    <div className="landing-stat-num">{stat.value}</div>
                    <div className="landing-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <p className="landing-section-label">What we offer</p>
            <OfferingsCarousel pillars={data.pillars} />
          </div>
        </div>
      </section>

      {SECTION_COMPONENTS.map(({ id, Component }) => (
        <section key={id} id={id} className="home-page-section home-panel home-panel--snap">
          <div className="home-panel-scroll">
            <Component embedded />
            {id === "contact" ? <Footer /> : null}
          </div>
        </section>
      ))}
    </main>
  );
}
