import { useEffect, useState } from 'react';
import { staticRoutes } from 'sitemap';
import { RouteItems } from '../routsdeclair/RouteInformation';
import { buildDynamicRoutes } from './RouteBuilder';

export default function useSitemap(): {
  routes: RouteItems[];
  isLoading: boolean;
  error: Error | null;
  refreshRoutes: () => Promise<void>;
} {
  const [routes, setRoutes] = useState<RouteItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoutes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dynamicRoutes = await buildDynamicRoutes();
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
