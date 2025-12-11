---
title: "Custom Entities in Home Assistant"
date: "2025-12-11"
tags: "guide, note, homeassistant, homelab, tech, programming"
---

My local gym has a gauge on their website that shows an approximation of how many people are currently there. Being an avid [Home Assistant](https://www.home-assistant.io/) user, of course I had to pipe that data into my dashboard somehow. For that, I created a simple [n8n](https://n8n.io/) workflow that scrapes the data off the gym's site and dumps it into a custom entity.

Because creating a custom entity was not quite so straight forward as I'd hoped, I wanted to share how I did it.

I ended up using the `input_number` integration (which seems to come with Home Assistant) and defined an entity that I could reference through the API:

```yaml
# configuration.yaml
input_number:
  easyfitness_auslastung:
    name: EasyFitness Auslastung
    initial: 0
    min: 0
    max: 100
    step: 1
```

After reloading the configuration, the entity was ready to be written to.

As mentioned, I'm using a self-hosted instance of n8n on a Raspberry Pi to automate this. Using their [Home Assistant Integration](https://n8n.io/integrations/home-assistant/), you can simply address the new entity and update its state. And just like that, I was able to add a new Gauge to my dashboard!

