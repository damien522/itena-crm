"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";

const STEPS = ["Entreprise", "Prospection", "Premier contact", "Première note"];
const SECTORS = ["Dentaire", "Médical général", "Chirurgical", "Laboratoire", "Autre"];
const SIZES = ["1-10", "11-50", "51-200", "200-500", "500+"];
const COUNTRIES = [
  { flag: "🇩🇪", name: "Allemagne" }, { flag: "🇰🇷", name: "Corée du Sud" }, { flag: "🇨🇦", name: "Canada" },
  { flag: "🇳🇱", name: "Pays-Bas" }, { flag: "🇸🇦", name: "Arabie Saoudite" }, { flag: "🇵🇱", name: "Pologne" },
  { flag: "🇲🇽", name: "Mexique" }, { flag: "🇸🇬", name: "Singapour" }, { flag: "🇫🇷", name: "France" },
  { flag: "🇬🇧", name: "Royaume-Uni" }, { flag: "🇧🇷", name: "Brésil" }, { flag: "🇯🇵", name: "Japon" },
  { flag: "🇦🇪", name: "Émirats Arabes Unis" }, { flag: "🇺🇸", name: "États-Unis" }, { flag: "🇪🇸", name: "Espagne" },
];
const SOURCES = ["Salon professionnel", "Recommandation", "LinkedIn", "Inbound", "Événement", "Base de données"];
const PRODUCTS = ["Protéger", "Préserver", "Remplacer", "Prendre Soin"];
const STAGES = ["Identifié", "Contacté"];
const POTENTIEL = ["Fort", "Moyen", "Faible"];
const COMMERCIALS = [
  { name: "Marie Dupont", avatar: "MD" },
  { name: "Lucas Bernard", avatar: "LB" },
  { name: "Thomas Bernard", avatar: "TB" },
];

interface Props { onClose: () => void; }

