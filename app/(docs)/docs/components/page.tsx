import type { Metadata } from "next";

import DocPage, { generateMetadata as generateDocMetadata } from "../[[...slug]]/page";

// The landing page's primary link. Same frame as every other doc; see
// ../[[...slug]]/page.tsx.
export const instant = true;

const componentsParams = Promise.resolve({ slug: ["components"] });

export async function generateMetadata(): Promise<Metadata> {
  return generateDocMetadata({
    params: Promise.resolve({ slug: ["components"] }),
  });
}

export default async function ComponentsPage() {
  return <DocPage params={componentsParams} />;
}
