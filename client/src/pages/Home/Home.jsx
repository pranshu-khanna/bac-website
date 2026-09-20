import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../axios";
import Footer from "../../components/Footer/Footer";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import OfferingsCarousel from "../../components/OfferingsCarousel/OfferingsCarousel";
import About from "../About/About";
import Contact from "../Contact/Contact";
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
  { id: "results", Component: Results },
  { id: "faq", Component: Faq },
  { id: "about", Component: About },
  { id: "contact", Component: Contact },
];

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
            <div className="landing-hero-award">USCF awarded chess club</div>
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