export default function NewProspectModal({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    companyName: "", website: "", sector: "Dentaire", size: "51-200",
    country: "France", city: "", estimatedRevenue: "",
    source: "LinkedIn", assignedTo: "Marie Dupont", initialStage: "Identifié",
    potentiel: "Moyen", productsOfInterest: [] as string[],
    // Contact optionnel (step 2)
    contactFirstName: "", contactLastName: "", contactJobTitle: "", contactEmail: "",
    firstNote: "", firstAction: "", followUpDate: "",
  });

  const toggleProduct = (prod: string) => {
    setForm(f => ({
      ...f,
      productsOfInterest: f.productsOfInterest.includes(prod)
        ? f.productsOfInterest.filter(p => p !== prod)
        : [...f.productsOfInterest, prod],
    }));
  };

  const canProceed = () => {
    if (step === 0) return form.companyName && form.country;
    return true;
  };

  const selectedCountry = COUNTRIES.find(c => c.name === form.country);

  return (
    <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#F3F4F6]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1A1A2E]">Nouveau prospect</h2>
            <button onClick={onClose} className="p-2 hover:bg-[#F3F4F6] rounded-full transition-colors text-[#6B7280]"><X className="w-4 h-4" /></button>
          </div>
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-all ${i < step ? "bg-[#10B981] text-white" : i === step ? "bg-[#F59E0B] text-white" : "bg-[#F3F4F6] text-[#9CA3AF]"}`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold truncate ${i === step ? "text-[#F59E0B]" : "text-[#9CA3AF]"}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[#10B981]" : "bg-[#E5E7EB]"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">

              {/* Step 0: Entreprise */}
              {step === 0 && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Raison sociale *</label>
                    <input value={form.companyName} onChange={e => setForm(f => ({...f, companyName: e.target.value}))} placeholder="Nom de l'entreprise" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Site web</label>
                    <input value={form.website} onChange={e => setForm(f => ({...f, website: e.target.value}))} placeholder="www.exemple.com" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Secteur</label>
                      <select value={form.sector} onChange={e => setForm(f => ({...f, sector: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] bg-white">
                        {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Taille</label>
                      <select value={form.size} onChange={e => setForm(f => ({...f, size: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] bg-white">
                        {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Pays *</label>
                      <select value={form.country} onChange={e => setForm(f => ({...f, country: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] bg-white">
                        {COUNTRIES.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Ville</label>
                      <input value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} placeholder="Ville" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">CA estimé (€)</label>
                    <input type="number" value={form.estimatedRevenue} onChange={e => setForm(f => ({...f, estimatedRevenue: e.target.value}))} placeholder="ex: 150000" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                  </div>
                </>
              )}

              {/* Step 1: Prospection */}
              {step === 1 && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Source</label>
                    <select value={form.source} onChange={e => setForm(f => ({...f, source: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] bg-white">
                      {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Assigné à</label>
                    <div className="mt-2 flex gap-2">
                      {COMMERCIALS.map(c => (
                        <button key={c.name} onClick={() => setForm(f => ({...f, assignedTo: c.name}))} className={`flex items-center gap-2 px-3 py-2 rounded-[10px] border text-sm font-semibold transition-all ${form.assignedTo === c.name ? "border-[#F59E0B] bg-[#FFFBEB] text-[#92400E]" : "border-[#E5E7EB] text-[#6B7280]"}`}>
                          <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white text-[9px] font-black flex items-center justify-center">{c.avatar}</div>
                          {c.name.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Étape initiale</label>
                      <select value={form.initialStage} onChange={e => setForm(f => ({...f, initialStage: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] bg-white">
                        {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Potentiel estimé</label>
                      <select value={form.potentiel} onChange={e => setForm(f => ({...f, potentiel: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] bg-white">
                        {POTENTIEL.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-2 block">Gammes d'intérêt</label>
                    <div className="flex flex-wrap gap-2">
                      {PRODUCTS.map(prod => (
                        <button key={prod} onClick={() => toggleProduct(prod)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${form.productsOfInterest.includes(prod) ? "bg-[#7C5CFC] text-white border-[#7C5CFC]" : "bg-white border-[#E5E7EB] text-[#6B7280]"}`}>
                          {prod}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2: Premier contact (optionnel) */}
              {step === 2 && (
                <>
                  <p className="text-sm text-[#6B7280] bg-[#F9FAFB] rounded-[12px] p-3 font-medium">
                    Optionnel — Renseignez le premier interlocuteur chez cette entreprise. Vous pouvez aussi passer cette étape.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Prénom</label>
                      <input value={form.contactFirstName} onChange={e => setForm(f => ({...f, contactFirstName: e.target.value}))} placeholder="Prénom" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Nom</label>
                      <input value={form.contactLastName} onChange={e => setForm(f => ({...f, contactLastName: e.target.value}))} placeholder="Nom" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Fonction</label>
                    <input value={form.contactJobTitle} onChange={e => setForm(f => ({...f, contactJobTitle: e.target.value}))} placeholder="ex: Directeur des Achats" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Email</label>
                    <input type="email" value={form.contactEmail} onChange={e => setForm(f => ({...f, contactEmail: e.target.value}))} placeholder="email@entreprise.com" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                  </div>
                </>
              )}

              {/* Step 3: First note */}
              {step === 3 && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Note de contexte</label>
                    <textarea value={form.firstNote} onChange={e => setForm(f => ({...f, firstNote: e.target.value}))} placeholder="Pourquoi ce prospect est intéressant, contexte de la rencontre, points clés…" rows={4} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#F59E0B]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Première action à faire</label>
                    <input value={form.firstAction} onChange={e => setForm(f => ({...f, firstAction: e.target.value}))} placeholder="ex: Envoyer le catalogue produits" className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] text-[#1A1A2E] placeholder-[#9CA3AF]" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Date de suivi planifié</label>
                    <input type="date" value={form.followUpDate} onChange={e => setForm(f => ({...f, followUpDate: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#F59E0B] bg-white text-[#1A1A2E]" />
                  </div>
                  {/* Récap */}
                  <div className="bg-[#FFFBEB] rounded-[14px] p-4 border border-[#FDE68A]">
                    <p className="text-xs font-bold text-[#92400E] mb-2 uppercase tracking-wide">Récapitulatif</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center text-white font-black text-xs">
                        {form.companyName.slice(0, 2).toUpperCase() || "??"}
                      </div>
                      <div>
                        <p className="font-bold text-[#1A1A2E] text-sm">{form.companyName || "—"}</p>
                        <p className="text-xs text-[#6B7280]">{selectedCountry?.flag} {form.country} · {form.sector} · {form.size} emp.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F3F4F6] flex items-center justify-between gap-3">
          <button onClick={() => step > 0 ? setStep(s => s - 1) : onClose()} className="flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
            <ChevronLeft className="w-4 h-4" /> {step === 0 ? "Annuler" : "Retour"}
          </button>
          {step === STEPS.length - 1 ? (
            <button onClick={() => { toast.success(`Prospect ${form.companyName} créé !`); onClose(); }} disabled={!form.companyName} className="flex items-center gap-1.5 bg-[#F59E0B] disabled:opacity-40 text-white px-5 py-2.5 rounded-[10px] text-sm font-bold hover:bg-[#D97706] transition-colors">
              <Check className="w-4 h-4" /> Créer le prospect
            </button>
          ) : (
            <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="flex items-center gap-1.5 bg-[#F59E0B] disabled:opacity-40 text-white px-5 py-2.5 rounded-[10px] text-sm font-bold hover:bg-[#D97706] transition-colors">
              {step === 2 ? "Passer" : "Suivant"} <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
