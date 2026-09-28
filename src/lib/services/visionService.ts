/**
 * NAQSH Vision Service
 * Adapter architecture: DemoVisionService | HostedVisionService
 * The UI never knows which provider is active.
 */

import { VerificationResult, VerificationVerdict } from '@/lib/data/seedData';

// ─────────────────────────────────────────────
// Interface
// ─────────────────────────────────────────────

export interface VisionAnalysisInput {
  imageBase64?: string;
  imageUrl?: string;
  garmentId?: string;
  references?: string[];
  metadata?: Record<string, unknown>;
}

export interface VisionService {
  analyzeEmbroidery(input: VisionAnalysisInput): Promise<VerificationResult>;
  getMode(): 'demo' | 'live';
}

// ─────────────────────────────────────────────
// Demo Vision Service — Deterministic
// ─────────────────────────────────────────────

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

class DemoVisionService implements VisionService {
  getMode(): 'demo' {
    return 'demo';
  }

  async analyzeEmbroidery(input: VisionAnalysisInput): Promise<VerificationResult> {
    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2800));

    // Deterministic result based on input
    const seed = hashString(input.garmentId || input.imageUrl || 'demo');
    const rand = seededRandom(seed);

    let verdict: VerificationVerdict;
    let confidence: number;
    let reasoning: string[];
    let referenceMatches: string[];
    let analysis: VerificationResult['analysis'];

    if (rand < 0.15) {
      // Inconsistent
      verdict = 'inconsistent';
      confidence = 0.78 + seededRandom(seed + 1) * 0.08;
      reasoning = [
        'Reverse-side shows highly uniform thread spacing atypical of hand embroidery',
        'Stitch-length variation is minimal — pattern suggests mechanical production',
        'Thread anchoring does not match hand-embroidery reference samples',
        'No natural thread tension variation on reverse surface',
      ];
      referenceMatches = [];
      analysis = {
        stitchVariation: 'Minimal variation detected. Stitch lengths are unusually uniform, which is atypical for hand work.',
        threadTexture: 'Thread tension highly consistent throughout — inconsistent with hand-pulled needle work.',
        reverseSidePattern: 'Reverse surface shows regular loop patterns more consistent with machine embroidery.',
        regularity: 'Pattern regularity is very high. Hand embroidery typically shows organic variation that is absent here.',
        overallAssessment: 'Inconsistent with verified hand-embroidery reference samples. Recommend cooperative review.',
      };
    } else if (rand < 0.30) {
      // Review
      verdict = 'review';
      confidence = 0.52 + seededRandom(seed + 2) * 0.12;
      reasoning = [
        'Image quality limits confident assessment',
        'Some indicators of hand work present but assessment is inconclusive',
        'Stitch pattern not well-represented in current reference database',
        'Cooperative review recommended',
      ];
      referenceMatches = [];
      analysis = {
        stitchVariation: 'Some natural variation present, but image resolution limits assessment.',
        threadTexture: 'Thread texture assessment inconclusive — better image angle required.',
        reverseSidePattern: 'Partial indicators of hand work. Clearer reverse-side image needed.',
        regularity: 'Pattern regularity assessment inconclusive.',
        overallAssessment: 'Inconclusive. Human cooperative review recommended before certification.',
      };
    } else {
      // Consistent
      verdict = 'consistent';
      confidence = 0.83 + seededRandom(seed + 3) * 0.13;
      reasoning = [
        'Reverse-side shows characteristic irregular thread tension of hand embroidery',
        'Stitch-length variation within expected range for hand work',
        'Thread crossings exhibit natural asymmetry inconsistent with machine production',
        'Fabric distortion pattern matches hand-pulled needle work',
        'High consistency with verified artisan reference samples',
      ];
      referenceMatches = ['REF-BKH-012', 'REF-JAL-003'];
      analysis = {
        stitchVariation: 'Natural variation consistent with hand embroidery. Organic stitch irregularity present throughout.',
        threadTexture: 'Thread tension shows subtle inconsistencies characteristic of hand-pulled work.',
        reverseSidePattern: 'Reverse shows overlapping float patterns and thread anchoring typical of hand-stitch technique.',
        regularity: 'Intentional imperfection present. Pattern achieves visual symmetry through accumulated hand decisions.',
        overallAssessment: 'High consistency with verified hand-embroidery reference samples.',
      };
    }

    return {
      verdict,
      confidence: Math.min(0.99, confidence),
      reasoning,
      referenceMatches,
      analysis,
      mode: 'demo',
    };
  }
}

// ─────────────────────────────────────────────
// Hosted Vision Service — Gemini/OpenAI compatible
// ─────────────────────────────────────────────

class HostedVisionService implements VisionService {
  private apiKey: string;
  private endpoint: string;

  constructor(apiKey: string, endpoint: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
  }

  getMode(): 'live' {
    return 'live';
  }

  async analyzeEmbroidery(input: VisionAnalysisInput): Promise<VerificationResult> {
    const prompt = `You are NAQSH Vision, an AI system that analyzes chikankari embroidery images to assess consistency with hand embroidery.

Analyze the provided embroidery image focusing on:
1. Reverse-side thread tension variation (natural hand-work vs machine uniformity)
2. Stitch-length variation patterns
3. Thread anchoring patterns
4. Natural irregularity characteristic of hand embroidery
5. Comparison against known hand-embroidery characteristics

IMPORTANT:
- Never claim absolute authenticity
- Use language: "consistent with", "high consistency", "flagged for review", "confidence"
- Do NOT say "100% authentic" or "guaranteed handmade"
- Return structured JSON assessment

Return JSON in this exact format:
{
  "verdict": "consistent" | "review" | "inconsistent",
  "confidence": 0.0-1.0,
  "reasoning": ["reason1", "reason2", "reason3"],
  "referenceMatches": ["REF-ID"],
  "analysis": {
    "stitchVariation": "description",
    "threadTexture": "description",
    "reverseSidePattern": "description",
    "regularity": "description",
    "overallAssessment": "description"
  }
}`;

    try {
      const body: Record<string, unknown> = {
        model: 'gemini-1.5-flash',
        contents: [
          {
            parts: [
              { text: prompt },
              ...(input.imageBase64
                ? [{ inline_data: { mime_type: 'image/jpeg', data: input.imageBase64 } }]
                : []),
            ],
          },
        ],
        generationConfig: { response_mime_type: 'application/json' },
      };

      const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Vision API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(text);

      return {
        ...parsed,
        mode: 'live',
      };
    } catch (err) {
      console.error('HostedVisionService error, falling back to demo:', err);
      return new DemoVisionService().analyzeEmbroidery(input);
    }
  }
}

// ─────────────────────────────────────────────
// Factory — selects implementation from env
// ─────────────────────────────────────────────

let visionServiceInstance: VisionService | null = null;

export function getVisionService(): VisionService {
  if (visionServiceInstance) return visionServiceInstance;

  const apiKey = process.env.VISION_API_KEY;
  const endpoint =
    process.env.VISION_API_ENDPOINT ||
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  if (apiKey) {
    visionServiceInstance = new HostedVisionService(apiKey, endpoint);
  } else {
    visionServiceInstance = new DemoVisionService();
  }

  return visionServiceInstance;
}
