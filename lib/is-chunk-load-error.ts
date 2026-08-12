/**
 * Next.js soft navigations fetch route JS chunks. A brief offline blip or a
 * deploy that retires old chunks surfaces as ChunkLoadError — soft reset()
 * cannot recover; a full page load is required.
 */
export const isChunkLoadError = (error: unknown): boolean => {
  if (!error || typeof error !== "object") {
    return false;
  }

  const name = "name" in error && typeof error.name === "string" ? error.name : "";
  const message = "message" in error && typeof error.message === "string" ? error.message : "";

  return (
    name === "ChunkLoadError" ||
    /loading chunk [\w./-]+ failed/iu.test(message) ||
    /failed to load chunk/iu.test(message)
  );
};
