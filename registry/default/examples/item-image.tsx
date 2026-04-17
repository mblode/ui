import Image from "next/image";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";

const music = [
  {
    album: "Electric Nights",
    artist: "Neon Dreams",
    duration: "3:45",
    title: "Midnight City Lights",
  },
  {
    album: "Urban Stories",
    artist: "The Morning Brew",
    duration: "4:05",
    title: "Coffee Shop Conversations",
  },
  {
    album: "Binary Beats",
    artist: "Cyber Symphony",
    duration: "3:30",
    title: "Digital Rain",
  },
];

export function ItemImage() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup className="gap-4">
        {music.map((song) => (
          <Item asChild key={song.title} role="listitem" variant="outline">
            <a href="#">
              <ItemMedia variant="image">
                <Image
                  alt={song.title}
                  className="object-cover grayscale"
                  height={32}
                  src={`https://avatar.vercel.sh/${song.title}`}
                  width={32}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="line-clamp-1">
                  {song.title} - <span className="text-muted-foreground">{song.album}</span>
                </ItemTitle>
                <ItemDescription>{song.artist}</ItemDescription>
              </ItemContent>
              <ItemContent className="flex-none text-center">
                <ItemDescription>{song.duration}</ItemDescription>
              </ItemContent>
            </a>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
