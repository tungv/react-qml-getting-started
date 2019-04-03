import '@react-qml/cli/hot';

import { render } from 'react-qml';
import React from 'react';

import App from './App';
import ErrorBoundary from './ErrorBoundary';

export default root => {
  render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>,
    root
  );
  if (module.hot) {
    module.hot.accept('./App', () => {
      const NextApp = require('./App').default;
      render(
        <ErrorBoundary>
          <NextApp />
        </ErrorBoundary>,
        root
      );
    });
  }
};
