#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$ROOT_DIR/public"

if [ ! -f "$PUBLIC_DIR/index.html" ]; then
  echo "Missing public/index.html" >&2
  exit 1
fi

if [ -f "$ROOT_DIR/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  . "$ROOT_DIR/.env"
  set +a
elif [ -f "/Users/bluepha/seo-revenue-system/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  . "/Users/bluepha/seo-revenue-system/.env"
  set +a
fi

npx wrangler pages deploy "$PUBLIC_DIR" \
  --project-name="letsrandomize" \
  --commit-dirty=true

