export interface PipelineStage {
  id: string;
  name: string;
  color: string;
  description: string;
  maxDaysInStage?: number;
  probabilityDefault: number;
  order: number;
}

export const defaultStages: PipelineStage[] = [
  {
    id: "identifie",
    name: "Identifié",
    color: "#E9D5FF", // Purple 200
    description: "Prospect identifié via source externe ou inbound",
    maxDaysInStage: 7,
    probabilityDefault: 0,
    order: 0,
  },
  {
    id: "contacte",
    name: "Contacté",
    color: "#BAE6FD", // Blue 200
    description: "Premier contact établi (email, appel)",
    maxDaysInStage: 10,
    probabilityDefault: 10,
    order: 1,
  },
  {
    id: "qualifie",
    name: "Qualifié",
    color: "#FDE68A", // Amber 200
    description: "Besoin et budget confirmés",
    maxDaysInStage: 14,
    probabilityDefault: 30,
    order: 2,
  },
  {
    id: "proposition",
    name: "Proposition envoyée",
    color: "#FCA5A5", // Red 200
    description: "Offre commerciale en cours de lecture",
    maxDaysInStage: 21,
    probabilityDefault: 50,
    order: 3,
  },
  {
    id: "negociation",
    name: "Négociation",
    color: "#6EE7B7", // Emerald 300
    description: "Discussion sur les tarifs et conditions",
    maxDaysInStage: 30,
    probabilityDefault: 75,
    order: 4,
  },
  {
    id: "bc",
    name: "Bon de commande",
    color: "#A7F3D0", // Emerald 200
    description: "En attente de signature formelle",
    maxDaysInStage: 7,
    probabilityDefault: 90,
    order: 5,
  },
];
