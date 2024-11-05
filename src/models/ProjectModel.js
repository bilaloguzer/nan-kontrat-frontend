class Project {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid project data');
    }

    this.id = data.id;
    this.title = data.title || 'Untitled Project';
    this.location = data.location || 'Unknown Location';
    this.description = data.description || [];
    this.startDate = data.startDate || 'N/A';
    this.finishDate = data.finishDate || 'N/A';
    this.client = data.client || 'N/A';
    this.designer = data.designer || 'N/A';
    this.slug = data.slug || '';
    this.blog = data.blog || false;
    
    // Store raw image data
    this.mainImage = data.mainImage;
    this.projectImages = data.projectImages || [];

    console.log('Constructed project:', {
      id: this.id,
      title: this.title,
      mainImage: this.mainImage,
      projectImages: this.projectImages?.length
    });
  }

  getMainImageUrl() {
    if (!this.mainImage) return '/placeholder-image.jpg';
    
    // Try to get the large format first
    if (this.mainImage.formats?.large?.url) {
      return `http://localhost:1337${this.mainImage.formats.large.url}`;
    }
    
    // Fallback to original URL
    return `http://localhost:1337${this.mainImage.url}`;
  }

  getProjectImageUrl(index) {
    const image = this.projectImages[index];
    if (!image) return '/placeholder-image.jpg';
    
    // Try to get the large format first
    if (image.formats?.large?.url) {
      return `http://localhost:1337${image.formats.large.url}`;
    }
    
    // Fallback to original URL
    return `http://localhost:1337${image.url}`;
  }

  getTotalImages() {
    return (this.mainImage ? 1 : 0) + (this.projectImages?.length || 0);
  }

  get descriptionText() {
    return this.description
      .map(desc => desc.children?.map(child => child.text).join(' ') || '')
      .join('\n\n');
  }
}
export default Project;
