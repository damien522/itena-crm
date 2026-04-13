"use client";

import { Deal } from "@/data/pipeline";
import { 
  Building2, User2, Mail, Phone, ExternalLink, 
  ChevronDown, ChevronUp, Zap, Target, Calendar,
  TrendingUp, Clock, AlertTriangle, ShieldCheck, Sliders
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

interface ContextPanelProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function ContextPanel({ deal, setDeal }: ContextPanelProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    company: true,
    contact: true,
    details: true,
    team: false,
    automations: false,
    stats: false,
  });

  const toggle = (section: string) => setExpanded(prev => ({ ...prev, [section]: !prev[section] }));

  const Section = ({ id, title, icon: Icon, children }: { id: string, title: string, icon: any, children: React.ReactNode }) => (
    <div className="border-b border-slate-50 last:border-b-0">
      <button 
        onClick={() => toggle(id)}
        className="w-full px-8 py-5 flex items-center justify-between hover:bg-slate-50/50 transition-all font-black text-[10px] text-slate-400 uppercase tracking-[0.2em]"
      >
        <div className="flex items-center gap-3">
           <Icon className="w-4 h-4" />
           {title}
        </div>
        {expanded[id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {expanded[id] && <div className="px-8 pb-6 animate-in fade-in slide-in-from-top-2 duration-200">{children}</div>}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* SECTION 1: ENTREPRISE */}
      <Section id="company" title="Entreprise" icon={Building2}>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-sm italic">
            {deal.companyFlag}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <h4 className="font-black text-[#1A1A2E] text-[15px]">{deal.companyName}</h4>
               <span className={cn(
                 "text-[9px] font-black uppercase px-2 py-0.5 rounded-lg",
                 deal.companyType === "prospect" ? "bg-amber-50 text-amber-600 border border-amber-100" : "bg-violet-50 text-violet-600 border border-violet-100"
               )}>
                 {deal.companyType === "prospect" ? "Prospect" : "Distributeur"}
               </span>
            </div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-tighter flex items-center gap-2">
               <span>France, Lyon</span>
               <span className="w-1 h-1 rounded-full bg-slate-300" />
               <Link href="/" className="text-[#7C5CFC] hover:underline flex items-center gap-1">
                  Site web <ExternalLink className="w-2.5 h-2.5" />
               </Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
           <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-2 py-1 rounded-lg border border-slate-100">Secteur: Dentaire</span>
           <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-2 py-1 rounded-lg border border-slate-100">Taille: 51-200</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
           <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Potentiel</div>
              <div className="text-xs font-black text-emerald-600 uppercase">Fort</div>
           </div>
           <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Source</div>
              <div className="text-xs font-black text-slate-600 uppercase">Inbound</div>
           </div>
        </div>

        <Link href={`/${deal.companyType}s/${deal.companyId}`} className="w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-[#1A1A2E] flex items-center justify-center gap-2 transition-all border border-slate-100">
           Voir la fiche entreprise
        </Link>
        {deal.companyType === "prospect" && (
          <button className="w-full mt-3 py-3 bg-emerald-50 hover:bg-emerald-100 rounded-2xl text-[11px] font-black uppercase tracking-widest text-emerald-700 flex items-center justify-center gap-2 transition-all border border-emerald-100">
             Convertir en distributeur
          </button>
        )}
      </Section>

      {/* SECTION 2: CONTACT PRINCIPAL */}
      <Section id="contact" title="Contact Principal" icon={User2}>
        <div className="flex items-center gap-4 mb-5">
           <div className="w-12 h-12 rounded-2xl bg-[#F5F3FF] border-2 border-white shadow-md flex items-center justify-center text-[#7C5CFC] font-black text-[13px]">
              {deal.contactName.split(' ').map(n => n[0]).join('')}
           </div>
           <div>
              <h4 className="font-black text-[#1A1A2E] text-[15px] leading-tight">{deal.contactName}</h4>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Directeur des achats</p>
           </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-6">
           <button className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-[#F5F3FF] hover:text-[#7C5CFC] rounded-2xl transition-all border border-slate-100 group">
              <Phone className="w-4 h-4 text-slate-300 group-hover:text-[#7C5CFC]" />
              <span className="text-[9px] font-black uppercase tracking-tighter">Appel</span>
           </button>
           <button className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-[#F5F3FF] hover:text-[#7C5CFC] rounded-2xl transition-all border border-slate-100 group">
              <Mail className="w-4 h-4 text-slate-300 group-hover:text-[#7C5CFC]" />
              <span className="text-[9px] font-black uppercase tracking-tighter">Email</span>
           </button>
           <Link href={`/contacts/${deal.contactId}`} className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-[#F5F3FF] hover:text-[#7C5CFC] rounded-2xl transition-all border border-slate-100 group">
              <User2 className="w-4 h-4 text-slate-300 group-hover:text-[#7C5CFC]" />
              <span className="text-[9px] font-black uppercase tracking-tighter">Fiche</span>
           </Link>
        </div>

        <div className="space-y-3">
           <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-slate-400">Autres contacts</span>
              <button className="text-[#7C5CFC] hover:underline">+ Ajouter</button>
           </div>
           <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl border border-slate-100">
              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-400 italic">HB</div>
              <span className="text-xs font-bold text-slate-600">Haruki Bauer</span>
           </div>
        </div>
      </Section>

      {/* SECTION 3: DETAILS DU DEAL */}
      <Section id="details" title="Détails du Deal" icon={Sliders}>
         <div className="space-y-6">
            <div 
              className="group cursor-pointer p-4 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100"
              onClick={() => toast.info("Passage en mode édition...")}
            >
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-1 block">Valeur Estimée</label>
               <div className="text-xl font-black text-[#1A1A2E] tabular-nums">€{deal.value.toLocaleString('fr-FR')}</div>
            </div>

            <div>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mb-3 block">Probabilité</label>
               <div className="flex items-center gap-4">
                  <input type="range" min="0" max="100" value={deal.probability} onChange={() => {}} className="flex-1 accent-[#7C5CFC]" />
                  <span className="w-12 text-center text-sm font-black text-[#7C5CFC] bg-[#F5F3FF] px-2 py-1 rounded-lg border border-[#EDE9FE]">{deal.probability}%</span>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Ouverture</label>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-black text-slate-600 border border-slate-100">
                     {new Date(deal.openDate).toLocaleDateString('fr-FR')}
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Clôture prévue</label>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-black text-rose-500 border border-rose-100">
                     {new Date(deal.expectedClose).toLocaleDateString('fr-FR')}
                  </div>
               </div>
            </div>

            <div>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Gammes d'intérêt</label>
               <div className="flex flex-wrap gap-2">
                  {["Protéger", "Préserver", "Remplacer", "Prendre Soin"].map(g => (
                    <div 
                      key={g}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer",
                        deal.productFamilyInterest.includes(g) ? "bg-[#7C5CFC] text-white shadow-md shadow-[#7C5CFC]/20" : "bg-white text-slate-300 border border-slate-100"
                      )}
                    >
                      {g}
                    </div>
                  ))}
               </div>
            </div>

            <div>
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Priorité</label>
               <div className="flex bg-slate-100 p-1 rounded-2xl">
                  {["Haute", "Normale", "Basse"].map(p => (
                    <button 
                      key={p}
                      className={cn(
                        "flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                        deal.priority === p ? "bg-white text-[#7C5CFC] shadow-sm" : "text-slate-400"
                      )}
                    >
                       {p}
                    </button>
                  ))}
               </div>
            </div>
         </div>
      </Section>

      {/* SECTION 4: COMMERCIAL ASSIGNÉ - Collapsed by default */}
      <Section id="team" title="Commercial Assigné" icon={Zap}>
         <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border-2 border-white shadow-sm flex items-center justify-center text-amber-600 font-black text-sm">
               {deal.assignedTo.avatar}
            </div>
            <div className="flex-1">
               <h4 className="font-black text-[#1A1A2E] text-sm">{deal.assignedTo.name}</h4>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Commercial Senior</p>
            </div>
            <button className="text-xs font-black text-[#7C5CFC] hover:underline uppercase tracking-widest">Réassigner</button>
         </div>
         
         <div>
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-3">Participants</span>
            <div className="flex -space-x-3 overflow-hidden">
               {["MD", "SM", "TB"].map(av => (
                 <div key={av} className="inline-block h-8 w-8 rounded-2xl ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400">
                    {av}
                 </div>
               ))}
               <div className="inline-block h-8 w-8 rounded-2xl ring-2 ring-white bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-300">
                  +3
               </div>
            </div>
         </div>
      </Section>

      {/* SECTION 5: AUTOMATISATIONS - Collapsed */}
      <Section id="automations" title="Automatisations" icon={Zap}>
         <div className="space-y-4">
            <div className="p-4 bg-[#F5F3FF] border border-[#EDE9FE] rounded-2xl flex items-start gap-3">
               <Zap className="w-4 h-4 text-[#7C5CFC] shrink-0 mt-1" />
               <div>
                  <h5 className="text-xs font-black text-[#1A1A2E] mb-1 italic">Relance auto. 7j</h5>
                  <p className="text-[10px] font-bold text-slate-500 leading-snug">Si inactivité › 7 jours alors créer une tâche.</p>
               </div>
            </div>
            <Link href="/automatisations" className="text-xs font-black text-[#7C5CFC] hover:underline uppercase tracking-[0.1em] block text-center mt-2">Gérer les automatisations</Link>
         </div>
      </Section>

      {/* SECTION 6: ACTIVITE RAPIDE - Collapsed */}
      <Section id="stats" title="Activité Rapide" icon={Clock}>
         <div className="space-y-5">
            <div className="flex justify-between items-center text-xs font-bold">
               <span className="text-slate-400">Ouvert depuis</span>
               <span className="text-[#1A1A2E] font-black uppercase">22 jours</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold">
               <span className="text-slate-400">Interaction total</span>
               <span className="text-[#1A1A2E] font-black uppercase">14</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold font-black">
               <span className="text-slate-400 underline decoration-slate-100 decoration-4">Dernier contact</span>
               <span className="text-[#7C5CFC] uppercase">Hier (Email)</span>
            </div>
            <div className="h-px bg-slate-50" />
            <div className="flex items-center gap-3">
               <div className={cn(
                 "flex-1 p-3 rounded-2xl border text-center",
                 "bg-rose-50 border-rose-100 text-rose-600"
               )}>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-60">Retard clôture</div>
                  <div className="text-sm font-black">-4j</div>
               </div>
            </div>
         </div>
      </Section>
    </div>
  );
}
