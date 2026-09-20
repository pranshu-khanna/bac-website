const siteData = require("../data/siteData");

exports.getAbout = (_req, res) => {
  res.json({
    hero: {
      tag: "About us",
      title: "Bay Area Chess",
      missionLead:
        "We bring coaching and events to your area at times convenient for you.",
      missionText:
        "Bay Area Chess is a nonprofit organization dedicated to promoting chess education and competition throughout the San Francisco Bay Area. We host tournaments, run enrichment programs, and support players of all ages and skill levels.",
      welcome: "Welcome to our community.",
    },
    president: siteData.president,
    staff: siteData.staff,
    board: siteData.board,
    testimonials: siteData.testimonials,
    testimonialsUrl: "https://bayareachess.com/about/testimonials/",
    commitments: [
      "Provide high-quality chess instruction and events",
      "Foster a welcoming community for all players",
      "Support scholastic chess development",
      "Maintain USCF standards at rated tournaments",
    ],
    recognition:
      "Bay Area Chess was named USCF Chess Club of the Year in 2018.",
  });
};
