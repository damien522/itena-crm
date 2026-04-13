"use client";

import { useState } from "react";
import { reclamations, Claim } from "@/data/reclamations";
import { 
  AlertCircle, CheckCircle2, Clock, Bot, X, MoreVertical, 
  MessageSquare, LineChart as LucideLineChart, BarChart as LucideBarChart, 
  Plus, Send, Edit2, FileText, CheckCircle, ChevronRight, Activity, TrendingUp, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, 
  Tooltip as RechartsTooltip, ResponsiveContainer, 
  LineChart as RechartsLineChart, Line, CartesianGrid 
} from "recharts";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const TABS = ["Toutes", "Ouvertes", "En cours", "Résolues", "Rapports qualité"];

const chartData1 = [
  { name: 'Protéger', value: 12 },
  { name: 'Préserver', value: 5 },
  { name: 'Remplacer', value: 3 },
  { name: 'Prendre Soin', value: 7 },
];

const chartData2 = [
  { month: 'Oct', jours: 3.5 },
  { month: 'Nov', jours: 3.1 },
  { month: 'Déc', jours: 2.8 },
  { month: 'Jan', jours: 2.5 },
  { month: 'Fév', jours: 2.4 },
  { month: 'Mar', jours: 2.3 },
];

export default function Reclamations() {
  const [activeTab, setActiveTab] = useState("Toutes");
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [confirmClose, setConfirmClose] = useState<string | null>(null);

  const filteredClaims = activeTab === "Toutes" || activeTab === "Rapports qualité" 
    ? reclamations 
    : reclamations.filter(c => {
        if (activeTab === "Ouvertes") return c.status === "Ouverte";
        if (activeTab === "En cours") return c.status === "En cours";
        if (activeTab === "Résolues") return c.status === "Résolue";
        return true;
      });

  const getSeverityStyles = (severity: string) => {
    switch(severity) {
      case "Critique": return { badge: "bg-rose-500/10 text-rose-600 border-rose-500/20", glow: "shadow-[0_0_12px_rgba(244,63,94,0.3)]", dot: "bg-rose-500" };
      case "Haute": return { badge: "bg-orange-500/10 text-orange-600 border-orange-500/20", glow: "", dot: "bg-orange-500" };
      case "Normale": return { badge: "bg-amber-500/10 text-amber-600 border-amber-500/20", glow: "", dot: "bg-amber-500" };
      default: return { badge: "bg-slate-400/10 text-slate-500 border-slate-400/20", glow: "", dot: "bg-slate-400" };
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10" onClick={() => setActiveMenuId(null)}>
      
      {/* Premium Glass Header */}
      <section className="shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card relative rounded-[32px] overflow-hidden p-8 group border-beam"
        >
          <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-[#EF4444]/5 blur-[80px] rounded-full group-hover:bg-[#EF4444]/10 transition-colors duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-14 h-14 rounded-2xl bg-[#EF4444] flex items-center justify-center shadow-xl shadow-rose-500/20 border border-white/20">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black text-[#1A1A2E] tracking-tight">Espace Réclamations</h1>
                  <p className="text-sm font-black text-[#9CA3AF] uppercase tracking-[0.2em] mt-1">Gestion de la Qualité Client</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => toast.info("Ouverture du rapport mensuel...")}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/40 backdrop-blur-md border border-white/80 text-slate-600 font-black text-[12px] uppercase tracking-wider hover:bg-white shadow-sm transition-all"
              >
                <Activity className="w-4 h-4" /> Analyse Globale
              </button>
              <button className="bg-[#1A1A2E] hover:bg-black text-white px-8 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-wider transition-all shadow-2xl flex items-center gap-2 group">
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform"/> Nouveau Ticket
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* KPI Stats Refined */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
        {[
          { label: "Ouvertes", value: "7", icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10" },
          { label: "Résolues / Mois", value: "23", icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Délai Moyen", value: "2.3j", icon: Clock, color: "text-[#7C5CFC]", bg: "bg-[#7C5CFC]/10" },
          { label: "Automation IA", value: "61%", icon: Bot, color: "text-amber-500", bg: "bg-amber-500/10" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[28px] border-none shadow-lg group hover:scale-105 transition-transform"
          >
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-black text-[#1A1A2E] tracking-tight">{stat.value}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Modern Tab Bar */}
      <div className="flex gap-10 border-b border-black/5 shrink-0 px-2 overflow-x-auto scrollbar-hide">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[12px] font-black uppercase tracking-[0.2em] transition-all relative ${activeTab === tab ? 'text-[#1A1A2E]' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#1A1A2E] rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {activeTab === "Rapports qualité" ? (
            <motion.div 
              key="reports" 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.02 }}
              className="h-full overflow-y-auto pr-2 custom-scrollbar space-y-8 pb-10"
            >
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="glass-card p-8 rounded-[32px] border-none shadow-xl">
                  <h3 className="text-[14px] font-black text-[#1A1A2E] uppercase tracking-widest mb-10 flex items-center gap-3">
                    <LucideBarChart className="w-5 h-5 text-slate-300" /> Réclamations par Gamme
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={chartData1} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 'bold' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 'bold' }} />
                        <RechartsTooltip cursor={{ fill: '#F1F5F9' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="value" fill="#1A1A2E" radius={[8, 8, 0, 0]} barSize={40} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-[32px] border-none shadow-xl">
                  <h3 className="text-[14px] font-black text-[#1A1A2E] uppercase tracking-widest mb-10 flex items-center gap-3">
                    <LucideLineChart className="w-5 h-5 text-slate-300" /> Performance Résolution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={chartData2} margin={{ top: 0, right: 20, left: -10, bottom: 0 }}>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 'bold' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94A3B8', fontWeight: 'bold' }} />
                        <RechartsTooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                        <Line type="monotone" dataKey="jours" stroke="#EF4444" strokeWidth={4} dot={{ r: 6, fill: '#EF4444', strokeWidth: 4, stroke: '#fff' }} activeDot={{ r: 8, strokeWidth: 0 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="glass-card p-10 rounded-[40px] border-none shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C5CFC]/5 blur-[80px] pointer-events-none" />
                 <div className="flex items-start gap-8 relative z-10">
                    <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#1A1A2E] to-[#7C5CFC] flex items-center justify-center shadow-xl shrink-0 group-hover:scale-110 transition-transform">
                      <Bot className="w-8 h-8 text-white"/>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-black text-[#1A1A2E] tracking-tight">Intelligence Critique de Bobby</h3>
                        <span className="text-[10px] font-black text-[#7C5CFC] bg-[#7C5CFC]/10 px-3 py-1.5 rounded-xl border border-[#7C5CFC]/20 uppercase tracking-widest">Alerte Prioritaire</span>
                      </div>
                      <p className="text-[#64748B] font-bold leading-relaxed max-w-4xl italic">
                        "L'analyse des lots concernés sur la gamme 'Protéger' indique un défaut de scellage thermique sur le Lot 2604-X. J'ai déjà préparé les ébauches de communication pour les 12 distributeurs affectés. Voulez-vous que je bloque les expéditions restantes de ce lot ?"
                      </p>
                      <div className="mt-8 flex gap-6">
                        <button className="px-8 py-4 bg-black text-white rounded-2xl text-[12px] font-black hover:scale-105 active:scale-95 transition-all shadow-xl">DÉPLOYER LA PROCÉDURE</button>
                        <button className="px-8 py-4 bg-white border border-slate-200 rounded-2xl text-[12px] font-black hover:bg-slate-50 transition-all">VOIR LES DÉTAILS DU LOT</button>
                      </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="table" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="h-full flex flex-col overflow-hidden"
            >
              <div className="flex-1 overflow-auto pr-2 custom-scrollbar">
                <table className="w-full text-left border-separate border-spacing-y-4">
                  <thead className="sticky top-0 bg-transparent z-10">
                    <tr className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-[0.2em] px-6">
                      <th className="pb-4 pl-8">Ticket</th>
                      <th className="pb-4 px-6">Catégorie</th>
                      <th className="pb-4 px-6">Distributeur</th>
                      <th className="pb-4 px-6">Priorité</th>
                      <th className="pb-4 px-6 text-center">Statut</th>
                      <th className="pb-4 px-6 text-right">Date</th>
                      <th className="pb-4 pr-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClaims.map((claim, i) => {
                      const styles = getSeverityStyles(claim.severity);
                      return (
                        <motion.tr
                          key={claim.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="group cursor-pointer"
                          onClick={() => setSelectedClaim(claim)}
                        >
                          <td className="py-6 pl-8 bg-white/40 group-hover:bg-white/80 transition-all rounded-l-[24px] border-y border-l border-white/50 first:border-l-rose-500 first:border-l-4">
                            <span className="font-mono text-[13px] font-black text-[#1A1A2E]">{claim.id}</span>
                          </td>
                          <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50">
                            <span className="text-[14px] font-bold text-[#1A1A2E] group-hover:text-[#7C5CFC] transition-colors">{claim.type}</span>
                          </td>
                          <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-[#F1F5F9] flex items-center justify-center font-black text-[10px] text-slate-500">{claim.distributorName.substring(0, 2).toUpperCase()}</div>
                              <span className="text-[14px] font-bold text-slate-600">{claim.distributorName}</span>
                            </div>
                          </td>
                          <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50">
                            <span className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border", styles.badge)}>
                              {claim.severity}
                            </span>
                          </td>
                          <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50 text-center">
                            <span className={cn(
                              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black tracking-wide border",
                              claim.status === 'Ouverte' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                              claim.status === 'En cours' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                              'bg-emerald-100 text-emerald-700 border-emerald-200'
                            )}>
                              <div className={cn("w-2 h-2 rounded-full", claim.status === 'Ouverte' ? 'bg-slate-400' : claim.status === 'En cours' ? 'bg-amber-500' : 'bg-emerald-500')} />
                              {claim.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50 text-right">
                            <span className="text-[12px] font-black text-slate-400 font-mono tracking-tighter">
                              {new Date(claim.openedAt).toLocaleDateString('fr-FR')}
                            </span>
                          </td>
                          <td className="py-6 pr-8 bg-white/40 group-hover:bg-white/80 transition-all rounded-r-[24px] border-y border-r border-white/50 text-right">
                             <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 rounded-xl bg-white shadow-md border hover:border-[#7C5CFC] transition-colors"><ChevronRight className="w-4 h-4" /></button>
                             </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedClaim && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[100]"
              onClick={() => setSelectedClaim(null)}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-xl glass-card rounded-none border-y-0 border-r-0 shadow-2xl z-[100] flex flex-col"
            >
              <div className="p-10 border-b border-black/5 flex items-center justify-between bg-white/30">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[24px] bg-rose-500 flex items-center justify-center shadow-xl shadow-rose-500/20 text-white">
                      <AlertCircle className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-[#1A1A2E] tracking-tight">{selectedClaim.id}</h2>
                      <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-xl border border-rose-100">Priorité {selectedClaim.severity}</span>
                    </div>
                 </div>
                 <button onClick={() => setSelectedClaim(null)} className="w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
                 <div className="space-y-4">
                    <h3 className="text-sm font-black text-[#1A1A2E] uppercase tracking-widest">Informations Dossier</h3>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Distributeur</p>
                          <p className="text-sm font-black text-[#1A1A2E]">{selectedClaim.distributorName}</p>
                       </div>
                       <div className="p-6 rounded-[24px] bg-slate-50 border border-slate-100">
                          <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Type d'incident</p>
                          <p className="text-sm font-black text-[#1A1A2E]">{selectedClaim.type}</p>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <h3 className="text-sm font-black text-[#1A1A2E] uppercase tracking-widest flex items-center gap-3">
                       <Activity className="w-4 h-4 text-slate-300" /> Historique d'Investigation
                    </h3>
                    <div className="space-y-6 relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-slate-100 before:rounded-full">
                       <div className="relative">
                          <div className="absolute left-[-29px] top-1.5 w-4 h-4 rounded-full bg-black border-4 border-white shadow-md" />
                          <div className="p-6 rounded-[28px] bg-white border border-slate-100 shadow-sm">
                             <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-slate-400 font-mono">12/04/2026 — 09:12</span>
                                <span className="text-[10px] font-black text-emerald-500">OUVERTURE</span>
                             </div>
                             <p className="text-[13px] font-bold text-slate-600 leading-relaxed">Ticket ouvert suite à l'appel de Mme. Sarah Morel. Défaut d'étanchéité constaté sur le lot G34.</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-10 border-t border-black/5 bg-white flex gap-4">
                 <button className="flex-1 py-4.5 bg-black text-white rounded-2xl text-[12px] font-black uppercase tracking-wider shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">CLORE LE DOSSIER</button>
                 <button className="px-10 py-4.5 bg-slate-100 text-slate-600 rounded-2xl text-[12px] font-black uppercase tracking-wider hover:bg-slate-200 transition-all">TRANSFÉRER</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmDialog 
        isOpen={!!confirmClose}
        title="Confirmation de clôture"
        description={`Êtes-vous sûr de vouloir archiver le ticket ${confirmClose} ? Cette action notifiera le distributeur.`}
        confirmText="Confirmer la clôture"
        onConfirm={() => { toast.success("Dossier archivé"); setConfirmClose(null); setSelectedClaim(null); }}
        onCancel={() => setConfirmClose(null)}
        isDestructive={false}
      />
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
