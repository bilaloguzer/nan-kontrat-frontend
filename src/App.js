// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { GlobalStyle } from "./styles/GlobalStyles";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProjectRouter from "./components/ProjectRouter";
import { ProjectProvider } from "./context/ProjectContext";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import AboutRouter from "./components/AboutRouter";
import { WorksProvider } from "./context/WorksContext";
import { NanProvider } from "./context/NanContext";
import { AboutProvider } from "./context/AboutContext";
import HomePage from "./pages/HomePage/HomePage";
// In your App.js or index.js
import { init } from '@emailjs/browser';
init('8orGvJGKVXnkERw1q');


// Create a wrapper component for the Navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const isProjectDetail = location.pathname.match(/^\/projects\/[^/]+$/);

  
  return <Navbar />;
};

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:1337/api/projects?populate=*"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <NanProvider>
      <WorksProvider>
        <AboutProvider>
          <ProjectProvider>
            <ThemeProvider theme={theme}>
              <Router>
                <div className="min-h-screen bg-white">
                  <GlobalStyle />
                  <NavbarWrapper />
                  <main>
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <HomePage projects={projects} isLoading={isLoading} />
                        }
                      />
                      <Route
                        path="/projects"
                        element={
                          <ProjectsPage
                            projects={projects}
                            isLoading={isLoading}
                          />
                        }
                      />
                      <Route
                        path="/projects/:slug"
                        element={<ProjectRouter />}
                      />
                      <Route path="/about" element={<AboutRouter />} />
                    </Routes>
                  </main>
                </div>
              </Router>
            </ThemeProvider>
          </ProjectProvider>
        </AboutProvider>
      </WorksProvider>
    </NanProvider>
  );
};

export default App;
