---
title: "Cost per Request"
date: "2024-01-18"
tags: "infrastructure, aws, note, opinion, devops, tech"
---

When monitoring infrastructure, we often use metrics like "Requests per second" or "Time per request".

Contrary to that, when monitoring the cost of our infrastructure, we often only review the cloud bill at the end of the month and tell ourselves that those costs are justified for our product.

What if we made "Cost per request" a key metric in our observability strategy, alongside "Requests per second"?

If we follow that path even further, we could derive a standard for how much a request should cost for x% of uptime, across the entire industry. This way, we should be able to identify how much we're overspending for our infrastructure compared to other companies or products.
