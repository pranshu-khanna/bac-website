exports.getResources = (_req, res) => {
  res.json({
    title: "Resources",
    links: [
      {
        label: "Tournament calendar",
        href: "https://bayareachess.com/events/tournament-list/",
      },
      {
        label: "Results & ratings",
        href: "https://bayareachess.com/results/",
      },
      { label: "FAQ", href: "https://bayareachess.com/faq/" },
      { label: "BAC policies", href: "https://bayareachess.com/policy/" },
      { label: "BACoin leaderboard", path: "/leaderboard" },
      {
        label: "Enrichment programs",
        href: "https://enrichment.bayareachess.com/",
      },
    ],
  });
};
