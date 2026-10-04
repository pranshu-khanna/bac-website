import { useMemo } from "react";
import OsmPinsMap from "./OsmPinsMap";

export default function CampsMap({ locations, activeId, onSelect }) {
  const points = useMemo(
    () =>
      (locations || [])
        .filter((loc) => loc.lat != null && loc.lng != null)
        .map((loc) => ({
          id: loc.id,
          lat: loc.lat,
          lng: loc.lng,
          name: loc.name,
          title: `${loc.name}${loc.venue ? ` · ${loc.venue}` : ""}`,
        })),
    [locations],
  );

  if (!points.length) return null;

  return (
    <div className="enr-gmap-shell enr-camps-map-shell" role="region" aria-label="Bay Area camp map">
      <OsmPinsMap
        points={points}
        activeId={activeId}
        onSelect={onSelect}
        center={{ lat: 37.48, lng: -122.12 }}
        zoom={10}
        fitAll
      />
    </div>
  );
}
