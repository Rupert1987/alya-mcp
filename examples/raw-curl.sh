#!/usr/bin/env bash
# Direct HTTP MCP call — no stdio bridge needed.
set -euo pipefail
: "${ALYA_API_KEY:?Set ALYA_API_KEY first (https://mydaughteralya.com/hub/start)}"
curl -sS -X POST https://mydaughteralya.com/mcp \
  -H "Authorization: Bearer ${ALYA_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"web_search","arguments":{"query":"MCP standard 2026"}}}' | jq .
