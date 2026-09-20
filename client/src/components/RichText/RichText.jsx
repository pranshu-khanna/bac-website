import { Link } from "react-router-dom";

const MD_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
const URL_RE = /(https?:\/\/[^\s]+|bayareachess\.com\/[^\s.,;:!?)]+)/gi;

const INTERNAL_PATHS = {
  "bayareachess.com/bacoins": "/leaderboard",
};

function parseUrls(text) {
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = URL_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }
    parts.push({ type: "link", value: match[0], href: match[0] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  URL_RE.lastIndex = 0;
  return parts.length ? parts : [{ type: "text", value: text }];
}

function parseText(text) {
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = MD_LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(...parseUrls(text.slice(lastIndex, match.index)));
    }
    parts.push({ type: "link", value: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(...parseUrls(text.slice(lastIndex)));
  }

  MD_LINK_RE.lastIndex = 0;
  return parts.length ? parts : [{ type: "text", value: text }];
}

function linkProps(part) {
  const hrefValue = part.href || part.value;
  const lower = hrefValue.toLowerCase();

  if (lower.startsWith("http")) {
    return { href: hrefValue, label: part.value, external: true };
  }

  const internal = INTERNAL_PATHS[lower];
  if (internal) {
    return { href: internal, label: part.value, external: false };
  }

  return { href: `https://${hrefValue}`, label: part.value, external: true };
}

export default function RichText({ text }) {
  if (!text) return null;

  return (
    <>
      {parseText(text).map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.value}</span>;
        }

        const { href, label, external } = linkProps(part);

        if (external) {
          return (
            <a key={index} href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          );
        }

        return (
          <Link key={index} to={href}>
            {label}
          </Link>
        );
      })}
    </>
  );
}
