// components/ProjectBlogPage/index.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BlogContainer,
  HeroSection,
  HeroImage,
  HeroOverlay,
  NavBar,
  Logo,
  ContentSection,
  Title,
  Location,
  SummaryGrid,
  SummaryCell,
  ContentBlock,
  TextContent,
  BlockImage,
} from './ProjectBlogPageStyles';

const ProjectBlogPage = ({ project }) => {
  const navigate = useNavigate();

  if (!project) {
    return navigate('/projects');
  }

  const paragraphs = project.description.filter(desc => 
    desc.children?.some(child => child.text?.trim())
  );

  const images = [
    project.getMainImageUrl(),
    ...(project.projectImages?.map((_, i) => project.getProjectImageUrl(i)) || [])
  ].filter(Boolean);

  return (
    <BlogContainer>
      <HeroSection>
        <HeroImage src={project.getMainImageUrl()} alt={project.title} />
        <HeroOverlay />
        <NavBar>
          <Logo to="/">NAN</Logo>
        </NavBar>
      </HeroSection>

      <ContentSection>
        <Title>{project.title}</Title>
        <Location>{project.summary}</Location>

        <SummaryGrid>
          <SummaryCell>Location</SummaryCell>
          <SummaryCell>{project.location}</SummaryCell>
          <SummaryCell>Date</SummaryCell>
          <SummaryCell>{project.startDate} - {project.finishDate}</SummaryCell>
          <SummaryCell>Area</SummaryCell>
          <SummaryCell>1,668 m</SummaryCell>
          <SummaryCell>Design</SummaryCell>
          <SummaryCell>{project.designer || 'N/A'}</SummaryCell>
          <SummaryCell>Client</SummaryCell>
          <SummaryCell>{project.client || 'N/A'}</SummaryCell>
        </SummaryGrid>

        {paragraphs.map((paragraph, index) => {
          const imageIndex = Math.min(index, images.length - 1);
          const image = images[imageIndex];
          
          return (
            <ContentBlock key={index}>
              <TextContent>
                {paragraph.children.map((child, childIndex) => (
                  <p key={childIndex}>{child.text}</p>
                ))}
              </TextContent>
              {image && <BlockImage src={image} alt={`${project.title} - ${index + 1}`} />}
            </ContentBlock>
          );
        })}
      </ContentSection>
    </BlogContainer>
  );
};

export default ProjectBlogPage;