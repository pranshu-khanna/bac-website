import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import EnrichmentReturnBar from "./EnrichmentReturnBar";
import "./Enrichment.scss";

function isLocalHref(href) {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
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

export default function EnrichmentPage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setPage(null);
    setError(false);
    window.scrollTo(0, 0);
    api
      .get(`/enrichment/pages/${slug}`)
      .then((res) => setPage(res.data))
      .catch(() => setError(true));
  }, [slug]);

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

  if (!page) {
    return (
      <PageFrame className="enrichment-subpage">
        <EnrichmentReturnBar />
        <div className="content-main constrain enr-program">
          <p className="muted">Loading…</p>
        </div>
      </PageFrame>
    );
  }

  const externalCta = page.ctaHref && !isLocalHref(page.ctaHref);

  return (
    <PageFrame className="enrichment-subpage">
      <EnrichmentReturnBar />
      <div className="content-main constrain enr-program enr-subpage-body">
        {page.kicker ? <p className="landing-section-label">{page.kicker}</p> : null}
        <h1>{page.title}</h1>
        {page.intro ? <p className="enr-intro">{page.intro}</p> : null}
        {page.notice ? <p className="enr-notice">{page.notice}</p> : null}

        {page.highlight ? (
          <div className="enr-highlight">
            {page.highlight.when ? (
              <p>
                <strong>{page.highlight.when}</strong>
              </p>
            ) : null}
            {page.highlight.where ? <p>{page.highlight.where}</p> : null}
            {page.highlight.cost ? <p>{page.highlight.cost}</p> : null}
            {page.highlight.detail ? <p>{page.highlight.detail}</p> : null}
          </div>
        ) : null}

        {page.points?.length ? (
          <ul className="enr-points">
            {page.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        ) : null}

        {page.paragraphs?.map((p) => (
          <p key={p.slice(0, 48)} className="enr-body">
            {p}
          </p>
        ))}

        {page.sessions?.length ? (
          <ul className="enr-sessions">
            {page.sessions.map((session) => (
              <li key={`${session.label}-${session.href}`}>
                <span>{session.label}</span>
                <SmartLink href={session.href}>Register</SmartLink>
              </li>
            ))}
          </ul>
        ) : null}

        {page.levels?.length ? (
          <div className="enr-level-grid">
            {page.levels.map((lvl) => (
              <div key={lvl.level} className="enr-level-card">
                <span className="enr-level-num">{lvl.level}</span>
                <strong>{lvl.name}</strong>
                <p>{lvl.detail}</p>
              </div>
            ))}
          </div>
        ) : null}

        {page.table ? (
          <div className="enr-table-wrap">
            <table className="enr-table">
              <thead>
                <tr>
                  {page.table.columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.table.rows.map((row) => (
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

        {page.schools?.length ? (
          <div className="enr-school-grid">
            {page.schools.map((school) => (
              <div key={`${school.name}-${school.city}`} className="enr-school-chip">
                <strong>{school.name}</strong>
                <span>{school.city}</span>
              </div>
            ))}
          </div>
        ) : null}

        {page.people?.length ? (
          <div className="enr-people-grid">
            {page.people.map((person) => (
              <SmartLink key={person.href} href={person.href} className="enr-people-card">
                {person.name}
              </SmartLink>
            ))}
          </div>
        ) : null}

        {page.quotes?.length ? (
          <div className="enr-quote-list">
            {page.quotes.map((quote) => (
              <blockquote key={quote.text.slice(0, 40)} className="enr-quote">
                <p>“{quote.text}”</p>
                {quote.by ? <cite>{quote.by}</cite> : null}
              </blockquote>
            ))}
          </div>
        ) : null}

        {page.faqs?.length ? (
          <div className="enr-faq-list">
            <h2 className="enr-subhead">FAQ</h2>
            {page.faqs.map((item) => (
              <AccordionItem key={item.q} item={item} />
            ))}
          </div>
        ) : null}

        {page.ctaHref ? (
          <SmartLink href={page.ctaHref} className="enr-cta">
            {page.ctaLabel || "Continue"}
            {externalCta ? " ↗" : ""}
          </SmartLink>
        ) : null}

        {page.links?.length ? (
          <div className="enr-links">
            {page.links.map((link) => (
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
