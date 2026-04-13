"use client";

import { Deal, DealStatus } from "@/data/pipeline";
import { defaultStages } from "@/data/pipelineStages";
import { 
  ChevronLeft, ChevronRight, CheckCircle2, XCircle, 
  Zap, Building2, PartyPopper, HeartIcon, Trophy
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface FicheBottomBarProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function FicheBottomBar({ deal, setDeal }: FicheBottomBarProps) {
  const [showWinModal, setShowWinModal] = useState(false);
  const [showLoseModal, setShowLoseModal] = useState(false);
  const [lostReason, setLostReason] = useState("");

  const currentStageIndex = defaultStages.findIndex(s => s.id === deal.stageId);
  const nextStage = defaultStages[currentStageIndex + 1];
  const prevStage = defaultStages[currentStageIndex - 1];

  const handleNextStage = () => {
    if (nextStage) {
      setDeal({ ...deal, stageId: nextStage.id });
      toast.success(`Étape suivante : ${nextStage.name}`);
    }
  };

  const handlePrevStage = () => {
    if (prevStage) {
      setDeal({ ...deal, stageId: prevStage.id });
      toast.info(`Retour à : ${prevStage.name}`);
    }
  };

  const markWon = () => {
    setDeal({ ...deal, status: "Gagné" });
    setShowWinModal(true);
  };

  const markLost = () => {
    setDeal({ ...deal, status: "Perdu" });
    setShowLoseModal(true);
  };

  return (
    <div className="h-20 bg-white border-t border-slate-100 flex items-center justify-between px-10 shrink-0 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-4">
        <button 
          disabled={!prevStage}
          onClick={handlePrevStage}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl border border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" /> Étape précédente
        </button>
      </div>

      <div className="flex items-center gap-4">
         <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-4">Actions de clôture</div>
         <button 
          onClick={markLost}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-rose-100 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-all"
         >
            <XCircle className="w-4 h-4" /> Marquer Perdu
         </button>
         <button 
          onClick={markWon}
          className="flex items-center gap-2 px-10 py-4 rounded-3xl bg-[#10B981] text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-[#059669] transition-all shadow-xl shadow-emerald-500/20"
         >
            <CheckCircle2 className="w-4 h-4" /> Marquer Gagné
         </button>
      </div>

      <div className="flex items-center gap-4">
         {nextStage && (
           <button 
            onClick={handleNextStage}
            className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-[#7C5CFC] text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#7C5CFC]/20"
           >
             Passer à: {nextStage.name} <ChevronRight className="w-4 h-4" />
           </button>
         )}
      </div>

      {/* Win Modal (Celebration) */}
      <AnimatePresence>
        {showWinModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A2E]/60 backdrop-blur-md" onClick={() => setShowWinModal(false)} />
             
             {/* Simple CSS Confetti (mocked with small circles) */}
             <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -50, x: Math.random() * 1000, opacity: 1, scale: 0 }}
                    animate={{ y: 800, opacity: 0, scale: 1 }}
                    transition={{ duration: 2, delay: Math.random() * 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full absolute"
                    style={{ backgroundColor: ['#7C5CFC', '#10B981', '#3B82F6', '#F59E0B'][i % 4] }}
                  />
                ))}
             </div>

             <motion.div 
               initial={{ scale: 0.8, opacity: 0, rotate: -5 }} animate={{ scale: 1, opacity: 1, rotate: 0 }}
               className="relative bg-white w-full max-w-[500px] rounded-[48px] p-12 shadow-2xl text-center overflow-hidden"
             >
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 via-[#7C5CFC] to-blue-400" />
                
                <div className="w-24 h-24 bg-emerald-50 rounded-[40px] flex items-center justify-center text-emerald-500 mx-auto mb-8 shadow-inner ring-4 ring-white">
                   <Trophy className="w-12 h-12" />
                </div>

                <h2 className="text-3xl font-black text-[#1A1A2E] tracking-tight mb-2 italic">Excellent travail !</h2>
                <p className="text-slate-500 font-bold mb-10 leading-relaxed px-4">Le deal pour <span className="text-[#1A1A2E]">{deal.companyName}</span> est officiellement gagné. C'est une grande victoire pour l'équipe.</p>
                
                <div className="bg-slate-50 rounded-3xl p-6 mb-10 border border-slate-100 flex items-center justify-around">
                   <div className="text-center">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Valeur</div>
                      <div className="text-lg font-black text-[#1A1A2E]">€{deal.value?.toLocaleString()}</div>
                   </div>
                   <div className="w-px h-10 bg-slate-200" />
                   <div className="text-center">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cycle</div>
                      <div className="text-lg font-black text-[#1A1A2E]">24 jours</div>
                   </div>
                </div>

                {deal.companyType === "prospect" ? (
                   <div className="space-y-4">
                      <p className="text-[10px] font-black text-[#7C5CFC] uppercase tracking-[0.3em] mb-4">Conversion Prospect</p>
                      <button 
                        onClick={() => { setShowWinModal(false); toast.success("Entreprise convertie !"); }}
                        className="w-full bg-[#1A1A2E] text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 transition-all"
                      >
                         Convertir en Distributeur
                      </button>
                      <button onClick={() => setShowWinModal(false)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">Fermer sans convertir</button>
                   </div>
                ) : (
                  <button 
                    onClick={() => setShowWinModal(false)}
                    className="w-full bg-[#1A1A2E] text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-black/20 hover:scale-105 transition-all"
                  >
                     Célébrer la victoire
                  </button>
                )}
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lose Modal */}
      <AnimatePresence>
        {showLoseModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A2E]/60 backdrop-blur-md" onClick={() => setShowLoseModal(false)} />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
               className="relative bg-white w-full max-w-[450px] rounded-[40px] p-12 shadow-2xl"
             >
                <h3 className="text-2xl font-black text-[#1A1A2E] tracking-tight mb-2 italic">Perte du Deal</h3>
                <p className="text-slate-500 font-bold mb-8">Nous sommes désolés de l'apprendre. Quelle est la raison principale ?</p>
                
                <div className="space-y-6 mb-10">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Raison de la perte</label>
                      <select 
                        value={lostReason}
                        onChange={(e) => setLostReason(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-rose-200 transition-all appearance-none"
                      >
                         <option value="">Sélectionner une raison...</option>
                         <option>Prix trop élevé</option>
                         <option>Concurrent choisi</option>
                         <option>Pas de budget</option>
                         <option>Projet annulé</option>
                         <option>Pas de réponse</option>
                         <option>Autre</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Note complémentaire</label>
                      <textarea className="w-full bg-slate-50 border-none rounded-[24px] py-4 px-6 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-rose-200 min-h-[100px] resize-none" placeholder="Ex: Le client a finalement opté pour la solution de..." />
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                   <button 
                    disabled={!lostReason}
                    onClick={() => { setShowLoseModal(false); toast.info("Deal marqué comme Perdu"); }}
                    className="w-full bg-rose-500 text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:bg-rose-600 transition-all disabled:opacity-30 disabled:pointer-events-none"
                   >
                      Confirmer la perte
                   </button>
                   <button onClick={() => setShowLoseModal(false)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600">Annuler</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
