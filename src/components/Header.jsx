import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';


class Header extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = { activeItem: this.props.Component };
    this.history = this.props.history;
  }


  render() {
    const { activeItem } = this.state;

    const handleHome = () => {
      this.setState({ activeItem: this });
      this.history.push('/');
    };

    const handleProjects = () => {
      this.setState({ activeItem: this });
      this.history.push('/projects');
    };

    return (
      <div>
        <Menu inverted size="large">
          <Menu.Item name="home" active={activeItem === 'home'} onClick={handleHome} />
          <Menu.Item name="projects" active={activeItem === 'projects'} onClick={handleProjects} />

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

Header.propTypes = {
  history: PropTypes.func,
  Component: PropTypes.element.isRequired,
};

Header.defaultProps = {
  history: null,
};

export default withRouter(Header);
