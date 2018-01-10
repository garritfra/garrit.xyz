import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "./routes/Home";
import Projects from "./routes/Projects"
import NotFound from "./routes/NotFound"
import Header from './components/Header';

class App extends Component {


  render() {
    return (

      <Router>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;