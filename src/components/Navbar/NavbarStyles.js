// components/Navbar/styles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../styles/theme';

const MOBILE_BREAKPOINT = '768px';

export const StyledNavLink = styled(Link)`
  position: relative;
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  text-decoration: none;
  font-weight: ${props => props.active ? '700' : '400'};
  color: ${props => {
    if (props.isScrolled || props.isProjectsPage) {
      return props.active ? colors.brand.main : colors.text.body.primary;
    }
    return colors.text.body.invert;
  }};
  transition: all 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${props => {
      if (props.isScrolled || props.isProjectsPage) {
        return colors.brand.main;
      }
      return colors.text.body.invert;
    }};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};
  transition: opacity 0.3s ease;
  z-index: 90;
`;

export const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 2rem 8rem;
  transition: all 0.3s ease;
  
  background-color: ${props => {
    if (props.isScrolled) return 'white';
    if (props.isProjectsPage) return colors.surface.primary;
    return 'transparent';
  }};
  
  box-shadow: ${props => 
    props.isScrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    padding: 1rem 2rem;
  }
`;

export const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-height: 3rem;
`;

export const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  svg {
    height: 3rem;
    width: auto;
    
    @media (max-width: ${MOBILE_BREAKPOINT}) {
      height: 2rem;
    }
  }
`;


export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: none;
  }
`;

export const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${props => {
    if (props.isScrolled) return colors.text.body.primary;
    if (props.isProjectsPage) return colors.text.body.primary;
    return 'white';
  }};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-100%'};
  width: 100%;
  max-width: 300px;
  height: 100vh;
  background: white;
  z-index: 100;
  padding: 2rem;
  transition: right 0.3s ease;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${colors.text.body.primary};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const DrawerLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DrawerNavLink = styled(StyledNavLink)`
  font-size: 1.5rem;
  color: ${colors.text.body.primary} !important; // Override parent styles
  
  &::after {
    background-color: ${colors.brand.main} !important; // Override parent styles
  }
  
  &.active {
    color: ${colors.brand.main} !important;
    font-weight: 700;
  }
`;