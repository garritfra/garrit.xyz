import React, {Component} from 'react';
import '../index.css';
import ProjectPreview from './../components/ProjectPreview';
import Info from '../components/Info';

class Home extends Component {


    render() {
      return (
  
        <div>
          <Info/>
          <ProjectPreview />
        </div>
      );
    }
  }
  
  export default Home;
