import React, { Component } from 'react';
import './App.css';
import {Router, Route, Switch, } from "react-router-dom"
import Home from "./routes/Home";
import Projects from "./routes/Projects"
import NotFound from "./routes/NotFound"
import Header from './components/Header';
import createBrowserHistory from 'history/createBrowserHistory';
import PerlinNoise from './components/projects/PerlinNoise/PerlinNoise';
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  render() {
    const history = createBrowserHistory();
    return (

      <Router history={history}>
        <div className="App Roboto">
          <Header history={history} />
          <Switch>
            <Route path="/" exact render={(props) => <Home />} />
            <Route path="/projects/perlinnoise" render={() => <PerlinNoise />} />
            <Route path="/projects/*" render={() => <NotFound />} />
            <Route path="/projects" render={() => <Projects/>}/>
            <Route path="/*" render={() => <NotFound />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;