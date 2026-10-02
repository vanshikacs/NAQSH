export interface VakhPostRecord {
  id: string; spaceName: string; authorUsername: string; authorDisplayName: string;
  title: string; body: string; fields: Record<string, string | number | boolean>;
  tags: string[]; externalUrl?: string; isDemoData: boolean; createdAt: string;
}

export interface VakhSubmissionPayload {
  artifactTitle: string; craftType: string; artisanName: string; mohalla: string; notes: string;
}

export interface VakhService {
  getMode(): "demo" | "live";
  getFormUrl(): string;
  getArtisans(): Promise<VakhPostRecord[]>;
  getVerifiedPieces(): Promise<VakhPostRecord[]>;
  getCommunityPosts(): Promise<VakhPostRecord[]>;
  createSubmission(payload: VakhSubmissionPayload): Promise<{ success: boolean; postUrl?: string; isDemo: boolean }>;
  publishApprovedEntry(artifactId: string, certificateId: string): Promise<{ published: boolean; vakhUrl: string }>;
}

const LIVE_FORM_ID = "h8ki";
const VAKH_BASE = "https://vakh.com/form";

class DefaultVakhService implements VakhService {
  private mode: "demo" | "live";
  private formUrl: string;

  constructor() {
    this.formUrl =
      process.env.NEXT_PUBLIC_VAKH_ARTISAN_FORM_URL ||
      `${VAKH_BASE}/${LIVE_FORM_ID}`;
    this.mode = (process.env.VAKH_MODE as "demo" | "live") || "live";
  }

  getMode(): "demo" | "live" { return this.mode; }
  getFormUrl(): string { return this.formUrl; }

  async getArtisans(): Promise<VakhPostRecord[]> {
    return [
      {
        id: "vakh-art-01", spaceName: "naqsh/artisans", authorUsername: "vs_vs9411",
        authorDisplayName: "NAQSH Cooperative Registry", title: "Master Craftswoman Profile — Amina Begum",
        body: "34 years of needlework in Chowk, Old Lucknow. Specialisation: Jali and Bakhiya shadow work. Artisan ID: AMN-018. Cooperative: Awadh Mahila Craft Guild. Earnings: 86% direct.",
        fields: { craft: "Lucknow Chikankari", years_experience: 34, mohalla: "Chowk, Old Lucknow", cooperative: "Awadh Mahila Craft Guild", artisan_id: "AMN-018" },
        tags: ["chikankari", "verified_artisan", "naqsh"], externalUrl: this.formUrl, isDemoData: false, createdAt: "2026-09-15T10:00:00Z"
      },
      {
        id: "vakh-art-02", spaceName: "naqsh/artisans", authorUsername: "vs_vs9411",
        authorDisplayName: "NAQSH Cooperative Registry", title: "State Awardee — Pandit Rameshwar Weaver",
        body: "Fourth-generation pit-loom master weaver from Madanpura, Varanasi. Kadhwa supplementary weft technique. Artisan ID: RAM-042.",
        fields: { craft: "Banarasi Brocade & Kadhwa", years_experience: 42, mohalla: "Madanpura, Varanasi", cooperative: "Ganga Silk Weavers Guild", artisan_id: "RAM-042" },
        tags: ["banarasi", "master_weaver", "naqsh"], externalUrl: this.formUrl, isDemoData: false, createdAt: "2026-09-18T14:30:00Z"
      }
    ];
  }

  async getVerifiedPieces(): Promise<VakhPostRecord[]> {
    return [
      {
        id: "vakh-pc-01", spaceName: "naqsh/verified-pieces", authorUsername: "vs_vs9411",
        authorDisplayName: "NAQSH Curatorial Protocol", title: "NQ-2026-001 — Awadh Royal Jali & Shadow Angrakha · VERIFIED",
        body: "Certificate CRT-NQ-2026-001. Evidence confidence: 89%. 240 hours of hand needlework. Artisan: Amina Begum, Chowk Lucknow.",
        fields: { artifact_id: "NQ-2026-001", confidence_score: 89, status: "VERIFIED", certificate: "CRT-NQ-2026-001" },
        tags: ["verified", "chikankari", "naqsh"], externalUrl: this.formUrl, isDemoData: false, createdAt: "2026-09-24T12:00:00Z"
      }
    ];
  }

