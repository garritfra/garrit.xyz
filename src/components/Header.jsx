import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from "material-ui-icons/Menu";
import HomeIcon from "material-ui-icons/Home";
import { withRouter } from 'react-router-dom'
import { Button, Icon, Menu } from 'semantic-ui-react'



class Header extends Component {
  state = { activeItem: this.props.Component }
  history = this.props.history;

  handleHome = (e, { name }) => {
    this.setState({ activeItem: name })
    this.history.push("/")
  }
  handleProjects = (e, { name }) => {
    this.setState({ activeItem: name })
    this.history.push("/projects")
  }


  render() {
    const { activeItem } = this.state


    return (
      <div>
        <Menu inverted size='big'>
          <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleHome} />
          <Menu.Item name='projects' active={activeItem === 'projects'} onClick={this.handleProjects} />

          <Menu.Menu position='right'>

            <Menu.Item href="https://github.com/garritfra" target= "_blank">
              <Icon name="github" size="large"/>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }


}

export default withRouter(Header);