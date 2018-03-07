import React from 'react';
import ReactDOM from 'react-dom';
import BlockchainApp from './BlockchainApp';
import Adapter from 'enzyme-adapter-react-16/build/index';
import Enzyme from 'enzyme/build/index';
import {shallow} from "enzyme";


Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  shallow(<BlockchainApp />);
});
