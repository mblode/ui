import { DocsSidebar } from "@/components/docs-sidebar";
import { docsConfig } from "@/config/docs";
import { SidebarProvider } from "@/registry/default/ui/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
  );
}
