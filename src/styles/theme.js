// src/styles/theme.js

// Colors remain the same
export const colors = {
    brand: {
      main: '#0047AB',
      overlay: 'rgba(0, 61, 151, 0.95)'

    },
    text: {
      body: {
        primary: '#1B110E',
        secondary: '#30211A',
        invert: '#F5F5F5',
        brand: "#0047AB",
      }
    },
    surface: {
      primary: '#FFFDFC',
      secondary: '#EEEEEE'
    },
    button: {
      active: "#F5F5F5",
      unactive: "rgba(245, 245, 245, 0.5)",
    },
    border: {
      primary: "rgba(0, 0, 0, 0.1)",

    }
  };
  
  // Convert spacing to rem units for better scalability
  export const spacing = {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
    xxxl: '4rem',     // 64px
  };
  
  // A helper function to get multiples of the base unit (0.5rem or 8px)
  export const getSpacing = (multiple) => `${multiple * 0.5}rem`;
  
  // Define breakpoints for responsive design
  export const breakpoints = {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  };
  
  // Media query helper function
  export const media = {
    up: (breakpoint) => `@media (min-width: ${breakpoints[breakpoint]})`,
    down: (breakpoint) => `@media (max-width: ${breakpoints[breakpoint]})`,
    between: (breakpointMin, breakpointMax) =>
      `@media (min-width: ${breakpoints[breakpointMin]}) and (max-width: ${breakpoints[breakpointMax]})`,
  };
  
  // Responsive font sizes
  export const fontSizes = {
    small: 'clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)',
    base: 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
    large: 'clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)',
    xlarge: 'clamp(1.56rem, 1vw + 1.31rem, 2.11rem)',
    xxlarge: 'clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)',
  };
  
  export const theme = {
    colors,
    spacing,
    getSpacing,
    breakpoints,
    media,
    fontSizes,
  };
  
  export default theme;