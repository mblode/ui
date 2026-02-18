import { createOgImage } from "./image";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? searchParams.get("heading");
  const description =
    searchParams.get("description") ?? searchParams.get("type");

  return createOgImage({ title, description });
}
