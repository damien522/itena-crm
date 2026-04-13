export type ProspectStage = "Identifié" | "Contacté" | "Qualifié" | "En négociation" | "Converti" | "Perdu";
export type ProspectSize = "1-10" | "11-50" | "51-200" | "200-500" | "500+";
export type ProspectSector = "Dentaire" | "Médical général" | "Chirurgical" | "Laboratoire" | "Autre";

export interface ProspectInteraction {
  id: string;
  type: "Appel" | "Email" | "Réunion" | "Note";
  date: string;
  description: string;
  loggedBy: string;
}

export interface ProspectDocument {
  id: string;
  name: string;
  type: "Proposition" | "NDA" | "Brochure" | "Contrat" | "Catalogue";
  dateSent: string;
  url?: string;
}

export interface ProspectNote {
  id: string;
  content: string;
  author: string;
  date: string;
}

export interface Prospect {
  id: string;
  companyName: string;
  sector: ProspectSector;
  country: string;
  city: string;
  flag: string;
  size: ProspectSize;
  estimatedRevenue?: number;
  website?: string;
  source: "Salon professionnel" | "Recommandation" | "LinkedIn" | "Inbound" | "Événement" | "Base de données";
  stage: ProspectStage;
  assignedTo: string;
  assignedToAvatar: string;
  potentiel: "Fort" | "Moyen" | "Faible";
  productsOfInterest: string[];
  contactIds: string[];
  lastActivityDate: string;
  firstContactDate: string;
  interactions: ProspectInteraction[];
  documents: ProspectDocument[];
  notes: ProspectNote[];
}

