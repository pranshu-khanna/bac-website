import { useEffect, useState } from "react";
import api from "../../axios";
import LeftBar from "../../components/LeftBar/LeftBar";
import ContactForm from "../../components/ContactForm/ContactForm";
import "./Contact.scss";

export default function Contact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/contact").then((res) => setData(res.data));
  }, []);

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="content-main contact-page-full constrain">
      <div className="contact-layout">
        <LeftBar title="Quick links" links={data.sidebarLinks} />

        <div className="contact-form-area">
          <h1 className="contact-form-heading">Contact us</h1>
          <ContactForm contactEmail={data.contactEmail} />
          <p className="contact-legacy-note">
            Prefer email? Write to{" "}
            <a href={`mailto:${data.contactEmail}`}>{data.contactEmail}</a>.
          </p>
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
    </main>
  );
}
