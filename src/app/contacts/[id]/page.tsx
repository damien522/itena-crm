"use client";

import { useState } from "react";
import { contacts } from "@/data/contacts";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Phone, Mail, ArrowLeft, CheckSquare, Clock, 
  MessagesSquare, FileText, StickyNote, ChevronRight,
  Plus, Calendar, Edit2, ExternalLink,
  PhoneCall, Building2, BarChart3, CheckCircle2, Paperclip
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "activite" | "opportunites" | "taches" | "emails" | "notes";

function getInitials(first: string, last: string) {
  return `${first[0]}${last[0]}`.toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }) + " à " + d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function getInteractionIcon(type: string) {
  switch (type) {
    case "Appel": return <PhoneCall className="w-4 h-4" />;
    case "Email": return <Mail className="w-4 h-4" />;
    case "Réunion": return <Calendar className="w-4 h-4" />;
    case "Note": return <StickyNote className="w-4 h-4" />;
    case "Tâche": return <CheckSquare className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
}

function getInteractionColor(type: string) {
  switch (type) {
    case "Appel": return "bg-[#EDE9FE] text-[#7C5CFC]";
    case "Email": return "bg-[#E0F2FE] text-[#0284C7]";
    case "Réunion": return "bg-[#D1FAE5] text-[#059669]";
    case "Note": return "bg-[#FEF3C7] text-[#D97706]";
    case "Tâche": return "bg-[#FCE7F3] text-[#DB2777]";
    default: return "bg-[#F3F4F6] text-[#6B7280]";
  }
}

export default function ContactFichePage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("activite");
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<{id: string, content: string, author: string, date: string}[]>([]);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [activityType, setActivityType] = useState("Appel");
  const [activityDesc, setActivityDesc] = useState("");

  const contact = contacts.find(c => c.id === params.id);

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-[#6B7280]">Contact introuvable.</p>
        <Link href="/contacts" className="text-[#7C5CFC] font-semibold hover:underline flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Retour aux contacts
        </Link>
      </div>
    );
  }

  const TABS = [
    { id: "activite", label: "Activité", icon: Clock },
    { id: "opportunites", label: "Opportunités", icon: BarChart3 },
    { id: "taches", label: "Tâches", icon: CheckSquare },
    { id: "emails", label: "Emails", icon: MessagesSquare },
    { id: "notes", label: "Notes", icon: StickyNote },
  ] as const;

  const mockTasks = [
    { id: "T1", done: false, desc: `Rappeler ${contact.firstName} suite à la démo`, due: "2026-04-18", priority: "red" },
    { id: "T2", done: true, desc: "Envoyer catalogue produits 2026", due: "2026-04-08", priority: "green" },
  ];

  const mockEmails = [
    { id: "E1", subject: "Re: Proposition commerciale Itena Clinical", preview: "Merci pour l'envoi. Je vais étudier cela avec mon équipe...", date: "il y a 3j" },
    { id: "E2", subject: "Invitation démo produit 22 avril", preview: "Veuillez trouver ci-joint le lien d'accès pour notre démo...", date: "il y a 5j" },
  ];

  const [localInteractions, setLocalInteractions] = useState(contact.interactions);

  const handleAddActivity = () => {
    if (!activityDesc) return;
    const newItem = {
      id: `new-${Date.now()}`,
      type: activityType as any,
      date: new Date().toISOString(),
      description: activityDesc,
      loggedBy: "Marie Dupont",
    };
    setLocalInteractions(prev => [newItem, ...prev]);
    setActivityDesc("");
    setShowAddActivity(false);
    toast.success("Activité enregistrée");
  };

  const handleAddNote = () => {
    if (!newNote) return;
    setNotes(prev => [{ id: `note-${Date.now()}`, content: newNote, author: "Marie Dupont", date: new Date().toISOString() }, ...prev]);
    setNewNote("");
    toast.success("Note ajoutée");
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Back */}
      <Link href="/contacts" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#7C5CFC] transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Contacts
      </Link>

      {/* Header */}
      <div className="bg-white rounded-[20px] p-6 border border-[#E5E7EB] shadow-sm flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center text-xl font-black text-white shrink-0 shadow-lg">
          {getInitials(contact.firstName, contact.lastName)}
        </div>

        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-[#1A1A2E]">{contact.firstName} {contact.lastName}</h1>
          <p className="text-[#6B7280] font-medium text-sm mt-0.5">{contact.jobTitle}</p>
          <div className="flex items-center gap-3 mt-2">
            <Link href={contact.companyType === "distributeur" ? "/distributeurs" : "/prospects"} className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${contact.companyType === "distributeur" ? "bg-[#EDE9FE] text-[#7C5CFC]" : "bg-[#FFFBEB] text-[#92400E]"}`}>
              {contact.companyName} — {contact.companyType === "distributeur" ? "Distributeur" : "Prospect"}
            </Link>
            <span className="text-sm text-[#9CA3AF]">{contact.flag} {contact.city}, {contact.country}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={() => toast.info(`Appel en cours vers ${contact.phone}`)} className="flex items-center gap-2 bg-[#7C5CFC] text-white px-4 py-2 rounded-[10px] text-sm font-semibold hover:bg-[#6a4de2] transition-colors">
            <Phone className="w-4 h-4" /> Appeler
          </button>
          <a href={`mailto:${contact.email}`} className="flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#1A1A2E] px-4 py-2 rounded-[10px] text-sm font-semibold hover:border-[#7C5CFC] transition-colors">
            <Mail className="w-4 h-4" /> Email
          </a>
          <button onClick={() => toast.info("Nouvelle tâche créée")} className="flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#1A1A2E] px-4 py-2 rounded-[10px] text-sm font-semibold hover:border-[#7C5CFC] transition-colors">
            <CheckSquare className="w-4 h-4" /> Tâche
          </button>
          <button onClick={() => toast.info("Modification de la fiche")} className="flex items-center gap-2 bg-white border border-[#E5E7EB] text-[#6B7280] px-4 py-2 rounded-[10px] text-sm font-semibold hover:border-[#7C5CFC] transition-colors">
            <Edit2 className="w-4 h-4" /> Modifier
          </button>
        </div>
      </div>

      {/* Body: 65 / 35 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Tabs (65%) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex border-b border-[#E5E7EB] gap-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-semibold border-b-2 transition-all -mb-px ${activeTab === tab.id ? "border-[#7C5CFC] text-[#7C5CFC]" : "border-transparent text-[#6B7280] hover:text-[#1A1A2E]"}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Activité Tab */}
          {activeTab === "activite" && (
            <div className="space-y-4">
              <button onClick={() => setShowAddActivity(!showAddActivity)} className="flex items-center gap-2 bg-[#7C5CFC] text-white px-4 py-2 rounded-[10px] text-sm font-semibold hover:bg-[#6a4de2] transition-colors">
                <Plus className="w-4 h-4" /> Ajouter une activité
              </button>

              <AnimatePresence>
                {showAddActivity && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] p-5 space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {["Appel", "Email", "Réunion", "Note"].map(type => (
                        <button key={type} onClick={() => setActivityType(type)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${activityType === type ? "bg-[#7C5CFC] text-white" : "bg-white border border-[#E5E7EB] text-[#6B7280]"}`}>
                          {type}
                        </button>
                      ))}
                    </div>
                    <textarea
                      value={activityDesc}
                      onChange={e => setActivityDesc(e.target.value)}
                      placeholder={`Description de l'${activityType.toLowerCase()}…`}
                      rows={3}
                      className="w-full border border-[#E5E7EB] rounded-[12px] px-4 py-3 text-sm resize-none focus:outline-none focus:border-[#7C5CFC]"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleAddActivity} className="bg-[#7C5CFC] text-white px-4 py-2 rounded-[10px] text-sm font-semibold hover:bg-[#6a4de2]">Enregistrer</button>
                      <button onClick={() => setShowAddActivity(false)} className="text-[#6B7280] px-4 py-2 text-sm font-medium hover:text-[#1A1A2E]">Annuler</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                {localInteractions.map((item, i) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${getInteractionColor(item.type)}`}>
                      {getInteractionIcon(item.type)}
                    </div>
                    <div className="flex-1 bg-white border border-[#E5E7EB] rounded-[14px] p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${getInteractionColor(item.type)}`}>{item.type}</span>
                        <span className="text-[10px] text-[#9CA3AF]">{formatDateTime(item.date)}</span>
                      </div>
                      <p className="text-sm text-[#1A1A2E] leading-relaxed">{item.description}</p>
                      {'duration' in item && (item as any).duration && (
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-[#9CA3AF]">
                          <Clock className="w-3 h-3" /> {(item as any).duration} min
                        </div>
                      )}
                      <p className="text-[10px] text-[#9CA3AF] mt-2">Par {item.loggedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Opportunités Tab */}
          {activeTab === "opportunites" && (
            <div className="space-y-3">
              {contact.linkedOpportunities.length === 0 ? (
                <div className="text-center py-12 text-[#9CA3AF]">
                  <BarChart3 className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">Aucune opportunité liée</p>
                  <button onClick={() => toast.info("Créer une opportunité")} className="mt-4 text-[#7C5CFC] text-sm font-bold hover:underline">Créer une opportunité</button>
                </div>
              ) : (
                contact.linkedOpportunities.map(oppId => (
                  <div key={oppId} className="bg-white border border-[#E5E7EB] rounded-[14px] p-4 flex items-center justify-between hover:border-[#7C5CFC] transition-colors">
                    <div>
                      <p className="font-semibold text-[#1A1A2E] text-sm">{oppId}</p>
                      <p className="text-xs text-[#6B7280] mt-0.5">En Négociation</p>
                    </div>
                    <Link href="/pipeline" className="text-[#7C5CFC] p-2 hover:bg-[#EDE9FE] rounded-lg transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tâches Tab */}
          {activeTab === "taches" && (
            <div className="space-y-3">
              <button onClick={() => toast.info("Nouvelle tâche créée")} className="flex items-center gap-2 text-sm font-bold text-[#7C5CFC] hover:underline">
                <Plus className="w-4 h-4" /> Nouvelle tâche
              </button>
              {mockTasks.map(task => (
                <div key={task.id} className={`flex items-start gap-3 p-4 bg-white border border-[#E5E7EB] rounded-[14px] ${task.done ? "opacity-50" : ""}`}>
                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 cursor-pointer ${task.done ? "bg-[#7C5CFC] border-[#7C5CFC]" : "border-[#D1D5DB]"}`}>
                    {task.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${task.done ? "line-through text-[#9CA3AF]" : "text-[#1A1A2E]"}`}>{task.desc}</p>
                    <p className="text-xs text-[#9CA3AF] mt-1">{task.due}</p>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${task.priority === "red" ? "bg-[#EF4444]" : "bg-[#10B981]"}`} />
                </div>
              ))}
            </div>
          )}

          {/* Emails Tab */}
          {activeTab === "emails" && (
            <div className="space-y-3">
              {mockEmails.map(email => (
                <div key={email.id} className="bg-white border border-[#E5E7EB] rounded-[14px] p-4 hover:shadow-sm transition-shadow cursor-pointer hover:border-[#7C5CFC]">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-semibold text-sm text-[#1A1A2E]">{email.subject}</p>
                    <span className="text-[10px] text-[#9CA3AF] whitespace-nowrap ml-4">{email.date}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] line-clamp-1">{email.preview}</p>
                </div>
              ))}
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              {[...(contact.notes || []), ...notes].map(note => (
                <div key={note.id} className="bg-white border border-[#E5E7EB] rounded-[14px] p-4">
                  <p className="text-sm text-[#1A1A2E] leading-relaxed">{note.content}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="w-5 h-5 rounded-full bg-[#EDE9FE] text-[#7C5CFC] text-[8px] font-black flex items-center justify-center">{note.author.charAt(0)}</div>
                    <span className="text-[10px] text-[#9CA3AF]">{note.author} · {formatDate(note.date)}</span>
                  </div>
                </div>
              ))}
              <div className="bg-white border border-[#E5E7EB] rounded-[14px] p-4">
                <textarea
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  placeholder="Ajouter une note…"
                  rows={3}
                  className="w-full text-sm resize-none focus:outline-none text-[#1A1A2E] placeholder-[#9CA3AF]"
                />
                <div className="flex justify-end mt-2">
                  <button onClick={handleAddNote} disabled={!newNote} className="bg-[#7C5CFC] disabled:opacity-40 text-white px-4 py-1.5 rounded-[8px] text-xs font-bold">Enregistrer</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Info Card (35%) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm p-5 sticky top-4 space-y-4">
            <h3 className="font-bold text-sm text-[#1A1A2E]">Informations</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: "Prénom", value: contact.firstName },
                { label: "Nom", value: contact.lastName },
                { label: "Fonction", value: contact.jobTitle },
                { label: "Téléphone", value: contact.phone },
                { label: "Mobile", value: contact.mobile || "—" },
                { label: "Langue", value: contact.language },
                { label: "Fuseau", value: contact.timezone },
                { label: "Source", value: contact.source },
                { label: "Assigné à", value: contact.assignedTo },
              ].map(field => (
                <div key={field.label} className="flex items-start justify-between gap-4">
                  <span className="text-[#9CA3AF] text-xs font-medium shrink-0 w-24">{field.label}</span>
                  <span className="text-[#1A1A2E] text-xs font-semibold text-right">{field.value}</span>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4">
                <span className="text-[#9CA3AF] text-xs font-medium shrink-0 w-24">Email</span>
                <a href={`mailto:${contact.email}`} className="text-[#7C5CFC] text-xs font-semibold hover:underline text-right">{contact.email}</a>
              </div>
              {contact.linkedIn && (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-[#9CA3AF] text-xs font-medium shrink-0 w-24">LinkedIn</span>
                  <a href={`https://${contact.linkedIn}`} target="_blank" rel="noopener noreferrer" className="text-[#7C5CFC] text-xs font-semibold hover:underline flex items-center gap-1">
                    Voir <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Company Card */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <h3 className="font-bold text-sm text-[#1A1A2E] mb-3">Entreprise associée</h3>
              <div className="bg-[#F9FAFB] rounded-[12px] p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#EDE9FE] flex items-center justify-center text-lg">{contact.flag}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1A1A2E] text-sm truncate">{contact.companyName}</p>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${contact.companyType === "distributeur" ? "bg-[#EDE9FE] text-[#7C5CFC]" : "bg-[#FFFBEB] text-[#92400E]"}`}>
                    {contact.companyType === "distributeur" ? "DISTRIBUTEUR" : "PROSPECT"}
                  </span>
                </div>
                <Link href={contact.companyType === "distributeur" ? "/distributeurs" : "/prospects"} className="text-[#7C5CFC] hover:bg-[#EDE9FE] p-1.5 rounded-lg transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-[#E5E7EB]">
              <h3 className="font-bold text-sm text-[#1A1A2E] mb-3">Historique en chiffres</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-[#F9FAFB] rounded-[10px]">
                  <div className="text-xl font-black text-[#7C5CFC]">{contact.interactions.length}</div>
                  <div className="text-[9px] text-[#9CA3AF] font-medium leading-tight">Interactions</div>
                </div>
                <div className="text-center p-2 bg-[#F9FAFB] rounded-[10px]">
                  <div className="text-xl font-black text-[#7C5CFC]">{contact.linkedOpportunities.length}</div>
                  <div className="text-[9px] text-[#9CA3AF] font-medium leading-tight">Opportunités</div>
                </div>
                <div className="text-center p-2 bg-[#F9FAFB] rounded-[10px]">
                  <div className="text-xl font-black text-[#10B981]">—</div>
                  <div className="text-[9px] text-[#9CA3AF] font-medium leading-tight">Pipeline</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
