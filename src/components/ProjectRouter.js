import { useParams, Navigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import ProjectDetailPage from '../pages/ProjectDetailPage/ProjectDetailPage';
import ProjectBlogPage from '../pages/ProjectBlogPage/ProjectBlogPage';

const ProjectRouter = () => {
  const { slug } = useParams();
  const { projects, loading, error } = useProjects();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const project = projects.find(p => p.slug === slug);

  if (!project) return <Navigate to="/projects" />;

  // Transform project data to include image helper functions
  const enhancedProject = {
    ...project,
    getMainImageUrl: () => {
      const baseUrl = 'http://localhost:1337';
      return project.mainImage ? `${baseUrl}${project.mainImage}` : null;
    },
    getProjectImageUrl: (index) => {
      const baseUrl = 'http://localhost:1337';
      // Handle the nested data structure from your API
      const images = project.projectImages || [];
      if (images[index]?.documentId) {
        return `${baseUrl}/uploads/${images[index].documentId}`; // Adjust this path according to your Strapi setup
      }
      return null;
    },
    getTotalImages: () => {
      return (project.projectImages?.length || 0) + 1; // Count main image + additional images
    }
  };

  return project.blog ? 
    <ProjectBlogPage project={enhancedProject} /> : 
    <ProjectDetailPage project={enhancedProject} />;

};
export default ProjectRouter;