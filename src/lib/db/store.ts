import { Artisan, Artifact, AuditLog, Craft, EvidenceSignal, SubmissionRecord, VerificationEvent } from "./types";

export const INITIAL_CRAFTS: Craft[] = [
  {
    id: "craft-chikankari", name: "Lucknow Chikankari", hindiName: "लखनऊ चिकनकारी", giTagNumber: "GI-119",
    giCertifiedYear: 2008, originDistrict: "Lucknow", originState: "Uttar Pradesh",
    description: "A 400-year-old delicate white-on-white needle embroidery tradition patronized by the Nawabs of Awadh.",
    primaryTechniques: ["Bakhiya", "Phanda", "Murri", "Jali", "Tepchi"],
    materials: ["Fine Mulmul Cotton", "Pure Chiffon", "Silk Organza"],
    signatureMotifs: ["Paan (Betel leaf)", "Kairi (Paisley)", "Chamele (Jasmine bud)"],
    heritageHistory: "Over 250,000 women artisans in Lucknow preserve this needlecraft.",
    heroImage: "/images/chikankari-ivory-pink.jpg", activeArtisansCount: 250000
  },
  {
    id: "craft-banarasi", name: "Banarasi Brocade & Kadhwa", giTagNumber: "GI-99",
    giCertifiedYear: 2009, originDistrict: "Varanasi", originState: "Uttar Pradesh",
    description: "A legendary handloom weaving tradition on pit-looms featuring pure mulberry katan silk with gold zari.",
    primaryTechniques: ["Kadhwa", "Fekwa", "Tanchoi", "Jangla"],
    materials: ["Katan Pure Silk", "Real Tested Silver Zari", "Gold-plated Zari"],
    signatureMotifs: ["Shikargah (Hunting scene)", "Kalka (Paisley)", "Bel (Floral vines)"],
    heritageHistory: "Each Kadhwa sari takes between 45 to 120 days of handloom operation.",
    heroImage: "/images/chikankari-green.jpg", activeArtisansCount: 95000
  }
];

export const INITIAL_ARTISANS: Artisan[] = [
  {
    id: "AMN-018", userId: "user-artisan-01", name: "Amina Begum", hindiName: "अमीना बेगम",
    mohalla: "Chowk, Purana Lucknow", city: "Lucknow", state: "Uttar Pradesh",
    craftId: "craft-chikankari", craftName: "Lucknow Chikankari", yearsOfExperience: 34,
    bio: "Fourth-generation master craftswoman specializing in fine Jali and reverse-shadow Bakhiya.",
    specialization: "Jali (Net trellis work) & Fine Bakhiya", masterStatus: "Master Craftswoman",
    profileImage: "/images/chikankari-outfit.jpg", cooperativeName: "Awadh Mahila Craft Guild",
    earningsSharePercentage: 86, piecesCreatedCount: 420,
    vakhSpaceUrl: "https://vakh.com/form/h8ki",
    languages: ["Hindi", "Urdu", "Awadhi"], joinedDate: "2024-03-12"
  },
  {
    id: "RAM-042", userId: "user-artisan-02", name: "Pandit Rameshwar Weaver", hindiName: "पं. रामेश्वर बुनकर",
    mohalla: "Madanpura Weavers Lane", city: "Varanasi", state: "Uttar Pradesh",
    craftId: "craft-banarasi", craftName: "Banarasi Brocade & Kadhwa", yearsOfExperience: 42,
    bio: "Award-winning master of the Kadhwa pit loom who weaves without jacquard machinery.",
    specialization: "Kadhwa Supplementary Weft & Shikargah Brocades", masterStatus: "State Awardee",
    profileImage: "/images/chikankari-peach-suit.jpg", cooperativeName: "Ganga Silk Weavers Guild",
    earningsSharePercentage: 84, piecesCreatedCount: 290,
    vakhSpaceUrl: "https://vakh.com/form/h8ki",
    languages: ["Hindi", "Bhojpuri"], joinedDate: "2023-11-05"
  },
  {
    id: "FTM-031", userId: "user-artisan-03", name: "Fatima Bi", hindiName: "फ़ातिमा बी",
    mohalla: "Kakori Heritage Cluster", city: "Lucknow District", state: "Uttar Pradesh",
    craftId: "craft-chikankari", craftName: "Lucknow Chikankari", yearsOfExperience: 22,
    bio: "Recognized for micro-Phanda and raised Murri pearl-knot stitches.",
    specialization: "Phanda (Millet grain knot) & Murri", masterStatus: "Cooperative Artisan",
    profileImage: "/images/chikankari-blush-pink.jpg", cooperativeName: "SEWA Kakori Artisans Unit",
    earningsSharePercentage: 88, piecesCreatedCount: 185,
    vakhSpaceUrl: "https://vakh.com/form/h8ki",
    languages: ["Hindi", "Urdu"], joinedDate: "2024-06-20"
  }
];

