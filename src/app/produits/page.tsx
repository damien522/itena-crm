"use client";

import { useState } from "react";
import { produits, ProductFamily } from "@/data/produits";
import { Package, Shield, AlertTriangle, X, ChevronRight, Activity, BellRing, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const FAMILIES: ProductFamily[] = ['Protéger', 'Préserver', 'Remplacer', 'Prendre Soin'];

export default function Produits() {
  const [activeFamily, setActiveFamily] = useState<ProductFamily>('Protéger');
  const [showRecallTracker, setShowRecallTracker] = useState(true);
  const [showRecallModal, setShowRecallModal] = useState(false);
  const [selectedProductTrace, setSelectedProductTrace] = useState<any>(null);

  const filtered = produits.filter(p => p.family === activeFamily);

  const handleNotifyRecall = () => {
    setShowRecallModal(false);
    toast.success("Notification de rappel de masse envoyée à 18 distributeurs.");
  };

  return (
    <div className="space-y-8 pb-10 flex flex-col h-[calc(100vh-140px)]">
      
      <AnimatePresence>
        {showRecallTracker && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden shrink-0"
          >
            <div className="bg-[#FEE2E2] border border-[#FECACA] rounded-[16px] p-4 flex items-center gap-4 shadow-sm relative pr-12">
              <div className="w-10 h-10 bg-[#FECACA] rounded-full flex items-center justify-center text-[#991B1B] shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#991B1B]">Alerte Rappel Qualité en cours</h3>
                <p className="text-sm text-[#7F1D1D] mt-0.5">Le lot LT-2604-X9 (Charlotte Chirurgicale) fait l'objet d'un rappel préventif niveau 2.</p>
              </div>
              <button 
                onClick={() => setShowRecallModal(true)}
                className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-4 py-2 rounded-[12px] text-sm font-semibold transition-colors shrink-0 shadow-sm"
              >
                Gérer le rappel
              </button>
              <button 
                onClick={() => setShowRecallTracker(false)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#991B1B] hover:bg-[#FECACA] p-1.5 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide shrink-0">
        {FAMILIES.map(family => (
          <button
            key={family}
            onClick={() => setActiveFamily(family)}
            className={`px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase transition-colors shrink-0 ${activeFamily === family ? 'bg-[#7C5CFC] text-white shadow-md' : 'bg-white text-[#6B7280] border border-[#E5E7EB] hover:border-[#C4B5F4] hover:text-[#1A1A2E]'}`}
          >
            {family}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 bg-transparent pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(prod => (
            <div key={prod.id} className="bg-white rounded-[16px] p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#E5E7EB] flex flex-col group hover:border-[#C4B5F4] hover:-translate-y-0.5 transition-all">
              
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-[12px] flex items-center justify-center shrink-0 ${
                  prod.family === 'Protéger' ? 'bg-[#EDE9FE] text-[#7C5CFC]' :
                  prod.family === 'Préserver' ? 'bg-[#E0F2FE] text-[#0284C7]' :
                  prod.family === 'Remplacer' ? 'bg-[#FEFCE8] text-[#CA8A04]' :
                  'bg-[#ECFDF5] text-[#059669]'
                }`}>
                  {prod.family === 'Protéger' ? <Shield className="w-6 h-6" /> : 
                   prod.family === 'Préserver' ? <Package className="w-6 h-6" /> : 
                   <Activity className="w-6 h-6" />}
                </div>
                <div>
                  {prod.stockStatus === 'Disponible' && <span className="bg-[#BBF7D0] text-[#166534] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-[#86EFAC]">Disponible</span>}
                  {prod.stockStatus === 'Stock faible' && <span className="bg-[#FDE68A] text-[#854D0E] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-[#FDE047]">Stock Faible</span>}
                  {prod.stockStatus === 'Rupture' && <span className="bg-[#FECACA] text-[#991B1B] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border border-[#FCA5A5]">Rupture</span>}
                </div>
              </div>

              <h3 className="text-base font-bold text-[#1A1A2E] mb-1 line-clamp-2 leading-tight">{prod.name}</h3>
              
              <div className="flex items-center gap-2 mb-6">
                <span className="font-mono text-xs font-semibold text-[#9CA3AF] bg-[#F9FAFB] px-2 py-0.5 rounded border border-[#E5E7EB]">{prod.lotNumber}</span>
                <span className="text-xs font-semibold text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">{prod.family}</span>
              </div>

              <div className="mt-auto flex justify-between items-center border-t border-[#F3F4F6] pt-4">
                <div className="text-sm">
                  <span className="text-[#6B7280]">Qté:</span>
                  <span className="ml-1 font-bold text-[#1A1A2E] tabular-nums">{prod.stockCount}</span>
                </div>
                <button onClick={() => setSelectedProductTrace(prod)} className="text-sm font-bold text-[#7C5CFC] hover:text-[#6a4de2] flex items-center group-hover:underline">
                  Voir traçabilité <ChevronRight className="w-4 h-4 ml-0.5 mt-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showRecallModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setShowRecallModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-[24px] shadow-2xl w-full max-w-xl flex flex-col relative z-10 overflow-hidden">
              <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-[#FEF2F2]">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-[#FECACA] flex items-center justify-center text-[#991B1B]">
                     <BellRing className="w-5 h-5"/>
                   </div>
                   <h2 className="text-xl font-bold text-[#991B1B]">Gérer le rappel qualité</h2>
                </div>
                <button onClick={() => setShowRecallModal(false)} className="p-2 rounded-full hover:bg-[#FECACA]"><X className="w-5 h-5 text-[#991B1B]"/></button>
              </div>
              <div className="p-6 space-y-4 bg-white">
                 <p className="text-sm text-[#4B5563]">Vous êtes sur le point de déclencher une notification de rappel officielle pour le lot <strong>LT-2604-X9</strong>.</p>
                 <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[12px] p-4">
                    <h4 className="text-xs font-bold text-[#6B7280] uppercase mb-2">Distributeurs impactés</h4>
                    <ul className="text-sm font-semibold text-[#1A1A2E] grid grid-cols-2 gap-2">
                      <li>• DentalTech Group (DE)</li>
                      <li>• Nordic Supplies (SE)</li>
                      <li>• AtheneCare (GR)</li>
                      <li className="text-[#9CA3AF]">+ 15 autres distributeurs</li>
                    </ul>
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Message d'accompagnement (Optionnel)</label>
                   <textarea rows={3} className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC] resize-none" placeholder="Ajoutez un contexte spécifique pour les distributeurs..." />
                 </div>
              </div>
              <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex justify-between gap-3">
                <button onClick={() => setShowRecallModal(false)} className="px-5 py-2.5 rounded-[12px] text-sm font-semibold text-[#6B7280] hover:bg-[#E5E7EB]">Annuler</button>
                <button onClick={handleNotifyRecall} className="bg-[#DC2626] hover:bg-[#B91C1C] text-white px-6 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4"/>
                  Notifier les 18 distributeurs
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProductTrace && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedProductTrace(null)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl flex flex-col relative z-20 overflow-hidden border-beam"
            >
              <div className="p-8 border-b border-[#F3F4F6] flex justify-between items-center bg-gradient-to-r from-[#F8FAFC] to-white">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#7C5CFC] flex items-center justify-center text-white shadow-lg">
                      <Shield className="w-6 h-6"/>
                   </div>
                   <div>
                      <h2 className="text-xl font-black text-[#1A1A2E]">Traçabilité : Lot {selectedProductTrace.lotNumber}</h2>
                      <p className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mt-1">{selectedProductTrace.name}</p>
                   </div>
                </div>
                <button onClick={() => setSelectedProductTrace(null)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                  <X className="w-6 h-6 text-[#9CA3AF]"/>
                </button>
              </div>

              <div className="p-8 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date de Fabrication</p>
                       <p className="font-bold text-[#1A1A2E]">12 Janv. 2026</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Origine Site</p>
                       <p className="font-bold text-[#1A1A2E]">ITENA Paris (Fr)</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Historique des contrôles</h3>
                    <div className="space-y-3">
                       {[
                         { step: "Contrôle Qualité Entrée", status: "Validé", date: "14 Janv. 2026", user: "Jean-Pierre Q." },
                         { step: "Stérilisation Validée", status: "Certifié", date: "15 Janv. 2026", user: "Unité S12" },
                         { step: "Mise en Stock", status: "Terminé", date: "16 Janv. 2026", user: "Logistique" }
                       ].map((item, i) => (
                         <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-[#7C5CFC]/20 transition-colors">
                            <div className="flex items-center gap-3">
                               <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                               <div>
                                  <p className="text-sm font-bold text-[#1A1A2E]">{item.step}</p>
                                  <p className="text-[10px] text-slate-400 font-bold">{item.date} • {item.user}</p>
                               </div>
                            </div>
                            <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
                               {item.status}
                            </span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="p-6 border-t border-[#F3F4F6] bg-slate-50/50 flex justify-end">
                <button 
                  onClick={() => setSelectedProductTrace(null)}
                  className="px-8 py-3 rounded-2xl bg-[#1A1A2E] text-white text-sm font-black shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  FERMER
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
