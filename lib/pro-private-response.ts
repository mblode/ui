export const PRO_PRIVATE_HEADERS = {
  "cache-control": "private, no-store, max-age=0",
  "cdn-cache-control": "no-store",
  pragma: "no-cache",
  "vercel-cdn-cache-control": "no-store",
} as const;

export function proErrorResponse(error: string, status: number, extraHeaders?: HeadersInit) {
  return Response.json({ error }, { headers: { ...PRO_PRIVATE_HEADERS, ...extraHeaders }, status });
}
