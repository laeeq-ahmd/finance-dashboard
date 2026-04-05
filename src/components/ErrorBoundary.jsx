import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Dashboard Render Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 text-rose-600 bg-rose-50 dark:bg-rose-950/30 rounded-lg m-8">
                    <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
                    <p className="text-sm font-mono whitespace-pre-wrap">{this.state.error?.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}
