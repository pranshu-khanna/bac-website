const crypto = require("crypto");
const { getDb } = require("../db/database");

const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const SESSION_DAYS = 30;
const RESET_HOURS = 2;

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function publicUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name || "",
  };
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const hash = crypto.scryptSync(password, salt, 64, SCRYPT_PARAMS);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function verifyPassword(password, stored) {
  if (!stored || !stored.startsWith("scrypt$")) return false;
  const [, saltHex, hashHex] = stored.split("$");
  if (!saltHex || !hashHex) return false;
  const salt = Buffer.from(saltHex, "hex");
  const expected = Buffer.from(hashHex, "hex");
  const actual = crypto.scryptSync(password, salt, expected.length, SCRYPT_PARAMS);
  return crypto.timingSafeEqual(expected, actual);
}

function createToken() {
  return crypto.randomBytes(32).toString("hex");
}

function expiresInDays(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function expiresInHours(hours) {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

function findUserByEmail(email) {
  return getDb()
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(normalizeEmail(email));
}

function findUserById(id) {
  return getDb().prepare("SELECT * FROM users WHERE id = ?").get(id);
}

function createUser({ email, password, name }) {
  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes("@")) {
    const err = new Error("Enter a valid email address.");
    err.status = 400;
    throw err;
  }
  if (!password || String(password).length < 8) {
    const err = new Error("Password must be at least 8 characters.");
    err.status = 400;
    throw err;
  }

  const existing = findUserByEmail(normalized);
  if (existing) {
    const err = new Error("An account with this email already exists.");
    err.status = 409;
    throw err;
  }

  const result = getDb()
    .prepare(
      `INSERT INTO users (email, password_hash, name)
       VALUES (?, ?, ?)`,
    )
    .run(normalized, hashPassword(password), String(name || "").trim() || null);

  return findUserById(result.lastInsertRowid);
}

function authenticateUser(email, password) {
  const user = findUserByEmail(email);
  if (!user || !user.password_hash || !verifyPassword(password, user.password_hash)) {
    const err = new Error("Invalid email or password.");
    err.status = 401;
    throw err;
  }
  return user;
}

function createSession(userId) {
  const token = createToken();
  getDb()
    .prepare(
      `INSERT INTO sessions (token, user_id, expires_at)
       VALUES (?, ?, ?)`,
    )
    .run(token, userId, expiresInDays(SESSION_DAYS));
  return token;
}

function destroySession(token) {
  if (!token) return;
  getDb().prepare("DELETE FROM sessions WHERE token = ?").run(token);
}

function getUserForSession(token) {
  if (!token) return null;
  const row = getDb()
    .prepare(
      `SELECT users.*
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token = ?
         AND datetime(sessions.expires_at) > datetime('now')`,
    )
    .get(token);
  return row || null;
}

function createPasswordReset(email) {
  const user = findUserByEmail(email);
  if (!user) return null;

  const token = createToken();
  getDb()
    .prepare(
      `INSERT INTO password_resets (token, user_id, expires_at)
       VALUES (?, ?, ?)`,
    )
    .run(token, user.id, expiresInHours(RESET_HOURS));

  return { user, token };
}

function resetPasswordWithToken(token, password) {
  if (!password || String(password).length < 8) {
    const err = new Error("Password must be at least 8 characters.");
    err.status = 400;
    throw err;
  }

  const row = getDb()
    .prepare(
      `SELECT *
       FROM password_resets
       WHERE token = ?
         AND used_at IS NULL
         AND datetime(expires_at) > datetime('now')`,
    )
    .get(token);

  if (!row) {
    const err = new Error("This reset link is invalid or has expired.");
    err.status = 400;
    throw err;
  }

  const tx = getDb().transaction(() => {
    getDb()
      .prepare(
        `UPDATE users
         SET password_hash = ?, updated_at = datetime('now')
         WHERE id = ?`,
      )
      .run(hashPassword(password), row.user_id);
    getDb()
      .prepare(`UPDATE password_resets SET used_at = datetime('now') WHERE token = ?`)
      .run(token);
    getDb().prepare("DELETE FROM sessions WHERE user_id = ?").run(row.user_id);
  });
  tx();

  return findUserById(row.user_id);
}

function findUserByGoogleId(googleId) {
  if (!googleId) return null;
  return getDb().prepare("SELECT * FROM users WHERE google_id = ?").get(String(googleId));
}

function upsertGoogleUser({ googleId, email, name }) {
  const normalized = normalizeEmail(email);
  if (!googleId || !normalized || !normalized.includes("@")) {
    const err = new Error("Google account is missing required profile details.");
    err.status = 400;
    throw err;
  }

  const byGoogle = findUserByGoogleId(googleId);
  if (byGoogle) {
    getDb()
      .prepare(
        `UPDATE users
         SET email = ?, name = COALESCE(?, name), updated_at = datetime('now')
         WHERE id = ?`,
      )
      .run(normalized, String(name || "").trim() || null, byGoogle.id);
    return findUserById(byGoogle.id);
  }

  const byEmail = findUserByEmail(normalized);
  if (byEmail) {
    getDb()
      .prepare(
        `UPDATE users
         SET google_id = ?, name = COALESCE(?, name), updated_at = datetime('now')
         WHERE id = ?`,
      )
      .run(String(googleId), String(name || "").trim() || null, byEmail.id);
    return findUserById(byEmail.id);
  }

  const result = getDb()
    .prepare(
      `INSERT INTO users (email, password_hash, name, google_id)
       VALUES (?, NULL, ?, ?)`,
    )
    .run(normalized, String(name || "").trim() || null, String(googleId));

  return findUserById(result.lastInsertRowid);
}

function createOAuthState() {
  const state = createToken();
  getDb()
    .prepare(
      `INSERT INTO oauth_states (state, expires_at)
       VALUES (?, ?)`,
    )
    .run(state, expiresInHours(1));
  return state;
}

function consumeOAuthState(state) {
  if (!state) return false;
  const row = getDb()
    .prepare(
      `SELECT state
       FROM oauth_states
       WHERE state = ?
         AND datetime(expires_at) > datetime('now')`,
    )
    .get(state);
  if (!row) return false;
  getDb().prepare("DELETE FROM oauth_states WHERE state = ?").run(state);
  return true;
}

module.exports = {
  normalizeEmail,
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
};
