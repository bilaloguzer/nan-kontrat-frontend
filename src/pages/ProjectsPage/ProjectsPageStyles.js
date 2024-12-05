import styled from "styled-components";
import { Title, Paragraph } from "../../styles/GlobalStyles";
import theme, { breakpoints } from "../../styles/theme";

export const PageContainer = styled.div`
  max-width: 100%;
  margin: 80px auto 0; // Add top margin to account for navbar
  padding: ${theme.spacing.md};

  ${theme.media.up("md")} {
    padding: ${theme.spacing.xxl};
  }
`;
export const FiltersContainer = styled.div`
  position: sticky;
  top: 80px; // Adjust this value based on your navbar height
  z-index: 10;
  background-color: ${theme.colors.surface.primary};
  padding: ${theme.spacing.md} 0;
  margin-bottom: ${theme.spacing.md};
`;
export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};

  ${theme.media.up("sm")} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xl};
  }

  ${theme.media.up("lg")} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.xxl};
  }
`;
export const ProjectCard = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 2px;
  cursor: ${(props) => (props.loading ? "default" : "pointer")};
  transition: transform 0.3s ease;
  background-color: ${theme.colors.surface.secondary};

  &:hover {
    transform: ${(props) => (props.loading ? "none" : "scale(1.05)")};
  }

  ${theme.media.up("md")} {
    aspect-ratio: 16 / 9;
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

export const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.spacing.md};
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  opacity: ${(props) => (props.isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease;

  ${theme.media.up("md")} {
    padding: ${theme.spacing.lg};
  }
`;

export const ProjectTitle = styled(Title)`
  color: ${theme.colors.text.body.invert};
  font-size: 1.5rem;
  line-height: 1.2;
  margin: 0 0 ${theme.spacing.xs} 0;

  @media (max-width: ${breakpoints.laptop}) {
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 0.75rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.5rem;
  }
`;

export const ProjectLocation = styled(Paragraph)`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${theme.fontSizes.small};
  line-height: 1.2;
  margin: 0;

  ${theme.media.up("md")} {
    font-size: ${theme.fontSizes.base};
  }
`;
