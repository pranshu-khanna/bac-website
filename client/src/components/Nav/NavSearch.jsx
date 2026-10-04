import { useEffect, useId, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axios";

const TYPE_LABEL = {
  section: "Section",
  page: "Guide",
  event: "Event",
};

export default function NavSearch({ onOpenChange }) {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const setOpenSafe = (next) => {
    setOpen(next);
    onOpenChange?.(next);
  };

  useEffect(() => {
    if (!open) return undefined;
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpenSafe(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpenSafe(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const q = query.trim();
    if (!open || q.length < 2) {
      setResults([]);
      setLoading(false);
      setActiveIndex(-1);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    const timer = window.setTimeout(() => {
      api
        .get("/enrichment/search", { params: { q } })
        .then((res) => {
          if (cancelled) return;
          setResults(res.data.results || []);
          setActiveIndex(-1);
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [query, open]);

  const goTo = (href) => {
    if (!href) return;
    setOpenSafe(false);
    setQuery("");
    setResults([]);
    navigate(href);
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!results.length) return;
      setActiveIndex((i) => (i + 1) % results.length);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!results.length) return;
      setActiveIndex((i) => (i <= 0 ? results.length - 1 : i - 1));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const pick = activeIndex >= 0 ? results[activeIndex] : results[0];
      if (pick) goTo(pick.href);
    }
  };

  return (
    <div className={`nav-search${open ? " is-open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="nav-search-toggle"
        aria-label={open ? "Close search" : "Search enrichment"}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpenSafe(!open)}
      >
        <svg className="nav-search-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M15.5 15.5 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <div className="nav-search-panel" role="search">
          <label className="nav-search-label" htmlFor="nav-enrichment-search">
            Search enrichment
          </label>
          <input
            id="nav-enrichment-search"
            ref={inputRef}
            className="nav-search-input"
            type="search"
            value={query}
            placeholder="Camps, clubs, FSA, Rising Star…"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-activedescendant={activeIndex >= 0 ? `${listId}-opt-${activeIndex}` : undefined}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
          />

          <div className="nav-search-results" id={listId} role="listbox" aria-label="Search results">
            {query.trim().length < 2 ? (
              <p className="nav-search-hint">Type at least 2 characters</p>
            ) : loading ? (
              <p className="nav-search-hint">Searching…</p>
            ) : results.length === 0 ? (
              <p className="nav-search-hint">No matches — try “camp”, “club”, or “online”</p>
            ) : (
              results.map((item, index) => (
                <button
                  key={item.id}
                  id={`${listId}-opt-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`nav-search-result${index === activeIndex ? " is-active" : ""}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => goTo(item.href)}
                >
                  <span className="nav-search-result-type">{TYPE_LABEL[item.type] || item.type}</span>
                  <span className="nav-search-result-title">{item.title}</span>
                  {item.blurb ? <span className="nav-search-result-blurb">{item.blurb}</span> : null}
                </button>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
