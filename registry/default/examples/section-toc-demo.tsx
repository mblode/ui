import { SectionToc } from "@/registry/default/blocks/section-toc";

const items = [
  { id: "overview", label: "Overview" },
  { id: "how-it-works", label: "How it works" },
  { id: "faq", label: "FAQ" },
];

export default function SectionTocDemo() {
  return (
    <div className="p-6">
      <SectionToc items={items} />
    </div>
  );
}
