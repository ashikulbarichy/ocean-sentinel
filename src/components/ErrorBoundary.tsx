import React from 'react';

// Enhanced Error Boundary Component with NASA-grade error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('React Error Boundary caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application error boundary caught:', error, errorInfo);
    // In production, this would send to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ocean-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
            <h2 className="text-xl font-bold text-red-600 mb-4">🛰️ NASA System Error</h2>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Error Type: {this.state.error?.name || 'Unknown Error'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-ocean-600 text-white px-4 py-2 rounded hover:bg-ocean-700 mr-2"
            >
              🔄 Restart Mission Control
            </button>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              🎯 Resume Mission
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
