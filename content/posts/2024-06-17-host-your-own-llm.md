---
title: "Host your own LLM"
date: "2024-06-17"
tags: "infrastructure, guide, note, homelab, tech, llm, ai"
---

I'm currently dipping my toes into Large Language Models (LLMs, or "AI") and what you can do with them. It's a fascinating topic, so expect some more posts on this in the coming days and weeks.

For starters, I wanted to document how I got my first LLM running on my local machine (a 2022 MacBook Pro). [Ollama](https://ollama.com/) makes this process super easy. You just install it (`brew install ollama` in my case) and then run the model:

```
ollama run llama3
```

This will download the model and open a prompt, so you can start chatting right away!

You can think of Ollama as the [Docker](https://www.docker.com/) CLI but for LLMs. There's a [directory of LLMs](https://ollama.com/library), and if a model has multiple different sizes, you can use it like you would pull a different docker tag:

```
ollama pull llama3:8b
ollama pull llama3:70b
```

The best thing about ollama is that it also exposes a web server for you to integrate the LLM into your application. As an example, here's how you would curl your local LLM:

```
curl http://localhost:11434/api/chat -d '{
    "model": "llama3",      
    "messages": [{ "role": "user", "content": "Are you a robot?" }],
    "stream": false
}'
{"model":"llama3","created_at":"2024-06-17T11:19:23.510588Z","message":{"role":"assistant","content":"I am not a human, but I'm also not a traditional robot. I'm an artificial intelligence language model designed to simulate conversation and answer questions to the best of my ability. My \"brain\" is a complex algorithm that processes natural language inputs and generates responses based on patterns and associations learned from large datasets.\n\nWhile I don't have a physical body or consciousness like humans do, I'm designed to interact with humans in a way that feels natural and conversational. I can understand and respond to questions, make suggestions, and even tell jokes (though my humor may be a bit... algorithmic).\n\nSo, while I'm not a human or a traditional robot, I exist at the intersection of technology and language, designed to assist and communicate with humans in a helpful way!"},"done_reason":"stop","done":true,"total_duration":12565842250,"load_duration":7059262291,"prompt_eval_count":15,"prompt_eval_duration":331275000,"eval_count":156,"eval_duration":5172858000}
```

If your local machine is not beefy enough and you want to try out a large LLM on a rented server (AWS has `g5.2xlarge`, which gave me good results for `mixtral 8x7b`), you also have to set `OLLAMA_HOST=0.0.0.0` in your environment variables to be able to reach the remote server. **This exposes the LLM to the public internet, so be careful when chosing your deployment strategy.**

And there you go! You just deployed your very own LLM. Pretty cool, huh?
