"use client";

import { useState } from "react";
import { distributeurs } from "@/data/distributeurs";
import { Search, Download, AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const NAV_ITEMS = [
  { id: "audit", label: "Audit Trail", icon: Shield },
  { id: "certifications", label: "Certifications", icon: CheckCircle2 },
];

export default function Conformite() {
  const [activeItem, setActiveItem] = useState("audit");
  const [confirmMassNotify, setConfirmMassNotify] = useState(false);

  const generateAuditLogs = () => {
    const users = ['Marie Dupont', 'Lucas Bernard', 'Sophie Martin', 'Thomas Leroy', 'Bobby IA', 'Admin Système'];
    const actions = ['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'EXPORT', 'SYNC', 'APPROVE'];
    const entities = ['Distributeur D-001', 'Commande CMD-1044', 'Réclamation REC-042', 'Opportunité OPP-88', 'Produit LT-2604-X9', 'Utilisateur John Doe', 'Certification ISO-2025'];
    const ips = ['192.168.1.104', '192.168.1.18', '10.0.0.55', 'Internal', '82.112.44.12', '90.23.41.111', 'System'];

    const logs = [];
    const now = new Date("2026-04-12T12:00:00Z").getTime();
    
    // Generate 50 items
    for (let i = 0; i < 50; i++) {
        // Randomize timestamps across the last 14 days
        // Spread evenly by subtracting an increasing random amount
        const timeOffset = Math.floor(Math.random() * 14 * 24 * 60 * 60 * 1000);
        const timestamp = new Date(now - timeOffset).toISOString();
        
        // Randomize using deterministic-like or Math.random
        const user = users[Math.floor(Math.random() * users.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];
        const entity = action === 'LOGIN' ? '-' : entities[Math.floor(Math.random() * entities.length)];
        
        let ip = ips[Math.floor(Math.random() * ips.length)];
        if (user === 'Bobby IA' || user === 'Admin Système') ip = 'Internal';
        
        logs.push({
            id: `TRX-${260000 + i}`,
            timestamp,
            user,
            action,
            entity,
            ip
        });
    }

    // Sort newest first
    return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const logs = generateAuditLogs();

  return (
    <div className="flex bg-white rounded-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#E5E7EB] min-h-[calc(100vh-140px)] overflow-hidden">
      
      {/* Inner Sidebar */}
      <div className="w-[200px] shrink-0 bg-[#F7F6F3] border-r border-[#E5E7EB] py-6 flex flex-col">
        <h2 className="px-6 text-[11px] uppercase tracking-[0.08em] font-bold text-[#9CA3AF] mb-4">Traçabilité</h2>
        <nav className="flex-1 px-4 space-y-1">
           {NAV_ITEMS.map(item => (
             <button
               key={item.id}
               onClick={() => setActiveItem(item.id)}
               className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] text-sm font-semibold transition-colors ${
                 activeItem === item.id ? "bg-[#EDE9FE] text-[#7C5CFC]" : "text-[#6B7280] hover:bg-[#E5E7EB] hover:text-[#1A1A2E]"
               }`}
             >
               <item.icon className={`w-4 h-4 ${activeItem === item.id ? 'text-[#7C5CFC]' : 'text-[#9CA3AF]'}`} />
               {item.label}
             </button>
           ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        
        {activeItem === "audit" && (
          <div className="flex flex-col h-full animate-in fade-in">
            <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-white shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[#1A1A2E]">Audit Trail</h2>
                <p className="text-sm text-[#6B7280]">Traçabilité réglementaire et certifications (Norme ISO 27001)</p>
              </div>
              <div className="flex gap-4">
                <input type="date" onChange={(e) => toast(`Filtre affiné à partir du ${new Date(e.target.value).toLocaleDateString()}`)} className="border border-[#D1D5DB] rounded-[8px] px-3 py-1.5 text-sm outline-none focus:border-[#7C5CFC]" />
                <button onClick={() => toast.success("Export CSV d'audit sécurisé généré")} className="flex items-center gap-2 text-[#6B7280] bg-white border border-[#D1D5DB] hover:bg-[#F9FAFB] px-4 py-1.5 rounded-[8px] text-sm font-semibold transition-colors">
                  <Download className="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-white p-6">
              <div className="border border-[#E5E7EB] rounded-[12px] overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <tr className="text-[#9CA3AF] uppercase tracking-wider">
                      <th className="py-2.5 px-4 font-bold">Timestamp</th>
                      <th className="py-2.5 px-4 font-bold">Utilisateur</th>
                      <th className="py-2.5 px-4 font-bold text-center">Action</th>
                      <th className="py-2.5 px-4 font-bold">Entité Concernée</th>
                      <th className="py-2.5 px-4 font-bold text-right">IP / Soruce</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#F9FAFB] transition-colors leading-none h-[36px]">
                        <td className="px-4 font-mono text-[#6B7280]">{new Date(log.timestamp).toISOString().replace('T', ' ').substring(0, 19)}</td>
                        <td className="px-4 font-semibold text-[#1A1A2E]">
                          {log.user === 'Bobby IA' ? <span className="text-[#7C5CFC]">🤖 Bobby IA</span> : log.user}
                        </td>
                        <td className="px-4 text-center">
                          <span className={`inline-block px-1.5 py-0.5 rounded-[4px] text-[10px] font-bold ${
                            ['CREATE', 'APPROVE', 'LOGIN'].includes(log.action) ? 'bg-[#BBF7D0] text-[#166534]' : 
                            ['UPDATE', 'SYNC', 'EXPORT'].includes(log.action) ? 'bg-[#BAE6FD] text-[#0369A1]' : 'bg-[#FECACA] text-[#991B1B]'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-4 font-medium text-[#1A1A2E]">{log.entity}</td>
                        <td className="px-4 text-right font-mono text-[#6B7280]">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeItem === "certifications" && (
          <div className="flex flex-col h-full animate-in fade-in">
            <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-white shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[#1A1A2E]">Certifications Distributeurs</h2>
                <p className="text-sm text-[#6B7280]">Suivi global de la conformité médicale</p>
              </div>
              <button onClick={() => setConfirmMassNotify(true)} className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-2 rounded-[12px] text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                <AlertTriangle className="w-4 h-4" />
                Notifier tous les distributeurs à risque
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 space-y-4">
              {distributeurs.map(d => {
                const isExpired = d.certification.daysRemaining < 0;
                const isWarning = d.certification.daysRemaining >= 0 && d.certification.daysRemaining <= 30;
                return (
                  <div key={d.id} className="flex items-center justify-between p-4 border border-[#E5E7EB] rounded-[12px] bg-white hover:border-[#C4B5F4] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-xl flex items-center justify-center">{d.flag}</div>
                      <div>
                        <h4 className="font-bold text-[#1A1A2E] group-hover:text-[#7C5CFC] transition-colors">{d.name}</h4>
                        <p className="text-xs text-[#6B7280]">Expire le {new Date(d.certification.expiryDate).toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {isExpired ? (
                        <span className="bg-[#FECACA] text-[#991B1B] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Expiré depuis {Math.abs(d.certification.daysRemaining)} jours</span>
                      ) : isWarning ? (
                        <span className="bg-[#FDE68A] text-[#854D0E] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Expire dans {d.certification.daysRemaining} jours</span>
                      ) : (
                        <span className="bg-[#BBF7D0] text-[#166534] px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">{d.certification.daysRemaining} jours restants</span>
                      )}
                      <button onClick={() => toast.success(`Formulaire de renouvellement envoyé à ${d.name}`)} className="text-sm font-semibold text-[#7C5CFC] hover:underline whitespace-nowrap">Renouveler</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
      
      <ConfirmDialog 
         isOpen={confirmMassNotify}
         title="Notification globale de conformité"
         description="Tous les distributeurs dont la certification ISO est expirée ou expire dans moins de 30 jours vont recevoir une relance officielle avec exigence de mise à jour documentaire."
         confirmText="Envoyer 18 notifications"
         onConfirm={() => { toast.success("Processus de relance réglementaire initié"); setConfirmMassNotify(false); }}
         onCancel={() => setConfirmMassNotify(false)}
         isDestructive
      />
    </div>
  );
}
