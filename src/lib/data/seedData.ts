// NAQSH Seed Data — All data is prototype/demo data. Not real artisans or partnerships.

export type ArtisanCraftType = 'Bakhiya' | 'Phanda' | 'Murri' | 'Jali' | 'Mixed';
export type VerificationVerdict = 'consistent' | 'review' | 'inconsistent';
export type ActivationStatus = 'inactive' | 'first_scan' | 'active' | 'duplicate_flag';
export type LedgerStatus = 'pending' | 'confirmed' | 'demo';
export type EarningsSource = 'artisan_reported' | 'cooperative_verified';

export interface Artisan {
  id: string;
  name: string;
  location: string;
  yearsOfExperience: number;
  craftSpecialties: ArtisanCraftType[];
  story: string;
  shortBio: string;
  photo: string;
  voiceConsent: boolean;
  voiceUrl: string | null;
  cooperativeId: string;
  registeredAt: string;
}

export interface VerificationResult {
  verdict: VerificationVerdict;
  confidence: number;
  reasoning: string[];
  referenceMatches: string[];
  analysis: {
    stitchVariation: string;
    threadTexture: string;
    reverseSidePattern: string;
    regularity: string;
    overallAssessment: string;
  };
  mode: 'demo' | 'live';
}

export interface LedgerRecord {
  garmentId: string;
  recordHash: string;
  txHash: string;
  network: string;
  timestamp: string;
  status: LedgerStatus;
  blockNumber?: number;
}

export interface Garment {
  id: string;
  artisanId: string;
  craft: ArtisanCraftType;
  stitches: string[];
  workDays: number;
  frontImage: string;
  reverseImage: string;
  referenceImages: string[];
  price: number;
  artisanEarnings: number;
  earningsSource: EarningsSource;
  verificationStatus: VerificationVerdict;
  verificationResult: VerificationResult;
  sealId: string;
  activationStatus: ActivationStatus;
  createdAt: string;
  ledgerRecord: LedgerRecord;
  description: string;
  garmentType: string;
  scanCount: number;
  isDemoMachine?: boolean;
  isDemoDuplicate?: boolean;
}

// ─────────────────────────────────────────────
// ARTISANS
// ─────────────────────────────────────────────

export const ARTISANS: Artisan[] = [
  {
    id: 'AMN-018',
    name: 'Amina Begum',
    location: 'Chowk, Lucknow',
    yearsOfExperience: 18,
    craftSpecialties: ['Bakhiya', 'Jali'],
    story:
      'I learned chikankari from my mother when I was nine years old. For eighteen years I have worked with this craft — the shadow stitches of Bakhiya, the delicate openwork of Jali. Each garment carries a part of my patience. This piece took me eleven days. Every flower was stitched by hand.',
    shortBio: '18 years of hand embroidery. Specialist in Bakhiya and Jali work.',
    photo: '/images/chikankari-ivory-pink.jpg',
    voiceConsent: true,
    voiceUrl: null,
    cooperativeId: 'COOP-LKO-01',
    registeredAt: '2026-08-14T10:00:00Z',
  },
  {
    id: 'FTM-031',
    name: 'Fatima Khatoon',
    location: 'Nakhas, Lucknow',
    yearsOfExperience: 12,
    craftSpecialties: ['Murri', 'Phanda'],
    story:
      'The Murri stitch demands stillness. Each tiny knot is a decision. I have been making these decisions for twelve years. My daughters watch me work. I hope they will carry this craft forward.',
    shortBio: '12 years of craft. Known for fine Murri knot work.',
    photo: '/images/chikankari-green.jpg',
    voiceConsent: true,
    voiceUrl: null,
    cooperativeId: 'COOP-LKO-01',
    registeredAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'ZNB-007',
    name: 'Zainab Noor',
    location: 'Aminabad, Lucknow',
    yearsOfExperience: 25,
    craftSpecialties: ['Bakhiya', 'Phanda', 'Jali', 'Murri'],
    story:
      'Twenty-five years. I have stitched through weddings, through hardship, through the birth of my children. Chikankari is not just work — it is the language I speak most fluently.',
    shortBio: '25 years of craft. Master artisan in all four classical chikankari stitches.',
    photo: '/images/chikankari-outfit.jpg',
    voiceConsent: false,
    voiceUrl: null,
    cooperativeId: 'COOP-LKO-02',
    registeredAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'RSH-044',
    name: 'Roshni Bano',
    location: 'Hazratganj, Lucknow',
    yearsOfExperience: 8,
    craftSpecialties: ['Mixed'],
    story:
      'I combine old stitches with new ideas. My mother calls it rebellion. I call it evolution. Chikankari has always changed — I am just part of that change.',
    shortBio: '8 years of craft. Known for mixed-stitch contemporary designs.',
    photo: '/images/chikankari-ivory-pink.jpg',
    voiceConsent: true,
    voiceUrl: null,
    cooperativeId: 'COOP-LKO-02',
    registeredAt: '2026-09-01T10:00:00Z',
  },
  {
    id: 'NRM-062',
    name: 'Noorjahan Mirza',
    location: 'Tulsi Das Marg, Lucknow',
    yearsOfExperience: 31,
    craftSpecialties: ['Jali', 'Bakhiya'],
    story:
      'My grandmother stitched for the nawabs of Lucknow. That is not a claim — it is a family memory. I carry it in every thread. Thirty-one years of this craft, and I still find new things to learn in the Jali.',
    shortBio: '31 years of craft. Third-generation chikankari artisan.',
    photo: '/images/chikankari-green.jpg',
    voiceConsent: true,
    voiceUrl: null,
    cooperativeId: 'COOP-LKO-01',
    registeredAt: '2026-06-15T10:00:00Z',
  },
];

