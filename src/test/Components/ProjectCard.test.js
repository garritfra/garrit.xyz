import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../App';
import ProjectCard from '../../components/ProjectCard';

const state = {
    projects: [
        {
            name: "Caesar Cipher",
            description: "Decrypt a string with the Ceasar Cipher method!",
            path: ""
        },
        {
            name: "Tic Tac Toe",
            description: "Plain ol' Tic Tac Toe",
            path: ""
        },
        {
            name: "Another Sample",
            description: "Lorem Ipsum",
            path: ""
        }
    ]
}

describe("ProjectCard", () => {
    it("renders without crashing", () => {
        const div = document.createElement('div');
        ReactDOM.render(<ProjectCard project={state.projects[0]} />, div)
    });
});