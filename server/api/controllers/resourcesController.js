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
        path: "/#results",
      },
      { label: "FAQ", path: "/#faq" },
      { label: "BAC policies", href: "https://bayareachess.com/policy/" },
      { label: "BA€OINS", path: "/#leaderboard" },
      {
        label: "Enrichment programs",
        href: "https://enrichment.bayareachess.com/",
      },
    ],
  });
};
