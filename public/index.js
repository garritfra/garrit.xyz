import React from "react";
import ReactDOM from "react-dom";
import App from "../src/App";
import AnalyticsProvider from "../src/util/AnalyticsProvider";

AnalyticsProvider.getInstance();

ReactDOM.render(<App />, document.getElementById("root"));
