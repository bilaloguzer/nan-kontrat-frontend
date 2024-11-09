// components/AboutRouter/index.js
import React from 'react';
import { useAbout } from '../context/AboutContext';
import AboutPage from '../pages/AboutPage/AboutPage';

const AboutRouter = () => {
  const { nan, works, loading, error } = useAbout();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!nan || !works) {
    return null;
  }

  return <AboutPage nan={nan} works={works} />;
};

export default AboutRouter;