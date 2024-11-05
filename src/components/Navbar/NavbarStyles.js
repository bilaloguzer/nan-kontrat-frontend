// components/Navbar/styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../styles/theme';
export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 2rem 8rem;
  transition: background-color 0.3s ease;
  background-color: ${props => 
    props.isProjectsPage ? colors.surface.primary : 'transparent'};
`;
export const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: max-content; // Added max-width for larger screens
  margin: 0 auto;
  max-height: 3rem;
`;

export const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: ${props => 
    props.isProjectsPage ? colors.brand.main : 'white'};
  text-decoration: none;
  transition: color 0.3s ease;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const StyledNavLink = styled(Link)`
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 1.5rem;
  text-decoration: none;
  color: ${props => 
    props.isProjectsPage ? colors.text.body.primary : 'white'};
  transition: color 0.3s ease;
`;