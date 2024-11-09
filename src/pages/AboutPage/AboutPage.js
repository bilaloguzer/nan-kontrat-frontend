// components/AboutPage/index.js
import React from "react";
import { useEffect, useRef,useState } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser'; // Change this import
import {
  PageContainer,
  HeroSection,
  HeroImage,
  HeroOverlay,
  ContentSection,
  Title,
  AboutText,
  ServicesGrid,
  ServiceCard,
  ServiceImage,
  ServiceTitle,
  DescriptionText,
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
  FormMessage
} from "./AboutPageStyles";

const AboutPage = ({ nan, works }) => {
  const heroImageSrc = nan.getNanImagesUrl("original");
  const formRef = useRef(null);
  const contactRef = useRef(null);

  const location = useLocation();
  const [formStatus, setFormStatus] = useState({
    message: '',
    isError: false,
    sending: false
  });


  useEffect(() => {
    // Check if the URL has #contact
    if (location.hash === '#contact') {
      setTimeout(() => {
        contactRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100); // Small delay to ensure everything is rendered
    }
    else if (location.hash === '#about' || location.hash === '') {
      // Scroll to top when no hash or #about
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ message: '', isError: false, sending: true });

    try {
      const result = await emailjs.sendForm(
        'service_q38lojc',
        'template_njy4u5o',
        formRef.current,
        '8orGvJGKVXnkERw1q'
      );

      if (result.text === 'OK') {
        setFormStatus({
          message: 'Message sent successfully!',
          isError: false,
          sending: false
        });
        formRef.current.reset();
      }
    } catch (error) {
      console.log('FAILED...', error); // Add this to see the specific error
      setFormStatus({
        message: 'Failed to send message. Please try again.',
        isError: true,
        sending: false
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
        <div>
          <Title>About</Title>
          <AboutText>{nan.about}</AboutText>
        </div>
        <DescriptionText>{nan.description}</DescriptionText>
        <div>
          <Title>Services</Title>
          <AboutText>{nan.worksAbout}</AboutText>
        </div>
        <ServicesGrid>
          {works.map((work, index) => (
            <ServiceCard key={work.id || index}>
              <ServiceImage src={work.getWorksImagesUrl("original")}/>
              <ServiceTitle>{work.title}</ServiceTitle>
            </ServiceCard>
          ))}
        </ServicesGrid>

        {/* Add Contact Section */}
        <ContactSection ref={contactRef} id="contact">
          <Title>Contact</Title>
          <ContactGrid>
            <InfoColumn>
              <SubTitle>Info</SubTitle>
              
              <InfoBlock>
                <SubTitle>Phone</SubTitle>
                <ContactText>+90 216 455 98 92</ContactText>
              </InfoBlock>

              <InfoBlock>
                <SubTitle>Email</SubTitle>
                <ContactText>
                  <a href="mailto:nan@nankontrat.com">nan@nankontrat.com</a>
                </ContactText>
              </InfoBlock>

              <InfoBlock>
                <SubTitle>Office Address</SubTitle>
                <ContactText>
                  Koşuyolu Cad. No:76 Kadıköy
                  <br />
                  İstanbul / Turkey
                </ContactText>
              </InfoBlock>

              <InfoBlock>
                <SubTitle>Factory Address</SubTitle>
                <ContactText>
                  Koşuyolu Cad. No:76 Kadıköy
                  <br />
                  İstanbul / Turkey
                </ContactText>
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
              <SendButton 
                type="submit" 
                disabled={formStatus.sending}
              >
                {formStatus.sending ? 'Sending...' : 'Send'}
              </SendButton>
            </ContactForm>
          </FormColumn>
        </ContactGrid>
        </ContactSection>
      </ContentSection>
    </PageContainer>
  );
};

export default AboutPage;