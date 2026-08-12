"use client";

import { TriangleExclamationIcon } from "blode-icons-react";
import { useEffect } from "react";

import { isChunkLoadError } from "@/lib/is-chunk-load-error";
import { Button } from "@/registry/default/ui/button";

const CHUNK_RELOAD_KEY = "blode-ui:chunk-load-reload";
const RELOAD_COOLDOWN_MS = 10_000;

function reloadForStaleChunk(): void {
  const lastReload = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) ?? "0");
  if (Number.isFinite(lastReload) && Date.now() - lastReload < RELOAD_COOLDOWN_MS) {
    return;
  }
  sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  window.location.reload();
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: Standard Next.js error boundary pattern
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const chunkError = isChunkLoadError(error);

  useEffect(() => {
    console.error(error);

    if (chunkError) {
      reloadForStaleChunk();
    }
  }, [error, chunkError]);

  const recover = () => {
    if (chunkError) {
      sessionStorage.removeItem(CHUNK_RELOAD_KEY);
      window.location.reload();
      return;
    }
    reset();
  };

  return (
    <section>
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center px-6 py-12">
        <div className="mx-auto flex max-w-sm flex-col items-center text-center">
          <p className="rounded-full bg-blue-50 p-3 font-medium text-sm dark:bg-gray-800">
            <TriangleExclamationIcon className="size-6" />
          </p>
          <h1 className="mt-3 font-semibold text-2xl text-gray-800 md:text-3xl dark:text-white">
            {chunkError ? "Page failed to load" : "Something went wrong"}
          </h1>
          <p className="mt-4 text-gray-500 dark:text-gray-400">
            {chunkError
              ? "Reloading usually fixes this after a deploy."
              : "An unexpected error occurred. Please try again."}
          </p>
          <Button className="mt-6" onClick={recover} type="button">
            Try again
          </Button>
        </div>
      </div>
    </section>
  );
}