export const prospects: Prospect[] = [
  {
    id: "P-001",
    companyName: "BioMed Solutions GmbH",
    sector: "Dentaire",
    country: "Allemagne",
    city: "Munich",
    flag: "🇩🇪",
    size: "200-500",
    estimatedRevenue: 150000,
    website: "biomed-solutions.de",
    source: "Salon professionnel",
    stage: "Qualifié",
    assignedTo: "Lucas Bernard",
    assignedToAvatar: "LB",
    potentiel: "Fort",
    productsOfInterest: ["Protéger", "Préserver"],
    contactIds: ["C-011", "C-022"],
    lastActivityDate: "2026-04-06T09:00:00Z",
    firstContactDate: "2026-03-28T09:00:00Z",
    interactions: [
      { id: "PI-001-1", type: "Appel", date: "2026-04-05T10:00:00Z", description: "Qualification téléphonique. Weber confirme budget 150k€.", loggedBy: "Lucas Bernard" },
      { id: "PI-001-2", type: "Email", date: "2026-04-06T09:00:00Z", description: "Fischer valide fiches techniques. Démo planifiée 22 avril.", loggedBy: "Lucas Bernard" },
      { id: "PI-001-3", type: "Réunion", date: "2026-03-28T09:00:00Z", description: "Premier contact IDS Cologne. Très réceptifs.", loggedBy: "Lucas Bernard" },
    ],
    documents: [
      { id: "PD-001-1", name: "Catalogue Protéger 2026.pdf", type: "Catalogue", dateSent: "2026-04-01T00:00:00Z" },
      { id: "PD-001-2", name: "Certifications CE Préserver.pdf", type: "Brochure", dateSent: "2026-04-06T00:00:00Z" },
    ],
    notes: [
      { id: "PN-001-1", content: "BioMed recherche un fournisseur premium en remplacement de leur fournisseur historique en faillite. Fenêtre d'opportunité unique.", author: "Lucas Bernard", date: "2026-03-28T11:00:00Z" },
    ],
  },
  {
    id: "P-002",
    companyName: "MedConnect Korea",
    sector: "Dentaire",
    country: "Corée du Sud",
    city: "Séoul",
    flag: "🇰🇷",
    size: "51-200",
    estimatedRevenue: 200000,
    website: "medconnect.kr",
    source: "LinkedIn",
    stage: "En négociation",
    assignedTo: "Sophie Martin",
    assignedToAvatar: "SM",
    potentiel: "Fort",
    productsOfInterest: ["Préserver", "Protéger", "Remplacer"],
    contactIds: ["C-012", "C-024"],
    lastActivityDate: "2026-04-09T08:00:00Z",
    firstContactDate: "2026-03-20T09:00:00Z",
    interactions: [
      { id: "PI-002-1", type: "Réunion", date: "2026-04-08T08:00:00Z", description: "Visio qualification — 40 cliniques partenaires en Corée.", loggedBy: "Sophie Martin" },
      { id: "PI-002-2", type: "Email", date: "2026-04-01T07:00:00Z", description: "Documentation MFDS envoyée. Validation en cours.", loggedBy: "Sophie Martin" },
      { id: "PI-002-3", type: "Appel", date: "2026-03-20T09:00:00Z", description: "Cold call LinkedIn réussi. Lee très réceptif.", loggedBy: "Sophie Martin" },
    ],
    documents: [
      { id: "PD-002-1", name: "Proposition partenariat APAC.pdf", type: "Proposition", dateSent: "2026-04-02T00:00:00Z" },
      { id: "PD-002-2", name: "Certifications MFDS Korea.pdf", type: "Brochure", dateSent: "2026-04-01T00:00:00Z" },
    ],
    notes: [
      { id: "PN-002-1", content: "Potentiel hub APAC via la Corée. MedConnect a des relations à Singapour et Japon.", author: "Sophie Martin", date: "2026-04-08T10:00:00Z" },
    ],
  },
  {
    id: "P-003",
    companyName: "NordCare AB",
    sector: "Médical général",
    country: "Suède",
    city: "Stockholm",
    flag: "🇸🇪",
    size: "51-200",
    estimatedRevenue: 120000,
    website: "nordcare.se",
    source: "Recommandation",
    stage: "Qualifié",
    assignedTo: "Marie Dupont",
    assignedToAvatar: "MD",
    potentiel: "Fort",
    productsOfInterest: ["Protéger", "Prendre Soin"],
    contactIds: ["C-013"],
    lastActivityDate: "2026-04-03T11:00:00Z",
    firstContactDate: "2026-03-10T14:00:00Z",
    interactions: [
      { id: "PI-003-1", type: "Appel", date: "2026-04-03T11:00:00Z", description: "Lindqvist gère 12 hôpitaux Scandinavie. Budget solide.", loggedBy: "Marie Dupont" },
      { id: "PI-003-2", type: "Réunion", date: "2026-03-10T14:00:00Z", description: "Intro via Nordic Supplies. Très professionnel.", loggedBy: "Marie Dupont" },
      { id: "PI-003-3", type: "Email", date: "2026-03-25T10:00:00Z", description: "Présentation corporate + book produits envoyé.", loggedBy: "Marie Dupont" },
    ],
    documents: [
      { id: "PD-003-1", name: "Présentation Itena Clinical.pdf", type: "Brochure", dateSent: "2026-03-25T00:00:00Z" },
    ],
    notes: [],
  },
  {
    id: "P-004",
    companyName: "HealthBridge Canada",
    sector: "Dentaire",
    country: "Canada",
    city: "Montréal",
    flag: "🇨🇦",
    size: "51-200",
    estimatedRevenue: 200000,
    website: "healthbridge.ca",
    source: "Inbound",
    stage: "En négociation",
    assignedTo: "Thomas Bernard",
    assignedToAvatar: "TB",
    potentiel: "Fort",
    productsOfInterest: ["Protéger", "Remplacer", "Préserver"],
    contactIds: ["C-014", "C-023"],
    lastActivityDate: "2026-04-10T15:00:00Z",
    firstContactDate: "2026-03-22T14:00:00Z",
    interactions: [
      { id: "PI-004-1", type: "Appel", date: "2026-04-10T15:00:00Z", description: "Négociation tarifs. Demande remise 8%. Contre-proposition à préparer.", loggedBy: "Thomas Bernard" },
      { id: "PI-004-2", type: "Réunion", date: "2026-03-22T14:00:00Z", description: "Visio qualification. Tremblay est DMF. Budget 200k€ CA.", loggedBy: "Thomas Bernard" },
      { id: "PI-004-3", type: "Email", date: "2026-04-03T09:00:00Z", description: "Envoi proposition commerciale 3 gammes.", loggedBy: "Thomas Bernard" },
    ],
    documents: [
      { id: "PD-004-1", name: "Proposition commerciale HealthBridge.pdf", type: "Proposition", dateSent: "2026-04-03T00:00:00Z" },
      { id: "PD-004-2", name: "NDA signé.pdf", type: "NDA", dateSent: "2026-03-29T00:00:00Z" },
    ],
    notes: [
      { id: "PN-004-1", content: "Close possible avant fin avril. Tremblay a budget validé Q2. Attention à la remise : max 5% sans approbation direction.", author: "Thomas Bernard", date: "2026-04-10T16:00:00Z" },
    ],
  },
  {
    id: "P-005",
    companyName: "MedEngage NL",
    sector: "Médical général",
    country: "Pays-Bas",
    city: "Amsterdam",
    flag: "🇳🇱",
    size: "11-50",
    estimatedRevenue: 80000,
    website: "medengage.nl",
    source: "LinkedIn",
    stage: "Contacté",
    assignedTo: "Lucas Bernard",
    assignedToAvatar: "LB",
    potentiel: "Moyen",
    productsOfInterest: ["Protéger"],
    contactIds: ["C-015"],
    lastActivityDate: "2026-04-01T10:00:00Z",
    firstContactDate: "2026-03-24T11:00:00Z",
    interactions: [
      { id: "PI-005-1", type: "Appel", date: "2026-03-24T11:00:00Z", description: "Cold call LinkedIn. Van den Berg cherche fournisseur Benelux.", loggedBy: "Lucas Bernard" },
      { id: "PI-005-2", type: "Email", date: "2026-04-01T10:00:00Z", description: "Envoi proposition partenariat distributeur.", loggedBy: "Lucas Bernard" },
      { id: "PI-005-3", type: "Note", date: "2026-03-20T09:00:00Z", description: "Réseau PB + BE. Potentiel moyen mais portes BENELUX intéressantes.", loggedBy: "Lucas Bernard" },
    ],
    documents: [],
    notes: [],
  },
  {
    id: "P-006",
    companyName: "SaudiMed Supply",
    sector: "Médical général",
    country: "Arabie Saoudite",
    city: "Riyad",
    flag: "🇸🇦",
    size: "200-500",
    estimatedRevenue: 300000,
    website: "saudimed.sa",
    source: "Salon professionnel",
    stage: "Qualifié",
    assignedTo: "Marie Dupont",
    assignedToAvatar: "MD",
    potentiel: "Fort",
    productsOfInterest: ["Protéger", "Remplacer", "Prendre Soin", "Préserver"],
    contactIds: ["C-016"],
    lastActivityDate: "2026-03-30T12:00:00Z",
    firstContactDate: "2026-03-30T12:00:00Z",
    interactions: [
      { id: "PI-006-1", type: "Réunion", date: "2026-03-30T12:00:00Z", description: "Arab Health Riyad. 15 hôpitaux Vision 2030. Potentiel énorme.", loggedBy: "Marie Dupont" },
      { id: "PI-006-2", type: "Email", date: "2026-03-25T10:00:00Z", description: "Documents requis SFDA envoyés.", loggedBy: "Marie Dupont" },
      { id: "PI-006-3", type: "Note", date: "2026-03-30T13:00:00Z", description: "KSA Vision 2030 — investissement massif santé. Opportunité stratégique MEA.", loggedBy: "Marie Dupont" },
    ],
    documents: [
      { id: "PD-006-1", name: "Catalogue complet Itena.pdf", type: "Catalogue", dateSent: "2026-03-30T00:00:00Z" },
    ],
    notes: [],
  },
  {
    id: "P-007",
    companyName: "PolMedic",
    sector: "Dentaire",
    country: "Pologne",
    city: "Varsovie",
    flag: "🇵🇱",
    size: "51-200",
    estimatedRevenue: 90000,
    website: "polmedic.pl",
    source: "Recommandation",
    stage: "Contacté",
    assignedTo: "Sophie Martin",
    assignedToAvatar: "SM",
    potentiel: "Moyen",
    productsOfInterest: ["Protéger", "Préserver"],
    contactIds: ["C-017"],
    lastActivityDate: "2026-04-06T09:00:00Z",
    firstContactDate: "2026-03-28T10:00:00Z",
    interactions: [
      { id: "PI-007-1", type: "Appel", date: "2026-04-06T09:00:00Z", description: "Qual. approfondie. 60 cliniques en Pologne. Décision collégiale.", loggedBy: "Sophie Martin" },
      { id: "PI-007-2", type: "Email", date: "2026-03-28T10:00:00Z", description: "Recommandé par Nordic Supplies. Envoi doc partenariat.", loggedBy: "Sophie Martin" },
    ],
    documents: [],
    notes: [],
  },
  {
    id: "P-008",
    companyName: "MexiMed",
    sector: "Dentaire",
    country: "Mexique",
    city: "Mexico City",
    flag: "🇲🇽",
    size: "51-200",
    estimatedRevenue: 95000,
    website: "meximed.com.mx",
    source: "LinkedIn",
    stage: "Qualifié",
    assignedTo: "Thomas Bernard",
    assignedToAvatar: "TB",
    potentiel: "Moyen",
    productsOfInterest: ["Protéger", "Remplacer"],
    contactIds: ["C-018"],
    lastActivityDate: "2026-04-04T16:00:00Z",
    firstContactDate: "2026-03-27T08:00:00Z",
    interactions: [
      { id: "PI-008-1", type: "Réunion", date: "2026-04-04T16:00:00Z", description: "Visio. 80 dentistes réseau Mexique. Potentiel Latam.", loggedBy: "Thomas Bernard" },
      { id: "PI-008-2", type: "Email", date: "2026-03-27T08:00:00Z", description: "Contact LinkedIn. Cherche fournisseur européen premium.", loggedBy: "Thomas Bernard" },
    ],
    documents: [
      { id: "PD-008-1", name: "Brochure Gamme Remplacer ES.pdf", type: "Brochure", dateSent: "2026-04-05T00:00:00Z" },
    ],
    notes: [],
  },
  {
    id: "P-009",
    companyName: "Singapore MedHub",
    sector: "Médical général",
    country: "Singapour",
    city: "Singapour",
    flag: "🇸🇬",
    size: "200-500",
    estimatedRevenue: 350000,
    website: "sgmedhub.sg",
    source: "Salon professionnel",
    stage: "En négociation",
    assignedTo: "Sophie Martin",
    assignedToAvatar: "SM",
    potentiel: "Fort",
    productsOfInterest: ["Protéger", "Préserver", "Remplacer", "Prendre Soin"],
    contactIds: ["C-019"],
    lastActivityDate: "2026-04-09T08:00:00Z",
    firstContactDate: "2026-03-18T08:00:00Z",
    interactions: [
      { id: "PI-009-1", type: "Appel", date: "2026-04-09T08:00:00Z", description: "Hub ASEAN 5 hôpitaux. Potentiel SG + MY + TH.", loggedBy: "Sophie Martin" },
      { id: "PI-009-2", type: "Email", date: "2026-04-01T07:00:00Z", description: "Proposition partenariat ASEAN envoyée.", loggedBy: "Sophie Martin" },
      { id: "PI-009-3", type: "Réunion", date: "2026-03-18T08:00:00Z", description: "Salon MedTech Singapore. Consortium 5 hôpitaux.", loggedBy: "Sophie Martin" },
    ],
    documents: [
      { id: "PD-009-1", name: "Proposition ASEAN Hub.pdf", type: "Proposition", dateSent: "2026-04-01T00:00:00Z" },
      { id: "PD-009-2", name: "NDA Singapore MedHub.pdf", type: "NDA", dateSent: "2026-04-05T00:00:00Z" },
    ],
    notes: [
      { id: "PN-009-1", content: "Deal potentiellement le plus important de l'année. Permet d'ouvrir 3 marchés ASEAN simultanément.", author: "Sophie Martin", date: "2026-04-09T10:00:00Z" },
    ],
  },
  {
    id: "P-010",
    companyName: "Paris Médic",
    sector: "Dentaire",
    country: "France",
    city: "Paris",
    flag: "🇫🇷",
    size: "51-200",
    estimatedRevenue: 70000,
    website: "parismedic.fr",
    source: "Salon professionnel",
    stage: "Identifié",
    assignedTo: "Marie Dupont",
    assignedToAvatar: "MD",
    potentiel: "Moyen",
    productsOfInterest: ["Protéger"],
    contactIds: ["C-025"],
    lastActivityDate: "2026-04-11T12:00:00Z",
    firstContactDate: "2026-04-11T10:00:00Z",
    interactions: [
      { id: "PI-010-1", type: "Réunion", date: "2026-04-11T10:00:00Z", description: "Salon Pharmagora. 25 cabinets dentaires Paris. Premier contact.", loggedBy: "Marie Dupont" },
      { id: "PI-010-2", type: "Email", date: "2026-04-11T12:00:00Z", description: "Catalogue + invitation démo envoyés post-salon.", loggedBy: "Marie Dupont" },
    ],
    documents: [],
    notes: [],
  },
  {
    id: "P-011",
    companyName: "AustraMed Pty",
    sector: "Chirurgical",
    country: "Australie",
    city: "Sydney",
    flag: "🇦🇺",
    size: "51-200",
    estimatedRevenue: 110000,
    website: "austromed.com.au",
    source: "Base de données",
    stage: "Identifié",
    assignedTo: "Lucas Bernard",
    assignedToAvatar: "LB",
    potentiel: "Moyen",
    productsOfInterest: ["Remplacer", "Protéger"],
    contactIds: [],
    lastActivityDate: "2026-03-15T10:00:00Z",
    firstContactDate: "2026-03-15T10:00:00Z",
    interactions: [
      { id: "PI-011-1", type: "Note", date: "2026-03-15T10:00:00Z", description: "Identifié base de données ANZ. Premier email envoyé sans réponse.", loggedBy: "Lucas Bernard" },
    ],
    documents: [],
    notes: [],
  },
  {
    id: "P-012",
    companyName: "DentalPlus Turkey",
    sector: "Dentaire",
    country: "Turquie",
    city: "Istanbul",
    flag: "🇹🇷",
    size: "11-50",
    estimatedRevenue: 60000,
    website: "dentalplus.tr",
    source: "Salon professionnel",
    stage: "Contacté",
    assignedTo: "Thomas Bernard",
    assignedToAvatar: "TB",
    potentiel: "Moyen",
    productsOfInterest: ["Protéger", "Prendre Soin"],
    contactIds: [],
    lastActivityDate: "2026-03-22T11:00:00Z",
    firstContactDate: "2026-03-10T09:00:00Z",
    interactions: [
      { id: "PI-012-1", type: "Email", date: "2026-03-22T11:00:00Z", description: "Relance suite salon Istanbul. Pas de réponse encore.", loggedBy: "Thomas Bernard" },
      { id: "PI-012-2", type: "Appel", date: "2026-03-10T09:00:00Z", description: "Premier contact salon Istanbul medtech.", loggedBy: "Thomas Bernard" },
    ],
    documents: [],
    notes: [],
  },
  {
    id: "P-013",
    companyName: "ClinicaTech Argentina",
    sector: "Médical général",
    country: "Argentine",
    city: "Buenos Aires",
    flag: "🇦🇷",
    size: "1-10",
    estimatedRevenue: 30000,
    website: "clinicatech.ar",
    source: "LinkedIn",
    stage: "Identifié",
    assignedTo: "Sophie Martin",
    assignedToAvatar: "SM",
    potentiel: "Faible",
    productsOfInterest: ["Protéger"],
    contactIds: [],
    lastActivityDate: "2026-03-05T09:00:00Z",
    firstContactDate: "2026-03-05T09:00:00Z",
    interactions: [
      { id: "PI-013-1", type: "Note", date: "2026-03-05T09:00:00Z", description: "Lead LinkedIn inbound. Petite structure. Potentiel faible court terme.", loggedBy: "Sophie Martin" },
    ],
    documents: [],
    notes: [],
  },
  {
    id: "P-014",
    companyName: "MedSupply India",
    sector: "Médical général",
    country: "Inde",
    city: "Mumbai",
    flag: "🇮🇳",
    size: "200-500",
    estimatedRevenue: 180000,
    website: "medsupply.in",
    source: "Événement",
    stage: "Contacté",
    assignedTo: "Marie Dupont",
    assignedToAvatar: "MD",
    potentiel: "Fort",
    productsOfInterest: ["Protéger", "Préserver", "Remplacer"],
    contactIds: [],
    lastActivityDate: "2026-04-02T09:00:00Z",
    firstContactDate: "2026-03-08T10:00:00Z",
    interactions: [
      { id: "PI-014-1", type: "Email", date: "2026-04-02T09:00:00Z", description: "Suivi salon India Medtech Expo. Envoi catalogue.", loggedBy: "Marie Dupont" },
      { id: "PI-014-2", type: "Réunion", date: "2026-03-08T10:00:00Z", description: "Salon India Medtech Expo Mumbai. Grand groupe 200-500 emp.", loggedBy: "Marie Dupont" },
    ],
    documents: [],
    notes: [],
  },
  {
    id: "P-015",
    companyName: "AfricaMed Logistics",
    sector: "Médical général",
    country: "Afrique du Sud",
    city: "Johannesburg",
    flag: "🇿🇦",
    size: "51-200",
    estimatedRevenue: 85000,
    website: "africamed.co.za",
    source: "Recommandation",
    stage: "Identifié",
    assignedTo: "Lucas Bernard",
    assignedToAvatar: "LB",
    potentiel: "Moyen",
    productsOfInterest: ["Protéger", "Prendre Soin"],
    contactIds: [],
    lastActivityDate: "2026-03-18T09:00:00Z",
    firstContactDate: "2026-03-18T09:00:00Z",
    interactions: [
      { id: "PI-015-1", type: "Note", date: "2026-03-18T09:00:00Z", description: "Recommandé par un agent Français. Premier email envoyé.", loggedBy: "Lucas Bernard" },
    ],
    documents: [],
    notes: [],
  },
];
