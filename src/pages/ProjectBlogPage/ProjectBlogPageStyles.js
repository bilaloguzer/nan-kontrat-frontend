// components/ProjectBlogPage/styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../styles/theme';
export const BlogContainer = styled.div`
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
`;

export const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
`;

export const ContentSection = styled.div`
  max-width: 75%;
  margin: 0 auto;
  padding: 4rem 2rem;
  gap: 4rem;
`;

export const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-size: 8rem;
  font-weight: 700;
  color: ${props => props.theme.colors.text.body.primary};
`;

export const Location = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 2rem;
  font-weight: 300;
  color: ${props => props.theme.colors.text.body.secondary};
`;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  overflow: hidden; // Added to contain child borders
`;

export const SummaryCell = styled.div`
  padding: 1rem;
  min-height: 50px; // Changed height to min-height
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  
  &:nth-child(odd) {
    background: ${theme.colors.surface.primary};
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    border-right: 1px solid ${theme.colors.border};
  }

  &:nth-child(even) {
    background: white;
    font-family: 'Inter', sans-serif;
    font-weight: 300;
  }

  &:last-child, &:nth-last-child(2) {
    border-bottom: none;
  }
`;
export const ContentBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  &:nth-child(even) {
    direction: rtl;
  }
`;

export const TextContent = styled.div`
  direction: ltr;
  font-family: 'Inter', sans-serif;
  font-size: 1.125rem;
  line-height: 1.7;
  color: ${props => props.theme.colors.text.body.secondary};
`;

export const BlockImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
`;
