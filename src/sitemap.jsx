import { buildDynamicRoutes } from '@globals/g-components/permissionbuilder/RouteBuilder';
import { useEffect, useState } from 'react';
import { UilChartPie } from '@iconscout/react-unicons';
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
export const staticRoutes = [
  {
    label: 'dashboard',
    icon: UilChartPie,
    pages: []
  }
];
