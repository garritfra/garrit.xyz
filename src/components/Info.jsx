import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Transition, Grid, Image } from 'semantic-ui-react';

class Info extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { imgVisible: false };
  }


  componentDidMount() {
    this.setState({ imgVisible: true });
  }

  render() {
    const src = new URL('https://scontent-frt3-2.xx.fbcdn.net/v/t1.0-9/20953090_1641167239286594_1135665268716135703_n.jpg?oh=bf74be88a6497e74df79a8abba9f0698&oe=5AE93C4B');

    const imgStyle = {
      // position: "left",
      width: '400px',
      height: 'auto',
      margin: '10px',
    };
    const style = {
      margin: imgStyle.margin,
      'text-align': 'left',
    };

    return (
      <div style={style}>
        <Grid devided="vertically" columns={3}>
          <Grid.Column size={1}>
            <Transition visible={this.state.imgVisible} animation="scale" duration={500}>
              <Image src={src} fluid />
            </Transition>
          </Grid.Column>

          <Grid.Column size={2}>
            <h1>Hello World</h1>
            <p>Semi-Professional Hobby Developer</p>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Info;
