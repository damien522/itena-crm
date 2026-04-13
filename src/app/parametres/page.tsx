"use client";

import { useState } from "react";
import { User, BellRing, Users as UsersIcon, Server, Palette, Save, Plus, Mail, CheckCircle2, AlertTriangle, Key, Eye, EyeOff, RefreshCw, X, LogOut, Check, Trash2, Edit2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const NAV_ITEMS = [
  { id: "profil", label: "Mon Profil", icon: User },
  { id: "notifications", label: "Notifications", icon: BellRing },
  { id: "acces", label: "Accès et Rôles", icon: UsersIcon },
  { id: "cegid", label: "Intégration Cegid PMI", icon: Server },
  { id: "apparence", label: "Apparence", icon: Palette },
];

function Toggle({ isOn, onToggle }: { isOn: boolean, onToggle: () => void }) {
  return (
    <div 
      className={`relative w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out shrink-0 border border-transparent ${isOn ? 'bg-[#7C5CFC]' : 'bg-[#E5E7EB] border-[#D1D5DB]'}`}
      onClick={onToggle}
    >
      <motion.div 
        className="bg-white w-4 h-4 rounded-full shadow-sm"
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{ x: isOn ? 20 : 0 }}
      />
    </div>
  );
}

export default function Parametres() {
  const [activeItem, setActiveItem] = useState("profil");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const [appTheme, setAppTheme] = useState("Clair");
  const [appDensity, setAppDensity] = useState("Confortable");
  const [notifs, setNotifs] = useState<Record<string, boolean>>({
    cmd1: true, cmd2: true, cmd3: false,
    dist1: true, dist2: true, dist3: true,
    bobby1: true, bobby2: true, bobby3: true,
    rec1: true, rec2: false
  });
  const [inviteEmail, setInviteEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [confirmKey, setConfirmKey] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSave = (msg: string) => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success(msg);
    }, 1000);
  };

  const handleInvite = () => {
    if(!inviteEmail.includes('@')) {
      toast.error("Veuillez entrer un email valide.");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowInviteModal(false);
      toast.success(`Invitation envoyée à ${inviteEmail}`);
      setInviteEmail("");
    }, 1000);
  };

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      toast.success("Synchronisation réussie, 1 247 enregistrements mis à jour");
    }, 2000);
  };

  return (
    <div className="flex bg-white rounded-[16px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] border border-[#E5E7EB] min-h-[calc(100vh-140px)] overflow-hidden">
      
      {/* Inner Sidebar */}
      <div className="w-[220px] shrink-0 bg-[#F7F6F3] border-r border-[#E5E7EB] py-6 flex flex-col">
        <h2 className="px-6 text-[11px] uppercase tracking-[0.08em] font-bold text-[#9CA3AF] mb-4">Paramètres CRM</h2>
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
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        
        {activeItem === "profil" && (
          <div className="p-8 max-w-2xl animate-in fade-in h-full overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Mon Profil</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center text-2xl font-bold">MD</div>
                <button className="text-sm font-semibold text-[#7C5CFC] hover:underline bg-white">Changer la photo</button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Prénom</label>
                  <input type="text" defaultValue="Marie" className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Nom</label>
                  <input type="text" defaultValue="Dupont" className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Email</label>
                  <input type="email" defaultValue="m.dupont@itena-clinical.com" className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Téléphone</label>
                  <input type="tel" defaultValue="+33 6 12 34 56 78" className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none" />
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-6 mt-2">
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Langue Préférée</label>
                    <select className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] bg-white focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none appearance-none">
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Fuseau Horaire</label>
                    <select className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] bg-white focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none appearance-none">
                      <option>Europe/Paris (UTC+1)</option>
                      <option>America/New_York (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => handleSave("Tout est à jour. 🎉")}
                  disabled={isSaving}
                  className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-6 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4"/>} 
                  {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeItem === "notifications" && (
          <div className="p-8 max-w-3xl animate-in fade-in h-full overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Préférences de Notifications</h2>
            
            <div className="space-y-8">
               {/* Groupe 1 */}
               <div>
                 <h3 className="text-sm font-bold text-[#1A1A2E] flex items-center gap-2 border-b border-[#E5E7EB] pb-2 mb-4">Commandes</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Nouvelle commande reçue</span>
                      <Toggle isOn={notifs.cmd1} onToggle={() => setNotifs({...notifs, cmd1: !notifs.cmd1})} />
                    </div>
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Commande en retard</span>
                      <Toggle isOn={notifs.cmd2} onToggle={() => setNotifs({...notifs, cmd2: !notifs.cmd2})} />
                    </div>
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Changement de statut (Toutes)</span>
                      <Toggle isOn={notifs.cmd3} onToggle={() => setNotifs({...notifs, cmd3: !notifs.cmd3})} />
                    </div>
                 </div>
               </div>

               {/* Groupe 2 */}
               <div>
                 <h3 className="text-sm font-bold text-[#1A1A2E] flex items-center gap-2 border-b border-[#E5E7EB] pb-2 mb-4">Distributeurs</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Distributeur inactif (&gt;60 jours)</span>
                      <Toggle isOn={notifs.dist1} onToggle={() => setNotifs({...notifs, dist1: !notifs.dist1})} />
                    </div>
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Certification expirée ou proche</span>
                      <Toggle isOn={notifs.dist2} onToggle={() => setNotifs({...notifs, dist2: !notifs.dist2})} />
                    </div>
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Nouveau message reçu</span>
                      <Toggle isOn={notifs.dist3} onToggle={() => setNotifs({...notifs, dist3: !notifs.dist3})} />
                    </div>
                 </div>
               </div>

               {/* Groupe 3 */}
               <div>
                 <h3 className="text-sm font-bold text-[#1A1A2E] flex items-center gap-2 border-b border-[#E5E7EB] pb-2 mb-4">Bobby IA</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Rapport hebdomadaire d'activité</span>
                      <Toggle isOn={notifs.bobby1} onToggle={() => setNotifs({...notifs, bobby1: !notifs.bobby1})} />
                    </div>
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Alerte anomalie détectée</span>
                      <Toggle isOn={notifs.bobby2} onToggle={() => setNotifs({...notifs, bobby2: !notifs.bobby2})} />
                    </div>
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Action critique effectuée</span>
                      <Toggle isOn={notifs.bobby3} onToggle={() => setNotifs({...notifs, bobby3: !notifs.bobby3})} />
                    </div>
                 </div>
               </div>

               {/* Groupe 4 */}
               <div>
                 <h3 className="text-sm font-bold text-[#1A1A2E] flex items-center gap-2 border-b border-[#E5E7EB] pb-2 mb-4">Réclamations</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Nouvelle réclamation critique</span>
                      <Toggle isOn={notifs.rec1} onToggle={() => setNotifs({...notifs, rec1: !notifs.rec1})} />
                    </div>
                    <div className="flex justify-between items-center bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB]">
                      <span className="text-sm font-medium text-[#1A1A2E]">Réclamation résolue</span>
                      <Toggle isOn={notifs.rec2} onToggle={() => setNotifs({...notifs, rec2: !notifs.rec2})} />
                    </div>
                 </div>
               </div>
               
               <div className="pt-2">
                 <button 
                  onClick={() => handleSave("Tout est à jour. 🎉")}
                  disabled={isSaving}
                  className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-6 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70"
                 >
                   {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4"/>} 
                   {isSaving ? "Sauvegarde..." : "Sauvegarder"}
                 </button>
               </div>
            </div>
          </div>
        )}

        {activeItem === "acces" && (
          <div className="flex flex-col h-full animate-in fade-in">
            <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center bg-white shrink-0">
              <div>
                <h2 className="text-xl font-bold text-[#1A1A2E]">Accès et Rôles</h2>
                <p className="text-sm text-[#6B7280]">Gestions des collaborateurs CRM</p>
              </div>
              <button onClick={() => setShowInviteModal(true)} className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-4 py-2 rounded-[12px] text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                <Plus className="w-4 h-4" />
                Inviter un utilisateur
              </button>
            </div>
            
            <div className="flex-1 overflow-auto bg-white p-6">
              <div className="border border-[#E5E7EB] rounded-[12px] overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                    <tr className="text-[#9CA3AF] uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4 font-bold">Collaborateur</th>
                      <th className="py-3 px-4 font-bold">Email</th>
                      <th className="py-3 px-4 font-bold">Rôle</th>
                      <th className="py-3 px-4 font-bold">Dernière connexion</th>
                      <th className="py-3 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB]">
                    {[
                      { name: "Marie Dupont", email: "m.dupont@itena-clinical.com", role: "Directeur", last: "Aujourd'hui 09:30" },
                      { name: "Lucas Bernard", email: "l.bernard@itena-clinical.com", role: "Commercial", last: "Hier 16:45" },
                      { name: "Sophie Martin", email: "s.martin@itena-clinical.com", role: "Commercial", last: "Il y a 2 jours" },
                      { name: "Julien Petit", email: "j.petit@itena-clinical.com", role: "Opérationnel", last: "Il y a 1 semaine" },
                    ].map((user, i) => (
                      <tr key={i} className="hover:bg-[#F9FAFB] transition-colors group">
                        <td className="px-4 py-3 font-semibold text-[#1A1A2E] flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E5E7EB] text-[#4B5563] flex items-center justify-center text-xs font-bold shrink-0">
                            {user.name.substring(0,2).toUpperCase()}
                          </div>
                          {user.name}
                        </td>
                        <td className="px-4 py-3 text-[#6B7280]">{user.email}</td>
                        <td className="px-4 py-3 relative">
                          <select className={`appearance-none bg-transparent cursor-pointer font-bold text-xs inline-block px-2.5 py-1 rounded-[6px] outline-none hover:ring-1 hover:ring-[#C4B5F4] ${
                            user.role === 'Directeur' ? 'bg-[#EDE9FE] text-[#7C5CFC]' : 
                            user.role === 'Commercial' ? 'bg-[#E0F2FE] text-[#0284C7]' : 
                            'bg-[#F3F4F6] text-[#4B5563]'
                          }`} onChange={(e) => toast.success(`Rôle modifié : ${e.target.value} pour ${user.name}`)}>
                             <option value="Directeur" selected={user.role === "Directeur"}>Directeur</option>
                             <option value="Commercial" selected={user.role === "Commercial"}>Commercial</option>
                             <option value="Opérationnel" selected={user.role === "Opérationnel"}>Opérationnel</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-[#6B7280] text-xs">{user.last}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => setConfirmDelete(user.name)} className="p-1.5 rounded hover:bg-[#FECACA] text-[#9CA3AF] hover:text-[#DC2626] transition-colors">
                            <Trash2 className="w-4 h-4" /> 
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <AnimatePresence>
            {showInviteModal && (
              <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-[20px] shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
                >
                  <div className="p-6 border-b border-[#E5E7EB] flex justify-between items-center">
                    <h2 className="text-xl font-bold text-[#1A1A2E]">Inviter un utilisateur</h2>
                    <button onClick={() => setShowInviteModal(false)} className="p-2 rounded-full hover:bg-[#F3F4F6] text-[#9CA3AF]">
                      <X className="w-5 h-5"/>
                    </button>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Email du collaborateur</label>
                      <input 
                        type="email" 
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="nom@itena-clinical.com" 
                        className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Rôle Attribué</label>
                      <select className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] bg-white focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none appearance-none">
                        <option>Directeur</option>
                        <option>Commercial</option>
                        <option>Opérationnel</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-4 border-t border-[#E5E7EB] bg-[#F9FAFB] flex justify-end">
                    <button 
                      onClick={handleInvite}
                      disabled={isSaving}
                      className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-5 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm w-full flex justify-center items-center gap-2 disabled:opacity-70"
                    >
                      {isSaving && <RefreshCw className="w-4 h-4 animate-spin" />}
                      Envoyer l'invitation
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
            </AnimatePresence>

            <ConfirmDialog 
               isOpen={!!confirmDelete}
               title="Désactiver l'utilisateur"
               description={`Êtes-vous sûr de vouloir désactiver les accès pour ${confirmDelete} ?`}
               confirmText="Désactiver"
               onConfirm={() => {
                 setConfirmDelete(null);
                 toast.success(`Utilisateur ${confirmDelete} désactivé avec succès.`);
               }}
               onCancel={() => setConfirmDelete(null)}
               isDestructive
            />
          </div>
        )}

        {activeItem === "cegid" && (
          <div className="p-8 h-full overflow-y-auto animate-in fade-in max-w-3xl">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Intégration Cegid PMI</h2>
            
            <div className="bg-white border border-[#A7F3D0] rounded-[16px] p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#10B981]" />
              <div className="pl-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                  <h3 className="font-bold text-[#1A1A2E] text-lg">Connecté et synchronisé</h3>
                </div>
                <p className="text-sm text-[#6B7280]">Dernière synchronisation : <span className="font-medium text-[#1A1A2E]">il y a 3 minutes</span></p>
              </div>
              <button 
                onClick={handleSync}
                disabled={isSyncing}
                className="bg-white border border-[#D1D5DB] text-[#1A1A2E] hover:bg-[#F9FAFB] px-5 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm flex items-center gap-2 shrink-0 disabled:opacity-70"
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} /> 
                {isSyncing ? "En cours..." : "Synchroniser maintenant"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Sync: Données critiques</label>
                <select className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] bg-white focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none appearance-none" onChange={() => toast.success("Fréquence de synchronisation mise à jour")}>
                  <option>Temps réel (Webhooks)</option>
                  <option>Toutes les 15 minutes</option>
                  <option>Manuel uniquement</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Sync: Catalogue/Produit</label>
                <select className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] bg-white focus:ring-2 focus:ring-[#C4B5F4] focus:outline-none appearance-none" onChange={() => toast.success("Fréquence de synchronisation mise à jour")}>
                  <option>Toutes les heures</option>
                  <option>Une fois par jour (Nuit)</option>
                  <option>Manuel uniquement</option>
                </select>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Dernières opérations</h3>
            <div className="border border-[#E5E7EB] rounded-[12px] overflow-hidden mb-10">
               <table className="w-full text-sm text-left">
                 <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                   <tr className="text-[#9CA3AF] uppercase tracking-wider text-[11px]">
                     <th className="py-3 px-4 font-bold">Timestamp</th>
                     <th className="py-3 px-4 font-bold">Opération</th>
                     <th className="py-3 px-4 font-bold">Enregistrements</th>
                     <th className="py-3 px-4 font-bold text-center">Statut</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[#E5E7EB]">
                   {[
                     { t: "Aujourd'hui 16:25", op: "PUSH_ORDERS", qty: 2, st: "SUCCESS" },
                     { t: "Aujourd'hui 16:10", op: "PULL_CATALOG", qty: 450, st: "SUCCESS" },
                     { t: "Aujourd'hui 15:42", op: "PUSH_ORDERS", qty: 1, st: "SUCCESS" },
                     { t: "Aujourd'hui 15:10", op: "PULL_CATALOG", qty: 450, st: "WARNING" },
                   ].map((l, i) => (
                     <tr key={i} className="hover:bg-[#F9FAFB]">
                       <td className="px-4 py-3 font-mono text-[#6B7280] text-xs">{l.t}</td>
                       <td className="px-4 py-3 font-semibold text-[#1A1A2E] text-xs">{l.op}</td>
                       <td className="px-4 py-3 text-[#6B7280] text-xs">{l.qty}</td>
                       <td className="px-4 py-3 text-center">
                         <span className={`inline-block px-2.5 py-0.5 rounded-[6px] text-[10px] font-bold ${l.st === 'SUCCESS' ? 'bg-[#BBF7D0] text-[#166534]' : 'bg-[#FDE68A] text-[#854D0E]'}`}>
                           {l.st}
                         </span>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>

            <div className="bg-[#F9FAFB] rounded-[16px] p-6 border border-[#E5E7EB]">
              <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Configurer l'API</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-wider mb-2">Clé API Serveur</label>
                  <div className="relative">
                    <input 
                      type={apiKeyVisible ? "text" : "password"} 
                      defaultValue="itena_sk_live_94jf83n29cj92nf8jf3nv9dn293fnv"
                      readOnly
                      className="w-full border border-[#D1D5DB] rounded-[12px] px-4 py-2.5 text-sm text-[#1A1A2E] font-mono bg-white" 
                    />
                    <button onClick={() => setApiKeyVisible(!apiKeyVisible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#1A1A2E]">
                      {apiKeyVisible ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>
                <button 
                  onClick={() => setConfirmKey(true)}
                  className="bg-[#FECACA] hover:bg-[#F87171] text-[#991B1B] px-5 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm shrink-0"
                >
                  Régénérer la clé
                </button>
              </div>
            </div>

            <ConfirmDialog 
              isOpen={confirmKey}
              title="Régénérer la clé API"
              description="Cette action est irréversible. L'ancienne clé API ne fonctionnera plus immédiatement après confirmation, ce qui peut interrompre la connectivité ERP temporairement."
              confirmText="Oui, régénérer"
              onConfirm={() => {
                setConfirmKey(false);
                toast.success("Nouvelle clé API générée.");
              }}
              onCancel={() => setConfirmKey(false)}
              isDestructive
            />
          </div>
        )}

        {activeItem === "apparence" && (
          <div className="p-8 max-w-2xl animate-in fade-in h-full overflow-y-auto">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Apparence</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Thème</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div 
                    onClick={() => { setAppTheme("Clair"); toast.success("Thème clair sélectionné"); }}
                    className={`cursor-pointer rounded-[16px] p-4 border-2 transition-all ${appTheme === 'Clair' ? 'border-[#7C5CFC] bg-[#F5F3FF]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'}`}
                  >
                    <div className="w-full h-24 bg-white border border-[#E5E7EB] rounded-[8px] shadow-sm flex flex-col p-2 gap-2 relative">
                      {appTheme === 'Clair' && <div className="absolute -top-3 -right-3 w-6 h-6 bg-[#7C5CFC] rounded-full text-white flex items-center justify-center"><Check className="w-3 h-3"/></div>}
                      <div className="h-3 w-full bg-[#F3F4F6] rounded-[4px]" />
                      <div className="flex gap-2 flex-1">
                        <div className="w-1/3 bg-[#F3F4F6] rounded-[4px]" />
                        <div className="flex-1 bg-[#F9FAFB] rounded-[4px] border border-[#E5E7EB]" />
                      </div>
                    </div>
                    <p className="text-center mt-3 font-semibold text-[#1A1A2E]">Clair</p>
                  </div>
                  
                  <div className="rounded-[16px] p-4 border-2 border-[#E5E7EB] opacity-50 cursor-not-allowed">
                    <div className="w-full h-24 bg-[#1A1A2E] border border-[#374151] rounded-[8px] shadow-sm flex flex-col p-2 gap-2 relative">
                      <div className="h-3 w-full bg-[#374151] rounded-[4px]" />
                      <div className="flex gap-2 flex-1">
                        <div className="w-1/3 bg-[#374151] rounded-[4px]" />
                        <div className="flex-1 bg-[#1F2937] rounded-[4px] border border-[#374151]" />
                      </div>
                    </div>
                    <p className="text-center mt-3 font-semibold text-[#1A1A2E]">Sombre <span className="text-[10px] bg-[#E5E7EB] text-[#6B7280] px-2 py-0.5 rounded-full ml-1">Bientôt</span></p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#1A1A2E] mb-4">Densité de l'interface</h3>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB] w-48 hover:border-[#C4B5F4] transition-colors">
                    <input type="radio" checked={appDensity === "Confortable"} onChange={() => { setAppDensity("Confortable"); toast.success("Densité modifiée : Confortable"); }} className="text-[#7C5CFC] focus:ring-[#C4B5F4] w-4 h-4"/>
                    <span className="text-sm font-medium text-[#1A1A2E]">Confortable</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer bg-[#F9FAFB] p-3 rounded-[12px] border border-[#E5E7EB] w-48 hover:border-[#C4B5F4] transition-colors">
                    <input type="radio" checked={appDensity === "Compact"} onChange={() => { setAppDensity("Compact"); toast.success("Densité modifiée : Compact"); }} className="text-[#7C5CFC] focus:ring-[#C4B5F4] w-4 h-4"/>
                    <span className="text-sm font-medium text-[#1A1A2E]">Compact</span>
                  </label>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={() => handleSave("Apparence sauvegardée avec succès")}
                  disabled={isSaving}
                  className="bg-[#7C5CFC] hover:bg-[#6a4de2] text-white px-6 py-2.5 rounded-[12px] text-sm font-bold transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4"/>} 
                  {isSaving ? "Appliquant..." : "Appliquer les préférences"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
