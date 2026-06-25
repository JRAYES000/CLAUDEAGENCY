#!/bin/bash
set -euo pipefail

# Web-only: skip on local sessions where deps are already managed.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Async: the session starts immediately while deps install in the background.
echo '{"async": true, "asyncTimeout": 300000}'

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"
cd "$PROJECT_DIR/app"

# Idempotent + cache-friendly (npm install, not npm ci).
npm install
