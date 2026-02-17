"use client";

import React from "react";
import { BarList } from "@/registry/default/ui/bar-list";
import {
  PeopleCircleIcon,
  ShoppingBag1Icon,
  FileTextIcon,
  Chart4Icon,
  LineChart1Icon,
} from "@fingertip/icons";

export default function BarListDemo() {
  const data = [
    {
      name: "New Users",
      value: 2453,
      icon: PeopleCircleIcon,
    },
    {
      name: "Purchases",
      value: 1830,
      icon: ShoppingBag1Icon,
    },
    {
      name: "Documents",
      value: 1650,
      icon: FileTextIcon,
    },
    {
      name: "Engagement",
      value: 1120,
      icon: Chart4Icon,
    },
    {
      name: "Page Views",
      value: 940,
      icon: LineChart1Icon,
    },
  ];

  return (
    <div className="w-full">
      <BarList
        data={data}
        valueFormatter={(value) => `${value.toLocaleString()}`}
        className="mt-2"
      />
    </div>
  );
}
