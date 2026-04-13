"use client";

import { Deal, DealInteraction } from "@/data/pipeline";
import { 
  Phone, Mail, Calendar, MessageSquare, CheckSquare, 
  ChevronDown, Plus, User, Clock, MapPin, ExternalLink,
  ChevronRight, ArrowRight, AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface ActivityTabProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function ActivityTab({ deal, setDeal }: ActivityTabProps) {
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const icons = {
    Appel: Phone,
    Email: Mail,
    Réunion: Calendar,
    Note: MessageSquare,
    Tâche: CheckSquare,
    "Changement d'étape": ChevronRight
  };

  const colors = {
    Appel: "border-blue-200 bg-blue-500",
    Email: "border-amber-200 bg-amber-500",
    Réunion: "border-[#C4B5F4] bg-[#7C5CFC]",
    Note: "border-slate-200 bg-slate-400",
    Tâche: "border-emerald-200 bg-emerald-500",
    "Changement d'étape": "border-slate-100 bg-slate-200"
  };

  const handleLogActivity = () => {
    const newInt: DealInteraction = {
      id: `new-${Date.now()}`,
      type: activeForm as any,
      date: new Date().toISOString(),
      author: deal.assignedTo.name,
      authorAvatar: deal.assignedTo.avatar,
      content: formData.content || `Nouvel enregistrement: ${activeForm}`,
      ...formData
    };

    setDeal({ ...deal, interactions: [newInt, ...deal.interactions] });
    setActiveForm(null);
    setFormData({});
    toast.success("Activité enregistrée");
  };

  return (
    <div className="p-10 space-y-12 max-w-[900px]">
      {/* Sticky Logger Bar */}
      <div className="bg-white rounded-[32px] border-2 border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden sticky top-4 z-10 transition-all hover:shadow-2xl">
         <div className="flex items-center gap-1 p-2 bg-slate-50/50">
            {[
              { id: 'Appel', icon: Phone, label: 'Appel' },
              { id: 'Réunion', icon: Calendar, label: 'Réunion' },
              { id: 'Email', icon: Mail, label: 'Email' },
              { id: 'Note', icon: MessageSquare, label: 'Note' },
              { id: 'Tâche', icon: CheckSquare, label: 'Tâche' }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setActiveForm(activeForm === type.id ? null : type.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                  activeForm === type.id ? "bg-[#1A1A2E] text-white shadow-lg" : "text-slate-400 hover:bg-white hover:text-[#7C5CFC]"
                )}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </button>
            ))}
         </div>

         <AnimatePresence>
            {activeForm && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-slate-100 overflow-hidden"
              >
                <div className="p-8 space-y-6">
                   {activeForm === 'Appel' && (
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Issue de l'appel</label>
                           <select className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-[#7C5CFC]/20 appearance-none">
                              <option>Positif</option>
                              <option>Neutre</option>
                              <option>Pas répondu</option>
                              <option>Rappel demandé</option>
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Durée (min)</label>
                           <input type="number" placeholder="15" className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-[#7C5CFC]/20" />
                        </div>
                     </div>
                   )}

                   {activeForm === 'Réunion' && (
                     <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Lieu / Lien Vidéo</label>
                           <input type="text" placeholder="Zoom, Google Meet, On-site..." className="w-full bg-slate-50 border-none rounded-2xl py-3 px-4 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-[#7C5CFC]/20" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Participants</label>
                           <div className="p-3 bg-slate-50 rounded-2xl flex -space-x-2">
                              <div className="w-6 h-6 rounded-lg bg-[#7C5CFC] text-white flex items-center justify-center text-[8px] font-black shadow-sm ring-2 ring-white">YT</div>
                              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[8px] font-black shadow-sm ring-2 ring-white">+2</div>
                           </div>
                        </div>
                     </div>
                   )}

                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Notes & Détails</label>
                      <textarea 
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-[24px] py-4 px-6 text-sm font-bold text-[#1A1A2E] focus:ring-2 focus:ring-[#7C5CFC]/20 min-h-[120px] resize-none"
                        placeholder="Le client a mentionné que..."
                      />
                   </div>

                   <div className="flex justify-end gap-3 pt-4">
                      <button onClick={() => setActiveForm(null)} className="px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600">Annuler</button>
                      <button 
                        onClick={handleLogActivity}
                        className="px-8 py-3 bg-[#1A1A2E] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-black/10 hover:bg-black transition-all"
                      >
                        Enregistrer
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Activity Feed */}
      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-4 before:-z-0 before:w-0.5 before:bg-slate-100/50 before:h-full">
         {deal.interactions.map((int, idx) => {
            const Icon = icons[int.type] || MessageSquare;
            const isLatest = idx === 0;
            
            if (int.type === "Changement d'étape") {
              return (
                <div key={int.id} className="relative z-10 flex items-center justify-center py-4">
                   <div className="px-6 py-2 bg-white border border-slate-100 rounded-2xl shadow-sm flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">{int.content}</span>
                      <span className="text-[9px] font-bold text-slate-300 tabular-nums">11/04/26</span>
                   </div>
                </div>
              )
            }

            return (
              <motion.div 
                key={int.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={cn(
                  "relative z-10 flex items-start gap-8 group ml-1"
                )}
              >
                 <div className={cn(
                   "w-6 h-6 rounded-lg ring-4 ring-white shadow-lg flex items-center justify-center text-white shrink-0 mt-2 rotate-3 transition-transform group-hover:rotate-0",
                   colors[int.type] || "bg-slate-400"
                 )}>
                    <Icon className="w-3.5 h-3.5" />
                 </div>

                 <div className={cn(
                   "flex-1 bg-white rounded-[32px] border transition-all p-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1",
                   int.type === 'Appel' ? "border-l-4 border-l-blue-200" :
                   int.type === 'Email' ? "border-l-4 border-l-amber-200" :
                   int.type === 'Réunion' ? "border-l-4 border-l-violet-200" :
                   int.type === 'Tâche' ? "border-l-4 border-l-emerald-200" : "border-slate-100"
                 )}>
                    <div className="flex justify-between items-start mb-4">
                       <div>
                          <div className="flex items-center gap-3 mb-1">
                             <h4 className="font-black text-[#1A1A2E] text-[15px]">{int.type === 'Appel' ? `Appel avec ${int.contactName || 'Client'}` : int.type}</h4>
                             {int.outcome && (
                               <span className={cn(
                                 "text-[9px] font-black uppercase px-2 py-0.5 rounded-lg",
                                 int.outcome === 'Positif' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-slate-50 text-slate-500 border border-slate-100"
                               )}>
                                 {int.outcome}
                               </span>
                             )}
                          </div>
                          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                             <div className="flex items-center gap-1.5"><User className="w-3 h-3" /> {int.author}</div>
                             <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {new Date(int.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} à {new Date(int.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                             {int.duration && <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">{int.duration} min</div>}
                          </div>
                       </div>
                       <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-400 border-2 border-white shadow-sm italic ring-2 ring-slate-50">
                          {int.authorAvatar}
                       </div>
                    </div>

                    <div className="text-[13px] font-medium text-slate-600 leading-relaxed bg-slate-50/50 p-5 rounded-[20px] border border-slate-50 italic">
                       {int.content}
                    </div>

                    {int.type === 'Réunion' && (
                      <div className="mt-4 flex items-center gap-3 px-2">
                         <div className="flex items-center gap-2 text-[10px] font-black text-[#7C5CFC] uppercase tracking-widest">
                            <MapPin className="w-3 h-3" /> {int.location || 'Zoom Meeting'}
                         </div>
                         <div className="w-px h-3 bg-slate-200" />
                         <div className="flex -space-x-2">
                            {int.attendees?.map(at => (
                              <div key={at.name} title={at.name} className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[8px] font-black text-slate-400 uppercase ring-2 ring-white shadow-sm italic">{at.avatar}</div>
                            ))}
                         </div>
                      </div>
                    )}

                    {int.type === 'Tâche' && (
                       <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest">
                             <Clock className="w-3 h-3" /> Échéance: Aujourd'hui
                          </div>
                          <button className="flex items-center gap-2 text-[10px] font-black text-[#7C5CFC] uppercase tracking-widest hover:underline">
                             Voir la tâche <ArrowRight className="w-3 h-3" />
                          </button>
                       </div>
                    )}
                 </div>
              </motion.div>
            )
         })}

         {/* Final Creation Entry */}
         <div className="relative z-10 flex items-center justify-center pt-8">
            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] flex items-center gap-4">
               <div className="w-12 h-px bg-slate-100" />
               Deal créé le {new Date(deal.openDate).toLocaleDateString('fr-FR')}
               <div className="w-12 h-px bg-slate-100" />
            </div>
         </div>
      </div>
    </div>
  );
}
