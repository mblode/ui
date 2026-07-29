import { PlusIcon } from "blode-icons-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/default/ui/avatar";
import { Button } from "@/registry/default/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";

const people = [
  {
    avatar: "https://avatars.githubusercontent.com/u/124599?v=4",
    email: "shadcn@vercel.com",
    username: "shadcn",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/8675906?v=4",
    email: "maxleiter@vercel.com",
    username: "maxleiter",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/6880091?v=4",
    email: "evilrabbit@vercel.com",
    username: "evilrabbit",
  },
];

export const ItemGroupExample = () => (
  <ItemGroup className="max-w-sm">
    {people.map((person, _index) => (
      <Item key={person.username} variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarImage className="grayscale" src={person.avatar} />
            <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent className="gap-1">
          <ItemTitle>{person.username}</ItemTitle>
          <ItemDescription>{person.email}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button className="rounded-full" size="icon" variant="ghost">
            <PlusIcon />
          </Button>
        </ItemActions>
      </Item>
    ))}
  </ItemGroup>
);
