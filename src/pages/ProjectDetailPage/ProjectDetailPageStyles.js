import styled from "styled-components";
import { Link } from "react-router-dom";
import theme from "../../styles/theme";

// Add a breakpoints object for consistent media queries
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px'
};

export const DetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: white;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const HeroImage = styled.img`
  height: 50vh;
  width: 100%;
  object-fit: cover;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
`;

export const NavBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 1rem;
  }
`;

export const Logo = styled(Link)`
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

export const ContentSection = styled.div`
  max-width: 75%;
  margin: 0 auto;
  padding: 4rem 2rem;
  gap: 4rem;

  @media (max-width: ${breakpoints.laptop}) {
    max-width: 85%;
  }

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 90%;
    padding: 2rem 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 95%;
    padding: 1.5rem 1rem;
  }
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 6rem;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  color: ${(props) => props.theme.colors.text.body.primary};

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 5rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 4rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 3rem;
  }
`;

export const SubTitle = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.body.primary};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
  }
`;

export const Location = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  font-weight: 300;
  color: ${(props) => props.theme.colors.text.body.secondary};

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.25rem;
  }
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem 0;
  margin-top: 1rem;
  border: 1px solid ${theme.colors.border};
  overflow: hidden;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

// Update these components in ProjectDetailPageStyles.js
export const ImageGallery = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); // For Safari
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GalleryContent = styled.div`
  position: relative;
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const GalleryImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: -20px;
    background-color: transparent;
    background-size: cover;
    background-position: center;
    filter: blur(20px);
    opacity: 0.3;
    z-index: -1;
  }
`;


export const GalleryControls = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;

  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 0.5rem;
    gap: 1rem;
  }
`;

export const GalleryButton = styled.button`
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  svg {
    width: 64px;
    height: 64px;
  }

  @media (max-width: ${breakpoints.tablet}) {
    width: 36px;
    height: 36px;
  }


`;



export const GalleryImage = styled.img`
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 36px;
    height: 36px;
    top: 10px;
    right: 10px;
  }
`;

export const SummaryCell = styled.div`
  padding: 1rem;
  min-height: fit-content;
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

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.9rem;
    padding: 0.75rem;
  }
`;

export const ContentBlock = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${(props) => props.theme.colors.text.body.primary};
  
  div {
    margin: 2rem 0;
  }

  div.quote {
    margin: 2rem 20%;
    padding-left: 2rem;
    border-left: 2px solid #eee;
    font-size: 1.5rem;
    font-weight: 200;

    @media (max-width: ${breakpoints.tablet}) {
      margin: 2rem 10%;
      font-size: 1.25rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
      margin: 2rem 5%;
      font-size: 1.1rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  div.heading {
    font-size: 1.5rem;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.25rem;
    }
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1.1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TextContent = styled.div`
  direction: ltr;
  font-family: "Inter", sans-serif;
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${(props) => props.theme.colors.text.body.secondary};

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

export const BlockImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;

  @media (max-width: ${breakpoints.tablet}) {
    height: 300px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 200px;
  }
`;

export const ImageGridSection = styled.div`
  margin-top: 4rem;
`;

export const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const GridImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;
