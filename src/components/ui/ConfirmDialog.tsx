"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export function ConfirmDialog({ isOpen, title, description, confirmText = "Confirmer", cancelText = "Annuler", onConfirm, onCancel, isDestructive = true }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[100]"
            onClick={onCancel}
          />
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 10 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               className="bg-white rounded-[16px] shadow-2xl w-full max-w-[400px] overflow-hidden flex flex-col pointer-events-auto"
             >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDestructive ? 'bg-[#FECACA] text-[#991B1B]' : 'bg-[#E5E7EB] text-[#4B5563]'}`}>
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#1A1A2E] leading-snug">{title}</h2>
                      <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">{description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-[#F9FAFB] border-t border-[#E5E7EB] flex gap-3 justify-end">
                   <button 
                     onClick={onCancel}
                     className="bg-white border border-[#D1D5DB] text-[#4B5563] hover:bg-[#F3F4F6] px-4 py-2.5 rounded-[10px] text-sm font-semibold transition-colors shadow-sm"
                   >
                     {cancelText}
                   </button>
                   <button 
                     onClick={onConfirm}
                     className={`${isDestructive ? 'bg-[#DC2626] hover:bg-[#B91C1C]' : 'bg-[#7C5CFC] hover:bg-[#6a4de2]'} text-white px-4 py-2.5 rounded-[10px] text-sm font-bold transition-colors shadow-sm`}
                   >
                     {confirmText}
                   </button>
                </div>
             </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
