import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PitchProvider } from "@/components/pitch/PitchContext";
import BottomTabBar from "@/components/pitch/BottomTabBar";
import TimerPage from "./TimerPage";
import HistoryPage from "./HistoryPage";

export default function PitchSpeedTimer() {
  const location = useLocation();

  return (
    <PitchProvider>
      <div
        className="min-h-screen bg-background flex flex-col no-select overflow-hidden"
        style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom))" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<TimerPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </AnimatePresence>

        <BottomTabBar />
      </div>
    </PitchProvider>
  );
}