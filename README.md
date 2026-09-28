# NAQSH
### AI verifies the hand. We preserve the story.

> **"Don't verify the paperwork. Verify the object."**  
> *Every stitch leaves a trace.*

NAQSH is a heritage-tech authenticity and provenance platform for Lucknow chikankari. It bridges computer vision, physical tamper-evident seals, and tamper-evident ledgers to protect master craftsmanship and ensure artisans receive visibility and fair compensation.

---

## ✦ The Core Innovation

Most blockchain or certificate projects verify digital records or paper invoices, which can easily be attached to machine-made garments.

**NAQSH flips the model:**
1. **AI examines the physical craftsmanship**: Computer vision inspects the **reverse side** of the embroidery (stitch structure, thread tension irregularity, float patterns) and compares it against verified hand-embroidery reference samples.
2. **Physical seal binds digital to physical**: A woven tamper-evident seal physically connects the garment to its digital record. If removed, the seal visibly tears.
3. **Ledger makes the record tamper-evident**: Registration records (who registered, what was assessed, and when) are committed to an immutable ledger so provenance cannot be silently modified.
4. **QR gives the buyer instant access**: Scannable on mobile to reveal verification status, artisan portrait, voice story, and earnings transparency.
5. **Artisan story & earnings transparency**: Eliminates the "invisible artisan" problem by detailing days worked and exact reported amounts received.

---

## ✦ Three Layers of Trust

| Layer | Component | Problem Solved |
|---|---|---|
| **01. The Hand** | AI Visual Assessment | Evaluates physical stitch texture, thread tension irregularity, and float patterns on reverse-side embroidery. |
| **02. The Seal** | Woven Tamper-Evident Seal | Prevents identity detachment or reuse across counterfeit garments. |
| **03. The Record** | Tamper-Evident Ledger | Guards registration history against unauthorized alterations. |

---

## ✦ Technical Architecture

```
                    ┌────────────────────────┐
                    │    PHYSICAL OBJECT     │
                    │   Reverse-Side Stitch  │
                    └───────────┬────────────┘
                                │
                  [Camera Capture / QR Scan]
                                │
                                ▼
 ┌─────────────────────────────────────────────────────────────┐
 │                      NAQSH PLATFORM                         │
 ├──────────────────────────────┬──────────────────────────────┤
 │ Vision Service Adapter       │ Ledger Service Adapter       │
 │ ├── DemoVisionService        │ ├── DemoLedgerService        │
 │ └── HostedVisionService      │ └── PolygonLedgerService     │
 │     (Gemini 1.5 Flash API)   │     (Polygon Amoy Testnet)   │
 ├──────────────────────────────┼──────────────────────────────┤
 │ Voice Service Adapter        │ Physical Seal Binding        │
 │ ├── BrowserSpeechService     │ ├── Tamper-evident label     │
 │ └── ElevenLabsVoiceService   │ └── Live SVG QR Generator    │
 └──────────────────────────────┴──────────────────────────────┘
                                │
                                ▼
                    ┌────────────────────────┐
                    │   BUYER CERTIFICATE    │
                    │  Artisan · Voice · Pay │
                    └────────────────────────┘
```

---

## ✦ Implemented User Experiences & Routes

| Route | Experience | Description |
|---|---|---|
| `/` | **Landing Page** | Editorial heritage aesthetic, problem context, 3 trust layers, fabric gallery, philosophy. |
| `/verify/:garmentId` | **Buyer Certificate** | Mobile-first certificate. AI analysis breakdown, fabric comparison, maker profile, earnings transparency, physical seal with live QR code, ledger record. |
| `/demo` | **Experience NAQSH** | Interactive demo hub: 4 seeded scenarios, comparative killer demo ("Can you tell which is handmade?"), 3-minute Judge Mode. |
| `/demo/fraud` | **Cloned QR Simulation** | Walkthrough demonstrating counterfeit QR reuse detection and explaining why digital identity alone is insufficient. |
| `/scan` | **Garment Scanner** | Direct garment lookup and fabric image upload analyzer with progressive scanning animation. |
| `/artisan` | **Artisan Directory** | Portrait gallery of registered Lucknow chikankari artisans with craft specialties and bio. |
| `/artisan/:id` | **Artisan Profile** | Personal story, craft background, registered garments, earnings summary, and voice playback. |
| `/artisan/onboard` | **Artisan Onboarding** | WhatsApp-inspired conversational registration flow for low-barrier artisan enrollment. |
| `/cooperative` | **Cooperative Console** | Management dashboard with batch verification statistics, filterable garment registry, and aggregate earnings. |
| `/cooperative/garments/:id` | **Audit Detail** | Full inspection record with cooperative action buttons: *Approve*, *Request clearer image*, *Flag for investigation*. |
| `/ledger/:garmentId` | **Ledger Explorer** | Clean, crypto-jargon-free provenance view with cryptographic hashes, block timestamps, and educational breakdown. |
| `/about` | **About & Philosophy** | Deep-dive into *Why Vision?*, *Why Ledger?*, and responsible AI limitations. |

