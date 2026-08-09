export function headerOffset() {
  const header = document.querySelector(".header");
  return header ? Math.ceil(header.getBoundingClientRect().height) : 0;
}

/** Scroll / snap to a home-page section by id, accounting for the sticky header. */
export function scrollToSection(id, { behavior = "smooth" } = {}) {
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;

  // Desktop snap mode listens for this and animates panel-to-panel.
  window.dispatchEvent(new CustomEvent("home:goto-section", { detail: { id } }));

  const snapping = document.documentElement.classList.contains("home-snap");
  const desktop = window.matchMedia("(min-width: 901px)").matches;
  if (snapping && desktop) return true;

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
