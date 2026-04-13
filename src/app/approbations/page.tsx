"use client";

import { useState, useMemo } from "react";
import { approbationsData, ApprovalRequest, ImpactLevel, ApprovalStatus } from "@/data/approbations";
import { 
  ShieldCheck, Check, X, Edit3, ChevronDown, ChevronRight, 
  Clock, AlertTriangle, Info, ArrowRight, Download, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const impactColors: Record<ImpactLevel, string> = {
  Faible: "bg-slate-100 text-slate-600 border-slate-200",
  Modéré: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Élevé: "bg-orange-100 text-orange-700 border-orange-200",
  Critique: "bg-red-100 text-red-700 border-red-200"
};

const getImpactBadge = (level: ImpactLevel) => (
  <span className={cn("px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border", impactColors[level] || impactColors.Faible)}>
    {level}
  </span>
);

export default function ApprobationsPage() {
  const [data, setData] = useState<ApprovalRequest[]>(approbationsData);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({ pending: true, processed: false, history: false });
  const [expandedSourceDocs, setExpandedSourceDocs] = useState(false);
  
  // Action states for the right panel
  const [actionConfirmed, setActionConfirmed] = useState<"accept" | "refuse" | "modify" | null>(null);
  const [refuseReason, setRefuseReason] = useState("");
  const [modifyDraft, setModifyDraft] = useState("");

  const pending = data.filter(d => d.status === "pending").sort((a, b) => {
    // strict urgency map
    const uA = a.urgencyDeadline ? new Date(a.urgencyDeadline).getTime() : Infinity;
    const uB = b.urgencyDeadline ? new Date(b.urgencyDeadline).getTime() : Infinity;
    if (uA !== uB) return uA - uB;
    
    // impact
    const iMap = { "Critique": 4, "Élevé": 3, "Modéré": 2, "Faible": 1 };
    if (iMap[a.impactLevel] !== iMap[b.impactLevel]) return iMap[b.impactLevel] - iMap[a.impactLevel];
    
    // time
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  const processed = data.filter(d => ["accepted", "refused", "modified"].includes(d.status) && new Date(d.decisionAt || "").toDateString() === new Date().toDateString());
  const history = data.filter(d => ["accepted", "refused", "modified"].includes(d.status) && d.id && !processed.find(p => p.id === d.id));

  const selectedReq = data.find(d => d.id === selectedId);

  const handleAction = (id: string, newStatus: ApprovalStatus, reason?: string) => {
    setData(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: newStatus, decisionAt: new Date().toISOString(), decisionBy: "Marie Dupont", decisionReason: reason || null };
      }
      return req;
    }));
    
    if (newStatus === 'accepted') toast.success("Bobby peut procéder. Action lancée. ✓");
    if (newStatus === 'refused') toast.success("Demande refusée. Bobby en tiendra compte. ✗");
    if (newStatus === 'modified') toast.success("Demande modifiée et approuvée. Bobby exécute votre version. ✎✓");
    
    if (selectedId === id) setSelectedId(null);
  };

  const getTimeAgo = (dateStr: string) => {
    const minDiff = Math.round((new Date().getTime() - new Date(dateStr).getTime()) / 60000);
    if (minDiff < 60) return `il y a ${minDiff} min`;
    const hrDiff = Math.floor(minDiff/60);
    if (hrDiff < 24) return `il y a ${hrDiff} h`;
    return `il y a ${Math.floor(hrDiff/24)} j`;
  };

  const getUrgencyText = (dateStr: string | null) => {
    if (!dateStr) return "Pas d'urgence";
    const minDiff = Math.round((new Date(dateStr).getTime() - new Date().getTime()) / 60000);
    if (minDiff < 0) return "Expiré";
    if (minDiff < 60) return `Expire dans ${minDiff} min`;
    return `Expire dans ${Math.floor(minDiff/60)} h`;
  };

  const toggleSection = (sec: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] overflow-hidden">
      
      {/* PAGE HEADER */}
      <div className="shrink-0 mb-6 glass-card rounded-[32px] p-8 border-beam">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1A1A2E] tracking-tight">Approbations</h1>
            <p className="text-sm font-bold text-[#6B7280] mt-1">Bobby vous demande votre accord avant d'agir.</p>
            
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[13px] font-black text-[#1A1A2E]">{pending.length}</span>
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">En attente</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[13px] font-black text-[#1A1A2E]">{processed.length}</span>
                <span className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Traitées obj.</span>
              </div>
              <div className="w-px h-6 bg-slate-200" />
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 opacity-50" />
                <span className="text-[13px] font-black text-[#6B7280]">
                   {data.filter(d => d.status === 'refused').length}
                </span>
                <span className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-widest">Refusées ce mois</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <button className="text-[12px] font-black uppercase tracking-widest text-[#7C5CFC] hover:bg-[#7C5CFC]/5 px-4 py-2 rounded-xl transition-colors">
              Tout marquer comme lu
            </button>
            <div className="relative">
              <select className="appearance-none bg-white border border-slate-200 text-[#1A1A2E] text-[12px] font-black uppercase tracking-widest rounded-xl px-5 py-2.5 pr-10 focus:ring-2 focus:ring-[#7C5CFC]/20 outline-none">
                <option>Tous les agents</option>
                <option>🤖 Relances</option>
                <option>🛡️ Qualité</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT COLUMN: LIST (58%) */}
        <div className="w-[58%] flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 pb-10">
          
          {/* Section 1: En Attente */}
          <div>
            <button onClick={() => toggleSection('pending')} className="flex items-center gap-2 mb-3 px-2 group">
              <ChevronRight className={cn("w-4 h-4 text-slate-400 transition-transform", expandedSections.pending && "rotate-90")} />
              <span className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.2em] group-hover:text-[#1A1A2E]">En attente ({pending.length})</span>
            </button>
            
            <AnimatePresence>
              {expandedSections.pending && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="space-y-3 overflow-hidden">
                  {pending.map(req => (
                    <motion.div 
                      key={req.id} 
                      layout
                      onClick={() => { setSelectedId(req.id); setActionConfirmed(null); setExpandedSourceDocs(false); }}
                      className={cn(
                        "rounded-[24px] border-l-[4px] border-amber-500 bg-amber-500/5 p-5 cursor-pointer transition-all border-y border-r border-[#E5E7EB] hover:shadow-lg",
                        selectedId === req.id && "bg-amber-500/10 border-amber-500/30 ring-2 ring-amber-500/20"
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-black text-white shadow-sm" style={{ backgroundColor: req.agentColor }}>
                            {req.agentName}
                          </span>
                          <h3 className="text-[14px] font-[600] text-[#1A1A2E] leading-tight line-clamp-1">{req.title}</h3>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 shrink-0 mt-0.5">{getTimeAgo(req.createdAt)}</span>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-[13px] text-slate-600 font-medium">
                          {req.summary} <span className="text-[#7C5CFC] hover:underline" onClick={(e) => { e.stopPropagation(); }}>→</span>
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider",
                            req.urgencyDeadline ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"
                          )}>
                            <Clock className="w-3 h-3" /> {getUrgencyText(req.urgencyDeadline)}
                          </span>
                          {getImpactBadge(req.impactLevel)}
                          {req.bobbyRecommendation && (
                            <span className="px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-violet-100 text-violet-700">
                              Bobby : {req.bobbyRecommendation.decision}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex gap-2 shrink-0">
                          <button onClick={(e) => { e.stopPropagation(); handleAction(req.id, 'accepted'); }} title="Accepter" className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white transition-colors flex items-center justify-center">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); handleAction(req.id, 'refused', 'Rejet rapide'); }} title="Refuser" className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center">
                            <X className="w-4 h-4" />
                          </button>
                          <button onClick={(e) => { e.stopPropagation(); setSelectedId(req.id); setActionConfirmed('modify'); }} title="Modifier" className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 hover:bg-violet-500 hover:text-white transition-colors flex items-center justify-center">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {pending.length === 0 && <p className="text-sm text-slate-400 p-4">Aucune demande en attente.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 2: Traitées */}
          <div>
            <button onClick={() => toggleSection('processed')} className="flex items-center gap-2 mb-3 mt-4 px-2 group">
              <ChevronRight className={cn("w-4 h-4 text-slate-400 transition-transform", expandedSections.processed && "rotate-90")} />
              <span className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.2em] group-hover:text-[#1A1A2E]">Traitées ({processed.length})</span>
            </button>
            <AnimatePresence>
              {expandedSections.processed && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="space-y-3 overflow-hidden">
                  {processed.map(req => (
                    <motion.div key={req.id} layout className={cn("rounded-[24px] border-l-[4px] p-4 bg-white border-y border-r border-[#E5E7EB] opacity-80", 
                      req.status === 'accepted' ? "border-emerald-500" : req.status === 'refused' ? "border-rose-500" : "border-violet-500"
                    )}>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <span className="w-2 h-2 rounded-full" style={{ backgroundColor: req.agentColor }} />
                           <h3 className="text-[13px] font-bold text-[#1A1A2E]">{req.title}</h3>
                        </div>
                        <span className="text-[10px] font-black uppercase text-slate-400">{req.status === 'accepted' ? 'Accepté' : req.status === 'refused' ? 'Refusé' : 'Modifié'} par {req.decisionBy} à {req.decisionAt && new Date(req.decisionAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      </div>
                    </motion.div>
                  ))}
                  {processed.length === 0 && <p className="text-sm text-slate-400 p-4">Aucune demande traitée aujourd'hui.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 3: Historique */}
          <div>
            <button onClick={() => toggleSection('history')} className="flex items-center gap-2 mb-3 mt-4 px-2 group">
              <ChevronRight className={cn("w-4 h-4 text-slate-400 transition-transform", expandedSections.history && "rotate-90")} />
              <span className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.2em] group-hover:text-[#1A1A2E]">Historique</span>
            </button>
            <AnimatePresence>
              {expandedSections.history && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                  <div className="glass-card rounded-[24px] overflow-hidden">
                    <div className="p-4 flex justify-between items-center border-b border-[#E5E7EB]">
                       <span className="text-[11px] font-black uppercase text-slate-400">Archives complètes</span>
                       <button className="flex items-center gap-1.5 text-[10px] font-black uppercase bg-white border px-3 py-1.5 rounded-lg hover:bg-slate-50"><Download className="w-3 h-3"/> CSV</button>
                    </div>
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
                        <tr>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Agent</th>
                          <th className="px-4 py-3">Demande</th>
                          <th className="px-4 py-3">Décision</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB]">
                        {history.map(req => (
                          <tr key={req.id} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3 font-medium text-slate-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3"><span className="px-2 py-0.5 rounded text-[10px]" style={{backgroundColor: `${req.agentColor}20`, color: req.agentColor}}>{req.agentName}</span></td>
                            <td className="px-4 py-3 text-slate-700 truncate max-w-[200px]">{req.title}</td>
                            <td className="px-4 py-3">
                              <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase", 
                                req.status === 'accepted' ? "bg-emerald-100 text-emerald-700" :
                                req.status === 'refused' ? "bg-rose-100 text-rose-700" : "bg-violet-100 text-violet-700"
                              )}>
                                {req.status === 'accepted' ? 'Accepté' : req.status === 'refused' ? 'Refusé' : 'Modifié'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* RIGHT COLUMN: DETAIL PANEL (42%) */}
        <div className="w-[42%] bg-white rounded-[32px] border border-[#E5E7EB] shadow-2xl flex flex-col relative overflow-hidden">
          
          {!selectedReq ? (
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-24 h-24 rounded-full bg-[#7C5CFC]/5 flex items-center justify-center mb-6">
                <ShieldCheck className="w-12 h-12 text-[#7C5CFC]/40" strokeWidth={1} />
              </div>
              <h2 className="text-xl font-black text-[#1A1A2E] mb-2">Sélectionnez une demande</h2>
              <p className="text-[#64748B] text-sm">Le détail de la demande et les options d'approbation apparaîtront ici.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                
                {/* SECTION A: Header */}
                <div className="p-8 border-b border-[#F3F4F6]">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-2xl shrink-0" style={{ background: `linear-gradient(135deg, ${selectedReq.agentColor}, ${selectedReq.agentColor}80)` }}>
                      {selectedReq.agentName.split(' ')[0]}
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase text-slate-400 tracking-widest">{selectedReq.agentName}</p>
                      <h2 className="text-[18px] font-[600] text-[#1A1A2E] leading-tight mt-1">{selectedReq.title}</h2>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md">{new Date(selectedReq.createdAt).toLocaleString('fr-FR', { dateStyle:'short', timeStyle:'short' })}</span>
                    {selectedReq.urgencyDeadline && (
                       <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-100 flex items-center gap-1">
                         <Clock className="w-3 h-3"/> Expire à {new Date(selectedReq.urgencyDeadline).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}
                       </span>
                    )}
                    {getImpactBadge(selectedReq.impactLevel)}
                  </div>

                  {selectedReq.bobbyRecommendation && (
                    <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                      <p className="text-[11px] font-black uppercase tracking-widest text-violet-600 mb-1 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5"/> Bobby recommande : {selectedReq.bobbyRecommendation.decision}</p>
                      <p className="text-[13px] text-violet-800 italic leading-relaxed">"{selectedReq.bobbyRecommendation.reasoning}"</p>
                    </div>
                  )}
                </div>

                {/* SECTION B: Contexte */}
                <div className="p-8 border-b border-[#F3F4F6]">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9CA3AF] mb-5">Contexte et déclencheur</h3>
                  <div className="space-y-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Ce qui a déclenché cette demande</p>
                      <p className="text-[14px] text-[#1A1A2E] bg-slate-50 p-3 rounded-xl border border-slate-100/50">{selectedReq.triggerEvent}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Ce que Bobby veut faire</p>
                      {actionConfirmed === 'modify' ? (
                        <textarea 
                           className="w-full text-[14px] text-[#1A1A2E] bg-white p-3 rounded-xl border-2 border-violet-300 focus:outline-none focus:ring-4 focus:ring-violet-100 transition-shadow resize-y"
                           rows={3}
                           value={modifyDraft}
                           onChange={(e) => setModifyDraft(e.target.value)}
                        />
                      ) : (
                        <p className="text-[14px] text-[#1A1A2E] font-medium bg-white p-3 rounded-xl shadow-sm border border-slate-200">{selectedReq.intendedAction}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Objectif visé</p>
                      <p className="text-[14px] text-emerald-700 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100/50 flex items-start gap-2">
                         <span className="mt-0.5">🎯</span> {selectedReq.objective}
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECTION C: Conséquences */}
                <div className="p-8 border-b border-[#F3F4F6]">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9CA3AF] mb-5 flex items-center justify-between">
                     Conséquences simulées
                     <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded text-slate-500 animate-pulse">Live</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-emerald-100 bg-emerald-50/30 rounded-2xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600 mb-3 text-center">Si vous acceptez</p>
                      <ul className="space-y-2">
                        {selectedReq.acceptConsequences.map((c, i) => (
                           <li key={i} className="text-[12px] text-slate-700 leading-snug flex items-start gap-1">
                              <span className="text-emerald-500 shrink-0 select-none">✓</span> {c.replace('✓ ', '')}
                           </li>
                        ))}
                        {selectedReq.acceptConsequences.length === 0 && <li className="text-[12px] text-slate-400 italic text-center">Aucun effet de bord</li>}
                      </ul>
                    </div>
                    <div className="border border-rose-100 bg-rose-50/30 rounded-2xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-rose-600 mb-3 text-center">Si vous refusez</p>
                      <ul className="space-y-2">
                        {selectedReq.refuseConsequences.map((c, i) => (
                           <li key={i} className="text-[12px] text-slate-700 leading-snug flex items-start gap-1">
                              <span className="text-rose-500 shrink-0 select-none">✗</span> {c.replace('✗ ', '')}
                           </li>
                        ))}
                        {selectedReq.refuseConsequences.length === 0 && <li className="text-[12px] text-slate-400 italic text-center">Statu quo maintenu</li>}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* SECTION D: Données Sources */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#9CA3AF]">Données utilisées par Bobby</h3>
                    <button onClick={() => setExpandedSourceDocs(!expandedSourceDocs)} className="text-[11px] text-[#7C5CFC] font-black uppercase hover:underline">
                      {expandedSourceDocs ? "Masquer les données" : "Voir les données"}
                    </button>
                  </div>
                  
                  <AnimatePresence>
                    {expandedSourceDocs && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-2 lg:grid-cols-3 gap-6">
                           {selectedReq.sourceData.metrics.map((m, i) => (
                              <div key={i}>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">{m.label}</p>
                                <p className="text-[16px] font-black text-[#1A1A2E] mt-0.5 flex items-center gap-1">
                                  {m.value} 
                                  {m.trend && <span className={cn("text-[10px]", m.trend.startsWith('-') ? "text-rose-500" : "text-emerald-500")}>{m.trend}</span>}
                                </p>
                              </div>
                           ))}
                           {selectedReq.sourceData.sparklineData && (
                              <div className="col-span-full h-12 flex items-end justify-between px-2 pt-2 border-t border-slate-200/50 mt-2">
                                 {selectedReq.sourceData.sparklineData.map((val, i) => (
                                    <div key={i} className="w-full mx-1 bg-violet-200 rounded-t-sm" style={{ height: `${Math.max(10, (val/50)*100)}%`}} />
                                 ))}
                              </div>
                           )}
                           {selectedReq.sourceData.metrics.length === 0 && <p className="text-xs text-slate-400 col-span-full">Données sources non disponibles pour cette requête.</p>}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Pad for the sticky footer */}
                <div className="h-40" />
              </div>

              {/* ACTION BUTTONS (Sticky Bottom) */}
              <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-xl border-t border-[#E5E7EB] p-6 flex flex-col gap-3 z-10 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.1)]">
                
                <AnimatePresence mode="wait">
                  {actionConfirmed === 'accept' ? (
                     <motion.div key="cf-accept" initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="flex flex-col gap-2">
                        <button onClick={() => handleAction(selectedReq.id, 'accepted')} className="w-full bg-[#34D399] hover:bg-emerald-500 text-white font-black text-[14px] py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                          <Check className="w-5 h-5"/> Confirmer l'acceptation ? <span className="text-emerald-100 text-[10px] ml-2">(Auto dans 3s)</span>
                        </button>
                        <button onClick={() => setActionConfirmed(null)} className="text-[11px] font-black text-slate-400 hover:text-slate-600 uppercase w-full text-center py-2">Annuler</button>
                     </motion.div>
                  ) : actionConfirmed === 'refuse' ? (
                     <motion.div key="cf-refuse" initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="flex flex-col gap-3">
                        <select value={refuseReason} onChange={(e) => setRefuseReason(e.target.value)} className="w-full p-3 rounded-xl border border-rose-200 bg-rose-50 text-rose-900 text-sm font-medium focus:ring-2 focus:ring-rose-500 outline-none">
                           <option value="" disabled>Sélectionnez une raison</option>
                           <option value="Timing inapproprié">Timing inapproprié</option>
                           <option value="Informations incorrectes">Informations incorrectes</option>
                           <option value="Décision déjà prise manuellement">Décision déjà prise manuellement</option>
                           <option value="Stratégie commerciale différente">Stratégie commerciale différente</option>
                           <option value="Autre">Autre...</option>
                        </select>
                        <div className="flex gap-2">
                           <button onClick={() => setActionConfirmed(null)} className="flex-1 bg-white border border-slate-200 text-slate-600 font-black text-[13px] py-3 rounded-xl hover:bg-slate-50 transition-all">Annuler</button>
                           <button disabled={!refuseReason} onClick={() => handleAction(selectedReq.id, 'refused', refuseReason)} className="flex-1 bg-rose-500 disabled:opacity-50 text-white font-black text-[13px] py-3 rounded-xl hover:bg-rose-600 transition-all shadow-lg">Confirmer le refus</button>
                        </div>
                     </motion.div>
                  ) : actionConfirmed === 'modify' ? (
                     <motion.div key="cf-modify" initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="flex flex-col gap-2">
                        <button disabled={modifyDraft === selectedReq.intendedAction || !modifyDraft.trim()} onClick={() => handleAction(selectedReq.id, 'modified', modifyDraft)} className="w-full bg-[#10B981] disabled:opacity-50 text-white font-black text-[14px] py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                          <Check className="w-5 h-5"/> Valider les modifications et approuver
                        </button>
                        <button onClick={() => setActionConfirmed(null)} className="text-[11px] font-black text-slate-400 hover:text-slate-600 uppercase w-full text-center py-2">Annuler</button>
                     </motion.div>
                  ) : (
                     <motion.div key="base" initial={{opacity:0, y:10}} animate={{opacity:1,y:0}} className="flex gap-3">
                        <button onClick={() => setActionConfirmed('accept')} className="flex-1 bg-[#34D399] hover:bg-emerald-500 text-white font-black text-[15px] py-4 rounded-[16px] transition-all shadow-[0_8px_20px_-8px_rgba(52,211,153,0.6)] flex items-center justify-center gap-2 hover:-translate-y-0.5">
                          ✓ Accepter
                        </button>
                        <button onClick={() => { setRefuseReason(""); setActionConfirmed('refuse'); }} className="flex-[0.8] bg-transparent border-2 border-rose-500 text-rose-500 hover:bg-rose-50 font-black text-[14px] py-4 rounded-[16px] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                          ✗ Refuser
                        </button>
                        <button onClick={() => { setModifyDraft(selectedReq.intendedAction); setActionConfirmed('modify'); }} className="flex-[0.8] bg-transparent border-2 border-[#7C5CFC] text-[#7C5CFC] hover:bg-[#7C5CFC]/5 font-black text-[14px] py-4 rounded-[16px] transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                          ✎ Modifier
                        </button>
                     </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </>
          )}

        </div>
      </div>
    
    </div>
  );
}
