/** Renders page content as a div when embedded on Home, otherwise as <main>. */
export default function PageFrame({ embedded = false, className = "", children }) {
  if (embedded) {
    return <div className={className}>{children}</div>;
  }
  return <main className={className}>{children}</main>;
}
