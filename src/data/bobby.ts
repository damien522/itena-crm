export type AgentID = '01' | '02' | '03' | '04' | '05';

export interface AgentConfig {
  id: AgentID;
  name: string;
  mission: string;
  colorStart: string;
  colorEnd: string;
  isActive: boolean;
  stats: {
    hoursSavedThisWeek: number;
    actionsThisMonth: number;
    lastActionAt: string;
  };
  recentActivity: string[]; // 3 recent short descriptions
}

export const bobbyAgents: AgentConfig[] = [
  {
    id: "01",
    name: "Relances Distributeurs",
    mission: "Gère les rappels de paiement et relances inactifs",
    colorStart: "#7C5CFC",
    colorEnd: "#6366F1",
    isActive: true,
    stats: { hoursSavedThisWeek: 4.5, actionsThisMonth: 145, lastActionAt: "2026-04-11T13:42:00Z" },
    recentActivity: [
      "Relance automatique payement envoyé à D-004",
      "Notification d'inactivité générée pour D-012",
      "Rappel de renouvellement de contrat D-018"
    ]
  },
  {
    id: "02",
    name: "Reporting et Synthèses",
    mission: "Analyse les ventes et génère les rapports auto",
    colorStart: "#E8C93A",
    colorEnd: "#F59E0B",
    isActive: true,
    stats: { hoursSavedThisWeek: 6.0, actionsThisMonth: 42, lastActionAt: "2026-04-10T08:00:00Z" },
    recentActivity: [
      "Génération du rapport hebdomadaire des ventes APAC",
      "Synthèse mensuelle préparée pour la direction",
      "Alerte de baisse de CA générée pour la région EMEA"
    ]
  },
  {
    id: "03",
    name: "Qualité et Réclamations",
    mission: "Trie et pré-qualifie les tickets QS",
    colorStart: "#38BDF8",
    colorEnd: "#0D9488",
    isActive: true,
    stats: { hoursSavedThisWeek: 2.2, actionsThisMonth: 89, lastActionAt: "2026-04-11T15:10:00Z" },
    recentActivity: [
      "Réclamation REC-2026-041 pré-qualifiée comme 'Haute'",
      "Création auto d'une fiche d'incident qualité lot LT-2602-B4",
      "Alerte de récurrence sur les retards de livraison détectée"
    ]
  },
  {
    id: "04",
    name: "Préparation RDV",
    mission: "Compile les fiches de préparation pour commerciaux",
    colorStart: "#34D399",
    colorEnd: "#059669",
    isActive: false,
    stats: { hoursSavedThisWeek: 0, actionsThisMonth: 12, lastActionAt: "2026-04-05T09:00:00Z" },
    recentActivity: [
      "Fiche préparatoire RDV générée pour D-003",
      "Historique compilé pré-visite médicale D-010"
    ]
  },
  {
    id: "05",
    name: "SAV",
    mission: "Assiste la résolution technique premier niveau",
    colorStart: "#F472B6",
    colorEnd: "#E11D48",
    isActive: true,
    stats: { hoursSavedThisWeek: 1.3, actionsThisMonth: 59, lastActionAt: "2026-04-11T16:05:00Z" },
    recentActivity: [
      "Ticket SAV #8492 résolu automatiquement",
      "Envoi du manuel technique lot RM-01 à D-007",
      "Proposition de remplacement envoyée"
    ]
  }
];

export interface BobbyLog {
  id: string;
  agentId: AgentID;
  agentName: string;
  description: string;
  targetDistributor?: {
    id: string;
    name: string;
  };
  timestamp: string;
}

// Générer 50 logs réalistes
export const bobbyLogs: BobbyLog[] = Array.from({ length: 50 }).map((_, index) => {
  const agentIndex = index % 5;
  const agent = bobbyAgents[agentIndex];
  
  // Date recedant gradually 
  const dateObj = new Date("2026-04-11T16:00:00Z");
  dateObj.setHours(dateObj.getHours() - (index * 2));
  
  const distributors = [
    { id: "D-001", name: "MedicalTech Group" },
    { id: "D-005", name: "American Dental Dist." },
    { id: "D-013", name: "London Dental Supplies" },
    { id: "D-003", name: "Nippon Dental Supplies" }
  ];
  const target = index % 3 === 0 ? distributors[index % distributors.length] : undefined;
  
  const actions = [
    "Analyse prédictive de stock faible déclenchée",
    "Relance automatique de facture impayée envoyée",
    "Qualification automatique de l'incident enregistrée",
    "Rapport croisé de performance généré et archivé",
    "Ticket de support technique fermé sans intervention humaine"
  ];

  return {
    id: `LOG-2026-${5000 - index}`,
    agentId: agent.id,
    agentName: agent.name,
    description: target ? `${actions[agentIndex]} pour ${target.name}` : actions[agentIndex],
    targetDistributor: target,
    timestamp: dateObj.toISOString()
  };
});
