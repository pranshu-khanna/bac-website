import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../axios";
import Footer from "../../components/Footer/Footer";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import OfferingsCarousel from "../../components/OfferingsCarousel/OfferingsCarousel";
import { ENRICHMENT_SECTIONS, scrollToSection } from "../../utils/scrollToSection";
import { useHomeScroll } from "../Home/useHomeScroll";
import "../Home/Home.scss";
import "./Enrichment.scss";

function AccordionItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={`enr-faq${open ? " is-open" : ""}`}>
      <button type="button" className="enr-faq-q" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <span>{item.q}</span>
        <span className="enr-faq-chevron" aria-hidden />
      </button>
      {open ? <p className="enr-faq-a">{item.a}</p> : null}
    </article>
  );
}

function ProgramSection({ program }) {
  return (
    <div className="content-main constrain enr-program">
      <p className="landing-section-label">{program.kicker}</p>
      <h1>{program.title}</h1>
      {program.intro ? <p className="enr-intro">{program.intro}</p> : null}

      {program.highlight ? (
        <div className="enr-highlight">
          <p>
            <strong>{program.highlight.when}</strong>
          </p>
          <p>{program.highlight.where}</p>
          <p>Cost: {program.highlight.cost}</p>
        </div>
      ) : null}

      {program.points?.length ? (
        <ul className="enr-points">
          {program.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      ) : null}

      {program.body ? <p className="enr-body">{program.body}</p> : null}

      {program.table ? (
        <div className="enr-table-wrap">
          <table className="enr-table">
            <thead>
              <tr>
                {program.table.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {program.table.rows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell, i) => (
                    <td key={`${row[0]}-${i}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {program.faqs?.length ? (
        <div className="enr-faq-list">
          {program.faqs.map((item) => (
            <AccordionItem key={item.q} item={item} />
          ))}
        </div>
      ) : null}

      {program.ctaHref ? (
        <a className="enr-cta" href={program.ctaHref} target="_blank" rel="noreferrer">
          {program.ctaLabel} ↗
        </a>
      ) : null}

      {program.links?.length ? (
        <div className="enr-links">
          {program.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default function EnrichmentHome() {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    api.get("/enrichment").then((res) => setData(res.data)).catch(() => setData(null));
  }, []);

  useHomeScroll(Boolean(data));

  useEffect(() => {
    if (!data) return undefined;
    const hash = (location.hash || "").replace(/^#/, "");
    if (!hash || !ENRICHMENT_SECTIONS.includes(hash)) return undefined;
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
    <main className="landing-home enrichment-home">
      <section id="top" className="landing-hero home-panel home-panel--snap" data-entered="1">
        <div className="landing-hero-media" aria-hidden>
          <HeroVideo fullBleed />
          <div className="landing-hero-scrim" />
        </div>
        <div className="constrain landing-hero-content">
          <div className="landing-hero-copy-block">
            <div className="landing-hero-award">{data.hero.badge}</div>
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
            <OfferingsCarousel pillars={data.pillars} linkBase="/enrichment" />
          </div>
        </div>
      </section>

      {data.programs.map((program) => (
        <section key={program.id} id={program.id} className="home-page-section home-panel home-panel--snap">
          <div className="home-panel-scroll">
            <ProgramSection program={program} />
          </div>
        </section>
      ))}

      <section id="contact" className="home-page-section home-panel home-panel--snap">
        <div className="home-panel-scroll">
          <div className="content-main constrain enr-program">
            <p className="landing-section-label">{data.contact.kicker}</p>
            <h1>{data.contact.title}</h1>
            <p className="enr-intro">{data.contact.intro}</p>
            <ul className="enr-points">
              {data.contact.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <a className="enr-cta" href={`mailto:${data.contact.email}`}>
              Email {data.contact.email}
            </a>
            <p className="enr-body">
              Prefer the original enrichment portal?{" "}
              <a href={data.externalHome} target="_blank" rel="noreferrer">
                enrichment.bayareachess.com
              </a>
            </p>
          </div>
          <Footer />
        </div>
      </section>
    </main>
  );
}
