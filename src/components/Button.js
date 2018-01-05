import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <div>
                <button>{this.props.name}</button>
            </div>
    );
    }
}


export default Button;