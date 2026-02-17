"use client";

import { CircleCheckIcon, CirclePlaceholderDashedIcon } from "@fingertip/icons";
import { ReactNode } from "react";

export const ProgressList = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col space-y-1">{children}</div>;
};

export const ProgressItem = ({
  title,
  completed,
}: {
  title: string;
  completed: boolean;
}) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <div className="shrink-0">
        {completed ? (
          <CircleCheckIcon className="size-4" />
        ) : (
          <CirclePlaceholderDashedIcon className="size-4" />
        )}
      </div>
      <div className="flex-1 text-left">{title}</div>
    </div>
  );
};
