import styled from 'styled-components';
import { Title, Paragraph } from '../../styles/GlobalStyles';
import theme from '../../styles/theme';

export const PageContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: ${theme.spacing.md};

  ${theme.media.up('md')} {
    padding: ${theme.spacing.xxl};
  }
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xxxl};

  ${theme.media.up('sm')} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xl};
  }

  ${theme.media.up('lg')} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xxl};
  }
`;

export const ProjectCard = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 2px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  ${theme.media.up('md')} {
    aspect-ratio: 16 / 9;
  }
`;

export const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProjectInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${theme.spacing.md};
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);

  ${theme.media.up('md')} {
    padding: ${theme.spacing.lg};
  }
`;

export const ProjectTitle = styled(Title)`
  color: ${theme.colors.text.body.invert};
  font-size: ${theme.fontSizes.large};
  line-height: 1.2;
  margin: 0 0 ${theme.spacing.xs} 0;

  ${theme.media.up('md')} {
    font-size: ${theme.fontSizes.xlarge};
  }
`;

export const ProjectLocation = styled(Paragraph)`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${theme.fontSizes.small};
  line-height: 1.2;
  margin: 0;

  ${theme.media.up('md')} {
    font-size: ${theme.fontSizes.base};
  }
`;