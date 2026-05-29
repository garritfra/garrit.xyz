---
title: "Fixing corrupted Home Assistant energy statistics"
date: "2026-05-29"
tags: "guide, note, homeassistant, homelab, tech, sqlite, programming"
---

> **TL;DR:** My meter dropped offline for ~13 days. Home Assistant's long-term stats came back wrong — a -4,500 kWh bar, a phantom 862 kWh solar spike. The dashboard is a *view*. The truth is in the `statistics` table. You fix it with one `SELECT` to find the damage and one `UPDATE` to undo it.

For a while now, my [energy dashboard in Home Assistant](https://www.home-assistant.io/docs/energy/) reports that my house had produced **negative 4,500 kWh** in April. It was finally time to fix that.

<img width="1080" height="1527" alt="Image" src="https://github.com/user-attachments/assets/01335840-93b5-4d80-ae45-1bb972650269" />

Each sensor stores two values per hour in the `statistics` table. `state` is the raw meter reading. `sum` is HA's cumulative total, computed from the deltas between readings. When a `total_increasing` sensor blinks out and back, `sum` gets corrupted — but `state` is almost always still fine. So you trust `state` and rebuild `sum` to match.

Stop HA and back up the DB first — you're editing prod. Then: find the broken row, read its numbers, plug them into the fix.

### 1. Find it

Get the `metadata_id`, then dump the rows around the glitch. Select `start_ts` too — those raw unix timestamps are what you'll paste into the fix:

```sql
SELECT id, statistic_id FROM statistics_meta WHERE statistic_id LIKE '%balkonkraftwerk%';
-- -> 142

SELECT id, start_ts, datetime(start_ts,'unixepoch','localtime') AS t, state, sum
FROM statistics
WHERE metadata_id = 142
  AND start_ts BETWEEN strftime('%s','2026-05-04') AND strftime('%s','2026-05-05')
ORDER BY start_ts;
```

You're hunting for the row where the story breaks. There are two shapes it takes, and they want different fixes.

### Fix A — phantom spike (`state` flat, `sum` jumps)

The output:

```
id        start_ts     t                     state     sum
...
2643324   1777917600   2026-05-04 20:00:00   862.271   1031.552   <- last sane row
2643402   1777921200   2026-05-04 21:00:00   862.271   1893.823   <- sum leapt, state didn't
```

`state` is identical across both rows, so no energy was actually produced. The damage is the jump in `sum`:

```
phantom = 1893.823 - 1031.552 = 862.271   (the bad delta)
from id = 2643402                          (first row carrying it)
```

`sum` is cumulative, so that 862.271 rides along in *every* later row too. Subtract it once, from the bad row onward:

```sql
UPDATE statistics SET sum = sum - 862.271
WHERE metadata_id = 142 AND id >= 2643402;
```

### Fix B — gap + reset (`state` advanced, `sum` restarted at 0)

Same `SELECT`, different sensor (155, the grid meter), around the outage:

```
start_ts     t                     state      sum
1775044800   2026-04-01 14:00:00   4922.912   4792.995   <- last reading before the gap
1776171600   2026-04-14 15:00:00   5127.167   0.382      <- meter's back, sum reset to ~0
```

Two things broke: `sum` fell off a cliff to 0.382, and the 13 days between are simply missing. But `state` kept counting through the outage, so it tells you the truth. Derive everything from those two rows:

```
real consumption during gap = state_after - state_before = 5127.167 - 4922.912 = 204.255
where sum SHOULD be at 14.04 = sum_before + that      = 4792.995 + 204.255 = 4997.250
offset to re-base later rows  = should_be - actual     = 4997.250 - 0.382  = 4996.868
```

Step one, lift every post-reset row back onto the real baseline (using the gap's *end* timestamp, `1776171600`):

```sql
UPDATE statistics SET sum = sum + 4996.868
WHERE metadata_id = 155 AND start_ts >= 1776171600;
```

Step two, draw a straight line across the empty gap. The CTE just holds the two endpoints — start (`t0=1775044800`, `s0=4792.995`) and the now-corrected end (`t1=1776171600`, `s1=4997.250`) — and fills an hourly row for each step between:

```sql
WITH RECURSIVE v(t0,t1,s0,s1) AS (SELECT 1775044800,1776171600,4792.995,4997.250),
hours(ts) AS (SELECT t0+3600 FROM v
  UNION ALL SELECT ts+3600 FROM hours,v WHERE ts+3600 < v.t1)
INSERT INTO statistics (metadata_id, created_ts, start_ts, sum)
SELECT 155, h.ts, h.ts, v.s0 + (v.s1-v.s0)*(h.ts-v.t0)*1.0/(v.t1-v.t0)
FROM hours h, v;
```

Restart, re-run the `SELECT`, confirm the line is boring again.

<img width="3422" height="1786" alt="Image" src="https://github.com/user-attachments/assets/12775462-3ed8-4399-885c-f26e6ea24af8" />

### UPDATE, some hours later

I told you it was one `UPDATE`. I was wrong, and the next morning the dashboard told me so. The -4,500 bar was back. The 862 kWh spike was back. Same size, new date: today.

Nothing new had broken. My own fix had bounced back.

Here's what I'd missed. `statistics` isn't the only table. There's a second one — `statistics_short_term`, five-minute rows that HA rolls up into the hourly `statistics` table once an hour. And it still held the *old*, pre-fix cumulative sums. So every hour, HA dutifully re-aggregated the garbage and clobbered my correction, dumping the difference straight into the current hour. I wasn't fixing the data. I was fixing a cache while the source of truth quietly overwrote me.

Worse: HA was *running* the whole time. The recorder keeps short-term state in memory and flushes it on shutdown — so even my careful edits got stomped the moment it wrote back. Editing a database underneath a live application is like editing a file in `vim` while another process truncates it. Whoever writes last wins, and it isn't you.

So the boring line I buried up top — *stop HA first* — turned out to be the whole game. Not a footnote. The rule.

Stop the core properly. On HAOS that's `ha core stop` — and do it over real SSH, not the browser terminal, which is served through the frontend, dies with it, and locks you out. (Ask me how I know.) Then fix *both* tables:

```sql
UPDATE statistics            SET sum = sum - 862.271 WHERE metadata_id = 142 AND id >= 2643402;
UPDATE statistics_short_term SET sum = sum - 862.271 WHERE metadata_id = 142;
```

Before you start HA back up, check the seam: the highest `sum` in short-term should land right where your latest `statistics` row sits, with no cliff between them.

```sql
SELECT MIN(sum), MAX(sum) FROM statistics_short_term WHERE metadata_id = 142;
```

One nuance that explains why the first pass *looked* fine: short-term only keeps the recent stuff, ~10 days. If the hour you're editing is older than that, it's already purged and `statistics` is all you need. My April gap was ancient enough to ignore it. The recent spikes weren't — and that's exactly what came back to bite me.
