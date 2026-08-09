exports.getHome = (_req, res) => {
  res.json({
    hero: {
      badge: "USCF Chess Club of the Year 2018",
      title: "Transforming Lives",
      titleEm: "Through Chess",
      description:
        "From first-timers to rated competitors, Bay Area Chess brings coaching, tournaments, and enrichment programs across the Bay.",
    },
    stats: [
      { value: "20+", label: "Years serving the Bay Area" },
      { value: "2018", label: "USCF Club of the Year" },
    ],
    pillars: [
      {
        title: "Rated Tournaments",
        description: "Weekly USCF-rated events for scholastic and adult players.",
        path: "/#tournaments",
        linkLabel: "Browse tournaments",
      },
      {
        title: "Chess Camps",
        description: "Holiday and summer camps for beginners through advanced.",
        href: "https://enrichment.bayareachess.com/camps/all",
        linkLabel: "View camps",
      },
      {
        title: "After-School Programs",
        description: "School enrichment and weekend clubs across the region.",
        href: "https://enrichment.bayareachess.com/enrichment",
        linkLabel: "Learn more",
      },
      {
        title: "Tournament Team",
        description: "Team events and coordinated competitive opportunities.",
        href: "https://enrichment.bayareachess.com/event/bac-tournament-team-person",
        linkLabel: "Team info",
      },
    ],
  });
};
