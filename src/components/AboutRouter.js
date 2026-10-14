// components/AboutRouter/index.js
import React from 'react';
import { useAbout } from '../context/AboutContext';
import AboutPage from '../pages/AboutPage/AboutPage';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import { useMinimumLoading } from '../hooks/useMinimumLoading';

const AboutRouter = () => {
  const { nan, works, loading, error } = useAbout();
  const showLoader = useMinimumLoading(loading);

  if (showLoader) {
    return <LoadingScreen />;
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