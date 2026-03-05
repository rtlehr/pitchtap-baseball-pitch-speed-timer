import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PitcherNameModal({ open, onConfirm }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setName("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(name.trim() || "Unknown Pitcher");
  };

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm mx-auto" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-black tracking-wide">
            ⚾ Who's Pitching?
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <Input
            ref={inputRef}
            placeholder="Pitcher name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-lg text-center font-bold h-12 bg-secondary border-border"
          />
          <Button type="submit" className="w-full h-12 text-base font-black uppercase tracking-wider">
            Start Session
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}