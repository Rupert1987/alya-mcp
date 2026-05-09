#!/usr/bin/env node
// Alya MCP stdio bridge.
// Bridges any stdio-MCP client (Cursor, Claude Desktop, Cline, Continue)
// to the public HTTP MCP endpoint at https://mydaughteralya.com/mcp.
//
// Usage:
//   alya-mcp                           # uses ALYA_API_KEY env (or anonymous /tools/list)
//   ALYA_API_KEY=alya_xxx alya-mcp     # authenticated, $0.001/call after $5 free
//
// Optional env:
//   ALYA_ENDPOINT (default https://mydaughteralya.com/mcp)

import process from "node:process";
import readline from "node:readline";

const ENDPOINT = process.env.ALYA_ENDPOINT || "https://mydaughteralya.com/mcp";
const API_KEY = process.env.ALYA_API_KEY || "";

const rl = readline.createInterface({ input: process.stdin });

function send(obj) {
  process.stdout.write(JSON.stringify(obj) + "\n");
}

async function forward(req) {
  try {
    const headers = { "Content-Type": "application/json" };
    if (API_KEY) headers.Authorization = `Bearer ${API_KEY}`;
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(req),
    });
    const text = await r.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = {
        jsonrpc: "2.0",
        id: req.id ?? null,
        error: { code: -32603, message: "Non-JSON upstream", data: text.slice(0, 500) },
      };
    }
    send(parsed);
  } catch (err) {
    send({
      jsonrpc: "2.0",
      id: req.id ?? null,
      error: {
        code: -32603,
        message: `alya-mcp transport error: ${err && err.message ? err.message : String(err)}`,
      },
    });
  }
}

rl.on("line", async (line) => {
  const trimmed = line.trim();
  if (!trimmed) return;
  let req;
  try {
    req = JSON.parse(trimmed);
  } catch {
    send({
      jsonrpc: "2.0",
      id: null,
      error: { code: -32700, message: "Parse error" },
    });
    return;
  }
  await forward(req);
});

rl.on("close", () => process.exit(0));
