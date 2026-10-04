import { useState } from "react";
import api from "../../axios";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!message.trim()) {
      setError("Message is required.");
      return;
    }

    setSending(true);
    try {
      await api.post("/contact", { name, email, message });
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      const apiError = err?.response?.data?.error;
      setError(apiError || "Could not send your message. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="contact-form-inner" onSubmit={handleSubmit} noValidate>
      {error && <p className="contact-form-error">{error}</p>}
      {success && (
        <p className="contact-form-success">Thanks — your message was sent.</p>
      )}

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
          disabled={sending}
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
          disabled={sending}
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
          disabled={sending}
        />
        <p className="contact-char-count">{message.length}/500</p>
      </div>

      <div className="contact-form-actions">
        <button type="submit" className="btn primary" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
