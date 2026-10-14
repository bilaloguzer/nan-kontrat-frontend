// components/ProjectRouter/index.js
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectDetailPage from '../pages/ProjectDetailPage/ProjectDetailPage';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import { useMinimumLoading } from '../hooks/useMinimumLoading';

const ProjectRouter = () => {
  const { slug } = useParams();
  const { projects, loading, error } = useProjects();
  const showLoader = useMinimumLoading(loading);

  if (showLoader) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  const project = projects.find(p => p.slug === slug);
  
  if (!project) {
    console.log('Project not found for slug:', slug);
    return <Navigate to="/projects" />;
  }

  return  <ProjectDetailPage project={project} /> ;
   
};
export default ProjectRouter;