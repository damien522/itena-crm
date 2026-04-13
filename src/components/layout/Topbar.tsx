"use client";

import { useState } from "react";
import { 
  Search, Bell, Plus, X, Package, ShoppingCart, 
  Users, TrendingUp, Bot, Menu, PanelLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLayout } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";

export function Topbar() {
  const router = useRouter();
  const { toggleMobileMenu, toggleSidebar, isSidebarCollapsed } = useLayout();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showQuickAction, setShowQuickAction] = useState(false);
  const [notifs, setNotifs] = useState([
    { id: 1, title: "Nouvelle commande #CMD-1044", time: "Il y a 5 min", read: false },
    { id: 2, title: "Certification expirante: DentalTech", time: "Il y a 1 heure", read: false },
    { id: 3, title: "Rapport hebdo disponible", time: "Hier 09:00", read: false },
  ]);

  // Global access trigger from Topbar
  const openBobby = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd', metaKey: true }));
  };

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({...n, read: true})));
    toast.success("Toutes les notifications marquées comme lues");
  };

  const hasUnread = notifs.some(n => !n.read);

  const quickActions = [
    { label: "Nouvelle commande", icon: ShoppingCart, color: "text-[#10B981]", bg: "bg-[#ECFDF5]", route: "/commandes" },
    { label: "Nouvel distributeur", icon: Users, color: "text-[#3B82F6]", bg: "bg-[#EFF6FF]", route: "/distributeurs" },
    { label: "Nouvelle opportunité", icon: TrendingUp, color: "text-[#7C5CFC]", bg: "bg-[#EDE9FE]", route: "/pipeline" },
    { label: "Nouvelle réclamation", icon: Package, color: "text-[#EF4444]", bg: "bg-[#FEF2F2]", route: "/reclamations" },
  ];

  return (
    <>
      <header className="h-[72px] shrink-0 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB] flex items-center justify-between px-4 md:px-6 z-30 sticky top-0">
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 -ml-2 text-slate-400 hover:text-black lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>

          <button 
            onClick={toggleSidebar}
            className={cn(
              "p-2 -ml-2 text-slate-400 hover:text-[#7C5CFC] hidden lg:flex rounded-xl hover:bg-[#F5F3FF] transition-all",
              isSidebarCollapsed && "rotate-180"
            )}
            title={isSidebarCollapsed ? "Développer le menu" : "Réduire le menu"}
          >
            <PanelLeft className="w-5 h-5" />
          </button>
          
          <div className="hidden md:flex flex-1 max-w-[480px]">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
              <input 
                type="text" 
                placeholder="Rechercher (CMD+D)" 
                className="w-full bg-[#F3F4F6] border-transparent rounded-[12px] py-2 pl-9 pr-4 text-sm focus:bg-white focus:border-[#7C5CFC] focus:ring-1 focus:ring-[#7C5CFC] outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={openBobby}
            className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F5F3FF] border border-[#EDE9FE] hover:border-[#7C5CFC]/30 transition-all hover:shadow-lg hover:shadow-[#7C5CFC]/10 active:scale-95"
          >
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
               <Bot className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[12px] font-black text-[#1A1A2E] tracking-tight">Parler à Bobby</span>
            <div className="flex items-center gap-1 group-hover:opacity-100 opacity-60 transition-opacity">
               <kbd className="text-[9px] font-black bg-white/50 px-1 rounded border border-slate-200">⌘</kbd>
               <kbd className="text-[9px] font-black bg-white/50 px-1 rounded border border-slate-200">D</kbd>
            </div>
          </button>

          <div className="relative">
            <button 
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-full hover:bg-[#F3F4F6] transition-colors text-[#6B7280]"
            >
              <Bell className="w-5 h-5" />
              {hasUnread && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white" />}
            </button>

            <AnimatePresence>
              {showNotifs && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-[calc(100%+8px)] w-[320px] bg-white rounded-[16px] shadow-2xl border border-[#E5E7EB] z-50 overflow-hidden flex flex-col"
                  >
                    <div className="p-4 border-b border-[#E5E7EB] flex justify-between items-center bg-[#F9FAFB]">
                      <h3 className="font-bold text-[#1A1A2E] text-sm">Notifications</h3>
                      <button onClick={markAllRead} className="text-[11px] font-bold text-[#7C5CFC] hover:underline">Tout lire</button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifs.map(n => (
                        <div key={n.id} className={`p-4 border-b border-[#E5E7EB] last:border-0 hover:bg-[#F9FAFB] cursor-pointer transition-colors ${n.read ? 'opacity-60' : ''}`} onClick={() => {
                          setNotifs(notifs.map(x => x.id === n.id ? {...x, read: true} : x));
                        }}>
                          <p className="text-sm font-semibold text-[#1A1A2E]">{n.title}</p>
                          <p className="text-xs text-[#9CA3AF] mt-1">{n.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => setShowQuickAction(true)}
            className="flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#2D2D42] text-white px-4 py-2.5 rounded-[12px] text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nouveau</span>
          </button>
        </div>
      </header>

      {/* Quick Action Modal */}
      <AnimatePresence>
        {showQuickAction && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-black/40"
              onClick={() => setShowQuickAction(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[24px] shadow-2xl w-full max-w-[600px] overflow-hidden flex flex-col relative z-10"
            >
              <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#1A1A2E]">Que voulez-vous créer ?</h2>
                <button onClick={() => setShowQuickAction(false)} className="p-2 rounded-full hover:bg-[#F3F4F6] text-[#9CA3AF]">
                  <X className="w-5 h-5"/>
                </button>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {quickActions.map(act => (
                  <button 
                    key={act.label}
                    onClick={() => {
                      setShowQuickAction(false);
                      router.push(act.route);
                      toast.success(`Redirection vers création : ${act.label}`);
                    }}
                    className="flex flex-col items-center justify-center p-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-[16px] hover:border-[#C4B5F4] hover:shadow-md transition-all group"
                  >
                    <div className={`w-14 h-14 rounded-full ${act.bg} ${act.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <act.icon className="w-7 h-7" />
                    </div>
                    <span className="font-bold text-[#1A1A2E] text-sm text-center">{act.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
