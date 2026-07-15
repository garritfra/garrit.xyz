---
title: "You should be using a meta harness for agents"
date: "2026-07-15"
tags: "note, opinion, editors, tech, programming, llm, ai"
---

So you've been using an agent harness like [Claude Code](https://code.claude.com/docs/de/overview), [Codex](https://openai.com/de-DE/codex/), [Pi](https://pi.dev/) or one of the many others on the market. This is great! It's incredible how quickly these projects are evolving.

After talking to some coworkers, reading articles on various blogs and seeing countless memes, it seems like many developers are still stuck in the habit of using "an agent" to aid their work - meaning they use one or at most two agent sessions at once. This is often accompanied by phrases like "I'm scrolling on my phone while I wait for the agent to finish". This worked fine 6 months ago, but frankly, we're past that point now.

Recently, there has been an influx of what I'd call "meta harnesses". I don't know if this is an official term for these products (yet), but I think it's quite fitting.

The idea of a meta harness is an environment to manage the lifecycle of many parallel agents. You can spin up sessions on demand (optionally in a new Git worktree), kick off your usual agent tasks and be notified if it needs input or once is done with its tasks. In the meantime, you can spin up multiple other agents to work on other parts of the codebase, or even other codebases too.

Gone are the days of working on a single bug for half a day before moving to the next issue. With a meta harness, you can work on 5+ open issues at the same time! Just hook up your issue tracker to the agent (through MCP or CLI, whatever makes more sense for you), paste a link to the issue into the prompt and off it goes. No need to babysit every action. In fact, in the past couple of months, meta harnesses have almost entirely replaced my always-open IDE (VSCode in my case), a shift that I wouldn't have imagined a year ago.

## Which meta harness should I choose?

These are the three meta harnesses that I've worked with extensively and that I am confident in recommending:

**[Conductor](https://www.conductor.build/)** was the first meta harness that I've tried. It's very polished, has a clear and intuitive UI and is compatable with Claude Code and Codex. If you've been using one of these two agents, all your skills, commands and MCPs are automatically picked up. Choose this if you 

**[Cursor](https://cursor.com/)** recently made a huge shift away from "AI IDE" by overhauling the entire application. Cursor has arguably the best user experience of all harnesses I've tried. It's not really a "meta harness", but rather a way to manage multiple parallel Cursor sessions at the same time. The user experience remains very similar.

**[Superset](https://superset.sh/)** is by far the most flexible meta harness I've tried, and it's the one I'm currently using the most. Their approach is raw terminal sessions with whatever harness you like the most, instead of wrapping the session in a fancy UI. Superset still provides all the same features as the other harnesses, like Git worktrees, GitHub integration and agent notifications. It supports the most harnesses out there, and you can customize it extremely well to your liking.

## When not to use a meta harness

Using many parallel agents through a meta harness does come with the tradeoff of heavy context switching. A rule of thumb I found for myself is that meta harnesses work really well for **quick tasks** like fixing bugs and implementing smaller features. For larger endeavours like proper features or refactorings, I sometimes still resort to opening an IDE and using a single, focused agent session with proper code navigation support just to be sure that I'm the right headspace. I believe over time this ratio will shift more and more towards using meta harnesses as agent capabilities become better and better.

## Conclusion

If you haven't used a meta harnesses yet, I highly recommend you try one out for your next coding tasks. I genuinly believe that it will change the way you develop software. And if you've just started using them or have experience in other meta harnesses, I'd be greatful to hear from you!
