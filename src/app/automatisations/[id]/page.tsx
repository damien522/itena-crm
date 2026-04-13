"use client";

import { useState, useEffect } from "react";
import { 
  ChevronLeft, Zap, Play, Check, X,
  Plus, Trash2, ArrowDown, HelpCircle, 
  Settings2, Bot, Mail, Bell, ClipboardList,
  Database, Share2, Info, ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { mockAutomations, Automation } from "@/data/automations";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function EditAutomationPage() {
  const params = useParams();
  const router = useRouter();
  const [automation, setAutomation] = useState<Automation | null>(null);
  const [showTestModal, setShowTestModal] = useState(false);

  useEffect(() => {
    const found = mockAutomations.find(a => a.id === params.id);
    if (found) {
      setAutomation(found);
    } else {
      // For demo, if not found, use a default one
      setAutomation(mockAutomations[0]);
    }
  }, [params.id]);

  if (!automation) return <div className="p-20 text-center font-black text-slate-300">CHARGEMENT...</div>;

  const actionTypes = [
    { id: "notif", label: "Notification Interne", icon: Bell, color: "bg-blue-50 text-blue-500" },
    { id: "email", label: "Envoyer un Email", icon: Mail, color: "bg-amber-50 text-amber-500" },
    { id: "task", label: "Créer une Tâche", icon: ClipboardList, color: "bg-emerald-50 text-emerald-500" },
    { id: "bobby", label: "Notifier Bobby", icon: Bot, color: "bg-purple-50 text-purple-500" },
    { id: "webhook", label: "Webhook externe", icon: Share2, color: "bg-slate-50 text-slate-500" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Top Header */}
      <header className="h-[80px] bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/automatisations" className="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400">
             <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-100" />
          <div className="flex flex-col">
             <h1 className="text-xl font-black text-[#1A1A2E] bg-transparent border-none p-0 italic">
               {automation.name}
             </h1>
             <span className="text-[10px] font-black text-[#7C5CFC] uppercase tracking-widest italic">{automation.status} • Mise à jour il y a 2h</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={() => setShowTestModal(true)}
            className="px-6 py-2.5 rounded-2xl border border-slate-200 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
           >
              Simuler l'exécution
           </button>
           <div className="w-px h-6 bg-slate-100" />
           <button 
            onClick={() => { toast.success("Modifications enregistrées"); router.push("/automatisations"); }}
            className="px-8 py-2.5 rounded-2xl bg-[#1A1A2E] text-white font-black text-sm shadow-lg shadow-black/10 hover:bg-black transition-all"
           >
              Mettre à jour
           </button>
        </div>
      </header>

      {/* Builder Canvas (Simplified Read-only/Edit view) */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-[800px] mx-auto space-y-8 flex flex-col items-center">
          
          {/* TRIGGER SECTION */}
          <section className="w-full">
             <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#7C5CFC] shadow-sm">
                   <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Déclencheur</h3>
             </div>
             
             <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <div className="flex items-center justify-between">
                   <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Évènement</span>
                      <p className="text-sm font-black text-[#1A1A2E] leading-relaxed italic underline decoration-[#7C5CFC]/20 decoration-4 underline-offset-4">{automation.trigger.event}</p>
                   </div>
                   <button className="text-xs font-black text-[#7C5CFC] uppercase tracking-widest hover:underline">Modifier</button>
                </div>
             </div>
          </section>

          <ArrowDown className="text-slate-200 w-8 h-8" />

          {/* CONDITIONS SECTION */}
          <section className="w-full">
             <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-amber-500 shadow-sm">
                      <Settings2 className="w-4 h-4" />
                   </div>
                   <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Conditions</h3>
                </div>
             </div>
             
             <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <div className="space-y-4">
                  {automation.conditions.map((c, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                       <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">SI</span>
                       <span className="text-sm font-black text-[#1A1A2E]">{c.field}</span>
                       <span className="text-xs font-bold text-slate-400 font-mono italic">{c.operator}</span>
                       <span className="bg-white px-3 py-1 rounded-lg border border-slate-200 text-sm font-black text-[#7C5CFC] italic">{c.value}</span>
                    </div>
                  ))}
                  {automation.conditions.length === 0 && (
                    <div className="text-center py-4 italic text-slate-300 text-xs">Aucune condition définie. La règle s'exécutera toujours.</div>
                  )}
                </div>
             </div>
          </section>

          <ArrowDown className="text-slate-200 w-8 h-8" />

          {/* ACTIONS SECTION */}
          <section className="w-full pb-20">
             <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-emerald-500 shadow-sm">
                   <Play className="w-4 h-4" />
                </div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions</h3>
             </div>
             
             <div className="space-y-6">
                {automation.actions.map((act: any, i: number) => {
                   const type = actionTypes.find(t => t.id === (act.type || 'notif'));
                   const Icon = type?.icon || Bell;
                   return (
                     <div key={i} className="bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-all">
                           <button className="text-slate-300 hover:text-red-500 transition-all"><Trash2 className="w-5 h-5" /></button>
                        </div>
                        <div className="flex gap-8">
                           <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-sm", type?.color)}>
                              <Icon className="w-8 h-8" />
                           </div>
                           <div className="flex-1">
                              <div className="mb-6">
                                 <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">Action {i+1}</h4>
                                 <h3 className="text-lg font-black text-[#1A1A2E] italic">{type?.label}</h3>
                              </div>
                              
                              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 italic text-sm text-slate-600 leading-relaxed font-medium">
                                 {act.type === 'notif' ? "Alerte envoyée aux responsables commerciaux avec le détail de l'opportunité." : 
                                  act.type === 'email' ? "Email automatique envoyé au client avec le modèle 'Relance Prospect'." : 
                                  "Action système configurée."}
                              </div>
                           </div>
                        </div>
                     </div>
                   );
                })}

                <button className="w-full py-6 border-2 border-dashed border-slate-200 rounded-[40px] flex items-center justify-center gap-3 text-slate-400 hover:bg-white hover:border-[#7C5CFC]/30 hover:text-[#7C5CFC] transition-all group">
                   <Plus className="w-5 h-5 group-hover:scale-125 transition-all" />
                   <span className="text-[11px] font-black uppercase tracking-[0.2em] italic">Ajouter une action</span>
                </button>
             </div>
          </section>
        </div>
      </main>

      {/* Test Modal (Duplicate from builder) */}
      <AnimatePresence>
        {showTestModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A2E]/60 backdrop-blur-md" onClick={() => setShowTestModal(false)} />
             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-[600px] rounded-[40px] overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                       <h2 className="text-2xl font-black text-[#1A1A2E] tracking-tight">Test de la règle</h2>
                       <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest italic">Simulation (Mode lecture-seule)</p>
                    </div>
                    <button onClick={() => setShowTestModal(false)} className="p-2.5 rounded-2xl bg-white text-slate-300 hover:text-slate-600 shadow-sm"><X className="w-5 h-5"/></button>
                </div>
                <div className="p-10 space-y-8 text-center py-20">
                    <Bot className="w-16 h-16 text-[#7C5CFC] mx-auto animate-bounce mb-4" />
                    <p className="text-sm font-black text-[#1A1A2E] mb-2 uppercase tracking-tight">Démarrage des tests unitaires...</p>
                    <p className="text-xs font-bold text-slate-400 px-10">Verification des déclencheurs, validation des conditions et pré-visualisation des actions en cours.</p>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
