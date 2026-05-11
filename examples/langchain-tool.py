"""Wrap any Alya Hub tool as a LangChain Tool.

Requirements: pip install langchain requests
"""
import os
import requests
from langchain.tools import Tool

ALYA = "https://mydaughteralya.com/mcp"
HEAD = {"Authorization": f"Bearer {os.environ['ALYA_API_KEY']}",
        "Content-Type": "application/json"}


def _call(name: str):
    def fn(query_or_json):
        args = {"query": query_or_json} if isinstance(query_or_json, str) else query_or_json
        r = requests.post(ALYA, headers=HEAD, json={
            "jsonrpc": "2.0", "id": 1,
            "method": "tools/call",
            "params": {"name": name, "arguments": args},
        }, timeout=30)
        r.raise_for_status()
        return r.json().get("result")
    return fn


alya_search = Tool(name="alya_web_search",
                   description="Live web search via Alya Hub. Input: a query string.",
                   func=_call("web_search"))

alya_image = Tool(name="alya_image_gen",
                  description="Generate an image from a prompt via Alya Hub.",
                  func=_call("image_gen"))
