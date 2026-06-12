export default function RightBar({ title, children }) {
  if (!children) return null;

  return (
    <aside className="right-bar">
      {title && <h2 className="right-bar-title">{title}</h2>}
      <div className="right-bar-body">{children}</div>
    </aside>
  );
}
