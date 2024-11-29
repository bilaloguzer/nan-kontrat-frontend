// // context/NanContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import Nan from '../models/NanModel';

// const NanContext = createContext();

// export const NanProvider = ({ children }) => {
//   const [nan, setNan] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchNan = async () => {
//       try {
//         // Using the correct URL with populate
//         const response = await fetch('http://145.223.116.223:1337/api/nan?populate=factoryPhoto');
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch NAN info: ${response.status}`);
//         }
        
//         const result = await response.json();

//         if (!result.data) {
//           throw new Error('Invalid API response structure');
//         }

//         const nanInstance = new Nan(result.data);
//         setNan(nanInstance);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching NAN info:', err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNan();
//   }, []);

//   return (
//     <NanContext.Provider value={{ nan, loading, error }}>
//       {children}
//     </NanContext.Provider>
//   );
// };

// export const useNan = () => {
//   const context = useContext(NanContext);
//   if (context === undefined) {
//     throw new Error('useNan must be used within a NanProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import Nan from '../models/NanModel';
import { BASE_URL } from '../api/projectsApi';

const NanContext = createContext();

export const NanProvider = ({ children }) => {
  const [nan, setNan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNan = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/nan?populate=*`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch NAN info: ${response.status}`);
        }
        
        const result = await response.json();

        if (!result.data) {
          throw new Error('Invalid API response structure');
        }

        console.log('Raw NAN data:', result.data); // Debug log

        try {
          const nanInstance = new Nan(result.data);
          console.log('Processed NAN instance:', nanInstance); // Debug log
          setNan(nanInstance);
          setError(null);
        } catch (err) {
          console.error('Error creating NAN instance:', err);
          throw new Error(`Failed to process NAN data: ${err.message}`);
        }
      } catch (err) {
        console.error('Error in NAN data fetch/processing:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNan();
  }, []);

  const value = {
    nan,
    loading,
    error,
    // Add helper methods if needed
    getImageUrl: (size) => nan?.getNanImagesUrl(size),
    getLogoUrl: (size) => nan?.getLogoUrl(size),
  };

  return (
    <NanContext.Provider value={value}>
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