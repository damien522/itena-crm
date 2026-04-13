import { defaultStages, PipelineStage } from "./pipelineStages";
import { contacts } from "./contacts";
import { prospects } from "./prospects";

export type DealStatus = "Actif" | "Gagné" | "Perdu" | "Abandonné";
export type DealPriority = "Haute" | "Normale" | "Basse";

export interface DealInteraction {
  id: string;
  type: "Appel" | "Email" | "Réunion" | "Note" | "Tâche" | "Changement d'étape";
  date: string;
  author: string;
  authorAvatar: string;
  content: string;
  duration?: number; // minutes
  contactName?: string;
  outcome?: "Positif" | "Neutre" | "Pas répondu" | "Rappel demandé";
  location?: string;
  attendees?: { name: string; avatar: string }[];
}

export interface DealEmailMessage {
  id: string;
  sender: { name: string; email: string; avatar: string };
  date: string;
  body: string;
}

export interface DealEmailThread {
  id: string;
  subject: string;
  lastDate: string;
  isUnread: boolean;
  messages: DealEmailMessage[];
}

export interface DealTask {
  id: string;
  title: string;
  assignedTo: string;
  assignedToAvatar: string;
  dueDate: string;
  priority: "Haute" | "Normale" | "Basse";
  status: "En cours" | "Complétée";
}

export interface DealDocument {
  id: string;
  name: string;
  type: "pdf" | "docx" | "xlsx" | "pptx" | "image";
  size: string;
  uploadedBy: string;
  uploadedByAvatar: string;
  date: string;
  category: "Propositions" | "Contrats" | "Présentations" | "Devis" | "Autres";
}

export interface DealHistoryEntry {
  id: string;
  timestamp: string;
  user: string;
  userAvatar: string;
  action: string;
  detail: string;
}

export interface Deal {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyFlag: string;
  companyType: "distributeur" | "prospect";
  contactId: string;
  contactName: string;
  stageId: string; // Refers to PipelineStage id
  value: number;
  probability: number;
  assignedTo: {
    name: string;
    avatar: string;
  };
  openDate: string;
  expectedClose: string;
  source: string;
  productFamilyInterest: string[];
  interactions: DealInteraction[];
  emails: DealEmailThread[];
  tasks: DealTask[];
  documents: DealDocument[];
  history: DealHistoryEntry[];
  status: DealStatus;
  priority: DealPriority;
  tags: string[];
  notes: string;
  lastActivityDate: string;
}

// Map current stages to IDs
const stageMap: Record<string, string> = {
  "Prospection": "identifie",
  "Qualification": "qualifie",
  "Proposition": "proposition",
  "Négociation": "negociation",
  "Commande": "bc",
  "Gagné": "bc", // Mapping won to last stage
  "Identifié": "identifie",
  "Contacté": "contacte",
  "Qualifié": "qualifie",
  "En négociation": "negociation",
  "Converti": "bc"
};

