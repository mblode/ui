import { Button } from "@/registry/default/ui/button";
import { ScrollMenu } from "@/registry/default/ui/scroll-menu";

export default function ScrollMenuDemo() {
  return (
    <ScrollMenu className="w-full">
      {Array.from({ length: 20 }).map((_, i) => (
        <Button
          key={i}
          variant="ghost"
          className="flex-shrink-0 mx-1 whitespace-nowrap"
        >
          Menu Item {i + 1}
        </Button>
      ))}
    </ScrollMenu>
  );
}
