"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, Command, BarChart, Users, ShieldAlert, FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

interface BobbyQuickChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BobbyQuickChat({ isOpen, onClose }: BobbyQuickChatProps) {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "bobby", text: "Bonjour ! Je suis prêt à vous aider avec les données de la plateforme. Que souhaitez-vous analyser aujourd'hui ?" }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const smartPropositions = [
    { id: 'ca', label: "Analyse CA BioMed", desc: "Comprendre la baisse de 12%", icon: BarChart, color: "text-rose-500", prompt: "Analyse la baisse du CA de BioMed ce mois-ci (-12%) et propose des actions." },
    { id: 'leads', label: "Top Prospects", desc: "Priorités de relance J+7", icon: Users, color: "text-amber-500", prompt: "Quels sont les 5 prospects prioritaires à relancer aujourd'hui ?" },
    { id: 'conf', label: "Conformité Dental", desc: "Vérifier les certifications", icon: ShieldAlert, color: "text-emerald-500", prompt: "Vérifie l'état de conformité des distributeurs Dental et signale les expirations proches." },
    { id: 'rep', label: "Rapport Hebdo", desc: "Résumé des performances", icon: FileText, color: "text-indigo-500", prompt: "Génère un résumé des performances commerciales de la semaine dernière." },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text?: string) => {
    const finalMsg = text || message;
    if (!finalMsg.trim()) return;
    
    const userMsg = { id: Date.now(), role: "user", text: finalMsg };
    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "bobby", 
        text: "C'est une excellente question. Je compile les données en temps réel... D'après mes analyses, voici ce qui ressort : [Données simulées basées sur Itena CRM]. Souhaitez-vous un détail plus précis ?" 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const selectProposition = (p: typeof smartPropositions[0]) => {
    handleSend(p.prompt);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1A1A2E]/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[700px] h-[650px] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col border border-white/20"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center text-white shadow-xl shadow-[#7C5CFC]/20">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-[#1A1A2E] text-lg tracking-tight">Bobby Intelligence</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Analyste Itena Direct</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-2">
                    <kbd className="text-[10px] font-black text-slate-400">ESC</kbd>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fermer</span>
                 </div>
                 <button 
                  onClick={onClose}
                  className="p-2.5 rounded-2xl hover:bg-slate-100 text-slate-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-50/30 custom-scrollbar"
            >
              {messages.map((m) => (
                <div 
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-[15px] font-bold leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-[#7C5CFC] text-white rounded-tr-none shadow-lg shadow-[#7C5CFC]/20' 
                      : 'bg-white text-[#1A1A2E] border border-slate-100 rounded-tl-none shadow-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="col-span-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 px-2">Propositions Intelligentes</div>
                  {smartPropositions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => selectProposition(p)}
                      className="flex flex-col items-start p-5 rounded-[24px] bg-white border border-slate-100 hover:border-[#7C5CFC] hover:shadow-xl hover:shadow-[#7C5CFC]/5 transition-all text-left group"
                    >
                      <div className={`${p.color} bg-slate-50 p-2.5 rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
                        <p.icon className="w-5 h-5" />
                      </div>
                      <div className="font-black text-[#1A1A2E] text-sm mb-1">{p.label}</div>
                      <div className="text-[12px] font-bold text-slate-400 leading-tight">{p.desc}</div>
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex gap-2 items-center px-6 py-4 bg-white rounded-full w-fit border border-slate-100 shadow-sm">
                  <div className="w-2 h-2 bg-[#7C5CFC] rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-[#7C5CFC] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-[#7C5CFC] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-8 bg-white border-t border-slate-100">
               <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-3xl border border-slate-200 shadow-inner">
                  <Sparkles className="w-5 h-5 text-[#7C5CFC] ml-2" />
                  <input 
                    type="text" 
                    autoFocus
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && message.trim()) handleSend();
                      if (e.key === 'Escape') onClose();
                    }}
                    placeholder="Demandez une analyse ou une action..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-[15px] font-bold text-[#1A1A2E] px-2"
                  />
                  <div className="flex items-center gap-2 pr-1">
                     <button 
                      onClick={() => handleSend()}
                      disabled={!message.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#1A1A2E] text-white hover:bg-black transition-all disabled:opacity-30 shadow-lg shadow-black/10"
                    >
                      <span className="text-[13px] font-black uppercase tracking-wider">Analyser</span>
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
               </div>
               <div className="mt-6 flex items-center justify-between px-2">
                  <div className="flex gap-4">
                    <button className="text-[10px] font-black text-slate-400 hover:text-[#7C5CFC] transition-colors uppercase tracking-[0.15em]">Ressources</button>
                    <button className="text-[10px] font-black text-slate-400 hover:text-[#7C5CFC] transition-colors uppercase tracking-[0.15em]">Agent Settings</button>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                    <Command className="w-3 h-3" />
                    <span>D to toggle</span>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
