import React from 'react';
import { Alert } from 'react-native';

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallback, message } = this.props;

    if (error) {
      return fallback({ error });
    }

    return children;
  }
}
