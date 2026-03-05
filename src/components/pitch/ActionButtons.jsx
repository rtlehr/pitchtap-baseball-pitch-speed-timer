import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Undo2, Trash2, RotateCcw, UserPlus, Mail } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ActionButtons({
  pitches,
  selectedType,
  distanceFeet,
  pitcherName,
  onUndo,
  onResetType,
  onResetAll,
  onNewPitcher,
}) {
  const [confirmAction, setConfirmAction] = useState(null);

  const confirmConfig = {
    resetType: {
      title: `Reset ${selectedType} Pitches?`,
      desc: `This will remove all ${selectedType} pitches from this session.`,
      action: onResetType,
    },
    resetAll: {
      title: "Reset All Data?",
      desc: "This will clear all pitches, stats, and history.",
      action: onResetAll,
    },
    newPitcher: {
      title: "New Pitcher?",
      desc: "This will clear everything and start fresh for a new pitcher.",
      action: onNewPitcher,
    },
  };

  const buildEmailBody = () => {
    const allSpeeds = pitches.map((p) => p.mph);
    const avg = (arr) => (arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : "N/A");
    const hi = (arr) => (arr.length ? Math.max(...arr).toFixed(1) : "N/A");
    const lo = (arr) => (arr.length ? Math.min(...arr).toFixed(1) : "N/A");

    let body = `Pitch Speed Report\n\n`;
    if (pitcherName) body += `Pitcher: ${pitcherName}\n`;
    body += `Distance: ${distanceFeet} ft\n\n`;
    body += `=== Overall ===\n`;
    body += `Pitches: ${pitches.length}\n`;
    body += `Average: ${avg(allSpeeds)} MPH\n`;
    body += `High: ${hi(allSpeeds)} MPH\n`;
    body += `Low: ${lo(allSpeeds)} MPH\n\n`;

    ["Fastball", "Curve", "Slider", "Misc"].forEach((type) => {
      const speeds = pitches.filter((p) => p.pitchType === type).map((p) => p.mph);
      if (speeds.length) {
        body += `=== ${type} ===\n`;
        body += `Count: ${speeds.length}\n`;
        body += `Average: ${avg(speeds)} MPH\n`;
        body += `High: ${hi(speeds)} MPH\n`;
        body += `Low: ${lo(speeds)} MPH\n\n`;
      }
    });

    const last10 = pitches.slice(-10).reverse();
    if (last10.length) {
      body += `=== Last ${last10.length} Pitches ===\n`;
      last10.forEach((p, i) => {
        body += `${i + 1}. ${p.mph.toFixed(1)} MPH - ${p.pitchType}\n`;
      });
    }

    return body;
  };

  const handleEmail = () => {
    const subject = encodeURIComponent("Pitch Speed Report");
    const body = encodeURIComponent(buildEmailBody());
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };

  const cfg = confirmAction ? confirmConfig[confirmAction] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onUndo}
          disabled={pitches.length === 0}
          className="text-xs font-bold"
        >
          <Undo2 className="w-3.5 h-3.5 mr-1.5" />
          Undo Last
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setConfirmAction("resetType")}
          disabled={pitches.filter((p) => p.pitchType === selectedType).length === 0}
          className="text-xs font-bold"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          Reset {selectedType}
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setConfirmAction("resetAll")}
          disabled={pitches.length === 0}
          className="text-xs font-bold"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
          Reset All
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setConfirmAction("newPitcher")}
          className="text-xs font-bold"
        >
          <UserPlus className="w-3.5 h-3.5 mr-1.5" />
          New Pitcher
        </Button>
      </div>

      {pitches.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleEmail}
          className="w-full text-xs font-bold mt-2"
        >
          <Mail className="w-3.5 h-3.5 mr-1.5" />
          Email Pitch Report
        </Button>
      )}

      {isAuthenticated && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setConfirmAction("deleteAccount")}
          className="w-full text-xs font-bold mt-1 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <UserX className="w-3.5 h-3.5 mr-1.5" />
          Delete Account
        </Button>
      )}

      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{cfg?.title}</AlertDialogTitle>
            <AlertDialogDescription>{cfg?.desc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await cfg?.action();
                setConfirmAction(null);
              }}
              className={confirmAction === "deleteAccount" ? "bg-destructive hover:bg-destructive/90" : ""}
            >
              {confirmAction === "deleteAccount" ? "Delete Forever" : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}