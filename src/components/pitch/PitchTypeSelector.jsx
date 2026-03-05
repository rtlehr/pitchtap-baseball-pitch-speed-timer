import React from "react";

const PITCH_TYPES = ["Fastball", "Curve", "Slider", "Misc"];

export default function PitchTypeSelector({ selected, onChange }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-border">
      {PITCH_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`
            no-select flex-1 py-2.5 px-2 text-xs sm:text-sm font-bold uppercase tracking-wider
            transition-colors
            ${selected === type
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }
          `}
        >
          {type}
        </button>
      ))}
    </div>
  );
}