export const INITIAL_ARTIFACTS: Artifact[] = [
  {
    artifactId: "NQ-2026-001", title: "Awadh Royal Jali & Shadow Angrakha",
    craftId: "craft-chikankari", craftType: "Lucknow Chikankari", region: "Awadh",
    district: "Lucknow", state: "Uttar Pradesh", material: "Pure Mulmul Cotton with Unbleached Silk Thread",
    technique: "Double-drawn Jali, Reverse Bakhiya, Phanda", motif: "Paan-ki-Patti & Chamele Floral Bud",
    artisanId: "AMN-018", artisanName: "Amina Begum", createdAt: "2026-01-14T10:00:00Z",
    submittedAt: "2026-01-20T14:30:00Z", verificationStatus: "VERIFIED",
    verificationConfidence: 89, evidenceCompleteness: 94, certificateId: "CRT-NQ-2026-001",
    qrToken: "NQ-TOKEN-2026001-A9F7", coverImage: "/images/chikankari-ivory-pink.jpg",
    reverseImage: "/images/chikankari-green.jpg",
    additionalImages: ["/images/chikankari-outfit.jpg", "/images/chikankari-sage-flatlay.jpg"],
    description: "A museum-quality Angrakha kurta featuring 240 hours of non-mechanical hand-drawn needlework.",
    estimatedHours: 240, artisanEarningsInr: 18500, currentOwnerId: "user-buyer-01"
  },
  {
    artifactId: "NQ-2026-002", title: "Kadhwa Shikargah Royal Silk Saree",
    craftId: "craft-banarasi", craftType: "Banarasi Brocade & Kadhwa", region: "Kashi",
    district: "Varanasi", state: "Uttar Pradesh", material: "Pure Mulberry Katan Silk with Tested Silver Zari",
    technique: "Discontinuous Weft Kadhwa Handloom", motif: "Shikargah Hunting Scene",
    artisanId: "RAM-042", artisanName: "Pandit Rameshwar Weaver", createdAt: "2025-11-02T09:00:00Z",
    submittedAt: "2025-12-10T16:00:00Z", verificationStatus: "VERIFIED",
    verificationConfidence: 94, evidenceCompleteness: 98, certificateId: "CRT-NQ-2026-002",
    qrToken: "NQ-TOKEN-2026002-B8E2", coverImage: "/images/chikankari-peach-suit.jpg",
    additionalImages: ["/images/chikankari-green.jpg"],
    description: "Handwoven over 68 days on a four-pedal pit-loom. Tested pure silver electroplated zari.",
    estimatedHours: 544, artisanEarningsInr: 52000
  },
  {
    artifactId: "NQ-2026-003", title: "Kakori Heritage Phanda Dupatta",
    craftId: "craft-chikankari", craftType: "Lucknow Chikankari", region: "Kakori Block",
    district: "Lucknow", state: "Uttar Pradesh", material: "Pure Silk Organza",
    technique: "Phanda, Murri & Keel Kangan", motif: "Kairi Trellis & Star Clusters",
    artisanId: "FTM-031", artisanName: "Fatima Bi", createdAt: "2026-02-05T11:20:00Z",
    submittedAt: "2026-02-12T15:10:00Z", verificationStatus: "VERIFIED",
    verificationConfidence: 87, evidenceCompleteness: 90, certificateId: "CRT-NQ-2026-003",
    qrToken: "NQ-TOKEN-2026003-C4D1", coverImage: "/images/chikankari-blush-pink.jpg",
    additionalImages: ["/images/chikankari-sage-flatlay.jpg"],
    description: "Embroidered with over 18,000 hand-knotted pearl grains on transparent organza.",
    estimatedHours: 160, artisanEarningsInr: 14200
  },
  {
    artifactId: "NQ-2026-004", title: "Chowk Morning Shadow Kurta",
    craftId: "craft-chikankari", craftType: "Lucknow Chikankari", region: "Awadh",
    district: "Lucknow", state: "Uttar Pradesh", material: "Fine Cotton Muslin",
    technique: "Bakhiya, Tepchi, Ghas Patti", motif: "Floral Jaal & Paisley Corners",
    artisanId: "AMN-018", artisanName: "Amina Begum", createdAt: "2026-02-18T10:00:00Z",
    submittedAt: "2026-02-25T11:00:00Z", verificationStatus: "NEEDS_REVIEW",
    verificationConfidence: 68, evidenceCompleteness: 72, certificateId: "CRT-NQ-2026-004",
    qrToken: "NQ-TOKEN-2026004-D7A3", coverImage: "/images/chikankari-sage-flatlay.jpg",
    additionalImages: ["/images/chikankari-outfit.jpg"],
    description: "Submitted for curator review. Registration document scan has blurred seal edges.",
    estimatedHours: 110, artisanEarningsInr: 9500
  },
  {
    artifactId: "NQ-2026-005", title: "Ganga Ghat Royal Jamdani Dupatta",
    craftId: "craft-banarasi", craftType: "Banarasi Brocade & Kadhwa", region: "Kashi",
    district: "Varanasi", state: "Uttar Pradesh", material: "Fine Katan Silk",
    technique: "Jamdani Weave on Traditional Pit Loom", motif: "Ashrafi & Peacocks",
    artisanId: "RAM-042", artisanName: "Pandit Rameshwar Weaver", createdAt: "2026-02-22T08:30:00Z",
    submittedAt: "2026-03-01T14:00:00Z", verificationStatus: "IN_REVIEW",
    verificationConfidence: 71, evidenceCompleteness: 65, certificateId: "CRT-NQ-2026-005",
    qrToken: "NQ-TOKEN-2026005-E1C9", coverImage: "/images/chikankari-green.jpg",
    additionalImages: ["/images/chikankari-ivory-pink.jpg"],
    description: "Pending curator verification. Thread count test report currently in transit.",
    estimatedHours: 210, artisanEarningsInr: 24000
  },
  {
    artifactId: "NQ-2026-006", title: "Commercial Market Sample — Flagged Inconsistent",
    craftId: "craft-chikankari", craftType: "Lucknow Chikankari (Claimed)", region: "Commercial Batch",
    district: "Unknown / Retail Market", state: "Uttar Pradesh", material: "Synthetic Polyester Blend",
    technique: "Industrial Computerized Lock-Stitch Machine", motif: "Simplified Paisley",
    artisanId: "UNKNOWN", artisanName: "Unverified Factory Source", createdAt: "2026-03-02T12:00:00Z",
    submittedAt: "2026-03-05T09:15:00Z", verificationStatus: "REJECTED",
    verificationConfidence: 18, evidenceCompleteness: 20, certificateId: "REJ-NQ-2026-006",
    qrToken: "NQ-TOKEN-2026006-F001", coverImage: "/images/chikankari-blush-pink.jpg",
    additionalImages: [],
    description: "Flagged by NAQSH AI Vision. Reverse stitch displays mathematically identical machine hallmarks.",
    estimatedHours: 0.5, artisanEarningsInr: 0
  }
];

