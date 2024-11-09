// models/NanModel.js
class Nan {
    constructor(data) {
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid NAN data structure');
      }
  
      this.id = data.id;
      this.documentId = data.documentId;
      this.companyName = data.companyName;
      this.about = data.about || '';
      this.description = data.description || '';
      this.worksAbout = data.worksAbout || '';
      this.companyEmail = data.companyEmail || '';
      this.phoneNumber = data.phoneNumber || '';
      this.address = data.address || '';
      this.copyrightText = data.copyrightText || '';
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.publishedAt = data.publishedAt;
      this.locale = data.locale;
      this.factoryPhoto = data.factoryPhoto;
      this.logo = data.logo;
      this.socialMedia = data.socialMedia || [];
    }
  
    getNanImagesUrl(size = 'large') {
      if (!this.factoryPhoto) {
        return '/placeholder-image.jpg';
      }
  
      // If requesting original size
      if (size === 'original') {
        return `http://localhost:1337${this.factoryPhoto.url}`;
      }
  
      // If requesting a specific format (thumbnail, small, medium, large)
      if (this.factoryPhoto.formats && this.factoryPhoto.formats[size]) {
        return `http://localhost:1337${this.factoryPhoto.formats[size].url}`;
      }
  
      // Fallback to original if requested size is not available
      return `http://localhost:1337${this.factoryPhoto.url}`;
    }
  
    getFormattedAbout() {
      if (!this.about) return [];
      return this.about.split(' ').filter(Boolean);
    }
  
    getFormattedAddress() {
      if (!this.address) return [];
      return this.address.split('/n').map(part => part.trim());
    }
  
    getImageDimensions(size = 'large') {
      if (!this.factoryPhoto) {
        return { width: 0, height: 0 };
      }
  
      if (size === 'original') {
        return {
          width: this.factoryPhoto.width,
          height: this.factoryPhoto.height
        };
      }
  
      if (this.factoryPhoto.formats && this.factoryPhoto.formats[size]) {
        const format = this.factoryPhoto.formats[size];
        return {
          width: format.width,
          height: format.height
        };
      }
  
      return { width: 0, height: 0 };
    }
  }
  
  export default Nan;
  