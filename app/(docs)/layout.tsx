import { DocsSidebar } from "@/components/docs-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { docsConfig } from "@/config/docs";
import { SidebarProvider } from "@/registry/default/ui/sidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default async function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="relative z-10 flex min-h-svh flex-col bg-background" data-slot="layout">
      <SiteHeader />
      <main className="flex flex-1 flex-col">
        <div className="container-wrapper flex flex-1 flex-col px-2">
          <SidebarProvider
            className="min-h-min flex-1 items-start px-0 [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--top-spacing:calc(var(--spacing)*4)]"
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
              } as React.CSSProperties
            }
          >
            <DocsSidebar items={docsConfig.sidebarNav} />
            <div className="h-full w-full">{children}</div>
          </SidebarProvider>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
