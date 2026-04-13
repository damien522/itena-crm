"use client";

import { useState, useMemo } from "react";
import { contacts, Contact } from "@/data/contacts";
import { 
  Search, Plus, Users2, Mail, Phone, Grid3X3, List,
  MoreHorizontal, ExternalLink, Calendar, PhoneCall, StickyNote, Activity, Filter, MapPin, Clock
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import NewContactModal from "@/components/modals/NewContactModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { EmptyContacts } from "@/components/ui/empty-illustrations";

const ROLE_OPTIONS = ["Tous", "Décisionnaire", "Acheteur", "Technique", "Direction", "Autre"];
const STATUS_OPTIONS = ["Tous", "Actif", "Inactif", "À relancer"];

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Actif": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "Inactif": return "bg-slate-100 text-slate-500 border-slate-200";
    case "À relancer": return "bg-orange-500/10 text-orange-600 border-orange-500/20";
    default: return "bg-slate-100 text-slate-500 border-slate-200";
  }
}

function getCompanyBadge(type: string) {
  return type === "distributeur" 
    ? "bg-[#7C5CFC]/10 text-[#7C5CFC] border-[#7C5CFC]/20"
    : "bg-amber-500/10 text-amber-600 border-amber-500/20";
}

function relativeDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date("2026-04-12T12:00:00Z");
  const diff = Math.floor((now.getTime() - d.getTime()) / 86400000);
  if (diff === 0) return "Aujourd'hui";
  if (diff === 1) return "Hier";
  if (diff < 7) return `${diff}j`;
  if (diff < 30) return `${Math.floor(diff / 7)}s`;
  return `${Math.floor(diff / 30)}m`;
}

