export type CertificationStatus = 'Certifié' | 'À renouveler' | 'Expiré';
export type CommercialTier = 'Platinum' | 'Gold' | 'Silver' | 'Bronze';

export interface Certification {
  status: CertificationStatus;
  expiryDate: string;
  daysRemaining: number;
}

export interface Distributor {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  certification: Certification;
  commercialDetails: {
    tier: CommercialTier;
    discount: number;
    currency: string;
    paymentTerms: string;
  };
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  stats: {
    totalOrders: number;
    totalRevenue: number;
    lastOrderDate: string;
    activeOrders: number;
    openClaims: number;
    activityScore: number;
  };
}

export const distributeurs: Distributor[] = [
  {
    id: "D-001",
    name: "MedicalTech Group",
    country: "France",
    city: "Paris",
    flag: "🇫🇷",
    certification: { status: "Certifié", expiryDate: "2027-05-15", daysRemaining: 400 },
    commercialDetails: { tier: "Platinum", discount: 25, currency: "EUR", paymentTerms: "30 Jours" },
    contact: { name: "Jean Dupont", email: "jean.dupont@medicaltech.fr", phone: "+33 1 23 45 67 89" },
    stats: { totalOrders: 145, totalRevenue: 1250000, lastOrderDate: "2026-04-10", activeOrders: 3, openClaims: 0, activityScore: 95 }
  },
  {
    id: "D-002",
    name: "Berlin Medizintechnik",
    country: "Germany",
    city: "Berlin",
    flag: "🇩🇪",
    certification: { status: "À renouveler", expiryDate: "2026-05-01", daysRemaining: 20 },
    commercialDetails: { tier: "Gold", discount: 15, currency: "EUR", paymentTerms: "30 Jours" },
    contact: { name: "Klaus Weber", email: "klaus@berlin-med.de", phone: "+49 30 123456" },
    stats: { totalOrders: 89, totalRevenue: 850000, lastOrderDate: "2026-03-25", activeOrders: 1, openClaims: 1, activityScore: 82 }
  },
  {
    id: "D-003",
    name: "Nippon Dental Supplies",
    country: "Japan",
    city: "Tokyo",
    flag: "🇯🇵",
    certification: { status: "Certifié", expiryDate: "2028-01-10", daysRemaining: 640 },
    commercialDetails: { tier: "Platinum", discount: 30, currency: "JPY", paymentTerms: "60 Jours" },
    contact: { name: "Yuki Tanaka", email: "y.tanaka@nippondental.jp", phone: "+81 3 1234 5678" },
    stats: { totalOrders: 210, totalRevenue: 2100500, lastOrderDate: "2026-04-05", activeOrders: 5, openClaims: 0, activityScore: 98 }
  },
  {
    id: "D-004",
    name: "Saude Brasil Medical",
    country: "Brazil",
    city: "São Paulo",
    flag: "🇧🇷",
    certification: { status: "Expiré", expiryDate: "2026-02-15", daysRemaining: -55 },
    commercialDetails: { tier: "Bronze", discount: 5, currency: "BRL", paymentTerms: "Avance" },
    contact: { name: "Carlos Silva", email: "carlos@saudebrasil.com", phone: "+55 11 98765 4321" },
    stats: { totalOrders: 12, totalRevenue: 45000, lastOrderDate: "2025-11-20", activeOrders: 0, openClaims: 2, activityScore: 20 }
  },
  {
    id: "D-005",
    name: "American Dental Dist.",
    country: "USA",
    city: "New York",
    flag: "🇺🇸",
    certification: { status: "Certifié", expiryDate: "2027-11-30", daysRemaining: 590 },
    commercialDetails: { tier: "Platinum", discount: 20, currency: "USD", paymentTerms: "30 Jours" },
    contact: { name: "Michael Smith", email: "msmith@americandental.com", phone: "+1 212 555 1234" },
    stats: { totalOrders: 315, totalRevenue: 3500000, lastOrderDate: "2026-04-09", activeOrders: 8, openClaims: 1, activityScore: 99 }
  },
  {
    id: "D-006",
    name: "Iberia Dent",
    country: "Spain",
    city: "Madrid",
    flag: "🇪🇸",
    certification: { status: "À renouveler", expiryDate: "2026-04-30", daysRemaining: 19 },
    commercialDetails: { tier: "Silver", discount: 10, currency: "EUR", paymentTerms: "45 Jours" },
    contact: { name: "Lucia Garcia", email: "lgarcia@iberiadent.es", phone: "+34 91 234 5678" },
    stats: { totalOrders: 45, totalRevenue: 320000, lastOrderDate: "2026-02-28", activeOrders: 1, openClaims: 0, activityScore: 65 }
  },
  {
    id: "D-007",
    name: "Milano Medical",
    country: "Italy",
    city: "Milan",
    flag: "🇮🇹",
    certification: { status: "Certifié", expiryDate: "2028-06-20", daysRemaining: 800 },
    commercialDetails: { tier: "Gold", discount: 15, currency: "EUR", paymentTerms: "90 Jours" },
    contact: { name: "Marco Rossi", email: "m.rossi@milanomedical.it", phone: "+39 02 1234 5678" },
    stats: { totalOrders: 110, totalRevenue: 980000, lastOrderDate: "2026-04-02", activeOrders: 2, openClaims: 0, activityScore: 88 }
  },
  {
    id: "D-008",
    name: "Gulf Care",
    country: "UAE",
    city: "Dubai",
    flag: "🇦🇪",
    certification: { status: "Certifié", expiryDate: "2027-09-10", daysRemaining: 517 },
    commercialDetails: { tier: "Platinum", discount: 18, currency: "USD", paymentTerms: "Avance" },
    contact: { name: "Ahmed Al-Fayed", email: "ahmed@gulfcare.ae", phone: "+971 4 123 4567" },
    stats: { totalOrders: 80, totalRevenue: 1150000, lastOrderDate: "2026-03-30", activeOrders: 4, openClaims: 0, activityScore: 92 }
  },
  {
    id: "D-009",
    name: "Aussie Dental Pros",
    country: "Australia",
    city: "Sydney",
    flag: "🇦🇺",
    certification: { status: "À renouveler", expiryDate: "2026-05-15", daysRemaining: 34 },
    commercialDetails: { tier: "Gold", discount: 12, currency: "AUD", paymentTerms: "30 Jours" },
    contact: { name: "Emma Johnson", email: "emma@aussiedental.com.au", phone: "+61 2 9876 5432" },
    stats: { totalOrders: 65, totalRevenue: 540000, lastOrderDate: "2026-03-15", activeOrders: 2, openClaims: 1, activityScore: 78 }
  },
  {
    id: "D-010",
    name: "Maple Leaf Medical",
    country: "Canada",
    city: "Toronto",
    flag: "🇨🇦",
    certification: { status: "Certifié", expiryDate: "2028-02-28", daysRemaining: 689 },
    commercialDetails: { tier: "Silver", discount: 8, currency: "CAD", paymentTerms: "30 Jours" },
    contact: { name: "David Brown", email: "david.brown@mapleleafmed.ca", phone: "+1 416 555 9876" },
    stats: { totalOrders: 38, totalRevenue: 280000, lastOrderDate: "2026-04-01", activeOrders: 1, openClaims: 0, activityScore: 71 }
  },
  {
    id: "D-011",
    name: "Seoul MedTech",
    country: "South Korea",
    city: "Seoul",
    flag: "🇰🇷",
    certification: { status: "Certifié", expiryDate: "2027-10-10", daysRemaining: 547 },
    commercialDetails: { tier: "Gold", discount: 16, currency: "KRW", paymentTerms: "60 Jours" },
    contact: { name: "Ji-hoon Park", email: "jhpark@seoulmedtech.kr", phone: "+82 2 1234 5678" },
    stats: { totalOrders: 92, totalRevenue: 750000, lastOrderDate: "2026-04-07", activeOrders: 3, openClaims: 0, activityScore: 89 }
  },
  {
    id: "D-012",
    name: "Salud Mex",
    country: "Mexico",
    city: "Mexico City",
    flag: "🇲🇽",
    certification: { status: "Expiré", expiryDate: "2026-01-05", daysRemaining: -96 },
    commercialDetails: { tier: "Bronze", discount: 5, currency: "MXN", paymentTerms: "Avance" },
    contact: { name: "Maria Gonzalez", email: "mgonzalez@saludmex.mx", phone: "+52 55 1234 5678" },
    stats: { totalOrders: 24, totalRevenue: 95000, lastOrderDate: "2026-01-15", activeOrders: 0, openClaims: 1, activityScore: 34 }
  },
  {
    id: "D-013",
    name: "London Dental Supplies",
    country: "UK",
    city: "London",
    flag: "🇬🇧",
    certification: { status: "Certifié", expiryDate: "2027-03-12", daysRemaining: 335 },
    commercialDetails: { tier: "Platinum", discount: 22, currency: "GBP", paymentTerms: "30 Jours" },
    contact: { name: "James Williams", email: "james@londondental.co.uk", phone: "+44 20 7123 4567" },
    stats: { totalOrders: 180, totalRevenue: 1650000, lastOrderDate: "2026-04-08", activeOrders: 4, openClaims: 0, activityScore: 94 }
  },
  {
    id: "D-014",
    name: "Swiss MedCare",
    country: "Switzerland",
    city: "Zurich",
    flag: "🇨🇭",
    certification: { status: "Certifié", expiryDate: "2028-09-01", daysRemaining: 874 },
    commercialDetails: { tier: "Silver", discount: 10, currency: "CHF", paymentTerms: "30 Jours" },
    contact: { name: "Lukas Meier", email: "lukas.meier@swissmedcare.ch", phone: "+41 44 123 4567" },
    stats: { totalOrders: 42, totalRevenue: 410000, lastOrderDate: "2026-03-20", activeOrders: 1, openClaims: 0, activityScore: 68 }
  },
  {
    id: "D-015",
    name: "Nordic Health",
    country: "Sweden",
    city: "Stockholm",
    flag: "🇸🇪",
    certification: { status: "À renouveler", expiryDate: "2026-04-20", daysRemaining: 9 },
    commercialDetails: { tier: "Gold", discount: 14, currency: "SEK", paymentTerms: "45 Jours" },
    contact: { name: "Anders Lindberg", email: "anders@nordichealth.se", phone: "+46 8 123 45 67" },
    stats: { totalOrders: 78, totalRevenue: 620000, lastOrderDate: "2026-04-01", activeOrders: 2, openClaims: 0, activityScore: 84 }
  },
  {
    id: "D-016",
    name: "SA Medical Co.",
    country: "South Africa",
    city: "Johannesburg",
    flag: "🇿🇦",
    certification: { status: "Certifié", expiryDate: "2027-06-30", daysRemaining: 445 },
    commercialDetails: { tier: "Bronze", discount: 8, currency: "ZAR", paymentTerms: "30 Jours" },
    contact: { name: "Peter Ndlovu", email: "peter.n@samedical.co.za", phone: "+27 11 123 4567" },
    stats: { totalOrders: 35, totalRevenue: 150000, lastOrderDate: "2026-02-10", activeOrders: 1, openClaims: 1, activityScore: 55 }
  },
  {
    id: "D-017",
    name: "Mumbai Dentists Hub",
    country: "India",
    city: "Mumbai",
    flag: "🇮🇳",
    certification: { status: "Certifié", expiryDate: "2028-12-15", daysRemaining: 979 },
    commercialDetails: { tier: "Silver", discount: 15, currency: "INR", paymentTerms: "Avance" },
    contact: { name: "Rajesh Kumar", email: "rajesh@mumbaidhub.in", phone: "+91 22 1234 5678" },
    stats: { totalOrders: 115, totalRevenue: 450000, lastOrderDate: "2026-04-05", activeOrders: 3, openClaims: 2, activityScore: 81 }
  },
  {
    id: "D-018",
    name: "Argentine Care",
    country: "Argentina",
    city: "Buenos Aires",
    flag: "🇦🇷",
    certification: { status: "Expiré", expiryDate: "2025-12-01", daysRemaining: -131 },
    commercialDetails: { tier: "Bronze", discount: 5, currency: "ARS", paymentTerms: "Avance" },
    contact: { name: "Diego Fernandez", email: "diego@argentinecare.com.ar", phone: "+54 11 1234 5678" },
    stats: { totalOrders: 18, totalRevenue: 60000, lastOrderDate: "2025-10-15", activeOrders: 0, openClaims: 0, activityScore: 15 }
  },
  {
    id: "D-019",
    name: "Istanbul Dış Ticaret",
    country: "Turkey",
    city: "Istanbul",
    flag: "🇹🇷",
    certification: { status: "À renouveler", expiryDate: "2026-05-10", daysRemaining: 29 },
    commercialDetails: { tier: "Silver", discount: 12, currency: "TRY", paymentTerms: "60 Jours" },
    contact: { name: "Ali Yilmaz", email: "ali@istanbuldent.com.tr", phone: "+90 212 123 4567" },
    stats: { totalOrders: 55, totalRevenue: 290000, lastOrderDate: "2026-03-22", activeOrders: 2, openClaims: 0, activityScore: 72 }
  },
  {
    id: "D-020",
    name: "Thai Smile Dental",
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    certification: { status: "Certifié", expiryDate: "2027-08-25", daysRemaining: 501 },
    commercialDetails: { tier: "Gold", discount: 15, currency: "THB", paymentTerms: "30 Jours" },
    contact: { name: "Somsak Wong", email: "somsak@thaismiledental.co.th", phone: "+66 2 123 4567" },
    stats: { totalOrders: 70, totalRevenue: 480000, lastOrderDate: "2026-04-03", activeOrders: 2, openClaims: 0, activityScore: 86 }
  }
];
