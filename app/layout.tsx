import { Provider as JotaiProvider } from "jotai";
import localFont from "next/font/local";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/registry/default/ui/sonner";
import { TooltipProvider } from "@/registry/default/ui/tooltip";

import "@/styles/globals.css";

const glide = localFont({
  display: "swap",
  src: [
    {
      path: "../public/glide-variable.woff2",
      style: "normal",
    },
    {
      path: "../public/glide-variable-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-glide",
  weight: "100 950",
});

const glideMono = localFont({
  display: "swap",
  src: [
    {
      path: "../public/glide-mono.woff2",
      style: "normal",
    },
  ],
  variable: "--font-glide-mono",
  weight: "400",
});

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  ...constructMetadata({
    appleWebApp: {
      title: "Blode UI",
    },
    description: "Blode UI components.",
    image: absoluteUrl("/opengraph-image"),
    title: "Blode UI",
  }),
  // The zone shipped with no robots directives at all, which left Google's
  // defaults in force: a capped text snippet and a thumbnail-sized image. The
  // cap is what AI surfaces read against, and /ui/docs is the most-surfaced
  // page on the domain in them, so the ceiling was costing exactly the surface
  // it was most visible in. blode.co sets the same three at its root.
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  // Pages supply the leaf half of their title; ones that already carry the
  // brand opt out with `title.absolute`.
  title: {
    default: "Blode UI",
    template: "%s | Blode UI",
  },
  verification: {
    google: "mFwyBIbXTaKK4uF_NA0MzVWFyY40hPgBjFObg3rje04",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { color: "white", media: "(prefers-color-scheme: light)" },
    { color: "black", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href={process.env.NEXT_PUBLIC_POSTHOG_HOST} rel="preconnect" />
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;d.classList.add('no-transition');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.remove('no-transition')})})}catch(e){}})()`}
        </Script>
      </head>
      <body
        className={cn(
          "relative flex w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased [--header-height:calc(var(--spacing)*14)]",
          glide.variable,
          glideMono.variable,
        )}
      >
        <JotaiProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
