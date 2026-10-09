# BAC Website — New EC2 Setup Runbook

Use this when launching a **new** Amazon Linux 2023 EC2 instance (or rebuilding one).
Replace placeholders before running commands:

| Placeholder | Example |
|-------------|---------|
| `YOUR_KEY.pem` | `bac-website-08-09-26.pem` |
| `EC2_HOST` | `3.141.99.99` or public DNS |
| `DOMAIN` | `bac.studiva.org` |
| `GITHUB_REPO` | `https://github.com/pranshu-khanna/bac-website.git` |
| `APP_DIR` | `/home/ec2-user/bac-website` |

**Never commit** `.pem`, `server/api/.env`, or SQLite DB files.

---

## 0) AWS — security group (console)

Inbound rules on the instance security group:

| Type | Port | Source |
|------|------|--------|
| SSH | 22 | your IP (preferred) or `0.0.0.0/0` |
| HTTP | 80 | `0.0.0.0/0` |
| HTTPS | 443 | `0.0.0.0/0` |

DNS: point `DOMAIN` A record → this instance’s public IPv4.

---

## 1) SSH from your Mac

```bash
chmod 400 YOUR_KEY.pem
ssh -i YOUR_KEY.pem ec2-user@EC2_HOST
```

All commands below run **on the EC2 box** unless noted.

---

## 2) System packages (one-time)

```bash
sudo dnf update -y
sudo dnf install -y git sqlite nginx
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y gcc-c++ make python3
```

`Development Tools` / `make` / `gcc-c++` are required to compile `better-sqlite3`.

