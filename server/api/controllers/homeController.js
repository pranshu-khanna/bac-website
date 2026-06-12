exports.getHome = (_req, res) => {
  res.json({
    hero: {
      badge: "USCF Chess Club of the Year 2018",
      title: "Chess for Every",
      titleEm: "Level, Every Age",
      description:
        "From first-timers to rated competitors, Bay Area Chess brings coaching, tournaments, and enrichment programs across the Bay.",
      primaryCta: { label: "View tournaments", path: "/tournaments" },
      secondaryCta: { label: "Explore programs", path: "/programs" },
    },
    stats: [
      { value: "15+", label: "Years serving the Bay Area" },
      { value: "1000s", label: "Players each year" },
      { value: "2018", label: "USCF Club of the Year" },
    ],
    pillars: [
      {
        title: "Rated Tournaments",
        description: "Weekly USCF-rated events for scholastic and adult players.",
        path: "/tournaments",
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
    membership: {
      title: "BAC Membership Benefits",
      perks: [
        "Required for all USCF-rated tournaments",
        "Member discounts on tournament entry fees",
        "Access to member-only camps and events",
      ],
      cta: {
        label: "Get / Renew USCF Membership",
        href: "https://bayareachess.com/my/memberships",
      },
    },
    bacoin: {
      title: "BACoin Rewards Program",
      description: "Earn BACoins at camps, clubs, and tournaments.",
      cta: { label: "View BACoin leaderboard", path: "/leaderboard" },
    },
  });
};
