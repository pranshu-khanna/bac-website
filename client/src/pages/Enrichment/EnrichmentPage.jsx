import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import EnrichmentReturnBar from "./EnrichmentReturnBar";
import { formatProgramPage } from "./formatProgramPage";
import "./Enrichment.scss";

function isLocalHref(href) {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

function pagePathFromLocation(pathname, slug) {
  if (pathname.includes("/enrichment/camp/")) return `camp/${slug}`;
  if (pathname.includes("/enrichment/event/")) return `event/${slug}`;
  return slug;
}

function SmartLink({ href, children, className }) {
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

function FactsCard({ facts }) {
  if (!facts?.length) return null;
  return (
    <section className="enr-facts" aria-label="Program details">
      <div className="enr-facts-grid">
        {facts.map((fact) => (
          <div key={`${fact.label}-${fact.value}`} className="enr-fact">
            <span className="enr-fact-label">{fact.label}</span>
            {fact.href ? (
              <a className="enr-fact-value" href={fact.href} target="_blank" rel="noreferrer">
                {fact.label === "Flyer" ? "Download PDF" : fact.value}
              </a>
            ) : (
              <span className="enr-fact-value">{fact.value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ContentSection({ section }) {
  return (
    <section className="enr-content-section">
      <h2 className="enr-content-heading">{section.title}</h2>
      {section.blocks.map((block) => (
        <p key={block.slice(0, 48)} className="enr-body">
          {block}
        </p>
      ))}
      {section.bullets?.length ? (
        <ul className="enr-content-list">
          {section.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default function EnrichmentPage() {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const pagePath = pagePathFromLocation(pathname, slug);
  const [page, setPage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPage(null);
    setError(false);
    window.scrollTo(0, 0);
    api
      .get(`/enrichment/pages/${pagePath}`)
      .then((res) => setPage(res.data))
      .catch(() => setError(true));
  }, [pagePath]);

  const view = useMemo(() => formatProgramPage(page), [page]);

  if (error) {
    return (
      <PageFrame className="enrichment-subpage">
        <EnrichmentReturnBar />
        <div className="content-main constrain enr-program">
          <h1>Page not found</h1>
          <p className="enr-intro">That enrichment guide isn’t available.</p>
          <Link to="/enrichment" className="enr-cta">
            Back to Enrichment
          </Link>
        </div>
      </PageFrame>
    );
  }

  if (!page || !view) {
    return (
      <PageFrame className="enrichment-subpage">
        <EnrichmentReturnBar />
        <div className="content-main constrain enr-program">
          <p className="muted">Loading…</p>
        </div>
      </PageFrame>
    );
  }

  const rawCtaHref = view.ctaHref || "";
  const ctaHref = rawCtaHref.includes("enrichment.bayareachess.com") ? "/login" : rawCtaHref;
  const ctaLabel = rawCtaHref.includes("enrichment.bayareachess.com")
    ? (view.ctaLabel || "Register")
        .replace(/\s*on enrichment site/i, "")
        .replace(/\s*\(enrichment site\)/i, "")
        .trim() || "Register"
    : view.ctaLabel || "Continue";
  const externalCta = ctaHref && !isLocalHref(ctaHref);

  return (
    <PageFrame className="enrichment-subpage">
      <EnrichmentReturnBar />
      <div className="content-main constrain enr-program enr-subpage-body">
        {view.kicker ? <p className="landing-section-label">{view.kicker}</p> : null}
        <h1>{view.title}</h1>
        {view.intro ? <p className="enr-intro">{view.intro}</p> : null}

        <FactsCard facts={view.facts} />

        {view.notices?.length ? (
          <div className="enr-notice-stack">
            {view.notices.map((notice) => (
              <p key={notice.slice(0, 64)} className="enr-notice">
                {notice}
              </p>
            ))}
          </div>
        ) : view.notice ? (
          <p className="enr-notice">{view.notice}</p>
        ) : null}

        {view.points?.length ? (
          <ul className="enr-points">
            {view.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}

        {view.overview?.length ? (
          <div className="enr-overview">
            {view.overview.map((p) => (
              <p key={p.slice(0, 48)} className="enr-body">
                {p}
              </p>
            ))}
          </div>
        ) : null}

        {view.sections?.length ? (
          <div className="enr-content-sections">
            {view.sections.map((section) => (
              <ContentSection key={section.title} section={section} />
            ))}
          </div>
        ) : null}

        {view.sessions?.length ? (
          <ul className="enr-sessions">
            {view.sessions.map((session) => (
              <li key={`${session.label}-${session.href}`}>
                <span>{session.label}</span>
                <SmartLink href={session.href}>Register</SmartLink>
              </li>
            ))}
          </ul>
        ) : null}

        {view.levels?.length ? (
          <div className="enr-level-grid">
            {view.levels.map((lvl) => (
              <div key={lvl.level} className="enr-level-card">
                <span className="enr-level-num">{lvl.level}</span>
                <strong>{lvl.name}</strong>
                <p>{lvl.detail}</p>
              </div>
            ))}
          </div>
        ) : null}

        {view.table ? (
          <div className="enr-table-wrap">
            <table className="enr-table">
              <thead>
                <tr>
                  {view.table.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {view.table.rows.map((row) => (
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

        {view.schools?.length ? (
          <div className="enr-school-grid">
            {view.schools.map((school) => (
              <div key={`${school.name}-${school.city}`} className="enr-school-chip">
                <strong>{school.name}</strong>
                <span>{school.city}</span>
              </div>
            ))}
          </div>
        ) : null}

        {view.people?.length ? (
          <div className="enr-people-grid">
            {view.people.map((person) => (
              <SmartLink key={person.href} href={person.href} className="enr-people-card">
                {person.name}
              </SmartLink>
            ))}
          </div>
        ) : null}

        {view.quotes?.length ? (
          <div className="enr-quote-list">
            {view.quotes.map((quote) => (
              <blockquote key={quote.text.slice(0, 40)} className="enr-quote">
                <p>“{quote.text}”</p>
                {quote.by ? <cite>{quote.by}</cite> : null}
              </blockquote>
            ))}
          </div>
        ) : null}

        {view.faqs?.length ? (
          <div className="enr-faq-list">
            <h2 className="enr-subhead">FAQ</h2>
            {view.faqs.map((item) => (
              <AccordionItem key={item.q} item={item} />
            ))}
          </div>
        ) : null}

        {ctaHref ? (
          <div className="enr-cta-row">
            <SmartLink href={ctaHref} className="enr-cta">
              {ctaLabel}
              {externalCta ? " ↗" : ""}
            </SmartLink>
          </div>
        ) : null}

        {view.links?.length ? (
          <div className="enr-links">
            {view.links.map((link) => (
              <SmartLink key={link.href} href={link.href}>
                {link.label}
                {isLocalHref(link.href) ? "" : " ↗"}
              </SmartLink>
            ))}
          </div>
        ) : null}
      </div>
    </PageFrame>
  );
}
