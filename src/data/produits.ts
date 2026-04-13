export type ProductFamily = 'Protéger' | 'Préserver' | 'Remplacer' | 'Prendre Soin';
export type StockStatus = 'Disponible' | 'Stock faible' | 'Rupture';

export interface Product {
  id: string; // internal ref
  name: string;
  family: ProductFamily;
  lotNumber: string; // monospace
  stockStatus: StockStatus;
  stockCount: number;
}

export const produits: Product[] = [
  // Protéger (8 products)
  { id: "PR-01", name: "Masques Chirurgicaux Typ II", family: "Protéger", lotNumber: "LT-2601-A1", stockStatus: "Disponible", stockCount: 15400 },
  { id: "PR-02", name: "Gants Nitrile Sans Poudre", family: "Protéger", lotNumber: "LT-2602-B4", stockStatus: "Stock faible", stockCount: 150 },
  { id: "PR-03", name: "Blouses de Protection Usage Unique", family: "Protéger", lotNumber: "LT-2603-C2", stockStatus: "Disponible", stockCount: 3200 },
  { id: "PR-04", name: "Lunettes de Sécurité UV", family: "Protéger", lotNumber: "LT-2511-D1", stockStatus: "Disponible", stockCount: 850 },
  { id: "PR-05", name: "Charlotte Chirurgicale", family: "Protéger", lotNumber: "LT-2604-X9", stockStatus: "Rupture", stockCount: 0 },
  { id: "PR-06", name: "Sur-chaussures Antidérapantes", family: "Protéger", lotNumber: "LT-2605-E3", stockStatus: "Disponible", stockCount: 5000 },
  { id: "PR-07", name: "Visière de Protection Intégrale", family: "Protéger", lotNumber: "LT-2606-F2", stockStatus: "Stock faible", stockCount: 75 },
  { id: "PR-08", name: "Tablier Plombé Radiologie", family: "Protéger", lotNumber: "LT-2607-G1", stockStatus: "Disponible", stockCount: 40 },

  // Préserver (8 products)
  { id: "PS-01", name: "Solution de Stérilisation Instrumentale", family: "Préserver", lotNumber: "LT-2601-S1", stockStatus: "Disponible", stockCount: 420 },
  { id: "PS-02", name: "Sachets de Stérilisation Autoscellants", family: "Préserver", lotNumber: "LT-2602-S2", stockStatus: "Disponible", stockCount: 8900 },
  { id: "PS-03", name: "Test Bowie & Dick", family: "Préserver", lotNumber: "LT-2603-S3", stockStatus: "Stock faible", stockCount: 85 },
  { id: "PS-04", name: "Détergent Enzymatique", family: "Préserver", lotNumber: "LT-2512-S4", stockStatus: "Disponible", stockCount: 560 },
  { id: "PS-05", name: "Lubrifiant pour Instruments", family: "Préserver", lotNumber: "LT-2604-S5", stockStatus: "Rupture", stockCount: 0 },
  { id: "PS-06", name: "Lingettes Désinfectantes Surface", family: "Préserver", lotNumber: "LT-2605-S6", stockStatus: "Disponible", stockCount: 1200 },
  { id: "PS-07", name: "Spray Nettoyant Rotatifs", family: "Préserver", lotNumber: "LT-2606-S7", stockStatus: "Stock faible", stockCount: 120 },
  { id: "PS-08", name: "Bacs à Ultrasons", family: "Préserver", lotNumber: "LT-2607-S8", stockStatus: "Disponible", stockCount: 15 },

  // Remplacer (8 products)
  { id: "RM-01", name: "Composite Universel Teinte A2", family: "Remplacer", lotNumber: "LT-2601-R1", stockStatus: "Disponible", stockCount: 1200 },
  { id: "RM-02", name: "Ciment Verre Ionomère", family: "Remplacer", lotNumber: "LT-2602-R2", stockStatus: "Disponible", stockCount: 850 },
  { id: "RM-03", name: "Adhésif Amélo-Dentinaire", family: "Remplacer", lotNumber: "LT-2603-R3", stockStatus: "Stock faible", stockCount: 110 },
  { id: "RM-04", name: "Matériau d'Empreinte Silicone A", family: "Remplacer", lotNumber: "LT-2510-R4", stockStatus: "Disponible", stockCount: 430 },
  { id: "RM-05", name: "Fraise Diamantée Turbine", family: "Remplacer", lotNumber: "LT-2605-R5", stockStatus: "Disponible", stockCount: 5600 },
  { id: "RM-06", name: "Couronnes Provisoires Pédiatriques", family: "Remplacer", lotNumber: "LT-2606-R6", stockStatus: "Rupture", stockCount: 0 },
  { id: "RM-07", name: "Résine Acrylique Coulable", family: "Remplacer", lotNumber: "LT-2607-R7", stockStatus: "Disponible", stockCount: 200 },
  { id: "RM-08", name: "Alginate Prise Rapide", family: "Remplacer", lotNumber: "LT-2608-R8", stockStatus: "Stock faible", stockCount: 150 },

  // Prendre Soin (8 products)
  { id: "PC-01", name: "Vernis Fluoré", family: "Prendre Soin", lotNumber: "LT-2601-P1", stockStatus: "Disponible", stockCount: 340 },
  { id: "PC-02", name: "Bain de Bouche Antiseptique", family: "Prendre Soin", lotNumber: "LT-2602-P2", stockStatus: "Disponible", stockCount: 1250 },
  { id: "PC-03", name: "Gel de Blanchiment 10%", family: "Prendre Soin", lotNumber: "LT-2603-P3", stockStatus: "Stock faible", stockCount: 95 },
  { id: "PC-04", name: "Pâte Prophylactique", family: "Prendre Soin", lotNumber: "LT-2511-P4", stockStatus: "Disponible", stockCount: 880 },
  { id: "PC-05", name: "Fil Dentaire Téflon", family: "Prendre Soin", lotNumber: "LT-2604-P5", stockStatus: "Disponible", stockCount: 2100 },
  { id: "PC-06", name: "Brossettes Interdentaires", family: "Prendre Soin", lotNumber: "LT-2605-P6", stockStatus: "Rupture", stockCount: 0 },
  { id: "PC-07", name: "Applicateurs Microbrosses", family: "Prendre Soin", lotNumber: "LT-2606-P7", stockStatus: "Disponible", stockCount: 4500 },
  { id: "PC-08", name: "Gel Désensibilisant", family: "Prendre Soin", lotNumber: "LT-2607-P8", stockStatus: "Stock faible", stockCount: 40 }
];
