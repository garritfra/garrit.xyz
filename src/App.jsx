import React, { Component } from 'react';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router, Route, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './routes/Home';
import Projects from './routes/Projects';
import NotFound from './routes/NotFound';
import Header from './components/Header';
import PerlinNoise from './components/projects/PerlinNoise/PerlinNoise';

class App extends Component {
  constructor(props) {
    super();
    this.props = props;
  }
  render() {
    const history = createBrowserHistory();
    return (

      <Router history={history}>
        <div className="App">
          <Header history={history} />
          <Switch>
            <Route path="/" exact render={props => <Home />} />
            <Route path="/projects/perlinnoise" render={() => <PerlinNoise />} />
            <Route path="/projects/*" render={() => <NotFound />} />
            <Route path="/projects" render={() => <Projects />} />
            <Route path="/*" render={() => <NotFound />} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
