import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import LeftBar from "../../components/LeftBar/LeftBar";
import ContactForm from "../../components/ContactForm/ContactForm";
import "./Contact.scss";

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 4-8 5-8-5V6l8 5 8-5z"
      />
    </svg>
  );
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5m0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5M17.75 6a1.25 1.25 0 1 1-1.25 1.25A1.25 1.25 0 0 1 17.75 6"
      />
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M13.5 22v-8.16h2.74l.41-3.18h-3.15V8.62c0-.92.25-1.55 1.57-1.55H16.8V4.23A21 21 0 0 0 14.36 4C11.9 4 10.2 5.5 10.2 8.3v2.36H7.5v3.18h2.7V22z"
      />
    </svg>
  );
}

function IconForm() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm1 15H9v-2h6zm0-4H9v-2h6zm-2-5V3.5L18.5 8z"
      />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"
      />
    </svg>
  );
}

function ConnectIcon({ name }) {
  if (name === "WhatsApp") return <IconWhatsApp />;
  if (name === "Email") return <IconEmail />;
  if (name === "Phone") return <IconPhone />;
  if (name === "X") return <IconX />;
  if (name === "Instagram") return <IconInstagram />;
  if (name === "Facebook") return <IconFacebook />;
  if (name === "Request form") return <IconForm />;
  return <span>@</span>;
}

function ConnectCard({ link }) {
  const body = (
    <>
      <span className="about-social-icon" aria-hidden>
        <ConnectIcon name={link.icon || link.label} />
      </span>
      <span className="about-social-text">
        <span className="about-social-name">{link.label}</span>
        {link.description ? <span className="about-social-desc">{link.description}</span> : null}
        {link.detail ? <span className="about-social-detail">{link.detail}</span> : null}
      </span>
    </>
  );

  if (link.path) {
    return (
      <Link className="about-social-link" to={link.path}>
        {body}
      </Link>
    );
  }

  if (!link.href) {
    return <div className="about-social-link about-social-link--static">{body}</div>;
  }

  const isLocal = link.href.startsWith("mailto:") || link.href.startsWith("tel:");
  return (
    <a
      className="about-social-link"
      href={link.href}
      {...(isLocal ? {} : { target: "_blank", rel: "noreferrer" })}
    >
      {body}
    </a>
  );
}

function ConnectCarousel({ links = [] }) {
  const [index, setIndex] = useState(0);
  const touchX = useRef(null);
  const count = links.length;

  const go = (dir) => {
    if (!count) return;
    setIndex((current) => (current + dir + count) % count);
  };

  if (!count) return null;

  return (
    <div className="contact-connect">
      <div className="contact-connect-row">
        <button
          type="button"
          className="contact-connect-arrow contact-connect-arrow--prev"
          aria-label="Previous contact option"
          onClick={() => go(-1)}
        >
          <span aria-hidden>‹</span>
        </button>

        <div
          className="contact-connect-viewport"
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
          <ul className="contact-connect-grid" style={{ "--connect-index": index }}>
            {links.map((link) => (
              <li key={link.label}>
                <ConnectCard link={link} />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="contact-connect-arrow contact-connect-arrow--next"
          aria-label="Next contact option"
          onClick={() => go(1)}
        >
          <span aria-hidden>›</span>
        </button>
      </div>

      <div className="contact-connect-dots" role="tablist" aria-label="Connect options">
        {links.map((link, i) => (
          <button
            key={link.label}
            type="button"
            role="tab"
            aria-label={link.label}
            aria-selected={i === index}
            className={`contact-connect-dot${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Contact({ embedded = false }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/contact").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <PageFrame embedded={embedded} className="content-main constrain">
        <p className="muted">Loading…</p>
      </PageFrame>
    );
  }

  return (
    <PageFrame embedded={embedded} className="content-main contact-page-full constrain">
      <div className="contact-layout">
        <LeftBar title="Connect with BayAreaChess">
          <ConnectCarousel links={data.connectLinks} />
        </LeftBar>

        <div className="contact-form-area">
          <h1 className="contact-form-heading">Contact us</h1>
          <ContactForm />
        </div>
      </div>

      <section className="contact-map-wrap">
        <iframe
          title="Bay Area Chess office location"
          src={data.mapEmbedUrl}
          width="100%"
          height="360"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </PageFrame>
  );
}
