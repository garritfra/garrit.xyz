import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import '../index.css';
import ProjectPreview from './../components/ProjectPreview';
import Info from '../components/Info';

class Home extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

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
