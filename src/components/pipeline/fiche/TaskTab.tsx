"use client";

import { Deal, DealTask } from "@/data/pipeline";
import { 
  Plus, CheckCircle2, Circle, Clock, User, 
  MoreHorizontal, ChevronDown, ChevronUp, AlertCircle
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface TaskTabProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function TaskTab({ deal, setDeal }: TaskTabProps) {
  const [filter, setFilter] = useState("Toutes");
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleTask = (taskId: string) => {
    const updated = deal.tasks.map(t => 
      t.id === taskId ? { ...t, status: (t.status === "Complétée" ? "En cours" : "Complétée") as any } : t
    );
    setDeal({ ...deal, tasks: updated });
    toast.success("Tâche mise à jour");
  };

  const today = new Date("2026-04-12T12:00:00Z");

  const groups = [
    { title: "En retard", color: "text-rose-500", filter: (t: DealTask) => new Date(t.dueDate) < today && t.status !== "Complétée" },
    { title: "Aujourd'hui", color: "text-[#7C5CFC]", filter: (t: DealTask) => new Date(t.dueDate).toDateString() === today.toDateString() && t.status !== "Complétée" },
    { title: "Cette semaine", color: "text-blue-500", filter: (t: DealTask) => {
        const d = new Date(t.dueDate);
        return d > today && d <= new Date(today.getTime() + 7 * 86400000) && t.status !== "Complétée";
    }},
    { title: "Plus tard", color: "text-slate-400", filter: (t: DealTask) => new Date(t.dueDate) > new Date(today.getTime() + 7 * 86400000) && t.status !== "Complétée" },
  ];

  const completedTasks = deal.tasks.filter(t => t.status === "Complétée");

  return (
    <div className="p-10 space-y-10 max-w-[800px]">
      <div className="flex items-center justify-between">
         <div className="flex gap-2">
            {["Toutes", "En cours", "Complétées", "En retard"].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f ? "bg-[#1A1A2E] text-white shadow-lg" : "bg-white text-slate-400 border border-slate-100 hover:text-slate-600 shadow-sm"
                )}
              >
                {f}
              </button>
            ))}
         </div>
         <button className="flex items-center gap-2 px-6 py-2.5 bg-[#7C5CFC] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-[#7C5CFC]/20 hover:scale-105 transition-all">
            <Plus className="w-4 h-4" /> Nouvelle tâche
         </button>
      </div>

      <div className="space-y-12">
         {groups.map(group => {
            const tasks = deal.tasks.filter(group.filter);
            if (tasks.length === 0) return null;

            return (
              <div key={group.title} className="space-y-4">
                 <div className="flex items-center gap-3 px-2">
                    <h3 className={cn("text-[10px] font-black uppercase tracking-[0.25em]", group.color)}>{group.title}</h3>
                    <div className="flex-1 h-px bg-slate-100" />
                    <span className="text-[10px] font-black text-slate-300 tabular-nums">{tasks.length}</span>
                 </div>
                 
                 <div className="space-y-3">
                    {tasks.map(task => (
                      <div key={task.id} className="group bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#7C5CFC]/20 transition-all flex items-center gap-5">
                         <button 
                          onClick={() => toggleTask(task.id)}
                          className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 hover:text-[#7C5CFC] hover:border-[#7C5CFC] transition-all shrink-0"
                         >
                            <Circle className="w-5 h-5" />
                         </button>
                         <div className="flex-1">
                            <h4 className="font-black text-[#1A1A2E] text-[15px] group-hover:text-[#7C5CFC] transition-colors">{task.title}</h4>
                            <div className="flex items-center gap-4 mt-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                               <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {new Date(task.dueDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</div>
                               <div className="flex items-center gap-1.5 underline decoration-slate-100 decoration-2 underline-offset-2"><User className="w-3.5 h-3.5" /> {task.assignedTo}</div>
                               <div className={cn(
                                 "flex items-center gap-1.5 px-2 py-0.5 rounded-lg border",
                                 task.priority === 'Haute' ? "text-rose-500 bg-rose-50 border-rose-100" :
                                 task.priority === 'Normale' ? "text-blue-500 bg-blue-50 border-blue-100" : "text-slate-400 bg-slate-50 border-slate-100"
                               )}>
                                  <AlertCircle className="w-3 h-3" /> {task.priority}
                               </div>
                            </div>
                         </div>
                         <button className="p-2 opacity-0 group-hover:opacity-100 transition-all text-slate-300 hover:text-slate-600">
                            <MoreHorizontal className="w-5 h-5" />
                         </button>
                      </div>
                    ))}
                 </div>
              </div>
            )
         })}

         {completedTasks.length > 0 && (
           <div className="pt-4">
              <button 
                onClick={() => setShowCompleted(!showCompleted)}
                className="flex items-center gap-3 w-full justify-center py-4 bg-slate-50 rounded-[32px] border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:bg-slate-100 transition-all"
              >
                 {showCompleted ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                 {showCompleted ? "Cacher" : "Voir"} les {completedTasks.length} tâches complétées
              </button>

              <AnimatePresence>
                {showCompleted && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-6 space-y-3"
                  >
                    {completedTasks.map(task => (
                      <div key={task.id} className="bg-slate-50/50 p-5 rounded-[28px] border border-slate-100/50 flex items-center gap-5 opacity-60">
                         <button 
                          onClick={() => toggleTask(task.id)}
                          className="w-10 h-10 rounded-2xl bg-[#7C5CFC] text-white flex items-center justify-center shrink-0"
                         >
                            <CheckCircle2 className="w-5 h-5" />
                         </button>
                         <div className="flex-1">
                            <h4 className="font-bold text-slate-400 text-[15px] line-through">{task.title}</h4>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                               Complétée le {new Date().toLocaleDateString('fr-FR')}
                            </div>
                         </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
         )}
      </div>
    </div>
  );
}
