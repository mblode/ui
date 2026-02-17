"use client";

import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  value: ReactNode;
  description?: ReactNode;
};

export const Stat = ({ title, value, description }: Props) => {
  return (
    <div className="flex flex-col rounded-3xl border-0.5 text-center border-border bg-card p-4">
      <dd className="h1">{value}</dd>
      <dt className="truncate font-medium">{title}</dt>
      {description && (
        <div className="text-sm text-muted-foreground">{description}</div>
      )}
    </div>
  );
};
