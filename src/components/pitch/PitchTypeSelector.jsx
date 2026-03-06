import React from "react";

const ROW1 = ["4-Seam", "2-Seam", "Change-up"];
const ROW2 = ["Curve", "Slider", "Misc"];

export default function PitchTypeSelector({ selected, onChange }) {
  const renderRow = (types) => (
    <div className="flex">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`
            no-select flex-1 py-2.5 px-2 text-xs font-bold uppercase tracking-wider
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

  return (
    <div className="rounded-lg overflow-hidden border border-border divide-y divide-border">
      {renderRow(ROW1)}
      {renderRow(ROW2)}
    </div>
  );
}