import React from "react";
import styled, { keyframes } from "styled-components";
import { LogoWhite } from "../../assets/logo";

// Matches the brand blue in logo-brand.svg and the app icon.
export const LOADER_BACKGROUND = "#1A46A5";

const pulse = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.97); }
  50%      { opacity: 1;    transform: scale(1); }
`;

const Screen = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${LOADER_BACKGROUND};
`;

const Mark = styled.div`
  width: clamp(120px, 24vw, 220px);
  animation: ${pulse} 1.6s ease-in-out infinite;

  svg {
    display: block;
    width: 100%;
    height: auto;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const LoadingScreen = () => (
  <Screen role="status" aria-label="Loading" aria-live="polite">
    <Mark>
      <LogoWhite aria-hidden="true" focusable="false" />
    </Mark>
  </Screen>
);

export default LoadingScreen;
