// models/Work.js
  class Work {
    constructor(data) {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid work data');
      }

      console.log("data",data)
  
      this.id = data.id;
      this.documentId = data.documentId;
      this.title = data.title || 'Untitled Work';
      this.description = data.description || '';
      this.slug = data.slug || '';
      this.workImage = data.workImage;
    }
  
    getFormattedDescription() {
      return this.description.split('\n').filter(Boolean);
    }
    getWorksImagesUrl(size = 'large') {
      // if (!this.workImage) {
      //   return '/placeholder-image.jpg';
      // }
  
      // If requesting original size
      
      console.log("deb-u-g--" ,this.workImage);

      if (size === 'original') {
        return `http://localhost:1337${this.workImage[0].url}`;
      }
  
      // If requesting a specific format (thumbnail, small, medium, large)
      if (this.workImage.formats && this.workImage.formats[size]) {
        return `http://localhost:1337${this.workImage.formats[size].url}`;
      }
  
      // Fallback to original if requested size is not available
      return `http://localhost:1337${this.workImage.url}`;
    }
  }
  export default Work;
  