Certbot (Let's Encrypt):

```bash
sudo dnf install -y certbot python3-certbot-nginx
```

---

## 3) Node.js 22 + pm2 (one-time)

`better-sqlite3@13` needs **Node ≥ 22**.

```bash
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
nvm alias default 22
node -v    # expect v22.x
npm -v

npm install -g pm2
pm2 -v
```

Make nvm available in new shells (usually already added by the installer):

```bash
# Confirm these lines exist in ~/.bashrc
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

---

## 4) Clone the repo

```bash
cd /home/ec2-user
git clone GITHUB_REPO bac-website
cd /home/ec2-user/bac-website
git status
```

Optional durable auth DB directory (survives repo wipes better):

```bash
sudo mkdir -p /var/lib/bac-website
sudo chown ec2-user:ec2-user /var/lib/bac-website
```

---

## 5) Production `.env` (on EC2 only)

```bash
cd /home/ec2-user/bac-website/server/api
nano .env
chmod 600 .env
```

Minimum production contents:

```bash
NODE_ENV=production
PORT=5001
CLIENT_URL=https://DOMAIN
GOOGLE_REDIRECT_URI=https://DOMAIN/api/login/google/callback
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Optional but recommended durable path:
# AUTH_DB_PATH=/var/lib/bac-website/auth.sqlite

# Optional contact / password-reset email:
# CONTACT_TO_EMAIL=...
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=...
# SMTP_PASS=...
```

Copy Client ID / Secret from Google Cloud (section 9). Do **not** use `localhost` or a raw `:3001` URL here.

---

## 6) Install deps + build

```bash
source ~/.nvm/nvm.sh
cd /home/ec2-user/bac-website

rm -rf client/dist client/node_modules server/api/node_modules
npm run install:all
npm run build
```

If `better-sqlite3` / `node-gyp` fails with `not found: make`, re-run section 2.

---

## 7) Start API with pm2

```bash
source ~/.nvm/nvm.sh
cd /home/ec2-user/bac-website/server/api

pm2 delete bac-api 2>/dev/null || true
NODE_ENV=production PORT=5001 pm2 start server.js --name bac-api --update-env
pm2 save
pm2 startup
# Run the command that `pm2 startup` prints (sudo env PATH=... pm2 startup systemd -u ec2-user --hp /home/ec2-user)

pm2 status
curl -s http://127.0.0.1:5001/ | grep -o 'assets/index[^"]*' | head -3
```

---

## 8) Nginx reverse proxy + HTTPS

### 8a) HTTP proxy (port 80 → pm2 :5001)

```bash
sudo tee /etc/nginx/conf.d/DOMAIN.conf >/dev/null <<'EOF'
server {
    listen 80;
    server_name DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

Replace `DOMAIN` in that file with your real hostname (edit after writing if needed):

```bash
sudo sed -i 's/DOMAIN/bac.studiva.org/g' /etc/nginx/conf.d/DOMAIN.conf
# Or rename file:
# sudo mv /etc/nginx/conf.d/DOMAIN.conf /etc/nginx/conf.d/bac.studiva.org.conf
```

```bash
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
curl -I http://DOMAIN/
```

### 8b) TLS certificate (Let's Encrypt)

Requires DNS for `DOMAIN` already pointing at this EC2, and security group **443** open.

```bash
sudo certbot --nginx -d DOMAIN
```

Follow prompts. Then:

```bash
curl -I https://DOMAIN/
sudo ss -tlnp | grep -E ':80|:443|:5001'
```

Cert renewal is usually installed automatically:

```bash
sudo systemctl status certbot-renew.timer || sudo crontab -l | grep certbot || true
```

---

## 9) Google Cloud OAuth (console — do from your Mac/browser)

1. Open https://console.cloud.google.com/ → select the OAuth project.
2. **APIs & Services** → **Credentials**.
3. Open your **OAuth 2.0 Client ID** (Web application).
4. **Authorized JavaScript origins** — add (no trailing slash):

   ```
   http://localhost:3000
   https://DOMAIN
   ```

5. **Authorized redirect URIs** — add exactly:

   ```
   http://localhost:5001/api/login/google/callback
   https://DOMAIN/api/login/google/callback
   ```

6. **Save**.
7. Copy **Client ID** and **Client Secret** into EC2 `server/api/.env` as `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`.
8. If consent screen is in **Testing**, add your Google account under **OAuth consent screen → Test users**.
9. Restart API after changing `.env`:

   ```bash
   cd /home/ec2-user/bac-website/server/api
   pm2 restart bac-api --update-env
   ```

**Local Mac** `.env` (separate file; keep production lines commented):

```bash
CLIENT_URL=http://localhost:3000
GOOGLE_REDIRECT_URI=http://localhost:5001/api/login/google/callback
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

---

## 10) SQLite — inspect users on EC2

Default DB path (unless `AUTH_DB_PATH` is set):

```bash
DB=/home/ec2-user/bac-website/server/api/data/auth.sqlite
# or:
# DB=/var/lib/bac-website/auth.sqlite

grep AUTH_DB_PATH /home/ec2-user/bac-website/server/api/.env || true
ls -la "$DB"*

sqlite3 -header -column "$DB" \
  "SELECT id, email, name, google_id, created_at FROM users;"
```

Interactive:

```bash
sqlite3 "$DB"
```

```sql
.headers on
.mode column
.tables
SELECT id, email, name, google_id, created_at FROM users;
.quit
```

Tables: `users`, `sessions`, `password_resets`, `oauth_states`.

---

## 11) Ongoing deploy (code update from GitHub)

```bash
source ~/.nvm/nvm.sh
cd /home/ec2-user/bac-website

git fetch origin
git reset --hard origin/main

rm -rf client/dist
npm run install:all
npm run build

cd server/api
pm2 restart bac-api --update-env
pm2 save

curl -s http://127.0.0.1:5001/ | grep -o 'assets/index[^"]*' | head -3
```

`.env` and SQLite stay on the server (gitignored / outside pull).

---

## 12) Smoke checklist

- [ ] `http://DOMAIN` loads (or redirects to HTTPS)
- [ ] `https://DOMAIN` loads (no timeout)
- [ ] Security group has **443**
- [ ] `pm2 status` shows `bac-api` online
- [ ] `/login` shows UI; create account → row appears in `users`
- [ ] Google sign-in works (origins + redirect URIs saved)
- [ ] `CLIENT_URL` / `GOOGLE_REDIRECT_URI` use `https://DOMAIN` on EC2

---

## 13) Useful troubleshooting

| Symptom | Fix |
|---------|-----|
| `better-sqlite3` / `EBADENGINE` Node 20 | `nvm install 22 && nvm alias default 22` |
| `node-gyp` / `not found: make` | `sudo dnf groupinstall -y "Development Tools"` |
| HTTPS browser timeout | Open SG **443**; install Nginx + `certbot --nginx` |
| Google redirect mismatch | Redirect URI in Google Cloud must match `.env` exactly |
| pm2 using old Node after nvm upgrade | `npm install -g pm2 && pm2 update && hash -r` |
| Site 502 after reboot | `pm2 startup` not configured; re-run section 7 |

```bash
pm2 logs bac-api --lines 80
sudo nginx -t
sudo systemctl status nginx
sudo journalctl -u nginx -n 50 --no-pager
```

---

## Quick reference — full first-boot sequence

```bash
# --- on EC2 after SSH ---
sudo dnf update -y
sudo dnf install -y git sqlite nginx certbot python3-certbot-nginx python3
sudo dnf groupinstall -y "Development Tools"
sudo dnf install -y gcc-c++ make

curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
nvm alias default 22
npm install -g pm2

cd /home/ec2-user
git clone https://github.com/pranshu-khanna/bac-website.git bac-website
cd bac-website/server/api
nano .env          # fill production values (section 5)
chmod 600 .env

cd /home/ec2-user/bac-website
npm run install:all
npm run build

cd server/api
NODE_ENV=production PORT=5001 pm2 start server.js --name bac-api --update-env
pm2 save
pm2 startup        # then run the printed sudo command

# Nginx + TLS (edit DOMAIN in conf)
# … section 8 …

# Google Cloud origins/redirects … section 9 …
# Verify users … section 10 …
```
