import { useMemo, useState } from "react";
import api from "../../axios";

const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomChallenge() {
  let out = "";
  for (let i = 0; i < 5; i += 1) {
    out += CHARSET[Math.floor(Math.random() * CHARSET.length)];
  }
  return out;
}

export default function ContactForm({ contactEmail = "ask@bayareachess.com" }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [challenge, setChallenge] = useState(randomChallenge);
  const [error, setError] = useState(null);

  const captchaCanvas = useMemo(() => challenge, [challenge]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!message.trim()) {
      setError("Message is required.");
      return;
    }
    if (captchaInput.trim().toUpperCase() !== challenge) {
      setError("Captcha does not match. Please try again.");
      setChallenge(randomChallenge());
      setCaptchaInput("");
      return;
    }

    try {
      const { data } = await api.post("/contact", { name, email, message });
      if (data.mailto) {
        window.location.href = data.mailto;
      }
    } catch {
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(
        "Contact from Bay Area Chess website",
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  };

  return (
    <form className="contact-form-inner" onSubmit={handleSubmit} noValidate>
      {error && <p className="contact-form-error">{error}</p>}

      <div className="contact-control">
        <label className="contact-label" htmlFor="contact-name">
          NAME
        </label>
        <input
          id="contact-name"
          className="contact-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="your Name"
          maxLength={100}
        />
      </div>

      <div className="contact-control">
        <label className="contact-label" htmlFor="contact-email">
          EMAIL<sup className="contact-req">*</sup>
        </label>
        <input
          id="contact-email"
          type="email"
          className="contact-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="contact-control">
        <label className="contact-label" htmlFor="contact-message">
          MESSAGE<sup className="contact-req">*</sup>
        </label>
        <textarea
          id="contact-message"
          className="contact-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={500}
          required
        />
        <p className="contact-char-count">{message.length}/500</p>
      </div>

      <div className="contact-captcha">
        <div className="contact-captcha-row">
          <div className="contact-captcha-canvas" aria-hidden>
            {captchaCanvas}
          </div>
        </div>
        <button
          type="button"
          className="contact-captcha-refresh"
          onClick={() => {
            setChallenge(randomChallenge());
            setCaptchaInput("");
          }}
        >
          Refresh captcha
        </button>
        <div className="contact-control">
          <label className="contact-label" htmlFor="contact-captcha">
            ENTER CAPTCHA
          </label>
          <input
            id="contact-captcha"
            className="contact-input"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
          />
        </div>
      </div>

      <div className="contact-form-actions">
        <button type="submit" className="btn primary">
          Send message
        </button>
      </div>
    </form>
  );
}
