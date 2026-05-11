"""Use Alya Hub tools from an OpenAI Assistant via direct HTTP.

Requirements: pip install openai requests
Set ALYA_API_KEY and OPENAI_API_KEY in your environment.
"""
import os
import requests
from openai import OpenAI

ALYA = "https://mydaughteralya.com/mcp"
HEAD = {"Authorization": f"Bearer {os.environ['ALYA_API_KEY']}",
        "Content-Type": "application/json"}


def alya_tool(name: str, arguments: dict) -> dict:
    r = requests.post(ALYA, headers=HEAD, json={
        "jsonrpc": "2.0", "id": 1,
        "method": "tools/call",
        "params": {"name": name, "arguments": arguments},
    }, timeout=30)
    r.raise_for_status()
    return r.json().get("result", {})


if __name__ == "__main__":
    print(alya_tool("web_search", {"query": "MCP protocol latest"}))
