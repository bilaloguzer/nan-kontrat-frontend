import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "../../assets/icons";
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
  BackgroundImage,
  FullScreenImage,
  ImageCounter,
  ProjectContent,
  SummaryCell,
  SummaryGrid,
  ProjectDescription,
} from "./ProjectDetailPageStyles";
// components/ProjectDetailPage/index.js

const ProjectDetailPage = ({ project }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  if (!project) return <Navigate to="/projects" />;

  const handleCancel = () => navigate("/projects");

  const handleNextImage = () => {
    const totalImages = project.getTotalImages();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  const handlePreviousImage = () => {
    const totalImages = project.getTotalImages();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + totalImages) % totalImages
    );
  };

  const getCurrentImageUrl = () => {
    if (currentImageIndex === 0) {
      return project.getMainImageUrl();
    }
    return project.getProjectImageUrl(currentImageIndex - 1);
  };

  return (
    <PageContainer>
      <LeftSection>
        <BackgroundImage $imageUrl={getCurrentImageUrl()} />
        <MiniNavBar>
          <Logo to="/">NAN</Logo>
          <CancelIcon onClick={handleCancel}>×</CancelIcon>
        </MiniNavBar>

        <ImageCarousel>
          <CarouselImage
            src={getCurrentImageUrl()}
            alt={project.title}
            onClick={() => setIsFullScreen(true)}
          />
          <CarouselControls>
            <ImageCounter>
              {`${String(currentImageIndex + 1).padStart(2, "0")} / ${String(
                project.getTotalImages()
              ).padStart(2, "0")}`}
            </ImageCounter>
            <CarouselButtons>
              <CarouselButton onClick={handlePreviousImage}><ArrowLeft/></CarouselButton>
              <CarouselButton onClick={handleNextImage}><ArrowRight/></CarouselButton>
            </CarouselButtons>
          </CarouselControls>
        </ImageCarousel>
      </LeftSection>

      <RightSection>
        <ProjectTitle>{project.title}</ProjectTitle>
        <ProjectContent>{project.location}</ProjectContent>
        <ProjectContent>{`${project.startDate} - ${project.finishDate}`}</ProjectContent>
        <SummaryGrid>
          <SummaryCell>Client</SummaryCell>
          <SummaryCell>{project.client || "N/A"}</SummaryCell>
          <SummaryCell>Designer</SummaryCell>
          <SummaryCell>{project.designer || "N/A"}</SummaryCell>
        </SummaryGrid>
        <ProjectDescription>{project.summary}</ProjectDescription>
      </RightSection>

      {isFullScreen && (
        <FullScreenImage
          src={getCurrentImageUrl()}
          onClose={() => setIsFullScreen(false)}
          onPrev={handlePreviousImage}
          onNext={handleNextImage}
        />
      )}
    </PageContainer>
  );
};
export default ProjectDetailPage;
