---
title: Postgres Docker Container Migration Cheat Sheet
date: "2022-05-31"
tags: "note, guide, 100DaysToOffload, database, docker, postgres"
---

I just finished migrating a postgres database to a new host. To remember how to
do it next time, I'm writing down the commands I used here.

I usually just shut down the database and then copy the local directory where
the volume was mounted onto the new host. This time though, I seemed to be
getting some I/O errors, so I had to do it the "right" way.

To be fair, this note is based on
[this](https://www.netguru.com/blog/how-to-dump-and-restore-postgresql-database)
guide. I modified it to fit my workflow with docker.

## Creating a dump

Log into the old host:

```
ssh <user>@host
```

Connect to the postgres-container:

```
docker exec -ti myservice_db_1 /bin/bash
```

Create a dump. You can name your dump as you wish - I'm using dates to
distinguish multiple dumps:

```
pg_dump -U db_user db_name > db_name_20220531.sql
```

Copy the dump to the host machine:

```
docker cp myservice_db_1:/db_name_20220531.sql ~/
```

## Moving the dump to the new host

The easiest way to get the dump off of the old server and onto the new one is to
use your local machine as a middleman.

First, download the dump to your machine:

```
scp <user>@<host>:~/db_name_20220531.sql .
```

Then, do the same thing but reversed, with the new host:

```
scp ./db_name_20220531.sql <user>@<host>:~/
```

## Restoring the dump

First, connect to the new host:

```
ssh <user>@<host>
```

Assuming the docker service is already running on the new host, attach to the
db-container, just like above:

```
docker exec -ti myservice_db_1 /bin/bash
```

This time, we have to do some fiddling on the database, so attach a session to
postgres using their cli:

```
psql -U my_user
```

Before "resetting" the existing DB to apply the dump, we have to connect to
another database. The `postgres` DB is always there, so you can use that.

```
\c postgres
```

Now, we drop the existing DB and re-add it:

```sql
drop database database_name;
create database database_name with owner your_user_name;
```

And now, the moment you've been waiting for! Leave the psql-session and apply
the dump:

```
psql -U db_user db_name < db_name_20220531.sql
```

That's all! You now have the exact copy of production database available on your
machine.

This is post 032 of [#100DaysToOffload](https://100daystooffload.com/).
