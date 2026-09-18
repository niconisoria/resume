#!/usr/bin/env bash
# Builds the static site and prints both the public and ATS-only routes to
# PDF as single continuous pages (height fits content, no page breaks) via
# headless Chrome + CDP, so each PDF always matches the actual production
# output - deterministic (same build -> same PDF), no dev-server artifacts.
set -euo pipefail

PORT=4322
# Must match astro.config.mjs's `base` - not read from there automatically.
BASE_URL="http://localhost:$PORT/resume/"
export CHROME_BIN="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -x "$CHROME_BIN" ]; then
  echo "Chrome not found at $CHROME_BIN — set CHROME_BIN to override." >&2
  exit 1
fi

cd "$(dirname "$0")/.."

npx astro build

npx astro preview --port "$PORT" --background
trap 'npx astro preview stop 2>/dev/null || true' EXIT

ready=false
for _ in $(seq 1 30); do
  curl -sf "$BASE_URL" >/dev/null 2>&1 && ready=true && break
  sleep 0.5
done
if [ "$ready" != true ]; then
  echo "Preview server never became ready on port $PORT — aborting." >&2
  exit 1
fi

node "$(dirname "$0")/print-pdf.mjs" "$BASE_URL" "$(pwd)/public/nicolas-nisoria.pdf"
node "$(dirname "$0")/print-pdf.mjs" "${BASE_URL}ats" "$(pwd)/public/nicolas-nisoria-ats.pdf"
