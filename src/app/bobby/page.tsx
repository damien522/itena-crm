"use client";

import { useState, useEffect } from "react";
import { bobbyAgents, bobbyLogs, AgentConfig } from "@/data/bobby";
import { 
  Sparkles, Settings, Search, X, Check, Clock, Bot, Plus, 
  RefreshCw, Zap, CheckCircle2, Send, MessageCircle, 
  Activity, LayoutGrid, Terminal, ChevronRight, MousePointer2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { toast } from "sonner";

function AgentToggle({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) {
  return (
    <div 
      className={`relative w-14 h-8 flex items-center rounded-full p-1.5 cursor-pointer transition-all duration-500 shadow-inner shrink-0 ${isOn ? 'bg-gradient-to-r from-[#7C5CFC] to-[#38BDF8]' : 'bg-slate-200'}`}
      onClick={onToggle}
    >
      <motion.div 
        className="bg-white w-5 h-5 rounded-full shadow-lg"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ x: isOn ? 24 : 0 }}
      />
    </div>
  );
}

const getAgentIcon = (id: string) => {
  switch(id) {
    case '01': return '💬';
    case '02': return '📊';
    case '03': return '🛡️';
    case '04': return '📅';
    case '05': return '🔧';
    default: return '🤖';
  }
}

