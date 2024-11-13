import { useState, useEffect } from 'react';
import Project from '../models/ProjectModel';
// hooks/useProjects.js
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {

  // Add this to your useProjects hook

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://145.223.116.223:1337/api/projects?populate=*');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        console.log('Raw API response:', data);
        
        
        // Transform and validate data
        const transformedProjects = data.data
          .filter(projectData => projectData && projectData.id)
          .map(projectData => {
            try {
              return new Project(projectData);
            } catch (e) {
              console.error('Failed to create project:', e);
              return null;
            }
          })
          .filter(Boolean); // Remove any null projects
        
        setProjects(transformedProjects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
