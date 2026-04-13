export interface ScheduleItem {
  time: string;
  icon: string;
  description: string;
  distributor: string;
  contactName?: string;
  color: string;
}

export interface PriorityTask {
  id: string;
  priority: 'red' | 'yellow' | 'green';
  description: string;
  distributor: string;
  contactName?: string;
  dueDate: string;
  isDone: boolean;
}

export interface FunnelStage {
  name: string;
  count: number;
  value: number;
  conversionRate?: number;
}

export interface HotOpportunity {
  id: string;
  name: string;
  distributor: string;
  value: number;
  score: number; // 1-3 flames
  probability: number;
  daysToClose: number;
}

export interface MonthlyObjective {
  label: string;
  current: number;
  target: number;
  color: string;
  unit: string;
}

export interface RiskDistributor {
  id: string;
  name: string;
  country: string;
  flag: string;
  reason: string;
  severity: 'critical' | 'warning';
  avatar?: string;
}

export interface RecentActivity {
  id: string;
  type: 'order' | 'note' | 'claim' | 'stage';
  description: string;
  distributor: string;
  contactName?: string;
  timestamp: string;
}

export interface BobbyAction {
  id: string;
  agent: string;
  description: string;
  timestamp: string;
}

export const dashboardData = {
  urgentActions: [
    { label: "3 relances en retard", color: "bg-[#FEE2E2] text-[#991B1B]", icon: "alert" },
    { label: "2 RDV aujourd'hui", color: "bg-[#F3F4FF] text-[#4338CA]", icon: "calendar" },
    { label: "5 devis sans réponse +7j", color: "bg-[#FFFBEB] text-[#92400E]", icon: "clock" }
  ],
  kpis: [
    { label: "Chiffre d'affaires", value: "2 847 320 €", trend: "+12%", icon: "euro" },
    { label: "Distributeurs actifs", value: "187", trend: "+2", icon: "users" },
    { label: "Valeur Pipeline", value: "847 000 €", trend: "+15%", icon: "funnel" },
    { label: "Réclamations", value: "7", trend: "-2", icon: "alert" },
    { label: "Rendez-vous ce mois", value: "14", trend: "+4", icon: "calendar" }
  ],
  schedule: [
    { time: "09h00", icon: "phone", description: "Appel de suivi Q2", distributor: "Nippon Dental", contactName: "Yuki Tanaka", color: "#7C5CFC" },
    { time: "11h30", icon: "monitor", description: "Démo produit gamme Protéger", distributor: "BioMed Solutions", contactName: "Markus Weber", color: "#3B82F6" },
    { time: "14h00", icon: "bot", description: "Relance devis CMD-1045 (Auto)", distributor: "Gulf Care", contactName: "Ahmed Al-Rashidi", color: "#E8C93A" },
    { time: "16h00", icon: "users", description: "Revue pipeline hebdo", distributor: "Équipe Interne", color: "#9CA3AF" }
  ] as ScheduleItem[],
  tasks: [
    { id: "T1", priority: "red", description: "Valider devis 48 200€", distributor: "American Dental", contactName: "James Mitchell", dueDate: "il y a 3j", isDone: false },
    { id: "T2", priority: "red", description: "Renouveler certification ISO", distributor: "Iberia Dent", contactName: "Carlos García López", dueDate: "dans 8j", isDone: false },
    { id: "T3", priority: "yellow", description: "Rappeler contact inactif", distributor: "Seoul MedTech", contactName: "Ji-Ho Park", dueDate: "Aujourd'hui", isDone: false },
    { id: "T4", priority: "green", description: "Vérifier stock Charlotte Chir.", distributor: "Charlotte Chir.", contactName: "Pierre Dubois", dueDate: "Demain", isDone: false }
  ] as PriorityTask[],
  funnel: [
    { name: "Prospection", count: 42, value: 120000, conversionRate: 72 },
    { name: "Qualification", count: 28, value: 350000, conversionRate: 45 },
    { name: "Proposition", count: 12, value: 847000, conversionRate: 30 },
    { name: "Négociation", count: 5, value: 420000, conversionRate: 60 },
    { name: "Bon de commande", count: 3, value: 150000 }
  ] as FunnelStage[],
  hotOpportunities: [
    { id: "O1", name: "Équipement clinique complète", distributor: "MedicalTech Group", value: 45000, score: 3, probability: 80, daysToClose: 4 },
    { id: "O2", name: "Renouvellement annuel consommables", distributor: "Gulf Care", value: 28000, score: 3, probability: 90, daysToClose: 2 },
    { id: "O3", name: "Nouveau marche APAC - Phase 1", distributor: "Nippon Dental", value: 120000, score: 2, probability: 40, daysToClose: 15 },
    { id: "O4", name: "Installation scanners 3D (x5)", distributor: "London Supplies", value: 75000, score: 2, probability: 65, daysToClose: 8 }
  ] as HotOpportunity[],
  objectives: [
    { label: "CA réalisé vs objectif", current: 2847320, target: 3200000, color: "#7C5CFC", unit: "€" },
    { label: "Nouvelles opportunités vs objectif", current: 8, target: 12, color: "#E8C93A", unit: "" }
  ] as MonthlyObjective[],
  salesReps: [
    { initials: "JD", name: "Jean Dupont", revenue: "420k€", deals: 12 },
    { initials: "ML", name: "Marie Laurent", revenue: "380k€", deals: 8 },
    { initials: "TB", name: "Thomas Bernard", revenue: "310k€", deals: 10 }
  ],
  riskDistributors: [
    { id: "D1", name: "MedicalTech Group", country: "DE", flag: "🇩🇪", reason: "Baisse CA -28%", severity: "critical" },
    { id: "D2", name: "Nordic Supplies", country: "SE", flag: "🇸🇪", reason: "Certification expirée", severity: "critical" },
    { id: "D3", name: "Gulf Care", country: "AE", flag: "🇦🇪", reason: "Impayé 30j", severity: "warning" },
    { id: "D4", name: "Iberia Dent", country: "ES", flag: "🇪🇸", reason: "Inactif 67j", severity: "warning" },
    { id: "D5", name: "Seoul MedTech", country: "KR", flag: "🇰🇷", reason: "Inactif 45j", severity: "warning" }
  ] as RiskDistributor[],
  recentActivity: [
    { id: "A1", type: "order", description: "Commande CMD-1045 créée", distributor: "MedicalTech Group", timestamp: "il y a 2h" },
    { id: "A2", type: "stage", description: "Opportunité passée en Négociation", distributor: "Gulf Care", timestamp: "il y a 4h" },
    { id: "A3", type: "claim", description: "Réclamation REC-042 ouverte", distributor: "Saude Brasil", timestamp: "il y a 5h" },
    { id: "A4", type: "note", description: "Note ajoutée : RDV démo validé", distributor: "London Supplies", timestamp: "il y a 6h" },
    { id: "A5", type: "order", description: "Facture payée CMD-1040", distributor: "Nippon Dental", timestamp: "il y a 1j" },
    { id: "A6", type: "stage", description: "Nouvelle prospection identifiée", distributor: "Iberia Dent", timestamp: "il y a 1j" }
  ] as RecentActivity[],
  bobbyToday: [
    { id: "B1", agent: "Relances", description: "Relance automatique envoyée (CMD-1045)", timestamp: "14:02" },
    { id: "B2", agent: "Qualité", description: "Pré-qualification réclamation REC-042", timestamp: "12:45" },
    { id: "B3", agent: "Reporting", description: "Génération rapport hebdo direction", timestamp: "09:00" },
    { id: "B4", agent: "SAV", description: "Ticket #8492 clos automatiquement", timestamp: "08:30" },
    { id: "B5", agent: "Relances", description: "Mise à jour statut inactif Seoul MedTech", timestamp: "Hier" }
  ] as BobbyAction[]
};
