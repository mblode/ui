import {
  BookmarkIcon,
  HeartIcon,
  InboxIcon,
  StarIcon,
} from "blode-icons-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/default/ui/empty";

export default function EmptyIcon() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyMedia>
          <EmptyTitle>No messages</EmptyTitle>
          <EmptyDescription>
            Your inbox is empty. New messages will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <StarIcon />
          </EmptyMedia>
          <EmptyTitle>No favorites</EmptyTitle>
          <EmptyDescription>
            Items you mark as favorites will appear here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <HeartIcon />
          </EmptyMedia>
          <EmptyTitle>No likes yet</EmptyTitle>
          <EmptyDescription>
            Content you like will be saved here for easy access.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>

      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BookmarkIcon />
          </EmptyMedia>
          <EmptyTitle>No bookmarks</EmptyTitle>
          <EmptyDescription>
            Save interesting content by bookmarking it.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
