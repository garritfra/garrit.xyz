import React from 'react';
import ReactDOM from 'react-dom';
import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = ReactDOM.createRoot('div');
  ReactDOM.render(<App />, div);
});

