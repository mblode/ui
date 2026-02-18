import Image from "next/image";
import { AspectRatio } from "@/registry/default/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <AspectRatio className="w-full max-w-sm rounded-lg bg-muted" ratio={16 / 9}>
      <Image
        alt="Photo"
        className="rounded-lg object-cover grayscale dark:brightness-20"
        fill
        src="https://avatar.vercel.sh/shadcn1"
      />
    </AspectRatio>
  );
}
