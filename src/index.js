import '@react-qml/cli/hot';
import { render } from 'react-qml';
import React from 'react';
import App from './App';

export default root => {
  render(<App />, root);
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(<NextApp />, root);
    });
  }
};
