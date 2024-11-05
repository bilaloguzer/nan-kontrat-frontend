import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import { useNavigate, } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Paragraph } from '../../styles/GlobalStyles';
import {
  PageContainer,
  LeftSection,
  RightSection,
  MiniNavBar,
  Logo,
  CancelIcon,
  ImageCarousel,
  CarouselImage,
  CarouselButtons,
  CarouselButton,
  ProjectTitle,
  
    CarouselControls,
    FullScreenContainer,
    BackgroundImage,
    FullScreenImage,
    ImageCounter,
    ProjectContent,
    Summary,SummaryCell,SummaryGrid,SummaryTitle,
    
    ProjectDescription,
} from "./ProjectDetailPageStyles";
// components/ProjectDetailPage/index.js

const ProjectDetailPage = () => {
    const { slug } = useParams(); // Change from projectId to slug
    const navigate = useNavigate();
    const { projects, loading, error } = useProjects();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    if (loading) return <Paragraph>Loading...</Paragraph>;
    if (error) return <Paragraph>Error: {error.message}</Paragraph>;
  
    // Find project by slug instead of ID
    const project = projects.find((p) => p.slug === slug);
    console.log('Found project:', project);
  
    if (!project) {
      console.log('Project not found for slug:', slug);
      return <Navigate to="/projects" />;
    }
  
    const handleCancel = () => navigate('/projects');
  
    const handleNextImage = () => {
      const totalImages = project.getTotalImages();
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    };
  
    const handlePreviousImage = () => {
      const totalImages = project.getTotalImages();
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };
  
    const getCurrentImageUrl = () => {
      if (currentImageIndex === 0) {
        return project.getMainImageUrl();
      } else {
        return project.getProjectImageUrl(currentImageIndex - 1);
      }
    };
  
    const currentImageUrl = getCurrentImageUrl();
    console.log('Current image URL:', currentImageUrl);
  
    return (
      <PageContainer>
        <LeftSection>
          <BackgroundImage $imageUrl={currentImageUrl} />
          <MiniNavBar>
            <Logo to="/">NAN</Logo>
            <CancelIcon onClick={handleCancel}>×</CancelIcon>
          </MiniNavBar>
          
          <ImageCarousel>
            <CarouselImage 
              src={currentImageUrl} 
              alt={`Project Image ${currentImageIndex + 1}`}
              onError={(e) => {
                console.error('Image failed to load:', e.target.src);
                e.target.src = '/placeholder-image.jpg';
              }}
            />
            {project.getTotalImages() > 1 && (
              <CarouselControls>
                <ImageCounter>
                  {`${String(currentImageIndex + 1).padStart(2, '0')} / ${String(project.getTotalImages()).padStart(2, '0')}`}
                </ImageCounter>
                <CarouselButtons>
                  <CarouselButton onClick={handlePreviousImage}>←</CarouselButton>
                  <CarouselButton onClick={handleNextImage}>→</CarouselButton>
                </CarouselButtons>
              </CarouselControls>
            )}
          </ImageCarousel>
        </LeftSection>
  
        <RightSection>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectContent>{project.location}</ProjectContent>
          <ProjectContent>{`${project.startDate} - ${project.finishDate}`}</ProjectContent>
          <SummaryGrid>
            <SummaryCell>Client</SummaryCell>
            <SummaryCell>{project.client}</SummaryCell>
            <SummaryCell>Designer</SummaryCell>
            <SummaryCell>{project.designer}</SummaryCell>
          </SummaryGrid>
          <ProjectDescription>{project.descriptionText}</ProjectDescription>
        </RightSection>
      </PageContainer>
    );
  };

  export default  ProjectDetailPage;
  
