"use client";

import { toast } from "sonner";
import { useState } from "react";
import { revenueData, regionalRevenue, pipelineData, executiveMetrics, operationalMetrics, stockAlerts } from "@/data/rapports";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { Download, TrendingUp, Briefcase, FileSignature, AlertTriangle, Target, MessageSquare, Sparkles, Send, Bot, X, Shield, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { distributeurs } from "@/data/distributeurs";

const ROLES = ["Directeur", "Commercial", "Opérationnel"];

function MetricCard({ title, value, trend, isPercentage }: { title: string, value: string | number, trend?: number, isPercentage?: boolean }) {
  return (
    <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB] flex flex-col">
       <h3 className="text-[#6B7280] text-sm font-medium mb-3">{title}</h3>
       <div className="flex items-end justify-between mt-auto">
         <div className="text-3xl font-bold text-[#1A1A2E] tabular-nums tracking-tight">{value}</div>
         {trend !== undefined && (
           <div className={`px-2 py-1 rounded-[6px] text-xs font-bold ${trend >= 0 ? 'bg-[#BBF7D0] text-[#166534]' : 'bg-[#FECACA] text-[#991B1B]'}`}>
             {trend > 0 ? '+' : ''}{trend}%
           </div>
         )}
       </div>
    </div>
  )
}

