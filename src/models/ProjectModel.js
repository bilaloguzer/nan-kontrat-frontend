// models/ProjectModel.js

/**
 * @typedef {Object} ProjectDescriptionChild
 * @property {string} text - The text content
 * @property {string} type - The type of text content
 */

/**
 * @typedef {Object} ProjectDescription
 * @property {string} type - The type of description block (e.g., 'paragraph')
 * @property {ProjectDescriptionChild[]} children - Array of text content objects
 */

/**
 * @typedef {Object} Project
 * @property {number} id - Unique identifier
 * @property {string} documentId - Document identifier
 * @property {string} title - Project title
 * @property {ProjectDescription[]} description - Array of description blocks
 * @property {string} startDate - Project start date
 * @property {string} client - Client name
 * @property {string|null} designer - Designer name
 * @property {string} finishDate - Project completion date
 * @property {string} slug - URL-friendly identifier
 * @property {string} location - Project location
 * @property {boolean} highlight - Whether project is highlighted
 * @property {boolean} blog - Whether project has a blog
 * @property {string} createdAt - Creation timestamp
 * @property {string} updatedAt - Last update timestamp
 * @property {string} publishedAt - Publication timestamp
 * @property {string|null} locale - Project locale
 */

/**
 * @typedef {Object} Pagination
 * @property {number} page - Current page number
 * @property {number} pageSize - Items per page
 * @property {number} pageCount - Total number of pages
 * @property {number} total - Total number of items
 */

/**
 * @typedef {Object} ProjectResponse
 * @property {Project[]} data - Array of project objects
 * @property {Object} meta - Response metadata
 * @property {Pagination} meta.pagination - Pagination information
 */

/**
 * Formats project description into plain text
 * @param {ProjectDescription[]} description - Array of description blocks
 * @returns {string} Formatted description text
 */
export const formatProjectDescription = (description) => {
    return description
      .map(block => 
        block.children
          .map(child => child.text)
          .join('')
      )
      .join('\n\n');
  };
  
  /**
   * Creates project URL slug from title
   * @param {string} title - Project title
   * @returns {string} URL-friendly slug
   */
  export const createProjectSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };
  
  /**
   * Validates project data structure
   * @param {Project} project - Project object to validate
   * @returns {boolean} Whether project data is valid
   */
  export const isValidProject = (project) => {
    const requiredFields = [
      'id',
      'documentId',
      'title',
      'description',
      'startDate',
      'client',
      'slug',
      'location'
    ];
  
    return requiredFields.every(field => project.hasOwnProperty(field) && project[field] !== undefined);
  };
  
  /**
   * Sorts projects by date
   * @param {Project[]} projects - Array of projects to sort
   * @param {string} [dateField='startDate'] - Date field to sort by
   * @param {string} [order='desc'] - Sort order ('asc' or 'desc')
   * @returns {Project[]} Sorted projects array
   */
  export const sortProjectsByDate = (projects, dateField = 'startDate', order = 'desc') => {
    return [...projects].sort((a, b) => {
      const dateA = new Date(a[dateField]);
      const dateB = new Date(b[dateField]);
      return order === 'desc' ? dateB - dateA : dateA - dateB;
    });
  };
  
  /**
   * Groups projects by year
   * @param {Project[]} projects - Array of projects to group
   * @param {string} [dateField='startDate'] - Date field to group by
   * @returns {Object.<string, Project[]>} Projects grouped by year
   */
  export const groupProjectsByYear = (projects, dateField = 'startDate') => {
    return projects.reduce((groups, project) => {
      const year = new Date(project[dateField]).getFullYear().toString();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(project);
      return groups;
    }, {});
  };
  
  /**
   * Filters projects by multiple criteria
   * @param {Project[]} projects - Array of projects to filter
   * @param {Object} filters - Filter criteria
   * @param {string} [filters.client] - Filter by client
   * @param {string} [filters.location] - Filter by location
   * @param {boolean} [filters.highlight] - Filter by highlight status
   * @returns {Project[]} Filtered projects array
   */
  export const filterProjects = (projects, filters) => {
    return projects.filter(project => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === undefined || value === null) return true;
        return project[key] === value;
      });
    });
  };