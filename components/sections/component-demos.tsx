import { allPages } from "content-collections";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx-components";

const PAGE = "home";

export default function ComponentDemos() {
  const page = allPages.find((page) => page.slugAsParams === PAGE);

  if (!page) {
    notFound();
  }

  return (
    <section className="container max-w-5xl py-14" id="component-demos">
      <h2 className="mb-2 text-center font-bold text-5xl text-foreground leading-[1.2] tracking-tighter">
        Component demos
      </h2>
      <h3 className="mx-auto mb-8 text-balance text-center font-medium text-foreground/80 text-lg tracking-tight">
        Here are some of the components that you can use to build your landing
        pages.
      </h3>
      <Mdx code={page.body.code} />
    </section>
  );
}