export const INITIAL_EVENTS: VerificationEvent[] = [
  {
    id: "evt-01", artifactId: "NQ-2026-001", eventType: "MADE",
    actorId: "AMN-018", actorName: "Amina Begum", actorRole: "artisan",
    title: "Crafted in Chowk Workshop",
    description: "Completed 240 hours of Jali and Bakhiya embroidery on unbleached muslin.",
    timestamp: "2026-01-14T10:00:00Z"
  },
  {
    id: "evt-02", artifactId: "NQ-2026-001", eventType: "DOCUMENT_UPLOADED",
    actorId: "AMN-018", actorName: "Amina Begum", actorRole: "artisan",
    title: "Cooperative Registration Attached",
    description: "Awadh Mahila Craft Guild issued verification slip #AMCG-2026-881.",
    timestamp: "2026-01-20T14:30:00Z"
  },
  {
    id: "evt-03", artifactId: "NQ-2026-001", eventType: "AI_INSPECTED",
    actorId: "sys-gemini", actorName: "NAQSH Gemini 3.8 Flash Vision", actorRole: "system",
    title: "Computer Vision Stitch Analysis",
    description: "High hand-tension variance detected (0.89 score). No lock-stitch machine hallmarks.",
    timestamp: "2026-01-21T09:12:00Z"
  },
  {
    id: "evt-04", artifactId: "NQ-2026-001", eventType: "CURATOR_REVIEWED",
    actorId: "user-curator-01", actorName: "Dr. Sunita Verma", actorRole: "curator",
    title: "Curator Physical Inspection Passed",
    description: "Confirmed genuine hand-drawn Jali technique. Signed off on GI compliance.",
    timestamp: "2026-01-22T11:45:00Z"
  },
  {
    id: "evt-05", artifactId: "NQ-2026-001", eventType: "VERIFIED",
    actorId: "sys-ledger", actorName: "NAQSH Provenance Protocol", actorRole: "system",
    title: "Certificate CRT-NQ-2026-001 Issued",
    description: "Digital tamper-evident record committed with 89% evidence confidence.",
    timestamp: "2026-01-22T12:00:00Z",
    txHash: "0x8f2d5930b8c67210e4a95821c97a2160d5b1e9f87421c60e34a78192d6e41b95"
  }
];

