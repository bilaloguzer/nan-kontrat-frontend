import React, { createContext, useContext, useState, useEffect } from "react";
import Work from "../models/WorkModel";
import { BASE_URL } from "../api/projectsApi";

const WorksContext = createContext();

export const WorksProvider = ({ children }) => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchWorks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/works?populate=*`);

        if (!response.ok) {
          throw new Error(`Failed to fetch works: ${response.status}`);
        }

        const result = await response.json();

        if (!result.data) {
          throw new Error("Invalid API response structure");
        }

        console.log("Raw works data:", result.data); // Debug log

        if (isMounted) {
          const transformedWorks = result.data
            .map((workData) => {
              try {
                return new Work(workData);
              } catch (err) {
                console.error("Failed to create work:", err, workData);
                return null;
              }
            })
            .filter(Boolean);

          console.log("Transformed works:", transformedWorks); // Debug log
          setWorks(transformedWorks);
          setError(null);
        }
      } catch (err) {
        console.error("Error in works fetch/processing:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchWorks();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    works,
    loading,
    error,
    // Add helper methods if needed
    getWorkImageUrl: (work, size) => work?.getWorksImagesUrl(size),
  };

  return (
    <WorksContext.Provider value={value}>{children}</WorksContext.Provider>
  );
};

export const useWorks = () => {
  const context = useContext(WorksContext);
  if (context === undefined) {
    throw new Error("useWorks must be used within a WorksProvider");
  }
  return context;
};