export default function BobbyIA() {
  const [agents, setAgents] = useState(bobbyAgents);
  const [activeTab, setActiveTab] = useState("Tous les agents");
  const [activeView, setActiveView] = useState<"config" | "chat">("chat");
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "bobby", agent: "Assistant Global", text: "Bonjour ! Je suis Bobby. Que puis-je faire pour vous aujourd'hui ?", timestamp: "09:00" },
    { id: 2, role: "user", text: "Quelles sont les dernières actions de l'agent de relance ?", timestamp: "10:15" },
    { id: 3, role: "bobby", agent: "Relance Auto", text: "L'agent de relance a envoyé 12 emails ce matin, dont 3 au distributeur BioMed Solutions pour des factures impayées depuis 45 jours.", timestamp: "10:15" }
  ]);
  
  const [editingAgent, setEditingAgent] = useState<AgentConfig | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setMessages([...messages, { id: Date.now(), role: "user", text: chatMessage, timestamp: now }]);
    setChatMessage("");
    setIsTyping(true);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "bobby", 
        agent: "Bobby IA", 
        text: "Demande traitée. J'ai analysé les 4 derniers trimestres. Vos indicateurs de conversion sur la gamme Clinical sont en hausse de 12.4%.", 
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleToggle = (id: string, name: string, currentStatus: boolean) => {
    setAgents(agents.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
    toast.success(`Agent ${name} ${currentStatus ? 'désactivé' : 'activé'}`);
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Premium Glass Header */}
      <section className="shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card relative rounded-[32px] overflow-hidden p-8 group border-beam"
        >
          {/* Animated Background Orbs for Bobby */}
          <div className="absolute top-[-40px] right-[-40px] w-64 h-64 bg-[#7C5CFC]/20 blur-[80px] rounded-full animate-float-slow" />
          <div className="absolute bottom-[-40px] left-[30%] w-48 h-48 bg-[#38BDF8]/20 blur-[60px] rounded-full animate-float-slow delay-1000" />
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-[#1A1A2E] to-[#7C5CFC] flex items-center justify-center shadow-2xl border border-white/20 relative group-hover:scale-105 transition-transform duration-500">
                <Bot className="w-10 h-10 text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-4 border-white animate-pulse" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-gradient-primary tracking-tight flex items-center gap-3">
                  Bobby IA <Sparkles className="w-7 h-7 text-[#F59E0B] animate-pulse" />
                </h1>
                <p className="text-[#6B7280] font-bold mt-1 text-sm uppercase tracking-widest pl-1">Assistant Cognitif Haute Performance</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] shadow-sm">🤖</div>
                    ))}
                  </div>
                  <span className="text-[11px] font-black text-[#10B981] bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">4 AGENTS EN LIGNE</span>
                </div>
              </div>
            </div>

            <div className="flex bg-white/40 backdrop-blur-xl p-1.5 rounded-[22px] border border-white shadow-xl">
              <button
                onClick={() => setActiveView("config")}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-[18px] text-[12px] font-black uppercase tracking-widest transition-all ${activeView === "config" ? 'glass-card text-[#1A1A2E] shadow-lg' : 'text-[#64748B] hover:text-[#1A1A2E]'}`}
              >
                <Settings className="w-4 h-4" /> Configuration
              </button>
              <button
                onClick={() => setActiveView("chat")}
                className={`flex items-center gap-2 px-8 py-3.5 rounded-[18px] text-[12px] font-black uppercase tracking-widest transition-all ${activeView === "chat" ? 'glass-card text-[#1A1A2E] shadow-lg' : 'text-[#64748B] hover:text-[#1A1A2E]'}`}
              >
                <MessageCircle className="w-4 h-4" /> Laboratoire
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <AnimatePresence mode="wait">
        {activeView === "config" ? (
          <motion.div 
            key="config"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="flex-1 min-h-0 flex flex-col xl:flex-row gap-8"
          >
            {/* Left: Agent Management */}
            <div className="xl:w-1/3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex items-center justify-between px-2 mb-2">
                <h2 className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.3em]">Agents de Production</h2>
                <button onClick={() => toast.info("Création d'un nouvel agent...")} className="text-[11px] font-black text-[#7C5CFC] flex items-center gap-2 hover:underline">
                  <Plus className="w-3.5 h-3.5" /> Créer
                </button>
              </div>

              {agents.map((agent, i) => (
                <motion.div 
                  key={agent.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6 rounded-[28px] border-none group cursor-pointer hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFC]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">
                        {getAgentIcon(agent.id)}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-black text-[#1A1A2E] tracking-tight group-hover:text-[#7C5CFC] transition-colors">{agent.name}</h3>
                        <p className="text-[12px] font-bold text-[#6B7280] leading-snug mt-1 opacity-80">{agent.mission}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-black/5">
                    <div className="flex items-center gap-3">
                       <AgentToggle isOn={agent.isActive} onToggle={() => handleToggle(agent.id, agent.name, agent.isActive)} />
                       <span className={cn(
                        "text-[10px] font-black tracking-widest uppercase",
                        agent.isActive ? "text-[#10B981]" : "text-slate-400"
                       )}>
                        {agent.isActive ? "Actif" : "En Pause"}
                       </span>
                    </div>
                    <button 
                      onClick={() => setEditingAgent(agent)}
                      className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#1A1A2E] hover:border-[#1A1A2E] transition-all hover:shadow-lg"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right: Modern Trace / Audit Log */}
            <div className="xl:flex-1 flex flex-col glass-card rounded-[32px] overflow-hidden border-none shadow-2xl">
              <div className="p-8 border-b border-black/5 flex items-center justify-between bg-white/30 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1A1A2E] flex items-center justify-center text-white">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-black text-[#1A1A2E] uppercase tracking-widest">Flux d'Exécution</h3>
                    <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Activités en temps réel</p>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Filtrer les traces..."
                    className="bg-white border-none rounded-2xl py-3 pl-12 pr-6 text-[12px] font-bold shadow-inner focus:ring-4 focus:ring-[#7C5CFC]/10 w-[300px] transition-all"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar">
                {bobbyLogs.map((log, i) => (
                  <motion.div 
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/40 transition-all group border border-transparent hover:border-white/60"
                  >
                    <div className="w-20 text-right opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-black text-slate-500 font-mono tracking-tighter uppercase whitespace-nowrap bg-slate-100 px-2.5 py-1.5 rounded-lg border border-white">
                        {new Date(log.timestamp).toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <div className="w-24 group-hover:scale-105 transition-transform shrink-0">
                      <span className="inline-flex items-center gap-1.5 bg-[#1A1A2E] text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-tight shadow-lg">
                        {log.agentName}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-bold text-[#1A1A2E] leading-relaxed truncate group-hover:whitespace-normal">
                        {log.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {log.approvalStatus === 'pending' ? (
                        <>
                          <div className="flex items-center gap-2 text-amber-500 font-black text-[10px] uppercase bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                            ⏳ En attente d'approbation
                          </div>
                          <Link href="/approbations" className="text-[10px] font-black text-[#7C5CFC] hover:underline uppercase tracking-widest hidden group-hover:block transition-all whitespace-nowrap">
                            Voir la demande
                          </Link>
                        </>
                      ) : log.approvalStatus === 'refused' ? (
                        <div className="flex items-center gap-2 text-rose-500 font-black text-[10px] uppercase bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                          <X className="w-3.5 h-3.5" /> Refusé
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] uppercase bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                          <Check className="w-3.5 h-3.5" /> Succès
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="flex-1 flex gap-8 min-h-0"
          >
            {/* Conversations Sidebar */}
            <div className="w-80 glass-card rounded-[32px] p-8 flex flex-col gap-8 border-none shadow-2xl overflow-y-auto custom-scrollbar shrink-0">
               <h3 className="text-[12px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] mb-2 px-1">Historique</h3>
               <div className="space-y-4">
                 {[1,2,3].map(i => (
                    <div key={i} className="p-5 rounded-[24px] bg-white/40 border border-white/60 hover:bg-white/60 hover:scale-[1.02] transition-all cursor-pointer group shadow-sm">
                       <div className="flex items-center gap-3 mb-3">
                          <div className="w-3 h-3 rounded-full bg-[#7C5CFC]" />
                          <span className="text-[10px] font-black text-[#9CA3AF] uppercase">Sessions Q2</span>
                       </div>
                       <p className="text-[13px] font-black text-[#1A1A2E] leading-tight mb-2 group-hover:text-[#7C5CFC] transition-colors">Analyse des risques BioMed Solutions...</p>
                       <span className="text-[10px] font-bold text-[#9CA3AF]">Aujourd'hui, 14:24</span>
                    </div>
                 ))}
               </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 glass-card rounded-[32px] flex flex-col border-none shadow-2xl overflow-hidden">
               <div className="p-8 border-b border-black/5 bg-white/30 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1A1A2E] flex items-center justify-center text-white relative shadow-xl">
                       <Sparkles className="w-6 h-6" />
                       <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white" />
                    </div>
                    <div>
                       <h3 className="text-lg font-black text-[#1A1A2E] tracking-tight">Espace Laboratoire</h3>
                       <p className="text-[10px] font-black text-[#10B981] uppercase tracking-wider">Traitement Temps Réel Actif</p>
                    </div>
                  </div>
               </div>

               <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar relative">
                  {/* Subtle noise/gradient background for chat */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                  
                  {messages.map((m, i) => (
                    <motion.div 
                      key={m.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={cn("flex gap-6", m.role === 'user' ? "flex-row-reverse" : "flex-row")}
                    >
                       <div className={cn(
                        "w-12 h-12 rounded-[18px] flex items-center justify-center shrink-0 shadow-lg border-2 border-white transition-transform hover:scale-110",
                        m.role === 'user' ? "bg-black text-white" : "bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] text-white"
                       )}>
                        {m.role === 'user' ? 'MD' : <Bot className="w-6 h-6" />}
                       </div>
                       <div className={cn("flex flex-col max-w-[70%] gap-2", m.role === 'user' ? "items-end" : "items-start")}>
                          <div className={cn(
                            "p-6 rounded-[28px] text-[15px] font-bold leading-relaxed shadow-xl border border-white/40",
                            m.role === 'user' 
                              ? "bg-black text-white rounded-tr-none" 
                              : "bg-white/80 text-[#1A1A2E] rounded-tl-none backdrop-blur-md"
                          )}>
                            {m.text}
                          </div>
                          <span className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest px-1">{m.timestamp}</span>
                       </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-6">
                       <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center text-white shrink-0 shadow-lg border-2 border-white">
                        <Bot className="w-6 h-6" />
                       </div>
                       <div className="bg-white/80 backdrop-blur-md p-6 rounded-[28px] rounded-tl-none border border-white/40 flex gap-2">
                          <span className="w-2 h-2 bg-[#7C5CFC] rounded-full animate-bounce" />
                          <span className="w-2 h-2 bg-[#7C5CFC] rounded-full animate-bounce [animation-delay:0.2s]" />
                          <span className="w-2 h-2 bg-[#7C5CFC] rounded-full animate-bounce [animation-delay:0.4s]" />
                       </div>
                    </div>
                  )}
               </div>

               <div className="p-10 bg-white/40 backdrop-blur-2xl border-t border-black/5">
                  <div className="max-w-4xl mx-auto flex items-end gap-5 bg-white p-3 rounded-[32px] shadow-2xl border border-white relative group">
                     <div className="flex-1 py-3 px-5">
                       <textarea 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                        placeholder="Demandez n'importe quoi à Bobby..."
                        className="w-full bg-transparent border-none focus:ring-0 text-[15px] font-black text-[#1A1A2E] placeholder-slate-300 resize-none max-h-40"
                        rows={1}
                       />
                     </div>
                     <button 
                      onClick={sendMessage}
                      className="w-14 h-14 rounded-[22px] bg-black text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl group-hover:bg-[#7C5CFC]"
                     >
                      <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Configuration Drawer / Modal */}
      <AnimatePresence>
        {editingAgent && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/40">
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 50 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 1.1, y: 50 }}
               className="glass-card w-full max-w-2xl rounded-[40px] border-none shadow-2xl flex flex-col overflow-hidden"
             >
                <div className="p-10 border-b border-black/5 flex items-center justify-between">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-[24px] bg-white border border-slate-200 flex items-center justify-center text-4xl shadow-xl">
                        {getAgentIcon(editingAgent.id)}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-[#1A1A2E] tracking-tight">{editingAgent.name}</h2>
                        <p className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mt-1">Configuration Paramétrique</p>
                      </div>
                   </div>
                   <button 
                    onClick={() => setEditingAgent(null)}
                    className="w-12 h-12 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
                   >
                    <X className="w-6 h-6" />
                   </button>
                </div>
                <div className="p-10 flex-1 overflow-y-auto space-y-10 custom-scrollbar">
                   {/* Mock config fields */}
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.2em]">Priorité d'exécution</label>
                      <div className="flex gap-4">
                         {['Basse', 'Normale', 'Haute', 'Critique'].map(p => (
                            <button key={p} className={cn("flex-1 py-4 rounded-2xl border text-[12px] font-black transition-all", p === 'Haute' ? 'bg-black text-white border-black shadow-xl' : 'bg-white border-slate-200 text-slate-400 hover:border-black')}>
                              {p}
                            </button>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-[0.2em]">Modèle de Langage</label>
                      <div className="flex gap-4 items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                           <Zap className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-black text-[#1A1A2E]">Liquid Neural 4.0 (Turbo)</p>
                          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Latence: 12ms • Précision: 99.8%</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </div>
                   </div>
                </div>
                <div className="p-10 bg-slate-50 border-t border-black/5 flex justify-end gap-5">
                   <button onClick={() => setEditingAgent(null)} className="px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:text-black transition-colors">ANNULER</button>
                   <button 
                    onClick={() => {
                      setIsSaving(true);
                      setTimeout(() => { setIsSaving(false); setEditingAgent(null); toast.success("Processus déployé"); }, 1200);
                    }}
                    className="px-10 py-4 rounded-2xl bg-black text-white text-sm font-black shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                   >
                     {isSaving ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                     {isSaving ? "DÉPLOIEMENT..." : "APPLIQUER LES CHANGEMENTS"}
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
