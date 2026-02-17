import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div
      className="relative z-10 flex min-h-svh flex-col bg-background"
      data-slot="layout"
    >
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </div>
  );
}
