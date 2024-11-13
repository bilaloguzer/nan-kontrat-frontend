import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft,ArrowRight } from "../../assets/icons";
import { X, } from "lucide-react";
import {
  DetailContainer,
  HeroSection,
  HeroImage,
  HeroOverlay,
  ContentSection,
  Title,
  Location,
  SummaryGrid,
  ContentBlock,
  SubTitle,
  CloseButton,
  GalleryButton,
  GalleryContent,
  GalleryImage,
  ImageGallery,
  SummaryCell,
  ImageGridSection,
  ImageGrid,
  GridImage,
  GalleryImageContainer,
  GalleryControls
} from "./ProjectDetailPageStyles";

const ProjectDetailPage = ({ project }) => {
  const navigate = useNavigate();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [galleryOpen]);

  if (!project) {
    return navigate("/projects");
  }

  // Collect all content images
  const getAllImages = () => {
    // Get content images from description
    const contentImages = project.description
      .filter((item) => item.type === "image")
      .map((item) => ({
        url: item.image.url,
        alt: item.text || "Project image",
      }));

    // Get project images
    const projectImages = project.projectImages
      ? project.projectImages.map((_, index) => ({
          url: project.getProjectImageUrl(index),
          alt: `Project image ${index + 1}`,
        }))
      : [];

    // Combine all images and remove duplicates
    const allImages = [...contentImages, ...projectImages];
    const uniqueImages = allImages.reduce((unique, item) => {
      // Check if this URL already exists in our unique array
      const exists = unique.some((img) => img.url === item.url);
      if (!exists) {
        unique.push(item);
      }
      return unique;
    }, []);

    return uniqueImages;
  };

  const allImages = getAllImages();

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (e) => {
    if (!galleryOpen) return;

    switch (e.key) {
      case "ArrowLeft":
        handlePrevImage();
        break;
      case "ArrowRight":
        handleNextImage();
        break;
      case "Escape":
        setGalleryOpen(false);
        break;
      default:
        break;
    }
  };
  console.log("IMAJ",allImages[currentImageIndex].url);
  return (
    <DetailContainer>
      <HeroSection>
        <HeroImage src={project.getMainImageUrl()} alt={project.title} />
        <HeroOverlay />
      </HeroSection>

      <ContentSection>
        <Title>{project.title}</Title>
        <Location>{project.summary}</Location>
        <SubTitle>Summary</SubTitle>
        <SummaryGrid>
          <SummaryCell>{project.location}</SummaryCell>
          <SummaryCell>
            {project.startDate.substring(0, 4) +
              "-" +
              project.finishDate.substring(0, 4) || "N/A"}
          </SummaryCell>
          <SummaryCell>Area</SummaryCell>
          <SummaryCell>{project.area || "N/A"}</SummaryCell>
          <SummaryCell>Client</SummaryCell>
          <SummaryCell>{project.client || "N/A"}</SummaryCell>
          <SummaryCell>Designer</SummaryCell>
          <SummaryCell>{project.designer || "N/A"}</SummaryCell>
        </SummaryGrid>

        {project.description.map((item, index) => (
          <ContentBlock key={index}>
            {(() => {
              switch (item.type) {
                case "image":
                  const imageUrl = item.image.url;
                  const imageIndex = allImages.findIndex(
                    (img) => img.url === imageUrl
                  );
                  return (
                    <div
                      className={item.type}
                      onClick={() => handleImageClick(imageIndex)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={item.image.url}
                        alt={item.text || "Project image"}
                      />
                    </div>
                  );

                default:
                  return item.children.map((child, childIndex) => (
                    <div className={item.type} key={childIndex}>
                      {child.text}
                    </div>
                  ));
              }
            })()}
          </ContentBlock>
        ))}
        <ImageGridSection>
          <SubTitle>Project Gallery</SubTitle>
          <ImageGrid>
            {allImages.map((image, index) => (
              <GridImage
                key={index}
                src={`${image.url}`}
                alt={image.alt}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </ImageGrid>
        </ImageGridSection>
      </ContentSection>

      {/* Gallery Modal */}
      {galleryOpen && (
  <ImageGallery onClick={() => setGalleryOpen(false)}>
    <GalleryContent onClick={(e) => e.stopPropagation()}>
      <GalleryImageContainer 
        currentImage={`${allImages[currentImageIndex].url}`}
      >
        <GalleryImage
          src={`${allImages[currentImageIndex].url}`}
          alt={allImages[currentImageIndex].alt}
        />
        
        {/* Desktop arrows */}
        <div className="desktop-controls">
          {allImages.length > 1 && (
            <>
              <GalleryButton className="prev" onClick={handlePrevImage}>
                <ArrowLeft />
              </GalleryButton>
              <GalleryButton className="next" onClick={handleNextImage}>
                <ArrowRight />
              </GalleryButton>
            </>
          )}
        </div>
      </GalleryImageContainer>

      {/* Mobile arrows */}
      {allImages.length > 1 && (
        <GalleryControls>
          <GalleryButton onClick={handlePrevImage}>
            <ArrowLeft />
          </GalleryButton>
          <GalleryButton onClick={handleNextImage}>
            <ArrowRight />
          </GalleryButton>
        </GalleryControls>
      )}

      <CloseButton onClick={() => setGalleryOpen(false)}>
        <X size={24} />
      </CloseButton>
    </GalleryContent>
  </ImageGallery>
)}
    </DetailContainer>
  );
};

export default ProjectDetailPage;
