import { Analytics } from "analytics";
import GoogleAnalyticsPlugin from "analytics-plugin-ga";

export default class AnalyticsProvider {
  private static instance: AnalyticsProvider;
  public analytics: any;

  private constructor() {
    this.analytics = Analytics({
      app: "garrit-franke",
      plugins: [GoogleAnalyticsPlugin({ trackingId: "UA-122968527-1" })]
    });
  }
  static getInstance() {
    if (!AnalyticsProvider.instance) {
      AnalyticsProvider.instance = new AnalyticsProvider();
      // ... any one time initialization goes here ...
    }
    return AnalyticsProvider.instance;
  }
}
