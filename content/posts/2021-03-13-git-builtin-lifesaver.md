---
title: Git's built-in lifesaver
date: "2021-03-13"
---

Everyone was in this situation at some point. You wasted a days worth of work by accidentally deleting a branch. But, all hope is not lost! Git never forgets. 

Every action, be it committing changes, deleting or switching branches, is noted down by Git. To see your latest actions, you can simply run `git reflog` (It's pronounced `ref-log` but `re-flog` sounds just as reasonable):

```
5704fba HEAD@{45}: commit: docs: update changelog
b471457 HEAD@{46}: commit: chore: refactor binop checks in parse_expression
5f5c5d4 HEAD@{47}: commit: fix: struct imports
76db271 HEAD@{48}: commit: chore: fix clippy warning
ac3e11c HEAD@{49}: commit: fix: circular imports
0cbdc88 HEAD@{50}: am: lexer: handle ' or " within the string properly
27699f9 HEAD@{51}: commit: docs: spec: add notation
```

Commits in Git are just data that is not associated by anything. If you accidentally delete a branch, the commits will stay where they are, and you can reference them directly. To recreate your deleted branch, simply run this command:

```
git checkout -b <branch> <sha>
```

And that's it! Your branch is restored. Remember to commit early and often, or prepare to loose your work!

This is post 015 of [#100DaysToOffload](https://100daystooffload.com/).
