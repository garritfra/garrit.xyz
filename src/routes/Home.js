import React, {Component} from 'react';
import '../index.css';
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
