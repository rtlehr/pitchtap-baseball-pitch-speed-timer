import React, { useEffect } from "react";
import { motion } from "framer-motion";
import RadarDisplay from "@/components/pitch/RadarDisplay";
import TapButton from "@/components/pitch/TapButton";
import PitchTypeSelector from "@/components/pitch/PitchTypeSelector";
import DistancePicker from "@/components/pitch/DistancePicker";
import StatsPanel from "@/components/pitch/StatsPanel";
import ActionButtons from "@/components/pitch/ActionButtons";
import HelpModal from "@/components/pitch/HelpModal";
import PitcherNameModal from "@/components/pitch/PitcherNameModal";
import OutlierDialog from "@/components/pitch/OutlierDialog";
import { usePitch } from "@/components/pitch/PitchContext";

export default function TimerPage() {
  const {
    pitches, distanceFeet, setDistanceFeet, pitchType, setPitchType,
    status, lastMph, elapsedDisplay, sessionHigh, animFrameRef,
    outlierData, pitcherName, showNameModal, showHelp, setShowHelp,
    handleTap, handleOutlierRecord, handleOutlierDiscard,
    handleUndo, handleResetType, handleResetAll, handleNewPitcher, handleNameConfirm,
  } = usePitch();

  // Running timer display
  useEffect(() => {
    if (status === "timing") {
      let startTime = null;
      const { setElapsedDisplay } = require("@/components/pitch/PitchContext");
      // animFrameRef is managed in context; display updates happen via context tick
    }
  }, [status]);

  return (
    <motion.div
      key="timer"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.22 }}
      className="flex flex-col items-center px-4 py-6 max-w-lg mx-auto w-full"
    >
      {/* Header */}
      <div className="w-full relative text-center mb-4">
        <h1 className="text-lg font-black uppercase tracking-[0.2em] text-primary">
          Pitch Speed Timer
        </h1>
        {pitcherName && (
          <p className="text-sm font-bold text-muted-foreground mt-0.5">⚾ {pitcherName}</p>
        )}
        <button
          onClick={() => setShowHelp(true)}
          className="absolute right-0 top-0 w-6 h-6 rounded-full border border-muted-foreground text-muted-foreground text-xs font-bold hover:border-primary hover:text-primary transition-colors flex items-center justify-center"
        >
          ?
        </button>
      </div>

      <div className="w-full mb-4">
        <DistancePicker distance={distanceFeet} onChange={setDistanceFeet} />
      </div>

      <div className="w-full mb-6">
        <PitchTypeSelector selected={pitchType} onChange={setPitchType} />
      </div>

      <div className="mb-6">
        <RadarDisplay
          status={status}
          lastMph={lastMph}
          sessionHigh={sessionHigh}
          elapsedDisplay={elapsedDisplay}
        />
      </div>

      <div className="mb-8">
        <TapButton status={status} onTap={handleTap} />
      </div>

      <div className="w-full space-y-4">
        <StatsPanel pitches={pitches} selectedType={pitchType} />
        <ActionButtons
          pitches={pitches}
          selectedType={pitchType}
          distanceFeet={distanceFeet}
          pitcherName={pitcherName}
          onUndo={handleUndo}
          onResetType={handleResetType}
          onResetAll={handleResetAll}
          onNewPitcher={handleNewPitcher}
        />
      </div>

      <HelpModal open={showHelp} onClose={setShowHelp} />
      <PitcherNameModal open={showNameModal} onConfirm={handleNameConfirm} />
      <OutlierDialog
        open={!!outlierData}
        mph={outlierData?.mph}
        onRecord={handleOutlierRecord}
        onDiscard={handleOutlierDiscard}
      />
    </motion.div>
  );
}