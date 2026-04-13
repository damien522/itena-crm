"use client";

import { useState } from "react";
import { mockAutomations, Automation } from "@/data/automations";
import { 
  Plus, Zap, Play, Pause, MoreVertical, 
  Calendar, Clock, User, ArrowRight,
  Filter, Search, Power, Trash2, Copy, Edit2
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyState } from "@/components/ui/EmptyState";
import { EmptyAutomations } from "@/components/ui/empty-illustrations";

export default function AutomationsPage() {
  const [automations, setAutomations] = useState<Automation[]>(mockAutomations);
  const [search, setSearch] = useState("");

  const filtered = automations.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <div className="w-10 h-10 rounded-2xl bg-[#7C5CFC] flex items-center justify-center text-white shadow-lg shadow-[#7C5CFC]/20 shrink-0">
                <Zap className="w-5 h-5" />
             </div>
             <h1 className="text-3xl font-black text-[#1A1A2E] tracking-tight italic">Automatisations</h1>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">Règles conditionnelles déclenchées par vos données</p>
        </div>
        
        <Link 
          href="/automatisations/new"
          className="bg-[#1A1A2E] text-white px-8 py-3.5 rounded-2xl text-sm font-black transition-all shadow-lg shadow-black/10 hover:bg-black hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        >
          <Plus className="w-5 h-5 font-black"/> Nouvelle automatisation
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
          <input 
            type="text" 
            placeholder="Rechercher une règle..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-11 pr-4 text-sm font-bold text-[#1A1A2E] placeholder-slate-300 focus:ring-2 focus:ring-[#7C5CFC]/20 outline-none transition-all shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-[#7C5CFC] hover:border-[#7C5CFC]/30 transition-all shadow-sm">
           <Filter className="w-4 h-4" /> Filtres
        </button>
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <EmptyState 
          illustration={<EmptyAutomations />}
          title="Aucune règle trouvée"
          subtitle="Modifiez votre recherche ou créez une nouvelle automatisation."
          actionLabel="Créer une automatisation"
          onAction={() => {}} // Handle redirection or modal
        />
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((auto) => (
            <motion.div
              key={auto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#7C5CFC]/20 transition-all overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-2xl ${auto.status === 'Actif' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'}`}>
                     <Zap className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                     <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-1 rounded-lg ${auto.status === 'Actif' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                        {auto.status}
                     </div>
                     <button className="p-2 rounded-xl border border-slate-100 text-slate-300 hover:text-[#7C5CFC] transition-all">
                        <MoreVertical className="w-4 h-4" />
                     </button>
                  </div>
                </div>

                <h3 className="text-lg font-black text-[#1A1A2E] leading-tight mb-4 group-hover:text-[#7C5CFC] transition-colors">
                  {auto.name}
                </h3>

                <div className="space-y-4">
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mt-2 shrink-0" />
                      <div>
                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Déclencheur</span>
                         <p className="text-xs font-bold text-[#1A1A2E] leading-relaxed">{auto.trigger.event}</p>
                      </div>
                   </div>
                   {auto.conditions.length > 0 && (
                     <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        <div>
                           <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Conditions</span>
                           <p className="text-xs font-bold text-[#1A1A2E] leading-relaxed">
                              {auto.conditions.map(c => `${c.field} ${c.operator} ${c.value}`).join(', ')}
                           </p>
                        </div>
                     </div>
                   )}
                   <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C5CFC] mt-2 shrink-0 shadow-[0_0_8px_rgba(124,92,252,0.5)]" />
                      <div>
                         <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-1">Actions</span>
                         <p className="text-xs font-bold text-[#1A1A2E] leading-relaxed">
                            {auto.actions.length} action{auto.actions.length > 1 ? 's' : ''} configurée{auto.actions.length > 1 ? 's' : ''}
                         </p>
                      </div>
                   </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                       <Play className="w-3 h-3 text-slate-300" />
                       <span className="text-[10px] font-black text-slate-400 tabular-nums">{auto.triggerCount} runs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                       <Clock className="w-3 h-3 text-slate-300" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                          {auto.lastTriggered ? `Hier` : "Jamais"}
                       </span>
                    </div>
                 </div>
                 <Link 
                  href={`/automatisations/${auto.id}`}
                  className="p-2 bg-white rounded-xl border border-slate-200 text-slate-400 hover:text-[#7C5CFC] hover:border-[#7C5CFC]/30 transition-all shadow-sm"
                 >
                    <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </motion.div>
          ))}

          {/* Create new card */}
          <Link
            href="/automatisations/new"
            className="group relative rounded-[32px] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-8 hover:border-[#7C5CFC]/30 hover:bg-[#F5F3FF]/30 transition-all gap-4"
          >
            <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-white group-hover:shadow-xl transition-all">
               <Plus className="w-8 h-8" />
            </div>
            <div className="text-center">
               <div className="font-black text-[#1A1A2E] text-sm uppercase tracking-wider mb-1">Créer une règle</div>
               <p className="text-[10px] text-slate-400 font-bold max-w-[140px]">Améliorez votre efficacité opérationnelle</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
