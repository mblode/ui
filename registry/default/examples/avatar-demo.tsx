import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/registry/default/ui/avatar";

export default function AvatarDemo() {
  return (
    <div className="flex flex-row flex-wrap items-center gap-6 md:gap-12">
      <Avatar>
        <AvatarImage
          alt="@shadcn"
          className="grayscale"
          src="https://avatars.githubusercontent.com/u/124599?v=4"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage alt="@evilrabbit" src="https://avatars.githubusercontent.com/u/6880091?v=4" />
        <AvatarFallback>ER</AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>
      <AvatarGroup className="grayscale">
        <Avatar>
          <AvatarImage alt="@shadcn" src="https://avatars.githubusercontent.com/u/124599?v=4" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage alt="@maxleiter" src="https://avatars.githubusercontent.com/u/8675906?v=4" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarImage
            alt="@evilrabbit"
            src="https://avatars.githubusercontent.com/u/6880091?v=4"
          />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+3</AvatarGroupCount>
      </AvatarGroup>
    </div>
  );
}
