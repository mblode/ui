import { ShowcaseGrid } from "@/components/sections/showcase-grid";
import ShowcaseHero from "@/components/sections/showcase-hero";

export default function Home() {
  return (
    <div className="flex min-w-0 flex-1 flex-col pb-8 text-[1.05rem] sm:text-[15px]">
      <div className="h-(--top-spacing) shrink-0" />
      <div className="xl:pr-(--sidebar-width)">
        <div className="mx-auto flex w-full min-w-0 max-w-[40rem] flex-col gap-6 py-6 lg:py-8">
          <ShowcaseHero />
        </div>
      </div>
      <div className="px-4 pb-16 md:px-0">
        <ShowcaseGrid />
      </div>
    </div>
  );
}
