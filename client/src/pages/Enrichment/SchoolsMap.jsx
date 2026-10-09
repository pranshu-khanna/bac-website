import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import OsmPinsMap, { osmSearchUrl } from "./OsmPinsMap";

function formatGrades(grades) {
  if (!grades?.length) return null;
  const short = grades.map((g) =>
    g
      .replace(" Grade", "")
      .replace("First", "1st")
      .replace("Second", "2nd")
      .replace("Third", "3rd")
      .replace("Fourth", "4th")
      .replace("Fifth", "5th")
      .replace("Sixth", "6th")
      .replace("Seventh", "7th")
      .replace("Eighth", "8th"),
  );
  if (short.length === 1) return short[0];
  return `${short[0]}–${short[short.length - 1]}`;
}

function ProgramCard({ program }) {
  const when =
    program.scheduleLine ||
    [
      program.days?.join(", "),
      program.startTime && program.endTime
        ? `${program.startTime} – ${program.endTime}`
        : program.startTime,
    ]
      .filter(Boolean)
      .join(" · ");

  const term =
    program.term ||
    (program.startDate && program.endDate && program.startDate !== program.endDate
      ? `${program.startDate} – ${program.endDate}`
      : program.startDate);

  return (
    <article className="enr-school-program">
      <h4>{program.title}</h4>
      {when ? <p className="enr-school-meta">{when}</p> : null}
      {term ? <p className="enr-school-meta">Term: {term}</p> : null}
      {program.noClassDates?.length ? (
        <p className="enr-school-meta">No class: {program.noClassDates.join("; ")}</p>
      ) : null}
      {formatGrades(program.grades) ? (
        <p className="enr-school-meta">Grades: {formatGrades(program.grades)}</p>
      ) : null}
      {program.room ? <p className="enr-school-meta">Room: {program.room}</p> : null}
      {program.fee ? (
        <p className="enr-school-meta">
          <strong>Fee: {program.fee}</strong>
        </p>
      ) : null}
      {program.coaches?.length ? (
        <p className="enr-school-meta">Coach: {program.coaches.join(", ")}</p>
      ) : null}
      {program.scheduleNote ? <p className="enr-school-note">{program.scheduleNote}</p> : null}
      {program.blurb ? <p className="enr-school-blurb">{program.blurb}</p> : null}
      <div className="enr-school-actions">
        {program.slug ? (
          <Link className="enr-cta enr-cta--compact" to={`/enrichment/${program.slug}`}>
            Details
          </Link>
        ) : null}
        {program.registerHref ? (
          <a className="enr-cta enr-cta--compact" href={program.registerHref} target="_blank" rel="noreferrer">
            Register ↗
          </a>
        ) : null}
        {program.flyerHref ? (
          <a href={program.flyerHref} target="_blank" rel="noreferrer">
            Flyer (PDF)
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function SchoolsMap({ schools }) {
  const campuses = useMemo(
    () => (schools?.campuses || []).filter((c) => c.lat && c.lng),
    [schools],
  );
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState("");
  const detailRef = useRef(null);

  const activeCampus = campuses.find((c) => c.id === activeId) || null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return campuses;
    return campuses.filter((c) => {
      const hay = `${c.name} ${c.city || ""} ${c.school || ""} ${c.address || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [campuses, query]);

  const mapPoints = useMemo(
    () =>
      campuses.map((c) => ({
        id: c.id,
        lat: c.lat,
        lng: c.lng,
        name: c.name,
        title: `${c.name}${c.city ? ` · ${c.city}` : ""}`,
      })),
    [campuses],
  );

  const select = (id) => {
    setActiveId(id);
    window.setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 40);
  };

  if (!campuses.length) return null;

  return (
    <div className="enr-schools-map">
      <div className="enr-schools-map-toolbar">
        <label className="enr-schools-search">
          <span className="enr-schools-search-label">Find a school</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by school or city"
            autoComplete="off"
          />
        </label>
        <p className="enr-map-hint">
          {campuses.length} campuses · click a pin or school for schedule, fee, and registration
        </p>
      </div>

      <div className="enr-schools-layout">
        <div className="enr-gmap-shell" role="region" aria-label="Bay Area school map">
          <OsmPinsMap
            points={mapPoints}
            activeId={activeId}
            onSelect={select}
            center={schools.mapCenter || { lat: 37.45, lng: -122.05 }}
            zoom={schools.mapZoom || 10}
            fitAll
            showLabels={false}
          />
        </div>

        <div className="enr-school-side">
          <ul className="enr-school-list">
            {filtered.map((campus) => {
              const active = campus.id === activeId;
              const sessions = campus.programs?.length || 0;
              return (
                <li key={campus.id}>
                  <button
                    type="button"
                    className={`enr-school-list-item${active ? " is-active" : ""}`}
                    onClick={() => select(campus.id)}
                    aria-pressed={active}
                  >
                    <strong>{campus.name}</strong>
                    <span>
                      {[campus.city, sessions > 1 ? `${sessions} sessions` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </button>
                </li>
              );
            })}
            {!filtered.length ? <li className="enr-school-empty">No schools match that search.</li> : null}
          </ul>
        </div>
      </div>

      <div ref={detailRef} className={`enr-school-detail${activeCampus ? " is-open" : ""}`}>
        {activeCampus ? (
          <>
            <div className="enr-school-detail-head">
              <div>
                <p className="enr-school-detail-kicker">{activeCampus.city || "Bay Area"}</p>
                <h3>{activeCampus.name}</h3>
                {activeCampus.address ? <p className="enr-school-detail-addr">{activeCampus.address}</p> : null}
                {!activeCampus.address && activeCampus.school ? (
                  <p className="enr-school-detail-addr">{activeCampus.school}</p>
                ) : null}
              </div>
              <button type="button" className="enr-school-detail-close" onClick={() => setActiveId(null)}>
                Close
              </button>
            </div>

            <div className="enr-school-detail-grid">
              <div className="enr-school-detail-map">
                <OsmPinsMap
                  key={activeCampus.id}
                  points={[
                    {
                      id: activeCampus.id,
                      lat: activeCampus.lat,
                      lng: activeCampus.lng,
                      name: activeCampus.name,
                      title: activeCampus.name,
                    },
                  ]}
                  activeId={activeCampus.id}
                  center={{ lat: activeCampus.lat, lng: activeCampus.lng }}
                  zoom={14}
                  fitAll={false}
                  className="enr-school-detail-osm"
                />
                <a
                  className="enr-school-gmaps-link"
                  href={osmSearchUrl(activeCampus)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in OpenStreetMap ↗
                </a>
              </div>
              <div className="enr-school-programs">
                {activeCampus.programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="enr-school-detail-placeholder">Select a school on the map to see program details.</p>
        )}
      </div>
    </div>
  );
}
