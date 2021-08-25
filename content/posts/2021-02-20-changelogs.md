---
title: Writing good changelogs
date: "2021-02-20"
---

Today, I finally added a proper changelog to [my current project](https://github.com/garritfra/sabre/blob/master/CHANGELOG.md). My obvious first step was to search the web for `changelog.md`, since that's the naming convention many projects are using for their changelog. I was surprised that I was immediately redirected to "[changelog.md](https://changelog.md)", since it is a valid domain name. This website is a great guide on the essense of a good changelog. This is also where I got most of my findings from. Let me walk you through some of the most important ones:

## Changelogs are a vital part of every serious project

The whole point of a changelog is to keep track of how the project evolves over time. When working with multiple people, it helps getting everyone on the same page. Keeping a changelog reduces a possible monopoly of information, since all contributers know what is going on. Of course, users also benefit from your changelog. They will know what changes they can expect when they do an update.

## Entries should have a standardized format

Changelogs are mainly meant to be readable by humans. Here are some important points to watch out for when writing a changelog:

- Every version of your software (major, minor and patch) should have one section and one section only
- Recent releases should be added at the top of the changelog (reverse chronological order)
- Each version _should_ display its release date in ISO format (YYYY-MM-DD) next to the version name

## What types of changes need to be included?

You could just go ahead and throw some changes in a big list and call it a day. To make the changelog more readable though, you should categorize every change by its type. Here's an example of a set of categories that could be included:

- **Features**: New features or additions
- **Fixes**: Bugfixes
- **Security** Important changes regarding holes in your security
- **Documentation**: Changes or additions in your documentation should go here

This is just an example that illustrates how **I** decided to note down my changes. [changelog.md](https://changelog.md) suggests a slightly different convention, but how you're handling it doesn't really matter.

## An example

Here's an example of how a changelog could look like. It's taken from [Sabre](https://github.com/garritfra/sabre), a project I'm currently working on. The full changelog can be found [here](https://github.com/garritfra/sabre/blob/master/CHANGELOG.md).

```md
# Changelog

## v0.4.0 (2021-02-20)

This release introduces the concept of structs, alongside many improvements to the documentation.

**Features**

- Assignment operators (#10)
- Structs (#12)

**Fixes**

None

**Documentation**

- Fixed some typose and broken links
- Document boolean values
- Added this changelog!

## v0.3.0 (2021-02-12)

This release adds type inference to Sabre. There are also a lot of improvements in terms of documentation. The docs are now at a state that can be considered "usable".

**Features**

- Type inference
- The `any` type
- First attempt of LLVM backend

**Fixes**

- Fixed an error when printing numbers

**Documentation**

- Added documentation for for loops
- Added documentation for while loops
- Documented LLVM backend
- Documented comments
- Updated contributing guidelines
```

## Personal recommendations

When releasing a new version, don't just add an entry to your changelog. You should use **git tags** whenever working with versions, to mark the exact commit of the released version.

Read up on **semantic versioning**! This is the most common convention when it comes to versioning your software. ([here](https://www.geeksforgeeks.org/introduction-semantic-versioning/) is a simple guide, [here](https://semver.org/) is the official specification).

I'd also advise you to keep a log of your commits in the description of the tag. Here's a command that does all of this for you:

```
git tag -a <new release> -m "$(git shortlog <last release>..HEAD)"
```

So, if you're releasing version `v0.2.0` after `v0.1.5`, you would run this command to tag your current commit with a good commit history:

```
git tag -a v0.2.0 -m "$(git shortlog v0.1.5..HEAD)"
```

This is post 013 of [#100DaysToOffload](https://100daystooffload.com/).
