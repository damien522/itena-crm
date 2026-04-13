export type OrderStatus = 'Devis' | 'Validée' | 'En Préparation' | 'Expédiée' | 'Livrée';

export interface Order {
  id: string; // monospace ref
  distributorId: string;
  distributorName: string;
  flag: string;
  products: string[]; // tag pills
  amount: number;
  status: OrderStatus;
  date: string;
  isOverdue?: boolean;
}

export const commandes: Order[] = [
  { id: "CMD-2026-1045", distributorId: "D-001", distributorName: "MedicalTech Group", flag: "🇫🇷", products: ["Protéger", "Préserver"], amount: 15400, status: "Devis", date: "2026-04-10" },
  { id: "CMD-2026-1044", distributorId: "D-005", distributorName: "American Dental Dist.", flag: "🇺🇸", products: ["Remplacer", "Instruments"], amount: 48200, status: "Validée", date: "2026-04-09", isOverdue: true },
  { id: "CMD-2026-1043", distributorId: "D-013", distributorName: "London Dental Supplies", flag: "🇬🇧", products: ["Prendre Soin"], amount: 9500, status: "En Préparation", date: "2026-04-08" },
  { id: "CMD-2026-1042", distributorId: "D-011", distributorName: "Seoul MedTech", flag: "🇰🇷", products: ["Protéger", "Remplacer"], amount: 22100, status: "Expédiée", date: "2026-04-07" },
  { id: "CMD-2026-1041", distributorId: "D-003", distributorName: "Nippon Dental Supplies", flag: "🇯🇵", products: ["Préserver", "Prendre Soin"], amount: 31000, status: "Devis", date: "2026-04-06" },
  { id: "CMD-2026-1040", distributorId: "D-017", distributorName: "Mumbai Dentists Hub", flag: "🇮🇳", products: ["Remplacer"], amount: 14500, status: "Validée", date: "2026-04-05" },
  { id: "CMD-2026-1039", distributorId: "D-008", distributorName: "Gulf Care", flag: "🇦🇪", products: ["Protéger", "Instruments"], amount: 26800, status: "En Préparation", date: "2026-04-04" },
  { id: "CMD-2026-1038", distributorId: "D-020", distributorName: "Thai Smile Dental", flag: "🇹🇭", products: ["Préserver"], amount: 7200, status: "Livrée", date: "2026-04-03" },
  { id: "CMD-2026-1037", distributorId: "D-007", distributorName: "Milano Medical", flag: "🇮🇹", products: ["Remplacer", "Protéger"], amount: 18900, status: "Expédiée", date: "2026-04-02" },
  { id: "CMD-2026-1036", distributorId: "D-010", distributorName: "Maple Leaf Medical", flag: "🇨🇦", products: ["Prendre Soin"], amount: 11400, status: "Validée", date: "2026-04-01" },
  { id: "CMD-2026-1035", distributorId: "D-015", distributorName: "Nordic Health", flag: "🇸🇪", products: ["Protéger"], amount: 8500, status: "Livrée", date: "2026-04-01" },
  { id: "CMD-2026-1034", distributorId: "D-005", distributorName: "American Dental Dist.", flag: "🇺🇸", products: ["Remplacer"], amount: 55000, status: "Devis", date: "2026-03-31" },
  { id: "CMD-2026-1033", distributorId: "D-008", distributorName: "Gulf Care", flag: "🇦🇪", products: ["Préserver", "Prendre Soin"], amount: 19200, status: "En Préparation", date: "2026-03-30" },
  { id: "CMD-2026-1032", distributorId: "D-019", distributorName: "Istanbul Dış Ticaret", flag: "🇹🇷", products: ["Protéger"], amount: 6700, status: "Expédiée", date: "2026-03-29" },
  { id: "CMD-2026-1031", distributorId: "D-013", distributorName: "London Dental Supplies", flag: "🇬🇧", products: ["Remplacer"], amount: 24500, status: "Livrée", date: "2026-03-28" },
  { id: "CMD-2026-1030", distributorId: "D-001", distributorName: "MedicalTech Group", flag: "🇫🇷", products: ["Prendre Soin"], amount: 12100, status: "Livrée", date: "2026-03-27" },
  { id: "CMD-2026-1029", distributorId: "D-002", distributorName: "Berlin Medizintechnik", flag: "🇩🇪", products: ["Protéger", "Remplacer"], amount: 33400, status: "Devis", date: "2026-03-25" },
  { id: "CMD-2026-1028", distributorId: "D-014", distributorName: "Swiss MedCare", flag: "🇨🇭", products: ["Préserver"], amount: 8900, status: "En Préparation", date: "2026-03-20" },
  { id: "CMD-2026-1027", distributorId: "D-003", distributorName: "Nippon Dental Supplies", flag: "🇯🇵", products: ["Remplacer"], amount: 41200, status: "Livrée", date: "2026-03-18" },
  { id: "CMD-2026-1026", distributorId: "D-009", distributorName: "Aussie Dental Pros", flag: "🇦🇺", products: ["Protéger"], amount: 15600, status: "Livrée", date: "2026-03-15" },
  { id: "CMD-2026-1025", distributorId: "D-011", distributorName: "Seoul MedTech", flag: "🇰🇷", products: ["Prendre Soin"], amount: 9800, status: "Expédiée", date: "2026-03-12" },
  { id: "CMD-2026-1024", distributorId: "D-016", distributorName: "SA Medical Co.", flag: "🇿🇦", products: ["Préserver"], amount: 5400, status: "Validée", date: "2026-03-10", isOverdue: true },
  { id: "CMD-2026-1023", distributorId: "D-005", distributorName: "American Dental Dist.", flag: "🇺🇸", products: ["Protéger", "Remplacer"], amount: 62000, status: "Livrée", date: "2026-03-08" },
  { id: "CMD-2026-1022", distributorId: "D-013", distributorName: "London Dental Supplies", flag: "🇬🇧", products: ["Préserver"], amount: 17300, status: "Livrée", date: "2026-03-05" },
  { id: "CMD-2026-1021", distributorId: "D-007", distributorName: "Milano Medical", flag: "🇮🇹", products: ["Prendre Soin"], amount: 10500, status: "Livrée", date: "2026-03-02" },
  { id: "CMD-2026-1020", distributorId: "D-006", distributorName: "Iberia Dent", flag: "🇪🇸", products: ["Protéger"], amount: 8200, status: "Livrée", date: "2026-02-28" },
  { id: "CMD-2026-1019", distributorId: "D-001", distributorName: "MedicalTech Group", flag: "🇫🇷", products: ["Remplacer"], amount: 28400, status: "Livrée", date: "2026-02-25" },
  { id: "CMD-2026-1018", distributorId: "D-003", distributorName: "Nippon Dental Supplies", flag: "🇯🇵", products: ["Préserver"], amount: 19500, status: "Livrée", date: "2026-02-20" },
  { id: "CMD-2026-1017", distributorId: "D-017", distributorName: "Mumbai Dentists Hub", flag: "🇮🇳", products: ["Prendre Soin"], amount: 11200, status: "Livrée", date: "2026-02-15" },
  { id: "CMD-2026-1016", distributorId: "D-008", distributorName: "Gulf Care", flag: "🇦🇪", products: ["Protéger", "Remplacer"], amount: 35600, status: "Livrée", date: "2026-02-10" }
];
