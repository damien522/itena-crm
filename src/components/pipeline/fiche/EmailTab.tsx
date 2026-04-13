"use client";

import { Deal, DealEmailThread } from "@/data/pipeline";
import { 
  Plus, Search, Filter, Mail, Reply, Forward, 
  Trash2, Send, Paperclip, ChevronRight, MoreHorizontal,
  Variable, Image as ImageIcon, Link as LinkIcon
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface EmailTabProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function EmailTab({ deal, setDeal }: EmailTabProps) {
  const [selectedThread, setSelectedThread] = useState<DealEmailThread | null>(deal.emails[0] || null);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("Tous");

  const handleSendEmail = () => {
    toast.success("Email envoyé avec succès !");
    setIsComposeOpen(false);
  };

  return (
    <div className="flex h-full bg-white divide-x divide-slate-100 overflow-hidden">
      {/* Thread List */}
      <div className="w-[380px] flex flex-col shrink-0 bg-slate-50/20">
        <div className="p-6 border-b border-slate-100 space-y-4">
           <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Conversations</h3>
              <button 
                onClick={() => setIsComposeOpen(true)}
                className="w-8 h-8 rounded-xl bg-[#7C5CFC] text-white flex items-center justify-center shadow-lg shadow-[#7C5CFC]/20 hover:scale-105 transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
           </div>
           
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              <input type="text" placeholder="Rechercher..." className="w-full bg-white border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-xs font-bold text-[#1A1A2E] focus:ring-2 focus:ring-[#7C5CFC]/20 transition-all shadow-sm" />
           </div>

           <div className="flex gap-2">
              {["Tous", "Envoyés", "Reçus", "Non lus"].map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
                    activeFilter === f ? "bg-white text-[#7C5CFC] border border-[#7C5CFC]/20 shadow-sm" : "bg-transparent text-slate-400 hover:text-slate-600"
                  )}
                >
                  {f}
                </button>
              ))}
           </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {deal.emails.map(thread => (
            <button
              key={thread.id}
              onClick={() => setSelectedThread(thread)}
              className={cn(
                "w-full text-left p-6 border-b border-slate-50 transition-all flex gap-4 hover:bg-white",
                selectedThread?.id === thread.id ? "bg-white border-l-4 border-l-[#7C5CFC] shadow-sm relative z-10" : ""
              )}
            >
               <div className="w-10 h-10 rounded-2xl bg-[#F5F3FF] border-2 border-white shadow-sm shrink-0 flex items-center justify-center text-[#7C5CFC] font-black text-xs">
                  {thread.messages[0].sender.avatar}
               </div>
               <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                     <span className={cn("text-[11px] uppercase tracking-tighter", thread.isUnread ? "font-black text-[#1A1A2E]" : "font-bold text-slate-400")}>
                        {thread.messages[0].sender.name}
                     </span>
                     <span className="text-[10px] font-bold text-slate-300 tabular-nums">
                        {new Date(thread.lastDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                     </span>
                  </div>
                  <h4 className={cn("text-sm leading-tight truncate mb-1", thread.isUnread ? "font-bold text-[#1A1A2E]" : "text-slate-500 font-medium")}>
                    {thread.subject}
                  </h4>
                  <p className="text-xs text-slate-400 truncate font-medium underline decoration-slate-100 italic decoration-2 underline-offset-4">
                    {thread.messages[thread.messages.length - 1].body.substring(0, 60)}...
                  </p>
               </div>
               {thread.messages.length > 1 && (
                 <div className="text-[9px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-md h-fit">
                    {thread.messages.length}
                 </div>
               )}
            </button>
          ))}
        </div>
      </div>

      {/* Thread Detail */}
      <div className="flex-1 flex flex-col bg-slate-50/10">
        {selectedThread ? (
          <>
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
               <div className="flex items-center gap-4">
                  <h2 className="text-lg font-black text-[#1A1A2E]">{selectedThread.subject}</h2>
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-lg border border-slate-100 uppercase tracking-widest italic">Deal Deal</span>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <button className="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all"><Trash2 className="w-5 h-5"/></button>
                  <button className="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all"><MoreHorizontal className="w-5 h-5"/></button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12">
               {selectedThread.messages.map((msg, idx) => (
                 <div key={msg.id} className="group">
                    <div className="flex items-start gap-4 mb-3">
                       <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xs font-black text-[#7C5CFC] italic">
                          {msg.sender.avatar}
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-0.5">
                             <div className="flex items-center gap-2">
                                <span className="text-[13px] font-black text-[#1A1A2E]">{msg.sender.name}</span>
                                <span className="text-[11px] font-bold text-slate-400">({msg.sender.email})</span>
                             </div>
                             <span className="text-[11px] font-bold text-slate-300 tabular-nums">
                                {new Date(msg.date).toLocaleString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                             </span>
                          </div>
                          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                             À: {idx === 0 ? 'Moi (commercial@itena.fr)' : msg.sender.email}
                          </div>
                       </div>
                    </div>
                    
                    <div className="ml-14 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-sm font-medium text-slate-600 leading-relaxed italic whitespace-pre-wrap">
                       {msg.body}
                    </div>

                    <div className="ml-14 mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#7C5CFC] hover:underline">
                          <Reply className="w-3.5 h-3.5" /> Répondre
                       </button>
                       <div className="w-px h-3 bg-slate-200" />
                       <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">
                          <Forward className="w-3.5 h-3.5" /> Transférer
                       </button>
                    </div>
                 </div>
               ))}
            </div>

            {/* Quick Reply Bar */}
            <div className="p-8 border-t border-slate-100 bg-white">
               <div className="bg-slate-50 rounded-[28px] border border-slate-100 p-2 flex items-center gap-4 group focus-within:ring-2 focus-within:ring-[#7C5CFC]/20 transition-all">
                   <div className="flex-1 px-4">
                      <input type="text" placeholder="Tapez votre réponse ici..." className="w-full bg-transparent border-none py-3 px-0 focus:ring-0 text-sm font-bold text-[#1A1A2E]" />
                   </div>
                   <button 
                    onClick={() => handleSendEmail()}
                    className="w-12 h-12 rounded-[20px] bg-[#1A1A2E] text-white flex items-center justify-center shadow-xl shadow-black/10 hover:bg-black transition-all"
                   >
                      <Send className="w-5 h-5" />
                   </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center flex-col gap-4 text-slate-300">
             <Mail className="w-20 h-20 opacity-20" />
             <p className="font-black text-xs uppercase tracking-[0.3em] opacity-40">Sélectionnez une conversation</p>
          </div>
        )}
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {isComposeOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#1A1A2E]/60 backdrop-blur-md" onClick={() => setIsComposeOpen(false)} />
             <motion.div 
               initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
               className="relative bg-white w-full max-w-[700px] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
             >
                <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between">
                   <h3 className="text-xl font-black text-[#1A1A2E]">Nouvel Email</h3>
                   <button onClick={() => setIsComposeOpen(false)} className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-all"><X className="w-5 h-5"/></button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 space-y-6">
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 py-3 border-b border-slate-50">
                         <span className="w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">À</span>
                         <input type="text" defaultValue={deal.contactName} className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-[13px] font-bold text-[#1A1A2E]" />
                         <div className="flex items-center gap-2">
                            <button className="text-[10px] font-black text-[#7C5CFC] uppercase tracking-widest hover:underline">Cc</button>
                            <button className="text-[10px] font-black text-[#7C5CFC] uppercase tracking-widest hover:underline">Cci</button>
                         </div>
                      </div>
                      <div className="flex items-center gap-4 py-3 border-b border-slate-50">
                         <span className="w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">Objet</span>
                         <input type="text" placeholder="Sujet de votre email" className="flex-1 bg-transparent border-none p-0 focus:ring-0 text-[13px] font-bold text-[#1A1A2E]" />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
                         <div className="flex items-center gap-6 mb-6 pb-4 border-b border-slate-200/50">
                            <button className="p-1 text-slate-400 hover:text-[#7C5CFC] transition-colors"><ImageIcon className="w-4 h-4"/></button>
                            <button className="p-1 text-slate-400 hover:text-[#7C5CFC] transition-colors"><LinkIcon className="w-4 h-4"/></button>
                            <button className="p-1 text-slate-400 hover:text-[#7C5CFC] transition-colors"><Paperclip className="w-4 h-4"/></button>
                            <div className="w-px h-4 bg-slate-200" />
                            <button className="flex items-center gap-1.5 text-[10px] font-black text-[#7C5CFC] border border-[#7C5CFC]/20 px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white transition-all">
                               <Variable className="w-3 h-3" /> Variables
                            </button>
                            <button className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg bg-white/50 hover:bg-white transition-all">
                               Modèles
                            </button>
                         </div>
                         <textarea 
                          placeholder="Écrivez votre message ici..."
                          className="w-full bg-transparent border-none p-0 focus:ring-0 text-[13px] font-medium text-slate-600 min-h-[250px] italic leading-relaxed"
                         />
                      </div>
                   </div>
                </div>

                <div className="px-10 py-8 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                   <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all shadow-sm">
                         Sauvegarder Brouillon
                      </button>
                   </div>
                   <button 
                    onClick={() => handleSendEmail()}
                    className="flex items-center gap-3 px-10 py-4 rounded-2xl bg-[#1A1A2E] text-white text-[11px] font-black uppercase tracking-widest shadow-2xl shadow-black/20 hover:bg-black transition-all"
                   >
                      <Send className="w-4 h-4" /> Envoyer
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function X({ className }: { className?: string }) { return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>; }
