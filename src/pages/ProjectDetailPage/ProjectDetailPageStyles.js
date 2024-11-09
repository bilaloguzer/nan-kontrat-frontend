import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';

// ProjectDetailPageStyles.js
// Update these specific styles while keeping others the same

export const PageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh; // Changed from min-height to height
  overflow: hidden; // Added to prevent scrolling
  background: white;
  position: fixed; // Added to ensure it stays fixed
  top: 0;
  left: 0;
`;

export const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

export const LeftSection = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.brand.main};
    opacity: 0.9;
    z-index: 2;
  }
`;


export const RightSection = styled.div`
  width: 50%;
  height: 100%; // Added explicit height
  padding: 2rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto; // Allow scrolling for content
  scrollbar-width: thin; // Nice scrollbar for Firefox
  scrollbar-color: ${theme.colors.brand.main} transparent;
  
  /* Webkit scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.brand.main};
    border-radius: 4px;
  }
`;

export const MiniNavBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  z-index: 10;
`;

export const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CarouselImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const CarouselControls = styled.div`
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  z-index: 4;
`;



export const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem; // Added gap for better spacing
  padding-right: 1rem; // Added to prevent content from touching scrollbar
`;

// Update the Summary section for better structure
export const Summary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem 0;
  margin-top: 1rem;
  border: 1px solid ${theme.colors.border};
  
  overflow: hidden; // Added to contain child borders
`;

export const SummaryCell = styled.div`
  padding: 1rem;
  min-height: fit-content; // Changed height to min-height: ;
  display: flex;
  align-items: center;
  border-top: 1px solid ${theme.colors.border.primary};

  &:nth-child(odd) {
    background: ${theme.colors.surface.primary};
    font-family: "Inter", sans-serif;
    font-weight: 500;
    border-right: 1px solid ${theme.colors.border.primary};
    border-left: 1px solid ${theme.colors.border.primary};

  }

  &:nth-child(even) {
    background: white;
    font-family: "Inter", sans-serif;
    font-weight: 300;
    border-right: 1px solid ${theme.colors.border.primary};

  }

  &:last-child,
  &:nth-last-child(2) {
    border-bottom: 1px solid ${theme.colors.border.primary};
  }
`;




export const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
`;

export const CancelIcon = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;



export const ProjectTitle = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
`;


export const SummaryTitle = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;


export const ProjectDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: ${theme.colors.text.secondary};
  margin: 48px 0;
`;




export const ImageCounter = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
`;

export const CarouselButtons = styled.div`
  display: flex;
  gap: 16px;
`;

export const CarouselButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

// Fullscreen styles remain mostly the same but with updated positioning and styling
export const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const FullScreenImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;
