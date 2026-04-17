import { allPages } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx-components";
import { siteConfig } from "@/config/site";
import { env } from "@/env.mjs";
import { absoluteUrl } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getPageFromParams(params: PageProps["params"]) {
  const { slug } = await params;
  const slugStr = slug?.join("/");
  const page = allPages.find((page) => page.slugAsParams === slugStr);

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = env.NEXT_PUBLIC_APP_URL;

  const ogUrl = new URL(`${url}/og`);
  ogUrl.searchParams.set("title", page.title);
  ogUrl.searchParams.set("description", page.description || siteConfig.description);

  return {
    description: page.description,
    openGraph: {
      description: page.description,
      images: [
        {
          height: 630,
          url: ogUrl.toString(),
          width: 1200,
        },
      ],
      title: page.title,
      type: "article",
      url: absoluteUrl(page.slug),
    },
    title: page.title,
    twitter: {
      card: "summary_large_image",
      description: page.description,
      images: [ogUrl.toString()],
      title: page.title,
    },
  };
}

export async function generateStaticParams(): Promise<Awaited<PageProps["params"]>[]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-12">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">{page.title}</h1>
        {page.description && <p className="text-muted-foreground text-xl">{page.description}</p>}
      </div>
      <hr className="my-4" />
      <Mdx code={page.body.code} />
    </article>
  );
}
