"use client";

import { FileDownloadIcon, LoaderIcon } from "@fingertip/icons";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/registry/default/ui/button";

interface RepoDownloadProps {
  url: string;
}

export default function RepoDownload({ url }: RepoDownloadProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    try {
      window.location.href = url;
    } catch (error) {
      toast.error("Error occured while downloading. Please try again.");
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="not-prose group relative w-full gap-2"
      loading
    >
      Free download
    </Button>
  );
}
