import React from 'react';
import ReactDOM from 'react-dom';
import BlockchainApp from './BlockchainApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BlockchainApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
