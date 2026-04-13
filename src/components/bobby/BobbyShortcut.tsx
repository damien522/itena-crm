"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Bot } from "lucide-react";
import { useEffect, useState } from "react";

interface BobbyShortcutProps {
  onClick: () => void;
}

export function BobbyShortcut({ onClick }: BobbyShortcutProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show shortcut after a short delay
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]"
        >
          <button
            onClick={onClick}
            className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] transition-all duration-500 overflow-hidden"
            style={{
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07), inset 0 0 0 1px rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
               <Bot className="w-4 h-4 text-white" />
            </div>

            <div className="flex flex-col items-start relative">
              <span className="text-[13px] font-black text-[#1A1A2E] tracking-tight">Parler à Bobby</span>
              <div className="flex items-center gap-1.5 opacity-60">
                 <kbd className="text-[9px] font-black bg-white/20 px-1 rounded border border-white/30">⌘</kbd>
                 <kbd className="text-[9px] font-black bg-white/20 px-1 rounded border border-white/30">K</kbd>
              </div>
            </div>

            {/* Pulsing indicator */}
            <div className="absolute right-3 top-3 w-1.5 h-1.5 bg-emerald-500 rounded-full">
              <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-75" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
