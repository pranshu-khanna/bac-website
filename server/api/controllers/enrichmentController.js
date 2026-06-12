const ENRICHMENT_BASE = "https://enrichment.bayareachess.com";

exports.getEnrichment = (_req, res) => {
  res.json({
    title: "Enrichment programs",
    intro:
      "Register for weekend clubs, camps, school enrichment, and Rising Stars through our enrichment site. Choose a program below — it opens in a new tab so you can return here anytime.",
    externalHome: ENRICHMENT_BASE,
    programs: [
      {
        slug: "home",
        title: "Enrichment home",
        description: "Browse all enrichment programs and registration options.",
        href: `${ENRICHMENT_BASE}/`,
      },
      {
        slug: "weekend-clubs",
        title: "Weekend clubs",
        description: "Regular club play and instruction on weekends.",
        href: `${ENRICHMENT_BASE}/weekend-clubs`,
      },
      {
        slug: "camps",
        title: "Chess camps",
        description: "Seasonal camps for scholastic players.",
        href: `${ENRICHMENT_BASE}/All`,
      },
      {
        slug: "school-enrichment",
        title: "School enrichment",
        description: "After-school chess at schools across the Bay Area.",
        href: `${ENRICHMENT_BASE}/enrichment`,
      },
      {
        slug: "rising-stars",
        title: "Rising Stars",
        description: "Programs for developing competitive players.",
        href: `${ENRICHMENT_BASE}/RisingStars`,
      },
    ],
  });
};
