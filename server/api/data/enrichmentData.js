const ENRICHMENT_BASE = "https://enrichment.bayareachess.com";

module.exports = {
  hero: {
    badge: "Camps · Clubs · Classes · Teams",
    title: "Welcome to Bay Area Chess",
    titleEm: "Enrichment",
    description:
      "To introduce children of all ages to everything chess has to offer — socially and academically — across the Bay Area and beyond. Scroll for classes, camps, after-school programs, clubs, teams, and Rising Star.",
  },
  stats: [
    { value: "6", label: "Weekly club locations" },
    { value: "1:12", label: "Coach to student ratio" },
  ],
  pillars: [
    {
      title: "Classes 2026",
      description: "Online chess lessons and practice games via Zoom and ChessKid.",
      section: "classes",
      linkLabel: "See classes",
    },
    {
      title: "BAC Camps",
      description: "Chess, master, and strategy-game camps for school breaks.",
      section: "camps",
      linkLabel: "See camps",
    },
    {
      title: "Afterschool",
      description: "On-campus chess at schools across the Bay Area.",
      section: "afterschool",
      linkLabel: "Find a school",
    },
    {
      title: "Clubs",
      description: "Drop-in weekend clubs — no registration, pay at the door.",
      section: "clubs",
      linkLabel: "See locations",
    },
    {
      title: "Teams",
      description: "In-person tournament team training for rated players.",
      section: "teams",
      linkLabel: "Team info",
    },
    {
      title: "Rising Star",
      description: "Practice tournament for unrated first-timers, plus a parent seminar.",
      section: "rising-star",
      linkLabel: "Next event",
    },
  ],
  programs: [
    {
      id: "classes",
      kicker: "Online",
      title: "Classes 2026",
      intro:
        "Chess lessons, practice tournament games, and instruction online via Zoom and ChessKid. Upcoming session: September 2 – October 16.",
      points: [
        "Wednesdays — Beginner to Advanced",
        "Thursdays — New players / Beginners",
        "Thursdays — Beginner to Intermediate",
        "Fridays — Beginner to Advanced II",
      ],
      body: "Skill levels follow BAC’s published curriculum. New players are welcome in the Thursday beginners class. Online FAQ and after-school FAQ live on the enrichment site.",
      ctaLabel: "Register for online classes",
      ctaHref: `${ENRICHMENT_BASE}/SPRING2022`,
      links: [
        { label: "Online FAQ", href: `${ENRICHMENT_BASE}/QandA` },
        { label: "Skill levels", href: `${ENRICHMENT_BASE}/online/SKILL_LEVELS` },
        { label: "New players", href: `${ENRICHMENT_BASE}/NewPlayers` },
      ],
    },
    {
      id: "camps",
      kicker: "School breaks",
      title: "BAC Camps",
      intro:
        "Chess, Master, and Strategy-Games camps during summer, fall, winter, and spring. Most sites offer two half-days (9am–1pm and 1–5pm). Join both for a full day — the child stays with us safely the whole day.",
      points: [
        "Palo Alto (UUCPA) — Regular, Master, and Strategy Games",
        "San Jose (BAC Main Office) — Regular and Master",
        "Fremont, Burlingame, Menlo College, Redwood City",
        "10% discount when you book 2 or more camps in one transaction",
      ],
      body: "Please register for the camp TYPE you want: Chess, Master, or Strategy-Games. Early drop-off and late pick-up are available at many sites.",
      ctaLabel: "Browse all camps",
      ctaHref: `${ENRICHMENT_BASE}/camps/all`,
      links: [
        { label: "Camp menu (All)", href: `${ENRICHMENT_BASE}/All` },
        { label: "Strategy-game camps", href: `${ENRICHMENT_BASE}/StrategyGameCamps` },
        { label: "Policies (PDF)", href: `${ENRICHMENT_BASE}/sites/default/files/2026-05/Policies.-2026.pdf` },
      ],
    },
    {
      id: "afterschool",
      kicker: "On campus",
      title: "After-school enrichment",
      intro:
        "BAC after-school chess programs are coming this Fall. Find your school, review the class schedule, and register your student. Most schools are closed campus — only students at that school may join.",
      points: [
        "Each hour: lesson (20–30 min), practice games, and individual coaching",
        "Morning, lunchtime, after-school, or early evening — most popular is right after dismissal",
        "We provide all equipment: sets, boards, and workbooks",
        "Standard coach:student ratio is 1:12 or better",
        "10% sibling discount when registered in one transaction",
        "Financial aid available with documentation of need",
      ],
      faqs: [
        {
          q: "What will my child learn?",
          a: "We teach chess as a healthy academic game — patience, planning, and decision-making. We also teach the value of losing, learning from mistakes, and sportsmanship.",
        },
        {
          q: "How do rewards work?",
          a: "Students earn enrichment points for learning and behavior, then collect rewards, trophies, and medals. Points are cumulative year after year.",
        },
        {
          q: "Late pick-up?",
          a: "0–10 min no charge. 10–20 min $20. 20–30 min $40. 30–60 min $80. Fees go to the coach, not BAC.",
        },
        {
          q: "Cancellation / refund?",
          a: "Refund before the first class minus a $25 fee. After the first class but before the second: prorated minus one class and $25. No refunds after the second class.",
        },
      ],
      ctaLabel: "Register for Fall after-school chess",
      ctaHref: `${ENRICHMENT_BASE}/enrichment`,
      links: [
        { label: "After-school classes list", href: `${ENRICHMENT_BASE}/afterschool-event-view` },
        { label: "General info & FAQ", href: `${ENRICHMENT_BASE}/afterschool` },
        { label: "Coaches", href: `${ENRICHMENT_BASE}/coaches` },
        { label: "FSA receipts", href: `${ENRICHMENT_BASE}/fsa-receipts` },
      ],
    },
    {
      id: "clubs",
      kicker: "Drop-in",
      title: "BAC in-person clubs",
      intro:
        "No need to register. Clubs are pay-at-the-door. Sessions are about 50% live instruction and 50% games. Open nearly every weekend — check off-dates below. Ages ~5–16.",
      body: "Buy a bundle and save 20%: 8 classes, get 2 free. Bundles last 12 months and do not have to be used on consecutive weekends. Bundles are purchased on-site with the coach, not online.",
      table: {
        columns: ["Day", "Location", "Time", "Levels", "Fee", "Off dates"],
        rows: [
          ["Friday", "Fremont", "4:30–6:00pm", "New / Beginner / Intermediate u1100", "$30", "First day back: 9/18"],
          ["Saturday", "San Jose", "9:30–11:30am", "New / Beginner / Intermediate u1100", "$40", "Off: 12/26 (open 11/28)"],
          ["Saturday", "Palo Alto", "2:30–4:30pm", "New / Beginner / Intermediate u1100", "$40", "Off: 11/28, 12/26"],
          ["Saturday", "Los Gatos", "3:00–5:00pm", "New / Beginner / Intermediate u1100", "$40", "Off: 9/12, 11/28, 12/26"],
          ["Sunday", "Cupertino", "5:00–7:00pm", "New / Beginner / Intermediate u1250", "$40", "No off-dates"],
          ["Monday", "Santa Clara (Int/Adv)", "5:30–7:00 or 7:00–8:30", "500–1400 USCF", "$30 or $50", "No off-dates"],
          ["Thursday", "Palo Alto", "6:00–7:30pm", "New / Beginner / Intermediate u1100", "$30", "Reopens 8/27/26 · Off: 11/26"],
        ],
      },
      ctaLabel: "Club details & registration",
      ctaHref: `${ENRICHMENT_BASE}/weekend-clubs`,
      links: [
        { label: "San Jose (Sat 9:30am)", href: `${ENRICHMENT_BASE}/SanJoseChessClub22-23` },
        { label: "Los Gatos (3pm)", href: `${ENRICHMENT_BASE}/LosGatosChessClub` },
        { label: "Palo Alto (Sat 2:30pm)", href: `${ENRICHMENT_BASE}/PaloAltoInPersonChessClub` },
        { label: "Palo Alto (Thu 6pm)", href: `${ENRICHMENT_BASE}/PaloAltoThursdays` },
        { label: "Cupertino (Sun 5pm)", href: `${ENRICHMENT_BASE}/club/cupertino-sunday-person-drop-club` },
        { label: "Santa Clara (Mon 5:30pm)", href: `${ENRICHMENT_BASE}/SanJoseAdvancedChessClub25` },
        { label: "Fremont (Fri 4:30pm)", href: `${ENRICHMENT_BASE}/FremontChessClub22-23` },
      ],
    },
    {
      id: "teams",
      kicker: "Rated players",
      title: "BAC Tournament Team",
      intro:
        "In-person Saturday training for serious scholastic players. Fall 2026: 8 sessions, September–December (dates to be announced). 2-hour advanced classes, BAC shirt, BAC workbook, and one free enrollment to a CalChess Super-States tournament.",
      points: [
        "Saturdays 12:00–2:00pm at UUCPA, 505 E Charleston Rd, Palo Alto",
        "Required: 600–1500 USCF, ages 6–15, about one rated event per month",
        "Spring 2026 team averaged +191 USCF points per student in 3 months",
        "24 seats. Apply first — accepted players are invited to register",
        "No make-ups, trials, or drop-ins. Join if you can attend at least 6 of 8 Saturdays",
      ],
      body: "Led by Senior Coach Wolfgang Behm. Study master games, openings, middlegame and endgame. Students submit personal games for titled-player analysis. Unrated or under 600: play more rated events first, or visit the Palo Alto Saturday club at the same site.",
      ctaLabel: "Apply for the team",
      ctaHref: `${ENRICHMENT_BASE}/event/bac-tournament-team-person`,
      links: [
        { label: "Tournament site (rated events)", href: "https://www.bayareachess.com" },
      ],
    },
    {
      id: "rising-star",
      kicker: "First tournament",
      title: "Rising Star",
      intro:
        "A non-rated practice tournament for players with no prior over-the-board USCF experience, plus a parent seminar while the kids play. Each player may participate in only one Rising Star event.",
      highlight: {
        when: "Saturday, September 12 · 12:15–1:45pm",
        where: "Unitarian Universalist Church of Palo Alto, 505 East Charleston Road, Fireside Room",
        cost: "$35",
      },
      points: [
        "3 or 4 games in Quad or Swiss format — everyone plays every round",
        "Practice touch-move, etiquette, and standard tournament procedures",
        "No USCF membership required",
        "Every participant receives a BAC medal or T-shirt",
        "Boards, sets, notation sheets, and pencils provided",
        "You may register online (must be logged in) or pay on-site 10–15 minutes early",
      ],
      body: "Cancellations before the day of the event are subject to a $3 fee. Questions: enrich@bayareachess.com.",
      ctaLabel: "Rising Star event page",
      ctaHref: `${ENRICHMENT_BASE}/RisingStars`,
    },
  ],
  contact: {
    kicker: "Two sites",
    title: "Contact enrichment",
    intro:
      "Camps, classes, clubs, ChessKid, practice events, and teams use this enrichment site. Rated USCF tournaments use the tournament site — they have different logins.",
    email: "enrich@bayareachess.com",
    notes: [
      "Enrichment (you are here): enrich@bayareachess.com",
      "Tournaments: events@bayareachess.com · bayareachess.com",
    ],
  },
  externalHome: ENRICHMENT_BASE,
  launchPrograms: [
    { slug: "home", section: "" },
    { slug: "weekend-clubs", section: "clubs" },
    { slug: "camps", section: "camps" },
    { slug: "school-enrichment", section: "afterschool" },
    { slug: "rising-stars", section: "rising-star" },
  ],
};
