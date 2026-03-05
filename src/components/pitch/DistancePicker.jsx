import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PRESETS = [
  { value: "60.5", label: "60.5 ft (MLB / HS)" },
  { value: "54", label: "54 ft" },
  { value: "50", label: "50 ft" },
  { value: "46", label: "46 ft" },
  { value: "40", label: "40 ft" },
];

export default function DistancePicker({ distance, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider whitespace-nowrap">
        Distance
      </span>
      <Select value={String(distance)} onValueChange={(v) => onChange(parseFloat(v))}>
        <SelectTrigger className="w-full bg-secondary border-border text-sm font-bold">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {PRESETS.map((p) => (
            <SelectItem key={p.value} value={p.value}>
              {p.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}