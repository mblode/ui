"use client";

import { Stat } from "@/registry/default/ui/stat";

export default function StatDemo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Stat
        title="Total Revenue"
        value="$45,231.89"
        description="+20.1% from last month"
      />
      <Stat
        title="New Customers"
        value="2,350"
        description="+180 in the last 24 hours"
      />
      <Stat
        title="Active Users"
        value="17,329"
        description="+19% from last week"
      />
    </div>
  );
}
