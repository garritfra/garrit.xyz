import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/Home";
import Throwback from "./Throwback/Throwback";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/throwback">
          <Throwback />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
