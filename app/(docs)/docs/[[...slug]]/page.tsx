import { ArrowLeftIcon, ArrowRightIcon } from "blode-icons-react";
import { allDocs } from "content-collections";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { Mdx } from "@/components/mdx-components";
import { getPagerForDoc } from "@/components/pager";
import { TableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl } from "@/lib/utils";
import { Button } from "@/registry/default/ui/button";

interface DocPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params;
  const slugStr = slug?.join("/") || "index";
  const doc = allDocs.find((doc) => doc.slugAsParams === slugStr);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} | Blode UI`,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: doc.image,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [doc.image],
      creator: "@mblode",
    },
  };
}

export async function generateStaticParams(): Promise<
  Awaited<DocPageProps["params"]>[]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc?.published) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);
  const pager = getPagerForDoc(doc);

  return (
    <div
      className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full"
      data-slot="docs"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full min-w-0 max-w-[40rem] flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between md:items-start">
                <h1 className="scroll-m-24 font-semibold text-3xl tracking-tight sm:text-3xl">
                  {doc.title}
                </h1>
                <div className="docs-nav flex items-center gap-2">
                  <div className="hidden sm:block">
                    <DocsCopyPage
                      page={doc.body.raw}
                      url={absoluteUrl(doc.slug)}
                    />
                  </div>
                  <div className="ml-auto flex gap-2">
                    {pager?.prev?.href && (
                      <Button
                        asChild
                        className="extend-touch-target size-8 shadow-none md:size-7"
                        size="icon"
                        variant="secondary"
                      >
                        <Link href={pager.prev.href}>
                          <ArrowLeftIcon />
                          <span className="sr-only">Previous</span>
                        </Link>
                      </Button>
                    )}
                    {pager?.next?.href && (
                      <Button
                        asChild
                        className="extend-touch-target size-8 shadow-none md:size-7"
                        size="icon"
                        variant="secondary"
                      >
                        <Link href={pager.next.href}>
                          <span className="sr-only">Next</span>
                          <ArrowRightIcon />
                        </Link>
                      </Button>
                    )}
                  </div>
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
          <div className="hidden h-16 w-full items-center gap-2 px-4 sm:flex sm:px-0">
            {pager?.prev?.href && (
              <Button
                asChild
                className="shadow-none"
                size="sm"
                variant="secondary"
              >
                <Link href={pager.prev.href}>
                  <ArrowLeftIcon /> {pager.prev.title}
                </Link>
              </Button>
            )}
            {pager?.next?.href && (
              <Button
                asChild
                className="ml-auto shadow-none"
                size="sm"
                variant="secondary"
              >
                <Link href={pager.next.href}>
                  {pager.next.title} <ArrowRightIcon />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-(--top-spacing) shrink-0" />
        {doc.toc ? (
          <div className="no-scrollbar flex flex-col gap-8 overflow-y-auto px-8">
            <TableOfContents toc={toc} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
