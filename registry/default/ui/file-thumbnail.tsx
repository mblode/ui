"use client";

import { FileIcon } from "blode-icons-react";
import * as React from "react";

import { cn } from "@/lib/utils";

interface FileThumbnailProps extends Omit<React.ComponentProps<"div">, "style"> {
  /** The file to preview. Images render a thumbnail; everything else shows a
   *  file icon with the truncated filename. */
  file: File;
  /** Side length of the square tile in pixels. Defaults to 64. */
  size?: number;
}

// ─── FileThumbnail ──────────────────────────────────────────────────────────
// A square preview tile for an attached file. Images render via an object URL
// (revoked on unmount); all other types fall back to a file icon + name. No
// PDF rasterization — keeps the component dependency-free.
function FileThumbnail({ file, size = 64, className, ...props }: FileThumbnailProps) {
  const isImage = file.type.startsWith("image/");
  const [url, setUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isImage) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, isImage]);

  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border border-border bg-card",
        className,
      )}
      data-slot="file-thumbnail"
      style={{ height: size, width: size }}
      {...props}
    >
      {isImage && url ? (
        // eslint-disable-next-line next/no-img-element -- object-URL blob preview, not a remote asset
        <img alt={file.name} className="h-full w-full object-cover" src={url} />
      ) : (
        <>
          <FileIcon className="size-5 text-muted-foreground" />
          <span className="max-w-full truncate px-1.5 text-[10px] text-muted-foreground leading-none">
            {file.name}
          </span>
        </>
      )}
    </div>
  );
}

export { FileThumbnail };
export type { FileThumbnailProps };
