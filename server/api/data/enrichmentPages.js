/** Local enrichment subpages cloned from enrichment.bayareachess.com (info pages). Registration stays on the live site. */
const EXT = "https://enrichment.bayareachess.com";
module.exports = {
  externalBase: EXT,
  slugs: [
  "afterschool-info",
  "camps-all",
  "club-cupertino",
  "club-fremont",
  "club-los-gatos",
  "club-palo-alto-sat",
  "club-palo-alto-thu",
  "club-san-jose",
  "club-santa-clara",
  "clubs",
  "coaches",
  "faq-online",
  "fsa-receipts",
  "lunchtime",
  "new-players",
  "rising-stars",
  "simul",
  "skill-levels",
  "strategy-games",
  "testimonials",
  "tournament-team",
  "volunteers"
],
  pages: {
  "faq-online": {
    "slug": "faq-online",
    "kicker": "Online FAQ",
    "title": "Online class Q&A",
    "intro": "Answers for Zoom + ChessKid term classes \u2014 format, memberships, skill levels, and tournaments.",
    "faqs": [
      {
        "q": "What is the online course format?",
        "a": "60-minute session once per week for levels 1\u20135 (Tracks A or S). Combines lessons and gameplay. Players receive ChessKid Gold memberships when joining the BAC club."
      },
      {
        "q": "Track A vs Track S?",
        "a": "Track A: 7-week terms with a championship on the final class. Track S: 6-week summer sessions with optional multi-class bundles. Same curriculum otherwise."
      },
      {
        "q": "Multiple classes per week?",
        "a": "Yes. Courses are \u00e0 la carte. Multiple purchases in one transaction get 10% off the extra items."
      },
      {
        "q": "When will I get Zoom / ChessKid?",
        "a": "Memberships a few days before start; Orientations with Zoom ~24 hours before the first session. Late orders are sent as soon as processed. Check spam and the email you registered with."
      },
      {
        "q": "Pacific Standard Time?",
        "a": "BAC is based in California; class times use Pacific Time."
      },
      {
        "q": "What is the class ratio?",
        "a": "We target 10:1 or better. Larger classes use multiple coaches and Zoom breakouts."
      },
      {
        "q": "Trial classes?",
        "a": "No term trials at this time. Occasional single-session online options may appear separately."
      },
      {
        "q": "PayPal required?",
        "a": "Guest checkout usually lets you pay by debit/credit without a PayPal account."
      },
      {
        "q": "Choose a coach in advance?",
        "a": "Staffing is hard to lock early \u2014 courses may not run or may need extra coaches. Preferences are noted when possible but not guaranteed."
      },
      {
        "q": "TAX-ID for FSA?",
        "a": "Tax ID 26-2776273. See the FSA receipts page for Dependent Care FSA guidance."
      },
      {
        "q": "What skill level should I choose?",
        "a": "Use the Skill Levels guide. Level 1 is for absolute beginners who still need help completing a game or checkmate."
      },
      {
        "q": "When to promote to a higher level?",
        "a": "Use the rating markers on Skill Levels plus coach recommendations. Many Level 1 students (age 6+) move up after one term with 20+ games and the first ChessKid animated lessons."
      },
      {
        "q": "ChessKid Basic vs Gold?",
        "a": "Gold unlocks the full set of lessons, videos, and club features used in BAC online classes. See chesskid.com/membership for the comparison."
      },
      {
        "q": "Do I make my own ChessKid account?",
        "a": "No \u2014 we create Gold memberships for players who do not already have a BAC club account and email them to you. Existing non-BAC Gold accounts can sometimes be invited into the club."
      },
      {
        "q": "How do ChessKid tournaments work?",
        "a": "No separate registration or fee if you are in the BAC ChessKid club (accounts we create are in by default). Use a browser, not the app; rating brackets matter; close overlay windows if the lobby is hidden."
      },
      {
        "q": "Where to buy workbooks / boards?",
        "a": "BAC workbooks are often available at clubs and camps. Boards and clocks: American Chess Equipment (amchesseq.com)."
      }
    ],
    "links": [
      {
        "label": "Online classes",
        "href": "/enrichment#classes"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "FSA receipts",
        "href": "/enrichment/fsa-receipts"
      },
      {
        "label": "Weekend clubs",
        "href": "/enrichment/clubs"
      }
    ]
  },
  "skill-levels": {
    "slug": "skill-levels",
    "kicker": "Placement",
    "title": "BAC skill levels",
    "intro": "\"There is no elevator to success. You will have to take the stairs.\" Use these levels for online classes, clubs, and camps.",
    "levels": [
      {
        "level": "1",
        "name": "Absolute Beginners",
        "detail": "Brand new only \u2014 still learning pieces and unable to checkmate alone. Topics: piece names/movement, starting position, turn order, values, special rules, checks/mates. Pair with the first ChessKid animated lessons."
      },
      {
        "level": "2",
        "name": "Beginner",
        "detail": "~0\u2013400 USCF / ChessKid ~400\u2013999. Completes games without help. Topics: mating patterns, openings, draws, notation intro, early tactics, positional ideas, beginner endgames."
      },
      {
        "level": "3",
        "name": "Intermediate",
        "detail": "~350\u2013850 USCF / ChessKid ~1000\u20131299. Typically 2\u20135 semesters plus some tournament experience."
      },
      {
        "level": "4",
        "name": "Advanced I",
        "detail": "~850\u20131250 USCF / ChessKid ~1300\u20131599. Tournament-ready and highly engaged."
      },
      {
        "level": "5",
        "name": "Advanced II",
        "detail": "~1200\u20131500 USCF / ChessKid 1600+. Higher-rated players should ask about weekend teams (Level 6; adults welcome there too)."
      }
    ],
    "faqs": [
      {
        "q": "When is a Level 1 student ready for Level 2?",
        "a": "The average new player age 5+ who finishes a Level 1 course, plays 20+ games, and watches ~20 ChessKid animated lessons is typically ready for Level 2."
      },
      {
        "q": "How should beginners practice between classes?",
        "a": "Aim for 10+ games weekly (including tournament play) and 3\u20135 puzzles daily. Live-chess and puzzle ratings near 970+ plus coach feedback are good promotion signals."
      }
    ],
    "links": [
      {
        "label": "Online classes",
        "href": "/enrichment#classes"
      },
      {
        "label": "New players",
        "href": "/enrichment/new-players"
      },
      {
        "label": "Tournament team",
        "href": "/enrichment/tournament-team"
      }
    ]
  },
  "new-players": {
    "slug": "new-players",
    "kicker": "Getting started",
    "title": "New players welcome",
    "intro": "For absolute beginners (still learning pieces / unable to checkmate \u2014 Level 1). Experienced players should use Skill Levels 2\u20135.",
    "points": [
      "Online Level 1\u20131.5 term classes (Zoom + ChessKid Gold included)",
      "In-person drop-in weekend clubs",
      "Seasonal chess camps \u2014 new and experienced players welcome",
      "After-school programs at participating campuses"
    ],
    "paragraphs": [
      "Level 1 Online terms are 60-minute classes once per week for about 7 weeks. Choose a Level 1\u20132 slot that fits your schedule.",
      "New ChessKid users: membership info is emailed 1\u20134 days before the course starts. You join the BAC general club with thousands of active members. Zoom orientation (schedule + link) arrives ~24 hours before class. Hotmail users: check spam first."
    ],
    "faqs": [
      {
        "q": "Which site do I use?",
        "a": "Camps, classes, clubs, ChessKid, practice events, and teams use the Enrichment site (enrich@bayareachess.com). USCF-rated events use bayareachess.com (events@bayareachess.com). Logins differ \u2014 use the same password on both if you like."
      }
    ],
    "ctaLabel": "Browse online classes",
    "ctaHref": "/enrichment#classes",
    "links": [
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Weekend clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Camps",
        "href": "/enrichment/camps-all"
      },
      {
        "label": "Online FAQ",
        "href": "/enrichment/faq-online"
      }
    ]
  },
  "camps-all": {
    "slug": "camps-all",
    "kicker": "Camps",
    "title": "Chess camps \u2014 general info",
    "intro": "Seasonal chess camps across the Bay Area. Half-day blocks (morning or afternoon) or full day. Early drop-off and late pick-up are often available at registration.",
    "points": [
      "Morning 9AM\u20131PM \u00b7 Afternoon 1PM\u20135PM \u00b7 Full day 9AM\u20135PM (typical)",
      "Locations include Palo Alto (UUCPA), San Jose (BAC office), Fremont, Menlo Park/Atherton, Redwood City & Burlingame (often via Parks & Rec)",
      "10% discount when booking 2+ camps in one transaction",
      "Pack a lunch for full-day campers \u2014 snacks provided; no nuts / no food sharing"
    ],
    "paragraphs": [
      "Palo Alto (UUCPA): more outdoor time and Magical Bridges playground nearby. San Jose office: convenient drop-off, outdoor lunch space, AC, on-site BAC-\u20acoin store. Redwood City & Burlingame community buildings may require Parks & Rec registration."
    ],
    "faqs": [
      {
        "q": "Sample morning schedule?",
        "a": "Arrival + free play \u2192 group instruction \u2192 recess/snacks \u2192 games/puzzles/analysis \u2192 more instruction \u2192 lunch outdoors \u2192 free play until pick-up. Afternoon mirrors this with a later pick-up window."
      },
      {
        "q": "Safety practices?",
        "a": "CDC-aware practices: masks optional but welcome; handwashing breaks; outdoor breaks/lunches; routine sanitation of materials. Instructors follow BAC screening policies."
      }
    ],
    "ctaLabel": "See camps on the map",
    "ctaHref": "/enrichment#camps",
    "links": [
      {
        "label": "Strategy-Games camps",
        "href": "/enrichment/strategy-games"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  },
  "strategy-games": {
    "slug": "strategy-games",
    "kicker": "Not chess",
    "title": "Strategy-Games camps & clubs",
    "intro": "STEM-minded board games teaching logic, probability, and game design \u2014 led by Coaches James Bethany and Jason Uerkvitz. Separate trophies, star points, and badges from chess programs.",
    "points": [
      "Target ages 6\u201314 (younger/older welcome in camps with a fit disclaimer)",
      "Clubs: Saturdays in San Jose (combo morning) and Palo Alto (afternoon strategy club)",
      "Camps: half-day (9\u20131 or 1\u20135) or full day; early drop-off / late pick-up available",
      "Typical sites: Santa Clara (St. Justin), San Jose (BAC office), Palo Alto (UUCPA)"
    ],
    "faqs": [
      {
        "q": "Sample morning camp schedule?",
        "a": "9:00 casual games \u2192 9:30 instruction/demo (often a historical game) \u2192 recess/snacks \u2192 application & practice \u2192 lunch/outdoors."
      },
      {
        "q": "Sample afternoon schedule?",
        "a": "1:00 free-play \u2192 instruction/game theory \u2192 break \u2192 board-game stations & demos \u2192 break \u2192 challenges, creation, competitions, review."
      },
      {
        "q": "Food policy?",
        "a": "Snacks are provided (chips, bars, fruit snacks, Capri Sun, water, etc.). Pack a lunch for full-day campers. No nuts and no food sharing."
      }
    ],
    "ctaLabel": "See camp calendar",
    "ctaHref": "/enrichment#camps",
    "links": [
      {
        "label": "Chess camps info",
        "href": "/enrichment/camps-all"
      },
      {
        "label": "Weekend clubs",
        "href": "/enrichment/clubs"
      }
    ]
  },
  "afterschool-info": {
    "slug": "afterschool-info",
    "kicker": "On campus",
    "title": "After-school chess FAQ",
    "intro": "Weekly on-campus chess at Bay Area schools. Most campuses are closed \u2014 only students enrolled at that school may join.",
    "faqs": [
      {
        "q": "What do you offer in each hour?",
        "a": "Lesson (20\u201330 min), practice games with peers, and individual coaching/feedback. Time is roughly split between instruction and practice. Puzzles appear from time to time."
      },
      {
        "q": "When are classes?",
        "a": "Morning (curriculum), lunchtime, after-school (most popular), or early evening at centers. Usually once weekly; some sites run multiple days."
      },
      {
        "q": "Where are classes held?",
        "a": "On campus or at local enrichment sites. Closed campuses mean only that school\u2019s students may enroll."
      },
      {
        "q": "What to bring?",
        "a": "Nothing \u2014 sets, boards, workbooks, and related items are provided."
      },
      {
        "q": "What will my child learn?",
        "a": "Chess as a healthy academic game \u2014 patience, planning, decision-making, sportsmanship, and learning from losses."
      },
      {
        "q": "How do rewards work?",
        "a": "A point system rewards learning and behavior. Students earn levels, trophies, and medals. Points accumulate year to year."
      },
      {
        "q": "Is financial aid available?",
        "a": "Yes, with documentation such as free/reduced lunch eligibility or equivalent proof so aid can be offered fairly."
      },
      {
        "q": "Are coaches screened?",
        "a": "All coaches have background checks and TB tests. Many lead coaches hold Red Cross CPR/first aid/AED certification."
      },
      {
        "q": "Coach:student ratio?",
        "a": "Standard is 1:12 or better, adjusted only when needed for optimal groupings."
      },
      {
        "q": "Late pick-up fees?",
        "a": "0\u201310 min free; 10\u201320 $20; 20\u201330 $40; 30\u201360 $80. Fees go to the coach, not BAC."
      },
      {
        "q": "Cancellation / refund?",
        "a": "Before first class: refund minus $25. After first before second: prorated minus one class and $25. No refunds after the second class. Sibling discount 10% when registered in one transaction."
      }
    ],
    "ctaLabel": "Find a school",
    "ctaHref": "/enrichment#afterschool",
    "links": [
      {
        "label": "Lunchtime chess",
        "href": "/enrichment/lunchtime"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Coaches",
        "href": "/enrichment/coaches"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  },
  "lunchtime": {
    "slug": "lunchtime",
    "kicker": "Schools & PTAs",
    "title": "Lunchtime chess",
    "intro": "Inclusive, flexible lunch-time chess for students of all ages \u2014 funded by the school, PTA, or a community sponsor (no cost to families).",
    "points": [
      "Weekly open-play during lunch \u2014 students rotate in freely",
      "No roster or family registration required",
      "All materials provided; coach supervises and helps newer players",
      "Flat fee ~$105/week for 50\u201375 minutes, billed to school or PTA",
      "Flexible billing by semester or 10-week blocks"
    ],
    "paragraphs": [
      "Bay Area Chess is the largest nonprofit provider of scholastic chess in the Bay Area, with 100+ after-school enrichment programs and dozens of lunch programs.",
      "Contact enrich@bayareachess.com to explore bringing lunchtime chess to your school."
    ],
    "links": [
      {
        "label": "After-school FAQ",
        "href": "/enrichment/afterschool-info"
      },
      {
        "label": "Find a school",
        "href": "/enrichment#afterschool"
      }
    ]
  },
  "clubs": {
    "slug": "clubs",
    "kicker": "Drop-in",
    "title": "Weekly chess clubs",
    "intro": "No term commitment. Show up, pay at the door (or register online where offered). Sessions are about half instruction and half games.",
    "notice": "Bundle: buy 8, get 2 free \u2014 purchased on-site with the coach (12-month punch card).",
    "table": {
      "columns": [
        "Day",
        "Location",
        "Time",
        "Levels",
        "Fee",
        "Off dates"
      ],
      "rows": [
        [
          "Friday",
          "Fremont",
          "4:30\u20136:00pm",
          "New / Beg / Int u1100",
          "$30",
          "10/23, 11/20, 11/27"
        ],
        [
          "Saturday",
          "San Jose",
          "9:30\u201311:30am",
          "New / Beg / Int u1100",
          "$40",
          "12/26 (open 11/28)"
        ],
        [
          "Saturday",
          "Palo Alto",
          "2:30\u20134:30pm",
          "New / Beg / Int u1100",
          "$40",
          "11/28, 12/26"
        ],
        [
          "Saturday",
          "Los Gatos (NEW)",
          "3:00\u20135:00pm",
          "New / Beg / Int u1100",
          "$40",
          "9/12, 11/28, 12/26"
        ],
        [
          "Sunday",
          "Cupertino",
          "5:00\u20137:00pm",
          "New / Beg / Int u1250",
          "$40",
          "None"
        ],
        [
          "Monday",
          "Santa Clara Int/Adv",
          "5:30\u20137:00 / 7:00\u20138:30 / both",
          "500\u20131500 USCF",
          "$30 or $50",
          "None"
        ],
        [
          "Thursday",
          "Palo Alto",
          "6:00\u20137:30pm",
          "New / Beg / Int u1100",
          "$30",
          "11/26"
        ]
      ]
    },
    "links": [
      {
        "label": "San Jose",
        "href": "/enrichment/club-san-jose"
      },
      {
        "label": "Los Gatos",
        "href": "/enrichment/club-los-gatos"
      },
      {
        "label": "Palo Alto Sat",
        "href": "/enrichment/club-palo-alto-sat"
      },
      {
        "label": "Palo Alto Thu",
        "href": "/enrichment/club-palo-alto-thu"
      },
      {
        "label": "Cupertino",
        "href": "/enrichment/club-cupertino"
      },
      {
        "label": "Santa Clara",
        "href": "/enrichment/club-santa-clara"
      },
      {
        "label": "Fremont",
        "href": "/enrichment/club-fremont"
      },
      {
        "label": "GM Hong simul",
        "href": "/enrichment/simul"
      }
    ]
  },
  "club-san-jose": {
    "slug": "club-san-jose",
    "kicker": "Drop-in club",
    "title": "San Jose Saturday club",
    "intro": "Every Saturday \u00b7 9:30\u201311:30 AM. Drop-in, pay at the door (or register online for the next session). Roughly half lesson, half games.",
    "highlight": {
      "when": "Every Saturday \u00b7 9:30\u201311:30 AM",
      "where": "BAC Office \u00b7 2050 Concourse Dr #42, San Jose, CA 95131",
      "cost": "$40 at the door",
      "detail": "Levels: New\u2013Intermediate (Levels 1\u20134 / ~u1100 USCF). Off dates: See clubs table / site calendar. Bundle: buy 8, get 2 free (on-site with coach; 12-month punch card \u2014 not available online)."
    },
    "points": [
      "Arrival ~9:25\u20139:35",
      "Lesson or demonstration (may split into learning groups)",
      "Paired play, puzzles, or lesson-based activities",
      "Please be prompt at pick-up"
    ],
    "faqs": [
      {
        "q": "Do I need to register in advance?",
        "a": "No. Pay at the door with cash/check (preferred). Online registration reserves the next available session and may cost slightly more at some sites."
      },
      {
        "q": "Masks / illness?",
        "a": "Masks are not required. Please stay home if the child is sick or showing symptoms. Parent rooms are generally not available \u2014 drop-off/sign-in at the door."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      },
      {
        "label": "Map",
        "href": "https://www.google.com/maps/place/2050+Concourse+Dr+Ste+42,+San+Jose,+CA+95131"
      }
    ]
  },
  "club-los-gatos": {
    "slug": "club-los-gatos",
    "kicker": "Drop-in club",
    "title": "Los Gatos Saturday club",
    "intro": "Every Saturday \u00b7 3:00\u20135:00 PM. Drop-in, pay at the door (or register online for the next session). Roughly half lesson, half games.",
    "highlight": {
      "when": "Every Saturday \u00b7 3:00\u20135:00 PM",
      "where": "Addison-Penzak JCC \u00b7 14855 Oka Road, Los Gatos \u00b7 Activity Room B",
      "cost": "$40 at the door \u00b7 ~$43 online (week-of)",
      "detail": "Levels: New\u2013Intermediate (Levels 1\u20134 / ~u1250 USCF). Off dates: Holiday weekends / see clubs table. Bundle: buy 8, get 2 free (on-site with coach; 12-month punch card \u2014 not available online)."
    },
    "points": [
      "Arrival ~2:55\u20133:10",
      "Lesson or demonstration (may split into learning groups)",
      "Paired play, puzzles, or lesson-based activities",
      "Please be prompt at pick-up"
    ],
    "faqs": [
      {
        "q": "Do I need to register in advance?",
        "a": "No. Pay at the door with cash/check (preferred). Online registration reserves the next available session and may cost slightly more at some sites."
      },
      {
        "q": "Masks / illness?",
        "a": "Masks are not required. Please stay home if the child is sick or showing symptoms. Parent rooms are generally not available \u2014 drop-off/sign-in at the door."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  },
  "club-palo-alto-sat": {
    "slug": "club-palo-alto-sat",
    "kicker": "Drop-in club",
    "title": "Palo Alto Saturday club",
    "intro": "Every Saturday \u00b7 2:30\u20134:30 PM. Drop-in, pay at the door (or register online for the next session). Roughly half lesson, half games.",
    "highlight": {
      "when": "Every Saturday \u00b7 2:30\u20134:30 PM",
      "where": "UUCPA \u00b7 505 E Charleston Rd, Palo Alto",
      "cost": "$40 at the door",
      "detail": "Levels: New\u2013Intermediate u1100. Off dates: See clubs table. Bundle: buy 8, get 2 free (on-site with coach; 12-month punch card \u2014 not available online)."
    },
    "points": [
      "Arrival: free-play while coaches take attendance and gauge new players",
      "Lesson or demonstration (may split into learning groups)",
      "Paired play, puzzles, or lesson-based activities",
      "Please be prompt at pick-up"
    ],
    "faqs": [
      {
        "q": "Do I need to register in advance?",
        "a": "No. Pay at the door with cash/check (preferred). Online registration reserves the next available session and may cost slightly more at some sites."
      },
      {
        "q": "Masks / illness?",
        "a": "Masks are not required. Please stay home if the child is sick or showing symptoms. Parent rooms are generally not available \u2014 drop-off/sign-in at the door."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  },
  "club-palo-alto-thu": {
    "slug": "club-palo-alto-thu",
    "kicker": "Drop-in club",
    "title": "Palo Alto Thursday club",
    "intro": "Every Thursday \u00b7 6:00\u20137:30 PM. Drop-in, pay at the door (or register online for the next session). Roughly half lesson, half games.",
    "highlight": {
      "when": "Every Thursday \u00b7 6:00\u20137:30 PM",
      "where": "UUCPA \u00b7 505 E Charleston Rd, Palo Alto",
      "cost": "$30 at the door",
      "detail": "Levels: New\u2013Intermediate u1100. Off dates: See clubs table (e.g. 11/26). Bundle: buy 8, get 2 free (on-site with coach; 12-month punch card \u2014 not available online)."
    },
    "points": [
      "Arrival: free-play while coaches take attendance and gauge new players",
      "Lesson or demonstration (may split into learning groups)",
      "Paired play, puzzles, or lesson-based activities",
      "Please be prompt at pick-up"
    ],
    "faqs": [
      {
        "q": "Do I need to register in advance?",
        "a": "No. Pay at the door with cash/check (preferred). Online registration reserves the next available session and may cost slightly more at some sites."
      },
      {
        "q": "Masks / illness?",
        "a": "Masks are not required. Please stay home if the child is sick or showing symptoms. Parent rooms are generally not available \u2014 drop-off/sign-in at the door."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  },
  "club-cupertino": {
    "slug": "club-cupertino",
    "kicker": "Drop-in club",
    "title": "Cupertino Sunday club",
    "intro": "Every Sunday \u00b7 5:00\u20137:00 PM. Drop-in, pay at the door (or register online for the next session). Roughly half lesson, half games.",
    "highlight": {
      "when": "Every Sunday \u00b7 5:00\u20137:00 PM",
      "where": "Cupertino (see enrichment registration page for venue)",
      "cost": "$40 at the door",
      "detail": "Levels: New\u2013Intermediate u1250. Off dates: None listed. Bundle: buy 8, get 2 free (on-site with coach; 12-month punch card \u2014 not available online)."
    },
    "points": [
      "Arrival: free-play while coaches take attendance and gauge new players",
      "Lesson or demonstration (may split into learning groups)",
      "Paired play, puzzles, or lesson-based activities",
      "Please be prompt at pick-up"
    ],
    "faqs": [
      {
        "q": "Do I need to register in advance?",
        "a": "No. Pay at the door with cash/check (preferred). Online registration reserves the next available session and may cost slightly more at some sites."
      },
      {
        "q": "Masks / illness?",
        "a": "Masks are not required. Please stay home if the child is sick or showing symptoms. Parent rooms are generally not available \u2014 drop-off/sign-in at the door."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  },
  "club-santa-clara": {
    "slug": "club-santa-clara",
    "kicker": "Drop-in club",
    "title": "Santa Clara Monday (Int/Adv)",
    "intro": "Mondays \u00b7 5:30\u20137:00, 7:00\u20138:30, or both (3h). Drop-in, pay at the door (or register online for the next session). Roughly half lesson, half games.",
    "highlight": {
      "when": "Mondays \u00b7 5:30\u20137:00, 7:00\u20138:30, or both (3h)",
      "where": "Santa Clara Monday Night Club \u00b7 2495 Cabrillo Ave",
      "cost": "$30 (1.5h) or $50 (3h)",
      "detail": "Levels: Intermediate / Advanced \u00b7 500\u20131500 USCF. Off dates: None listed. Bundle: buy 8, get 2 free (on-site with coach; 12-month punch card \u2014 not available online)."
    },
    "points": [
      "Choose one or both evening blocks",
      "Instruction + rated-ready practice for tournament players"
    ],
    "faqs": [
      {
        "q": "Do I need to register in advance?",
        "a": "No. Pay at the door with cash/check (preferred). Online registration reserves the next available session and may cost slightly more at some sites."
      },
      {
        "q": "Masks / illness?",
        "a": "Masks are not required. Please stay home if the child is sick or showing symptoms. Parent rooms are generally not available \u2014 drop-off/sign-in at the door."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      },
      {
        "label": "Map",
        "href": "https://www.google.com/maps/search/?api=1&query=2495%20Cabrillo%20Ave%2C%20Santa%20Clara%2C%20CA%2095051"
      }
    ]
  },
  "club-fremont": {
    "slug": "club-fremont",
    "kicker": "Drop-in club",
    "title": "Fremont Friday club",
    "intro": "Every Friday \u00b7 4:30\u20136:00 PM. Drop-in, pay at the door (or register online for the next session). Roughly half lesson, half games.",
    "highlight": {
      "when": "Every Friday \u00b7 4:30\u20136:00 PM",
      "where": "Fremont (see enrichment registration page for venue)",
      "cost": "$30 at the door",
      "detail": "Levels: New\u2013Intermediate u1100. Off dates: See clubs table. Bundle: buy 8, get 2 free (on-site with coach; 12-month punch card \u2014 not available online)."
    },
    "points": [
      "Arrival: free-play while coaches take attendance and gauge new players",
      "Lesson or demonstration (may split into learning groups)",
      "Paired play, puzzles, or lesson-based activities",
      "Please be prompt at pick-up"
    ],
    "faqs": [
      {
        "q": "Do I need to register in advance?",
        "a": "No. Pay at the door with cash/check (preferred). Online registration reserves the next available session and may cost slightly more at some sites."
      },
      {
        "q": "Masks / illness?",
        "a": "Masks are not required. Please stay home if the child is sick or showing symptoms. Parent rooms are generally not available \u2014 drop-off/sign-in at the door."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      },
      {
        "label": "Skill levels",
        "href": "/enrichment/skill-levels"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  },
  "simul": {
    "slug": "simul",
    "kicker": "Special guest",
    "title": "GM Andrew Hong Lecture & Simul",
    "intro": "Meet Bay Area Grandmaster Andrew Hong (originally from Santa Clara). Learn from his insights and challenge him in a simultaneous exhibition.",
    "highlight": {
      "when": "Monday, October 12, 2026 \u00b7 5:30\u20138:30 PM",
      "where": "Santa Clara Monday Night Club \u00b7 2495 Cabrillo Ave, Santa Clara, CA 95051",
      "cost": "$50 Lecture + Simul \u00b7 $25 walk-in lecture only",
      "detail": "2598 FIDE \u00b7 World #152 among active players (Sept 2026 ratings). Online registration required to reserve a simul board."
    },
    "points": [
      "5:30\u20136:30 meet-and-greet, lecture & Q&A",
      "6:30\u20138:30 simultaneous exhibition",
      "Choose White or Black; three passes per simul player",
      "Primarily for scholastic players under 18; adults if space permits",
      "No rating restrictions \u00b7 parents welcome to spectate"
    ],
    "faqs": [
      {
        "q": "Lecture only?",
        "a": "Yes \u2014 $25 walk-in lecture-only (no simul board). Walk-ins welcome for the lecture and to spectate the simul, space permitting."
      }
    ],
    "ctaLabel": "Register for simul",
    "ctaHref": "/login",
    "links": [
      {
        "label": "Map",
        "href": "https://www.google.com/maps/search/?api=1&query=2495%20Cabrillo%20Ave%2C%20Santa%20Clara%2C%20CA%2095051"
      },
      {
        "label": "All clubs",
        "href": "/enrichment/clubs"
      }
    ]
  },
  "tournament-team": {
    "slug": "tournament-team",
    "kicker": "Rated players",
    "title": "BAC Tournament Team",
    "intro": "In-person Saturday training for serious scholastic players. Fall 2026: 8 sessions including advanced class, BAC shirt, workbook, and one free CalChess Super-States enrollment.",
    "highlight": {
      "when": "Select Saturdays \u00b7 12:00\u20132:00 PM \u00b7 Sept 19 \u2013 Dec 12",
      "where": "UUCPA \u00b7 505 E Charleston Rd, Palo Alto \u00b7 Ages 6\u201315 \u00b7 USCF 600\u20131600",
      "cost": "Apply first (24 seats). Price adjusted if starting after 9/19.",
      "detail": "Dates: 9/19, 10/3, 10/10, 10/24, 10/31, 11/7, 11/21, 12/12. Join only if available for at least 6 of 8 Saturdays."
    },
    "points": [
      "Spring 2026 team averaged +191 USCF points per student in 3 months",
      "Led by Senior Coach Wolfgang Behm (with Coach Mathew Benson)",
      "Purdy/Fine method \u2014 initiative, openings list, tactics study, game review",
      "Free tournament enrollment options: CalChess Boys & Girls, SuperStates, Grade-Level, US Jr Chess Congress"
    ],
    "faqs": [
      {
        "q": "What if my child is not yet rated 600?",
        "a": "Play more USCF events first. For an assessment, try the Palo Alto Saturday club. Under 600 is generally not a fit for this roster."
      },
      {
        "q": "Make-ups or pro-rates?",
        "a": "No trials, drop-ins, or pro-rates \u2014 coaches need a static roster. Missed classes are not refunded; pricing assumes that reality."
      },
      {
        "q": "How do I apply?",
        "a": "Submit the Google Form. Accepted players are invited to register on the event page. Tell us which free state event to enter at least 1 week in advance."
      },
      {
        "q": "Coach note \u2014 what is expected?",
        "a": "Serious players willing to study tactics independently, complete assignments, follow recommendations, and play rated tournaments. Outside work is proportional to improvement."
      }
    ],
    "ctaLabel": "Apply for the team",
    "ctaHref": "https://docs.google.com/forms/d/e/1FAIpQLSf_CJ5BJ1CaeBkzAjBbzsGgB_hdWhuqEQBhf5J_vQ8V62xL_g/viewform",
    "links": [
      {
        "label": "Register (after acceptance)",
        "href": "https://enrichment.bayareachess.com/event/bac-tournament-team-person"
      },
      {
        "label": "Tournament site",
        "href": "https://www.bayareachess.com"
      },
      {
        "label": "Palo Alto club",
        "href": "/enrichment/club-palo-alto-sat"
      }
    ]
  },
  "rising-stars": {
    "slug": "rising-stars",
    "kicker": "First tournament",
    "title": "Rising Star",
    "intro": "Non-rated practice tournament for players with no prior over-the-board USCF experience, plus a parent seminar during the games.",
    "notice": "Oct 3 event moved to UUCPA Palo Alto \u00b7 4:45\u20136:15 PM \u00b7 $35",
    "highlight": {
      "when": "Saturday, October 3 \u00b7 4:45\u20136:15 PM",
      "where": "UUCPA \u00b7 505 East Charleston Road, Palo Alto, CA 94306 (Fireside Room)",
      "cost": "$35 \u00b7 Register online (logged in) or pay on-site 10\u201315 minutes early",
      "detail": "Each player may attend only one Rising Star, then move on to rated events."
    },
    "points": [
      "3\u20134 games in Quad or Swiss \u2014 everyone plays every round",
      "Practice touch-move, etiquette, and standard procedures",
      "No USCF membership required",
      "Every participant receives a BAC medal or T-shirt",
      "Boards, sets, notation sheets, and pencils provided"
    ],
    "faqs": [
      {
        "q": "What is Rising Star?",
        "a": "A practice tournament with the same format as a scholastic event, but games are not rated. Designed for first-timers learning procedures and expectations."
      },
      {
        "q": "What does the parent seminar cover?",
        "a": "Benefits of chess, tournament types, USCF website/membership/ratings, the BAC tournament site, and improvement tools. May be limited to one adult per player depending on enrollment."
      },
      {
        "q": "Cancellation policy?",
        "a": "Cancellations before event day are subject to a $3 fee."
      },
      {
        "q": "Which website?",
        "a": "Rising Star is on the Enrichment site (this stack / enrichment.bayareachess.com), not the USCF tournament site. Logins differ between the two sites."
      }
    ],
    "ctaLabel": "Register",
    "ctaHref": "/login",
    "links": [
      {
        "label": "Map",
        "href": "https://www.google.com/maps/search/?api=1&query=505+East+Charleston+Road%2C+Palo+Alto%2C+CA+94306"
      },
      {
        "label": "New players",
        "href": "/enrichment/new-players"
      }
    ]
  },
  "coaches": {
    "slug": "coaches",
    "kicker": "Staff",
    "title": "Enrichment coaches",
    "intro": "Meet the enrichment coaching roster. Full bios live on the enrichment site \u2014 open a coach for details.",
    "people": [
      {
        "name": "Ganchimeg \"Gana\" Batsaikhan",
        "href": "https://enrichment.bayareachess.com/GanaB"
      },
      {
        "name": "Tom Langland",
        "href": "https://enrichment.bayareachess.com/TomL"
      },
      {
        "name": "Chris Torres",
        "href": "https://enrichment.bayareachess.com/ChrisT"
      },
      {
        "name": "Mahima Chiles",
        "href": "https://enrichment.bayareachess.com/MahimaC"
      },
      {
        "name": "Jalale Thind",
        "href": "https://enrichment.bayareachess.com/JalaleT"
      },
      {
        "name": "Denver Tang",
        "href": "https://enrichment.bayareachess.com/DenverT"
      },
      {
        "name": "Jesse Chen",
        "href": "https://enrichment.bayareachess.com/JesseC"
      },
      {
        "name": "Igor Garbuz",
        "href": "https://enrichment.bayareachess.com/IgorG"
      },
      {
        "name": "David Bajot",
        "href": "https://enrichment.bayareachess.com/DavidB"
      },
      {
        "name": "Antonio Rabadan",
        "href": "https://enrichment.bayareachess.com/AntonioR"
      },
      {
        "name": "Griffin Herr",
        "href": "https://enrichment.bayareachess.com/GriffinH"
      },
      {
        "name": "Wilfredo \"Fred\" Sabobo Jr.",
        "href": "https://enrichment.bayareachess.com/FredS"
      },
      {
        "name": "Darryl Kwan",
        "href": "https://enrichment.bayareachess.com/DarrylKwan"
      },
      {
        "name": "Stimit Shah",
        "href": "https://enrichment.bayareachess.com/StimitS"
      },
      {
        "name": "Edward Lewis",
        "href": "https://enrichment.bayareachess.com/EdLewis"
      },
      {
        "name": "Mathew Benson",
        "href": "https://enrichment.bayareachess.com/MathewB"
      },
      {
        "name": "Sana Tsogtsaikhan",
        "href": "https://enrichment.bayareachess.com/Sana"
      },
      {
        "name": "Jason Cruz",
        "href": "https://enrichment.bayareachess.com/JasonCruz"
      },
      {
        "name": "Neil Rodas",
        "href": "https://enrichment.bayareachess.com/NeilRodas"
      },
      {
        "name": "Jordan Langland",
        "href": "https://enrichment.bayareachess.com/Jordan"
      },
      {
        "name": "Elena Kondakova",
        "href": "https://enrichment.bayareachess.com/elena"
      },
      {
        "name": "Venkat Acharya",
        "href": "https://enrichment.bayareachess.com/Venkat"
      },
      {
        "name": "Tiffany Farah",
        "href": "https://enrichment.bayareachess.com/Tiffany"
      },
      {
        "name": "GM Steven Zierk",
        "href": "https://enrichment.bayareachess.com/StevenZierk"
      },
      {
        "name": "Alan Hung",
        "href": "https://enrichment.bayareachess.com/AlanH"
      },
      {
        "name": "GM Atanas Kolev",
        "href": "https://enrichment.bayareachess.com/atanas"
      },
      {
        "name": "WFM Bada Norovsambuu",
        "href": "https://enrichment.bayareachess.com/bada"
      },
      {
        "name": "Svetlana Kondakova",
        "href": "https://enrichment.bayareachess.com/Svetlana"
      },
      {
        "name": "Jennifer Ly",
        "href": "https://enrichment.bayareachess.com/Jenny"
      },
      {
        "name": "Jeff Ouye",
        "href": "https://enrichment.bayareachess.com/jeff"
      },
      {
        "name": "Jason Uerkvitz",
        "href": "https://enrichment.bayareachess.com/jasonu"
      },
      {
        "name": "James Bethany",
        "href": "https://enrichment.bayareachess.com/james"
      },
      {
        "name": "Wolfgang Behm",
        "href": "https://enrichment.bayareachess.com/wolfgang"
      },
      {
        "name": "GM Enrico Sevillano",
        "href": "https://enrichment.bayareachess.com/enrico"
      },
      {
        "name": "Brendyn Estolas",
        "href": "https://enrichment.bayareachess.com/Brendyn"
      },
      {
        "name": "Cameron Sayadi",
        "href": "https://enrichment.bayareachess.com/Cameron"
      }
    ],
    "paragraphs": [
      "In remembrance: Coach Bruce Matzner, Coach Anatole Orlovsky, Lead Coach Mike Jones, Coach Raphael Yelluas, and GM Daniel Naroditsky."
    ],
    "links": [
      {
        "label": "Full roster on enrichment site",
        "href": "https://enrichment.bayareachess.com/coaches"
      },
      {
        "label": "Volunteers",
        "href": "/enrichment/volunteers"
      }
    ]
  },
  "volunteers": {
    "slug": "volunteers",
    "kicker": "Ages 13\u201317",
    "title": "Volunteer with BAC",
    "intro": "Bay Area Chess offers teen volunteer hours at clubs, camps, and major tournament events. Adults may inquire about tournament-event volunteering.",
    "points": [
      "Clubs: help at beginner/intermediate drop-in locations on select weekends",
      "Camps: 4-hour blocks (mornings, afternoons, or mid-day) \u2014 Palo Alto especially benefits from volunteers at outdoor lunch/breaks",
      "Major tournaments: floor help, scoring, awards, setup \u2014 often San Jose / Milpitas / Santa Clara weekends"
    ],
    "faqs": [
      {
        "q": "Volunteer conduct?",
        "a": "No inappropriate clothing or conversations (profanity, politics/religion, mature topics). No unnecessary physical contact; violence banned. Limit phone use while assisting. Follow BAC hygiene expectations around shared materials."
      },
      {
        "q": "How do I sign up?",
        "a": "Email enrich@bayareachess.com with your age, availability, and preferred activity (club, camp, or tournament). Always confirm a slot before expecting hours."
      }
    ],
    "links": [
      {
        "label": "Coaches",
        "href": "/enrichment/coaches"
      },
      {
        "label": "Camps",
        "href": "/enrichment/camps-all"
      }
    ]
  },
  "testimonials": {
    "slug": "testimonials",
    "kicker": "Parent voices",
    "title": "Testimonials",
    "intro": "Unsolicited feedback posted anonymously or with permission. We take each note seriously to improve classes, camps, clubs, and teams.",
    "quotes": [
      {
        "text": "To teach a child an appreciation and drive for achievement is no small task. Bay Area Chess is a huge resource for our child.",
        "by": "Parent \u00b7 After-school at Encinal"
      },
      {
        "text": "Enrichment Bay Area Chess has taught him a love of strategy to game with my friends, where my coach is always excited about scores.",
        "by": "Parent of an after-school student"
      },
      {
        "text": "Thanks so much to all the coaches who made chess camp so fun. My son is age 15 with Down syndrome but loves chess \u2014 the camp was welcoming and joyful.",
        "by": "Marissa \u00b7 Summer in-person camps"
      },
      {
        "text": "BAC's incomparable asset is each of their staff \u2014 teachers have passion for chess and a personal mission to help kids grow.",
        "by": "Clif Chu \u00b7 Clubs & tournaments"
      },
      {
        "text": "Fun and educational \u2014 kept my age-6 son on his toes while learning a challenging game he can apply patience to daily life.",
        "by": "San-San \u00b7 Online spring courses"
      },
      {
        "text": "Chess has kind of saved our boys during quarantine. They have fallen in love with it \u2014 a direct result of fabulous coaching.",
        "by": "Parent of two \u00b7 Online camps & courses"
      },
      {
        "text": "My daughter attended summer camp as a Level 2 beginner with Coaches Jenny, Jason, Arek, and Jeff \u2014 I saw drastic improvement.",
        "by": "Rashmi M. \u00b7 Online summer boot camps"
      },
      {
        "text": "Due to the pandemic we tried a lot of online classes \u2014 so far, your camp is the only one that's a hit!",
        "by": "Romana K. \u00b7 Online boot camps"
      }
    ],
    "links": [
      {
        "label": "More on enrichment site",
        "href": "https://enrichment.bayareachess.com/page/testimonials"
      }
    ]
  },
  "fsa-receipts": {
    "slug": "fsa-receipts",
    "kicker": "Dependent care",
    "title": "FSA receipts",
    "intro": "Guidance for Dependent Care FSA claims related to BAC enrichment programs.",
    "points": [
      "Typically eligible: weekday seasonal camps and before/after-school programs for children under 13",
      "Usually not eligible: weekend chess clubs and team classes \u2014 confirm with your FSA provider",
      "Tax ID: 26-2776273 (nonprofit). Use with the automated confirmation emailed at registration",
      "Custom detailed FSA receipt: $9 administrative fee per receipt"
    ],
    "faqs": [
      {
        "q": "Can I prepay next year with FSA?",
        "a": "No. FSAs are reimbursement accounts \u2014 an expense is incurred when the service is rendered, not when billed or paid in advance."
      },
      {
        "q": "What do you need for a custom receipt?",
        "a": "Child name(s), parent/guardian name, mailing address, email, and cell phone. Receipts cover registrations in the current year. Pay the $9 fee via the enrichment payments link, then email enrich@bayareachess.com."
      }
    ],
    "links": [
      {
        "label": "FSA Feds overview",
        "href": "https://www.fsafeds.com/explore/dcfsa"
      },
      {
        "label": "Policies (PDF)",
        "href": "https://enrichment.bayareachess.com/sites/default/files/2026-05/Policies.-2026.pdf"
      }
    ]
  }
},
};
