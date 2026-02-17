import { Button } from "@/registry/default/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemMedia,
  ItemTitle,
} from "@/registry/default/ui/item";
import { Progress } from "@/registry/default/ui/progress";
import { Spinner } from "@/registry/default/ui/spinner";

export default function SpinnerItem() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Downloading...</ItemTitle>
          <ItemDescription>129 MB / 1000 MB</ItemDescription>
        </ItemContent>
        <ItemActions className="hidden sm:flex">
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </ItemActions>
        <ItemFooter>
          <Progress value={75} />
        </ItemFooter>
      </Item>
    </div>
  );
}
