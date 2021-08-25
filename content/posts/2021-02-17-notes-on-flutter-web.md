---
title: Flutter Web - the Good, the Bad and the Ugly
date: "2021-02-17"
---

These are some notes I took for the evaluation of Flutter web for a potential project at work. I decided to build a frontend for [Miniflux](https://miniflux.app/), since I figured it may enclose many pitfalls an application could potentially have. You can find the current prototype [here](https://github.com/garritfra/FlutterFlux).

## The Good

- **Trivial to set up**: Running a Flutter application in a browser, no matter if it is an existing app or a fresh project, can be done by simply specifying the -d chrome flag.

- **Same behavior compared to mobile app**: Since the app is quite literally a mobile application running in the browser, the page looks and feels like a mobile application. It gives the app a consistent look and feel across all devices. I can imagine this coming in handy for web applications that are primarily used on phones and tablets.

- **Browser API integration**: It seems like many of the libraries make use of Web APIs. For example: I was able to get location updates using the location package, and store data using [localstorage](https://pub.dev/packages/localstorage). Whether the Web target is supported, is noted as a flag in the package documentation.

- **Alternative Backends**: There are two [rendering backends](https://flutter.dev/docs/development/tools/web-renderers), both with its own benefits and drawbacks. The HTML renderer optimizes the page for the browser, which improves performance at the cost of consistency. The CanvasKit renderer renders WebGL using WebAssembly. This gives a consistent look and feel across all devices, at the cost of Performance and download size. If auto is specified, the renderer will be determined based on the device type. Here’s a comparison of the same app rendered with both backends:

|           HTML           |         CanvasKit         |
| :----------------------: | :-----------------------: |
| ![](/assets/flutter_web_renderer_html.png) | ![](/assets/flutter_web_renderer_canvaskit.png) |

## The Bad

- **Still in Beta**: Flutter web requires the developer to use the beta channel of Flutter. I didn’t encounter any issues, but it could be that some features are unstable.

- **No native HTML (With an exception)**: Flutter Web renders the application into its own container, which is not using semantic HTML. The resulting application is also not debuggable using standard web-dev tools, but flutters debugging features can be used. There is a workaround though. Using the [easy_web_view](https://pub.dev/packages/easy_web_view) package, I was able to embed html components as flutter widgets. The embedded code is actual HTML code that the browser itself is rendering, not Flutter. This solution is cross-platform, meaning that it also works flawlessly for mobile builds of the application. This might come in handy if the project demands to embed a javascript component like a video player. This approach could technically also improve SEO, but I’m unsure how a full-blown application only using this approach would behave.

## The Ugly

- **Scrolling feels sluggish**: The scrolling behavior is implemented by flutter itself and does not feel as smooth as the native scrolling behavior of modern browsers.

- **SEO nearly impossible**: Since the application is a SPA and it is not using semantic HTML, it’s very difficult to do any kind of SEO. Lighthouse rated the demo application with a perfect 100 for SEO, but this is probably because it is only aware of the html that surrounds the flutter container. I didn’t find a way to Inject Metatags on a per-site basis.

- **Heavy and slow on old devices**: Even a basic application like the Todo app is very heavy and slow when compared to a “regular” website.

## Conclusion

Flutter Web seems to be a viable candidate to build truly cross-platform applications. Adding Web as a target for existing Flutter mobile apps should be relatively easy. The layout will probably need to be optimized to get the full experience. Native Web APIs seem to be well supported and documented.

The resulting web application is a PWA running inside a container. It is relatively heavy and requires much more resources to run, when compared to a “regular” web application.

I hope you found this useful!

This is post 012 of [#100DaysToOffload](https://100daystooffload.com/).
