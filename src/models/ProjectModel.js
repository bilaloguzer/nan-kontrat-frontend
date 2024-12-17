
import { BASE_URL } from "../api/projectsApi";

class Project {
  constructor(data) {
    if (!data || typeof data !== "object") {
      throw new Error("Invalid project data");
    }

    // Handle the nested attributes structure from the API
    const attributes = data.attributes || data;

    this.id = data.id;
    this.title = attributes.title || "Untitled Project";
    this.area = attributes.area || "";
    this.mainContractor = attributes.mainContractor || "";
    this.location = attributes.location || "Unknown Location";
    this.summary = attributes.summary || "";
    this.description = attributes.description || [];
    this.startDate = attributes.startDate || "";
    this.finishDate = attributes.finishDate || "";
    this.client = attributes.client || "";
    this.designer = attributes.designer || "";
    this.slug = attributes.slug || "";
    this.show = attributes.show || false;
    this.highlight = attributes.highlight || false;

    // Safely store image data
    this.mainImage =
      attributes.mainImage?.data?.attributes || attributes.mainImage;
    this.projectImages = (
      attributes.projectImages?.data ||
      attributes.projectImages ||
      []
    )
      .map((img) => img.attributes || img)
      .filter(Boolean);

    // Add project state enum
    this.projectState = attributes.projectState?.toLowerCase() || null;

    // Add works array
    this.works = (attributes.works?.data || attributes.works || []).map(
      (work) => ({
        id: work.id,
        title: work.title,
        slug: work.slug,
        description: work.description,
      })
    );
  }

  getWorkTypes() {
    return this.works.map((work) => work.title);
  }

  getMainImageUrl() {
    if (!this.mainImage?.url) {
      console.warn("No main image URL found for project:", this.title);
      return "/placeholder-image.jpg";
    }
    return `${BASE_URL}${this.mainImage.url}`;
  }

  getProjectImageUrl(index) {
    const image = this.projectImages[index];
    if (!image?.url) {
      console.warn(
        `No project image URL found at index ${index} for project:`,
        this.title
      );
      return "/placeholder-image.jpg";
    }
    return `${BASE_URL}${image.url}`;
  }

  getTotalImages() {
    return (this.mainImage ? 1 : 0) + (this.projectImages?.length || 0);
  }

  get descriptionText() {
    if (!Array.isArray(this.description)) {
      return "";
    }
    return this.description
      .map((desc) => desc.children?.map((child) => child.text).join(" ") || "")
      .join("\n\n");
  }
}

export default Project;
