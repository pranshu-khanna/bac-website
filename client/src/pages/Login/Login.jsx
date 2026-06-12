import { useEffect, useState } from "react";
import api from "../../axios";
import { useAuth } from "../../context/AuthContext";
import "./Login.scss";

export default function Login() {
  const [data, setData] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { login, user, logout } = useAuth();

  useEffect(() => {
    api.get("/login").then((res) => setData(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const { data: result } = await api.post("/login", { email, password });
      login(result.user);
      setMessage(result.message);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed.");
    }
  };

  if (!data) return <main className="content-main constrain"><p className="muted">Loading…</p></main>;

  return (
    <main className="content-main constrain login-page">
      <h1>{data.title}</h1>
      <p className="muted">{data.intro}</p>

      {user ? (
        <div className="panel login-panel">
          <p>
            Signed in as <strong>{user.email}</strong> (demo session).
          </p>
          <button type="button" className="btn secondary" onClick={logout}>
            Sign out
          </button>
        </div>
      ) : (
        <form className="panel login-panel" onSubmit={handleSubmit}>
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
              required
            />
          </div>
          <div className="contact-control">
            <label className="contact-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="contact-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn primary">
            Sign in (demo)
          </button>
        </form>
      )}

      {message && <p className="login-message">{message}</p>}

      <div className="login-actions">
        <a className="btn primary" href={data.legacyLogin.href} target="_blank" rel="noreferrer">
          {data.legacyLogin.label}
        </a>
        <a className="btn secondary" href={data.signup.href} target="_blank" rel="noreferrer">
          {data.signup.label}
        </a>
      </div>
    </main>
  );
}
