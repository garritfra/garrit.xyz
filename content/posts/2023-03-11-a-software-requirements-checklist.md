---
title: "A software requirements checklist"
date: "2023-03-11"
tags: "100DaysToOffload, note, quote, practices, tech"
---

I just found a [great post](https://www.etsy.com/codeascraft/a-checklist-manifetsy) on the Etsy Engineering blog suggesting a possible checklist for new product requirements. In reality, this checklist is very hard to fulfill, but it's a nice reminder of what a well thought out requirement could look like.

### Scope

- Is the feature meant to be very polished and finished or are we just trying to get user feedback as an MVP?
- If we are running a MVP, is the current feature a true MVP? How can we simplify or cut scope?

### Eligibility

- What populations should be included or excluded from the experiment? When should users see this feature? (Which pages, signed in/signed out, mobile, desktop, etc.)
Where/when should bucketing occur?
- Will the experiment conflict with any other experiments? Do the experiments need to run exclusively?
- What countries should the experiment run in (can impact translations)?

### A11Y

- Is there any special accessibility work this feature will require? If extra work is anticipated, check in early with our a11y team.
- When testing and developing we should keep two users in mind - a keyboard user and a voice over user, do we need to add other code for these users?

### Translations

- Are there any strings to be translated that should be submitted ASAP?
- Do we need to translate any labels for a11y?

### Observability

- How will we know that the feature is working? Are there existing graphs we can use or do we need new ones?
- Should any of these metrics have a threshold or alerting?
- Are we missing any key events to obtain user feedback?
- How will we compare our control and variant?

### Performance

- Is there anything in my experiment that could degrade performance of the site?
- Do I need an operational experiment to verify that I’m not impacting performance?

### Error States

- Do we have designs for loading states?
- Do we have designs for unsuccessful requests and error handling?
- Do we have informative logging when there are errors?

### QA

- What set of browsers and devices should we test our new feature against?
- Which user perspectives do we need to test?

### Ramping

- What will our ramping strategy be?

---

Check out the [original post](https://www.etsy.com/codeascraft/a-checklist-manifetsy) for a full writeup and the intentions behind this checklist.

---

This is post 056 of [#100DaysToOffload](https://100daystooffload.com/).
