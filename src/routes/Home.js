import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import App from '../App';
import Header from './../components/Header';
import ProjectPreview from './../components/ProjectPreview';

class Home extends Component {


    render() {
      return (
  
        <div className="App Railway">
          <Header />
          <ProjectPreview />
        </div>
      );
    }
  }
  
  export default Home;
