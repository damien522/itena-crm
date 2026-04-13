export type ClaimSeverity = 'Critique' | 'Haute' | 'Normale' | 'Basse';
export type ClaimStatus = 'Ouverte' | 'En cours' | 'Résolue';
export type ClaimType = 'Qualité Produit' | 'Livraison' | 'Erreur Commande' | 'Commercial' | 'Autre';

export interface Claim {
  id: string; // monospace ref
  distributorId: string;
  distributorName: string;
  type: ClaimType;
  severity: ClaimSeverity;
  assignedTo: {
    name: string;
    avatar: string; // initials
  };
  status: ClaimStatus;
  openedAt: string;
  isBobbyResolved?: boolean;
}

export const reclamations: Claim[] = [
  { id: "REC-2026-042", distributorId: "D-004", distributorName: "Saude Brasil Medical", type: "Livraison", severity: "Critique", assignedTo: { name: "Marc T.", avatar: "MT" }, status: "Ouverte", openedAt: "2026-04-10T09:12:00Z" },
  { id: "REC-2026-041", distributorId: "D-002", distributorName: "Berlin Medizintechnik", type: "Qualité Produit", severity: "Haute", assignedTo: { name: "Sophie L.", avatar: "SL" }, status: "En cours", openedAt: "2026-04-09T14:30:00Z" },
  { id: "REC-2026-040", distributorId: "D-002", distributorName: "Berlin Medizintechnik", type: "Erreur Commande", severity: "Normale", assignedTo: { name: "Bobby IA", avatar: "🤖" }, status: "Résolue", openedAt: "2026-04-08T10:15:00Z", isBobbyResolved: true },
  { id: "REC-2026-039", distributorId: "D-009", distributorName: "Aussie Dental Pros", type: "Commercial", severity: "Normale", assignedTo: { name: "Jean D.", avatar: "JD" }, status: "Ouverte", openedAt: "2026-04-08T08:45:00Z" },
  { id: "REC-2026-038", distributorId: "D-016", distributorName: "SA Medical Co.", type: "Qualité Produit", severity: "Haute", assignedTo: { name: "Sophie L.", avatar: "SL" }, status: "En cours", openedAt: "2026-04-07T16:20:00Z" },
  { id: "REC-2026-037", distributorId: "D-012", distributorName: "Salud Mex", type: "Livraison", severity: "Normale", assignedTo: { name: "Bobby IA", avatar: "🤖" }, status: "Résolue", openedAt: "2026-04-06T11:10:00Z", isBobbyResolved: true },
  { id: "REC-2026-036", distributorId: "D-017", distributorName: "Mumbai Dentists Hub", type: "Erreur Commande", severity: "Basse", assignedTo: { name: "Bobby IA", avatar: "🤖" }, status: "Résolue", openedAt: "2026-04-05T09:30:00Z", isBobbyResolved: true },
  { id: "REC-2026-035", distributorId: "D-005", distributorName: "American Dental Dist.", type: "Qualité Produit", severity: "Haute", assignedTo: { name: "Sophie L.", avatar: "SL" }, status: "En cours", openedAt: "2026-04-04T13:45:00Z" },
  { id: "REC-2026-034", distributorId: "D-017", distributorName: "Mumbai Dentists Hub", type: "Livraison", severity: "Normale", assignedTo: { name: "Marc T.", avatar: "MT" }, status: "Résolue", openedAt: "2026-04-03T10:00:00Z" },
  { id: "REC-2026-033", distributorId: "D-004", distributorName: "Saude Brasil Medical", type: "Erreur Commande", severity: "Basse", assignedTo: { name: "Bobby IA", avatar: "🤖" }, status: "Résolue", openedAt: "2026-04-02T15:20:00Z", isBobbyResolved: true },
  { id: "REC-2026-032", distributorId: "D-001", distributorName: "MedicalTech Group", type: "Commercial", severity: "Normale", assignedTo: { name: "Jean D.", avatar: "JD" }, status: "Résolue", openedAt: "2026-04-01T08:15:00Z" },
  { id: "REC-2026-031", distributorId: "D-020", distributorName: "Thai Smile Dental", type: "Livraison", severity: "Basse", assignedTo: { name: "Bobby IA", avatar: "🤖" }, status: "Résolue", openedAt: "2026-03-30T14:10:00Z", isBobbyResolved: true },
  { id: "REC-2026-030", distributorId: "D-013", distributorName: "London Dental Supplies", type: "Qualité Produit", severity: "Normale", assignedTo: { name: "Sophie L.", avatar: "SL" }, status: "Résolue", openedAt: "2026-03-25T11:45:00Z" },
  { id: "REC-2026-029", distributorId: "D-006", distributorName: "Iberia Dent", type: "Autre", severity: "Basse", assignedTo: { name: "Marc T.", avatar: "MT" }, status: "Résolue", openedAt: "2026-03-20T09:30:00Z" },
  { id: "REC-2026-028", distributorId: "D-008", distributorName: "Gulf Care", type: "Erreur Commande", severity: "Normale", assignedTo: { name: "Bobby IA", avatar: "🤖" }, status: "Résolue", openedAt: "2026-03-15T16:00:00Z", isBobbyResolved: true }
];
