import { MdxPage, pageMetadata } from "../mdx-page";

export const metadata = pageMetadata("home");

export default function Page() {
  return <MdxPage slug="home" />;
}
