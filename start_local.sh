#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

if [[ ! -d server/api/node_modules || ! -d client/node_modules ]]; then
  echo "Installing dependencies…"
  npm run install:all
fi

cleanup() {
  if [[ -n "${API_PID:-}" ]] && kill -0 "$API_PID" 2>/dev/null; then
    kill "$API_PID" 2>/dev/null || true
  fi
  if [[ -n "${CLIENT_PID:-}" ]] && kill -0 "$CLIENT_PID" 2>/dev/null; then
    kill "$CLIENT_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT INT TERM

echo "Starting API on http://localhost:5001 …"
npm run dev:api &
API_PID=$!

echo "Starting client on http://localhost:3000 …"
npm run dev:client &
CLIENT_PID=$!

echo
echo "Local site: http://localhost:3000"
echo "Enrichment: http://localhost:3000/enrichment"
echo "Enrichment maps use free Leaflet + OpenStreetMap (no API key needed)"
echo "Optional: copy server/api/.env.example → server/api/.env and set SMTP_* for contact form email"
echo "Press Ctrl+C to stop."
echo

wait
