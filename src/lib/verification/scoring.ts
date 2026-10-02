import { EvidenceSignal, VerificationScoreBreakdown, ArtifactVerificationStatus } from "@/lib/db/types";

export interface ScoringWeights {
  certificateMatch: number; artisanRecordMatch: number; provenanceCompleteness: number;
  regionConsistency: number; materialConsistency: number; visualEvidence: number;
}

export const DEFAULT_SCORING_WEIGHTS: ScoringWeights = {
  certificateMatch: 25, artisanRecordMatch: 20, provenanceCompleteness: 20,
  regionConsistency: 15, materialConsistency: 10, visualEvidence: 10
};

export interface VerificationEvaluationInput {
  hasValidCertificate: boolean; certificateIssuerRecognized?: boolean;
  hasArtisanRecord: boolean; hasPhysicalOriginMatch: boolean;
  isMaterialConsistent: boolean; provenanceStepsLogged: number;
  visualTensionVarianceScore: number; isVisualMechanicalFlagged?: boolean;
  conflictingSignalsDetected?: boolean;
}

export function calculateVerificationScore(
  input: VerificationEvaluationInput,
  weights: ScoringWeights = DEFAULT_SCORING_WEIGHTS
): { breakdown: VerificationScoreBreakdown; signals: EvidenceSignal[] } {
  const now = new Date().toISOString();
  const signals: EvidenceSignal[] = [];

  let certScore = 0;
  if (input.hasValidCertificate) {
    certScore = input.certificateIssuerRecognized ? weights.certificateMatch : Math.round(weights.certificateMatch * 0.8);
    signals.push({ id: `sig-cert-${Date.now()}`, artifactId: "", signalName: "Certificate & GI Register Match", status: "MATCHED", source: "DOCUMENT_OCR", explanation: "Official craft registration certificate found and verified.", confidence: 0.95, scoreContribution: certScore, timestamp: now });
  } else {
    signals.push({ id: `sig-cert-${Date.now()}`, artifactId: "", signalName: "Certificate & GI Register Match", status: "MISSING", source: "DOCUMENT_OCR", explanation: "No digital certificate or GI registry document attached.", confidence: 0, scoreContribution: 0, timestamp: now });
  }

  let artisanScore = 0;
  if (input.hasArtisanRecord) {
    artisanScore = weights.artisanRecordMatch;
    signals.push({ id: `sig-art-${Date.now()}`, artifactId: "", signalName: "Named Artisan Registry", status: "MATCHED", source: "ARTISAN_RECORD", explanation: "Artisan profile exists in cooperative verified registry.", confidence: 0.98, scoreContribution: artisanScore, timestamp: now });
  } else {
    signals.push({ id: `sig-art-${Date.now()}`, artifactId: "", signalName: "Named Artisan Registry", status: "MISSING", source: "ARTISAN_RECORD", explanation: "Artisan identity could not be correlated with recognized registry.", confidence: 0, scoreContribution: 0, timestamp: now });
  }

  const provenanceRatio = Math.min(1, Math.max(0, input.provenanceStepsLogged / 4));
  const provScore = Math.round(weights.provenanceCompleteness * provenanceRatio);
  signals.push({ id: `sig-prov-${Date.now()}`, artifactId: "", signalName: "Provenance Continuity", status: provenanceRatio >= 0.75 ? "CONSISTENT" : "INCONCLUSIVE", source: "LEDGER", explanation: `${input.provenanceStepsLogged} verifiable lifecycle milestones recorded.`, confidence: provenanceRatio, scoreContribution: provScore, timestamp: now });

  let regionScore = 0;
  if (input.hasPhysicalOriginMatch) {
    regionScore = weights.regionConsistency;
    signals.push({ id: `sig-reg-${Date.now()}`, artifactId: "", signalName: "Geographical GI Origin Consistency", status: "CONSISTENT", source: "ARTISAN_RECORD", explanation: "Craft cluster corresponds to the designated GI protection zone.", confidence: 0.92, scoreContribution: regionScore, timestamp: now });
  } else {
    signals.push({ id: `sig-reg-${Date.now()}`, artifactId: "", signalName: "Geographical GI Origin Consistency", status: "CONFLICTING", source: "ARTISAN_RECORD", explanation: "Production location does not match craft boundaries.", confidence: 0.4, scoreContribution: 0, timestamp: now });
  }

  let materialScore = 0;
  if (input.isMaterialConsistent) {
    materialScore = weights.materialConsistency;
    signals.push({ id: `sig-mat-${Date.now()}`, artifactId: "", signalName: "Natural Fiber & Dye Consistency", status: "CONSISTENT", source: "AI_VISION", explanation: "Textile surface matches traditional natural fibers.", confidence: 0.88, scoreContribution: materialScore, timestamp: now });
  } else {
    signals.push({ id: `sig-mat-${Date.now()}`, artifactId: "", signalName: "Natural Fiber & Dye Consistency", status: "INCONCLUSIVE", source: "AI_VISION", explanation: "Synthetic sheen detected. Requires lab test.", confidence: 0.5, scoreContribution: Math.round(weights.materialConsistency * 0.3), timestamp: now });
  }

  let visualScore = 0;
  if (input.isVisualMechanicalFlagged) {
    signals.push({ id: `sig-vis-${Date.now()}`, artifactId: "", signalName: "Micro-Stitch Tension Irregularity", status: "CONFLICTING", source: "AI_VISION", explanation: "Machine embroidery hallmarks detected on reverse stitch.", confidence: 0.85, scoreContribution: 0, timestamp: now });
  } else {
    visualScore = Math.round(weights.visualEvidence * Math.min(1, input.visualTensionVarianceScore || 0.85));
    signals.push({ id: `sig-vis-${Date.now()}`, artifactId: "", signalName: "Micro-Stitch Tension Irregularity", status: "CONSISTENT", source: "AI_VISION", explanation: "Organic tension variations characteristic of manual needlework.", confidence: input.visualTensionVarianceScore || 0.85, scoreContribution: visualScore, timestamp: now });
  }

  const totalScore = Math.min(100, certScore + artisanScore + provScore + regionScore + materialScore + visualScore);
  const humanReviewRecommended = Boolean(input.conflictingSignalsDetected) || Boolean(input.isVisualMechanicalFlagged) || (totalScore >= 50 && totalScore < 75);

  let verdict: ArtifactVerificationStatus = "INSUFFICIENT_EVIDENCE";
  if (input.isVisualMechanicalFlagged) verdict = "REJECTED";
  else if (humanReviewRecommended) verdict = "NEEDS_REVIEW";
  else if (totalScore >= 75) verdict = "VERIFIED";
  else if (totalScore >= 45) verdict = "IN_REVIEW";

  return {
    breakdown: { certificateMatch: certScore, artisanRecordMatch: artisanScore, provenanceCompleteness: provScore, regionConsistency: regionScore, materialConsistency: materialScore, visualEvidence: visualScore, totalScore, humanReviewRecommended, verdict },
    signals
  };
}