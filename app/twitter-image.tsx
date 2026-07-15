import { createOgImage } from "./og/image";

export {
  ogImageAlt as alt,
  ogImageSize as size,
  ogImageContentType as contentType,
} from "./og/image";

export default function Image() {
  return createOgImage();
}
