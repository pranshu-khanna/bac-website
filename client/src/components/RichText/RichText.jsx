import { Link } from "react-router-dom";

const URL_RE = /(https?:\/\/[^\s]+|bayareachess\.com\/[^\s.,;:!?)]+)/gi;
const MD_HREF_RE = /^https?:\/\/[^)\s]+$/;

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

function findBalancedBracket(text, openIndex) {
  let depth = 0;
  for (let i = openIndex; i < text.length; i += 1) {
    const ch = text[i];
    if (ch === "[") depth += 1;
    else if (ch === "]") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function parseText(text) {
  const parts = [];
  let i = 0;

  while (i < text.length) {
    const open = text.indexOf("[", i);
    if (open === -1) {
      parts.push(...parseUrls(text.slice(i)));
      break;
    }

    const close = findBalancedBracket(text, open);
    const label = close === -1 ? "" : text.slice(open + 1, close);
    const hrefStart = close + 2;
    const hrefEnd = close === -1 ? -1 : text.indexOf(")", hrefStart);
    const href = hrefEnd === -1 ? "" : text.slice(hrefStart, hrefEnd);
    const isMdLink =
      close !== -1 &&
      label.length > 0 &&
      text[close + 1] === "(" &&
      hrefEnd !== -1 &&
      MD_HREF_RE.test(href);

    if (!isMdLink) {
      parts.push(...parseUrls(text.slice(i, open + 1)));
      i = open + 1;
      continue;
    }

    if (open > i) {
      parts.push(...parseUrls(text.slice(i, open)));
    }
    parts.push({ type: "link", value: label, href });
    i = hrefEnd + 1;
  }

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
