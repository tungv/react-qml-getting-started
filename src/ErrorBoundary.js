import React from 'react';

import { RedBox } from 'react-qml';

// const PRODUCTION_MODE = process.env.NODE_ENV === 'production';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    console.log('componentDidCatch');
    console.log(error.message);
    console.log(error.stack);
    this.setState({
      hasError: true,
      error,
      errorInfo,
    });
  }

  render() {
    const { children } = this.props;
    const { hasError, error, errorInfo } = this.state;
    if (hasError && error && errorInfo) {
      // if (PRODUCTION_MODE) {
      //   return (
      //     <Rectangle {...fillWindow}>
      //       <ErrorDialogContainer />
      //     </Rectangle>
      //   );
      // }

      return <RedBox error={error} errorInfo={errorInfo} enableStacktrace />;
    }
    return children;
  }
}

export default ErrorBoundary;
