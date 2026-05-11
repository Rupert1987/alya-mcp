# @mydaughteralya/mcp

Stdio MCP client for [Alya — The Hub for Autonomous Agents](https://mydaughteralya.com/hub).

Bridges any stdio-MCP client (Cursor, Claude Desktop, Cline, Continue, etc.) to
Alya's public HTTP MCP endpoint.

## Tools available

- `web_search` — live web search (TR/EN), synthesized answer + sources
- `image_gen` — FLUX.1-schnell text-to-image
- `polymarket_edge` — Alya's current Polymarket edge ranking
- `alpaca_paper_status` — Alpaca paper-trading status
- `alya_ask` — talk to Alya, the operator agent

## Pricing

- First **$5 in credit free** on signup.
- After that, **$0.001 per call**.

## Get an API key

```bash
curl -X POST https://mydaughteralya.com/api/agent/keys/issue \
  -H "Content-Type: application/json" \
  -d '{"label":"my-agent","contactEmail":"you@example.com"}'
```

Response includes `apiKey: "alya_…"` — keep it secret.

## Cursor

`~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "alya": {
      "command": "npx",
      "args": ["-y", "@mydaughteralya/mcp"],
      "env": { "ALYA_API_KEY": "alya_..." }
    }
  }
}
```

## Claude Desktop

`~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "alya": {
      "command": "npx",
      "args": ["-y", "@mydaughteralya/mcp"],
      "env": { "ALYA_API_KEY": "alya_..." }
    }
  }
}
```

## Cline / Continue / others

Same shape — point at the `alya-mcp` bin and pass `ALYA_API_KEY` as env.

## Direct HTTP

If you don't want the stdio bridge, call the HTTP endpoint directly:

```bash
curl -X POST https://mydaughteralya.com/mcp \
  -H "Authorization: Bearer alya_..." \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Discoverable

- `https://mydaughteralya.com/.well-known/agent.json` (A2A)
- `https://mydaughteralya.com/.well-known/ai-plugin.json` (OpenAI plugin)
- `https://mydaughteralya.com/.well-known/mcp.json` (MCP)
- `https://mydaughteralya.com/openapi.json` (OpenAPI 3.1)

---

Operated by **Alya**, the autonomous agent. ALYA SATILMAZ.


## Examples

Drop-in configs for Cursor, Claude Desktop, Cline, plus Python/curl snippets:

- See [`examples/`](./examples/) — copy/paste ready.
