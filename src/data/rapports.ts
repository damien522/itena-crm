export interface MonthlyData {
  month: string;
  revenueCurrent: number;
  revenuePrevious: number;
}

export const revenueData: MonthlyData[] = [
  { month: "Jan", revenueCurrent: 210000, revenuePrevious: 195000 },
  { month: "Fév", revenueCurrent: 235000, revenuePrevious: 205000 },
  { month: "Mar", revenueCurrent: 215000, revenuePrevious: 220000 },
  { month: "Avr", revenueCurrent: 245000, revenuePrevious: 210000 },
  { month: "Mai", revenueCurrent: 260000, revenuePrevious: 230000 },
  { month: "Juin", revenueCurrent: 255000, revenuePrevious: 240000 },
  { month: "Juil", revenueCurrent: 200000, revenuePrevious: 190000 },
  { month: "Août", revenueCurrent: 180000, revenuePrevious: 175000 },
  { month: "Sep", revenueCurrent: 285000, revenuePrevious: 250000 },
  { month: "Oct", revenueCurrent: 295000, revenuePrevious: 265000 },
  { month: "Nov", revenueCurrent: 310000, revenuePrevious: 280000 },
  { month: "Déc", revenueCurrent: 240000, revenuePrevious: 220000 }
];

export interface RegionalData {
  region: string;
  value: number;
}

export const regionalRevenue: RegionalData[] = [
  { region: "Europe", value: 1250000 },
  { region: "Americas", value: 850000 },
  { region: "APAC", value: 650000 },
  { region: "Middle East", value: 250000 },
  { region: "Autres", value: 125000 }
];

export interface PipelineStage {
  name: string;
  count: number;
  value: number;
}

export const pipelineData: PipelineStage[] = [
  { name: "Qualification", count: 45, value: 1200000 },
  { name: "Négociation", count: 15, value: 850000 },
  { name: "Conclusion", count: 5, value: 340000 }
];

export interface Metric {
  title: string;
  value: string;
  trend?: number;
  unit?: string;
}

export const executiveMetrics = {
  globalRevenue: { value: 3125000, trend: 14.5 },
  grossMargin: { value: 68.4, trend: 2.1, unit: '%' },
  activeDistributors: { value: 187, trend: 5 }
};

export const operationalMetrics = {
  avgDeliveryTime: { current: 1.5, target: 2.0, unit: 'jours' },
  ticketsResolved: { count: 23, averageTime: 2.3 },
  bobbyResolutionRate: { value: 61, unit: '%' }
};

export const stockAlerts = [
  { product: "Charlotte Chirurgicale", family: "Protéger", status: "Rupture" },
  { product: "Lubrifiant pour Instruments", family: "Préserver", status: "Rupture" },
  { product: "Test Bowie & Dick", family: "Préserver", status: "Stock faible" },
  { product: "Adhésif Amélo-Dentinaire", family: "Remplacer", status: "Stock faible" }
];
