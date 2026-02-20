import { BarList } from "@/registry/default/ui/bar-list";

const data = [
  { name: "Search", value: 72 },
  { name: "Email", value: 58 },
  { name: "Social", value: 33 },
  { name: "Referral", value: 19 },
];

export function BarListDemo() {
  return (
    <BarList
      className="w-full max-w-md"
      data={data}
      valueFormatter={(value) => `${value}%`}
    />
  );
}
