// components/Navbar.js
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 2rem 4rem;
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledNavLink = styled(Link)`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  position: relative;
  font-size: 0.875rem;
  text-decoration: none;
  color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.25rem;
    width: 100%;
    height: 2px;
    background-color: white;
    transform: scaleX(${props => props.active ? 1 : 0});
    transform-origin: left center;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <StyledNavLink to={to} active={active}>
      {children}
    </StyledNavLink>
  );
};

export const Navbar = () => {
  return (
    <NavContainer>
      <NavInner>
        <Logo to="/">
          NAN
        </Logo>

        <NavLinks>
          <NavLink to="/">
            Home
          </NavLink>
          <NavLink to="/projects">
            Projects
          </NavLink>
          <NavLink to="/about">
            About
          </NavLink>
        </NavLinks>
      </NavInner>
    </NavContainer>
  );
};

export default Navbar;