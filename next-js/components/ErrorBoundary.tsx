import React, { Component, ErrorInfo } from 'react';
import PageError from '../pages/error';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  errorString: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorString: '' };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    this.setState({ hasError: true, errorString: _error.message });
    return { _errorInfo };
  }

  render() {
    const { errorString } = this.state;
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <PageError error={errorString} />;
    }

    return children;
  }
}

export default ErrorBoundary;
