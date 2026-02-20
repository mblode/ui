import type { Metadata } from "next";

import DocPage, {
  generateMetadata as generateDocMetadata,
} from "../[[...slug]]/page";

const componentsParams = Promise.resolve({ slug: ["components"] });

export async function generateMetadata(): Promise<Metadata> {
  return generateDocMetadata({
    params: Promise.resolve({ slug: ["components"] }),
  });
}

export default async function ComponentsPage() {
  return <DocPage params={componentsParams} />;
}
