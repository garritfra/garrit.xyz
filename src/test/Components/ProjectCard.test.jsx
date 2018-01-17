import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';
import ProjectCard from '../../components/ProjectCard';

Enzyme.configure({ adapter: new Adapter() });

const div = document.createElement('div');
const state = {
  projects: [
    {
      name: 'Caesar Cipher',
      description: 'Decrypt a string with the Ceasar Cipher method!',
      path: '',
    },
    {
      name: 'Tic Tac Toe',
      description: "Plain ol' Tic Tac Toe",
      path: '',
    },
    {
      name: 'Another Sample',
      description: 'Lorem Ipsum',
      path: '',
    },
  ],
};

describe('ProjectCard', () => {
  it('renders without crashing', () => {
  const card = shallow(<ProjectCard project={state.projects[0]} />);
  });
});
