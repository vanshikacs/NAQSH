export type UserRole = "visitor" | "buyer" | "artisan" | "curator" | "admin";

export interface User { id: string; email: string; name: string; role: UserRole; avatar?: string; }

export interface Craft {
  id: string; name: string; hindiName?: string; giTagNumber?: string; giCertifiedYear?: number;
  originDistrict: string; originState: string; description: string; primaryTechniques: string[];
  materials: string[]; signatureMotifs: string[]; heritageHistory: string; heroImage: string; activeArtisansCount: number;
}

export interface Artisan {
  id: string; userId?: string; name: string; hindiName?: string; mohalla: string; city: string; state: string;
  craftId: string; craftName: string; yearsOfExperience: number; bio: string; specialization: string;
  masterStatus: string; profileImage: string; cooperativeName: string; earningsSharePercentage: number;
  piecesCreatedCount: number; vakhSpaceUrl?: string; languages: string[]; joinedDate: string;
}

export type ArtifactVerificationStatus = "PENDING" | "IN_REVIEW" | "VERIFIED" | "NEEDS_REVIEW" | "INSUFFICIENT_EVIDENCE" | "REJECTED";

export interface Artifact {
  artifactId: string; title: string; craftId: string; craftType: string; region: string; district: string;
  state: string; material: string; technique: string; motif: string; artisanId: string; artisanName: string;
  createdAt: string; submittedAt: string; verificationStatus: ArtifactVerificationStatus;
  verificationConfidence: number; evidenceCompleteness: number; certificateId: string; qrToken: string;
  coverImage: string; reverseImage?: string; additionalImages: string[]; description: string;
  estimatedHours: number; artisanEarningsInr: number; currentOwnerId?: string;
}

export interface EvidenceSignal {
  id: string; artifactId: string; signalName: string;
  status: "MATCHED" | "CONSISTENT" | "INCONCLUSIVE" | "CONFLICTING" | "MISSING";
  source: "ARTISAN_RECORD" | "DOCUMENT_OCR" | "AI_VISION" | "LEDGER" | "FIELD_REPORT";
  explanation: string; confidence: number; scoreContribution: number; timestamp: string;
}

export interface VerificationScoreBreakdown {
  certificateMatch: number; artisanRecordMatch: number; provenanceCompleteness: number;
  regionConsistency: number; materialConsistency: number; visualEvidence: number;
  totalScore: number; humanReviewRecommended: boolean; verdict: ArtifactVerificationStatus;
}

export interface VerificationEvent {
  id: string; artifactId: string;
  eventType: "MADE" | "DOCUMENT_UPLOADED" | "AI_INSPECTED" | "CURATOR_REVIEWED" | "VERIFIED" | "OWNERSHIP_CLAIMED";
  actorId: string; actorName: string; actorRole: string; title: string; description: string; timestamp: string; txHash?: string;
}

export interface SubmissionRecord {
  id: string; artifactId: string; artifactTitle: string; artisanId: string; artisanName: string;
  submitterId: string; craftName: string; status: ArtifactVerificationStatus; submittedAt: string;
  assignedCuratorId?: string; assignedCuratorName?: string; curatorNotes?: string;
  documents: unknown[]; evidenceSignals: EvidenceSignal[];
}

export interface CommunityPost {
  id: string; authorId: string; authorName: string; authorRole: string;
  postType: "FIELD_NOTE" | "STORY" | "COUNTERFEIT_FLAG" | "CRAFT_KNOWLEDGE";
  title: string; content: string; location: string; craft: string;
  verdict: "genuine" | "flagged" | "registered" | "inconclusive";
  image?: string; vakhPostUrl?: string; likesCount: number; commentsCount: number; createdAt: string;
}

export interface AuditLog {
  id: string; actorId: string; actorName: string; actorRole: string; action: string;
  entityType: "artifact" | "artisan" | "submission" | "evidence" | "certificate" | "vakh";
  entityId: string; metadata?: Record<string, unknown>; timestamp: string;
}