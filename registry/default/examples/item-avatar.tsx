import { Plus } from "blode-icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";

export const ItemAvatar = () => (
  <div className="flex w-full max-w-lg flex-col gap-6">
    <Item variant="outline">
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src="https://avatars.githubusercontent.com/u/6880091?v=4" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Evil Rabbit</ItemTitle>
        <ItemDescription>Last seen 5 months ago</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button aria-label="Invite" className="rounded-full" size="icon-sm" variant="outline">
          <Plus />
        </Button>
      </ItemActions>
    </Item>
    <Item variant="outline">
      <ItemMedia>
        <div className="flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale">
          <Avatar className="hidden sm:flex">
            <AvatarImage alt="@shadcn" src="https://avatars.githubusercontent.com/u/124599?v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="hidden sm:flex">
            <AvatarImage
              alt="@maxleiter"
              src="https://avatars.githubusercontent.com/u/8675906?v=4"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage
              alt="@evilrabbit"
              src="https://avatars.githubusercontent.com/u/6880091?v=4"
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>No Team Members</ItemTitle>
        <ItemDescription>Invite your team to collaborate on this project.</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Invite
        </Button>
      </ItemActions>
    </Item>
  </div>
);
