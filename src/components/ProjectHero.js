// components/ProjectHero.js
import { useState, useEffect , useCallback} from 'react';
import styled from 'styled-components';
import { useProjects } from '../hooks/useProjects';
import { motion, AnimatePresence } from 'framer-motion';
import getStrapiImageUrl from "../utils/imageHelper";
import { ArrowLeft, ArrowRight } from '../assets/icons';


const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 1  // Changed from 0 to 1
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 1  // Changed from 0 to 1
  })
};

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: black;
`;

const SlideContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
`;

// Update other styles as needed
const ImageContainer = styled.div`
  position: absolute;
  inset: 0;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  position: absolute;
  left: 192px;
  right: 192px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 96px;
  pointer-events: none;
`;

const MainContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
`;

const SlideWrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

const NavigationDots = styled.div`
  position: absolute;
  bottom: 96px;
  right: 192px;
  display: flex;
  gap: 8px;
  z-index: 2;
`;






const ImageFallback = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  
  span {
    color: #9ca3af;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
`;


// Side navigation areas (96px width each)
const NavArea = styled.div`
  position: absolute;
  top: 0;
  ${props => props.side === 'left' ? 'left: 0;' : 'right: 0;'};
  width: 96px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const TopContent = styled.div`
  margin-bottom: auto;
`;

const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 96px;
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin: 0;
`;

const Location = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: white;
`;

const Description = styled.div`
  max-width: 42rem;
  
  p {
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-weight: 300;
    line-height: 1.5;
    color: white;
    opacity: 0.9;
    margin: 0;
  }
`;


const Dot = styled.div`
  width:  ${props => props.active ? '16px' : '8px'};
  height: 8px;
  border-radius: 25%;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: white;

  svg {
    width: 64px;
    height: 64px;
  }
`
const ProjectHero = () => {
  const { projects, loading } = useProjects();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  // Move hooks before any conditional returns
  useEffect(() => {
    let timer;
    if (!loading && projects.length > 0) {
      timer = setInterval(() => {
        paginate(1);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [page, loading, projects.length]);

  if (loading) return null;

  const highlightedProjects = projects.filter(p => p.highlight);
  if (highlightedProjects.length === 0) return null;

  const currentIndex = ((page % highlightedProjects.length) + highlightedProjects.length) % highlightedProjects.length;
  const currentProject = highlightedProjects[currentIndex];

  const paginate = (newDirection) => {
    if (isAnimating) return;
    setPage([page + newDirection, newDirection]);
  };

  return (
    <HeroContainer>
      <AnimatePresence initial={false} custom={direction}>
        <SlideWrapper
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationStart={() => setIsAnimating(true)}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <ImageContainer>
            <HeroImage
              src={currentProject.getMainImageUrl()}
              alt={currentProject.title}
              onError={(e) => {
                console.error('Failed to load image:', e.target.src);
                e.target.src = '/placeholder-image.jpg';
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
                <TextContent>
                  <Title>{currentProject.title}</Title>
                  <Location>{currentProject.location}</Location>
                </TextContent>

                <NavigationDots>
                  {highlightedProjects.map((_, index) => (
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
    </HeroContainer>
  );
};

export default ProjectHero;