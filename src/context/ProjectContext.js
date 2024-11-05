import React, { createContext, useContext, useState, useEffect } from 'react';
import Project from '../models/ProjectModel';

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/projects?populate=*');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        
        const data = await response.json();
        
        if (isMounted) {
          // Transform each project data into Project instance
          const transformedProjects = data.data
            .map(projectData => {
              try {
                return new Project(projectData);
              } catch (err) {
                console.error('Failed to create project:', err);
                return null;
              }
            })
            .filter(Boolean);
          
          setProjects(transformedProjects);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, loading, error }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};