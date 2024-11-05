import { css } from 'styled-components';

const typography = {
  fontFamily: {
    headers: 'Poppins, sans-serif', 
    body: '"Open Sans", sans-serif',
  },
  fontWeight: {
    normal: 400,
    bold: 700,
  },
  fontSize: {
    h1: '90px',
    h2: '64px',
    h3: '50px',
    h4: '36px',
    h5: '28px',
    p: '16px',
    pBold: '16px',
  },
  lineHeight: {
    h1: '100px',
    h2: '115px',
    h3: '115px',
    h4: '100px',
    h5: '100px',
    p: '150px',
    pBold: '160px',
  },
};

const createTypographyStyles = () => css`
  h1, h2, h3, h4, h5 {
    font-family: ${typography.fontFamily.headers};
    font-weight: ${typography.fontWeight.bold};
  }

  h1 {
    font-size: ${typography.fontSize.h1};
    line-height: ${typography.lineHeight.h1};
  }

  h2 {
    font-size: ${typography.fontSize.h2};
    line-height: ${typography.lineHeight.h2};
  }

  h3 {
    font-size: ${typography.fontSize.h3};
    line-height: ${typography.lineHeight.h3};
  }

  h4 {
    font-size: ${typography.fontSize.h4};
    line-height: ${typography.lineHeight.h4};
  }

  h5 {
    font-size: ${typography.fontSize.h5};
    line-height: ${typography.lineHeight.h5};
  }

  p {
    font-family: ${typography.fontFamily.body};
    font-size: ${typography.fontSize.p};
    line-height: ${typography.lineHeight.p};
    font-weight: ${typography.fontWeight.normal};
  }

  .p-bold {
    font-family: ${typography.fontFamily.body};
    font-size: ${typography.fontSize.pBold};
    line-height: ${typography.lineHeight.pBold};
    font-weight: ${typography.fontWeight.bold};
  }
`;

export { typography, createTypographyStyles };