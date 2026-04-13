"use client";

import { motion, AnimatePresence, Reorder } from "framer-motion";
import { X, GripVertical, Plus, Trash2, Edit2, Check, ExternalLink, Settings2, HelpCircle } from "lucide-react";
import { useState } from "react";
import { PipelineStage } from "@/data/pipelineStages";
import { toast } from "sonner";

interface StageManagerProps {
  isOpen: boolean;
  onClose: () => void;
  stages: PipelineStage[];
  onUpdateStages: (newStages: PipelineStage[]) => void;
}

export function StageManager({ isOpen, onClose, stages, onUpdateStages }: StageManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const colors = ["#E9D5FF", "#BAE6FD", "#FDE68A", "#FCA5A5", "#6EE7B7", "#A7F3D0", "#DBEAFE", "#FCE7F3", "#F3F4F6"];

  const handleDelete = (id: string) => {
    onUpdateStages(stages.filter(s => s.id !== id));
    toast.success("Étape supprimée");
  };

  const handleReorder = (newOrder: PipelineStage[]) => {
    const updated = newOrder.map((s, index) => ({ ...s, order: index }));
    onUpdateStages(updated);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-[120] backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: "100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[520px] bg-white shadow-2xl z-[130] flex flex-col"
          >
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-[#F9FAFB]">
              <div>
                <h2 className="text-xl font-black text-[#1A1A2E] tracking-tight">Configuration du Pipeline</h2>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gérer les étapes commerciales</p>
              </div>
              <button onClick={onClose} className="p-2.5 rounded-2xl hover:bg-white hover:shadow-md text-slate-400 transition-all">
                <X className="w-5 h-5"/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                   Liste des étapes
                </div>
                <button 
                  onClick={() => setShowNewForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#7C5CFC] text-white rounded-xl text-xs font-black shadow-lg shadow-[#7C5CFC]/20 hover:bg-[#6a4de2] transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Nouvelle étape
                </button>
              </div>

              <Reorder.Group axis="y" values={stages} onReorder={handleReorder} className="space-y-3">
                {stages.map((stage) => (
                  <Reorder.Item 
                    key={stage.id} 
                    value={stage}
                    className="group bg-white border border-slate-100 rounded-2xl p-4 flex items-center gap-4 hover:border-[#7C5CFC]/30 transition-all shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing"
                  >
                    <div className="text-slate-300 group-hover:text-slate-400">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: stage.color }} />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[#1A1A2E] text-sm">{stage.name}</div>
                      <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{stage.probabilityDefault}% probabilité</div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 text-slate-400 hover:text-[#7C5CFC] hover:bg-[#F5F3FF] rounded-xl transition-all">
                          <Edit2 className="w-4 h-4" />
                       </button>
                       <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(stage.id); }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                       >
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Le re-calcul est automatique</span>
               </div>
               <button onClick={onClose} className="bg-[#1A1A2E] text-white px-8 py-3 rounded-2xl text-sm font-black shadow-lg shadow-black/10 hover:bg-black transition-all">
                  Terminer
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
