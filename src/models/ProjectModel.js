class Project {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid project data');
    }

    this.id = data.id;
    this.title = data.title || 'Untitled Project';
    this.location = data.location || 'Unknown Location';
    this.summary = data.summary ||  [];
    this.description = data.description || [];
    this.startDate = data.startDate || 'N/A';
    this.finishDate = data.finishDate || 'N/A';
    this.client = data.client || 'N/A';
    this.designer = data.designer || 'N/A';
    this.slug = data.slug || '';
    this.blog = data.blog || false;
    this.highlight = data.highlight || false;
    
    // Store raw image data
    this.mainImage = data.mainImage;
    this.projectImages = data.projectImages || [];
  }

  getMainImageUrl() {
    if (!this.mainImage) return '/placeholder-image.jpg';
    return `http://localhost:1337${this.mainImage.url}`;
  }

  getProjectImageUrl(index) {
    const image = this.projectImages[index];
    if (!image) return '/placeholder-image.jpg';
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