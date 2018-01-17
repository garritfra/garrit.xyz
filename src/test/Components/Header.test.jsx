import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../components/Header';

describe('Header', () => {
  it('Should reder', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
  });
});
