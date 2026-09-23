import { allDocs } from "content-collections";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { DocNavButtons } from "@/components/doc-nav-buttons";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { Mdx } from "@/components/mdx-components";
import { getPagerForDoc, PagerNav } from "@/components/pager";
import { TableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl, seoDescription } from "@/lib/utils";
import { docJsonLd } from "@/lib/zone-schema";
import { JsonLd } from "@/components/json-ld";

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params;
  const slugStr = slug?.join("/") ?? "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slugStr);

  if (!doc) {
    return null;
  }

  return doc;
}

// Every doc, from /docs and the install page to each component page, navigates
// instantly: the two-column frame is the App Shell and the slug-dependent body
// and TOC stream behind their own boundaries (upgraded to the full payload on
// hover by `unstable_dynamicOnHover`). `instant` makes a regression, such as
// reading `params` above those boundaries, a dev error. Locked in by
// e2e/instant-navigation.spec.ts.
export const instant = true;

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  const description = seoDescription(doc.description);
  // The root layout's title template appends the brand. `seoTitle` wins when a
  // doc sets one: `title` is also the rendered h1, so a page that needs a
  // keyword-bearing search title should not have to carry it as a heading.
  const searchTitle = doc.seoTitle ?? doc.title;
  const title = doc.component ? `${searchTitle} | React Component` : searchTitle;
  // Title templates never reach og:title or twitter:title, and og:site_name is
  // the person, not the product — so a card title has to name the product itself.
  const cardTitle = `${searchTitle} | Blode UI`;

  return {
    alternates: {
      canonical: absoluteUrl(doc.slug),
    },
    description,
    openGraph: {
      description,
      images: [
        {
          height: 630,
          url: doc.image,
          width: 1200,
        },
      ],
      siteName: "Matthew Blode",
      title: cardTitle,
      type: "article",
      url: absoluteUrl(doc.slug),
    },
    title,
    twitter: {
      card: "summary_large_image",
      creator: "@mattblode",
      description,
      images: [doc.image],
      title: cardTitle,
    },
  };
}

export async function generateStaticParams(): Promise<Awaited<DocPageProps["params"]>[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams ? doc.slugAsParams.split("/") : [],
  }));
}

// A doc is nothing but its slug, so the body and the table of contents each
// read the promise behind their own boundary and the two-column frame around
// them still prerenders.
async function DocBody({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc?.published) {
    notFound();
  }

  const pager = getPagerForDoc(doc);

  return (
    <>
      <JsonLd
        data={docJsonLd({
          description: doc.description,
          // `doc.title`, not `seoTitle`: this feeds `headline` and `name`, and
          // structured data may only claim what the page renders. The h1 below
          // is `doc.title`, so /docs declared "Blode UI docs" while rendering
          // "Introduction" and failed check-schema. `seoTitle` still drives the
          // search title and the card, which is what it is for.
          title: doc.title,
          url: absoluteUrl(doc.slug),
        })}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between md:items-start">
            <h1 className="scroll-m-24 font-semibold text-3xl tracking-tight sm:text-3xl">
              {doc.title}
            </h1>
            <div className="docs-nav flex items-center gap-2">
              <div>
                <DocsCopyPage page={doc.body.raw} url={absoluteUrl(doc.slug)} />
              </div>
              <DocNavButtons next={pager?.next} prev={pager?.prev} />
            </div>
          </div>
          {doc.description && (
            <p className="text-[1.05rem] text-muted-foreground sm:text-balance sm:text-base md:max-w-[80%]">
              {doc.description}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
        <Mdx code={doc.body.code} />
      </div>
      <PagerNav next={pager?.next} prev={pager?.prev} />
    </>
  );
}

async function DocToc({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc?.published || !doc.toc) {
    return null;
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <div className="no-scrollbar flex flex-col gap-8 overflow-y-auto px-8">
      <TableOfContents toc={toc} />
    </div>
  );
}

export default function DocPage({ params }: DocPageProps) {
  return (
    <div
      className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full"
      data-slot="docs"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full min-w-0 max-w-[40rem] flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <Suspense
            fallback={
              <>
                <div className="h-9 w-2/3 animate-pulse rounded-md bg-muted/50" />
                <div className="h-96 w-full animate-pulse rounded-md bg-muted/50" />
              </>
            }
          >
            <DocBody params={params} />
          </Suspense>
        </div>
      </div>
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-(--top-spacing) shrink-0" />
        <Suspense fallback={null}>
          <DocToc params={params} />
        </Suspense>
      </div>
    </div>
  );
}
