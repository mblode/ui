import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/registry/default/ui/meter";

export function MeterDemo() {
  return (
    <Meter className="w-full max-w-sm" value={24}>
      <div className="flex items-center justify-between gap-2">
        <MeterLabel>Storage Used</MeterLabel>
        <MeterValue>{(formattedValue) => `${formattedValue}%`}</MeterValue>
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  );
}
