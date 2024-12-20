import { BASE_URL } from "../api/projectsApi";  
class Nan {
  constructor(data) {
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid NAN data structure');
    }

    // Handle the nested attributes structure from the API
    const attributes = data.attributes || data;

    this.id = data.id;
    this.documentId = attributes.documentId;
    this.companyName = attributes.companyName;
    this.about = attributes.about || '';
    this.description = attributes.description || '';
    this.worksAbout = attributes.worksAbout || '';
    this.companyEmail = attributes.companyEmail || '';
    this.phoneNumber = attributes.phoneNumber || '';
    this.copyrightText = attributes.copyrightText || '';
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.publishedAt = attributes.publishedAt;
    this.locale = attributes.locale;
    this.factoryAdress = attributes.factoryAdress || '';
    this.officeAdress = attributes.officeAdress || '';
    this.xUrl = attributes.xUrl || '';
    this.instagramUrl = attributes.instagramUrl || '';
    this.linkedinUrl = attributes.linkedinUrl || '';
    
    // Handle nested image data
    this.factoryPhoto = attributes.factoryPhoto?.data?.attributes || attributes.factoryPhoto;
    this.logo = attributes.logo?.data?.attributes || attributes.logo;
    this.socialMedia = attributes.socialMedia || [];
  }

  getNanImagesUrl(size = 'large') {
    if (!this.factoryPhoto) {
      console.warn('No factory photo available');
      return '/placeholder-image.jpg';
    }

     // Update to match your API URL

    // If requesting original size
    if (size === 'original') {
      return `${BASE_URL}${this.factoryPhoto.url}`;
    }

    // If requesting a specific format (thumbnail, small, medium, large)
    if (this.factoryPhoto.formats && this.factoryPhoto.formats[size]) {
      return `${BASE_URL}${this.factoryPhoto.formats[size].url}`;
    }

    // Fallback to original if requested size is not available
    return `${BASE_URL}${this.factoryPhoto.url}`;
  }

  getLogoUrl(size = 'original') {
    if (!this.logo) {
      console.warn('No logo available');
      return '/placeholder-logo.png';
    }

    

    if (size === 'original') {
      return `${BASE_URL}${this.logo.url}`;
    }

    if (this.logo.formats && this.logo.formats[size]) {
      return `${BASE_URL}${this.logo.formats[size].url}`;
    }

    return `${BASE_URL}${this.logo.url}`;
  }

  getFormattedAbout() {
    if (!this.about) return [];
    return this.about.split(' ').filter(Boolean);
  }

  getPhoneNumber() {
    if (!this.phoneNumber) return [];
    return this.phoneNumber.split(' ').filter(Boolean);
  }


  getFormattedAddress() {
    if (!this.address) return [];
    return this.address.split('\n').map(part => part.trim()).filter(Boolean);
  }

  getImageDimensions(size = 'large') {
    if (!this.factoryPhoto) {
      console.warn('No factory photo available for dimensions');
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

  getLogoDimensions(size = 'original') {
    if (!this.logo) {
      console.warn('No logo available for dimensions');
      return { width: 0, height: 0 };
    }

    if (size === 'original') {
      return {
        width: this.logo.width,
        height: this.logo.height
      };
    }

    if (this.logo.formats && this.logo.formats[size]) {
      const format = this.logo.formats[size];
      return {
        width: format.width,
        height: format.height
      };
    }

    return { width: 0, height: 0 };
  }
}

export default Nan;