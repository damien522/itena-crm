"use client";

import { useState } from "react";
import { distributeurs, Distributor } from "@/data/distributeurs";
import { commandes } from "@/data/commandes";
import { contacts } from "@/data/contacts";
import { Search, Filter, Plus, ChevronLeft, MapPin, Package, Euro, Calendar, CheckCircle2, AlertTriangle, XCircle, ChevronDown, List, MessageSquare, Download, FileText, UserPlus, Send, X, RefreshCw, Users, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import NewContactModal from "@/components/modals/NewContactModal";
import NewProspectModal from "@/components/modals/NewProspectModal";
import { EmptyState } from "@/components/ui/EmptyState";
import { EmptyDistributors } from "@/components/ui/empty-illustrations";

function Badge({ status }: { status: string }) {
  if (status === "Certifié") return <span className="bg-[#BBF7D0] text-[#166534] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#34D399] inline-block" />{status}</span>;
  if (status === "À renouveler") return <span className="bg-[#FDE68A] text-[#854D0E] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#E8C93A] inline-block" />{status}</span>;
  return <span className="bg-[#FECACA] text-[#991B1B] px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#F87171] inline-block" />{status}</span>;
}

function getStripColor(status: string): string {
  if (status === "Certifié") return '#34D399';
  if (status === "À renouveler") return '#E8C93A';
  return '#F87171';
}

function getGlowColor(status: string): string {
  if (status === "Certifié") return 'rgba(52, 211, 153, 0.20)';
  if (status === "À renouveler") return 'rgba(232, 201, 58, 0.20)';
  return 'rgba(248, 113, 113, 0.20)';
}

function getAvatarGradient(status: string): string {
  if (status === "Certifié") return 'linear-gradient(135deg, #7C5CFC, #A78BFA)';
  if (status === "À renouveler") return 'linear-gradient(135deg, #E8C93A, #FDF3C0)';
  return 'linear-gradient(135deg, #F87171, #FECACA)';
}

export default function Distributeurs() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedDist, setSelectedDist] = useState<Distributor | null>(null);
  const [activeTab, setActiveTab] = useState("Profil");
  const [showNewModal, setShowNewModal] = useState(false);
  const [showNewContactModal, setShowNewContactModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const filtered = distributeurs.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || d.country.toLowerCase().includes(search.toLowerCase())
  );

  const formatCurrency = (val: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  const handleCreateDistributor = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowNewModal(false);
      toast.success("Nouveau distributeur créé avec succès !");
    }, 1000);
  };

  const handleAddNote = () => {
    if (!noteContent.trim()) return;
    toast.success("Note ajoutée au dossier !");
    setNoteContent("");
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Search & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Rechercher un distributeur..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-[12px] border border-[#D1D5DB] focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none text-sm text-[#1A1A2E] shadow-sm transition-all"
            />
          </div>
          <div className="flex gap-2 relative">
            <select className="px-4 py-2 bg-white border border-[#D1D5DB] rounded-[12px] text-sm font-medium text-[#1A1A2E] cursor-pointer hover:bg-[#F9FAFB] shadow-sm appearance-none pr-8" onChange={(e) => toast.success(`Filtre région appliqué : ${e.target.value}`)}>
              <option value="Toutes">Région (Toutes)</option>
              <option value="Europe">Europe</option>
              <option value="Asie">Asie</option>
            </select>
            <ChevronDown className="absolute left-[calc(33%-1.5rem)] top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />

            <select className="px-4 py-2 bg-white border border-[#D1D5DB] rounded-[12px] text-sm font-medium text-[#1A1A2E] cursor-pointer hover:bg-[#F9FAFB] shadow-sm appearance-none pr-8" onChange={(e) => toast.success(`Filtre statut appliqué : ${e.target.value}`)}>
              <option value="Tous">Statut (Tous)</option>
              <option value="Actif">Actifs</option>
              <option value="Inactif">Inactifs</option>
            </select>
            <ChevronDown className="absolute left-[calc(66%-1.5rem)] top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />

            <select className="px-4 py-2 bg-white border border-[#D1D5DB] rounded-[12px] text-sm font-medium text-[#1A1A2E] cursor-pointer hover:bg-[#F9FAFB] shadow-sm appearance-none pr-8" onChange={(e) => toast.success(`Filtre certification appliqué : ${e.target.value}`)}>
              <option value="Toutes">Certification</option>
              <option value="Valide">Valide</option>
              <option value="Expirée">Expirée</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
          </div>
        </div>
        <button onClick={() => setShowNewModal(true)} className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-5 py-2.5 rounded-[12px] text-sm font-medium flex items-center gap-2 transition-colors shrink-0 shadow-sm">
          <Plus className="w-4 h-4" />
          Nouveau distributeur
        </button>
      </div>

      {/* Stats Bar */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="bg-white border border-[#E5E7EB] rounded-full px-5 py-2 flex items-center gap-2 shadow-sm text-sm">
          <span className="text-[#6B7280]">Total:</span>
          <span className="font-bold text-[#1A1A2E] tabular-nums">200+</span>
        </div>
        <div className="bg-[#ECFDF5] border border-[#A7F3D0] rounded-full px-5 py-2 flex items-center gap-2 shadow-sm text-sm text-[#065F46]">
          <span className="opacity-80">Actifs:</span>
          <span className="font-bold tabular-nums">187</span>
        </div>
        <div className="bg-[#FEFCE8] border border-[#FEF08A] rounded-full px-5 py-2 flex items-center gap-2 shadow-sm text-sm text-[#854D0E]">
          <span className="opacity-80">À renouveler:</span>
          <span className="font-bold tabular-nums">12</span>
        </div>
        <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-full px-5 py-2 flex items-center gap-2 shadow-sm text-sm text-[#991B1B]">
          <span className="opacity-80">Inactifs 60j+:</span>
          <span className="font-bold tabular-nums">8</span>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <EmptyState 
          illustration={<EmptyDistributors />}
          title="Aucun distributeur trouvé"
          subtitle="Modifiez vos filtres ou lancez une nouvelle recherche pour trouver un partenaire."
          actionLabel="Ajouter un distributeur"
          onAction={() => setShowNewModal(true)}
        />
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(dist => {
            const stripColor = getStripColor(dist.certification.status);
            const glowColor = getGlowColor(dist.certification.status);
            const avatarGradient = getAvatarGradient(dist.certification.status);
            return (
            <div
              key={dist.id}
              className="bg-white rounded-[16px] border border-[#E5E7EB] transition-all group flex flex-col cursor-pointer overflow-hidden relative"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.10), 0 0 20px ${glowColor}`;
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
              onClick={() => setSelectedDist(dist)}
            >
              {/* Colored top strip by certification status */}
              <div className="h-1 w-full shrink-0" style={{ backgroundColor: stripColor }} />

              <div className="p-5 flex flex-col flex-1">
                {/* Header: Avatar + Badge */}
                <div className="flex items-start justify-between mb-4">
                  {/* Gradient avatar with white ring */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-base font-black text-white shrink-0 ring-2 ring-white ring-offset-0 shadow-md"
                    style={{ background: avatarGradient }}
                  >
                    {dist.name.substring(0, 2).toUpperCase()}
                  </div>
                  <Badge status={dist.certification.status} />
                </div>

                {/* Name + Location */}
                <div className="mb-4">
                  <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-1 group-hover:text-[#7C5CFC] transition-colors">{dist.name}</h3>
                  <div className="flex items-center gap-1.5 text-[#6B7280] text-sm font-medium">
                    <span>{dist.flag}</span>
                    <span>{dist.city}, {dist.country}</span>
                  </div>
                </div>

                {/* Micro-stats with bg separation */}
                <div className="grid grid-cols-3 gap-2 mb-4 bg-[#F9FAFB] rounded-lg p-2 border border-[#F3F4F6]">
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-1">CMDS</div>
                    <div className="font-bold text-[#1A1A2E] tabular-nums text-sm">{dist.stats.totalOrders}</div>
                  </div>
                  <div className="text-center border-x border-[#E5E7EB]">
                    <div className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-1">CA</div>
                    <div className="font-bold text-[#1A1A2E] tabular-nums text-sm">{(dist.stats.totalRevenue / 1000).toFixed(0)}k</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-1">SCORE</div>
                    <div className="font-bold text-[#1A1A2E] tabular-nums text-sm">{dist.stats.activityScore}</div>
                  </div>
                </div>

                {/* Activity score bar */}
                <div className="mb-4">
                  <div className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-1.5">Score d'activité</div>
                  <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${dist.stats.activityScore}%`,
                        background: 'linear-gradient(135deg, #7C5CFC, #A78BFA)'
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-3 border-t border-[#F3F4F6] flex gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedDist(dist); setActiveTab('Profil'); }}
                    className="flex-1 py-2 text-sm font-bold text-[#7C5CFC] border border-[#C4B5F4] rounded-[12px] hover:bg-[#F5F3FF] transition-colors shadow-sm"
                  >
                    Voir le profil
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); toast.success(`Action rapide pour ${dist.name}.`); }}
                    className="w-9 h-9 flex shrink-0 items-center justify-center bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] rounded-[12px] hover:text-[#1A1A2E] hover:border-[#D1D5DB] transition-colors shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {/* Drawer */}
      <AnimatePresence>
        {selectedDist && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/40 z-[90] transition-opacity"
              onClick={() => setSelectedDist(null)}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[480px] bg-white shadow-2xl z-[90] flex flex-col"
            >
              <div className="sticky top-0 bg-white border-b border-[#E5E7EB] z-10">
                <div className="flex items-center justify-between p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-[12px] bg-[#EDE9FE] text-[#7C5CFC] flex items-center justify-center text-xl font-bold shrink-0 shadow-sm border border-[#C4B5F4]">
                      {selectedDist.name.substring(0,2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#1A1A2E]">{selectedDist.name}</h2>
                      <div className="text-sm font-medium text-[#6B7280]">{selectedDist.flag} {selectedDist.city}, {selectedDist.country}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedDist(null)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#1A1A2E] transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Tabs */}
                <div className="flex px-4 overflow-x-auto gap-4 scrollbar-hide">
                  {["Profil", "Contacts", "Commandes", "Réclamations", "Documents", "Notes"].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "border-[#7C5CFC] text-[#7C5CFC]" : "border-transparent text-[#6B7280] hover:text-[#1A1A2E]"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "Profil" && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-2 duration-300">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-bold">Informations Générales</h3>
                        <button onClick={() => toast("Modifier les infos", { description: "Ouverture du formulaire d'édition" })} className="text-xs font-bold text-[#7C5CFC] hover:underline">Modifier</button>
                      </div>
                      <div className="grid grid-cols-2 gap-y-4 text-sm bg-[#F9FAFB] p-4 rounded-[16px] border border-[#E5E7EB]">
                        <div>
                          <p className="text-[#6B7280] mb-1">Contact Principal</p>
                          <p className="font-medium text-[#1A1A2E]">{selectedDist.contact.name}</p>
                          <p className="text-[#6B7280]">{selectedDist.contact.email}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] mb-1">Téléphone</p>
                          <p className="font-medium text-[#1A1A2E]">{selectedDist.contact.phone}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] mb-1">Niveau Commercial</p>
                          <p className="font-bold text-[#E8C93A]">{selectedDist.commercialDetails.tier}</p>
                        </div>
                        <div>
                          <p className="text-[#6B7280] mb-1">Remise standard</p>
                          <p className="font-medium text-[#1A1A2E]">{selectedDist.commercialDetails.discount}%</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-4">Certifications</h3>
                      <div className="bg-[#F9FAFB] rounded-[16px] p-4 border border-[#E5E7EB]">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className={`w-5 h-5 ${selectedDist.certification.status === 'Certifié' ? 'text-[#166534]' : 'text-[#CA8A04]'}`} />
                            <div>
                              <p className="font-semibold text-[#1A1A2E]">Certification Médicale ISO Externe</p>
                              <p className="text-sm text-[#6B7280]">Expire le {new Date(selectedDist.certification.expiryDate).toLocaleDateString('fr-FR')}</p>
                            </div>
                          </div>
                          <div>
                            <Badge status={selectedDist.certification.status} />
                          </div>
                        </div>
                        <div className="flex gap-2 border-t border-[#E5E7EB] pt-3">
                          <button onClick={() => toast.success("Demande de renouvellement envoyée au distributeur")} className="text-xs font-bold bg-white border border-[#D1D5DB] hover:bg-[#F9FAFB] px-3 py-1.5 rounded-[8px] transition-colors">Lancer renouvellement</button>
                          <button onClick={() => toast("Document", { description: "Téléchargement du certificat..." })} className="text-xs font-bold text-[#7C5CFC] hover:underline px-3 py-1.5">Voir document</button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-4">Conditions</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                          <span className="text-[#6B7280] text-sm">Conditions de paiement</span>
                          <span className="font-medium text-[#1A1A2E] text-sm">{selectedDist.commercialDetails.paymentTerms}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                          <span className="text-[#6B7280] text-sm">Devise</span>
                          <span className="font-medium text-[#1A1A2E] text-sm">{selectedDist.commercialDetails.currency}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "Contacts" && (
                   <div className="space-y-4 animate-in fade-in">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs font-bold text-[#9CA3AF] uppercase">Contacts chez {selectedDist.name}</p>
                        <button 
                          onClick={() => setShowNewContactModal(true)}
                          className="flex items-center gap-1.5 text-xs font-bold text-[#7C5CFC] hover:underline"
                        >
                          <Plus className="w-3.5 h-3.5" /> Nouveau contact
                        </button>
                      </div>
                      <div className="space-y-3">
                        {contacts.filter(c => c.companyId === selectedDist.id).map(contact => (
                          <Link 
                            key={contact.id} 
                            href={`/contacts/${contact.id}`}
                            className="flex items-center gap-3 p-3 bg-white border border-[#E5E7EB] rounded-[16px] hover:border-[#7C5CFC] transition-colors group"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#EDE9FE] text-[#7C5CFC] flex items-center justify-center font-black text-xs border border-[#C4B5F4]">
                              {contact.firstName[0]}{contact.lastName[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-[#1A1A2E] text-sm group-hover:text-[#7C5CFC] truncate">{contact.firstName} {contact.lastName}</p>
                              <p className="text-xs text-[#6B7280] truncate">{contact.jobTitle}</p>
                            </div>
                            <div className="flex items-center gap-2">
                               <button onClick={(e) => { e.preventDefault(); toast.info(`Appel : ${contact.phone}`); }} className="p-2 hover:bg-[#F5F3FF] rounded-lg text-[#9CA3AF] hover:text-[#7C5CFC]"><Phone className="w-3.5 h-3.5" /></button>
                               <button onClick={(e) => { e.preventDefault(); toast.info(`Email : ${contact.email}`); }} className="p-2 hover:bg-[#F5F3FF] rounded-lg text-[#9CA3AF] hover:text-[#7C5CFC]"><Mail className="w-3.5 h-3.5" /></button>
                            </div>
                          </Link>
                        ))}
                      </div>
                   </div>
                )}
                {activeTab === "Commandes" && (
                   <div className="space-y-4 animate-in fade-in">
                     {commandes.filter(c => c.distributorId === selectedDist.id).length > 0 ? (
                       commandes.filter(c => c.distributorId === selectedDist.id).map(cmd => (
                         <div onClick={() => { setSelectedDist(null); router.push('/commandes'); }} key={cmd.id} className="bg-white border border-[#E5E7EB] p-4 rounded-[12px] shadow-sm flex items-center justify-between hover:border-[#C4B5F4] transition-colors cursor-pointer group">
                           <div>
                             <p className="font-mono text-sm font-semibold text-[#1A1A2E] mb-1 group-hover:text-[#7C5CFC]">{cmd.id}</p>
                             <p className="text-xs text-[#6B7280]">{new Date(cmd.date).toLocaleDateString('fr-FR')} • {formatCurrency(cmd.amount)}</p>
                           </div>
                           <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold ${
                             cmd.status === 'Livrée' ? 'bg-[#BBF7D0] text-[#166534]' : 
                             cmd.status === 'Expédiée' ? 'bg-[#EDE9FE] text-[#6D28D9]' : 'bg-[#FEF08A] text-[#A16207]'
                           }`}>
                             {cmd.status.toUpperCase()}
                           </span>
                         </div>
                       ))
                     ) : (
                       <div className="flex flex-col items-center justify-center p-8 bg-[#F9FAFB] rounded-[16px] border border-dashed border-[#D1D5DB]">
                         <p className="text-center text-[#6B7280] text-sm font-medium">Aucune commande récente</p>
                         <button onClick={() => router.push('/commandes')} className="mt-3 text-sm font-bold text-[#7C5CFC] hover:underline">Créer une commande</button>
                       </div>
                     )}
                   </div>
                )}
                {activeTab === "Notes" && (
                  <div className="flex flex-col h-full animate-in fade-in">
                    <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EDE9FE] text-[#7C5CFC] flex items-center justify-center font-bold text-xs shrink-0 mt-1 border border-[#C4B5F4]">MD</div>
                        <div>
                          <div className="bg-[#F3F4F6] p-4 rounded-[16px] rounded-tl-none border border-[#E5E7EB]">
                            <p className="text-sm text-[#1A1A2E] leading-relaxed">Appel téléphonique concernant les nouveaux composites. Très intéressés par la gamme Protéger.</p>
                          </div>
                          <p className="text-[10px] text-[#9CA3AF] mt-1 ml-2 font-bold uppercase tracking-wider">Il y a 3 jours</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto shrink-0 bg-white pt-2 border-t border-[#F3F4F6]">
                      <div className="relative">
                        <textarea 
                          value={noteContent}
                          onChange={(e) => setNoteContent(e.target.value)}
                          placeholder="Ajouter une note de suivi..." 
                          className="w-full border border-[#D1D5DB] rounded-[16px] p-4 pr-12 shadow-sm text-sm focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none resize-none bg-[#F9FAFB] hover:bg-white transition-colors" 
                          rows={3}
                        />
                        <button 
                          onClick={handleAddNote}
                          className="absolute right-3 bottom-3 text-white bg-[#7C5CFC] p-2 rounded-xl hover:bg-[#6a4de2] transition-colors shadow-sm"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Fallbacks for other tabs */}
                {(activeTab === "Réclamations" || activeTab === "Documents") && (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center opacity-50 animate-in fade-in">
                     <AlertTriangle className="w-12 h-12 text-[#9CA3AF] mb-4" />
                     <p className="text-[#6B7280] font-medium text-sm">Contenu {activeTab.toLowerCase()} en cours de synchronisation avec l'ERP.</p>
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 p-4 border-t border-[#E5E7EB] bg-white flex justify-between gap-3 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <button onClick={() => { setSelectedDist(null); router.push('/commandes'); }} className="flex-1 bg-[#7C5CFC] hover:bg-[#6a4de2] text-white py-2.5 px-4 rounded-[12px] text-sm font-bold transition-colors shadow-sm">
                  Nouvelle commande
                </button>
                <button onClick={() => toast.success("Message envoyé au distributeur via le portail B2B")} className="flex-1 bg-white border border-[#D1D5DB] text-[#1A1A2E] hover:bg-[#F9FAFB] py-2.5 px-4 rounded-[12px] text-sm font-bold transition-colors shadow-sm">
                  Envoyer un message
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* New Modal */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40" onClick={() => setShowNewModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl flex flex-col relative z-10 overflow-hidden">
              <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                <h2 className="text-xl font-bold text-[#1A1A2E]">Enregistrer un distributeur</h2>
                <button onClick={() => setShowNewModal(false)} className="p-2 rounded-full hover:bg-[#E5E7EB]"><X className="w-5 h-5 text-[#9CA3AF]"/></button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                 <div>
                   <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Informations Entreprise</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="col-span-2">
                       <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Raison sociale</label>
                       <input type="text" className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC]" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Pays</label>
                       <select className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC] bg-white"><option>France</option><option>Allemagne</option></select>
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Numéro TVA Intracom.</label>
                       <input type="text" className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC]" />
                     </div>
                   </div>
                 </div>
                 <hr className="border-[#E5E7EB]"/>
                 <div>
                   <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Contact Principal</h3>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Nom complet</label>
                       <input type="text" className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC]" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Fonction</label>
                       <input type="text" className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC]" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Email</label>
                       <input type="email" className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC]" />
                     </div>
                     <div>
                       <label className="block text-xs font-bold text-[#6B7280] uppercase mb-2">Téléphone</label>
                       <input type="tel" className="w-full border border-[#D1D5DB] rounded-[10px] px-3 py-2.5 text-sm outline-none focus:border-[#7C5CFC]" />
                     </div>
                   </div>
                 </div>
              </div>
              <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex justify-end gap-3">
                <button onClick={() => setShowNewModal(false)} className="px-5 py-2.5 rounded-[12px] text-sm font-semibold text-[#6B7280] hover:bg-[#E5E7EB]">Annuler</button>
                <button onClick={handleCreateDistributor} disabled={isSubmitting} className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-6 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center min-w-[140px]">
                  {isSubmitting ? <RefreshCw className="w-4 h-4 animate-spin"/> : "Créer le dossier"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showNewContactModal && <NewContactModal onClose={() => setShowNewContactModal(false)} defaultCompanyId={selectedDist?.id} />}
    </div>
  );
}
