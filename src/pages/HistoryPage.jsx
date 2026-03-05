import React from "react";
import { motion } from "framer-motion";
import PitchHistory from "@/components/pitch/PitchHistory";
import PullToRefresh from "@/components/pitch/PullToRefresh";
import { usePitch } from "@/components/pitch/PitchContext";

export default function HistoryPage() {
  const { pitches, pitcherName } = usePitch();

  return (
    <motion.div
      key="history"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.22 }}
      className="flex flex-col items-center px-4 py-6 max-w-lg mx-auto w-full"
    >
      <div className="w-full text-center mb-4">
        <h1 className="text-lg font-black uppercase tracking-[0.2em] text-primary">
          Pitch History
        </h1>
        {pitcherName && (
          <p className="text-sm font-bold text-muted-foreground mt-0.5">⚾ {pitcherName}</p>
        )}
      </div>

      <div className="w-full">
        <PullToRefresh onRefresh={() => new Promise((r) => setTimeout(r, 500))}>
          <PitchHistory pitches={pitches} />
        </PullToRefresh>
      </div>
    </motion.div>
  );
}