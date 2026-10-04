const ENRICHMENT_BASE = "https://enrichment.bayareachess.com";
const POLICIES_PDF = `${ENRICHMENT_BASE}/sites/default/files/2026-05/Policies.-2026.pdf`;
const TEAM_APPLY =
  "https://docs.google.com/forms/d/e/1FAIpQLSf_CJ5BJ1CaeBkzAjBbzsGgB_hdWhuqEQBhf5J_vQ8V62xL_g/viewform";
const schoolMap = require("./enrichmentSchools");

const L = (path) => (path.startsWith("http") ? path : `${ENRICHMENT_BASE}${path}`);

module.exports = {
  hero: {
    badge: "Camps · Clubs · Classes · Teams",
    title: "Welcome to Bay Area Chess",
    titleEm: "Enrichment",
    description:
      "Chess for every age and level — online classes, school programs, drop-in clubs, seasonal camps, tournament teams, and first-time practice events across the Bay Area.",
  },
  stats: [
    { value: "100+", label: "School & online programs" },
    { value: "7", label: "Weekly club locations" },
    { value: "1:10", label: "Online coach ratio target" },
  ],
  pillars: [
    { title: "Classes", description: "Live Zoom + ChessKid lessons, beginner through advanced.", section: "classes", linkLabel: "See classes" },
    { title: "Camps", description: "Chess, Master, and Strategy-Games camps on school breaks.", section: "camps", linkLabel: "Find a camp" },
    { title: "Afterschool", description: "On-campus and lunchtime chess at Bay Area schools.", section: "afterschool", linkLabel: "Find a school" },
    { title: "Clubs", description: "Drop-in weekly clubs — register online or pay at the door.", section: "clubs", linkLabel: "Club schedule" },
    { title: "Teams", description: "Tournament-focused training for rated scholastic players.", section: "teams", linkLabel: "Team info" },
    { title: "Rising Star", description: "Practice tournament for unrated first-timers + parent seminar.", section: "rising-star", linkLabel: "Next event" },
  ],
  featured: [
    {
      tag: "Special guest · Oct 12",
      title: "GM Andrew Hong Lecture & Simul",
      detail: "2598 FIDE · World #152 active. Limited simul boards — reserve online.",
      when: "Mon Oct 12 · 5:30–8:30 PM · Santa Clara",
      cost: "$50 Lecture + Simul · $25 lecture only",
      ctaLabel: "Details",
      ctaHref: "/enrichment/simul",
      section: "clubs",
    },
    {
      tag: "Fall team",
      title: "BAC Tournament Team",
      detail: "8 Saturday sessions · Ages 6–15 · USCF 600–1600 · Palo Alto",
      when: "Select Saturdays · 12–2 PM · starts Sept 19",
      ctaLabel: "Apply",
      ctaHref: TEAM_APPLY,
      secondaryLabel: "Details",
      secondaryHref: "/enrichment/tournament-team",
      section: "teams",
    },
    {
      tag: "Online · open",
      title: "Online Chess Classes",
      detail: "Zoom & ChessKid · late enrollment prorated. Next term starts late October.",
      when: "Wed / Thu / Fri · 5:15–6:15 PM PST",
      ctaLabel: "Class list",
      ctaHref: "/enrichment/online",
      section: "classes",
    },
    {
      tag: "Practice",
      title: "Rising Star",
      detail: "For unrated first-timers only. Parent seminar while kids play.",
      when: "Sat Oct 3 · 4:45–6:15 PM · UUCPA · $35",
      ctaLabel: "Details",
      ctaHref: "/enrichment/rising-stars",
      section: "rising-star",
    },
  ],

  classes: {
    id: "classes",
    kicker: "Online",
    title: "Online chess classes",
    intro:
      "60-minute live sessions once per week via Zoom and ChessKid. Lessons and gameplay in one class; larger groups use Zoom breakouts. New online students receive a ChessKid Gold membership (if not already in the BAC club).",
    notice: "Current term still open · Late enrollment prorated · Next Track A term starts late October",
    points: [
      "Track A: 7-week terms with a championship on the final class",
      "Track S (summer): 6-week sessions with multi-class bundle options",
      "Register for as many classes as you like — 10% off extra items in the same checkout",
      "Target coach ratio 10:1 or better · Orientations/Zoom links ~24 hours before first session",
      "ChessKid memberships emailed a few days before the course starts",
    ],
    currentSessions: [
      {
        label: "Wednesdays — Beginner to Advanced I · 5:15–6:15 PM (9/2–10/14)",
        href: L("/event/26-level-2-4-beginner-advanced-i-wednesdays-515-615-pm-pst-92-1014"),
      },
      {
        label: "Thursdays — Absolute Beginner / Beginner · 5:15–6:15 PM (9/3–10/15)",
        href: L("/event/26-level-115-absolute-beginnerbeginner-thursdays-515-615pm-pst-93-1015"),
      },
      {
        label: "Thursdays — Beginner to Intermediate · 5:15–6:15 PM (9/3–10/15)",
        href: L("/event/26-level-23-beginner-intermediate-thursdays-515-615-pm-pst-93-1015"),
      },
      {
        label: "Fridays — Beginner to Advanced II · 5:15–6:15 PM (9/4–10/16)",
        href: L("/event/26-level-2-5-beginneradvanced-2-fridays-515-615-pm-pst-94-1016"),
      },
    ],
    upcomingSessions: [
      {
        label: "Wednesdays — Beginner to Advanced I · 5:15–6:15 PM (10/28–12/16)",
        href: "/enrichment/online",
      },
      {
        label: "Thursdays — Absolute Beginner / Beginner · 5:15–6:15 PM (10/29–12/17)",
        href: "/enrichment/online",
      },
      {
        label: "Thursdays — Beginner to Intermediate · 5:15–6:15 PM (10/29–12/17)",
        href: "/enrichment/online",
      },
      {
        label: "Fridays — Beginner to Advanced II · 5:15–6:15 PM (10/30–12/18)",
        href: "/enrichment/online",
      },
    ],
    skillLevels: [
      { level: "1", name: "Absolute Beginners", detail: "Brand new — still learning pieces; cannot checkmate alone." },
      { level: "2", name: "Beginner", detail: "~0–400 USCF / ChessKid ~400–999. Completes games without help." },
      { level: "3", name: "Intermediate", detail: "~350–850 USCF / ChessKid ~1000–1299." },
      { level: "4", name: "Advanced I", detail: "~850–1250 USCF / ChessKid ~1300–1599." },
      { level: "5", name: "Advanced II", detail: "~1200–1500 USCF / ChessKid 1600+. Higher: ask about teams." },
    ],
    faqs: [
      {
        q: "When do I get Zoom / ChessKid info?",
        a: "ChessKid memberships are emailed a few days before the course starts. Orientations with schedule and Zoom links go out ~24 hours before the first session. Late registrants receive info as soon as we process the order. Check spam (especially Hotmail) before emailing enrich@bayareachess.com.",
      },
      {
        q: "Can I take more than one class per week?",
        a: "Yes — courses are à la carte. Multiple purchases in one transaction trigger a 10% discount on the extra items. Summer Track S also offers multi-class passes.",
      },
      {
        q: "Are there trial classes?",
        a: "We do not offer term trials. Occasional single-session online options may be posted separately.",
      },
    ],
    ctaLabel: "Online classes guide",
    ctaHref: "/enrichment/online",
    links: [
      { label: "Online FAQ", href: "/enrichment/faq-online" },
      { label: "Skill levels", href: "/enrichment/skill-levels" },
      { label: "New players guide", href: "/enrichment/new-players" },
      { label: "Policies (PDF)", href: POLICIES_PDF },
    ],
  },

  camps: {
    id: "camps",
    kicker: "School breaks",
    title: "Fall & winter camps",
    intro:
      "Chess, Master, and Strategy-Games camps during school breaks. Most sites offer morning and afternoon half-days — book both for a full day (unique curriculum each half; multi-camp checkout discount applies). Click a city on the map to jump to that location’s sessions.",
    points: [
      "Camp types: Chess · Master (ages 7–17, typically USCF 800+ / online 1400+) · Strategy-Games (STEM-style board games — not chess)",
      "10% discount when booking 2+ camps in one transaction",
      "Redwood City & Burlingame sessions may also be listed via City Parks & Rec",
      "Early drop-off / late pick-up available at many sites",
    ],
    mapHint: "Select a city to view sessions and registration links",
    locations: [
      {
        id: "san-jose",
        name: "San Jose",
        venue: "BAC Main Office",
        address: "2050 Concourse Drive #42, San Jose, CA 95131",
        lat: 37.3960887,
        lng: -121.8901382,
        map: { x: 62, y: 78 },
        sessions: [
          { when: "Sep 7 (Labor Day)", slots: [
            { label: "9AM–1PM", href: L("/camp/26-labor-day-chess-camp-9am-1pm-san-jose-972026") },
            { label: "1PM–5PM", href: L("/camp/26-labor-day-chess-camp-1pm-5pm-san-jose-972026") },
          ]},
          { when: "Nov 23–25 · Thanksgiving", type: "Chess", slots: [
            { label: "9AM–1PM", href: L("/camp/26-thanksgiving-chess-camp-9am-1pm-san-jose-1123-1125") },
          ]},
          { when: "Dec 21–23 · Winter", type: "Chess", slots: [
            { label: "9AM–1PM", href: L("/camp/26-winter-chess-camp-9am-1pm-san-jose-1221-1223") },
            { label: "1PM–5PM", href: L("/camp/26-winter-chess-camp-1pm-5pm-san-jose-1221-1223") },
          ]},
          { when: "Dec 28–31 · Winter", type: "Chess", slots: [
            { label: "9AM–1PM", href: L("/camp/26-winter-chess-camp-9am-1pm-san-jose-1228-1231") },
            { label: "1PM–5PM", href: L("/camp/26-winter-chess-camp-1pm-5pm-san-jose-1228-1231") },
          ]},
        ],
      },
      {
        id: "palo-alto",
        name: "Palo Alto",
        venue: "UUCPA · 505 E Charleston Rd",
        address: "505 East Charleston Road, Palo Alto, CA 94306",
        lat: 37.4195304,
        lng: -122.1122848,
        map: { x: 48, y: 58 },
        sessions: [
          { when: "Nov 23–25 · Thanksgiving", type: "Chess", slots: [
            { label: "9AM–1PM", href: L("/camp/26-thanksgiving-chess-camp-9am-1pm-palo-alto-1123-1125") },
            { label: "1PM–5PM", href: L("/camp/26-thanksgiving-chess-camp-1pm-5pm-palo-alto-1123-1125") },
          ]},
          { when: "Nov 23–25 · Thanksgiving", type: "Master", slots: [
            { label: "9AM–1PM", href: L("/camp/26-thanksgiving-master-chess-camp-9am-1pm-palo-alto-1123-1125") },
          ]},
          { when: "Dec 21–23 · Winter", type: "Chess", slots: [
            { label: "9AM–1PM", href: L("/camp/26-winter-chess-camp-9am-1pm-palo-alto-1221-1223") },
            { label: "1PM–5PM", href: L("/camp/26-winter-chess-camp-1pm-5pm-palo-alto-1221-1223") },
          ]},
          { when: "Dec 21–23 · Winter", type: "Master", slots: [
            { label: "9AM–1PM", href: L("/camp/26-winter-master-chess-camp-9am-1pm-palo-alto-1221-1223") },
          ]},
          { when: "Dec 28–31 · Winter", type: "Chess", slots: [
            { label: "9AM–1PM", href: L("/camp/26-winter-chess-camp-9am-1pm-palo-alto-1228-1231") },
            { label: "1PM–5PM", href: L("/camp/26-winter-chess-camp-1pm-5pm-palo-alto-1228-1231") },
          ]},
          { when: "Dec 28–31 · Winter", type: "Strategy Games", slots: [
            { label: "9AM–1PM", href: L("/camp/26-winter-strategy-games-camp-9am-1pm-palo-alto-1228-1231") },
          ]},
        ],
      },
      {
        id: "redwood-city",
        name: "Redwood City",
        venue: "Sandpiper Community Center",
        address: "797 Redwood Shores Parkway, Redwood City, CA 94065",
        lat: 37.5375647,
        lng: -122.2358523,
        map: { x: 38, y: 48 },
        sessions: [
          { when: "Sep 28 · Fall", type: "Chess", slots: [
            { label: "9AM–12PM", href: L("/camp/26-fall-chess-camp-sandpiper-community-center-redwood-city-9am-12pm-928") },
          ]},
          { when: "Oct 12 · Fall", type: "Chess", slots: [
            { label: "9AM–12PM", href: L("/camp/26-fall-chess-camp-sandpiper-community-center-redwood-city-9am-12pm-1012") },
          ]},
          { when: "Nov 23–25 · Thanksgiving", type: "Chess", slots: [
            { label: "1PM–4PM", href: L("/camp/26-thanksgiving-chess-camp-sandpiper-community-center-redwood-city-1-4pm-1123-1125") },
          ]},
          { when: "Nov 23–25 · Thanksgiving", type: "Strategy Games", slots: [
            { label: "9AM–12PM", href: L("/camp/26-thanksgiving-strategy-game-camp-sandpiper-community-center-redwood-city-9am-12pm-1123-1125") },
          ]},
        ],
      },
      {
        id: "burlingame",
        name: "Burlingame",
        venue: "Burlingame Community Center",
        address: "850 Burlingame Avenue, Burlingame, CA 94010",
        lat: 37.5819425,
        lng: -122.3428703,
        map: { x: 28, y: 32 },
        sessions: [
          { when: "Dec 21–23 · Winter", type: "Chess", slots: [
            { label: "9AM–12PM", href: L("/camp/26-winter-chess-camp-9am-12pm-burlingame-1221-1223") },
            { label: "1PM–4PM", href: L("/camp/26-winter-chess-camp-1-4pm-burlingame-1221-1223") },
          ]},
        ],
      },
    ],
    strategyNote:
      "Strategy-Games camps teach logic, probability, and game design through board games (not chess). Led by coaches James Bethany and Jason Uerkvitz. Also available as Saturday clubs in San Jose (combo) and Palo Alto.",
    ctaLabel: "Camp guide",
    ctaHref: "/enrichment/camps-all",
    links: [
      { label: "Camp menu (All)", href: "/enrichment/camps-all" },
      { label: "Camps by city", href: "/enrichment/camps-menu" },
      { label: "Strategy-Games camps", href: "/enrichment/strategy-games" },
      { label: "Policies (PDF)", href: POLICIES_PDF },
    ],
  },

  afterschool: {
    id: "afterschool",
    kicker: "On campus",
    title: "After-school & lunchtime",
    intro:
      "Weekly on-campus chess at schools across the Bay Area. Most campuses are closed — only students enrolled at that school may join. Don’t see your school? Email enrich@bayareachess.com and we can help start a program.",
    points: [
      "Each hour: lesson (20–30 min), practice games, and individual coaching",
      "Morning, lunchtime, after-school, or early evening — after dismissal is most popular",
      "All equipment provided · coach:student ratio typically 1:12 or better",
      "10% sibling discount in one transaction · financial aid with documented need",
      "All coaches: background check + TB test",
    ],
    lunchtime: {
      title: "Lunchtime chess",
      body: "Casual open-play during lunch — no roster required for students. Flat fee ~$105/week (50–75 min) billed to school or PTA. Ideal for inclusive, no-cost-to-families programs.",
      href: "/enrichment/lunchtime",
    },
    schoolsHeading: "Fall 2026 schools",
    schoolsIntro:
      "Click a school on the map (or search the list) to see schedule, grades, fee, coaches, flyer, and registration — details from each campus program page.",
    schools: schoolMap,
    faqs: [
      {
        q: "What will my child learn?",
        a: "Chess as a healthy academic game — patience, planning, and decision-making — plus sportsmanship and learning from losses.",
      },
      {
        q: "How do rewards work?",
        a: "Students earn enrichment points for learning and behavior, then collect rewards, trophies, and medals. Points are cumulative year after year.",
      },
      {
        q: "Late pick-up fees?",
        a: "0–10 min free. 10–20 min $20. 20–30 min $40. 30–60 min $80. Fees go to the coach, not BAC.",
      },
      {
        q: "Cancellation / refund?",
        a: "Before first class: refund minus $25. After first but before second: prorated minus one class and $25. No refunds after the second class.",
      },
    ],
    ctaLabel: "School programs",
    ctaHref: "/enrichment/schools",
    links: [
      { label: "Afterschool FAQ & info", href: "/enrichment/afterschool-info" },
      { label: "Lunchtime chess", href: "/enrichment/lunchtime" },
      { label: "Skill levels", href: "/enrichment/skill-levels" },
      { label: "Coaches", href: "/enrichment/coaches" },
      { label: "FSA receipts", href: "/enrichment/fsa-receipts" },
      { label: "Policies (PDF)", href: POLICIES_PDF },
      { label: "Testimonials", href: "/enrichment/testimonials" },
    ],
  },

  clubs: {
    id: "clubs",
    kicker: "Drop-in",
    title: "Weekly clubs",
    intro:
      "No term commitment. Show up, pay at the door (or register online where offered). Sessions are about half instruction and half games. Ages ~5–16 for most clubs.",
    notice: "New: Los Gatos Saturdays 3–5 PM · Bundle: buy 8, get 2 free (on-site with coach, 12-month punch card)",
    specialEvent: {
      title: "GM Andrew Hong Lecture & Simul",
      when: "Monday, October 12, 2026 · 5:30–8:30 PM",
      where: "Santa Clara Monday Night Club · 2495 Cabrillo Ave",
      detail:
        "Meet-and-greet + lecture 5:30–6:30 · Simul 6:30–8:30. Choose White or Black; three passes. Primarily for scholastic players under 18; adults if space permits. Walk-in lecture only $25.",
      cost: "$50 Lecture + Simul (online registration required for a simul board)",
      href: "/enrichment/simul",
    },
    table: {
      columns: ["Day", "Location", "Time", "Levels", "Fee", "Off dates"],
      rows: [
        ["Friday", "Fremont", "4:30–6:00pm", "New / Beg / Int u1100", "$30", "Off: 10/23, 11/20, 11/27"],
        ["Saturday", "San Jose", "9:30–11:30am", "New / Beg / Int u1100", "$40", "Off: 12/26 (open 11/28)"],
        ["Saturday", "Palo Alto", "2:30–4:30pm", "New / Beg / Int u1100", "$40", "Off: 11/28, 12/26"],
        ["Saturday", "Los Gatos (NEW)", "3:00–5:00pm", "New / Beg / Int u1100", "$40", "Off: 9/12, 11/28, 12/26"],
        ["Sunday", "Cupertino", "5:00–7:00pm", "New / Beg / Int u1250", "$40", "No off-dates"],
        ["Monday", "Santa Clara Int/Adv", "5:30–7:00 / 7:00–8:30 / both", "500–1500 USCF", "$30 or $50", "No off-dates"],
        ["Thursday", "Palo Alto", "6:00–7:30pm", "New / Beg / Int u1100", "$30", "Off: 11/26"],
      ],
    },
    locations: [
      { label: "San Jose (Sat 9:30am)", href: "/enrichment/club-san-jose" },
      { label: "Los Gatos (Sat 3pm)", href: "/enrichment/club-los-gatos" },
      { label: "Palo Alto (Sat 2:30pm)", href: "/enrichment/club-palo-alto-sat" },
      { label: "Palo Alto (Thu 6pm)", href: "/enrichment/club-palo-alto-thu" },
      { label: "Cupertino (Sun 5pm)", href: "/enrichment/club-cupertino" },
      { label: "Santa Clara (Mon 5:30pm)", href: "/enrichment/club-santa-clara" },
      { label: "Fremont (Fri 4:30pm)", href: "/enrichment/club-fremont" },
      { label: "Simul event", href: "/enrichment/simul" },
    ],
    ctaLabel: "All weekend clubs",
    ctaHref: "/enrichment/clubs",
    links: [
      { label: "Clubs overview", href: "/enrichment/clubs" },
      { label: "Policies (PDF)", href: POLICIES_PDF },
    ],
  },

  teams: {
    id: "teams",
    kicker: "Rated players",
    title: "BAC Tournament Team",
    intro:
      "In-person Saturday training for serious scholastic players. Fall 2026: 8 sessions. Includes 2-hour advanced class, BAC shirt, BAC workbook, and one free enrollment to a CalChess Super-States tournament.",
    highlight: {
      when: "Select Saturdays · 12:00–2:00 PM · Sept 19 – Dec 12",
      where: "UUCPA, 505 E Charleston Rd, Palo Alto · Ages 6–15 · USCF 600–1600",
      cost: "Apply first (24 seats). Price adjusted if starting after 9/19 (assumes 10/3 start).",
    },
    points: [
      "Meeting dates: 9/19, 10/3, 10/10, 10/24, 10/31, 11/7, 11/21, 12/12",
      "Join only if available for at least 6 of 8 Saturdays — no make-ups",
      "Spring 2026 team averaged +191 USCF points per student in 3 months",
      "Led by Senior Coach Wolfgang Behm — Purdy/Fine method, openings, tactics, game review",
      "Under 600? Play more rated events first, or visit the Palo Alto Saturday club",
    ],
    freeEvents: [
      "9/26–9/27 CalChess Boys & Girls State Championship — Milpitas",
      "10/17–10/18 SuperStates K-1 / K-6 / K-12 — Santa Clara",
      "11/14–11/15 CalChess Grade-Level Championship — Milpitas",
      "12/5–12/6 US Jr Chess Congress (National) — Sunnyvale",
    ],
    body: "Tell us which free tournament to register at least 1 week in advance. Apply via Google Form; accepted players are invited to register on the event page.",
    ctaLabel: "Apply for the team",
    ctaHref: TEAM_APPLY,
    links: [
      { label: "Team details", href: "/enrichment/tournament-team" },
      { label: "Tournament site (rated events)", href: "https://www.bayareachess.com" },
    ],
  },

  risingStar: {
    id: "rising-star",
    kicker: "First tournament",
    title: "Rising Star",
    intro:
      "Non-rated practice tournament for players with no prior over-the-board USCF experience, plus a parent seminar during the games. Each player may attend only one Rising Star — then move on to rated events.",
    highlight: {
      when: "Saturday, October 3 · 4:45–6:15 PM",
      where: "UUCPA, 505 East Charleston Road, Palo Alto, CA 94306 (Fireside Room)",
      cost: "$35 · Register online (logged in) or pay on-site 10–15 minutes early",
    },
    points: [
      "3–4 games in Quad or Swiss — everyone plays every round (not elimination)",
      "Practice touch-move, etiquette, and standard tournament procedures",
      "No USCF membership required",
      "Every participant receives a BAC medal or T-shirt",
      "Boards, sets, notation sheets, and pencils provided",
      "Cancellations before event day: $3 fee",
    ],
    ctaLabel: "Rising Star details",
    ctaHref: "/enrichment/rising-stars",
    links: [
      { label: "Register on enrichment site", href: L("/RisingStars") },
    ],
  },

  resources: {
    id: "resources",
    kicker: "",
    title: "Guides & community",
    intro: "",
    cards: [
      {
        title: "Skill levels",
        body: "Levels 1–5 from absolute beginner through Advanced II, with ChessKid benchmarks.",
        href: "/enrichment/skill-levels",
      },
      {
        title: "New players",
        body: "Where absolute beginners should start — online Level 1, clubs, camps, and after-school.",
        href: "/enrichment/new-players",
      },
      {
        title: "Coaches",
        body: "Meet the enrichment coaching roster and leadership team.",
        href: "/enrichment/coaches",
      },
      {
        title: "Volunteers",
        body: "Ages 13–17: help at clubs, camps, and major tournament events.",
        href: "/enrichment/volunteers",
      },
      {
        title: "Testimonials",
        body: "Unsolicited feedback from parents and students about classes, camps, and clubs.",
        href: "/enrichment/testimonials",
      },
      {
        title: "FSA receipts",
        body: "Dependent-care FSA guidance for weekday camps and after-school (weekend clubs/teams usually not eligible). Tax ID 26-2776273. Custom receipt $9.",
        href: "/enrichment/fsa-receipts",
      },
      {
        title: "Policies",
        body: "Current enrichment policies PDF (registration, refunds, conduct).",
        href: POLICIES_PDF,
      },
      {
        title: "Login",
        body: "Use this site login for tournaments. Enrichment registration on the live enrichment site may still need a separate account.",
        href: "/login",
      },
    ],
  },

  faq: {
    kicker: "Ask BAC",
    title: "Enrichment FAQ",
    intro: "Deduped answers from online and after-school FAQs. Rated tournament questions belong on the Tournaments site.",
    items: [
      {
        q: "Which site — Enrichment or Tournaments?",
        a: "Camps, classes, clubs, ChessKid, practice events, and teams → enrichment.bayareachess.com (enrich@bayareachess.com). USCF-rated events → bayareachess.com (events@bayareachess.com). Different logins on each site.",
      },
      {
        q: "What will my child learn?",
        a: "Chess as a healthy academic game — patience, planning, decision-making, sportsmanship, and learning from mistakes.",
      },
      {
        q: "How do rewards / points work?",
        a: "Students earn enrichment points for learning and behavior, then redeem rewards, trophies, and medals. Points accumulate year to year.",
      },
      {
        q: "Do weekend clubs require registration?",
        a: "No. Pay at the door (many pages also allow online registration). Bundles (8+2 free) are purchased on-site with the coach and last 12 months.",
      },
      {
        q: "What about FSA / tax ID?",
        a: "Weekday camps and before/after-school programs are typically Dependent Care FSA eligible for children under 13. Weekend clubs and teams usually are not — confirm with your provider. Tax ID: 26-2776273. Optional custom FSA receipt: $9 via the payments page.",
      },
      {
        q: "Late pick-up / refunds?",
        a: "Late pick-up: 0–10 free, then $20 / $40 / $80 tiers (paid to coach). Refunds: before class 1 minus $25; after class 1 before class 2 prorated minus one class + $25; none after class 2. See Policies PDF.",
      },
    ],
    links: [
      { label: "Online FAQ", href: "/enrichment/faq-online" },
      { label: "Afterschool FAQ", href: "/enrichment/afterschool-info" },
      { label: "Policies (PDF)", href: POLICIES_PDF },
      { label: "FSA receipts", href: "/enrichment/fsa-receipts" },
      { label: "Testimonials", href: "/enrichment/testimonials" },
      { label: "Volunteers", href: "/enrichment/volunteers" },
      { label: "Coaches", href: "/enrichment/coaches" },
    ],
  },

  contact: {
    email: "enrich@bayareachess.com",
    notes: [
      "Enrichment: enrich@bayareachess.com",
      "Tournaments: events@bayareachess.com · bayareachess.com",
    ],
  },
  externalHome: ENRICHMENT_BASE,
};
