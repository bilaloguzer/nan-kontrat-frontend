// hooks/useProjects.js
import { useState, useEffect } from 'react';

export const useProjects = ({ 
  page = 1, 
  pageSize = 25, 
  baseUrl = 'http://localhost:1337' 
} = {}) => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 25,
    pageCount: 1,
    total: 0,
  });

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(
        `${baseUrl}/api/projects?page=${page}&pageSize=${pageSize}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.data);
      setPagination(data.meta.pagination);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, pageSize, baseUrl]);

  return {
    projects,
    isLoading,
    error,
    pagination,
    refetch: fetchProjects,
  };
};

