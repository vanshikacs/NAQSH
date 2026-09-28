import { NextRequest, NextResponse } from 'next/server';
import { getGarmentById } from '@/lib/data/seedData';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ garmentId: string }> }
) {
  const { garmentId } = await params;
  const garment = getGarmentById(garmentId);

  if (!garment) {
    return NextResponse.json({ error: 'Garment not found' }, { status: 404 });
  }

  // Simulate scan logging
  const scanRecord = {
    garmentId: garment.id,
    activationStatus: garment.activationStatus,
    verificationStatus: garment.verificationStatus,
    scanTimestamp: new Date().toISOString(),
    ledgerRecord: garment.ledgerRecord,
  };

  return NextResponse.json({
    garment,
    scanRecord,
    mode: 'demo',
  });
}
