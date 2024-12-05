import React from "react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import emailjs from "@emailjs/browser";
import {
  PageContainer,
  HeroSection,
  HeroImage,
  HeroOverlay,
  ContentSection,
  Title,
  ServicesGrid,
  ServiceCard,
  ServiceImage,
  ServiceTitle,
  ContactSection,
  ContactGrid,
  InfoColumn,
  FormColumn,
  SubTitle,
  ContactText,
  ContactForm,
  FormInput,
  FormTextArea,
  SendButton,
  InfoBlock,
  FormMessage,
  SocialMediaLinks,
  SocialMediaSection,
  ContentBlock
} from "./AboutPageStyles";

const AboutPage = ({ nan, works }) => {
  const heroImageSrc = nan?.getNanImagesUrl("original");
  const formRef = useRef(null);
  const contactRef = useRef(null);

  const location = useLocation();
  const [formStatus, setFormStatus] = useState({
    message: "",
    isError: false,
    sending: false,
  });

  useEffect(() => {
    if (location.hash === "#contact") {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } else if (location.hash === "#about" || location.hash === "") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ message: "", isError: false, sending: true });

    try {
      const result = await emailjs.sendForm(
        "service_q38lojc",
        "template_njy4u5o",
        formRef.current,
        "8orGvJGKVXnkERw1q"
      );

      if (result.text === "OK") {
        setFormStatus({
          message: "Message sent successfully!",
          isError: false,
          sending: false,
        });
        formRef.current.reset();
      }
    } catch (error) {
      console.log("FAILED...", error);
      setFormStatus({
        message: "Failed to send message. Please try again.",
        isError: true,
        sending: false,
      });
    }
  };

  return (
    <PageContainer>
      <HeroSection>
        <HeroImage src={heroImageSrc} alt="About NAN" />
        <HeroOverlay />
      </HeroSection>

      <ContentSection>
        <Title>About</Title>
        {nan?.about?.map((block, index) => (
          <ContentBlock key={index}>
            <div className={block.type}>
              {block.children?.[0]?.text}
            </div>
          </ContentBlock>
        ))}

        <ServicesGrid>
          {works?.map((work, index) => (
            <ServiceCard key={work.id || index}>
              <ServiceImage src={work.getWorksImagesUrl("original")} />
              <ServiceTitle>{work.title}</ServiceTitle>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <ContactSection ref={contactRef} id="contact">
          <Title>Contact</Title>
          <ContactGrid>
            <InfoColumn>
              <SubTitle>Info</SubTitle>

              <InfoBlock>
                <SubTitle>Phone</SubTitle>
                <ContactText>{nan?.phoneNumber}</ContactText>
              </InfoBlock>

              <InfoBlock>
                <SubTitle>Email</SubTitle>
                <ContactText>
                  <a href={`mailto:${nan?.companyEmail}`}>{nan?.companyEmail}</a>
                </ContactText>
              </InfoBlock>

              <InfoBlock>
                <SubTitle>Office Address</SubTitle>
                <ContactText>{nan?.officeAdress}</ContactText>
              </InfoBlock>

              <InfoBlock>
                <SubTitle>Factory Address</SubTitle>
                <ContactText>{nan?.factoryAdress}</ContactText>
              </InfoBlock>
            </InfoColumn>

            <FormColumn>
              <SubTitle>Get Information</SubTitle>
              <ContactForm ref={formRef} onSubmit={handleSubmit}>
                <FormInput
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  required
                />
                <FormInput
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  required
                />
                <FormInput
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                <FormTextArea
                  name="message"
                  placeholder="Your messages"
                  rows={6}
                  required
                />
                {formStatus.message && (
                  <FormMessage isError={formStatus.isError}>
                    {formStatus.message}
                  </FormMessage>
                )}
                <SendButton type="submit" disabled={formStatus.sending}>
                  {formStatus.sending ? "Sending..." : "Send"}
                </SendButton>
              </ContactForm>
            </FormColumn>
          </ContactGrid>
          <SocialMediaSection>
            <SubTitle>Follow Us</SubTitle>
            <SocialMediaLinks>
              <a
                href={nan?.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={24} />
              </a>
              <a
                href={nan?.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </a>
              <a
                href={nan?.xUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={24} />
              </a>
            </SocialMediaLinks>
          </SocialMediaSection>
        </ContactSection>
      </ContentSection>
    </PageContainer>
  );
};

export default AboutPage;