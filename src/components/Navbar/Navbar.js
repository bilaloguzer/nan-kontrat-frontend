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
  const [activeSection, setActiveSection] = useState(null);
  const [pressedSection, setPressedSection] = useState(null);
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      if (location.pathname === '/about') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const contactPosition = contactSection.getBoundingClientRect();

          // If there's a pressed section, only clear it when we reach the destination
          if (pressedSection) {
            if ((pressedSection === 'contact' && Math.abs(contactPosition.top) < 100) || 
                (pressedSection === 'about' && window.scrollY < 100)) {
              setPressedSection(null);
            }
            return;
          }

          // Determine active section based on contact section position
          if (contactPosition.top <= window.innerHeight / 2) {
            setActiveSection('contact');
          } else {
            setActiveSection('about');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, pressedSection]);

  // Handle initial section and hash changes
  useEffect(() => {
    if (location.pathname === '/about') {
      const initialSection = location.hash === '#contact' ? 'contact' : 'about';
      setActiveSection(initialSection);
      setPressedSection(initialSection);
    } else {
      setActiveSection(null);
      setPressedSection(null);
    }
  }, [location]);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

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
    if (path !== '/about') {
      return location.pathname === path;
    }

    if (location.pathname !== '/about') return false;

    // For About page sections
    if (hash === '#contact') {
      return pressedSection === 'contact' || (!pressedSection && activeSection === 'contact');
    } else {
      return pressedSection === 'about' || (!pressedSection && activeSection === 'about');
    }
  };

  const handleNavClick = (section) => {
    setPressedSection(section);
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
          active={isLinkActive('/about')}
          isProjectsPage={isProjectsPage}
          isScrolled={isScrolled}
          onClick={() => handleNavClick('about')}
        >
          About
        </LinkComponent>
        <LinkComponent
          to="/about#contact"
          active={isLinkActive('/about', '#contact')}
          isProjectsPage={isProjectsPage}
          isScrolled={isScrolled}
          onClick={() => handleNavClick('contact')}
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