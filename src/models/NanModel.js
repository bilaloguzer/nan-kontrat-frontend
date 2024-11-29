// // models/NanModel.js
// class Nan {
//     constructor(data) {
//       if (!data || typeof data !== 'object') {
//         throw new Error('Invalid NAN data structure');
//       }

import { BASE_URL } from "../api/projectsApi";

  
//       this.id = data.id;
//       this.documentId = data.documentId;
//       this.companyName = data.companyName;
//       this.about = data.about || '';
//       this.description = data.description || '';
//       this.worksAbout = data.worksAbout || '';
//       this.companyEmail = data.companyEmail || '';
//       this.phoneNumber = data.phoneNumber || '';
//       this.address = data.address || '';
//       this.copyrightText = data.copyrightText || '';
//       this.createdAt = data.createdAt;
//       this.updatedAt = data.updatedAt;
//       this.publishedAt = data.publishedAt;
//       this.locale = data.locale;
//       this.factoryPhoto = data.factoryPhoto;
//       this.logo = data.logo;
//       this.socialMedia = data.socialMedia || [];
//     }
  
//     getNanImagesUrl(size = 'large') {
//       if (!this.factoryPhoto) {
//         return '/placeholder-image.jpg';
//       }
  
//       // If requesting original size
//       if (size === 'original') {
//         return `http://localhost:1337${this.factoryPhoto.url}`;
//       }
  
//       // If requesting a specific format (thumbnail, small, medium, large)
//       if (this.factoryPhoto.formats && this.factoryPhoto.formats[size]) {
//         return `http://localhost:1337${this.factoryPhoto.formats[size].url}`;
//       }
  
//       // Fallback to original if requested size is not available
//       return `http://localhost:1337${this.factoryPhoto.url}`;
//     }
  
//     getFormattedAbout() {
//       if (!this.about) return [];
//       return this.about.split(' ').filter(Boolean);
//     }
  
//     getFormattedAddress() {
//       if (!this.address) return [];
//       return this.address.split('/n').map(part => part.trim());
//     }
  
//     getImageDimensions(size = 'large') {
//       if (!this.factoryPhoto) {
//         return { width: 0, height: 0 };
//       }
  
//       if (size === 'original') {
//         return {
//           width: this.factoryPhoto.width,
//           height: this.factoryPhoto.height
//         };
//       }
  
//       if (this.factoryPhoto.formats && this.factoryPhoto.formats[size]) {
//         const format = this.factoryPhoto.formats[size];
//         return {
//           width: format.width,
//           height: format.height
//         };
//       }
  
//       return { width: 0, height: 0 };
//     }
//   }
  
//   export default Nan;
  
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
    this.address = attributes.address || '';
    this.copyrightText = attributes.copyrightText || '';
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
    this.publishedAt = attributes.publishedAt;
    this.locale = attributes.locale;
    
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