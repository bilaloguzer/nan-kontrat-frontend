// pages/HomePage/HomePageStyles.js
import styled from "styled-components";
import { motion } from "framer-motion";

const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px'
};

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: black;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: black;
`;

export const SlideWrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

export const ImageContainer = styled.div`
  position: absolute;
  inset: 0;
`;

export const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
`;

export const MainContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
`;

export const Content = styled.div`
  position: absolute;
  left: 8rem;
  right: 8rem;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 96px;
  pointer-events: none;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    left: 96px;
    right: 96px;
    padding-bottom: 64px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    left: 48px;
    right: 48px;
    padding-bottom: 48px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    left: 24px;
    right: 24px;
    padding-bottom: 32px;
  }
`;

// Update the NavArea styled component
export const NavArea = styled.div`
  position: fixed; // Change from absolute to fixed
  top: 0;
  ${(props) => (props.side === "left" ? "left: 0;" : "right: 0;")};
  width: 96px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10; // Add z-index to ensure it stays above sliding content

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 48px;
  }
`;

export const TopContent = styled.div`
  margin-bottom: auto;
`;

export const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  pointer-events: auto;
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 96px;
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    font-size: 72px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 48px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 36px;
  }
`;

export const Location = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: white;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    font-size: 24px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 20px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 16px;
  }
`;
export const NavigationDots = styled.div`
  position: absolute;
  bottom: 96px;  // Matches Content's padding-bottom
  right: 192px;  // Matches Content's right spacing
  display: flex;
  gap: 8px;
  z-index: 2;
  pointer-events: auto;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    right: 96px;
    bottom: 64px;
    gap: 8px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    right: 48px;
    bottom: 48px;
    gap: 6px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    right: 24px;
    bottom: 32px;
    gap: 6px;
  }
`;
export const Dot = styled.div`
  width: ${(props) => (props.active ? "16px" : "8px")};
  height: 8px;
  border-radius: 25%;
  background-color: ${(props) =>
    props.active ? "white" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: ${(props) => (props.active ? "12px" : "6px")};
    height: 6px;
  }
`;

export const NavButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  color: white;
  pointer-events: auto;

  svg {
    width: 64px;
    height: 64px;

    @media (max-width: ${BREAKPOINTS.tablet}) {
      width: 32px;
      height: 32px;
    }
  }
`;