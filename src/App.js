import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom"
import Home from "./routes/Home";
import Projects from "./routes/Projects"
import NotFound from "./routes/NotFound"
import Header from './components/Header';
import createBrowserHistory from 'history/createBrowserHistory';

class App extends Component {

  render() {
    const history = createBrowserHistory();
    return (

      <Router history={history}>
        <div className="App Railway">
          <Header history = {history}/>
          <Switch>
            <Route path="/" exact render={(props) => <Home/>} />
            <Route path="/projects" render={() => <Projects/>} />
            <Route path="/*" render={() => <NotFound/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;