import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const WHEEL_THRESHOLD = 280;
const TOUCH_THRESHOLD = 90;
const ANIM_DURATION = 1.2;
const PULL_MAX = 72;

function getSnapSections() {
  return [...document.querySelectorAll(".landing-home > .home-panel--snap")].filter(Boolean);
}

function headerOffset() {
  const header = document.querySelector(".header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}

function sectionIndex(sections) {
  const y = window.scrollY + headerOffset() + 8;
  let idx = 0;
  sections.forEach((section, i) => {
    if (section.offsetTop <= y) idx = i;
  });
  return idx;
}

function scrollPort(section) {
  return section?.querySelector?.(":scope > .home-panel-scroll") || null;
}

function canScrollInner(section, dir) {
  const port = scrollPort(section);
  if (!port) return false;
  const max = port.scrollHeight - port.clientHeight;
  if (max <= 2) return false;
  if (dir > 0) return port.scrollTop < max - 2;
  return port.scrollTop > 2;
}

function parseStatValue(raw) {
  const text = String(raw || "").trim();
  const match = text.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { value: Number.parseInt(match[1], 10), suffix: match[2] || "" };
}

function resetStats(section) {
  const host = section?.querySelector?.(".landing-stats") || section;
  if (!host?.querySelector?.(".landing-stat-num")) return;
  delete section.dataset.entered;
  const nums = host.querySelectorAll(".landing-stat-num");
  gsap.killTweensOf(nums);
  nums.forEach((el) => {
    if (el.dataset.value) el.textContent = el.dataset.value;
  });
}

function playStatNumbers(section) {
  const host = section?.querySelector?.(".landing-stats") || section;
  if (!host?.querySelector?.(".landing-stat-num")) return;
  section.dataset.entered = "1";

  const nums = host.querySelectorAll(".landing-stat-num");
  nums.forEach((el) => {
    gsap.killTweensOf(el);
    const parsed = parseStatValue(el.dataset.value || el.textContent);
    if (!parsed) return;

    const state = { value: 0 };
    el.textContent = `0${parsed.suffix}`;
    gsap.to(state, {
      value: parsed.value,
      duration: 1.15,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = `${Math.round(state.value)}${parsed.suffix}`;
      },
    });
  });
}

/**
 * Full-viewport section snap with a heavy mouse pull. One panel at a time.
 */
export function useHomeScroll(enabled) {
  const animatingRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const touchYRef = useRef(0);

  useEffect(() => {
    if (!enabled) return undefined;

    const root = document.documentElement;
    root.classList.add("home-snap");
    document.body.classList.add("home-scroll-lock");

    const syncHeaderOffset = () => {
      root.style.setProperty("--header-offset", `${headerOffset()}px`);
    };
    syncHeaderOffset();

    document.querySelectorAll(".landing-stat-num").forEach((el) => {
      if (!el.dataset.value) el.dataset.value = el.textContent.trim();
    });

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canSnap = () => desktopQuery.matches && !motionQuery.matches;

    const clearEdgeHints = () => {
      getSnapSections().forEach((section) => {
        section.classList.remove("is-near-end", "is-active-panel");
      });
    };

    const syncEdgeHint = (section, { draggingDown = false } = {}) => {
      clearEdgeHints();
      if (!section) return;
      section.classList.add("is-active-panel");

      const port = scrollPort(section);
      if (!port) {
        // Short panels: only show the strip while pulling hard toward the next section.
        if (draggingDown) section.classList.remove("is-near-end");
        return;
      }

      const max = port.scrollHeight - port.clientHeight;
      const nearBottom = max <= 2 ? false : port.scrollTop >= max - 48;
      section.classList.toggle("is-near-end", nearBottom);
    };

    const clearPull = () => {
      getSnapSections().forEach((section) => {
        section.style.transform = "";
      });
      root.style.setProperty("--home-drag", "0");
    };

    const goToSnap = (index, { force = false } = {}) => {
      const sections = getSnapSections();
      if (!sections.length) return;
      if (animatingRef.current && !force) return;

      const next = Math.max(0, Math.min(sections.length - 1, index));
      const target = sections[next];
      const prev = sections[sectionIndex(sections)];

      // Allow menu clicks to interrupt an in-flight snap.
      gsap.killTweensOf(window);
      animatingRef.current = true;
      wheelDeltaRef.current = 0;
      root.classList.add("home-snapping");
      clearPull();

      if (prev && prev !== target) resetStats(prev);
      resetStats(target);
      clearEdgeHints();

      const port = scrollPort(target);
      if (port) port.scrollTop = 0;

      gsap.to(window, {
        duration: force ? Math.min(ANIM_DURATION, 0.95) : ANIM_DURATION,
        scrollTo: { y: target, offsetY: headerOffset(), autoKill: false },
        ease: "power3.inOut",
        overwrite: true,
        onComplete: () => {
          animatingRef.current = false;
          root.classList.remove("home-snapping");
          playStatNumbers(target);
          syncEdgeHint(target);
        },
      });
    };

    const goToSectionId = (id) => {
      const sections = getSnapSections();
      const idx = sections.findIndex((section) => section.id === id);
      if (idx >= 0) goToSnap(idx, { force: true });
    };

    const onGotoSection = (event) => {
      const id = event?.detail?.id;
      if (!id) return;
      goToSectionId(id);
    };

    const onWheel = (event) => {
      if (!canSnap()) return;
      if (animatingRef.current) {
        event.preventDefault();
        return;
      }

      const sections = getSnapSections();
      const idx = sectionIndex(sections);
      const current = sections[idx];
      const dir = event.deltaY > 0 ? 1 : -1;

      // Tall panels: scroll inside the panel first, then snap at the edges.
      if (current && canScrollInner(current, dir)) {
        const port = scrollPort(current);
        if (port) {
          port.scrollTop += event.deltaY;
          event.preventDefault();
          wheelDeltaRef.current = 0;
          clearPull();
          syncEdgeHint(current);
          return;
        }
      }

      event.preventDefault();
      wheelDeltaRef.current += event.deltaY;

      const drag = Math.min(1, Math.abs(wheelDeltaRef.current) / WHEEL_THRESHOLD);
      const pull = (wheelDeltaRef.current > 0 ? -1 : 1) * drag * PULL_MAX;
      root.style.setProperty("--home-drag", String(dir > 0 ? drag : 0));
      if (current) current.style.transform = `translate3d(0, ${pull}px, 0)`;
      syncEdgeHint(current, { draggingDown: dir > 0 });

      // Preview the neighboring section with a slight counter-pull.
      const neighbor = sections[idx + dir];
      if (neighbor) {
        neighbor.style.transform = `translate3d(0, ${(dir > 0 ? 1 : -1) * (1 - drag) * 28}px, 0)`;
      }

      if (Math.abs(wheelDeltaRef.current) < WHEEL_THRESHOLD) return;

      wheelDeltaRef.current = 0;
      clearPull();
      clearEdgeHints();
      goToSnap(idx + dir);
    };

    const onTouchStart = (event) => {
      if (!canSnap()) return;
      touchYRef.current = event.touches[0]?.clientY || 0;
    };

    const onTouchEnd = (event) => {
      if (!canSnap() || animatingRef.current) return;
      const endY = event.changedTouches[0]?.clientY || 0;
      const delta = touchYRef.current - endY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;

      const sections = getSnapSections();
      const idx = sectionIndex(sections);
      const dir = delta > 0 ? 1 : -1;
      const current = sections[idx];

      if (current && canScrollInner(current, dir)) return;
      goToSnap(idx + dir);
    };

    const onKeyDown = (event) => {
      if (!canSnap() || animatingRef.current) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest("input, textarea, select, [contenteditable='true']"))
      ) {
        return;
      }

      const sections = getSnapSections();
      const idx = sectionIndex(sections);

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        const current = sections[idx];
        if (current && canScrollInner(current, 1)) {
          const port = scrollPort(current);
          if (port) port.scrollTop += Math.min(240, port.clientHeight * 0.85);
          return;
        }
        goToSnap(idx + 1);
      }
      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        const current = sections[idx];
        if (current && canScrollInner(current, -1)) {
          const port = scrollPort(current);
          if (port) port.scrollTop -= Math.min(240, port.clientHeight * 0.85);
          return;
        }
        goToSnap(idx - 1);
      }
    };

    window.addEventListener("resize", syncHeaderOffset);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("home:goto-section", onGotoSection);

    const sections = getSnapSections();
    if (sections[0]) syncEdgeHint(sections[sectionIndex(sections)]);

    return () => {
      gsap.killTweensOf(window);
      clearEdgeHints();
      root.classList.remove("home-snap", "home-snapping", "home-free-scroll");
      document.body.classList.remove("home-scroll-lock");
      root.style.removeProperty("--header-offset");
      root.style.removeProperty("--home-drag");
      window.removeEventListener("resize", syncHeaderOffset);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("home:goto-section", onGotoSection);
    };
  }, [enabled]);
}
