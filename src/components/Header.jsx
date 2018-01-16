import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';


class Header extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { activeItem: this.props.Component };
    this.history = this.props.history;
  }


  handleHome(e, { name }) {
    this.setState({ activeItem: name });
    this.history.push('/');
  }
  handleProjects(e, { name }) {
    this.setState({ activeItem: name });
    this.history.push('/projects');
  }


  render() {
    const { activeItem } = this.state;


    return (
      <div>
        <Menu inverted size="large">
          <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleHome} />
          <Menu.Item name="projects" active={activeItem === 'projects'} onClick={this.handleProjects} />

          <Menu.Menu position="right">
            <Menu.Item href="https://github.com/garritfra" target="_blank">
              <Icon link name="github" size="large" />
            </Menu.Item>
            <Menu.Item href="https://www.facebook.com/Garritfranke" target="_blank">
              <Icon link name="facebook" size="large" />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

Header.defaultProps = {
  history: {},
};

export default withRouter(Header);
