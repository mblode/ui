"use client";

import autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

export default function CarouselPlugin() {
  const plugin = useMemo(() => autoplay({ delay: 2000, stopOnInteraction: true }), []);

  const handleMouseEnter = () => plugin.stop();
  const handleMouseLeave = () => plugin.reset();

  return (
    <Carousel
      className="w-full max-w-[10rem] sm:max-w-xs"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      plugins={[plugin]}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold text-4xl">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
