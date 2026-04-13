"use client";

import { useState } from "react";
import { commandes, Order, OrderStatus } from "@/data/commandes";
import { Search, LayoutGrid, List, Clock, Filter, Calendar, MoreVertical, X, Check, Truck, PackageCheck, FileSignature, Download, Trash2, Edit2, Play, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const COLUMNS: OrderStatus[] = ["Devis", "Validée", "En Préparation", "Expédiée", "Livrée"];

export default function Commandes() {
  const [view, setView] = useState<"pipeline" | "liste">("pipeline");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);

  const formatCurrency = (val: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="space-y-6 pb-10 h-[calc(100vh-140px)] flex flex-col" onClick={() => setActiveMenuId(null)}>
      
      {/* Top Actions */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex bg-[#E5E7EB] p-1 rounded-[14px]">
          <button 
            onClick={() => { setView("pipeline"); toast("Vue Pipeline activée"); }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-[10px] text-sm font-semibold transition-all ${view === 'pipeline' ? 'bg-white text-[#1A1A2E] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A2E]'}`}
          >
            <LayoutGrid className="w-4 h-4" />
            Pipeline
          </button>
          <button 
            onClick={() => { setView("liste"); toast("Vue Liste activée"); }}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-[10px] text-sm font-semibold transition-all ${view === 'liste' ? 'bg-white text-[#1A1A2E] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A2E]'}`}
          >
            <List className="w-4 h-4" />
            Liste
          </button>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input 
              type="text" 
              placeholder="Réf. ou distributeur..." 
              className="pl-9 pr-4 py-2.5 rounded-[12px] border border-[#D1D5DB] focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none text-sm w-64 shadow-sm"
              onChange={(e) => {}}
            />
          </div>
          <button onClick={() => toast("Filtres", { description: "Panneau de filtres non branché dans ce mock."})} className="px-4 py-2.5 bg-white border border-[#D1D5DB] rounded-[12px] text-sm font-medium text-[#1A1A2E] flex items-center gap-2 hover:bg-[#F9FAFB] shadow-sm">
            <Filter className="w-4 h-4 text-[#9CA3AF]" />
            Filtres
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          
          {view === "pipeline" ? (
            <motion.div 
              key="pipeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex h-full gap-6 overflow-x-auto pb-4 custom-scrollbar"
            >
              {COLUMNS.map(col => {
                const columnOrders = commandes.filter(c => c.status === col);
                const sum = columnOrders.reduce((acc, c) => acc + c.amount, 0);

                return (
                  <div key={col} className="flex-1 min-w-[320px] max-w-[400px] flex flex-col h-full bg-[#F9FAFB] rounded-[16px] border border-[#E5E7EB] overflow-hidden">
                    {/* Column Header */}
                    <div className="p-4 border-b border-[#E5E7EB] bg-white sticky top-0 flex flex-col gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-[#1A1A2E]">{col}</h3>
                        <span className="bg-[#F3F4F6] text-[#6B7280] text-xs font-bold px-2 py-1 rounded-full">{columnOrders.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#6B7280]">{formatCurrency(sum)}</span>
                      </div>
                    </div>
                    {/* Cards */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {columnOrders.map(cmd => (
                        <div 
                          key={cmd.id} 
                          onClick={() => setSelectedOrder(cmd)}
                          className={`bg-white p-4 rounded-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] cursor-pointer hover:shadow-md hover:border-[#C4B5F4] transition-all border ${cmd.isOverdue ? 'border-l-4 border-[#FECACA] border-y-[#E5E7EB] border-r-[#E5E7EB]' : 'border-[#E5E7EB] border-l-4 border-l-transparent group hover:-translate-y-0.5'}`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-[#6B7280]">{cmd.id}</span>
                            {cmd.isOverdue && <div className="bg-[#FEF2F2] px-2 py-0.5 rounded flex items-center gap-1 border border-[#FECACA]"><Clock className="w-3 h-3 text-[#EF4444]" /><span className="text-[10px] font-bold text-[#991B1B]">En retard</span></div>}
                          </div>
                          <div className="font-bold text-[#1A1A2E] mb-3 text-sm leading-snug">{cmd.flag} {cmd.distributorName}</div>
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {cmd.products.map(p => (
                              <span key={p} className="bg-[#F9FAFB] text-[#4B5563] text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide border border-[#E5E7EB]">{p}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#F3F4F6] text-sm">
                            <span className="text-[#9CA3AF] font-bold text-xs uppercase tracking-wider">{new Date(cmd.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
                            <span className="font-bold text-[#7C5CFC] tabular-nums">{formatCurrency(cmd.amount)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          ) : (
            <motion.div 
              key="liste"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="h-full bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden flex flex-col shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
            >
              <div className="flex-1 overflow-auto relative">
                <table className="w-full text-sm text-left">
                  <thead className="sticky top-0 bg-[#F9FAFB] shadow-[0_1px_0_#E5E7EB] z-10">
                    <tr className="text-[#9CA3AF] text-[11px] uppercase tracking-wider">
                      <th className="py-4 pl-6 pr-4 font-bold">Réf. Commande</th>
                      <th className="py-4 px-4 font-bold">Distributeur</th>
                      <th className="py-4 px-4 font-bold border-r border-[#E5E7EB]">Produits</th>
                      <th className="py-4 px-4 font-bold text-right">Montant HT</th>
                      <th className="py-4 px-4 font-bold text-center">Statut</th>
                      <th className="py-4 px-4 font-bold text-right">Date</th>
                      <th className="py-4 pr-6 pl-4 font-bold text-center w-20">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {commandes.map(cmd => {
                      let badgeClass = "";
                      switch(cmd.status) {
                        case "Devis": badgeClass = "bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]"; break;
                        case "Validée": badgeClass = "bg-[#BAE6FD] text-[#0369A1] border border-[#7DD3FC]"; break;
                        case "En Préparation": badgeClass = "bg-[#FEF08A] text-[#A16207] border border-[#FDE047]"; break;
                        case "Expédiée": badgeClass = "bg-[#EDE9FE] text-[#6D28D9] border border-[#C4B5F4]"; break;
                        case "Livrée": badgeClass = "bg-[#BBF7D0] text-[#15803D] border border-[#86EFAC]"; break;
                      }

                      return (
                        <tr 
                          key={cmd.id} 
                          className="hover:bg-[#F5F3FF] transition-colors group relative"
                        >
                          <td 
                             className="py-4 pl-6 pr-4 font-mono text-xs font-bold text-[#1A1A2E] cursor-pointer"
                             onClick={() => setSelectedOrder(cmd)}
                          >{cmd.id}</td>
                          <td className="py-4 px-4 font-semibold text-[#6B7280]" onClick={() => setSelectedOrder(cmd)}>{cmd.flag} <span className="text-[#1A1A2E]">{cmd.distributorName}</span></td>
                          <td className="py-4 px-4 border-r border-[#E5E7EB]/50" onClick={() => setSelectedOrder(cmd)}>
                            <div className="flex gap-1.5 flex-wrap max-w-[200px]">
                              {cmd.products.map(p => (
                                <span key={p} className="bg-[#F3F4F6] group-hover:bg-white text-[#4B5563] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border border-[#E5E7EB]">{p}</span>
                              ))}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-bold tabular-nums text-[#7C5CFC]" onClick={() => setSelectedOrder(cmd)}>{formatCurrency(cmd.amount)}</td>
                          <td className="py-4 px-4 text-center" onClick={() => setSelectedOrder(cmd)}>
                            <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold tracking-wide whitespace-nowrap ${badgeClass}`}>
                              {cmd.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-[#6B7280] tabular-nums font-medium" onClick={() => setSelectedOrder(cmd)}>
                            {new Date(cmd.date).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="py-4 pr-6 pl-4 text-center relative" onClick={(e) => e.stopPropagation()}>
                            <button 
                              onClick={() => setActiveMenuId(activeMenuId === cmd.id ? null : cmd.id)}
                              className="p-2 rounded-full hover:bg-[#E5E7EB] text-[#9CA3AF] hover:text-[#1A1A2E] transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                              {activeMenuId === cmd.id && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  className="absolute right-10 top-1/2 -translate-y-1/2 w-48 bg-white rounded-xl shadow-xl border border-[#E5E7EB] py-1 z-50 origin-right"
                                >
                                  <button onClick={() => { toast.success(`Statut modifié pour ${cmd.id}`); setActiveMenuId(null); }} className="w-full px-4 py-2 text-left text-sm font-semibold text-[#1A1A2E] hover:bg-[#F3F4F6] flex items-center gap-2">
                                    <Edit2 className="w-4 h-4 text-[#6B7280]"/> Changer statut
                                  </button>
                                  <button onClick={() => { toast.success(`Facture ${cmd.id} téléchargée`); setActiveMenuId(null); }} className="w-full px-4 py-2 text-left text-sm font-semibold text-[#1A1A2E] hover:bg-[#F3F4F6] flex items-center gap-2">
                                    <Download className="w-4 h-4 text-[#6B7280]"/> Facture (PDF)
                                  </button>
                                  <div className="h-px bg-[#E5E7EB] w-full my-1"/>
                                  <button onClick={() => { setConfirmCancel(cmd.id); setActiveMenuId(null); }} className="w-full px-4 py-2 text-left text-sm font-bold text-[#DC2626] hover:bg-[#FEF2F2] flex items-center gap-2">
                                    <Trash2 className="w-4 h-4 text-[#DC2626]"/> Annuler commande
                                  </button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Detail Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
              onClick={() => setSelectedOrder(null)}
            />
            <motion.div 
              initial={{ x: "100%" }} 
              animate={{ x: 0 }} 
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[550px] bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-[#E5E7EB] bg-[#F9FAFB]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#1A1A2E] font-mono">{selectedOrder.id}</h2>
                    <p className="text-[#6B7280] mt-1 font-semibold">{selectedOrder.flag} {selectedOrder.distributorName}</p>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="p-2 rounded-full hover:bg-[#E5E7EB] text-[#9CA3AF]">
                    <X className="w-5 h-5"/>
                  </button>
                </div>
                
                {/* Horizontal Stepper */}
                <div className="mt-8 mb-4 relative">
                  <div className="absolute top-4 left-4 right-4 h-1 bg-[#E5E7EB] -z-10 rounded-full" />
                  
                  {/* Progress Line */}
                  <div 
                    className="absolute top-4 left-4 h-1 bg-[#7C5CFC] -z-10 transition-all duration-700 ease-out rounded-full shadow-[0_0_8px_rgba(124,92,252,0.6)]" 
                    style={{ 
                      width: 
                        selectedOrder.status === 'Devis' ? '0%' :
                        selectedOrder.status === 'Validée' ? '25%' :
                        selectedOrder.status === 'En Préparation' ? '50%' :
                        selectedOrder.status === 'Expédiée' ? '75%' : '100%'
                    }} 
                  />

                  <div className="flex justify-between relative">
                    {[
                      { label: "Création", icon: FileSignature, active: true },
                      { label: "Validation", icon: Check, active: COLUMNS.indexOf(selectedOrder.status) >= 1 },
                      { label: "Préparation", icon: PackageCheck, active: COLUMNS.indexOf(selectedOrder.status) >= 2 },
                      { label: "Expédition", icon: Truck, active: COLUMNS.indexOf(selectedOrder.status) >= 3 },
                      { label: "Livraison", icon: Check, active: COLUMNS.indexOf(selectedOrder.status) >= 4 },
                    ].map((step, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${step.active ? 'bg-white border-[#7C5CFC] text-[#7C5CFC] shadow-md' : 'bg-[#F9FAFB] border-[#E5E7EB] text-[#9CA3AF]'}`}>
                          <step.icon className="w-4 h-4" strokeWidth={3} />
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-wider ${step.active ? 'text-[#1A1A2E]' : 'text-[#9CA3AF]'}`}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-4">Détails financiers</h3>
                  <div className="bg-white rounded-[16px] p-4 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                     <table className="w-full text-sm">
                       <tbody>
                         <tr className="border-b border-[#F3F4F6]">
                           <td className="py-3 text-[#6B7280]">Date de création</td>
                           <td className="py-3 text-right font-bold text-[#1A1A2E] tabular-nums">{new Date(selectedOrder.date).toLocaleDateString('fr-FR')}</td>
                         </tr>
                         <tr className="border-b border-[#F3F4F6]">
                           <td className="py-3 text-[#6B7280]">Mode d'expédition</td>
                           <td className="py-3 text-right font-bold text-[#1A1A2E]">Standard Express DHL</td>
                         </tr>
                         <tr>
                           <td className="py-3 pt-4 text-[#1A1A2E] font-bold">Total HT</td>
                           <td className="py-3 pt-4 text-right font-bold text-[#7C5CFC] text-lg tabular-nums">{formatCurrency(selectedOrder.amount)}</td>
                         </tr>
                       </tbody>
                     </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-[11px] uppercase tracking-wider text-[#9CA3AF] font-bold mb-4">Lignes de commande ({selectedOrder.products.length})</h3>
                  <div className="space-y-3">
                    {selectedOrder.products.map((p, i) => (
                      <div key={i} className="flex justify-between items-center bg-white p-4 border border-[#E5E7EB] rounded-[16px] shadow-sm hover:border-[#C4B5F4] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-[#F5F3FF] border border-[#EDE9FE] text-[#7C5CFC] rounded-[10px] flex items-center justify-center shrink-0">
                            <PackageCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#1A1A2E]">Gamme {p}</p>
                            <p className="text-[11px] text-[#6B7280] font-semibold uppercase tracking-wider mt-0.5">Réf. Catalogue</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-[#1A1A2E] bg-[#F9FAFB] px-3 py-1 rounded-[8px] border border-[#E5E7EB]">Qty: {Math.floor(Math.random()*10)+1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-[#E5E7EB] bg-white flex justify-between gap-3 shrink-0">
                 <button 
                  onClick={() => { toast.success(`PDF de la commande ${selectedOrder.id} généré`); setSelectedOrder(null); }}
                  className="flex-1 bg-white border border-[#D1D5DB] text-[#1A1A2E] hover:bg-[#F9FAFB] py-3 rounded-[12px] text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                 >
                   <Download className="w-4 h-4"/> Télécharger PDF
                 </button>
                 <button 
                  onClick={() => toast.success(`La commande ${selectedOrder.id} est marquée comme expédiée.`)}
                  className="flex-1 bg-[#7C5CFC] hover:bg-[#6a4de2] text-white py-3 rounded-[12px] text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                 >
                   <Play className="w-4 h-4"/> Traiter l'étape
                 </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ConfirmDialog 
        isOpen={!!confirmCancel}
        title="Annuler la commande"
        description={`Êtes-vous sûr de vouloir annuler la commande ${confirmCancel} ? Cette action est irréversible et notifiera le distributeur.`}
        confirmText="Confirmer l'annulation"
        onConfirm={() => { toast.success(`Commande ${confirmCancel} annulée.`); setConfirmCancel(null); }}
        onCancel={() => setConfirmCancel(null)}
        isDestructive
      />
    </div>
  );
}
