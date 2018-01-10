import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuItem from "material-ui/Menu/MenuItem";
import MenuIcon from "material-ui-icons/Menu"

class Header extends Component {
    render() {


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
                    <Typography type="title" color="inherit">
                        Garrit Franke
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }


}

export default Header