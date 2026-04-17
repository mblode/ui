import type React from "react";

import { cn } from "@/lib/utils";

interface GradientBlurProps {
  className?: string;
  numberOfLayers?: number;
}

const GradientBlur: React.FC<GradientBlurProps> = ({ numberOfLayers = 6, className = "" }) => {
  const generateLayers = () => {
    const layers: React.ReactElement[] = [];
    for (let i = 0; i < numberOfLayers; i++) {
      const blurAmount = 2 ** i;
      const startPercent = (i * 100) / numberOfLayers;
      const midPercent = ((i + 1) * 100) / numberOfLayers;
      const endPercent = ((i + 2) * 100) / numberOfLayers;
      layers.push(
        <div
          className="absolute inset-0"
          key={i}
          style={{
            backdropFilter: `blur(${blurAmount}px)`,
            mask: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0) ${startPercent}%,
              rgba(0, 0, 0, 1) ${midPercent}%,
              rgba(0, 0, 0, 1) ${endPercent}%,
              rgba(0, 0, 0, 0) ${endPercent + (endPercent - midPercent)}%
            )`,
            zIndex: i + 2,
          }}
        />,
      );
    }
    return layers;
  };

  return (
    <div className={cn("pointer-events-none inset-x-0 z-5 h-full", className)}>
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(0.5px)",
          mask: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) ${100 / (numberOfLayers * 4)}%,
            rgba(0, 0, 0, 1) ${100 / (numberOfLayers * 2)}%,
            rgba(0, 0, 0, 0) ${(100 * 3) / (numberOfLayers * 4)}%
          )`,
          zIndex: 1,
        }}
      />
      {generateLayers()}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: `blur(${2 ** numberOfLayers}px)`,
          mask: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) ${100 - 100 / (numberOfLayers * 2)}%,
            rgba(0, 0, 0, 1) 100%
          )`,
          zIndex: numberOfLayers + 2,
        }}
      />
    </div>
  );
};

export default GradientBlur;
