
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useCallback, useMemo } from 'react';
import ProjectFilters from '../../components/FilterComponent/projectsFilter';
import {
  PageContainer,
  ProjectGrid,
  ProjectCard,
  ProjectImage,
  ProjectInfo,
  ProjectTitle,
  ProjectLocation,
  FiltersContainer,
  
} from './ProjectsPageStyles';

const ProjectImageWithStates = ({ src, alt, onLoad, ...props }) => {
  const [imageStatus, setImageStatus] = useState('loading');

  const getImageSource = () => {
    switch (imageStatus) {
      case 'loading':
      case 'error':
        return null;
      case 'loaded':
        return src;
      default:
        return null;
    }
  };

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageStatus('loaded');
      onLoad?.();
    };
    img.onerror = () => setImageStatus('error');
  }, [src, onLoad]);

  return (
    <ProjectImage 
      src={getImageSource()}
      alt={alt}
      loading="eager"
      isLoaded={imageStatus === 'loaded'}
      {...props}
    />
  );
};

const SingleProjectCard = ({ project, onClick }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <ProjectCard onClick={onClick}>
      <ProjectImageWithStates 
        src={project.getMainImageUrl()} 
        alt={project.title || 'Project Image'}
        onLoad={() => setIsImageLoaded(true)}
      />
      <ProjectInfo isLoaded={isImageLoaded}>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectLocation>{project.location}</ProjectLocation>
      </ProjectInfo>
    </ProjectCard>
  );
};

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, loading, error } = useProjects();
  const [filters, setFilters] = useState({ projectState: null, workType: null });

  // Memoize the filter handler to prevent infinite updates
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  }, []); // Empty dependency array since we're using the function form of setState

  const filterProjects = useCallback((projectsList) => {
    return projectsList.filter(project => {
      if (!project.show) return false;
      
      if (filters.projectState && project.projectState !== filters.projectState) {
        return false;
      }
      
      if (filters.workType && !project.works.some(work => work.title === filters.workType)) {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  const visibleProjects = useMemo(() => {
    return filterProjects(projects);
  }, [projects, filterProjects]);

  if (loading) {
    return (
      <PageContainer>
        <ProjectFilters onFilterChange={handleFilterChange} initialFilters={filters} />
        <ProjectGrid>
          <ProjectGrid>
            {[...Array(6)].map((_, index) => (
              <ProjectCard key={index} loading />
            ))}
          </ProjectGrid>
        </ProjectGrid>
      </PageContainer>
    );
  }


  if (error) return (
    <PageContainer>
      <p>Error loading projects: {error.message}</p>
    </PageContainer>
  );


  return (
    <PageContainer>
      <FiltersContainer>
        <ProjectFilters onFilterChange={handleFilterChange} />
      </FiltersContainer>
      <ProjectGrid>
        {visibleProjects.map((project) => (
          <SingleProjectCard 
            key={project.id}
            project={project}
            onClick={() => navigate(`/projects/${project.slug}`)}
          />
        ))}
      </ProjectGrid>
    </PageContainer>
  );
};

export default ProjectsPage;