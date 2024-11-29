import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import {
  PageContainer,
  ProjectGrid,
  ProjectCard,
  ProjectImage,
  ProjectInfo,
  ProjectTitle,
  ProjectLocation,
  PlaceholderImage
} from './ProjectsPageStyles';

const ProjectImageWithStates = ({ src, alt, ...props }) => {
  const [imageStatus, setImageStatus] = useState('loading');

  const getImageSource = () => {
    switch (imageStatus) {
      case 'loading':
        return '/loading-placeholder.jpg';
      case 'error':
        return '/error-placeholder.jpg';
      case 'loaded':
        return src;
      default:
        return '/loading-placeholder.jpg';
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageStatus('loaded');
    img.onerror = () => setImageStatus('error');
  }, [src]);

  return (
    <ProjectImage 
      src={getImageSource()}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.slug}`);
  };

  if (loading) return (
    <PageContainer>
      <ProjectGrid>
        {[...Array(6)].map((_, index) => (
          <ProjectCard key={index} loading>
            <PlaceholderImage />
            <ProjectInfo>
              <ProjectTitle>
                <PlaceholderImage style={{ height: '24px', width: '70%', marginBottom: '8px' }} />
              </ProjectTitle>
              <ProjectLocation>
                <PlaceholderImage style={{ height: '16px', width: '40%' }} />
              </ProjectLocation>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </PageContainer>
  );

  if (error) return (
    <PageContainer>
      <p>Error loading projects: {error.message}</p>
    </PageContainer>
  );

  const visibleProjects = projects.filter(project => project.show === true);

  return (
    <PageContainer>
      <ProjectGrid>
        {visibleProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            onClick={() => handleProjectClick(project)}
          >
            <ProjectImageWithStates 
              src={project.getMainImageUrl()} 
              alt={project.title || 'Project Image'} 
            />
            <ProjectInfo>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectLocation>{project.location}</ProjectLocation>
            </ProjectInfo>
          </ProjectCard>
        ))}
      </ProjectGrid>
    </PageContainer>
  );
};

export default ProjectsPage;