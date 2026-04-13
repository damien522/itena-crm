"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { distributeurs } from "@/data/distributeurs";
import { prospects } from "@/data/prospects";

const STEPS = ["Identité", "Entreprise", "Source & Assignation", "Confirmation"];
const JOB_TITLES = ["Directeur Général", "Directeur des Achats", "Responsable Commercial", "Responsable Technique", "Acheteur", "Directrice Marketing", "Chef de Produit", "Autre"];
const SOURCES = ["Salon", "LinkedIn", "Recommandation", "Appel entrant", "Autre"];
const COMMERCIALS = [
  { name: "Marie Dupont", avatar: "MD" },
  { name: "Lucas Bernard", avatar: "LB" },
  { name: "Thomas Bernard", avatar: "TB" },
];

interface Props { onClose: () => void; defaultCompanyId?: string; }

export default function NewContactModal({ onClose, defaultCompanyId }: Props) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", jobTitle: "", email: "", phone: "", mobile: "", linkedIn: "",
    companyId: defaultCompanyId || "", language: "Français", timezone: "CET (UTC+1)",
    source: "LinkedIn", assignedTo: "Marie Dupont", firstNote: "",
  });

  const allCompanies = [
    ...distributeurs.map(d => ({ id: d.id, name: d.name, type: "Distributeur", flag: d.flag || "🏢" })),
    ...prospects.map(p => ({ id: p.id, name: p.companyName, type: "Prospect", flag: p.flag })),
  ];

  const field = (key: keyof typeof form, placeholder: string, type = "text", required = false) => (
    <div>
      <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">{placeholder}{required ? " *" : ""}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C5CFC] text-[#1A1A2E] placeholder-[#9CA3AF]"
      />
    </div>
  );

  const canProceed = () => {
    if (step === 0) return form.firstName && form.lastName && form.email;
    return true;
  };

  const handleCreate = (andActivity = false) => {
    toast.success(`Contact ${form.firstName} ${form.lastName} créé avec succès`);
    if (andActivity) toast.info("Ajout d'activité…");
    onClose();
  };

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
            <h2 className="text-lg font-bold text-[#1A1A2E]">Nouveau contact</h2>
            <button onClick={onClose} className="p-2 hover:bg-[#F3F4F6] rounded-full transition-colors text-[#6B7280]"><X className="w-4 h-4" /></button>
          </div>
          {/* Stepper */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 transition-all ${i < step ? "bg-[#10B981] text-white" : i === step ? "bg-[#7C5CFC] text-white" : "bg-[#F3F4F6] text-[#9CA3AF]"}`}>
                  {i < step ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span className={`text-[10px] font-bold truncate ${i === step ? "text-[#7C5CFC]" : "text-[#9CA3AF]"}`}>{s}</span>
                {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < step ? "bg-[#10B981]" : "bg-[#E5E7EB]"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-4">

              {step === 0 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {field("firstName", "Prénom", "text", true)}
                    {field("lastName", "Nom", "text", true)}
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Fonction / Titre</label>
                    <select value={form.jobTitle} onChange={e => setForm(f => ({...f, jobTitle: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C5CFC] text-[#1A1A2E] bg-white">
                      <option value="">Sélectionner un rôle</option>
                      {JOB_TITLES.map(j => <option key={j} value={j}>{j}</option>)}
                    </select>
                  </div>
                  {field("email", "Email", "email", true)}
                  <div className="grid grid-cols-2 gap-4">
                    {field("phone", "Téléphone")}
                    {field("mobile", "Mobile")}
                  </div>
                  {field("linkedIn", "LinkedIn URL")}
                </>
              )}

              {step === 1 && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Entreprise associée</label>
                    <select value={form.companyId} onChange={e => setForm(f => ({...f, companyId: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C5CFC] text-[#1A1A2E] bg-white">
                      <option value="">Rechercher une entreprise…</option>
                      <optgroup label="Distributeurs">
                        {allCompanies.filter(c => c.type === "Distributeur").map(c => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
                      </optgroup>
                      <optgroup label="Prospects">
                        {allCompanies.filter(c => c.type === "Prospect").map(c => <option key={c.id} value={c.id}>{c.flag} {c.name}</option>)}
                      </optgroup>
                    </select>
                    <button onClick={() => toast.info("Créer une nouvelle entreprise")} className="text-[10px] text-[#7C5CFC] font-bold mt-2 hover:underline">
                      + Créer une nouvelle entreprise
                    </button>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Langue préférée</label>
                    <select value={form.language} onChange={e => setForm(f => ({...f, language: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C5CFC] bg-white">
                      {["Français", "Anglais", "Allemand", "Espagnol", "Japonais", "Coréen", "Arabe", "Portugais"].map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Fuseau horaire</label>
                    <select value={form.timezone} onChange={e => setForm(f => ({...f, timezone: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C5CFC] bg-white">
                      {["CET (UTC+1)", "GMT (UTC+0)", "EST (UTC-5)", "JST (UTC+9)", "KST (UTC+9)", "GST (UTC+4)", "AST (UTC+3)", "SGT (UTC+8)"].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Source</label>
                    <select value={form.source} onChange={e => setForm(f => ({...f, source: e.target.value}))} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-2.5 text-sm focus:outline-none focus:border-[#7C5CFC] bg-white">
                      {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Assigné à</label>
                    <div className="mt-2 flex gap-2">
                      {COMMERCIALS.map(c => (
                        <button key={c.name} onClick={() => setForm(f => ({...f, assignedTo: c.name}))} className={`flex items-center gap-2 px-3 py-2 rounded-[10px] border text-sm font-semibold transition-all ${form.assignedTo === c.name ? "border-[#7C5CFC] bg-[#EDE9FE] text-[#7C5CFC]" : "border-[#E5E7EB] text-[#6B7280]"}`}>
                          <div className="w-6 h-6 rounded-full bg-[#7C5CFC] text-white text-[9px] font-black flex items-center justify-center">{c.avatar}</div>
                          {c.name.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#6B7280] uppercase tracking-wide">Première note (optionnel)</label>
                    <textarea value={form.firstNote} onChange={e => setForm(f => ({...f, firstNote: e.target.value}))} placeholder="Contexte sur ce contact…" rows={3} className="mt-1 w-full border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#7C5CFC]" />
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-[#F9FAFB] rounded-[16px] p-5 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center text-white font-black">
                        {(form.firstName[0] || "?")}{ (form.lastName[0] || "")}
                      </div>
                      <div>
                        <p className="font-bold text-[#1A1A2E]">{form.firstName || "—"} {form.lastName || ""}</p>
                        <p className="text-xs text-[#6B7280]">{form.jobTitle || "Fonction non renseignée"}</p>
                      </div>
                    </div>
                    {[
                      { label: "Email", value: form.email },
                      { label: "Téléphone", value: form.phone || "—" },
                      { label: "Entreprise", value: allCompanies.find(c => c.id === form.companyId)?.name || "—" },
                      { label: "Langue", value: form.language },
                      { label: "Source", value: form.source },
                      { label: "Assigné à", value: form.assignedTo },
                    ].map(f => (
                      <div key={f.label} className="flex justify-between text-sm">
                        <span className="text-[#9CA3AF] font-medium">{f.label}</span>
                        <span className="font-semibold text-[#1A1A2E]">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#F3F4F6] flex items-center justify-between gap-3">
          <button onClick={() => step > 0 ? setStep(s => s - 1) : onClose()} className="flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
            <ChevronLeft className="w-4 h-4" /> {step === 0 ? "Annuler" : "Retour"}
          </button>
          <div className="flex gap-2">
            {step === STEPS.length - 1 ? (
              <>
                <button onClick={() => handleCreate(true)} className="bg-[#F3F4F6] text-[#1A1A2E] px-4 py-2.5 rounded-[10px] text-sm font-bold hover:bg-[#E5E7EB] transition-colors">Créer &amp; ajouter une activité</button>
                <button onClick={() => handleCreate(false)} className="bg-[#7C5CFC] text-white px-5 py-2.5 rounded-[10px] text-sm font-bold hover:bg-[#6a4de2] transition-colors">Créer le contact</button>
              </>
            ) : (
              <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="flex items-center gap-1.5 bg-[#7C5CFC] disabled:opacity-40 text-white px-5 py-2.5 rounded-[10px] text-sm font-bold hover:bg-[#6a4de2] transition-colors">
                Suivant <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
