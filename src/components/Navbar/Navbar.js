import React from "react";
import { useLocation } from "react-router-dom";
import {
  NavContainer,
  NavInner,
  Logo,
  NavLinks,
  StyledNavLink,
} from "./NavbarStyles";

const Navbar = () => {
  const location = useLocation();
  const isProjectsPage = location.pathname.includes("/projects");

  return (
    <NavContainer isProjectsPage={isProjectsPage}>
      <NavInner>
        <Logo to="/" isProjectsPage={isProjectsPage}>
          NAN
        </Logo>

        <NavLinks>
          <StyledNavLink
            to="/"
            active={location.pathname === "/"}
            isProjectsPage={isProjectsPage}
          >
            Home
          </StyledNavLink>
          <StyledNavLink
            to="/projects"
            active={location.pathname === "/projects"}
            isProjectsPage={isProjectsPage}
          >
            Projects
          </StyledNavLink>
          <StyledNavLink
            to="/about"
            active={location.pathname === "/about"}
            isProjectsPage={isProjectsPage}
          >
            About
          </StyledNavLink>
        </NavLinks>
      </NavInner>
    </NavContainer>
  );
};

export default Navbar;
