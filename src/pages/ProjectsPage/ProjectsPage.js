import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import {
  PageContainer,
  ProjectGrid,
  ProjectCard,
  ProjectImage,
  ProjectInfo,
  ProjectTitle,
  ProjectLocation
} from './ProjectsPageStyles';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();

  const handleProjectClick = (project) => {
    console.log('Clicking project:', project);
    navigate(`/projects/${project.slug}`);
  };

  if (loading) return (
    <PageContainer>
      <ProjectGrid>
        {[...Array(6)].map((_, index) => (
          <ProjectCard key={index} style={{ opacity: 0.5 }}>
            <div style={{ background: '#f0f0f0', aspectRatio: '4/3' }} />
            <ProjectInfo>
              <div style={{ height: '20px', background: '#f0f0f0', marginBottom: '8px' }} />
              <div style={{ height: '16px', background: '#f0f0f0', width: '60%' }} />
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

  // Filter projects to only show ones where show is true
  const visibleProjects = projects.filter(project => project.show === true);

  return (
    <PageContainer>
      <ProjectGrid>
        {visibleProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            onClick={() => handleProjectClick(project)}
          >
            <ProjectImage 
              src={project.getMainImageUrl()} 
              alt={project.title || 'Project Image'} 
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
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