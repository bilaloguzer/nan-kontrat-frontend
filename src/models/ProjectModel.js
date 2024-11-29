// class Project {
//   constructor(data) {
//     if (!data || typeof data !== 'object') {
//       throw new Error('Invalid project data');
//     }

//     this.id = data.id;
//     this.title = data.title || 'Untitled Project';
//     this.location = data.location || 'Unknown Location';
//     this.summary = data.summary ||  [];
//     this.description = data.description || [];
//     this.startDate = data.startDate || 'N/A';
//     this.finishDate = data.finishDate || 'N/A';
//     this.client = data.client || 'N/A';
//     this.designer = data.designer || 'N/A';
//     this.slug = data.slug || '';
//     this.show = data.show || false;
//     this.highlight = data.highlight || false;
    
//     // Store raw image data
//     this.mainImage = data.mainImage;
//     this.projectImages = data.projectImages || [];
//   }

//   getMainImageUrl() {
//     if (!this.mainImage) return '/placeholder-image.jpg';
//     return `http://145.223.116.223:1337${this.mainImage.url}`;
//   }

//   getProjectImageUrl(index) {
//     const image = this.projectImages[index];
//     if (!image) return '/placeholder-image.jpg';
//     return `http://145.223.116.223:1337${image.url}`;
//   }

//   getTotalImages() {
//     return (this.mainImage ? 1 : 0) + (this.projectImages?.length || 0);
//   }

//   get descriptionText() {
//     return this.description
//       .map(desc => desc.children?.map(child => child.text).join(' ') || '')
//       .join('\n\n');
//   }

// }

// export default Project;
import { BASE_URL } from "../api/projectsApi";

class Project {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid project data');
    }

    // Handle the nested attributes structure from the API
    const attributes = data.attributes || data;

    this.id = data.id;
    this.title = attributes.title || 'Untitled Project';
    this.location = attributes.location || 'Unknown Location';
    this.summary = attributes.summary || '';
    this.description = attributes.description || [];
    this.startDate = attributes.startDate || 'N/A';
    this.finishDate = attributes.finishDate || 'N/A';
    this.client = attributes.client || 'N/A';
    this.designer = attributes.designer || 'N/A';
    this.slug = attributes.slug || '';
    this.show = attributes.show || false;
    this.highlight = attributes.highlight || false;
    
    // Safely store image data
    this.mainImage = attributes.mainImage?.data?.attributes || attributes.mainImage;
    this.projectImages = (attributes.projectImages?.data || attributes.projectImages || [])
      .map(img => img.attributes || img)
      .filter(Boolean);
  }

  getMainImageUrl() {
    if (!this.mainImage?.url) {
      console.warn('No main image URL found for project:', this.title);
      return '/placeholder-image.jpg';
    }
    return `${BASE_URL}${this.mainImage.url}`;
  }

  getProjectImageUrl(index) {
    const image = this.projectImages[index];
    if (!image?.url) {
      console.warn(`No project image URL found at index ${index} for project:`, this.title);
      return '/placeholder-image.jpg';
    }
    return `${BASE_URL}${image.url}`;
  }

  getTotalImages() {
    return (this.mainImage ? 1 : 0) + (this.projectImages?.length || 0);
  }

  get descriptionText() {
    if (!Array.isArray(this.description)) {
      return '';
    }
    return this.description
      .map(desc => desc.children?.map(child => child.text).join(' ') || '')
      .join('\n\n');
  }
}

export default Project;