class NaqshDataStore {
  private crafts: Craft[] = [...INITIAL_CRAFTS];
  private artisans: Artisan[] = [...INITIAL_ARTISANS];
  private artifacts: Artifact[] = [...INITIAL_ARTIFACTS];
  private events: VerificationEvent[] = [...INITIAL_EVENTS];
  private auditLogs: AuditLog[] = [
    {
      id: "aud-01", actorId: "user-curator-01", actorName: "Dr. Sunita Verma", actorRole: "curator",
      action: "VERIFICATION_APPROVED", entityType: "artifact", entityId: "NQ-2026-001",
      metadata: { confidence: 89, certificateId: "CRT-NQ-2026-001" }, timestamp: "2026-01-22T11:45:00Z"
    },
    {
      id: "aud-02", actorId: "sys-gemini", actorName: "Gemini 3.8 Flash Vision", actorRole: "system",
      action: "AI_ANALYSIS_COMPLETED", entityType: "evidence", entityId: "NQ-2026-004",
      metadata: { tensionScore: 0.82, mechanicalFlag: false }, timestamp: "2026-02-25T11:05:00Z"
    },
    {
      id: "aud-03", actorId: "user-curator-01", actorName: "Dr. Sunita Verma", actorRole: "curator",
      action: "REQUESTED_EVIDENCE", entityType: "submission", entityId: "sub-004",
      metadata: { reason: "Higher resolution cooperative seal scan required" }, timestamp: "2026-02-26T14:10:00Z"
    }
  ];

  getCrafts(): Craft[] { return this.crafts; }
  getCraftById(id: string): Craft | undefined { return this.crafts.find(c => c.id === id); }
  getArtisans(): Artisan[] { return this.artisans; }
  getArtisanById(id: string): Artisan | undefined { return this.artisans.find(a => a.id === id); }
  getArtifacts(): Artifact[] { return this.artifacts; }
  getArtifactById(id: string): Artifact | undefined { return this.artifacts.find(a => a.artifactId === id); }
  getArtifactsByArtisan(artisanId: string): Artifact[] { return this.artifacts.filter(a => a.artisanId === artisanId); }
  getEventsByArtifact(artifactId: string): VerificationEvent[] { return this.events.filter(e => e.artifactId === artifactId); }
  getAuditLogs(): AuditLog[] { return this.auditLogs; }
  getSubmissions(): { id: string; artifactId: string; status: string; artisanName: string; craftName: string; submittedAt: string; curatorNotes?: string; }[] {
    return this.artifacts
      .filter(a => a.verificationStatus === "NEEDS_REVIEW" || a.verificationStatus === "IN_REVIEW")
      .map(a => ({ id: `sub-${a.artifactId}`, artifactId: a.artifactId, status: a.verificationStatus, artisanName: a.artisanName, craftName: a.craftType, submittedAt: a.submittedAt, curatorNotes: "Pending curator review." }));
  }

  updateArtifactStatus(artifactId: string, status: Artifact["verificationStatus"], curatorName: string, curatorNotes?: string): void {
    const item = this.artifacts.find(a => a.artifactId === artifactId);
    if (item) {
      item.verificationStatus = status;
      this.events.push({
        id: `evt-${Date.now()}`, artifactId, eventType: status === "VERIFIED" ? "VERIFIED" : "CURATOR_REVIEWED",
        actorId: "curator-id", actorName: curatorName, actorRole: "curator",
        title: `Status Updated to ${status}`, description: curatorNotes || `Curator ${curatorName} reviewed and updated status.`,
        timestamp: new Date().toISOString()
      });
      this.addAuditLog({
        id: `aud-${Date.now()}`, actorId: "curator-id", actorName: curatorName, actorRole: "curator",
        action: `CURATOR_${status}`, entityType: "artifact", entityId: artifactId,
        metadata: { notes: curatorNotes }, timestamp: new Date().toISOString()
      });
    }
  }

  addArtifact(artifact: Artifact): void { this.artifacts.unshift(artifact); }

  addAuditLog(log: AuditLog): void { this.auditLogs.unshift(log); }
}

export const db = new NaqshDataStore();