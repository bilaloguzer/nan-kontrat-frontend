// // models/Work.js
//   class Work {
//     constructor(data) {
//       if (!data || typeof data !== 'object') {
//         throw new Error('Invalid work data');
//       }

//       console.log("data",data)
  
//       this.id = data.id;
//       this.documentId = data.documentId;
//       this.title = data.title || 'Untitled Work';
//       this.description = data.description || '';
//       this.slug = data.slug || '';
//       this.workImage = data.workImage;
//     }
  
//     getFormattedDescription() {
//       return this.description.split('\n').filter(Boolean);
//     }
//     getWorksImagesUrl(size = 'large') {
//       // if (!this.workImage) {
//       //   return '/placeholder-image.jpg';
//       // }
  
//       // If requesting original size
      
//       console.log("deb-u-g--" ,this.workImage);

//       if (size === 'original') {
//         return `http://localhost:1337${this.workImage[0].url}`;
//       }
  
//       // If requesting a specific format (thumbnail, small, medium, large)
//       if (this.workImage.formats && this.workImage.formats[size]) {
//         return `http://localhost:1337${this.workImage.formats[size].url}`;
//       }
  
//       // Fallback to original if requested size is not available
//       return `http://localhost:1337${this.workImage.url}`;
//     }
//   }
//   export default Work;
  
class Work {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid work data');
    }

    // Handle the nested attributes structure from the API
    const attributes = data.attributes || data;

    this.id = data.id;
    this.documentId = attributes.documentId;
    this.title = attributes.title || 'Untitled Work';
    this.description = attributes.description || [];
    this.slug = attributes.slug || '';
    
    // Handle nested image data
    this.workImage = attributes.workImage?.data?.attributes || attributes.workImage;
  }

  getFormattedDescription() {
    if (!Array.isArray(this.description)) {
      return [];
    }

    return this.description
      .map(desc => {
        if (desc.children && Array.isArray(desc.children)) {
          return desc.children
            .map(child => child.text || '')
            .join(' ');
        }
        return '';
      })
      .filter(Boolean);
  }

  getWorksImagesUrl(size = 'large') {
    if (!this.workImage) {
      console.warn('No work image available for:', this.title);
      return '/placeholder-image.jpg';
    }

    const baseUrl = 'http://145.223.116.223:1337';

    // If requesting original size
    if (size === 'original') {
      return `${baseUrl}${this.workImage.url}`;
    }

    // If requesting a specific format (thumbnail, small, medium, large)
    if (this.workImage.formats && this.workImage.formats[size]) {
      return `${baseUrl}${this.workImage.formats[size].url}`;
    }

    // Fallback to original if requested size is not available
    return `${baseUrl}${this.workImage.url}`;
  }

  getImageDimensions(size = 'large') {
    if (!this.workImage) {
      console.warn('No work image available for dimensions:', this.title);
      return { width: 0, height: 0 };
    }

    if (size === 'original') {
      return {
        width: this.workImage.width,
        height: this.workImage.height
      };
    }

    if (this.workImage.formats && this.workImage.formats[size]) {
      const format = this.workImage.formats[size];
      return {
        width: format.width,
        height: format.height
      };
    }

    return { width: 0, height: 0 };
  }
}

export default Work;