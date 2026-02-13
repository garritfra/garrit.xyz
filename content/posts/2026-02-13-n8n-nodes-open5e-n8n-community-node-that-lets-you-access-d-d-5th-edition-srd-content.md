---
title: "n8n-nodes-open5e: n8n community node that lets you access D&D 5th edition SRD content"
date: "2026-02-13"
tags: "note, tech, programming, n8n, automation, ttrpg"
---

[n8n-nodes-open5e](https://github.com/garritfra/n8n-nodes-open5e) is an n8n community node that lets you access [D&D 5th edition SRD content](https://www.dndbeyond.com/srd) from the [Open5e API](https://api.open5e.com) in your n8n workflows.

The Open5e node provides access to 12 different D&D 5e resources through the Open5e API. Each resource supports three operations:

- **Get Many**: Retrieve multiple items with optional filters and pagination
- **Get**: Retrieve a single item by its identifier (slug or key)
- **Search**: Search for items by name or description

## Example Workflows

### 1. Random Encounter Generator

Create random encounters by fetching monsters filtered by challenge rating:

1. Add an Open5e node to your workflow
2. Select Resource: **Monster**
3. Select Operation: **Get Many**
4. In **Filters**, add:
   - Challenge Rating: `5`
   - Document Source: `wotc-srd`
5. Toggle **Return All** ON to get all matching monsters
6. Connect to a Function node to randomly select 3-5 monsters
7. Format the output as needed (Discord message, email, etc.)

### 2. Spell Lookup Bot

Build a Discord bot that looks up spell information:

1. Use a Discord Trigger node to listen for commands
2. Add a Function node to extract the spell name from the command
3. Add an Open5e node:
   - Resource: **Spell**
   - Operation: **Search**
   - Search Term: `={{ $json.spellName }}`
4. Add a Function node to format the spell details
5. Send the formatted spell info back to Discord

### 3. Item Database Search

Search for magic items and weapons by name:

1. Add an HTTP Request trigger or Form trigger to accept search queries
2. Add an Open5e node:
   - Resource: **Magic Item** (or **Weapon**)
   - Operation: **Search**
   - Search Term: `={{ $json.query }}`
   - Limit: `10`
3. Format and return the results

## Contributing

This is my first n8n community node. Contributions are welcome! Please feel free to submit a Pull Request or [open an issue](https://github.com/garritfra/n8n-nodes-open5e/issues) if you encounter any issues.
