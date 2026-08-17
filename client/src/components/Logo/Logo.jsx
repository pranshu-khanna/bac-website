export default function Logo({ variant = "main" }) {
  const enrichment = variant === "enrichment";
  return (
    <span className="logo-mark-wrap">
      <img className="logo-img" src="/logo.jpg" alt="" />
      <span className="logo-text">
        <span className="logo-title">
          {enrichment ? "Bay Area Chess Enrichment" : "Bay Area Chess"}
        </span>
        <span className="logo-subtitle">
          {enrichment ? "Camps · Clubs · Classes · Teams" : "Camps · Clubs · Classes · Tournaments"}
        </span>
      </span>
    </span>
  );
}
