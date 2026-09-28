import { NextRequest, NextResponse } from 'next/server';
import { getVisionService } from '@/lib/services/visionService';

export const runtime = 'nodejs';
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get('image') as File | null;
    const garmentId = formData.get('garmentId') as string | null;
    const imageUrl = formData.get('imageUrl') as string | null;

    let imageBase64: string | undefined;

    if (image) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Please upload JPEG, PNG, or WebP.' },
          { status: 400 }
        );
      }

      // Validate file size (10MB)
      const maxSize = 10 * 1024 * 1024;
      if (image.size > maxSize) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 10MB.' },
          { status: 400 }
        );
      }

      const bytes = await image.arrayBuffer();
      imageBase64 = Buffer.from(bytes).toString('base64');
    }

    const visionService = getVisionService();
    const result = await visionService.analyzeEmbroidery({
      imageBase64,
      imageUrl: imageUrl || undefined,
      garmentId: garmentId || undefined,
    });

    return NextResponse.json({
      success: true,
      mode: visionService.getMode(),
      result,
    });
  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
