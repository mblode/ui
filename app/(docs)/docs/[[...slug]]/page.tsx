import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "blode-icons-react";
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
  const slugStr = slug?.join("/") ?? "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slugStr);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return {
    description: doc.description,
    openGraph: {
      description: doc.description,
      images: [
        {
          height: 630,
          url: doc.image,
          width: 1200,
        },
      ],
      title: doc.title,
      type: "article",
      url: absoluteUrl(doc.slug),
    },
    title: `${doc.title} | Blode UI`,
    twitter: {
      card: "summary_large_image",
      creator: "@mblode",
      description: doc.description,
      images: [doc.image],
      title: doc.title,
    },
  };
}

export async function generateStaticParams(): Promise<Awaited<DocPageProps["params"]>[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams ? doc.slugAsParams.split("/") : [],
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
                  <div>
                    <DocsCopyPage page={doc.body.raw} url={absoluteUrl(doc.slug)} />
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
          {pager?.prev?.href || pager?.next?.href ? (
            <nav className="flex w-full rounded-2xl bg-muted/50 p-1 text-sm" id="pagination">
              {pager?.prev?.href ? (
                <Link
                  className="group flex items-center justify-between gap-1.5 pr-6 pl-3"
                  href={pager.prev.href}
                >
                  <ChevronLeftIcon
                    aria-hidden="true"
                    className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground"
                  />
                  <span className="font-medium text-muted-foreground tracking-tight group-hover:text-foreground">
                    Previous
                  </span>
                </Link>
              ) : null}
              {pager?.next?.href ? (
                <Link className="group ml-auto flex w-full min-w-0 flex-1" href={pager.next.href}>
                  <div className="flex flex-1 items-center justify-end rounded-xl bg-background hover:ring-1 hover:ring-border sm:h-16">
                    <div className="flex min-w-0 flex-col items-end justify-center px-5">
                      <span className="text-right font-semibold text-foreground/80">
                        {pager.next.title}
                      </span>
                    </div>
                    <div className="h-8 w-px bg-border/50" />
                    <div className="flex items-center gap-1.5 pr-3 pl-5">
                      <span className="font-medium text-muted-foreground tracking-tight group-hover:text-foreground">
                        Next
                      </span>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="size-3 text-muted-foreground/50 group-hover:text-muted-foreground"
                      />
                    </div>
                  </div>
                </Link>
              ) : null}
            </nav>
          ) : null}
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
