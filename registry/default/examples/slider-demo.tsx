import { Slider } from "@/registry/default/ui/slider";

export const SliderDemo = () => (
  <Slider className="mx-auto w-full max-w-xs" defaultValue={[75]} max={100} step={1} />
);
