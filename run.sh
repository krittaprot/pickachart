#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

rm -rf .next

printf "Cleaned .next cache. Starting Next.js dev server...\n"
printf "If you had a stale service worker, /sw.js will unregister it on the next browser load.\n\n"

pnpm dev
