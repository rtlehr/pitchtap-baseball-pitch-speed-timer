import React, { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";
import RadarDisplay from "@/components/pitch/RadarDisplay";
import TapButton from "@/components/pitch/TapButton";
import PitchTypeSelector from "@/components/pitch/PitchTypeSelector";
import DistancePicker from "@/components/pitch/DistancePicker";
import StatsPanel from "@/components/pitch/StatsPanel";
import PitchHistory from "@/components/pitch/PitchHistory";
import ActionButtons from "@/components/pitch/ActionButtons";
import OutlierDialog from "@/components/pitch/OutlierDialog";
import PitcherNameModal from "@/components/pitch/PitcherNameModal";

const REACTION_OFFSET = 0.10;

export default function PitchSpeedTimer() {
  const [pitches, setPitches] = useState([]);
  const [distanceFeet, setDistanceFeet] = useState(60.5);
  const [pitchType, setPitchType] = useState("Fastball");
  const [status, setStatus] = useState("ready"); // ready | timing | recorded
  const [lastMph, setLastMph] = useState(null);
  const [elapsedDisplay, setElapsedDisplay] = useState("0.000");
  const [outlierData, setOutlierData] = useState(null);

  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  const sessionHigh = pitches.length
    ? Math.max(...pitches.map((p) => p.mph))
    : null;

  // Running timer display
  useEffect(() => {
    if (status === "timing") {
      const tick = () => {
        if (startTimeRef.current) {
          const elapsed = (performance.now() - startTimeRef.current) / 1000;
          setElapsedDisplay(elapsed.toFixed(3));
        }
        animFrameRef.current = requestAnimationFrame(tick);
      };
      animFrameRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(animFrameRef.current);
    }
  }, [status]);

  const calculateMph = useCallback(
    (elapsedSeconds) => {
      let adjusted = elapsedSeconds - REACTION_OFFSET;
      if (adjusted <= 0) adjusted = elapsedSeconds;
      return distanceFeet / adjusted / 1.4666667;
    },
    [distanceFeet]
  );

  const recordPitch = useCallback(
    (mph, elapsedSeconds) => {
      const pitch = {
        timestamp: Date.now(),
        pitchType,
        distanceFeet,
        elapsedSeconds,
        mph,
      };
      setPitches((prev) => [...prev, pitch]);
      setLastMph(mph);
      setStatus("recorded");
      // Immediately return to ready after brief flash
      setTimeout(() => setStatus("ready"), 300);
    },
    [pitchType, distanceFeet]
  );

  const handleTap = useCallback(() => {
    if (status === "ready" || status === "recorded") {
      // First tap — start timer
      startTimeRef.current = performance.now();
      setStatus("timing");
      setElapsedDisplay("0.000");
    } else if (status === "timing") {
      // Second tap — stop timer
      const endTime = performance.now();
      const elapsedSeconds = (endTime - startTimeRef.current) / 1000;
      cancelAnimationFrame(animFrameRef.current);

      // Hard reject
      if (elapsedSeconds < 0.10) {
        toast.error("Timing too short — try again");
        setStatus("ready");
        return;
      }

      const mph = calculateMph(elapsedSeconds);

      // Outlier check
      if (mph < 20 || mph > 110) {
        setOutlierData({ mph, elapsedSeconds });
        setStatus("ready");
        return;
      }

      recordPitch(mph, elapsedSeconds);
    }
  }, [status, calculateMph, recordPitch]);

  const handleOutlierRecord = () => {
    if (outlierData) {
      recordPitch(outlierData.mph, outlierData.elapsedSeconds);
      setOutlierData(null);
    }
  };

  const handleOutlierDiscard = () => {
    setOutlierData(null);
    setStatus("ready");
  };

  const handleUndo = () => {
    setPitches((prev) => {
      const next = prev.slice(0, -1);
      if (next.length > 0) {
        setLastMph(next[next.length - 1].mph);
      } else {
        setLastMph(null);
      }
      return next;
    });
  };

  const handleResetType = () => {
    setPitches((prev) => {
      const next = prev.filter((p) => p.pitchType !== pitchType);
      if (next.length > 0) {
        setLastMph(next[next.length - 1].mph);
      } else {
        setLastMph(null);
      }
      return next;
    });
  };

  const handleResetAll = () => {
    setPitches([]);
    setLastMph(null);
    setStatus("ready");
  };

  const handleNewPitcher = () => {
    setPitches([]);
    setLastMph(null);
    setDistanceFeet(60.5);
    setPitchType("Fastball");
    setStatus("ready");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6 max-w-lg mx-auto no-select">
      {/* Header */}
      <div className="w-full text-center mb-4">
        <h1 className="text-lg font-black uppercase tracking-[0.2em] text-primary">
          Pitch Speed Timer
        </h1>
      </div>

      {/* Distance picker */}
      <div className="w-full mb-4">
        <DistancePicker distance={distanceFeet} onChange={setDistanceFeet} />
      </div>

      {/* Pitch type */}
      <div className="w-full mb-6">
        <PitchTypeSelector selected={pitchType} onChange={setPitchType} />
      </div>

      {/* Radar display */}
      <div className="mb-6">
        <RadarDisplay
          status={status}
          lastMph={lastMph}
          sessionHigh={sessionHigh}
          elapsedDisplay={elapsedDisplay}
        />
      </div>

      {/* Big tap button */}
      <div className="mb-8">
        <TapButton status={status} onTap={handleTap} />
      </div>

      {/* Stats */}
      <div className="w-full space-y-4">
        <StatsPanel pitches={pitches} selectedType={pitchType} />
        <PitchHistory pitches={pitches} />
        <ActionButtons
          pitches={pitches}
          selectedType={pitchType}
          distanceFeet={distanceFeet}
          onUndo={handleUndo}
          onResetType={handleResetType}
          onResetAll={handleResetAll}
          onNewPitcher={handleNewPitcher}
        />
      </div>

      {/* Outlier dialog */}
      <OutlierDialog
        open={!!outlierData}
        mph={outlierData?.mph}
        onRecord={handleOutlierRecord}
        onDiscard={handleOutlierDiscard}
      />
    </div>
  );
}