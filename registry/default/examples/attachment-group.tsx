import { CodeIcon, FileTextIcon, TableIcon, XIcon } from "blode-icons-react";
import Image from "next/image";
import type * as React from "react";

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/registry/default/ui/attachment";

interface Item {
  name: string;
  meta: string;
  icon?: React.ComponentType<React.ComponentProps<"svg">>;
  src?: string;
}

const items: Item[] = [
  { icon: FileTextIcon, meta: "PDF · 1.4 MB", name: "briefing-notes.pdf" },
  {
    meta: "PNG · 820 KB",
    name: "workspace.png",
    src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
  },
  { icon: TableIcon, meta: "CSV · 18 KB", name: "customers.csv" },
  { icon: CodeIcon, meta: "TSX · 12 KB", name: "renderer.tsx" },
];

export default function AttachmentGroupDemo() {
  return (
    <div className="mx-auto w-full max-w-sm py-12">
      <AttachmentGroup className="w-full">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Attachment className="w-64" key={item.name}>
              {item.src ? (
                <AttachmentMedia variant="image">
                  <Image alt={item.name} fill sizes="40px" src={item.src} />
                </AttachmentMedia>
              ) : null}
              {!item.src && Icon ? (
                <AttachmentMedia>
                  <Icon />
                </AttachmentMedia>
              ) : null}
              <AttachmentContent>
                <AttachmentTitle>{item.name}</AttachmentTitle>
                <AttachmentDescription>{item.meta}</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction aria-label={`Remove ${item.name}`}>
                  <XIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          );
        })}
      </AttachmentGroup>
    </div>
  );
}
