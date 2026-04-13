export type AutomationStatus = "Actif" | "Inactif";
export type TriggerCategory = "Pipeline" | "Distributeurs" | "Contacts" | "Commandes" | "Réclamations" | "Système";

export interface AutomationTrigger {
  category: TriggerCategory;
  event: string;
  config: Record<string, any>;
}

export interface AutomationCondition {
  field: string;
  operator: "est" | "n'est pas" | "est supérieur à" | "est inférieur à" | "contient" | "ne contient pas";
  value: any;
}

export interface AutomationAction {
  type: string;
  config: Record<string, any>;
  delayMinutes?: number;
}

export interface AutomationExecution {
  timestamp: string;
  recordName: string;
  conditionsPassed: boolean;
  status: "Success" | "Failure";
  results: string[];
}

export interface Automation {
  id: string;
  name: string;
  status: AutomationStatus;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[];
  conditionLogic: "AND" | "OR";
  actions: AutomationAction[];
  triggerCount: number;
  lastTriggered: string | null;
  createdBy: string;
  createdAt: string;
  executionHistory: AutomationExecution[];
}

export const mockAutomations: Automation[] = [
  {
    id: "auto-001",
    name: "Alerte deal chaud",
    status: "Actif",
    trigger: {
      category: "Pipeline",
      event: "Probabilité > 70%",
      config: { threshold: 70 }
    },
    conditions: [
      { field: "Valeur", operator: "est supérieur à", value: 20000 }
    ],
    conditionLogic: "AND",
    actions: [
      { type: "notification_interne", config: { recipient: "Commercial Assigné", message: "Le deal {{deal.name}} est chaud ! Probabilité: {{deal.probability}}%" } }
    ],
    triggerCount: 12,
    lastTriggered: "2026-04-11T14:30:00Z",
    createdBy: "Marie Dupont",
    createdAt: "2026-03-01T08:00:00Z",
    executionHistory: [
      { timestamp: "2026-04-11T14:30:00Z", recordName: "Expansion BioMed", conditionsPassed: true, status: "Success", results: ["Notif envoyée à Lucas Bernard"] }
    ]
  },
  {
    id: "auto-002",
    name: "Relance proposition",
    status: "Actif",
    trigger: {
      category: "Pipeline",
      event: "Inactivité en étape Proposition > 7j",
      config: { days: 7, stage: "proposition" }
    },
    conditions: [],
    conditionLogic: "AND",
    actions: [
      { type: "creer_tache", config: { title: "Relancer proposition {{deal.name}}", assignedTo: "Commercial Assigné", dueDate: "Relative +1j" } }
    ],
    triggerCount: 45,
    lastTriggered: "2026-04-10T09:00:00Z",
    createdBy: "Système",
    createdAt: "2026-03-05T10:00:00Z",
    executionHistory: []
  },
  {
    id: "auto-003",
    name: "Bienvenue nouveau prospect",
    status: "Actif",
    trigger: {
      category: "Pipeline",
      event: "Nouveau deal créé",
      config: { stage: "identifie" }
    },
    conditions: [],
    conditionLogic: "AND",
    actions: [
      { type: "envoyer_email", config: { recipient: "Contact principal", template: "Bienvenue Itena", subject: "Bienvenue chez Itena Clinical" } }
    ],
    triggerCount: 8,
    lastTriggered: "2026-04-12T08:15:00Z",
    createdBy: "Lucas Bernard",
    createdAt: "2026-03-10T09:00:00Z",
    executionHistory: []
  },
  {
    id: "auto-004",
    name: "Certification expirante",
    status: "Actif",
    trigger: {
      category: "Distributeurs",
      event: "Certification expirante < 30j",
      config: { days: 30 }
    },
    conditions: [],
    conditionLogic: "AND",
    actions: [
      { type: "notifier_bobby", config: { agent: "Bobby Qualité", instruction: "Vérifier la certification de {{distributeur.name}}" } },
      { type: "creer_tache", config: { title: "Renouveler certif: {{distributeur.name}}", assignedTo: "Marie Dupont", dueDate: "Fixed" } }
    ],
    triggerCount: 3,
    lastTriggered: "2026-04-05T11:00:00Z",
    createdBy: "Système",
    createdAt: "2026-03-15T12:00:00Z",
    executionHistory: []
  },
  {
    id: "auto-005",
    name: "Conversion distributor",
    status: "Actif",
    trigger: {
      category: "Pipeline",
      event: "Deal marqué Gagné",
      config: {}
    },
    conditions: [
      { field: "Company Type", operator: "est", value: "prospect" }
    ],
    conditionLogic: "AND",
    actions: [
      { type: "notification_interne", config: { recipient: "Admin", message: "Le prospect {{company.name}} a gagné un deal. Proposer conversion." } }
    ],
    triggerCount: 5,
    lastTriggered: "2026-04-11T16:00:00Z",
    createdBy: "Thomas Bernard",
    createdAt: "2026-03-20T14:00:00Z",
    executionHistory: []
  }
];
