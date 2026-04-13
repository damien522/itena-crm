export type ImpactLevel = 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
export type ApprovalStatus = 'pending' | 'accepted' | 'refused' | 'modified';

export interface ApprovalRequest {
  id: string;
  agentId: string;
  agentName: string;
  agentColor: string; // TailWind color class like "violet", "teal", "yellow"
  title: string;
  summary: string;
  triggerEvent: string;
  intendedAction: string;
  objective: string;
  acceptConsequences: string[];
  refuseConsequences: string[];
  sourceData: {
    metrics: Array<{ label: string; value: string; trend?: string }>;
    sparklineData?: number[]; // Just some numbers for a tiny chart
  };
  impactLevel: ImpactLevel;
  urgencyDeadline: string | null; // e.g., ISO string or simplified string for mock "Dans 2h"
  bobbyRecommendation: {
    decision: 'Accepter' | 'Refuser' | 'Modifier';
    reasoning: string;
  } | null;
  status: ApprovalStatus;
  decisionBy: string | null;
  decisionAt: string | null;
  decisionReason: string | null;
  createdAt: string; // ISO string 
}

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

export const approbationsData: ApprovalRequest[] = [
  // --- EN ATTENTE ---
  {
    id: "APP-001",
    agentId: "relances",
    agentName: "🤖 Relances",
    agentColor: "#7C5CFC", // violet
    title: "Relance inactif : Berlin Medizintechnik",
    summary: "Envoyer un email de réactivation à Marco Rodriguez",
    triggerEvent: "Le distributeur Berlin Medizintechnik n'a passé aucune commande depuis 73 jours (seuil configuré : 60 jours).",
    intendedAction: "Envoyer un email de relance personnalisé à Marco Rodriguez (Directeur des Achats, Berlin Medizintechnik) depuis l'adresse de Marie Dupont.",
    objective: "Réactiver le distributeur et générer une commande estimée à 15 000-25 000€ sur les 30 prochains jours.",
    acceptConsequences: [
      "✓ Email envoyé à marco.rodriguez@berlinmediz.de dans les 5 prochaines minutes",
      "✓ Une tâche de suivi créée pour Marie Dupont dans 7 jours",
      "✓ L'action est enregistrée dans l'audit trail et le journal Bobby"
    ],
    refuseConsequences: [
      "✗ Aucun email envoyé",
      "✗ Bobby reprendra l'analyse dans 7 jours",
      "✗ Le distributeur reste dans la liste de surveillance passive"
    ],
    sourceData: {
      metrics: [
        { label: "Dernière commande", value: "31 Jan 2026" },
        { label: "Commandes 6 mois (N)", value: "3", trend: "-2" },
        { label: "Commandes 6 mois (N-1)", value: "5" }
      ],
      sparklineData: [25, 30, 20, 10, 0, 0]
    },
    impactLevel: "Modéré",
    urgencyDeadline: new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString(), // +4h
    bobbyRecommendation: {
      decision: "Accepter",
      reasoning: "Je recommande d'accepter car ce distributeur n'a pas commandé depuis 73 jours, ce qui dépasse le seuil de 60 jours. Une relance maintenant maximise les chances de réactivation avant la fin du trimestre."
    },
    status: "pending",
    decisionBy: null,
    decisionAt: null,
    decisionReason: null,
    createdAt: new Date(now.getTime() - 23 * 60 * 1000).toISOString() // 23 min ago
  },
  {
    id: "APP-002",
    agentId: "qualite",
    agentName: "🛡️ Qualité",
    agentColor: "#0D9488", // teal
    title: "Escalade réclamation critique REC-2026-042",
    summary: "Modifier le statut en 'Escaladée' et notifier la Direction",
    triggerEvent: "La réclamation REC-2026-042 est ouverte depuis 8 jours sans résolution (délai maximum : 5 jours).",
    intendedAction: "Modifier le statut de la réclamation REC-2026-042 de 'En cours' à 'Escaladée' et notifier le Directeur Qualité.",
    objective: "Assurer la conformité réglementaire et respecter les SLA de résolution qualité.",
    acceptConsequences: [
      "✓ Statut mis à jour à 'Escaladée'",
      "✓ Notification email immédiate envoyée à qualite@itena-clinical.com",
      "✓ Indicateur qualité mis à jour dans le tableau de bord"
    ],
    refuseConsequences: [
      "✗ Le statut reste 'En cours'",
      "✗ Risque de non-conformité si audit"
    ],
    sourceData: {
      metrics: [
        { label: "Journée en cours", value: "8ème jour" },
        { label: "Criticité origine", value: "Moyenne" },
        { label: "Lot concerné", value: "LOT-8492" }
      ]
    },
    impactLevel: "Élevé",
    urgencyDeadline: null,
    bobbyRecommendation: null, // No reco
    status: "pending",
    decisionBy: null,
    decisionAt: null,
    decisionReason: null,
    createdAt: new Date(now.getTime() - 120 * 60 * 1000).toISOString() // 2h ago
  },
  {
    id: "APP-003",
    agentId: "reporting",
    agentName: "📊 Reporting",
    agentColor: "#EAB308", // yellow
    title: "Envoi Rapport Baisse CA",
    summary: "Envoyer le rapport mensuel à 3 distributeurs en alerte",
    triggerEvent: "La clôture du mois montre une baisse de CA >15% par rapport à N-1 pour 3 distributeurs clés.",
    intendedAction: "Générer et envoyer par email les rapports de performance contenant les chiffres bruts aux 3 distributeurs concernés.",
    objective: "Alerter les partenaires sur la baisse d'activité et provoquer une révision stratégique.",
    acceptConsequences: [
      "✓ 3 emails envoyés avec rapport PDF attaché",
      "✓ Logging de la communication sur les 3 fiches contacts"
    ],
    refuseConsequences: [
      "✗ Les rapports ne seront pas partagés avec les distributeurs externes",
      "✗ Disponible uniquement en interne"
    ],
    sourceData: {
      metrics: [
        { label: "Distributeurs", value: "3" },
        { label: "Baisse moy. CA", value: "-18%" }
      ]
    },
    impactLevel: "Modéré",
    urgencyDeadline: null,
    bobbyRecommendation: {
      decision: "Accepter",
      reasoning: "Une transparence sur ces chiffres est nécessaire. Ces 3 distributeurs sont historiquement réactifs après réception de ces rapports trimestriels."
    },
    status: "pending",
    decisionBy: null,
    decisionAt: null,
    decisionReason: null,
    createdAt: new Date(now.getTime() - 170 * 60 * 1000).toISOString()
  },
  {
    id: "APP-004",
    agentId: "sav",
    agentName: "🛠️ SAV",
    agentColor: "#3B82F6", // blue
    title: "Remplacement commande erronée (London Supplies)",
    summary: "Créer une commande de compensation de 3 200€",
    triggerEvent: "Erreur de livraison confirmée par l'entrepôt sur la commande CMD-1092 de London Supplies.",
    intendedAction: "Créer une commande de remplacement intégral à 0€ (valeur 3 200€) avec expédition express.",
    objective: "Compenser l'erreur logistique rapidement pour éviter l'insatisfaction client.",
    acceptConsequences: [
      "✓ Impact direct Marge : -3 200€",
      "✓ Bon d'expédition express généré au dépôt",
      "✓ Email d'excuse envoyé avec numéro de suivi"
    ],
    refuseConsequences: [
      "✗ La commande gratuite n'est pas créée",
      "✗ Le SAV devra contacter le client pour proposer une autre solution"
    ],
    sourceData: {
      metrics: [
        { label: "Valeur erreur", value: "3 200€" },
        { label: "Score Client", value: "A" }
      ]
    },
    impactLevel: "Élevé",
    urgencyDeadline: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
    bobbyRecommendation: {
      decision: "Modifier",
      reasoning: "Je recommande de modifier cette action : Le client a indiqué au téléphone pouvoir utiliser la marchandise erronée à hauteur de 50%. Il vaut mieux proposer une remise de 50% ou une commande de compensation sur la moitié des produits seulement."
    },
    status: "pending",
    decisionBy: null,
    decisionAt: null,
    decisionReason: null,
    createdAt: new Date(now.getTime() - 5 * 60 * 1000).toISOString()
  },
  {
    id: "APP-005",
    agentId: "relances",
    agentName: "🤖 Relances",
    agentColor: "#7C5CFC", // violet
    title: "Révision conditions tarifaires Iberia Dent",
    summary: "Proposer une remise temporaire de 5% sur la gamme Protéger",
    triggerEvent: "Le CA du distributeur Iberia Dent a baissé de 34% sur les 3 derniers mois par rapport à la même période l'an dernier.",
    intendedAction: "Proposer une révision des conditions tarifaires à Iberia Dent avec une remise temporaire de 5% sur la gamme Protéger pour les 3 prochains mois.",
    objective: "Stopper la baisse de CA et regagner 2-3 commandes mensuelles sur ce distributeur.",
    acceptConsequences: [
      "✓ L'ERP est mis à jour avec la condition -5% pour 3 mois",
      "✓ Contrat PDF mis à jour et envoyé pour signature",
      "✓ Cible CA potentiellement regagné : 40k€"
    ],
    refuseConsequences: [
      "✗ Grille tarifaire reste inchangée",
      "✗ Risque de perdre le distributeur (perte estimée 120k€ annuels)"
    ],
    sourceData: {
      metrics: [
        { label: "CA T-1", value: "-34%", trend: "down" },
        { label: "Marge courante", value: "48%" }
      ],
      sparklineData: [45, 42, 38, 30, 25, 20]
    },
    impactLevel: "Critique",
    urgencyDeadline: new Date(now.getTime() + 1 * 60 * 60 * 1000).toISOString(), // +1h
    bobbyRecommendation: {
      decision: "Accepter",
      reasoning: "Action fortement recommandée. Même avec 5% de remise, la marge nette sur ce distributeur reste très saine (43%). La perte du distributeur serait critique pour la couverture du marché espagnol."
    },
    status: "pending",
    decisionBy: null,
    decisionAt: null,
    decisionReason: null,
    createdAt: new Date(now.getTime() - 350 * 60 * 1000).toISOString()
  },

  // --- TRAITÉES ---
  {
    id: "APP-006",
    agentId: "reporting",
    agentName: "📊 Reporting",
    agentColor: "#EAB308",
    title: "Alerte de surstock Résine Composite",
    summary: "Notifier les distributeurs d'une promotion flash",
    triggerEvent: "Stock de résine au-dessus du seuil d'alerte (+2000 unités).",
    intendedAction: "Lancer une campagne email 'Promo Flash' -15% sur la résine composite à tous les distributeurs Premium.",
    objective: "Écouler le surstock avant dépréciation.",
    acceptConsequences: ["Email Blast envoyé"],
    refuseConsequences: [],
    sourceData: { metrics: [] },
    impactLevel: "Modéré",
    urgencyDeadline: null,
    bobbyRecommendation: null,
    status: "accepted",
    decisionBy: "Marie Dupont",
    decisionAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
    decisionReason: null,
    createdAt: yesterday.toISOString()
  },
  {
    id: "APP-007",
    agentId: "qualite",
    agentName: "🛡️ Qualité",
    agentColor: "#0D9488",
    title: "Suspension temporaire Scellages Fissures",
    summary: "Bloquer les commandes pour le lot 704A",
    triggerEvent: "3 réclamations similaires reçues en 48h.",
    intendedAction: "Bloquer le lot 704A dans l'ERP.",
    objective: "Geler la distribution par précaution.",
    acceptConsequences: ["Lot bloqué ERP"],
    refuseConsequences: [],
    sourceData: { metrics: [] },
    impactLevel: "Critique",
    urgencyDeadline: null,
    bobbyRecommendation: null,
    status: "accepted",
    decisionBy: "Jean Dubois",
    decisionAt: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
    decisionReason: null,
    createdAt: yesterday.toISOString()
  },
  {
    id: "APP-008",
    agentId: "relances",
    agentName: "🤖 Relances",
    agentColor: "#7C5CFC",
    title: "Déclassement partenaire Seoul MedTech",
    summary: "Passer de Premium à Standard",
    triggerEvent: "Objectifs CA non atteints 3 trimestres de suite.",
    intendedAction: "Mettre à jour le segment CRM.",
    objective: "Optimiser les investissements marketing.",
    acceptConsequences: [],
    refuseConsequences: [],
    sourceData: { metrics: [] },
    impactLevel: "Élevé",
    urgencyDeadline: null,
    bobbyRecommendation: null,
    status: "refused",
    decisionBy: "Marie Dupont",
    decisionAt: new Date(now.getTime() - 4 * 60 * 60 * 1000).toISOString(),
    decisionReason: "Stratégie commerciale différente - Point prévu au prochain trimestre",
    createdAt: yesterday.toISOString()
  },
  {
    id: "APP-009",
    agentId: "sav",
    agentName: "🛠️ SAV",
    agentColor: "#3B82F6",
    title: "Avoir global pour retard (+15j) Gulf Care",
    summary: "Générer avoir 500€",
    triggerEvent: "Commande en souffrance depuis 15 jours",
    intendedAction: "Générer un avoir de 500€ sur le compte Gulf",
    objective: "Retenir le client",
    acceptConsequences: [],
    refuseConsequences: [],
    sourceData: { metrics: [] },
    impactLevel: "Modéré",
    urgencyDeadline: null,
    bobbyRecommendation: null,
    status: "modified", // modified & accepted
    decisionBy: "Marie Dupont",
    decisionAt: new Date(now.getTime() - 5 * 60 * 60 * 1000).toISOString(),
    decisionReason: null,
    createdAt: yesterday.toISOString()
  },

  // --- HISTORIQUE ---
  {
    id: "APP-010",
    agentId: "relances",
    agentName: "🤖 Relances",
    agentColor: "#7C5CFC",
    title: "Campagne Q3 Ciment de scellement",
    summary: "120 emails aux prospects froids",
    triggerEvent: "Début Q3",
    intendedAction: "Sequence email Drip",
    objective: "Lead Gen",
    acceptConsequences: [],
    refuseConsequences: [],
    sourceData: { metrics: [] },
    impactLevel: "Faible",
    urgencyDeadline: null,
    bobbyRecommendation: null,
    status: "accepted",
    decisionBy: "Marie Dupont",
    decisionAt: twoDaysAgo.toISOString(),
    decisionReason: null,
    createdAt: twoDaysAgo.toISOString()
  },
  {
    id: "APP-011",
    agentId: "qualite",
    agentName: "🛡️ Qualité",
    agentColor: "#0D9488",
    title: "Recall Produit Etchant Gel",
    summary: "Procédure d'urgence de rappel lot 502",
    triggerEvent: "Alerte AFNOR",
    intendedAction: "Rappel",
    objective: "Sécurité patient",
    acceptConsequences: [],
    refuseConsequences: [],
    sourceData: { metrics: [] },
    impactLevel: "Critique",
    urgencyDeadline: null,
    bobbyRecommendation: null,
    status: "accepted",
    decisionBy: "Direction",
    decisionAt: new Date(twoDaysAgo.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    decisionReason: null,
    createdAt: new Date(twoDaysAgo.getTime() - 25 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "APP-012",
    agentId: "reporting",
    agentName: "📊 Reporting",
    agentColor: "#EAB308",
    title: "Accès Dashboard Externe à un tiers",
    summary: "Créer un accès view-only pour le cabinet Deloitte",
    triggerEvent: "Audit financier détecté",
    intendedAction: "Invitation email",
    objective: "Faciliter audit",
    acceptConsequences: [],
    refuseConsequences: [],
    sourceData: { metrics: [] },
    impactLevel: "Modéré",
    urgencyDeadline: null,
    bobbyRecommendation: null,
    status: "refused",
    decisionBy: "IT Admin",
    decisionAt: new Date(twoDaysAgo.getTime() - 48 * 60 * 60 * 1000).toISOString(),
    decisionReason: "Informations incorrectes - Le compte est déjà créé",
    createdAt: new Date(twoDaysAgo.getTime() - 50 * 60 * 60 * 1000).toISOString()
  }
];
