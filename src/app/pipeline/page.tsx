"use client";

import { useState, useMemo } from "react";
import { pipelineData, Deal, DealStatus } from "@/data/pipeline";
import { defaultStages, PipelineStage } from "@/data/pipelineStages";
import { 
  Plus, LayoutGrid, List, BarChart3, MoreHorizontal, 
  Clock, Calendar, X, ArrowRight, User, ExternalLink,
  Settings2, Sliders, TrendingUp, CheckCircle2, AlertTriangle,
  Building2, User2, DollarSign, Target, Zap, Phone, Mail, ChevronRight, MessageSquare, Sparkles
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { StageManager } from "@/components/pipeline/StageManager";
import { EmptyState } from "@/components/ui/EmptyState";
import { EmptyPipeline } from "@/components/ui/empty-illustrations";

const VIEWS = ["Kanban", "Liste", "Prévisions"];

export default function Pipeline() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("Kanban");
  const [stages, setStages] = useState<PipelineStage[]>(defaultStages);
  const [deals, setDeals] = useState<Deal[]>(pipelineData);
  const [isStageManagerOpen, setIsStageManagerOpen] = useState(false);
  const [showConversionModal, setShowConversionModal] = useState(false);

  // Statistics
  const stats = useMemo(() => {
    const activeDeals = deals.filter(d => d.status === "Actif");
    const totalValue = activeDeals.reduce((sum, d) => sum + d.value, 0);
    const wonThisMonth = deals.filter(d => d.status === "Gagné").length;
    const conversionRate = 34;
    const avgCycle = 24;

    return [
      { label: "Deals Actifs", value: activeDeals.length, icon: Target, color: "text-[#7C5CFC]" },
      { label: "Valeur Pipeline", value: `€${(totalValue/1000).toFixed(0)}k`, icon: DollarSign, color: "text-[#10B981]" },
      { label: "Conversion", value: `${conversionRate}%`, icon: TrendingUp, color: "text-[#3B82F6]" },
      { label: "Cycle Moyen", value: `${avgCycle}j`, icon: Clock, color: "text-[#F59E0B]" },
      { label: "Gagnés (Mois)", value: wonThisMonth, icon: CheckCircle2, color: "text-emerald-500" },
    ];
  }, [deals]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  const getDayDiff = (dateStr: string) => {
    const opening = new Date(dateStr);
    const today = new Date("2026-04-12T12:00:00Z");
    const diff = Math.floor((today.getTime() - opening.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getLastActivity = (deal: Deal) => {
    if (deal.interactions && deal.interactions.length > 0) {
      const last = deal.interactions[0];
      const diff = getDayDiff(last.date);
      let icon = MessageSquare;
      if (last.type === "Appel") icon = Phone;
      if (last.type === "Email") icon = Mail;
      return { 
        text: `${last.type} il y a ${diff}j`, 
        icon,
        isWarning: diff >= 12
      };
    }
    const openDiff = getDayDiff(deal.openDate);
    return { 
      text: `Aucune activité depuis ${openDiff}j`, 
      icon: AlertTriangle,
      isWarning: openDiff >= 12
    };
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black text-gradient-primary tracking-tight mb-2"
          >
            Pipeline Commercial
          </motion.h1>
          <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mt-1 pl-1">Votre flux commercial en haute définition</p>
        </div>
        
        <div className="flex items-center gap-4">
           <button 
            onClick={() => setIsStageManagerOpen(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/40 backdrop-blur-md border border-white/60 text-slate-600 font-black text-[12px] uppercase tracking-wider hover:border-[#7C5CFC] hover:text-[#7C5CFC] transition-all shadow-sm"
          >
            <Settings2 className="w-4 h-4" /> Configurer
          </button>
          <button className="bg-[#1A1A2E] hover:bg-black text-white px-8 py-3 rounded-2xl text-[12px] font-black uppercase tracking-wider transition-all shadow-xl flex items-center gap-2 group">
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform"/> Nouveau deal
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[28px] border-none shadow-lg flex flex-col gap-4 group cursor-pointer hover:scale-105 transition-transform"
          >
             <div className={`${stat.color} bg-white/80 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border border-white group-hover:shadow-md transition-all`}>
                <stat.icon className="w-5 h-5" />
             </div>
             <div>
                <div className="text-2xl font-black text-[#1A1A2E] leading-none mb-1 tracking-tight">{stat.value}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
             </div>
          </motion.div>
        ))}
      </div>

      {/* View Switcher */}
      <div className="flex px-1 gap-8 border-b border-slate-200">
        {VIEWS.map((view, i) => {
          const icons = [LayoutGrid, List, BarChart3];
          const Icon = icons[i];
          return (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`pb-4 text-sm font-black tracking-widest uppercase transition-all border-b-2 flex items-center gap-2 ${activeView === view ? 'border-[#7C5CFC] text-[#7C5CFC]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              <Icon className="w-4 h-4" /> {view}
            </button>
          )
        })}
      </div>

      {/* Kanban Content */}
      {activeView === "Kanban" && (
        <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide min-h-[600px] px-2">
          {stages.sort((a,b) => a.order - b.order).map((s, stageIdx) => {
            const stageDeals = deals.filter(d => d.stageId === s.id && d.status === "Actif");
            const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);
            return (
              <motion.div 
                key={s.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * stageIdx }}
                className="w-[320px] shrink-0 flex flex-col gap-6"
              >
                {/* Column Header */}
                <div
                  className="rounded-[24px] p-5 glass-card relative overflow-hidden group/header"
                  style={{
                    borderTop: `4px solid ${s.color}`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-black text-[#1A1A2E] text-[13px] uppercase tracking-wider">{s.name}</h3>
                      <div className="text-[14px] font-black text-gradient-primary">
                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(totalValue)}
                      </div>
                    </div>
                    <span
                      className="text-[11px] font-black w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg"
                      style={{ backgroundColor: s.color }}
                    >
                      {stageDeals.length}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <AnimatePresence>
                    {stageDeals.map((deal, dealIdx) => {
                      const activity = getLastActivity(deal);
                      const daysInStage = getDayDiff(deal.lastActivityDate || deal.openDate);
                      const isExceeding = s.maxDaysInStage ? daysInStage > s.maxDaysInStage : false;
                      const stallDays = getDayDiff(deal.interactions?.[0]?.date || deal.openDate);

                      let activityDotColor = '#10B981';
                      let dotPulseClass = '';
                      if (stallDays >= 14) { activityDotColor = '#EF4444'; dotPulseClass = 'animate-dot-pulse'; }
                      else if (stallDays >= 7) activityDotColor = '#F97316';
                      else if (stallDays >= 3) activityDotColor = '#F59E0B';

                      return (
                        <motion.div
                          key={deal.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: 0.05 * dealIdx }}
                          onClick={() => router.push(`/pipeline/${deal.id}`)}
                          className="glass-card p-5 rounded-[22px] border-none shadow-md hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden border-beam"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{deal.companyFlag}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#7C5CFC] bg-[#7C5CFC]/5 px-2 py-0.5 rounded-lg border border-[#7C5CFC]/10">
                                {deal.companyType}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                              <button className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-400 hover:text-[#7C5CFC] shadow-sm border border-slate-100 transition-all">
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <h4 className="font-black text-[#1A1A2E] text-[15px] leading-snug mb-4 group-hover:text-[#7C5CFC] transition-colors relative z-10">
                            {deal.title}
                          </h4>

                          <div className="flex items-center justify-between mb-5 relative z-10">
                            <div className="text-xl font-black text-gradient-primary tabular-nums">
                              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(deal.value)}
                            </div>
                            <span className="text-[10px] font-black bg-white/60 text-slate-700 px-2.5 py-1 rounded-xl shadow-sm border border-white">
                              {deal.probability}%
                            </span>
                          </div>

                          <div className="space-y-3 relative z-10">
                            <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B]">
                              <div className="flex items-center gap-2 truncate pr-2">
                                <div className="w-5 h-5 rounded-lg bg-[#F1F5F9] flex items-center justify-center text-[8px] font-black">
                                  {deal.assignedTo.avatar}
                                </div>
                                <span className="truncate">{deal.contactName}</span>
                              </div>
                              <div className={cn("flex items-center gap-1 shrink-0", isExceeding ? "text-rose-500" : "text-slate-400")}>
                                <Clock className="w-3 h-3" /> {daysInStage}j
                              </div>
                            </div>

                            {/* Activity bar styling */}
                            <div className="bg-[#F8FAFC]/50 rounded-xl p-2.5 flex items-center gap-2 border border-white/40">
                              <div
                                className={cn("w-2 h-2 rounded-full", dotPulseClass)}
                                style={{ backgroundColor: activityDotColor }}
                              />
                              <activity.icon className="w-3.5 h-3.5 text-slate-400" />
                              <span className="text-[10px] font-black text-slate-600 truncate">{activity.text}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {/* Empty state */}
                  {stageDeals.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 px-6 rounded-[24px] border border-dashed border-slate-200 flex flex-col items-center text-center bg-white/5"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 mb-4 font-black text-2xl">
                        Ø
                      </div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Aucun deal actif</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* List Content */}
      {activeView === "Liste" && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[32px] overflow-hidden border-none shadow-xl"
        >
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                <th className="py-5 px-6">Deal / Entreprise</th>
                <th className="py-5 px-6 text-center">Étape</th>
                <th className="py-5 px-6 text-center">Valeur</th>
                <th className="py-5 px-6 text-center">Probabilité</th>
                <th className="py-5 px-6 text-center">Assigné</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deals.map(deal => (
                <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer" onClick={() => router.push(`/pipeline/${deal.id}`)}>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{deal.companyFlag}</span>
                      <div>
                        <p className="font-black text-[#1A1A2E] text-[14px]">{deal.title}</p>
                        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{deal.contactName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#1A1A2E] text-[11px] font-black uppercase">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stages.find(s => s.id === deal.stageId)?.color || '#ccc' }} />
                      {stages.find(s => s.id === deal.stageId)?.name || 'Inconnu'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <p className="font-black text-[#1A1A2E]">{formatCurrency(deal.value)}</p>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] font-black text-[#7C5CFC]">{deal.probability}%</span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#7C5CFC]" style={{ width: `${deal.probability}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-xs shadow-inner">
                        {deal.assignedTo.avatar}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 rounded-xl text-slate-400 hover:text-[#7C5CFC] hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}

      {/* Forecast Content */}
      {activeView === "Prévisions" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 glass-card p-10 rounded-[32px] border-none shadow-xl flex flex-col gap-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-[#1A1A2E] tracking-tight">Valeur Pondérée du Pipeline</h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-wider mt-1">Projection basée sur les probabilités de conversion</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[#10B981]" />
            </div>

            <div className="h-[300px] w-full flex items-end justify-between pt-10 pb-4 px-4 relative">
              <div className="absolute inset-x-0 bottom-4 h-[1px] bg-slate-200 flex justify-between" />
              {stages.map((s, i) => {
                const stageDeals = deals.filter(d => d.stageId === s.id && d.status === "Actif");
                const weightedValue = stageDeals.reduce((sum, d) => sum + (d.value * d.probability / 100), 0);
                const maxVal = 200000;
                const height = Math.min(100, (weightedValue / maxVal) * 100);
                return (
                  <div key={s.id} className="flex-1 flex flex-col items-center group relative z-10">
                    <div className="absolute bottom-full mb-4 opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                      <div className="bg-[#1A1A2E] text-white p-3 rounded-2xl text-[11px] font-black shadow-2xl">
                        {formatCurrency(weightedValue)}
                      </div>
                    </div>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      className="w-12 rounded-t-xl relative overflow-hidden shadow-lg transition-all"
                      style={{ backgroundColor: s.color }}
                    >
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <span className="text-[10px] font-black text-slate-400 mt-4 uppercase rotate-[-20deg] origin-left">{s.name}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-[32px] border-none shadow-xl flex flex-col gap-6"
          >
            <h3 className="text-lg font-black text-[#1A1A2E] flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Target className="w-5 h-5" />
              </span>
              Insights IA
            </h3>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[12px] font-bold text-[#1A1A2E] leading-relaxed">
                  "Votre volume de deals en phase de <span className="text-[#7C5CFC]">Négociation</span> est 15% plus élevé que le mois dernier. Attention au goulot d'étranglement."
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Projection Q2</span>
                </div>
                <p className="text-2xl font-black mb-1">€542k</p>
                <p className="text-[10px] font-bold opacity-80 uppercase">Revenu pondéré attendu</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Stage Manager */}
      <StageManager 
        isOpen={isStageManagerOpen}
        onClose={() => setIsStageManagerOpen(false)}
        stages={stages}
        onUpdateStages={setStages}
      />

      {/* Conversion Modal placeholder */}
      {showConversionModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
           <div className="bg-white p-10 rounded-[40px] text-center max-w-md shadow-2xl">
              <Zap className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black mb-2">Deal remporté ! 🏆</h2>
              <p className="text-[#6B7280] text-sm">Vous avez signé ce client. Félicitations !</p>
              <button onClick={() => setShowConversionModal(false)} className="mt-6 bg-[#1A1A2E] text-white px-8 py-3 rounded-2xl font-black">Fermer</button>
           </div>
        </div>
      )}
    </div>
  );
}

// Utility
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
