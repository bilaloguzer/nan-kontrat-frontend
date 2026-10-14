import { BASE_URL } from "../api/projectsApi";

export const PLACEHOLDER_IMAGE = "/placeholder-image.jpg";

// Strapi format names, smallest first. "xlarge" only exists for uploads made
// after the custom breakpoint was added to the Strapi config.
const FORMAT_ORDER = ["thumbnail", "small", "medium", "large", "xlarge"];

const unwrap = (media) => {
  if (!media || typeof media !== "object") return null;
  return media.data?.attributes || media.attributes || media;
};

// A resized format is only worth using when it is lighter than the original.
// Strapi re-encodes PNGs losslessly, which can make "large" heavier than the
// source file. Sizes are in KB on both the file and its formats.
const usableFormat = (file, name) => {
  const f = file.formats?.[name];
  if (!f?.url) return null;
  if (file.size && f.size && f.size >= file.size) return null;
  return f;
};

/**
 * URL for a Strapi media object at the requested size.
 * Falls back to the next smaller format, then the original file.
 * @param {object} media Strapi media (v4 `data.attributes` or v5 flat shape)
 * @param {"original"|"xlarge"|"large"|"medium"|"small"|"thumbnail"} size
 */
export const getImageUrl = (media, size = "large") => {
  const file = unwrap(media);
  if (!file?.url) return PLACEHOLDER_IMAGE;

  if (size !== "original" && file.formats) {
    const start = FORMAT_ORDER.indexOf(size);
    const candidates = start === -1 ? [] : FORMAT_ORDER.slice(0, start + 1).reverse();
    for (const name of candidates) {
      const f = usableFormat(file, name);
      if (f) return `${BASE_URL}${f.url}`;
    }
  }
  return `${BASE_URL}${file.url}`;
};

/**
 * `srcSet` string with every usable format plus the original, smallest
 * first. Returns undefined when nothing has a width, so the attribute is
 * simply omitted.
 */
export const getImageSrcSet = (media) => {
  const file = unwrap(media);
  if (!file?.url) return undefined;

  const entries = FORMAT_ORDER.map((name) => usableFormat(file, name))
    .filter((f) => f?.width)
    .map((f) => `${BASE_URL}${f.url} ${f.width}w`);

  if (file.width) entries.push(`${BASE_URL}${file.url} ${file.width}w`);
  return entries.length ? entries.join(", ") : undefined;
};
