// components/Navbar/index.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LogoWhite, LogoBrand } from '../../assets/logo';
import {
  NavContainer,
  NavInner,
  Logo,
  NavLinks,
  MenuButton,
  Drawer,
  DrawerHeader,
  CloseButton,
  DrawerLinks,
  DrawerNavLink,
  Overlay,
  StyledNavLink,
} from './NavbarStyles';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const isLinkActive = (path, hash = '') => {
    if (hash) {
      return location.pathname === path && location.hash === hash;
    }
    return location.pathname === path;
  };

  const NavContent = ({ isMobile }) => {
    const LinkComponent = isMobile ? DrawerNavLink : StyledNavLink;

    return (
      <>
        <LinkComponent
          to="/"
          active={isLinkActive('/')}
          isProjectsPage={isProjectsPage}
          isScrolled={isScrolled}
        >
          Home
        </LinkComponent>
        <LinkComponent
          to="/projects"
          active={isLinkActive('/projects')}
          isProjectsPage={isProjectsPage}
          isScrolled={isScrolled}
        >
          Projects
        </LinkComponent>
        <LinkComponent
          to="/about"
          active={isLinkActive('/about', '#about') || isLinkActive('/about', '')}
          isProjectsPage={isProjectsPage}
          isScrolled={isScrolled}
        >
          About
        </LinkComponent>
        <LinkComponent
          to="/about#contact"
          active={isLinkActive('/about', '#contact')}
          isProjectsPage={isProjectsPage}
          isScrolled={isScrolled}
        >
          Contact
        </LinkComponent>
      </>
    );
  };

  return (
    <>
      <NavContainer isProjectsPage={isProjectsPage} isScrolled={isScrolled}>
        <NavInner>
          <Logo to="/">
            {!isScrolled && !isProjectsPage ? <LogoWhite /> : <LogoBrand />}
          </Logo>

          <NavLinks>
            <NavContent isMobile={false} />
          </NavLinks>

          <MenuButton
            onClick={() => setIsDrawerOpen(true)}
            isProjectsPage={isProjectsPage}
            isScrolled={isScrolled}
          >
            <Menu size={24} />
          </MenuButton>
        </NavInner>
      </NavContainer>

      <Drawer isOpen={isDrawerOpen}>
        <DrawerHeader>
          <Logo to="/">
            <LogoBrand />
          </Logo>
          <CloseButton onClick={() => setIsDrawerOpen(false)}>
            <X size={24} />
          </CloseButton>
        </DrawerHeader>
        <DrawerLinks>
          <NavContent isMobile={true} />
        </DrawerLinks>
      </Drawer>

      <Overlay isOpen={isDrawerOpen} onClick={() => setIsDrawerOpen(false)} />
    </>
  );
};

export default Navbar;