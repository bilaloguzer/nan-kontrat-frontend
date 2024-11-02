// components/ProjectHero.js
import styled from 'styled-components';
import getStrapiImageUrl from "../utils/imageHelper";
import { ArrowLeft, ArrowRight } from '../assets/icons';

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
`;

const ImageContainer = styled.div`
  position: absolute;
  inset: 0;
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

// Main content container with 96px padding
const MainContainer = styled.div`
  position: absolute;
  inset: 0;
  padding: 0 96px;
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

// Content area between nav areas
const Content = styled.div`
  position: absolute;
  left: 96px;
  right: 96px;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 48px; // Adjust as needed
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
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
  font-size: 14px;
  font-weight: 500;
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

const NavigationDots = styled.div`
  display: flex;
  gap: 8px;
  align-self: flex-end;
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
`;

const ProjectHero = ({ project }) => {
  if (!project) return null;

  const imageUrl = getStrapiImageUrl(project.mainImage?.url || project.mainImage);

  return (
    <HeroContainer>
      <ImageContainer>
        {imageUrl ? (
          <HeroImage
            src={imageUrl}
            alt={project.title}
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

      <MainContainer>
        <NavArea side="left">
          <NavButton>
            <ArrowLeft />
          </NavButton>
        </NavArea>

        <Content>
          <TopContent>
            {/* Space for navbar */}
          </TopContent>

          <BottomContent>
            <TextContent>
              <Title>{project.title}</Title>
              <Description>
                <p>{project.description[0]?.children[0]?.text}</p>
              </Description>
            </TextContent>

            <NavigationDots>
              <Dot active />
              <Dot />
              <Dot />
              <Dot />
            </NavigationDots>
          </BottomContent>
        </Content>

        <NavArea side="right">
          <NavButton>
            <ArrowRight />
          </NavButton>
        </NavArea>
      </MainContainer>
    </HeroContainer>
  );
};

export default ProjectHero;