export default function Rapports() {
  const [activeRole, setActiveRole] = useState("Directeur");
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bobby', text: "Bonjour ! Quel genre de rapport spécifique souhaitez-vous que je génère pour vous aujourd'hui ?" }
  ]);

  const formatCurrency = (val: number) => new Intl.NumberFormat('fr-FR', { notation: "compact", compactDisplay: "short", style: 'currency', currency: 'EUR', maximumFractionDigits: 1 }).format(val);

  const handleDownload = () => {
    toast("Préparation du rapport...");
    setTimeout(() => {
      toast.success("Rapport en cours de préparation... Téléchargement lancé");
    }, 1500);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage("");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setMessages(prev => [...prev, { role: 'bobby', text: "C'est prêt ! J'ai généré votre rapport personnalisé sur l'analyse comparative des ventes. Vous pouvez le consulter dans la section téléchargements." }]);
      toast.success("Rapport personnalisé généré !");
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-10 min-h-screen relative">
      
      {/* Tabs */}
      <div className="flex bg-[#E5E7EB] p-1 rounded-[14px] w-max">
        {ROLES.map(role => (
          <button
            key={role}
            onClick={() => setActiveRole(role)}
            className={`px-6 py-2 rounded-[10px] text-sm font-semibold transition-all ${activeRole === role ? 'bg-white text-[#7C5CFC] shadow-sm' : 'text-[#6B7280] hover:text-[#1A1A2E]'}`}
          >
            {role}
          </button>
        ))}
      </div>

      <div className="flex-1">
        {activeRole === "Directeur" && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <MetricCard title="Chiffre d'Affaires Global" value="3,125 M€" trend={executiveMetrics.globalRevenue.trend} />
               <MetricCard title="Croissance YoY" value="14.5%" trend={14.5} />
               <MetricCard title="Marge Brute" value={`${executiveMetrics.grossMargin.value}%`} trend={executiveMetrics.grossMargin.trend} />
               <MetricCard title="Distributeurs Actifs" value={executiveMetrics.activeDistributors.value} trend={executiveMetrics.activeDistributors.trend} />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB]">
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-lg font-bold text-[#1A1A2E]">CA Global & Comparatif N-1</h2>
                   <button onClick={() => toast.success("Export du graphique démarré (PDF)")} className="text-[#9CA3AF] hover:text-[#7C5CFC]"><Download className="w-5 h-5"/></button>
                 </div>
                 <div className="h-[300px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={revenueData}>
                       <defs>
                          <linearGradient id="colorDir" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                       <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(val) => `${val/1000}k`}/>
                       <Tooltip contentStyle={{ borderRadius: '12px' }}/>
                       <Area type="monotone" dataKey="revenuePrevious" stroke="#E8C93A" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                       <Area type="monotone" dataKey="revenueCurrent" stroke="#7C5CFC" strokeWidth={3} fill="url(#colorDir)" />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
               </div>
               
               <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB] flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-lg font-bold text-[#1A1A2E]">Répartition par zone</h2>
                   <button onClick={() => toast.success("Export du graphique démarré (PDF)")} className="text-[#9CA3AF] hover:text-[#7C5CFC]"><Download className="w-5 h-5"/></button>
                 </div>
                 <div className="h-[200px] mb-4">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={regionalRevenue} layout="vertical">
                       <XAxis type="number" hide />
                       <YAxis dataKey="region" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#1A1A2E' }} width={80} />
                       <Tooltip />
                       <Bar dataKey="value" fill="#C4B5F4" radius={[0, 4, 4, 0]} barSize={20} />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>
               </div>
             </div>

             <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden mb-6">
               <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
                 <h2 className="text-lg font-bold text-[#1A1A2E]">Top 10 Distributeurs Convertis</h2>
               </div>
               <table className="w-full text-sm text-left">
                 <thead className="bg-[#F9FAFB]">
                   <tr className="text-[#9CA3AF] text-[11px] uppercase tracking-wider">
                     <th className="py-4 pl-6 pr-4 font-bold">Distributeur</th>
                     <th className="py-4 px-4 font-bold">Niveau</th>
                     <th className="py-4 px-4 font-bold">Dernière activité</th>
                     <th className="py-4 px-4 font-bold text-right">CA Généré</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#E5E7EB]">
                   {distributeurs.slice(0, 10).map((d) => (
                     <tr key={d.id} className="hover:bg-[#F5F3FF] transition-colors">
                       <td className="py-3 pl-6 pr-4 font-bold text-[#1A1A2E]">{d.flag} {d.name}</td>
                       <td className="py-3 px-4 text-[#A16207] font-semibold">{d.commercialDetails.tier}</td>
                       <td className="py-3 px-4 text-[#6B7280]">{d.stats.lastOrderDate}</td>
                       <td className="py-3 px-4 text-right font-bold text-[#1A1A2E] tabular-nums">{formatCurrency(d.stats.totalRevenue)}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>

             {/* Full Width Rapports Automatiques Programmés */}
             <div className="bg-white rounded-[16px] border border-[#E5E7EB] shadow-sm overflow-hidden mt-6">
               <div className="p-6 border-b border-[#E5E7EB]">
                 <h2 className="text-lg font-bold text-[#1A1A2E]">Rapports Automatiques Programmés</h2>
               </div>
               <div className="divide-y divide-[#E5E7EB]">
                 {/* Hebdo */}
                 <div className="p-4 px-6 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#E0F2FE] flex items-center justify-center text-[#0284C7] shrink-0">
                       <Briefcase className="w-5 h-5"/>
                     </div>
                     <div>
                       <h3 className="font-bold text-[#1A1A2E]">Rapport hebdomadaire</h3>
                       <p className="text-xs text-[#6B7280]">Lundi 09h00 • Dernière livraison il y a 3 jours</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="bg-[#BBF7D0] text-[#166534] px-3 py-1 rounded-full text-xs font-bold uppercase">Actif</span>
                     <button onClick={handleDownload} className="text-[#6B7280] hover:text-[#7C5CFC] bg-white border border-[#E5E7EB] px-4 py-2 rounded-[10px] text-sm font-semibold flex items-center gap-2 transition-colors hover:border-[#7C5CFC]">
                       <Download className="w-4 h-4"/> Télécharger
                     </button>
                   </div>
                 </div>
                 {/* Mensuel */}
                 <div className="p-4 px-6 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#7C5CFC] shrink-0">
                       <Target className="w-5 h-5"/>
                     </div>
                     <div>
                       <h3 className="font-bold text-[#1A1A2E]">Rapport mensuel performance</h3>
                       <p className="text-xs text-[#6B7280]">1er du mois • Dernière livraison il y a 11 jours</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="bg-[#BBF7D0] text-[#166534] px-3 py-1 rounded-full text-xs font-bold uppercase">Actif</span>
                     <button onClick={handleDownload} className="text-[#6B7280] hover:text-[#7C5CFC] bg-white border border-[#E5E7EB] px-4 py-2 rounded-[10px] text-sm font-semibold flex items-center gap-2 transition-colors hover:border-[#7C5CFC]">
                       <Download className="w-4 h-4"/> Télécharger
                     </button>
                   </div>
                 </div>
                 {/* Trimestriel */}
                 <div className="p-4 px-6 flex items-center justify-between hover:bg-[#F9FAFB] transition-colors">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-[#FEFCE8] flex items-center justify-center text-[#CA8A04] shrink-0">
                       <FileSignature className="w-5 h-5"/>
                     </div>
                     <div>
                       <h3 className="font-bold text-[#1A1A2E]">Rapport qualité trimestriel</h3>
                       <p className="text-xs text-[#6B7280]">1er du trimestre • Dernière livraison il y a 41 jours</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-4">
                     <span className="bg-[#BBF7D0] text-[#166534] px-3 py-1 rounded-full text-xs font-bold uppercase">Actif</span>
                     <button onClick={handleDownload} className="text-[#6B7280] hover:text-[#7C5CFC] bg-white border border-[#E5E7EB] px-4 py-2 rounded-[10px] text-sm font-semibold flex items-center gap-2 transition-colors hover:border-[#7C5CFC]">
                       <Download className="w-4 h-4"/> Télécharger
                     </button>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        )}

        {activeRole === "Commercial" && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <MetricCard title="Nouveaux Distributeurs" value="12" trend={8} />
               <MetricCard title="Valeur Pipeline" value="2.4 M€" trend={15} />
               <MetricCard title="Tx Conversion" value="28%" trend={-2} />
               <MetricCard title="Objectif Mensuel" value="84%" trend={5} />
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB]">
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-lg font-bold text-[#1A1A2E]">Pipeline Commercial</h2>
                   <button onClick={() => toast.success("Export du graphique démarré (PDF)")} className="text-[#9CA3AF] hover:text-[#7C5CFC]"><Download className="w-5 h-5"/></button>
                 </div>
                 <div className="h-[250px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={pipelineData}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} tickFormatter={(val) => `${val/1000}k`} />
                       <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <Tooltip />
                       <Bar yAxisId="left" dataKey="value" fill="#7C5CFC" radius={[4, 4, 0, 0]} name="Valeur HT" />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>
               </div>

               <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB]">
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-lg font-bold text-[#1A1A2E]">Performances par Famille</h2>
                   <button onClick={() => toast.success("Export du graphique démarré (PDF)")} className="text-[#9CA3AF] hover:text-[#7C5CFC]"><Download className="w-5 h-5"/></button>
                 </div>
                 <div className="h-[250px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={[
                       { name: 'Protéger', CA: 1200000 },
                       { name: 'Préserver', CA: 850000 },
                       { name: 'Remplacer', CA: 640000 },
                       { name: 'Soin', CA: 435000 },
                     ]}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                       <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val/1000}k`} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <Tooltip />
                       <Bar dataKey="CA" fill="#E8C93A" radius={[4, 4, 0, 0]} />
                     </BarChart>
                   </ResponsiveContainer>
                 </div>
               </div>
             </div>
          </div>
        )}

        {activeRole === "Opérationnel" && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <MetricCard title="Commandes Expédiées" value="845" trend={4} />
               <MetricCard title="Ruptures de Stock" value="12" trend={-2} />
               <MetricCard title="Réclamations Qualité" value="7" trend={-15} />
               <MetricCard title="Temps Résolution" value="2.3 jrs" trend={2} />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB] flex flex-col justify-center items-center text-center">
                 <h3 className="text-[#6B7280] text-sm font-medium mb-3">Délai de Livraison Moyen</h3>
                 <div className="relative w-32 h-32 mb-2">
                   <svg className="w-full h-full transform -rotate-180">
                     <circle cx="64" cy="64" r="50" stroke="#E5E7EB" strokeWidth="12" fill="none" strokeDasharray="157" strokeDashoffset="0" />
                     <circle cx="64" cy="64" r="50" stroke="#10B981" strokeWidth="12" fill="none" strokeDasharray="157" strokeDashoffset="31.4" strokeLinecap="round" />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                     <span className="text-3xl font-bold text-[#1A1A2E] tabular-nums leading-none">1.5</span>
                     <span className="text-xs text-[#9CA3AF] mt-1">/ 2 obj.</span>
                   </div>
                 </div>
                 <span className="bg-[#BBF7D0] text-[#166534] px-3 py-1 rounded-full text-[11px] font-bold">Objectif Atteint</span>
               </div>
               
               <div className="md:col-span-2 bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB]">
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-lg font-bold text-[#1A1A2E]">Volume Commandes Traitées (Mois)</h2>
                   <button onClick={() => toast.success("Export du graphique démarré (PDF)")} className="text-[#9CA3AF] hover:text-[#7C5CFC]"><Download className="w-5 h-5"/></button>
                 </div>
                 <div className="h-[200px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={[
                       { jour: '01', vol: 12 }, { jour: '05', vol: 15 }, { jour: '10', vol: 24 },
                       { jour: '15', vol: 18 }, { jour: '20', vol: 22 }, { jour: '25', vol: 30 },
                       { jour: '30', vol: 45 }
                     ]}>
                       <defs>
                          <linearGradient id="colorOpe" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                       <XAxis dataKey="jour" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <Tooltip />
                       <Area type="monotone" dataKey="vol" stroke="#38BDF8" strokeWidth={3} fill="url(#colorOpe)" />
                     </AreaChart>
                   </ResponsiveContainer>
                 </div>
               </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB]">
                 <h2 className="text-lg font-bold text-[#1A1A2E] mb-6 flex items-center gap-2">
                   <AlertTriangle className="w-5 h-5 text-[#E8C93A]" /> Alertes de Stock
                 </h2>
                 <div className="space-y-3">
                   {stockAlerts.map((alert, i) => (
                     <div key={i} className="flex items-center justify-between p-3 rounded-[12px] bg-[#F9FAFB] border border-[#E5E7EB]">
                       <div>
                         <p className="font-semibold text-[#1A1A2E] text-sm">{alert.product}</p>
                         <p className="text-xs text-[#6B7280]">{alert.family}</p>
                       </div>
                       <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${alert.status === 'Rupture' ? 'bg-[#FECACA] text-[#991B1B]' : 'bg-[#FDE68A] text-[#854D0E]'}`}>
                         {alert.status}
                       </span>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="bg-white rounded-[16px] p-6 shadow-sm border border-[#E5E7EB]">
                 <h2 className="text-lg font-bold text-[#1A1A2E] mb-6">Résolution SAV (Temps &lt; 48h)</h2>
                 <div className="h-[250px]">
                   <ResponsiveContainer width="100%" height="100%">
                     <LineChart data={[
                       { semaine: 'S1', taux: 85 }, { semaine: 'S2', taux: 88 }, { semaine: 'S3', taux: 82 },
                       { semaine: 'S4', taux: 90 }, { semaine: 'S5', taux: 94 }, { semaine: 'S6', taux: 95 },
                     ]}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB"/>
                       <XAxis dataKey="semaine" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                       <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} domain={[60, 100]} />
                       <Tooltip />
                       <Line type="monotone" dataKey="taux" stroke="#10B981" strokeWidth={3} dot={{ strokeWidth: 2, r: 4, fill: '#fff' }} />
                     </LineChart>
                   </ResponsiveContainer>
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowChat(true)}
        className="fixed bottom-8 right-8 z-50 bg-[#1A1A2E] text-white px-6 py-4 rounded-[24px] shadow-2xl flex items-center gap-3 border border-white/20 group overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C5CFC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Sparkles className="w-5 h-5 text-[#E8C93A] animate-pulse" />
        <span className="font-black text-sm uppercase tracking-wider relative z-10">Générer un rapport spécifique</span>
      </motion.button>

      {/* Custom Report Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowChat(false)} />
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }} 
               animate={{ opacity: 1, scale: 1, y: 0 }} 
               exit={{ opacity: 0, scale: 0.95, y: 20 }} 
               className="bg-white rounded-[32px] shadow-2xl w-full max-w-xl flex flex-col relative z-20 overflow-hidden border-beam"
             >
                <div className="p-6 border-b border-[#F3F4F6] flex justify-between items-center bg-gradient-to-r from-[#F8FAFC] to-white">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-[#1A1A2E] flex items-center justify-center text-white">
                        <Bot className="w-5 h-5" />
                     </div>
                     <h3 className="font-black text-[#1A1A2E] text-sm uppercase tracking-widest">Assistant Rapports Bobby</h3>
                  </div>
                  <button onClick={() => setShowChat(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                    <X className="w-5 h-5 text-[#9CA3AF]"/>
                  </button>
                </div>

                <div className="p-6 h-[400px] overflow-y-auto space-y-4 custom-scrollbar bg-slate-50/30">
                   {messages.map((m, i) => (
                     <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-[22px] text-sm font-bold ${m.role === 'user' ? 'bg-[#7C5CFC] text-white rounded-tr-none' : 'bg-white text-[#1A1A2E] rounded-tl-none border border-slate-100 shadow-sm'}`}>
                           {m.text}
                        </div>
                     </div>
                   ))}
                   {isGenerating && (
                     <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-[22px] rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-2">
                           <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 bg-[#7C5CFC] rounded-full animate-bounce" />
                              <span className="w-1.5 h-1.5 bg-[#7C5CFC] rounded-full animate-bounce [animation-delay:0.2s]" />
                              <span className="w-1.5 h-1.5 bg-[#7C5CFC] rounded-full animate-bounce [animation-delay:0.4s]" />
                           </div>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Analyse des données...</span>
                        </div>
                     </div>
                   )}
                </div>

                <div className="p-6 border-t border-[#F3F4F6] bg-white">
                   <div className="relative flex gap-2">
                      <input 
                        type="text" 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendMessage();
                        }}
                        placeholder="Ex: Analyse des ventes par région..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-[#7C5CFC]/10 transition-all"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="p-4 rounded-2xl bg-[#1A1A2E] text-white hover:scale-105 active:scale-95 transition-all shadow-xl"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
