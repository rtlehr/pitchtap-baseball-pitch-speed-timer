import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";

const REACTION_OFFSET = 0.10;
const PitchContext = createContext(null);

export function PitchProvider({ children }) {
  const [pitches, setPitches] = useState([]);
  const [distanceFeet, setDistanceFeet] = useState(60.5);
  const [pitchType, setPitchType] = useState("Fastball");
  const [status, setStatus] = useState("ready");
  const [lastMph, setLastMph] = useState(null);
  const [elapsedDisplay, setElapsedDisplay] = useState("0.000");
  const [outlierData, setOutlierData] = useState(null);
  const [pitcherName, setPitcherName] = useState("");
  const [showNameModal, setShowNameModal] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  const sessionHigh = pitches.length ? Math.max(...pitches.map((p) => p.mph)) : null;

  // Running timer display — lives here so it works regardless of which page is active
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
      const pitch = { timestamp: Date.now(), pitchType, distanceFeet, elapsedSeconds, mph };
      setPitches((prev) => [...prev, pitch]);
      setLastMph(mph);
      setStatus("recorded");
      setTimeout(() => setStatus("ready"), 300);
    },
    [pitchType, distanceFeet]
  );

  const handleTap = useCallback(() => {
    if (status === "ready" || status === "recorded") {
      startTimeRef.current = performance.now();
      setStatus("timing");
      setElapsedDisplay("0.000");
    } else if (status === "timing") {
      const endTime = performance.now();
      const elapsedSeconds = (endTime - startTimeRef.current) / 1000;
      cancelAnimationFrame(animFrameRef.current);
      if (elapsedSeconds < 0.10) {
        toast.error("Timing too short — try again");
        setStatus("ready");
        return;
      }
      const mph = calculateMph(elapsedSeconds);
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
      setLastMph(next.length > 0 ? next[next.length - 1].mph : null);
      return next;
    });
  };

  const handleResetType = () => {
    setPitches((prev) => {
      const next = prev.filter((p) => p.pitchType !== pitchType);
      setLastMph(next.length > 0 ? next[next.length - 1].mph : null);
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
    setShowNameModal(true);
  };

  const handleNameConfirm = (name) => {
    setPitcherName(name);
    setShowNameModal(false);
  };

  return (
    <PitchContext.Provider
      value={{
        pitches,
        distanceFeet, setDistanceFeet,
        pitchType, setPitchType,
        status,
        lastMph,
        elapsedDisplay,
        outlierData,
        pitcherName,
        showNameModal,
        showHelp, setShowHelp,
        sessionHigh,
        handleTap,
        handleOutlierRecord,
        handleOutlierDiscard,
        handleUndo,
        handleResetType,
        handleResetAll,
        handleNewPitcher,
        handleNameConfirm,
      }}
    >
      {children}
    </PitchContext.Provider>
  );
}

export function usePitch() {
  const ctx = useContext(PitchContext);
  if (!ctx) throw new Error("usePitch must be used within PitchProvider");
  return ctx;
}