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
  GridImageWrapper,
  ImageCounter,
  NavArea,
} from "./ProjectDetailPageStyles";

const ProjectDetailPage = ({ project }) => {
  const navigate = useNavigate();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [imageOrientation, setImageOrientation] = useState(null);

  const checkImageOrientation = (imageUrl) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const isHorizontal = img.width > img.height;
        resolve(isHorizontal);
      };
      img.src = imageUrl;
    });
  };

  const bind = useGesture(
    {
      onDrag: ({ movement: [mx], direction: [xDir], distance, cancel }) => {
        if (distance > window.innerWidth * 0.15) {
          if (xDir < 0) {
            handleNextImage();
          } else {
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
  }, []);

  useEffect(() => {
    if (galleryOpen && allImages?.[currentImageIndex]) {
      checkImageOrientation(allImages[currentImageIndex].url)
        .then(isHorizontal => {
          setImageOrientation(isHorizontal);
          setScale(1);
        });
    }
  }, [currentImageIndex, galleryOpen]);

  if (!project) {
    return navigate("/projects");
  }

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

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      e.currentTarget.dataset.initialPinchDistance = distance;
      e.currentTarget.dataset.initialScale = scale;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch2.clientX - touch1.clientX,
        touch2.clientY - touch1.clientY
      );
      const initialDistance = parseFloat(e.currentTarget.dataset.initialPinchDistance);
      const initialScale = parseFloat(e.currentTarget.dataset.initialScale);
      
      if (initialDistance && initialScale) {
        const newScale = (distance / initialDistance) * initialScale;
        const maxScale = imageOrientation ? 3 : 4;
        setScale(Math.min(Math.max(1, newScale), maxScale));
      }
    }
  };

  const handleTouchEnd = () => {
    setScale(1);
  };

  const summaryFields = [
    { label: "", value: project.location },
    {
      label: "",
      value:
        project.startDate && project.finishDate
          ? `${project.startDate.substring(0, 4)}-${project.finishDate.substring(0, 4)}`
          : null,
    },
    { label: "Main Contractor", value: project.mainContractor },
    { label: "Area", value: project.area },
    { label: "Client", value: project.client },
    { label: "Designer", value: project.designer },
  ].filter((field) => field.value);

  const GridImageWithStates = ({ src, alt, onClick, ...props }) => {
    const [imageStatus, setImageStatus] = useState("loading");

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageStatus("loaded");
      img.onerror = () => setImageStatus("error");
    }, [src]);

    return (
      <GridImageWrapper>
        <GridImage
          src={imageStatus === "loaded" ? src : null}
          alt={alt}
          loading="eager"
          isLoaded={imageStatus === "loaded"}
          onClick={onClick}
          {...props}
        />
      </GridImageWrapper>
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
            <GalleryImageContainer
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              {...(isMobile ? bind() : {})}
            >
              <GalleryImage
                src={allImages[currentImageIndex].url}
                alt={allImages[currentImageIndex].alt}
                scale={scale}
                isHorizontal={imageOrientation}
              />

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