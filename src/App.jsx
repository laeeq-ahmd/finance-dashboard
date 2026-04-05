import { useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import useStore from './store/useStore';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  const { theme } = useStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Suppress innocuous ResizeObserver errors typically caused by charting libraries
    const handleResizeError = e => {
      if (e.message && e.message.includes('ResizeObserver')) {
        e.stopImmediatePropagation();
        const viteOverlay = document.querySelector('vite-error-overlay');
        if (viteOverlay) viteOverlay.remove();
      }
    };
    window.addEventListener('error', handleResizeError);
    return () => window.removeEventListener('error', handleResizeError);
  }, [theme]);

  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}

export default App;
