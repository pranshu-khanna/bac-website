import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../../axios";
import Footer from "../../components/Footer/Footer";
import HeroVideo from "../../components/HeroVideo/HeroVideo";
import OfferingsCarousel from "../../components/OfferingsCarousel/OfferingsCarousel";
import Contact from "../Contact/Contact";
import { ENRICHMENT_SECTIONS, scrollToSection } from "../../utils/scrollToSection";
import { useHomeScroll } from "../Home/useHomeScroll";
import "../Home/Home.scss";
import "./Enrichment.scss";
import SchoolsMap from "./SchoolsMap";
import CampsMap from "./CampsMap";
import EnrichmentCalendar from "./EnrichmentCalendar";

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

function isLocalHref(href) {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

function ExtLink({ href, children, className }) {
  if (!href) return null;
  if (isLocalHref(href)) {
    return (
      <Link to={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function Cta({ href, label, compact }) {
  if (!href) return null;
  const external = !isLocalHref(href);
  return (
    <ExtLink href={href} className={`enr-cta${compact ? " enr-cta--compact" : ""}`}>
      {label}
      {external ? " ↗" : ""}
    </ExtLink>
  );
}

function LinkRow({ links }) {
  if (!links?.length) return null;
  return (
    <div className="enr-links">
      {links.map((link) => (
        <ExtLink key={link.href} href={link.href}>
          {link.label}
        </ExtLink>
      ))}
    </div>
  );
}

function Points({ items }) {
  if (!items?.length) return null;
  return (
    <ul className="enr-points">
      {items.map((point) => (
        <li key={point}>{point}</li>
      ))}
    </ul>
  );
}

function SessionList({ sessions, title }) {
  if (!sessions?.length) return null;
  return (
    <div className="enr-session-block">
      {title ? <h3 className="enr-subhead">{title}</h3> : null}
      <ul className="enr-sessions">
        {sessions.map((session) => (
          <li key={`${session.label}-${session.href}`}>
            <span>{session.label}</span>
            <ExtLink href={session.href}>{isLocalHref(session.href) ? "Details" : "Register"}</ExtLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectionShell({ id, kicker, title, intro, notice, children, ctaHref, ctaLabel, links }) {
  return (
    <section id={id} className="home-page-section home-panel home-panel--snap">
      <div className="home-panel-scroll">
        <div className="content-main constrain enr-program">
          {kicker ? <p className="landing-section-label">{kicker}</p> : null}
          {title ? <h1>{title}</h1> : null}
          {intro ? <p className="enr-intro">{intro}</p> : null}
          {notice ? <p className="enr-notice">{notice}</p> : null}
          {children}
          <Cta href={ctaHref} label={ctaLabel} />
          <LinkRow links={links} />
        </div>
      </div>
    </section>
  );
}

function CampsSection({ camps }) {
  const [activeId, setActiveId] = useState(null);
  const detailRef = useRef(null);
  const activeLoc = camps.locations.find((loc) => loc.id === activeId) || null;

  const selectCity = (id) => {
    setActiveId(id);
    window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 40);
  };

  return (
    <SectionShell
      id={camps.id}
      kicker={camps.kicker}
      title={camps.title}
      intro={camps.intro}
      ctaHref={camps.ctaHref}
      ctaLabel={camps.ctaLabel}
      links={camps.links}
    >
      <Points items={camps.points} />
      <div className="enr-camps-layout">
        <CampsMap locations={camps.locations} activeId={activeId} onSelect={selectCity} />
        <div className="enr-camp-side">
          <ul className="enr-camp-list">
            {camps.locations.map((loc) => {
              const sessions = loc.sessions?.length || 0;
              return (
                <li key={loc.id}>
                  <button
                    type="button"
                    className={`enr-camp-list-item${activeId === loc.id ? " is-active" : ""}`}
                    onClick={() => selectCity(loc.id)}
                    aria-pressed={activeId === loc.id}
                  >
                    <strong>{loc.name}</strong>
                    <span>
                      {[loc.venue, sessions ? `${sessions} date${sessions === 1 ? "" : "s"}` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div ref={detailRef} className={`enr-camp-detail${activeLoc ? " is-open" : ""}`}>
        {activeLoc ? (
          <>
            <div className="enr-camp-detail-head">
              <div>
                <p className="enr-camp-detail-kicker">{activeLoc.venue || "Camp site"}</p>
                <h3>{activeLoc.name}</h3>
              </div>
              <button type="button" className="enr-camp-detail-close" onClick={() => setActiveId(null)}>
                Close
              </button>
            </div>
            <ul className="enr-camp-sessions">
              {activeLoc.sessions.map((session) => (
                <li key={`${activeLoc.id}-${session.when}-${session.type || "chess"}`}>
                  <div>
                    <strong>{session.when}</strong>
                    {session.type ? <em>{session.type}</em> : null}
                  </div>
                  <div className="enr-schedule-links">
                    {session.slots.map((slot) => (
                      <ExtLink key={slot.href} href={slot.href}>
                        {slot.label}
                      </ExtLink>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="enr-camp-detail-placeholder">
            Select a city on the map or list to see camp dates and registration.
          </p>
        )}
      </div>
      {camps.strategyNote ? <p className="enr-body enr-strategy-note">{camps.strategyNote}</p> : null}
    </SectionShell>
  );
}

function FeaturedEvents({ items }) {
  if (!items?.length) return null;
  return (
    <section id="upcoming" className="landing-section home-panel home-panel--snap">
      <div className="home-panel-scroll">
        <div className="constrain home-panel-inner">
          <p className="landing-section-label">Coming up</p>
          <h2 className="enr-featured-heading">Featured activities</h2>
          <div className="enr-featured-grid">
            {items.map((item) => (
              <article key={item.title} className="enr-featured-card">
                <p className="enr-featured-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                {item.detail ? <p className="enr-featured-detail">{item.detail}</p> : null}
                {item.when ? <p className="enr-featured-meta">{item.when}</p> : null}
                {item.cost ? <p className="enr-featured-meta">{item.cost}</p> : null}
                <div className="enr-featured-actions">
                  <Cta href={item.ctaHref} label={item.ctaLabel} compact />
                  {item.secondaryHref ? (
                    <ExtLink href={item.secondaryHref}>{item.secondaryLabel}</ExtLink>
                  ) : null}
                  {item.section ? (
                    <Link to={`/enrichment#${item.section}`} className="enr-featured-section">
                      Details →
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
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
    const t = window.setTimeout(() => scrollToSection(hash, { behavior: "smooth" }), 50);
    return () => window.clearTimeout(t);
  }, [data, location.hash]);

  if (!data) {
    return (
      <main className="content-main constrain">
        <p className="muted">Loading…</p>
      </main>
    );
  }

  const { classes, camps, afterschool, clubs, teams, risingStar, resources, faq } = data;

  return (
    <main className="landing-home enrichment-home">
      <section id="top" className="landing-hero home-panel home-panel--snap" data-entered="1">
        <div className="landing-hero-media" aria-hidden>
          <HeroVideo fullBleed src="/videos/enrichment-clip.mp4" />
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

      <FeaturedEvents items={data.featured} />

      <EnrichmentCalendar />

      <SectionShell
        id={classes.id}
        kicker={classes.kicker}
        title={classes.title}
        intro={classes.intro}
        notice={classes.notice}
        ctaHref={classes.ctaHref}
        ctaLabel={classes.ctaLabel}
        links={classes.links}
      >
        <Points items={classes.points} />
        <SessionList sessions={classes.currentSessions} title="Open now (Sep–Oct)" />
        <SessionList sessions={classes.upcomingSessions} title="Next term (Oct–Dec)" />
        <h3 className="enr-subhead">Skill levels</h3>
        <div className="enr-level-grid">
          {classes.skillLevels.map((lvl) => (
            <div key={lvl.level} className="enr-level-card">
              <span className="enr-level-num">{lvl.level}</span>
              <strong>{lvl.name}</strong>
              <p>{lvl.detail}</p>
            </div>
          ))}
        </div>
        <div className="enr-faq-list">
          {classes.faqs.map((item) => (
            <AccordionItem key={item.q} item={item} />
          ))}
        </div>
      </SectionShell>

      <CampsSection camps={camps} />

      <SectionShell
        id={afterschool.id}
        kicker={afterschool.kicker}
        title={afterschool.title}
        intro={afterschool.intro}
        ctaHref={afterschool.ctaHref}
        ctaLabel={afterschool.ctaLabel}
        links={afterschool.links}
      >
        <Points items={afterschool.points} />
        <div className="enr-highlight enr-lunch">
          <p>
            <strong>{afterschool.lunchtime.title}</strong>
          </p>
          <p>{afterschool.lunchtime.body}</p>
          <ExtLink href={afterschool.lunchtime.href}>
            Lunchtime program details{isLocalHref(afterschool.lunchtime.href) ? "" : " ↗"}
          </ExtLink>
        </div>
        <h3 className="enr-subhead">{afterschool.schoolsHeading || "Fall 2026 schools"}</h3>
        {afterschool.schoolsIntro ? <p className="enr-body">{afterschool.schoolsIntro}</p> : null}
        {afterschool.schools ? <SchoolsMap schools={afterschool.schools} /> : null}
        <div className="enr-faq-list">
          {afterschool.faqs.map((item) => (
            <AccordionItem key={item.q} item={item} />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        id={clubs.id}
        kicker={clubs.kicker}
        title={clubs.title}
        intro={clubs.intro}
        notice={clubs.notice}
        ctaHref={clubs.ctaHref}
        ctaLabel={clubs.ctaLabel}
        links={clubs.links}
      >
        <div className="enr-highlight">
          <p>
            <strong>{clubs.specialEvent.title}</strong>
          </p>
          <p>{clubs.specialEvent.when}</p>
          <p>{clubs.specialEvent.where}</p>
          <p>{clubs.specialEvent.detail}</p>
          <p>{clubs.specialEvent.cost}</p>
          <ExtLink href={clubs.specialEvent.href}>
            Details & registration{isLocalHref(clubs.specialEvent.href) ? "" : " ↗"}
          </ExtLink>
        </div>
        <div className="enr-table-wrap">
          <table className="enr-table">
            <thead>
              <tr>
                {clubs.table.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clubs.table.rows.map((row) => (
                <tr key={row.join("-")}>
                  {row.map((cell, i) => (
                    <td key={`${row[0]}-${i}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="enr-subhead">Club pages</h3>
        <LinkRow links={clubs.locations} />
      </SectionShell>

      <SectionShell
        id={teams.id}
        kicker={teams.kicker}
        title={teams.title}
        intro={teams.intro}
        ctaHref={teams.ctaHref}
        ctaLabel={teams.ctaLabel}
        links={teams.links}
      >
        <div className="enr-highlight">
          <p>
            <strong>{teams.highlight.when}</strong>
          </p>
          <p>{teams.highlight.where}</p>
          <p>{teams.highlight.cost}</p>
        </div>
        <Points items={teams.points} />
        <h3 className="enr-subhead">Free tournament enrollment options</h3>
        <ul className="enr-points">
          {teams.freeEvents.map((event) => (
            <li key={event}>{event}</li>
          ))}
        </ul>
        <p className="enr-body">{teams.body}</p>
      </SectionShell>

      <SectionShell
        id={risingStar.id}
        kicker={risingStar.kicker}
        title={risingStar.title}
        intro={risingStar.intro}
        ctaHref={risingStar.ctaHref}
        ctaLabel={risingStar.ctaLabel}
        links={risingStar.links}
      >
        <div className="enr-highlight">
          <p>
            <strong>{risingStar.highlight.when}</strong>
          </p>
          <p>{risingStar.highlight.where}</p>
          <p>{risingStar.highlight.cost}</p>
        </div>
        <Points items={risingStar.points} />
      </SectionShell>

      <SectionShell id={resources.id} kicker={resources.kicker} title={resources.title} intro={resources.intro}>
        <div className="enr-resource-grid">
          {resources.cards.map((card) => (
            <ExtLink key={card.href} href={card.href} className="enr-resource-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <span>{isLocalHref(card.href) ? "Open →" : "Open ↗"}</span>
            </ExtLink>
          ))}
        </div>
      </SectionShell>

      <section id="faq" className="home-page-section home-panel home-panel--snap">
        <div className="home-panel-scroll">
          <div className="content-main constrain enr-program">
            <p className="landing-section-label">{faq.kicker}</p>
            <h1>{faq.title}</h1>
            <p className="enr-intro">{faq.intro}</p>
            <div className="enr-faq-list">
              {faq.items.map((item) => (
                <AccordionItem key={item.q} item={item} />
              ))}
            </div>
            <LinkRow links={faq.links} />
          </div>
        </div>
      </section>

      <section id="contact" className="home-page-section home-panel home-panel--snap">
        <div className="home-panel-scroll">
          <Contact embedded />
          <Footer />
        </div>
      </section>
    </main>
  );
}
