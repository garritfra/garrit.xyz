import React, { Component } from "react";
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from "material-ui-icons/Menu";
import HomeIcon from "material-ui-icons/Home";
import Paper from 'material-ui/Paper';
import { withRouter } from 'react-router-dom'
import Grid from "material-ui/Grid/Grid";

class Info extends Component {
    render() {

        let img = new URL("https://scontent-frt3-2.xx.fbcdn.net/v/t1.0-9/20953090_1641167239286594_1135665268716135703_n.jpg?oh=bf74be88a6497e74df79a8abba9f0698&oe=5AE93C4B")

        const imgStyle = {
            //position: "left",
            width: "400px",
            height: "auto",
            margin: "10px"
        }
        const style = {
            margin: imgStyle.margin,
            "text-align": "left"
        }

        return (
            <div style={style}>
                <Grid container>
                    <Grid item xs>
                        <img src={img} style={imgStyle} />
                    </Grid>
                    <Grid item xs>
                        <h1>Hello World</h1>
                        <p>Semi-Professional Hobby Developer</p>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Info;