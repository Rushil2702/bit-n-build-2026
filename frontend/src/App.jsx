import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Shell from './components/layout/Shell';
import OverviewPage from './pages/OverviewPage';
import MyTasksPage from './pages/MyTasksPage';
import EventsPage from './pages/EventsPage';
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  // Read initial route from URL hash (e.g. #tasks, #events) or default to 'overview'
  const getInitialRoute = () => {
    const hash = window.location.hash.replace('#', '').trim();
    return hash || 'overview';
  };

  const [currentRoute, setCurrentRoute] = useState(getInitialRoute);

  // Sync state with browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      setCurrentRoute(hash || 'overview');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (routeId) => {
    window.location.hash = routeId;
    setCurrentRoute(routeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ThemeProvider>
      <Shell currentRoute={currentRoute} onNavigate={handleNavigate}>
        {currentRoute === 'overview' ? (
          <OverviewPage onNavigate={handleNavigate} />
        ) : currentRoute === 'tasks' ? (
          <MyTasksPage />
        ) : currentRoute === 'events' ? (
          <EventsPage onNavigate={handleNavigate} />
        ) : (
          <PlaceholderPage routeId={currentRoute} onNavigate={handleNavigate} />
        )}
      </Shell>
    </ThemeProvider>
  );
}
