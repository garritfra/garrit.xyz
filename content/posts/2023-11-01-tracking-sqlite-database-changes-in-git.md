---
title: "Tracking SQLite Database Changes in Git"
date: "2023-11-01"
tags: "100DaysToOffload, guide, note, til, git, tech, sqlite"
---

> **Note**: This post stirred up some interesting discussions on [HackerNews](https://news.ycombinator.com/item?id=38110286) and [Lobste.rs](https://lobste.rs/s/gnv9ho/tracking_sqlite_database_changes_git).

SQLite stores data in binary. If you run `cat mydb.sqlite`, you'll see a bunch of gibberish that doesn't resemble structured data at all. If you want to track changes and updates to a database using Git, you won't be able to see full diffs by default. You'll see that the file has changed, but not what changed exactly:

```diff
diff --git a/mydb.sqlite b/mydb.sqlite
index f412c72..8f49ea5 100644
Binary files a/mydb.sqlite and b/mydb.sqlite differ
```

So, is there a way around that? Turns out: there is! Here's a diff between two states of the SQLite database of [GnuCash](https://www.gnucash.org/index.phtml), which I'm currently trying out to manage my finances. I'll explain how I got this diff afterwards:

```diff
diff --git a/garritfranke.gnucash b/garritfranke.gnucash
index f412c72..8f49ea5 100644
--- a/garritfranke.gnucash
+++ b/garritfranke.gnucash
@@ -100,18 +100,22 @@ INSERT INTO accounts VALUES('ca11987c1c804da4b47b70d0fda87f10','Strom','EXPENSE'
 INSERT INTO accounts VALUES('b1674455d6ec495c8898bcfb65ef100c','Template Root','ROOT',NULL,0,0,NULL,'','',0,0);
+INSERT INTO accounts VALUES('9d2959ea65fc4f29b02dbc593fa9598a','Ausgleichskonto-EUR','BANK','26cc1292cf3e4f9584c71e7b3ec28479',100,0,'39e1c61538e24572abfcf0f3f72022ac','','',0,0);
 CREATE TABLE budgets(guid text(32) PRIMARY KEY NOT NULL, name text(2048) NOT NULL, description text(2048), num_periods integer NOT NULL);
 CREATE TABLE prices(guid text(32) PRIMARY KEY NOT NULL, commodity_guid text(32) NOT NULL, currency_guid text(32) NOT NULL, date text(19) NOT NULL, source text(2048), type text(2048), value_num bigint NOT NULL, value_denom bigint NOT NULL);
 CREATE TABLE transactions(guid text(32) PRIMARY KEY NOT NULL, currency_guid text(32) NOT NULL, num text(2048) NOT NULL, post_date text(19), enter_date text(19), description text(2048));
+INSERT INTO transactions VALUES('db9eff5ec00145f293c85391becbefa8','26cc1292cf3e4f9584c71e7b3ec28479','','2023-11-01 10:59:00','2023-11-01 11:36:23','TEST');
 INSERT INTO splits VALUES('e45aeb0ac0274c6483f8deb2e7ad3743','10cecb081ac24ab5a369c93f96d293da','d229160352064f8c80090e0a10a57d9c','','Rechnung','n','1970-01-01 00:00:00',0,100,0,100,NULL);
 INSERT INTO splits VALUES('bb9d2818bdc14be9bb916f3efd82e77d','10cecb081ac24ab5a369c93f96d293da','1d93d1e67aed4320bb228c16f4e28092','','Rechnung','n','1970-01-01 00:00:00',25000,100,25000,100,'b94c643ddcda48bcb7fc58626452e825');
 INSERT INTO splits VALUES('62747f45556740fe836c9f2180fe70c9','10cecb081ac24ab5a369c93f96d293da','4d6616d8c6524ead86641559539caf50','','Rechnung','n','1970-01-01 00:00:00',-25000,100,-25000,100,NULL);
+INSERT INTO splits VALUES('029f58c4d85c497c8e06ad4e52090033','db9eff5ec00145f293c85391becbefa8','a0f46eb546e34555ab4d0d3cc32c320f','','','n','1970-01-01 00:00:00',-10000,100,-10000,100,NULL);
+INSERT INTO splits VALUES('433a48cfdd314c94a105b5db9e7839de','db9eff5ec00145f293c85391becbefa8','9d2959ea65fc4f29b02dbc593fa9598a','','','n','1970-01-01 00:00:00',10000,100,10000,100,NULL);
 CREATE TABLE slots(id integer PRIMARY KEY AUTOINCREMENT NOT NULL, obj_guid text(32) NOT NULL, name text(4096) NOT NULL, slot_type integer NOT NULL, int64_val bigint, string_val text(4096), 
 INSERT INTO slots VALUES(84,'d9d25d75a993434597d988baa65670bb','job-rate',3,0,NULL,NULL,'1970-01-01 00:00:00',NULL,250,1,NULL);
 INSERT INTO slots VALUES(85,'38cde72240424e8b9e3ab5d4852c9cf0','job-rate',3,0,NULL,NULL,'1970-01-01 00:00:00',NULL,100,1,NULL);
+INSERT INTO slots VALUES(88,'db9eff5ec00145f293c85391becbefa8','date-posted',10,0,NULL,NULL,'1970-01-01 00:00:00',NULL,0,1,'20231101');
 CREATE TABLE recurrences(id integer PRIMARY KEY AUTOINCREMENT NOT NULL, obj_guid text(32) NOT NULL, recurrence_mult integer NOT NULL, recurrence_period_type text(2048) NOT NULL, recurrence_period_start text(8) NOT NULL, recurrence_weekend_adjust text(2048) NOT NULL);
 CREATE TABLE schedxactions(guid text(32) PRIMARY KEY NOT NULL, name text(2048), enabled integer NOT NULL, start_date text(8), end_date text(8), last_occur text(8), num_occur integer NOT NULL, rem_occur integer NOT NULL, auto_create integer NOT NULL, auto_notify integer NOT NULL, adv_creation integer NOT NULL, adv_notify integer NOT NULL, instance_count integer NOT NULL, template_act_guid text(32) NOT NULL);
 CREATE TABLE lots(guid text(32) PRIMARY KEY NOT NULL, account_guid text(32), is_closed integer NOT NULL);
@@ -234,7 +239,7 @@ INSERT INTO taxtable_entries VALUES(3,'1d459b285fca4de3bb4659744dc0cec5','d22916
 INSERT INTO taxtable_entries VALUES(5,'6def0d3a788d414b818ecdb29ba3dcd1','d229160352064f8c80090e0a10a57d9c',0,100000,2);
 CREATE TABLE vendors(guid text(32) PRIMARY KEY NOT NULL, name text(2048) NOT NULL, id text(2048) NOT NULL, notes text(2048) NOT NULL, currency text(32) NOT NULL, active integer NOT NULL, tax_override integer NOT NULL, addr_name text(1024), addr_addr1 text(1024), addr_addr2 text(1024), addr_addr3 text(1024), addr_addr4 text(1024), addr_phone text(128), addr_fax text(128), addr_email text(256), terms text(32), tax_inc text(2048), tax_table text(32));
 DELETE FROM sqlite_sequence;
-INSERT INTO sqlite_sequence VALUES('slots',87);
+INSERT INTO sqlite_sequence VALUES('slots',88);
 INSERT INTO sqlite_sequence VALUES('taxtable_entries',5);
 CREATE INDEX tx_post_date_index ON transactions(post_date);
 CREATE INDEX splits_tx_guid_index ON splits(tx_guid);
```

First, add a diff type called "sqlite3" to your config. The simplest way is to just run these commands:

```shell
git config diff.sqlite3.binary true
git config diff.sqlite3.textconv "echo .dump | sqlite3"
```

Alternatively, you can add this snippet to your `~/.gitconfig` or `.git/config` in your repository:

```gitconfig
[diff "sqlite3"]
        binary = true
        textconv = "echo .dump | sqlite3"
```

Next, create a file called `.gitattributes` if it's not already present and add this line:

```gitattributes
*.sqlite diff=sqlite3
```

> Note that the filename (`*.sqlite`) may differ from your setup. In my case for example, it should match files with `*.gnucash`.

And that's about it! The next time you run `git diff` or any other command that produces a diff on a sqlite file, you'll see a nicely formatted diff of the changes.

### Source

https://stackoverflow.com/a/21789167

---

This is post 084 of [#100DaysToOffload](https://100daystooffload.com/).


