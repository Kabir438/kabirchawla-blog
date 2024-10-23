import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  forceError?: boolean;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo): void {
    // You can use your own error logging service here
    console.error({ error, errorInfo });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError || this.props.forceError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
