"use client";

import { useState, useEffect } from "react";
import { dashboardData } from "@/data/dashboard";
import { approbationsData } from "@/data/approbations";
import { 
  Euro, Users, BarChart3, AlertCircle, Calendar, 
  Phone, Monitor, Bot, CheckSquare, Flame, 
  ChevronRight, History, Zap, Clock, 
  ArrowUpRight, ArrowDownRight, 
  CheckCircle2, ShoppingCart, TrendingUp, FileSignature, 
  Plus, Search, Bell, Send, MessageCircle, Sparkles, Activity 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Time-aware greeting
function getGreeting(name: string): { text: string; emoji: string } {
  const hour = new Date().getHours();
  if (hour < 12) return { text: `Bonjour ${name}`, emoji: "👋" };
  if (hour < 18) return { text: `Bon après-midi ${name}`, emoji: "⚡" };
  return { text: `Bonsoir ${name}`, emoji: "🌙" };
}

export default function Dashboard() {
  const router = useRouter();
  const [isBobbyOpen, setIsBobbyOpen] = useState(false);
  const [bobbyMode, setBobbyMode] = useState<"activity" | "chat">("chat");
  const [checkedTasks, setCheckedTasks] = useState<string[]>([]);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, role: "bobby", text: "Bonjour Marie ! Comment puis-je vous aider aujourd'hui ?", timestamp: "10:00" },
    { id: 2, role: "user", text: "Quelles sont mes priorités ?", timestamp: "10:01" },
    { id: 3, role: "bobby", text: "Vous avez 3 relances en retard et un RDV important avec BioMed à 11h30. Je vous suggère de préparer la démo de la gamme Protéger.", timestamp: "10:01" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState({ text: "Bonjour", emoji: "👋" });
  const [todayText, setTodayText] = useState("");

  useEffect(() => { 
    setMounted(true); 
    setGreeting(getGreeting("Marie"));
    setTodayText(new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(new Date()));
  }, []);

  const toggleTask = (id: string) => {
    setCheckedTasks(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    const newUserMsg = { id: Date.now(), role: "user", text: chatMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newUserMsg]);
    setChatMessage("");
    setIsTyping(true);
    setTimeout(() => {
      const bobbyMsg = {
        id: Date.now() + 1,
        role: "bobby",
        text: "C'est noté. Je m'en occupe tout de suite ! Souhaitez-vous que je prépare un brouillon d'email ?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, bobbyMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getKPIGradient = (icon: string) => {
    switch (icon) {
      case 'euro': return 'from-[#7C5CFC] to-[#A78BFA]';
      case 'users': return 'from-[#E8C93A] to-[#FDF3C0]';
      case 'funnel': return 'from-[#3B82F6] to-[#BAE6FD]';
      case 'alert': return 'from-[#F87171] to-[#FECACA]';
      case 'calendar': return 'from-[#34D399] to-[#BBF7D0]';
      default: return 'from-[#7C5CFC] to-[#A78BFA]';
    }
  };

  const getKPIIcon = (name: string) => {
    switch (name) {
      case 'euro': return <Euro className="w-6 h-6 text-white" />;
      case 'users': return <Users className="w-6 h-6 text-white" />;
      case 'funnel': return <BarChart3 className="w-6 h-6 text-white" />;
      case 'alert': return <AlertCircle className="w-6 h-6 text-white" />;
      case 'calendar': return <Calendar className="w-6 h-6 text-white" />;
      default: return null;
    }
  };

  const getScheduleIcon = (icon: string) => {
    switch (icon) {
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'monitor': return <Monitor className="w-4 h-4" />;
      case 'bot': return <Bot className="w-4 h-4" />;
      case 'users': return <Users className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="flex bg-transparent gap-6">
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Hero Section */}
        <section className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card relative rounded-[32px] overflow-hidden p-10 group border-beam"
          >
            <div className="absolute top-[-50px] right-[-50px] w-[300px] h-[300px] bg-[#7C5CFC]/10 blur-[80px] rounded-full group-hover:bg-[#7C5CFC]/20 transition-colors duration-700" />
            <div className="absolute bottom-[-50px] left-[10%] w-[200px] h-[200px] bg-[#E8C93A]/10 blur-[60px] rounded-full group-hover:bg-[#E8C93A]/20 transition-colors duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-2"
                >
                  <h1 className="text-4xl font-black text-gradient-primary tracking-tight">
                    {mounted ? greeting.text : "Chargement..."}
                  </h1>
                  <span className="text-4xl animate-bounce">{mounted ? greeting.emoji : ""}</span>
                </motion.div>
                <p className="text-lg text-[#6B7280] font-bold">
                  {mounted ? `Voici votre tableau de bord du ${todayText}` : "L'IA analyse votre journée..."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {(() => {
                  const criticalApprobations = approbationsData.filter(a => {
                    if (a.status !== 'pending') return false;
                    if (a.impactLevel !== 'Critique' && a.impactLevel !== 'Élevé') return false;
                    if (!a.urgencyDeadline) return false;
                    const timeDiff = new Date(a.urgencyDeadline).getTime() - new Date().getTime();
                    return timeDiff > 0 && timeDiff <= 2 * 60 * 60 * 1000;
                  }).map(a => ({
                    label: `Approbation requise`,
                    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
                    icon: "alert",
                    href: "/approbations"
                  }));

                  const combinedActions = [...criticalApprobations, ...dashboardData.urgentActions];

                  return combinedActions.map((action, i) => {
                    const Element = (action as any).href ? Link : motion.button;
                    const props = (action as any).href ? { href: (action as any).href } : {
                      onClick: () => toast.info(action.label),
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: 0.4 + i * 0.1 }
                    };

                    return (
                      <Element
                        key={i}
                        {...props as any}
                        className={cn(
                          "flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[12px] font-black transition-all hover:scale-105 active:scale-95 shadow-xl border border-white/40",
                          action.color
                        )}
                      >
                        {action.icon === 'alert' && <AlertCircle className="w-4 h-4" />}
                        {action.icon === 'calendar' && <Calendar className="w-4 h-4" />}
                        {action.icon === 'clock' && <Clock className="w-4 h-4" />}
                        {action.label}
                      </Element>
                    );
                  });
                })()}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Daily Note Integration */}
        <section className="mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-[28px] bg-gradient-to-br from-[#7C5CFC]/10 to-[#38BDF8]/10 border border-[#7C5CFC]/20 shadow-sm relative overflow-hidden group"
          >
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                <Sparkles className="w-8 h-8 text-[#7C5CFC]" />
             </div>
             <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1A1A2E] flex items-center justify-center text-white shrink-0 shadow-lg">
                   <Bot className="w-6 h-6" />
                </div>
                <div className="flex-1">
                   <p className="text-[11px] font-black text-[#7C5CFC] mb-2 uppercase tracking-[0.2em] flex items-center gap-2">
                    Note du jour par Bobby
                   </p>
                   <p className="text-xl font-bold text-[#1A1A2E] leading-relaxed">
                     "Marie, 86% de vos objectifs sont atteints. Concentrez-vous sur <span className="text-[#7C5CFC]">BioMed</span> aujourd'hui pour transformer l'opportunité !"
                   </p>
                </div>
             </div>
          </motion.div>
        </section>

        {/* Content Tabs/Grid */}
        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar space-y-8 pb-10">
          
          {/* Top KPIs Row */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {dashboardData.kpis.map((kpi, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-[28px] p-6 group cursor-pointer hover:shadow-2xl transition-all duration-500"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-6",
                  getKPIGradient(kpi.icon)
                )}>
                  {getKPIIcon(kpi.icon)}
                </div>

                <div className="space-y-1 mb-4">
                  <p className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.15em]">
                    {kpi.label}
                  </p>
                  <h3 className="text-3xl font-black text-[#1A1A2E] tracking-tight">
                    {kpi.value}
                  </h3>
                </div>

                <div className={cn(
                  "inline-flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-xl border",
                  kpi.trend.startsWith('+') 
                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                    : "bg-rose-500/10 text-rose-600 border-rose-500/20"
                )}>
                  {kpi.trend.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {kpi.trend}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Agenda & Tasks */}
            <div className="xl:col-span-4 space-y-8">
              {/* Agenda Section */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-[32px] p-8 flex flex-col gap-8 border-beam"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-[#1A1A2E] flex items-center gap-3 uppercase tracking-wider">
                    <span className="text-2xl">🗓️</span> Ma Journée
                  </h2>
                  <span className="w-3 h-3 rounded-full bg-[#10B981] animate-dot-pulse shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                </div>

                <div className="space-y-2 relative">
                  <div className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#7C5CFC]/30 via-[#E5E7EB] to-transparent" />
                  
                  {dashboardData.schedule.map((item, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 8 }}
                      className="flex gap-5 relative py-4 group/item cursor-pointer"
                    >
                      <div className={cn(
                        "w-11 h-11 rounded-2xl bg-white border flex items-center justify-center shrink-0 z-10 shadow-sm transition-all group-hover/item:shadow-xl",
                        i === 0 ? "border-[#7C5CFC] shadow-[#7C5CFC]/20" : "border-[#E5E7EB]"
                      )}>
                        <span className={i === 0 ? "text-[#7C5CFC]" : "text-[#64748B]"}>
                          {getScheduleIcon(item.icon)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-black text-[#1A1A2E] leading-tight group-hover/item:text-[#7C5CFC] transition-colors mb-2">
                          {item.time} — {item.description}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap text-[10px] font-black uppercase tracking-wider">
                          {item.contactName && (
                            <span className="bg-[#7C5CFC]/5 text-[#7C5CFC] px-3 py-1.5 rounded-xl border border-[#7C5CFC]/10">
                              {item.contactName}
                            </span>
                          )}
                          <span className="text-[#64748B] bg-white/40 px-3 py-1.5 rounded-xl border border-[#E5E7EB]">
                            {item.distributor}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Priorities/Tasks */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-[32px] p-8 flex flex-col gap-8"
              >
                <h2 className="text-lg font-black text-[#1A1A2E] flex items-center gap-3 uppercase tracking-wider">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <CheckSquare className="w-5 h-5" />
                  </span>
                  Priorités
                </h2>
                <div className="space-y-3">
                  {dashboardData.tasks.map((task) => (
                    <motion.div 
                      key={task.id} 
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 hover:bg-white/60 transition-all border border-white/50 cursor-pointer group"
                      onClick={() => toggleTask(task.id)}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                        checkedTasks.includes(task.id) 
                          ? "bg-[#7C5CFC] border-[#7C5CFC]" 
                          : "border-[#E5E7EB] group-hover:border-[#7C5CFC]"
                      )}>
                        {checkedTasks.includes(task.id) && <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={3} />}
                      </div>
                      <div className="flex-1">
                        <p className={cn(
                          "text-[13px] font-black leading-none",
                          checkedTasks.includes(task.id) ? "text-[#9CA3AF] line-through" : "text-[#1A1A2E]"
                        )}>
                          {task.description}
                        </p>
                        <p className="text-[10px] font-bold text-[#64748B] mt-1.5">{task.distributor}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Pipeline & Analytics */}
            <div className="xl:col-span-8 space-y-8">
              
              {/* Pipeline Overview */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-[32px] p-10 flex flex-col gap-10 border-beam"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-[#1A1A2E] tracking-tight mb-1">Pipeline Performance</h2>
                    <p className="text-sm font-bold text-[#9CA3AF]">Flux commercial en temps réel</p>
                  </div>
                  <Link href="/pipeline" className="flex items-center gap-2 px-6 py-3 bg-[#1A1A2E] text-white rounded-2xl text-[12px] font-black hover:bg-black transition-all shadow-xl">
                    Pipeline Complet <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Funnel Visualization */}
                <div className="flex items-end justify-between gap-4 h-32 px-4 relative">
                  <div className="absolute inset-x-0 bottom-0 h-px bg-[#E5E7EB]" />
                  {dashboardData.funnel.map((stage, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group/stage relative h-full">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(20, (stage.count / 42) * 100)}%` }}
                        transition={{ duration: 1, delay: 1 + i * 0.1, ease: "circOut" }}
                        className={cn(
                          "w-full rounded-t-2xl relative overflow-hidden bg-gradient-to-t from-[#7C5CFC] to-[#A78BFA] shadow-lg",
                          "group-hover/stage:brightness-110 transition-all duration-300"
                        )}
                        style={{ opacity: 1 - (i * 0.12) }}
                      >
                        <div className="absolute inset-x-0 top-0 h-1.5 bg-white/20" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/stage:translate-x-[100%] transition-transform duration-1000" />
                      </motion.div>
                      <span className="text-[10px] font-black text-[#1A1A2E] mt-3 uppercase tracking-tighter text-center">
                        {stage.name}
                      </span>
                      <span className="text-[10px] font-black text-[#94A3B8]">{stage.count}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dashboardData.hotOpportunities.map((opp, idx) => (
                    <motion.div 
                      key={opp.id}
                      whileHover={{ scale: 1.02, y: -4 }}
                      className="p-6 rounded-[28px] bg-white border border-[#E5E7EB] hover:border-[#7C5CFC] transition-all duration-300 shadow-sm hover:shadow-2xl cursor-pointer group/opp"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-lg">
                            🔥
                          </div>
                          <div>
                            <p className="text-[14px] font-black text-[#1A1A2E] group-hover/opp:text-[#7C5CFC] transition-colors">
                              {opp.name}
                            </p>
                            <p className="text-[11px] font-bold text-[#9CA3AF] uppercase">Offre prioritaire</p>
                          </div>
                        </div>
                        <p className="text-xl font-black text-gradient-primary">
                          {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(opp.value)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-[#F3F4F6] pt-4 mt-2">
                        <span className="text-[11px] font-black text-[#6B7280]">{opp.distributor}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] font-black text-[#10B981] bg-emerald-500/10 px-3 py-1 rounded-xl">
                            {opp.probability}%
                          </span>
                          <span className="text-[11px] font-black text-rose-500 uppercase tracking-tight underline underline-offset-4 decoration-2">
                            Fermeture J-{opp.daysToClose}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Risk Section */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="glass-card rounded-[32px] p-8 space-y-8"
                >
                  <h2 className="text-lg font-black text-[#1A1A2E] flex items-center gap-3 uppercase tracking-wider">
                    <span className="text-2xl">⚠️</span> À Risque
                  </h2>
                  <div className="space-y-4">
                    {dashboardData.riskDistributors.map((dist) => (
                      <div key={dist.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/50 hover:bg-white/60 transition-all cursor-pointer group/risk relative overflow-hidden">
                        {dist.severity === 'critical' && (
                          <div className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />
                        )}
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-xl shadow-sm border border-white group-hover/risk:scale-110 transition-transform">
                          {dist.flag}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[14px] font-black text-[#1A1A2E] truncate mb-1">
                            {dist.name}
                          </h4>
                          <p className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            dist.severity === 'critical' ? "text-rose-600" : "text-amber-600"
                          )}>
                            {dist.reason}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#E5E7EB] group-hover/risk:text-[#7C5CFC] transition-colors" />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Activity Feed Ticker Styling */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="glass-card rounded-[32px] p-8 flex flex-col gap-6"
                >
                   <h2 className="text-lg font-black text-[#1A1A2E] flex items-center gap-3 uppercase tracking-wider">
                    <span className="text-2xl font-normal">⚡</span> Flux Activité
                  </h2>
                  <div className="flex-1 overflow-hidden relative">
                    <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
                    <div className="space-y-6 py-4 animate-[tickerVertical_20s_linear_infinite] hover:pause">
                      {[...dashboardData.recentActivity, ...dashboardData.recentActivity].map((activity, i) => (
                        <div key={i} className="flex gap-4 group/activity">
                          <div className="w-2 h-2 rounded-full mt-1.5 shrink-0 bg-[#7C5CFC] shadow-[0_0_8px_rgba(124,92,252,0.4)]" />
                          <div>
                            <p className="text-[12px] font-black text-[#1A1A2E] leading-tight group-hover/activity:text-[#7C5CFC] transition-colors mb-1">
                              {activity.description}
                            </p>
                            <p className="text-[10px] font-bold text-[#94A3B8] uppercase">{activity.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
