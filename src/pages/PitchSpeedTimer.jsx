import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PitchProvider, usePitch } from "@/components/pitch/PitchContext";
import BottomTabBar from "@/components/pitch/BottomTabBar";
import AppHeader from "@/components/pitch/AppHeader";
import RadarDisplay from "@/components/pitch/RadarDisplay";
import TapButton from "@/components/pitch/TapButton";
import PitchTypeSelector from "@/components/pitch/PitchTypeSelector";
import DistancePicker from "@/components/pitch/DistancePicker";
import StatsPanel from "@/components/pitch/StatsPanel";
import ActionButtons from "@/components/pitch/ActionButtons";
import HelpModal from "@/components/pitch/HelpModal";
import { useState } from "react";
import PitcherNameModal from "@/components/pitch/PitcherNameModal";
import OutlierDialog from "@/components/pitch/OutlierDialog";
import PitchHistory from "@/components/pitch/PitchHistory";
import PullToRefresh from "@/components/pitch/PullToRefresh";

function TimerTab({ onHelp }) {
  const {
    pitches, distanceFeet, setDistanceFeet, pitchType, setPitchType,
    status, lastMph, elapsedDisplay, sessionHigh,
    outlierData, pitcherName, showNameModal,
    handleTap, handleOutlierRecord, handleOutlierDiscard,
    handleUndo, handleResetType, handleResetAll, handleNewPitcher, handleNameConfirm,
  } = usePitch();

  return (
    <motion.div
      key="timer"
      initial={{ x: "-30%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-30%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.2 }}
      className="flex flex-col items-center px-4 py-6 max-w-lg mx-auto w-full"
    >
      <div className="w-full mb-4">
        <DistancePicker distance={distanceFeet} onChange={setDistanceFeet} />
      </div>
      <div className="w-full mb-6">
        <PitchTypeSelector selected={pitchType} onChange={setPitchType} />
      </div>
      <div className="mb-6">
        <RadarDisplay status={status} lastMph={lastMph} sessionHigh={sessionHigh} elapsedDisplay={elapsedDisplay} />
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

function HistoryTab() {
  const { pitches, pitcherName } = usePitch();
  return (
    <motion.div
      key="history"
      initial={{ x: "30%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "30%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.2 }}
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

export default function PitchSpeedTimer() {
  const location = useLocation();
  const navigate = useNavigate();
  // Derive active tab from URL hash for sub-navigation within this page
  const hash = location.hash; // "#history" or ""
  const activeTab = hash === "#history" ? "history" : "timer";

  const handleTabChange = (tab) => {
    if (tab === "history") {
      navigate("#history", { replace: false });
    } else {
      navigate("#", { replace: false });
    }
  };

  return (
    <PitchProvider>
      <div
        className="min-h-screen bg-background flex flex-col no-select overflow-x-hidden"
        style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom))" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {activeTab === "timer" ? (
            <TimerTab key="timer" />
          ) : (
            <HistoryTab key="history" />
          )}
        </AnimatePresence>

        <BottomTabBar activeTab={activeTab} onChange={handleTabChange} />
      </div>
    </PitchProvider>
  );
}