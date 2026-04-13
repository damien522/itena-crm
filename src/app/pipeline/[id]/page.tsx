"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { pipelineData, Deal, DealInteraction, DealTask, DealDocument } from "@/data/pipeline";
import { defaultStages } from "@/data/pipelineStages";
import { FicheHeader } from "@/components/pipeline/fiche/FicheHeader";
import { ContextPanel } from "@/components/pipeline/fiche/ContextPanel";
import { FicheBottomBar } from "@/components/pipeline/fiche/FicheBottomBar";
import { ActivityTab } from "@/components/pipeline/fiche/ActivityTab";
import { EmailTab } from "@/components/pipeline/fiche/EmailTab";
import { TaskTab } from "@/components/pipeline/fiche/TaskTab";
import { DocumentTab } from "@/components/pipeline/fiche/DocumentTab";
import { NoteTab } from "@/components/pipeline/fiche/NoteTab";
import { HistoryTab } from "@/components/pipeline/fiche/HistoryTab";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "Activité", label: "Activité" },
  { id: "Emails", label: "Emails" },
  { id: "Tâches", label: "Tâches" },
  { id: "Documents", label: "Documents" },
  { id: "Notes", label: "Notes" },
  { id: "Historique", label: "Historique" },
];

export default function DealFichePage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Activité");
  const [deal, setDeal] = useState<Deal | null>(null);

  useEffect(() => {
    const found = pipelineData.find(d => d.id === id);
    if (found) {
      setDeal(found);
    } else {
      router.push("/pipeline");
    }
  }, [id, router]);

  if (!deal) return null;

  return (
    <div className="fixed inset-0 bg-[#F7F6F3] z-[50] flex flex-col overflow-hidden">
      <FicheHeader deal={deal} setDeal={setDeal} />

      <main className="flex-1 flex overflow-hidden">
        {/* Left Column: Tabbed Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="px-8 border-b border-slate-100 flex items-center gap-8 h-14 bg-white sticky top-0 z-20">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "h-full px-1 text-sm font-black uppercase tracking-widest transition-all border-b-2 relative",
                  activeTab === tab.id ? "text-[#7C5CFC] border-[#7C5CFC]" : "text-slate-400 border-transparent hover:text-slate-600"
                )}
              >
                {tab.label}
                {tab.id === "Emails" && deal.emails.some(e => e.isUnread) && (
                   <span className="absolute top-3 -right-2 w-1.5 h-1.5 bg-rose-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto bg-slate-50/30">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="h-full"
              >
                {activeTab === "Activité" && <ActivityTab deal={deal} setDeal={setDeal} />}
                {activeTab === "Emails" && <EmailTab deal={deal} setDeal={setDeal} />}
                {activeTab === "Tâches" && <TaskTab deal={deal} setDeal={setDeal} />}
                {activeTab === "Documents" && <DocumentTab deal={deal} setDeal={setDeal} />}
                {activeTab === "Notes" && <NoteTab deal={deal} setDeal={setDeal} />}
                {activeTab === "Historique" && <HistoryTab deal={deal} setDeal={setDeal} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Column: Sticky Context Panel */}
        <div className="w-[420px] bg-white border-l border-slate-100 overflow-y-auto">
          <ContextPanel deal={deal} setDeal={setDeal} />
        </div>
      </main>

      <FicheBottomBar deal={deal} setDeal={setDeal} />
    </div>
  );
}