// ─────────────────────────────────────────────
// GARMENTS
// ─────────────────────────────────────────────

export const GARMENTS: Garment[] = [
  // NQ-2026-001 — Verified, Genuine Handwork
  {
    id: 'NQ-2026-001',
    artisanId: 'AMN-018',
    craft: 'Bakhiya',
    stitches: ['Bakhiya shadow stitch', 'Jali openwork', 'Tepchi running stitch'],
    workDays: 11,
    frontImage: '/images/chikankari-ivory-pink.jpg',
    reverseImage: '/images/chikankari-ivory-pink.jpg',
    referenceImages: ['/images/chikankari-green.jpg'],
    price: 2400,
    artisanEarnings: 720,
    earningsSource: 'cooperative_verified',
    verificationStatus: 'consistent',
    verificationResult: {
      verdict: 'consistent',
      confidence: 0.91,
      reasoning: [
        'Reverse-side shows characteristic irregular thread tension typical of hand embroidery',
        'Stitch-length variation within expected range for Bakhiya work (1.8–3.2mm)',
        'Thread crossings exhibit natural asymmetry inconsistent with machine production',
        'Fabric distortion pattern matches hand-pulled needle work',
        'Reference comparison: high consistency with verified Chowk artisan samples',
      ],
      referenceMatches: ['REF-BKH-012', 'REF-BKH-019'],
      analysis: {
        stitchVariation: 'Natural variation consistent with hand embroidery. Stitch lengths range 1.8–3.2mm with organic irregularity.',
        threadTexture: 'Thread tension shows subtle inconsistencies characteristic of hand-pulled work. No mechanical uniformity detected.',
        reverseSidePattern: 'Reverse shows overlapping float patterns and thread anchoring typical of shadow-stitch Bakhiya technique.',
        regularity: 'Intentional imperfection present. Pattern achieves visual symmetry through accumulated hand decisions rather than mechanical repetition.',
        overallAssessment: 'High consistency with verified hand-embroidery reference samples from Lucknow.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-001-A7X',
    activationStatus: 'active',
    createdAt: '2026-09-15T09:30:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-001',
      recordHash: '0x7f3a9c2e1b4d5f8a0c3e6b9d2f5a8c1e4b7d0f3a6c9e2b5d8f1a4c7e0b3d6f',
      txHash: '0x4a8f2c6e0d3b7a1f5c9e3b7d1f5a9c3e7b1f5a9d3f7b1e5c9a3f7d1b5e9c3a',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-09-15T09:32:14Z',
      status: 'demo',
      blockNumber: 8427631,
    },
    description: 'Ivory mulmul kurta with full Bakhiya shadow-stitch floral pattern and Jali border detail.',
    garmentType: 'Kurta',
    scanCount: 1,
  },

  // NQ-2026-002 — Machine-made lookalike (inconsistent)
  {
    id: 'NQ-2026-002',
    artisanId: 'FTM-031',
    craft: 'Murri',
    stitches: ['Murri knot', 'Phanda'],
    workDays: 9,
    frontImage: '/images/chikankari-green.jpg',
    reverseImage: '/images/chikankari-green.jpg',
    referenceImages: ['/images/chikankari-ivory-pink.jpg'],
    price: 1800,
    artisanEarnings: 540,
    earningsSource: 'artisan_reported',
    verificationStatus: 'inconsistent',
    verificationResult: {
      verdict: 'inconsistent',
      confidence: 0.82,
      reasoning: [
        'Reverse-side shows uniform thread spacing inconsistent with hand embroidery',
        'Stitch-length variation is minimal — highly regular pattern suggests mechanical production',
        'Thread anchoring pattern does not match reference hand-embroidery samples',
        'No natural thread tension variation detected on reverse surface',
        'Pattern regularity exceeds expected range for Murri knot hand-work',
      ],
      referenceMatches: [],
      analysis: {
        stitchVariation: 'Minimal variation detected. Stitch lengths are unusually uniform (2.1–2.3mm range), which is atypical for hand work.',
        threadTexture: 'Thread tension is highly consistent throughout — inconsistent with hand-pulled needle work.',
        reverseSidePattern: 'Reverse surface shows regular loop patterns more consistent with machine embroidery than hand-knotted Murri.',
        regularity: 'Pattern regularity is very high. Hand embroidery typically shows accumulated organic variation that is absent here.',
        overallAssessment: 'Inconsistent with verified hand-embroidery reference samples. Flagged for cooperative review.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-002-B3Y',
    activationStatus: 'active',
    createdAt: '2026-09-18T11:00:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-002',
      recordHash: '0x2b5e8c1f4a7d0b3e6c9f2a5d8b1e4c7f0a3d6c9b2e5f8a1d4b7e0c3f6a9d2',
      txHash: '0x9d3f7a1e5c9b3f7d1a5e9c3f7a1b5e9d3c7f1a5b9e3d7f1c5a9e3b7d1f5c9',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-09-18T11:02:08Z',
      status: 'demo',
      blockNumber: 8431204,
    },
    description: 'Pastel green organza dupatta — registered by artisan, AI assessment inconclusive.',
    garmentType: 'Dupatta',
    scanCount: 1,
    isDemoMachine: true,
  },

  // NQ-2026-003 — Cloned QR scenario
  {
    id: 'NQ-2026-003',
    artisanId: 'ZNB-007',
    craft: 'Jali',
    stitches: ['Jali openwork', 'Bakhiya', 'Tepchi'],
    workDays: 14,
    frontImage: '/images/chikankari-outfit.jpg',
    reverseImage: '/images/chikankari-ivory-pink.jpg',
    referenceImages: ['/images/chikankari-green.jpg'],
    price: 4200,
    artisanEarnings: 1260,
    earningsSource: 'cooperative_verified',
    verificationStatus: 'consistent',
    verificationResult: {
      verdict: 'consistent',
      confidence: 0.94,
      reasoning: [
        'Jali openwork shows characteristic hand-pierced fabric pattern',
        'Thread anchoring around jali holes shows organic variation consistent with hand work',
        'Bakhiya shadow stitches exhibit expected reverse-side float pattern',
        'High similarity to verified Zainab Noor reference samples in cooperative database',
        'Work duration consistent with registered piece complexity',
      ],
      referenceMatches: ['REF-JAL-003', 'REF-JAL-011'],
      analysis: {
        stitchVariation: 'Natural variation across all three stitch types. Jali holes show hand-piercing irregularity.',
        threadTexture: 'Thread tension consistent with experienced artisan hand work. Subtle variations in pull strength detected.',
        reverseSidePattern: 'Complex multi-stitch reverse shows characteristic layering of Jali, Bakhiya, and Tepchi techniques.',
        regularity: 'Deliberate irregularity in Jali spacing. High-experience artisan signature pattern detected.',
        overallAssessment: 'High consistency with verified reference samples. Consistent with registered artisan\'s known work style.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-003-C5Z',
    activationStatus: 'duplicate_flag',
    createdAt: '2026-09-10T08:00:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-003',
      recordHash: '0x1c4f7a0d3b6e9c2f5a8d1b4e7c0f3a6d9c2e5b8f1a4c7d0e3b6f9c2a5d8e1',
      txHash: '0x6e0a4b8f2c6d0e4b8c2f6a0d4e8b2f6c0a4d8e2b6f0c4a8d2e6b0f4c8a2d6',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-09-10T08:02:45Z',
      status: 'demo',
      blockNumber: 8419887,
    },
    description: 'White chikankari suit — Jali with Bakhiya border. Original verified. Duplicate scan flagged.',
    garmentType: 'Suit',
    scanCount: 3,
    isDemoDuplicate: true,
  },

  // NQ-2026-004 — Review (low confidence)
  {
    id: 'NQ-2026-004',
    artisanId: 'RSH-044',
    craft: 'Mixed',
    stitches: ['Mixed stitches', 'Contemporary pattern'],
    workDays: 7,
    frontImage: '/images/chikankari-green.jpg',
    reverseImage: '/images/chikankari-ivory-pink.jpg',
    referenceImages: [],
    price: 1600,
    artisanEarnings: 480,
    earningsSource: 'artisan_reported',
    verificationStatus: 'review',
    verificationResult: {
      verdict: 'review',
      confidence: 0.58,
      reasoning: [
        'Image quality insufficient for confident assessment',
        'Mixed stitch pattern not well-represented in current reference database',
        'Some indicators of hand work present, but assessment is inconclusive',
        'Cooperative review recommended before certification',
      ],
      referenceMatches: [],
      analysis: {
        stitchVariation: 'Some natural variation present, but image resolution limits confident assessment.',
        threadTexture: 'Thread texture assessment inconclusive due to image angle.',
        reverseSidePattern: 'Reverse-side image shows partial indicators of hand work. Better image required.',
        regularity: 'Mixed pattern makes automated regularity assessment difficult.',
        overallAssessment: 'Inconclusive. Human cooperative review recommended.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-004-D2W',
    activationStatus: 'first_scan',
    createdAt: '2026-09-22T14:00:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-004',
      recordHash: '0x9a2d5f8c1e4b7d0a3c6f9e2b5d8a1c4f7e0b3d6a9c2e5f8b1d4a7c0e3f6b9',
      txHash: '',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-09-22T14:01:00Z',
      status: 'pending',
    },
    description: 'Contemporary mixed-stitch chikankari kurta. Cooperative review pending.',
    garmentType: 'Kurta',
    scanCount: 1,
  },

  // NQ-2026-005 — Verified
  {
    id: 'NQ-2026-005',
    artisanId: 'NRM-062',
    craft: 'Jali',
    stitches: ['Jali openwork', 'Shadow Bakhiya'],
    workDays: 16,
    frontImage: '/images/chikankari-outfit.jpg',
    reverseImage: '/images/chikankari-green.jpg',
    referenceImages: ['/images/chikankari-ivory-pink.jpg'],
    price: 5500,
    artisanEarnings: 1650,
    earningsSource: 'cooperative_verified',
    verificationStatus: 'consistent',
    verificationResult: {
      verdict: 'consistent',
      confidence: 0.96,
      reasoning: [
        'Master artisan signature pattern detected in Jali spacing',
        'Bakhiya shadow stitches show 31-year experience-level consistency',
        'Reverse-side thread anchoring matches Noorjahan Mirza reference samples precisely',
        'Jali hole geometry consistent with hand-pierced technique',
        'Highest confidence score in current batch — consistent with experienced artisan work',
      ],
      referenceMatches: ['REF-JAL-001', 'REF-JAL-007', 'REF-NRM-003'],
      analysis: {
        stitchVariation: 'Expert-level variation. Master artisan stitch pattern recognized.',
        threadTexture: 'Fine thread control with decades of skill visible in tension consistency.',
        reverseSidePattern: 'Exceptional reverse-side presentation. Jali and Bakhiya layers cleanly separated.',
        regularity: 'Master-level intentional irregularity. Pattern is complex but controlled.',
        overallAssessment: 'Highest confidence. Consistent with third-generation artisan master work.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-005-E9V',
    activationStatus: 'active',
    createdAt: '2026-08-28T09:00:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-005',
      recordHash: '0x3e6a9d2c5f8b1e4c7a0d3f6b9e2c5a8d1f4c7b0e3a6d9c2f5b8e1d4a7c0f3',
      txHash: '0x8b2f5e9a3d7c1f5a9e3c7b1f5d9a3e7c1b5f9d3a7e1c5b9f3d7a1e5c9b3f7',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-08-28T09:03:22Z',
      status: 'demo',
      blockNumber: 8405112,
    },
    description: 'Premium Jali chikankari saree — master artisan work, 16 days, highest verification confidence.',
    garmentType: 'Saree',
    scanCount: 2,
  },

  // NQ-2026-006
  {
    id: 'NQ-2026-006',
    artisanId: 'FTM-031',
    craft: 'Phanda',
    stitches: ['Phanda', 'Bakhiya'],
    workDays: 6,
    frontImage: '/images/chikankari-ivory-pink.jpg',
    reverseImage: '/images/chikankari-green.jpg',
    referenceImages: ['/images/chikankari-ivory-pink.jpg'],
    price: 1200,
    artisanEarnings: 360,
    earningsSource: 'artisan_reported',
    verificationStatus: 'consistent',
    verificationResult: {
      verdict: 'consistent',
      confidence: 0.87,
      reasoning: [
        'Phanda knots show characteristic organic variation',
        'Bakhiya border confirms hand shadow-stitch technique',
        'Reverse-side thread pattern consistent with Fatima Khatoon reference samples',
      ],
      referenceMatches: ['REF-PHN-005'],
      analysis: {
        stitchVariation: 'Phanda knot variation within expected range for hand work.',
        threadTexture: 'Fine thread control consistent with 12-year artisan experience.',
        reverseSidePattern: 'Clean reverse with characteristic Phanda anchoring pattern.',
        regularity: 'Appropriate irregularity for hand-knotted Phanda technique.',
        overallAssessment: 'Consistent with verified hand-embroidery reference samples.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-006-F1U',
    activationStatus: 'active',
    createdAt: '2026-09-25T10:00:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-006',
      recordHash: '0x5b8e1c4f7a0d3b6e9c2f5a8d1c4e7b0f3a6d9b2e5c8f1a4d7b0e3c6f9a2d5',
      txHash: '0x2d6a0e4b8c2f6d0a4b8e2c6f0a4d8b2e6c0f4a8d2b6e0c4f8a2d6b0e4c8f2',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-09-25T10:01:55Z',
      status: 'demo',
      blockNumber: 8438900,
    },
    description: 'White Phanda-work stole with Bakhiya border detail.',
    garmentType: 'Stole',
    scanCount: 1,
  },

  // NQ-2026-007
  {
    id: 'NQ-2026-007',
    artisanId: 'AMN-018',
    craft: 'Bakhiya',
    stitches: ['Bakhiya', 'Murri', 'Phanda'],
    workDays: 13,
    frontImage: '/images/chikankari-green.jpg',
    reverseImage: '/images/chikankari-ivory-pink.jpg',
    referenceImages: ['/images/chikankari-ivory-pink.jpg'],
    price: 3200,
    artisanEarnings: 960,
    earningsSource: 'cooperative_verified',
    verificationStatus: 'consistent',
    verificationResult: {
      verdict: 'consistent',
      confidence: 0.89,
      reasoning: [
        'Triple-stitch combination shows master-level hand coordination',
        'Bakhiya and Murri combination is rare — high-skill indicator',
        'Reverse-side shows complex thread management consistent with experienced hand work',
      ],
      referenceMatches: ['REF-BKH-012', 'REF-MRR-008'],
      analysis: {
        stitchVariation: 'Complex multi-stitch variation all within hand-work parameters.',
        threadTexture: 'Expert thread management across three stitch types simultaneously.',
        reverseSidePattern: 'Complex reverse shows three distinct thread layers correctly managed.',
        regularity: 'High-complexity pattern with appropriate organic variation throughout.',
        overallAssessment: 'Consistent with verified hand embroidery. Complex multi-stitch piece.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-007-G4T',
    activationStatus: 'active',
    createdAt: '2026-09-05T11:00:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-007',
      recordHash: '0x4d7a0e3b6f9c2e5b8a1d4c7f0b3e6d9a2c5f8b1e4d7a0c3f6b9e2d5a8c1f4',
      txHash: '0x1f4c8b2e6d0a4c8f2b6e0d4c8a2f6d0b4e8c2a6f0d4b8e2c6a0f4d8b2e6c0',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-09-05T11:02:11Z',
      status: 'demo',
      blockNumber: 8421445,
    },
    description: 'Pastel green kurta with triple-stitch Bakhiya, Murri, and Phanda combination.',
    garmentType: 'Kurta',
    scanCount: 1,
  },

  // NQ-2026-008
  {
    id: 'NQ-2026-008',
    artisanId: 'NRM-062',
    craft: 'Bakhiya',
    stitches: ['Bakhiya', 'Tepchi'],
    workDays: 20,
    frontImage: '/images/chikankari-ivory-pink.jpg',
    reverseImage: '/images/chikankari-green.jpg',
    referenceImages: ['/images/chikankari-outfit.jpg'],
    price: 8000,
    artisanEarnings: 2400,
    earningsSource: 'cooperative_verified',
    verificationStatus: 'consistent',
    verificationResult: {
      verdict: 'consistent',
      confidence: 0.97,
      reasoning: [
        'Exceptional reverse-side presentation — 31 years of craft visible',
        'Tepchi running stitch shows master-level length consistency',
        'Bakhiya shadow stitches densely layered as per high-end garment tradition',
        'Highest complexity piece in current dataset',
      ],
      referenceMatches: ['REF-BKH-001', 'REF-NRM-001', 'REF-NRM-002'],
      analysis: {
        stitchVariation: 'Master-level variation. This piece is a reference sample in itself.',
        threadTexture: 'Exceptional thread control — the finest in the current dataset.',
        reverseSidePattern: 'Museum-quality reverse side. Tepchi and Bakhiya layers perfectly managed.',
        regularity: 'Highest complexity. Decades of experience produce this level of controlled irregularity.',
        overallAssessment: 'Highest confidence in dataset. Reference-quality master artisan work.',
      },
      mode: 'demo',
    },
    sealId: 'SEAL-NQ-008-H7S',
    activationStatus: 'active',
    createdAt: '2026-08-01T09:00:00Z',
    ledgerRecord: {
      garmentId: 'NQ-2026-008',
      recordHash: '0x6e9b2d5a8c1f4e7b0d3a6c9f2e5b8d1a4c7e0b3f6d9a2e5c8b1f4a7d0e3c6',
      txHash: '0x3a7d1b5f9e3a7d1c5f9b3e7d1a5c9f3b7e1a5d9c3f7a1b5e9c3d7b1f5a9e3',
      network: 'Polygon Amoy (Demo)',
      timestamp: '2026-08-01T09:04:10Z',
      status: 'demo',
      blockNumber: 8398234,
    },
    description: 'Heritage saree — 20 days, master Bakhiya with Tepchi border. Highest complexity registered piece.',
    garmentType: 'Saree',
    scanCount: 2,
  },
];

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

export function getGarmentById(id: string): Garment | undefined {
  return GARMENTS.find((g) => g.id === id);
}

export function getArtisanById(id: string): Artisan | undefined {
  return ARTISANS.find((a) => a.id === id);
}

export function getGarmentsByArtisan(artisanId: string): Garment[] {
  return GARMENTS.filter((g) => g.artisanId === artisanId);
}

export function getVerifiedGarments(): Garment[] {
  return GARMENTS.filter((g) => g.verificationStatus === 'consistent');
}

export function getReviewGarments(): Garment[] {
  return GARMENTS.filter((g) => g.verificationStatus === 'review');
}

export function getFlaggedGarments(): Garment[] {
  return GARMENTS.filter((g) => g.activationStatus === 'duplicate_flag');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getEarningsPercentage(garment: Garment): number {
  return Math.round((garment.artisanEarnings / garment.price) * 100);
}

export const COOPERATIVES = [
  { id: 'COOP-LKO-01', name: 'Chowk Chikankari Cooperative', location: 'Chowk, Lucknow', artisanCount: 47 },
  { id: 'COOP-LKO-02', name: 'Aminabad Artisan Collective', location: 'Aminabad, Lucknow', artisanCount: 31 },
];
