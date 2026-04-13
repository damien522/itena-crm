"use client";

import { useState, useEffect } from "react";
import { BobbyShortcut } from "@/components/bobby/BobbyShortcut";
import { BobbyQuickChat } from "@/components/modals/BobbyQuickChat";

export function BobbyGlobalAccess() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD/CTRL + D
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // ESC to close
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <BobbyQuickChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
