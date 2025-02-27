---
title: "A trick to manage frequently used prompts in Claude/ChatGPT"
date: "2025-02-27"
tags: "guide, note, tech, llm, ai"
---

So far, whenever I wanted to recycle a prompt from another context in [Claude](https://www.anthropic.com/claude) (though this also applies to ChatGPT and some other LLMs), I went back in my conversation history, copied the prompt, pasted it in a new chat and adjusted the context. But I recently discovered that [Claude Projects](https://www.anthropic.com/news/projects) can be misused as "prompt templates", which makes it way easier to handle repetitive tasks.

In Projects, you can set a system prompt that will be applied to all conversations in the project. I guess it's supposed to be used for relevant information about whatever you want to work on, but I like to think about a project more as a prompt template, rather than a project. For example, here's a project prompt that I use to brainstorm project ideas:

```
Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let’s do this iteratively and dig into every relevant detail. Remember, only one question at a time.
```

(Stolen from [this](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/) great blog post)

While you could copy and paste this from a text file into every new conversation, Claude's projects make it super easy to save this as a template.

I guess this is an obvious feature for some people, but to me, it was a huge help once I found this out.

Got any other neat tricks for working with LLMs? I'd love to hear them!
