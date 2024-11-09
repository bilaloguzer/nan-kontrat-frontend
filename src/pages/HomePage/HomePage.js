// pages/HomePage/HomePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Project from "../../models/ProjectModel";
import { ArrowLeft, ArrowRight } from "../../assets/icons";
import {
  PageContainer,
  HeroSection,
  SlideWrapper,
  ImageContainer,
  HeroImage,
  Overlay,
  MainContainer,
  Content,
  NavArea,
  TopContent,
  BottomContent,
  TextContent,
  Title,
  Location,
  NavigationDots,
  Dot,
  NavButton,
} from "./HomePageStyles";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
  }),
};

const HomePage = ({ projects, isLoading }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);
  const navigate = useNavigate();

  const projectInstances = projects?.map(project => new Project(project)) || [];
  const highlightedProjects = projectInstances.filter(project => project.highlight);
  const displayProjects = highlightedProjects.length > 0 ? highlightedProjects : projectInstances;

  useEffect(() => {
    let timer;
    if (!isLoading && displayProjects.length > 0) {
      timer = setInterval(() => {
        paginate(1);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [page, isLoading, displayProjects.length]);

  if (isLoading) {
    return (
      <PageContainer>
        <div>Loading...</div>
      </PageContainer>
    );
  }

  const currentIndex = ((page % displayProjects.length) + displayProjects.length) % displayProjects.length;
  const currentProject = displayProjects[currentIndex];

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.slug}`);
  };

  const paginate = (newDirection) => {
    if (isAnimating) return;
    setPage([page + newDirection, newDirection]);
  };

  return (
    <PageContainer>
      <HeroSection>
        <AnimatePresence initial={false} custom={direction}>
          <SlideWrapper
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <ImageContainer>
              <HeroImage
                src={currentProject.getMainImageUrl()}
                alt={currentProject.title}
                onError={(e) => {
                  console.error("Failed to load image:", e.target.src);
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
              <Overlay />
            </ImageContainer>

            <MainContainer>
              <NavArea side="left">
                <NavButton onClick={() => paginate(-1)} disabled={isAnimating}>
                  <ArrowLeft />
                </NavButton>
              </NavArea>

              <Content>
                <TopContent />
                <BottomContent>
                  <TextContent onClick={() => handleProjectClick(currentProject)}>
                    <Title>{currentProject.title}</Title>
                    <Location>{currentProject.location}</Location>
                  </TextContent>

                  <NavigationDots>
                    {displayProjects.map((_, index) => (
                      <Dot
                        key={index}
                        active={index === currentIndex}
                        onClick={() => {
                          if (isAnimating) return;
                          const newDirection = index - currentIndex;
                          setPage([index, Math.sign(newDirection)]);
                        }}
                      />
                    ))}
                  </NavigationDots>
                </BottomContent>
              </Content>

              <NavArea side="right">
                <NavButton onClick={() => paginate(1)} disabled={isAnimating}>
                  <ArrowRight />
                </NavButton>
              </NavArea>
            </MainContainer>
          </SlideWrapper>
        </AnimatePresence>
      </HeroSection>
      {/* Add other homepage content here */}
    </PageContainer>
  );
};

export default HomePage;