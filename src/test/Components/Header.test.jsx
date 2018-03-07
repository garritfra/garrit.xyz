import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import createBrowserHistory from 'history/createBrowserHistory';
import Header from '../../components/Header';

Enzyme.configure({ adapter: new Adapter() });


describe('Header', () => {
  it('Should reder', () => {
    const div = ReactDOM.createElement('div');
    ReactDOM.render(<Header />, div);
  });
});

describe('Home Button', () => {
  it('is clickable', () => {
    const history = createBrowserHistory();
    const header = shallow(<Header history={history} />);
    header.find('.home').simulate('click');
  });
});
[].map()
describe('Projects Button', () => {
  it('is clickable', () => {
    const history = createBrowserHistory();
    const header = shallow(<Header history={history} />);
    header.find('.projects').simulate('click');
  });
});
