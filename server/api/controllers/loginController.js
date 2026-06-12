exports.getLogin = (_req, res) => {
  res.json({
    title: "Login / Sign up",
    intro:
      "Member login and registration are handled on the legacy Bay Area Chess member portal.",
    legacyLogin: {
      label: "Open legacy login",
      href: "https://bayareachess.com/my/",
    },
    signup: {
      label: "Create an account",
      href: "https://bayareachess.com/my/register",
    },
  });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }
  res.json({
    ok: true,
    message: "Demo auth only — use the legacy portal for real login.",
    user: { email },
  });
};
