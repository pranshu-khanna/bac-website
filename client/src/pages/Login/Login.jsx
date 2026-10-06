import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../axios";
import { useAuth } from "../../context/AuthContext";
import "./Login.scss";

function GoogleIcon() {
  return (
    <svg className="login-google-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}


const TITLES = {
  signin: "Sign in",
  signup: "Create account",
  forgot: "Forgot password",
  reset: "Reset password",
};

export default function Login() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "reset" ? "reset" : "signin";
  const [mode, setMode] = useState(initialMode);
  const [meta, setMeta] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const { login, user, logout } = useAuth();

  const resetToken = useMemo(() => {
    if (searchParams.get("mode") === "reset") return searchParams.get("token") || "";
    return "";
  }, [searchParams]);
  const authToken = searchParams.get("auth") || "";
  const oauthError = searchParams.get("error") || "";

  useEffect(() => {
    api.get("/login").then((res) => setMeta(res.data)).catch(() => setMeta({}));
  }, []);

  useEffect(() => {
    if (searchParams.get("mode") === "reset") {
      setMode("reset");
    }
  }, [searchParams]);

  useEffect(() => {
    if (oauthError) {
      setError(oauthError);
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("error");
      setSearchParams(nextParams, { replace: true });
    }
  }, [oauthError, searchParams, setSearchParams]);

  useEffect(() => {
    if (!authToken) return undefined;

    let cancelled = false;

    (async () => {
      try {
        localStorage.setItem("bac-token", authToken);
        const { data } = await api.get("/login/me", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (cancelled) return;
        login(data.user, authToken);
        setMessage("Signed in.");
        setMode("signin");
        const nextParams = new URLSearchParams(window.location.search);
        nextParams.delete("auth");
        nextParams.delete("error");
        setSearchParams(nextParams, { replace: true });
      } catch {
        if (cancelled) return;
        localStorage.removeItem("bac-token");
        setError("Google sign-in session could not be completed.");
      }
    })();

    return () => {
      cancelled = true;
    };
    // Intentionally only re-run when a new auth token arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const switchMode = (next) => {
    setMode(next);
    setMessage(null);
    setError(null);
    setPassword("");
    setConfirmPassword("");
    if (next !== "reset") {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("mode");
      nextParams.delete("token");
      nextParams.delete("auth");
      nextParams.delete("error");
      setSearchParams(nextParams, { replace: true });
    }
  };

  const handleGoogle = () => {
    setError(null);
    setMessage(null);
    if (!meta?.google?.available) {
      setError("Google sign-in is not configured yet.");
      return;
    }
    const apiRoot = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");
    window.location.assign(`${apiRoot}/login/google`);
  };


  const handleSignIn = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const { data } = await api.post("/login", { email, password });
      login(data.user, data.token);
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setBusy(false);
      return;
    }
    try {
      const { data } = await api.post("/login/signup", { name, email, password });
      login(data.user, data.token);
      setPassword("");
      setConfirmPassword("");
      setMode("signin");
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Could not create account.");
    } finally {
      setBusy(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const { data } = await api.post("/login/forgot-password", { email });
      setMessage(data.message);
      if (data.devResetUrl) {
        setMessage(`${data.message} Open: ${data.devResetUrl}`);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Could not start password reset.");
    } finally {
      setBusy(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setBusy(false);
      return;
    }
    try {
      const { data } = await api.post("/login/reset-password", {
        token: resetToken,
        password,
      });
      login(data.user, data.token);
      setMessage(data.message);
      switchMode("signin");
    } catch (err) {
      setError(err.response?.data?.error || "Could not reset password.");
    } finally {
      setBusy(false);
    }
  };

  if (!meta) {
    return (
      <main className="content-main login-page">
        <div className="login-shell">
          <p className="muted">Loading…</p>
        </div>
      </main>
    );
  }

  const google = meta.google || {};
  const title = TITLES[mode] || meta.title || "Sign in";

  return (
    <main className="content-main login-page">
      <div className="login-shell">
        <div className="login-card">
          <header className="login-card-header">
            <h1>{title}</h1>
            {mode === "signin" ? (
              <p className="login-card-intro">{meta.intro || "Sign in with your Bay Area Chess account."}</p>
            ) : null}
            {mode === "signup" ? (
              <p className="login-card-intro">Create a local account to use this site.</p>
            ) : null}
            {mode === "forgot" ? (
              <p className="login-card-intro">Enter your email and we’ll send a reset link.</p>
            ) : null}
            {mode === "reset" ? (
              <p className="login-card-intro">Choose a new password for your account.</p>
            ) : null}
          </header>

          {user && mode === "signin" ? (
            <div className="login-signed-in">
              <p>
                Signed in as <strong>{user.name || user.email}</strong>
              </p>
              <button type="button" className="btn secondary login-submit" onClick={logout}>
                Sign out
              </button>
            </div>
          ) : null}

          {(!user || mode !== "signin") && (mode === "signin" || mode === "signup") ? (
            <>
              <button
                type="button"
                className="login-google-btn"
                onClick={handleGoogle}
                disabled={busy}
              >
                <GoogleIcon />
                <span>
                  {mode === "signup"
                    ? google.signUpLabel || "Sign up with Google"
                    : google.signInLabel || "Continue with Google"}
                </span>
              </button>
              <div className="login-divider" role="separator" aria-label="or">
                <span>or</span>
              </div>
            </>
          ) : null}

          {mode === "signin" && !user ? (
            <form className="login-form" onSubmit={handleSignIn}>
              <div className="contact-control">
                <label className="contact-label" htmlFor="login-email">
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="contact-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="contact-control login-password-control">
                <div className="login-password-row">
                  <label className="contact-label" htmlFor="login-password">
                    Password
                  </label>
                  <button type="button" className="login-forgot" onClick={() => switchMode("forgot")}>
                    Forgot password?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  className="contact-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <button type="submit" className="btn primary login-submit" disabled={busy}>
                Sign in
              </button>
            </form>
          ) : null}

          {mode === "signup" ? (
            <form className="login-form" onSubmit={handleSignUp}>
              <div className="contact-control">
                <label className="contact-label" htmlFor="signup-name">
                  Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  className="contact-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="contact-control">
                <label className="contact-label" htmlFor="signup-email">
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  className="contact-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="contact-control">
                <label className="contact-label" htmlFor="signup-password">
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  className="contact-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
              <div className="contact-control">
                <label className="contact-label" htmlFor="signup-confirm">
                  Confirm password
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  className="contact-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>
              <button type="submit" className="btn primary login-submit" disabled={busy}>
                Create account
              </button>
            </form>
          ) : null}

          {mode === "forgot" ? (
            <form className="login-form" onSubmit={handleForgot}>
              <div className="contact-control">
                <label className="contact-label" htmlFor="forgot-email">
                  Email
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  className="contact-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <button type="submit" className="btn primary login-submit" disabled={busy}>
                Send reset link
              </button>
            </form>
          ) : null}

          {mode === "reset" ? (
            <form className="login-form" onSubmit={handleReset}>
              {!resetToken ? (
                <p className="login-message">This reset link is missing a token.</p>
              ) : (
                <>
                  <div className="contact-control">
                    <label className="contact-label" htmlFor="reset-password">
                      New password
                    </label>
                    <input
                      id="reset-password"
                      type="password"
                      className="contact-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                  <div className="contact-control">
                    <label className="contact-label" htmlFor="reset-confirm">
                      Confirm password
                    </label>
                    <input
                      id="reset-confirm"
                      type="password"
                      className="contact-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>
                  <button type="submit" className="btn primary login-submit" disabled={busy}>
                    Update password
                  </button>
                </>
              )}
            </form>
          ) : null}

          {error ? <p className="login-message login-message--error">{error}</p> : null}
          {message ? <p className="login-message">{message}</p> : null}

          {mode === "signin" && !user ? (
            <div className="login-signup">
              <p className="login-signup-copy">New to Bay Area Chess?</p>
              <button
                type="button"
                className="btn primary login-submit"
                onClick={() => switchMode("signup")}
              >
                Create an account
              </button>
            </div>
          ) : null}

          {mode !== "signin" ? (
            <div className="login-signup">
              <button type="button" className="login-forgot" onClick={() => switchMode("signin")}>
                Back to sign in
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
