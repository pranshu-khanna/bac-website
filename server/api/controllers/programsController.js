exports.getPrograms = (_req, res) => {
  res.json({
    title: "Programs",
    intro:
      "Bay Area Chess offers enrichment programs, weekend clubs, camps, and team opportunities for players at every level.",
    programs: [
      {
        title: "Weekend Clubs",
        description: "Regular club play and instruction on weekends.",
        href: "https://enrichment.bayareachess.com/weekend-clubs",
      },
      {
        title: "Chess Camps",
        description: "Seasonal camps for scholastic players.",
        href: "https://enrichment.bayareachess.com/camps/all",
      },
      {
        title: "School Enrichment",
        description: "After-school chess at schools across the Bay Area.",
        href: "https://enrichment.bayareachess.com/enrichment",
      },
      {
        title: "Rising Stars",
        description: "Programs for developing competitive players.",
        href: "https://enrichment.bayareachess.com/RisingStars",
      },
    ],
  });
};
