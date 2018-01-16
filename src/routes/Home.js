import React, { Component } from 'react';
import '../index.css';
import ProjectPreview from './../components/ProjectPreview';
import Info from '../components/Info';
import { Segment, Divider } from 'semantic-ui-react';

class Home extends Component {


  render() {
    return (
      <div>
        <Info />
        <Segment>
          <ProjectPreview />
        </Segment>
      </div>
    );
  }
}

export default Home;
