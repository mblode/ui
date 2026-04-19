import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|\\.well-known|r/|[\\w-]+\\.\\w+).*)"],
};

const MARKDOWN_MEDIA_TYPE = /(^|,\s*)text\/markdown(\s*;|\s*,|\s*$)/i;

function prefersMarkdown(accept: string | null): boolean {
  if (!accept) {
    return false;
  }
  return MARKDOWN_MEDIA_TYPE.test(accept);
}

export default function proxy(request: NextRequest) {
  const accept = request.headers.get("accept");

  if (prefersMarkdown(accept)) {
    const url = request.nextUrl.clone();
    const originalPath = url.pathname.replace(/\/$/, "") || "/";
    url.pathname = `/api/markdown${originalPath === "/" ? "" : originalPath}`;
    const rewritten = NextResponse.rewrite(url);
    rewritten.headers.set("Vary", "Accept");
    return rewritten;
  }

  const response = NextResponse.next();
  response.headers.set("Vary", "Accept");
  return response;
}
