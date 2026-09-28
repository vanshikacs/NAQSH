import { NextRequest, NextResponse } from 'next/server';
import { GARMENTS, ARTISANS } from '@/lib/data/seedData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artisanId = searchParams.get('artisanId');
  const status = searchParams.get('status');

  let garments = [...GARMENTS];

  if (artisanId) {
    garments = garments.filter((g) => g.artisanId === artisanId);
  }

  if (status) {
    garments = garments.filter((g) => g.verificationStatus === status);
  }

  return NextResponse.json({
    garments,
    total: garments.length,
    mode: 'demo',
  });
}

export async function GET_artisans(_request: NextRequest) {
  return NextResponse.json({
    artisans: ARTISANS,
    total: ARTISANS.length,
    mode: 'demo',
  });
}
