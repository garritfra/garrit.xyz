---
title: Server-Side Caching with Apollo GraphQL
date: "2021-10-04"
tags: "javascript, graphql, guide, 100DaysToOffload, programming"
---

I recently implemented server-side caching for one of our applications at work.
This guide tries to document that I've learned. It assumes that you are using
an apollo server of version 3 or higher.

### What is Server-Side Caching?

The point of server-side caching is to reduce the load of your database by
“remembering” the results of a query for a certain period. If the exact same
query comes in again, that remembered result will be returned.

Caching should be handled with care. You should never enable caching for your
entire application. Instead, you should identify the bottlenecks and develop a
strategy to overcome them.

### Enabling caching on the server

The Apollo Team has done a great job
[documenting](https://www.apollographql.com/docs/apollo-server/performance/caching/)
the caching behavior of their server. To add caching to your existing
Apollo-Server, you first have to add the `responseCachePlugin` to your
configuration as shown
[here](https://www.apollographql.com/docs/apollo-server/performance/caching/#caching-with-responsecacheplugin-advanced):

```js
import responseCachePlugin from 'apollo-server-plugin-response-cache';

const server = new ApolloServer({
  // ...other options...
  plugins: [responseCachePlugin()],
});
```

Then, you have to configure a cache backend. By default, Apollo Server will
store the caches in RAM, but I’d recommend [using
Redis](https://www.apollographql.com/docs/apollo-server/data/data-sources/#using-memcachedredis-as-a-cache-storage-backend)
(or Memcached, if you like), especially if your application is spread across
multiple instances of the same backend.

```js
const { BaseRedisCache } = require('apollo-server-cache-redis');
const Redis = require('ioredis');

const server = new ApolloServer({
  // ...
  cache: new BaseRedisCache({
    plugins: [responseCachePlugin()],
    client: new Redis({
      host: 'redis-server',
    }),
  }),
});
```

> Note that you have to use the ioredis library here. node_redis is deprecated
> as of v2.6.0 of apollo-server-cache-redis.

If everything went well, your server should now know how to cache responses!
This alone won’t get you very far, since it doesn’t know what to cache.

### Telling Apollo what to cache

To make a type cachable, you have to declare **cache hints**. These properties
can either be set in the
[resolver](https://www.apollographql.com/docs/apollo-server/performance/caching/#in-your-resolvers-dynamic),
or
[statically](https://www.apollographql.com/docs/apollo-server/performance/caching/#in-your-schema-static)
in the schema. To keep it simple, this guide will stick to the static method.
Feel free to experiment with the dynamic approach though!

To enable cache hints, simply add the following directive to your schema (you
only have to do this once):

```gql
enum CacheControlScope {
  PUBLIC
  PRIVATE
}

directive @cacheControl(
  maxAge: Int
  scope: CacheControlScope
  inheritMaxAge: Boolean
) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
```

Now you can add the `@cacheControl` directive to every type that should be cached.

```gql
# This type will be cached for 30 seconds
type Post @cacheControl(maxAge: 30) {
  id: ID!
  title: String
  author: Author
  comments: [Comment]
}
```

For security reasons, these conditions are [very
strict](https://www.apollographql.com/docs/apollo-server/performance/caching/#why-are-these-the-maxage-defaults):

> Our philosophy behind Apollo Server caching is that a response should only be
> considered cacheable if every part of that response opts in to being
> cacheable.

This means that every type needs to explicitly decide how long it should be
cached. According to this note, the example above actually won’t be cached at
all!

Having to specify the `maxAge` of every type would be tedious, so the authors
have come up with the `inheritMaxAge` property, which allows the type to
inherit the settings from its parent. So, in order to make our example
cachable, we have to enable cache control for all its subfields, either by
setting the `maxAge` explicitly or by inheriting it from the parent:

```gql
type Post @cacheControl(maxAge: 30) {
  id: ID!
  title: String
  author: Author
  comments: [Comment]
}

type Author @cacheControl(inheritMaxAge: true) {
  id: ID!
  name: String
}

type Comment @cacheControl(inheritMaxAge: true) {
  id: ID!
  body: String
}
```

Now, whenever you query a `Post`, it will be thrown in the cache. If you query
the type again within 30 seconds, the query resolver won’t execute. Instead, it
will be read from the cache. Keep in mind that cache hints can also be set on
`query` and `mutation` fields. This can be handy if you want to cache the
entire response of a request.

### Gotcha 1: Multiple Response Variations

The use-case where this topic first came up required us to have different
responses based on the type of the logged in user. An `Admin` should see a
different result than a `Visitor`. If you ignore this fact, it could be that a
visitor could see the cache result of a query previously executed by an admin!

This problem can be counteracted by setting extra information in the cache key
via `extraCacheKeyData` (see
[this](https://www.apollographql.com/docs/apollo-server/performance/caching/#configuring-reads-and-writes)
paragraph):

```js
plugins: [
    responseCachePlugin({
        extraCacheKeyData: (ctx) => (
            ctx.context.auth.isAdmin
        ),
    }),
],
```

This example can create two distinct caches: One for users that are marked as
admins, and one for regular users.

### Gotcha 2: User-specific caches

Besides caching for a group of users, you can also cache responses [for every
user
individually](https://www.apollographql.com/docs/apollo-server/performance/caching/#identifying-users-for-private-responses).
You may have noticed that you can also set a `scope` field in the cache control
directive. This will only cache the response if a user is logged in:

```gql
type Post {
  id: ID!
  title: String
  author: Author @cacheControl(maxAge: 10, scope: PRIVATE)
}
```

Apollo determines if a user is logged in or not, based on if the `sessionId`
function has returned a value other than `null`.

```js
import responseCachePlugin from 'apollo-server-plugin-response-cache';
const server = new ApolloServer({
  // ...other settings...
  plugins: [responseCachePlugin({
    sessionId: (requestContext) => (requestContext.request.http.headers.get('sessionid') || null),
  })],
});
```

I’m unsure how effective this pattern is, since every user will receive its key
in the cache. This kind of defeats the purpose of server-side caching, which is
meant to reduce load on the database. If you’re trying to cache fields for
individual users, you might also want to take a look at client-side caching via
[apollo-augmented-hooks](https://github.com/appmotion/apollo-augmented-hooks).

This is post 020 of [#100DaysToOffload](https://100daystooffload.com/).
