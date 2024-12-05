import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "../../assets/icons";
import { useGesture } from "@use-gesture/react";
import { X } from "lucide-react";
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
  GalleryControls,
  ImageCounter,
  NavArea,
} from "./ProjectDetailPageStyles";

const ProjectDetailPage = ({ project }) => {
  const navigate = useNavigate();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], direction: [xDir], distance, cancel }) => {
        if (distance > window.innerWidth * 0.15) {
          // 15% of screen width threshold
          if (xDir < 0) {
            // Swipe left - next image
            handleNextImage();
          } else {
            // Swipe right - previous image
            handlePrevImage();
          }
          cancel();
        }
      },
    },
    {
      drag: {
        filterTaps: true,
        threshold: 10,
      },
    }
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [galleryOpen]);

  if (!project) {
    return navigate("/projects");
  }

  // Collect all content images
  const getAllImages = () => {
    const contentImages = project.description
      .filter((item) => item.type === "image")
      .map((item) => ({
        url: item.image.url,
        alt: item.text || "Project image",
      }));

    const projectImages = project.projectImages
      ? project.projectImages.map((_, index) => ({
          url: project.getProjectImageUrl(index),
          alt: `Project image ${index + 1}`,
        }))
      : [];

    const allImages = [...contentImages, ...projectImages];
    const uniqueImages = allImages.reduce((unique, item) => {
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
  const summaryFields = [
    { label: "", value: project.location },
    {
      label: "",
      value:
        project.startDate && project.finishDate
          ? `${project.startDate.substring(
              0,
              4
            )}-${project.finishDate.substring(0, 4)}`
          : null,
    },
    { label: "Main Contractor", value: project.mainContractor },
    { label: "Area", value: project.area },
    { label: "Client", value: project.client },
    { label: "Designer", value: project.designer },
  ].filter((field) => field.value);

  const GridImageWithStates = ({ src, alt, onClick, ...props }) => {
    const [imageStatus, setImageStatus] = useState("loading");

    const getImageSource = () => {
      switch (imageStatus) {
        case "loading":
        case "error":
          return null;
        case "loaded":
          return src;
        default:
          return null;
      }
    };

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageStatus("loaded");
      img.onerror = () => setImageStatus("error");
    }, [src]);

    return (
      <GridImage
        src={getImageSource()}
        alt={alt}
        loading="eager"
        isLoaded={imageStatus === "loaded"}
        onClick={onClick}
        {...props}
      />
    );
  };

  return (
    <DetailContainer>
      <HeroSection>
        <HeroImage src={project.getMainImageUrl()} alt={project.title} />
        <HeroOverlay />
      </HeroSection>
      <ContentSection>
        <Title>{project.title}</Title>
        <Location>{project.summary}</Location>
        {summaryFields.length > 0 && (
          <>
            <SubTitle>Summary</SubTitle>
            <SummaryGrid>
              {summaryFields.map(
                (field, index) =>
                  field.value && (
                    <React.Fragment key={index}>
                      {field.label && <SummaryCell>{field.label}</SummaryCell>}
                      <SummaryCell>{field.value}</SummaryCell>
                    </React.Fragment>
                  )
              )}
            </SummaryGrid>
          </>
        )}

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
              <GridImageWithStates
                key={index}
                src={image.url}
                alt={image.alt}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </ImageGrid>
        </ImageGridSection>
      </ContentSection>
      {galleryOpen && (
        <ImageGallery onClick={() => setGalleryOpen(false)} isMobile={isMobile}>
          <GalleryContent onClick={(e) => e.stopPropagation()}>
            <GalleryImageContainer {...(isMobile ? bind() : {})}>
              <GalleryImage
                src={allImages[currentImageIndex].url}
                alt={allImages[currentImageIndex].alt}
              />

              {/* Show side arrows for both mobile and desktop */}
              {allImages.length > 1 && (
                <>
                  <NavArea side="left">
                    <GalleryButton onClick={handlePrevImage}>
                      <ArrowLeft />
                    </GalleryButton>
                  </NavArea>

                  <NavArea side="right">
                    <GalleryButton onClick={handleNextImage}>
                      <ArrowRight />
                    </GalleryButton>
                  </NavArea>
                </>
              )}

              {/* Show counter for both mobile and desktop */}
              {allImages.length > 1 && (
                <ImageCounter>
                  {currentImageIndex + 1} / {allImages.length}
                </ImageCounter>
              )}
            </GalleryImageContainer>

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
