---
title: "A better publishing workflow for static blogs"
date: "2024-01-06"
tags: "guide, note, meta, writing, web, github, tech"
---

In my [post](/posts/2023-12-23-100daystooffload-i-made-it) celebrating the completion of my `#100DaysToOffload` challenge, I teased that "I built myself a handy script that turns the contents of a GitHub issue into a pull request, ready to be merged as a blog post". I didn't believe this was such a big deal, but a couple of readers actually reached out to me to ask about this.

First, some background. My site is built using a static site generator (not that it matters, but I use [Next.js](https://nextjs.org/)). The beauty of using a SSG is that every blog post is literally just a markdown file in [a directory](https://github.com/garritfra/garrit.xyz/tree/main/content/posts). 

## The story so far

Before coming up with an automation, I had to

1. Copy an older post to a new file
2. Rename the file
3. Fix the metadata/frontmatter
4. Delete the contents of the post
5. **Write the actual post**
6. Commit the file

Putting out content on my blog involved quite a bit of friction. I felt like there was a barrier between my thoughts and the blog.

## The solution

I've been looking into how I could solve this issue for quite some time. I even had thoughts to build a custom blogging backend that would commit files to the [repository](https://github.com/garritfra/garrit.xyz), which is of course quite silly.

But then it struck me: GitHub issues fully support markdown! The idea was born:

1. Open an issue in the repository of this blog
2. Write the post
3. Kick off an automation that takes the content of the issue and dumps it in a new file
4. Create a pull request to generate a preview of the post
5. Merge the PR once I'm done reviewing the post

## So, how does the automation work?

The magic lies in [this GitHub Action](https://github.com/garritfra/garrit.xyz/blob/main/.github/workflows/publish_via_issue.yaml). It is kicked off whenever the `action:publish` label is added to an issue.

If for some reason this link will not be there anymore in the future, this is the action as of the time of writing:

<details>
<summary>Expand me!</summary>

```yaml
on:
  issues:
    types: [labeled]
  
name: Publish issue as post
jobs:
  publish-issue:
    if: github.event.label.name == 'action:publish'
    runs-on: ubuntu-latest
    env:
      POST_BODY: '${{ github.event.issue.body }}'
    steps:
      - uses: actions/checkout@v4
      - name: Create commits
        run: |
          export POST_DATE=$(date +"%Y-%m-%d")
          export POST_TITLE="${{ github.event.issue.title }}"
          export POST_TAGS=$(echo "${{ join(github.event.issue.labels.*.name, ', ') }}" | grep -o 'tag:[^,]*' | cut -d: -f2- | paste -sd " " - | sed 's/ /, /g')
          export FILE_TITLE=$(printf "$POST_TITLE" | tr -cs '[:alnum:]' '-' | tr 'A-Z' 'a-z' | sed 's/--/-/g' | sed 's/^-\|-$//g')
          export FILE_NAME="$POST_DATE-$FILE_TITLE.md"
          export FULL_PATH="content/posts/$FILE_NAME"
          git config user.name 'Publish Bot'
          git config user.email 'publish-bot@github.com'

          cat << EOF > $FULL_PATH
          ---
          title: "$POST_TITLE"
          date: "$POST_DATE"
          tags: "$POST_TAGS"
          ---

          EOF

          echo "$POST_BODY" >> $FULL_PATH

          git add $FULL_PATH
          git commit -m "Publish $POST_TITLE"

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          title: "New Post: ${{ github.event.issue.title }}"
          body: "Closes #${{ github.event.issue.number }}.\n\n This PR has been generated automatically."
      - uses: actions-ecosystem/action-remove-labels@v1
        with:
          labels: action:publish
```

</details>

So, when I'm done writing the post, I simply label the issue as `action:publish`, and the action turns it into a new file, commits it and ultimately opens a PR for me to review. You can see this in action by looking at [the issue for this post](https://github.com/garritfra/garrit.xyz/issues/432). The action also handles tags for blog posts. You can see that there are a bunch of labels on the issues that correspond to the tags of this post.

One additional benefit of using a static site generator is that I can generate a preview site for each pull request. So, once I'm done writing and the pull request is generated, I can just wait for Netlify to build the preview to read the blog post as if it is published to the site! This is very helpful for spotting typos or formatting issues, especially if I'm writing a post on my phone.


## Further improvements

There are two things the current setup is lacking:

Firstly, GitHub doesn't really highlight typos when writing an issue. I'm sure there are ways to address this post-publish, I just didn't get around to doing that yet.

Secondly, there's no sustainable way to add images to the repository this way. I have an [assets directory](https://github.com/garritfra/garrit.xyz/tree/main/public/assets) where I put all my images for blog posts. You can paste images directly into the issue, which is really handy, but that generates a permalink on a GitHub CDN, somewhere that I don't control. For the future, it would be nice to teach the GH action to take these images and dump them into the asset directory.

## Conclusion

Using this workflow, I can pump out ideas whenever and whereever I feel like it. It drastically reduced the time from idea to written article, which helps me organize my thoughts a lot better. I also frequently create drafts for things I want to write about but is not fully fleshed out yet.
