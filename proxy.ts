import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import docPaths from "@/lib/generated/doc-paths.json";

export const config = {
  matcher: ["/((?!_next|api|\\.well-known|r/|[\\w-]+\\.\\w+).*)"],
};

const MARKDOWN_MEDIA_TYPE = /(?:^|,\s*)text\/markdown(?:\s*;|\s*,|\s*$)/iu;
const TRAILING_SLASHES = /\/+$/u;

/*
 * `docs/[[...slug]]` matches every path below `/docs`, and under Cache
 * Components an unmatched param is answered with the route's prerendered App
 * Shell: a 200 already sent before the slug is read, so the `notFound()` inside
 * the Suspense boundary can only swap the body. `/ui/docs/anything` read to a
 * crawler as a real page. `dynamicParams = false`, the documented cure, is
 * rejected by `next build` while `cacheComponents` is on.
 *
 * Every other route in the zone is a file now, so an unknown path outside
 * `/docs` matches nothing and Vercel answers it with a real 404. This rewrite
 * puts unknown doc paths in the same position. The target deliberately matches
 * no route: a rewrite cannot carry a status of its own, because Next propagates
 * a middleware status only for redirects, so the 404 has to come from the
 * routing layer instead.
 *
 * `doc-paths.json` is written by `content-collections.ts` on every build.
 * Importing the collection itself here would pull megabytes of compiled MDX into
 * the proxy bundle.
 */
const DOC_PATHS = new Set<string>(docPaths);
const UNMATCHED_PATH = "/__not-found__";

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) {
    return false;
  }
  return MARKDOWN_MEDIA_TYPE.test(accept);
}

function isUnknownDocPath(pathname: string): boolean {
  if (pathname !== "/docs" && !pathname.startsWith("/docs/")) {
    return false;
  }
  return !DOC_PATHS.has(pathname);
}

export default function proxy(request: NextRequest) {
  const accept = request.headers.get("accept");
  const pathname = request.nextUrl.pathname.replace(TRAILING_SLASHES, "") || "/";

  if (prefersMarkdown(accept)) {
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${pathname === "/" ? "" : pathname}`;
    const rewritten = NextResponse.rewrite(url);
    rewritten.headers.set("Vary", "Accept");
    return rewritten;
  }

  if (isUnknownDocPath(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = UNMATCHED_PATH;
    const rewritten = NextResponse.rewrite(url);
    rewritten.headers.set("Vary", "Accept");
    return rewritten;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}
