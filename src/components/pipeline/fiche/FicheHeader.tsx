"use client";

import { Deal } from "@/data/pipeline";
import { defaultStages } from "@/data/pipelineStages";
import { 
  ChevronRight, ArrowLeft, MoreHorizontal, X, 
  DollarSign, Target, User, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FicheHeaderProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function FicheHeader({ deal, setDeal }: FicheHeaderProps) {
  const router = useRouter();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(deal.title);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle) titleRef.current?.focus();
  }, [isEditingTitle]);

  const handleTitleSave = () => {
    setDeal({ ...deal, title: titleInput });
    setIsEditingTitle(false);
    toast.success("Titre mis à jour");
  };

  const currentStageIndex = defaultStages.findIndex(s => s.id === deal.stageId);

  return (
    <header className="h-[72px] bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-30">
      <div className="flex items-center gap-6">
        <button 
          onClick={() => router.push("/pipeline")}
          className="p-2 rounded-xl hover:bg-slate-50 text-slate-400 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Link href="/pipeline" className="hover:text-[#7C5CFC] transition-colors">Pipeline</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Détail du Deal</span>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditingTitle ? (
              <input
                ref={titleRef}
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => e.key === 'Enter' && handleTitleSave()}
                className="text-xl font-bold text-[#1A1A2E] bg-slate-50 border-none p-0 focus:ring-0 w-[400px]"
              />
            ) : (
              <h1 
                onClick={() => setIsEditingTitle(true)}
                className="text-xl font-bold text-[#1A1A2E] cursor-pointer hover:bg-slate-50 rounded px-1 -ml-1 transition-all"
              >
                {deal.title}
              </h1>
            )}

            {/* Stage Progress mini-bar */}
            <div className="flex items-center gap-1.5 ml-4">
               {defaultStages.map((s, idx) => {
                 const isPast = idx < currentStageIndex;
                 const isCurrent = idx === currentStageIndex;
                 return (
                   <div key={s.id} className="flex items-center">
                     <button
                        onClick={() => {
                          setDeal({ ...deal, stageId: s.id });
                          toast.success(`Étape changée : ${s.name}`);
                        }}
                        className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all hover:scale-150",
                          isPast ? "bg-slate-200" : isCurrent ? "bg-[#7C5CFC] shadow-[0_0_8px_rgba(124,92,252,0.5)]" : "border-2 border-slate-200"
                        )}
                        title={s.name}
                     />
                     {idx < defaultStages.length - 1 && (
                       <div className={cn("w-4 h-[1px] mx-0.5", isPast ? "bg-slate-200" : "bg-slate-100")} />
                     )}
                   </div>
                 )
               })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Valeur</span>
            <div className="text-lg font-black text-[#1A1A2E] tabular-nums">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(deal.value)}
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Probabilité</span>
            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
               <span className="text-sm font-black text-[#7C5CFC] tabular-nums">{deal.probability}%</span>
               <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-3 pl-6 border-l border-slate-100">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Commercial</span>
              <span className="text-xs font-bold text-[#1A1A2E]">{deal.assignedTo.name}</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-[#7C5CFC] font-black text-xs border-2 border-white shadow-sm">
              {deal.assignedTo.avatar}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg shadow-[#7C5CFC]/20">
            Ajouter une activité
          </button>
          <button className="p-2.5 rounded-2xl border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
            <MoreHorizontal className="w-5 h-5" />
          </button>
          <button 
            onClick={() => router.push("/pipeline")}
            className="p-2.5 rounded-2xl hover:bg-slate-50 text-slate-400 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
