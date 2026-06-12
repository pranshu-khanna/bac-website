/** Content sourced from https://bayareachess.com/events/bacoin/ */
module.exports = {
  title: "BACoins Information, Exchange Rates, and Balances",
  intro:
    "To promote delayed gratification and reduce contact during the tournaments, you will earn BACoin (BA€) for scholastic tournaments. You can redeem these BACoins for trophies, medals, and other prizes.",
  sections: [
    {
      id: "earning",
      heading: "Earn BACoins",
      body: "For signature tournaments, you will earn 6 BA€ per point (minimum 3, maximum 24 BA€ per tournament).",
    },
  ],
  exchangeRates: [
    { coins: 3, prize: "1 Medal" },
    { coins: 9, prize: "Medium Trophy" },
    { coins: 18, prize: "Large 1-Post Trophy" },
    { coins: 36, prize: "XL 1-Post Trophy" },
    { coins: 100, prize: "Giant 2-Post Trophy" },
    { coins: 200, prize: "Giant 3-Post Trophy" },
    { coins: 300, prize: "Giant 4-Post Trophy" },
  ],
  balanceNote:
    "To check your BA€ balance at any time, see the leaderboard below or on the official BACoin page.",
  redeem: {
    heading: "Schedule an Appointment to Redeem BA€",
    body:
      "To redeem your BA€, please schedule an appointment at least 24 hours ahead using the redemption form. If you give us shorter notice, we will try our best but it is unlikely that we have your trophy ready.",
    formUrl: "https://forms.gle/yRZUMpo7eeiJULm9A",
    formLabel: "Schedule redemption appointment",
  },
};
