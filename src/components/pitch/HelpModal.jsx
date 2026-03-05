import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function HelpModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-primary">How to Use</DialogTitle>
        </DialogHeader>
        <ol className="space-y-3 text-sm text-foreground list-decimal list-inside">
          <li>Select the <span className="font-bold">distance</span> and <span className="font-bold">pitch type</span> before timing.</li>
          <li><span className="font-bold">Tap</span> the big button when the pitcher releases the ball.</li>
          <li><span className="font-bold">Tap again</span> when the ball hits the catcher's mitt.</li>
          <li>Speed is calculated automatically and added to your session stats.</li>
          <li>Use <span className="font-bold">Undo Last</span> to remove a bad reading.</li>
          <li>Tap <span className="font-bold">New Pitcher</span> to start a fresh session.</li>
        </ol>
        <p className="text-xs text-muted-foreground mt-2">A 0.1s reaction-time offset is applied automatically.</p>
      </DialogContent>
    </Dialog>
  );
}