export default function ContactsPage() {
  const [view, setView] = useState<"table" | "cards">("table");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return contacts.filter(c => {
      const q = search.toLowerCase();
      const matchSearch = !q || 
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.companyName.toLowerCase().includes(q);
      const matchStatus = statusFilter === "Tous" || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Premium Glass Header */}
      <section className="shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card relative rounded-[32px] overflow-hidden p-8 group border-beam"
        >
          <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-[#7C5CFC]/5 blur-[80px] rounded-full group-hover:bg-[#7C5CFC]/10 transition-colors duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-[24px] bg-[#1A1A2E] flex items-center justify-center shadow-2xl border border-white/20">
                <Users2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#1A1A2E] tracking-tight">Répertoire Contacts</h1>
                <p className="text-sm font-black text-[#9CA3AF] uppercase tracking-[0.2em] mt-1">Gérez votre écosystème commercial</p>
              </div>
            </div>
            
            <div className="flex gap-4">
               <div className="flex bg-white/40 backdrop-blur-md p-1.5 rounded-[20px] border border-white shadow-sm">
                <button
                  onClick={() => setView("table")}
                  className={cn("p-2.5 rounded-xl transition-all", view === "table" ? "bg-white text-[#7C5CFC] shadow-md" : "text-slate-400 hover:text-slate-600")}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView("cards")}
                  className={cn("p-2.5 rounded-xl transition-all", view === "cards" ? "bg-white text-[#7C5CFC] shadow-md" : "text-slate-400 hover:text-slate-600")}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#1A1A2E] hover:bg-black text-white px-8 py-3.5 rounded-2xl text-[12px] font-black uppercase tracking-wider transition-all shadow-2xl flex items-center gap-2"
              >
                <Plus className="w-5 h-5"/> Nouveau Contact
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Modern Filter Bar */}
      <div className="flex flex-col md:flex-row gap-6 shrink-0">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#7C5CFC] transition-colors" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par nom, entreprise ou email…"
            className="w-full pl-14 pr-6 py-4 bg-white/40 backdrop-blur-md border border-white/80 rounded-[22px] text-[13px] font-bold text-[#1A1A2E] placeholder-slate-300 focus:outline-none focus:border-[#7C5CFC] transition-all focus:ring-4 focus:ring-[#7C5CFC]/5 shadow-sm"
          />
        </div>

        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-white/40 backdrop-blur-md border border-white/80 rounded-[22px] px-8 py-4 text-[13px] font-black uppercase tracking-wider text-[#1A1A2E] focus:outline-none focus:border-[#7C5CFC] cursor-pointer shadow-sm appearance-none min-w-[200px]"
          >
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === "Tous" ? "Statuts: Tous" : s}</option>)}
          </select>
          <button className="p-4 bg-white/40 backdrop-blur-md border border-white/80 rounded-2xl text-slate-400 hover:text-[#7C5CFC] transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex items-center justify-center">
              <EmptyState 
                illustration={<EmptyContacts />}
                title="Silence radio..."
                subtitle="Aucun contact ne correspond à vos critères de recherche."
                actionLabel="Créer un contact"
                onAction={() => setIsModalOpen(true)}
              />
            </motion.div>
          ) : view === "table" ? (
            <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-auto pr-2 custom-scrollbar">
              <table className="w-full text-left border-separate border-spacing-y-4">
                <thead className="sticky top-0 bg-transparent z-10">
                  <tr className="text-[#9CA3AF] text-[10px] font-black uppercase tracking-[0.2em] px-8">
                    <th className="pb-4 pl-10">Contact</th>
                    <th className="pb-4 px-6">Identité Pro</th>
                    <th className="pb-4 px-6">Entreprise</th>
                    <th className="pb-4 px-6">Localisation</th>
                    <th className="pb-4 px-6">Interaction</th>
                    <th className="pb-4 px-6 text-center">Statut</th>
                    <th className="pb-4 pr-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c, i) => (
                    <motion.tr
                      key={c.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="group cursor-pointer"
                    >
                      <td className="py-6 pl-10 bg-white/40 group-hover:bg-white/80 transition-all rounded-l-[28px] border-y border-l border-white/50">
                        <Link href={`/contacts/${c.id}`} className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-[#7C5CFC] to-[#A78BFA] flex items-center justify-center text-[12px] font-black text-white shadow-lg group-hover:scale-110 transition-transform">
                            {getInitials(c.firstName, c.lastName)}
                          </div>
                          <div>
                            <p className="font-black text-[#1A1A2E] text-[15px] tracking-tight group-hover:text-[#7C5CFC] transition-colors">{c.firstName} {c.lastName}</p>
                            <p className="text-[11px] font-bold text-slate-400 mt-0.5">{c.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50">
                        <span className="text-[13px] font-black text-slate-600 block">{c.jobTitle}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{c.source}</span>
                      </td>
                      <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50">
                        <span className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border", getCompanyBadge(c.companyType))}>
                          {c.companyName}
                        </span>
                      </td>
                      <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50">
                        <div className="flex items-center gap-2">
                           <span className="text-lg">{c.flag}</span>
                           <span className="text-[13px] font-bold text-slate-500">{c.city}</span>
                        </div>
                      </td>
                      <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50">
                        <div className="flex flex-col gap-1">
                           <span className="text-[12px] font-black text-slate-600">il y a {relativeDate(c.lastInteractionDate)}</span>
                           <span className="text-[9px] font-black text-[#7C5CFC] uppercase tracking-tighter flex items-center gap-1">
                              <Activity className="w-3 h-3" /> Digital Touchpoint
                           </span>
                        </div>
                      </td>
                      <td className="py-6 px-6 bg-white/40 group-hover:bg-white/80 transition-all border-y border-white/50 text-center">
                        <span className={cn("px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border", getStatusStyles(c.status))}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-6 pr-10 bg-white/40 group-hover:bg-white/80 transition-all rounded-r-[28px] border-y border-r border-white/50">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button onClick={(e) => { e.preventDefault(); toast.info("Email..."); }} className="w-10 h-10 rounded-xl bg-white shadow-md border hover:border-[#7C5CFC] hover:text-[#7C5CFC] transition-all flex items-center justify-center text-slate-400">
                             <Mail className="w-4 h-4" />
                          </button>
                          <button onClick={(e) => { e.preventDefault(); toast.info("Profil..."); }} className="w-10 h-10 rounded-xl bg-white shadow-md border hover:border-[#7C5CFC] hover:text-[#7C5CFC] transition-all flex items-center justify-center text-slate-400">
                             <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          ) : (
            <motion.div key="cards" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
                {filtered.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-8 rounded-[32px] border-none group cursor-pointer hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7C5CFC]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="flex justify-between items-start mb-8 relative z-10">
                      <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#1A1A2E] to-[#7C5CFC] flex items-center justify-center text-xl font-black text-white shadow-xl group-hover:scale-110 transition-transform">
                        {getInitials(c.firstName, c.lastName)}
                      </div>
                      <span className={cn("px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-sm", getStatusStyles(c.status))}>
                        {c.status}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-xl font-black text-[#1A1A2E] tracking-tight group-hover:text-[#7C5CFC] transition-colors">{c.firstName} {c.lastName}</h3>
                      <p className="text-[13px] font-bold text-slate-400 mt-1 mb-6">{c.jobTitle}</p>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100"><MapPin className="w-3.5 h-3.5 text-slate-400" /></div>
                           <span className="text-[12px] font-bold text-slate-600">{c.city}, {c.country}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100"><Mail className="w-3.5 h-3.5 text-slate-400" /></div>
                           <span className="text-[12px] font-bold text-slate-600 truncate">{c.email}</span>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-black/5 flex items-center justify-between">
                         <span className={cn("px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border", getCompanyBadge(c.companyType))}>
                           {c.companyName}
                         </span>
                         <span className="text-[10px] font-black text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {relativeDate(c.lastInteractionDate)}
                         </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {isModalOpen && <NewContactModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
