import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PRESETS = [
  { value: "60.5", label: "60.5 ft", sub: "MLB / High School" },
  { value: "54", label: "54 ft", sub: "Middle School" },
  { value: "50", label: "50 ft", sub: "Little League (11-12)" },
  { value: "46", label: "46 ft", sub: "Little League (9-10)" },
  { value: "40", label: "40 ft", sub: "Little League (7-8)" },
];

export default function DistancePicker({ distance, onChange }) {
  const [open, setOpen] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const selected = PRESETS.find((p) => p.value === String(distance));
  const displayLabel = selected ? selected.label : `${distance} ft`;
  const displaySub = selected ? selected.sub : "Custom";

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider whitespace-nowrap">
          Distance
        </span>
        <button
          onClick={() => setOpen(true)}
          className="flex-1 flex items-center justify-between px-3 py-2 rounded-lg bg-secondary border border-border text-sm font-bold text-foreground"
        >
          <span>{selected.label}</span>
          <span className="text-xs text-muted-foreground font-normal">{selected.sub}</span>
        </button>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select Pitching Distance</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-8 space-y-1">
            {PRESETS.map((p) => {
              const isActive = p.value === String(distance);
              return (
                <button
                  key={p.value}
                  onClick={() => {
                    onChange(parseFloat(p.value));
                    setOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <div className="text-left">
                    <div className="font-bold text-base">{p.label}</div>
                    <div className="text-xs text-muted-foreground">{p.sub}</div>
                  </div>
                  {isActive && <Check className="w-5 h-5 text-primary" />}
                </button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}