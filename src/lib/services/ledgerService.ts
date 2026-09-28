/**
 * NAQSH Ledger Service
 * Adapter architecture: DemoLedgerService | PolygonLedgerService
 */

import { LedgerRecord } from '@/lib/data/seedData';

export interface LedgerService {
  registerGarment(garmentId: string, recordHash: string, artisanId: string): Promise<LedgerRecord>;
  getRecord(garmentId: string): Promise<LedgerRecord | null>;
  getMode(): 'demo' | 'live';
}

// ─────────────────────────────────────────────
// Demo Ledger Service
// ─────────────────────────────────────────────

class DemoLedgerService implements LedgerService {
  private records: Map<string, LedgerRecord> = new Map();

  getMode(): 'demo' {
    return 'demo';
  }

  private generateHash(): string {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  }

  async registerGarment(garmentId: string, recordHash: string, artisanId: string): Promise<LedgerRecord> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const record: LedgerRecord = {
      garmentId,
      recordHash,
      txHash: this.generateHash(),
      network: 'Polygon Amoy (Demo)',
      timestamp: new Date().toISOString(),
      status: 'demo',
      blockNumber: Math.floor(8400000 + Math.random() * 50000),
    };

    this.records.set(garmentId, record);
    return record;
  }

  async getRecord(garmentId: string): Promise<LedgerRecord | null> {
    return this.records.get(garmentId) || null;
  }
}

// ─────────────────────────────────────────────
// Polygon Ledger Service (stub — real impl requires ethers.js)
// ─────────────────────────────────────────────

class PolygonLedgerService implements LedgerService {
  private rpcUrl: string;
  private privateKey: string;
  private contractAddress: string;

  constructor(rpcUrl: string, privateKey: string, contractAddress: string) {
    this.rpcUrl = rpcUrl;
    this.privateKey = privateKey;
    this.contractAddress = contractAddress;
  }

  getMode(): 'live' {
    return 'live';
  }

  async registerGarment(garmentId: string, recordHash: string, _artisanId: string): Promise<LedgerRecord> {
    // In production, this would use ethers.js to call the ProvenanceRegistry contract
    // For now, fall back to demo
    console.warn('PolygonLedgerService: ethers.js not configured, falling back to demo');
    return new DemoLedgerService().registerGarment(garmentId, recordHash, _artisanId);
  }

  async getRecord(_garmentId: string): Promise<LedgerRecord | null> {
    return null;
  }
}

// ─────────────────────────────────────────────
// Factory
// ─────────────────────────────────────────────

let ledgerServiceInstance: LedgerService | null = null;

export function getLedgerService(): LedgerService {
  if (ledgerServiceInstance) return ledgerServiceInstance;

  const rpcUrl = process.env.POLYGON_RPC_URL;
  const privateKey = process.env.POLYGON_PRIVATE_KEY;
  const contractAddress = process.env.CONTRACT_ADDRESS;

  if (rpcUrl && privateKey && contractAddress) {
    ledgerServiceInstance = new PolygonLedgerService(rpcUrl, privateKey, contractAddress);
  } else {
    ledgerServiceInstance = new DemoLedgerService();
  }

  return ledgerServiceInstance;
}
