---
title: "Introducing llmtee: see what your LLM calls cost"
date: "2026-11-11"
tags: "note, tech, programming, ai, llm, homelab, infrastructure"
---

> **TL;DR:** [llmtee](https://github.com/garritfra/llmtee) is a self-hosted proxy for the OpenAI and Anthropic APIs, plus any OpenAI-compatible provider. Change one base URL, and every request gets logged with tokens, cost, latency and time to first token. It's a single Go binary with a SQLite file.

I use LLMs in a lot of places by now. Coding agents, a few n8n workflows, some scripts, and local models running on [Ollama](https://garrit.xyz/posts/2024-06-17-host-your-own-llm). What I didn't have was a single place to see what all of that actually costs. Each provider has its own dashboard, they all slice the data differently, and local models don't show up in any of them.

The existing tools didn't fit what I wanted. [Langfuse](https://langfuse.com) wants an SDK and a stack of Postgres, ClickHouse, Redis and S3. [LiteLLM](https://github.com/BerriAI/litellm) is a full gateway with routing and fallbacks across 100+ providers. [Helicone](https://www.helicone.ai) was the closest match, but it's been in [maintenance mode](https://www.mintlify.com/blog/mintlify-acquires-helicone) since March. All I wanted was to answer "what did this cost, and where did it go?", and to stop a runaway agent before it burns through my monthly budget.

So I built llmtee.

![llmtee overview](https://github.com/garritfra/llmtee/raw/main/docs/screenshot-overview.png)

## How it works

The name comes from the Unix `tee`. llmtee passes each response through to your client unchanged and keeps a copy for itself. You point your client's base URL at it, and that's the whole integration:

```sh
docker run -d --name llmtee -p 8080:8080 -v llmtee-data:/data \
  -e LLMTEE_ADMIN_PASSWORD=change-me ghcr.io/garritfra/llmtee

export OPENAI_BASE_URL=http://localhost:8080/openai/v1
export ANTHROPIC_BASE_URL=http://localhost:8080/anthropic
```

Any client that lets you set a base URL works without code changes. That includes the official SDKs, Claude Code, Codex and n8n. Send a request, open `http://localhost:8080`, and it shows up with its tokens and cost. OpenRouter has its own route, and you can add any other upstream (Ollama, vLLM, Groq, ...) with an environment variable like `LLMTEE_UPSTREAM_OLLAMA=http://localhost:11434`.

A proxy that sits in the request path must not get in the way. Only routing, auth and the budget check happen while the client waits. Streamed chunks are flushed to the client as soon as they arrive, and a copy goes to a usage parser. Pricing, metrics and database writes happen in the background, in batches. If the database is slow or down, llmtee keeps forwarding and drops the log events instead. Golden tests replay recorded OpenAI and Anthropic streams through the proxy and require byte-identical output.

On my M4 Pro, at 200 requests per second against a local fake upstream, llmtee added 0.14 ms at p50 and used about 33 MB of memory. You can reproduce that with `make loadtest`.

## Budgets

This is the feature I wanted most. Each key can have a daily and a monthly budget. Once a key hits its limit, llmtee answers with a `429` in the provider's error format and doesn't forward the request.

You can use your provider key as usual, and llmtee will only store a hash of it. Or you can hand out llmtee keys instead. llmtee then swaps in the real provider key on the way out, so your agents and teammates never see it:

```sh
llmtee keys create hermes-agent --budget-day 5 --budget-month 60
```

One caveat: llmtee only knows what a request cost after the response arrives. The request that crosses the limit still completes, so a key can overshoot by exactly one request.

## Honest numbers

llmtee never estimates tokens. It reads them from the provider's response. If a response contains no usage, the request is marked as "usage unknown". For OpenAI streams, it adds `stream_options.include_usage` if the client didn't, so streams report usage too.

Prices come from [LiteLLM's price table](https://github.com/BerriAI/litellm/blob/main/model_prices_and_context_window.json), embedded at build time. The cost is stored with each request, so a price change next month doesn't rewrite your history.

## Getting your data out

- A web UI with spend per day and month, a cost chart you can split by model, key, user or upstream, and a request list with full bodies. It's server-rendered with Go templates and htmx.
- CSV export, from the UI or with `llmtee export --range 30d`.
- Prometheus metrics at `/metrics`.
- An MCP server at `/mcp`, so you can ask your agent what it has been spending.

Body logging is on by default with 30-day retention, because seeing the exact prompt behind an expensive request is half the point. You can turn it off globally, per upstream or per request, and redact specific JSON fields before they're stored. llmtee sends no telemetry.

## What it isn't

llmtee is built for individuals and small teams. It has no evals, prompt management, caching, routing, fallbacks or SSO, and that's on purpose. My rule while building it was: if a feature would need a second service, leave it out or offer an export. If you need any of these, LiteLLM or Langfuse are great choices.

It also sits in your request path. If llmtee is down, your LLM calls fail. Monitor `/healthz` and keep the provider's direct URL at hand.

The native Gemini, Azure OpenAI and Bedrock APIs aren't supported yet, but their OpenAI-compatible endpoints work. The current release is 0.x, so configuration may still change.

## Try it

The code is on [GitHub](https://github.com/garritfra/llmtee) under Apache-2.0. Binaries for Linux, macOS and Windows are on the [releases page](https://github.com/garritfra/llmtee/releases), and there are guides for the SDKs, Claude Code, Codex, Ollama, OpenRouter, vLLM and n8n in the [docs](https://github.com/garritfra/llmtee/blob/main/docs/integrations.md). If you're coming from Helicone, there's a [migration guide](https://github.com/garritfra/llmtee/blob/main/docs/migrating-from-helicone.md) too.

If you try it, I'd love to hear how it goes. [Open an issue](https://github.com/garritfra/llmtee/issues) or [drop me a line](/contact).
