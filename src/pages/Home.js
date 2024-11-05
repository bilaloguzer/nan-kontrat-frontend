import ProjectHero from '../components/ProjectHero';

const Home = ({ projects, isLoading }) => {
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  // Filter highlighted projects if needed
  const highlightedProjects = projects.filter(project => project.highlight);

  return (
    <div>
      <ProjectHero projects={highlightedProjects.length > 0 ? highlightedProjects : projects} />
      {/* Rest of home page content */}
    </div>
  );
};
export default Home;