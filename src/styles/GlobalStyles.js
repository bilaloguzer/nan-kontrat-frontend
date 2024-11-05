// src/styles/globalStyles.js

import styled, { createGlobalStyle } from 'styled-components';
import { typography } from './typography';
import { colors, spacing } from './theme';

export const GlobalStyle = createGlobalStyle`
  
`;

export const Title = styled.h1`
  font-family: ${typography.fontFamily.headers};
  font-size: ${typography.fontSize.h1};
  line-height: ${typography.lineHeight.h1};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.body.primary};
  margin-bottom: ${spacing.lg};
`;

export const Subtitle = styled.h2`
  font-family: ${typography.fontFamily.headers};
  font-size: ${typography.fontSize.h2};
  line-height: ${typography.lineHeight.h2};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.text.body.secondary};
  margin-bottom: ${spacing.md};
`;

export const Paragraph = styled.p`
  font-family: ${typography.fontFamily.body};
  font-size: ${typography.fontSize.p};
  line-height: ${typography.lineHeight.p};
  font-weight: ${typography.fontWeight.normal};
  color: ${colors.text.body.primary};
  margin-bottom: ${spacing.md};
`;

export const BoldParagraph = styled(Paragraph)`
  font-weight: ${typography.fontWeight.bold};
`;

export const InvertedText = styled.span`
  color: ${colors.text.body.invert};
  background-color: ${colors.brand.main};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${spacing.xs};
`;

