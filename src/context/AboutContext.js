import React, { createContext, useContext } from 'react';
import { useNan } from './NanContext';
import { useWorks } from './WorksContext';

const AboutContext = createContext();

export const AboutProvider = ({ children }) => {
  const { nan, loading: nanLoading, error: nanError } = useNan();
  const { works, loading: worksLoading, error: worksError } = useWorks();

  const value = {
    nan,
    works,
    loading: nanLoading || worksLoading,
    error: nanError || worksError
  };

  return (
    <AboutContext.Provider value={value}>
      {children}
    </AboutContext.Provider>
  );
};

export const useAbout = () => {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
};