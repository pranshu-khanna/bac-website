import { Link } from "react-router-dom";

const URL_RE = /(https?:\/\/[^\s]+|bayareachess\.com\/[^\s.,;:!?)]+)/gi;

const INTERNAL_PATHS = {
  "bayareachess.com/request": "/request",
  "bayareachess.com/bacoins": "/leaderboard",
  "bayareachess.com/my/memberships": "/membership",
  "bayareachess.com/my/membership": "/membership",
};

function parseText(text) {
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = URL_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "link", value: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  URL_RE.lastIndex = 0;
  return parts;
}

function linkProps(value) {
  const lower = value.toLowerCase();

  if (lower.startsWith("http")) {
    return { href: value, external: true };
  }

  const internal = INTERNAL_PATHS[lower];
  if (internal) {
    return { href: internal, external: false };
  }

  return { href: `https://${value}`, external: true };
}

export default function RichText({ text }) {
  if (!text) return null;

  return (
    <>
      {parseText(text).map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.value}</span>;
        }

        const { href, external } = linkProps(part.value);

        if (external) {
          return (
            <a key={index} href={href} target="_blank" rel="noreferrer">
              {part.value}
            </a>
          );
        }

        return (
          <Link key={index} to={href}>
            {part.value}
          </Link>
        );
      })}
    </>
  );
}
