"use client";

import { Deal } from "@/data/pipeline";
import { 
  Save, History, Bold, Italic, List, ListOrdered, 
  Heading2, Heading3, Link as LinkIcon, Quote, User,
  Check
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface NoteTabProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function NoteTab({ deal, setDeal }: NoteTabProps) {
  const [content, setContent] = useState(deal.notes);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-save logic
  useEffect(() => {
    if (content !== deal.notes) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(() => {
        setIsSaving(true);
        // Simulate save
        setTimeout(() => {
          setDeal({ ...deal, notes: content });
          setIsSaving(false);
          setLastSaved(new Date());
        }, 1000);
      }, 5000);
    }
    
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [content, deal, setDeal]);

  const toolbar = [
    { icon: Heading2, label: "H2" },
    { icon: Heading3, label: "H3" },
    { icon: Bold, label: "Gras" },
    { icon: Italic, label: "Italique" },
    { icon: List, label: "Liste" },
    { icon: Quote, label: "Citation" }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50/10">
      {/* Editor Toolbar */}
      <div className="px-8 py-3 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
         <div className="flex items-center gap-1">
            {toolbar.map(item => (
              <button key={item.label} className="p-2 rounded-xl text-slate-400 hover:text-[#7C5CFC] hover:bg-slate-50 transition-all" title={item.label}>
                 <item.icon className="w-4 h-4" />
              </button>
            ))}
            <div className="w-px h-4 bg-slate-100 mx-2" />
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#7C5CFC] bg-[#F5F3FF] border border-[#7C5CFC]/10">
               @ Mentionner
            </button>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
               {isSaving ? (
                 <span className="flex items-center gap-2 text-[#7C5CFC] animate-pulse">
                   <Save className="w-3 h-3" /> Sauvegarde en cours...
                 </span>
               ) : lastSaved ? (
                 <span className="flex items-center gap-2 text-emerald-500">
                   <Check className="w-3 h-3" /> Sauvegardé à {lastSaved.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                 </span>
               ) : (
                 "Pas de modifications"
               )}
            </div>
            <button 
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#7C5CFC] hover:bg-slate-50 transition-all border border-slate-100"
            >
               <History className="w-3.5 h-3.5" /> Historique
            </button>
         </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-12 overflow-y-auto">
         <div className="max-w-[800px] mx-auto bg-white min-h-full rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100 p-16">
            <textarea
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="w-full h-full min-h-[500px] bg-transparent border-none p-0 focus:ring-0 text-[15px] font-medium text-slate-600 leading-[1.8] italic resize-none"
               placeholder="Commencez à rédiger vos notes sur ce deal..."
            />
         </div>
      </div>

      {/* Version History Modal */}
      <AnimatePresence>
        {showHistory && (
          <div className="fixed inset-0 z-[100] flex items-center justify-end p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A2E]/40 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
             <motion.div 
               initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
               className="relative bg-white w-[400px] h-full shadow-2xl flex flex-col"
             >
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                   <h3 className="text-sm font-black text-[#1A1A2E] uppercase tracking-widest italic">Historique des versions</h3>
                   <button onClick={() => setShowHistory(false)} className="p-2 text-slate-400 hover:text-slate-600">Fermer</button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6">
                   {[
                     { date: "Hier, 14:22", author: "Marie Dupont", change: "Ajout de la section besoins" },
                     { date: "10 Avril, 09:15", author: "Thomas Bernard", change: "Mise à jour contexte technique" },
                     { date: "05 Avril, 11:30", author: "Marie Dupont", change: "Création de la note" }
                   ].map((v, i) => (
                     <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#7C5CFC] transition-all cursor-pointer">
                        <div className="text-[10px] font-black text-[#7C5CFC] uppercase tracking-widest mb-1">{v.date}</div>
                        <div className="text-sm font-black text-[#1A1A2E] mb-2">{v.change}</div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                           <User className="w-3 h-3" /> {v.author}
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
