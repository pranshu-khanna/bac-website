const FEEDBACK_URL = "https://forms.gle/A55yks9JYMKLEa4WA";

export default function FeedbackTab() {
  return (
    <a
      className="feedback-tab"
      href={FEEDBACK_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Open feedback form in a new tab"
    >
      <span className="feedback-tab-label">Feedback</span>
    </a>
  );
}
