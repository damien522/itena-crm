"use client";

import { Deal } from "@/data/pipeline";
import { 
  Download, Search, Filter, User, Tag, 
  ArrowRight, Clock, FileText, Settings, History, ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface HistoryTabProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function HistoryTab({ deal }: HistoryTabProps) {
  const [search, setSearch] = useState("");

  const filteredHistory = deal.history.filter(h => 
    h.action.toLowerCase().includes(search.toLowerCase()) || 
    h.detail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 space-y-8 max-w-[1000px]">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-2xl border border-slate-100 shadow-sm flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-300" />
            <input 
              type="text" 
              placeholder="Rechercher dans l'historique..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-[#1A1A2E] w-full"
            />
         </div>
         
         <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-100 text-slate-600 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all">
               <Filter className="w-4 h-4" /> Filtres
            </button>
            <button 
              onClick={() => toast.success("Export CSV lancé")}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1A1A2E] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-black transition-all"
            >
               <Download className="w-4 h-4" /> Exporter CSV
            </button>
         </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden pb-8">
         <table className="w-full text-left">
            <thead className="bg-slate-50/50">
               <tr>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Horodatage</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Utilisateur</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Détails</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
               {filteredHistory.map((h, i) => (
                 <tr key={h.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-10 py-6">
                       <div className="flex flex-col">
                          <span className="text-xs font-black text-[#1A1A2E]">{new Date(h.timestamp).toLocaleDateString('fr-FR')}</span>
                          <span className="text-[10px] font-bold text-slate-400 tabular-nums">{new Date(h.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                       </div>
                    </td>
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 italic">
                             {h.userAvatar}
                          </div>
                          <span className="text-xs font-bold text-slate-600">{h.user}</span>
                       </div>
                    </td>
                    <td className="px-10 py-6">
                       <span className={cn(
                         "text-[9px] font-black uppercase px-2.5 py-1 rounded-lg border",
                         h.action === "Creation" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                         h.action === "Stage" ? "bg-violet-50 text-violet-600 border-violet-100" :
                         h.action === "Document" ? "bg-blue-50 text-blue-600 border-blue-100" :
                         h.action === "Note" ? "bg-amber-50 text-amber-600 border-amber-100" :
                         "bg-slate-50 text-slate-500 border-slate-100"
                       )}>
                          {h.action}
                       </span>
                    </td>
                    <td className="px-10 py-6">
                       <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600 italic leading-relaxed">
                          {h.detail.includes("->") ? (
                            <div className="flex items-center gap-2">
                               {h.detail.split("->")[0]} 
                               <ArrowRight className="w-3 h-3 text-slate-300" />
                               <span className="text-[#1A1A2E] font-black">{h.detail.split("->")[1]}</span>
                            </div>
                          ) : (
                            h.detail
                          )}
                       </div>
                    </td>
                 </tr>
               ))}
            </tbody>
         </table>
         
         {filteredHistory.length === 0 && (
           <div className="py-20 text-center space-y-4">
              <History className="w-16 h-16 text-slate-100 mx-auto" />
              <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">Aucun log trouvé pour cette recherche</p>
           </div>
         )}
      </div>

      <div className="flex items-center justify-center pt-4">
         <div className="bg-slate-50/50 px-6 py-2 rounded-full border border-slate-100 flex items-center gap-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Journal d'audit immuable</span>
         </div>
      </div>
    </div>
  );
}
