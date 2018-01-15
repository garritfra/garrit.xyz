import React, { Component } from "react";
import P5Wrapper from 'react-p5-wrapper';
import p5 from "p5";
import sketch from "./sketch"

class PerlinNoise extends Component {


    

    render() {
        return (
            <div>
                <P5Wrapper sketch={sketch}/>
            </div>
        );
    }
}

export default PerlinNoise;