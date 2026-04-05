import { GoogleAnalytics } from "@next/third-parties/google";
import { Provider as JotaiProvider } from "jotai";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/registry/default/ui/sonner";
import { TooltipProvider } from "@/registry/default/ui/tooltip";

import "@/styles/globals.css";

const glide = localFont({
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
  weight: "400 900",
  display: "swap",
});

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  ...constructMetadata({
    title: "Blode UI",
    description: "Blode UI components.",
    image: absoluteUrl("/opengraph-image"),
    appleWebApp: {
      title: "Blode UI",
    },
  }),
  verification: {
    google: "mFwyBIbXTaKK4uF_NA0MzVWFyY40hPgBjFObg3rje04",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;d.classList.add('no-transition');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.classList.add('dark')}requestAnimationFrame(function(){requestAnimationFrame(function(){d.classList.remove('no-transition')})})}catch(e){}})()`}
        </Script>
      </head>
      <GoogleAnalytics gaId="G-KJGWXDQSCP" />
      <body
        className={cn(
          "relative flex w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased [--header-height:calc(var(--spacing)*14)]",
          glide.variable
        )}
      >
        <JotaiProvider>
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider>
              {children}
              <Toaster />
              <Analytics />
            </TooltipProvider>
          </ThemeProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
