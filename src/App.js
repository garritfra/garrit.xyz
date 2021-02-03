import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/Home";
import Throwback from "./Throwback/Throwback";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/throwback" component={Throwback} />
    
        </Route>
      </Switch>
    </Router>
  );
}
