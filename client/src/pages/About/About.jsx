import { useEffect, useState } from "react";
import api from "../../axios";
import PageFrame from "../../components/PageFrame/PageFrame";
import "./About.scss";

function TeamCard({ member }) {
  return (
    <div className="about-team-card">
      <div className="about-team-name">{member.name}</div>
      <div className="about-team-role">{member.role}</div>
      {member.email && (
        <a className="about-team-email" href={`mailto:${member.email}`}>
          {member.email}
        </a>
      )}
    </div>
  );
}

export default function About({ embedded = false }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/about").then((res) => setData(res.data));
  }, []);

  if (!data) {
    return (
      <PageFrame embedded={embedded} className="content-main constrain">
        <p className="muted">Loading…</p>
      </PageFrame>
    );
  }

  return (
    <PageFrame embedded={embedded} className="content-main about-page constrain">
      <div className="about-layout">
        <div className="about-layout-main">
          <header className="about-hero">
            <p className="about-hero-tag">{data.hero.tag}</p>
            <h1 className="about-hero-title">{data.hero.title}</h1>
            <p className="about-mission-lead">{data.hero.missionLead}</p>
            <p className="about-mission-text">{data.hero.missionText}</p>
            <p className="about-mission-welcome">{data.hero.welcome}</p>
          </header>

          <section className="about-section about-section-story">
            <h2 className="about-h2">Our commitment</h2>
            <ul className="about-commitment-list">
              {data.commitments.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="about-recognition">{data.recognition}</p>
          </section>

          <section className="about-section">
            <h2 className="about-h2">Leadership</h2>
            <div className="about-team-grid">
              {data.president.map((m) => (
                <TeamCard key={m.email} member={m} />
              ))}
            </div>
            <h3 className="about-h3">Staff</h3>
            <div className="about-team-grid">
              {data.staff.map((m) => (
                <TeamCard key={m.email} member={m} />
              ))}
            </div>
            <h3 className="about-h3 about-h3-spaced">Board</h3>
            <div className="about-team-grid about-team-grid-board">
              {data.board.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </section>

          <section className="about-section">
            <h2 className="about-h2">Testimonials</h2>
            <p className="about-testimonials-intro">What players and coaches say about BAC.</p>
            <div className="about-testimonials-grid">
              {data.testimonials.map((t) => (
                <blockquote key={t.attribution} className="about-quote">
                  <p>{t.quote}</p>
                  <footer>{t.attribution}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageFrame>
  );
}
