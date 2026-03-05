import React from "react";
import { format } from "date-fns";

export default function PitchHistory({ pitches }) {
  const last10 = pitches.slice(-10).reverse();

  if (last10.length === 0) return null;

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-3 py-2 border-b border-border">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Last {Math.min(10, pitches.length)} Pitches
        </h3>
      </div>
      <div className="divide-y divide-border">
        {last10.map((pitch, i) => (
          <div key={pitch.timestamp} className="flex items-center justify-between px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-4">
                {pitches.length - i}
              </span>
              <span className="text-xs font-medium text-secondary-foreground bg-secondary px-2 py-0.5 rounded">
                {pitch.pitchType}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm tabular-nums font-mono text-foreground">
                {pitch.mph.toFixed(1)}
              </span>
              <span className="text-[10px] text-muted-foreground">MPH</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}