// api/projectsApi.js
export const BASE_URL = 'http://145.223.116.223:1337';
//ßexport const BASE_URL = 'http://localhost:1337';

export const projectsApi = {
  /**
   * Get all projects with pagination
   * @param {number} [page=1] - Page number
   * @param {number} [pageSize=25] - Items per page
   * @returns {Promise<Object>} Projects data and pagination
   */
  getProjects: async (page = 1, pageSize = 25) => {
    const response = await fetch(
      `${BASE_URL}/api/projects?page=${page}&pageSize=${pageSize}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return response.json();
  },

  /**
   * Get a single project by slug
   * @param {string} slug - Project slug
   * @returns {Promise<Object>} Project data
   */
  getProjectBySlug: async (slug) => {
    const response = await fetch(
      `${BASE_URL}/api/projects?filters[slug][$eq]=${slug}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch project');
    }
    
    const data = await response.json();
    return data.data[0];
  },

  /**
   * Get highlighted projects
   * @returns {Promise<Object>} Highlighted projects
   */
  getHighlightedProjects: async () => {
    const response = await fetch(
      `${BASE_URL}/api/projects?filters[highlight][$eq]=true`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch highlighted projects');
    }
    
    const data = await response.json();
    return data.data;
  },
};