---

## ✦ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS v4, custom heritage palette (Ivory `#FBF7F1`, Mulmul `#FFFDF9`, Wine `#8E3F4A`, Burgundy `#5D2E35`, Blush `#E8D7D2`, Sage `#A6AE91`)
- **Typography**: Cormorant Garamond (Editorial serif) + Inter (Clean modern body)
- **Animations**: Framer Motion
- **QR Generation**: SVG QR code generation via `react-qr-code`
- **Smart Contract**: Solidity `ProvenanceRegistry.sol` (Zero PII on-chain)
- **Icons**: Lucide React

---

## ✦ Quick Start

### 1. Installation
```bash
cd naqsh-app
npm install
```

### 2. Run in Demo Mode (Zero API keys required)
```bash
npm run build
npm start
```
The application will launch on **`http://localhost:3000`**.

Or run the development server:
```bash
npm run dev
```

---

## ✦ Environment Variables (`.env.local`)

Copy `.env.example` to `.env.local` to enable optional real services:

```env
# Optional: Vision API (Gemini/OpenAI compatible multimodal endpoint)
VISION_API_KEY=
VISION_API_ENDPOINT=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent

# Optional: ElevenLabs voice cloning
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=

# Optional: WhatsApp Business API integration
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=

# Optional: Polygon Amoy testnet deployment
POLYGON_RPC_URL=
POLYGON_PRIVATE_KEY=
CONTRACT_ADDRESS=
```

---

## ✦ Real vs. Demo Fallback Matrix

| Subsystem | Live Implementation | Demo Fallback Mode |
|---|---|---|
| **Vision Analysis** | Hosted Vision API via `HostedVisionService` | Deterministic seed-based `DemoVisionService` |
| **Voice Playback** | ElevenLabs Voice API via `ElevenLabsVoiceService` | Native browser Web Speech API (`speechSynthesis`) |
| **Artisan Onboarding** | WhatsApp Cloud Webhooks | Interactive simulated WhatsApp web UI (`/artisan/onboard`) |
| **Ledger Verification** | Polygon Amoy testnet contract via `ProvenanceRegistry.sol` | In-memory cryptographic digest via `DemoLedgerService` |
| **QR Generation** | Live scannable SVG QR codes pointing to `/verify/:garmentId` | Pre-seeded for `NQ-2026-001` through `NQ-2026-008` |

---

## ✦ Judge Demo Walkthrough (Under 3 Minutes)

1. **Start at `/demo`**:
   - Scroll to **"Can you tell which one is handmade?"**
   - Click **"Analyze Both"**. Watch NAQSH Vision scan both reverse-side fabric samples.
   - Reveal: Garment A is verified handwork; Garment B is identified as machine-made lookalike.
2. **Open Garment A Certificate (`/verify/NQ-2026-001`)**:
   - Inspect the **AI Handwork Analysis** (natural stitch variation, thread tension, float patterns).
   - Meet artisan **Amina Begum** (18 years of craft).
   - Review **Earnings Transparency**: Garment Price: ₹2,400 | Artisan Receives: ₹720 (30%).
   - Examine the **Physical Tamper-Evident Seal** (with real scannable QR code and print option).
3. **Listen to Voice Story (`/artisan/AMN-018`)**:
   - Click **"Listen"** to hear Amina recount the 11 days of hand stitching.
4. **Inspect Provenance Ledger (`/ledger/NQ-2026-001`)**:
   - View cryptographic record hash, block timestamp, and why blockchain is used solely for tamper-evidence.
5. **Demonstrate Counterfeit Attack (`/demo/fraud`)**:
   - Walk through the cloned QR attack scenario: how NAQSH detects digital reuse and flags for physical seal inspection.
6. **Review Cooperative Console (`/cooperative`)**:
   - Show how cooperatives review low-confidence assessments responsibly before certification.

---

## ✦ Important Scientific & Legal Disclaimer

> **IMPORTANT**: NAQSH prototype visual AI assessments indicate consistency with reference hand-embroidery samples and are **not** a substitute for laboratory-grade textile authentication or legal guarantees. Production deployment requires an expanded, expert-validated chikankari dataset, cooperative oversight, and physical seal verification. All artisan profiles and records in this prototype are demonstration samples.
