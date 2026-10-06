const {
  publicUser,
  createUser,
  authenticateUser,
  createSession,
  destroySession,
  getUserForSession,
  createPasswordReset,
  resetPasswordWithToken,
  upsertGoogleUser,
  createOAuthState,
  consumeOAuthState,
} = require("../services/authService");
const { sendPasswordResetEmail } = require("../services/mailer");

function bearerToken(req) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

function clientUrl() {
  return (process.env.CLIENT_URL || "http://localhost:3000").replace(/\/$/, "");
}

function googleConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

function googleRedirectUri(req) {
  if (process.env.GOOGLE_REDIRECT_URI) return process.env.GOOGLE_REDIRECT_URI;
  const host = req.get("x-forwarded-host") || req.get("host");
  const proto = req.get("x-forwarded-proto") || req.protocol || "http";
  return `${proto}://${host}/api/login/google/callback`;
}

function redirectWithError(res, message) {
  const url = new URL(`${clientUrl()}/login`);
  url.searchParams.set("error", message);
  return res.redirect(url.toString());
}

function redirectWithAuth(res, sessionToken) {
  const url = new URL(`${clientUrl()}/login`);
  url.searchParams.set("auth", sessionToken);
  return res.redirect(url.toString());
}

exports.getLogin = (_req, res) => {
  res.json({
    title: "Sign in",
    intro: "Sign in with your Bay Area Chess account.",
    google: {
      signInLabel: "Continue with Google",
      signUpLabel: "Sign up with Google",
      available: googleConfigured(),
      startPath: "/login/google",
    },
  });
};

exports.postLogin = (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const user = authenticateUser(email, password);
    const token = createSession(user.id);
    res.json({
      ok: true,
      message: "Signed in.",
      token,
      user: publicUser(user),
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Login failed." });
  }
};

exports.postSignup = (req, res) => {
  try {
    const { email, password, name } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    const user = createUser({ email, password, name });
    const token = createSession(user.id);
    res.status(201).json({
      ok: true,
      message: "Account created.",
      token,
      user: publicUser(user),
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Could not create account." });
  }
};

exports.postForgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const reset = createPasswordReset(email);
    const payload = {
      ok: true,
      message: "If an account exists for that email, password reset instructions were sent.",
    };

    if (reset) {
      const resetUrl = `${clientUrl()}/login?mode=reset&token=${encodeURIComponent(reset.token)}`;
      try {
        await sendPasswordResetEmail({ to: reset.user.email, resetUrl });
      } catch (mailErr) {
        if (process.env.NODE_ENV !== "production") {
          payload.devResetUrl = resetUrl;
          payload.message =
            "Password reset link created. Email is not configured, so the link is shown for local testing.";
        } else {
          throw mailErr;
        }
      }
    }

    res.json(payload);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Could not start password reset." });
  }
};

exports.postResetPassword = (req, res) => {
  try {
    const { token, password } = req.body || {};
    if (!token || !password) {
      return res.status(400).json({ error: "Reset token and new password are required." });
    }
    const user = resetPasswordWithToken(token, password);
    const sessionToken = createSession(user.id);
    res.json({
      ok: true,
      message: "Password updated. You are now signed in.",
      token: sessionToken,
      user: publicUser(user),
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || "Could not reset password." });
  }
};

exports.postLogout = (req, res) => {
  destroySession(bearerToken(req));
  res.json({ ok: true, message: "Signed out." });
};

exports.getMe = (req, res) => {
  const user = getUserForSession(bearerToken(req));
  if (!user) {
    return res.status(401).json({ error: "Not signed in." });
  }
  res.json({ ok: true, user: publicUser(user) });
};

exports.startGoogle = (req, res) => {
  if (!googleConfigured()) {
    return redirectWithError(res, "Google sign-in is not configured yet.");
  }

  const state = createOAuthState();
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: googleRedirectUri(req),
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
    access_type: "online",
  });

  return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
};

exports.googleCallback = async (req, res) => {
  try {
    if (!googleConfigured()) {
      return redirectWithError(res, "Google sign-in is not configured yet.");
    }

    const { code, state, error } = req.query || {};
    if (error) {
      return redirectWithError(res, "Google sign-in was cancelled.");
    }
    if (!code || !state || !consumeOAuthState(String(state))) {
      return redirectWithError(res, "Google sign-in failed validation. Please try again.");
    }

    const redirectUri = googleRedirectUri(req);
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code: String(code),
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok || !tokenJson.access_token) {
      return redirectWithError(res, "Could not complete Google sign-in.");
    }

    const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });
    const profile = await profileRes.json();
    if (!profileRes.ok || !profile.sub || !profile.email) {
      return redirectWithError(res, "Could not read your Google account profile.");
    }

    const user = upsertGoogleUser({
      googleId: profile.sub,
      email: profile.email,
      name: profile.name || profile.given_name || "",
    });
    const sessionToken = createSession(user.id);
    return redirectWithAuth(res, sessionToken);
  } catch (err) {
    return redirectWithError(res, err.message || "Google sign-in failed.");
  }
};
