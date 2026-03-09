import React from "react";

function StatBox({ label, value, unit = "MPH", small = false }) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
      <p className={`font-black tabular-nums font-mono ${small ? "text-base" : "text-lg"} text-foreground`}>
        {value !== null && value !== undefined ? (typeof value === "number" ? value.toFixed(1) : value) : "—"}
      </p>
      {value !== null && value !== undefined && (
        <p className="text-[9px] text-muted-foreground">{unit}</p>
      )}
    </div>
  );
}

export default function StatsPanel({ pitches, selectedType, strikeBallLog }) {
  const allSpeeds = pitches.map((p) => p.mph);
  const typeSpeeds = pitches.filter((p) => p.pitchType === selectedType).map((p) => p.mph);

  const avg = (arr) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null);
  const hi = (arr) => (arr.length ? Math.max(...arr) : null);
  const lo = (arr) => (arr.length ? Math.min(...arr) : null);

  const strikes = strikeBallLog.filter((x) => (x?.result ?? x) === "strike").length;
  const totalCalled = strikeBallLog.length;
  const strikePercent = totalCalled > 0 ? (strikes / totalCalled) * 100 : null;

  return (
    <div className="space-y-3">
      {/* Overall stats */}
      <div className="grid grid-cols-4 gap-2 bg-card rounded-xl p-3 border border-border">
        <StatBox label="Avg" value={avg(allSpeeds)} />
        <StatBox label="Count" value={pitches.length} unit="pitches" />
        <StatBox label="High" value={hi(allSpeeds)} />
        <StatBox label="Low" value={lo(allSpeeds)} />
      </div>

      {/* Strike % */}
      {totalCalled > 0 && (
        <div className="grid grid-cols-3 gap-2 bg-card rounded-xl p-3 border border-border">
          <StatBox label="Strike %" value={strikePercent} unit="%" />
          <StatBox label="Strikes" value={strikes} unit="called" />
          <StatBox label="Balls" value={totalCalled - strikes} unit="called" />
        </div>
      )}

      {/* Selected type stats */}
      {typeSpeeds.length > 0 && (
        <div className="grid grid-cols-4 gap-2 bg-card rounded-xl p-3 border border-border">
          <StatBox label={`${selectedType} Avg`} value={avg(typeSpeeds)} small />
          <StatBox label={`${selectedType} #`} value={typeSpeeds.length} unit="pitches" small />
          <StatBox label={`${selectedType} Hi`} value={hi(typeSpeeds)} small />
          <StatBox label={`${selectedType} Lo`} value={lo(typeSpeeds)} small />
        </div>
      )}
    </div>
  );
}