const generateRichMockData = (dealId: string, companyName: string, commercialName: string, commercialAvatar: string): Partial<Deal> => {
  const today = new Date("2026-04-12T12:00:00Z");
  
  const interactions: DealInteraction[] = [
    {
      id: `int-${dealId}-1`,
      type: "Appel",
      date: new Date(today.getTime() - 2 * 86400000).toISOString(),
      author: commercialName,
      authorAvatar: commercialAvatar,
      content: "Échange sur les spécifications techniques. Le client confirme son intérêt pour la gamme Protéger.",
      duration: 15,
      contactName: "Yuki Tanaka",
      outcome: "Positif"
    },
    {
      id: `int-${dealId}-2`,
      type: "Email",
      date: new Date(today.getTime() - 5 * 86400000).toISOString(),
      author: commercialName,
      authorAvatar: commercialAvatar,
      content: "Envoi du devis révisé avec la remise de 5% discutée hier."
    },
    {
      id: `int-${dealId}-3`,
      type: "Réunion",
      date: new Date(today.getTime() - 8 * 86400000).toISOString(),
      author: commercialName,
      authorAvatar: commercialAvatar,
      content: "Présentation de la solution à l'équipe technique.",
      location: "Zoom",
      attendees: [{ name: "Yuki Tanaka", avatar: "YT" }, { name: "Haruki Sato", avatar: "HS" }]
    },
    {
      id: `int-${dealId}-4`,
      type: "Note",
      date: new Date(today.getTime() - 10 * 86400000).toISOString(),
      author: commercialName,
      authorAvatar: commercialAvatar,
      content: "Attention : le concurrent direct propose une livraison sous 48h. Nous devons confirmer nos délais."
    },
    {
      id: `int-${dealId}-5`,
      type: "Tâche",
      date: new Date(today.getTime() - 1 * 86400000).toISOString(),
      author: commercialName,
      authorAvatar: commercialAvatar,
      content: "Préparer le contrat final."
    },
    {
      id: `int-${dealId}-6`,
      type: "Changement d'étape",
      date: new Date(today.getTime() - 4 * 86400000).toISOString(),
      author: commercialName,
      authorAvatar: commercialAvatar,
      content: "Passage de Qualification à Proposition."
    },
    {
      id: `int-${dealId}-7`,
      type: "Appel",
      date: new Date(today.getTime() - 12 * 86400000).toISOString(),
      author: "Marie Dupont",
      authorAvatar: "MD",
      content: "Pas de réponse, laissé un message sur le répondeur.",
      outcome: "Pas répondu"
    },
    {
      id: `int-${dealId}-8`,
      type: "Note",
      date: new Date(today.getTime() - 15 * 86400000).toISOString(),
      author: commercialName,
      authorAvatar: commercialAvatar,
      content: "Le client a un budget de 50k€ pour ce projet."
    }
  ];

  const emails: DealEmailThread[] = [
    {
      id: `eth-${dealId}-1`,
      subject: "Présentation de notre gamme Protéger",
      lastDate: new Date(today.getTime() - 3 * 86400000).toISOString(),
      isUnread: false,
      messages: [
        {
          id: `msg-${dealId}-1-1`,
          sender: { name: commercialName, email: "commercial@itena.fr", avatar: commercialAvatar },
          date: new Date(today.getTime() - 5 * 86400000).toISOString(),
          body: "Bonjour, comme convenu je vous envoie la présentation de nos nouveaux produits."
        },
        {
          id: `msg-${dealId}-1-2`,
          sender: { name: "Yuki Tanaka", email: "y.tanaka@company.com", avatar: "YT" },
          date: new Date(today.getTime() - 4 * 86400000).toISOString(),
          body: "Merci beaucoup. Pouvez-vous me préciser les délais de livraison pour le Japon ?"
        },
        {
          id: `msg-${dealId}-1-3`,
          sender: { name: commercialName, email: "commercial@itena.fr", avatar: commercialAvatar },
          date: new Date(today.getTime() - 3 * 86400000).toISOString(),
          body: "Bien sûr, nous livrons en 7-10 jours ouvrés via DHL Express."
        }
      ]
    },
    {
      id: `eth-${dealId}-2`,
      subject: "Devis CMD-2026-0422",
      lastDate: new Date(today.getTime() - 1 * 86400000).toISOString(),
      isUnread: true,
      messages: [
        {
          id: `msg-${dealId}-2-1`,
          sender: { name: commercialName, email: "commercial@itena.fr", avatar: commercialAvatar },
          date: new Date(today.getTime() - 1 * 86400000).toISOString(),
          body: "Veuillez trouver ci-joint le devis pour votre commande de Q2."
        }
      ]
    },
    {
      id: `eth-${dealId}-3`,
      subject: "Confirmation de rendez-vous",
      lastDate: new Date(today.getTime() - 10 * 86400000).toISOString(),
      isUnread: false,
      messages: [
        {
          id: `msg-${dealId}-3-1`,
          sender: { name: commercialName, email: "commercial@itena.fr", avatar: commercialAvatar },
          date: new Date(today.getTime() - 10 * 86400000).toISOString(),
          body: "C'est noté pour mardi prochain à 14h."
        }
      ]
    }
  ];

  const tasks: DealTask[] = [
    { id: `tsk-${dealId}-1`, title: "Envoyer échantillon produit", assignedTo: commercialName, assignedToAvatar: commercialAvatar, dueDate: new Date(today.getTime() + 2 * 86400000).toISOString(), priority: "Haute", status: "En cours" },
    { id: `tsk-${dealId}-2`, title: "Relance téléphonique", assignedTo: commercialName, assignedToAvatar: commercialAvatar, dueDate: new Date(today.getTime() - 1 * 86400000).toISOString(), priority: "Normale", status: "En cours" },
    { id: `tsk-${dealId}-3`, title: "Valider conditions export", assignedTo: "Marie Dupont", assignedToAvatar: "MD", dueDate: new Date(today.getTime() + 5 * 86400000).toISOString(), priority: "Haute", status: "En cours" },
    { id: `tsk-${dealId}-4`, title: "Vérifier solvabilité", assignedTo: "Système", assignedToAvatar: "S", dueDate: new Date(today.getTime() - 10 * 86400000).toISOString(), priority: "Basse", status: "Complétée" },
    { id: `tsk-${dealId}-5`, title: "Premier appel de contact", assignedTo: commercialName, assignedToAvatar: commercialAvatar, dueDate: new Date(today.getTime() - 20 * 86400000).toISOString(), priority: "Normale", status: "Complétée" }
  ];

  const documents: DealDocument[] = [
    { id: `doc-${dealId}-1`, name: "Proposition_Commerciale_V2.pdf", type: "pdf", size: "1.2 MB", uploadedBy: commercialName, uploadedByAvatar: commercialAvatar, date: new Date(today.getTime() - 5 * 86400000).toISOString(), category: "Propositions" },
    { id: `doc-${dealId}-2`, name: "Présentation_Gamme_Itena.pptx", type: "pptx", size: "4.5 MB", uploadedBy: commercialName, uploadedByAvatar: commercialAvatar, date: new Date(today.getTime() - 15 * 86400000).toISOString(), category: "Présentations" },
    { id: `doc-${dealId}-3`, name: "Calcul_ROI_Client.xlsx", type: "xlsx", size: "850 KB", uploadedBy: commercialName, uploadedByAvatar: commercialAvatar, date: new Date(today.getTime() - 2 * 86400000).toISOString(), category: "Devis" },
    { id: `doc-${dealId}-4`, name: "NDA_Signe_BioMed.pdf", type: "pdf", size: "2.1 MB", uploadedBy: "Marie Dupont", uploadedByAvatar: "MD", date: new Date(today.getTime() - 25 * 86400000).toISOString(), category: "Contrats" }
  ];

  const history: DealHistoryEntry[] = [
    { id: `hist-${dealId}-1`, timestamp: today.toISOString(), user: commercialName, userAvatar: commercialAvatar, action: "Edition", detail: "Changement de la valeur: 45k€ -> 52k€" },
    { id: `hist-${dealId}-2`, timestamp: new Date(today.getTime() - 1 * 86400000).toISOString(), user: "Système", userAvatar: "S", action: "Automatisation", detail: "Tâche de relance créée automatiquement" },
    { id: `hist-${dealId}-3`, timestamp: new Date(today.getTime() - 4 * 86400000).toISOString(), user: commercialName, userAvatar: commercialAvatar, action: "Stage", detail: "Passage à 'Proposition envoyée'" },
    { id: `hist-${dealId}-4`, timestamp: new Date(today.getTime() - 10 * 86400000).toISOString(), user: commercialName, userAvatar: commercialAvatar, action: "Contact", detail: "Modification du contact principal: Yuki Tanaka" },
    { id: `hist-${dealId}-5`, timestamp: new Date(today.getTime() - 15 * 86400000).toISOString(), user: "Marie Dupont", userAvatar: "MD", action: "Document", detail: "Upload de 'NDA_Signe_BioMed.pdf'" },
    { id: `hist-${dealId}-6`, timestamp: new Date(today.getTime() - 15 * 86400000).toISOString(), user: commercialName, userAvatar: commercialAvatar, action: "Edition", detail: "Mise à jour de la probabilité: 30% -> 50%" },
    { id: `hist-${dealId}-7`, timestamp: new Date(today.getTime() - 20 * 86400000).toISOString(), user: commercialName, userAvatar: commercialAvatar, action: "Creation", detail: "Deal créé depuis le prospect BioMed Solutions" },
    { id: `hist-${dealId}-8`, timestamp: new Date(today.getTime() - 2 * 86400000).toISOString(), user: commercialName, userAvatar: commercialAvatar, action: "Edition", detail: "Tags ajoutés: 'Prioritaire', 'Export'" },
    { id: `hist-${dealId}-9`, timestamp: new Date(today.getTime() - 6 * 86400000).toISOString(), user: commercialName, userAvatar: commercialAvatar, action: "Edition", detail: "Fermeture prévue décalée au 15/05/2026" },
    { id: `hist-${dealId}-10`, timestamp: new Date(today.getTime() - 12 * 86400000).toISOString(), user: "Marie Dupont", userAvatar: "MD", action: "Note", detail: "Note ajoutée sur les concurrents" }
  ];

  return {
    interactions,
    emails,
    tasks,
    documents,
    history,
    tags: ["Prioritaire", "Export", "VIP"],
    priority: "Haute",
    notes: `### Contexte Client
Le client est en pleine phase d'expansion vers le marché européen. Ils cherchent des solutions de protection premium pour leurs nouvelles cliniques.

### Besoins Spécifiques
- Livraison rapide (sous 10 jours)
- Certification CE complète pour toute la gamme
- Formation technique pour le personnel local

### Points de Vigilance
La concurrence est agressive sur les prix, mais notre qualité de fabrication française est un atout majeur.`
  };
};

