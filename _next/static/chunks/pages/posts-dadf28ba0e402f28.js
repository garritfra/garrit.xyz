(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[679],{313:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts",function(){return t(5789)}])},6485:function(e,s,t){"use strict";var i=t(5893),n=t(9728),r=t(347);function a(e){var s=e.split("\n\n")[0];return s.length>200?e.slice(0,200).trimEnd()+"...":s}s.Z=function(e){var s=e.posts;return(0,i.jsx)("div",{className:"blog__list",children:s.length>0&&s.filter((function(e){return!e.slug.startsWith("_")})).sort((function(e,s){return e.frontmatter.date<s.frontmatter.date?1:-1})).map((function(e){return(0,i.jsx)("div",{className:"blog__list__post",children:(0,i.jsxs)("a",{href:"/posts/".concat(e.slug),children:[(0,i.jsx)("h2",{children:e.frontmatter.title}),(0,i.jsx)("h4",{className:"blog__list__post__date",children:(s=e.frontmatter.date,new Date(s).toDateString().slice(4))}),(0,i.jsx)("p",{children:(0,i.jsx)(n.D,{remarkPlugins:[r.Z],children:a(e.markdownBody)})})]})},e.slug);var s}))})}},9527:function(e,s,t){"use strict";t.d(s,{Z:function(){return h}});var i=t(5893),n=t(5988),r=(t(7294),t(5655));function a(e){return(0,i.jsx)("header",{className:"header",children:(0,i.jsxs)("nav",{className:"nav",role:"navigation","aria-label":"main navigation",children:[(0,i.jsx)("a",{href:"/",className:"header__logo",children:(0,i.jsx)(r.Z,{options:{strings:[e.siteTitle],speed:30,lifeLike:!0},children:e.siteTitle})}),(0,i.jsxs)("ul",{className:"header__links",children:[(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"/posts",children:"Blog"})}),(0,i.jsx)("li",{children:(0,i.jsx)("a",{href:"/cv",children:"Resume"})})]})]})})}function l(){return(0,i.jsxs)("footer",{className:"footer",children:[(0,i.jsxs)("div",{className:"footer__content",children:[(0,i.jsxs)("section",{className:"footer__content__links",children:[(0,i.jsx)("h3",{children:"Links of Interest"}),(0,i.jsx)("a",{href:"/rss.xml",children:"RSS Feed"}),(0,i.jsx)("br",{}),(0,i.jsx)("a",{href:"/todo",children:"Todo List"}),(0,i.jsx)("br",{}),(0,i.jsx)("a",{href:"https://keyoxide.org/hkp/garrit@slashdev.space",children:"PGP Key"}),(0,i.jsx)("br",{}),(0,i.jsx)("a",{href:"/blogroll",children:"Blogroll"})]}),(0,i.jsxs)("section",{className:"footer__content__social",children:[(0,i.jsx)("h3",{children:"Elsewhere"}),(0,i.jsx)("a",{href:"https://github.com/garritfra",children:"Github"}),(0,i.jsx)("br",{}),(0,i.jsx)("a",{href:"https://www.linkedin.com/in/garritfranke/",children:"LinkedIn"}),(0,i.jsx)("br",{}),(0,i.jsx)("a",{href:"mailto:garrit@slashdev.space",children:"Email"}),(0,i.jsx)("br",{}),(0,i.jsx)("a",{href:"https://matrix.to/#/@garrit:matrix.slashdev.space",children:"Matrix"})]})]}),(0,i.jsx)("p",{children:"\xa9 2019-2022 Garrit Franke"})]})}var c=t(9008);function o(e){return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(c.default,{children:[(0,i.jsx)("html",{lang:"en-US"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,i.jsx)("meta",{charSet:"utf-8"}),(0,i.jsx)("title",{children:e.siteTitle}),(0,i.jsx)("meta",{name:"Description",content:"Generalist developer writing about fullstack development, system administration and free software."}),(0,i.jsx)("link",{rel:"icon",type:"image/svg+xml",href:"/favicon.svg"}),(0,i.jsx)("script",{async:!0,defer:!0,"data-domain":"garrit.xyz",src:"https://analytics.slashdev.space/js/plausible.js"})]})})}function d(e){var s=e.siteTitle,t=e.siteDescription,r=e.children;return(0,i.jsxs)("section",{className:"jsx-8946a52cf42f2313 layout",children:[(0,i.jsx)(o,{siteTitle:s,siteDescription:t}),(0,i.jsx)(a,{siteTitle:s}),(0,i.jsx)("div",{className:"jsx-8946a52cf42f2313 content",children:r}),(0,i.jsx)(l,{}),(0,i.jsx)(n.default,{id:"8946a52cf42f2313",children:".layout.jsx-8946a52cf42f2313 {overflow-x:hidden;\ndisplay:-webkit-box;\ndisplay:-webkit-flex;\ndisplay:-ms-flexbox;\ndisplay:flex;\n-webkit-flex-direction:column;\n-ms-flex-direction:column;\nflex-direction:column;\nmin-height:100vh}\n.layout.jsx-8946a52cf42f2313 .info_page.jsx-8946a52cf42f2313 {color:#ebebeb}\n.content.jsx-8946a52cf42f2313 {}\n@media (min-width:768px) {}"})]})}function h(e){var s=e.title,t=e.date,n=e.siteTitle;return(0,i.jsx)(d,{siteTitle:n,children:(0,i.jsxs)("article",{className:"page",children:[s&&(0,i.jsxs)("div",{className:"page__info",children:[(0,i.jsx)("h1",{children:s}),t&&(0,i.jsx)("h3",{className:"page__info__date",children:t})]}),(0,i.jsx)("div",{className:"page__body",children:e.children}),(0,i.jsx)("div",{className:"page__footer"})]})})}},5789:function(e,s,t){"use strict";t.r(s),t.d(s,{__N_SSG:function(){return l}});var i=t(5893),n=t(1163),r=t(6485),a=t(9527),l=!0;s.default=function(e){var s=(0,n.useRouter)().query,t=s.tags?e.posts.filter((function(e){var t;return null===(t=e.frontmatter.tags)||void 0===t?void 0:t.split(",").map((function(e){return e.trim().toLowerCase()})).includes(s.tags.trim().toLowerCase())})):e.posts;return(0,i.jsx)(a.Z,{siteTitle:"Garrit's Notes",children:(0,i.jsx)(r.Z,{posts:t})})}},1163:function(e,s,t){e.exports=t(387)}},function(e){e.O(0,[277,774,888,179],(function(){return s=313,e(e.s=s);var s}));var s=e.O();_N_E=s}]);