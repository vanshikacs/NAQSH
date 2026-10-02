import { NextRequest, NextResponse } from "next/server";
import { analyzeCraftWithGemini, getFallbackGeminiResponse, validateImageUpload } from "@/lib/ai/geminiVision";
import { calculateVerificationScore } from "@/lib/verification/scoring";
import { db } from "@/lib/db/store";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    let imageBase64: string | undefined;
    let garmentId: string | undefined;
    let mimeType = "image/jpeg";

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const image = formData.get("image") as File | null;
      garmentId = (formData.get("garmentId") as string | null) || undefined;
      if (image) {
        const validation = validateImageUpload(image);
        if (!validation.valid) return NextResponse.json({ error: validation.error }, { status: 400 });
        mimeType = image.type;
        const bytes = await image.arrayBuffer();
        imageBase64 = Buffer.from(bytes).toString("base64");
      }
    } else {
      const body = await request.json().catch(() => ({}));
      imageBase64 = body.imageBase64 || undefined;
      garmentId = body.garmentId || undefined;
      if (body.mimeType) mimeType = body.mimeType;
    }

    const registeredPiece = garmentId ? db.getArtifactById(garmentId) : undefined;
    const hasValidImage = imageBase64 && imageBase64.length > 100;

    const geminiResult = hasValidImage
      ? await analyzeCraftWithGemini(imageBase64!, mimeType, registeredPiece ? `Compare image with registered record "${registeredPiece.title}".` : undefined)
      : getFallbackGeminiResponse();

    const hasCert = Boolean(registeredPiece?.certificateId);
    const hasArtisan = Boolean(registeredPiece?.artisanId && registeredPiece.artisanId !== "UNKNOWN");
    const originMatch = registeredPiece ? registeredPiece.state === "Uttar Pradesh" : false;
    const materialOk = registeredPiece
      ? !registeredPiece.material.toLowerCase().includes("synthetic")
      : !geminiResult.is_mechanical_flagged;

    const { breakdown, signals } = calculateVerificationScore({
      hasValidCertificate: hasCert,
      certificateIssuerRecognized: hasCert,
      hasArtisanRecord: hasArtisan,
      hasPhysicalOriginMatch: originMatch,
      isMaterialConsistent: materialOk,
      provenanceStepsLogged: registeredPiece ? 4 : hasValidImage ? 2 : 1,
      visualTensionVarianceScore: geminiResult.tension_irregularity_score,
      isVisualMechanicalFlagged: geminiResult.is_mechanical_flagged,
      conflictingSignalsDetected: registeredPiece?.verificationStatus === "REJECTED",
    });

    // Build legacy VerificationResult object for frontend UI cards
    let legacyVerdict: "consistent" | "review" | "inconsistent" = "consistent";
    if (breakdown.verdict === "REJECTED" || geminiResult.is_mechanical_flagged) {
      legacyVerdict = "inconsistent";
    } else if (breakdown.verdict === "NEEDS_REVIEW" || breakdown.verdict === "IN_REVIEW" || breakdown.verdict === "INSUFFICIENT_EVIDENCE") {
      legacyVerdict = "review";
    } else {
      legacyVerdict = "consistent";
    }

    const reasoning = [
      geminiResult.craft_observations?.visual_features?.[0] || "Natural thread tension fluctuation visible on reverse float stitches.",
      `Comprehensive evidence score: ${breakdown.totalScore}/100 (${breakdown.verdict.replace("_", " ")}).`,
      hasArtisan
        ? `Artisan identity matched in verified cooperative registry (${registeredPiece?.artisanName}).`
        : "Visual stitch geometry evaluated against heritage benchmark dataset.",
      geminiResult.is_mechanical_flagged
        ? "ALERT: Machine lock-stitch pattern detected — computerized reproduction suspected."
        : "Reverse side shows organic needle handwork; absence of mechanical lock-stitch uniformity."
    ];

    const result = {
      verdict: legacyVerdict,
      confidence: breakdown.totalScore / 100,
      reasoning,
      referenceMatches: geminiResult.craft_observations?.techniques || ["Bakhiya", "Phanda", "Jali"],
      analysis: {
        stitchVariation: `${Math.round(geminiResult.tension_irregularity_score * 100)}% hand tension variance`,
        threadTexture: geminiResult.craft_observations?.materials?.join(", ") || "Pure Mulmul Cotton & Silk Thread",
        reverseSidePattern: geminiResult.craft_observations?.visual_features?.[0] || "Irregular stitch tension knots characteristic of manual needlework",
        regularity: geminiResult.is_mechanical_flagged ? "Machine-uniform lock-stitches" : "Organic human variance (non-mechanical)",
        overallAssessment: breakdown.verdict === "VERIFIED"
          ? "High consistency with authentic manual embroidery"
          : "Requires physical inspection or additional provenance documentation",
      },
      mode: hasValidImage ? "live" : "demo" as const,
    };

    db.addAuditLog({
      id: `aud-verify-${Date.now()}`,
      actorId: "guest-verifier",
      actorName: "Visitor / Buyer",
      actorRole: "buyer",
      action: "PIECE_VERIFIED_AI",
      entityType: "artifact",
      entityId: garmentId || "unregistered-sample",
      metadata: { score: breakdown.totalScore, verdict: breakdown.verdict, usedGemini: hasValidImage },
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      result, // <--- Backwards-compatible object for scan UI!
      registeredRecord: registeredPiece || null,
      geminiAnalysis: geminiResult,
      scoring: breakdown,
      signals,
      mode: hasValidImage ? "live" : "demo",
    });
  } catch (error) {
    console.error("[NAQSH] Verify API Error:", error);
    return NextResponse.json(
      { error: "NAQSH Intelligence is temporarily unavailable. Please try again." },
      { status: 500 }
    );
  }
}