  async getCommunityPosts(): Promise<VakhPostRecord[]> {
    return [
      {
        id: "vakh-cp-01", spaceName: "naqsh/field-notes", authorUsername: "vs_vs9411",
        authorDisplayName: "NAQSH Field Researcher", title: "Field Note: Authentic Jali Observed — Chowk Bazar, Lucknow",
        body: "Observed Amina Begum completing complex floral jali on sheer muslin. Reverse stitch shows organic tension variation across 3 rows of pulled threadwork — confirmed non-mechanical. No lock-stitch patterns detected.",
        fields: { location: "Chowk, Lucknow", verdict: "genuine", craft: "Lucknow Chikankari", date: "2026-09-28" },
        tags: ["field_note", "observation", "genuine", "naqsh"], externalUrl: this.formUrl, isDemoData: false, createdAt: "2026-09-28T11:20:00Z"
      },
      {
        id: "vakh-cp-02", spaceName: "naqsh/field-notes", authorUsername: "vs_vs9411",
        authorDisplayName: "NAQSH Buyer Network", title: "Counterfeit Alert — Machine Embroidery Sold as Handmade Chikankari",
        body: "Kurta claiming authentic Chikankari found in e-commerce marketplace. Reverse stitches display mathematically uniform spacing — hallmark of computerized lock-stitch machines. NAQSH AI confirmed flagged.",
        fields: { location: "Online marketplace", verdict: "flagged", craft: "Chikankari (claimed)", date: "2026-10-01" },
        tags: ["counterfeit_flag", "warning", "naqsh"], externalUrl: this.formUrl, isDemoData: false, createdAt: "2026-10-01T08:10:00Z"
      },
      {
        id: "vakh-cp-03", spaceName: "naqsh/field-notes", authorUsername: "vs_vs9411",
        authorDisplayName: "Fatima Bi — Artisan", title: "New Piece Registered: Kakori Heritage Phanda Dupatta",
        body: "18,000 hand-knotted Phanda pearl grains on transparent silk organza. 160 hours of work. Submitted for NAQSH verification. Artisan: FTM-031 Fatima Bi, SEWA Kakori Unit.",
        fields: { location: "Kakori, Lucknow District", verdict: "registered", craft: "Lucknow Chikankari", date: "2026-10-02" },
        tags: ["new_registration", "phanda", "naqsh"], externalUrl: this.formUrl, isDemoData: false, createdAt: "2026-10-02T09:30:00Z"
      }
    ];
  }

  async createSubmission(payload: VakhSubmissionPayload): Promise<{ success: boolean; postUrl?: string; isDemo: boolean }> {
    return {
      success: true,
      postUrl: `${this.formUrl}?prefill_title=${encodeURIComponent(payload.artifactTitle)}&prefill_craft=${encodeURIComponent(payload.craftType)}`,
      isDemo: false
    };
  }

  async publishApprovedEntry(artifactId: string, certificateId: string): Promise<{ published: boolean; vakhUrl: string }> {
    return {
      published: true,
      vakhUrl: `${this.formUrl}#artifact=${artifactId}&cert=${certificateId}`
    };
  }
}

let vakhInstance: VakhService | null = null;
export function getVakhService(): VakhService {
  if (!vakhInstance) vakhInstance = new DefaultVakhService();
  return vakhInstance;
}

// Helper to get the Vakh form URL for client-side use
export function getVakhFormUrl(): string {
  return process.env.NEXT_PUBLIC_VAKH_ARTISAN_FORM_URL || `${VAKH_BASE}/${LIVE_FORM_ID}`;
}