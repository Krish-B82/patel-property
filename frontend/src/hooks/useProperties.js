import { useEffect, useState } from 'react';
import { fetchProperties } from '../services/propertyApi';

export function useProperties(initialFilters = {}) {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 6,
    ...initialFilters
  });
  const [result, setResult] = useState({ properties: [], totalPages: 1, totalProperties: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isActive = true;
    async function load() {
      setLoading(true);
      const response = await fetchProperties(filters);
      if (isActive) {
        setResult(response);
        setLoading(false);
      }
    }
    load();
    return () => {
      isActive = false;
    };
  }, [filters]);

  return { filters, setFilters, result, loading };
}
