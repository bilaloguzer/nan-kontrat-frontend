// components/AboutPage/styles.js
import styled from "styled-components";
import theme from "../../styles/theme";

const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px'
};

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: white;
  scroll-behavior: smooth;
`;

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const HeroImage = styled.img`
  height: 50vh;
  width: 100%;
  object-fit: cover;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
`;

export const ContentSection = styled.div`
  display: flex;
  max-width: 75%;
  flex-direction: column;
  margin: 0 auto;
  padding: 6rem 2rem;
  gap: 5rem;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    max-width: 85%;
    padding: 4rem 2rem;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    max-width: 90%;
    padding: 3rem 1.5rem;
    gap: 3rem;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    max-width: 95%;
    padding: 2rem 1rem;
    gap: 2rem;
  }
`;

export const Title = styled.h1`
  font-family: "Poppins", sans-serif;
  font-size: 6rem;
  font-weight: 700;
  line-height: normal;
  margin: 0;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.colors.text.body.primary};

  @media (max-width: ${BREAKPOINTS.laptop}) {
    font-size: 5rem;
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
`;

export const AboutText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.5rem;
  margin: 0;
  font-weight: 300;
  line-height: 180%;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.text.body.secondary};

  @media (max-width: ${BREAKPOINTS.tablet}) {
    font-size: 1.25rem;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.125rem;
  }
`;

export const DescriptionText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1.25rem;
  margin: 0;
  font-weight: 200;
  line-height: 225%;
  letter-spacing: normal;
  color: ${(props) => props.theme.colors.text.body.primary};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1rem;
    line-height: 200%;
  }
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 4rem;

  @media (max-width: ${BREAKPOINTS.laptop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${BREAKPOINTS.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const ServiceCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: 0.5rem;
  }
`;

export const ServiceTitle = styled.h3`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.text.body.primary};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.25rem;
  }
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 2rem;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    gap: 1.5rem;
  }
`;

export const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: ${BREAKPOINTS.tablet}) {
    gap: 1.5rem;
  }
`;

export const SubTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.theme.colors.text.body.primary};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 1.25rem;
  }
`;

export const ContactText = styled.p`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  margin: 0;
  color: ${(props) => props.theme.colors.text.body.secondary};
  line-height: 1.5;

  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 0.875rem;
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: 0.75rem;
  }
`;

export const FormInput = styled.input`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.surface.secondary};
  border-radius: 4px;
  background: transparent;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.brand.main};
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 0.875rem;
    padding: 0.75rem;
  }
`;

export const FormTextArea = styled.textarea`
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.surface.secondary};
  border-radius: 4px;
  background: transparent;
  resize: vertical;
  min-height: 100px;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.brand.main};
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 0.875rem;
    padding: 0.75rem;
    min-height: 80px;
  }
`;

export const SendButton = styled.button`
  align-self: flex-end;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 2rem;
  background: ${(props) => props.theme.colors.surface.primary};
  color: black;
  border: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:disabled {
    background: ${props => props.theme.colors.surface.secondary};
  }
  &:hover {
    background: ${(props) => props.theme.colors.surface.secondary};
  }

  @media (max-width: ${BREAKPOINTS.mobile}) {
    font-size: 0.875rem;
    padding: 0.6rem 1.5rem;
    align-self: stretch; // Full width on mobile
  }
`;
export const ServiceImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  background-color: ${theme.colors.surface.primary};

  @media (max-width: ${BREAKPOINTS.mobile}) {
    aspect-ratio: 16/9;
  }
`;

export const ContactSection = styled.div`
  width: 100%;
  margin-top: 2rem;
  scroll-margin-top: 100px;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    margin-top: 1rem;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: ${BREAKPOINTS.mobile}) {
    gap: 0.25rem;
  }
`;
export const FormMessage = styled.div`
  padding: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  font-family: "Inter", sans-serif;
  font-size: 0.875rem;
  background-color: ${props => props.isError ? '#fee2e2' : '#dcfce7'};
  color: ${props => props.isError ? '#dc2626' : '#16a34a'};

  @media (max-width: ${ BREAKPOINTS.mobile}) {
    font-size: 0.75rem;
    padding: 0.5rem;
  }
`;