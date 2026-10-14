import { getImageUrl, getImageSrcSet } from "./imageUrl";

const media = {
  url: "/uploads/photo.jpg",
  width: 4000,
  formats: {
    thumbnail: { url: "/uploads/thumbnail_photo.jpg", width: 245 },
    small: { url: "/uploads/small_photo.jpg", width: 500 },
    medium: { url: "/uploads/medium_photo.jpg", width: 750 },
    large: { url: "/uploads/large_photo.jpg", width: 1000 },
  },
};

describe("getImageUrl", () => {
  it("returns the requested format when it exists", () => {
    expect(getImageUrl(media, "large")).toBe("/uploads/large_photo.jpg");
  });

  it("falls back to the next smaller format, then the original", () => {
    const onlySmall = { url: "/uploads/p.jpg", formats: { small: { url: "/uploads/small_p.jpg" } } };
    expect(getImageUrl(onlySmall, "large")).toBe("/uploads/small_p.jpg");
    const noFormats = { url: "/uploads/p.jpg" };
    expect(getImageUrl(noFormats, "large")).toBe("/uploads/p.jpg");
  });

  it("returns the original when asked for it", () => {
    expect(getImageUrl(media, "original")).toBe("/uploads/photo.jpg");
  });

  it("unwraps the Strapi v4 data.attributes shape", () => {
    expect(getImageUrl({ data: { attributes: media } }, "medium")).toBe("/uploads/medium_photo.jpg");
  });

  it("returns the placeholder for missing media", () => {
    expect(getImageUrl(null)).toBe("/placeholder-image.jpg");
    expect(getImageUrl({})).toBe("/placeholder-image.jpg");
  });
});

describe("getImageSrcSet", () => {
  it("lists every format plus the original, smallest first, with widths", () => {
    expect(getImageSrcSet(media)).toBe(
      "/uploads/thumbnail_photo.jpg 245w, /uploads/small_photo.jpg 500w, /uploads/medium_photo.jpg 750w, /uploads/large_photo.jpg 1000w, /uploads/photo.jpg 4000w"
    );
  });

  it("drops resized formats that are heavier than the original (PNG re-encodes)", () => {
    const png = {
      url: "/uploads/p.png", width: 1295, size: 428.9,
      formats: {
        small: { url: "/uploads/small_p.png", width: 500, size: 346 },
        medium: { url: "/uploads/medium_p.png", width: 750, size: 755 },
        large: { url: "/uploads/large_p.png", width: 1000, size: 1317 },
      },
    };
    expect(getImageSrcSet(png)).toBe("/uploads/small_p.png 500w, /uploads/p.png 1295w");
    expect(getImageUrl(png, "large")).toBe("/uploads/small_p.png");
  });

  it("skips entries without a width and returns undefined with no usable candidates", () => {
    expect(getImageSrcSet({ url: "/uploads/p.jpg" })).toBeUndefined();
    expect(getImageSrcSet(null)).toBeUndefined();
  });
});
