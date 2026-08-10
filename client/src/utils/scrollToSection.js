export function headerOffset() {
  const header = document.querySelector(".header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}

/** Scroll / snap to a home-page section by id, accounting for the sticky header. */
export function scrollToSection(id, { behavior = "smooth" } = {}) {
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;

  const snapping = document.documentElement.classList.contains("home-snap");
  const desktop = window.matchMedia("(min-width: 901px)").matches;

  if (snapping && desktop) {
    window.dispatchEvent(new CustomEvent("home:goto-section", { detail: { id } }));
    // Fallback if the snap listener isn't ready yet.
    window.setTimeout(() => {
      const stillOff =
        Math.abs(el.getBoundingClientRect().top - headerOffset()) > 24;
      if (stillOff) {
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset() - 8;
        window.scrollTo({ top: Math.max(0, top), behavior });
      }
    }, 100);
    return true;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset() - 8;
  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
}

export const HOME_SECTIONS = [
  "tournaments",
  "leaderboard",
  "enrichment",
  "results",
  "faq",
  "about",
  "contact",
];
