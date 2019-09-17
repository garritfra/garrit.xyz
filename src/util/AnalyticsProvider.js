export default class AnalyticsProvider {
  static instance;

  constructor() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    } else {
      window.ga =
        window.ga ||
        function() {
          (ga.q = ga.q || []).push(arguments);
        };
      ga.l = +new Date();
      ga("create", "UA-122968527-1", "auto");
      ga("send", "pageview");

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag("js", new Date());

      gtag("config", "UA-122968527-1");
    }
  }
  static getInstance() {
    if (!AnalyticsProvider.instance) {
      AnalyticsProvider.instance = new AnalyticsProvider();
      // ... any one time initialization goes here ...
    }
    return AnalyticsProvider.instance;
  }

  logEvent(category, action, label) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    } else {
      ga("send", "event", category, action, label);
    }
  }
}
