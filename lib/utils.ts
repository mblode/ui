import clsx from "clsx";
import type { ClassValue } from "clsx";
import type { Metadata } from "next";
import { twMerge } from "tailwind-merge";
import { env } from "@/env.mjs";

const WHITESPACE_REGEX = /\s+/;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function humanize(name: string): string {
  return name
    .replaceAll("-", " ")
    .replaceAll(/([A-Z])/g, " $1")
    .trim()
    .split(WHITESPACE_REGEX)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const truncate = (str: string | null, length: number) => {
  if (!str || str.length <= length) {
    return str;
  }
  return `${str.slice(0, length - 3)}...`;
};

export const fetcher = (...args: Parameters<typeof fetch>) =>
  fetch(...args).then((res) => res.json());

/**
 * Capitalizes first letters of words in string.
 * @param {string} str String to be modified
 * @param {boolean=false} lower Whether all other letters should be lowercased
 * @return {string}
 * @see https://stackoverflow.com/questions/2332811/capitalize-words-in-string/7592235#7592235
 * @usage
 *   capitalize('fix this string');     // -> 'Fix This String'
 *   capitalize('javaSCrIPT');          // -> 'JavaSCrIPT'
 *   capitalize('javaSCrIPT', true);    // -> 'Javascript'
 */
export const capitalize = (str: string, lower = false) =>
  (lower ? str.toLowerCase() : str).replaceAll(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase(),
  );

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function constructMetadata({
  title = "Blode UI - Modern React + Tailwind CSS components",
  description = "Blode UI is a curated collection of the best landing page components built using React + Tailwind CSS + Motion",
  image = absoluteUrl("/opengraph-image"),
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  [key: string]: Metadata[keyof Metadata];
}): Metadata {
  return {
    authors: [
      {
        name: "dillionverma",
        url: "https://twitter.com/dillionverma",
      },
    ],
    creator: "dillionverma",
    description,
    icons: "/favicon.ico",
    keywords: ["React", "Tailwind CSS", "Motion", "Landing Page", "Components", "Next.js"],
    metadataBase: new URL("https://ui.blode.co"),
    openGraph: {
      description,
      images: [
        {
          height: 630,
          url: image,
          width: 1200,
        },
      ],
      title,
      type: "website",
    },
    title,
    twitter: {
      card: "summary_large_image",
      creator: "@dillionverma",
      description,
      images: [image],
      title,
    },
    ...props,
  };
}

export const pluralize = (count: number | undefined, singular: string, plural?: string) =>
  count === 1 ? singular : plural || `${singular}s`;
