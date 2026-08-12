"use client";

import { useEffect } from "react";

import { isChunkLoadError } from "@/lib/is-chunk-load-error";

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

export default function GlobalError({
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
    <html lang="en">
      <body
        style={{
          alignItems: "center",
          background: "#ffffff",
          color: "#171717",
          display: "flex",
          flexDirection: "column",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          gap: "1rem",
          justifyContent: "center",
          margin: 0,
          minHeight: "100vh",
          padding: "6rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.75rem", fontWeight: 600, margin: 0 }}>
          {chunkError ? "Page failed to load" : "Something went wrong"}
        </h1>
        <p style={{ color: "#525252", margin: 0, maxWidth: "32rem" }}>
          {chunkError
            ? "Reloading usually fixes this after a deploy."
            : "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={recover}
          style={{
            background: "#171717",
            border: "none",
            borderRadius: "0.375rem",
            color: "#ffffff",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
          }}
          type="button"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
