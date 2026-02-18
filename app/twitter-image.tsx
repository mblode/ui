import {
  createOgImage,
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
} from "./og/image";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return createOgImage();
}
