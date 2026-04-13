"use client";

import { useParams } from "next/navigation";
import { produits } from "@/data/produits";
import { Factory, PackageCheck, Truck, Users, MapPin, CheckCircle2, Copy } from "lucide-react";
import Link from "next/link";

export default function Tracabilite() {
  const params = useParams();
  const prodId = params.id as string;
  const prod = produits.find(p => p.id === prodId) || produits[0]; // fallback

  const timeline = [
    { title: "Fabrication", time: "15 Jan 2026 08:30", actor: "Usine FR-4", status: "done", icon: Factory, detail: "Lot validé au contrôle qualité initial" },
    { title: "Entrée CRM", time: "20 Jan 2026 14:15", actor: "Bobby IA", status: "done", icon: PackageCheck, detail: "Synchronisation Cegid PMI effectuée auto" },
    { title: "Affectation distributeur", time: "12 Fév 2026 11:45", actor: "Marie Dupont", status: "done", icon: Users, detail: "Allocation quota spécifique MedicalTech" },
    { title: "Bon de commande", time: "15 Fév 2026 09:12", actor: "Portail Distributeur", status: "done", icon: Copy, detail: "CMD-1019 validée" },
    { title: "Expédition", time: "17 Fév 2026 16:30", actor: "Logistique Centrale", status: "done", icon: Truck, detail: "Tracking DHL 8839210" },
    { title: "Livraison confirmée", time: "19 Fév 2026 10:20", actor: "Distributeur", status: "done", icon: CheckCircle2, detail: "Scan de réception conforme" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      
      <div className="bg-white rounded-[16px] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
        <div className="flex justify-between items-start">
          <div>
            <Link href="/produits" className="text-[#6B7280] text-sm hover:text-[#7C5CFC] hover:underline mb-2 inline-block">&larr; Retour aux produits</Link>
            <h1 className="text-2xl font-bold text-[#1A1A2E] leading-tight mt-2">{prod.name}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="bg-[#EDE9FE] text-[#7C5CFC] font-semibold text-xs px-3 py-1 rounded-full">{prod.family}</span>
              <span className="font-mono text-sm font-semibold text-[#1A1A2E] bg-[#F5F3FF] px-2 py-0.5 rounded">Lot {prod.lotNumber}</span>
            </div>
          </div>
          {prod.stockStatus === 'Disponible' && <span className="bg-[#BBF7D0] text-[#166534] px-4 py-1.5 rounded-full text-xs font-bold uppercase">Disponible</span>}
          {prod.stockStatus === 'Stock faible' && <span className="bg-[#FDE68A] text-[#854D0E] px-4 py-1.5 rounded-full text-xs font-bold uppercase">Stock Faible</span>}
          {prod.stockStatus === 'Rupture' && <span className="bg-[#FECACA] text-[#991B1B] px-4 py-1.5 rounded-full text-xs font-bold uppercase">Rupture</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[16px] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
          <h2 className="text-lg font-bold text-[#1A1A2E] mb-6">Parcours du Lot</h2>
          <div className="relative border-l-2 border-[#EDE9FE] ml-4 md:ml-6 space-y-8 pb-4">
            {timeline.map((step, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-[26px] bg-white p-1 rounded-full border-2 border-[#7C5CFC]">
                  <div className="bg-[#EDE9FE] text-[#7C5CFC] w-8 h-8 rounded-full flex items-center justify-center">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#1A1A2E]">{step.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#6B7280] mt-1 mb-2">
                    <span className="font-medium bg-[#F9FAFB] px-2 py-0.5 rounded">{step.time}</span>
                    <span>•</span>
                    <span>{step.actor}</span>
                  </div>
                  <p className="text-sm text-[#1A1A2E] bg-[#F5F3FF] p-3 rounded-[8px] inline-block">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[16px] p-8 shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#E5E7EB]">
            <h2 className="text-lg font-bold text-[#1A1A2E] mb-6">Distributeurs associés à ce lot</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-[12px] bg-[#F9FAFB]">
                <div className="flex gap-3 items-center">
                   <div className="text-xl">🇫🇷</div>
                   <div>
                     <p className="font-bold text-[#1A1A2E]">MedicalTech Group</p>
                     <p className="text-xs text-[#6B7280]">Reçu 12 000 unités (CMD-1019)</p>
                   </div>
                </div>
                <button className="text-[#7C5CFC] font-semibold text-sm hover:underline">Voir profil</button>
              </div>
              <div className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-[12px] bg-[#F9FAFB]">
                <div className="flex gap-3 items-center">
                   <div className="text-xl">🇩🇪</div>
                   <div>
                     <p className="font-bold text-[#1A1A2E]">Berlin Medizintechnik</p>
                     <p className="text-xs text-[#6B7280]">Reçu 3 400 unités (CMD-1029)</p>
                   </div>
                </div>
                <button className="text-[#7C5CFC] font-semibold text-sm hover:underline">Voir profil</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
