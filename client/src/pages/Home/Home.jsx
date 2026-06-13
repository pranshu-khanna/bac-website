import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import "./Home.scss";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/home").then((res) => setData(res.data)).catch(() => setData(null));
  }, []);

  if (!data) {
    return <main className="content-main constrain"><p className="muted">Loading…</p></main>;
  }

  return (
    <main className="landing-home">
      <section className="landing-hero">
        <div className="landing-hero-bg" />
        <div className="landing-chess-pattern" />
        <div className="constrain landing-hero-content">
          <div>
            <div className="landing-hero-award">USCF Chess Club of the Year 2018</div>
            <h1 className="landing-hero-title">
              {data.hero.title} <em>{data.hero.titleEm}</em>
            </h1>
            <p className="landing-hero-copy">{data.hero.description}</p>
            <div className="landing-hero-buttons">
              <Link className="landing-btn-primary" to={data.hero.primaryCta.path}>
                {data.hero.primaryCta.label}
              </Link>
              <Link className="landing-btn-secondary" to={data.hero.secondaryCta.path}>
                {data.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div className="landing-hero-visual">
            <div className="landing-hero-board-wrap">
              <div className="landing-hero-board-glow" />
              <HeroVideo />
            </div>
          </div>
        </div>
      </section>

      <section className="landing-stats">
        <div className="constrain landing-stats-grid">
          {data.stats.map((stat) => (
            <div key={stat.label} className="landing-stat-item">
              <div className="landing-stat-num">{stat.value}</div>
              <div className="landing-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section landing-section--pale constrain">
        <p className="landing-section-label">What we offer</p>
        <h2 className="landing-section-title">Programs for every player</h2>
        <div className="landing-offerings-grid">
          {data.pillars.map((pillar) => (
            <div key={pillar.title} className="landing-offer-card">
              <h3 className="landing-offer-title">{pillar.title}</h3>
              <p className="landing-offer-desc">{pillar.description}</p>
              {pillar.path ? (
                <Link className="landing-offer-link" to={pillar.path}>
                  {pillar.linkLabel}
                </Link>
              ) : (
                <a className="landing-offer-link" href={pillar.href} target="_blank" rel="noreferrer">
                  {pillar.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
