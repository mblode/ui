import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/registry/default/ui/sonner";
import { TooltipProvider } from "@/registry/default/ui/tooltip";
import localFont from "next/font/local";
import { absoluteUrl, cn, constructMetadata } from "@/lib/utils";
import { Provider as JotaiProvider } from "jotai";
import { GoogleTagManager } from "@next/third-parties/google";

import "@/styles/globals.css";

const glide = localFont({
  src: [
    {
      path: "../public/Glide-Variable.woff2",
    },
  ],
  variable: "--font-glide",
  weight: "400 900",
  display: "swap",
});

import type { Viewport } from "next";
import { Metadata } from "next";

export const metadata: Metadata = constructMetadata({
  title: "Fingertip UI",
  description: "Fingertip.com's UI components.",
  image: absoluteUrl("/og"),
});

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
      <head />
      <GoogleTagManager gtmId="GTM-PWKVQTZ6" />
      <body
        className={cn(
          "relative flex w-full flex-col justify-center overflow-x-hidden scroll-smooth bg-background font-sans antialiased",
          glide.variable,
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
