"use client";

import { useState } from "react";
import { 
  ChevronLeft, Zap, Play, Check, X,
  Plus, Trash2, ArrowDown, HelpCircle, 
  Settings2, Bot, Mail, Bell, ClipboardList,
  Database, Share2, Info
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { TriggerCategory } from "@/data/automations";

export default function AutomationBuilder() {
  const [name, setName] = useState("Nouvelle automatisation");
  const [trigger, setTrigger] = useState<{category: TriggerCategory, event: string} | null>(null);
  const [conditions, setConditions] = useState<{field: string, operator: string, value: string}[]>([]);
  const [actions, setActions] = useState<{type: string, config: any}[]>([]);
  const [showTestModal, setShowTestModal] = useState(false);

  const triggerOptions = {
    Pipeline: ["Un deal change d'étape", "Un deal est créé", "Un deal est marqué Gagné", "Inactivité > X jours"],
    Distributeurs: ["Certification expirante", "Nouveau distributeur", "Inactivité"],
    Système: ["Chaque matin (9h)", "Chaque lundi", "Début de mois"]
  };

  const actionTypes = [
    { id: "notif", label: "Notification Interne", icon: Bell, color: "bg-blue-50 text-blue-500" },
    { id: "email", label: "Envoyer un Email", icon: Mail, color: "bg-amber-50 text-amber-500" },
    { id: "task", label: "Créer une Tâche", icon: ClipboardList, color: "bg-emerald-50 text-emerald-500" },
    { id: "bobby", label: "Notifier Bobby", icon: Bot, color: "bg-purple-50 text-purple-500" },
    { id: "webhook", label: "Webhook externe", icon: Share2, color: "bg-slate-50 text-slate-500" },
  ];

  const handleSave = () => {
    toast.success("Automatisation activée avec succès");
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3] flex flex-col">
      {/* Top Header */}
      <header className="h-[80px] bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
        <div className="flex items-center gap-6">
          <Link href="/automatisations" className="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400">
             <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-6 w-px bg-slate-100" />
          <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-xl font-black text-[#1A1A2E] bg-transparent border-none focus:ring-0 p-0 italic w-[300px]"
          />
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={() => setShowTestModal(true)}
            className="px-6 py-2.5 rounded-2xl border border-slate-200 text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
           >
              Tester la règle
           </button>
           <button 
            onClick={handleSave}
            className="px-8 py-2.5 rounded-2xl bg-[#7C5CFC] text-white font-black text-sm shadow-lg shadow-[#7C5CFC]/20 hover:bg-[#6a4de2] transition-all"
           >
              Activer
           </button>
        </div>
      </header>

      {/* Builder Canvas */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-[800px] mx-auto space-y-8 flex flex-col items-center">
          
          {/* TRIGGER SECTION */}
          <section className="w-full">
             <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#7C5CFC] shadow-sm">
                   <Zap className="w-4 h-4" />
                </div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Déclencheur (Quand...)</h3>
             </div>
             
             <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catégorie</label>
                      <select className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-[#7C5CFC]/20">
                         <option>Pipeline</option>
                         <option>Distributeurs</option>
                         <option>Contacts</option>
                         <option>Système</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Évènement</label>
                      <select className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-[#7C5CFC]/20">
                         <option>Un deal change d'étape</option>
                         <option>Un deal est créé</option>
                         <option>Un deal est marqué Gagné</option>
                      </select>
                   </div>
                </div>
                
                <div className="mt-8 p-4 bg-[#F5F3FF] border border-[#7C5CFC]/10 rounded-2xl flex items-center gap-3">
                   <Info className="w-4 h-4 text-[#7C5CFC]" />
                   <p className="text-xs font-bold text-[#7C5CFC]">Cette règle s'appliquera à tous les nouveaux deals entrant dans le pipeline.</p>
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
                   <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Conditions (Si...)</h3>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                   <button className="px-3 py-1 bg-white text-[9px] font-black uppercase tracking-widest rounded shadow-xs text-[#1A1A2E]">Toutes (AND)</button>
                   <button className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-400">Une seule (OR)</button>
                </div>
             </div>
             
             <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
                <div className="space-y-3">
                  {conditions.map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                       <select className="flex-1 bg-slate-50 border-none rounded-xl py-2 px-4 text-sm font-bold text-[#1A1A2E]">
                          <option>Valeur du deal</option>
                          <option>Assigne à</option>
                       </select>
                       <select className="flex-1 bg-slate-50 border-none rounded-xl py-2 px-4 text-sm font-bold text-[#1A1A2E]">
                          <option>est supérieur à</option>
                          <option>est égal à</option>
                       </select>
                       <input type="text" className="flex-1 bg-slate-50 border-none rounded-xl py-2 px-4 text-sm font-bold text-[#1A1A2E]" placeholder="Valeur..." />
                       <button onClick={() => setConditions(conditions.slice(0, -1))} className="p-2 text-slate-300 hover:text-red-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                  
                  <button 
                   onClick={() => setConditions([...conditions, {field: '', operator: '', value: ''}])}
                   className="w-full py-4 border-2 border-dashed border-slate-100 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:bg-slate-50 hover:border-slate-200 transition-all"
                  >
                     <Plus className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest underline decoration-slate-200">Ajouter une condition</span>
                  </button>
                </div>
             </div>
          </section>

          <ArrowDown className="text-slate-200 w-8 h-8" />

          {/* ACTIONS SECTION */}
          <section className="w-full">
             <div className="flex items-center gap-3 mb-4 px-2">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-emerald-500 shadow-sm">
                   <Play className="w-4 h-4" />
                </div>
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Actions (Alors...)</h3>
             </div>
             
             <div className="space-y-4">
               {actions.map((act, i) => (
                 <div key={i} className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#7C5CFC]/10 flex items-center justify-center text-[#7C5CFC] shrink-0">
                       <Bell className="w-6 h-6" />
                    </div>
                    <div className="flex-1 space-y-4">
                       <div className="flex justify-between items-center">
                          <h4 className="font-black text-[#1A1A2E] text-sm uppercase tracking-wider">Action #{i+1}</h4>
                          <button onClick={() => setActions(actions.slice(0, -1))} className="text-slate-300 hover:text-red-500 transition-all"><X className="w-4 h-4" /></button>
                       </div>
                       <div className="space-y-4">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Destinataires</label>
                             <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-[#1A1A2E]">
                                <option>Commercial Assigné</option>
                                <option>Admin</option>
                             </select>
                          </div>
                          <div className="space-y-2 relative">
                             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Message</label>
                             <textarea 
                                className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-[#1A1A2E] min-h-[100px] resize-none"
                                placeholder="Utilisez {{...}} pour insérer des variables"
                             />
                             <div className="absolute top-2 right-2 flex gap-1">
                                <button className="bg-white px-2 py-1 rounded-lg border border-slate-100 text-[9px] font-black text-[#7C5CFC] hover:shadow-sm transition-all">{"{{deal.name}}"}</button>
                                <button className="bg-white px-2 py-1 rounded-lg border border-slate-100 text-[9px] font-black text-[#7C5CFC] hover:shadow-sm transition-all">{"{{value}}"}</button>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}

               <div className="bg-white rounded-[40px] p-10 border-2 border-dashed border-slate-200 flex flex-col items-center">
                  <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-8">Choisir une action à ajouter</div>
                  <div className="flex flex-wrap justify-center gap-4">
                     {actionTypes.map(act => (
                        <button 
                         key={act.id}
                         onClick={() => setActions([...actions, {type: act.id, config: {}}])}
                         className="flex flex-col items-center gap-3 p-5 rounded-[24px] hover:bg-[#F5F3FF] border border-transparent hover:border-[#7C5CFC]/20 transition-all group"
                        >
                           <div className={`${act.color} p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                              <act.icon className="w-6 h-6" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 group-hover:text-[#7C5CFC]">{act.label}</span>
                        </button>
                     ))}
                  </div>
               </div>
             </div>
          </section>
        </div>
      </main>

      {/* Test Modal */}
      <AnimatePresence>
        {showTestModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A2E]/60 backdrop-blur-md" onClick={() => setShowTestModal(false)} />
             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white w-full max-w-[600px] rounded-[40px] overflow-hidden shadow-2xl">
                <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                       <h2 className="text-2xl font-black text-[#1A1A2E] tracking-tight">Test de la règle</h2>
                       <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest italic">Simulation à sec (Dry-run)</p>
                    </div>
                    <button onClick={() => setShowTestModal(false)} className="p-2.5 rounded-2xl bg-white text-slate-300 hover:text-slate-600 shadow-sm"><X className="w-5 h-5"/></button>
                </div>
                <div className="p-10 space-y-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block pl-1">Sélectionner un deal test</label>
                      <select className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-black text-[#1A1A2E] appearance-none shadow-sm">
                         <option>Expansion BioMed GmbH - Munich</option>
                         <option>Hôpital Civil - Stockholm</option>
                         <option>Clinique du Parc - Lyon</option>
                      </select>
                   </div>
                   
                   <div className="p-6 rounded-[24px] bg-[#1A1A2E] text-emerald-400 font-mono text-[11px] leading-relaxed shadow-xl">
                      <div className="flex items-center gap-2 mb-2 text-slate-500 font-sans italic">/ logs simulation...</div>
                      <div>&gt; [15:58:32] Trigger detected: Stage Change</div>
                      <div className="text-white">&gt; [15:58:32] Condition: Valeur (45,000) &gt; 20,000? <span className="text-emerald-400 font-bold underline">PASSED</span></div>
                      <div>&gt; [15:58:33] Action queueing: notifier_commercial_assigne</div>
                      <div className="text-slate-500">&gt; [15:58:33] DRY RUN COMPLETE: 1 successful execution path found.</div>
                   </div>

                   <button 
                    onClick={() => { toast.success("Simulation terminée. Aucune erreur détectée."); setShowTestModal(false); }}
                    className="w-full bg-[#7C5CFC] text-white py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-[#7C5CFC]/20"
                   >
                      Lancer le test
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
