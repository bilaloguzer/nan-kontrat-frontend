const getStrapiImageUrl = (imagePath) => {
    const baseUrl = 'http://localhost:1337';
    // If the image path is a full URL, return it as is
    if (imagePath?.startsWith('http')) {
      return imagePath;
    }
    // If the image path exists but isn't a full URL, prepend the Strapi base URL
    return imagePath ? `${baseUrl}${imagePath}` : null;
  };
  export default getStrapiImageUrl;