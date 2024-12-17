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
  pointer-events: none;
`;

export const ImageContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
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
  pointer-events: none;
`;

export const MainContainer = styled.div`
  position: relative;
  height: 100%;
  pointer-events: none;
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

export const NavArea = styled.div`
  position: fixed;
  top: 0;
  ${(props) => (props.side === "left" ? "left: 0;" : "right: 0;")};
  width: 96px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  pointer-events: all;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    display: none;  // Hide arrows on mobile
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    width: 48px;
  }
`;

export const TopContent = styled.div`
  margin-bottom: auto;
  pointer-events: none;
`;

export const BottomContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  pointer-events: all;
  cursor: pointer;
  user-select: none;
  z-index: 10;

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
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.1;
  color: white;
  margin: 0;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    font-size: 3rem;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.8rem;  // Adjust font size for mobile
  }
`;

export const Location = styled.div`
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: white;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    font-size: 1rem;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 0.75rem;  // Adjust font size for mobile
  }
`;

export const NavigationDots = styled.div`
  position: absolute;
  bottom: 96px;
  right: 192px;
  display: flex;
  gap: 8px;
  z-index: 10;
  pointer-events: all;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    right: 96px;
    bottom: 64px;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    right: 48px;
    bottom: 48px;
    gap: 6px;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    right: 24px;
    bottom: 32px;
  }
`;

export const Dot = styled.div`
  width: ${(props) => (props.active ? "16px" : "8px")};
  height: 8px;
  border-radius: 25%;
  background-color: ${(props) =>
    props.active ? "white" : "rgba(255, 255, 255, 0.5)"};
  cursor: pointer;
  transition: all 0.3s ease;

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

  svg {
    width: 64px;
    height: 64px;

    @media (max-width: ${BREAKPOINTS.tablet}) {
      width: 32px;
      height: 32px;
    }

    @media (max-width: ${BREAKPOINTS.mobile}) {
      width: 24px;
      height: 24px;  // Smaller arrows for mobile
    }
  }
`;
