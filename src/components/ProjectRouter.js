// components/ProjectRouter/index.js
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectDetailPage from '../pages/ProjectDetailPage/ProjectDetailPage';
import ProjectBlogPage from '../pages/ProjectBlogPage/ProjectBlogPage';

const ProjectRouter = () => {
  const { slug } = useParams();
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    console.log('Project not found for slug:', slug);
    return <Navigate to="/projects" />;
  }

  return project.blog ? 
    <ProjectBlogPage project={project} /> : 
    <ProjectDetailPage project={project} />;
};
export default ProjectRouter;