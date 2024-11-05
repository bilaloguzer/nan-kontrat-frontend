export const getStrapiImageUrl = (url) => {
  
  if (url.startsWith('http')) return url;
  return `http://localhost:1337${url}`;
};
export default getStrapiImageUrl;