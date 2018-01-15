import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from "material-ui-icons/Menu";
import HomeIcon from "material-ui-icons/Home";
import { withRouter } from 'react-router-dom'

class Header extends Component {
    render() {
        const history = this.props.history;

        const styles = {
            root: {
                width: '100%',
            },
            flex: {
                flex: 1,
            },
            menuButton: {
                marginLeft: -12,
                marginRight: 20,
            },
        };

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="contrast" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>

                    <IconButton onClick={() => { history.push("/") }}>
                        <HomeIcon color="contrast"/>
                    </IconButton>

                    <Typography type="title" color="inherit">
                        Garrit Franke
                    </Typography>
                </Toolbar>
            </AppBar >
        );
    }


}

export default withRouter(Header);