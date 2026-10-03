import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is not configured in environment variables' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey);
    const body = await req.json();
    const {
      garmentId = 'NQ-2026-001',
      garmentName = 'Heritage Piece',
      craft = 'Indian Heritage Craft',
      artisanName = 'Master Artisan',
      artisanId = '',
      amountInr = 1200,
      returnUrl,
    } = body;

    const origin =
      req.headers.get('origin') ||
      process.env.NEXT_PUBLIC_APP_URL ||
      'https://naqsh-cyan.vercel.app';

    // Amount in paise (1 INR = 100 paise)
    const unitAmount = Math.max(Math.round(Number(amountInr) * 100), 10000); // min 100 INR

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${garmentName} (${craft})`,
              description: `Crafted by master artisan ${artisanName} · Verified by NAQSH (${garmentId})`,
              metadata: {
                garmentId,
                craft,
                artisanName,
                artisanId,
              },
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        garmentId,
        craft,
        artisanName,
        artisanId,
      },
      success_url: `${origin}/verify/${garmentId}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: returnUrl || (artisanId ? `${origin}/artisan/${artisanId}` : `${origin}/verify/${garmentId}`),
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to initiate checkout session' },
      { status: 500 }
    );
  }
}
