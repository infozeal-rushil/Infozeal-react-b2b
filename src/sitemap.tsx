// sitemap.tsx
import { RouteItems } from 'globals/components/routsdeclair/RouteInformation';
import { buildDynamicRoutes } from 'globals/components/permissionbuilder/RouteBuilder';
import { useEffect, useState } from 'react';
import { UilChartPie } from '@iconscout/react-unicons';

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
      setRoutes([]);
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

// Fallback static routes
export const staticRoutes: RouteItems[] = [
  {
    label: 'dashboard',
    icon: UilChartPie,
    pages: []
  }
];
