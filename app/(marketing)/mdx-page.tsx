import { allPages } from "content-collections";
import type { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { siteConfig, siteUrl } from "@/config/site";
import { absoluteUrl, seoDescription } from "@/lib/utils";

/*
 * These pages used to be served by a `[...slug]` catch-all, which matched every
 * path in the zone. Under Cache Components an unmatched param is answered with
 * the route's prerendered App Shell, a 200 sent before the slug is even read, so
 * `/ui/ui` and `/ui/anything` read to a crawler as real pages. A rewrite cannot
 * fix that either: Next only carries a middleware status through for redirects,
 * so on Vercel the rewritten 404 page came back 200 as well.
 *
 * The content files here do not need a dynamic segment. With one route each, an
 * unknown path matches nothing, and Vercel answers it the same way it answers
 * `/icons/icons` and `/glide/glide`: a real 404.
 */
function getPage(slug: string) {
  const page = allPages.find((entry) => entry.slugAsParams === slug);

  if (!page) {
    // A route file names its own content file, so a miss is a build-time
    // mistake. Failing here is louder than shipping a page that 404s.
    throw new Error(`No content/pages entry for "${slug}"`);
  }

  return page;
}

export function pageMetadata(slug: string): Metadata {
  const page = getPage(slug);

  const ogUrl = new URL(`${siteUrl}/og`);
  ogUrl.searchParams.set("title", page.title);
  ogUrl.searchParams.set("description", page.description || siteConfig.description);

  const description = seoDescription(page.description || siteConfig.description);
  // Title templates never reach og:title or twitter:title, and og:site_name is
  // the person, not the product — so a card title has to name the product itself.
  const cardTitle = `${page.title} | ${siteConfig.name}`;

  return {
    alternates: {
      canonical: absoluteUrl(page.slug),
    },
    description,
    openGraph: {
      description,
      images: [
        {
          height: 630,
          url: ogUrl.toString(),
          width: 1200,
        },
      ],
      siteName: "Matthew Blode",
      title: cardTitle,
      type: "article",
      url: absoluteUrl(page.slug),
    },
    // The root layout's title template appends the brand.
    title: page.title,
    twitter: {
      card: "summary_large_image",
      creator: "@mattblode",
      description,
      images: [ogUrl.toString()],
      title: cardTitle,
    },
  };
}

export function MdxPage({ slug }: { slug: string }) {
  const page = getPage(slug);

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
