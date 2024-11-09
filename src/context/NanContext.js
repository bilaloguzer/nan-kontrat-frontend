// context/NanContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Nan from '../models/NanModel';

const NanContext = createContext();

export const NanProvider = ({ children }) => {
  const [nan, setNan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNan = async () => {
      try {
        // Using the correct URL with populate
        const response = await fetch('http://localhost:1337/api/nan?populate=factoryPhoto');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch NAN info: ${response.status}`);
        }
        
        const result = await response.json();

        if (!result.data) {
          throw new Error('Invalid API response structure');
        }

        const nanInstance = new Nan(result.data);
        setNan(nanInstance);
        setError(null);
      } catch (err) {
        console.error('Error fetching NAN info:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNan();
  }, []);

  return (
    <NanContext.Provider value={{ nan, loading, error }}>
      {children}
    </NanContext.Provider>
  );
};

export const useNan = () => {
  const context = useContext(NanContext);
  if (context === undefined) {
    throw new Error('useNan must be used within a NanProvider');
  }
  return context;
};
