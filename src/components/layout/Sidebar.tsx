"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  TrendingUp,
  Package,
  AlertCircle,
  Sparkles,
  BarChart3,
  ShieldCheck,
  Settings,
  Users2,
  Zap,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useLayout } from "@/context/LayoutContext";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MAIN_NAV = [
  { href: "/dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { href: "/distributeurs", label: "Distributeurs", icon: Users },
  { href: "/contacts", label: "Contacts", icon: Users2 },
  { href: "/commandes", label: "Commandes", icon: ShoppingCart },
  { href: "/pipeline", label: "Pipeline", icon: TrendingUp },
  { href: "/produits", label: "Produits", icon: Package },
  { href: "/bobby", label: "Bobby IA", icon: Sparkles, isBobby: true },
  { href: "/automatisations", label: "Automatisations", icon: Zap },
  { href: "/rapports", label: "Rapports", icon: BarChart3 },
];

const BOTTOM_NAV = [
  { href: "/conformite", label: "Conformité", icon: ShieldCheck },
  { href: "/parametres", label: "Paramètres", icon: Settings, isSettings: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar, isMobileMenuOpen, closeMobileMenu } = useLayout();

  const renderNavItem = (item: typeof MAIN_NAV[0] & { isSettings?: boolean, isBobby?: boolean }) => {
    const isActive = pathname.startsWith(item.href) || (pathname === '/' && item.href === '/dashboard');
    const isBobby = item.isBobby;
    const isSettings = item.isSettings;

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => closeMobileMenu()}
        className={cn(
          "relative flex items-center h-11 rounded-2xl text-[13px] font-black transition-all group shrink-0 overflow-hidden",
          isSidebarCollapsed ? "justify-center px-0" : "px-4 gap-3",
          isActive
            ? "text-[#1A1A2E]"
            : "text-[#64748B] hover:text-[#1A1A2E]"
        )}
        title={isSidebarCollapsed ? item.label : undefined}
      >
        {isActive && (
          <>
            <motion.div
              layoutId="active-sidebar-bg"
              className="absolute inset-0 sidebar-nav-active-bg rounded-2xl"
              initial={false}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-7 rounded-r-full bg-[#7C5CFC]" />
          </>
        )}

        {!isActive && (
          <div className="absolute inset-0 rounded-2xl bg-[#F8FAFC] opacity-0 group-hover:opacity-100 transition-opacity" />
        )}

        <div className={cn("relative z-10 flex items-center transition-all w-full", isSidebarCollapsed ? "justify-center" : "gap-3")}>
          {isBobby ? (
            <div className="relative w-5 h-5 shrink-0 flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center shadow-sm">
                <Sparkles className="w-3 h-3 text-white" strokeWidth={2.5} />
              </div>
            </div>
          ) : isSettings ? (
            <item.icon
              className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:rotate-90"
              strokeWidth={2.5}
            />
          ) : (
            <item.icon className="w-5 h-5 shrink-0" strokeWidth={2.5} />
          )}

          {!isSidebarCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="whitespace-nowrap flex-1"
            >
              {item.label}
            </motion.span>
          )}

          {isBobby && !isSidebarCollapsed && (
            <span
              className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] animate-dot-pulse shrink-0 ml-auto"
            />
          )}
        </div>
      </Link>
    );
  };

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 bottom-0 glass-sidebar flex flex-col z-[50] transition-transform duration-300 ease-in-out lg:translate-x-0",
          isSidebarCollapsed ? "w-[80px]" : "w-[240px]",
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div className="absolute inset-0 bg-white/40 pointer-events-none" />

        <div
          className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at 0% 100%, rgba(124, 92, 252, 0.15) 0%, transparent 60%)"
          }}
        />

        {/* Logo Area & Mobile Close */}
        <div className={cn("p-6 shrink-0 flex items-center justify-between", isSidebarCollapsed && "px-4 justify-center")}>
          <div className="flex flex-col">
            <div className={cn("flex items-center gap-2", isSidebarCollapsed && "justify-center")}>
              {!isSidebarCollapsed && (
                <div className="w-2 h-2 rounded-full bg-[#7C5CFC] shrink-0" />
              )}
              <span className={cn(
                "font-sans font-black text-[#1A1A2E] leading-tight transition-all",
                isSidebarCollapsed ? "text-xl" : "text-[16px]"
              )}>
                {isSidebarCollapsed ? "I." : "Itena Clinical"}
              </span>
            </div>
            {!isSidebarCollapsed && (
              <span className="text-[10px] uppercase text-[#94A3B8] tracking-[0.15em] font-black mt-1 ml-4">
                CRM Propriétaire
              </span>
            )}
          </div>
          
          {/* Mobile close button */}
          <button 
            onClick={closeMobileMenu}
            className="p-2 -mr-2 text-slate-400 hover:text-black lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto mt-2 custom-scrollbar">
          {MAIN_NAV.map((item) => renderNavItem(item))}
        </nav>

        {/* Divider */}
        <div className="mx-3 my-2 h-px bg-[#F3F4F6]" />

        {/* Bottom Nav */}
        <div className="px-3 flex flex-col gap-1 pb-2">
          {BOTTOM_NAV.map((item) => renderNavItem(item))}
        </div>

        {/* User Profile */}
        <div className={cn(
          "border-t border-[#E5E7EB] p-4 flex flex-col gap-3",
        )}>
          <div className={cn("flex items-center gap-3 transition-all", isSidebarCollapsed && "justify-center")}>
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C5CFC] to-[#38BDF8] flex items-center justify-center text-white font-black text-xs shadow-lg shadow-[#7C5CFC]/20 ring-2 ring-white ring-offset-0">
                MD
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#10B981] border-2 border-white animate-dot-pulse" />
            </div>

            {!isSidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col flex-1 min-w-0"
              >
                <span className="text-xs font-black text-[#1A1A2E] truncate">Marie Dupont</span>
                <span className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider truncate">Resp. Commercial</span>
              </motion.div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className={cn(
              "hidden lg:flex items-center justify-center h-9 w-full rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-[#7C5CFC] hover:bg-[#F5F3FF] hover:border-[#EDE9FE] transition-all group",
            )}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : (
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Réduire</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
