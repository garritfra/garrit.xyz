---
title: Introducing my new blog - slashdev.space
date: "2020-10-08"
---

Hi! Welcome to the new home of my blog. Let me give you a small tour of why I built it, its underlying architecture and my ambitions with this project.

My old blog was based on [Gatsby.js](https://www.gatsbyjs.com/), a static site generator built on React. Back then, I used a quick and dirty blogging template I stole from the Gatsby themes page. Gatsby themes are essentially npm packages, that you throw in your project as a dependency. While it was super easy to set up, I had a hard time configuring it to my likings, since I relied on a framework someone else has provided.

The real turning point came, when I tried to build the blog after a few months of not maintaining it. I wasn't able to compile it, since some dependency of the blog template broke. Of course I could have forked the template and fixed it to my likings, but I didn't want to maintain yet another library until the end of my blogs life. You could draw some parallels to propriotary software, where you don't have the chance to look under the hood and see what's wrong, except in this case, it was just me being lazy.

## A new approach

What I want is a project that I have full control over. I want to be able to customize styling and add features whenever I want to. Gatsby would have been able to give me all of this, but I have the feeling that it sometimes overcomplicates things too much (Having a GraphQL backend is nice, but do you really need that?). I looked at frameworks like [Hugo](https://gohugo.io/) which offers lightning fast compilation, but with it, I would have been tied to "the Hugo way" of templating and configuring the project.

In the end it was [Next.js](https://nextjs.org/) that caught my attention the most, given how simple it is. There's not much configuration involved in the setup process (although getting it to work with github pages was somewhat tedious). Each component in the `pages/` directory corresponds to a full page on the website. The `public/` directory is served statically. That's really all I needed to build a modular webpage.

## Wiring things up

Because Next.js is so minimalistic, there are some parts that you have to set up by yourself. Rendering markdown files for example does not come included, it has to be done manually. Thankfully, there are some packages that can do this for you. All you have to do is write the markdown to the specific pages. It basically boils down to this:

```js
const posts = ((context) => {
  const keys = context.keys();
  const values = keys.map(context);

  const data = keys.map((key, index) => {
    // Create slug from filename
    const slug = key
      .replace(/^.*[\\\/]/, "")
      .split(".")
      .slice(0, -1)
      .join(".");
    const value = values[index];
    // Parse yaml metadata & markdownbody in document
    const document = matter(value.default);
    return {
      frontmatter: document.data,
      markdownBody: document.content,
      slug,
    };
  });
  return data;
})(require.context("../content/posts", true, /\.md$/));
```

Another special case was setting up a RSS feed. I basically had to write a simple script that generates the feed from all posts in the `content/posts` directory, let it run during every build and throws the output in the `public/` directory, so that it can be served as `/rss.xml`. You might argue that this is quite a tedious process for such a feature, but it gives me all the flexibility I want over the features of this project.

## Deployment

I've considered self hosting this blog on my server. While that would have been a fun learning-experience, I wanted to stick to the simple deploy-and-forget workflow I was used to from GitHub Actions. Every push to the master branch triggers a full deployment. No manual work required. Doing it this way, I also save the time and energy to set up SSL encryption, plus it is highly scalable (not that I expect a traffic-explosion, but you never know). Setting Next.js up to deploy to GitHub Pages takes some time, because there are some pitfalls that you have to be aware of. [This article](https://dev.to/jameswallis/deploying-a-next-js-app-to-github-pages-24pn) helped me a lot.

## Ambitions

In the future, I want /dev.space to become more than just a blog. I want it to become a platform for my thoughts and ideas. I'm also playing with the idea to migrate my main website (https://garrit.xyz) over to /dev.space, therefore made sure that my current setup is very future-proof and can be easily extended.

Feel free to dig through the source code for this project. You can find it on my GitHub: https://github.com/garritfra/slashdev.space

Let me know if there is anything that you miss on this blog. Searchable posts? Dark-mode? This is only the beginning of /dev.space!
