import ProjectHero from '../components/ProjectHero';

const Home = ({ projects, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // Get the first highlighted project for the hero
  const heroProject = projects.find(project => project.highlight) || projects[0];

  return (
    <div className="min-h-screen">
      <ProjectHero project={heroProject} />
      {/* Rest of home page content */}
    </div>
  );
};

export default Home; 