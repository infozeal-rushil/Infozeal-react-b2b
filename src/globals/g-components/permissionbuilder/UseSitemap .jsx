import { useEffect, useState } from 'react';
import { staticRoutes } from '@src/sitemap';
import { buildDynamicRoutes } from './RouteBuilder';
export default function useSitemap() {
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchRoutes = () => {
    setIsLoading(true);
    setError(null);
    try {
      const dynamicRoutes = buildDynamicRoutes();
      setRoutes(dynamicRoutes);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load routes'));
      console.error('Route loading error:', err);
      setRoutes(staticRoutes); // Fallback to static routes
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchRoutes();
  }, []);
  return {
    routes,
    isLoading,
    error,
    refreshRoutes: fetchRoutes
  };
}
