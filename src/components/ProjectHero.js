// components/ProjectHero.js
import { useState, useEffect , useCallback} from 'react';
import styled from 'styled-components';
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

const ProjectHero = ({ projects }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentIndex = ((page % projects.length) + projects.length) % projects.length;
  const currentProject = projects[currentIndex];

  const paginate = (newDirection) => {
    if (isAnimating) return;
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 3000);

    return () => clearInterval(timer);
  }, [page]);

  const imageUrl = getStrapiImageUrl(currentProject?.mainImage?.url || currentProject?.mainImage);

  return (
    <HeroContainer>
      {/* Fixed Navigation */}
      <MainContainer>
        <NavArea side="left">
          <NavButton onClick={() => paginate(-1)} disabled={isAnimating}>
            <ArrowLeft />
          </NavButton>
        </NavArea>

        <NavArea side="right">
          <NavButton onClick={() => paginate(1)} disabled={isAnimating}>
            <ArrowRight />
          </NavButton>
        </NavArea>

        <NavigationDots>
          {projects.map((_, index) => (
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
      </MainContainer>

      {/* Animated Content */}
      <SlideContainer>
        <AnimatePresence initial={false} custom={direction}>
          <Slide
            key={page}
            custom={direction}
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: direction < 0 ? "100%" : "-100%" }}
            transition={{
              x: { type: "tween", duration: 0.75, ease: "easeInOut" }
            }}
            onAnimationStart={() => setIsAnimating(true)}
            onAnimationComplete={() => setIsAnimating(false)}
          >
            <ImageContainer>
              {imageUrl ? (
                <HeroImage
                  src={imageUrl}
                  alt={currentProject.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    console.error('Failed to load image:', imageUrl);
                  }}
                />
              ) : (
                <ImageFallback>
                  <span>No image available</span>
                </ImageFallback>
              )}
              <Overlay />
            </ImageContainer>

            <Content>
              <TopContent />
              <BottomContent>
                <TextContent>
                  <Title>{currentProject.title}</Title>
                  <Location>{currentProject.location}</Location>
                </TextContent>
              </BottomContent>
            </Content>
          </Slide>
        </AnimatePresence>
      </SlideContainer>
    </HeroContainer>
  );
};



export default ProjectHero;