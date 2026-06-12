exports.getMembership = (_req, res) => {
  res.json({
    title: "Membership",
    intro:
      "BAC membership unlocks discounts, member events, and access to rated tournament registration workflows.",
    perks: [
      "Required for all USCF-rated tournaments hosted by BAC",
      "Member discounts on tournament entry fees",
      "Access to member-only camps and events",
      "BACoin rewards at eligible programs",
    ],
    cta: {
      label: "Get / Renew USCF Membership",
      href: "https://bayareachess.com/my/memberships",
    },
    payLink: {
      label: "Pay membership fees",
      href: "https://bayareachess.com/payhere",
    },
  });
};
