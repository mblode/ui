import { ImageResponse } from "next/og";

const DEFAULT_TITLE = "blode/ui";
const DEFAULT_DESCRIPTION =
  "Beautifully designed components built with React, Tailwind CSS, and Motion.";

const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const;

interface FontAsset {
  data: Buffer;
  name: string;
  style: "normal";
  weight: 400 | 600;
}

export interface OgImageOptions {
  description?: string | null;
  height?: number;
  title?: string | null;
  width?: number;
}

function clampText(
  value: string | null | undefined,
  fallback: string,
  maxLength: number
) {
  const text = value?.trim();
  if (!text) {
    return fallback;
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1)}…`;
}

function getTitleSize(title: string) {
  if (title.length > 90) {
    return 52;
  }

  if (title.length > 64) {
    return 62;
  }

  if (title.length > 40) {
    return 72;
  }

  return 86;
}

async function loadFonts(): Promise<FontAsset[]> {
  const [
    { base64Font: normal },
    { base64Font: mono },
    { base64Font: semibold },
  ] = await Promise.all([
    import("./geist-regular-otf.json").then((mod) => mod.default || mod),
    import("./geistmono-regular-otf.json").then((mod) => mod.default || mod),
    import("./geist-semibold-otf.json").then((mod) => mod.default || mod),
  ]);

  return [
    {
      name: "Geist",
      data: Buffer.from(normal, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist Mono",
      data: Buffer.from(mono, "base64"),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Geist",
      data: Buffer.from(semibold, "base64"),
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

export async function createOgImage(options: OgImageOptions = {}) {
  const title = clampText(options.title, DEFAULT_TITLE, 110);
  const description = clampText(options.description, DEFAULT_DESCRIPTION, 160);
  const fonts = await loadFonts();
  const titleSize = getTitleSize(title);

  return new ImageResponse(
    <div
      style={{ fontFamily: "Geist" }}
      tw="relative flex h-full w-full bg-white text-black"
    >
      <div
        style={{
          background:
            "radial-gradient(circle at 12% 8%, #f5f5f5 0%, rgba(245, 245, 245, 0) 48%)",
        }}
        tw="absolute inset-0"
      />

      <div tw="flex border absolute border-neutral-300 border-dashed inset-y-0 left-16 w-[1px]" />
      <div tw="flex border absolute border-neutral-300 border-dashed inset-y-0 right-16 w-[1px]" />
      <div tw="flex border absolute border-neutral-300 inset-x-0 h-[1px] top-16" />
      <div tw="flex border absolute border-neutral-300 inset-x-0 h-[1px] bottom-16" />

      <div tw="absolute left-28 top-24 flex items-center">
        <div tw="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-[34px] text-white font-semibold">
          b
        </div>
        <div tw="ml-4 text-[38px] tracking-tight font-semibold">blode/ui</div>
      </div>

      <div tw="absolute inset-28 flex flex-col justify-center">
        <div tw="flex items-center">
          <div tw="h-2 w-2 rounded-full bg-neutral-500" />
          <div
            style={{ fontFamily: "Geist Mono" }}
            tw="ml-3 text-[24px] text-neutral-600"
          >
            component library
          </div>
        </div>

        <div
          style={{
            fontSize: titleSize,
            letterSpacing: "-0.04em",
          }}
          tw="mt-10 leading-[1.03] font-semibold"
        >
          {title}
        </div>

        <div tw="mt-8 max-w-[920px] text-[34px] leading-[1.3] text-neutral-600">
          {description}
        </div>
      </div>

      <div tw="absolute bottom-24 right-24 flex items-center">
        <div tw="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-300 bg-white text-[30px] text-black font-semibold">
          /
        </div>
        <div tw="ml-3 text-[34px] text-neutral-700 tracking-tight">
          blode/ui
        </div>
      </div>
    </div>,
    {
      width: options.width ?? OG_IMAGE_SIZE.width,
      height: options.height ?? OG_IMAGE_SIZE.height,
      fonts,
    }
  );
}

export const ogImageAlt = "blode/ui";
export const ogImageSize = OG_IMAGE_SIZE;
export const ogImageContentType = "image/png";
