import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../axios";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const TIME_OPTIONS = [
  { value: "", label: "Any time" },
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
];

function monthLabel(ym) {
  if (!ym) return "";
  const [y, m] = ym.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
}

function daysInMonth(ym) {
  const [y, m] = ym.split("-").map(Number);
  const first = new Date(y, m - 1, 1);
  const total = new Date(y, m, 0).getDate();
  const cells = [];
  for (let i = 0; i < first.getDay(); i += 1) cells.push(null);
  for (let d = 1; d <= total; d += 1) {
    cells.push(`${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`);
  }
  return cells;
}

function isLocalHref(href) {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

function categorySlug(category) {
  return category.toLowerCase().replace(/\s+/g, "-");
}

function EventLink({ event }) {
  if (!event.href) {
    return <span className="enr-cal-event-title">{event.title}</span>;
  }
  if (isLocalHref(event.href)) {
    return (
      <Link className="enr-cal-event-title" to={event.href}>
        {event.title}
      </Link>
    );
  }
  return (
    <a className="enr-cal-event-title" href={event.href} target="_blank" rel="noreferrer">
      {event.title}
    </a>
  );
}

const PAGE_SIZE = 3;

export default function EnrichmentCalendar() {
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState(null);
  const [rating, setRating] = useState("");
  const [month, setMonth] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [detailPage, setDetailPage] = useState(0);

  useEffect(() => {
    api
      .get("/enrichment/calendar")
      .then((res) => {
        setPayload(res.data);
        const months = res.data.filters?.months || [];
        const today = new Date();
        const current = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
        setMonth(months.includes(current) ? current : months[0] || "");
      })
      .catch(() => setError("Could not load enrichment calendar."));
  }, []);

  const filtered = useMemo(() => {
    if (!payload?.events) return [];
    return payload.events.filter((event) => {
      if (month && !event.date.startsWith(month)) return false;
      if (rating && event.rating !== rating) return false;
      if (timeOfDay && event.timeOfDay !== timeOfDay) return false;
      if (category && event.category !== category) return false;
      return true;
    });
  }, [payload, month, rating, timeOfDay, category]);

  const byDate = useMemo(() => {
    const map = new Map();
    for (const event of filtered) {
      if (!map.has(event.date)) map.set(event.date, []);
      map.get(event.date).push(event);
    }
    return map;
  }, [filtered]);

  const cells = useMemo(() => (month ? daysInMonth(month) : []), [month]);

  const dayEvents = selectedDate ? byDate.get(selectedDate) || [] : [];
  const detailPageCount = Math.max(1, Math.ceil(dayEvents.length / PAGE_SIZE));
  const safeDetailPage = Math.min(detailPage, detailPageCount - 1);
  const pagedEvents = dayEvents.slice(
    safeDetailPage * PAGE_SIZE,
    safeDetailPage * PAGE_SIZE + PAGE_SIZE,
  );

  useEffect(() => {
    setDetailPage(0);
  }, [selectedDate, rating, timeOfDay, category, month]);

  if (error) {
    return (
      <section id="calendar" className="landing-section home-panel home-panel--snap">
        <div className="home-panel-scroll">
          <div className="constrain home-panel-inner">
            <p className="muted">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!payload || !month) {
    return (
      <section id="calendar" className="landing-section home-panel home-panel--snap">
        <div className="home-panel-scroll">
          <div className="constrain home-panel-inner">
            <p className="muted">Loading calendar…</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="calendar" className="landing-section landing-section--pale home-panel home-panel--snap">
      <div className="home-panel-scroll">
        <div className="constrain home-panel-inner enr-cal">
          <h2 className="enr-cal-title">Calendar - All Programs</h2>

          <div className="enr-cal-filters" role="group" aria-label="Calendar filters">
            <label className="enr-cal-filter">
              <span>Month</span>
              <select value={month} onChange={(e) => { setMonth(e.target.value); setSelectedDate(null); }}>
                {(payload.filters.months || []).map((ym) => (
                  <option key={ym} value={ym}>
                    {monthLabel(ym)}
                  </option>
                ))}
              </select>
            </label>

            <label className="enr-cal-filter">
              <span>Rating</span>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="">Any rating</option>
                {(payload.filters.ratings || []).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

            <label className="enr-cal-filter">
              <span>Time</span>
              <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
                {TIME_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="enr-cal-filter">
              <span>Type</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Any type</option>
                {(payload.filters.categories || []).map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <p className="enr-cal-count">
            {filtered.length} session{filtered.length === 1 ? "" : "s"} in {monthLabel(month)}
          </p>

          <ul className="enr-cal-legend" aria-label="Program type colors">
            {(payload.filters.categories || []).map((value) => (
              <li key={value} className="enr-cal-legend-item">
                <span className={`enr-cal-dot enr-cal-dot--${categorySlug(value)}`} aria-hidden />
                <span>{value}</span>
              </li>
            ))}
          </ul>

          <div className="enr-cal-layout">
            <div className="enr-cal-grid" role="grid" aria-label={monthLabel(month)}>
              {WEEKDAYS.map((day) => (
                <div key={day} className="enr-cal-dow" role="columnheader">
                  {day}
                </div>
              ))}
              {cells.map((dateKey, index) => {
                if (!dateKey) {
                  return <div key={`empty-${index}`} className="enr-cal-cell enr-cal-cell--empty" />;
                }
                const events = byDate.get(dateKey) || [];
                const dayNum = Number(dateKey.slice(-2));
                const selected = selectedDate === dateKey;
                return (
                  <button
                    key={dateKey}
                    type="button"
                    className={`enr-cal-cell${events.length ? " has-events" : ""}${selected ? " is-selected" : ""}`}
                    onClick={() => setSelectedDate(dateKey)}
                    aria-pressed={selected}
                    aria-label={`${dateKey}, ${events.length} programs`}
                  >
                    <span className="enr-cal-daynum">{dayNum}</span>
                    {events.length > 0 ? (
                      <span className="enr-cal-dots" aria-hidden>
                        {events.slice(0, 3).map((event) => (
                          <span
                            key={event.id}
                            className={`enr-cal-dot enr-cal-dot--${categorySlug(event.category)}`}
                          />
                        ))}
                        {events.length > 3 ? <span className="enr-cal-more">+{events.length - 3}</span> : null}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <aside className="enr-cal-detail">
              <h3 className="enr-cal-detail-title">
                {selectedDate
                  ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Select a day"}
              </h3>
              {!selectedDate ? (
                <p className="enr-cal-detail-empty">Click a date to see programs.</p>
              ) : dayEvents.length === 0 ? (
                <p className="enr-cal-detail-empty">No programs match the filters for this day.</p>
              ) : (
                <>
                  <ul className="enr-cal-event-list">
                    {pagedEvents.map((event) => (
                      <li key={event.id} className="enr-cal-event">
                        <span className={`enr-cal-cat enr-cal-cat--${categorySlug(event.category)}`}>
                          {event.category}
                        </span>
                        <EventLink event={event} />
                        <p className="enr-cal-event-meta">
                          {[event.timeLabel, event.location, event.rating].filter(Boolean).join(" · ")}
                        </p>
                        {event.detail ? <p className="enr-cal-event-detail">{event.detail}</p> : null}
                      </li>
                    ))}
                  </ul>
                  {dayEvents.length > PAGE_SIZE ? (
                    <div className="enr-cal-pager" role="navigation" aria-label="Program list pages">
                      <button
                        type="button"
                        className="enr-cal-pager-btn"
                        onClick={() => setDetailPage((page) => Math.max(0, page - 1))}
                        disabled={safeDetailPage <= 0}
                        aria-label="Previous programs"
                      >
                        <span aria-hidden>‹</span>
                      </button>
                      <p className="enr-cal-pager-status">
                        {safeDetailPage * PAGE_SIZE + 1}–
                        {Math.min((safeDetailPage + 1) * PAGE_SIZE, dayEvents.length)} of {dayEvents.length}
                      </p>
                      <button
                        type="button"
                        className="enr-cal-pager-btn"
                        onClick={() => setDetailPage((page) => Math.min(detailPageCount - 1, page + 1))}
                        disabled={safeDetailPage >= detailPageCount - 1}
                        aria-label="Next programs"
                      >
                        <span aria-hidden>›</span>
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