const generateUnifiedDeals = (): Deal[] => {
  const deals: Deal[] = [];
  const today = new Date("2026-04-12T12:00:00Z");

  // 1. Convert existing Opportunities to Deals
  contacts.forEach((contact, index) => {
    if (contact.linkedOpportunities.length > 0) {
      contact.linkedOpportunities.forEach((oppId, oppIndex) => {
         const stagesRaw = ["Prospection", "Qualification", "Proposition", "Négociation", "Commande", "Gagné"];
         const currentRawStage = stagesRaw[(index + oppIndex) % stagesRaw.length];
         
         const deal: Deal = {
           id: oppId,
           title: index % 3 === 0 ? `Expansion gamme Protéger - ${contact.companyName}` : `Équipement clinique pilote - ${contact.city}`,
           companyId: contact.companyId,
           companyName: contact.companyName,
           companyFlag: contact.flag,
           companyType: contact.companyType,
           contactId: contact.id,
           contactName: `${contact.firstName} ${contact.lastName}`,
           stageId: stageMap[currentRawStage] || "identifie",
           value: 15000 + ((index * 1234) % 85000),
           probability: 50,
           assignedTo: {
             name: contact.assignedTo,
             avatar: contact.assignedToAvatar,
           },
           openDate: new Date(today.getTime() - ((index * 86400000) % (86400000 * 60))).toISOString(),
           expectedClose: new Date(today.getTime() + ((index * 86400000) % (86400000 * 30))).toISOString(),
           source: "Inbound",
           productFamilyInterest: ["Protéger", "Préserver"],
           status: currentRawStage === "Gagné" ? "Gagné" : "Actif",
           notes: "",
           lastActivityDate: today.toISOString(),
           interactions: [],
           emails: [],
           tasks: [],
           documents: [],
           history: [],
           tags: [],
           priority: "Normale"
         };

         // Enrich with mock data
         const rich = generateRichMockData(deal.id, deal.companyName, deal.assignedTo.name, deal.assignedTo.avatar);
         Object.assign(deal, rich);

         deals.push(deal);
      });
    }
  });

  // 2. Convert existing Prospects to Deals
  prospects.forEach(p => {
    const dealId = `DEAL-P-${p.id}`;
    const deal: Deal = {
      id: dealId,
      title: `Prospection initiale: ${p.companyName}`,
      companyId: p.id,
      companyName: p.companyName,
      companyFlag: p.flag,
      companyType: "prospect",
      contactId: p.contactIds[0] || "",
      contactName: "Contact Principal", 
      stageId: stageMap[p.stage] || "identifie",
      value: p.estimatedRevenue || 50000,
      probability: p.stage === "Qualifié" ? 30 : p.stage === "En négociation" ? 75 : 10,
      assignedTo: {
        name: p.assignedTo,
        avatar: p.assignedToAvatar,
      },
      openDate: p.firstContactDate,
      expectedClose: new Date(today.getTime() + ((p.id.length * 86400000) % (86400000 * 45))).toISOString(),
      source: p.source,
      productFamilyInterest: p.productsOfInterest,
      status: p.stage === "Converti" ? "Gagné" : "Actif",
      notes: "",
      lastActivityDate: p.lastActivityDate,
      interactions: [],
      emails: [],
      tasks: [],
      documents: [],
      history: [],
      tags: [],
      priority: "Normale"
    };

    // Enrich with mock data
    const rich = generateRichMockData(deal.id, deal.companyName, deal.assignedTo.name, deal.assignedTo.avatar);
    Object.assign(deal, rich);
    
    // Override interactions from prospect data if available
    if (p.interactions.length > 0) {
      deal.interactions = p.interactions.map(pi => ({
        id: pi.id,
        type: pi.type as any,
        date: pi.date,
        author: pi.loggedBy,
        authorAvatar: pi.loggedBy.split(' ').map(n => n[0]).join(''),
        content: pi.description
      }));
    }

    deals.push(deal);
  });

  return deals;
};

export const pipelineData: Deal[] = generateUnifiedDeals();
