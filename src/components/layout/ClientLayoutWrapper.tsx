"use client";

import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { Toaster } from "sonner";
import { BobbyGlobalAccess } from "@/components/bobby/BobbyGlobalAccess";
import { useLayout } from "@/context/LayoutContext";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed, isMobileMenuOpen, closeMobileMenu } = useLayout();
  
  return (
    <div className="min-h-screen flex bg-transparent">
      {/* Global Canvas Background */}
      <div className="canvas-bg">
        <div className="canvas-blob w-[400px] h-[400px] bg-[#EDE9FE] left-[-10%] top-[-10%] delay-0" />
        <div className="canvas-blob w-[500px] h-[500px] bg-[#FDF3C0] right-[-10%] bottom-[-10%] delay-200" />
        <div className="canvas-blob w-[300px] h-[300px] bg-[#BAE6FD] left-[20%] bottom-[10%] delay-500" />
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar />

      {/* Main Content Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out relative z-10",
          "ml-0", // Default mobile
          isSidebarCollapsed ? "lg:ml-[80px]" : "lg:ml-[240px]" // Desktop offset
        )}
      >
        <Topbar />
        <PageTransition>
          <main className="flex-1 p-4 md:p-8 relative">
            {children}
          </main>
        </PageTransition>
      </div>

      <BobbyGlobalAccess />
      <Toaster position="top-center" richColors />
    </div>
  );
}

import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
