// App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import { GlobalStyle } from "./styles/GlobalStyles";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import ProjectRouter from "./components/ProjectRouter";
import { ProjectProvider } from "./context/ProjectContext";
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";

// Create a wrapper component for the Navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const isProjectDetail = location.pathname.match(/^\/projects\/[^/]+$/);

  if (isProjectDetail) {
    return null;
  }

  return <Navbar />;
};

const App = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
                  element={<Home projects={projects} isLoading={isLoading} />}
                />
                <Route
                  path="/projects"
                  element={
                    <ProjectsPage projects={projects} isLoading={isLoading} />
                  }
                />
                <Route path="/projects/:slug" element={<ProjectRouter />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </ProjectProvider>
  );
};

export default App;
