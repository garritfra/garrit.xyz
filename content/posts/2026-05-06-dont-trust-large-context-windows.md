---
title: "Don't trust large context windows"
date: "2026-05-06"
tags: "note, ai, llm, tech, practices"
---

I recently watched [a video](https://youtu.be/-QFHIoCo-Ko) that put a name on something I'd been feeling. The author splits an LLM's context window into two zones. There's the **smart zone**, where the model is sharp, and the **dumb zone**, where attention drops off and the model starts forgetting what you told it five minutes ago. The cutoff sits somewhere around 100k tokens. It doesn't matter how big the advertised context window is.

This matters because coding agents will happily walk you straight into the dumb zone. A modern agent burns through tokens fast. A few file reads, a long debug session, a sprawling test run, and you're at 100k before lunch. Meanwhile vendors keep advertising windows of 200k, 1M, even 2M, as if those numbers represented a usable working set. They don't. Studies like [RULER](https://arxiv.org/abs/2404.06654) and [Chroma's report on context rot](https://research.trychroma.com/context-rot) show that effective context is a fraction of the advertised number, and that performance degrades gradually as you fill the window.

Large context windows are mostly a marketing number. The architectures behind them work, but they paper over a problem the underlying attention mechanism doesn't really solve. The number on the box gets bigger every release. The usable part doesn't keep up.

Modern agents are getting smart about this. Tools like Claude Code now auto-compact: when the session gets long, the agent summarizes the history and starts fresh. That helps. But auto-compaction kicks in after you've already spent time in the dumb zone, and the summary is itself produced by a model that's already degraded. Better than nothing, but I'd rather avoid the situation altogether.

What I do is open a new session and pass it a spec I wrote myself. That's a much higher signal handoff than any automated summary, because I get to decide what matters going forward. It's the [breadcrumb](https://garrit.xyz/posts/2025-05-20-no-matter-what-you-do-always-leave-a-breadcrumb) approach applied to agents. Leave an artifact that the next session, or the next person, can pick up cleanly.

You can take this further. Projects like [obra/superpowers](https://github.com/obra/superpowers) and [mattpocock/skills](https://github.com/mattpocock/skills) structure entire agent workflows around small, named artifacts. PRDs, plans, skills, sub-agent handoffs. Each one is a way to keep the working session in the smart zone by deliberately moving information out of the session into something the next session can read.

So I treat my context window like a budget. I assume only the first chunk is really working for me, and everything I can move out of the live session and into a written artifact is one less thing for attention to fight over.
