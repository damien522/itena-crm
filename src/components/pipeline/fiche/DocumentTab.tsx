"use client";

import { Deal, DealDocument } from "@/data/pipeline";
import { 
  CloudUpload, File, FileText, FileSpreadsheet, 
  Image as ImageIcon, MoreHorizontal, Download, 
  Trash2, Search, LayoutGrid, List, Check,
  ChevronDown, FileVideo, Filter
} from "lucide-react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface DocumentTabProps {
  deal: Deal;
  setDeal: (deal: Deal) => void;
}

export function DocumentTab({ deal, setDeal }: DocumentTabProps) {
  const [view, setView] = useState<"Grid" | "List">("Grid");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState<any[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    simulateUpload(files);
  };

  const simulateUpload = (files: File[]) => {
    files.forEach(file => {
      const id = Math.random().toString(36).substr(2, 9);
      setUploads(prev => [...prev, { id, name: file.name, progress: 0 }]);
      
      let prog = 0;
      const interval = setInterval(() => {
        prog += 10;
        setUploads(prev => prev.map(u => u.id === id ? { ...u, progress: prog } : u));
        
        if (prog >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newDoc: DealDocument = {
              id: `doc-${Date.now()}`,
              name: file.name,
              type: file.type.includes('pdf') ? 'pdf' : file.type.includes('sheet') ? 'xlsx' : file.type.includes('image') ? 'image' : 'pdf' as any,
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              uploadedBy: deal.assignedTo.name,
              uploadedByAvatar: deal.assignedTo.avatar,
              date: new Date().toISOString(),
              category: "Autres"
            };
            setDeal({ ...deal, documents: [newDoc, ...deal.documents] });
            setUploads(prev => prev.filter(u => u.id !== id));
            toast.success(`Fichier ${file.name} ajouté !`);
          }, 500);
        }
      }, 150);
    });
  };

  const categories = ["Tous", "Propositions", "Contrats", "Présentations", "Devis", "Autres"];

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-8 h-8 text-rose-500" />;
      case 'xlsx': return <FileSpreadsheet className="w-8 h-8 text-emerald-500" />;
      case 'pptx': return <FileVideo className="w-8 h-8 text-orange-500" />;
      case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
      default: return <File className="w-8 h-8 text-slate-400" />;
    }
  };

  return (
    <div className="p-10 space-y-10 max-w-[1000px]">
      {/* Search and Filters */}
      <div className="flex items-center justify-between">
         <div className="flex bg-white rounded-2xl border border-slate-100 p-1 shadow-sm">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  activeCategory === cat ? "bg-[#1A1A2E] text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {cat}
              </button>
            ))}
         </div>
         
         <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl">
               <button onClick={() => setView("Grid")} className={cn("p-2 rounded-lg transition-all", view === "Grid" ? "bg-white text-[#7C5CFC] shadow-sm" : "text-slate-400")}><LayoutGrid className="w-4 h-4" /></button>
               <button onClick={() => setView("List")} className={cn("p-2 rounded-lg transition-all", view === "List" ? "bg-white text-[#7C5CFC] shadow-sm" : "text-slate-400")}><List className="w-4 h-4" /></button>
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#7C5CFC] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-[#7C5CFC]/20 hover:scale-105 transition-all">
               <CloudUpload className="w-4 h-4" /> Ajouter
            </button>
         </div>
      </div>

      {/* Drag Zone */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "h-48 rounded-[40px] border-4 border-dashed transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer",
          isDragging ? "bg-[#F5F3FF] border-[#7C5CFC] scale-[0.99]" : "bg-white border-slate-100 hover:border-slate-200"
        )}
      >
         <div className={cn(
           "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
           isDragging ? "bg-[#7C5CFC] text-white rotate-12 scale-110" : "bg-slate-50 text-slate-300 group-hover:text-[#7C5CFC]"
         )}>
            <CloudUpload className="w-6 h-6" />
         </div>
         <div className="text-center">
            <p className="text-sm font-black text-[#1A1A2E] tracking-tight">Glissez vos fichiers ici</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PDF, DOCX, XLSX, PNG (MAX 50MB)</p>
         </div>
      </div>

      {/* Uploading Status */}
      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-3 overflow-hidden">
            {uploads.map(u => (
               <div key={u.id} className="bg-white p-4 rounded-[24px] border border-[#EDE9FE] shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] flex items-center justify-center text-[#7C5CFC] font-black shrink-0 italic animate-pulse">UP</div>
                  <div className="flex-1">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-black text-[#1A1A2E]">{u.name}</span>
                        <span className="text-[10px] font-bold text-[#7C5CFC]">{u.progress}%</span>
                     </div>
                     <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${u.progress}%` }} className="h-full bg-[#7C5CFC]" />
                     </div>
                  </div>
               </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Documents View */}
      {view === "Grid" ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
           {deal.documents.filter(d => activeCategory === "Tous" || d.category === activeCategory).map(doc => (
             <motion.div 
              layoutId={doc.id}
              key={doc.id} 
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#7C5CFC]/10 transition-all group relative overflow-hidden"
             >
                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                   <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-50 text-slate-400 hover:text-[#7C5CFC] transition-all"><Download className="w-4 h-4" /></button>
                   <button className="p-2 bg-white rounded-xl shadow-sm border border-slate-50 text-slate-400 hover:text-rose-500 transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>

                <div className="mb-6 bg-slate-50/50 w-20 h-20 rounded-[28px] flex items-center justify-center">
                   {getIcon(doc.type)}
                </div>

                <h4 className="text-[13px] font-black text-[#1A1A2E] mb-1 line-clamp-1">{doc.name}</h4>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-3">
                   <span>{doc.size}</span>
                   <span className="w-1 h-1 rounded-full bg-slate-200" />
                   <span>{doc.category}</span>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-50 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-400 italic">
                         {doc.uploadedByAvatar}
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(doc.date).toLocaleDateString('fr-FR')}</span>
                   </div>
                   <button className="text-[10px] font-black text-[#7C5CFC] uppercase tracking-widest hover:underline flex items-center gap-1 italic">Détails <ChevronDown className="w-3 h-3"/></button>
                </div>
             </motion.div>
           ))}
        </div>
      ) : (
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                 <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nom</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Taille</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Catégorie</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {deal.documents.filter(d => activeCategory === "Tous" || d.category === activeCategory).map(doc => (
                   <tr key={doc.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                               <File className="w-4 h-4 text-slate-400" />
                            </div>
                            <span className="text-xs font-black text-[#1A1A2E]">{doc.name}</span>
                         </div>
                      </td>
                      <td className="px-8 py-5 text-xs font-bold text-slate-400">{doc.size}</td>
                      <td className="px-8 py-5">
                         <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 uppercase tracking-widest">{doc.category}</span>
                      </td>
                      <td className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-tighter">{new Date(doc.date).toLocaleDateString('fr-FR')}</td>
                      <td className="px-8 py-5 text-right opacity-0 group-hover:opacity-100 transition-all">
                         <button className="p-2 text-slate-300 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      )}
    </div>
  );
}
