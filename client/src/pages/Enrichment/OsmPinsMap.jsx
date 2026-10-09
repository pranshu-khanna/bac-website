import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = { lat: 37.48, lng: -122.12 };
const DEFAULT_ZOOM = 10;

const PIN = {
  defaultFill: "#1d5a8a",
  activeFill: "#ecc046",
  border: "#ffffff",
};

function pinStyle(active) {
  return {
    radius: active ? 9 : 8,
    color: PIN.border,
    weight: 2,
    fillColor: active ? PIN.activeFill : PIN.defaultFill,
    fillOpacity: 1,
    opacity: 1,
  };
}

/**
 * Free OpenStreetMap + Leaflet pin map.
 * `points` items need { id, lat, lng, name?, title? }.
 */
export default function OsmPinsMap({
  points = [],
  activeId = null,
  onSelect,
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  fitAll = true,
  className = "enr-gmap-canvas",
  showLabels = true,
}) {
  const hostRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const onSelectRef = useRef(onSelect);
  const pointsRef = useRef(points);
  const fitAllRef = useRef(fitAll);
  const zoomRef = useRef(zoom);
  const prevActiveRef = useRef(activeId);
  const [mapVersion, setMapVersion] = useState(0);

  onSelectRef.current = onSelect;
  pointsRef.current = points;
  fitAllRef.current = fitAll;
  zoomRef.current = zoom;

  const pointsKey = points.map((p) => `${p.id}:${p.lat},${p.lng}`).join("|");

  useEffect(() => {
    if (!hostRef.current) return undefined;

    const map = L.map(hostRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([center.lat, center.lng], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    mapRef.current = map;
    setMapVersion((v) => v + 1);

    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    const t1 = window.setTimeout(onResize, 80);
    const t2 = window.setTimeout(onResize, 320);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", onResize);
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current.clear();
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapVersion) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    const bounds = [];
    const currentPoints = pointsRef.current;
    currentPoints.forEach((point) => {
      if (point.lat == null || point.lng == null) return;
      const active = point.id === activeId;
      const marker = L.circleMarker([point.lat, point.lng], pinStyle(active));
      marker.bindTooltip(point.title || point.name || "", {
        permanent: Boolean(showLabels && (point.name || point.title)),
        direction: "bottom",
        offset: [0, 10],
        opacity: 1,
        className: `enr-osm-tooltip${active ? " is-active" : ""}`,
      });
      marker.on("click", () => onSelectRef.current?.(point.id));
      marker.addTo(map);
      markersRef.current.set(point.id, marker);
      bounds.push([point.lat, point.lng]);
    });

    if (fitAll && bounds.length > 1) {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11 });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], Math.max(zoom, fitAll ? 12 : zoom));
    }

    window.setTimeout(() => map.invalidateSize(), 40);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointsKey, fitAll, zoom, mapVersion, showLabels]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapVersion) return;

    markersRef.current.forEach((marker, id) => {
      const active = id === activeId;
      marker.setStyle(pinStyle(active));
      const el = marker.getTooltip()?.getElement();
      if (el) el.classList.toggle("is-active", active);
    });

    const hadSelection = prevActiveRef.current != null;
    prevActiveRef.current = activeId;

    if (activeId) {
      const active = pointsRef.current.find((p) => p.id === activeId);
      if (!active) return;
      map.panTo([active.lat, active.lng]);
      if (map.getZoom() < 12) map.setZoom(12);
      return;
    }

    // Close / clear selection → restore original overview.
    if (!hadSelection || !fitAllRef.current) return;
    const bounds = pointsRef.current
      .filter((p) => p.lat != null && p.lng != null)
      .map((p) => [p.lat, p.lng]);
    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [48, 48], maxZoom: 11 });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], Math.max(zoomRef.current, 12));
    }
  }, [activeId, mapVersion]);

  return <div ref={hostRef} className={className} role="presentation" />;
}

export function osmSearchUrl({ lat, lng, name, address, city }) {
  if (lat != null && lng != null) {
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
  }
  const q = encodeURIComponent([address, name, city, "CA"].filter(Boolean).join(", "));
  return `https://www.openstreetmap.org/search?query=${q}`;
}

export function googleMapsUrl({ lat, lng, name, address, city }) {
  if (lat != null && lng != null) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  const q = encodeURIComponent([address, name, city, "CA"].filter(Boolean).join(", "));
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
